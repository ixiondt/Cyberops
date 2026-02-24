# Priority Intelligence Requirements (PIR) & Request for Information (RFI) Tracker

**Intelligence Collection and Analysis Requirements for OP-DEFENDER**

---

## TRACKER METADATA

**Operation:** OP-DEFENDER (OPORD 26-02 - BPEnergy DCO-RA)

**Document ID:** PIR-RFI-TRACKER-001

**Date Created:** 2026-02-23

**Owner:** S-2 Intelligence Officer / MOC

**Last Updated:** 2026-02-23

**Classification:** UNCLASSIFIED // FOUO

**Next Review:** Daily (1600 UTC) during active investigation

---

## EXECUTIVE SUMMARY

**Total PIRs:** 4 (Core decision-support requirements)

**Total RFIs Outstanding:** 8 (Specific data collection requirements)

**Collection Status:**
- ✅ Assigned/In Collection: 8
- ⏳ Pending Response: 3
- 🟡 Partially Answered: 2
- ✅ Closed: 1

**Critical Path PIRs:**
- PIR-01 (Malware Family) - Critical to threat assessment and remediation
- PIR-02 (Compromise Timeline) - Critical to scope determination
- PIR-03 (Lateral Movement Scope) - Critical to remediation scope

---

## PART I: PRIORITY INTELLIGENCE REQUIREMENTS (PIRs)

PIRs represent **commander-level information requirements** that directly support operational decisions.

---

### PIR-01: Malware Family & Attribution Confidence

| Field | Value |
|-------|-------|
| **PIR ID** | PIR-01 |
| **PIR Statement** | "What is the malware family used in lockfile.ps1, and what is the confidence level for APT41 attribution?" |
| **Decision Supported** | **Commander Decision:** Approve remediation strategy and escalation level to ARCYBER |
| **Why It Matters** | Malware family determines attack sophistication, persistence capability, and recurrence likelihood |
| **Collection Responsibility** | CPT 174 (Malware Analysis) + S-2 Intelligence |
| **Collection Timeline** | POAM-001 Milestone 2 (2026-02-24 06:00 UTC) |
| **Related RFIs** | RFI-01, RFI-02, RFI-03 (All contribute to malware identification) |
| **Current Status** | ⏳ IN COLLECTION (Analysis underway) |

**Expected Answers & Decision Impact:**

- **If ShadowPad Confirmed:**
  - Decision: Confirm APT41 attribution (HIGH confidence)
  - Implication: Known APT41 persistence capability; standard 7-day remediation timeline likely sufficient
  - Escalation: CRITICAL to ARCYBER (confirmed foreign intelligence operation)

- **If Winnti Confirmed:**
  - Decision: Confirm APT41 attribution (VERY HIGH confidence)
  - Implication: Kernel-mode rootkit; sophisticated compromise; may require rebuild instead of remediation
  - Escalation: CRITICAL + / Potential DoD level escalation

- **If Custom/Unknown Malware:**
  - Decision: APT41 attribution uncertain (MEDIUM confidence)
  - Implication: May require external malware analysis support
  - Escalation: Still CRITICAL but with lower APT41 attribution confidence

---

### PIR-02: Compromise Timeline & Dwell Time

| Field | Value |
|-------|-------|
| **PIR ID** | PIR-02 |
| **PIR Statement** | "What is the estimated date/time of initial compromise on dc2, and how long has the attacker maintained persistence?" |
| **Decision Supported** | **Commander Decision:** Determine scope of exposure (data exfiltration window) and urgency of investigation/remediation |
| **Why It Matters** | Dwell time determines data exposure, potential lateral movement window, and credential compromise scope |
| **Collection Responsibility** | CPT 173 (Forensic Analysis) |
| **Collection Timeline** | POAM-001 Milestone 1-3 (2026-02-23 18:00 - 2026-02-24 18:00 UTC) |
| **Related RFIs** | RFI-04 (Timeline Analysis), RFI-05 (Log Review) |
| **Current Status** | ⏳ IN COLLECTION (Forensic timeline reconstruction) |

**Expected Answers & Decision Impact:**

- **If < 7 days (Recent compromise):**
  - Implication: Limited exposure window; likely recent initial access
  - Decision: Standard investigation and remediation timeline
  - Action: Accelerate threat hunting for initial access point

