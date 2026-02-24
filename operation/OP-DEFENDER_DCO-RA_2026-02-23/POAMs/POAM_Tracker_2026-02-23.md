# POAM Tracker - OP-DEFENDER

**Status Matrix for All Plans of Action and Milestones**

---

## TRACKER METADATA

**Operation Name:** OP-DEFENDER (BPEnergy DCO-RA)

**Tracking Period:** 2026-02-23 onwards

**Last Updated:** 2026-02-23 06:30 UTC

**Updated By:** CyberOpsPlanner

**Status:** Active Operation - Initial Findings Phase

**Next Update Due:** 2026-02-23 18:00 UTC (end of first 12-hour cycle)

---

## EXECUTIVE SUMMARY

**Total POAMs:** 2 (Initial findings)
- 🔴 CRITICAL: 2
- 🟠 HIGH: 0
- 🟡 MEDIUM: 0
- 🟢 LOW: 0

**POAM Status Breakdown:**
| Status | Count |
|--------|-------|
| Open | 1 |
| In Progress | 1 |
| At Risk | 0 |
| Complete | 0 |
| Closed | 0 |

**Key Metrics:**
- Critical POAMs: 2/2 (100% - lockfile.ps1 related)
- Overdue POAMs: 0
- At-Risk POAMs: 0
- Closure Rate (target): 7 days post-investigation

---

## ACTIVE POAMS - DETAILED STATUS

### 🔴 POAM-001: lockfile.ps1 Investigation

| Field | Value |
|-------|-------|
| **POAM ID** | OP-DEFENDER-POAM-001 |
| **Title** | Investigate and Analyze Suspicious PowerShell Script (lockfile.ps1) on Host dc2 |
| **Created** | 2026-02-23 |
| **Status** | 🟡 IN PROGRESS |
| **Priority** | 🔴 CRITICAL |
| **Finding** | Suspicious PowerShell script on Domain Controller (dc2) |
| **Affected System** | dc2 (Domain Controller / Authentication Infrastructure) |
| **Threat Actor** | APT41 (State-sponsored PRC) |
| **Owner** | CPT 173 Host Analysis Team |
| **Target Completion** | 2026-02-24 18:00 UTC (36 hours) |
| **Current Milestone** | 🟡 **Milestone 1: Forensic Collection & Static Analysis** (Target: 2026-02-23 18:00 UTC) |
| **Milestone Status** | In Progress - Forensic artifacts being collected |
| **Estimated Time to Complete** | 36 hours |
| **Effort Required** | 36-40 hours (high intensity) |
| **Blockers** | None - All resources operational |
| **Risks** | Evidence contamination, destructive malware, incomplete scope analysis |

**Milestone Timeline:**
- 🟡 **Milestone 1:** Forensic Collection & Static Analysis (Target: 2026-02-23 18:00)
  - Status: In Progress
  - Tasks: Forensic collection, VirusTotal submission, YARA scanning, IOC extraction
  - Output: Preliminary malware identification, IOC list

- ⏳ **Milestone 2:** Malware Family Identification (Target: 2026-02-24 06:00)
  - Status: Awaiting Milestone 1
  - Tasks: Dynamic analysis (Cuckoo), reverse engineering (if needed), malware family confirmation
  - Output: Malware family identified (ShadowPad, Winnti, etc.) or marked as unknown

- ⏳ **Milestone 3:** Scope Assessment & Lateral Movement (Target: 2026-02-24 18:00)
  - Status: Awaiting Milestone 2
  - Tasks: Network log analysis, lateral movement assessment, affected systems identification
  - Output: Scope of compromise documented

- ⏳ **Milestone 4:** Intelligence Analysis & Attribution (Target: 2026-02-24 18:00)
  - Status: Awaiting Milestone 3 (Parallel)
  - Tasks: IOC correlation, MITRE ATT&CK mapping, APT41 attribution assessment
  - Output: Attribution confidence assessment (Confirmed/Likely/Possible/Unlikely)

**Critical Notes:**
- 🔴 **BLOCKING:** POAM-002 remediation cannot begin until this investigation completes
- Investigation must determine: Malware family, affected systems, lateral movement scope, credential compromise extent
- Daily briefing required during active investigation
- ARCYBER escalation if significant lateral movement or credential compromise detected

