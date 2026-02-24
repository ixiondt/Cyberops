# Finding-to-POAM Mapping Guide
**Decision Logic and Classification for Converting Findings to POAMs**

---

## Overview

This guide helps analysts and planners **classify findings** and **determine if a POAM is needed**. Not every finding requires a POAM—some findings are resolved during response and require only documentation.

**Key Question:** "Does this finding require follow-up action beyond the current response?"

---

## Decision Flowchart

```
Finding Identified
    ↓
Is the finding RESOLVED during response? (Malware removed, credential reset completed, etc.)
    ├─ YES → Document in incident report FINDINGS section → No POAM needed
    └─ NO → Does finding require follow-up action?
          ├─ YES → CLASSIFY FINDING TYPE (below)
          │        → CREATE POAM using POAM_Template.md
          │        → Assign to responsible owner
          └─ NO → Document reason why no follow-up needed → No POAM needed
```

---

## Finding Classification Decision Tree

### Is it a MALWARE Finding?

**Indicators:**
- EDR detected malware
- Forensic analysis confirms malware presence
- Network traffic analysis shows C2 callback
- Threat intel indicates malware family present

**Questions to Ask:**
1. Is malware still present or has it been fully removed? *YES → POAM for verification*
2. Does endpoint need hardening beyond standard removal? *YES → POAM for hardening*
3. Is there uncertainty about full eradication? *YES → POAM for monitoring/continued investigation*
4. Was there potential data exfiltration? *YES → POAM for investigation continuation*

**Timing:**
- If contained but not yet removed: CRITICAL (immediate action)
- If removal underway: HIGH (24-72 hours)
- If removed but needs verification: MEDIUM (7 days)

**Example POAM:**
```
Title: "Malware eradication and endpoint hardening - WIN-USR-0847"
Category: MALWARE
Timeline: Days 0-7
Milestones: Isolate → Collect sample → Reimage → Baseline → Verify clean → Monitor 30 days
Owner: Host Team
```

**Reference:** See `EXAMPLES/Example_POAM_Malware.md`

---

### Is it a CREDENTIAL COMPROMISE Finding?

**Indicators:**
- Credential found in breach database
- Account used for suspicious activities
- Unusual login patterns detected
- Compromised credential used in lateral movement

**Questions to Ask:**
1. Has the credential been reset? *NO → POAM for immediate reset*
2. Was it a privileged account? *YES → POAM includes domain-wide audit*
3. Was there lateral movement using it? *YES → POAM includes investigation continuation*
4. Is it unclear what data the account accessed? *YES → POAM for audit/investigation*
5. Are there related compromised credentials? *YES → Combine into one multi-account POAM or create separate POAMs*

**Timing:**
- Privileged account: CRITICAL (immediate reset, within 2 hours)
- Standard user account: HIGH (24-72 hours reset + monitoring)
- Credential from mass breach with no use: MEDIUM (7 days audit + monitoring)

**Example POAM:**
```
Title: "Credential reset and reuse monitoring - username@domain.com"
Category: CREDENTIAL_COMPROMISE
Timeline: Days 0-60
Milestones: Identify scope → Reset credential → Audit account usage → Reset related accounts → User notification → Monitor for reuse
Owner: S-1 Identity Admin
```

---

### Is it a LATERAL MOVEMENT Finding?

**Indicators:**
- Network Analyst detects unexpected traffic between systems
- Host forensic analysis shows evidence of access from unusual source
- Privilege escalation detected on multiple systems
- Impossible travel or suspicious session patterns

**Questions to Ask:**
1. Is lateral movement still ongoing? *YES → CRITICAL - stop it first, then POAM*
2. Is the extent of lateral movement known? *NO → POAM for investigation continuation*
3. What systems were accessed? *Need to determine for scoping POAM*
4. Could movement have affected critical systems? *YES → Escalate to commander*
5. Is network segmentation inadequate? *YES → POAM for network improvements*