- **If 7-30 days (Recent but established):**
  - Implication: Moderate exposure; attacker has moved beyond initial access
  - Decision: Investigate lateral movement and credential harvest potential
  - Action: POAM-002 remediation critical to prevent data exfiltration

- **If 30-90 days (Established foothold):**
  - Implication: Significant exposure window; attacker likely in data collection phase
  - Decision: Data exfiltration probable; may require notification to affected parties
  - Action: Expand investigation scope; accelerate detection rule deployment

- **If > 90 days (Long-term compromise):**
  - Implication: 🔴 CRITICAL - Extended access window; substantial data exposure risk
  - Decision: Escalate to legal/JAG for potential FBI notification
  - Action: Comprehensive threat hunting required; potential law enforcement involvement

---

### PIR-03: Lateral Movement Scope & Affected Systems

| Field | Value |
|-------|-------|
| **PIR ID** | PIR-03 |
| **PIR Statement** | "To which systems has APT41 laterally moved from dc2, and which user/service accounts have been compromised?" |
| **Decision Supported** | **Commander Decision:** Determine remediation scope; approve credential reset strategy; assess mission impact |
| **Why It Matters** | Lateral movement scope directly determines remediation effort, timeline, and operational continuity risk |
| **Collection Responsibility** | CPT 173 (Network Forensics) + S-2 Intelligence |
| **Collection Timeline** | POAM-001 Milestone 3 (2026-02-24 18:00 UTC) |
| **Related RFIs** | RFI-06 (Network Log Analysis), RFI-07 (Credential Analysis), RFI-08 (System Inventory) |
| **Current Status** | ⏳ IN COLLECTION (Network log analysis underway) |

**Expected Answers & Decision Impact:**

- **If Contained to dc2 Only:**
  - Implication: Limited scope; containment easier
  - Decision: POAM-002 focused on dc2; credential reset limited to dc2 service accounts
  - Timeline: 3-5 day remediation possible

- **If Limited Lateral Movement (5-10 systems):**
  - Implication: Moderate scope; feasible remediation timeline
  - Decision: Expand remediation to affected systems; targeted credential reset
  - Timeline: 5-7 day remediation possible

- **If Extensive Lateral Movement (100+ systems):**
  - Implication: 🔴 CRITICAL - Massive scope; potential enterprise-wide compromise
  - Decision: May require domain-wide credential reset; accelerated response
  - Timeline: 10-14+ day remediation; potential rebuild options considered

- **If OT System Compromise Detected:**
  - Implication: 🔴 CRITICAL++ - Manufacturing systems at risk; mission-critical systems potentially affected
  - Decision: ARCYBER + BPEnergy executive escalation; potential emergency response
  - Timeline: Accelerated containment; possible operational pause for safety

---

### PIR-04: Data Exfiltration & Business Impact

| Field | Value |
|-------|-------|
| **PIR ID** | PIR-04 |
| **PIR Statement** | "Has APT41 exfiltrated sensitive data from BPEnergy, and if so, what data categories and volume?" |
| **Decision Supported** | **Commander Decision:** Determine notification requirements (legal, law enforcement, customers); assess impact on business continuity |
| **Why It Matters** | Data exfiltration impacts legal obligations, business relationships, strategic posture, and potential law enforcement notification |
| **Collection Responsibility** | S-2 Intelligence (with Data Loss Prevention team input if available) |
| **Collection Timeline** | POAM-001 Milestone 4 (2026-02-24 18:00 UTC) - Parallel with network analysis |
| **Related RFIs** | RFI-09 (DLP Log Review), RFI-10 (Outbound Traffic Analysis), RFI-11 (File Access Patterns) |
| **Current Status** | ⏳ IN COLLECTION (Network exfiltration analysis) |

**Expected Answers & Decision Impact:**

- **If No Evidence of Exfiltration:**
  - Implication: Contained to reconnaissance/persistence phase
  - Decision: Investigation complete; proceed to remediation; legal/law enforcement notification not required
  - Timeline: Standard remediation

- **If Exfiltration of Non-Sensitive Data (Configuration, logs):**
  - Implication: Limited business impact but confirms data access capability
  - Decision: May require customer notification (depending on data category)
  - Timeline: Standard remediation + notification coordination

- **If Exfiltration of Sensitive Data (IP, designs, source code):**
  - Implication: 🔴 CRITICAL - Business and legal impact; customer/partner notification likely required
  - Decision: Legal/JAG review required; possible FBI notification; customer incident response
  - Timeline: Remediation + notification/legal coordination

