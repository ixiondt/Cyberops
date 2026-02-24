# POAM Generation Guide
**Step-by-Step Procedures for Creating POAMs from Findings**

---

## Overview

This guide provides **step-by-step procedures** for converting cyber response findings into POAMs (Plans of Action and Milestones). Follow this process to ensure POAMs are clear, actionable, and properly prioritized.

---

## Before You Start

**Verify You Have:**
- ✓ Incident report with documented findings
- ✓ Host/Network analysis reports (if applicable)
- ✓ Malware analysis report (if applicable)
- ✓ Threat intelligence summary (if applicable)
- ✓ OPORD Task Organization (to know who to assign to)
- ✓ Access to POAM templates

**Verify You Know:**
- ✓ Operation name and code
- ✓ Your role/authority to generate POAMs
- ✓ Who will approve POAMs (usually Element Lead)

---

## STEP 1: Review Finding & Determine POAM Necessity

### 1A. Identify the Finding
- **From:** Incident report FINDINGS section
- **Document:** Finding ID, description, scope, assets affected

### 1B. Ask: "Is This Resolved?"
Use the decision flowchart from `Finding_to_POAM_Mapping.md`:

```
Was the finding FULLY resolved during response?
├─ YES (e.g., malware removed, credential reset, rule deployed)
│     → Document "RESOLVED DURING RESPONSE" in incident report
│     → NO POAM needed
└─ NO (e.g., pending malware removal, detection rule still needed)
      → Continue to Step 2
```

### 1C. Ask: "Does It Require Follow-Up Action?"
```
Does remediation require follow-up beyond the incident response?
├─ YES (e.g., verify clean, monitor for reuse, harden system)
│     → Continue to Step 2 (CREATE POAM)
└─ NO (e.g., risk accepted, no action feasible)
      → Document rationale in incident report
      → NO POAM needed
```

---

## STEP 2: Classify Finding Type & Risk

### 2A. Classify Finding Type
Use `Finding_to_POAM_Mapping.md` decision tree:

**Question: What type of finding is this?**
1. ☐ **Malware** — Malicious software found and requires removal/verification
2. ☐ **Credential Compromise** — Credential was compromised and requires reset/monitoring
3. ☐ **Lateral Movement** — Unauthorized movement between systems confirmed
4. ☐ **Configuration Deficiency** — Security baseline deviation or missing patch
5. ☐ **Detection Gap** — Technique/indicator not detected by existing tools
6. ☐ **Vulnerability/Exposure** — Exploitable flaw or exposed service
7. ☐ **Process/Procedure Gap** — Procedural error or unclear procedure
8. ☐ **Incomplete Investigation** — Investigation requires follow-up

### 2B. Assign Risk Priority
Use `Risk_Prioritization.md` matrix:

**Quick Priority Rules:**
- 🔴 **CRITICAL** (Immediate-7 days) — Active compromise, ongoing threat, known reuse
- 🟠 **HIGH** (24-72 hours) — Contained threat, known compromise, must-fix baseline
- 🟡 **MEDIUM** (7-14 days) — Configuration gap, incomplete investigation, emerging threat
- 🟢 **LOW** (30+ days) — Hardening improvement, lessons learned, optimization

**Risk Scoring (if needed):**
Use NIST SP 800-30 methodology:
- **Likelihood (1-5):** How likely to occur/recur?
- **Impact (1-5):** How bad if it occurs?
- **Risk = Likelihood × Impact**

---

## STEP 3: Define Remediation Approach

### 3A. Determine "What We're Fixing"
**Ask:** What is the end state after POAM closure?

**Examples:**
- "Malware removed, endpoint verified clean, system hardened to baseline"
- "Compromised credential reset, account usage audited, monitoring active for reuse"
- "Detection rule deployed and validated to catch [technique]"
- "Configuration applied to [systems] per security baseline"

### 3B. Identify Owner/Responsible Party
**Ask:** Who has the skills and authority to execute the fix?

**Common Assignments:**
| Finding Type | Owner | Backup |
|---|---|---|
| Malware removal | Host Team | S-2 |
| Credential reset | S-1 Identity Admin | S-1 Manager |
| Detection rule | S-2 SOC | Network Analyst |
| Configuration fix | System Admin | S-3 |
| Network segmentation | Network Team | S-3 |