**Timing:**
- Ongoing movement: CRITICAL (immediate containment)
- Confirmed but contained: HIGH (24-72 hours investigation)
- Suspected but unconfirmed: MEDIUM (7 days investigation)
- Movement path identified, remediation needed: MEDIUM (7-14 days segmentation)

**Example POAM:**
```
Title: "Network segmentation enhancement and lateral movement path closure"
Category: LATERAL_MOVEMENT
Timeline: Days 3-30
Milestones: Map movement path → Audit affected systems → Segment network → Deploy detection rules → Verify segmentation
Owner: Network Team + S-3
```

---

### Is it a CONFIGURATION DEFICIENCY Finding?

**Indicators:**
- Security baseline audit shows deviation
- Malware exploited missing patch or hardening
- Compliance scan identifies missing security control
- Manual audit reveals security misconfiguration

**Questions to Ask:**
1. Is it a compliance-required configuration? *YES → POAM is mandatory, prioritize HIGH*
2. Is it a security baseline deviation? *YES → POAM with standard timeline*
3. How many systems are affected? *Multiple systems → May combine into single POAM with multiple targets*
4. Is a workaround available while remediation pending? *YES → Consider MEDIUM priority*
5. Is it a known exploitation vector? *YES → CRITICAL or HIGH depending on active exploitation*

**Timing:**
- Exploited in active incident: HIGH/CRITICAL (days 1-7)
- Compliance-required: HIGH (7 days to plan, 30 days to implement)
- Hardening improvement: MEDIUM (30+ days in maintenance cycle)

**Example POAM:**
```
Title: "Apply security baseline hardening to server fleet"
Category: CONFIG_DEFICIENCY
Timeline: Days 7-30
Milestones: Assess impact → Plan changes → Test in lab → Schedule maintenance → Apply hardening → Verify baseline
Owner: System Admin + S-3
```

**Reference:** See `EXAMPLES/Example_POAM_Config.md`

---

### Is it a DETECTION GAP Finding?

**Indicators:**
- Response found malware/activity but no alert was generated
- Technique used was not detected by existing tools
- Log source was unavailable or incomplete
- Threat indicator is known but not monitored for

**Questions to Ask:**
1. Is the detection gap affecting ongoing threats? *YES → HIGH priority*
2. Is this a one-time gap or recurring threat? *Recurring → HIGH priority*
3. Can a detection rule/signature be created? *YES → POAM for rule development*
4. Is a log source missing? *YES → POAM for log source enablement*
5. Is this affecting multiple techniques? *YES → May combine into single detection enhancement POAM*

**Timing:**
- Gap affects active threat: HIGH (7-14 days to deploy rule)
- Gap affects recurring threat: MEDIUM (14-21 days to develop and deploy)
- Opportunistic detection improvement: LOW (30+ days)

**Example POAM:**
```
Title: "Develop and deploy detection rule for [Technique/Indicator]"
Category: DETECTION_GAP
Timeline: Days 3-21
Milestones: Design rule → Test on past incidents → Deploy to test environment → Tune for false positives → Deploy to production → Monitor
Owner: S-2/SOC
```

**Reference:** See `EXAMPLES/Example_POAM_Detection.md`

---

### Is it a VULNERABILITY/EXPOSURE Finding?

**Indicators:**
- Vulnerability scan identifies CVE on unpatched system
- Patch was available but not yet applied
- Exposed service or port identified on network
- Malware analysis exploits specific CVE

**Questions to Ask:**
1. Is the vulnerability exploitable from outside? *YES → CRITICAL*
2. Is it a compliance-required patch? *YES → HIGH*
3. Is a workaround available? *YES → Can reduce priority slightly*
4. Is the system critical to operations? *YES → Increase priority*
5. How many systems affected? *Many → May combine into single POAM*

**Timing:**
- Remote exploitable, no workaround: CRITICAL (immediate-7 days)
- Compliance required: HIGH (30 days per policy)
- Low exploitability, non-critical system: MEDIUM (30+ days)