- **If Exfiltration of Personal Data (Employee records, financial data):**
  - Implication: 🔴 CRITICAL - Legal and privacy implications; regulatory notification requirements
  - Decision: Legal/JAG review required; potential regulatory filing requirements; FBI notification likely
  - Timeline: Remediation + legal/regulatory coordination + customer notification

---

## PART II: REQUESTS FOR INFORMATION (RFIs)

RFIs represent **specific data collection tasks** that support PIR analysis.

---

### Data Collection RFIs

**RFI-01: lockfile.ps1 Binary Hash & Metadata**

| Field | Value |
|-------|-------|
| **RFI ID** | RFI-01 |
| **Request** | Provide cryptographic hashes (MD5, SHA256), file size, creation date, modification date for lockfile.ps1 binary |
| **Purpose** | IOC extraction; VirusTotal submission; malware signature development |
| **Owner** | CPT 173 Host Forensics |
| **Status** | ✅ CLOSED (Hash: [TBD after forensic collection]) |
| **Due Date** | 2026-02-23 12:00 UTC (from incident discovery) |
| **Linkage** | Supports PIR-01, PIR-02 |

---

**RFI-02: VirusTotal Scan Results**

| Field | Value |
|-------|-------|
| **RFI ID** | RFI-02 |
| **Request** | Submit lockfile.ps1 to VirusTotal; provide AV detection results and malware family identification |
| **Purpose** | Initial malware family identification; IOC confirmation; threat intelligence correlation |
| **Owner** | CPT 174 Malware Analysis |
| **Status** | ⏳ IN COLLECTION (Awaiting RFI-01 hash) |
| **Due Date** | 2026-02-23 14:00 UTC (2 hours after RFI-01) |
| **Linkage** | Supports PIR-01 |

---

**RFI-03: YARA Scan Results Against APT41 Malware Families**

| Field | Value |
|-------|-------|
| **RFI ID** | RFI-03 |
| **Request** | Scan lockfile.ps1 and extracted components against YARA rules for ShadowPad, Winnti, DEADEYE, Cobalt Strike patterns |
| **Purpose** | Confirm malware family; identify APT41 TTP indicators; extraction of IOCs |
| **Owner** | CPT 174 Malware Analysis |
| **Status** | ⏳ IN COLLECTION |
| **Due Date** | 2026-02-23 16:00 UTC (4 hours after RFI-01) |
| **Linkage** | Supports PIR-01 |

---

**RFI-04: Forensic Timeline Analysis - File System Metadata**

| Field | Value |
|-------|-------|
| **RFI ID** | RFI-04 |
| **Request** | Analyze file system metadata for lockfile.ps1: creation date, modification date, access date, MFT timestamp analysis |
| **Purpose** | Establish initial compromise date; determine dwell time; correlate with other events |
| **Owner** | CPT 173 Host Forensics |
| **Status** | 🟡 IN PROGRESS |
| **Due Date** | 2026-02-23 18:00 UTC (POAM-001 Milestone 1) |
| **Linkage** | Supports PIR-02 |

---

**RFI-05: Event Log Timeline Analysis - Windows Security/System Logs**

| Field | Value |
|-------|-------|
| **RFI ID** | RFI-05 |
| **Request** | Analyze Windows Event Logs (7-30 day window): scheduled task creation (Event 106), process execution (Event 4688), powershell/script block logs |
| **Purpose** | Establish execution timeline; identify parent process; confirm lockfile.ps1 execution pattern |
| **Owner** | CPT 173 Host Forensics |
| **Status** | 🟡 IN PROGRESS |
| **Due Date** | 2026-02-23 18:00 UTC (POAM-001 Milestone 1) |
| **Linkage** | Supports PIR-02 |

---

**RFI-06: Network Log Analysis - dc2 Lateral Movement**

| Field | Value |
|-------|-------|
| **RFI ID** | RFI-06 |
| **Request** | Analyze network flows for dc2 outbound connections: SMB sessions, RDP logins, WinRM sessions, unusual ports; 30-day window minimum |
| **Purpose** | Identify lateral movement targets; detect C2 communication; assess scope of compromise |
| **Owner** | CPT 173 Network Forensics |
| **Status** | ⏳ IN COLLECTION |
| **Due Date** | 2026-02-24 18:00 UTC (POAM-001 Milestone 3) |
| **Linkage** | Supports PIR-03 |

