# CyberPlanner — Complete Project Guide

**A Comprehensive Overview of Architecture, Features, Components, and Legacy Items**

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Project Architecture](#project-architecture)
3. [Core Components](#core-components)
4. [Feature Catalog](#feature-catalog)
5. [Operational Systems](#operational-systems)
6. [Legacy & Consolidation Recommendations](#legacy--consolidation-recommendations)
7. [Usage Workflows](#usage-workflows)
8. [Deployment Guide](#deployment-guide)

---

## Executive Summary

**CyberPlanner** is a comprehensive military cyber operations planning and analysis system built on three pillars:

### Three Specialized Roles
1. **Cyber Operations Planner** — MDMP planning, cyber effects, strategic integration
2. **17C Host Analyst** — Endpoint forensics, artifact analysis, incident response
3. **17C Network Analyst** — Traffic analysis, threat detection, network architecture

### Five Operational Systems
1. **Role-Based AI Assistants** (YAML skill definitions)
2. **MDMP Planning Dashboard** (HTML/JavaScript interactive planning visualization)
3. **Operations Dashboard** (Real-time incident and POAM tracking)
4. **Word Document Export** (AR 25-50 compliant annex generation)
5. **Operational Documentation** (Markdown-based planning products)

### Integration Points
- Claude Code CLI integration via `CLAUDE.md`
- Node.js HTTP server for dashboard delivery
- REST API for document export (`/api/export/annex`)
- Doctrine library reference system
- Competency framework (NICE alignment, proficiency tiers)

---

## Project Architecture

```
CyberPlanner/
│
├── 🎯 CORE SYSTEM FILES
│   ├── CLAUDE.md                    ← Claude Code initialization (MDMP + doctrine)
│   ├── README.md                    ← Project overview
│   ├── LICENSE.md                   ← Usage terms
│   └── PROJECT_GUIDE.md             ← This file
│
├── 👥 ROLES (YAML)
│   └── docs/roles/
│       ├── skill-cyberopsplanner.yaml   ← Cyber Ops Planner role
│       ├── skill-host-analyst.yaml      ← 17C Host Analyst role
│       ├── skill-network-analyst.yaml   ← 17C Network Analyst role
│       ├── skill-g2-intelligence.yaml   ← G2 Intelligence Officer role
│       ├── skill-g3-operations.yaml     ← G3 Operations Officer role
│       ├── skill-g4-logistics.yaml      ← G4 Logistics Officer role
│       ├── skill-g6-signal.yaml         ← G6 Signal Officer role
│       ├── skill-fires.yaml             ← FSCOORD Fires Officer role
│       ├── skill-engineer.yaml          ← ENCOORD Engineer Officer role
│       └── skill-protection.yaml        ← Protection Officer role
│
├── 🖥️ DASHBOARDS & FRONTEND
│   ├── frontend/                    ← Frontend files served by Node.js
│   │   ├── dashboard.html           ← Operations dashboard (incidents, POAMs)
│   │   ├── mdmp-dashboard.html      ← MDMP planning dashboard
│   │   ├── network-map.html         ← Network visualization
│   │   ├── ir-playbook-dashboard.html ← Incident response playbooks
│   │   ├── css/                     ← Dashboard styling
│   │   └── js/                      ← Dashboard JavaScript logic
│   ├── server.js                    ← Node.js HTTP server + API
│   ├── package.json                 ← Node dependencies (docx library)
│   └── package-lock.json            ← Dependency lock file
│
├── 📚 DOCUMENTATION (Markdown)
│   ├── docs/
│   │   ├── README.md                ← Documentation hub
│   │   ├── QUICKSTART.md            ← Setup guide
│   │   ├── CONTRIBUTING.md          ← Contribution guidelines
│   │   ├── roles/                   ← Role documentation
│   │   │   ├── ROLES.md              ← Role switching guide
│   │   │   ├── mdmp-role-mapping.md
│   │   │   └── task-role-map.md
│   │   ├── competency/              ← Competency framework
│   │   │   ├── competency-matrix.md
│   │   │   ├── proficiency-tiers.md
│   │   │   └── nice-alignment.md
│   │   ├── presentations/           ← Briefing guides
│   │   │   └── PRESENTATION_STYLE_GUIDE.md
│   │   ├── doctrine/                ← Doctrinal references
│   │   │   ├── INDEX.md
│   │   │   ├── AGENT_INTEGRATION_GUIDE.md
│   │   │   └── [PDF references]
│   │   └── POAMs/                   ← POAM documentation
│   │       ├── README.md
│   │       ├── INDEX.md
│   │       ├── EXAMPLES/
│   │       ├── GUIDANCE/
│   │       ├── TEMPLATES/
│   │       └── TRACKER/
│   ├── DASHBOARD_README.md          ← Dashboard user guide
│   ├── EXPORT_ANNEXES_README.md     ← Word export documentation
│   ├── IMPLEMENTATION_SUMMARY.md    ← Export feature overview
│   └── QUICK_START_EXPORT.txt       ← Quick reference for export
│
├── 🎯 OPERATIONAL PRODUCTS
│   └── operation/
│       ├── README.md                ← Operations index
│       ├── OPERATIONS_INDEX.md      ← Operations status tracking
│       ├── OPERATION_TEMPLATE/      ← Template for new operations
│       │   ├── OPERATION_METADATA.md
│       │   └── README.md
│       └── OP-DEFENDER_DCO-RA_2026-02-23/  ← Example: BPEnergy Operation
│           ├── OPERATION_METADATA.md       ← Mission context
│           ├── README.md                   ← Quick reference
│           ├── PLANNING/
│           │   └── COA_Analysis_Wargame_2026-02-23.md
│           ├── OPERATIONS/
│           │   ├── Cyber_Annex_Operational_Focus_2026-02-23.md (Annex M)
│           │   └── Task_Organization_Summary_2026-02-23.md (Annex A)
│           ├── EXECUTION/
│           │   └── Incident_Reports/
│           │       └── Incident_Report_001_lockfile_ps1_dc2_2026-02-23.md
│           ├── INTELLIGENCE/
│           │   ├── Threat_COA_Analysis_APT41_2026-02-23.md
│           │   └── PIR_RFI_Tracker_2026-02-23.md
│           └── POAMs/
│               ├── POAM-001_lockfile_Investigation.md
│               ├── POAM-002_lockfile_Remediation.md
│               └── POAM_Tracker_2026-02-23.md
│
└── 🔧 LEGACY/DEPRECATED
    ├── generate_mdmp_professional.py     ← PowerPoint generator (see consolidation)
    └── docs/poam/ (lowercase)            ← Duplicate of docs/POAMs/
```

---

## Core Components

### 1. AI Role System (YAML Skill Definitions)

**Purpose:** Define specialized analyst roles that users can switch between

**Files:** Located in `docs/roles/`
- `skill-cyberopsplanner.yaml` (3,059 bytes)
- `skill-host-analyst.yaml` (2,537 bytes)
- `skill-network-analyst.yaml` (2,789 bytes)

**How It Works:**
- Claude Code loads `CLAUDE.md` automatically
- Users request role switches: "Switch to host analyst mode"
- Aliases available: `17c-host`, `host-analysis`, etc.
- Each role has specialized system prompt defining approach and constraints

**Integration:**
```bash
claude code .     # Loads CLAUDE.md automatically
# YAML files referenced in CLAUDE.md system prompts
```

---

### 2. MDMP Planning Dashboard

**Purpose:** Interactive visualization of Military Decision-Making Process (7 steps)

**File:** `mdmp-dashboard.html` (1,300+ lines)

**Features:**
- 📊 7-step MDMP process flow visualization
- 📋 32+ planning products organized by step
- 🎯 6 critical decision gates with authority/timing
- 👥 Personnel role assignments
- 📈 Progress tracking and completion indicators
- 📄 **NEW:** Export annexes as AR 25-50 compliant Word documents

**Access:** `http://localhost:3000/mdmp-dashboard.html`

**Data:**
- Embedded in HTML (no database)
- Tailored for OP-DEFENDER BPEnergy operation
- Real-time status updates via JavaScript

---

### 3. Operations Dashboard

**Purpose:** Real-time tracking of incidents, POAMs, and threat intelligence

**File:** `dashboard.html` (1,400+ lines)

**Features:**
- 📌 Overview tab (executive summary, key metrics)
- 🎯 Operations tab (active operations list)
- 📋 POAMs tab (plans of action and milestones)
- 🔴 Incidents tab (critical findings and status)
- 🧠 Intelligence tab (threat actors, malware, COAs)
- ⏱️ Timeline tab (investigation milestones)

**Access:** `http://localhost:3000/` or `http://localhost:3000/dashboard.html`

**Data Source:**
- Pulls from `operation/` folder files
- Embedded data for OP-DEFENDER operation

---

### 4. Word Document Export System

**Purpose:** Generate AR 25-50 compliant military operational annexes

**Components:**
- **Backend:** Enhanced `server.js` with `/api/export/annex` endpoint
- **Frontend:** Export buttons on MDMP dashboard
- **Library:** `docx@^8.5.0` npm package
- **Formatting:** 1" margins, UNCLASSIFIED // FOUO marking, professional military style

**Supported Exports:**
- Annex M (Cyber Operations)
- Annex A (Task Organization)
- _More can be added by extending annexMap in server.js_

**Access:** Click export buttons on `http://localhost:3000/mdmp-dashboard.html`

---

### 5. HTTP Server & API

**Purpose:** Deliver dashboards and provide export API

**File:** `server.js` (150+ lines)

**Endpoints:**
- `GET /` → Serves dashboard.html
- `GET /mdmp-dashboard.html` → Serves MDMP dashboard
- `GET /api/export/annex?name=ANNEX-M&operation=...` → Generates .docx file

**Features:**
- MIME type detection
- CORS headers for API access
- Graceful error handling
- Custom port support via `PORT` environment variable
- WHATWG URL API (no deprecation warnings)

**Start:**
```bash
node server.js        # Port 3000 (default)
PORT=3001 node server.js  # Custom port
```

---

### 6. Doctrine Library & Reference System

**Purpose:** Provide authoritative doctrinal grounding for all analysis

**Location:** `docs/doctrine/`

**Included References:**
- ADP 5-0 (Operations Process)
- FM 3-12 (Cyber Operations)
- ATP 2-01.3 (Intelligence Preparation of Battlefield)
- JP 3-12 (Joint Cyber Operations)
- MITRE ATT&CK framework references
- ~15 doctrinal PDFs

**Integration:**
- Referenced in CLAUDE.md system prompt
- Cited by AI roles during analysis
- Enables doctrine-grounded recommendations

---

### 7. Operational Planning Products

**Purpose:** Contain all planning and operational outputs for specific missions

**Structure:** `operation/[OP-CODE]/`

**Included for OP-DEFENDER:**
- OPERATION_METADATA.md — Mission context, personnel, authorities
- README.md — Quick reference
- COA_Analysis_Wargame_2026-02-23.md — Wargaming outputs
- Cyber_Annex_Operational_Focus_2026-02-23.md — Annex M (cyber operations)
- Task_Organization_Summary_2026-02-23.md — Annex A (personnel)
- Incident_Report_001_lockfile_ps1_dc2_2026-02-23.md — Critical findings
- POAM-001_lockfile_Investigation.md — Investigation milestones
- POAM-002_lockfile_Remediation.md — Remediation plan
- Threat_COA_Analysis_APT41_2026-02-23.md — Threat intelligence
- PIR_RFI_Tracker_2026-02-23.md — Intelligence requirements

---

## Feature Catalog

### By User Role

#### Cyber Operations Planner
- ✅ MDMP running estimates
- ✅ Cyber annex/appendix drafting
- ✅ Cyberspace terrain analysis (IPB)
- ✅ Threat COA development (MLCOA/MDCOA)
- ✅ Course of action (COA) analysis and wargaming
- ✅ Risk assessment and decision support
- ✅ Personnel task organization
- ✅ Synchronization matrix development

#### 17C Host Analyst
- ✅ Endpoint forensics and artifact analysis
- ✅ Baseline deviation assessment
- ✅ Forensic timeline reconstruction
- ✅ Malware behavior and containment analysis
- ✅ Incident response triage
- ✅ Evidence documentation
- ✅ Host-level indicators of compromise (IOCs)

#### 17C Network Analyst
- ✅ Network traffic pattern analysis
- ✅ Beaconing and C2 channel identification
- ✅ Lateral movement path assessment
- ✅ Network architecture risk analysis
- ✅ Detection logic recommendations
- ✅ Protocol anomaly analysis
- ✅ Network-level IOCs

### By Operational System

#### Dashboard System
- ✅ Real-time incident tracking
- ✅ POAM status visualization
- ✅ Personnel roster display
- ✅ Threat actor profiling
- ✅ Timeline milestone tracking
- ✅ Color-coded severity indicators
- ✅ Responsive design (desktop/tablet/mobile)

#### MDMP Planning System
- ✅ 7-step MDMP process visualization
- ✅ Planning product inventory (32+)
- ✅ Decision gate tracking
- ✅ Personnel role assignments
- ✅ Progress indicators
- ✅ Export to Word format

#### Document Export System
- ✅ AR 25-50 compliance formatting
- ✅ UNCLASSIFIED // FOUO marking
- ✅ 1-inch margins
- ✅ Professional fonts and spacing
- ✅ Multiple annex types (extensible)
- ✅ Date-stamped filenames
- ✅ Real-time status feedback

#### Doctrine System
- ✅ 15+ authoritative doctrine references
- ✅ ADP/FM/ATP/JP cross-reference
- ✅ MITRE ATT&CK framework integration
- ✅ NICE Framework alignment
- ✅ Competency matrix

---

## Operational Systems

### System 1: Role-Based AI Analysis

**How to Use:**
```bash
claude code .

# In conversation:
"Give me a cyber running estimate"
"Switch to host analyst mode"
"Network analyst perspective on this traffic"
```

**Output:** Doctrine-grounded analysis from selected role

---

### System 2: MDMP Planning

**How to Use:**
```bash
node server.js
# Navigate to: http://localhost:3000/mdmp-dashboard.html
```

**Output:** Interactive 7-step planning process with export capability

---

### System 3: Operations Tracking

**How to Use:**
```bash
node server.js
# Navigate to: http://localhost:3000/dashboard.html
```

**Output:** Real-time incident and POAM tracking dashboard

---

### System 4: Document Export

**How to Use:**
```bash
node server.js
# Navigate to: http://localhost:3000/mdmp-dashboard.html
# Click "Export Annex M" or "Export Annex A"
```

**Output:** .docx file (ANNEX-M_2026-02-24.docx) in downloads folder

---

### System 5: Operational Planning

**How to Use:**
```bash
# Review files in: operation/OP-DEFENDER_DCO-RA_2026-02-23/
# Use as reference for:
# - Planning products
# - POAM templates
# - Incident documentation
# - Intelligence analysis
```

**Output:** Complete planning product library ready for HQ submission

---

## Legacy & Consolidation Recommendations

### Items Identified for Review

#### 1. ❌ **PowerPoint Generator Script** — `generate_mdmp_professional.py`

**Status:** Legacy/Potentially Redundant

**Reason:**
- Creates static PowerPoint presentations with military styling
- MDMP dashboard now provides interactive HTML-based alternative
- HTML dashboards are:
  - More accessible (no MS Office required)
  - Real-time updatable
  - Network-shareable
  - Responsive on all devices

**Recommendation:** ⚠️ **CONSOLIDATE**
- Keep script as reference for:
  - Print-to-PDF functionality for formal briefing distribution
  - Complex presentation logic examples
- Primary workflow → Use HTML dashboard (`mdmp-dashboard.html`)
- Fallback → Use Python script only for:
  - Final hardcopy briefing distribution to command staff
  - Offline viewing requirements
  - PowerPoint-specific features

**Action Items:**
- [ ] Update PRESENTATION_STYLE_GUIDE.md to reference mdmp-dashboard.html as primary option
- [ ] Add note: "For offline briefings, use `generate_mdmp_professional.py` if PowerPoint required"
- [ ] Maintain script in repo but mark as "secondary option"

---

#### 2. ❌ **Duplicate POAM Documentation** — `docs/poam/` (lowercase)

**Status:** Clear Duplication

**Details:**
- `docs/poam/README.md` — 12,753 bytes (minimal content)
- `docs/POAMs/` (uppercase) — Full structured POAM system with:
  - EXAMPLES/ (3 example POAMs)
  - GUIDANCE/ (4 guidance documents)
  - TEMPLATES/ (3 templates)
  - TRACKER/ (POAM log)

**Recommendation:** ✅ **CONSOLIDATE**
- Delete: `docs/poam/` (lowercase folder)
- Keep: `docs/POAMs/` (uppercase, complete system)

**Action Items:**
- [ ] Delete `docs/poam/README.md`
- [ ] Update all links to reference `docs/POAMs/` instead
- [ ] Verify all documentation points to uppercase version

---

#### 3. ⚠️ **Multiple README Documentation Files** — Root Level

**Files:**
- `README.md` (11,674 bytes) — Main project overview
- `DASHBOARD_README.md` (11,817 bytes) — Dashboard user guide
- `EXPORT_ANNEXES_README.md` (9,972 bytes) — Export feature documentation
- `IMPLEMENTATION_SUMMARY.md` (7,663 bytes) — Export summary
- `QUICK_START_EXPORT.txt` (5,075 bytes) — Export quick start

**Status:** Partial Consolidation Opportunity

**Analysis:**
- `README.md` → Project-level overview ✅ (appropriate)
- `DASHBOARD_README.md` → Should move to `docs/dashboards/README.md`
- `EXPORT_ANNEXES_README.md` → Complete technical doc (valuable, keep)
- `IMPLEMENTATION_SUMMARY.md` → Quick overview (could be integrated)
- `QUICK_START_EXPORT.txt` → Visual guide (keep for quick reference)

**Recommendation:** 📋 **PARTIAL CONSOLIDATION**

**Action Items:**
- [ ] Create `docs/dashboards/` folder
- [ ] Move `DASHBOARD_README.md` → `docs/dashboards/README.md`
- [ ] Keep `EXPORT_ANNEXES_README.md` in root (frequently accessed)
- [ ] Keep `QUICK_START_EXPORT.txt` in root (visual reference)
- [ ] Update `README.md` to link to these resources in proper locations
- [ ] Create index in `docs/README.md` pointing to all guides

---

#### 4. ⚠️ **Unorganized Doctrine PDFs** — `docs/doctrine/`

**Status:** Reference Material (Acceptable)

**Current:**
- 15 PDFs mixed in `docs/doctrine/` folder
- No subfolder organization (all at same level)
- AGENT_INTEGRATION_GUIDE.md and INDEX.md reference them

**Recommendation:** 📚 **ORGANIZE**

**Suggested Structure:**
```
docs/doctrine/
├── INDEX.md                    # Master index
├── AGENT_INTEGRATION_GUIDE.md  # How to integrate doctrine
├── _core-doctrine/             # ADP/FM primary sources
│   ├── ADP_5-0.pdf
│   ├── FM_3-12.pdf
│   ├── FM_2-0.pdf
│   └── ...
├── _joint-doctrine/            # Joint publications
│   ├── JP_3-12.pdf
│   ├── JP_2-0.pdf
│   └── ...
├── _frameworks/                # Frameworks (MITRE, NICE, etc.)
│   ├── MITRE_ATT&CK.pdf
│   ├── NICE_Framework.pdf
│   └── ...
└── _references/                # Supporting references
    ├── ATP_series.pdf
    ├── TRADOC_guides.pdf
    └── ...
```

**Action Items:**
- [ ] Create subdirectories by doctrine category
- [ ] Move PDFs into appropriate folders
- [ ] Update INDEX.md with new structure
- [ ] Add brief description of each document

---

### Summary Table

| Item | Status | Recommendation | Action |
|------|--------|-----------------|--------|
| `generate_mdmp_professional.py` | Legacy | Keep as fallback | Mark as "secondary option" |
| `docs/poam/` (lowercase) | Duplicate | Delete | Remove folder |
| Root-level README files | Sprawling | Reorganize | Move to docs/dashboards/ |
| `docs/doctrine/` structure | Unorganized | Organize | Create subfolders by category |

---

## Usage Workflows

### Workflow 1: Receipt of Mission (MDMP Step 1)

```
1. User: "Receipt of mission for Operation EXAMPLE"
2. Claude (Planner): Provides initial cyber running estimate
   - Current posture
   - Cyber-specific constraints
   - RFIs and information gaps
   - Recommended cyber tasks
3. User reviews running estimate against OPORD
4. User: "What PIRs do we need?"
5. Claude provides priority intelligence requirements
6. Dashboard updated with new POAM-001
```

---

### Workflow 2: Planning (MDMP Steps 2-6)

```
1. User: "I'm at Step 2 — Mission Analysis"
2. Claude provides cyber mission analysis products:
   - Cyber OE assessment
   - Threat assessment
   - Cyberspace terrain analysis
3. User: "Generate COA Options"
4. Claude develops 2-3 cyber courses of action
5. User: "Wargame COA-2"
6. Claude models friction points, decision gates, timing
7. User: "Export annexes for submission"
8. Annexes generated as .docx files, ready for HQ
```

---

### Workflow 3: Incident Response (Operations)

```
1. Incident detected (lockfile.ps1 on dc2)
2. Dashboard updated with Incident_Report_001
3. User: "Host analyst — analyze this endpoint"
4. Host analyst provides forensic assessment
5. User: "Network analyst — what's the C2 pattern?"
6. Network analyst identifies beaconing
7. User: "Planner — develop response COA"
8. Planner develops 3-phase investigation/remediation plan
9. POAMs generated for each phase
10. Dashboard tracks POAM progress in real-time
```

---

### Workflow 4: Export for HQ Submission

```
1. Planning complete
2. User navigates to: http://localhost:3000/mdmp-dashboard.html
3. User clicks "Export Annex M"
4. Browser downloads: ANNEX-M_2026-02-24.docx
5. User opens in Microsoft Word
6. Document contains:
   - 1-inch margins
   - UNCLASSIFIED // FOUO marking
   - Professional military formatting
   - All planning content
7. User adds signatures/approvals
8. User submits to higher HQ
```

---

## Deployment Guide

### Quick Start

#### Option 1: CLI (Recommended for Planning)

```bash
# Install Claude Code (if not already installed)
npm install -g @anthropic-ai/claude-code

# Navigate to project
cd C:\Users\Avalon\Nextcloud\Projects\CyberPlanner

# Start Claude Code
claude code .

# In conversation, request what you need:
"Give me a cyber running estimate"
"Switch to host analyst mode"
```

#### Option 2: Web Dashboard (Best for Visualization)

```bash
# Install dependencies
npm install

# Start server
node server.js

# Open browser:
# - Operations Dashboard: http://localhost:3000
# - MDMP Dashboard: http://localhost:3000/mdmp-dashboard.html
```

#### Option 3: Both (Full System)

```bash
# Terminal 1: Start server
npm install
node server.js

# Terminal 2: Start Claude Code
claude code .

# Use both simultaneously:
# - Claude Code for analysis
# - Dashboards for visualization/export
```

---

### Installation

```bash
# 1. Clone repo
git clone [repo-url]
cd CyberPlanner

# 2. Install Node dependencies
npm install

# 3. Optional: Install Claude Code
npm install -g @anthropic-ai/claude-code

# 4. Ready to use!
```

---

### Verification

```bash
# Check installation
npm list
# Output: docx@8.5.0 (should show docx library)

# Verify server starts
node server.js
# Output: Server running at http://localhost:3000

# Verify dashboards load
# Visit http://localhost:3000 (should see operations dashboard)
# Visit http://localhost:3000/mdmp-dashboard.html (should see MDMP dashboard)
```

---

### Configuration

**Change Server Port:**
```bash
PORT=3001 node server.js
```

**Change Operation Context:**
Edit `CLAUDE.md` section: `## OPERATION CONTEXT (FILL-IN TEMPLATE)`

**Add New Annexes to Export:**
1. Edit `server.js` — Add to `annexMap` object
2. Edit `mdmp-dashboard.html` — Add export button
3. Restart server

---

## Key Metrics

| Metric | Value |
|--------|-------|
| **Total Documentation** | 40+ files |
| **MDMP Products** | 32+ outputs |
| **Roles Available** | 3 specialized |
| **Dashboards** | 2 (Operations + MDMP) |
| **Supported Exports** | 2 (Annex M, Annex A) |
| **Doctrinal References** | 15 PDFs + online |
| **Lines of Code** | 2,500+ (HTML/JS/Node) |
| **Node Dependencies** | 1 (docx library) |
| **POAM Templates** | 3 complete |
| **Example Operations** | 1 (OP-DEFENDER) |

---

## Support & Troubleshooting

### Common Issues

**Issue:** "MDMP dashboard not loading"
- Solution: Verify server running (`node server.js`)
- Check: `http://localhost:3000/mdmp-dashboard.html`

**Issue:** "Export buttons not working"
- Solution: Verify docx library installed (`npm install`)
- Check browser console (F12) for errors
- Restart server

**Issue:** "Port 3000 already in use"
- Solution: `PORT=3001 node server.js`

**Issue:** "Can't switch roles in Claude Code"
- Solution: Verify `CLAUDE.md` in project root
- Restart Claude Code session

### Documentation References

- **General Questions:** See `README.md`
- **Dashboard Usage:** See `DASHBOARD_README.md`
- **Export Feature:** See `EXPORT_ANNEXES_README.md`
- **MDMP Integration:** See `docs/roles/ROLES.md`
- **Doctrine:** See `docs/doctrine/INDEX.md`
- **POAMs:** See `docs/POAMs/README.md`

---

## Future Roadmap

### Short Term (Next Release)
- [ ] Consolidate documentation files
- [ ] Organize doctrine PDFs
- [ ] Delete duplicate POAM folder
- [ ] Update Python script reference

### Medium Term (Q2 2026)
- [ ] Add more supported exports (Annex B, C, L)
- [ ] Batch export (ZIP archive)
- [ ] Custom letterhead/signatures
- [ ] PDF export option

### Long Term (2026+)
- [ ] WebSocket real-time updates
- [ ] User authentication and RBAC
- [ ] Database backend (replace embedded data)
- [ ] Mobile app version
- [ ] Integration with SIEM/EDR platforms
- [ ] Automated report generation

---

## Quick Reference

### File Location Guide

| Need | Location | Command |
|------|----------|---------|
| Start AI Planning | `CLAUDE.md` | `claude code .` |
| View MDMP Dashboard | `mdmp-dashboard.html` | `node server.js` then visit URL |
| View Operations Dashboard | `dashboard.html` | `node server.js` then visit URL |
| Export Annexes | Web button | Click on MDMP dashboard |
| Reference Doctrine | `docs/doctrine/` | Read INDEX.md |
| Understand Roles | `docs/roles/ROLES.md` | Read guide |
| POAM System | `docs/POAMs/` | Review templates |
| Current Operation | `operation/OP-DEFENDER_DCO-RA_2026-02-23/` | Review products |

---

## Classification & Compliance

**Classification:** UNCLASSIFIED // FOUO

**Compliance Standards:**
- AR 25-50 (Military correspondence)
- ADP 5-0 (Operations process)
- FM 3-12 (Cyber operations)
- JP 3-12 (Joint cyber)

**Data Handling:**
- Do NOT input classified information
- Do NOT use for classified analysis
- Maintain organizational data handling rules

---

## Acknowledgments

**Developed for:** U.S. Army Cyber Corps

**Based on:** Army and Joint doctrine
- ADP series (Operations, Intelligence, etc.)
- FM series (Manuals)
- JP series (Joint Publications)
- TRADOC strategic guidance

---

**Last Updated:** 2026-02-24

**Version:** 3.0 (Comprehensive Guide Release)

**Classification:** UNCLASSIFIED // FOUO

For questions or feedback, refer to project documentation or submit issues through appropriate channels.
