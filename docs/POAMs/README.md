# POAM Generation System
**Plans of Action and Milestones for Cyber Response Operations**

---

## Overview

This folder contains templates, tools, and guidance for generating **POAMs (Plans of Action and Milestones)** based on findings during cyber response operations. POAMs track remediation of identified risks, vulnerabilities, and findings with clear ownership, milestones, and status tracking.

**Purpose:** Convert response findings into actionable remediation tasks with milestone tracking and authority alignment.

---

## Folder Structure

```
docs/POAMs/
├── README.md                              # This file
├── INDEX.md                               # Master reference: finding types → POAM categories
├── TEMPLATES/
│   ├── POAM_Template.md                  # Standard POAM format (one per finding)
│   ├── POAM_Tracker.md                   # Status tracking matrix (all POAMs)
│   └── Finding_to_POAM_Mapping.md        # Decision logic for finding classification
├── GUIDANCE/
│   ├── POAM_Generation_Guide.md          # How to build POAMs from findings
│   ├── Risk_Prioritization.md            # Risk matrix and scoring methodology
│   └── Agent_Integration.md              # How each agent role generates POAMs
├── EXAMPLES/
│   ├── Example_POAM_Malware.md           # Example: Malware detection finding
│   ├── Example_POAM_Config.md            # Example: Configuration deficiency
│   └── Example_POAM_Detection.md         # Example: Detection logic gap
└── TRACKER/
    └── POAM_Log.md                        # Current POAMs (updated during operations)
```

---

## Quick Start

### For Response Analysts
1. **During response:** Document findings in incident report
2. **Post-incident:** Use `POAM_Generation_Guide.md` to convert findings to POAMs
3. **Complete:** Fill `POAM_Template.md` for each finding
4. **Track:** Update `POAM_Tracker.md` with status and milestones

### For Operations Planners
1. **Review** POAMs from completed responses
2. **Prioritize** using `Risk_Prioritization.md` matrix
3. **Assign** to responsible parties (per OPORD Task Organization)
4. **Track** completion milestones and escalate blockers
5. **Close** POAMs when mitigation complete and verified

### For Commanders
1. **Review** POAM_Tracker.md for **Critical** and **High** risk items
2. **Focus** on **Overdue** and **At Risk** status items
3. **Escalate** blockers requiring higher authority or resources
4. **Accept** residual risk if POAM closure not achievable

---

## Key Definitions

| Term | Definition | Example |
|---|---|---|
| **Finding** | Specific observation/vulnerability identified during response | "Malware found on endpoint X with C2 callback capability" |
| **POAM** | Formal remediation action with timeline and owner | "Install endpoint security on asset X by DATE; verify clean state by DATE+7" |
| **Milestone** | Specific checkpoint with completion criteria | "Endpoint reimaged and OS patches applied by DATE" |
| **Residual Risk** | Risk remaining after POAM closure | "Threat actor knows compromised account credentials; monitor for reuse" |

---

## POAM Lifecycle

```
FINDING IDENTIFIED (Response)
         ↓
    CLASSIFY RISK (Risk Matrix)
         ↓
    CREATE POAM (Template)
         ↓
    ASSIGN OWNER (Task Org)
         ↓
    EXECUTE MILESTONES (Operational)
         ↓
    VERIFY CLOSURE (Detection/Validation)
         ↓
    DOCUMENT RESIDUAL RISK (Assessment)
         ↓
    POAM CLOSED (Tracker Updated)
```

---

## Finding Categories → POAM Types

| Finding Type | POAM Action | Owner | Timeline |
|---|---|---|---|
| **Malware** | Remove, verify clean, harden endpoint, monitor | Host Team + S2 | Immediate - 7 days |
| **Compromised Credential** | Reset, revoke, audit usage, monitor reuse | ID Admin + S1 | Immediate - 24 hours |
| **Lateral Movement** | Segment network, enhance detection, audit access | Network Team + S3 | Immediate - 14 days |
| **Configuration Deficiency** | Apply baseline, harden, audit, re-image if needed | System Admin | 7 - 30 days |
| **Detection Gap** | Develop detection rule, deploy, validate, test | S2/SOC | 7 - 14 days |
| **Vulnerability** | Patch, apply workaround, or accept residual risk | System Admin | Depends on severity |
| **Process/Procedure Gap** | Document procedure, train personnel, implement | TL/Training | 7 - 30 days |
| **Incomplete Investigation** | Continue forensics, correlate data, report findings | Host/Network Team | 3 - 14 days |