---

**RFI-07: Credential Access Analysis - LSASS/Kerberos Artifacts**

| Field | Value |
|-------|-------|
| **RFI ID** | RFI-07 |
| **Request** | Analyze memory/registry for LSASS access evidence; Kerberos ticket history; identified compromised user accounts and service accounts |
| **Purpose** | Determine credential compromise scope; identify accounts for reset; assess re-access capability |
| **Owner** | CPT 173 Host Forensics |
| **Status** | ⏳ IN COLLECTION |
| **Due Date** | 2026-02-24 18:00 UTC (POAM-001 Milestone 3) |
| **Linkage** | Supports PIR-03 |

---

**RFI-08: System Inventory & Scope - Affected Systems List**

| Field | Value |
|-------|-------|
| **RFI ID** | RFI-08 |
| **Request** | From network log analysis, provide list of ALL systems accessed by dc2 or accessed via dc2-compromised credentials; categorize by system type (workstation, server, OT, cloud) |
| **Purpose** | Define remediation scope; prioritize systems for forensic collection; assess OT environment exposure |
| **Owner** | CPT 173 Network Forensics + S-2 Intelligence |
| **Status** | ⏳ IN COLLECTION |
| **Due Date** | 2026-02-24 18:00 UTC (POAM-001 Milestone 3) |
| **Linkage** | Supports PIR-03 |

---

**RFI-09: Data Exfiltration Evidence - Network Egress Analysis**

| Field | Value |
|-------|-------|
| **RFI ID** | RFI-09 |
| **Request** | Analyze network egress data: unusual outbound connections, DNS tunneling attempts, HTTPS exfiltration to non-business domains, large data transfers from dc2 |
| **Purpose** | Determine if data exfiltration occurred; identify exfiltration targets; assess data exposure scope |
| **Owner** | S-2 Intelligence + Network Analysis |
| **Status** | ⏳ IN COLLECTION |
| **Due Date** | 2026-02-24 18:00 UTC (POAM-001 Milestone 4) |
| **Linkage** | Supports PIR-04 |

---

**RFI-10: File Access Pattern Analysis - Sensitive Data Access**

| Field | Value |
|-------|-------|
| **RFI ID** | RFI-10 |
| **Request** | Analyze file access logs and Data Loss Prevention (DLP) logs for suspicious access to sensitive shares/data during compromise window |
| **Purpose** | Determine if sensitive data accessed; identify data categories; quantify potential exposure |
| **Owner** | BPEnergy IT / DLP Team (external coordination) |
| **Status** | ⏳ PENDING (External coordination needed) |
| **Due Date** | 2026-02-24 18:00 UTC (POAM-001 Milestone 4) |
| **Linkage** | Supports PIR-04 |

---

**RFI-11: Outbound C2 Communication Analysis**

| Field | Value |
|-------|-------|
| **RFI ID** | RFI-11 |
| **Request** | Analyze DNS and proxy logs for suspicious outbound queries/connections from dc2 to potential C2 infrastructure; extract IOCs (IPs, domains) |
| **Purpose** | Identify C2 communication channels; extract IOCs for threat intelligence; assess communication pattern for detection rule development |
| **Owner** | S-2 Intelligence + Network Analysis |
| **Status** | ⏳ IN COLLECTION |
| **Due Date** | 2026-02-24 18:00 UTC (POAM-001 Milestone 4) |
| **Linkage** | Supports PIR-01 (malware confirmation), PIR-04 (data exfiltration assessment) |

---

## PART III: COLLECTION TIMELINE & CRITICAL PATH

### Milestone 1: Forensic Collection & Initial Analysis (2026-02-23 12:00 - 18:00)

**Critical Path RFIs (Must complete for Milestone 1):**
- RFI-01 ✅ (Hash & metadata) - GOAL: 12:00 UTC
- RFI-02 🟡 (VirusTotal) - GOAL: 14:00 UTC
- RFI-03 🟡 (YARA scanning) - GOAL: 16:00 UTC
- RFI-04 🟡 (File timeline) - GOAL: 18:00 UTC
- RFI-05 🟡 (Event logs) - GOAL: 18:00 UTC

**Output:** Initial malware family hypothesis, preliminary IOCs

---

