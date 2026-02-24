# CyberOpsPlanner

A **Claude Code integration** for U.S. Army cyber officers and staff. Provides three specialized analyst roles to support **MDMP**, **cyber operations**, **intelligence analysis**, and **planning**.

---

## Overview

**CyberOpsPlanner** is a doctrinal framework for integrating cyberspace operations into the Army operations process. It combines:

- **Cyber Operations Planner** — MDMP planning, synchronization, effects integration
- **17C Host Analyst** — Endpoint analysis, forensics, incident response support
- **17C Network Analyst** — Traffic analysis, threat detection, network architecture assessment

Each role is **doctrinally grounded** (ADP 5-0, FM 3-12, JP 3-12) and designed to operate as a **peer planning assistant** for cyber officers on Army and joint staffs.

---

## Who This Is For

- **U.S. Army Cyber Corps officers** (17A, etc.)
- **Cyber planners** supporting MDMP or operations process
- **Cyber intelligence analysts** preparing threat assessments or COA analysis
- **Staff elements** requiring cyber running estimates or decision support
- **Incident response teams** needing analyst perspectives on host/network findings

---

## What's New (v3.0)

### ✨ Comprehensive Documentation
- **[WHAT_IS_CYBERPLANNER.md](./WHAT_IS_CYBERPLANNER.md)** — Executive summary (read this first!)
- **[PROJECT_GUIDE.md](./PROJECT_GUIDE.md)** — Complete architecture and features
- **[CONSOLIDATION_PLAN.md](./CONSOLIDATION_PLAN.md)** — Improvement roadmap
- **[DOCUMENTATION_INDEX.md](./DOCUMENTATION_INDEX.md)** — Master navigation guide

### 🎯 Two Interactive Dashboards
- **MDMP Dashboard** (`http://localhost:3000/mdmp-dashboard.html`) — 7-step planning visualization + export annexes
- **Operations Dashboard** (`http://localhost:3000/`) — Real-time incident & POAM tracking