**Link to POAM:** [POAM-001_lockfile_Investigation.md](POAM-001_lockfile_Investigation.md)

---

### 🔴 POAM-002: lockfile.ps1 Remediation

| Field | Value |
|-------|-------|
| **POAM ID** | OP-DEFENDER-POAM-002 |
| **Title** | Contain, Eradicate, and Remediate lockfile.ps1 Malware Compromise |
| **Created** | 2026-02-23 |
| **Status** | ⏳ OPEN |
| **Priority** | 🔴 CRITICAL |
| **Owner** | S-3 Operations / CPT 173 Host Analysis Team |
| **Target Completion** | 2026-03-02 18:00 UTC (7 days from investigation start) |
| **Current Milestone** | ⏳ **Phase 1: Pre-Remediation Preparation** (Awaiting POAM-001 Completion) |
| **Estimated Time to Complete** | 144+ hours (6 phases over 8 days) |
| **Effort Required** | 150-200 hours (distributed across teams) |
| **Blockers** | ✅ BLOCKED BY: POAM-001 Investigation (must complete before detailed planning) |
| **Risks** | Failed remediation, production disruption, lateral movement missed, detection rules ineffective |

**Remediation Phase Timeline:**
- 🔴 **Phase 1:** Pre-Remediation Preparation (Target: 2026-02-24 18:00)
  - Status: Awaiting POAM-001 Investigation Complete
  - Tasks: Receive findings, develop procedures, obtain approvals, schedule maintenance window
  - Duration: 6 hours after investigation complete
  - Owner: S-3 Operations

- ⏳ **Phase 2:** Containment & Evidence Preservation (Target: 2026-02-25 06:00)
  - Status: Awaiting Phase 1
  - Tasks: Final forensic collection, persistence identification, disable persistence mechanisms
  - Duration: 12 hours
  - Owner: CPT 173 Host Analysis

- ⏳ **Phase 3:** Eradication - System Cleaning (Target: 2026-02-26 18:00)
  - Status: Awaiting Phase 2
  - Tasks: Malware removal, persistence deletion, hardening, validation
  - Duration: 36 hours
  - Owner: CPT 173 + BPEnergy Sysadmin
  - ⚠️ CRITICAL: dc2 offline during this phase (impact to authentication)

- ⏳ **Phase 4:** Credential Management & Lateral Movement Remediation (Target: 2026-02-27 06:00)
  - Status: Awaiting Phase 3
  - Tasks: Credential reset, lateral movement system remediation, user notification
  - Duration: 24 hours
  - Owner: S-3 + BPEnergy Identity/Security

- ⏳ **Phase 5:** Detection Rule Development & Deployment (Target: 2026-02-28 12:00)
  - Status: Awaiting Phase 3 Investigation Results
  - Tasks: Extract behavioral indicators, create EDR/SIEM/network rules, validation, deployment
  - Duration: 48+ hours
  - Owner: S-2 Intelligence + CPT 174 Reverse Engineer
  - Deliverable: 10+ detection rules

- ⏳ **Phase 6:** Post-Remediation Monitoring & Verification (Target: 2026-03-30 12:00)
  - Status: Awaiting Phase 5 Completion
  - Tasks: 30-day monitoring for recurrence, threat hunting, detection rule efficacy assessment
  - Duration: 30 days
  - Owner: S-2 + MOC 24/7 Watch

**Success Criteria:**
- All phases completed in sequence
- Zero malware/persistence recurrence over 30-day monitoring
- All compromised credentials reset and verified
- All detection rules deployed and operational
- BPEnergy operational continuity maintained (< 2 hours total downtime)

**Dependents:**
- ⏳ POAM-003 (Detection Rules) - Refined based on Phase 5 findings

**Link to POAM:** [POAM-002_lockfile_Remediation.md](POAM-002_lockfile_Remediation.md)

---

## POAM SUMMARY BY STATUS

### 🟡 IN PROGRESS (1 POAM)

#### POAM-001: lockfile.ps1 Investigation
- **Status:** 🟡 IN PROGRESS
- **Current Milestone:** Forensic Collection & Static Analysis (ETC: 2026-02-23 18:00)
- **Effort Expended:** 0-4 hours (just started)
- **Estimated Remaining:** 32-36 hours
- **Risk Level:** MEDIUM (on schedule, no blockers)
- **Notes:** All teams operational and focused on timely completion. Milestone 1 target achievable.

