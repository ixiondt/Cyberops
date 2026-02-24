# Incident Report 001: Suspicious PowerShell Script (lockfile.ps1) - Host dc2

**CRITICAL - APT41 Persistence Indicator Investigation**

---

## INCIDENT METADATA

**Report Number:** INCIDENT-001

**Date/Time Reported:** 2026-02-23 (Time TBD - detected during initial system scan)

**Date/Time This Report Generated:** 2026-02-23 (Time TBD)

**Reporting Organization:** CPT 173 / CPB / OP-DEFENDER

**Incident Status:** 🔴 CRITICAL - INVESTIGATION IN PROGRESS

**Classification:** UNCLASSIFIED // FOUO

**Authority Reference:** OPORD 26-02 / ARCYBER DCO-RA

---

## EXECUTIVE SUMMARY

**BLUF:** Suspicious PowerShell script file named "lockfile.ps1" discovered on host dc2 in BPEnergy corporate network. File exhibits characteristics consistent with APT41 persistence mechanisms (scheduled task creation, registry modification, or WMI subscription installation). Script analysis in progress to determine malicious payload, command-and-control indicators, and scope of compromise. Host isolated pending forensic collection and eradication.

**Severity:** 🔴 CRITICAL

**Affected System:** dc2 (Domain Controller / Authentication Infrastructure)

**Threat Actor:** APT41 (Suspected - confidence pending analysis)

**Threat Tactics:** T1053 (Scheduled Task), T1547 (Boot/Logon Autostart), T1059 (Command & Scripting Interpreter)

---

## I. INCIDENT IDENTIFICATION & CLASSIFICATION

### A. Finding Details
- **Finding Type:** Suspicious File / Potential Malware / Persistence Mechanism
- **Finding Name:** lockfile.ps1
- **File Location:** [Path on dc2 - specify in forensic analysis]
- **File Hash (MD5/SHA256):** [To be determined during analysis]
- **File Size:** [To be determined]
- **Created Date:** [To be determined - forensic timeline]
- **Last Modified Date:** [To be determined - forensic timeline]

### B. Initial Assessment
- **Likelihood:** HIGH (PowerShell script on DC with suspicious filename suggests malware/persistence)
- **Impact:** CRITICAL (Domain controller compromise would affect entire BPEnergy network authentication and infrastructure)
- **Confidence Level:** MEDIUM (pending detailed analysis)

### C. Classification
Per OPORD 26-02 and CyberPlanner POAM system:
- **Incident Type:** Malware / Suspicious File / Persistence Indicator
- **POAM Category:** 🔴 CRITICAL
- **Finding Type Mapping:** Malware Infection + Persistence Mechanism
- **Risk Level:** CRITICAL - DCO-RA required immediately

---

## II. AFFECTED SYSTEMS & SCOPE

### A. Primary Affected Host
- **Hostname:** dc2
- **Function:** Domain Controller / Authentication Server
- **Environment:** BPEnergy Enterprise IT (SI-EN)
- **OS:** [Windows Server version - to determine]
- **IP Address(es):** [To determine]
- **Users with Access:** [To determine - forensic analysis]
- **Trust Relationships:** Domain controller - affects all systems trusting this domain

### B. Potential Scope of Compromise
- **Direct:** dc2 system
- **Secondary (if DC fully compromised):** All systems in BPEnergy domain
  - Corporate user workstations (~500+ endpoints)
  - Cloud identity services (Azure AD hybrid sync)
  - OT management network systems
  - Cloud API access tokens (if AAD tokens compromised)

### C. Mission Impact
- **Authentication Services:** If DC compromised and persistence established, attacker could maintain access to entire BPEnergy infrastructure
- **OT Access:** If credentials harvested from DC, lateral movement to OT enclave possible
- **Cloud Services:** If Azure AD tokens compromised, attacker could maintain persistence in cloud environments
- **Criticality:** CRITICAL - Domain controller compromise is catastrophic for defender; must prioritize investigation and remediation

---

## III. INCIDENT TIMELINE & DISCOVERY

### A. Discovery & Initial Response
- **Discovery Time:** 2026-02-23 (Specific time TBD)
- **Discovery Method:** [System scan / Threat hunting / EDR detection / Manual review]
- **Discovered By:** [Analyst name / Team]
- **Reporting Chain:** CPT 173 → MAJ Lounsbury → MAJ Manbear (Mission OIC) → ARCYBER
- **BPEnergy Notification:** [Notify BPEnergy CIO per ROE - within 1 hour of discovery]

