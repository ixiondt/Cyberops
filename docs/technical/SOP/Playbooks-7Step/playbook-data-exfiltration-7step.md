# DATA EXFILTRATION RESPONSE — INCIDENT RESPONSE PLAYBOOK
## 7-Step Framework | UNCLASSIFIED // FOUO

**Playbook ID:** IR-PB-007
**Version:** 1.0
**Classification:** UNCLASSIFIED // FOUO
**Threat Type:** Data Exfiltration — Unauthorized Data Transfer to External Destination
**Primary Role:** 17C Network Analyst (Lead) + 17C Host Analyst (Support) + Cyber Ops Planner (Decision Support)
**Authority:** CJCSM 6510.01B | AR 25-2 | FM 3-12 | NIST SP 800-61 | DoD DLP Policy
**Created:** 2026-02-25
**Review Cycle:** Semi-annual or post-CAT I incident

**MITRE ATT&CK Primary Tactics:**
- T1048 — Exfiltration Over Alternative Protocol (DNS, ICMP, port 443 non-HTTPS)
- T1041 — Exfiltration Over C2 Channel (data staged and sent via established C2)
- T1567 — Exfiltration Over Web Service (cloud storage, paste sites, legitimate web services)
- T1052 — Exfiltration Over Physical Medium (USB, removable media)
- T1030 — Data Transfer Size Limits (small increments to avoid volume detection)
- T1029 — Scheduled Transfer (off-hours exfiltration to avoid notice)
- T1020 — Automated Exfiltration (scripted bulk data transfer)

---

## BLUF

Data exfiltration is the **mission-failure event** — it means the adversary has successfully stolen data. The response must simultaneously pursue **stopping further exfiltration**, **quantifying what was taken**, and **initiating data breach assessment**. Unlike other incidents, you cannot "eradicate" data that has already left the network. The focus shifts to stopping additional loss, assessing impact, and fulfilling notification obligations.

**Two critical questions that drive all actions:**
1. Is exfiltration still active? (Stop it)
2. What data was taken? (Assess and report)

---

## STEP 1: PREPARATION

### 1.1 Required Capabilities
| Capability | Purpose |
|-----------|---------|
| DLP (Data Loss Prevention) | Detect data movement before exfiltration |
| Full packet capture or proxy logs | Reconstruct exfiltration volume and content |
| Egress traffic monitoring (all ports) | Detect non-standard exfiltration paths |
| DNS logging (full query/response) | Detect DNS tunneling exfiltration |
| File access auditing | Determine what data was accessed before staging |
| Cloud storage monitoring | Detect uploads to cloud services (OneDrive, Dropbox, etc.) |
| Data classification inventory | Know what data lives where (prerequisite for impact assessment) |

### 1.2 Data Classification Inventory (Critical Pre-Incident Requirement)
- [ ] Critical data identified, documented, and labeled
- [ ] CUI / sensitive data locations mapped
- [ ] File access auditing enabled on critical data stores
- [ ] Data movement baselines documented (who moves what data, how much, when)
- [ ] Outbound data volume baseline per host established

### 1.3 Egress Architecture Review
- [ ] All external egress paths identified (web proxy, DNS, SMTP, FTP, cloud, VPN)
- [ ] Non-approved egress paths blocked or monitored
- [ ] Encrypted traffic inspection capability (SSL/TLS inspection at proxy)
- [ ] USB/removable media policy enforced and monitored

---

## STEP 2: DETECTION & IDENTIFICATION

### 2.1 Exfiltration Detection Indicators
| Indicator | Description | Detection Source |
|-----------|-------------|-----------------|
| Anomalous outbound volume | More data leaving than normal for host/time | NDR, SIEM, proxy |
| Data access before transfer | Large file access then outbound connection | EDR + proxy correlation |
| Upload to cloud storage (personal) | OneDrive, Dropbox, Google Drive, Mega.nz | Proxy logs, DLP |
| DNS query volume spike | Possible DNS tunneling | DNS logs |
| SMTP attachment volume anomaly | Large email attachments to external | Email gateway |
| Off-hours large data transfer | Scheduled exfiltration during low-staff periods | SIEM time-based correlation |
| Unusual destination (new external IP/domain) | Attacker-controlled staging server | Proxy, firewall logs |
| Compressed/encrypted archives created | Staging before exfiltration | EDR file monitoring |
| Removable media usage alert | USB insert on host with sensitive data | EDR, DLP |

### 2.2 Exfiltration Characterization
For each identified exfiltration event, determine:

1. **Source host(s)** — Which systems were data sent from?
2. **Source data** — What data was accessed and staged before transfer?
3. **Destination** — Where was the data sent? (IP, domain, cloud service, physical media)
4. **Volume** — How much data was transferred (estimate in GB/MB)?
5. **Method** — What protocol/mechanism? (HTTPS, DNS tunnel, USB, email, etc.)
6. **Time window** — When did exfiltration start? Is it still ongoing?
7. **Data classification** — What is the sensitivity of stolen data?

### 2.3 Exfil vs. Authorized Transfer — Differentiation
Before declaring exfiltration incident, rule out:
- Authorized cloud backup (verify with System Owner)
- Approved data transfer to partner/vendor
- Authorized telework/VPN data access
- IT operations activity (patch downloads, software updates)

If any ambiguity: treat as exfiltration until ruled out. False positive is preferable to missed exfiltration.

### 2.4 Severity Classification
| Scope | Category |
|-------|----------|
| CUI / sensitive unclassified data stolen | CAT I |
| Mission data / operational planning data stolen | CAT I |
| PII data stolen | CAT I (+ data breach notification process) |
| Large volume of data (>1 GB) from critical system | CAT I |
| Limited data, non-sensitive | CAT II |

---

## STEP 3: CONTAINMENT

### 3.1 Containment Goal
**Stop further exfiltration without destroying evidence of what was already taken.**

### 3.2 Immediate Actions
- [ ] **Block exfiltration destination** — Firewall block on identified external IP/domain
- [ ] **Block exfiltration protocol** (if non-standard) — e.g., block DNS to external resolvers if DNS tunneling
- [ ] **Isolate source host** — EDR isolation to prevent additional staging and transfer
- [ ] **Preserve evidence** — Network captures, proxy logs, EDR telemetry from exfiltration window
- [ ] **Notify Mission OIC** — CAT I, begin notification chain

### 3.3 Staged Data Containment
If attacker has data staged (collected but not yet exfiltrated):
- [ ] Identify staging locations (local host, internal file shares)
- [ ] Do not delete staged data before forensic documentation
- [ ] EDR quarantine on staging locations
- [ ] Monitor staging locations for access attempts

### 3.4 Full Egress Lockdown (If Ongoing Exfiltration)
If exfiltration is actively ongoing:
- [ ] Emergency egress restriction — allow only essential outbound traffic
- [ ] Block all unauthorized cloud storage services at proxy
- [ ] Disable removable media across segment (GPO) if physical exfiltration suspected
- [ ] Increase SMTP attachment inspection threshold

---

## STEP 4: ERADICATION

### 4.1 Eradication Goals for Exfiltration
Exfiltration eradication = close every path the attacker used to stage and exfil data.

1. **Remove exfiltration tools** (RAT, custom staging scripts, archive tools installed by attacker)
2. **Remove all persistence mechanisms** (attacker may remain for follow-on exfiltration)
3. **Close initial access vector**
4. **Remove data staging locations** (after forensic documentation)
5. **Rotate any credentials used to access the data** (attacker may have authentication path to the same data)

### 4.2 Exfiltration Path Eradication
Depending on exfiltration method:
- HTTP/S exfil: Block destination and any identified intermediate redirectors
- DNS exfil: Update DNS resolver policy, block external DNS, monitor for DGA domain changes
- Email exfil: Block identified external recipient, review and remove forwarding rules
- Cloud service exfil: Revoke any OAuth tokens, disable personal cloud service access
- Physical media: Determine if media was removed; document as potential ongoing exposure

### 4.3 Data Store Hardening
After eradication:
- [ ] Review and restrict access permissions on affected data stores
- [ ] Enable file auditing on all sensitive data stores (if not already active)
- [ ] Remove unauthorized access accounts from sensitive data
- [ ] Review and remove any unauthorized sharing or external access

---

## STEP 5: RECOVERY

### 5.1 System Restoration
Recovery for exfiltration-related systems:
- Rebuild compromised host(s)
- Restore from clean backup
- Harden data access controls before restoration

### 5.2 Data Loss Assessment (Most Critical Recovery Action)
This is a **business recovery / notification driver** — must be completed for all CAT I exfil.

For each identified stolen dataset:
```
DATA LOSS ASSESSMENT
| Dataset | Classification | Volume | Access Window | Destination | Notification Required? |
|---------|:--------------:|:------:|:-------------:|:-----------:|:---------------------:|
```

