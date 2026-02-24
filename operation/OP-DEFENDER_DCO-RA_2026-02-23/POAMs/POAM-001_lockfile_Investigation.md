# POAM-001: lockfile.ps1 Investigation

**Investigation, Forensic Analysis, and Threat Intelligence of Suspicious PowerShell Script**

---

## POAM METADATA

**POAM ID:** OP-DEFENDER-POAM-001

**POAM Title:** Investigate and Analyze Suspicious PowerShell Script (lockfile.ps1) on Host dc2

**Priority:** 🔴 CRITICAL

**Created:** 2026-02-23 (Time TBD)

**Created By:** CPT 173 Host Analysis Team / CyberOpsPlanner

**Status:** 🟡 IN PROGRESS

**Target Completion:** 2026-02-24 18:00 UTC (36-hour investigation window)

**Finding Reference:** INCIDENT-001 (Incident Report)

**Related POAM:** POAM-002 (Remediation - depends on this POAM completion)

---

## FINDING DETAILS

**Finding Type:** 🔴 CRITICAL - Suspicious File / Potential Malware / APT41 Persistence Indicator

**Finding Classification:** [Per CyberPlanner POAM System]
- **Base Category:** Malware Infection
- **Enhanced Category:** Malware + Persistence Mechanism
- **Risk Score:** CRITICAL (Base Score 9.0+)
  - Affected Asset Criticality: Domain Controller (CRITICAL infrastructure)
  - Attack Vector: Local - script execution on DC
  - Threat Likelihood: HIGH (APT41 context, PowerShell on DC signature)
  - Potential Impact: Network-wide compromise

**Finding Description:**
Suspicious PowerShell script file named "lockfile.ps1" discovered on host dc2 (Domain Controller) during initial threat hunting for APT41 presence. File exhibits characteristics consistent with APT41 persistence mechanisms including scripted scheduled task creation, registry modification, or WMI subscription installation. Script execution context and DCs are not typical locations for user-created PowerShell scripts, indicating likely malware or attacker-installed persistence tool.

**Threat Actor:** APT41 (State-sponsored PRC group - confidence pending analysis)

**Suspected Malware Families:** ShadowPad, Winnti variants, DEADEYE loaders, or custom Cobalt Strike beacons

**MITRE ATT&CK Tactics (Suspected):**
- T1053: Scheduled Task/Job (likely persistence mechanism)
- T1547: Boot or Logon Autostart Execution (possible WMI subscription)
- T1059: Command and Scripting Interpreter (PowerShell execution)
- T1197: Credentials from Password Store (possible credential harvesting)

---

## SCOPE & AFFECTED SYSTEMS

**Primary Affected Host:**
- Hostname: dc2
- Function: Domain Controller / Authentication Server
- Environment: BPEnergy Enterprise IT (SI-EN)
- OS: Windows Server [Version to determine]
- Criticality: CRITICAL (DC compromise = network-wide compromise)

**Secondary Scope (if DC fully compromised):**
- BPEnergy Domain: 500+ corporate user endpoints
- Azure AD Services: Hybrid identity compromise
- OT/Manufacturing Systems: Potential lateral movement path
- Cloud Services: Azure Government / AWS GovCloud identity tokens at risk

**Mission Impact:**
- 🔴 CRITICAL - DC compromise could give APT41 persistent access to all BPEnergy systems
- Threat to DoD-critical production support mission
- Threat to 125,000+ citizens and dozens of CI facilities supported by BPEnergy

---

## INVESTIGATION PLAN & MILESTONES

### Milestone 1: Forensic Collection & Static Analysis
**Status:** 🟡 IN PROGRESS

**Target Completion:** 2026-02-23 18:00 UTC (12 hours)

**Owner:** CPT 173 Host Analysis Team

**Tasks:**
1. **Forensic Collection** (Priority 1)
   - [ ] Capture lockfile.ps1 binary using write-blocking forensic procedures
   - [ ] Document file system metadata (creation date, modification date, access date)
   - [ ] Calculate cryptographic hashes: MD5, SHA256, SSDEEP, fuzzy hash
   - [ ] Preserve Windows registry: task scheduler keys, run keys, WMI subscriptions
   - [ ] Collect Windows Security/System event logs (7-day window minimum)
   - [ ] Preserve PowerShell execution history (PSReadline, ScriptBlock logging)
   - [ ] Collect process telemetry (parent-child relationships, command line args)

