# PRIVILEGE ESCALATION RESPONSE — INCIDENT RESPONSE PLAYBOOK
## 7-Step Framework | UNCLASSIFIED // FOUO

**Playbook ID:** IR-PB-009
**Version:** 1.0
**Classification:** UNCLASSIFIED // FOUO
**Threat Type:** Privilege Escalation — Unauthorized Elevation from Standard to Admin/SYSTEM/Root
**Primary Role:** 17C Host Analyst (Lead) + 17C Network Analyst (Support)
**Authority:** CJCSM 6510.01B | AR 25-2 | FM 3-12 | NIST SP 800-53 AC-6
**Created:** 2026-02-25
**Review Cycle:** Semi-annual or post-CAT I/II incident

**MITRE ATT&CK Primary Tactics:**
- T1068 — Exploitation for Privilege Escalation (OS/application vulnerability exploit)
- T1134 — Access Token Manipulation (token impersonation, token duplication)
- T1548 — Abuse Elevation Control Mechanism (UAC bypass, sudo abuse)
- T1055 — Process Injection (inject into high-privilege process)
- T1484 — Domain Policy Modification (GPO modification to gain domain privilege)
- T1037 — Boot or Logon Initialization Scripts (elevate via logon script manipulation)
- T1611 — Escape to Host (container escape for host-level privilege)

---

## BLUF

Privilege escalation is the transition point between "attacker has a foothold" and "attacker has control." An attacker who escalates privilege has bypassed your most critical access control boundary. The response must **immediately determine what the elevated privilege was used for** — lateral movement, credential dumping, and persistence installation are the highest-probability follow-on actions. Treat every privilege escalation as the beginning of a broader compromise, not as an isolated event.

**Key decision:** Was this an opportunistic test (no further action) or did the attacker actively leverage elevated access? Answer this before scoping your response.

---

## STEP 1: PREPARATION

### 1.1 Required Capabilities
| Capability | Purpose |
|-----------|---------|
| EDR with process telemetry | Detect privilege escalation behaviors |
| SIEM with AD/auth correlation | Detect admin token acquisition, UAC bypass |
| Vulnerability management | Know which escalation vulnerabilities are unpatched |
| Least privilege enforcement | Reduce escalation impact if successful |
| Admin account monitoring | Alert on unexpected admin account usage |
| System integrity monitoring | Detect binary/GPO modifications |

### 1.2 Pre-Incident Controls Checklist
- [ ] All accounts follow least privilege principle
- [ ] UAC enforced at maximum level (Windows)
- [ ] Sudo configuration audited (Linux/Unix)
- [ ] Vulnerability management program current (escalation exploits patched rapidly)
- [ ] Admin account logon alerts active in SIEM
- [ ] Process injection detection enabled in EDR
- [ ] Token manipulation detection enabled in EDR

### 1.3 Baseline Data Required
- List of accounts with admin/elevated access and why they have it
- List of processes that normally run as SYSTEM or root
- Normal parent-child process relationships
- Approved service accounts and their privilege levels

---

## STEP 2: DETECTION & IDENTIFICATION

### 2.1 Privilege Escalation Detection Indicators
| Indicator | Technique | Detection Source |
|-----------|-----------|-----------------|
| Standard user process spawning as SYSTEM | Process injection or exploit | EDR (Sysmon Event 1, parent/child mismatch) |
| UAC bypass (auto-elevated without prompt) | T1548.002 UAC bypass | EDR |
| Token duplication/impersonation by non-privileged process | T1134 Token manipulation | EDR |
| Exploitation of known vulnerability (LSASS, kernel) | T1068 | EDR, vulnerability data correlation |
| Sudo command from unexpected user or at unexpected time | T1548.003 Sudo abuse | Linux audit logs |
| Scheduled task created by low-privilege user that runs as SYSTEM | T1053 + escalation | EDR, Task Scheduler logs |
| GPO modification by non-admin account | T1484 | AD Event 5136 |
| New local admin account creation | Post-escalation persistence | EDR, AD logs |
| Processes accessing admin registry hives without approval | Privilege abuse | EDR registry monitoring |

