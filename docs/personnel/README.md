# Personnel / Roles

Specialized role definitions for CyberPlanner's three-analyst system.

---

## Role Definitions

Each YAML file contains a complete role definition that Claude Code loads automatically.

### 1. Cyber Operations Planner
**File:** [`skill-cyberopsplanner.yaml`](./skill-cyberopsplanner.yaml)

**Focus:** MDMP planning, cyberspace operations integration, planning support

**Aliases:** `coop`, `cyber-planner`, `ops-planner`

**Use for:**
- Cyber running estimates and staff estimates
- Cyber annexes and appendices to OPORDs
- Cyberspace terrain analysis and threat COA development
- MDMP phase support and synchronization
- Decision briefs and risk assessments

---

### 2. 17C Host Analyst
**File:** [`skill-host-analyst.yaml`](./skill-host-analyst.yaml)

**Focus:** Endpoint and host-based system analysis

**Aliases:** `17c-host`, `host-analysis`

**Use for:**
- Host artifact and timeline analysis
- Endpoint telemetry interpretation
- Malware and persistence mechanism identification
- Incident response support
- Forensic timeline analysis and baseline deviation reports

---

### 3. 17C Network Analyst
**File:** [`skill-network-analyst.yaml`](./skill-network-analyst.yaml)

**Focus:** Network traffic and communications analysis

**Aliases:** `17c-network`, `network-analysis`, `traffic-analyst`

**Use for:**
- Network traffic pattern and anomaly analysis
- Beaconing and C2 channel detection
- Lateral movement and exfiltration path identification
- Detection logic recommendations
- Network architecture assessment

---

## How Claude Code Uses These Files

**In Claude Code:**
```bash
claude code .
```

Claude Code **automatically discovers** these YAML files and:
1. Loads the role definitions
2. Registers the command aliases
3. Makes role switching available via `skill` command

**Switching roles:**
```
Switch to host analyst mode
Give me the network analyst perspective
I need the cyber ops planner for Step 3
```

---

## File Format

Each YAML file follows this structure:

```yaml
name: <role-name>
description: <brief description>
command: <primary command>
aliases:
  - <alias-1>
  - <alias-2>
system_prompt: |
  <Complete role system prompt>
default_model: haiku
```

---

## Integration

These role definitions are referenced in:
- `CLAUDE.md` — Main system prompt (indicates role availability)
- `docs/roles/ROLES.md` — Complete role switching guide
- `~/.claude/skills.yaml` — Global skills manifest (auto-generated)

---

## Customization

To modify a role:
1. Edit the corresponding YAML file
2. Run `claude code .` again to reload
3. Changes take effect on next command

---

**See also:** [docs/roles/ROLES.md](../roles/ROLES.md) for role switching guide
