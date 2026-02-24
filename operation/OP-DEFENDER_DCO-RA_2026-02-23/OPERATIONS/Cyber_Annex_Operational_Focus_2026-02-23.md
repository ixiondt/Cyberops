# ANNEX M: CYBER OPERATIONS ANNEX

**OPORD 26-02 - OP-DEFENDER Cyber Operations Response Action**

---

## CLASSIFICATION & AUTHORITY

**Classification:** UNCLASSIFIED // FOUO

**Authority Reference:** OPORD 26-02 / ARCYBER DCO-RA Authority

**Document ID:** OP-DEFENDER-ANNEX-M-CYBER

**Date:** 2026-02-23

---

## I. SITUATION

### A. Enemy Forces

**Threat Actor:** APT41 (Winnti Group / Blackfly)

**Threat Classification:** Advanced Persistent Threat (APT) - State-Sponsored

**Known Capabilities:**
- Zero-day exploitation capability
- Kernel-mode rootkit development
- Cross-platform malware (Windows, Linux, macOS, cloud)
- Sophisticated lateral movement techniques
- Long-term persistent operations (months to years)

**Known Malware Arsenal:**
- ShadowPad (modular backdoor)
- Winnti variants (kernel-mode rootkits)
- DEADEYE (malware loaders)
- KEYPLUG (credential stealing)
- Custom Cobalt Strike beacons
- PowerShell-based post-exploitation tools

**Targeting Pattern:** Critical Infrastructure (energy, manufacturing), Defense Contractors, IP Theft Focus

**Current Indication:** APT41 presence confirmed at BPEnergy (lockfile.ps1 on dc2 indicates persistence mechanism installation)

---

### B. Friendly Forces

**Higher HQ:** ARCYBER (Army Cyber Command)

**Supported Organization:** BPEnergy (Defense Contractor - DoD Critical Infrastructure Partner)

**Command Structure:**
- Battalion Commander: LTC Jackson
- Mission OIC: MAJ Manbear
- CPT 173 Element Lead: MAJ Lounsbury (Host Forensics)
- CPT 174 Element Lead: MAJ Othergal (Cloud/Malware Analysis)

**Available Forces:**
- CPT 173 (3-4 host analysis personnel)
- CPT 174 (2-3 malware analysis personnel)
- MOC (Mission Operations Center) - 8-10 personnel
- S-2 Intelligence (1-2 analysts)
- S-3 Operations (1-2 coordinators)

**Supporting Elements:**
- ARCYBER Malware Analysis Lab (external support if needed)
- BPEnergy IT/OT Support Teams
- Law Enforcement Liaison (FBI potential)

---

### C. Cyberspace Environment

**Area of Interest (AO):**
- BPEnergy Enterprise Network (SI-EN) - Corporate systems
- Cloud Services - Azure Government, AWS GovCloud
- OT/ICS Enclave - Manufacturing control systems
- Hybrid cloud deployments

**Scope & Scale:**
- 500+ corporate endpoints
- 50+ cloud instances/services
- 100+ OT devices
- Dozens of CI-critical servers
- 500+ corporate users
- 200+ service accounts

**Network Architecture:**
- Enterprise domain (Active Directory)
- Cloud management (Azure AD, AWS IAM)
- OT/Manufacturing segmented network
- Multiple trust boundaries and security zones

**Key Terrain (Cyberspace):**
- Domain Controller (dc2) - **CRITICAL** (Currently compromised)
- File servers (data repositories)
- Cloud identity services (Azure/AWS)
- OT management network (production control)
- Manufacturing MES (Manufacturing Execution System)

**Threat Assessment:**
- 🔴 CRITICAL - DC compromise = network-wide access
- Domain-wide credential compromise possible
- Lateral movement to OT systems likely
- Data exfiltration capability confirmed
- Long-term persistence likely installed

---

## II. MISSION

