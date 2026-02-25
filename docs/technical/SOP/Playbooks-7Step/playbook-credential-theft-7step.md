# CREDENTIAL THEFT RESPONSE — INCIDENT RESPONSE PLAYBOOK
## 7-Step Framework | UNCLASSIFIED // FOUO

**Playbook ID:** IR-PB-006
**Version:** 1.0
**Classification:** UNCLASSIFIED // FOUO
**Threat Type:** Credential Theft — Password Dumping / Credential Harvesting / Account Compromise
**Primary Role:** 17C Host Analyst (Lead) + Cyber Ops Planner (Decision Support)
**Authority:** CJCSM 6510.01B | AR 25-2 | FM 3-12 | NIST SP 800-63
**Created:** 2026-02-25
**Review Cycle:** Semi-annual or post-CAT I/II incident

**MITRE ATT&CK Primary Tactics:**
- T1003 — OS Credential Dumping (LSASS, SAM database, NTDS.dit, cached credentials)
- T1555 — Credentials from Password Stores (browsers, credential manager, password managers)
- T1558 — Steal or Forge Kerberos Tickets (Kerberoasting, AS-REP Roasting, Golden/Silver Ticket)
- T1539 — Steal Web Session Cookie (session hijacking)
- T1056 — Input Capture (keylogging, web form injection)
- T1110 — Brute Force (password spraying, credential stuffing)
- T1606 — Forge Web Credentials (SAML/OAuth token forgery)

---

## BLUF

Credential theft is not just a technical incident — it is a **trust failure** across every system those credentials could access. The response must treat every compromised credential as providing full access to every system that credential could reach — until proven otherwise. Speed of credential rotation is the primary success metric. Until credentials are rotated, the adversary retains access.

**Core principle:** You cannot eradicate a credential theft incident. You can only rotate your way out of it.

---

## STEP 1: PREPARATION

### 1.1 Required Capabilities
| Capability | Purpose |
|-----------|---------|
| Privileged Access Management (PAM) | Track and control privileged credential use |
| EDR with LSASS protection / credential guard | Detect and prevent credential dumping |
| SIEM with authentication analytics | Detect credential misuse after theft |
| AD audit logging | Track all authentication events |
| Identity governance system | Know who has access to what |
| Mass password reset capability | Rotate hundreds of credentials rapidly |

### 1.2 Pre-Incident Credential Hygiene Checklist
- [ ] Tiered administrator model (T0/T1/T2 or equivalent) documented and enforced
- [ ] Privileged accounts NOT used on standard workstations
- [ ] Service accounts follow least privilege (no Domain Admin unless required)
- [ ] All privileged accounts have MFA
- [ ] Credential Dumping detection rules active (LSASS access by non-system processes)
- [ ] Password spray detection rules active (multiple failed logins across accounts)
- [ ] Kerberoasting detection active (excessive TGS requests for service accounts)

### 1.3 Credential Inventory (Pre-Incident)
- [ ] Complete account inventory documented (users, service, admin, shared)
- [ ] Tiering documented (which accounts can access which systems)
- [ ] Service account dependencies mapped (what breaks if each service account is reset)
- [ ] Emergency credential reset contacts established (who performs bulk resets)

---

## STEP 2: DETECTION & IDENTIFICATION

### 2.1 Credential Theft Detection Indicators
| Indicator | Technique | Detection Source |
|-----------|-----------|-----------------|
| LSASS.exe accessed by non-system process | T1003.001 LSASS Dumping | EDR (Sysmon Event 10) |
| SAM registry hive accessed | T1003.002 SAM Dump | EDR, Registry monitoring |
| Volume Shadow Copy of NTDS.dit | T1003.003 NTDS | EDR, Windows Event Log |
| Excessive Kerberos TGS requests | T1558.003 Kerberoasting | AD Event 4769 |
| AS-REP Roasting attempts | T1558.004 AS-REP | AD Event 4768 (no pre-auth) |
| Password spraying (low-and-slow) | T1110.003 Password Spray | AD Event 4625 pattern |
| Credential dumping tools (Mimikatz, SecretsDump) | T1003 | EDR detection |
| Unusual privileged account logon | Post-theft lateral movement | AD Events 4624/4648 |
| New logon from unusual location/time | Stolen credential in use | SIEM correlation |

### 2.2 Scope Determination — Critical Questions
1. **What credential dumping technique was used?**
   - LSASS dump = all credentials cached in memory at time of dump (could be many)
   - SAM dump = local account hashes for that host
   - NTDS.dit = entire domain credential database (highest severity — every domain account)
   - Kerberoasting = service account hashes (require offline cracking before usable)