### 2.2 Escalation Characterization
Determine:
1. **What was the escalation method?** (exploit, token manipulation, UAC bypass, credential theft)
2. **From what to what privilege level?** (Standard user → Local Admin → Domain Admin → SYSTEM)
3. **What did the attacker do WITH the elevated privilege?** (This is the real risk)
4. **Was this an internal threat or external?** (Insider threat changes response significantly)

### 2.3 Immediate Post-Escalation Activity — What to Look For
After privilege escalation, attackers typically:
- Dump credentials (LSASS access with elevated privilege) → See IR-PB-006
- Install persistence (services, scheduled tasks, registry — only possible with admin) → See IR-PB-010
- Disable security tools (EDR, AV — only possible with admin)
- Enumerate domain (AD enumeration is much more effective with admin)
- Move laterally (pass-the-hash, WMI/PsExec require admin on target) → See IR-PB-005

**Assess each of these simultaneously with the escalation response.**

### 2.4 Severity Classification
| Scope | Category |
|-------|----------|
| Escalation to Domain Admin | CAT I |
| Escalation to Local Admin on DC or critical server | CAT I |
| SYSTEM-level code execution on critical system | CAT I |
| Escalation on standard workstation (attacker is external) | CAT II |
| Accidental escalation / insider test (unintentional) | CAT III |

---

## STEP 3: CONTAINMENT

### 3.1 Immediate Containment
- [ ] **Isolate affected host** — EDR isolation to prevent lateral movement from elevated position
- [ ] **Disable compromised account** — Account that was used as launch point for escalation
- [ ] **Revoke elevated tokens** — Force session termination to invalidate elevated access
- [ ] **Assess lateral movement** — Has the attacker already moved with elevated privilege? (If yes → IR-PB-005)
- [ ] **Assess credential access** — Was LSASS accessed after escalation? (If yes → IR-PB-006)
- [ ] **Notify Mission OIC** — Report escalation, actions taken, further assessment underway

### 3.2 Scope Check — Concurrent Actions Triggered
Privilege escalation almost always triggers concurrent incidents:

| If Evidence of... | Activate... |
|-------------------|-------------|
| LSASS access or credential dump | IR-PB-006 (Credential Theft) |
| Remote connections from affected host | IR-PB-005 (Lateral Movement) |
| Persistence installation | IR-PB-010 (Persistence Response) |
| C2 beaconing | IR-PB-004 (C2 Response) |
| Data access / staging | IR-PB-007 (Data Exfiltration) |

### 3.3 Privileged Access Lockdown
If escalation was to domain admin or reached DC:
- [ ] Limit domain admin usage to dedicated admin systems only
- [ ] Force re-authentication for all domain admin sessions
- [ ] Audit current domain admin session list — terminate unauthorized sessions
- [ ] Enable enhanced logging for all domain admin actions

---

## STEP 4: ERADICATION

### 4.1 Eradication Actions
1. **Remove the escalation vehicle** — patch the vulnerability exploited, remove the misconfiguration abused
2. **Remove any persistence installed post-escalation** (persistence is the most common post-escalation action)
3. **Remove any unauthorized accounts created with elevated privilege**
4. **Restore security tool functionality** (if EDR/AV was disabled using elevated privilege)
5. **Remove any attacker-installed admin tools or remote access**

### 4.2 Vulnerability Remediation
For exploit-based escalation:
- Identify the CVE or misconfiguration that enabled escalation
- Apply patch or compensating control immediately
- Scan environment for same vulnerability on other hosts
- Create POA&M for any systems that cannot be patched immediately

### 4.3 Access Control Remediation
- Remove any unauthorized privilege grants made during attacker's elevated session
- Audit group membership changes during the compromise window
- Audit GPO changes during the compromise window
- Review and restore service account configurations

---

## STEP 5: RECOVERY

