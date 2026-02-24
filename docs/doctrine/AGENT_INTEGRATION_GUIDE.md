# Doctrine Library Integration Guide
**How the Three Agents Use docs/doctrine/ to Ground Responses**

---

## Overview

Your three specialized agents now reference the doctrine library to provide grounded, doctrinally-aligned responses for MDMP, cyber operations, intelligence, and tactical analysis. This guide explains how each agent leverages the library and how to request specific doctrinal support.

---

## Quick Reference by Agent

### Cyber Operations Planner
**Goal:** Ground MDMP products, COA development, and cyber task integration in authoritative doctrine

**Key Doctrine Used:**
- **ADP 5-0** → Operations process phases, running estimates, decision support
- **ATP 5-0.2.1** → Detailed MDMP procedures, synchronization requirements
- **FM 3-12 & ATP 3-12.3** → Cyber tasks (IO, EA, DODIN defense), control measures, synchronization
- **ATP 2-01.3** → Cyberspace terrain modeling (OAKOC-style analysis)
- **MITRE ATT&CK** → Threat COA development, indicator identification
- **JP 3-12** → Joint relationships, USCYBERCOM command structure

**Example Response Style:**
> *"Per ADP 5-0, Figure 3-1, your running estimate should track assumptions, limitations, RFIs, and available resources at each MDMP phase. For the cyber annex, FM 3-12, Appendix M, specifies the task format; ATP 3-12.3 details each task's purpose and control measures."*

**When to Reference:**
- Drafting cyber annexes or running estimates
- Building threat COAs and PIR/RFI lists
- Integrating cyber into joint operations
- Wargaming cyber friction or decision points

---

### 17C Host Analyst
**Goal:** Ground endpoint analysis in intelligence methodology and threat frameworks

**Key Doctrine Used:**
- **ATP 2-01.3** → Persona layer IPB (privileged roles, service accounts, deviations from baseline)
- **FM 2-0** → Intelligence collection discipline, source validation
- **MITRE ATT&CK** → Technique mapping, TTP recognition, observable behaviors
- **ATP 3-12.3** → Endpoint tasking, forensic requirements, logging standards

**Example Response Style:**
> *"Per ATP 2-01.3, persona layer analysis focuses on privileged roles and service accounts. This process deviates from your secure baseline because [evidence]. MITRE ATT&CK maps this behavior to [Technique], which supports [threat implication]."*

**When to Reference:**
- Analyzing baseline deviations or anomalous processes
- Correlating host artifacts to known techniques
- Documenting forensic findings for incident response
- Assessing insider threat indicators

---

### 17C Network Analyst
**Goal:** Ground traffic analysis in network terrain and threat detection logic

**Key Doctrine Used:**
- **ATP 2-01.3** → Logical layer IPB (addressing, routing domains, trust boundaries, choke points)
- **MITRE ATT&CK** → Network techniques, C2 signatures, lateral movement patterns
- **FM 2-0** → Collection management for NIDS/NDR, log source validation
- **JP 3-12** → Multi-domain detection coordination

**Example Response Style:**
> *"Per ATP 2-01.3, your logical layer shows this traffic crossing the [boundary/choke point]. MITRE ATT&CK technique [X] typically manifests as [pattern]. This detection logic should flag [behavior] because [reasoning per collection discipline]."*

**When to Reference:**
- Analyzing traffic anomalies or beaconing patterns
- Building detection logic or creating network signatures
- Assessing lateral movement or C2 channels
- Correlating network indicators to threat tactics

---

## How to Request Doctrinal Support

### Generic Request
```
"Build a cyber annex for [operation]"
→ Agent cites FM 3-12 Annex M template, ATP 3-12.3 task definitions
```

### Specific Doctrine Request
```
"Per ATP 2-01.3, what does persona layer analysis tell us about this endpoint?"
→ Agent grounds response in IPB methodology
```

