# What is CyberPlanner? — Executive Summary

**A comprehensive U.S. Army cyber operations planning and analysis system with AI-powered roles, interactive dashboards, and military doctrine integration.**

---

## The One-Sentence Answer

CyberPlanner is a **Claude Code integration** that provides **three specialized military analyst roles** (Planner, Host Analyst, Network Analyst) + **two interactive dashboards** for **MDMP planning and operations tracking** + **Word document export** for operational annexes.

---

## Core Mission

Help Army cyber officers and staff:
- ✅ Plan cyber operations using military doctrine (ADP 5-0, FM 3-12, JP 3-12)
- ✅ Analyze cyber incidents from multiple expert perspectives
- ✅ Track operational progress with real-time dashboards
- ✅ Generate formal military annexes for HQ submission
- ✅ Make decisions grounded in cyber risk and doctrine

---

## What You Get

### 1. Three Specialized AI Roles 🤖

**Cyber Operations Planner**
- MDMP planning support
- Cyber running estimates
- Course of action analysis
- Risk assessment
- Decision brief inputs

**17C Host Analyst**
- Endpoint forensics
- Artifact analysis
- Baseline deviations
- Incident response triage

**17C Network Analyst**
- Traffic pattern analysis
- Beaconing/C2 detection
- Lateral movement paths
- Detection logic

**How to Use:** Simply ask Claude to switch roles:
```
"Switch to host analyst mode"
"Give me the network analyst perspective on this traffic"
```

---

### 2. MDMP Planning Dashboard 📊

**Interactive 7-step planning process visualization**

- 📋 32+ planning products organized by MDMP step
- 🎯 6 critical decision gates with timing/authority
- 👥 Personnel role assignments
- 📈 Progress tracking
- 📄 **EXPORT TO WORD** — Generate AR 25-50 compliant annexes

**Access:** `http://localhost:3000/mdmp-dashboard.html`

**Use for:**
- Receipt of mission planning
- COA development and wargaming
- Decision support materials
- Submitting annexes to higher HQ

---

### 3. Operations Dashboard 🎯

**Real-time incident and POAM tracking**

- 🔴 Current incidents (critical findings)
- 📋 POAMs (Plans of Actions and Milestones)
- 👥 Personnel roster
- 🧠 Threat intelligence (actors, malware, COAs)
- ⏱️ Investigation timeline

**Access:** `http://localhost:3000/`

**Use for:**
- Monitoring active operations
- Tracking remediation progress
- Executive briefings
- Situational awareness

---

### 4. Word Document Export 📄

**Generate military-standard operational annexes**

- ✅ AR 25-50 compliance (margins, fonts, formatting)
- ✅ UNCLASSIFIED // FOUO marking
- ✅ Professional military style
- ✅ Ready for HQ submission

**Supported Annexes:**
- Annex M (Cyber Operations)
- Annex A (Task Organization)
- _(More can be added)_

**Use for:**
- OPORD annex development
- CONOP formatting
- Formal HQ submissions
- Briefing materials

---

### 5. Doctrine Library & Framework 📚

**15+ authoritative doctrinal references**

- Army Doctrine Publications (ADP 5-0, FM 3-12, etc.)
- Joint Publications (JP 3-12, JP 2-0, etc.)
- MITRE ATT&CK Framework
- NICE Workforce Framework
- Supporting ATP series

**Use for:**
- Ensuring doctrine-grounded analysis
- Training and reference
- Competency assessment
- Integration guidance

---

## Real-World Use Cases

### Scenario 1: Receipt of Mission (Monday Morning)

```
Cyber Officer: "I just got an OPORD for Operation EXAMPLE.
                Give me a cyber running estimate"

Claude (Planner): [Provides initial assessment]
                  Current posture, constraints, RFIs,
                  recommended cyber tasks

Officer: "What intelligence do we need?"

Claude: [Provides 4 Priority Intelligence Requirements]
        Identifies collection focus areas

Result: POAM-001 created for intelligence collection
        Dashboard updated
        Ready to proceed to Step 2 (Mission Analysis)
```

---

### Scenario 2: Incident Response (Active Operation)

```
Watch Officer: "We detected lockfile.ps1 on our domain controller"

Claude (Host Analyst): [Forensic analysis]
                       Timeline reconstruction, persistence mechanism,
                       indicators of compromise

Officer: "What about the network?"

Claude (Network Analyst): [Traffic analysis]
                          Beaconing pattern, C2 destination,
                          lateral movement indicators

Officer: "Develop response plan"

Claude (Planner): [3-phase plan]
                  Investigation → Eradication → Hardening
                  POAM-001 and POAM-002 created
                  Timeline and milestones tracked on dashboard

Dashboard: Shows real-time POAM progress
          Tracks remediation milestones
          Provides executive visibility
```

---

### Scenario 3: Planning Submission (End of Planning Process)