**Example POAM:**
```
Title: "Patch CVE-XXXX-XXXXX on [system/fleet]"
Category: VULNERABILITY
Timeline: Days 1-30
Milestones: Test patch → Plan deployment → Schedule maintenance → Apply patch → Verify → Monitor
Owner: System Admin
```

---

### Is it a PROCESS/PROCEDURE GAP Finding?

**Indicators:**
- Procedure was unclear, leading to missed step
- Personnel didn't know correct procedure
- Escalation procedure was not followed
- Documentation missing or out of date

**Questions to Ask:**
1. Did this gap impact the response? *YES → HIGH priority*
2. Is it likely to happen again? *YES → POAM to fix procedure*
3. Are multiple people affected? *YES → Requires training + documentation*
4. Is external coordination needed? *YES → MEDIUM-HIGH priority*
5. Is it a critical operational procedure? *YES → CRITICAL or HIGH*

**Timing:**
- Affects critical procedure: HIGH (14 days to implement)
- Affects non-critical procedure: MEDIUM (30 days)
- Improvement opportunity: LOW (30+ days)

**Example POAM:**
```
Title: "Document and train [procedure name]"
Category: PROCESS_GAP
Timeline: Days 7-28
Milestones: Analyze root cause → Draft procedure → Review and approve → Train personnel → Test → Document in wiki
Owner: Element Lead + Training
```

---

### Is it an INCOMPLETE INVESTIGATION Finding?

**Indicators:**
- Response ran out of time before completing forensics
- Correlation/analysis still needed
- Root cause not fully understood
- Related indicators need follow-up

**Questions to Ask:**
1. Could investigation reveal additional compromise? *YES → MEDIUM-HIGH priority*
2. Does investigation affect remediation decisions? *YES → POAM may be dependent on other POAMs*
3. How long will investigation take? *Estimate timeline*
4. Are additional tools/expertise needed? *YES → Plan resource allocation*
5. Is this a known threat needing assessment? *YES → MEDIUM priority*

**Timing:**
- Affects remediation decisions: HIGH (3-7 days)
- Historical/intelligence analysis: MEDIUM (7-14 days)
- Low-priority research: LOW (30+ days)

**Example POAM:**
```
Title: "Complete forensic analysis and correlate [finding/incident]"
Category: INVESTIGATION_INCOMPLETE
Timeline: Days 3-14
Milestones: Collect additional artifacts → Analyze → Correlate with threat intel → Document findings → Brief team
Owner: Host/Network Team
```

---

### Is it an OTHER Finding?

**Indicators:**
- Does not fit cleanly into above categories
- Complex finding with multiple facets
- Systemic/organizational issue
- Future operational improvement

**Decision Process:**
1. **Classify primary aspect:** What's the main issue?
2. **Secondary classifications:** Are there multiple finding types?
3. **Determine owner:** Who is best positioned to remediate?
4. **Estimate timeline:** Based on priority and complexity
5. **Define milestones:** What are the key steps to resolution?

**Example POAM:**
```
Title: [Define clearly]
Category: OTHER - [Describe]
Timeline: [Estimate]
Milestones: [Define major steps]
Owner: [Assign]
```

---

## Quick Decision Table

| Finding Type | Key Questions | POAM Timing | Category |
|---|---|---|---|
| **Malware** | Still present? Data exfil? | Days 0-7 | MALWARE |
| **Credential** | Privileged? Reused? | Immed-72h | CREDENTIAL_COMPROMISE |
| **Lateral Movement** | Ongoing? Extent known? | Days 3-14 | LATERAL_MOVEMENT |
| **Config** | Compliance-required? Exploited? | Days 7-30 | CONFIG_DEFICIENCY |
| **Detection Gap** | Affects active threat? Recurring? | Days 7-21 | DETECTION_GAP |
| **Vulnerability** | Remote exploitable? Critical system? | Immed-30d | VULNERABILITY |
| **Process Gap** | Impact on response? Reoccurrence risk? | Days 14-30 | PROCESS_GAP |
| **Investigation** | Reveals compromise? Affects remediation? | Days 3-14 | INVESTIGATION_INCOMPLETE |