### Cross-Functional Request
```
"Host analyst perspective: what does this baseline deviation suggest?"
→ Agent uses ATP 2-01.3 (persona layer) + MITRE ATT&CK (technique alignment)
```

### Doctrine + Threat Intelligence
```
"What does the threat COA look like per FM 3-12 task integration?"
→ Agent maps threat objectives to cyber tasks using FM 3-12 + MITRE ATT&CK
```

---

## Citation Format (Used by Agents)

All agents follow this citation standard for clarity:

**Short Citation:**
- *ADP 5-0, Figure 3-1* (specific figure)
- *FM 3-12, Section 3-4* (section)
- *ATP 2-01.3, Appendix B* (appendix)
- *JP 3-12, Paragraph 3.b.1* (specific paragraph)

**Full Citation in Context:**
> *"Per ADP 5-0, Figure 3-1, the running estimate updates at each MDMP phase to track new facts, assumptions, and RFIs. Cyber running estimates follow the same discipline."*

**TTPs vs. Doctrine:**
> *"Doctrine (FM 3-12) defines cyber tasks; TTPs describe how we execute them. For this operation, TTPs are [internal SOP], not doctrine."*

---

## Doctrine Library File Map

| Doctrine | File | Agent Primary User | Key Sections |
|----------|------|-------------------|--------------|
| **ADP 5-0** | ARN18126-ADP_5-0-000-WEB-3.pdf | Planner | Ops process, running estimates, phases |
| **ADP 6-0** | ARN34403-ADP_6-0-000-WEB-3.pdf | Planner | Staff org, command relationships |
| **ATP 5-0.1** | downloads_Army_Design_Methodology_ATP_5-0.1_July_2015.pdf | Planner | Design methodology, problem framing |
| **ATP 5-0.2.1** | atp5_0x2_1.pdf | Planner | MDMP procedures, synchronization |
| **FM 2-0** | fm2_0.pdf | All three | Collection discipline, source validation |
| **ATP 2-01.3** | ATP_2-01.3_Intelligence_Preparation_of_the_Battlefield.pdf | All three | IPB methodology, terrain layers, threat COAs |
| **FM 3-12** | Document-11-Department-of-the-Army-FM-3-12.pdf | Planner | Cyber tasks, control measures, synchronization |
| **ATP 3-12.3** | atp3-12-3.pdf | Planner, Analysts | Cyber techniques, endpoint tasking, logging |
| **FM 3-13** | fm3-13_2016.pdf | Planner | IO doctrine, integration with ops |
| **JP 2-01.3** | jp2_01_3.pdf | Planner | Joint IPB, OPSENV analysis |
| **JP 3-12** | 2018-JP-3-12-Cyberspace-Operations.pdf | Planner | Joint cyber ops, USCYBERCOM relationships |
| **MITRE ATT&CK** | getting-started-with-attack-october-2019.pdf, Best Practices for MITRE ATTCK Mapping.pdf | All three | Threat techniques, TTP mapping, defenses |

---

## Common Use Cases & Doctrine References

### Use Case: "Build a threat COA"
**Doctrine Chain:**
1. **ATP 2-01.3** (IPB methodology—threat analysis section)
2. **FM 3-12** (cyber tasks that adversary might execute)
3. **MITRE ATT&CK** (specific techniques, TTPs, observable indicators)

**Agent Response:**
> *"Per ATP 2-01.3, threat COAs describe the adversary's most likely and most dangerous courses of action. Using FM 3-12 tasks and MITRE ATT&CK technique mapping, the MLCOA would be [X], and the MDCOA would be [Y]."*

---

### Use Case: "I found a baseline deviation—what does it mean?"
**Doctrine Chain:**
1. **ATP 2-01.3** (persona layer baseline definition)
2. **FM 2-0** (collection discipline—is this source valid?)
3. **MITRE ATT&CK** (does this behavior map to known techniques?)

**Agent Response:**
> *"Per ATP 2-01.3 persona layer analysis, this service account is a baseline deviation because [reason]. FM 2-0 collection discipline confirms the source is reliable. MITRE ATT&CK maps this to [Technique], which supports [threat implication]."*

