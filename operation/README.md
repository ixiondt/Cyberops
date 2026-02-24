# Operations Folder Structure
**Organized Mission Products and Artifacts**

---

## Overview

This folder (`operation/`) contains all products, artifacts, and documentation for each cyber response operation. Each operation has its own subfolder containing:
- Planning products (estimates, COA analysis, annexes)
- Intelligence products (IPB, threat assessments, PIRs)
- Response/Execution products (incident reports, analysis, findings)
- POAMs and remediation tracking
- After-action reports and lessons learned

---

## Folder Structure

```
operation/
├── README.md (this file)
├── OPERATIONS_INDEX.md (master reference of all operations)
│
├── [OPERATION-NAME]/                    # One folder per operation
│   ├── README.md                        # Operation overview & quick reference
│   ├── OPERATION_METADATA.md            # Mission context, dates, personnel
│   │
│   ├── PLANNING/                        # Planning phase products
│   │   ├── Cyber_Running_Estimate.md
│   │   ├── Cyber_Staff_Estimate.md
│   │   ├── COA_Analysis_Wargame.md
│   │   └── [Other planning products]
│   │
│   ├── INTELLIGENCE/                    # Intelligence products
│   │   ├── IPB_Cyberspace_Terrain.md
│   │   ├── Threat_COA_Analysis.md
│   │   ├── PIR_RFI_Tracker.md
│   │   └── [Threat intelligence reports]
│   │
│   ├── OPERATIONS/                      # OPORD and supporting docs
│   │   ├── OPORD_Main.md
│   │   ├── Annex_M_Cyber.md
│   │   ├── Task_Organization.md
│   │   └── [Supporting orders]
│   │
│   ├── EXECUTION/                       # Response and incident docs
│   │   ├── Incident_Reports/
│   │   │   └── [Incident-001.md, Incident-002.md, ...]
│   │   ├── Host_Analysis/
│   │   │   └── [Analysis reports, findings]
│   │   ├── Network_Analysis/
│   │   │   └── [Traffic analysis, findings]
│   │   └── Threat_Intelligence/
│   │       └── [CTI assessments, IOCs]
│   │
│   ├── POAMs/                           # Remediation tracking
│   │   ├── POAM_Tracker.md
│   │   ├── [POAM-001.md, POAM-002.md, ...]
│   │   └── POAM_Log.md (status log)
│   │
│   ├── ASSESSMENT/                      # Post-operation assessment
│   │   ├── After_Action_Report.md
│   │   ├── Lessons_Learned.md
│   │   ├── Risk_Register.md
│   │   └── [Final assessments]
│   │
│   └── SUPPORTING_DOCS/                 # Reference materials
│       ├── [Maps, diagrams, schemas]
│       ├── [Evidence collections]
│       ├── [Threat intelligence reports]
│       └── [Other reference materials]
```

---

## Operation Naming Convention

**Format:** `[OPERATION-CODE]_[DESCRIPTION]_[DATE]`

**Examples:**
- `OP-GUARDIAN_DCO-RA_2026-02-23` — Defensive Cyber Operations - Response Action
- `OP-SENTINEL_HUNT_2026-02-20` — Hunt operation
- `OP-RAPID_IR_2026-02-24` — Incident Response
- `OP-PHANTOM_PLANNING_2026-02-15` — Planning operation

**Components:**
- **OPERATION-CODE:** Unique identifier (OP-GUARDIAN, OP-SENTINEL, etc.)
- **DESCRIPTION:** Mission type (DCO-RA, HUNT, IR, PLANNING, etc.)
- **DATE:** Operation start date (YYYY-MM-DD)

---

## Creating a New Operation Folder

### Step 1: Create Operation Directory
```
mkdir operation/OP-[NAME]_[TYPE]_[DATE]
cd operation/OP-[NAME]_[TYPE]_[DATE]
```

### Step 2: Create Subdirectories
```
mkdir PLANNING INTELLIGENCE OPERATIONS EXECUTION POAMs ASSESSMENT SUPPORTING_DOCS
mkdir EXECUTION/Incident_Reports EXECUTION/Host_Analysis EXECUTION/Network_Analysis EXECUTION/Threat_Intelligence
```