**Mission Statement:** Conduct Defensive Cyberspace Operations - Response Action (DCO-RA) to rapidly identify, contain, and eradicate APT41 malicious cyber activity from BPEnergy systems. Restore clean operational posture and implement enhanced defensive measures to prevent recurrence. Support mission continuity for DoD-critical production.

**Commander's Intent:** Eliminate APT41 presence within BPEnergy network within 7 days, implement detection capability to prevent future compromise, and maintain operational continuity throughout response.

---

## III. EXECUTION

### A. Cyber Course of Action (Selected COA)

**COA Title:** Rapid Investigation → Eradication → Hardening → Monitoring

**Three-Phase Execution:**

---

#### **PHASE I: INVESTIGATION & ANALYSIS (Immediate - 36 hours)**

**Objective:** Determine malware classification, scope of compromise, and threat assessment

**Tasks:**

1. **Forensic Collection & Analysis**
   - Capture lockfile.ps1 binary and associated artifacts from dc2
   - Preserve registry, event logs, process telemetry
   - Document file system timeline (creation, modification dates)
   - Extract IOCs (C2 domains, file paths, registry keys)

2. **Malware Family Identification**
   - Submit to VirusTotal for signature matching
   - Scan with YARA rules for APT41 malware patterns
   - Perform dynamic analysis in isolated lab (Cuckoo Sandbox)
   - Reverse engineering if custom/packed variant identified

3. **Threat Analysis & Attribution**
   - Correlate IOCs with known APT41 infrastructure
   - Map observed TTPs to MITRE ATT&CK techniques
   - Assess APT41 attribution confidence (Confirmed/Likely/Possible)
   - Develop threat intelligence assessment

4. **Scope Determination**
   - Analyze network logs for dc2 lateral movement
   - Identify all affected systems
   - Assess credential compromise extent
   - Evaluate data exfiltration indicators

**Owner:** CPT 173 (Host Analysis) + CPT 174 (Malware) + S-2 Intelligence

**Timeline:** 2026-02-23 → 2026-02-24 18:00 UTC (36-hour window)

**Success Criteria:**
- Malware family identified or marked as unknown/custom
- Compromise timeline established
- Affected systems documented
- Lateral movement scope understood
- Ready to transition to Phase II (Eradication)

---

#### **PHASE II: ERADICATION & REMEDIATION (Days 1-8)**

**Objective:** Remove malware and persistence, reset credentials, deploy detection rules

**Tasks:**

1. **System Remediation (Days 1-3)**
   - Isolate dc2 from network (with approved maintenance window coordination)
   - Remove lockfile.ps1 and associated malware binaries
   - Delete all persistence mechanisms (scheduled tasks, WMI, registry)
   - Harden system (PowerShell logging, UAC, patches)
   - Verify clean via multiple scanning methods

2. **Credential Reset (Days 2-3)**
   - Reset all compromised DC service accounts
   - Reset admin accounts with potential dc2 access
   - Consider domain-wide credential reset if compromise extensive
   - Force Azure AD token refresh (if hybrid identity compromised)
   - Rotate cloud API keys/service principals

3. **Lateral Movement Remediation (Days 2-8)**
   - For each affected system identified in Phase I:
     - Collect forensic evidence
     - Remove malware and persistence
     - Apply security patches and hardening
     - Deploy EDR agents (if not present)
   - Prioritize OT systems if any compromise detected

4. **Detection Rule Development & Deployment (Days 3-7)**
   - Create 10+ detection rules targeting lockfile.ps1 behaviors
   - Deploy across 4 layers: EDR, SIEM, NIDS, YARA
   - Test rules for false positives (validate < 1% rate)
   - Deploy to production with SOC training

**Owner:** S-3 Operations + CPT 173 + BPEnergy IT/OT Teams + S-2 Intelligence

**Timeline:** 2026-02-24 18:00 → 2026-03-02 18:00 UTC (8-day window)

