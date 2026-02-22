# ANNEX B: INTELLIGENCE ASSESSMENT

**OPORD 27-01 | PEARL SENTINEL**
**CPT 173 DCO-RA Hawaii**

---

## B.1 Threat Narrative: APT43

### B.1.1 Threat Actor Profile

**Name:** APT43 (AKA: Tortoiseshell, RedAlpha, PersianPhantom)

**Attribution:** Suspected Iranian-nexus threat actor group; MODERATE-HIGH confidence based on:
- TTP alignment with known Iranian cyber doctrine
- Targeting priorities consistent with Persian Gulf strategic interests
- Malware infrastructure hosted in Iranian-adjacent hosting providers
- Timing correlation with geopolitical events

**Operational Status:** **ACTIVE** — January-February 2026 activity against Hawaiian targets

**Strategic Intent:** Espionage and strategic intelligence collection; targeting U.S. defense infrastructure, advanced manufacturing, and DoD-supporting contractors

---

### B.1.2 Capability Assessment

**Technical Sophistication:** ADVANCED (Tier-1)
- Zero-day and advanced exploitation capabilities
- Multi-stage malware with modular architecture
- Lateral movement sophistication (living-off-the-land techniques)
- Evasion and anti-forensics capabilities
- Cloud platform exploitation (IAM, cloud storage, backups)

**Operational Sophistication:** ADVANCED
- Patient, multi-month reconnaissance campaigns
- Staged approach to persistence and data collection
- Effective credential harvesting and supply-chain targeting
- Ability to maintain persistent access without detection for 3-6+ months

**Malware Suite (Known):**
| Malware | Type | Function | Evasion |
|---------|------|----------|---------|
| POWERTON | .NET C2 Framework | Command & Control, data exfiltration | Living-off-the-land, encrypted C2, DLL side-loading |
| NALEPAY | Credential Harvester | Steal credentials from browsers, email, VPN | Memory-only execution, credential theft from process memory |
| FILESTEALER | Modular Exfiltrator | Data collection and ex filtration via HTTP/DNS | Chunked transfers, encryption, proxy-aware |
| WMI-EXE | Persistence Mechanism | Scheduled execution via WMI | System-level execution, difficult to detect/remove |
| CLOUDSTEALER | Cloud API Exploiter | Extract cloud API keys, service principals, backup credentials | IAM manipulation, token theft from cloud logs |

**Tradecraft Characteristics:**
- **Initial Access:** Spearphishing (targeted attachments, credential phishing sites), supply-chain compromise, vulnerability exploitation
- **Persistence:** Scheduled tasks, registry modifications, WMI event subscriptions, cloud IAM keys
- **Privilege Escalation:** Token theft (Kerberoasting), credential stuffing, UAC bypass
- **Lateral Movement:** SMB, RDP, WinRM, SSH with stolen credentials; legitimate tool usage (PsExec, WMI)
- **Data Exfiltration:** HTTPS proxies, DNS tunneling, cloud-native exfil (OneDrive, SharePoint)
- **Defense Evasion:** Log tampering, tools deletion, encrypted C2, proxy rotation, VPN/Tor usage

---

### B.1.3 Infrastructure & C2

**C2 Infrastructure (Known):**
- **Primary C2 Domains:** [REDACTED for unclassified distribution] — multiple domains rotated monthly
- **Hosting Providers:** Mix of legitimate providers (AWS, Linode, DigitalOcean) with compromised accounts
- **Backup C2:** Domain generation algorithm (DGA) for C2 recovery; fast-flux DNS
- **Proxy Network:** SOCKS5 proxies in Russia, Iran, UAE; residential proxies in U.S.

**Collection Capability:**
- Global proxy network enabling source spoofing and traffic obfuscation
- Ability to operate persistently across detected compromise or takedown
- Redundant infrastructure supporting 3-6 month uninterrupted operations

---

## B.2 Operational Environment (OE) Analysis

### B.2.1 Cyberspace Terrain (OAKOC)

**OBSERVATION (Assets & Systems):**

**DoD Networks:**
- **SIPRNet:** Classified network (SECRET level); air-gapped from NIPR; handles classified intel
- **NIPRNet:** Unclassified network; heavily used at Pearl Harbor, Hickam, Schofield
- **JWICS:** Classified network (TOP SECRET level); limited to intelligence personnel
- **DISA Regional Data Center:** Hosts critical DoD services for Hawaii (email, collaboration, cloud)

**State/Critical Infrastructure:**
- **HECO (Hawaii Electric Company):** Primary power provider; SCADA systems, control networks, business IT
- **SEMA (Hawaii Emergency Management):** Coordination network for disaster response; connects to HECO, police, fire
- **Telecommunications:** Major provider (Hawaiian Telcom); submarine cable landing station at Honolulu
- **Hospitals & Health Networks:** Connected to HECO for power monitoring; limited direct cyber targeting risk

