# INCIDENT RESPONSE — 7-STEP FRAMEWORK OVERVIEW
## CyberOpsPlanner | CPT / CSSP / DCO-RA Operations

**Classification:** UNCLASSIFIED // FOUO
**Version:** 1.0
**Effective Date:** 2026-02-25
**Authority:** CJCSM 6510.01B | NIST SP 800-61r2 | AR 25-2 | FM 3-12
**Owner:** Cyber Operations Planner / Mission OIC
**Review Cycle:** Semi-annual or after any Category I/II incident

---

## 1. PURPOSE

This document defines the **7-Step Incident Response Framework** used across all CyberOpsPlanner threat-specific playbooks. Every playbook in the `Playbooks-7Step/` library follows this structure to ensure consistent, doctrine-compliant incident handling across all threat scenarios.

**BLUF:** All incidents — regardless of threat type — move through seven phases. Knowing which phase you are in tells you what decisions are required, who holds authority, and what products must be produced.

---

## 2. DOCTRINAL BASIS

| Reference | Relevance |
|-----------|-----------|
| CJCSM 6510.01B | DoD Cyber Incident Handling Program — defines incident categories, reporting timeline, and coordination |
| NIST SP 800-61r2 | Computer Security Incident Handling Guide — lifecycle framework (Preparation, Detection/Analysis, Containment/Eradication/Recovery, Post-Incident) |
| FM 3-12 | Army Cyberspace Operations — DODIN Ops, DCO, OCO integration |
| ATP 3-12.3 | Cyberspace Operations Techniques — response procedures |
| AR 25-2 | Army Cybersecurity Policy — mandatory reporting, authority chain |
| ADP 5-0 | The Operations Process — MDMP integration, decision gates |

---

## 3. THE 7-STEP FRAMEWORK

```
┌─────────────────────────────────────────────────────────────────┐
│  STEP 1        STEP 2         STEP 3        STEP 4              │
│  PREPARATION → DETECTION  →  CONTAINMENT → ERADICATION         │
│                IDENTIFICATION                                    │
│                                                                  │
│                              STEP 5        STEP 6    STEP 7     │
│                              RECOVERY  →  POST-    → COORD &    │
│                                           INCIDENT   REPORTING  │
│                                           ANALYSIS              │
└─────────────────────────────────────────────────────────────────┘
```

### STEP 1: PREPARATION
**Purpose:** Establish the capability, authority, tools, and baseline data required before incidents occur. Preparation is a continuous activity, not a one-time event.

**Key Outputs:**
- Validated tool inventory (EDR, SIEM, NIDS, packet capture, forensic)
- Documented authorities (Title 10/32, CCDR, ARCYBER tasking orders)
- Team composition with role assignments
- Established baseline (network, host, user behavior)
- Tested communication and escalation channels (PACE plan)
- Current playbook library (this folder)

**Decision Authority:** Mission OIC / Element Lead
**Primary Owner:** Cyber Operations Planner
**MDMP Link:** Step 3 (COA Development) — Response Posture Planning

---

### STEP 2: DETECTION & IDENTIFICATION
**Purpose:** Detect the incident, triage the initial alert, confirm it is a true positive, classify the threat type, and estimate scope before any response action.

**Key Outputs:**
- Confirmed incident (true positive determination)
- Threat classification (malware / C2 / lateral movement / exfil / DoS / privilege escalation / persistence)
- Affected system inventory (initial scope)
- Severity rating (CAT I–IV per CJCSM 6510.01B)
- Initial notification to Mission OIC
- Applicable playbook selected

**Decision Authority:** Detecting Analyst → Element Lead → Mission OIC (if CAT I/II)
**Primary Owners:** 17C Host Analyst, 17C Network Analyst
**MDMP Link:** Step 2 (Mission Analysis) — PIR/RFI confirmation

**CJCSM 6510.01B Incident Categories:**
| Category | Description | Reporting Deadline |
|----------|-------------|-------------------|
| CAT I | Root level/Admin compromise | 1 hour to ARCYBER |
| CAT II | User level compromise | 8 hours to ARCYBER |
| CAT III | Unsuccessful attempt / Denial of Service | 24 hours |
| CAT IV | Reconnaissance / Scanning | 72 hours |

---

### STEP 3: CONTAINMENT
**Purpose:** Stop the spread and limit damage without destroying forensic evidence. Containment has two sub-phases: short-term (immediate stabilization) and long-term (sustained isolation until eradication is complete).

**Key Outputs:**
- Affected systems isolated (short-term containment)
- Network segmentation applied (long-term containment)
- Credentials invalidated (if credential compromise suspected)
- Forensic image taken before any remediation
- Backup systems/failover activated as needed
- Containment actions log (who/what/when/why)

**Decision Authority:** Mission OIC (system isolation) / BN/BDE Commander (if mission impact)
**Primary Owners:** 17C Host Analyst (endpoint), 17C Network Analyst (network)
**MDMP Link:** Step 4 (COA Wargame) — friction points, decision points, branch triggers