---

### ⏳ OPEN (1 POAM)

#### POAM-002: lockfile.ps1 Remediation
- **Status:** ⏳ OPEN
- **Blocked By:** POAM-001 Investigation
- **Estimated Start:** 2026-02-24 18:00 UTC (upon POAM-001 completion)
- **Estimated Completion:** 2026-03-02 18:00 UTC
- **Risk Level:** MEDIUM (timeline dependent on investigation findings)
- **Notes:** Detailed procedures cannot be finalized until investigation complete. Backout plans and stakeholder coordination in Phase 1 will solidify timeline.

---

## CRITICAL ITEMS (Require Commander Attention)

### 🔴 lockfile.ps1 - Domain Controller Compromise

**Criticality:** MAXIMUM

**Status:** Investigation In Progress

**Impact:** If fully compromised, dc2 could give APT41 persistent access to all BPEnergy systems (500+ endpoints, cloud services, OT systems)

**Timeline:** Investigation must complete within 36 hours; remediation within 7 days

**Commander Actions Required:**
1. ✅ Approve investigation priority and resource allocation (APPROVED - operation focus)
2. ✅ Authorize ARCYBER notification of CRITICAL finding (IN PROGRESS)
3. ⏳ Approve DCO-RA response actions upon investigation completion (PENDING findings)
4. ⏳ Approve BPEnergy coordination for maintenance window (PENDING Phase 1)

**Daily Briefing Requirement:** SITREP at 1600 UTC each day

---

## OVERDUE ITEMS

**None currently.** All POAMs on schedule or in initial phase.

---

## UPCOMING MILESTONES (Next 10 Days)

| Date | Milestone | POAM | Target Status | Impact |
|------|-----------|------|----------------|--------|
| 2026-02-23 18:00 | Forensic Collection Complete | POAM-001 | Milestone 1 Complete | Preliminary malware ID ready |
| 2026-02-24 06:00 | Malware Family Identified | POAM-001 | Milestone 2 Complete | Attribution confidence established |
| 2026-02-24 18:00 | Investigation Complete | POAM-001 | CLOSED | Ready for remediation Phase 1 |
| 2026-02-24 18:00 | Remediation Planning Complete | POAM-002 | Phase 1 Complete | Maintenance window scheduled |
| 2026-02-25 06:00 | Evidence Preserved | POAM-002 | Phase 2 Complete | Safe to proceed with cleaning |
| 2026-02-26 18:00 | System Cleaned & Verified | POAM-002 | Phase 3 Complete | dc2 restored to clean baseline |
| 2026-02-27 06:00 | Credentials Reset | POAM-002 | Phase 4 Complete | User re-authentication verified |
| 2026-02-28 12:00 | Detection Rules Deployed | POAM-002 | Phase 5 Complete | Monitoring rules operational |
| 2026-03-30 12:00 | 30-Day Monitoring Complete | POAM-002 | Phase 6 Complete/CLOSED | Zero recurrence verified |

---

## POAM CLOSURE PIPELINE

**POAMs Ready to Close:** NONE

**POAMs In Closure Review:** NONE

**Recently Closed:** NONE

**Forecast Next 7 Days:**
- POAM-001 (Investigation) - Target closure: 2026-02-24 18:00 UTC
- POAM-002 (Remediation) - Target closure: 2026-03-02 18:00 UTC

---

## RESOURCE ALLOCATION & EFFORTS

### Personnel Dedicated to POAMs

| Role | Allocated Effort | POAMs | Notes |
|------|------------------|-------|-------|
| CPT 173 Host Analysis Team | 100% during investigation | POAM-001, POAM-002 | 24/7 during active phases |
| CPT 174 Malware Analyst | 80% | POAM-001, POAM-002 | Detection rule development |
| S-2 Intelligence | 60% | POAM-001, POAM-002 | Analysis, threat intel, rules |
| S-3 Operations | 70% | POAM-002 | Coordination, approval authority |
| MOC Watch (24/7) | 20% ongoing | All operations | Monitoring, escalation |

### Tool Requirements

**Currently Available:**
- ✅ EDR (Microsoft Defender)
- ✅ SIEM (log aggregation)
- ✅ Forensic tools (write blockers, imaging)
- ✅ Analysis lab (Cuckoo Sandbox, Ghidra, IDA Pro)
- ✅ Network detection (Zeek, Suricata)

