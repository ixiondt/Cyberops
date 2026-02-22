# OPERATIONS ORDER (OPORD)

**OPORD 27-01**
**Cyber Protection Battalion / ARCYBER**
**CPT 173 Mission Element**

---

## MISSION IDENTIFICATION

| Field | Details |
|-------|---------|
| **Operation Name** | PEARL SENTINEL |
| **Mission Type** | Defensive Cyberspace Operations – Response Actions (DCO-RA) |
| **Area of Operations** | Hawaii (Oahu, Maui, Big Island) |
| **Threat** | APT43 (State-Sponsored Cyber Espionage Group) |
| **Execution Start Date** | 15 MAR 2026 |
| **Classification** | UNCLASSIFIED // FOR OFFICIAL USE ONLY |
| **Distributing Authority** | LTC [Commander Name], Battalion Commander |

---

---

# 1. SITUATION

## 1.1 Operational Environment

### 1.1.1 AO Description

**Primary AO:** Island of Oahu — supporting DoD installations and state-critical infrastructure:
- Pearl Harbor Naval Complex (PHC) — Navy operations, shipyard, intelligence hub
- Hickam Field / Joint Base Pearl Harbor-Hickam — Air operations, logistics
- Schofield Barracks — Army garrison, communications hub
- Critical infrastructure partnerships: Hawaii Electric Company (HECO), State Emergency Management Agency (SEMA)

**Secondary AO:** Maui and Big Island support networks (cloud, logistics, telecommunications)

**Tertiary AO:** Hawaii-mainland interconnects (submarine cables, satellite uplinks, fiber backbone)

### 1.1.2 Cyberspace Terrain (OAKOC)

**Observation:**
- **Major Systems:** DoD networks (SIPRNet, NIPRNet, JWICS air-gapped); state infrastructure (SCADA, power distribution, telecommunications)
- **Cloud Environment:** AWS GovCloud (DoD data), Azure Gov (state/local coordination)
- **Key Terrain:** Submarine cable landing stations, DISA Data Centers, Joint Force Headquarters network core
- **Network Dependencies:** Island connectivity via undersea cable (limited redundancy); heavy reliance on cloud backhaul

**Avenues of Approach:**
- **Likely:** Spearphishing targeting military and contractor personnel; supply-chain compromise via third-party vendors; exploitation of unpatched DoD/contractor systems
- **Dangerous:** Direct targeting of critical infrastructure (power, water, telecommunications); compromise of OT systems supporting naval operations

**Choke Points:**
- Submarine cable landing facilities (single points of failure for inter-island comms)
- Power distribution substations supporting military installations
- DoD security gateways (Joint Regional Security Stack — JRSS)

## 1.2 Enemy / Threat Analysis

### 1.2.1 APT43 Profile

**Classification:** Tier-1 Advanced Persistent Threat (State-Sponsored, Suspected Nation-State Nexus — Persia/Iran-attributed)

**Capabilities:**
- **Infrastructure:** Global proxy network, legitimate hosting providers, compromised third-party infrastructure
- **Malware Suite:** POWERTON, NALEPAY, custom .NET implants; modular C2 frameworks
- **Tradecraft:** Credential harvesting, lateral movement via legitimate tools (WinRM, SMB, SSH); data exfiltration via DNS tunneling and HTTPS proxies
- **Persistence Mechanisms:** Scheduled tasks, registry modifications, WMI event subscriptions, cloud API keys
- **Evasion:** Log tampering, legitimate business tool abuse (Teams, SharePoint, Azure apps), encryption of C2 communications

**Recent Activity (Attribution Confidence: MODERATE-HIGH):**
- December 2025: Targeting of U.S. defense contractors in California; credential theft targeting defense suppliers
- January 2026: Reconnaissance activity against Hawaii government networks and utilities
- February 2026: Unsuccessful spearphishing campaigns targeting HECO employees; indicators of interest in DoD logistical systems

### 1.2.2 Most Likely COA (MLCOA)

**Phase 1 (Initial Access):** Spearphishing contractors/state employees with malicious documents or credential phishing sites; exploit unpatched systems in non-critical networks

**Phase 2 (Persistence):** Establish encrypted C2 beacons; create dormant accounts with legitimate credentials; deploy modular implants to key systems