### 5.1 System Restoration
- Rebuild or reimage if attacker had admin/SYSTEM access for more than a short window
- For brief, detected escalations with no persistence evidence: validated removal + hardening acceptable
- Apply all outstanding patches before restoration
- Validate security tools operational post-restoration

### 5.2 Account Recovery
- Restore disabled launch account with forced credential reset
- Validate account now has minimum required permissions only
- Enable enhanced monitoring for the restored account

### 5.3 Hardening Post-Escalation
- Enforce least privilege on all accounts on affected system
- Enable Credential Guard / Protected Processes (prevents LSASS access)
- Configure UAC at highest setting
- Enable all EDR tamper protection settings
- Review and harden service account privileges on affected host

---

## STEP 6: POST-INCIDENT ANALYSIS

### 6.1 Privilege Escalation Timeline
```
[DATE/TIME] Initial access (launch account compromised)
[DATE/TIME] Escalation occurred (privilege elevated)
[DATE/TIME] Post-escalation activity (what attacker did with elevated access)
[DATE/TIME] Detection
[DATE/TIME] Isolation / containment
[DATE/TIME] Eradication
Escalation method: [UAC bypass / exploit / token / credential]
Privilege level achieved: [Local Admin / Domain Admin / SYSTEM / root]
Post-escalation actions confirmed: [credential dump / persistence / lateral movement / data access]
```

### 6.2 Root Cause Analysis
- What vulnerability or misconfiguration enabled escalation?
- Was there an unpatched CVE? How long was it unpatched?
- Was there a misconfiguration (sudo, scheduled task, service binary)?
- Why wasn't this detected immediately?

### 6.3 Architecture Recommendations
- Enforce least privilege (eliminate all unnecessary admin rights)
- Deploy Privileged Access Management (PAM) solution
- Enable Windows Defender Credential Guard
- Implement JIT (Just-in-Time) admin access
- Enforce MFA for all privileged account actions

---

## STEP 7: COORDINATION & REPORTING

### 7.1 Reporting Timeline
| Event | Recipient | Deadline |
|-------|-----------|----------|
| Escalation confirmed (CAT I/II) | Mission OIC | Immediately |
| CAT I notification | ARCYBER | Within 1 hour |
| Post-escalation activity assessment | Mission OIC | Within 4 hours |
| Status updates | All above | Every 8 hours |
| Final incident report | ARCYBER + BN/BDE CDR | Within 72 hours |

### 7.2 Incident Closure Criteria
- [ ] Escalation vector closed (vulnerability patched / misconfiguration fixed)
- [ ] All unauthorized elevated access revoked
- [ ] Post-escalation activity fully assessed (confirm/deny credential theft, persistence, lateral movement)
- [ ] All concurrent playbooks resolved (IR-PB-006, -005, -010 as applicable)
- [ ] Access controls hardened
- [ ] Enhanced monitoring active (60 days)
- [ ] Final report submitted

---

## QUICK REFERENCE CARD

```
PRIVILEGE ESCALATION RESPONSE
───────────────────────────────
1. ISOLATE HOST (prevent lateral movement from elevated position)
2. ASSESS WHAT THEY DID WITH IT (credential dump? persistence? lateral?)
3. ACTIVATE CONCURRENT PLAYBOOKS (as applicable)
4. PATCH THE ESCALATION VECTOR (or compensating control)
5. REBUILD (if significant dwell with admin access)

PRIVILEGE ESCALATION = ALMOST ALWAYS A MULTI-PLAYBOOK RESPONSE.
THE ESCALATION IS NOT THE INCIDENT — IT IS THE ENABLER.
```

---

**Classification:** UNCLASSIFIED // FOUO
**Playbook ID:** IR-PB-009 | Privilege Escalation Response
**Prepared By:** CyberOpsPlanner System
**Date:** 2026-02-25
**Related Playbooks:** IR-PB-005 (Lateral Movement), IR-PB-006 (Credential Theft), IR-PB-010 (Persistence)
**Technical Reference:** `docs/technical/SOP/(d) escalate-privileges-response-playbook.docx`
