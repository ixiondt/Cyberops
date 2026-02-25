# Multi-Operation Management Guide

**CyberOpsPlanner v3.0 now supports managing multiple concurrent operations simultaneously.**

---

## Quick Overview

The system now lets you:
- ✅ Create multiple OPORDs quickly from template
- ✅ Switch between operations in the dashboard
- ✅ Track MDMP progress per operation
- ✅ Manage incidents and POAMs independently for each operation
- ✅ Use Claude for operation-scoped analysis
- ✅ Auto-discover new operations on restart

---

## Step 1: Create a New Operation

### From Command Line

```bash
# Copy template to new operation folder
cp -r operation/OPERATION_TEMPLATE operation/OP-[CODE]_[TYPE]_[DATE]

# Example: New DCO-RA operation on Feb 25
cp -r operation/OPERATION_TEMPLATE operation/OP-EXAMPLE_DCO-RA_2026-02-25
```

### Folder Naming Convention

`OP-[CODE]_[TYPE]_[DATE]`

- **[CODE]:** Operation code (e.g., EXAMPLE, DEFENDER, SENTINEL)
- **[TYPE]:** Mission type (DCO-RA, DCO-IDM, HUNT, IR-SUPPORT, PLANNING, etc.)
- **[DATE]:** Start date (YYYY-MM-DD)

**Examples:**
- `OP-DEFENDER_DCO-RA_2026-02-25`
- `OP-SENTINEL_DCO-IDM_2026-02-24`
- `OP-HUNT-OPS_HUNT_2026-02-23`

---

## Step 2: Initialize OPERATION_METADATA.md

Edit `operation/OP-[NAME]/OPERATION_METADATA.md` with OPORD details:

### Required Fields

```markdown
## OPERATION IDENTIFICATION
**Operation Code:** OP-EXAMPLE
**Operation Name:** OPORD 26-02 - Example Cyber Operation
**Operation Type:** DCO-RA

## DATES AND TIMELINE
**Start Date:** 2026-02-25 00:00 UTC
**End Date:** TBD (Ongoing)
**Planning Phase:** 2026-02-25 - 2026-03-01
**Execution Phase:** 2026-03-02 - TBD

## COMMAND STRUCTURE & PERSONNEL
**Commander:** [Name/Rank]
**Mission OIC:** [Name/Rank]
**CPT 173 Lead:** [Name/Rank]
**S-2 Officer:** [Name/Rank]

## MISSION ANALYSIS
**Specified Tasks:**
- Task 1 description
- Task 2 description

## STATUS TRACKING
**Current Status:** Planning Phase - Deployment & Integration
**Status Last Updated:** 2026-02-25 06:00 UTC
```

### Key Fields

| Field | Purpose | Example |
|-------|---------|---------|
| Operation Code | Unique ID | OP-EXAMPLE |
| Operation Name | Full OPORD title | OPORD 26-02 - Example DCO-RA |
| Operation Type | Mission type | DCO-RA, DCO-IDM, HUNT, IR-SUPPORT |
| Start Date | Operation start | 2026-02-25 00:00 UTC |
| Command Structure | Personnel roster | OIC, S-2, S-3, element leads |
| Current Status | Operation phase | Planning Phase - Deployment & Integration |

---

## Step 3: Start Dashboard

```bash
# Make sure you're in project root
cd /path/to/CyberPlanner

# Start server
node server.js

# Output should show:
# ✅ Server running on port 3000
# 📡 Dashboard loaded successfully
```

### Open Dashboard

```
http://localhost:3000
```

---

## Step 4: Select Operation in Dashboard

### Operation Selector

1. Open dashboard: `http://localhost:3000`
2. Look at top header — **Operation Selector dropdown**
3. Click dropdown to see all available operations
4. Select your operation: `OP-EXAMPLE_DCO-RA_2026-02-25`
5. Dashboard reloads with selected operation data

### Auto-Discovery

Dashboard automatically discovers all folders matching `OP-*`:

