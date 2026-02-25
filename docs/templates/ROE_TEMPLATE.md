# Rules of Engagement (ROE) / Constraints Template

## Cyber Operations ROE and Authorization Constraints

Use this template to document your ROE and operational constraints for cyber operations. Clear ROE prevents unauthorized actions and ensures compliance with authorities.

---

## ROE & Constraints for [Operation Name]

### Command Authority & Approval Chain

```
Commander: [Commander name/rank]
Approval Authority for Cyber Actions: [Who approves execution? At what level?]
Escalation Chain:
  - Cyber Element Lead → [Level 1 approval]
  - [Level 1] → [Level 2 approval]
  - [Level 2] → [Level 3 approval] (if required)
Documentation: [How are approvals recorded? Who maintains log?]
```

---

### Authorized Cyber Actions

**Actions we CAN execute (with documented authority):**

1. [Specific action] — Authority: [Title/document], approval by [person]
2. [Specific action] — Authority: [Title/document], approval by [person]
3. [Specific action] — Authority: [Title/document], approval by [person]

---

### Prohibited Cyber Actions

**Actions we CANNOT execute (outside our authorities):**

1. [Action description] — Reason: [Outside authorities / Requires higher approval / Prohibited by policy]
2. [Action description] — Reason: [Outside authorities / Requires higher approval / Prohibited by policy]
3. [Action description] — Reason: [Outside authorities / Requires higher approval / Prohibited by policy]

---

### Operational Constraints

#### No Actions Outside Documented Authorities
- **Constraint:** Every cyber action must have documented authority (Title 10, Title 32, CCDR, ARCYBER, DoD CIO, higher HQ order, etc.)
- **Responsibility:** Cyber Element Lead verifies authority before action
- **Consequence of violation:** [Unauthorized action / legal action / relief from command]

#### No Changes to Production Systems Without Explicit Approval
- **Constraint:** Any system change (configuration, patches, access controls) requires [level of approval]
- **Responsibility:** Change control board / Element Lead review before implementation
- **Exception:** [Emergency response scenarios with post-action documentation]

#### Maintain Tool/Use/Action Logs
- **Constraint:** All cyber actions must be logged (who/what/when/where/why)
- **Logging system:** [Tool name, location, access control]
- **Responsibility:** [Who maintains log? Who audits log?]
- **Retention:** [How long are logs retained?]

#### Use Approved Channels for Sensitive Findings
- **Constraint:** Findings involving [classified information / incidents / legal concerns] must use [secure channel]
- **Approved channels:**
  - Security findings → Report to CIO/CND via [secure method]
  - Incidents → Report to [Security Operations Center] via [method]
  - Legal concerns → Escalate to [Legal Advisor] via [method]
- **Timeline:** [How quickly must sensitive findings be reported?]

#### Separate Recommendations from Executed Actions
- **Constraint:** Document what you executed vs. what you recommend/suggest
- **Format:** [Recommendation flagged as "REC:" / "Note:" / "Future consideration:" vs. action logged as "EXECUTED"]
- **Responsibility:** Cyber analyst responsibility for clarity in reporting

---

## Template (Blank ROE Checklist)

```
OPERATION: [Name/Code]
EFFECTIVE DATES: [Start - End date or phase]
HIGHER AUTHORITY: [Who approves these ROE? CCDR? Joint Task Force?]

SECTION 1: AUTHORITIES
  [ ] Command authority confirmed (Title 10/32/CCDR/other)
  [ ] ARCYBER approval obtained (if required by higher HQ)
  [ ] DoD CIO approval obtained (if cross-domain or sensitive systems)
  [ ] Legal advisor reviewed authorities (if cross-domain, clandestine, or politically sensitive)
  [ ] Higher HQ provided written authorization (date: ___)

SECTION 2: APPROVED ACTIONS
  Cyber Action 1: [Description]
    Authority: [Publication, paragraph]
    Approval Level: [Commander/S-3/Cyber Lead]
    Escalation Required: [Yes/No] [If yes, to whom?]

  Cyber Action 2: [Description]
    Authority: [Publication, paragraph]
    Approval Level: [Commander/S-3/Cyber Lead]
    Escalation Required: [Yes/No] [If yes, to whom?]

SECTION 3: RESTRICTED ACTIONS
  [ ] Actions on [System/Network] require [Level] approval before execution
  [ ] Actions affecting [Sensitive systems] require [Level] approval + legal review
  [ ] Actions outside [Time window] require [Level] approval

SECTION 4: CONSTRAINTS
  [ ] No actions without documented authority (see Section 1)
  [ ] No system changes without change control approval
  [ ] All actions logged in [System] with [Owner]
  [ ] Sensitive findings reported via [Channel] within [Timeline]
  [ ] Recommendations clearly separated from executed actions in all reports

SECTION 5: APPROVAL SIGNATURE
  Commander: _________________ Date: _______
  S-3 (or equivalent): _________________ Date: _______
  Legal Advisor (if required): _________________ Date: _______
```

---

## Common Cyber ROE Scenarios

### Scenario 1: Defensive Network Operations (DODIN Operations)

**Approved Actions:**
- Monitor network traffic for threats (passive surveillance)
- Block malicious traffic at firewall
- Isolate compromised systems
- Patch vulnerabilities
- Reset compromised credentials

**Restricted Actions:**
- Disrupt adversary C2 (requires [higher approval])
- Modify adversary malware (requires [legal review])
- Cross-domain searches (requires [special authority])

---

### Scenario 2: Incident Response (Defensive Cyber Response)

**Approved Actions:**
- Isolate compromised systems
- Kill malicious processes
- Quarantine files
- Collect forensic evidence
- Block IOCs at perimeter

**Restricted Actions:**
- Pursue attacker outside network boundary (requires [higher authority])
- Disrupt attacker infrastructure (requires [higher authority])
- Conduct offensive operations (requires [Cyber Command authorization])

---

### Scenario 3: Cyber Assessment / Authorized Penetration Test

**Approved Actions:**
- Execute authorized penetration test on [specific systems] during [time window]
- Exploit vulnerabilities to validate exposure
- Conduct post-exploitation (document access paths)

**Restricted Actions:**
- Test outside authorized systems list (requires [Level] re-approval)
- Execute post-exploitation beyond [scope definition]
- Maintain persistence (not authorized for assessment)

---

## ROE Verification Checklist

Before approving cyber operations under this ROE:

- [ ] **Authority is documented and current** (not expired, still applicable)
- [ ] **Approval chain is clear** (if Level 1 approves up to X, what requires Level 2?)
- [ ] **Constraints are enforceable** (can cyber element actually follow them?)
- [ ] **Logging is in place** (how will actions be documented?)
- [ ] **Escalation process is tested** (does higher HQ know about this ROE?)
- [ ] **Legal has reviewed** (if authorities are novel or unclear)
- [ ] **Personnel understand ROE** (brief entire element)
- [ ] **ROE is posted/accessible** (team can reference during operations)

---

## Reference

**ROE in Army doctrine:**
- **FM 5-0** (Planning and Orders Production) — ROE sections in OPORD
- **AR 25-2** (Army Cybersecurity) — Policy-level cyber authorities
- **CJCSM 6510.01** series (Joint cyber policy) — Joint ROE framework

**See [docs/MDMP_LENS.md](../MDMP_LENS.md) for Step 7 (Orders Production) ROE integration**