### Milestone 2: Malware Analysis & Family Confirmation (2026-02-24 00:00 - 06:00)

**Dependent RFIs (Milestone 1 must complete first):**
- RFI-02 → VirusTotal results drive analysis direction
- RFI-03 → YARA results confirm or refute family hypothesis

**Output:** Confirmed malware family (ShadowPad, Winnti, other); Full IOC list; APT41 attribution assessment

---

### Milestone 3: Scope & Lateral Movement Analysis (2026-02-24 06:00 - 18:00)

**Dependent RFIs (Milestones 1-2 must complete):**
- RFI-06 🟡 (Network analysis) - GOAL: 18:00 UTC
- RFI-07 🟡 (Credential analysis) - GOAL: 18:00 UTC
- RFI-08 🟡 (System inventory) - GOAL: 18:00 UTC

**Output:** Lateral movement systems identified; Credential compromise scope; Remediation scope defined

---

### Milestone 4: Intelligence Analysis & Attribution (2026-02-24 12:00 - 18:00, parallel with Milestone 3)

**Dependent RFIs (Milestones 1-3 contribute):**
- RFI-09 ⏳ (Exfiltration analysis) - GOAL: 18:00 UTC
- RFI-10 ⏳ (DLP analysis) - GOAL: 18:00 UTC
- RFI-11 ⏳ (C2 analysis) - GOAL: 18:00 UTC

**Output:** Data exfiltration assessment; APT41 confidence level; Final threat intelligence assessment

---

## PART IV: INTELLIGENCE GAPS & MITIGATION

**Current Gaps:**

1. **Malware Analysis Capability** (Gap: External reverse engineering may be needed if custom malware)
   - Mitigation: CPT 174 reverse engineer on staff; escalation path to ARCYBER malware lab if needed

2. **DLP/Data Access Logs** (Gap: BPEnergy may not have comprehensive DLP logging)
   - Mitigation: Coordination with BPEnergy IT; manual file access log review as fallback

3. **Threat Intelligence Confirmation** (Gap: May need CISA/FBI input for IOC confirmation)
   - Mitigation: ARCYBER escalation for threat intelligence support; external IOC sharing agreements

4. **C2 Infrastructure Identification** (Gap: May require ISP coordination to trace traffic)
   - Mitigation: ARCYBER can coordinate with NSA/NGA for infrastructure analysis

---

## PART V: DECISION POINTS & COMMANDER BRIEFING

**Decision Point 1 (2026-02-24 06:00 UTC) - After Milestone 1-2 Completion:**

**Brief to Commander:**
- Malware family identified: [ShadowPad / Winnti / Other / Unknown]
- APT41 attribution confidence: [High / Medium / Low]
- Recommended action: Proceed to Milestone 3 scope analysis; prepare POAM-002 Phase 1

---

**Decision Point 2 (2026-02-24 18:00 UTC) - After Milestone 3-4 Completion:**

**Brief to Commander:**
- Lateral movement scope: [Limited to dc2 / 5-10 systems / 50+ systems / Enterprise-wide]
- Credential compromise scope: [Isolated / Moderate / Extensive]
- Data exfiltration: [No evidence / Possible / Confirmed - [data categories]]
- Recommended action: Approve POAM-002 remediation timeline and scope; decide on escalation/notification

---

## PART VI: REFERENCES & SUPPORTING DOCUMENTATION

**Related Documents:**
- [POAM-001_lockfile_Investigation.md](../POAMs/POAM-001_lockfile_Investigation.md) - Investigation execution
- [Threat_COA_Analysis_APT41_2026-02-23.md](Threat_COA_Analysis_APT41_2026-02-23.md) - Threat context
- [Incident_Report_001_lockfile_ps1_dc2_2026-02-23.md](../Incident_Reports/Incident_Report_001_lockfile_ps1_dc2_2026-02-23.md) - Incident details

**OPORD References:**
- OPORD 26-02 Annex B (Intelligence Annex - PIR baseline)
- OPORD 26-02 Annex J (Cyber Technical Procedures - Collection procedures)

---

**Classification:** UNCLASSIFIED // FOUO

**Tracker Status:** Active - Daily update required during investigation

**Next Review:** 2026-02-23 18:00 UTC (Milestone 1 completion target)

**See:** [POAM_Tracker_2026-02-23.md](../POAMs/POAM_Tracker_2026-02-23.md) for overall operation status
