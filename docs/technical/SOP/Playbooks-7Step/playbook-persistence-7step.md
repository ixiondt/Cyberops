# PERSISTENCE RESPONSE — INCIDENT RESPONSE PLAYBOOK
## 7-Step Framework | UNCLASSIFIED // FOUO

**Playbook ID:** IR-PB-010
**Version:** 1.0
**Classification:** UNCLASSIFIED // FOUO
**Threat Type:** Persistence — Unauthorized Mechanisms to Maintain Foothold Across Reboots/Credential Changes
**Primary Role:** 17C Host Analyst (Lead)
**Authority:** CJCSM 6510.01B | AR 25-2 | FM 3-12 | ATP 3-12.3
**Created:** 2026-02-25
**Review Cycle:** Semi-annual or post-CAT I/II incident

**MITRE ATT&CK Primary Tactics:**
- T1053 — Scheduled Task/Job (cron, Windows Task Scheduler, systemd timers)
- T1543 — Create or Modify System Process (new services, LaunchDaemon, systemd unit)
- T1547 — Boot or Logon Autostart Execution (Run keys, startup folder, LSASS driver, logon scripts)
- T1546 — Event Triggered Execution (WMI subscriptions, accessibility features abuse, AppInit DLLs)
- T1574 — Hijack Execution Flow (DLL search order hijacking, PATH hijacking)
- T1078 — Valid Accounts (persistence via legitimate account created or maintained by attacker)
- T1505 — Server Software Component (web shells, SQL stored procedures for persistence)

---

## BLUF

Persistence means the attacker has **guaranteed re-entry** regardless of reboots, password changes, or partial cleanup. A single missed persistence mechanism invalidates the entire response — the attacker simply waits for the environment to stabilize, then re-activates. Persistence eradication requires **systematic enumeration of every known persistence location**, not a targeted search. If you search only where you expect to find it, you will miss it.

**The paradox of persistence response:** Speed in containment, thoroughness in eradication. Moving fast past this phase results in immediate re-compromise.

---

## STEP 1: PREPARATION

### 1.1 Required Capabilities
| Capability | Purpose |
|-----------|---------|
| EDR with autorun/persistence monitoring | Alert on new persistence mechanism creation |
| Autoruns / persistence scanner | Enumerate all persistence locations |
| Registry monitoring | Detect new run keys and policy modifications |
| File integrity monitoring (FIM) | Alert on modification of system binaries / startup scripts |
| Scheduled task monitoring | Alert on new or modified scheduled tasks |
| WMI subscription monitoring | Alert on new WMI event subscriptions |
| Baseline persistence inventory | Known-good comparison for anomaly detection |

### 1.2 Baseline Persistence Inventory (Pre-Incident)
For each host class, document the known-good state of:
- Scheduled tasks (task name, trigger, action, run-as user)
- Running services (name, binary path, startup type)
- Registry run keys (HKLM/HKCU Run, RunOnce, RunServices)
- Startup folder contents
- WMI subscriptions
- Installed browser extensions
- Startup scripts (GPO logon/logoff/startup/shutdown)
- Cron jobs / systemd timers (Linux)
- SSH authorized_keys (Linux)

### 1.3 Persistence Detection Posture
- [ ] EDR alerting on new scheduled task creation (especially from unusual processes)
- [ ] EDR alerting on new service installation
- [ ] Registry change monitoring on Run key locations
- [ ] FIM on system binary directories
- [ ] WMI subscription enumeration built into threat hunting schedule

---

## STEP 2: DETECTION & IDENTIFICATION

### 2.1 Persistence Mechanism Detection Indicators
| Persistence Type | Detection Indicator | Source |
|-----------------|-------------------|--------|
| Scheduled Task | New task created by non-admin user / unusual trigger / suspicious binary path | EDR, Event Log 4698 |
| Malicious Service | New service with unusual name / binary in user writeable path / unsigned binary | EDR, Event Log 7045 |
| Registry Run Key | New entry in Run/RunOnce keys | Registry monitoring, EDR |
| WMI Subscription | New WMI event filter + consumer + binding | EDR, WMI provider host activity |
| DLL Hijack | DLL in unusual location (app directory vs. system32) | EDR, file monitoring |
| Web Shell | Suspicious file in web server directory | FIM, web server logs |
| Unauthorized Account | New local admin account not in baseline | AD/local account audit |
| Modified System Binary | Hash mismatch on known-good binary | FIM |
| Cron/Systemd | New cron entry for non-root user / unusual timing | Auditd, file monitoring |

### 2.2 Persistence Discovery Methodology
Persistence discovery requires a **complete enumeration**, not targeted searching.