**Verify:** Owner agrees to timeline and has resources available

### 3C. Outline High-Level Steps
**Ask:** What are the major steps to remediation?

**Example Steps:**
1. Isolate/contain problem (if not already done)
2. Collect evidence/artifacts (if needed)
3. Remediate (remove malware, reset credential, apply config)
4. Verify remediation (EDR clean, reimage complete, rule deployed)
5. Monitor for recurrence (30-day observation, rule tuning)
6. Close and archive POAM

---

## STEP 4: Build Milestones & Timeline

### 4A. Estimate Overall Timeline
**Question:** From now to closure, how many days needed?

**Factors Affecting Timeline:**
- Severity (CRITICAL = days, LOW = weeks)
- Complexity (single endpoint vs. fleet)
- Dependencies (other POAMs, approvals, maintenance windows)
- Availability (owner's workload, system availability)

**Timeline Examples:**
- Malware removal: 3-7 days (1 day remove, 6 days monitor)
- Credential reset: 1-5 days (hours to reset, days to monitor)
- Detection rule: 7-14 days (design, test, deploy, tune)
- Config hardening: 14-30 days (plan, test, deploy, verify)

### 4B. Create Specific Milestones
**Format:** Each milestone has DATE, OWNER, CRITERIA

| # | Milestone Name | Description | Owner | Target Date | Completion Criteria |
|---|---|---|---|---|---|
| 1 | [Name] | [What will be done] | [Team] | [DATE] | [How to verify] |
| 2 | [Name] | [What will be done] | [Team] | [DATE] | [How to verify] |
| 3 | [Name] | [What will be done] | [Team] | [DATE] | [How to verify] |

**Guidelines:**
- Milestones should be **specific** (not "fix system" but "patch applied and verified on SRV-PROD-01")
- Milestones should be **measurable** (not "monitor" but "zero suspicious events for 7 days")
- Milestones should be **achievable** (realistic timeframe given resources)
- Completion criteria should be **objective** (can be verified, not subjective)

### 4C. Identify Dependencies & Constraints
**Ask:** What could block this POAM?

- Requires other POAMs first? [List]
- Requires approval/authority? [Who? When?]
- Requires maintenance window? [How long? When feasible?]
- Requires external coordination? [Who? How long?]
- Resource constraints? [What? Any workarounds?]

---

## STEP 5: Complete POAM Template

### 5A. Open POAM_Template.md
Make a **copy** for each new POAM:
```
docs/POAMs/[OPERATION]/[POAM-ID]_[Title].md
```

Example filename:
```
docs/POAMs/OP_GUARDIAN/OP-GUARDIAN-POAM-01_Malware_WIN-USR-0847.md
```

### 5B. Fill Required Sections

**Header (Copy these exactly as-is):**
- [ ] POAM ID: [OPNAME]-POAM-[#]
- [ ] Created: [DATE/TIME]
- [ ] Linked Incident Report: [Reference]

**Section 1: Finding Summary**
- [ ] Title: [Clear description of remediation needed]
- [ ] Description: [Detailed technical description from incident report]
- [ ] Asset/System: [What's affected]
- [ ] Discovery Method: [EDR/Network/Host/etc.]

**Section 2: Risk Assessment**
- [ ] Priority: [Select: CRITICAL/HIGH/MEDIUM/LOW]
- [ ] Finding Type: [Select: Malware/Credential/etc.]
- [ ] Risk Score: [Likelihood × Impact if using NIST methodology]

**Section 3: Remediation Approach**
- [ ] Strategy: [High-level description]
- [ ] Owner: [Name/Team]
- [ ] Authority: [Who approved?]

**Section 4: Milestones**
- [ ] Overall Timeline: [Start - Completion dates]
- [ ] Milestone Table: [Filled with specific milestones from Step 4B]
- [ ] Dependencies: [What blocks this?]

**Section 5: Execution Plan**
- [ ] Pre-execution Checklist: [What must be done first?]
- [ ] Execution Steps: [Detailed procedures]
- [ ] Verification Procedures: [How to verify each milestone]
- [ ] Rollback Plan: [If remediation fails, how to undo?]

**Section 6: Residual Risk**
- [ ] Risk After Closure: [What risk remains?]
- [ ] Monitoring Plan: [How will we watch for recurrence?]

**Section 7: Status Tracking**
- [ ] Status: [Initially "Open"]
- [ ] Notes: [When created]

---

## STEP 6: Validate POAM Quality

### 6A. Completeness Check
- ☐ All required sections filled
- ☐ Milestones are specific and measurable
- ☐ Owner confirmed and available
- ☐ Timeline is realistic
- ☐ Verification procedures are objective
- ☐ Linked to incident report

### 6B. Clarity Check
**Read as if you're the owner executing it:**
- ☐ I understand exactly what needs to be done
- ☐ I understand the timeline and deadlines
- ☐ I understand how I'll know when each milestone is complete
- ☐ I understand any dependencies or blockers
- ☐ I know who to contact with questions

### 6C. Reasonableness Check
- ☐ Timeline matches priority (CRITICAL ≠ 30 days)
- ☐ Scope matches owner's likely capacity
- ☐ Milestones are achievable with available resources
- ☐ No circular dependencies (A depends on B, B depends on A)

### 6D. Risk Check
- ☐ Priority matches finding severity
- ☐ Residual risk is documented
- ☐ Monitoring plan will catch recurrence

---

## STEP 7: Submit for Approval

### 7A. Prepare Submission Package
**Collect:**
- Completed POAM markdown file
- Link to incident report
- Any supporting analysis documents

### 7B. Submit to Element Lead
**Include:**
- "POAM Ready for Approval: [POAM ID] - [Title]"
- Key details: Priority, Owner, Timeline, Key Risk
- Any blockers or questions

### 7C. Incorporate Feedback
**If changes requested:**
- Update POAM_Template.md with feedback
- Note change in "Last Updated" section
- Resubmit for approval

### 7D. Get Signature (if required)
**For CRITICAL POAMs or residual risk acceptance:**
- Get Element Lead signature on POAM
- Get Commander signature if residual risk acceptance
- File signed version with POAMs

---

## STEP 8: Add to POAM Tracker

### 8A. Update POAM_Tracker.md
**Add new row to status matrix:**

| POAM ID | Title | Type | Owner | Status | Priority | Target | Days Rem | Last Update | Notes |
|---------|-------|------|-------|--------|----------|--------|----------|------------|-------|
| [ID] | [Title] | [Type] | [Owner] | Open | [P] | [DATE] | [#] | [NOW] | Just created |

### 8B. Update Summary Section
- Increment "Total POAMs"
- Increment "Critical Items" if applicable
- Update "Open" count

### 8C. File POAM
**Where to store:**
```
docs/POAMs/TRACKER/POAM_Log.md
  OR
docs/POAMs/[OPERATION]/[POAM-ID]_[Title].md
```

---

## STEP 9: Communicate to Owner

### 9A. Brief the Owner
**Meeting/Email to Owner:**
- "You've been assigned POAM-XX"
- Explain the finding and remediation needed
- Walk through milestones and timeline
- Confirm available resources
- Address any questions

### 9B. Provide Access
- Ensure owner has access to POAM_Template.md
- Provide link to Incident Report
- Provide link to this guide if owner is new to POAMs
- Provide contact for questions/blockers

### 9C. Confirm Understanding
- Owner repeats back timeline and milestones
- Owner confirms availability of resources
- Owner confirms they can meet first milestone date

---

## STEP 10: Monitor & Update

### 10A. Daily During Execution
**Owner Responsibility:**
- Work on assigned milestones
- Report blockers immediately
- Update POAM status if changes

**Tracker Maintainer Responsibility:**
- Check for status updates
- Escalate blockers to Element Lead
- Alert if milestone approaching deadline

### 10B. Update on Milestone Completion
**Update POAM Section 7:**
- [ ] Status: Change to "In Progress" when work starts
- [ ] Milestone table: Mark completed milestone, update date
- [ ] Notes: Explain what was accomplished

### 10C. Weekly Status Review
**S-3 leads weekly meeting:**
- Review all POAM statuses
- Identify "At Risk" POAMs (behind schedule)
- Escalate blockers to Element Lead
- Update POAM_Tracker.md with latest summary

### 10D. Closure Verification
**When owner reports completion:**
- Verify completion criteria met
- Confirm residual risk acceptable
- Document residual risk monitoring plan
- Update POAM: Section 8 (Closure Documentation)
- Update POAM Status to "Closed"
- Update POAM_Tracker.md

---

## Quick Reference: Common POAM Scenarios

### Scenario 1: Malware Found, Needs Removal

**Steps:**
1. ✓ Finding: Malware detected by EDR
2. ✓ Classify: MALWARE type, CRITICAL priority
3. ✓ Milestones: Isolate (day 0) → Collect sample (day 1) → Reimage (day 2-3) → Verify clean (day 4-5) → Monitor (days 6-36)
4. ✓ Owner: Host Team
5. ✓ Template: Fill with specific endpoint hostname, malware family, collection method
6. ✓ Verify: EDR shows clean state, no suspicious behavior for 7 days
7. ✓ Monitor: 30-day post-incident monitoring for recurrence

**Timeline:** 7 days to closure (1 day remove, 6 days monitor)

---

### Scenario 2: Credential Compromised

**Steps:**
1. ✓ Finding: Account used for lateral movement
2. ✓ Classify: CREDENTIAL_COMPROMISE type, HIGH/CRITICAL priority
3. ✓ Milestones: Reset credential (hours) → Audit usage (day 1) → Check related accounts (day 2) → User notification (day 3) → Monitor (days 4-64)
4. ✓ Owner: S-1 Identity Admin
5. ✓ Template: Fill with account name, usage scope, related accounts to check
6. ✓ Verify: SIEM shows no unauthorized access with account post-reset, audit complete
7. ✓ Monitor: 60-day monitoring for credential reuse attempts

**Timeline:** 1-5 days to reset, 60-day monitoring

---

### Scenario 3: Detection Gap (Rule Needed)

**Steps:**
1. ✓ Finding: Malware present but no EDR alert generated
2. ✓ Classify: DETECTION_GAP type, HIGH priority (ongoing attack vector)
3. ✓ Milestones: Design rule (day 3) → Test on past incidents (day 7) → Deploy test (day 10) → Tune (day 14) → Deploy prod (day 21)
4. ✓ Owner: S-2/SOC
5. ✓ Template: Fill with technique, observable indicators, alert thresholds
6. ✓ Verify: Rule deployed, tested on past incidents, no false positives
7. ✓ Monitor: Rule tuning and SOC awareness

**Timeline:** 14-21 days to production deployment

---

## Troubleshooting Common Issues

### Issue: "I Don't Know Who Should Own This POAM"
**Solution:** Check OPORD Task Organization. If unclear, ask Element Lead. If still unclear, assign to Element Lead for delegation.

---

### Issue: "Timeline Seems Too Short"
**Solution:** Verify with owner. If unrealistic, escalate to Element Lead for resource negotiation or priority adjustment.

---

### Issue: "Finding Seems Resolved, But I'm Uncertain"
**Solution:** Document the uncertainty in POAM. Create POAM if any follow-up monitoring or investigation needed. When in doubt, create POAM.

---

### Issue: "Multiple Findings, Should They Be One POAM or Multiple?"
**Solution:** Create separate POAMs if different owners or different timelines. Can reference each other in POAM tracker. If same owner and same timeline, can combine into one POAM with multiple milestones.

---

## References

- **Finding Classification:** docs/POAMs/TEMPLATES/Finding_to_POAM_Mapping.md
- **Risk Prioritization:** docs/POAMs/GUIDANCE/Risk_Prioritization.md
- **POAM Template:** docs/POAMs/TEMPLATES/POAM_Template.md
- **POAM Tracker:** docs/POAMs/TEMPLATES/POAM_Tracker.md
- **Examples:** docs/POAMs/EXAMPLES/

---

**Last Updated:** 2026-02-24
**Classification:** UNCLASSIFIED // FOUO
