# THREAT HUNT — PROACTIVE DETECTION PLAYBOOK
## 7-Step Framework | UNCLASSIFIED // FOUO

**Playbook ID:** IR-PB-017
**Version:** 1.0
**Classification:** UNCLASSIFIED // FOUO
**Type:** Proactive — This playbook is executed BEFORE a confirmed incident, not in response to one
**Primary Lead:** S-2 / Intelligence Analyst (hunt hypothesis) + 17C Host Analyst (host hunt) + 17C Network Analyst (network hunt) — CO-LEAD
**Supporting Entities:** Cyber Ops Planner (scope / authority), IT Ops (data access)
**Authority:** AR 25-2 | FM 3-12 | ATP 3-12.3 | Hunt Team Authorization (OPORD / Tasking Order)
**Created:** 2026-02-25

**Hunt Philosophy:** Threat hunting assumes a breach has already occurred and that existing automated detections have missed it. Hunters operate with the assumption that the adversary is present — the goal is to find them.

**MITRE ATT&CK Usage:** ATT&CK drives hunt hypotheses — select techniques likely used by the threat actor operating against your environment, then hunt for evidence of those techniques regardless of whether alerts fired.

---

## BLUF

Threat hunting is proactive, intelligence-driven investigation of your own environment to find attacker activity that automated tools missed. It is not alert response — it's deliberate, hypothesis-driven analysis of data that has already been collected but never deeply examined. The output of a hunt is either: (1) No evidence of adversary activity (increase confidence in clean state), or (2) Incident discovered (activate reactive playbooks). Every hunt also produces detection improvements — new rules, new baselines, new collection gaps identified.

**The hunter's mindset:** "The attacker is already here. Where are they hiding?"

---

## STEP 1: PREPARATION

### 1.1 Hunt Prerequisites
| Requirement | Purpose |
|------------|---------|
| Hunt authority / tasking order | Legal authorization to access system data for active hunting |
| Data access across all hunt scope systems | Cannot hunt what you cannot see |
| Intelligence (threat actor profile) | Drives hypothesis development |
| Baseline (what is normal) | Cannot identify anomalies without normal reference |
| Query capability (SIEM, EDR, NDR) | Ability to search historical data at scale |
| Time allocation | Hunts require uninterrupted analyst time |

### 1.2 Hunt Authority Validation
Before beginning any hunt:
- [ ] OPORD / tasking order authorizes proactive hunt activity on specified network
- [ ] Scope defined (which systems, which time window, which techniques)
- [ ] Data access authorized (system owner coordination complete)
- [ ] Hunt is documented (start date, scope, hypothesis, analysts)

### 1.3 Hunt Team Composition (Minimum)
| Role | Minimum | Optimal |
|------|:-------:|:-------:|
| Hunt lead (S-2 / senior analyst) | 1 | 1 |
| Host analyst | 1 | 2 |
| Network analyst | 1 | 2 |
| Intel support (hypothesis refinement) | 0 | 1 |

---

## STEP 2: DETECTION & IDENTIFICATION (FOR THIS PLAYBOOK: HYPOTHESIS DEVELOPMENT)

### 2.1 Hunt Hypothesis Framework
A hunt hypothesis is a specific, testable statement:
- **NOT a hypothesis:** "Check for malware"
- **IS a hypothesis:** "APT41 is known to use scheduled tasks for persistence on Windows systems with names mimicking legitimate Windows tasks. Hunt for scheduled tasks created within the last 90 days that do not match the known-good baseline."

Each hypothesis must specify:
1. The **threat** (actor or technique)
2. The **target** (what systems/data will be searched)
3. The **observable** (what artifact indicates this technique)
4. The **time window** (how far back to look)

### 2.2 Hypothesis Sources
**Intelligence-Driven (S-2 Lead):**
- Known threat actors targeting your sector/mission type
- Recent threat intelligence on actor TTPs (CISA advisories, ARCYBER reporting)
- MITRE ATT&CK techniques associated with current threat actors
- IOCs from recent industry incidents or ISAC reporting