**Phase 3 (Lateral Movement & Reconnaissance):** Map network architecture; identify critical systems; target cloud IAM and backup administrators; enumerate OT network boundaries

**Phase 4 (Exploitation):** Steal credentials for long-term access; data exfiltration targeting R&D, operational plans, or intelligence; potential disruption of logistics supporting naval operations

### 1.2.3 Most Dangerous COA (MDCOA)

**Destructive Attack on Critical Infrastructure:**
- Compromise OT systems supporting power distribution to military installations
- Deploy destructive malware (wiper) coordinated with cyber disruption
- Disrupt naval logistics and operations during strategic period
- Combined cyber-physical attack on submarine cable infrastructure

**Likelihood:** MODERATE (given recent reconnaissance); **Impact:** CRITICAL

## 1.3 Current Posture

### 1.3.1 Friendly Force Status

**Available Resources:**
- CPT 173 (6 personnel): Team Lead (CPT), Deputy (WO1), Forensics Lead (SSG), Network Lead (SSG), IR Lead (SSG), Reporting NCO (SGT)
- Supporting Battalion Staff (S2, S3, Communications)
- Reachback: 91st Cyber Protection Battalion (XO-level support, malware analysis)
- Interagency Partners: NSA Hawaii Liaison, FBI Cyber Division, CISA Regional Office, DoD-IA Regional Team

**Tool Posture:**
- SIEM (Splunk) — centralized log aggregation and alerting for military networks
- EDR Platform (CrowdStrike) — endpoint detection and response across DoD enterprise
- Network Detection & Response (Zeek, Suricata) — network flow analysis and IDS/IPS
- Vulnerability Management (Qualys, Tenable) — asset inventory and exposure tracking
- Threat Intelligence (MITRE ATT&CK, AIS/STIX feeds) — APT43 indicators and TTP library

**Authority Posture:**
- **DCO-M (Monitor):** Pre-authorized continuous monitoring, detection, analysis, forensics
- **DCO-RA (Response Actions):** Requires explicit ARCYBER approval for isolation, disruption, neutralization actions
- **Rules of Engagement:** Approved in Annex L; no offensive actions; no destruction without commander approval

### 1.3.2 Constraints & Limitations

- **OT Systems:** Passive monitoring only in Phase 1; OT actions require BPEnergy [sic — in Hawaii: HECO/SEMA] and CPT 173 mutual agreement
- **Interagency Coordination:** FBI takes lead on criminal investigations; NSA leads counterintelligence; CPT 173 coordinates with both
- **Data Sensitivity:** No access to foreign intelligence (INTEL COMMUNITY) networks; limited access to classified threat intelligence (requires cleared personnel)
- **Classified Information:** May handle FOUO/CUI; SECRET/TOP SECRET material handled via separate comms channel or NSA liaison

## 1.4 Mission Statement (From Higher HQ)

ARCYBER has directed the Cyber Protection Battalion to deploy CPT 173 to Hawaii NLT 15 MAR 2026 to conduct sustained DCO-M and pre-authorized DCO-RA operations to identify, contain, and mitigate APT43 cyber activity targeting DoD installations, state-critical infrastructure, and DoD-supporting contractors in the Hawaii operational area.

---

---

# 2. MISSION

**CPT 173 deploys to Hawaii NLT 15 MAR 2026 and conducts sustained Defensive Cyberspace Operations – Monitor (DCO-M) with pre-authorized Response Actions (DCO-RA) to identify, contain, and neutralize APT43 presence within DoD and state networks, prevent re-establishment of adversary access, and establish persistent defensive posture supporting long-term Hawaii cybersecurity mission.**

### Key Implications:
- Continuous 24/7 monitoring and threat hunting operations
- Incident response capability with rapid escalation and containment authority
- Intelligence-driven detection focused on APT43 TTPs
- Three-phase operation (Deployment, Active Defense, Transition/Hardening)

---

---

# 3. EXECUTION

## 3.1 Concept of Operations

**Intent:** Establish rapid and persistent detect-respond capability targeting APT43 activity in Hawaii; eliminate confirmed threats; harden network posture against future compromise.

### Phase I: Deployment & Integration (15–20 MAR 2026)

**Purpose:** Stand up operations center, validate access and authorities, establish baseline network understanding.