**Windows Persistence Locations — Check ALL:**
```
SCHEDULED TASKS:
- Task Scheduler → All Tasks (not just top level)
- C:\Windows\System32\Tasks\ (and subdirectories)
- C:\Windows\SysWOW64\Tasks\

SERVICES:
- Services.msc / sc query (all services)
- Registry: HKLM\SYSTEM\CurrentControlSet\Services\

REGISTRY AUTORUN LOCATIONS:
- HKLM\Software\Microsoft\Windows\CurrentVersion\Run
- HKLM\Software\Microsoft\Windows\CurrentVersion\RunOnce
- HKCU\Software\Microsoft\Windows\CurrentVersion\Run
- HKCU\Software\Microsoft\Windows\CurrentVersion\RunOnce
- HKLM\Software\WOW6432Node\Microsoft\Windows\CurrentVersion\Run
- HKLM\Software\Microsoft\Windows NT\CurrentVersion\Winlogon (Userinit, Shell)
- HKLM\SYSTEM\CurrentControlSet\Control\Session Manager\BootExecute

STARTUP FOLDERS:
- C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Startup\
- C:\Users\[user]\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup\

WMI SUBSCRIPTIONS:
- Get-WMIObject -Namespace root/subscription -Class __EventFilter
- Get-WMIObject -Namespace root/subscription -Class __EventConsumer
- Get-WMIObject -Namespace root/subscription -Class __FilterToConsumerBinding

DLL PERSISTENCE:
- AppInit_DLLs: HKLM\Software\Microsoft\Windows NT\CurrentVersion\Windows\AppInit_DLLs
- Known DLL hijack locations in application directories

ACCESSIBILITY FEATURES:
- C:\Windows\System32\sethc.exe (Sticky Keys replacement)
- C:\Windows\System32\utilman.exe (Utility Manager replacement)
- debugger registry key for these binaries

OTHER:
- Browser extensions (check all installed browsers)
- Office Add-ins
- LSA Providers: HKLM\SYSTEM\CurrentControlSet\Control\Lsa\
```

**Linux/Unix Persistence Locations — Check ALL:**
```
CRON:
- /etc/crontab
- /etc/cron.d/*
- /var/spool/cron/crontabs/*
- /etc/cron.hourly|daily|weekly|monthly/*

SYSTEMD:
- systemctl list-units --type=service (all services)
- /etc/systemd/system/*
- ~/.config/systemd/user/*

INIT SCRIPTS:
- /etc/rc.local
- /etc/init.d/*
- /etc/profile.d/*

SSH:
- ~/.ssh/authorized_keys (for each user)
- /root/.ssh/authorized_keys

STARTUP CONFIGS:
- ~/.bashrc, ~/.bash_profile, ~/.profile (per user)
- /etc/bashrc, /etc/profile

SETUID BINARIES:
- find / -perm -4000 -type f (unexpected setuid executables)
```

### 2.3 Persistence Prioritization
Not all persistence mechanisms are equal risk:
- **High priority:** Runs as SYSTEM/root, survives reboot, on a DC or critical server
- **Medium priority:** Runs as admin, on server, survives reboot
- **Lower priority:** Runs as standard user, on workstation

### 2.4 Severity Classification
| Scope | Category |
|-------|----------|
| Persistence on DC or authentication infrastructure | CAT I |
| SYSTEM-level persistence on critical server | CAT I |
| Multiple persistence mechanisms (attacker prepared for clean) | CAT I |
| Admin-level persistence on non-critical server | CAT II |
| Standard user persistence on workstation | CAT III |

---

## STEP 3: CONTAINMENT

### 3.1 Containment Actions
- [ ] **Isolate affected host** — EDR isolation to prevent outbound communications and lateral movement from persistence payload
- [ ] **Do NOT reboot yet** — Many persistence mechanisms activate on reboot; understand scope first
- [ ] **Disable persistence payloads** (disable, not delete — preserve for forensics)
- [ ] **Block C2** — If persistence is for maintaining C2, block the C2 channel (→ IR-PB-004)
- [ ] **Identify account used by persistence mechanism** — Disable if compromised service account
- [ ] **Notify Mission OIC** based on severity

### 3.2 Evidence Preservation Before Any Removal
- [ ] Memory dump (captures live processes associated with persistence payloads)
- [ ] Full disk image (preserves all persistence artifacts in original state)
- [ ] Export scheduled tasks, services, WMI subscriptions, registry run keys
- [ ] Document each persistence mechanism with: type, name, trigger, payload, run-as account

### 3.3 Assess Concurrent Incidents
Persistence is rarely isolated. Check for:
- Was persistence installed AFTER privilege escalation? → IR-PB-009
- Is persistence calling back to C2? → IR-PB-004
- Did persistence enable credential dumping? → IR-PB-006

---

## STEP 4: ERADICATION

### 4.1 Complete Persistence Eradication Methodology
**Eradicate in reverse order of discovery — most dangerous last (after forensics complete).**

For each identified persistence mechanism:
1. Document (name, location, payload, run-as, creation timestamp)
2. Disable (prevent execution while preserving artifact)
3. Remove (delete after documentation)
4. Validate removal (rescan to confirm gone)

