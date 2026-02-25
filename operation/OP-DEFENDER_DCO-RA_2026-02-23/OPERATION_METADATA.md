# Operation Metadata

**Complete Context and Reference Information**

---

## OPERATION IDENTIFICATION

**Operation Code:** OP-DEFENDER
**Operation Name:** OPORD 26-02 - BPEnergy Defensive Cyberspace Operations Response Action
**Nickname/Callsign:** DEFENDER
**Operation Type:** DCO-RA (Defensive Cyberspace Operations - Response Action)

---

## DATES AND TIMELINE

**Start Date:** 2026-02-17 00:00 UTC
**End Date:** TBD (Ongoing)
**Duration:** Ongoing

**Planning Phase:** 2026-02-17 - 2026-02-22 (Deployment & Integration)
**Execution Phase:** 2026-02-23 - TBD (Active Defensive Operations)
**Transition Phase:** TBD (Hardening & Sustainment)

---

## COMMAND STRUCTURE & PERSONNEL

### Command Chain
**Battalion Commander:** LTC Jackson / Battalion Commander / CPB
**Mission OIC:** MAJ Manbear / Mission OIC / CPB

### Operations Team
**CPT 173 Element Lead:** MAJ Lounsbury / CPT 173 Lead / Battalion
**CPT 174 Element Lead:** MAJ Othergal / CPT 174 Lead / Battalion
**S-2 (Intelligence Officer):** [From MOC composition]
**S-3 (Operations Officer / Coordinator):** [From MOC composition]

### MOC (Mission Operations Center) Composition
**OIC:** MAJ Manbear / Mission OIC
**NCOIC:** MSG [Name] / MOC NCOIC
**Battle Captain:** CPT [Name] / MOC Battle Captain
**Watch NCOs:** 24/7 rotation (multiple personnel)
**S-2 Analyst:** [Name] / Threat Intelligence
**S-3 Operations NCO:** [Name] / Operations Coordination
**Communications Tech:** [Name] / Comms Management
**LNO to BPEnergy:** [Name] / BPEnergy Liaison

### Specialist Personnel
**Cyber Operations Planner:** [CPB Staff]
**Host Analyst (17C):** [CPT 173 Team]
**Network Analyst (17C):** [CPT 173 Team]
**Malware Analyst:** [CPT 174 Team]
**Threat Intelligence:** [S-2 MOC]
**Cloud IAM Analyst:** [CPT 174 Team]
**Reverse Engineer:** [CPT 174 Team]

### Supporting Elements
**Legal / JAG:** [ARCYBER / JAG support on ROE and authorities]
**Higher HQ:** ARCYBER (Army Cyber Command)
**Supported Organization:** BPEnergy (Defense Contractor Supporting CI)

---

## MISSION CONTEXT

### Higher Headquarters
**Higher HQ:** ARCYBER (Army Cyber Command)
**Reporting Chain:** CPB Battalion Commander → ARCYBER Operations → USCYBERCOM
**OPORD Reference:** OPORD 26-02 (OPORD 25-01 with FRAGO 01-26 authorities baseline)

### Supported Organization / Customer
**Supported Unit:** BPEnergy Corporate / DoD-Critical Infrastructure Partner
**Geographic Scope:** BPEnergy supports 125,000+ citizens and dozens of Critical Infrastructure (CI) facilities
**Supported Commander:** BPEnergy CIO / Security Leadership

### Mission Statement

Conduct Defensive Cyberspace Operations - Response Action (DCO-RA) to identify, contain, and mitigate malicious cyber activity targeting BPEnergy critical infrastructure and DoD-critical production systems. Objective: Rapidly detect threat actor (APT41) presence, analyze TTPs, eradicate compromised systems, and implement enhanced defensive posture to prevent recurrence. Support restoration of BPEnergy operational capability and DoD mission continuity.

### Mission Objectives

1. **Primary Objective:** Identify and document all APT41 malicious cyber activity within BPEnergy enterprise, cloud, and OT environments by 2026-02-28.

2. **Secondary Objective:** Contain and eradicate confirmed malicious presence within 72 hours of identification per IR playbooks.

3. **Tertiary Objective:** Implement detection rules, network segmentation improvements, and defensive hardening to deny future APT41 attack success.

4. **Essential Task:** Maintain continuity of BPEnergy operations and DoD-critical production throughout response and recovery phases.

### Authorities & Legal Framework

