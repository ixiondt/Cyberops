# TASK ORGANIZATION & COMMAND STRUCTURE

**OP-DEFENDER: BPEnergy Defensive Cyberspace Operations Response Action**

**OPORD 26-02 - Annex A Summary**

---

## CLASSIFICATION & AUTHORITY

**Classification:** UNCLASSIFIED // FOUO

**Document ID:** OP-DEFENDER-ANNEX-A-TASK-ORG

**Date:** 2026-02-23

---

## COMMAND STRUCTURE (ORGANIZATIONAL CHART)

```
                    ┌─────────────────────────────────────┐
                    │   ARCYBER (Higher HQ)               │
                    │   Army Cyber Command                │
                    └────────────┬────────────────────────┘
                                 │
                    ┌────────────┴────────────┐
                    │                         │
        ┌───────────┴─────────┐   ┌──────────┴──────────┐
        │ CPB (Cyber Planning │   │ ARCYBER Operations  │
        │ Battalion)          │   │ (Oversight/Support) │
        │ LTC Jackson (CDR)   │   └─────────────────────┘
        └───────────┬─────────┘
                    │
        ┌───────────┴──────────────┐
        │                          │
    ┌───┴────┐          ┌─────────┴──────┐
    │  MOC   │          │  Support       │
    │ (24/7) │          │  Elements      │
    └───┬────┘          └────────────────┘
        │
        ├─── MAJ Manbear (Mission OIC) ─ Tactical Decisions
        ├─── MSG [Name] (NCOIC) ─ Personnel Management
        ├─── CPT [Name] (Battle Captain) ─ Operations Coordination
        ├─── Watch NCOs (2-3) ─ 24/7 Monitoring
        ├─── S-2 Analyst ─ Threat Intelligence
        ├─── S-3 Operations NCO ─ Planning & Coordination
        ├─── Communications Tech ─ Network Access
        └─── BPEnergy LNO ─ Customer Coordination
```

---

## TASK ORGANIZATION SUMMARY

### COMMAND STRUCTURE

**Battalion Commander:** LTC Jackson
- Role: Overall operation commander
- Authority: Approves COA selection, major operational decisions
- Communications: Daily briefings from MAJ Manbear

**Mission OIC:** MAJ Manbear
- Role: On-site operational commander
- Authority: Daily tactical decisions, Phase authorization
- Communications: Direct to Battalion Commander; ARCYBER daily

**S-3 (Operations Officer):** [Name] / CPB Operations
- Role: Planning and coordination
- Authority: Operational procedure development, resource coordination
- Communications: S-3 Operations NCO coordination

**S-2 (Intelligence Officer):** [Name] / MOC
- Role: Threat analysis and intelligence
- Authority: Intelligence assessment, MITRE ATT&CK mapping
- Communications: Intelligence analyst support

---

### ELEMENT ORGANIZATION

#### **CPT 173: HOST FORENSICS ELEMENT**

**Element Lead:** MAJ Lounsbury (CPT 173 Lead)

**Mission:** Conduct forensic analysis, host system investigation, remediation execution

**Personnel:**
- Host Analysis Officer: [CPT/Senior NCO]
- Host Forensics Analysts: [2-3 NCOs/soldiers] (17C - Cyber Operations Specialist)
- System Administrator: [1 NCO] (25B or equivalent)

**Assigned POAMs:**
- POAM-001: lockfile Investigation (Primary Responsibility)
  - Milestone 1: Forensic Collection (Lead)
  - Milestone 2: Malware Family ID (Support to CPT 174)
  - Milestone 3: Scope Assessment (Primary)
  - Milestone 4: Attribution (Support to S-2)

- POAM-002: lockfile Remediation (Primary Responsibility)
  - Phase 1: Pre-Remediation Planning (Support to S-3)
  - Phase 2: Containment & Forensics (Primary)
  - Phase 3: System Cleaning (Primary with BPEnergy SysAdmin)
  - Phase 4: Credential Reset (Support)
  - Phase 5: Detection Rules (Support to CPT 174)
  - Phase 6: Post-Remediation Monitoring (Primary)

**Key Responsibilities:**
- ✅ Forensic evidence collection and preservation
- ✅ File system analysis (timestamps, deleted files, artifacts)
- ✅ Registry analysis (persistence mechanisms, artifact location)
- ✅ Process telemetry collection (memory analysis if needed)
- ✅ Network log analysis (lateral movement detection)
- ✅ Malware removal and system cleaning
- ✅ Lateral movement system remediation
- ✅ Threat hunting during monitoring phase

**Work Schedule:** Intensive 24/7 during Phase I (36h); 12-hour rotating shifts Phase II; 20% effort Phase III