---

### Use Case: "Write a cyber annex for the OPORD"
**Doctrine Chain:**
1. **FM 3-12** (Annex M template, task format)
2. **ATP 3-12.3** (task definitions, control measures, synchronization)
3. **ATP 2-01.3** (PIRs tied to threat COAs and cyberspace terrain)

**Agent Response:**
> *"Per FM 3-12, Annex M, your cyber annex should include [sections]. ATP 3-12.3 defines each task; here's your cyber OPORD annex structure..."*

---

### Use Case: "Analyze this traffic for C2 signatures"
**Doctrine Chain:**
1. **ATP 2-01.3** (logical layer—what choke points/domains matter?)
2. **FM 2-0** (collection management—what sources validate this?)
3. **MITRE ATT&CK** (what network techniques are relevant?)

**Agent Response:**
> *"Per ATP 2-01.3 logical layer analysis, this traffic crosses [boundary]. FM 2-0 collection validates this from [sources]. MITRE ATT&CK technique [X] typically manifests as [pattern], which we see here."*

---

## Integration Tips

### 1. **Lead with Doctrine, Not Opinion**
Instead of:
> "I think this is suspicious..."

Use:
> "Per ATP 2-01.3 baseline deviations, this process diverges from your baseline because [fact]."

---

### 2. **Reference MITRE ATT&CK for Technique Alignment**
Instead of:
> "This looks like a persistence mechanism..."

Use:
> "This matches MITRE ATT&CK [Tactic]:[Technique] because [observable behavior]."

---

### 3. **Separate Doctrine from Ops SOP**
Instead of:
> "Doctrine says we should do X..."

Use:
> "FM 3-12 defines the cyber task as [X]. Your TACSOP may implement it as [Y]."

---

### 4. **Ask for Cross-Functional Validation**
When planning:
> "Host analyst view: does this cyber task collection requirement make sense per ATP 3-12.3 endpoint tasking?"

When analyzing:
> "Planner view: how does this baseline deviation impact threat COA confirmation/denial per ATP 2-01.3 PIRs?"

---

## When to Reference vs. When NOT To

### ✅ **DO Reference Doctrine When:**
- Drafting MDMP products (running estimates, annexes, COA analysis)
- Building threat COAs or PIR/RFI lists
- Grounding intelligence analysis (IPB, terrain, baselines)
- Making risk or prioritization decisions
- Coordinating across roles or organizations
- Explaining operational rationale to leadership

### ❌ **DON'T Reference Doctrine When:**
- Responding to tactical execution questions (refer to TTPs/SOPs instead)
- Providing classified analysis (maintain unclassified discipline)
- Discussing tool commands or procedural steps
- Answering hypotheticals that aren't part of current mission planning

---

## Updating the Doctrine Library

**To add new doctrine:**
1. Place PDF or summary in `docs/doctrine/`
2. Update `INDEX.md` with filename, key sections, and cyber application
3. Update relevant agent skill file to reference the new source
4. Update MEMORY.md if it's a major addition

**Example:**
```markdown
| **FM X-XX** | file.pdf | Key Sections | Cyber integration |
| — | — | — | — |
```

---

## Support & Troubleshooting

**Q: An agent cited doctrine I don't recognize.**
A: Check `docs/doctrine/INDEX.md` for the publication and file. If unsure, ask: "What section of [publication] supports that?"

**Q: I need doctrine that's not in the library.**
A: Add it to `docs/doctrine/` and update INDEX.md and agent YAML files.

**Q: How do agents know which doctrine to cite?**
A: Each agent's system prompt (YAML file) lists the doctrinal sources relevant to its role. Agents prioritize doctrine that directly answers your question.

**Q: Can agents reference classified doctrine?**
A: No. All responses maintain unclassified discipline. Cite doctrine available in the unclassified library only.

---

**Last Updated:** 2026-02-24
**Maintained by:** CyberPlanner Memory System