**Cloud Infrastructure:**
- **AWS GovCloud:** DoD-authorized; hosts classified and unclassified DoD data
- **Azure Government:** DoD-authorized; collaboration tools, email backup, cloud storage
- **Hybrid Cloud:** HECO uses cloud for backups; limited cloud-native applications

---

**AVENUES OF APPROACH (Attack Paths):**

**High-Likelihood Vectors:**
1. **Spearphishing:** Targeting military, contractor, and HECO employees with malicious documents or credential phishing (probability: MODERATE-HIGH)
2. **Supply-Chain Compromise:** Third-party contractor access to DoD/HECO networks (probability: MODERATE)
3. **Vulnerability Exploitation:** Unpatched DoD/HECO systems (probability: MODERATE)
4. **Credential Harvesting:** Initial foothold via stolen credentials (probability: HIGH)

**Dangerous Vectors:**
1. **OT Network Targeting:** Compromise of SCADA/control systems supporting power distribution (probability: LOW-MODERATE; impact: CRITICAL)
2. **Cloud IAM Exploitation:** Compromise of cloud tenant, backup admin, or service principal accounts (probability: MODERATE)
3. **Submarine Cable Targeting:** Physical/cyber targeting of telecommunications infrastructure (probability: LOW; impact: CRITICAL)

---

**CHOKE POINTS (Key Terrain):**

| Choke Point | Significance | Vulnerability |
|------------|-------------|-----------------|
| **Submarine Cable Landing** (Honolulu) | Single point of failure for inter-island and trans-Pacific comms | Limited redundancy; ~70% of Hawaii-mainland traffic |
| **DISA Regional Data Center** | Central hub for DoD services in Hawaii | Compromise would affect all DoD networks in region |
| **HECO Control Center** (Honolulu) | Hub for power distribution commands and monitoring | Limited air-gapping; business IT mixed with OT |
| **Joint Base Pearl Harbor-Hickam** | Centralized command and communications | High-value strategic target; moderate cyber defenses |
| **Cloud IAM (AWS/Azure)** | Central authentication for cloud-hosted data | Credential compromise affects all cloud resources |

---

### B.2.2 Environmental Effects (METT-TC Analysis)

| Factor | Status | Impact on Operations |
|--------|--------|----------------------|
| **Mission** | DCO-RA vs APT43 in Hawaii AO | Requires rapid response capability and deep network visibility |
| **Enemy** | APT43 (ACTIVE, TBD presence confirmation) | High threat; patient adversary; defense-in-depth required |
| **Terrain** | Island geography with limited network redundancy | Submarine cable vulnerability; limited alternate comms |
| **Troops** | CPT 173 (6 personnel); limited MOC capacity | Sufficient for baseline operations; surge support available |
| **Time** | Deployment NLT 15 MAR; operation TBD | Limited time to baseline before active threat hunting |
| **Civil Consideration** | HECO/SEMA civilian infrastructure; Hawaii state government | Requires civilian coordination; limited operational freedom on OT systems |

---

## B.3 Threat COA Analysis

### B.3.1 Most Likely COA (MLCOA)

**Title:** Credential Harvesting & Persistent Access Establishment

**Phases:**

**Phase 1: Reconnaissance (Weeks 1-2)**
- Open-source intelligence gathering (LinkedIn, OSINT, Dark Web scraping)
- Identify target personnel: DoD IT staff, contractors, HECO security team members
- Establish target list: Initial Access Objective (IAO) = 10-20 high-value targets

**Phase 2: Initial Access (Weeks 3-4)**
- Deploy targeted spearphishing campaign with malicious attachments (Office macro, PDF exploit)
- Alternative: Credential phishing via lookalike login portal (Teams, GitHub)
- Expected success rate: 5-10% (1-2 compromises per 20 targets)

**Phase 3: Persistence & Escalation (Weeks 5-8)**
- Deploy credential harvester (NALEPAY or similar) to harvested workstations
- Steal credentials for: domain accounts, email, VPN, cloud services
- Perform privilege escalation (Kerberoasting, token theft, UAC bypass)
- Establish lateral movement foothold in key networks (HECO, contractor segment)

**Phase 4: Lateral Movement & Reconnaissance (Weeks 9-12)**
- Map network architecture: domain structure, cloud IAM, backup systems
- Identify high-value targets: R&D systems, manufacturing plans, DoD production support
- Stage malware on key systems; establish secondary C2 channels

**Phase 5: Exfiltration (Weeks 13+)**
- Begin targeted data collection from identified systems
- Establish long-term persistence via dormant accounts, IAM keys, scheduled tasks
- Maintain 3-6 month presence without disruption

---

