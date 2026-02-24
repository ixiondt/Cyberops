# Operations Index
**Master Reference for All Cyber Response Operations**

---

## Quick Reference

**Total Operations:** 0 (Template ready)
**Status:** Operations folder initialized and ready for deployment

---

## How to Add an Operation

1. Create folder: `OP-[CODE]_[TYPE]_[DATE]`
2. Copy template from `OPERATION_TEMPLATE/`
3. Fill `OPERATION_METADATA.md` with mission context
4. Add entry to this index (see template below)
5. Begin populating subfolders as operation progresses

---

## Operation Template Entry

```markdown
### OP-[CODE]: [Operation Name]

**Status:** [Planning/In Progress/Post-Op/Archived]
**Type:** [DCO-RA/DCO-IDM/HUNT/IR/PLANNING/Other]
**Dates:** [Start Date] - [End Date / Ongoing]
**Location/Domain:** [Mission area, network scope]

**Key Personnel:**
- Element Lead: [Name/Title]
- Team Lead: [Name/Title]
- S-2 (Intelligence): [Name/Title]
- S-3 (Operations): [Name/Title]

**Mission Statement:** [Brief description of mission objectives]

**Current POAMs:** [# Total] | ☐ Open | ☐ In Progress | ☐ At Risk | ☐ Complete | ☐ Closed

**Status Notes:**
[Current status, key milestones, blockers if any]

**Folder Location:** `operation/OP-[CODE]_[TYPE]_[DATE]/`

**Key Products:**
- Planning: [Link to cyber running estimate]
- Intelligence: [Link to threat COA]
- OPORD: [Link to main order or cyber annex]
- Execution: [Link to incident reports]
- POAMs: [Link to POAM tracker]
- Assessment: [Link to AAR if completed]

**Last Updated:** [Date]
**Updated By:** [Role]

---
```

---

## All Operations

*This index will be updated as operations are created.*

### [First Operation - When Created]

**Status:** [Status]
**Type:** [Type]
**Dates:** [Dates]

[Details per template above]

---

## Operations by Status

### Active Operations (Planning/In Progress)
*None currently*

### Post-Operation (Awaiting AAR)
*None currently*

### Completed/Archived
*None currently*

---

## Operations by Type

### Defensive Cyber Operations - Response Action (DCO-RA)
*None currently*

### Defensive Cyber Operations - Infrastructure Defense Mode (DCO-IDM)
*None currently*

### Threat Hunt
*None currently*

### Incident Response (IR)
*None currently*

### Operational Planning
*None currently*

### Other
*None currently*

---

## Quick Access to Recent Operations

**Most Recent:** [None]
**Most Critical:** [None]
**Largest Scope:** [None]

---

## POAM Summary Across All Operations

**Total POAMs Across All Operations:** 0

| Status | Count |
|--------|-------|
| Open | 0 |
| In Progress | 0 |
| At Risk | 0 |
| Complete | 0 |
| Closed | 0 |

**Critical POAMs:** 0
**Overdue POAMs:** 0

---

## Key Metrics

| Metric | Value |
|--------|-------|
| Total Operations | 0 |
| Active Operations | 0 |
| Completed Operations | 0 |
| Average Operation Duration | — |
| Average POAMs per Operation | — |
| Average POAM Closure Time | — |

---

## Search Guide

**To Find an Operation:**
1. Look up operation code/name in this index
2. Go to corresponding folder in `operation/OP-[CODE]_[TYPE]_[DATE]/`
3. Navigate to appropriate subfolder (PLANNING/, EXECUTION/, POAMs/, etc.)

**Example:**
```
Looking for: Malware incident from 2026-02-23
→ Check OPERATIONS_INDEX.md for "2026-02-23"
→ Go to: operation/OP-GUARDIAN_IR_2026-02-23/
→ Incident reports: operation/OP-GUARDIAN_IR_2026-02-23/EXECUTION/Incident_Reports/
```

---

## Filing Reference

**Each operation folder contains:**
- README.md (operation overview)
- OPERATION_METADATA.md (mission context)
- PLANNING/ (cyber running estimates, COA analysis)
- INTELLIGENCE/ (IPB, threat COA, PIRs)
- OPERATIONS/ (OPORD, annexes, task org)
- EXECUTION/ (incident reports, analysis, findings)
  - Incident_Reports/
  - Host_Analysis/
  - Network_Analysis/
  - Threat_Intelligence/
- POAMs/ (remediation tracking)
- ASSESSMENT/ (AAR, lessons learned)
- SUPPORTING_DOCS/ (reference materials)

---

## Integration with Other Systems

### Doctrine References
→ See `docs/doctrine/` for FM 3-12, ATP 2-01.3, ADP 5-0, MITRE ATT&CK

### POAM System
→ See `docs/POAMs/` for templates, guidance, and examples

### Agent Roles
- **Cyber Operations Planner** → Creates planning, intelligence, operations products
- **Host Analyst** → Creates execution/host analysis, contributes to POAMs
- **Network Analyst** → Creates execution/network analysis, contributes to POAMs

---

## Links to Related Documentation

- **Operation Structure Guide:** README.md (this folder)
- **POAM System:** docs/POAMs/README.md
- **Doctrine Library:** docs/doctrine/INDEX.md
- **Agent Integration:** docs/POAMs/GUIDANCE/Agent_Integration.md
- **CLAUDE.md (Project Context):** CLAUDE.md (root)

---

## Maintenance

**Update Frequency:**
- New operation entry: When operation created
- Status updates: Daily during active operations, weekly post-op
- Metrics: Weekly (automated if possible)

**Owner:** S-3 Operations Officer

**Last Updated:** 2026-02-24 (Initialized)

---

**Classification:** UNCLASSIFIED // FOUO