### Step 3: Copy Operation README Template
Use the template provided in this folder (see `OPERATION_TEMPLATE/` below)

### Step 4: Fill Operation Metadata
Complete `OPERATION_METADATA.md` with:
- Operation name, code, and dates
- Key personnel (Element Lead, Team Lead, OIC)
- Mission type and authorities
- Higher HQ and reporting chain
- Mission statement and objectives

### Step 5: Populate Subfolders As Operation Progresses
- Planning phase → Products go in PLANNING/
- Intelligence development → Products go in INTELLIGENCE/
- OPORD production → Products go in OPERATIONS/
- Response execution → Products go in EXECUTION/ (by type)
- POAMs created → Products go in POAMs/
- Post-operation → Products go in ASSESSMENT/

---

## Folder Descriptions

### PLANNING/
**Contents:** Products from operations process planning phases
- Cyber running estimates (facts/assumptions/limitations at each phase)
- Staff estimates (formatted per Army staff format)
- COA analysis and wargaming outputs
- Decision briefs
- Synchronization matrices

**Maintained by:** S-3 (Operations Officer)

---

### INTELLIGENCE/
**Contents:** Intelligence preparation and threat analysis
- IPB cyberspace terrain (physical/logical/persona layers)
- Threat COA analysis (MLCOA/MDCOA)
- PIR/RFI tracker and collection requirements
- Threat intelligence assessments
- Updated threat models as operation progresses

**Maintained by:** S-2 (Intelligence Officer)

---

### OPERATIONS/
**Contents:** Formal operational orders and guidance
- OPORD main body
- Annex M (Cyber Operations Annex)
- Annex L (ROE/Authorities)
- Task Organization (who does what)
- Supporting doctrinal references
- ROE and constraints

**Maintained by:** S-3 / Element Lead

---

### EXECUTION/
**Contents:** Response, analysis, and tactical products organized by type

**Incident_Reports/:**
- Incident report for each event/finding
- Finding documentation
- Timeline summaries
- Immediate response actions

**Host_Analysis/:**
- Host forensic analysis reports
- Process analysis, registry analysis, file system analysis
- Baseline deviation assessments
- Artifact correlation findings

**Network_Analysis/:**
- Network traffic analysis reports
- C2 communication assessments
- Lateral movement path analysis
- Network baseline deviations

**Threat_Intelligence/:**
- CTI assessments
- Indicator lists (IOCs)
- Threat actor capability assessments
- Attribution analysis (if applicable)

**Maintained by:** Response team (Host/Network Analysts, S-2)

---

### POAMs/
**Contents:** Remediation tracking for all findings

- POAM_Tracker.md (master status matrix)
- Individual POAM files (one per remediation action)
- POAM_Log.md (operational log with status history)
- Completion verification and closure documentation

**Maintained by:** S-3 (POAM Coordinator) with input from response team

---

### ASSESSMENT/
**Contents:** Post-operation products and lessons

- After-Action Report (AAR) — final assessment of operation
- Lessons Learned — what we did well, what we'd improve
- Risk Register — risks identified, residual risks, acceptance documentation
- Final POAM status and closure summary
- Security posture improvements implemented

**Maintained by:** Element Lead / Team Lead

---

### SUPPORTING_DOCS/
**Contents:** Reference materials and supporting artifacts

- Network diagrams and architecture maps
- System configuration documentation
- Threat landscape maps
- Evidence collections (organized by type)
- External threat intelligence reports
- Compliance or policy references
- Personnel rosters/contact information

**Maintained by:** S-2 / S-3

---

## Operations Index

**See:** `OPERATIONS_INDEX.md` in this folder

Master reference listing all operations:
- Operation code, name, dates
- Mission type and status
- Key personnel
- Link to operation folder
- Current POAMs and status

Update this index as new operations are created.

---

## How to Find Operation Products