### 📄 AR 25-50 Word Export
- Export annexes as professionally formatted Word documents
- Military compliance (1" margins, UNCLASSIFIED // FOUO marking)
- Ready for HQ submission

---

## Quick Start

### Option 1: Create New Operation & Use Dashboard

```bash
# 1. Create operation from template
cp -r operation/OPERATION_TEMPLATE operation/OP-[CODE]_[TYPE]_[DATE]

# 2. Edit OPERATION_METADATA.md with OPORD details
# Fill in: operation name, command structure, mission, timeline, authorities

# 3. Install dependencies (first time only)
npm install

# 4. Start dashboard server
node server.js

# 5. Open unified dashboard
# http://localhost:3000
# - Operation selector auto-loads all OP-* folders
# - Select your operation from dropdown

# 6. Use dashboard
# - MDMP Planner: Add planning products, track step progress
# - Overview: Monitor operation phase and transitions
# - Incidents: Track incident reports
# - POAMs: Track remediation actions
# - Network Map: Visualize network topology
```

### Option 2: Start with AI Planning (Claude Code)

```bash
# 1. Start Claude Code
claude code .

# 2. Request analysis for your operation
"Create a cyber running estimate for OP-[CODE]"
"Give me threat COA analysis for this operation"
"Switch to host analyst mode"
```

### Option 3: Both (Full System)

Run dashboards + Claude Code simultaneously:

```bash
# Terminal 1: Start server
node server.js

# Terminal 2: Start Claude Code
claude code .

# Use dashboard for planning/tracking
# Use Claude for analysis/products
```

---

## Project Structure

```
CyberOpsPlanner/
├── README.md                          # This file
├── CLAUDE.md                          # Main system context (Claude Code loads this)
├── ROLES.md                           # Role switching guide & quick reference
│
├── Skill Definitions (YAML)
├── skill-cyberopsplanner.yaml         # Cyber Operations Planner
├── skill-host-analyst.yaml            # 17C Host Analyst
├── skill-network-analyst.yaml         # 17C Network Analyst
│
├── Reference Documentation
├── competency-matrix.md               # Cross-role competency comparison
├── proficiency-tiers.md               # Skill proficiency levels for cyber roles
├── mdmp-role-mapping.md               # How each role contributes to MDMP steps
├── task-role-map.md                   # Role responsibilities by task type
├── nice-alignment.md                  # NICE Framework alignment
│
└── Skill Overviews (Markdown)
    ├── skill-cyberopsplanner.md       # Planner role overview
    ├── skill-17c-host-analyst.md      # Host analyst overview
    └── skill-17c-network-analyst.md   # Network analyst overview
```

---

## How to Use

### Role Switching

Simply tell Claude which role you need:

```
"Switch to host analyst mode"
"I need the network analyst perspective on this traffic"
"Act as a cyber ops planner — what's my risk assessment?"
```

Use aliases for brevity:
- `coop`, `cyber-planner`, `ops-planner` → Cyber Operations Planner
- `17c-host`, `host-analysis` → Host Analyst
- `17c-network`, `network-analysis`, `traffic-analyst` → Network Analyst

### Example Workflows

#### Workflow 1: Running Estimate (Planning)
```
1. "I'm at receipt of mission for Operation EXAMPLE"
2. Claude provides initial cyber running estimate
3. "What are my cyber-specific RFIs?"
4. Claude recommends collection priorities
```

#### Workflow 2: Threat Analysis (Multi-Role)
```
1. "Host analyst: analyze this endpoint artifact timeline"
2. Host analyst assesses baseline deviations
3. "Network analyst: what does the traffic tell us?"
4. Network analyst identifies C2 indicators
5. "Planner mode: integrate these findings into a threat COA"
6. Planner develops threat narrative with indicators
```

#### Workflow 3: MDMP Wargaming
```
1. "We're at COA Analysis (Step 4)"
2. "Host analyst perspective: what are the friction points?"
3. "Network analyst perspective: what are the tactical risks?"
4. "Planner: synthesize into risk assessment and recommendation"
```

---

## Features

### 🏢 Multi-Operation Management
- **Operation Selector** — Dashboard auto-loads all active operations from `operation/` folder
- **Create from Template** — Generate new operation folder in seconds
- **Automatic Discovery** — New operations appear in selector immediately
- **Independent Tracking** — Each operation maintains separate MDMP products, incidents, POAMs, intelligence
- **Dynamic Phase Management** — Track each operation through Planning → Execution → Transition → Completion phases
- **Context Switching** — Switch between operations mid-session without losing state

### 🤖 Three AI Roles

**Cyber Operations Planner**
- Cyber running estimates and staff estimates
- Cyber annex/appendix drafting (OPORD, CONOP, etc.)
- Cyberspace terrain/IPB analysis
- Threat COA development (MLCOA/MDCOA)
- MDMP phase support and synchronization
- Risk assessment and decision brief inputs
- PIR/RFI tracking and collection planning

**17C Host Analyst**
- Endpoint artifact analysis and recognition
- Forensic timeline development
- Baseline deviation assessment
- Malware behavior and indicator correlation
- Incident response triage and support
- Host-level evidence documentation

**17C Network Analyst**
- Network traffic pattern analysis
- Protocol behavior and anomaly detection
- Beaconing and C2 channel identification
- Lateral movement path assessment
- Network architecture risk analysis
- Detection logic recommendations

### 📊 MDMP Planning Dashboard
- 7-step Military Decision-Making Process visualization
- 32+ planning products organized by step
- 6 critical decision gates with timing/authority
- Real-time progress tracking
- **Export Annexes** — Generate AR 25-50 compliant Word documents

### 🎯 Operations Dashboard
- Real-time incident tracking (severity-coded)
- POAM (Plans of Actions and Milestones) status
- Personnel roster display
- Threat intelligence (malware, actors, COAs)
- Investigation timeline tracking
- Multi-tab interface (Overview, Operations, POAMs, Incidents, Intelligence, Timeline)

### 📄 Word Document Export
- AR 25-50 military compliance (margins, fonts, formatting)
- UNCLASSIFIED // FOUO classification marking
- Annex M (Cyber Operations) and Annex A (Task Organization)
- Date-stamped filenames
- Ready for HQ submission

### 📚 Doctrine Library
- 15+ authoritative doctrinal references (ADP, FM, JP, ATP)
- MITRE ATT&CK framework
- NICE Workforce framework
- MDMP step-to-role mapping
- Competency framework

---

## Doctrinal Foundation

All roles are grounded in **U.S. Army and Joint doctrine**:

**Core Planning:**
- ADP 5-0 — The Operations Process
- FM 5-0 — Planning and Orders Production

**Intelligence & IPB:**
- FM 2-0 — Intelligence
- ATP 2-01.3 — Intelligence Preparation of the Battlefield

**Cyber Operations:**
- FM 3-12 — Cyberspace and Electromagnetic Warfare Operations
- JP 3-12 — Cyberspace Operations

**Targeting & Integration:**
- FM 3-60 — Targeting
- TRADOC Pam 525-3-1 — Multi-Domain Operations

See **CLAUDE.md** for full doctrinal references.

---

## Multi-Operation Workflow

### Managing Multiple OPORDs

**Scenario:** Multiple cyber operations active simultaneously (OPORD A, B, C)

```
1. Dashboard loads all operations:
   - OP-DEFENDER_DCO-RA_2026-02-25
   - OP-SENTINEL_DCO-IDM_2026-02-24
   - OP-EXAMPLE_HUNT_2026-02-23

2. User selects OP-DEFENDER from dropdown
   → All data refreshes to show DEFENDER products/incidents/POAMs

3. User switches to OP-SENTINEL
   → Dashboard shows SENTINEL's MDMP steps, phase, incidents, etc.

4. Each operation maintains:
   - Independent MDMP planning products
   - Separate incident logs and POAMs
   - Own network topology and intelligence files
   - Distinct phase and status tracking
   - Unique personnel and command structure
```

### Creating Operations at Scale

When new OPORDs arrive:

```bash
# Rapid operation creation (30 seconds per OPORD)
for OPORD in OPORD-A OPORD-B OPORD-C; do
  cp -r operation/OPERATION_TEMPLATE operation/OP-${OPORD}_2026-02-25
  # Edit OPERATION_METADATA.md for each
done

# Restart dashboard (auto-discovers new operations)
node server.js

# All operations immediately available in selector
```

### Claude Integration

Request analysis scoped to specific operations:

```
"Analyze planning risks for OP-DEFENDER"
"Create threat COA for OP-SENTINEL"
"Give me incident timeline for OP-EXAMPLE"
"Switch to host analyst mode — analyze findings from OP-DEFENDER"
```

---

## Key Principles

✅ **Unclassified discipline** — All analysis maintains unclassified discipline
✅ **Doctrine-grounded** — Cite doctrine by publication and paragraph
✅ **Decision-focused** — Products support commander decision-making
✅ **Multi-operation capable** — Manage multiple concurrent OPORDs independently
✅ **Rapid deployment** — Create new operations from template in seconds
✅ **Peer-level support** — Speak as a peer staff officer
✅ **Risk-aware** — Articulate cyber risks in mission terms

❌ **No exploitation guidance** — No step-by-step TTPs or evasion techniques
❌ **No tool-specific procedures** — Discuss tools at capability level only
❌ **No classified analysis** — Maintain unclassified discipline

---

## Comprehensive Documentation (v3.0)

### 📖 Start Here — Four Essential Guides

| Document | Purpose | Audience | Read Time |
|----------|---------|----------|-----------|
| **[WHAT_IS_CYBERPLANNER.md](./WHAT_IS_CYBERPLANNER.md)** | Complete system overview | Everyone | 15 min |
| **[PROJECT_GUIDE.md](./PROJECT_GUIDE.md)** | Architecture & all features | Technical, Planners | 45 min |
| **[DOCUMENTATION_INDEX.md](./DOCUMENTATION_INDEX.md)** | Master navigation index | Everyone | 5 min |
| **[CONSOLIDATION_PLAN.md](./CONSOLIDATION_PLAN.md)** | Improvement roadmap | Managers, Developers | 25 min |

### 🎯 Using the System

- **[DASHBOARD_README.md](./DASHBOARD_README.md)** — Operations dashboard guide
- **[EXPORT_ANNEXES_README.md](./EXPORT_ANNEXES_README.md)** — Word export documentation
- **[QUICK_START_EXPORT.txt](./QUICK_START_EXPORT.txt)** — Visual quick start guide

### 📚 Reference Materials

- **[docs/roles/ROLES.md](./docs/roles/ROLES.md)** — Complete role switching guide with examples
- **[docs/competency/competency-matrix.md](./docs/competency/competency-matrix.md)** — Cross-role competency comparison
- **[docs/roles/mdmp-role-mapping.md](./docs/roles/mdmp-role-mapping.md)** — How roles support each MDMP step
- **[docs/roles/task-role-map.md](./docs/roles/task-role-map.md)** — Role assignments by task type
- **[docs/competency/nice-alignment.md](./docs/competency/nice-alignment.md)** — NICE Framework alignment
- **[docs/POAMs/README.md](./docs/POAMs/README.md)** — Plan of Actions and Milestones system

---

## Setup Options

### Option A: Claude Code CLI (Recommended)
1. Clone repository
2. Place `CLAUDE.md` in project root
3. Run `claude code` in the directory
4. Start interacting — roles load automatically

### Option B: Claude.ai Web
1. Create a new conversation
2. Paste `CLAUDE.md` content into conversation context
3. Copy YAML role definitions for reference
4. Use text instructions to switch roles

### Option C: Custom Integration
- Extract system prompts from YAML files
- Integrate into your workflow management tool
- Use role definitions as staff augmentation guides

---

## Example Commands

```
# Running Estimate
"Give me a cyber running estimate for Operation [NAME]"

# Threat Analysis
"Switch to network analyst — analyze this traffic pattern"
"Host analyst perspective: what artifacts suggest persistence?"

# MDMP Support
"I'm at Step 3 (COA Development) — what cyber tasks must I allocate?"
"We're wargaming now — what are the critical decision points?"

# Risk Assessment
"What's the residual risk if we execute COA Bravo?"
"Prioritize cyber risks to the battalion commander"

# Staffing
"What cyber personnel do I need for this operation?"
"How do these three analysts complement each other?"
```

---

## Integration with Existing Workflows

### With MDMP Tools
- Use cyber running estimate to populate cyber annex inputs
- Reference threat COAs in wargaming matrices
- Integrate risk assessments into commander's critical information requirements (CCIR)

### With Intelligence Platforms
- Export threat indicators and IOC lists
- Use network analyst output to feed SIEM/NDR configurations
- Correlate host analyst findings with incident tracking systems

### With Planning Systems
- Populate synchronization matrices with cyber integration timelines
- Use COA analysis friction points in decision support briefs
- Track cyber-specific RFIs through collection management

---

## Limitations & Constraints

- **Unclassified only** — Do not use for classified analysis
- **Decision support, not replacement** — Supports officer judgment; does not replace commander decision-making
- **No legal advice** — Route legal/authority questions to appropriate channels
- **No exploitation steps** — Does not provide TTPs, malware development, or evasion techniques
- **No tool procedures** — Discusses tools at capability level; refer to tool documentation for specific commands

---

## Roadmap

**v3.0 Complete (Current):**
- ✅ MDMP Planning Dashboard (7-step visualization)
- ✅ Operations Dashboard (real-time tracking)
- ✅ AR 25-50 Word document export
- ✅ Comprehensive documentation (81 files, 19,500+ lines)
- ✅ Consolidation plan for improvements

**v3.1 (Next):**
- [ ] Execute consolidation plan (90 min cleanup)
- [ ] Add more supported annexes (B, C, L)
- [ ] Batch export (ZIP archive)
- [ ] Custom letterhead/signatures

**Future Roadmap:**
- [ ] Support for joint cyber operations (CCMD perspective)
- [ ] Expanded targeting support (HP/HVT integration)
- [ ] Information operations integration guides
- [ ] WebSocket real-time updates
- [ ] Database backend (replace embedded data)
- [ ] Mobile app version
- [ ] SIEM/EDR platform integration

---

## Contributing

**For Army/Joint personnel:**
- Submit role enhancements through official channels
- Propose doctrine updates aligned with new publications
- Share anonymized planning products for validation

**For other users:**
- Fork and adapt for your organization's doctrine
- Submit documentation improvements via pull requests
- Report inconsistencies with referenced doctrine

---

## Data Handling & Classification

All content in this repository is **UNCLASSIFIED** and **publicly shareable**.

When using CyberOpsPlanner:
- **Do not input classified information**
- **Do not use for classified analysis**
- **Maintain your organization's data handling rules**
- **Ensure analysis aligns with your authorities and ROE**

---

## License

[Specify your license here — e.g., MIT, Apache 2.0, Government license, etc.]

---

## Support & Questions

**Documentation:**
- **Getting started:** Read [WHAT_IS_CYBERPLANNER.md](./WHAT_IS_CYBERPLANNER.md) (15 min)
- **Find anything:** Use [DOCUMENTATION_INDEX.md](./DOCUMENTATION_INDEX.md)
- **Usage questions:** Refer to role documentation in [docs/roles/](./docs/roles/)
- **Doctrine alignment:** See CLAUDE.md doctrinal knowledge base
- **Dashboard help:** See [DASHBOARD_README.md](./DASHBOARD_README.md)

**Integration support:**
- Check your organization's AI/Claude Code governance
- Review [PROJECT_GUIDE.md](./PROJECT_GUIDE.md) for integration points

---

## Changelog

### v3.0 (Current - Comprehensive Release)
**Major additions:**
- ✅ MDMP Planning Dashboard — 7-step planning visualization with export
- ✅ Operations Dashboard — Real-time incident and POAM tracking
- ✅ Word Document Export — AR 25-50 compliant annexes
- ✅ Comprehensive Documentation — 5 major guides, 81 files, 19,500+ lines
- ✅ Consolidation Plan — Roadmap for improvements
- ✅ Enhanced Server — REST API for document generation
- ✅ Fixed deprecation warnings — WHATWG URL API

**New files:**
- WHAT_IS_CYBERPLANNER.md (executive summary)
- PROJECT_GUIDE.md (comprehensive architecture)
- CONSOLIDATION_PLAN.md (improvement roadmap)
- DOCUMENTATION_INDEX.md (master navigation)
- SUMMARY_OF_GUIDES_CREATED.md (this release summary)
- mdmp-dashboard.html (interactive planning)
- DASHBOARD_README.md, EXPORT_ANNEXES_README.md, etc.

### v2.0 (Dashboard Release)
- Operations Dashboard for real-time tracking
- Enhanced server with export capabilities

### v1.0 (Initial Release)
- Three core roles: Cyber Ops Planner, Host Analyst, Network Analyst
- MDMP integration and competency matrices
- NICE Framework alignment
- Documentation and role-switching guide

---

## Acknowledgments

Developed for **U.S. Army Cyber Corps** in alignment with:
- Army Doctrine Publication (ADP) series
- Field Manual (FM) and Army Techniques Publication (ATP) references
- Joint Publications (JP) on cyber operations
- TRADOC strategic guidance

---

**Last Updated:** 2026-02-22
**For questions or feedback:** [Your contact/repo issue link]