**Key Indicators of MLCOA Execution:**
| Indicator | Collection | Rationale |
|-----------|-----------|-----------|
| Spearphishing emails to DoD/HECO targets | Email gateway logs, user reports | Marks Phase 2 initiation |
| Successful credential compromise | Failed login attempts, credential spray activity | Indicates Phase 2 success |
| Credential harvester execution | EDR alerts (process creation, memory injection), memory dumps | Marks Phase 3 persistence |
| Lateral movement via RDP/WinRM | Network flow analysis, EDR execution logs, SIEM correlation | Indicates Phase 4 initiation |
| Large data transfers to external IP | NetFlow analysis, proxy logs, DLP alerts | Marks Phase 5 exfiltration start |

---

**Likelihood Assessment:** MODERATE-HIGH (65-75% confidence)
- APT43 has used this playbook against similar targets in past operations
- Spearphishing is lowest-risk, highest-reward initial access vector
- Pattern aligns with January-February 2026 reconnaissance activity observed

---

### B.3.2 Most Dangerous COA (MDCOA)

**Title:** OT Network Compromise with Destructive Malware Deployment

**Strategic Objective:** Disrupt U.S. power generation and naval operations during strategic period (naval presence change, geopolitical crisis)

**Phases:**

**Phase 1: OT Reconnaissance (Weeks 1-4)**
- Establish foothold in HECO business IT via credential compromise
- Map network connections between business IT and OT networks
- Identify engineering workstations, control networks, SCADA hosts
- Gather HECO network documentation and topology

**Phase 2: OT Access (Weeks 5-8)**
- Lateral movement from business IT to OT network (via unpatched firewall, compromised engineering workstation)
- Establish persistent access to OT network (scheduled task, service installation, credential theft)
- Deploy command & control beacon to OT environment

**Phase 3: Malware Staging & Pre-Positioning (Weeks 9-12)**
- Stage destructive wiper malware on key SCADA hosts and control systems
- Pre-position malware on backup systems and offline media for resilience
- Establish manual triggers or time-based execution for coordinated activation

**Phase 4: Trigger & Execution (Strategic Timeframe)**
- Activate destructive malware across HECO OT environment on predetermined date/trigger
- Simultaneously deploy disruption against Naval logistics (personnel systems, supply chain coordination)
- Coordination with diplomatic/kinetic operations by state sponsor (hypothesis)

**Expected Impact:**
- Multi-hour power outages affecting military installations, hospitals, critical services
- Disruption of naval operations and logistics during strategic window
- Significant military operational impact; potential loss of life (hospital power loss, manufacturing disruption)

---

**Key Indicators of MDCOA Execution:**
| Indicator | Collection | Rationale |
|-----------|-----------|-----------|
| Lateral movement toward OT network | Network flow (business IT → OT firewall), access logs | Marks Phase 2 planning |
| Engineering workstation compromise | EDR alerts on engineering systems, privilege escalation | Indicates OT access preparation |
| Unusual SCADA host activity | OT network monitoring (Zeek, ICS-specific sensors), baseline deviation | Marks Phase 3 malware deployment |
| Wiper malware detection | Antivirus/EDR alerts on OT systems, unusual system shutdown behavior | Indicates Phase 4 activation start |
| Synchronized multi-system failure | HECO control center alerts, power grid monitoring, incident reports | Confirms destructive attack |

---

**Likelihood Assessment:** LOW-MODERATE (15-25% confidence)
- Requires significant OT expertise and months of preparation
- High-risk operation; high likelihood of detection during reconnaissance
- More likely during escalation scenario (kinetic conflict, major geopolitical crisis)
- Historically, APT43 avoids destructive operations unless strategic incentive present

---

## B.4 Priority Intelligence Requirements (PIRs)

### PIR Definitions & Collection Focus

**PIR 1: Presence & Persistence**
- **Question:** Has APT43 established active persistence or dormant access within DoD or HECO networks?
- **Why It Matters:** Determines whether threat is active/imminent vs. future planning
- **Collection Focus:** SIEM login anomalies, EDR persistence indicators, cloud IAM audit logs, scheduled tasks/services, registry modifications, WMI event subscriptions
- **Collection Sources:** SIEM (Splunk), EDR (CrowdStrike), cloud audit logs (AWS CloudTrail, Azure Activity Log)
- **Collector:** Network Analysis Lead
- **Reporting Frequency:** Daily (hunt output); escalation within 1 hour if positive indicator found

---

**PIR 2: Current TTPs & Malware**
- **Question:** What specific TTPs, malware families, and C2 infrastructure is APT43 currently employing against Hawaii targets?
- **Why It Matters:** Informs detection rule development and threat hunting hypothesis prioritization
- **Collection Focus:** Malware samples (FileSystem, memory, network), command/control patterns, exploitation tools, lateral movement methods, data exfiltration channels
- **Collection Sources:** Endpoint malware analysis (memory dumps, process execution logs), network traffic (DNS, HTTP, TLS fingerprinting), SIEM alerts
- **Collector:** Forensics Lead + Network Analysis Lead
- **Reporting Frequency:** Per incident (forensic analysis); weekly TTP summary