2. **Static Analysis** (Priority 1)
   - [ ] Extract lockfile.ps1 source code
   - [ ] Submit to VirusTotal for IOC matching and malware family identification
   - [ ] Scan with YARA rules for known APT41 malware patterns
   - [ ] Deobfuscate PowerShell code (if obfuscated with encoding/compression)
   - [ ] Extract IOCs:
     - [ ] C2 IP addresses / domains / URLs
     - [ ] File paths and registry paths
     - [ ] Service names and scheduled task names
     - [ ] User accounts and credential patterns
   - [ ] Identify PowerShell modules imported (System.Management.Automation, etc.)
   - [ ] Check for known malware signatures (ShadowPad, Winnti, DEADEYE patterns)

3. **Preliminary Code Review** (Priority 2)
   - [ ] Manual review of PowerShell script for:
     - [ ] Credential access mechanisms (lsass.exe, registry credential access, WMI calls)
     - [ ] C2 callback patterns (HTTP requests, DNS queries, SMB named pipes)
     - [ ] Lateral movement commands (SMB connections, RDP, WinRM, Kerberos)
     - [ ] Persistence installation (scheduled tasks, registry run keys, WMI subscriptions)
     - [ ] Anti-forensics / log deletion commands
     - [ ] Privilege escalation techniques
   - [ ] Determine if script is: installer, loader, backdoor, or reconnaissance tool

**Success Criteria:**
- Forensic artifacts collected and documented
- IOCs extracted and correlated against threat intelligence
- Preliminary malware family hypothesis developed
- No evidence lost or contaminated

**Estimated Effort:** 8-10 hours

---

### Milestone 2: Malware Family Identification & Advanced Analysis
**Status:** ⏳ AWAITING Milestone 1 Completion

**Target Completion:** 2026-02-24 06:00 UTC (24 hours from start)

**Owner:** CPT 174 Malware Analysis Team

**Tasks:**
1. **Dynamic Analysis** (If executable component identified)
   - [ ] Deploy lockfile.ps1 to isolated Cuckoo Sandbox environment
   - [ ] Monitor execution behavior: network connections, registry modifications, file operations
   - [ ] Document C2 callbacks, data exfiltration attempts
   - [ ] Capture network traffic and process execution telemetry

2. **Reverse Engineering** (If packed/obfuscated)
   - [ ] Use Ghidra/IDA Pro for binary disassembly (if compiled executable)
   - [ ] Analyze PowerShell AST (Abstract Syntax Tree) if heavily obfuscated
   - [ ] Identify encryption/encoding mechanisms
   - [ ] Extract configuration strings and hardcoded IOCs

3. **Malware Family Confirmation**
   - [ ] Match IOCs and behavior against known APT41 malware families:
     - [ ] ShadowPad: Check for DLL injection, kernel-mode hooking, multi-staged loading
     - [ ] Winnti: Check for game-themed file paths, credential stealing, rootkit behavior
     - [ ] DEADEYE: Check for downloader characteristics, secondary payload installation
     - [ ] KEYPLUG: Check for keylogging, credential harvesting, persistence mechanisms
     - [ ] Custom Cobalt Strike: Check for Team Server indicators, C2 beacon patterns
   - [ ] If unknown: Submit to MITRE, CISA, and external threat intelligence partners

4. **Timeline Reconstruction**
   - [ ] File system timeline: Creation, installation date, modification history
   - [ ] Execution timeline: First execution, frequency, last execution
   - [ ] Persistence timeline: When persistence mechanism installed, when active
   - [ ] Likely compromise window (weeks, months, or years possible)

**Success Criteria:**
- Malware family identified OR marked as "Unknown/Custom variant"
- Execution timeline established with forensic confidence
- IOCs extracted and validated
- APT41 attribution assessment (Confirmed / Likely / Possible / Unlikely)

**Estimated Effort:** 12-16 hours

---

### Milestone 3: Scope Assessment & Lateral Movement Analysis
**Status:** ⏳ AWAITING Milestone 2 Completion

**Target Completion:** 2026-02-24 18:00 UTC (36 hours from start)

**Owner:** CPT 173 Host Analysis + Network Analysis teams

**Tasks:**
1. **dc2 Lateral Movement Assessment**
   - [ ] Analyze network logs for dc2 (past 30 days minimum)
     - [ ] Outbound connections: Destination IPs, ports, protocols
     - [ ] SMB sessions initiated from dc2
     - [ ] RDP sessions from dc2
     - [ ] WinRM sessions from dc2
     - [ ] SSH/other remote access from dc2
   - [ ] Identify other hosts dc2 connected to
   - [ ] Check for pass-the-hash attacks (NTLM relay, credential reuse)
   - [ ] Identify potential staging points or lateral movement targets

2. **Affected System Identification**
   - [ ] If credential access detected in lockfile.ps1:
     - [ ] Identify compromised accounts (DC service accounts, admin accounts)
     - [ ] Search for reuse of these credentials on other systems
     - [ ] Monitor for unauthorized activity using compromised credentials
   - [ ] If persistence mechanisms detected:
     - [ ] Scan all servers in domain for similar scheduled tasks/WMI subscriptions
     - [ ] Check for lateral movement to OT/ICS systems
     - [ ] Check for lateral movement to cloud management systems