**Execution:**
1. **Arrival & I-TEM (15–16 MAR)**
   - Personnel deployment and initial coordination with joint task force, HECO, SEMA
   - Establish secure Mission Operations Center (MOC) — physically at Pearl Harbor Naval Complex, Secure Facility [TBD]
   - Validate secure communications (VPN, government-approved collaboration tools)
   - Coordinate with NSA Hawaii liaison and FBI Cyber for information sharing agreements

2. **MOC Activation & Tool Deployment (17–18 MAR)**
   - Stand up 24/7 operations with initial staffing (OIC, NCOIC, rotating analysts)
   - Deploy CPT 173 sensors and gain read access to SIEM, EDR, network detection systems
   - Validate data flow from all monitored networks (DoD enterprise, HECO, SEMA)
   - Baseline network mapping and asset inventory

3. **Authorities & Playbook Validation (18–20 MAR)**
   - Receive written confirmation of DCO-RA approval matrix from ARCYBER
   - Brief incident response playbooks with military and civilian stakeholders
   - Conduct tabletop exercise (credential compromise, malware detection, OT threat scenarios)
   - Initial APT43 TTP briefing to security operations staff

**End State — Phase I:** MOC fully operational with 24/7 watch, all systems operational, team trained on APT43 and local network architecture, initial assessment delivered to higher HQ.

### Phase II: Active Defensive Operations (21 MAR – TBD [Commander's Decision])

**Purpose:** Continuous monitoring, intelligence-driven threat hunting, rapid incident response.

**Execution:**
1. **Daily Threat Hunting (Continuous)**
   - Execute 5–8 targeted hunts per day based on APT43 TTPs and PIRs
   - Focus areas: credential anomalies, lateral movement indicators, C2 beacons, data exfiltration patterns
   - Cross-correlation of SIEM alerts with EDR telemetry and threat intelligence
   - Automated playbooks for rapid triage; human analysis for confirmation

2. **Incident Response & DCO-RA Execution (Upon Confirmation)**
   - Real-time alert correlation and incident triage (target: 15-minute confirmation)
   - Containment actions (credential disablement, host isolation, C2 takedown coordination)
   - Memory imaging, log collection, malware analysis for attribution
   - Eradication and recovery with post-incident monitoring
   - Incident reporting to ARCYBER, BPEnergy [HECO/SEMA], FBI, NSA

3. **Synchronization & Reporting (Scheduled)**
   - Daily SITREP to ARCYBER and Hawaii Task Force (1600Z)
   - Tactical update to NSA, FBI, CISA on incident status and threat trends
   - Weekly intelligence summary and lessons learned
   - Escalation procedures for OT threats or strategic-level indicators

**End State — Phase II:** APT43 presence identified and removed/contained; sustained detection posture with <2% false positive rate; daily situational awareness maintained; all incidents responded to within SLA

### Phase III: Transition & Hardening (TBD – Commander's Decision)

**Purpose:** Consolidate gains, transfer capability, establish sustainable posture.

**Execution:**
1. **Final Assessment (Comprehensive)**
   - Summary of all detected APT43 activity, attribution, persistence mechanisms
   - Hardening recommendations for networks and cloud environments
   - Long-term detection rule package and monitoring strategy

2. **Knowledge Transfer & Training**
   - Train Hawaii military and civilian cybersecurity staff on APT43 TTPs
   - Handoff detection rules, playbooks, and SOPs
   - Establish sustainable 24/7 watch capability (military staff or contracted SOC)

3. **System Validation & Transition**
   - Validate security control implementation and effectiveness
   - Confirm no residual APT43 indicators or persistence mechanisms
   - Formal transition of operations to Hawaii-based command authority

**End State — Phase III:** Hawaii cybersecurity posture hardened; sustainable monitoring and IR capability in place; CPT 173 transitions out with documented handoff; zero confirmed APT43 presence

---

## 3.2 Task Organization & Responsibilities

### CPT 173 Task Organization