```
operation/
├── OPERATION_TEMPLATE/          (not shown - this is template)
├── OP-DEFENDER_DCO-RA_2026-02-23/  ✅ Shown in dropdown
├── OP-EXAMPLE_DCO-RA_2026-02-25/   ✅ Shown in dropdown
└── OP-SENTINEL_DCO-IDM_2026-02-24/ ✅ Shown in dropdown
```

To add a new operation to the list:
1. Create folder: `cp -r operation/OPERATION_TEMPLATE operation/OP-[NAME]_[TYPE]_[DATE]`
2. Restart server: `node server.js`
3. New operation appears in selector immediately

---

## Step 5: Initialize MDMP Process

### MDMP Planner Tab

1. **Click "MDMP Planner" tab** in dashboard
2. **7 MDMP steps displayed:**
   - Step 1: Receipt of Mission (📋 ROM)
   - Step 2: Mission Analysis (📊 MA)
   - Step 3: COA Development (🎯 COA-D)
   - Step 4: COA Analysis (⚙️ COA-A)
   - Step 5: COA Comparison (📊 COA-C)
   - Step 6: COA Approval (✅ COA-AP)
   - Step 7: Orders Production (📄 OP)

3. **Add planning products:**
   - Create files in `operation/OP-[NAME]/PLANNING/`
   - Dashboard auto-discovers and counts deliverables
   - Steps show "X deliverable(s)"

4. **Click step to see details:**
   - View deliverables
   - Edit/delete/export products
   - Add new deliverables

### Example MDMP Product

Create file: `operation/OP-EXAMPLE_DCO-RA_2026-02-25/PLANNING/COA_Analysis_Wargame_2026-02-25.md`

```markdown
<!-- METADATA
step: 4
title: COA Analysis & Wargame
created: 2026-02-25
status: draft
-->

# COA Analysis & Wargame

## Objective
[Analysis objective]

## Key Findings
[Findings]

## Recommendations
[Recommendations]
```

---

## Step 6: Track Operation Phases

### Phase Timeline (Overview Tab)

1. **Click "Overview" tab**
2. **Phase timeline shows:**
   - 📋 Planning Phase (current)
   - ⚙️ Execution Phase (next)
   - 🔒 Transition Phase (future)
   - ✅ Completion Phase (future)

3. **Transition to next phase:**
   - Click phase circle in timeline
   - Confirm dialog appears
   - Phase updates and persists to OPERATION_METADATA.md
   - Dashboard context adapts to new phase

### Phase Status

Each phase automatically shows:
- **Current phase name** and description
- **Phase-specific tasks** (what to focus on)
- **Phase-specific recommendations** (what to do now)
- **Recommended dashboard tabs** for current phase

**Example: Execution Phase**
- Focus: Incidents, POAMs, Network Map
- Recommendations: Monitor alerts, document findings, track remediation
- Tasks: Real-time monitoring, incident response, analysis & reporting

---

## Step 7: Multi-Operation Workflow

### Switching Between Operations

```
Scenario: 3 concurrent operations
├── OP-DEFENDER_DCO-RA (Planning Phase)
├── OP-SENTINEL_DCO-IDM (Execution Phase)
└── OP-HUNT-OPS_HUNT (Planning Phase)

Workflow:
1. Dashboard loads OP-DEFENDER
2. Select OP-SENTINEL from dropdown
   → Dashboard shows SENTINEL data (MDMP, incidents, POAMs, etc.)
3. Select OP-HUNT-OPS from dropdown
   → Dashboard shows HUNT data

Each operation maintains independent:
✓ MDMP step progress (different counts per op)
✓ Phase status (different phases per op)
✓ Incidents and POAMs (operation-scoped)
✓ Network topology (operation-specific)
✓ Intelligence files (operation-specific)
```

### Creating Operations in Batch

When multiple OPORDs arrive:

```bash
# Create multiple operations quickly
cp -r operation/OPERATION_TEMPLATE operation/OP-OPORD-A_DCO-RA_2026-02-25
cp -r operation/OPERATION_TEMPLATE operation/OP-OPORD-B_DCO-IDM_2026-02-24
cp -r operation/OPERATION_TEMPLATE operation/OP-OPORD-C_HUNT_2026-02-23

# Edit each OPERATION_METADATA.md with specific OPORD details

# Restart dashboard
node server.js

# All operations available in selector
```

