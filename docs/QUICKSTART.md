# Quick Start Guide

Get CyberOpsPlanner up and running in 5 minutes.

---

## Prerequisites

- **Claude Code CLI** (recommended) or Claude.ai web interface
- Familiarity with MDMP (Army planning process)
- Access to your workspace

---

## Setup (Claude Code CLI)

### 1. Clone the Repository
```bash
git clone https://github.com/your-org/cyberopsplanner.git
cd cyberopsplanner
```

### 2. Launch Claude Code
```bash
claude code
```

Claude Code automatically loads `CLAUDE.md`, so you're ready to start.

### 3. Verify It's Working
Type in Claude Code:
```
"Give me a cyber running estimate for a defensive cyber operation"
```

You should get a structured response from the **Cyber Operations Planner** role.

---

## Setup (Claude.ai Web)

### 1. Create a New Conversation

### 2. Paste System Context
Copy the `system_prompt` section from one of the YAML files:
- `skill-cyberopsplanner.yaml`
- `skill-host-analyst.yaml`
- `skill-network-analyst.yaml`

### 3. Start Your First Query
```
"I need help with [your planning question]"
```

---

## Your First 5 Minutes

### Minute 1: Understand the Roles
Open **ROLES.md** and scan the three roles:
- **Cyber Ops Planner** — for planning
- **Host Analyst** — for endpoint analysis
- **Network Analyst** — for traffic analysis

### Minute 2: Try a Role Switch
Type to Claude:
```
"Give me the cyber ops planner perspective on a running estimate for Operation EXAMPLE"
```

### Minute 3: Try Another Role
Type:
```
"Now switch to network analyst mode — what would you look for in traffic?"
```

### Minute 4: Read MDMP Mapping
Open **mdmp-role-mapping.md** to see how roles support your MDMP step.

### Minute 5: Ask Your Real Question
Ask Claude about your actual planning problem or analysis need.

---

## Common Use Cases

### "I'm Starting MDMP"
```
"I'm at Step 2 (Mission Analysis). What cyber products do I need?"
```

### "I Need a Running Estimate"
```
"Give me a cyber running estimate for [operation name]"
```

### "Analyze an Endpoint"
```
"Switch to host analyst — I found these artifacts. What do they mean?"
```

### "Analyze Network Traffic"
```
"Network analyst mode — is this beaconing?"
```

### "Risk Assessment"
```
"What's the residual cyber risk for COA Bravo?"
```

---

## Key Files to Know

| File | Purpose | Read When |
|------|---------|-----------|
| **README.md** | Overview & detailed guide | First time setup |
| **ROLES.md** | Role switching & examples | Before using roles |
| **CLAUDE.md** | Doctrinal foundation | Need doctrine references |
| **mdmp-role-mapping.md** | MDMP step-by-step support | Working through MDMP |
| **competency-matrix.md** | Role capabilities comparison | Staffing or capability assessment |

---

## Role Quick Reference

### Cyber Operations Planner
**Use when:** Planning, integration, risk assessment, MDMP support
**Ask for:** Running estimates, annexes, threat COAs, decision briefs

### Host Analyst
**Use when:** Analyzing endpoints, incident response, forensics
**Ask for:** Timeline analysis, artifact assessment, baseline deviations

### Network Analyst
**Use when:** Analyzing traffic, detecting threats, network architecture
**Ask for:** Traffic analysis, C2 detection, lateral movement paths

---

## Role Switching Cheat Sheet

```
# Switch to host analyst
"Switch to host analyst mode"
"17c-host perspective on this"
"host-analysis of this endpoint"

# Switch to network analyst
"Network analyst mode"
"17c-network perspective"
"traffic-analyst view"

# Back to planner
"Back to cyber ops planner"
"coop mode for this"
"Planner perspective"
```

---

## Troubleshooting

### "The role doesn't seem to be changing"
- Be explicit: "Switch to [role name] mode"
- Try an alias instead
- Provide context for why you're switching

### "I need doctrine references"
- Ask: "What doctrine supports this?"
- Check **CLAUDE.md** for full doctrine section
- Claude will cite publications automatically

### "I'm not getting the format I need"
- Specify Army format: "Give this as an OPORD Cyber Annex"
- Be specific: "I need this as a decision brief"
- See **README.md** for format examples

### "I want to contribute"
- Read **CONTRIBUTING.md**
- Check existing issues first
- Submit a pull request with clear description

---

## Next Steps

1. **Try all three roles** with a sample planning problem
2. **Read mdmp-role-mapping.md** for your current MDMP step
3. **Check competency-matrix.md** if staffing
4. **Bookmark ROLES.md** for quick reference
5. **Refer to doctrinal references** in CLAUDE.md

---

## Still Have Questions?

- **How do I switch roles?** → See ROLES.md
- **What doctrine is this based on?** → See CLAUDE.md
- **How do roles support MDMP?** → See mdmp-role-mapping.md
- **I want to contribute** → See CONTRIBUTING.md
- **I found a bug** → Open a GitHub issue

---

## Pro Tips

✅ **Be specific** with context ("For Operation EXAMPLE, the AOR is...")
✅ **Use role switching** to triangulate findings (host → network → planner)
✅ **Cite doctrinal references** when discussing planning decisions
✅ **Export outputs** as annexes or briefing slides
✅ **Keep ROLES.md handy** for quick reference

---

**Welcome to CyberOpsPlanner!** 🎯

You're now ready to integrate cyber into your planning process.