**Chain of Command:** MAJ Lounsbury (CPT 173 Lead) → MAJ Manbear (Mission OIC) → LTC Jackson (Battalion CDR)

---

#### **CPT 174: MALWARE ANALYSIS ELEMENT**

**Element Lead:** MAJ Othergal (CPT 174 Lead)

**Mission:** Malware family identification, reverse engineering, detection rule development

**Personnel:**
- Malware Analysis Officer: [CPT/Senior NCO]
- Malware Analysts: [1-2 NCOs] (17C - Cyber Operations Specialist)
- Reverse Engineer: [1 NCO/Soldier] (17C or software development background)

**Assigned POAMs:**
- POAM-001: lockfile Investigation (Support Role)
  - Milestone 2: Malware Family ID (Primary Responsibility)
  - Milestone 4: Threat Intelligence Attribution (Support to S-2)

- POAM-002: lockfile Remediation (Support Role)
  - Phase 5: Detection Rules Development (Primary Responsibility)
  - Phase 6: Rule Efficacy Monitoring (Primary)

**Key Responsibilities:**
- ✅ Dynamic analysis (Cuckoo Sandbox execution)
- ✅ Reverse engineering (Ghidra, IDA Pro disassembly)
- ✅ Malware family identification
- ✅ IOC extraction (C2 domains, file signatures, behavioral patterns)
- ✅ YARA rule creation
- ✅ Detection rule development (EDR, SIEM, NIDS)
- ✅ Rule testing and validation
- ✅ Detection rule deployment coordination

**Work Schedule:** 50% during Phase I (reverse engineering on-demand); 80% Phase II (detection rules intensive); 10% Phase III (monitoring/tuning)

**Chain of Command:** MAJ Othergal (CPT 174 Lead) → MAJ Manbear (Mission OIC) → LTC Jackson (Battalion CDR)

---

#### **MOC (MISSION OPERATIONS CENTER): 24/7 OPERATIONS CENTER**

**MOC OIC:** MAJ Manbear (Mission OIC)

**NCOIC:** MSG [Name] (Senior Enlisted Advisor)

**Mission:** Maintain 24/7 operational capability, coordinate all elements, interface with higher HQ and supported organization

**Personnel & Shift Structure:**
- Battle Captain (CPT [Name]) - Operations coordination & decision support
- Watch NCO #1 (E-6 or E-7) - Primary shift watches (0800-2000)
- Watch NCO #2 (E-6 or E-7) - Secondary shift watches (2000-0800)
- Watch NCO #3 (E-5 or E-6) - Backup/relief rotation
- S-2 Analyst (attached) - Threat intelligence support
- S-3 Operations NCO (attached) - Planning & coordination
- Communications Tech - Network access management
- BPEnergy LNO (BPEnergy personnel) - Customer coordination

**Key Responsibilities:**
- ✅ Monitor all operations 24/7
- ✅ Escalate critical findings to MAJ Manbear
- ✅ Coordinate tasking between CPT 173 and CPT 174
- ✅ Maintain SITREP and daily briefing preparation
- ✅ Interface with ARCYBER Ops and BPEnergy CIO
- ✅ Manage MOC physical space and equipment
- ✅ Document all decisions and actions
- ✅ Activate Incident Response Playbooks if needed

**Work Schedule:** 24/7 operation; rotating 12-hour shifts

**Chain of Command:** MAJ Manbear (MOC OIC/Mission OIC) → LTC Jackson (Battalion CDR)

---

### SUPPORTING ELEMENTS

#### **S-2 INTELLIGENCE SECTION**

**S-2 Officer:** [Name] / Battalion Staff (detached to MOC as needed)

**S-2 Analyst:** [Name] / MOC (primary intelligence support)

**Mission:** Threat analysis, intelligence assessment, MITRE ATT&CK mapping

**Assigned Responsibilities:**
- ✅ Threat actor (APT41) analysis and assessment
- ✅ MITRE ATT&CK technique mapping
- ✅ IOC correlation against threat intelligence databases
- ✅ Attribution confidence assessment
- ✅ PIR/RFI tracking and coordination
- ✅ Threat intelligence reporting to ARCYBER

**Work Schedule:** 50% Phase I (analysis); 30% Phase II (intelligence); 20% Phase III (monitoring)

**Chain of Command:** S-2 Officer (Battalion Staff) → Battalion S-3 → Battalion Commander

---

#### **S-3 OPERATIONS SECTION**

**S-3 Officer:** [Name] / Battalion Operations (detached to MOC as needed)

**S-3 Operations NCO:** [Name] / MOC (primary operations coordination)

**Mission:** Operations planning, resource coordination, POAM management