2. **What accounts were harvested?**
   - Identify all accounts with active sessions on the affected host at time of dump
   - Identify service accounts running on the affected host
   - If NTDS.dit stolen — assume ALL domain accounts

3. **Have stolen credentials been used?**
   - Search authentication logs for anomalous logon activity from harvested accounts
   - Look for logons from new systems, off-hours, or to systems not normally accessed

4. **What can the stolen credentials access?**
   - Map each compromised credential to every system it has access to
   - This defines the blast radius

### 2.3 Severity Classification
| Scope | Category |
|-------|----------|
| Domain admin or NTDS.dit stolen | CAT I |
| DC or krbtgt account credential | CAT I |
| Service account with domain admin access | CAT I |
| Multiple privileged account compromise | CAT I |
| Single admin account stolen | CAT II |
| Standard user credentials stolen | CAT III |

---

## STEP 3: CONTAINMENT

### 3.1 Containment Priorities (Simultaneous Actions)
```
Priority 1: Disable all confirmed compromised accounts
Priority 2: Force active session termination for those accounts
Priority 3: Block identified adversary access paths
Priority 4: Isolate host(s) where credential dump occurred
Priority 5: Protect unaffected privileged accounts (increase monitoring)
```

### 3.2 Account Containment
- [ ] **Disable compromised accounts** — Remove from all groups / lock the account
- [ ] **Force Kerberos ticket expiration** — Purge TGTs to invalidate existing sessions
- [ ] **Reset privileged service accounts** — Any service accounts potentially exposed
- [ ] **Isolate affected host(s)** — EDR isolation on host where credential dump occurred
- [ ] **Block anomalous logon activity** — If credential already in use, block the session

### 3.3 Domain-Level Containment (If AD/DC Affected)
If any domain controller was accessed or NTDS.dit may have been stolen:
- [ ] Notify Mission OIC immediately — this is CAT I
- [ ] Treat ALL domain credentials as potentially compromised
- [ ] Plan for domain-wide credential rotation (coordinate timing with IT ops)
- [ ] Consider krbtgt account rotation (disrupts all active Kerberos sessions — plan impact)

### 3.4 Service Account Containment — Coordination Required
Service account resets can break applications. Before resetting service accounts:
- [ ] Identify every application/service using the account
- [ ] Coordinate with System Owner / IT Ops for maintenance window
- [ ] Prepare rollback plan (if reset breaks critical service)
- [ ] Mission OIC authorization for resets that may impact operations

---

## STEP 4: ERADICATION

### 4.1 Credential Rotation (Primary Eradication Action)
All compromised credentials MUST be rotated. Partial rotation leaves adversary access.

**Rotation order:**
1. Domain krbtgt account (if Kerberos compromise suspected — rotate twice, 10 hours apart)
2. Domain Admin accounts
3. All other privileged accounts (local admin, service accounts)
4. Standard user accounts in scope
5. Application credentials (API keys, certificates, passwords in config files)

### 4.2 Credential Theft Tool Removal
- Remove credential dumping tools (Mimikatz, procdump used for LSASS, etc.)
- Remove persistence installed by attacker to maintain credential access
- Remove keyloggers or form-grabbers if input capture was used

### 4.3 Authentication Infrastructure Hardening
Post-theft hardening:
- [ ] Enable Windows Credential Guard (prevents LSASS credential extraction)
- [ ] Restrict NTLM authentication (reduce pass-the-hash risk)
- [ ] Disable WDigest authentication (prevents cleartext credential caching)
- [ ] Enable Protected Users security group for privileged accounts
- [ ] Enable Kerberos AES encryption
- [ ] Restrict access to NTDS.dit (shadow copy, backup media)

### 4.4 Kerberos-Specific Eradication
If Golden Ticket or Silver Ticket compromise suspected:
- [ ] Reset krbtgt password **twice** (10 hours apart per Microsoft guidance)
- [ ] All existing Kerberos tickets invalidated after second reset
- [ ] Monitor for continued ticket usage after reset (indicates additional persistence)
- [ ] Audit all service accounts for SPN configurations (Kerberoasting remediation)

---

## STEP 5: RECOVERY

### 5.1 Account Recovery
After credential rotation:
- [ ] Restore disabled accounts with new credentials
- [ ] Reconfigure service accounts in affected applications (coordinated with IT ops)
- [ ] Re-establish application connectivity dependent on service accounts
- [ ] Validate user access restored correctly (access to required systems, not more)

