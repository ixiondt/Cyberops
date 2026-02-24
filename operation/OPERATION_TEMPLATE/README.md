# Operation: [OPERATION NAME]
**Quick Reference and Folder Index**

---

## 🚀 INITIALIZATION — New OPORD Checklist

When creating a new operation from this template:

### Step 1: Copy Template
```bash
# From project root:
cp -r operation/OPERATION_TEMPLATE operation/OP-[CODE]_[TYPE]_[DATE]

# Example:
cp -r operation/OPERATION_TEMPLATE operation/OP-DEFENDER_DCO-RA_2026-02-25
```

### Step 2: Update OPERATION_METADATA.md
**Replace placeholders in `OPERATION_METADATA.md` with actual OPORD data:**

- [ ] **OPERATION IDENTIFICATION** — Code, Name, Type
- [ ] **DATES AND TIMELINE** — Start/end dates, phase dates
- [ ] **COMMAND STRUCTURE** — Commander, OIC, operations team
- [ ] **MOC COMPOSITION** — Personnel roster with roles/contact info
- [ ] **MISSION ANALYSIS** — Specified/implied/essential tasks
- [ ] **CYBER RESOURCES** — Available tools, EDR, SIEM, segmentation
- [ ] **AUTHORITIES & CONSTRAINTS** — ROE, classification level, authority chain
- [ ] **CURRENT STATUS** — Set to: `**Current Status:** Planning Phase - Deployment & Integration`

### Step 3: Dashboard Integration
The dashboard automatically discovers new operations:

```bash
# 1. Start server (if not running)
node server.js

# 2. Open dashboard
# http://localhost:3000

# 3. Select operation from dropdown
# Operation selector auto-loads all OP-* folders
```

### Step 4: Initialize MDMP Process
**In dashboard, on MDMP Planner tab:**

- [ ] Add planning products to PLANNING/ folder
- [ ] Add intelligence products to INTELLIGENCE/ folder
- [ ] Add operations products to OPERATIONS/ folder
- [ ] Monitor MDMP step counts (auto-updates from files)

### Step 5: Set Initial Phase
**In dashboard, on Overview tab:**

- [ ] Phase timeline shows "Planning Phase" by default
- [ ] Click phase circles to transition (Execution → Transition → Completion)
- [ ] Phase transitions persist to OPERATION_METADATA.md

---

## OPERATION METADATA

**Operation Code:** [OP-CODE]
**Operation Name:** [Full Name]
**Mission Type:** [DCO-RA / DCO-IDM / HUNT / IR / PLANNING / Other]
**Operation Status:** [Planning / In Progress / Post-Op / Archived]
**Start Date:** [YYYY-MM-DD]
**End Date:** [YYYY-MM-DD / Ongoing]

*For full metadata, see: `OPERATION_METADATA.md`*

---

## KEY PERSONNEL

**Element Lead / OIC:** [Name] / [Title] / [Contact]
**Team Lead (Response):** [Name] / [Title] / [Contact]
**S-2 (Intelligence):** [Name] / [Title] / [Contact]
**S-3 (Operations):** [Name] / [Title] / [Contact]

---

## MISSION STATEMENT

[Brief description of operation objectives, scope, and anticipated outcomes]

---

## FOLDER STRUCTURE

This operation folder contains:

### PLANNING/
Planning phase products (cyber running estimates, COA analysis, wargaming)
- Cyber_Running_Estimate.md
- [Other planning products]

### INTELLIGENCE/
Intelligence products (IPB, threat analysis, PIRs)
- IPB_Cyberspace_Terrain.md
- Threat_COA_Analysis.md
- PIR_RFI_Tracker.md

### OPERATIONS/
Operational orders and guidance
- OPORD_Main.md
- Annex_M_Cyber.md
- Task_Organization.md