**Additional Requirements:** None - all tools operational

---

## RISK REGISTER

### Active Risks

**Risk 1: Evidence Contamination During Forensics**
- **Impact:** 🔴 CRITICAL - Loss of forensic evidence could undermine legal proceedings
- **Probability:** LOW - Experienced 17C analysts with procedures
- **Mitigation:** Write-blocking forensic procedures, chain of custody documentation
- **Owner:** CPT 173 Lead

**Risk 2: Destructive Malware in lockfile.ps1**
- **Impact:** 🔴 CRITICAL - Could cause system damage or data loss
- **Probability:** MEDIUM - APT41 known for sophisticated malware
- **Mitigation:** All analysis in isolated lab, static analysis prioritized over dynamic
- **Owner:** CPT 174 Malware Analyst

**Risk 3: Network-Wide Compromise (Lateral Movement)**
- **Impact:** 🔴 CRITICAL - Could expand scope significantly, extend remediation timeline
- **Probability:** MEDIUM - DC compromise typical starting point for lateral movement
- **Mitigation:** Comprehensive threat hunting, network monitoring, credential monitoring
- **Owner:** S-2 Intelligence

**Risk 4: Incomplete Remediation / Persistence Remains**
- **Impact:** 🔴 CRITICAL - Attacker maintains persistent access
- **Probability:** MEDIUM - Complex malware may have multiple persistence mechanisms
- **Mitigation:** Multiple validation scans, 30-day monitoring, detection rules
- **Owner:** CPT 173 Host Analysis

**Risk 5: Production Disruption During dc2 Maintenance**
- **Impact:** 🟠 HIGH - User authentication disruption, potential business impact
- **Probability:** MEDIUM - dc2 offline unavoidable for remediation
- **Mitigation:** Secondary DC or temporary auth infrastructure, low-traffic window, rollback procedures
- **Owner:** S-3 Operations + BPEnergy SysAdmin

---

## ESCALATION PROCEDURES

### Escalation Triggers & Chain

**Escalation Trigger: CRITICAL Finding Confirmed**
- **If:** Investigation (POAM-001) confirms APT41 attribution with high confidence
- **Then:** Escalate immediately to ARCYBER and BPEnergy CIO
- **Who:** MAJ Manbear (Mission OIC)

**Escalation Trigger: Network-Wide Compromise**
- **If:** Lateral movement detected beyond dc2 affecting 10+ systems
- **Then:** Escalate to ARCYBER and request additional resources
- **Who:** LTC Jackson (Battalion Commander)

**Escalation Trigger: Remediation Failure**
- **If:** Post-remediation malware recurrence or persistence detected in POAM-002 Phase 6
- **Then:** Escalate to ARCYBER and decision to rebuild vs. restart remediation
- **Who:** MAJ Manbear + LTC Jackson

**Escalation Trigger: Credential Compromise**
- **If:** Investigation confirms widespread credential harvesting (100+ accounts)
- **Then:** Escalate to BPEnergy CIO for domain-wide credential reset decision
- **Who:** S-3 Operations

---

## METRICS & PERFORMANCE

### POAM Performance Metrics

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| Investigation completion time | 36 hours | In progress (start: 2026-02-23) | 🟡 On Track |
| Remediation phase 1 (planning) | 6 hours | Not started | ⏳ Awaiting Investigation |
| Remediation phases 2-5 execution | 120 hours | Not started | ⏳ Awaiting Phase 1 |
| Detection rules created | 10+ | 0 (pending analysis) | ⏳ Awaiting Phase 5 |
| 30-day post-remediation monitoring | 30 days | Not started | ⏳ Awaiting Phase 5 |
| Critical POAM closure rate (% within SLA) | 100% within 7 days | 0% (just started) | 🟡 On Track |

### Weekly Status Summary

**Week of 2026-02-23:**

**Summary:** Operation DEFENDER activated. Initial lockfile.ps1 finding on dc2 (Domain Controller) identified and escalated to CRITICAL. Investigation (POAM-001) initiated with 36-hour completion target. Two critical POAMs created and tracking initiated.

