# COURSE OF ACTION (COA) ANALYSIS & WARGAME

**OP-DEFENDER - BPEnergy Defensive Cyberspace Operations Response Action**

**OPORD 26-02 Planning Product**

---

## CLASSIFICATION & AUTHORITY

**Classification:** UNCLASSIFIED // FOUO

**Document ID:** OP-DEFENDER-COA-ANALYSIS-001

**Date:** 2026-02-23

**Prepared by:** CyberOpsPlanner / CPB Operations

---

## EXECUTIVE SUMMARY

Three Courses of Action analyzed for APT41 response at BPEnergy:

| COA | Title | Approach | Timeline | Risk | Recommendation |
|-----|-------|----------|----------|------|-----------------|
| **COA 1** | **Forensic-First Investigation** | Deep analysis before action | 10-14 days | HIGH | Not Recommended |
| **COA 2** | **Rapid Response (Selected)** | Parallel investigation & containment | 7-8 days | MEDIUM | ✅ **RECOMMENDED** |
| **COA 3** | **Aggressive Rebuild** | Clean slate rebuild approach | 5-7 days | MEDIUM-HIGH | Alternative if scope extends |

**Selected COA:** **COA 2 - Rapid Response**
- Balances speed with thoroughness
- Manages risk to BPEnergy operations
- Achieves commander's intent (7-day eradication + hardening)
- Maintains supported organization operational continuity

---

## PART I: COA DEVELOPMENT

### A. Commander's Critical Information Requirements (CCIRs)

**CCIR 1:** What is the malware classification and APT41 attribution confidence?
- **Why it matters:** Determines threat sophistication, persistence capability, escalation level
- **Decision impact:** Shapes remediation strategy and detection rule requirements

**CCIR 2:** What is the scope of compromise (lateral movement, affected systems, credentials)?
- **Why it matters:** Determines remediation scope and effort
- **Decision impact:** Affects timeline, resource requirements, mission risk

**CCIR 3:** Has data exfiltration occurred? What data is at risk?
- **Why it matters:** Determines business impact and legal implications
- **Decision impact:** Drives notification requirements and potential law enforcement involvement

**CCIR 4:** Can APT41 maintain re-access if containment is incomplete?
- **Why it matters:** Determines long-term success of operation
- **Decision impact:** Drives detection rule priority and post-remediation monitoring requirements

---

### B. COA Evaluation Criteria

**Primary Criteria:**
1. **Speed of Response** (Weight: 30%) - How quickly can we eliminate APT41 presence?
2. **Risk to Mission** (Weight: 25%) - How much operational disruption to BPEnergy?
3. **Thoroughness** (Weight: 20%) - Do we get all malware and persistence?
4. **Detection Capability** (Weight: 15%) - Can we prevent recurrence?
5. **Resource Efficiency** (Weight: 10%) - Do we have required personnel/tools?

**Secondary Criteria:**
- Feasibility within available authority
- Coordination complexity with BPEnergy
- Sustainability of monitoring (30-day post-remediation)
- Scalability if scope expands

---

### C. Constraints & Limiting Factors