### EXECUTION/
Response and incident products organized by type
- **Incident_Reports/** — Incident documentation
- **Host_Analysis/** — Endpoint analysis findings
- **Network_Analysis/** — Network traffic analysis
- **Threat_Intelligence/** — CTI assessments

### POAMs/
Remediation tracking
- POAM_Tracker.md
- [Individual POAMs]
- POAM_Log.md

### ASSESSMENT/
Post-operation products
- After_Action_Report.md
- Lessons_Learned.md
- Risk_Register.md

### SUPPORTING_DOCS/
Reference materials and artifacts
- [Maps, diagrams, evidence, etc.]

---

## CURRENT STATUS

**Operation Status:** [Planning / In Progress / Post-Op]

**Key Milestones:**
- [ ] Planning phase complete
- [ ] OPORD finalized
- [ ] Execution phase initiated
- [ ] Response completed
- [ ] POAMs tracked and closed
- [ ] After-Action Report completed

**Current Activities:**
[What is happening now]

**Blockers/Issues:**
[Any blockers or issues]

---

## POAM SUMMARY

**Total POAMs:** [#]
- Open: [#]
- In Progress: [#]
- At Risk: [#]
- Complete: [#]
- Closed: [#]

**Critical POAMs:** [#]
**Overdue POAMs:** [#]

*See: POAMs/POAM_Tracker.md for detailed status*

---

## QUICK ACCESS TO KEY PRODUCTS

### Planning Products
- [Cyber_Running_Estimate.md](PLANNING/Cyber_Running_Estimate.md)
- [COA_Analysis.md](PLANNING/COA_Analysis_Wargame.md)

### Intelligence Products
- [IPB_Cyberspace_Terrain.md](INTELLIGENCE/IPB_Cyberspace_Terrain.md)
- [Threat_COA_Analysis.md](INTELLIGENCE/Threat_COA_Analysis.md)

### Operational Orders
- [OPORD_Main.md](OPERATIONS/OPORD_Main.md)
- [Annex_M_Cyber.md](OPERATIONS/Annex_M_Cyber.md)

### Execution Products
- [Incident_Reports](EXECUTION/Incident_Reports/) (All incident documentation)
- [Host_Analysis](EXECUTION/Host_Analysis/) (Endpoint analysis findings)
- [Network_Analysis](EXECUTION/Network_Analysis/) (Network traffic analysis)
- [Threat_Intelligence](EXECUTION/Threat_Intelligence/) (CTI assessments)

### Remediation Tracking
- [POAM_Tracker.md](POAMs/POAM_Tracker.md) (Status matrix for all POAMs)
- [POAM_Log.md](POAMs/POAM_Log.md) (Operational log)

### Assessment & Lessons Learned
- [After_Action_Report.md](ASSESSMENT/After_Action_Report.md)
- [Lessons_Learned.md](ASSESSMENT/Lessons_Learned.md)

---

## FILE NAMING CONVENTION

**Format:** `[Type]_[Topic]_[Date].md`

**Examples:**
- `Cyber_Running_Estimate_2026-02-23.md`
- `Incident_Report_001_Malware_2026-02-23.md`
- `Host_Analysis_WIN-USR-0847_2026-02-23.md`

---

## RELATED DOCUMENTATION

**External References:**
- Doctrine Library: [docs/doctrine/](../../docs/doctrine/)
- POAM System: [docs/POAMs/](../../docs/POAMs/)
- Agent Integration: [docs/POAMs/GUIDANCE/Agent_Integration.md](../../docs/POAMs/GUIDANCE/Agent_Integration.md)
- Master Operations Index: [OPERATIONS_INDEX.md](../OPERATIONS_INDEX.md)

---

## HOW TO USE THIS FOLDER

### During Planning Phase
1. Fill `OPERATION_METADATA.md` with mission context
2. Create planning products in `PLANNING/`
3. Create intelligence products in `INTELLIGENCE/`
4. Populate `INTELLIGENCE/Threat_COA_Analysis.md` with threat analysis

### During OPORD Production
1. Create OPORD in `OPERATIONS/OPORD_Main.md`
2. Create cyber annex in `OPERATIONS/Annex_M_Cyber.md`
3. Create task organization in `OPERATIONS/Task_Organization.md`

### During Execution Phase
1. Create incident reports in `EXECUTION/Incident_Reports/`
2. Create host analysis in `EXECUTION/Host_Analysis/`
3. Create network analysis in `EXECUTION/Network_Analysis/`
4. Create POAM tracker in `POAMs/POAM_Tracker.md`
5. Create individual POAMs in `POAMs/[POAM-001.md, etc.]`

### During Post-Operation Phase
1. Create After-Action Report in `ASSESSMENT/After_Action_Report.md`
2. Document lessons learned in `ASSESSMENT/Lessons_Learned.md`
3. Create risk register in `ASSESSMENT/Risk_Register.md`
4. Archive operation (if applicable)

---

## CONTACT & ESCALATION

**For Questions About This Operation:**
- Element Lead: [Contact]
- Team Lead: [Contact]

**For Questions About Operation Folder Structure:**
- S-3 Operations: [Contact]

**For Questions About POAM Status:**
- POAM Coordinator: [Contact]

---

## CLASSIFICATION

**Overall Operation Classification:** UNCLASSIFIED // FOUO

**Document-Specific Classifications:**
- [Product Name]: [Classification]
- [Product Name]: [Classification]

---

**Created:** [Date]
**Last Updated:** [Date]
**Updated By:** [Role]

---

## Navigation

← Back to [Operations Index](../OPERATIONS_INDEX.md)
← Back to [Operation Folder Root](../)
← Back to [CyberPlanner Root](../../)