### B. Initial Actions Taken
1. ✅ Finding documented (this report)
2. ✅ POAM-001 created (Investigation tracking)
3. ✅ Host dc2 flagged for forensic priority
4. ⏳ Host isolated from network (pending approval - coordinate with BPEnergy given DC criticality)
5. ⏳ Forensic collection planned

### C. Threat Activity Timeline (Preliminary)
- **File Creation/Installation:** [To be determined from forensic analysis]
- **Last Execution:** [To be determined from process history]
- **Suspected Compromise Window:** [To be determined - may span weeks if persistent APT41 presence]

---

## IV. TECHNICAL ANALYSIS - INITIAL ASSESSMENT

### A. File Characteristics
- **Filename:** lockfile.ps1
- **File Type:** PowerShell script (PS1 extension)
- **Suspected Functionality:** [Based on name and context]
  - File "locking" mechanism (possible encryption/ransomware related)
  - OR lock file creation for synchronization/persistence
  - OR actual file locking utility (benign possibility - LOW likelihood given APT41 context and DC location)

### B. Filename Analysis & MITRE Mapping
- **"lockfile" naming:** Unusual for legitimate system utilities; suggests malware obfuscation
- **PowerShell extension:** Common for APT41 persistence tools, post-exploitation, lateral movement
- **Location on DC:** Highly suspicious - DCs do not typically have user PowerShell scripts
- **Likely TTPs:**
  - T1053: Scheduled Task Execution (lockfile.ps1 likely called by scheduled task)
  - T1547: Boot or Logon Autostart Execution (possible registry run keys or WMI Event Subscription)
  - T1059: Command and Scripting Interpreter (PowerShell direct execution)
  - T1197: Credential Access (possible WMI or credential dumping in script)

### C. Suspected Payload
[To be determined through:
- Static analysis (code review, IOC extraction)
- Dynamic analysis (Cuckoo Sandbox execution in isolated lab)
- Reverse engineering (if obfuscated/packed)
]

**Initial hypotheses:**
1. **Persistence Installer:** Script installs scheduled task or WMI subscription for recurring execution
2. **Credential Harvester:** Script calls LSASS dump or registry credential export
3. **C2 Beacon Loader:** Script downloads and executes additional malware (ShadowPad, Winnti variant, Cobalt Strike)
4. **Lateral Movement Tool:** Script performs reconnaissance or initiates lateral movement
5. **Reconnaissance Script:** Script gathers AD information, user lists, trust relationships

---

## V. APT41 THREAT CONTEXT & TTP CORRELATION

### A. APT41 Profile (Per OPORD 26-02 Annex B)

**Threat Actor:** APT41 (Winnti Group / Blackfly) - State-sponsored PRC cyber espionage/crime group

**APT41 Capability:** Advanced persistent threat with sophisticated malware, zero-day exploitation, credential theft specialization

**Known APT41 Malware Families:**
- ShadowPad (modular backdoor - high likelihood for this scenario)
- Winnti variants (kernel-mode rootkits)
- Crosswalk (communications framework)
- DEADEYE loaders (malware delivery)
- KEYPLUG implants (persistence/credential access)
- Custom Cobalt Strike beacons
- PowerShell-based tools (T1059 consistent with this finding)

### B. APT41 TTPs Observed in Past Operations
- T1047: Windows Management Instrumentation (WMI) for lateral movement and persistence
- T1053: Scheduled Task/Job for persistence (highly consistent with PowerShell script on DC)
- T1059: PowerShell for execution (direct match)
- T1555: Credentials from Browser / Password Manager extraction
- T1187: Forced Authentication (possible Man-in-the-Middle)
- T1040: Network Sniffing (potential on DC)
- T1078: Valid Accounts (leveraging DC compromise for domain-wide persistence)

### C. lockfile.ps1 - APT41 Likelihood Assessment
- **Confidence:** MEDIUM-HIGH
  - PowerShell on DC is APT41 signature TTP
  - Naming convention ("lockfile") consistent with APT obfuscation
  - Discovery during threat hunting for APT41 presence
  - **HOWEVER:** Cannot confirm as APT41 without:
    - Static code analysis / IOC extraction
    - Malware family identification (ShadowPad, Winnti, etc.)
    - C2 callback analysis
    - Lateral movement confirmation

---

## VI. IMMEDIATE CONTAINMENT ACTIONS

