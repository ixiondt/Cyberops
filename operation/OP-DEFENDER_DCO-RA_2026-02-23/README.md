# Operation: DEFENDER - BPEnergy DCO-RA

**Quick Reference and Folder Index**

---

## OPERATION METADATA

**Operation Code:** OP-DEFENDER

**Operation Name:** OPORD 26-02 - BPEnergy Defensive Cyberspace Operations Response Action

**Mission Type:** DCO-RA (Defensive Cyberspace Operations - Response Action)

**Operation Status:** Active - Deployment & Active Operations Phase

**Start Date:** 2026-02-17

**End Date:** TBD (Ongoing)

**Threat Actor:** APT41 (State-sponsored PRC group targeting CI)

**Criticality:** 🔴 CRITICAL (DoD-critical production support)

*For full metadata, see: `OPERATION_METADATA.md`*

---

## KEY PERSONNEL

**Battalion Commander:** LTC Jackson

**Mission OIC:** MAJ Manbear

**CPT 173 Lead (Host Forensics):** MAJ Lounsbury

**CPT 174 Lead (Cloud/Malware):** MAJ Othergal

**MOC NCOIC:** MSG [Name]

---

## MISSION STATEMENT

Conduct Defensive Cyberspace Operations - Response Action (DCO-RA) to identify, contain, and mitigate malicious cyber activity targeting BPEnergy critical infrastructure. Rapidly detect APT41 presence, analyze threat tactics/techniques, eradicate compromised systems, and implement defensive hardening to prevent recurrence while maintaining business continuity for DoD-critical production support.

---

## CURRENT SITUATION

**Area of Interest:**
- BPEnergy Corporate Network (Enterprise IT - SI-EN)
- Cloud Infrastructure (Azure Government, AWS GovCloud)
- Operational Technology / Manufacturing Control Systems
- Hybrid cloud deployments supporting DoD production

**Known Threat Activity:**
- APT41 malicious cyber activity detected in BPEnergy environment
- **FINDING:** lockfile.ps1 detected on host dc2 (Investigation underway - see POAMs below)
- Additional threat hunting in progress

**Operational Posture:**
- 24/7 MOC activated at BPEnergy site
- CPT 173 (host forensics) and CPT 174 (cloud/malware) deployed
- Initial network reconnaissance completed
- Threat hunting phase active as of 2026-02-23

---

## FOLDER STRUCTURE

This operation folder contains:

### PLANNING/
Planning phase products (cyber running estimates, COA analysis, wargaming)
- Cyber_Running_Estimate_2026-02-23.md
- COA_Analysis_Wargame_2026-02-23.md
- Decision_Brief_2026-02-23.md

### INTELLIGENCE/
Intelligence products (IPB, threat analysis, PIRs)
- IPB_Cyberspace_Terrain_2026-02-23.md
- Threat_COA_Analysis_APT41_2026-02-23.md
- PIR_RFI_Tracker_2026-02-23.md

### OPERATIONS/
Operational orders and guidance
- Cyber_Annex_Operational_Focus_2026-02-23.md
- Task_Organization_Summary_2026-02-23.md
- Authorities_ROE_Implementation_2026-02-23.md