---

## Step 8: Use Claude for Operation-Scoped Analysis

### Start Claude Code

```bash
claude code .
```

### Request Operation-Specific Analysis

```
"Create a cyber running estimate for OP-DEFENDER"
"Analyze threat COAs for OP-SENTINEL"
"Give me risk assessment for OP-HUNT-OPS"
"Host analyst perspective on OP-DEFENDER findings"
"Network analyst: review traffic analysis for OP-SENTINEL"
```

Claude automatically:
- References correct operation folder
- Stores analysis products in operation-specific directories
- Maintains operation context across requests
- Can switch between operations mid-session

---

## Complete Workflow Example

### Scenario: 2 New OPORDs Arrive

```bash
# 1. Create both operations from template
cp -r operation/OPERATION_TEMPLATE operation/OP-ALPHA_DCO-RA_2026-02-26
cp -r operation/OPERATION_TEMPLATE operation/OP-BRAVO_DCO-IDM_2026-02-26

# 2. Edit metadata for each
# Edit operation/OP-ALPHA_DCO-RA_2026-02-26/OPERATION_METADATA.md
# Edit operation/OP-BRAVO_DCO-IDM_2026-02-26/OPERATION_METADATA.md

# 3. Start server (discovers both operations)
node server.js

# 4. Open dashboard
# Browser: http://localhost:3000

# 5. Select OP-ALPHA from dropdown
# Dashboard loads ALPHA context

# 6. Start adding MDMP products
# Create: operation/OP-ALPHA_DCO-RA_2026-02-26/PLANNING/Cyber_Running_Estimate.md
# Dashboard auto-discovers and shows in MDMP Planner

# 7. Switch to OP-BRAVO
# Operation selector dropdown → OP-BRAVO
# Dashboard reloads with BRAVO data

# 8. Add BRAVO's intelligence products
# Create: operation/OP-BRAVO_DCO-IDM_2026-02-26/INTELLIGENCE/Threat_Analysis.md

# 9. Transition phases independently
# ALPHA: Click Execution Phase in timeline
# Switch to BRAVO: Click Transition Phase in timeline
# Each operation tracks own phase status

# 10. Use Claude for each operation
# "Analyze threat for OP-ALPHA"
# "Create COA analysis for OP-BRAVO"
```

---

## Data Organization

### Independent Operation Folders

Each operation maintains complete separation:

```
operation/
├── OP-ALPHA_DCO-RA_2026-02-26/
│   ├── OPERATION_METADATA.md      (Status: Planning Phase)
│   ├── PLANNING/
│   │   ├── Cyber_Running_Estimate.md
│   │   └── COA_Analysis.md
│   ├── INTELLIGENCE/
│   │   ├── Threat_COA.md
│   │   └── IPB_Analysis.md
│   ├── EXECUTION/
│   │   ├── Incident_Report_001.md
│   │   └── Host_Analysis_WIN-PC01.md
│   ├── OPERATIONS/
│   │   └── Annex_M_Cyber.md
│   └── POAMs/
│       ├── POAM_Tracker.md
│       ├── POAM-001_Patch_Windows.md
│       └── POAM-002_Update_EDR.md
│
└── OP-BRAVO_DCO-IDM_2026-02-26/
    ├── OPERATION_METADATA.md      (Status: Execution Phase)
    ├── PLANNING/
    ├── INTELLIGENCE/
    ├── EXECUTION/
    ├── OPERATIONS/
    └── POAMs/
```

### Cross-Operation Data

Shared reference materials (not operation-specific):
```
docs/
├── technical/
│   └── SOP/                    (Incident response playbooks)
└── reference/
    └── MITRE_ATT&CK/           (Framework reference)
```

---

## API Endpoints (Multi-Operation)

All endpoints support multiple operations:

```
GET  /api/operations                          List all operations
GET  /api/operations/{opId}                   Get operation metadata
GET  /api/operations/{opId}/mdmp-products     Get operation's MDMP products
GET  /api/operations/{opId}/poams             Get operation's POAMs
GET  /api/operations/{opId}/incidents         Get operation's incidents
PUT  /api/operations/{opId}/phase             Transition operation phase
POST /api/operations/{opId}/poams             Create POAM for operation
POST /api/operations/{opId}/incidents         Create incident for operation
```

### Example: Switch Operations Programmatically

```javascript
// Get all operations
fetch('/api/operations')
  .then(r => r.json())
  .then(ops => {
    console.log(ops);
    // [
    //   { id: "OP-ALPHA_...", status: "Planning Phase - ..." },
    //   { id: "OP-BRAVO_...", status: "Execution Phase - ..." }
    // ]
  });

// Get specific operation data
fetch('/api/operations/OP-ALPHA_DCO-RA_2026-02-26')
  .then(r => r.json())
  .then(op => console.log(op.status));

// Get operation's MDMP products
fetch('/api/operations/OP-ALPHA_DCO-RA_2026-02-26/mdmp-products')
  .then(r => r.json())
  .then(products => console.log(products));
```

---

## Best Practices

### ✅ Do's

- ✅ Create operations with consistent naming (OP-CODE_TYPE_DATE)
- ✅ Fill OPERATION_METADATA.md completely before starting
- ✅ Use dashboard operation selector to switch (don't modify browser URL)
- ✅ Add products to correct folders (PLANNING/, INTELLIGENCE/, OPERATIONS/)
- ✅ Transition phases in dashboard when milestones complete
- ✅ Use Claude for operation-scoped analysis
- ✅ Archive completed operations (keep in folder, just mark status)

### ❌ Don'ts

- ❌ Don't manually edit operation IDs (use template naming)
- ❌ Don't move files between operation folders (breaks dashboard links)
- ❌ Don't delete OPERATION_METADATA.md (dashboard needs it)
- ❌ Don't create operations outside /operation/ folder
- ❌ Don't mix products from different operations in same folder

---

## Troubleshooting

### Operation Not Appearing in Selector

**Problem:** Created new operation but not showing in dropdown

**Solution:**
1. Verify folder name starts with `OP-`
2. Verify `OPERATION_METADATA.md` file exists
3. Restart server: `node server.js`
4. Refresh browser

### MDMP Products Not Showing

**Problem:** Created files in PLANNING/ but step count shows 0

**Solution:**
1. Verify files are in correct folder: `operation/OP-[NAME]/PLANNING/`
2. Verify files have `.md` extension
3. Verify step metadata in file (if using metadata comments)
4. Refresh browser

### Phase Not Transitioning

**Problem:** Click phase but nothing happens

**Solution:**
1. Check browser console for errors
2. Verify server is running on `localhost:3000`
3. Verify operation metadata file is readable
4. Try refreshing dashboard
5. Try transitioning to different phase

### Can't Switch Operations

**Problem:** Operation selector dropdown only shows one operation

**Solution:**
1. Verify multiple `OP-*` folders exist in `operation/` directory
2. Restart server: `node server.js`
3. Refresh browser (Ctrl+F5 for hard refresh)
4. Check browser console for errors

---

## Summary

**System now supports:**

✓ Multiple concurrent OPORDs
✓ Rapid operation creation from template
✓ Independent MDMP tracking per operation
✓ Automatic operation discovery
✓ Dynamic phase management per operation
✓ Operation-scoped incident and POAM tracking
✓ Claude analysis for specific operations
✓ Mid-session operation switching

**To get started:**

```bash
# 1. Create new operation
cp -r operation/OPERATION_TEMPLATE operation/OP-[CODE]_[TYPE]_[DATE]

# 2. Edit OPERATION_METADATA.md with OPORD details

# 3. Start server
node server.js

# 4. Open http://localhost:3000 and select operation from dropdown

# Done! Dashboard now tracks this operation's MDMP, incidents, POAMs, phases
```

---

**Questions?** Check CLAUDE.md section "MULTI-OPERATION MANAGEMENT" or README.md section "Multi-Operation Workflow"
