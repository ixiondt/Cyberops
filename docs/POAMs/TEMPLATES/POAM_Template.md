# Plan of Action and Milestones (POAM)
**Cyber Response Remediation Tracking**

---

## POAM METADATA

**POAM ID:** [OPNAME]-POAM-[#] *(e.g., OP-GUARDIAN-POAM-01)*
**Created:** [DATE/TIME]
**Created By:** [ANALYST/ROLE]
**Last Updated:** [DATE/TIME]
**Updated By:** [WHO]

**Linked Incident Report:** [INCIDENT ID or FILE PATH]
**Linked Finding Document:** [FINDING ARTIFACT or SECTION]

---

## 1. FINDING SUMMARY

### Finding Title
[Concise title describing the remediation needed]
*Example: "Malware found on endpoint WIN-USR-0847 with active C2 callback capability"*

### Finding Description
[Detailed description of finding, including technical details, scope, and immediate context]

**Key Details:**
- **Asset/System Affected:** [Hostname, IP, system identifier]
- **Affected User/Organization:** [User account, department, org]
- **Discovery Method:** [EDR alert, host analysis, network analysis, threat intel, etc.]
- **Discovery Date/Time:** [DTG]
- **Analyst/Team:** [Who found it]

### Original Finding Source
[Reference to where this finding came from: incident report section, analysis artifact, etc.]

---

## 2. RISK ASSESSMENT

### Risk Priority
**☐ CRITICAL** (Immediate action required - within hours)
**☐ HIGH** (Urgent action required - within 24-72 hours)
**☐ MEDIUM** (Planned action required - within 7-14 days)
**☐ LOW** (Standard action - within 30+ days)

### Risk Classification
**Finding Category:** [Select one]
- ☐ Malware
- ☐ Compromised Credential
- ☐ Lateral Movement
- ☐ Configuration Deficiency
- ☐ Detection Gap
- ☐ Vulnerability/Exposure
- ☐ Process/Procedure Gap
- ☐ Incomplete Investigation
- ☐ Other: [Specify]

### Risk Scoring (NIST SP 800-30 Methodology)

**Likelihood (1-5):**
- 5 = Highly likely to occur/recur
- 4 = Likely
- 3 = Moderate likelihood
- 2 = Unlikely
- 1 = Highly unlikely

*Score: __ | Rationale: [Why this score]*

**Impact (1-5):**
- 5 = Catastrophic (mission failure, major data loss, compromise of critical asset)
- 4 = Major (significant operational impact, system compromise)
- 3 = Moderate (operational disruption, limited system compromise)
- 2 = Minor (small operational impact, limited functionality loss)
- 1 = Insignificant (negligible operational impact)

*Score: __ | Rationale: [Why this score]*

**Overall Risk = Likelihood × Impact = ___**
- 20-25 = CRITICAL
- 12-19 = HIGH
- 6-11 = MEDIUM
- 1-5 = LOW

### Threat Context
[Brief explanation of threat implications]
- Threat actor capabilities demonstrated: [X, Y, Z]
- Likely objectives: [Based on findings]
- Persistence indicators: [Will threat likely return? Why?]
- Scope implications: [Single system or wider compromise?]

---

## 3. REMEDIATION APPROACH

### Remediation Strategy
[High-level description of how the issue will be resolved]

**Example:** "Endpoint will be isolated from network, malware sample collected for forensics, endpoint will be reimaged with clean OS image and baseline security configuration, endpoint will be validated clean before return to production, and 30-day monitoring will be active."

### Remediation Owner
**Primary Owner:** [Name/Role] - Organization [e.g., Host Team]
**Backup Owner:** [Name/Role] - Organization
**Coordinator:** [S-3 or Element Lead]
**Stakeholders:** [Other organizations/teams that must be informed or coordinated with]

### Authority & Approval
**Required Authority:** [Who has approval authority]
- ☐ Element Lead approval obtained
- ☐ Commander approval (if residual risk acceptance needed)
- ☐ External approvals: [List any required external approvals]

**Authority Notes:** [Any special approval requirements or constraints]

---

## 4. MILESTONES & TIMELINE

### Overall Timeline
**Target Start Date:** [DATE]
**Target Completion Date:** [DATE]
**Total Duration:** [X days/weeks]

### Milestone Details

| # | Milestone | Description | Owner | Target Date | Completion Criteria | Status |
|---|-----------|-------------|-------|-------------|-------------------|--------|
| 1 | [Milestone 1 Name] | [What will be done] | [Team] | [DATE] | [How we verify it's done] | Open |
| 2 | [Milestone 2 Name] | [What will be done] | [Team] | [DATE] | [How we verify it's done] | Open |
| 3 | [Milestone 3 Name] | [What will be done] | [Team] | [DATE] | [How we verify it's done] | Open |
| 4 | [Milestone 4 Name] | [What will be done] | [Team] | [DATE] | [How we verify it's done] | Open |
| 5 | [Milestone 5 Name] | [What will be done] | [Team] | [DATE] | [How we verify it's done] | Open |

### Dependencies & Constraints
**Dependencies:**
- Requires completion of [other POAMs]: [POAM-X, POAM-Y]
- Requires approval from [authority]: [Expected timing]
- Requires resources: [What resources are needed]

**Constraints:**
- Maintenance window required: [Yes/No] [When?]
- Production system impact: [Downtime required?]
- Change control process: [Standard / Emergency / Other]
- External coordination: [Who needs to be informed?]

---

## 5. EXECUTION PLAN

### Pre-Execution Checklist
- ☐ POAM approved by Element Lead
- ☐ Owner confirmed available and resourced
- ☐ Change control submitted (if applicable)
- ☐ Maintenance window scheduled (if needed)
- ☐ Stakeholders notified
- ☐ Backup procedures identified
- ☐ Verification procedures defined

### Execution Steps
[Detailed step-by-step procedure for POAM completion]

**Step 1:** [Action] - Performed by [Owner] - Verify by [method]
**Step 2:** [Action] - Performed by [Owner] - Verify by [method]
**Step 3:** [Action] - Performed by [Owner] - Verify by [method]
[Continue as needed]

### Verification Procedures
[How will we know this POAM has been completed successfully?]

**Verification Method 1:** [Tool/method] - [What to check]
**Verification Method 2:** [Tool/method] - [What to check]
**Verification Method 3:** [Tool/method] - [What to check]

**Example Verification:**
- EDR confirms no malware detected
- SIEM shows no suspicious activity for 7 days
- Firewall logs show no outbound C2 connections
- System admin confirms baseline configuration applied

### Rollback Plan
[If remediation fails or causes issues, how will we roll back?]

**Rollback Trigger:** [When would we rollback?]
**Rollback Steps:** [Procedure to undo changes]
**Rollback Owner:** [Who executes rollback?]
**Estimated Rollback Time:** [How long?]

---

## 6. RESIDUAL RISK

### Risk Remaining After POAM Closure

**Description:** [What risk remains even after POAM is closed?]

**Example:** "Threat actor knows the identity of the compromised user and may attempt credential reuse. Monitoring for credential reuse will be active for 60 days, but threat actor may attempt access at other times."

### Residual Risk Acceptance

**Accepted By:** [Role/Title]
**Acceptance Date:** [DATE]

**Acceptance Rationale:** [Why is it acceptable to accept this risk?]

**Monitoring Plan:** [How will we monitor for residual risk manifestation?]
- Monitor for: [X indicator]
- Using tool/source: [SIEM/EDR/etc]
- Alerting threshold: [When to alert]
- Review frequency: [Daily/weekly/monthly]

**Escalation Trigger:** [When to escalate if residual risk manifests?]

---

## 7. STATUS TRACKING

### Current Status
**Status:** [Open / In Progress / At Risk / Complete / Closed]
**Last Updated:** [DATE/TIME]
**Updated By:** [WHO]

### Status Notes
[Current comments on progress, blockers, or changes]

---

### Status History

| Date | Status | Owner | Notes |
|------|--------|-------|-------|
| [DATE] | Open | [Name] | POAM created |
| [DATE] | In Progress | [Name] | [Notes] |
| [DATE] | [Status] | [Name] | [Notes] |

---

## 8. CLOSURE DOCUMENTATION

### Completion Verification
**Verification Date:** [DATE]
**Verified By:** [Role]

**Verification Results:**
- ☐ All milestones completed
- ☐ Completion criteria met
- ☐ System/asset verified clean/remediated
- ☐ Monitoring enabled
- ☐ Residual risk accepted/monitored

**Verification Details:** [Technical details of verification]

### Lessons Learned
[What should we do differently next time?]

### Post-Closure Actions
- ☐ Close ticket in incident tracking system
- ☐ Update security posture/baseline
- ☐ Update detection rules if applicable
- ☐ Document findings in knowledge base
- ☐ Brief personnel on what happened and prevention
- ☐ Archive POAM in historical records

---

## ATTACHMENTS

- [Incident Report]
- [Host Analysis Report]
- [Network Analysis Report]
- [Malware Analysis Report]
- [Forensic Timeline]
- [Change Control Request]
- [Approval Documentation]

---

## APPROVAL SIGNATURES

**Element Lead:**
Name: _________________ Date: _______ Signature: _________________

**Commander (if residual risk acceptance needed):**
Name: _________________ Date: _______ Signature: _________________

---

## NOTES

[Additional notes, context, or clarifications]

---

**Classification:** UNCLASSIFIED // FOUO
**Created:** [DATE]
**Last Updated:** [DATE]
**File Path:** docs/POAMs/[OPERATION]/[POAM-ID].md