**Success Criteria:**
- All systems cleaned and verified
- All credentials reset and rotated
- Detection rules operational and validated
- Zero persistence mechanisms remaining
- BPEnergy operational continuity maintained (< 2 hours downtime)

---

#### **PHASE III: MONITORING & VERIFICATION (Days 8-38)**

**Objective:** Ensure eradication, detect recurrence, monitor for attacker return

**Tasks:**

1. **Continuous Monitoring (30 days)**
   - Daily review of EDR and SIEM alerts for recurrence indicators
   - Threat hunting for missed persistence or implants
   - Monitor for attacker re-compromise attempts
   - Assess detection rule effectiveness

2. **Threat Intelligence Updates**
   - Weekly threat intelligence reviews for new APT41 IOCs
   - Correlation with external threat feeds (CISA, FBI, VirusTotal)
   - Updated threat assessment if new information emerges

3. **Verification & Closure**
   - After 30 days with zero recurrence: operation declared complete
   - Final verification report documenting all actions and findings
   - Lessons learned documentation
   - Security posture assessment

**Owner:** MOC Watch (24/7) + S-2 Intelligence + CPT 173

**Timeline:** 2026-03-02 18:00 → 2026-04-02 18:00 UTC (30-day monitoring)

**Success Criteria:**
- Zero malware/persistence recurrence over 30-day period
- Detection rules effective and operational
- No unauthorized system access detected
- Operation successfully completed

---

### B. Cyber Task Organization

| Element | Role | Responsibility | POC |
|---------|------|-----------------|-----|
| **CPT 173** | Host Forensics Lead | Forensic collection, host analysis, system remediation | MAJ Lounsbury |
| **CPT 174** | Malware Analysis Lead | Reverse engineering, malware ID, detection rules | MAJ Othergal |
| **S-2 Intelligence** | Threat Intelligence | Attribution, threat assessment, IOC correlation | [MOC S-2] |
| **S-3 Operations** | Operations Coordinator | Remediation planning, resource coordination | [S-3 Officer] |
| **MOC (24/7)** | Command & Control | Monitoring, escalation, decision support | MAJ Manbear |
| **BPEnergy IT/OT** | Support Element | System access, maintenance windows, credential management | [BPEnergy POC] |

---

### C. Cyber Effects Integration

**Synchronization with Operational Phases:**

```
Timeline: 2026-02-23 → 2026-04-02 (40-day operation)

Phase I (36h):    Investigation → Malware ID → Scope Assessment
                  ↓ (DECISION POINT: Proceed with Phase II)

Phase II (8d):    Forensic Preservation → Eradication → Detection Rules
                  ↓ (DECISION POINT: Proceed with Phase III Monitoring)

Phase III (30d):  Continuous Monitoring → Verification → Closure
```

**Critical Decision Points:**
1. **2026-02-24 06:00 UTC** - Malware family identified → Confirm/update threat assessment
2. **2026-02-24 18:00 UTC** - Scope determined → Approve remediation timeline
3. **2026-03-02 18:00 UTC** - Remediation complete → Begin 30-day monitoring
4. **2026-04-02 18:00 UTC** - Monitoring complete → Operation closure approved

---

### D. Rules of Engagement (ROE) & Authorities

**DCO-RA Authority:** Pre-authorized per OPORD 26-02 Annex L

**Authorized Actions:**
- ✅ Log analysis and evidence collection
- ✅ Sensor deployment for monitoring
- ✅ System isolation and containment
- ✅ Malware analysis and forensics
- ✅ Endpoint isolation for forensic collection
- ✅ Credential reset and rotation
- ✅ Network segmentation modification
- ✅ EDR agent deployment
- ✅ Detection rule deployment

**Actions Requiring ARCYBER Approval:**
- Production OT system modifications (except emergency containment)
- Mass credential reset across domain (coordinate with BPEnergy CIO)
- Third-party notification (FBI/CISA involvement)

**Actions Prohibited:**
- Offensive cyber operations
- Destructive malware deployment
- Unauthorized third-party system access
- Collection of non-mission-related data