**Total POAMs:** 2
- Created This Week: 2
- Completed This Week: 0
- At Risk: 0
- Status Change: Both new POAMs in initial phases

**Key Activities:**
- ✅ OP-DEFENDER activated and mission metadata completed
- ✅ Incident report created for lockfile.ps1 finding
- ✅ POAM-001 (Investigation) initiated with forensic collection underway
- ✅ POAM-002 (Remediation) created and awaiting investigation completion
- ✅ MOC operational 24/7 with daily SITREP briefings at 1600 UTC
- 🟡 Daily POAM status tracking initiated

**Next Week (2026-02-24 to 2026-03-02) Forecast:**
- Completion of POAM-001 Investigation (Milestone 1-4) by 2026-02-24 18:00
- Initiation of POAM-002 Remediation (Phase 1-5) beginning 2026-02-24 18:00
- Potential creation of POAM-003 (Detection Rules Refinement) by end of week
- Possible scope expansion if lateral movement detected

---

## DECISION POINTS & COMMANDER'S BRIEF

**POAM-001 Investigation - Decision Point 1 (Target: 2026-02-24 06:00)**
- **Decision Required:** Malware family identified - confirm/update threat assessment
- **Brief:** Malware family = APT41 attribution confidence level
- **Commander Action:** Approve or modify subsequent remediation strategy

**POAM-001 Investigation - Decision Point 2 (Target: 2026-02-24 18:00)**
- **Decision Required:** Scope of compromise - limited to dc2 or network-wide?
- **Brief:** Scope affects remediation timeline and resources
- **Commander Action:** Approve remediation scope and estimated completion timeline

**POAM-002 Remediation - Decision Point 3 (Target: 2026-02-24 18:00)**
- **Decision Required:** Approve maintenance window for dc2 offline period
- **Brief:** Time/duration of dc2 remediation; impact to BPEnergy operations
- **Commander Action:** Coordinate with BPEnergy CIO; authorize maintenance window

**POAM-002 Remediation - Decision Point 4 (Target: 2026-02-27 06:00)**
- **Decision Required:** Credential reset approach - targeted or domain-wide?
- **Brief:** Scope of credential compromise determines reset strategy
- **Commander Action:** Authorize credential reset scope with BPEnergy

---

## REFERENCES & SUPPORTING DOCUMENTATION

**Master POAM Documents:**
- [POAM-001_lockfile_Investigation.md](POAM-001_lockfile_Investigation.md) - Full investigation details
- [POAM-002_lockfile_Remediation.md](POAM-002_lockfile_Remediation.md) - Full remediation plan

**Incident Documentation:**
- [Incident_Report_001_lockfile_ps1_dc2_2026-02-23.md](../Incident_Reports/Incident_Report_001_lockfile_ps1_dc2_2026-02-23.md)

**Operation Documentation:**
- [README.md](../../README.md) - Operation overview
- [OPERATION_METADATA.md](../../OPERATION_METADATA.md) - Mission context
- [OPERATIONS_INDEX.md](../../OPERATIONS_INDEX.md) - Operations index

**External References:**
- OPORD 26-02 (Main Body + Annexes)
- NIST SP 800-30 (Risk Assessment - POAM prioritization methodology)
- MITRE ATT&CK Framework (TTP mapping)
- APT41 Threat Profile (SUPPORTING_DOCS/)

---

## POAM LOG

**See:** [POAM_Log.md](POAM_Log.md) for detailed operational log of POAM status changes and milestone completions

---

**Classification:** UNCLASSIFIED // FOUO

**Tracker Status:** Active Operation - Initial Findings Phase

**Next Update:** 2026-02-23 18:00 UTC (End of Milestone 1 target completion)

**Prepared By:** CyberOpsPlanner / CPB Operations

**Date:** 2026-02-23

---

## QUICK ACCESS

- 🔴 **CRITICAL POAMs:** POAM-001 (Investigation), POAM-002 (Remediation)
- ⏳ **BLOCKED POAMs:** POAM-002 (Blocked by POAM-001 completion)
- 📊 **Detailed Tracking:** See individual POAM documents linked above
- 🔔 **Daily Updates:** Updated at 1600 UTC or upon status change

**Status:** OP-DEFENDER is CRITICAL PRIORITY - lockfile.ps1 on dc2 is network-wide threat. 24/7 operations active. Daily commander briefings required.