**Critical Rule:** Do NOT begin eradication until forensic preservation is complete and scope is determined. Premature cleanup destroys evidence and misses attacker persistence.

---

### STEP 4: ERADICATION
**Purpose:** Remove the threat — all malicious artifacts, persistence mechanisms, attacker footholds, and compromised credentials — from the environment.

**Key Outputs:**
- All malicious files, scripts, and tools removed
- Persistence mechanisms eliminated (scheduled tasks, registry keys, services, WMI subscriptions)
- Backdoors closed and unauthorized accounts disabled
- Compromised credentials rotated
- Vulnerability that enabled initial access patched or mitigated
- Eradication validation (rescan confirms clean state)

**Decision Authority:** Mission OIC (with System Owner coordination for production changes)
**Primary Owners:** 17C Host Analyst, Network Analyst (if network-level eradication required)
**MDMP Link:** Step 5 (COA Comparison) — resource requirements, risk acceptance

**Critical Rule:** Validate eradication on ALL systems in the affected scope. Partial eradication results in re-infection or continued attacker access.

---

### STEP 5: RECOVERY
**Purpose:** Restore systems to normal operations, verify they are operating correctly and securely, and apply enhanced monitoring during the recovery window.

**Key Outputs:**
- Systems restored from verified clean backups or rebuilt
- Security hardening applied (patches, config changes)
- Enhanced monitoring in place (30-day minimum)
- Functional testing completed (system operates as intended)
- System Owner sign-off on restoration
- Recovery actions log

**Decision Authority:** Mission OIC + System Owner (joint sign-off for production systems)
**Primary Owners:** System Owner / IT Ops (with CPT oversight)
**MDMP Link:** Step 6 (COA Approval) — recovery as prerequisite for mission resumption

**Critical Rule:** Monitor restored systems at elevated sensitivity for minimum 30 days post-recovery. Attackers frequently return to previously compromised environments.

---

### STEP 6: POST-INCIDENT ANALYSIS
**Purpose:** Reconstruct the complete incident timeline, determine root cause, document lessons learned, and update playbooks, detection rules, and COAs.

**Key Outputs:**
- Complete incident timeline (initial access → detection → containment → eradication)
- Root cause analysis (what vulnerability/gap enabled the incident)
- MITRE ATT&CK technique mapping (complete TTP inventory)
- Lessons learned document
- After Action Review (AAR) brief for leadership
- Updated detection rules / SIEM signatures
- Updated playbook recommendations
- POA&M updates (if new findings require remediation tracking)

**Decision Authority:** Element Lead / Mission OIC (AAR brief)
**Primary Owners:** Cyber Operations Planner (coordinates), all analysts (contribute)
**MDMP Link:** Step 1 next cycle (Receipt of Mission) — feeds updated running estimates

---

### STEP 7: COORDINATION & REPORTING
**Purpose:** Ensure all required notifications are made, all mandatory reports are submitted on time, and all HQ products are generated throughout the incident lifecycle.

**Key Outputs:**
- Initial notification (per CJCSM 6510.01B timeline)
- Incident reports (initial, interim, final)
- MOC/COP updates
- ARCYBER / Higher HQ notification
- System owner coordination
- Legal/IA coordination (if warranted)
- Final incident report (closed)

**Decision Authority:** Mission OIC (all external reporting)
**Primary Owner:** Cyber Operations Planner (coordinates reporting products)
**MDMP Link:** All steps — reporting runs in parallel throughout the incident lifecycle

**Note:** Step 7 is NOT a final step — it runs in parallel with Steps 2–6. The reporting timeline begins at detection.

---

## 4. STEP-TO-ROLE MATRIX

| Step | Cyber Ops Planner | 17C Host Analyst | 17C Network Analyst |
|------|:-----------------:|:----------------:|:-------------------:|
| 1. Preparation | LEAD | Contribute | Contribute |
| 2. Detection & ID | Coordinate | LEAD (host) | LEAD (network) |
| 3. Containment | Decision support | LEAD (host) | LEAD (network) |
| 4. Eradication | COA development | LEAD (host) | Support |
| 5. Recovery | Coordinate | Support | Support |
| 6. Post-Incident Analysis | LEAD | Contribute | Contribute |
| 7. Coordination & Reporting | LEAD | Contribute | Contribute |

---

## 5. DECISION AUTHORITY MATRIX

| Action | Analyst | Element Lead | Mission OIC | BN/BDE CDR | Higher HQ |
|--------|:-------:|:------------:|:-----------:|:----------:|:---------:|
| Begin investigation | ✓ | | | | |
| Short-term containment (single system) | ✓ | | | | |
| Long-term containment (production system) | | ✓ | | | |
| Isolate mission-critical system | | | ✓ | | |
| Isolate infrastructure with mission impact | | | | ✓ | |
| Submit CAT I/II report to ARCYBER | | | ✓ | | |
| DCO-RA response actions | | | ✓ | Notify | Notify |
| Credential reset (non-privileged) | ✓ | | | | |
| Credential reset (privileged / service accounts) | | ✓ | | | |
| Domain-wide credential reset | | | ✓ | Notify | |
| Eradication actions (non-production) | ✓ | | | | |
| Eradication actions (production) | | | ✓ | | |
| System rebuild | | | ✓ | Notify | |
| AAR brief to leadership | | | ✓ | | |
| Update doctrine / SOP | | | ✓ | | |

