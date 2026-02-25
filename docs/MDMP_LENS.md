# MDMP — Cyber Officer Lens

## What "Good" Looks Like by MDMP Step

This reference outlines cyber operations integration expectations at each step of the Military Decision-Making Process (MDMP). Use these as quality gates when developing cyber products or reviewing cyber staff estimates.

---

## Step 1: Receipt of Mission

**What cyber contributes:**

- **Initial cyber running estimate** — facts, assumptions, limitations, available cyber assets, constraints/authorities check
- **Cyber-specific RFIs** — what you need to know to support planning (network baseline, threat position, asset inventory)
- **Authority/ROE check** — what cyber operations you can execute, what requires higher approval
- **Warning order cyber inputs** — initial cyber posture, major cyber terrain, critical cyber assets

**Quality indicators:**
✅ Running estimate distinguishes **cyber from cyber support** to other warfighting functions
✅ RFIs address **baseline knowledge gaps** (network architecture, asset inventory, threat positions)
✅ **Authorities are explicit** (Title 10, Title 32, CCDR, ARCYBER, DoD CIO approval required, etc.)
✅ **Constraints are documented** (classification, legal, policy, technical)

---

## Step 2: Mission Analysis

**What cyber contributes:**

- **Cyberspace terrain / IPB assessment** — physical/logical/persona layers, key terrain, choke points, dependencies
- **Environmental effects analysis** — how cyber constraints/opportunities affect the operation
- **Threat assessment** — threat capabilities, intent, preferred access paths, likely COAs
- **Specified/implied/essential cyber tasks** — what the main OPORD requires, what the cyber element must do
- **Refined PIR/RFI list** — collection priorities, surveillance targets, decision support requirements

**Quality indicators:**
✅ **Cyberspace terrain** is modeled in **physical (locations/hosting)**, **logical (addressing/routing)**, **persona (privileged roles)** layers
✅ **Threat COAs** are mapped to **decision points** (where would the threat pivot?) and **NAIs/TAIs** (where/when would we see indicators?)
✅ **PIRs** directly support **commander's critical information requirements** (CCIR)
✅ **Cyber tasks are mission-essential**, not "nice-to-have" cyber work

---

## Step 3: COA Development

**What cyber contributes:**

- **Cyber task organization** — which elements execute which cyber tasks, C2 relationships, support relationships
- **DODIN posture per COA** — how does this COA affect our network operations, what cyber controls are needed?
- **Synchronization** — when do cyber tasks execute relative to main effort? How does cyber enable other warfighting functions?
- **PACE plan** — primary/alternate/contingency/emergency comms for cyber element
- **Support relationships** — who provides ISR, intel, logistics, legal review to cyber?
- **Risk controls** — what mitigations reduce cyber risk to acceptable level?

**Quality indicators:**
✅ **Cyber tasks are explicit** and **resourced** (personnel, tools, authorities assigned)
✅ **Synchronization matrices** show **cyber tasks vs main effort timeline** (how do they integrate?)
✅ **PACE plan** is **testable** (not aspirational)
✅ **Risk register** identifies **critical cyber friction points** and **mitigations**

---

## Step 4: COA Analysis (Wargame)

**What cyber contributes:**

- **Cyber effects timing** — when does cyber action occur in the operation sequence?
- **Friction points** — what cyber challenges delay or complicate execution?
- **Detection/response timelines** — how long does it take for threat to detect us? For us to respond to threat?
- **Decision points** — where do cyber actions hinge on commander decision?
- **Branch/sequel triggers** — what cyber indicators would force a change to this COA?

**Quality indicators:**
✅ **Cyber friction points are mission-relevant** (not just technical problems)
✅ **Decision points map to CCIR** (commander knows what cyber indicators matter)
✅ **Response timelines are realistic** (based on playbook procedures, tool capabilities, staff skill)
✅ **Risk evolution is tracked** (how does risk change through operation timeline?)

---

## Step 5: COA Comparison

**What cyber contributes:**

- **Evaluation criteria** — risk, feasibility (skill/tools/authorities), sustainment (can we keep it running?), time (does it fit the operation timeline?)
- **Cyber-specific trade-offs** — which COA minimizes detection risk? Which requires least cyber infrastructure? Which maximizes effects on threat?
- **Recommended COA** with cyber rationale

**Quality indicators:**
✅ **Evaluation criteria are weighted** (what matters most: speed? Risk? Sustainability?)
✅ **Trade-offs are explicit** (COA A is faster but higher risk; COA B is slower but more sustainable)
✅ **Cyber recommendation aligns with** commander's desired end state

---

## Step 6: COA Approval

**What cyber contributes:**

- **Decision brief inputs** — key cyber risks, critical decision points, resource requirements
- **CCIR inputs** — what cyber indicators does commander need to track?
- **ROE/authorities confirmation** — all cyber actions are within approved authorities

**Quality indicators:**
✅ **Decision brief is concise** (1 page if possible; cyber risks ranked by severity)
✅ **CCIR ties to cyber** (commander knows what cyber findings drive tactical decisions)

---

## Step 7: Orders Production

**What cyber contributes:**

- **Cyber annex / appendix** — tasks to subordinate cyber elements, control measures, reporting requirements
- **Synchronization with other annexes** — how cyber integrates with fires, ISR, IO, engineer, signal, etc.
- **Clear task/purpose/end state** for each cyber task
- **Tasking authority** — who approves cyber actions? What's the chain for escalation?

**Quality indicators:**
✅ **Tasks are mission-focused** (not just "conduct cyber operations")
✅ **Purpose/end state explain WHY** the task supports the operation
✅ **Control measures** (rules of engagement, approval authorities, coordination requirements) are **explicit**
✅ **Reporting** addresses **critical information** (threat actions, detected anomalies, resource status)

---

## Key Doctrine References

- **ADP 5-0** — The Operations Process
- **FM 5-0** — Planning and Orders Production
- **FM 3-12** — Cyberspace and Electromagnetic Warfare Operations
- **JP 3-12** — Cyberspace Operations
- **ATP 2-01.3** — Intelligence Preparation of the Battlefield (includes cyberspace terrain)

---

## Quick Self-Check: Is My Cyber Product "Good"?

| Step | Quick Test | If No → |
|------|-----------|---------|
| **1** | Can I justify every cyber asset with mission need? | Eliminate non-essential tasks |
| **2** | Do I have cyberspace terrain in 3 layers (physical/logical/persona)? | Sketch the network: what's critical? What's vulnerable? |
| **3** | Is every cyber task assigned to a person/unit with authority? | Clarify task ownership and approval chain |
| **4** | Do I know when the threat would detect us? When we'd detect them? | Run timeline through host/network analyst for reality check |
| **5** | Can I rank my COAs by cyber criteria? Can I defend my recommendation? | If not, rework COAs or evaluation criteria |
| **6** | Does the commander know what cyber indicators matter? | Add cyber indicators to CCIR |
| **7** | Can my team execute this annex without asking "what does this mean?" | Simplify language; be explicit about authority |

---

**For more on MDMP foundations, see [docs/doctrine/INDEX.md](./doctrine/INDEX.md)**
