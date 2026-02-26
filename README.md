# CyberOpsPlanner

**Complete cyber planning system for U.S. Army cyber officers and staff.**

Combines interactive dashboards (MDMP planning, operations tracking, network visualization), three specialized Claude AI roles (Planner, Host Analyst, Network Analyst), and military-compliant Word export engine.

---

## Quick Start

**System Requirements:** Node.js 14+ (see [DEPENDENCIES.txt](./DEPENDENCIES.txt) for complete list)

**Start the dashboards:**
```bash
npm install  # First time only
node server.js
```

**Access the unified dashboard:**
- **Main Dashboard:** http://localhost:3000/
  - 📊 Overview — Operation status, phase timeline, key metrics
  - 📋 MDMP Planner — 7-step visualization, products by step, doctrine references, export annexes
  - 🚨 Incidents — Real-time incident tracking by severity
  - ✓ POAMs — NIST 800-171 remediation tracking
  - 🔗 Network — Multi-layer threat visualization (physical, logical, persona)
  - 🔍 Intelligence — Threat analysis and CTI integration
  - 🛡️ IR Playbooks — Separate dashboard at http://localhost:3000/ir-playbook-dashboard.html

**Use Claude AI roles:**
```bash
claude code .
```

Then request cyber planning analysis, switch between analyst roles for multi-perspective investigation, or export products for HQ submission.

---

## Key Features

✓ **MDMP Planning Dashboard** — 7-step visualization with 32+ planning products and export to Word
✓ **Operations Dashboard** — Real-time incident tracking, POAMs, personnel roster, threat intelligence
✓ **Network Map** — Multi-layer threat visualization (physical, logical, persona)
✓ **Multi-Operation Support** — Manage multiple simultaneous OPORDs
✓ **AR 25-50 Export** — Generate military-compliant Word annexes
✓ **NIST SP 800-171 POA&M** — Standards-based remediation tracking
✓ **Three Specialized Roles** — Planner, Host Analyst, Network Analyst with perspective-specific expertise
✓ **Incident Response Playbooks** — Standardized response procedures by threat type
✓ **17 Doctrine Documents** — Complete reference library by MDMP phase and role

---

## Create a New Operation

```bash
cp -r operation/OPERATION_TEMPLATE operation/OP-[CODE]_[TYPE]_[DATE]
# Edit operation/OP-[CODE]_[TYPE]_[DATE]/OPERATION_METADATA.md
```

Dashboard operation selector automatically loads all operations. See [docs/guides/operations/MULTI-OPERATION-GUIDE.md](./docs/guides/operations/MULTI-OPERATION-GUIDE.md) for complete workflow.

---

## Documentation

**Start here:**
- [What is CyberOpsPlanner?](./docs/guides/quickstart/WHAT_IS_CYBERPLANNER.md) — 5-minute overview
- [Dashboard Quick Start](./docs/guides/dashboard/DASHBOARD-QUICKSTART.md) — User guide for dashboards
- [Complete Documentation Index](./docs/DOCUMENTATION_INDEX.md) — Master navigation hub

**Key references:**
- [ROLES.md](./docs/roles/ROLES.md) — Three specialized roles and how to switch
- [MDMP Lens](./docs/MDMP_LENS.md) — What "good" looks like per MDMP step
- [Doctrine Library Index](./docs/doctrine/INDEX.md) — 17 authoritative doctrine files
- [Playbook Library](./docs/technical/SOP/) — Incident response playbooks by threat type
- [POA&M Guidance](./docs/POAMs/GUIDANCE/NIST-800-171-POAM-GUIDE.md) — NIST SP 800-171 standards
- [Reporting Templates](./docs/templates/) — SITREP, incident report, AAR templates

---

## Project Structure

```
CyberOpsPlanner/
├── server.js                           # Start here: node server.js
├── CLAUDE.md                           # Claude Code system prompt
├── README.md                           # This file
├── [HTML dashboards in frontend/]      # index.html, mdmp-dashboard.html, etc.
├── frontend/                           # Dashboard files and assets
│   ├── css/ & js/                      # Dashboard styling and JavaScript
│   └── [HTML dashboards]
├── package.json                        # Node.js dependencies
│
├── docs/                               # Complete documentation
│   ├── DOCUMENTATION_INDEX.md          # Master navigation
│   ├── guides/                         # User guides by audience
│   ├── technical/                      # Technical architecture & SOPs
│   ├── roles/                          # Role switching guide
│   ├── personnel/                      # Claude AI role definitions (YAML)
│   ├── doctrine/                       # Authoritative doctrine files
│   ├── POAMs/                          # NIST 800-171 guidance
│   └── templates/                      # SITREP, briefing templates
│
└── operation/                          # Multi-operation tracking
    ├── OPERATION_TEMPLATE/             # Copy for new operations
    ├── OPERATIONS_INDEX.md             # All active operations
    └── OP-[CODE]_[TYPE]_[DATE]/        # Specific operations
```

---

## Ten Specialized AI Roles

Role definitions located in `docs/roles/` and auto-loaded by Claude Code:

| Role | Aliases | Key Focus |
|------|---------|-----------|
| **Cyber Operations Planner** (default) | coop, cyber-planner | MDMP planning, cyber effects integration |
| **17C Host Analyst** | 17c-host, host-analysis | Endpoint forensics, artifact analysis |
| **17C Network Analyst** | 17c-network, traffic-analyst | Traffic analysis, C2 detection |
| **G2 Intelligence Officer** | g2, s2, intelligence | IPB, collection management, threat COAs |
| **G3 Operations Officer** | g3, s3, operations | MDMP execution, task org, sync matrices |
| **G4 Logistics Officer** | g4, s4, logistics | Supply, maintenance, distribution |
| **G6 Signal Officer** | g6, s6, signal, comms | PACE plans, network architecture |
| **FSCOORD (Fires)** | fscoord, fires, targeting | Fire support planning, D3A/F3EAD |
| **ENCOORD (Engineer)** | encoord, engineer, sapper | Mobility, countermobility, obstacles |
| **Protection Officer** | protection, force-protection | CAL/DAL, risk management, OPSEC |

**Switch roles anytime:**
```
"Switch to G2 mode"
"FSCOORD perspective on targeting"
"Act as the engineer for obstacle planning"
```

See [docs/roles/ROLES.md](./docs/roles/ROLES.md) for full role switching guide and role definitions.

---

## Workflows

**MDMP Planning with Export (Unified Dashboard):**
1. Open http://localhost:3000/ and select operation
2. Click 📋 **MDMP Planner** tab
3. View all 7 steps with product counts, progress bars, and doctrine references
4. View MDMP products by step or click "Export Annex M/A" for Word documents
5. Request Claude review: "Review my COA analysis for gaps"
6. Export and upload to HQ

**Multi-Role Threat Analysis:**
1. Paste endpoint artifact → Claude (host analyst): Identifies baseline deviations, persistence
2. Switch to network analyst → Analyzes traffic, identifies C2
3. Back to planner → Develops threat COA with decision points and indicators
4. Save to `operation/OP-[NAME]/INTELLIGENCE/threat-coa.md`

**Incident Response with Playbooks (Unified Dashboard):**
1. Open http://localhost:3000/ → 🚨 **Incidents** tab
2. Create new incident or select existing
3. Identify threat type (malware, C2, lateral movement, etc.)
4. Pull applicable playbook from `docs/technical/SOP/`
5. Request Claude analysis (host analyst or network analyst)
6. Update incident ticket with response actions
7. Document outcome in `operation/OP-[NAME]/EXECUTION/`

**Network Threat Visualization:**
1. Open http://localhost:3000/ → 🔗 **Network** tab
2. Import network CSV or view existing topology
3. Switch between Physical, Logical, and Persona layers
4. Identify key terrain, critical paths, choke points
5. Export topology for threat modeling analysis

See [docs/guides/operations/MULTI-OPERATION-GUIDE.md](./docs/guides/operations/MULTI-OPERATION-GUIDE.md) for complete workflows.

---

## Doctrine Library

17 authoritative doctrine files organized by MDMP phase, role, and question type:

- **Core MDMP:** ADP 5-0, FM 5-0, ADP 3-0
- **Intelligence & IPB:** FM 2-0, ATP 2-01, ATP 2-01.3
- **Army Cyber:** FM 3-12, ATP 3-12.3, ATP 6-02.71
- **Joint Cyber:** JP 3-12, JP 2-0, JP 2-01.3
- **Information Operations:** FM 3-13, ATP 3-13.1
- **Targeting:** FM 3-60, ATP 3-60
- **Multi-Domain:** TRADOC Pamphlet 525-3-1

See [docs/doctrine/INDEX.md](./docs/doctrine/INDEX.md) for complete reference index and quick links by phase/role.

---

## Incident Response Playbooks

Standardized response procedures by threat type:

**Malware & Persistence:**
- Malware Triage, Malware Outbreak Response, Persistence Response

**Attack Vectors & Lateral Movement:**
- Credential Theft Response, Lateral Movement Response, Privilege Escalation Response

**Exfiltration & C2:**
- Command & Control Response, Data Exfiltration Response

**Denial of Service:**
- Denial of Service Response

Location: `docs/technical/SOP/`

---

## Export Capabilities

**Word Documents:**
- Annex M (Cyber Operations)
- Annex A (Task Organization)
- AR 25-50 compliant formatting

**CSV/Excel:**
- Network topology data
- POA&M tracking
- Incident timelines
- Threat intelligence summaries

**Dashboard:**
- MDMP product summaries
- Daily SITREP snapshots
- Operational timeline views

---

## Contact & Support

**Issues & Feedback:**
- Report issues at: https://github.com/anthropics/claude-code/issues
- For Claude Code questions: `/help`

**System Status:**
- For CLAUDE.md system prompt help: See [CLAUDE.md](./CLAUDE.md)
- For dashboard setup help: See [docs/guides/dashboard/DASHBOARD-QUICKSTART.md](./docs/guides/dashboard/DASHBOARD-QUICKSTART.md)

---

**Classification:** UNCLASSIFIED // FOUO