```
Planner: "We've completed MDMP Steps 1-6.
          Now I need to submit to brigade"

Officer navigates to: http://localhost:3000/mdmp-dashboard.html

Officer clicks: "Export Annex M"

Browser downloads: ANNEX-M_2026-02-24.docx

Officer opens in Word:
- 1-inch margins ✓
- UNCLASSIFIED // FOUO marking ✓
- Professional military formatting ✓
- All operational content ✓

Officer adds signatures, submits to Brigade HQ
```

---

## How It Works

### Architecture Overview

```
User Input
    ↓
┌───────────────────────────────────────┐
│ Three AI Roles (Claude + YAML prompts)│
│                                       │
│ • Planner (MDMP, strategy)            │
│ • Host Analyst (endpoint, forensics)  │
│ • Network Analyst (traffic, C2)       │
└───────────────────────────────────────┘
    ↓
┌───────────────────────────────────────┐
│ Web Dashboards (HTML + JavaScript)    │
│                                       │
│ • MDMP Dashboard (planning)           │
│ • Operations Dashboard (tracking)     │
│ • Export API (Word documents)         │
└───────────────────────────────────────┘
    ↓
Output
├── Operational Planning Products
├── AR 25-50 Compliant Annexes
├── Real-time Status Tracking
└── Decision Support Materials
```

---

## System Components

| Component | Purpose | Access |
|-----------|---------|--------|
| **CLAUDE.md** | AI role initialization | `claude code .` |
| **MDMP Dashboard** | 7-step planning visualization + export | `http://localhost:3000/mdmp-dashboard.html` |
| **Operations Dashboard** | Real-time incident/POAM tracking | `http://localhost:3000/` |
| **server.js** | HTTP server + export API | Automatic (Node.js) |
| **Operation Folder** | Planning products, POAMs, incidents | `operation/OP-DEFENDER_DCO-RA_2026-02-23/` |
| **Doctrine Library** | 15+ doctrinal references | `docs/doctrine/` |
| **Role Documentation** | Role definitions and guidance | `docs/roles/` |

---

## Quick Start (3 Steps)

### Step 1: Install
```bash
npm install
```

### Step 2: Start
```bash
node server.js
```

### Step 3: Use

**Option A - AI Planning:**
```bash
claude code .
# Request: "Give me a cyber running estimate"
```

**Option B - Dashboard:**
```
Browser → http://localhost:3000/mdmp-dashboard.html
Click → "Export Annex M"
```

---

## Key Differentiators

### Why CyberPlanner?

✅ **Doctrine-Grounded** — All analysis tied to Army/Joint doctrine

✅ **Military-Focused** — Designed for Army officers and staff

✅ **Multi-Expert** — Three specialized roles for different perspectives

✅ **Decision-Oriented** — Products support commander decision-making

✅ **Automated** — Generates formal products (running estimates, annexes, POAMs)

✅ **Visual** — Interactive dashboards for tracking and planning

✅ **Exportable** — Generate AR 25-50 compliant Word documents

✅ **Unclassified** — Safe for use with unclassified information

---

## What Problems Does It Solve?

### For Planners
❌ **Problem:** "How do I integrate cyber into MDMP?"
✅ **Solution:** MDMP dashboard shows cyber products needed at each step

### For Analysts
❌ **Problem:** "Endpoint analysis AND network analysis — where do I start?"
✅ **Solution:** Switch between host and network analyst roles

### For Operations
❌ **Problem:** "How do we track investigation progress?"
✅ **Solution:** Dashboard shows real-time POAM status

### For Leadership
❌ **Problem:** "We need formal annexes for higher HQ"
✅ **Solution:** Click export button, get AR 25-50 compliant Word doc

### For Teams
❌ **Problem:** "Are we aligned with doctrine?"
✅ **Solution:** All analysis grounded in ADP 5-0, FM 3-12, JP 3-12

---

## Under the Hood

### Technology Stack
- **Backend:** Node.js (HTTP server + REST API)
- **Frontend:** HTML5, CSS3, JavaScript (no frameworks)
- **AI:** Claude Code integration via CLAUDE.md
- **Export:** docx.js library (Office Open XML generation)
- **Documentation:** Markdown + PDFs

### What It's NOT
❌ Not a classified system
❌ Not a replacement for commander judgment
❌ Not a tool for exploitation or evasion
❌ Not real-time monitoring software (displays dashboards only)

---

## Extensibility

### Add New Annexes
1. Edit `server.js` — add to `annexMap`
2. Edit `mdmp-dashboard.html` — add export button
3. Restart server

### Add New Operations
1. Create `operation/[OP-CODE]/` folder
2. Add planning products (POAM, incident reports, etc.)
3. Update `OPERATIONS_INDEX.md`

### Add New Roles
1. Create `skill-[role-name].yaml` with system prompt
2. Update `CLAUDE.md` to include new role
3. Document in `docs/roles/`