3. **Scope Expansion Analysis**
   - [ ] Determine if compromise is limited to dc2 or network-wide
   - [ ] Identify all systems that require forensic analysis and remediation
   - [ ] Assess threat actor's probable next actions (data exfiltration, lateral movement, destructive actions)

4. **Credential Compromise Assessment** (High Priority)
   - [ ] If credential harvesting confirmed:
     - [ ] Identify all potentially compromised accounts
     - [ ] Check for unauthorized logins using these accounts
     - [ ] Flag for credential reset in POAM-002 remediation
   - [ ] If cloud token compromise possible:
     - [ ] Monitor Azure AD for suspicious activity
     - [ ] Check for unauthorized cloud API access

**Success Criteria:**
- Scope of compromise clearly defined
- All affected systems identified
- Lateral movement paths mapped
- Credential compromise scope understood
- Ready for remediation phase (POAM-002)

**Estimated Effort:** 10-12 hours

---

### Milestone 4: Intelligence Analysis & Attribution
**Status:** ⏳ AWAITING Milestone 3 Completion

**Target Completion:** 2026-02-24 18:00 UTC (Parallel with Milestone 3)

**Owner:** S-2 Intelligence Analyst

**Tasks:**
1. **Threat Intelligence Correlation**
   - [ ] Cross-reference all extracted IOCs against:
     - [ ] APT41 known infrastructure (IP addresses, domains)
     - [ ] APT41 malware family signatures
     - [ ] MITRE ATT&CK APT41 TTP patterns
     - [ ] CISA/FBI APT41 threat alerts
     - [ ] VirusTotal and AlienVault OTX reputation databases
   - [ ] Assess confidence level of APT41 attribution

2. **TTP Analysis**
   - [ ] Map observed techniques to MITRE ATT&CK framework
   - [ ] Compare with known APT41 TTP patterns from OPORD 26-02 Annex B
   - [ ] Identify any new or unusual techniques (potential zero-day, new capabilities)
   - [ ] Assess alignment with APT41 targeting profile (CI, defense contractors, IP theft)

3. **Attack Chain Reconstruction**
   - [ ] Establish initial access vector (spearphishing, watering hole, exploit, supply chain, etc.)
   - [ ] Map lateral movement and persistence installation
   - [ ] Identify suspected objectives (IP theft, reconnaissance, data exfiltration)
   - [ ] Timeline from initial compromise to detection

4. **Confidence Assessment**
   - [ ] CONFIRMED: IOCs match known APT41 infrastructure and/or malware family identified
   - [ ] LIKELY: TTP patterns align with APT41, but IOC attribution not definitive
   - [ ] POSSIBLE: Some TTP alignment, but attribution uncertain
   - [ ] UNLIKELY: Evidence points to non-APT41 threat actor

**Success Criteria:**
- Attribution assessment completed
- Threat intelligence fully integrated
- Incident intelligence report ready for commander briefing

**Estimated Effort:** 6-8 hours

---

## INVESTIGATION RISKS & MITIGATIONS

**Risk 1: Destructive Malware**
- **Risk:** lockfile.ps1 could trigger destructive actions if analyzed incorrectly
- **Mitigation:** All analysis conducted in isolated lab environment (Cuckoo Sandbox, forensic lab)
- **Mitigation:** No execution of extracted binaries on production systems
- **Mitigation:** Static analysis prioritized over dynamic analysis until code reviewed

**Risk 2: Evidence Contamination**
- **Risk:** Forensic procedures could contaminate or damage evidence
- **Mitigation:** Write-blocking forensic procedures mandatory
- **Mitigation:** Chain of custody documentation for all evidence
- **Mitigation:** Forensic work conducted by trained 17C analysts

**Risk 3: Data Exfiltration During Investigation**
- **Risk:** If malware is active during investigation, APT41 could exfiltrate data
- **Mitigation:** dc2 network isolation during investigation (per containment plan)
- **Mitigation:** Monitor for exfiltration indicators (DNS tunneling, HTTPS exfil, SMB traffic)
- **Mitigation:** Coordinate isolation timing with BPEnergy (avoid operational disruption where possible)

**Risk 4: Incomplete Scope Assessment**
- **Risk:** Missing affected systems could allow attacker to maintain persistence
- **Mitigation:** Comprehensive threat hunting across all three environments (SI-EN, cloud, OT)
- **Mitigation:** 30-day post-remediation monitoring to detect recurrence
- **Mitigation:** Detection rules deployed to catch similar patterns

---

## DEPENDENCIES & BLOCKERS