| Role | Rank/Title | Responsibilities |
|------|-----------|------------------|
| **Team Lead** | CPT [Name] | Overall mission command, ARCYBER coordination, strategic decisions, stakeholder engagement |
| **Deputy Team Lead** | WO1/CW2 [Name] | Backup command, forensics oversight, complex analysis support, training |
| **Forensics & Host Analysis Lead** | SSG/SFC [Name] | Memory imaging, artifact analysis, post-exploitation indicator development, malware deep-dive |
| **Network Analysis & Hunting Lead** | SSG/SFC [Name] | Network behavior analysis, beaconing detection, lateral movement tracking, hunting hypothesis development |
| **Incident Response Lead** | SSG/SFC [Name] | Incident response coordination, containment playbook execution, DCO-RA request validation, escalation |
| **Reporting & Operations NCO** | SGT [Name] | Daily SITREP, hunt log maintenance, case tracking, scheduling, communications with MOC watch |

### Supporting Elements

| Element | Role | Responsibility |
|---------|------|-----------------|
| **Battalion S2** | Intelligence Officer | Daily threat intelligence update (INTSUM), threat actor profile refinement, PIR collection focus |
| **Battalion S3** | Operations Officer | Synchronization with BPEnergy [HECO/SEMA], logistics support, higher HQ coordination |
| **Reachback: 91st CPB** | XO / Senior Analyst | Malware analysis surge support, reverse engineering, advanced forensics, research |
| **NSA Hawaii Liaison** | SIGINT Officer | Classified threat intelligence sharing, collection coordination, strategic guidance |
| **FBI Cyber** | Special Agent | Criminal investigation coordination, law enforcement liaison, evidence handling |
| **CISA Regional** | Incident Coordinator | Critical infrastructure defense coordination, vulnerability notification, sector-wide alerts |

---

## 3.3 Synchronization Matrix

### Key Synchronization Points

| Time | Event | Purpose | Owner | Attendees |
|------|-------|---------|-------|-----------|
| **0800Z Daily** | MOC Accountability & Threat Brief | Team standup, briefing on overnight activity, daily hunt priorities | NCOIC | All CPT 173 staff |
| **1200Z Daily** | Mid-Day Tactical Update | Sharing of any incidents detected, hunt status, resource needs | IR Lead | CPT 173 leads + S3 |
| **1600Z Daily** | Daily SITREP to ARCYBER & HECO/SEMA | Progress vs PIRs, incident summary, risk assessment, next 24 hours | CPT TL | LTC Commander, ARCYBER S2, HECO CSO, SEMA Director |
| **Wed 1000Z** | NSA/FBI Coordination Call | Classified threat update, interagency coordination, evidence handling | CPT TL | NSA Liaison, FBI Special Agent |
| **Fri 1600Z** | Weekly Summary Brief | Consolidated findings, TTP analysis, hardening recommendations | CPT TL + S2 | Battalion CDR, Battalion S2, Interagency partners |
| **Upon Incident** | Incident Triage (Within 15 min) | Alert correlation, preliminary analysis, containment recommendation | IR Lead + Network Lead | MOC watch, appropriate leads |
| **Upon Confirmation** | DCO-RA Request | Formal escalation for containment/disruption actions | CPT TL | ARCYBER S3 (approval within 2 hours) |
| **OT Threat** | Critical Escalation | Executive notification of OT-related activity | CPT TL | Battalion CDR, HECO/SEMA Leadership, ARCYBER CDR |

---

## 3.4 Rules of Engagement & Authority Constraints

**See Annex L (Rules of Engagement & Legal Authority) for complete authorization details.**

**Summary of Authorities:**
- **Title 10, U.S. Code:** Defense of DoD systems and support to state-local-tribal territories
- **ARCYBER FRAGO** (ref. original taskorder): Authorizes DCO-M (unlimited) and DCO-RA (pre-authorized for standard playbooks)
- **USCYBERCOM TASKORD 27-01:** Establishes reporting requirements and authority ceiling

**Pre-Authorized DCO-RA Actions:**
- Credential disablement (coordinated with network owner)
- Host isolation (after confirmation of malicious activity)
- Malware removal and persistence mechanism elimination
- C2 communication disruption (coordination with DoD-IA and NSA)
- Log analysis and forensic preservation

**Prohibited Actions:**
- No offensive cyberspace operations (attacks against APT43 infrastructure outside US defense posture)
- No production system changes without explicit written approval
- No OT actions without HECO/SEMA mutual agreement
- No access to non-mission-related data
- No sharing of collected intelligence with unauthorized recipients