**Environment-Driven (Analyst Lead):**
- Unexplained anomalies in baseline data (things that don't quite fit)
- Results of previous hunts (what did we find? what did we miss?)
- Known architectural gaps (segments we can't see well)
- Expiring baselines (what "normal" may have shifted)

**Assumption-Driven (Planner Lead):**
- What would the adversary target given current mission context?
- What access would provide the most value to a threat actor in this OE?
- What would the adversary do in their first 72 hours of access?

### 2.3 Hunt Hypothesis Backlog (S-2 Maintains)
Maintain a running list of hunt hypotheses prioritized by:
- Threat actor relevance (targeting this type of organization)
- Technique prevalence (commonly missed by automated detection)
- Environment exposure (known gaps in coverage)

**Example Hypothesis Backlog:**
| Priority | Hypothesis | Technique | Time Window |
|:--------:|-----------|-----------|:-----------:|
| 1 | Scheduled tasks created outside change management windows mimicking Windows built-in task names | T1053 | 90 days |
| 2 | WMI event subscriptions present on endpoints (not in baseline) | T1546.003 | 90 days |
| 3 | DNS queries to domains registered in last 30 days from internal hosts | T1568.002 | 30 days |
| 4 | PowerShell encoded command execution from non-IT endpoints | T1059.001 | 30 days |
| 5 | RDP connections between workstations (peer-to-peer, not through jump server) | T1021.001 | 60 days |
| 6 | Outbound HTTPS connections at exactly 60-second intervals (beacon pattern) | T1071.001 | 14 days |

---

## STEP 3: CONTAINMENT (FOR THIS PLAYBOOK: HUNT EXECUTION)

### 3.1 Hunt Execution Workflow
```
SELECT HYPOTHESIS (from backlog, based on current threat intel)
     │
     ▼
DEFINE QUERY (translate hypothesis to SIEM/EDR query language)
     │
     ▼
EXECUTE QUERY (search historical data)
     │
     ▼
REVIEW RESULTS (filter false positives against baseline)
     │
     ├── RESULTS MATCH HYPOTHESIS → Investigate deeply
     │                               → If confirmed: INCIDENT FOUND → Reactive playbooks
     │
     └── NO MATCH → Document (negative result has value)
                   → Refine query if poor data quality
                   → Move to next hypothesis
```

### 3.2 Host-Side Hunt Execution (17C Host Analyst)

**Persistence Hunt:**
- Query EDR for scheduled tasks created in last [N] days
- Compare to known-good scheduled task baseline
- Query for new services installed in last [N] days
- Compare to approved service list
- Query for new registry run keys

**Execution Hunt:**
- Query for PowerShell encoded command execution (-EncodedCommand) by non-IT accounts
- Query for unusual parent-child process relationships (Word spawning PowerShell, Excel spawning cmd)
- Query for execution from unusual locations (Temp, AppData, Downloads)
- Query for LOLBin (Living-off-the-Land Binary) usage: mshta, wscript, cscript, certutil, regsvr32

**Credential Access Hunt:**
- Query for LSASS access by non-system processes
- Query for shadow copy deletion (vssadmin delete, wmic shadow)
- Query for volume shadow copy manipulation

### 3.3 Network-Side Hunt Execution (17C Network Analyst)

**Beaconing Hunt:**
- Pull NetFlow data for specified time window
- Calculate periodicity scores for all outbound connections (consistent interval = beacon indicator)
- Identify long-lived sessions with low-but-consistent traffic volumes
- Filter known-good (update servers, monitoring) from results

**DNS Hunt:**
- Query for hosts with unusual DNS query volumes
- Search for DGA-style domain queries (high entropy, unusual TLD, newly registered)
- Search for DNS query lengths exceeding 100 characters (potential DNS tunneling)
- Compare DNS destinations to threat intelligence blocklist

**Exfiltration Hunt:**
- Identify hosts with unusual outbound data volumes (compared to 30-day baseline)
- Search for HTTPS connections to new destinations in last 30 days
- Identify usage of personal cloud services (Dropbox, Google Drive personal) from corporate network
- Identify large file uploads to new external destinations

### 3.4 Hunt Documentation During Execution
For each hypothesis investigated:
```
HUNT LOG ENTRY
Hypothesis ID: [H-XXX]
Date/Time Started:
Analyst:
Query Executed: [summary — not full query]
Data Sources Searched:
Time Window Searched:
Results: [N] total items, [N] filtered to [N] requiring investigation
Investigative Actions Taken:
Finding: [NEGATIVE / POSITIVE — describe]
If Positive: Incident ID opened: [IR-XXX]
```

---

## STEP 4: ERADICATION (FOR THIS PLAYBOOK: DETECTION IMPROVEMENT)

### 4.1 Hunt-Derived Detection Improvements
Every completed hunt (positive or negative) should produce at least one of:
- **New detection rule** — if hunt found something automated rules missed, write the rule
- **Baseline update** — if hunt revealed baseline was incomplete or outdated
- **Collection gap** — if hunt was limited by data availability (no logs for X source)
- **Tuning recommendation** — if existing rules are generating noise that masked the technique

### 4.2 Detection Rule Development (From Hunt Findings)
When a hunt successfully identifies a technique:
1. Document the observable (what was the specific artifact that indicated the technique)
2. Draft a SIEM/EDR detection rule based on the observable
3. Tune the rule to reduce false positives (exclude known-good)
4. Test rule against historical data (does it fire on the confirmed finding?)
5. Deploy to SIEM/EDR with appropriate alerting priority
6. Document in detection rule library with technique mapping and test results

### 4.3 Gap Documentation
Hunt-identified gaps are POA&M candidates:
- Log source not available → POA&M for logging deployment
- No baseline for this technique → POA&M for baseline development
- Insufficient data retention → POA&M for retention policy update

---

## STEP 5: RECOVERY (FOR THIS PLAYBOOK: HUNT REPORTING)

### 5.1 Hunt Report Structure
```
HUNT REPORT: [HUNT ID]
Date: [dates of hunt]
Analysts: [list]
Scope: [systems / time window]

HYPOTHESES INVESTIGATED:
[H-001]: [description] → Result: NEGATIVE / POSITIVE (IR-XXX)
[H-002]: [description] → Result: NEGATIVE / POSITIVE (IR-XXX)
...

INCIDENTS DISCOVERED: [N]
[List any incidents found with brief description and IR reference]

DETECTION IMPROVEMENTS:
[New rules developed]
[Baselines updated]
[Gaps identified]

RECOMMENDATIONS:
[Architecture, logging, coverage improvements]

NEXT HUNT PRIORITIES:
[Top 3-5 hypotheses for next hunt cycle]
```

### 5.2 Negative Finding Value
A well-documented negative result is valuable evidence:
- Increases confidence that a specific technique was NOT used in the search window
- Documents coverage (we CAN detect this, and it wasn't there)
- Validates that automated detections are working for this technique class

---

## STEP 6: POST-INCIDENT ANALYSIS (FOR THIS PLAYBOOK: HUNT EFFECTIVENESS ASSESSMENT)

### 6.1 Hunt Metrics (Track Over Time)
| Metric | Purpose |
|--------|---------|
| Hypotheses investigated per hunt cycle | Hunt velocity |
| True positives found (incidents discovered) | Hunt value |
| False positive rate per hypothesis | Query quality |
| Time from hunt to incident confirmation | Detection speed |
| Detection rules generated per hunt | Capability improvement |
| Data gaps identified per hunt | Coverage improvement |

### 6.2 Hunt Program Assessment (Quarterly)
- Are hunts finding incidents that automated tools missed? (If never: either very clean environment OR hypotheses are wrong)
- Are detection rules generated from hunts performing well? (Reducing noise while maintaining detection)
- Are hunt hypotheses aligned to current threat intel? (S-2 review)
- Is hunt coverage improving over time? (More data sources, better baselines)

---

## STEP 7: COORDINATION & REPORTING

### 7.1 Hunt Program Reporting
| Report | Recipient | Frequency |
|--------|-----------|-----------|
| Hunt log (working document) | Element Lead | Continuous during hunt |
| Hunt report (completed) | Mission OIC | Upon hunt completion |
| Incidents discovered | Mission OIC | Immediately (trigger reactive playbooks) |
| Detection improvements | Analyst team | Upon each rule deployment |
| Hunt program status | BN/BDE CDR | Monthly |

### 7.2 Incident Handoff (When Hunt Finds Something)
When a hunt confirms adversary presence:
1. Document the finding with full evidence
2. Notify Mission OIC — "Hunt confirmed adversary presence — activating [INCIDENT PLAYBOOK]"
3. Transition from hunt mode to incident response mode
4. Preserve all hunt data as evidence (chain of custody — see IR-PB-016)
5. Hunting team becomes supporting analysts for the incident response team

### 7.3 Hunt Cycle Planning
Plan hunt cycles around:
- New threat intelligence (actor targeting, new TTPs)
- Post-incident (check if missed activity is present in other systems)
- Scheduled cadence (minimum: monthly for high-priority networks)
- Pre-exercise / pre-inspection (validate security posture before evaluation)

---

## QUICK REFERENCE CARD

```
HUNT EXECUTION CHECKLIST
─────────────────────────
☐ Authority confirmed (OPORD / tasking)
☐ Scope defined (systems, time window)
☐ Hypothesis developed (specific, testable)
☐ Data access confirmed (logs available)
☐ Baseline available (what is normal?)
☐ Query executed → results reviewed
☐ Finding documented (positive or negative)
☐ Detection rule derived (from finding)
☐ Gap identified (if data was insufficient)
☐ Next hypothesis selected

HUNTING MINDSET: THE ADVERSARY IS ALREADY IN. FIND THEM.
NOT: "IF there was an attacker, would we see alerts?"
YES: "WHERE is the attacker hiding that our alerts miss?"
```

---

**Classification:** UNCLASSIFIED // FOUO
**Playbook ID:** IR-PB-017 | Threat Hunt Playbook
**Primary Lead:** S-2 / Intel Analyst (hypothesis) | 17C Host Analyst + 17C Network Analyst (co-lead execution)
**Prepared By:** CyberOpsPlanner System | **Date:** 2026-02-25
**Reference:** `docs/technical/SOP/Playbooks NOV/CPT_Network_Analyst_Playbook_UNCLASSIFIED.docx`
**Reactive Handoff:** Activate relevant IR playbook from PB-001 through PB-016 upon confirmed finding