---

## Success Stories

### OP-DEFENDER (BPEnergy Incident)

**Scenario:** APT41 malware (lockfile.ps1) detected on domain controller

**CyberPlanner Used For:**
- ✅ Host analyst: Forensic analysis of dc2 endpoint
- ✅ Network analyst: Beaconing pattern analysis
- ✅ Planner: 3-phase remediation plan development
- ✅ Dashboard: Real-time POAM tracking
- ✅ Export: AR 25-50 compliant annexes for ARCYBER

**Results:**
- 4-page threat analysis completed in minutes
- POAMs organized by phase (investigation, remediation, monitoring)
- Dashboard shows progress to leadership
- Annexes ready for HQ submission

---

## Documentation

| Document | Purpose |
|----------|---------|
| **PROJECT_GUIDE.md** | Complete architecture and features |
| **CONSOLIDATION_PLAN.md** | Cleanup and improvement roadmap |
| **README.md** | Project overview |
| **CLAUDE.md** | AI role context (loaded by Claude Code) |
| **docs/roles/ROLES.md** | Role switching guide |
| **docs/dashboards/README.md** | Dashboard documentation |
| **EXPORT_ANNEXES_README.md** | Word export detailed guide |
| **DASHBOARD_README.md** | Dashboard user guide |

---

## Next Steps

### For Immediate Use
1. Run `npm install`
2. Run `node server.js`
3. Access dashboards or use Claude Code

### For Long-term Improvement
See **CONSOLIDATION_PLAN.md** for:
- Organizing doctrine library
- Consolidating documentation
- Removing legacy items
- Improving navigation

### For Integration
See **PROJECT_GUIDE.md** for:
- Full architecture details
- Integration points
- Extensibility examples
- Deployment options

---

## One-Liner Summary

> **CyberPlanner is an AI-powered military planning system that helps Army cyber officers execute MDMP with doctrine-grounded analysis, real-time dashboards, and automated document generation.**

---

## Questions?

**"What's the difference between the dashboards?"**
- MDMP Dashboard = Planning (7 steps, export annexes)
- Operations Dashboard = Tracking (incidents, POAMs, intelligence)

**"Can I use this for classified operations?"**
- No. Maintain unclassified discipline. Don't input classified information.

**"How do I switch roles?"**
- Simply say: "Switch to host analyst mode" or use an alias

**"Can I add more annexes to export?"**
- Yes. Edit server.js to add new annex types

**"Does this replace my planning staff?"**
- No. CyberPlanner supports staff judgment, doesn't replace it.

**"Is this a real-time monitoring tool?"**
- No. It's a planning/analysis/tracking dashboard. Use your SIEM/EDR for monitoring.

---

## Classification

**UNCLASSIFIED // FOR OFFICIAL USE ONLY**

Suitable for use in military planning environments. Maintain data handling rules appropriate to your organization.

---

## Getting Help

1. **General questions** → See `README.md`
2. **How to use specific role** → See `docs/roles/ROLES.md`
3. **Dashboard usage** → See `DASHBOARD_README.md`
4. **Export feature** → See `EXPORT_ANNEXES_README.md`
5. **Full architecture** → See `PROJECT_GUIDE.md`

---

**Last Updated:** 2026-02-24

**Version:** 3.0

**Status:** Production Ready

---

## In One Picture

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   CYBERPLANNER: Military Cyber Operations Planning         │
│                                                             │
│   Three AI Roles                                           │
│   ├── Cyber Ops Planner (MDMP, strategy)                  │
│   ├── Host Analyst (forensics, endpoints)                 │
│   └── Network Analyst (traffic, detection)                │
│                                                             │
│   Two Dashboards                                           │
│   ├── MDMP Dashboard (planning + export)                  │
│   └── Operations Dashboard (tracking)                     │
│                                                             │
│   Five Operational Systems                                │
│   ├── AI Role Integration (Claude Code)                  │
│   ├── Interactive Planning (MDMP dashboard)              │
│   ├── Real-time Tracking (Operations dashboard)          │
│   ├── Document Export (AR 25-50 Word docs)               │
│   └── Doctrine Library (15+ doctrinal references)         │
│                                                             │
│   Grounded in Doctrine                                     │
│   ├── ADP 5-0 (Operations Process)                        │
│   ├── FM 3-12 (Cyber Operations)                         │
│   ├── JP 3-12 (Joint Cyber)                              │
│   └── MITRE ATT&CK Framework                              │
│                                                             │
│   Supports Decision-Making                                │
│   ├── Running estimates                                   │
│   ├── Risk assessments                                    │
│   ├── COA analysis                                        │
│   ├── Incident response                                  │
│   └── HQ submissions                                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

**Developed for U.S. Army Cyber Corps**

*"Making cyber operations planning doctrine-grounded, visual, and decision-focused"*

Classification: UNCLASSIFIED // FOUO