---

## IV. SUSTAINMENT

### A. Personnel & Resources

**Personnel Rotation:**
- 24/7 MOC operations maintained throughout
- CPT 173/174 personnel rotating on 12-hour shifts during active phases
- Relief/rest scheduled per Army regulations

**Tool Availability:**
- ✅ EDR (Microsoft Defender) - Operational
- ✅ SIEM (Log aggregation) - Operational
- ✅ Forensic lab (Zeek, Suricata, Wireshark) - Operational
- ✅ Malware analysis lab (Cuckoo, Ghidra, IDA Pro) - Operational
- ✅ Network detection (Zeek/Suricata) - Operational
- ✅ YARA/signature scanning - Operational

**External Support:**
- ARCYBER Malware Analysis Lab (escalation path for advanced reverse engineering)
- Law Enforcement (FBI/CISA - coordination if needed)
- BPEnergy IT/OT Support (credentials, maintenance windows, system access)

---

### B. Command & Control

**MOC Operations Center:**
- Location: BPEnergy site (onsite MOC)
- Hours: 24/7 operation
- Watch Rotation: 12-hour shifts
- Communications: Secure network, phone, email

**Reporting Requirements:**
- Daily SITREP: 1600 UTC to ARCYBER and BPEnergy CIO
- Incident Reports: Within 1 hour of finding detection
- Weekly Summary: Thursday 1600 UTC
- Decision Brief: Required at critical decision points

**Escalation Path:**
- Watch NCO → Battle Captain → S-3 → Mission OIC (MAJ Manbear) → Battalion Commander (LTC Jackson) → ARCYBER

---

### C. Logistics & Support

**Medical:** Standard Army medical support (not anticipated to be required for cyber operation)

**Administrative:** Standard Army admin procedures; expedited clearance processes for sensitive documents

**Communications:** Secure network access required for all teams; VPN access to BPEnergy systems

---

## V. COMMAND & SIGNAL

### A. Command

**Commander:** LTC Jackson (Battalion Commander)

**Mission OIC:** MAJ Manbear (Makes operational decisions during execution)

**Element Leads:**
- CPT 173: MAJ Lounsbury (Host forensics decisions)
- CPT 174: MAJ Othergal (Malware analysis decisions)

**Authority Delegation:** MAJ Manbear has authority to approve Phase II initiation upon Phase I completion; ARCYBER approval required for actions outside pre-authorized DCO-RA scope

---

### B. Signal / Communications

**Primary:** Secure Army network (SIPRNET if available)

**Alternate:** Commercial VPN with approved encryption

**Emergency:** Secure phone line to ARCYBER Ops Center

**Cyber-Specific:**
- MOC to ARCYBER: Daily SITREP
- MOC to BPEnergy: Real-time incident notifications
- Element to Element: Secure email, phone
- External Coordination: FBI/CISA liaison (if required)

---

## VI. ANNEXES

**Attached:**
- Annex A: Task Organization
- Annex B: Intelligence (APT41 Threat Model)
- Annex C: OPORD Main Body
- Annex J: Cyber Technical Procedures
- Annex K: Incident Response Playbooks
- Annex L: Authorities & ROE

**Supporting Documents:**
- POAM-001: lockfile Investigation
- POAM-002: lockfile Remediation
- Threat_COA_Analysis_APT41
- PIR_RFI_Tracker
- Incident_Report_001

---

## VII. DISTRIBUTION

**TO:** MAJ Manbear (Mission OIC), MAJ Lounsbury (CPT 173 Lead), MAJ Othergal (CPT 174 Lead), S-2, S-3, MOC Personnel

**THROUGH:** Battalion Commander (LTC Jackson)

**TO HQ:** ARCYBER Operations

---

**Classification:** UNCLASSIFIED // FOUO

**Prepared by:** CyberOpsPlanner / CPB Operations

**Date:** 2026-02-23

**ANNEX M COMPLETE**