---

## 6. PLAYBOOK LIBRARY INDEX

### 6.1 Reactive Threat Playbooks (IR-PB-001 through IR-PB-010)

| ID | Playbook | File | Primary Role | Primary Steps |
|----|----------|------|:------------:|:-------------:|
| PB-001 | Malware Triage | `playbook-malware-triage-7step.md` | Host Analyst | 2, 3 |
| PB-002 | Malware Outbreak | `playbook-malware-outbreak-7step.md` | Host Analyst | 3, 4 |
| PB-003 | Ransomware Response | `playbook-ransomware-7step.md` | Host Analyst + IC | 3, 4, 5 |
| PB-004 | Command & Control Response | `playbook-c2-response-7step.md` | Network Analyst | 2, 3 |
| PB-005 | Lateral Movement Response | `playbook-lateral-movement-7step.md` | Network Analyst | 2, 3 |
| PB-006 | Credential Theft Response | `playbook-credential-theft-7step.md` | Host Analyst | 3, 4 |
| PB-007 | Data Exfiltration Response | `playbook-data-exfiltration-7step.md` | Network Analyst | 3, 4 |
| PB-008 | Denial of Service Response | `playbook-denial-of-service-7step.md` | Network Analyst | 3 |
| PB-009 | Privilege Escalation Response | `playbook-privilege-escalation-7step.md` | Host Analyst | 2, 3 |
| PB-010 | Persistence Response | `playbook-persistence-7step.md` | Host Analyst | 2, 4 |

### 6.2 Expanded Threat Playbooks (IR-PB-011 through IR-PB-015)

| ID | Playbook | File | Primary Role | Primary Steps |
|----|----------|------|:------------:|:-------------:|
| PB-011 | Phishing & Initial Access via Email | `playbook-phishing-response-7step.md` | Host Analyst + Tier 1 SOC | 2, 3 |
| PB-012 | Insider Threat Response | `playbook-insider-threat-7step.md` | IC + Legal (Co-Lead) | 2, 3 |
| PB-013 | Web Application Attack Response | `playbook-web-application-attack-7step.md` | Network Analyst | 2, 3 |
| PB-014 | Cloud / SaaS Compromise Response | `playbook-cloud-saas-compromise-7step.md` | Network Analyst | 3, 4 |
| PB-015 | OT / ICS Incident Response | `playbook-ot-ics-incident-response-7step.md` | Network Analyst + Mission Owner | 2, 3 |

### 6.3 Supporting / Process Playbooks (IR-PB-016 through IR-PB-018)

| ID | Playbook | File | Primary Role | When to Use |
|----|----------|------|:------------:|-------------|
| PB-016 | Digital Forensics & Evidence Collection | `playbook-digital-forensics-evidence-collection-7step.md` | Host Analyst | Any incident requiring forensic collection |
| PB-017 | Threat Hunt | `playbook-threat-hunt-7step.md` | S-2 + Host/Net Analyst | Proactive — between incidents |
| PB-018 | Incident Commander Battle Rhythm | `playbook-incident-commander-battle-rhythm-7step.md` | Mission OIC / IC | Governs ALL incidents |

### 6.4 Reference Documents

| Document | File | Purpose |
|----------|------|---------|
| IR Team Entity Reference | `IR-Team-Entity-Reference.md` | Role definitions, authorities, full playbook ownership matrix |
| IR Framework Overview (this document) | `IR-Framework-7-Step-Overview.md` | Framework reference, step definitions, decision authority |

---

## 7. INTEGRATION WITH EXISTING PLAYBOOKS

The `.docx` playbooks in `docs/technical/SOP/` provide **detailed technical procedures** for each threat scenario. These 7-step markdown playbooks provide the **operational decision framework** that wraps those procedures.

**How to use both:**
1. Use this framework to determine **which phase you are in** and **who holds authority**
2. Use the threat-specific `.docx` playbook for **detailed technical steps** within each phase
3. Use the **Cyber Operations Planner** role for **COA development and staff coordination**
4. Use **17C roles** for **technical execution** within each step

---

## 8. CONTINUOUS IMPROVEMENT

After every incident (CAT I-III), update the applicable playbook with:
- [ ] New indicators added (Step 2)
- [ ] Containment procedure refinements (Step 3)
- [ ] Eradication procedure updates (Step 4)
- [ ] Detection rule changes (Step 2/6)
- [ ] Authority/coordination lessons (Step 7)
- [ ] Version number and date incremented

---

**Classification:** UNCLASSIFIED // FOUO
**Prepared By:** CyberOpsPlanner System
**Date:** 2026-02-25
**Next Review:** 2026-08-25