**Escalation Authorities:**
- **Standard incident:** IR Lead → CPT TL → Battalion S3 (notification within 1 hour)
- **DCO-RA approval:** CPT TL → ARCYBER S3 (approval within 2 hours for pre-authorized actions)
- **Critical event (OT threat, strategic intelligence):** CPT TL → Battalion CDR → ARCYBER CDR (immediate notification)

---

---

# 4. SUPPORT

## 4.1 Logistics & Sustainment

### Personnel & Equipment Deployment

**Personnel Lift:** 6 x CPT 173 personnel + 2 x Battalion support staff (S3, Communications)
**Equipment Package:**
- Forensic kit: imaging hardware, analysis workstations, network isolation setup
- Monitoring sensors: network TAP, packet capture devices, EDR deployment kits
- Communications: encrypted mobile devices, VPN hardware, satellite backup
- Living Support: Lodging (military quarters at Joint Base Pearl Harbor-Hickam), meals, ground transportation

**Deployment Timeline:** Personnel arrive 15 MAR 2026; equipment prepositioning begins 10 MAR; MOC operational by 17 MAR

### Logistics Support

| Need | Provider | Status |
|------|----------|--------|
| MOC Facility (secure space, power, HVAC) | Joint Task Force Hawaii | **Confirmed** — Secure Facility [Building TBD] |
| Network connectivity (NIPR, government collaboration) | DISA Regional / Joint Base | **Confirmed** — VPN and direct LAN access |
| Classified comms (if required for SECRET material) | NSA Hawaii Liaison | **Confirmed** — SCIF access via liaison |
| Backup power (MOC operations continuity) | JTF Hawaii Facilities | **Pending** — Uninterruptible power supply + generator |
| Transportation | Joint Base Motor Pool | **Confirmed** — Vehicle allocation for team movement |

### Supply & Resupply

- **Consumables:** Forensic media, cable/adapters, office supplies (monthly resupply via Battalion)
- **Spare Equipment:** Extra hard drives, network devices, analysis workstations (maintained by Battalion S4)
- **Funding:** CPT 173 operation funded via ARCYBER Operations & Maintenance budget (FY2026 allocation)

---

## 4.2 Medical & Casualty Evacuation

Standard Army medical support via Joint Base Pearl Harbor-Hickam medical facilities.
**MEDEVAC:** Not anticipated for cyber operations (primarily office-based work); standard sick/injured personnel procedures apply.

---

## 4.3 Prisoner of War / Detainee Operations

**Not applicable.** Cyber operations do not involve prisoner capture or detainee handling.

---

## 4.4 Financial & Admin

- **Lodging & Per Diem:** Military housing; meal support via Joint Base dining facilities
- **Travel:** DMDC funded; commercial air (Honolulu International) or military airlift as available
- **Equipment Purchases:** Expedited procurement via ARCYBER supply chain for any in-mission equipment needs
- **Classified Material Handling:** Compliance with DoD 5220.22-M and NSA guidelines; destruction of working material per secure media destruction procedures

---

---

# 5. COMMAND & SIGNAL

## 5.1 Chain of Command

```
USCYBERCOM
    ↓
ARCYBER (U.S. Army Cyber)
    ↓
LTC [Battalion Commander]
    ↓
CPT [CPT 173 Team Lead] ← OPERATIONAL CONTROL
    ↓
CPT 173 Personnel (6 staff)
    ↓
Supporting: Battalion S2, S3, Communications
    ↓
Interagency: NSA Liaison, FBI, CISA, DoD-IA
```

**Tactical Control (TACON):** CPT 173 reports operationally to Battalion Commander; coordinates daily with Joint Task Force Hawaii commander and HECO/SEMA leadership.

---

## 5.2 PACE Plan (Communications)

| Tier | Primary Comms | Trigger | Owner |
|------|---------------|---------|-------|
| **P** | Government secure VPN (NIPR) to ARCYBER | Standard daily operations | MOC Watch |
| **A** | HECO/SEMA secure collaboration (DoD-approved tools: Teams, SharePoint) | NIPR degradation or ARCYBER comms outage | CPT TL |
| **C** | Encrypted mobile devices (DoD-supplied) with pre-positioned data | All primary/alternate comms failed | All staff |
| **E** | Voice-only via pre-established phone numbers (classified via secure phone) | Complete comms blackout | CPT TL + Battalion CDR |