Determine for each:
- Is this data subject to mandatory breach notification? (PII, CUI, health data)
- Who must be notified? (Individuals affected / system owner / legal / HQ / law enforcement)
- What is the mission / operational impact of this data being in adversary hands?

### 5.3 DLP Enhancement
Post-incident DLP improvements:
- Update DLP policies to detect similar exfiltration patterns
- Block newly identified exfiltration destinations
- Implement content inspection on outbound data (if not already)
- Review and restrict data access to least-privilege

---

## STEP 6: POST-INCIDENT ANALYSIS

### 6.1 Exfiltration Timeline
```
[DATE/TIME] Initial access
[DATE/TIME] Internal reconnaissance (attacker locating data)
[DATE/TIME] Data access (files accessed / copied)
[DATE/TIME] Staging (data archived/encrypted for transfer)
[DATE/TIME] Exfiltration begins
[DATE/TIME] Exfiltration detection
[DATE/TIME] Exfiltration stopped
[DATE/TIME] Eradication complete
Total exfiltration window: [N hours/days]
Estimated total data volume: [MB/GB]
Data sensitivity: [classification levels]
Destinations: [list]
```

### 6.2 Intelligence Value of Exfiltrated Data
For mission planning context:
- What operational advantage does stolen data provide to adversary?
- Does stolen data affect OPSEC, future operations, or force protection?
- Does stolen data require countermeasures (e.g., plans changed, assets repositioned)?
- Coordinate with S-2 / G-2 for operational impact assessment

### 6.3 Detection Gap Analysis
- Was DLP deployed and functioning? If so, why didn't it alert?
- Was egress monitoring covering all paths?
- Was the exfiltration volume within normal ranges (blending in)?
- How much data was taken before detection?

---

## STEP 7: COORDINATION & REPORTING

### 7.1 Exfiltration Reporting (Additional Requirements Beyond Standard)
| Report | Recipient | Deadline |
|--------|-----------|----------|
| CAT I initial notification | Mission OIC | Immediately |
| ARCYBER notification | ARCYBER | Within 1 hour |
| Data breach preliminary notification | Legal / Privacy Officer | Within 4 hours (if PII/CUI) |
| Operational impact assessment | S-2 / G-2 | Within 24 hours (if mission data) |
| Full data loss assessment | Mission OIC + Legal | Within 72 hours |
| Final incident report | ARCYBER + BN/BDE CDR | Within 72 hours of closure |
| Individual notification (if PII) | Affected individuals | Per applicable law / regulation |

### 7.2 Data Breach Notification Process
If stolen data contains PII, CUI, or other regulated data categories:
1. Legal review of notification obligations
2. Privacy Officer notification
3. Determine notification population
4. Draft notification content (Legal review required)
5. Obtain approval through appropriate chain of command
6. Execute notification per legal timeline

### 7.3 Law Enforcement Coordination
For significant data theft (especially state actor, espionage context):
- FBI notification via ARCYBER channel
- CISA coordination (if critical infrastructure)
- Preserve all forensic evidence for potential prosecution

### 7.4 Incident Closure Criteria
- [ ] Exfiltration stopped (all identified paths blocked)
- [ ] Full data loss inventory documented
- [ ] Breach notification process completed (if applicable)
- [ ] Operational impact assessment completed
- [ ] Attacker access fully removed
- [ ] Data access controls hardened
- [ ] Enhanced egress monitoring active (90 days)
- [ ] Final report submitted and acknowledged
- [ ] Lessons learned incorporated

---

## QUICK REFERENCE CARD

```
DATA EXFILTRATION RESPONSE
───────────────────────────
1. IS EXFIL STILL ACTIVE? → Block destination, isolate source host
2. WHAT DATA WAS TAKEN? → Begin data loss assessment immediately
3. PRESERVE EVIDENCE → Proxy logs, PCAP, EDR telemetry from exfil window
4. NOTIFY OIC → CAT I, within 1 hour to ARCYBER
5. DATA BREACH CHECK → PII/CUI stolen = notification obligations

DATA ALREADY LEFT = YOU CANNOT UNDO IT.
STOP MORE FROM LEAVING, THEN ASSESS IMPACT.
```

---

**Classification:** UNCLASSIFIED // FOUO
**Playbook ID:** IR-PB-007 | Data Exfiltration Response
**Prepared By:** CyberOpsPlanner System
**Date:** 2026-02-25
**Related Playbooks:** IR-PB-004 (C2 Response — exfil often via C2 channel), IR-PB-003 (Ransomware — double extortion)
**Technical Reference:** `docs/technical/SOP/(d) data-exfil-response-playbook.docx`