**Authorities:**
- ☑ Title 10 (Armed Forces) - ARCYBER authority
- ☐ Title 32 (National Guard)
- ☑ CCDR Authority (Cyber Command to ARCYBER)
- ☑ ARCYBER Authority (Army Cyber Command OPORD 26-02)
- ☑ USCYBERCOM Authority (Cyber Command oversight)
- ☐ DoD CIO Authority
- ☑ Other: DCO-M authority granted via OPORD 25-01 and FRAGO 01-26; DCO-RA requires explicit ARCYBER approval unless pre-authorized

**ROE/Constraints:**
- Defensive Cyberspace Operations - Monitoring (DCO-M) authority: Authorized for continuous monitoring, threat hunting, and tactical intelligence gathering.
- Defensive Cyberspace Operations - Response Action (DCO-RA) authority: Authorized for containment and eradication actions against confirmed malicious cyber activity. Pre-authorized actions include system isolation, malware removal, credential reset, and network segmentation. Actions requiring explicit ARCYBER approval: Production OT system modifications, credential dumping on production systems, third-party data access.
- PID (Positive Identification) requirements: Confirmed malicious activity, threat actor attribution (APT41), DoD-critical mission impact.
- Authorized Actions: Log analysis, sensor deployment, containment procedures, malware analysis, forensic collection, network segmentation, endpoint isolation, credential management, security update deployment.
- Restricted Actions: No offensive operations, no destructive malware deployment, no production OT modification without explicit approval, no collection of non-mission-related data, no access to personal/financial data outside incident scope.

**Classification Authority:**
ARCYBER (Army Cyber Command) / CPB Battalion Commander authorizes classification level and handling

---

## OPERATIONAL ENVIRONMENT

### Scope & Scale

**Geographic Scope:** BPEnergy corporate network, cloud environments (Azure Government, AWS GovCloud), industrial control system (ICS/OT) enclaves, hybrid cloud deployments

**System/Domain:**
- Enterprise Information Technology (SI-EN)
- Cloud Infrastructure (Gov cloud regions)
- Operational Technology (OT) / Industrial Control Systems (ICS)
- Hybrid cloud environments

**Number of Systems/Endpoints:** 1,000+ corporate endpoints, 50+ cloud instances/services, 100+ OT devices, dozens of CI-critical servers

**Number of Users/Accounts:** 500+ corporate users, 200+ service accounts, 50+ privileged accounts, 100+ cloud IAM identities

**Criticality:** 🔴 CRITICAL - DoD-critical production support; direct support to 125,000+ citizens and CI facilities; failure directly impacts national security mission

### Mission Area Description

**BPEnergy Overview:**
- Defense contractor providing critical energy infrastructure support to DoD and civilian CI
- Operates hybrid environment: on-premises corporate network (SI-EN), cloud services (Azure Gov, AWS GovCloud), OT/ICS enclaves for production control
- Mission-critical systems include manufacturing control, quality assurance, inventory management, and logistics tied to DoD production
- Physical locations across multiple states with centralized IT infrastructure and distributed OT/manufacturing

**Network Architecture:**
- Enterprise network segmented by function: corporate user domain, cloud services, OT/manufacturing enclave, management network
- Cloud tier includes Azure Government services (production, dev/test) and AWS GovCloud (data analytics, backup)
- OT enclave connected via monitored DMZ with restricted ingress/egress
- Multiple trust boundaries and security zones

**Key Systems:**
- Corporate Active Directory (on-premises + Azure AD hybrid)
- Email/Collaboration (Exchange Online / Teams)
- Cloud Production Services (Azure Government App Services, databases)
- OT Control Systems (Siemens, Rockwell, other ICS platforms)
- Manufacturing MES (Manufacturing Execution System)
- EDR/SIEM infrastructure (Defender, logging aggregation)

### Threat Context

**Threat Actor:** APT41 (Winnti Group / Blackfly)