### By Operation
```
operation/OP-GUARDIAN_DCO-RA_2026-02-23/
  → All products for Operation Guardian
```

### By Phase
```
operation/OP-GUARDIAN_DCO-RA_2026-02-23/PLANNING/
  → All planning products
```

### By Type
```
operation/OP-GUARDIAN_DCO-RA_2026-02-23/EXECUTION/Incident_Reports/
  → All incident reports for this operation
```

### By POAM
```
operation/OP-GUARDIAN_DCO-RA_2026-02-23/POAMs/
  → All remediation tracking for this operation
```

### Cross-Operation
```
operation/OPERATIONS_INDEX.md
  → Find any operation
```

---

## Filing Guidelines

### Filename Format
**For products:** `[Type]_[Topic]_[Date].md`

**Examples:**
- `Cyber_Running_Estimate_2026-02-23.md`
- `Threat_COA_Analysis_2026-02-23.md`
- `Incident_Report_001_Malware_2026-02-23.md`
- `Host_Analysis_WIN-USR-0847_2026-02-23.md`

### Organization Tips
- Keep files at operation level (not nested deeply)
- Use consistent naming so files are searchable
- Link between related documents (cross-reference)
- Archive old versions with timestamps if updating
- Use subfolders only for major categories (Incident_Reports, Host_Analysis, etc.)

---

## Quick Reference: What Goes Where

| Product | Folder | Phase |
|---------|--------|-------|
| Cyber Running Estimate | PLANNING/ | MDMP Step 1-7 |
| COA Analysis/Wargame | PLANNING/ | MDMP Step 4 |
| IPB Terrain Analysis | INTELLIGENCE/ | MDMP Step 2 |
| Threat COA | INTELLIGENCE/ | MDMP Step 2 |
| OPORD Main/Annexes | OPERATIONS/ | MDMP Step 7 |
| Task Organization | OPERATIONS/ | MDMP Step 7 |
| Incident Report | EXECUTION/Incident_Reports/ | Response |
| Host Analysis | EXECUTION/Host_Analysis/ | Response |
| Network Analysis | EXECUTION/Network_Analysis/ | Response |
| Threat Assessment | EXECUTION/Threat_Intelligence/ | Response |
| POAMs | POAMs/ | Response → Post-Op |
| AAR/Lessons Learned | ASSESSMENT/ | Post-Op |
| Risk Register | ASSESSMENT/ | Post-Op |

---

## Integration with CyberPlanner Systems

### Doctrine References
See `docs/doctrine/` for all authoritative doctrinal references:
- FM 3-12 (Cyber operations tasks and control measures)
- ATP 2-01.3 (IPB methodology)
- ADP 5-0 (Operations process phases)
- MITRE ATT&CK (Threat framework)

### POAM System
See `docs/POAMs/` for remediation tracking:
- Templates and guidance
- Risk prioritization methodology
- Examples

### Agent Roles
- **Cyber Operations Planner:** Creates PLANNING/, INTELLIGENCE/, OPERATIONS/ products
- **17C Host Analyst:** Creates EXECUTION/Host_Analysis/ products and contributes to POAMs
- **17C Network Analyst:** Creates EXECUTION/Network_Analysis/ products and contributes to POAMs

---

## File Management

### Archiving Completed Operations
Once operation is complete and AAR finalized:
1. Verify all POAMs closed or documented as residual risk
2. Complete After-Action Report
3. Archive operation folder (option: move to `/archive/` if needed)
4. Keep reference in OPERATIONS_INDEX.md
5. Link AAR for future reference

### Accessing Historical Operations
Use OPERATIONS_INDEX.md to find past operations and their key products.

---

## Example Operation Structure

See `OPERATION_TEMPLATE/` for a blank template you can copy when creating new operations.

---

## Contact & Questions

**Operation Folder Owner:** [S-3 Operations Officer]
**POAM Coordinator:** [S-3 representative]
**Intelligence:** [S-2]
**Element Lead:** [Command authority]

---

**Last Updated:** 2026-02-24
**Classification:** UNCLASSIFIED // FOUO