---

## When NOT to Create a POAM

### Resolved During Response
**Rule:** If remediation was fully completed during the response incident, document finding but do NOT create POAM.

**Examples:**
- Malware fully removed and verified clean during response
- Compromised credential reset during response with no subsequent reuse
- Detection rule deployed and validated during response
- Configuration applied and verified during response

**Documentation:** Note in incident report "Finding resolved during response - POAM not required"

---

### No Follow-Up Action Needed
**Rule:** If finding requires no follow-up, document but do not create POAM.

**Examples:**
- Finding identified for intelligence tracking (no action required)
- Historical threat intelligence (already known, no action)
- Potential issue but very low likelihood (monitor only, no remediation)

**Documentation:** Note in incident report rationale for no POAM

---

### Risk Acceptance Without POAM
**Rule:** If commander accepts residual risk without remediation, POAM not required but risk must be documented.

**Examples:**
- Known vulnerability on non-critical system, patch deployment deferred
- Configuration deviation accepted due to operational constraints
- Residual risk accepted with monitoring in place

**Documentation:** Formal risk acceptance memo with commander signature, reference in incident report

---

## POAM Classification Checklist

Before creating a POAM, verify:

- ☐ Finding is not already resolved
- ☐ Follow-up action is required
- ☐ Finding type has been classified (using decision tree above)
- ☐ Priority has been assigned (using Risk_Prioritization.md)
- ☐ Owner has been identified (Task Organization)
- ☐ Timeline is realistic and documented
- ☐ Milestones are specific and measurable
- ☐ Verification criteria are defined
- ☐ Approval authority is known (Element Lead minimum)
- ☐ Using correct template (POAM_Template.md)
- ☐ Linked to original finding document/incident report

---

## Common Classification Mistakes

### Mistake 1: Creating POAM for Resolved Finding
**Wrong:** "Malware found, POAM created to remove it"
**Right:** If malware removed during response → Document only, no POAM. If malware removal still pending → POAM with removal + verification milestones.

---

### Mistake 2: Combining Unrelated Findings into One POAM
**Wrong:** "Network issues" POAM combining lateral movement, detection gap, and configuration deficiency
**Right:** Create separate POAMs for each finding type, link them in tracker if related.

---

### Mistake 3: Unclear Remediation Path
**Wrong:** "Fix security issues" with undefined milestones
**Right:** Specific milestones like "Patch applied and verified on server X by DATE"

---

### Mistake 4: Assigning POAM to Wrong Owner
**Wrong:** S-2 owns credential reset POAM
**Right:** S-1 Identity Admin owns credential reset, S-2 provides threat context

---

### Mistake 5: Unrealistic Timeline
**Wrong:** CRITICAL malware POAM with 30-day timeline
**Right:** CRITICAL malware POAM with 7-day closure timeline (1-day removal, 6-day monitoring)

---

## Examples

See the `EXAMPLES/` folder for worked examples:
- `Example_POAM_Malware.md` — Malware finding → POAM
- `Example_POAM_Config.md` — Configuration deficiency → POAM
- `Example_POAM_Detection.md` — Detection gap → POAM

---

## References

- **Risk Prioritization:** docs/POAMs/GUIDANCE/Risk_Prioritization.md
- **POAM Template:** docs/POAMs/TEMPLATES/POAM_Template.md
- **POAM Generation Guide:** docs/POAMs/GUIDANCE/POAM_Generation_Guide.md
- **INDEX:** docs/POAMs/INDEX.md (detailed finding type guidance)

---

**Last Updated:** 2026-02-24
**Classification:** UNCLASSIFIED // FOUO