**Time Constraints:**
- Investigation SLA: 36-48 hours (commander's guidance)
- Remediation SLA: 7 days (OPORD 26-02)
- Maintenance window availability: Coordinate with BPEnergy OT/manufacturing
- DC offline tolerance: Limited (authentication service disruption)

**Resource Constraints:**
- CPT 173: 3-4 personnel (host forensics team)
- CPT 174: 2-3 personnel (malware analysis team)
- MOC: 8-10 personnel (includes support functions)
- External support availability: ARCYBER malware lab (escalation only)

**Authority Constraints:**
- DCO-RA authority pre-authorized (but OT system mods require coordination)
- PID (Positive Identification) required before actions
- No offensive operations permitted
- Third-party notification requires coordination

**Operational Constraints:**
- BPEnergy production continuity required (no extended downtime)
- User impact: Limited notification/credential reset capacity
- OT system impact: Production systems cannot be taken offline for extended periods
- Change control procedures: Expedited but still required

---

## PART II: COURSES OF ACTION

### COA 1: FORENSIC-FIRST INVESTIGATION

**Concept:** Conduct comprehensive forensic investigation before any containment/remediation actions. Goal: Complete malware understanding and perfect attribution before taking action.

**Execution Timeline:**
- **Days 1-3:** Deep forensic collection and analysis
- **Days 3-5:** Malware reverse engineering and family identification
- **Days 5-8:** Lateral movement investigation and scope determination
- **Days 8-10:** Full data exfiltration assessment
- **Days 10-14:** Remediation and detection rule deployment
- **Days 14-44:** 30-day post-remediation monitoring

**Total Duration:** 14 days for remediation + 30 days monitoring = **44 days**

#### Strengths:
✅ **Maximum intelligence gathering** - Fully understand APT41 presence and capabilities
✅ **Perfect forensic evidence** - Chain of custody impeccable for potential law enforcement
✅ **No premature action** - Avoid accidentally destroying critical evidence
✅ **Complete lateral movement map** - Know all affected systems before starting remediation

#### Weaknesses:
❌ **High risk of re-compromise** - APT41 has 10-14 days to expand presence
❌ **Data exfiltration ongoing** - Attacker can continue stealing data during investigation
❌ **Extended operational exposure** - Malware persists in production systems for 10+ days
❌ **BPEnergy criticism** - 2-week investigation may appear slow/unresponsive to customer
❌ **Attacker evasion** - Long investigation window gives APT41 time to cover tracks

#### Key Friction Points:
- **Risk of Recurrence:** If investigation takes 14 days and we miss persistence mechanism, APT41 re-establishes access before we deploy detection rules
- **Data Exposure:** BPEnergy likely expects rapid response; 14-day wait for remediation unacceptable
- **Lateral Movement Risk:** APT41 continues lateral movement throughout investigation period
- **Detection Delay:** No detection rules deployed for 14 days; attacker activity goes undetected

#### Resource Requirements:
- High: CPT 173 full-time for 14 days + CPT 174 full-time for reverse engineering
- MOC 24/7 operation

#### Assessment:
**NOT RECOMMENDED** - Risk of extended compromise exceeds value of perfect forensic evidence. BPEnergy operational and security concerns outweigh forensic perfectionism.

---

### COA 2: RAPID RESPONSE (PARALLEL INVESTIGATION & CONTAINMENT)

**Concept:** Conduct forensic investigation and containment/remediation in parallel. Investigate Milestone 1-2 while preparing containment. Rapid forensic response followed by immediate remediation upon investigation completion.

**Execution Timeline:**
- **Day 1 (24h):** Forensic collection & initial analysis (POAM-001 Milestone 1)
  - Parallel: Develop remediation procedures and obtain approvals
- **Days 1-2 (36h):** Malware family ID & scope assessment (POAM-001 Milestones 2-3)
  - Parallel: Finalize remediation plan; schedule maintenance window
- **Days 2-8 (6 days):** Eradication & hardening (POAM-002 Phases 2-5)
  - System cleaning, credential reset, detection rules, lateral movement remediation
- **Days 8-38 (30 days):** Post-remediation monitoring (POAM-002 Phase 6)

**Total Duration:** 8 days for remediation + 30 days monitoring = **38 days**

#### Strengths:
✅ **Fast initial response** - Investigation complete within 36 hours (Day 1-2)
✅ **Rapid containment** - Remediation starts immediately upon investigation completion
✅ **Reduced exposure window** - Malware presence limited to ~8 days total
✅ **Meets commander's intent** - 7-day remediation SLA achievable
✅ **BPEnergy satisfaction** - Rapid visible response to critical finding
✅ **Sufficient intelligence** - Investigation provides adequate data for remediation + detection rules
✅ **Operational efficiency** - Parallel tasking maximizes team capacity

#### Weaknesses:
⚠️ **Forensic evidence risk** - Some evidence may be disrupted during investigation
⚠️ **Potential scope expansion** - If lateral movement missed, remediation phase incomplete
⚠️ **Compressed timeline** - Less margin for error during condensed investigation
⚠️ **Remediation risk** - If investigation incomplete, remediation may leave persistence

#### Key Friction Points:
- **Decision Point 2026-02-24 18:00 UTC:** If investigation finds extensive lateral movement, Phase II remediation scope significantly expands; may exceed 7-day window for full remediation
- **Maintenance Window Coordination:** BPEnergy OT/manufacturing must approve dc2 offline time; scheduling complexity during production hours
- **Parallel Task Management:** CPT 173 must simultaneously investigate AND prepare remediation procedures; resource-intensive
- **Remediation Risk:** If investigation incomplete and persistence remains, 30-day monitoring may find recurrence

#### Risk Mitigation:
1. **Investigation thoroughness:** Milestone 1-3 focus on completeness (don't skip steps for speed)
2. **Aggressive threat hunting:** Phase II threat hunting for lateral movement confirms scope
3. **Detection rule validation:** Phase V detection rules extensively tested before deployment
4. **Extended monitoring:** 30-day monitoring with daily review ensures recurrence detection

#### Resource Requirements:
- Moderate-High: CPT 173 full-time during Phase I (36h intensive), then rotating 12h shifts Phase II
- CPT 174 available for reverse engineering if needed
- MOC 24/7 operation
- **Feasible with available resources**

#### Assessment:
**✅ RECOMMENDED** - Balances speed, thoroughness, and risk management. Achieves commander's intent while maintaining operational effectiveness. Acceptable residual risks mitigated through detection rule deployment and post-remediation monitoring.

---

### COA 3: AGGRESSIVE REBUILD APPROACH

**Concept:** Assume extensive compromise. Rebuild affected systems from scratch rather than attempting forensic remediation. Fast containment but higher operational impact.

**Execution Timeline:**
- **Day 1 (24h):** Forensic collection & initial analysis (limited - focuses on scope)
- **Days 1-3 (48h):** Rebuild decision - If scope suggests extensive compromise, initiate rebuild
- **Days 3-6 (3 days):** Image capture, system rebuild, credential reset
- **Days 6-7 (1 day):** Detection rules deployment and verification
- **Days 7-37 (30 days):** Post-remediation monitoring

**Total Duration:** 7 days for rebuild + 30 days monitoring = **37 days**

#### Strengths:
✅ **Fastest execution** - Remediation complete within 7 days (rebuild faster than forensic cleaning)
✅ **Maximum confidence** - 100% confidence in clean state (rebuilt systems)
✅ **Simple eradication** - No risk of missed persistence (fresh OS)
✅ **Operational purity** - No residual artifacts from compromise

#### Weaknesses:
❌ **High operational disruption** - dc2 and affected systems offline during rebuild (hours to days)
❌ **User impact** - Extended authentication/service outages during rebuild
❌ **Data loss risk** - Potential data loss if backups unavailable or compromised
❌ **BPEnergy resistance** - Aggressive rebuild may exceed customer tolerance
❌ **Cost and effort** - Significant IT effort for rebuild vs. targeted remediation
❌ **Authority risk** - Rebuild requires explicit ARCYBER + BPEnergy CIO approval (not pre-authorized)

#### Key Friction Points:
- **BPEnergy Coordination:** Rebuild of critical systems (especially dc2) requires extensive coordination; customer may resist
- **Maintenance Window:** Rebuild requires longer offline window than forensic remediation; production impact significant
- **Authority Approval:** Aggressive rebuild approach may exceed delegated authority; requires additional approval chain
- **Data Recovery:** If backups themselves compromised, restore data may contain malware

#### Resource Requirements:
- Moderate: Requires BPEnergy IT/OT personnel for rebuild (CPT 173/174 forensics role reduced)
- MOC 24/7 operation
- **Feasible IF customer approves**

#### Assessment:
**ALTERNATIVE IF SCOPE EXPANDS** - If investigation (COA 2) finds extensive lateral movement, OT system compromise, or network-wide credential harvest, rebuild approach becomes more attractive. **Not recommended for initial response** due to operational disruption concerns, but keep as escalation option.

---

## PART III: COA COMPARISON & RECOMMENDATION

### Evaluation Matrix

| Criterion | Weight | COA 1 Score | COA 2 Score | COA 3 Score |
|-----------|--------|------------|------------|------------|
| **Speed** | 30% | 2/10 (40/10) | 9/10 (270/10) | 9/10 (270/10) |
| **Mission Risk** | 25% | 1/10 (25/10) | 8/10 (200/10) | 6/10 (150/10) |
| **Thoroughness** | 20% | 10/10 (200/10) | 8/10 (160/10) | 7/10 (140/10) |
| **Detection** | 15% | 10/10 (150/10) | 8/10 (120/10) | 8/10 (120/10) |
| **Resources** | 10% | 8/10 (80/10) | 9/10 (90/10) | 7/10 (70/10) |
| | | **TOTAL** | **485/100** | **575/100** | **500/100** |

---

### Comparative Analysis

**COA 1 vs COA 2:**
- COA 2 scores 18% higher (575 vs 485)
- COA 1 has better thoroughness but unacceptable mission risk
- COA 2 achieves 95% of COA 1's investigation quality in 35% of the time
- **Recommendation: COA 2 superior**

**COA 2 vs COA 3:**
- COA 2 scores 15% higher (575 vs 500)
- COA 3 slightly faster but higher operational disruption
- COA 2 better for contained incident; COA 3 better for extensive compromise
- **Recommendation: COA 2 primary; escalate to COA 3 if scope expands**

**COA 1 vs COA 3:**
- COA 3 scores 3% higher (500 vs 485)
- Both have significant weaknesses (COA 1: slow; COA 3: disruptive)
- Neither recommended for initial response
- **Recommendation: Avoid both; execute COA 2**

---

## PART IV: RECOMMENDED COA (COA 2) DETAILED BRIEF

### A. Commander's Situation Brief

**BLUF:** Execute COA 2 - Rapid Response with parallel investigation and remediation. Achieve 36-hour investigation, complete remediation within 7 days, deploy detection rules, conduct 30-day monitoring. Balances urgency with operational effectiveness.

**Recommendation:**
- ✅ **APPROVE COA 2**
- Initiate POAM-001 Investigation immediately (Milestones 1-4: 36-hour target)
- Approve Phase I personnel allocation (CPT 173 full-time, CPT 174 available)
- Prepare Phase II (Remediation) execution upon Phase I completion
- Schedule maintenance window coordination with BPEnergy CIO

**Decision Required:**
1. Approve POAM-001 Investigation execution
2. Approve Phase II remediation contingent on Phase I completion
3. Approve maintenance window for dc2 offline time (coordinate BPEnergy)
4. Authorize Phase III 30-day monitoring

---

### B. Execution Summary (COA 2)

**3-Phase Execution:**

**PHASE I: Investigation (36 hours)**
- Forensic collection (12h)
- Malware family ID (12h)
- Lateral movement assessment (12h)
- OUTPUT: Malware classified, scope determined, ready for remediation

**PHASE II: Remediation (6 days)**
- Pre-remediation planning (6h)
- Containment & forensic preservation (12h)
- System cleaning & eradication (36h)
- Credential reset (24h)
- Detection rules deployment (48h)
- OUTPUT: Systems clean, credentials reset, detection rules operational

**PHASE III: Monitoring (30 days)**
- Daily alert review
- Weekly threat hunting
- Monthly rule efficacy assessment
- OUTPUT: Zero recurrence confirmed; operation complete

---

### C. Risk Assessment (COA 2)

**Identified Risks:**

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|-----------|
| Investigation incomplete; persistence remains | Medium | High | Extended 30-day monitoring with daily review |
| Lateral movement missed; attacker re-access | Medium | Critical | Aggressive threat hunting; network monitoring |
| dc2 cleanup fails; malware persists | Low | Critical | Multi-vendor validation scanning |
| Detection rules ineffective | Medium | Medium | Rule testing/validation; threat hunting |
| BPEnergy coordination delays remediation | Low | Medium | Proactive communication; pre-approval coordination |

**Residual Risk:** MEDIUM (acceptable given mitigation strategies)

---

### D. Decision Points & Branches

**Decision Point 1 (2026-02-24 06:00 UTC):**
- **Decision:** Malware family confirmed?
- **If ShadowPad/Winnti/Known:** Proceed to Decision Point 2
- **If Unknown/Custom:** Escalate to ARCYBER; maintain schedule if possible

**Decision Point 2 (2026-02-24 18:00 UTC):**
- **Decision:** Scope of compromise?
- **If Limited (dc2 only):** Proceed to Phase II standard remediation
- **If Moderate (10-50 systems):** Proceed to Phase II expanded remediation
- **If Extensive (100+ systems or OT compromise):** Consider escalating to COA 3 (rebuild approach)

**Decision Point 3 (2026-03-02 18:00 UTC):**
- **Decision:** Phase II remediation successful?
- **If Yes:** Proceed to Phase III (30-day monitoring)
- **If Partial:** Re-remediate identified gaps; extend Phase II
- **If No:** Escalate to ARCYBER for alternative approach

**Branch Triggers:**
- If OT system compromise detected → Escalate to ARCYBER + BPEnergy executive leadership
- If data exfiltration confirmed → Prepare for legal/FBI notification
- If detection rules ineffective in Phase III → Re-develop rules or escalate to external support

---

### E. Staffing & Resource Allocation

| Phase | Duration | CPT 173 | CPT 174 | S-2 | S-3 | MOC |
|-------|----------|---------|---------|-----|-----|-----|
| Phase I | 36h | 100% | 50% | 50% | 25% | 24/7 |
| Phase II | 6d | 100% | 80% | 30% | 50% | 24/7 |
| Phase III | 30d | 20% | 10% | 20% | 10% | 24/7 |

**Total Person-Days:** ~150-200 hours across all teams (feasible with available personnel)

---

## PART V: WARGAME (RED TEAM CHALLENGE)

**Red Team Scenario:** What if APT41 is still actively monitoring and responding to our investigation?

### Red Team Move 1: Attacker Response to Forensic Detection
**Assumption:** APT41 detects forensic activity on dc2

**Red Outcome:**
- APT41 trigger destructive malware on OT systems (escalates from IP theft to disruption)
- Lateral movement to file servers; mass data exfiltration begins
- Attacker installs additional persistence mechanisms on secondary systems

**Blue Counter (Mitigation):**
- Isolate dc2 quickly (within 24 hours of detection) to disrupt attacker C2
- Network-wide monitoring for APT41 lateral movement patterns
- Activate Incident Response Playbooks (Lateral Movement playbook)
- Early escalation to ARCYBER and potential law enforcement notification

**Adjust Timeline?** Yes - If Red Team move occurs, consider COA 3 (rebuild) as escalation option

---

### Red Team Move 2: Persistence Evasion
**Assumption:** APT41 uses multiple redundant persistence mechanisms; our initial remediation misses one

**Red Outcome:**
- Malware re-activates post-remediation
- APT41 re-establishes persistence on clean system
- Attacker resumes data collection

**Blue Counter (Mitigation):**
- 30-day monitoring catches recurrence quickly
- Detection rules designed to catch re-activation
- Expanded threat hunting in Phase III reveals missed persistence
- Phase II includes extensive validation scanning to minimize this risk

**Adjust Timeline?** Yes - If recurrence detected in Phase III, restart Phase II remediation and extend monitoring

---

### Red Team Move 3: Supply Chain Attack on Remediation
**Assumption:** Attacker compromises tools/updates used in remediation process

**Red Outcome:**
- Attacker maintains persistence through remediation tools
- Backdoor installed during system cleaning
- Attacker maintains access invisibly

**Blue Counter (Mitigation):**
- Use verified, legitimate tools from trusted sources only
- Multi-vendor validation scanning (Defender + Malwarebytes + etc.)
- Behavioral analysis in Phase III monitoring catches suspicious activity
- Assumption: BPEnergy IT tools are trusted (validate during pre-planning)

**Adjust Timeline?** No - Mitigated through tool verification and validation scanning

---

## PART VI: RECOMMENDATION & APPROVAL

### Final Recommendation

**APPROVE COURSE OF ACTION 2 - RAPID RESPONSE**

**Justification:**
1. ✅ Achieves commander's intent (36-hour investigation, 7-day remediation)
2. ✅ Balances speed with operational thoroughness
3. ✅ Manages risk to BPEnergy operational continuity
4. ✅ Feasible with available personnel and resources
5. ✅ Provides rapid visible response to CRITICAL finding
6. ✅ Maintains flexibility for escalation (COA 3 branch if needed)

**Approval Authority:** Battalion Commander (LTC Jackson)

**Next Steps Upon Approval:**
1. Execute POAM-001 Investigation (Immediate - 36-hour target)
2. Prepare POAM-002 Remediation procedures (parallel to investigation)
3. Schedule Phase II maintenance window with BPEnergy CIO
4. Establish daily decision brief at 1600 UTC for status updates
5. Brief ARCYBER on COA 2 execution plan

---

## ANNEXES

- POAM-001: lockfile Investigation (4-phase investigation plan)
- POAM-002: lockfile Remediation (6-phase eradication plan)
- Threat_COA_Analysis_APT41: Detailed threat actor analysis
- PIR_RFI_Tracker: Intelligence collection requirements

---

**Classification:** UNCLASSIFIED // FOUO

**COA Analysis Prepared by:** CyberOpsPlanner / CPB Operations

**Date:** 2026-02-23

**READY FOR COMMANDER APPROVAL**
