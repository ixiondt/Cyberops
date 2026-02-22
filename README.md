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

- **U.S. Army Cyber Corps officers** (17A, 17C, etc.)
- **Cyber planners** supporting MDMP or operations process
- **Cyber intelligence analysts** preparing threat assessments or COA analysis
- **Staff elements** requiring cyber running estimates or decision support
- **Incident response teams** needing analyst perspectives on host/network findings

---

## Quick Start

### 1. Installation

Clone this repository into your project or team workspace:

```bash
git clone https://github.com/your-org/cyberopsplanner.git
cd cyberopsplanner
```

### 2. Claude Code Integration

If using **Claude Code CLI**:

1. **Copy `CLAUDE.md`** to your project root (Claude Code will load it automatically)
2. **Copy the `.yaml` role files** to your workspace
3. Open Claude Code in this directory
4. Start working — the **Cyber Operations Planner** role loads by default

For **Claude.ai web interface**: Copy relevant system prompts from the YAML files into your conversation context.

### 3. Start Planning

```
"Give me a cyber running estimate"
"I'm at Step 2 of MDMP — what cyber products do I need?"
"Switch to host analyst mode and analyze this endpoint"
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

### Cyber Operations Planner
- Cyber running estimates and staff estimates
- Cyber annex/appendix drafting (OPORD, CONOP, etc.)
- Cyberspace terrain/IPB analysis
- Threat COA development (MLCOA/MDCOA)
- MDMP phase support and synchronization
- Risk assessment and decision brief inputs
- PIR/RFI tracking and collection planning

### 17C Host Analyst
- Endpoint artifact analysis and recognition
- Forensic timeline development
- Baseline deviation assessment
- Malware behavior and indicator correlation
- Incident response triage and support
- Host-level evidence documentation

### 17C Network Analyst
- Network traffic pattern analysis
- Protocol behavior and anomaly detection
- Beaconing and C2 channel identification
- Lateral movement path assessment
- Network architecture risk analysis
- Detection logic recommendations

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

## Key Principles

✅ **Unclassified discipline** — All analysis maintains unclassified discipline
✅ **Doctrine-grounded** — Cite doctrine by publication and paragraph
✅ **Decision-focused** — Products support commander decision-making
✅ **Peer-level support** — Speak as a peer staff officer
✅ **Risk-aware** — Articulate cyber risks in mission terms

❌ **No exploitation guidance** — No step-by-step TTPs or evasion techniques
❌ **No tool-specific procedures** — Discuss tools at capability level only
❌ **No classified analysis** — Maintain unclassified discipline

---

## Reference Materials

- **ROLES.md** — Complete role switching guide with examples
- **competency-matrix.md** — Cross-role competency comparison
- **mdmp-role-mapping.md** — How roles support each MDMP step
- **task-role-map.md** — Role assignments by task type
- **nice-alignment.md** — Alignment with NICE Framework for cyber workforce

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

- [ ] Support for joint cyber operations (CCMD perspective)
- [ ] Expanded targeting support (HP/HVT integration)
- [ ] Information operations integration guides
- [ ] Training scenario packages
- [ ] Ansible/infrastructure automation role (future)

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

- **Usage questions:** Refer to ROLES.md and individual role documentation
- **Doctrine alignment:** See CLAUDE.md doctrinal knowledge base
- **Integration support:** Check your organization's AI/Claude Code governance

---

## Changelog

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