### 5.2 Privileged Access Hardening
Use the recovery phase to implement improvements:
- Deploy or enforce MFA on all privileged accounts
- Implement or enforce PAW/jump server requirement for admin access
- Review and enforce tiered admin model
- Remove unnecessary privileged access

### 5.3 Enhanced Authentication Monitoring
For 90 days post-recovery:
- Alert on any anomalous logon for all rotated credentials
- Monitor for repeated authentication failures (credential testing)
- Alert on any privileged account logon to non-admin systems
- Monitor for Kerberoasting patterns (remains a risk if not mitigated architecturally)

---

## STEP 6: POST-INCIDENT ANALYSIS

### 6.1 Credential Theft Timeline
```
[DATE/TIME] Initial access (host compromised)
[DATE/TIME] Privilege escalation (attacker gained admin/SYSTEM)
[DATE/TIME] Credential dump executed
[DATE/TIME] Credentials used (first anomalous logon with stolen credentials)
[DATE/TIME] Detection
[DATE/TIME] Account(s) disabled
[DATE/TIME] Credential rotation complete
Dwell time before detection: [N days]
Use of stolen credentials window: [N hours/days]
Systems accessed with stolen credentials: [list]
```

### 6.2 Blast Radius Assessment
For every stolen credential:
- What systems could it access?
- What data was accessible?
- Was it actually used? (Evidence of access)
- What is the data exposure risk? (PII, sensitive data, mission data)

This assessment informs whether a **data breach notification** is required.

### 6.3 Architecture Recommendations
- Credential dumping root cause: Why was LSASS accessible / Why was NTDS.dit accessible?
- Why did the attacker have an account on the affected system with dump capability?
- What would have stopped the dump (Credential Guard, Protected Users, EDR prevention)?
- How long until similar attacks are mitigated by architectural changes?

---

## STEP 7: COORDINATION & REPORTING

### 7.1 Reporting Timeline
| Event | Recipient | Deadline |
|-------|-----------|----------|
| CAT I credential theft | Mission OIC | Immediately |
| CAT I notification | ARCYBER | Within 1 hour |
| Blast radius assessment | Mission OIC | Within 4 hours |
| Data exposure notification | BN/BDE CDR (if sensitive data at risk) | Within 4 hours |
| Status updates | All above | Every 8 hours while active |
| Final incident report | ARCYBER + BN/BDE CDR | Within 72 hours of closure |

### 7.2 Data Breach Assessment
If stolen credentials provided access to sensitive data (PII, classified, CUI):
- Initiate data breach assessment procedure
- Legal / Privacy Officer notification
- May trigger additional reporting requirements beyond CJCSM 6510.01B

### 7.3 Incident Closure Criteria
- [ ] All compromised credentials identified and rotated
- [ ] Credential dumping tool removed
- [ ] All persistence mechanisms removed from affected hosts
- [ ] Authentication hardening applied
- [ ] Blast radius fully assessed
- [ ] Enhanced authentication monitoring active (90 days)
- [ ] Final report submitted
- [ ] Data breach assessment complete (if applicable)

---

## QUICK REFERENCE CARD

```
CREDENTIAL THEFT RESPONSE
──────────────────────────
1. IDENTIFY ALL COMPROMISED CREDENTIALS (full scope first)
2. DISABLE ALL COMPROMISED ACCOUNTS (simultaneously)
3. PURGE KERBEROS TICKETS (if domain/Kerberos compromise)
4. ISOLATE DUMP HOST (EDR isolation)
5. ROTATE ALL CREDENTIALS IN SCOPE (in priority order)
6. ASSESS BLAST RADIUS (what could they access?)

IF NTDS.DIT STOLEN:
→ TREAT ALL DOMAIN CREDENTIALS AS COMPROMISED
→ PLAN DOMAIN-WIDE ROTATION WITH IT OPS
→ DOUBLE krbtgt RESET (10 HOURS APART)
```

---

**Classification:** UNCLASSIFIED // FOUO
**Playbook ID:** IR-PB-006 | Credential Theft Response
**Prepared By:** CyberOpsPlanner System
**Date:** 2026-02-25
**Related Playbooks:** IR-PB-005 (Lateral Movement), IR-PB-009 (Privilege Escalation), IR-PB-010 (Persistence)
**Technical Reference:** `docs/technical/SOP/(d) credential-theft-response-playbook.docx`