### 4.2 Eradication Validation (Per Mechanism Type)
| Type | Validation Method |
|------|------------------|
| Scheduled Task | Task Scheduler shows no malicious entries; binary no longer present |
| Service | Service no longer listed; binary removed |
| Registry Run Key | Key entry absent from all run key locations |
| WMI Subscription | No malicious filter/consumer/binding present |
| Web Shell | File no longer present in web server directory; web server clean |
| Account | Account disabled or removed; no active sessions |

### 4.3 Verify ALL Persistence Locations Cleared
After removing identified mechanisms, **re-run the full persistence enumeration** to catch anything missed:
- Run Autoruns or equivalent tool against a clean baseline
- Any new or unrecognized items = potential missed persistence

### 4.4 Secondary Persistence Hunt
Assume the attacker installed multiple persistence mechanisms (defense in depth for their access). After removing the obvious ones:
- Re-enumerate all persistence locations
- Review for less obvious mechanisms (DLL hijacking, accessibility feature abuse)
- Review for off-system persistence (credentials, cloud access tokens, VPN accounts)

---

## STEP 5: RECOVERY

### 5.1 Restoration Decision
For systems with confirmed persistence:
- **Rebuild/reimage** is the gold standard (eliminates any hidden persistence missed during manual eradication)
- Manual cleanup acceptable only if: persistence fully mapped, all mechanisms confirmed removed, and no evidence of privilege escalation or credential access

### 5.2 Post-Restoration Persistence Baseline
Immediately after restoration:
- Document baseline persistence state (tasks, services, run keys)
- Deploy FIM on all critical persistence locations
- Enable enhanced EDR persistence monitoring

### 5.3 Hardening Actions
- Remove write access to system binary locations for non-admin users
- Restrict scheduled task creation to administrators
- Disable unnecessary Windows features (WScript, CScript, PowerShell v2) that facilitate persistence
- Enable PowerShell script block logging
- Implement software restriction policies or application whitelisting

---

## STEP 6: POST-INCIDENT ANALYSIS

### 6.1 Persistence Analysis Products
Document for each identified persistence mechanism:
```
PERSISTENCE MECHANISM INVENTORY
| ID | Type | Name/Location | Payload | Run-As | Created | Trigger | Removed |
|----|------|---------------|---------|--------|---------|---------|---------|
```

### 6.2 Persistence Timeline
```
[DATE/TIME] Attacker initial access
[DATE/TIME] Privilege escalation (if applicable)
[DATE/TIME] Persistence mechanism installed
[DATE/TIME] Detection
[DATE/TIME] Mechanism disabled/removed
Dwell time with persistence active: [N hours/days]
Number of mechanisms found: [N]
```

### 6.3 Detection Gap Analysis
- Which persistence mechanisms were detected immediately vs. missed?
- Why were missed mechanisms not detected? (Blind spot, no monitoring, below threshold)
- What monitoring improvements would have caught these?
- Is the persistence baseline up to date for this host class?

---

## STEP 7: COORDINATION & REPORTING

### 7.1 Reporting Timeline
| Event | Recipient | Deadline |
|-------|-----------|----------|
| Persistence confirmed (CAT I/II) | Mission OIC | Immediately |
| CAT notification | ARCYBER | Within 1-8 hours per CAT |
| Full persistence inventory | Mission OIC | Within 8 hours |
| Status updates | All above | Every 8 hours |
| Final report | ARCYBER + BN/BDE CDR | Within 72 hours |

### 7.2 Incident Closure Criteria
- [ ] Complete persistence inventory documented
- [ ] All persistence mechanisms removed and validated
- [ ] Full persistence re-enumeration post-eradication: clean
- [ ] Host rebuilt or validated clean by rigorous methodology
- [ ] Concurrent incidents (credential, C2, lateral movement) addressed
- [ ] Detection rules updated for observed persistence techniques
- [ ] Enhanced persistence monitoring active (60 days)
- [ ] Final report submitted

---

## QUICK REFERENCE CARD

```
PERSISTENCE RESPONSE
─────────────────────
1. ENUMERATE ALL LOCATIONS (not just where you found the first one)
2. DOCUMENT BEFORE REMOVING (every mechanism, full details)
3. DISABLE FIRST, REMOVE SECOND (preserve forensics)
4. DO NOT REBOOT UNTIL SCOPED (boot persistence triggers on reboot)
5. RE-ENUMERATE AFTER REMOVAL (validate nothing missed)
6. REBUILD IS GOLD STANDARD (manual cleanup misses things)

ASSUME MULTIPLE PERSISTENCE MECHANISMS.
ASSUME THE OBVIOUS ONE IS THE DECOY.
```

---

**Classification:** UNCLASSIFIED // FOUO
**Playbook ID:** IR-PB-010 | Persistence Response
**Prepared By:** CyberOpsPlanner System
**Date:** 2026-02-25
**Related Playbooks:** IR-PB-001 (Malware Triage), IR-PB-004 (C2 Response), IR-PB-009 (Privilege Escalation)
**Technical Reference:** `docs/technical/SOP/(d) persistence-response-playbook.docx`