**Escalation Protocol:** Failure in tier → switch to next tier; notify higher HQ immediately of comms failure and reason.

---

## 5.3 Reports & Information Requirements

### Priority Intelligence Requirements (PIRs)

| PIR | Question | Collection Focus | Why It Matters |
|-----|----------|------------------|-----------------|
| **PIR 1** | Has APT43 established persistence in DoD or HECO/SEMA networks? | SIEM login anomalies, EDR persistence indicators, cloud IAM audit logs | Determines if active threat is present and sustained |
| **PIR 2** | What TTPs is APT43 currently employing against Hawaii targets? | Malware samples, command/control patterns, exploitation methods | Informs detection rules and threat hunting focus |
| **PIR 3** | Is APT43 attempting to access or conduct reconnaissance on OT systems? | Network traffic to OT boundaries, SCADA polling, engineering workstation access | Critical for OT protection prioritization |
| **PIR 4** | What indicators reveal imminent exfiltration or destructive activity? | Large data transfers, lateral movement acceleration, malware staging | Enables predictive response and escalation |

### Reporting Requirements

| Report Type | Frequency | Format | Recipient | Deadline |
|------------|-----------|--------|-----------|----------|
| **Daily SITREP** | 1600Z daily | Written (narrative + metrics) | ARCYBER S2/S3, HECO/SEMA | 1600Z same day |
| **Incident Report** | Upon confirmation | Email + case details | ARCYBER, FBI, NSA, CISA | Within 1 hour of confirmation |
| **Weekly Summary** | Fri 1600Z | Briefing + written summary | Battalion CDR, interagency partners | Weekly Friday |
| **Forensic Report** | Per malware incident | Technical analysis document | Battalion S2, NSA, FBI | Within 24 hours |
| **Hunt Log** | Real-time + daily summary | Database + summary sheet | Battalion S2, MOC internal | Daily at 0800Z + real-time update |

---

## 5.4 Coordinating Instructions

1. **Incident Confirmation Threshold:** Two independent detection sources (e.g., EDR alert + SIEM log) or one source + forensic artifact confirmation before declaring "confirmed malicious activity"

2. **Escalation Authority:** Incident IR Lead recommends containment; CPT TL authorizes execution for pre-authorized DCO-RA actions; ARCYBER approval required for novel or expanded actions

3. **Interagency Coordination:** FBI takes lead on criminal investigations; NSA leads counterintelligence investigations; CPT 173 coordinates with both and shares forensic findings within 24 hours

4. **OT Operations:** No automated OT response actions; all OT containment requires manual coordination with HECO/SEMA and CPT 173 mutual agreement

5. **Media Release:** No public statements regarding APT43 activity, incidents, or intelligence findings without ARCYBER public affairs office approval

---

## DISTRIBUTION

- HQ ARCYBER (S2, S3, Commander's Office)
- Battalion Headquarters (All Staff)
- CPT 173 Team
- NSA Hawaii Liaison
- FBI Cyber Division (Honolulu Office)
- CISA Regional (Honolulu)
- DoD-IA Regional Team (Hawaii)
- Joint Task Force Hawaii (Commander, S2, S3)

---

---

## ANNEXES (ATTACHED)

- **[Annex A: Task Organization & Personnel](OPORD_27-01_ANNEX_A_TaskOrganization.md)**
- **[Annex B: Intelligence Assessment](OPORD_27-01_ANNEX_B_Intelligence.md)**
- **[Annex C: Operations & Synchronization](OPORD_27-01_ANNEX_C_Operations.md)**
- **[Annex J: Cyber Technical Procedures](OPORD_27-01_ANNEX_J_CyberTechnicalProcedures.md)**
- **[Annex K: Incident Response Playbooks](OPORD_27-01_ANNEX_K_IncidentResponsePlaybooks.md)**
- **[Annex L: Rules of Engagement & Legal Authority](OPORD_27-01_ANNEX_L_ROE.md)**

---

**AUTHENTICATING OFFICER:**

LTC [Battalion Commander Name]
Commanding Officer
Cyber Protection Battalion
U.S. Army Cyber

**SIGNATURE:** ___________________________
**DATE/TIME:** _________________________ Z