**Assigned Responsibilities:**
- ✅ POAM development and tracking (POAM-001, POAM-002)
- ✅ Remediation procedure development (Phase II planning)
- ✅ Resource allocation and personnel scheduling
- ✅ BPEnergy coordination for maintenance windows
- ✅ Change control and approval management
- ✅ Decision briefing preparation
- ✅ SITREP preparation for ARCYBER and BPEnergy

**Work Schedule:** 25% Phase I (planning); 50% Phase II (remediation coordination); 10% Phase III (monitoring)

**Chain of Command:** S-3 Officer (Battalion Operations) → Battalion Commander

---

### EXTERNAL SUPPORTING ELEMENTS

#### **ARCYBER (Higher HQ)**

**Role:** Higher HQ oversight, escalation authority, external support

**Responsibilities:**
- ✅ Daily SITREP receipt and situation awareness
- ✅ Authorization for actions outside delegated authority
- ✅ Escalation support (FBI/CISA notification if needed)
- ✅ External malware analysis support (if lab support needed)
- ✅ Threat intelligence database access and correlation
- ✅ Final approval on operation completion

**Interface:** Daily communication with MAJ Manbear (Mission OIC)

---

#### **BPEnergy (SUPPORTED ORGANIZATION)**

**BPEnergy Point of Contact:** [Name/Title] / BPEnergy CIO

**BPEnergy Support Team:** IT, OT, Manufacturing, Security Leadership

**Responsibilities:**
- ✅ System access and credentials for forensic team
- ✅ Network environment information and documentation
- ✅ Maintenance window scheduling for dc2 and affected systems
- ✅ Coordination with OT/Manufacturing for OT system impact
- ✅ IT personnel support during remediation phase
- ✅ User notification and credential reset execution
- ✅ Production system safeguards and contingency planning

**Interface:** BPEnergy LNO in MOC; direct coordination with S-3 Operations

---

#### **LAW ENFORCEMENT LIAISON (TBD)**

**Role:** Potential FBI/CISA coordination (activated if data exfiltration confirmed)

**Responsibilities:**
- ✅ Evidence preservation procedures (DOJ compliance)
- ✅ Incident notification and coordination
- ✅ Joint investigation support
- ✅ Prosecution support (if applicable)

**Interface:** Through ARCYBER (no direct contact unless pre-coordinated)

---

## TASK MATRIX

### PHASE I: INVESTIGATION (36 Hours)

| Task | Responsible | Support | Duration | Completion Target |
|------|-------------|---------|----------|------------------|
| Forensic Collection | CPT 173 | MOC | 12h | 2026-02-23 12:00 UTC |
| Initial IOC Extraction | CPT 173 | CPT 174 | 6h | 2026-02-23 14:00 UTC |
| VirusTotal Submission | CPT 174 | CPT 173 | 2h | 2026-02-23 16:00 UTC |
| YARA Scanning | CPT 174 | CPT 173 | 4h | 2026-02-23 18:00 UTC |
| Preliminary Analysis | CPT 173 | CPT 174 | 8h | 2026-02-24 02:00 UTC |
| Malware Family ID | CPT 174 | CPT 173 | 12h | 2026-02-24 06:00 UTC |
| Timeline Analysis | CPT 173 | CPT 174 | 8h | 2026-02-24 12:00 UTC |
| Lateral Movement Analysis | CPT 173 | Network team | 12h | 2026-02-24 18:00 UTC |
| Intelligence Assessment | S-2 | CPT 173/174 | 8h | 2026-02-24 18:00 UTC |

---

### PHASE II: REMEDIATION (6 Days)

| Task | Responsible | Support | Duration | Completion Target |
|------|-------------|---------|----------|------------------|
| Remediation Procedure Development | S-3 | CPT 173/174 | 6h | 2026-02-24 18:00 UTC |
| Maintenance Window Coordination | S-3 | BPEnergy IT | 6h | 2026-02-25 06:00 UTC |
| Forensic Preservation | CPT 173 | MOC | 12h | 2026-02-25 06:00 UTC |
| System Cleaning | CPT 173 | BPEnergy SysAdmin | 36h | 2026-02-26 18:00 UTC |
| System Verification | CPT 173 | CPT 174 | 12h | 2026-02-27 06:00 UTC |
| Credential Reset | S-3 | BPEnergy Identity | 24h | 2026-02-27 06:00 UTC |
| Detection Rule Development | CPT 174 | S-2/CPT 173 | 48h | 2026-02-28 12:00 UTC |
| Detection Rule Testing | CPT 174 | MOC | 24h | 2026-02-29 12:00 UTC |
| Detection Rule Deployment | CPT 174 | MOC/BPEnergy | 12h | 2026-03-02 18:00 UTC |

---

### PHASE III: MONITORING (30 Days)