---

**PIR 3: OT Network Interest**
- **Question:** Is APT43 actively attempting reconnaissance or access to OT systems supporting critical infrastructure (SCADA, power grid, etc.)?
- **Why It Matters:** Determines escalation priority and OT hardening focus
- **Collection Focus:** Network traffic toward OT network, anomalous queries to engineering/automation systems, lateral movement from business IT to OT segments, SCADA host access attempts
- **Collection Sources:** Network segmentation boundary monitoring, OT-specific IDS (Zeek on OT TAPs), proxy logs, access control lists
- **Collector:** Network Analysis Lead
- **Reporting Frequency:** Daily hunt output; immediate escalation to HECO/SEMA on positive indicator

---

**PIR 4: Exfiltration & Destruction Indicators**
- **Question:** What indicators reveal imminent exfiltration activity or pre-staging of destructive malware?
- **Why It Matters:** Enables predictive containment and emergency escalation
- **Collection Focus:** Large data transfers to external IPs, staging of wiper malware, backup credential access, privilege escalation acceleration, preparation activity (scanning, enumeration spikes)
- **Collection Sources:** SIEM (data transfer volume anomalies), DLP (sensitive data transfer alerts), EDR (malware indicators, process behavior), network flow analysis
- **Collector:** Network Analysis Lead + IR Lead
- **Reporting Frequency:** Real-time alert; escalation to CPT TL and ARCYBER if confirmed

---

## B.5 Essential Elements of Information (EEI) & Intelligence Requirements

| EEI | Definition | How It Supports Decision-Making |
|-----|------------|----------------------------------|
| **Active C2 Beacons** | Confirmed APT43 command/control communication in Hawaii networks | Determines containment urgency and affected network segments |
| **Credential Compromise List** | Confirmed stolen credentials (domain, email, cloud, VPN) | Enables rapid credential reset and access revocation |
| **Persistence Mechanisms** | Confirmed backdoors, scheduled tasks, IAM keys, service accounts | Prioritizes eradication actions and re-infection prevention |
| **Data Exfiltration Targets** | Confirmed systems from which APT43 exfiltrated data | Informs incident scope and damage assessment |
| **OT Network Access** | Any confirmed or attempted access to SCADA/engineering systems | Triggers OT emergency response and hardening prioritization |

---

## B.6 Intelligence Dissemination & Reporting

### Daily INTSUM

**Format:** Narrative + structured data (hunt activity, threat TTP correlation)

**Frequency:** Daily at 0800Z (morning brief) and 1600Z (SITREP summary)

**Recipient List:**
- Battalion S2 (internal tracking and higher HQ reporting)
- CPT 173 Team Lead (mission update)
- ARCYBER S2 (external reporting)
- NSA Hawaii Liaison (classified intel fusion)
- FBI Cyber (law enforcement coordination)

**Content:**
- Summary of APT43-related activity detected in past 24 hours
- Status of PIR/EEI collection efforts
- Hunt hypotheses in progress and results
- Any critical indicators or escalation triggers
- Recommendation for next operational focus

---

### Forensic Report (Per Incident)

**Format:** Technical analysis document (malware analysis, artifact interpretation, timeline)

**Frequency:** Within 24 hours of incident confirmation

**Recipient List:**
- Battalion S2 (intelligence database)
- NSA Hawaii (CI lead)
- FBI Cyber (law enforcement support)
- ARCYBER Malware Analysis Team

**Content:**
- Malware sample analysis (hash, functionality, C2 connections)
- Forensic timeline (discovery to eradication)
- Attribution analysis (confidence assessment)
- Recommendations for detection and prevention

---

## B.7 Approved Intelligence Sources & Limitations

**Approved Sources:**
- DoD SIEM (Splunk) — Unclassified/FOUO logging
- DoD EDR (CrowdStrike) — Unclassified/FOUO endpoint telemetry
- DISA Threat Intelligence Feed — Unclassified IOCs and TTP summaries
- CISA Alerts & MITRE ATT&CK — Publicly available threat intelligence
- NSA Liaison (via secure comms) — Classified threat intel (if required)
- FBI Cyber — Law enforcement intelligence (if coordination required)

**Limitations:**
- No access to SIGINT-derived intelligence (classified INTEL COMMUNITY product)
- Limited access to foreign intelligence sources
- No signals intelligence without NSA coordination
- Unclassified discipline required for reports

---

**RESPONSIBLE OFFICER:** Battalion S2 (Intelligence Officer)

**APPROVED BY:** LTC [Battalion Commander]