### EXECUTION/
Response and incident products organized by type
- **Incident_Reports/** — Incident documentation
  - Incident_Report_001_lockfile_ps1_dc2_2026-02-23.md (ACTIVE INVESTIGATION)
- **Host_Analysis/** — Endpoint analysis findings
- **Network_Analysis/** — Network traffic analysis
- **Threat_Intelligence/** — CTI assessments

### POAMs/
Remediation tracking
- POAM_Tracker_2026-02-23.md
- POAM-001_lockfile_Investigation.md (🔴 CRITICAL - ACTIVE)
- POAM-002_lockfile_Remediation.md (Awaiting Investigation Results)
- POAM_Log.md

### ASSESSMENT/
Post-operation products (TBD upon completion)
- After_Action_Report.md
- Lessons_Learned.md
- Risk_Register.md

### SUPPORTING_DOCS/
Reference materials and artifacts
- BPEnergy_Network_Architecture.md
- APT41_Threat_Profile.md
- Evidence collections and system documentation

---

## CURRENT STATUS

**Operation Status:** Active - Execution Phase Initiated

**Timeline:**
- ✅ Phase I: Deployment & Integration (2026-02-17 to 2026-02-22) - COMPLETE
- 🟡 Phase II: Active Defensive Operations (2026-02-23 onwards) - IN PROGRESS
- ⏳ Phase III: Transition & Hardening (TBD)

**Key Milestones:**
- ✅ Battalion deployment to BPEnergy
- ✅ System access and integration complete
- ✅ MOC operational 24/7
- 🟡 Initial threat hunting in progress
- 🟡 lockfile.ps1 finding investigation (PRIORITY)
- ⏳ Threat hunting phase 1
- ⏳ Detection rules deployment

**Current Activities:**
1. **lockfile.ps1 Analysis** (🔴 CRITICAL PRIORITY)
   - Host dc2 finding under investigation
   - POAM-001 created and tracking
   - Incident report being populated
   - Intelligence analysis underway using APT41 threat context

2. **Threat Hunting**
   - Credential misuse indicators
   - Lateral movement patterns
   - Suspicious PowerShell/Python execution
   - Cloud IAM anomalies
   - OT access anomalies

3. **Daily Operations**
   - 24/7 MOC operations
   - Continuous monitoring and alerting
   - Daily SITREP at 1600 UTC
   - Incident reports within 1 hour of detection

**Blockers/Issues:**
- None currently; all resources operational

---

## CRITICAL FINDINGS SUMMARY

### 🔴 FINDING-001: lockfile.ps1 on host dc2

**Status:** Investigation In Progress

**Discovery:** 2026-02-23 (Time TBD)

**Classification:** 🔴 CRITICAL (Suspected APT41 persistence indicator)

**Immediate Actions:**
1. ✅ Finding documented
2. ✅ POAM-001 created (Investigation)
3. ✅ Incident report initiated
4. 🟡 Intelligence analysis underway (this document set)
5. ⏳ Forensic collection scheduled
6. ⏳ Remediation plan pending analysis results

**Suspected TTPs:**
- T1053 Scheduled Task (Registry modification for persistence)
- T1547 Boot or Logon Autostart Execution (Possible WMI Event Subscription)
- T1059 Command and Scripting Interpreter (PowerShell execution)
- Potential APT41 malware installer or reconnaissance script

**Next Steps:**
1. Complete forensic analysis of lockfile.ps1 (POAM-001, Milestone 1)
2. Determine attack chain and lateral movement scope
3. Identify affected systems and users
4. Create eradication plan and detection rules
5. Execute containment and remediation (POAM-002)

**POAMs Associated:**
- POAM-001: lockfile_Investigation (CRITICAL - In Progress)
- POAM-002: lockfile_Remediation (Awaiting Investigation Results)

*See: POAMs/Incident_Reports/ for detailed incident documentation*

---

## POAM SUMMARY

**Total POAMs:** 2 (Initial findings)

| POAM | Title | Status | Priority | Target Date | Owner |
|------|-------|--------|----------|-------------|-------|
| POAM-001 | lockfile.ps1 Investigation | In Progress | 🔴 CRITICAL | 2026-02-24 | CPT 173 / Host Team |
| POAM-002 | lockfile.ps1 Remediation | Open | 🔴 CRITICAL | 2026-03-02 | CPT 173 / System Admin |

**Open:** 1 | **In Progress:** 1 | **At Risk:** 0 | **Complete:** 0 | **Closed:** 0

**Critical POAMs:** 2 (Both related to lockfile.ps1)

**Overdue POAMs:** 0

*See: POAMs/POAM_Tracker.md for detailed status*

---

## QUICK ACCESS TO KEY PRODUCTS

### Planning Products
- [Cyber_Running_Estimate_2026-02-23.md](PLANNING/Cyber_Running_Estimate_2026-02-23.md)
- [COA_Analysis_Wargame_2026-02-23.md](PLANNING/COA_Analysis_Wargame_2026-02-23.md)

### Intelligence Products
- [IPB_Cyberspace_Terrain_2026-02-23.md](INTELLIGENCE/IPB_Cyberspace_Terrain_2026-02-23.md)
- [Threat_COA_Analysis_APT41_2026-02-23.md](INTELLIGENCE/Threat_COA_Analysis_APT41_2026-02-23.md)
- [PIR_RFI_Tracker_2026-02-23.md](INTELLIGENCE/PIR_RFI_Tracker_2026-02-23.md)

### Operational Orders
- [Cyber_Annex_Operational_Focus_2026-02-23.md](OPERATIONS/Cyber_Annex_Operational_Focus_2026-02-23.md)
- [Task_Organization_Summary_2026-02-23.md](OPERATIONS/Task_Organization_Summary_2026-02-23.md)

### 🔴 CRITICAL: lockfile.ps1 Incident
- [Incident_Report_001_lockfile_ps1_dc2_2026-02-23.md](EXECUTION/Incident_Reports/Incident_Report_001_lockfile_ps1_dc2_2026-02-23.md) (Investigation in progress)
- [POAM-001_lockfile_Investigation.md](POAMs/POAM-001_lockfile_Investigation.md) (CRITICAL)
- [POAM-002_lockfile_Remediation.md](POAMs/POAM-002_lockfile_Remediation.md)

### Remediation Tracking
- [POAM_Tracker_2026-02-23.md](POAMs/POAM_Tracker_2026-02-23.md)
- [POAM_Log.md](POAMs/POAM_Log.md)

---

## FILE NAMING CONVENTION

**Format:** `[Type]_[Topic]_[Date].md`

**Examples:**
- `Cyber_Running_Estimate_2026-02-23.md`
- `Incident_Report_001_lockfile_ps1_dc2_2026-02-23.md`
- `Host_Analysis_dc2_2026-02-23.md`

---

## RELATED DOCUMENTATION

**External References:**
- Doctrine Library: [docs/doctrine/](../../docs/doctrine/)
- POAM System: [docs/POAMs/](../../docs/POAMs/)
- Agent Integration: [docs/POAMs/GUIDANCE/Agent_Integration.md](../../docs/POAMs/GUIDANCE/Agent_Integration.md)
- Master Operations Index: [OPERATIONS_INDEX.md](../OPERATIONS_INDEX.md)

---

## DAILY OPERATIONAL RHYTHM

### Shift Coordination
**MOC Watch:** 24/7 rotation at BPEnergy site
- Watch NCO on duty at all times
- Battle Captain oversight
- S-3 Operations coordination
- S-2 intelligence analyst available

### Daily Reporting
- **SITREP:** Daily at 1600 UTC to ARCYBER and BPEnergy leadership
- **Incident Reports:** Within 1 hour of finding detection
- **Weekly Summary:** Thursday 1600 UTC

### Escalation Triggers
- CRITICAL findings → Immediate notification to MAJ Manbear (Mission OIC), BPEnergy CIO, ARCYBER
- HIGH priority findings → MOC Battle Captain, communicated in daily SITREP
- At-Risk POAMs → Daily MOC coordination and escalation as needed

---

## CONTACT & ESCALATION

**For Questions About This Operation:**
- Element Lead: MAJ Lounsbury (CPT 173 Lead) / CPB
- Mission OIC: MAJ Manbear / CPB

**For lockfile.ps1 Finding (CRITICAL):**
- Host Analysis Lead: [CPT 173 Host Team OIC]
- S-2 Intelligence: [MOC S-2 Analyst]
- Escalation: MAJ Manbear (Mission OIC)

**For Questions About Operation Folder Structure:**
- S-3 Operations: [S-3 Operations Officer]

**For Questions About POAM Status:**
- POAM Coordinator: [S-3 representative]

**For ARCYBER Coordination:**
- Battalion Commander: LTC Jackson

---

## OPERATIONAL AUTHORITY

**Classification:** UNCLASSIFIED // FOUO

**Authorities:** Title 10 / ARCYBER DCO-RA authority per OPORD 26-02

**ROE:** Defensive operations only; all actions per Annex L ROE/Authorities

---

## Key Metrics

| Metric | Target | Status |
|--------|--------|--------|
| Time to Incident Detection | Real-time | ✅ Active (lockfile.ps1 found) |
| Time to Incident Report | 1 hour | 🟡 In Progress |
| Time to Analysis Completion | 24 hours | 🟡 In Progress (Target 2026-02-24) |
| Time to Containment | 72 hours | ⏳ Pending Analysis |
| Detection Rule Deployment | 14 days | ⏳ Pending Full Threat Assessment |
| CRITICAL POAM Closure Rate | 7 days | 🟡 On Track (Target 2026-03-02) |

---

## Quick Navigation

- [Operations Index](../OPERATIONS_INDEX.md) - Master reference for all operations
- [Operation Folder Root](../) - Back to operations folder
- [CyberPlanner Root](../../) - Back to CyberPlanner main

---

**Created:** 2026-02-23 06:00 UTC

**Last Updated:** 2026-02-23 06:30 UTC

**Updated By:** CyberOpsPlanner

**Classification:** UNCLASSIFIED // FOUO

---

## Status: Active - lockfile.ps1 Investigation Priority 🔴