---

## Status Tracking

**POAMs have five status states:**

| Status | Meaning | Action |
|--------|---------|--------|
| **Open** | POAM created, awaiting execution start | Assign owner, confirm resource availability |
| **In Progress** | Remediation underway, milestone tracking active | Monitor milestone completion, remove blockers |
| **At Risk** | Behind schedule or blocker identified | Escalate, revise timeline, or request resources |
| **Complete** | All milestones done, verification underway | Verify closure criteria, document residual risk |
| **Closed** | Verified complete, residual risk accepted/monitored | Archive, update security posture, lessons learned |

---

## POAM Governance

### Authority & Approval
- **Finding → POAM:** Documented by response team, approved by Element Lead
- **POAM Execution:** Assigned to responsible party per OPORD Task Organization
- **Residual Risk Acceptance:** Commander signature if risk remains after POAM closure
- **Escalation:** Element Lead escalates **At Risk** POAMs to TL/OIC immediately

### Coordination
- **Daily SITREP:** Include POAM status (new, at risk, closed)
- **Weekly Review:** S-3 leads POAM status meeting (prioritization, resource allocation)
- **Post-Operation:** Final POAM assessment in After-Action Report (AAR)

### Documentation
- All POAMs tracked in **POAM_Tracker.md** (single source of truth)
- Individual POAM details in separate markdown files (timestamped)
- Linked to original incident report and finding artifacts

---

## How to Use Each Template/Guide

| File | When to Use | Output |
|------|------------|--------|
| **POAM_Template.md** | Create new POAM | One POAM per finding |
| **POAM_Tracker.md** | Manage all POAMs | Status matrix, overdue alerts, priority summary |
| **POAM_Generation_Guide.md** | Convert findings to POAMs | Decision logic, checklist, quality standards |
| **Risk_Prioritization.md** | Assess risk level | Priority classification, timeline expectations |
| **Finding_to_POAM_Mapping.md** | Classify finding type | POAM category, typical milestones, owner |
| **Agent_Integration.md** | Align with agent roles | Who generates, when, and what format |
| **EXAMPLES/** | Reference standard POAMs | Model format, realistic scenarios, completeness check |

---

## Integration with Agent Roles

### Host Analyst Findings → POAMs
- Malware detections → Immediate removal + endpoint hardening POAM
- Suspicious processes → Investigation completion + configuration hardening POAM
- Baseline deviations → Remediation + monitoring POAM
- Example: See `EXAMPLES/Example_POAM_Malware.md`

### Network Analyst Findings → POAMs
- C2 communications → Threat intel dissemination + detection rule POAM
- Lateral movement → Network segmentation + enhanced monitoring POAM
- Suspicious sessions → Investigation completion + baseline revision POAM
- Example: See `EXAMPLES/Example_POAM_Detection.md`

### Cyber Operations Planner Integration → POAMs
- Risk assessment → Prioritization matrix + timeline allocation
- Operational gaps → Doctrine-aligned remediation procedures
- Authority/ROE gaps → Escalation + policy coordination POAMs
- Example: See `EXAMPLES/Example_POAM_Config.md`

---

## Doctrine & Compliance References

**From docs/doctrine/:**
- **ADP 5-0** — Running estimates include risk/issue tracking
- **FM 3-12** — Cyber operational tasks and control measures
- **ATP 2-01.3** — Threat COA indicator tracking (for detection POAMs)
- **ATP 3-12.3** — Cyber techniques and endpoint tasking (for remediation specifics)

**External Standards:**
- **NIST SP 800-30** — Risk assessment methodology (applied to prioritization)
- **AR 25-2** — Army cybersecurity policy (compliance basis for configuration POAMs)
- **CJCSM 6510.01** — Cyber incident handling policy (incident-response POAMs)

---

## Getting Started

1. **Read:** `POAM_Generation_Guide.md` (5 min)
2. **Understand:** `Finding_to_POAM_Mapping.md` (3 min)
3. **Review:** `EXAMPLES/` for format (5 min)
4. **Create:** Use `POAM_Template.md` for first POAM (10 min)
5. **Track:** Update `POAM_Tracker.md` (2 min per POAM)
6. **Review:** Check with Element Lead before escalation

---

**Last Updated:** 2026-02-24
**Maintained by:** CyberPlanner Memory System
**Classification:** UNCLASSIFIED // FOUO