### A. Actions Required (DCO-RA Authorities)
1. **Host Isolation** (Pending BPEnergy DC Criticality Coordination)
   - Risk: DC isolation will disrupt network services (authentication failures across BPEnergy)
   - Mitigation: Coordinate with BPEnergy OT leadership for emergency maintenance window
   - Timeline: Execute during low-traffic period if possible (but not delayed if active threat activity detected)

2. **Forensic Collection** (Priority 1)
   - Collect lockfile.ps1 binary and associated artifacts
   - Preserve registry artifacts (scheduled tasks, run keys, WMI subscriptions)
   - Collect Windows Security/System event logs
   - Preserve process history and parent-child process relationships
   - Collect PowerShell execution history / ScriptBlock logging

3. **Initial Containment** (Immediate)
   - ✅ Document finding (this report)
   - ✅ Create incident tracking (POAM-001)
   - ⏳ Disable any scheduled tasks referencing lockfile.ps1
   - ⏳ Block C2 communication (if identified during analysis)
   - ⏳ Reset domain service account credentials (if credential compromise confirmed)

### B. Authorization Requirements
Per OPORD 26-02 Annex L (Authorities & ROE):
- **Authority:** DCO-RA pre-authorized for domain controller compromise with confirmed malicious activity (PID met: suspicious PowerShell on DC)
- **Approval Chain:** MAJ Manbear (Mission OIC) → LTC Jackson (Battalion Commander) notification
- **Coordination:** ARCYBER notification required within 1 hour (CRITICAL finding)
- **BPEnergy Coordination:** System Owner and OT Leadership coordination for DC isolation impact

---

## VII. INVESTIGATION PLAN

### A. Phase 1: Forensic Analysis (Target Completion: 2026-02-24 06:00 UTC)
**Owner:** CPT 173 Host Analysis Team

1. **Static Analysis**
   - Extract lockfile.ps1 binary
   - Calculate cryptographic hashes (MD5, SHA256, SSDEEP)
   - Upload to VirusTotal for IOC matching
   - Deobfuscate PowerShell code (if obfuscated)
   - Scan with Yara rules for APT41 malware families
   - Extract IOCs (C2 IPs/domains, registry paths, file paths)

2. **Code Review**
   - Manual review of PowerShell code for:
     - Credential access mechanisms
     - C2 callback patterns
     - Lateral movement commands
     - Persistence installation logic
     - Anti-forensics / log deletion
   - Identify imported modules and framework usage
   - Determine if script is installer, loader, or backdoor

3. **Timeline Analysis**
   - File system metadata: Creation, modification, access times
   - Windows Event Logs: Process execution, scheduled task creation, WMI events
   - PowerShell execution history (PSReadline, ScriptBlock logs)
   - Registry modification timestamps for persistence mechanisms

### B. Phase 2: Scope Determination (Target Completion: 2026-02-24 18:00 UTC)
**Owner:** CPT 173 Host Analysis + S-2 Intelligence

1. **Lateral Movement Assessment**
   - Analyze network logs for dc2: outbound connections, SMB sessions, RDP sessions
   - Identify other systems dc2 connected to (potential staging points)
   - Check for lateral movement indicators (pass-the-hash, credential reuse)

2. **Credential Compromise Assessment**
   - If credential access detected in script, determine compromised accounts
   - Check for reuse of DC service accounts across other systems
   - Monitor for unauthorized activity using compromised credentials

3. **Persistence Mechanism Scope**
   - Identify all scheduled tasks on dc2
   - Scan registry for suspicious run keys, scheduled task triggers, WMI subscriptions
   - Check for additional attacker tools/implants on dc2

### C. Phase 3: Threat Intelligence & Attribution (Target Completion: 2026-02-25 12:00 UTC)
**Owner:** S-2 Intelligence Analyst + CPT 174 Malware Team

1. **IOC Correlation**
   - Match extracted IOCs against known APT41 IOC lists
   - Check MITRE ATT&CK for TTP pattern matching
   - Cross-reference with CISA/FBI APT41 alerts

2. **Malware Family Identification**
   - If binary executable extracted, submit to:
     - Ghidra / IDA Pro for reverse engineering
     - Cuckoo Sandbox for dynamic analysis
   - Identify malware family: ShadowPad, Winnti, DEADEYE, KEYPLUG, or unknown variant

3. **Confidence Assessment**
   - Confirm/deny APT41 attribution based on:
     - IOC matches to known APT41 infrastructure
     - Malware family identification
     - TTP correlation with known APT41 patterns
     - Targeting/mission correlation

---

## VIII. EXPECTED FINDINGS & NEXT STEPS