**External Dependencies:**
- BPEnergy system access and credentials (for forensic collection)
- BPEnergy network isolation coordination (for dc2 isolation)
- Malware analysis lab access (if reverse engineering needed)
- ARCYBER intelligence support (for threat intelligence correlation)

**Current Blockers:** NONE - All required resources are available and operational

**Potential Blockers:**
- If unknown/custom malware discovered: May require external malware analysis support (ARCYBER lab, third-party contractors)
- If extensive lateral movement detected: Scope expansion could delay investigation completion

---

## REPORTING & ESCALATION

**Daily Briefing:** Investigation progress briefed in daily SITREP (1600 UTC)

**Escalation Triggers:**
- If C2 callback activity detected → IMMEDIATE escalation to MAJ Manbear
- If network-wide scope confirmed → IMMEDIATE escalation to ARCYBER
- If credential compromise confirmed → IMMEDIATE credential reset coordination with BPEnergy

**Milestone Completion Notifications:**
- Milestone 1 Complete (2026-02-23 18:00): Forensic collection done, initial IOCs extracted
- Milestone 2 Complete (2026-02-24 06:00): Malware family identified or marked as unknown
- Milestone 3 Complete (2026-02-24 18:00): Affected systems and scope documented
- Investigation Complete (2026-02-24 18:00): Ready to transition to POAM-002 remediation

---

## SUCCESS CRITERIA

Investigation will be considered SUCCESSFUL when:
1. ✅ lockfile.ps1 binary fully analyzed and classified
2. ✅ Malware family identified (or documented as unknown/custom)
3. ✅ All IOCs extracted and correlated against threat intelligence
4. ✅ APT41 attribution assessed (Confirmed/Likely/Possible/Unlikely)
5. ✅ Scope of compromise documented (dc2 only or network-wide)
6. ✅ Lateral movement paths identified
7. ✅ Timeline of compromise established
8. ✅ Credential compromise scope understood
9. ✅ Ready for remediation phase (POAM-002 initiation approved)

---

## RESOURCES ALLOCATED

**Personnel:**
- CPT 173 Host Analysis Team Lead: [Name]
- Host Analysts (2-3 personnel): 24/7 rotation
- CPT 174 Malware Analyst: [Name]
- S-2 Intelligence Analyst: [Name]
- MOC Battle Captain (Coordination): [Name]

**Tools & Equipment:**
- Forensic collection tools (write-blockers, imaging tools)
- Analysis lab environment (Ghidra, IDA Pro, Cuckoo Sandbox)
- YARA rule database for APT41 malware families
- Threat intelligence platforms (VirusTotal, AlienVault OTX, internal repositories)
- Zeek/Suricata for network log analysis

**Estimated Total Effort:** 36-40 hours of analysis work (across 3 teams, compressed into 36-hour window)

---

## REFERENCES & SUPPORTING DOCUMENTATION

**Related Documents:**
- [Incident_Report_001_lockfile_ps1_dc2_2026-02-23.md](../Incident_Reports/Incident_Report_001_lockfile_ps1_dc2_2026-02-23.md) - Detailed incident report
- [APT41_Threat_Profile.md](../../SUPPORTING_DOCS/APT41_Threat_Profile.md) - Threat actor profile
- [OPORD 26-02 Annex B](../../SUPPORTING_DOCS/) - Intelligence assessment (APT41 TTPs)

**MITRE ATT&CK References:**
- APT41 Group Profile: https://attack.mitre.org/groups/G0096/
- T1053: Scheduled Task/Job: https://attack.mitre.org/techniques/T1053/
- T1547: Boot or Logon Autostart Execution: https://attack.mitre.org/techniques/T1547/
- T1059: Command and Scripting Interpreter: https://attack.mitre.org/techniques/T1059/

**Doctrine References:**
- ADP 5-0 (Operations Process)
- FM 3-12 (Cyberspace Operations)
- ATP 3-12.3 (Cyberspace Operations Techniques)

---

## TRACKER INFORMATION

**POAM Status:** IN PROGRESS 🟡

**Current Milestone:** 🟡 Milestone 1: Forensic Collection & Static Analysis (12 hours)

**Estimated Time to Completion:** 36 hours (2026-02-24 18:00 UTC)

**Next Milestone:** 🟡 Milestone 2: Malware Family Identification (Start 2026-02-24 06:00 UTC)

**Depends On:** None (primary investigation POAM)

**Blocks:** POAM-002 (Remediation - cannot execute until investigation complete)

---

**Classification:** UNCLASSIFIED // FOUO

**Created:** 2026-02-23

**Last Updated:** 2026-02-23

**POAM Status:** 🔴 CRITICAL - INVESTIGATION IN PROGRESS

**See:** [POAM_Tracker_2026-02-23.md](POAM_Tracker_2026-02-23.md) for summary status