**Threat Capability Level:** State-Sponsored (People's Republic of China - PRC associated)

**Threat Profile:**
- Advanced persistent threat with zero-day exploitation capability
- Sophisticated malware development and supply-chain compromise expertise
- Cross-platform attack capability (Windows, Linux, macOS, cloud)
- Credential theft and long-term persistence specialization
- Operational security discipline with encrypted C2, anti-forensics, and detection evasion
- Targeting pattern: Critical infrastructure, Defense contractors, IP theft focus

**Attack Vector:** Spearphishing with malicious attachments/links, watering hole attacks, exploit of unpatched vulnerabilities, supply-chain compromise, cloud credential theft

**Suspected Objectives:**
- Intellectual property theft (manufacturing processes, designs, proprietary technology)
- Supply chain reconnaissance (targeting DoD contractors to access downstream systems)
- Operational technology reconnaissance (understanding production capability for potential disruption)
- Long-term persistence and data exfiltration

**Known Malware Families (APT41):**
- ShadowPad (modular backdoor)
- Winnti variants (kernel-mode rootkits)
- Crosswalk (communications framework)
- DEADEYE loaders (malware deployment)
- KEYPLUG implants (persistence/credential theft)
- Custom Cobalt Strike beacons
- PowerShell-based reconnaissance tools

---

## OPERATIONAL CONSTRAINTS

### Time Constraints
- Deployment/Integration window: 2026-02-17 to 2026-02-22 (5 days)
- Operational posture: NLT 2026-02-23 all teams operational (24/7)
- Decision timeline: Incident reports required within 1 hour of detection
- Reporting timeline: Daily SITREP 1600 UTC; Weekly Summary Thursday 1600 UTC
- Maintenance windows: TBD with BPEnergy (coordinated in Phase 1)

### Resource Constraints
- Personnel deployed: CPT 173 (host-based forensics team), CPT 174 (cloud/malware team), MOC (8-10 personnel), Battalion HQ staff
- 24/7 operations required (MOC watch rotation, duty officers)
- Tool availability: EDR (Defender), SIEM, Zeek/Suricata, Wireshark, Sysinternals, Velociraptor, OSQuery, Ghidra, REMnux, Cuckoo Sandbox, YARA, Azure/AWS security services

### Authority Constraints
- No offensive cyber operations authorized (DCO-RA defensive only)
- No destructive malware deployment
- No unilateral OT system modifications (must coordinate with BPEnergy OT/CI leadership)
- PID required before lethal response (system shutdown, credential reset on production systems)
- All DCO-RA actions logged with authorization chain documented

### Operational Constraints
- Production system impact: Downtime limited to <1 hour per system unless emergency containment required
- User impact: End users can be disconnected for forensic collection; maintain communication channel
- Third-party notification: BPEnergy CIO/Security leadership notified of all findings within 1 hour; ARCYBER informed on CRITICAL/HIGH priority findings
- Change control: Expedited procedure in effect during active response; all changes logged and documented
- Compliance: Maintain DOJ evidence handling procedures for potential law enforcement coordination

---

## COORDINATION REQUIREMENTS

### Internal Coordination
- **S-1 (Personnel):** Personnel rotation/relief for 24/7 ops; MWR/rest scheduling
- **S-2 (Intelligence):** Daily threat intelligence briefings; PIR/RFI tracking; competitor intelligence for APT41 TTPs
- **S-3 (Operations):** Daily synchronization of IR tasks, milestones, and escalations
- **S-4 (Supply):** Tool/license availability for forensic equipment and cloud API access
- **Legal (JAG):** ROE compliance review; authorities documentation; potential law enforcement notification

### External Coordination
- **BPEnergy CIO:** Mission operations liaison, system access, production constraints
- **BPEnergy OT/Manufacturing:** Manufacturing system safeguards, maintenance windows, production priorities
- **BPEnergy IT Support:** System credentials, network diagrams, change control procedures
- **ARCYBER Operations:** DCO-RA approval authority; escalation authority; strategic direction
- **Law Enforcement (TBD):** FBI/CISA notification if critical infrastructure impact confirmed

### Notification Requirements

**Incident/Activation:**
- ARCYBER (HQ)
- BPEnergy CIO
- BPEnergy Security Leadership
- CPB Battalion Commander

**Daily Status (SITREP):**
- ARCYBER Operations
- BPEnergy CIO
- BPEnergy Security

**Escalations (CRITICAL/HIGH priority findings):**
- ARCYBER Commander
- BPEnergy CIO
- CPB Battalion Commander
- Potential Law Enforcement (FBI/CISA) if CI impact

**Completion:**
- All stakeholders notified of operation completion and final status

---

## CLASSIFICATION & DATA HANDLING

**Overall Operation Classification:** UNCLASSIFIED // FOUO (For Official Use Only)

**Compartmentation (if applicable):** None - standard handling

**Handling Instructions:**
- All findings treated per DOJ evidence handling standards (chain of custody)
- Incident reports to be handled as attorney work product if potential law enforcement
- FOUO data limited to official CPB personnel and BPEnergy authorized recipients

**Document-Specific Classifications:**
- OPERATION_METADATA.md: UNCLASSIFIED // FOUO
- Threat Analysis / APT41 Intelligence: UNCLASSIFIED // FOUO
- Incident Reports: UNCLASSIFIED // FOUO
- Forensic Analysis: UNCLASSIFIED // FOUO (evidence per DOJ procedures)
- POAMs: UNCLASSIFIED // FOUO

---

## SUPPORTING OPERATIONS / RELATED EFFORTS

**Related Operations:**
- OPORD 25-01 (Previous cyber operations baseline)
- FRAGO 01-26 (Fragment Order expanding authorities)

**Dependencies:**
- Baseline network reconnaissance/mapping from pre-deployment Phase 1

**Conflicts/Coordination Points:**
- Coordinate maintenance windows with BPEnergy production schedule
- Coordinate cloud system testing with Azure/AWS account teams
- Coordinate OT system access with manufacturing plant directors

---

## EXPECTED DELIVERABLES / PRODUCTS

**Planning Products:**
- ☑ Cyber Running Estimate
- ☑ COA Analysis & Wargaming
- ☑ Decision Brief (Commander's initial guidance)

**Operational Products:**
- ☑ OPORD (Main + Annexes)
- ☑ Cyber Annex (Operational focus)
- ☑ Task Organization
- ☑ ROE/Constraints Guidance
- ☑ PIR/RFI Tracker

**Execution Products:**
- ☑ Incident Reports (per finding)
- ☑ Analysis Reports (Host/Network)
- ☑ Threat Intelligence Assessments
- ☑ POAM Tracker & Individual POAMs

**Post-Operation Products:**
- ☐ After-Action Report (AAR) - TBD
- ☐ Lessons Learned - TBD
- ☐ Risk Register - TBD
- ☐ Security Posture Assessment - TBD

---

## SUCCESS CRITERIA

**Operation Success Measures:**

1. **Detection Completeness:** All APT41 indicators in all three environments (SI-EN, Cloud, OT) identified and documented within 72 hours of go-live (target: 100% detection coverage baseline established by 2026-02-26).

2. **Containment/Eradication:** All confirmed malicious presence contained and eradicated within 72 hours of identification per IR playbooks (target: 100% of findings contained within SLA).

3. **Detection Improvement:** Detection rules deployed to production for all APT41 TTPs observed during operation (target: 10+ rules deployed within 14 days of operation completion).

4. **Recurrence Prevention:** Zero post-remediation recurrence of same attack patterns within 30-day post-incident monitoring period (target: 100% - no re-compromise).

5. **Business Continuity:** BPEnergy production operations maintained at >95% availability throughout response phase; no unscheduled downtime exceeding 1 hour per system.

---

## ASSUMPTIONS & LIMITATIONS

### Key Assumptions

1. **System Access:** Full cooperation and timely credential access from BPEnergy for all systems in scope (corporate, cloud, OT).

2. **Threat Presence:** APT41 remains present/dormant in BPEnergy environment; threat has not fully exfiltrated or withdrawn.

3. **Personnel Availability:** All CPB personnel required for operation remain available throughout response and recovery phases (no competing missions/reassignments).

4. **Evidence Preservation:** BPEnergy maintains forensic evidence preservation procedures; no log overwrite or evidence destruction during operation.

5. **Baseline Existence:** Sufficient baseline/known-good data exists to identify anomalies across all three environments.

### Known Limitations

1. **OT System Constraints:** Limited ability to perform aggressive forensics on OT systems due to production impact constraints; limited EDR coverage on OT devices (may require manual analysis).

2. **Cloud Audit Trail Gaps:** Limited historical log retention in cloud environments (may limit forensic window to last 30-90 days depending on Azure/AWS retention policies).

3. **Third-Party Dependencies:** Azure Government and AWS GovCloud support latency for escalated security analysis; potential delays in cloud IAM forensics.

4. **Malware Analysis Capability:** Advanced malware analysis (zero-day, custom packers) may require external support from ARCYBER malware lab or external contractors.

5. **OT Knowledge Gap:** Limited internal OT/ICS expertise on custom manufacturing systems; may require external OT consultants for specialized analysis.

6. **Jurisdictional Constraints:** Data held across multiple state/federal boundaries; potential legal constraints on certain forensic techniques requiring JAG coordination.

---

## REFERENCES & SUPPORTING DOCUMENTATION

**Doctrine References:**
- ADP 5-0 (Operations Process)
- FM 3-12 (Cyberspace & EW Operations)
- ATP 2-01.3 (IPB - includes cyberspace terrain appendix)
- JP 3-12 (Joint Cyber Operations)
- FM 3-60 (Targeting)
- NIST SP 800-30 (Risk Assessment)

**OPORD/Annex References:**
- OPORD 26-02 Main Body (Mission, Situation, Execution)
- Annex A (Task Organization)
- Annex B (Intelligence Assessment - APT41 threat model)
- Annex C (Operations - 3-phase concept)
- Annex J (Cyber Technical Procedures)
- Annex K (Incident Response Playbooks)
- Annex L (Authorities & ROE)

**External References:**
- MITRE ATT&CK Framework (APT41 TTPs mapping)
- CISA/FBI Joint APT41 Alert (if applicable)
- BPEnergy Network Architecture Documentation
- BPEnergy IT/OT System Inventory

**Internal CyberPlanner References:**
- CLAUDE.md (Project context)
- docs/doctrine/ (Doctrine library)
- docs/POAMs/ (POAM system)
- skills.yaml (Agent roles)
- ROLES.md (Role switching guide)

---

## FOLDER STRUCTURE

This operation uses the standard CyberPlanner folder structure:

```
operation/OP-DEFENDER_DCO-RA_2026-02-23/
├── README.md (this operation's quick reference)
├── OPERATION_METADATA.md (this file)
├── PLANNING/ (cyber estimates, COA analysis)
│   ├── Cyber_Running_Estimate_2026-02-23.md
│   ├── COA_Analysis_Wargame_2026-02-23.md
│   └── Decision_Brief_2026-02-23.md
├── INTELLIGENCE/ (IPB, threat COA, PIRs)
│   ├── IPB_Cyberspace_Terrain_2026-02-23.md
│   ├── Threat_COA_Analysis_APT41_2026-02-23.md
│   └── PIR_RFI_Tracker_2026-02-23.md
├── OPERATIONS/ (OPORD, annexes, task org)
│   ├── Cyber_Annex_Operational_Focus_2026-02-23.md
│   ├── Task_Organization_Summary_2026-02-23.md
│   └── Authorities_ROE_Implementation_2026-02-23.md
├── EXECUTION/ (incident reports, analysis)
│   ├── Incident_Reports/
│   │   └── Incident_Report_001_lockfile_ps1_dc2_2026-02-23.md
│   ├── Host_Analysis/
│   │   └── (Analysis reports populated during operation)
│   ├── Network_Analysis/
│   │   └── (Analysis reports populated during operation)
│   └── Threat_Intelligence/
│       └── (CTI assessments populated during operation)
├── POAMs/ (remediation tracking)
│   ├── POAM_Tracker_2026-02-23.md
│   ├── POAM-001_lockfile_Investigation.md
│   ├── POAM-002_lockfile_Remediation.md
│   └── POAM_Log.md
├── ASSESSMENT/ (post-op)
│   ├── After_Action_Report.md
│   ├── Lessons_Learned.md
│   └── Risk_Register.md
└── SUPPORTING_DOCS/ (reference materials)
    ├── BPEnergy_Network_Architecture.md
    ├── APT41_Threat_Profile.md
    └── (Evidence collections, system documentation)
```

---

## STATUS TRACKING

**Current Status:** Planning Phase - Deployment & Integration

**Status Last Updated:** 2026-02-25T19:44:46.622Z

**Next Status Update Due:** 2026-02-23 18:00 UTC (daily)

**Key Milestones Completed:**
- Battalion deployment to BPEnergy site - Complete 2026-02-17
- CPT 173 / CPT 174 element integration - Complete 2026-02-22
- System access granted - Complete 2026-02-22
- Initial network reconnaissance - Complete 2026-02-23

**Key Milestones Pending:**
- lockfile.ps1 finding analysis - Target 2026-02-23 12:00 UTC
- Cyber running estimate completion - Target 2026-02-24 12:00 UTC
- Threat hunting phase 1 - Target 2026-02-25 onwards
- Initial incident reports - Ongoing as findings detected

---

## CONTACT INFORMATION

**For Questions About Mission Context:**
Element Lead: MAJ Lounsbury (CPT 173 Lead) / CPB

**For Questions About Operation Execution:**
Team Lead: [CPT 173 / CPT 174 respective leads]

**For Questions About Intelligence:**
S-2: MOC Analyst / Battalion

**For Questions About Operational Planning:**
S-3: CPB Operations Officer

**For ARCYBER Coordination:**
Higher HQ: ARCYBER Operations

---

## REVISION HISTORY

| Date | Updated By | Change |
|------|-----------|--------|
| 2026-02-23 | CyberOpsPlanner | Initial creation from OPORD 26-02 |
| | | |

---

**Classification:** UNCLASSIFIED // FOUO

**Created:** 2026-02-23 06:00 UTC

**Last Updated:** 2026-02-23 06:00 UTC

**File Location:** operation/OP-DEFENDER_DCO-RA_2026-02-23/OPERATION_METADATA.md