| Task | Responsible | Support | Frequency | Duration |
|------|-------------|---------|-----------|----------|
| Daily Alert Review | MOC Watch | CPT 173/S-2 | Daily | 2026-03-02 18:00 - 2026-04-02 18:00 |
| Weekly Threat Hunting | CPT 173 | S-2 | Weekly | Thu 1600 UTC |
| Rule Efficacy Assessment | CPT 174 | MOC | Weekly | Weekly |
| SITREP Preparation | S-3 | MOC | Daily | 1600 UTC |
| External Threat Intel Review | S-2 | ARCYBER | Weekly | Weekly |

---

## COMMUNICATIONS MATRIX

### Daily Reporting

| Report | Sender | Recipient | Time | Frequency |
|--------|--------|-----------|------|-----------|
| SITREP | MAJ Manbear | ARCYBER Ops | 1600 UTC | Daily |
| SITREP | MAJ Manbear | BPEnergy CIO | 1600 UTC | Daily |
| Incident Report | MOC | ARCYBER | Within 1h | As needed |
| Decision Brief | S-3 | Battalion CDR | 1200 UTC | Daily (Phase I-II) |

### Chain of Escalation

**Watch NCO detects critical event → Battle Captain → MAJ Manbear (Mission OIC) → LTC Jackson (Battalion CDR) → ARCYBER**

---

## PERSONNEL ROSTER

| Position | Name | Rank | Unit | Role |
|----------|------|------|------|------|
| Battalion Commander | [TBD] | LTC | CPB | Command |
| Mission OIC | [TBD] | MAJ | CPB | Tactical Decisions |
| CPT 173 Lead | [TBD] | MAJ | CPB | Host Forensics |
| CPT 174 Lead | [TBD] | MAJ | CPB | Malware Analysis |
| MOC NCOIC | [TBD] | MSG | CPB | Personnel Mgmt |
| Battle Captain | [TBD] | CPT | CPB | Ops Coordination |
| Host Analyst #1 | [TBD] | NCO | CPT 173 | Forensics |
| Host Analyst #2 | [TBD] | NCO | CPT 173 | Forensics |
| Malware Analyst | [TBD] | NCO | CPT 174 | Analysis |
| Reverse Engineer | [TBD] | NCO | CPT 174 | Reverse Eng |
| S-2 Analyst | [TBD] | NCO/Soldier | MOC | Intelligence |
| S-3 Operations | [TBD] | NCO | MOC | Planning |
| Watch NCO #1 | [TBD] | NCO | MOC | Monitoring |
| Watch NCO #2 | [TBD] | NCO | MOC | Monitoring |
| Communications | [TBD] | Soldier | MOC | Network Access |
| BPEnergy LNO | [BPEnergy] | Civilian | BPEnergy | Coordination |

---

## KEY PERSONNEL CONTACT INFORMATION

| Role | Name | Phone | Email | Secure Comms |
|------|------|-------|-------|-------------|
| Battalion Commander | [TBD] | DSN: XXX | [email] | Secure Phone |
| Mission OIC | [TBD] | DSN: XXX | [email] | Secure Phone |
| MOC NCOIC | [TBD] | DSN: XXX | [email] | Secure Phone |
| BPEnergy CIO | [TBD] | Commercial | [email] | Commercial Phone |
| ARCYBER Ops | [TBD] | DSN: XXX | [email] | Secure Phone |

---

## AUTHORITIES & RESPONSIBILITIES

### Battalion Commander (LTC Jackson)
**Authority:**
- Approve COA selection
- Approve escalation to ARCYBER for external support
- Final approval on operation completion

**Responsibilities:**
- Ensure mission accomplishment
- Maintain ARCYBER situational awareness
- Strategic decisions beyond MAJ Manbear's delegation

### Mission OIC (MAJ Manbear)
**Authority:**
- Daily tactical decisions within delegated authority
- Phase authorization upon completion criteria met
- Escalation to Battalion Commander for decisions outside authority

**Responsibilities:**
- Ensure timely investigation and remediation
- Personnel coordination and task assignment
- Daily reporting to Battalion Commander and ARCYBER
- Risk management and contingency activation

### Element Leads (MAJ Lounsbury, MAJ Othergal)
**Authority:**
- Task assignment within their element
- Procedure development for their domain
- Resource prioritization within element

**Responsibilities:**
- Element mission accomplishment
- Personnel management and scheduling
- Coordination with other elements
- Escalation of issues to Mission OIC

---

## REVISION HISTORY

| Date | Updated By | Change |
|------|-----------|--------|
| 2026-02-23 | CyberOpsPlanner | Initial creation |
| | | |

---

**Classification:** UNCLASSIFIED // FOUO

**Prepared by:** CyberOpsPlanner / CPB Operations

**Date:** 2026-02-23

**STATUS: APPROVED FOR DISTRIBUTION**