### A. Likely Discovery Paths
1. **If C2 Callback Found:**
   - Escalate to CRITICAL +1 level
   - Activate Network Analysis team for C2 traffic correlation
   - Extended monitoring for lateral movement

2. **If Credential Compromise Confirmed:**
   - Force credential reset for all DC service accounts
   - Monitor for unauthorized use of compromised accounts
   - Activate POAM-003 (Credential Compromise Remediation)

3. **If Lateral Movement Detected:**
   - Expand forensic scope to affected systems
   - Map full compromise chain
   - Escalate incident scope significantly

### B. Success Criteria
- **Analysis Complete:** Full code review, IOC extraction, malware family identification
- **Scope Determined:** All affected systems and compromised credentials identified
- **Attribution Confirmed:** APT41 confirmed or alternative threat actor identified
- **Remediation Ready:** Eradication plan prepared for POAM-002 execution

---

## IX. REPORTING & ESCALATION

### A. Immediate Notification (Within 1 hour per OPORD 26-02)
**Recipients:**
- ✅ BPEnergy CIO (System owner notification required)
- ✅ BPEnergy Security Leadership
- ✅ MAJ Manbear (Mission OIC)
- ✅ LTC Jackson (Battalion Commander)
- ✅ ARCYBER Operations (Higher HQ)

**Message:** CRITICAL incident report - lockfile.ps1 on dc2. Investigation initiated. Updates every 12 hours or upon status change.

### B. Daily SITREP Integration
- This incident will be briefed in daily SITREP (1600 UTC)
- Status updates provided with each milestone completion
- Weekly summary will include investigation progress

### C. Final Incident Report
- Upon investigation completion, final incident report will document:
  - Confirmed malware/threat actor identification
  - Affected systems and scope
  - Timeline of compromise
  - Root cause analysis
  - Remediation actions taken

---

## X. REFERENCES & SUPPORTING DOCUMENTATION

**OPORD References:**
- OPORD 26-02 Main Body (Mission, Situation, Execution)
- Annex B (Intelligence - APT41 Threat Model)
- Annex J (Cyber Technical Procedures)
- Annex K (Incident Response Playbooks)
- Annex L (Authorities & ROE)

**Doctrine References:**
- ADP 5-0 (Operations Process)
- FM 3-12 (Cyberspace Operations)
- ATP 3-12.3 (Cyberspace Operations Techniques)

**MITRE ATT&CK Mappings:**
- T1053: Scheduled Task/Job
- T1547: Boot or Logon Autostart Execution
- T1059: Command and Scripting Interpreter
- T1140: Deobfuscate/Decode Files or Information
- T1074: Data Staged in Local System

**External Intelligence:**
- MITRE ATT&CK APT41 Group Profile
- CISA/FBI APT41 Alerts and Advisories
- BPEnergy Network Architecture Documentation (SUPPORTING_DOCS/)
- APT41 Threat Profile (SUPPORTING_DOCS/APT41_Threat_Profile.md)

**Related POAMs:**
- [POAM-001: lockfile_Investigation](../../POAMs/POAM-001_lockfile_Investigation.md) 🔴 CRITICAL - IN PROGRESS
- [POAM-002: lockfile_Remediation](../../POAMs/POAM-002_lockfile_Remediation.md) - Awaiting Phase 1 Results

---

## XI. INCIDENT CLOSURE CRITERIA

This incident will be considered CLOSED when:
1. ✅ Malware identified and classified
2. ✅ All affected systems identified and remediated
3. ✅ Eradication verified (no persistence mechanisms remain)
4. ✅ Detection rules deployed to prevent recurrence
5. ✅ 30-day post-incident monitoring period completed with zero recurrence
6. ✅ Post-Action Review (PAR) conducted and documented

---

**Classification:** UNCLASSIFIED // FOUO

**Report Status:** INVESTIGATION IN PROGRESS 🔴 CRITICAL

**Next Update:** 2026-02-24 06:00 UTC (Forensic Analysis Completion Target)

**Prepared By:** CPT 173 / CyberOpsPlanner

**Date Prepared:** 2026-02-23

**Approved By:** [MAJ Manbear / Mission OIC - Pending]

---

## CRITICAL - TRACKER REFERENCES

- **POAM Tracker:** [POAM_Tracker_2026-02-23.md](../../POAMs/POAM_Tracker_2026-02-23.md)
- **Operation README:** [README.md](../../README.md)
- **Operations Index:** [OPERATIONS_INDEX.md](../../OPERATIONS_INDEX.md)
