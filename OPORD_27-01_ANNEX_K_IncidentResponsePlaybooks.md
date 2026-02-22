# ANNEX K: INCIDENT RESPONSE PLAYBOOKS

**OPORD 27-01 | PEARL SENTINEL**
**CPT 173 DCO-RA Hawaii Incident Response Procedures**

---

## K.1 Playbook Overview

This annex provides step-by-step procedures for incident response teams to follow upon detection of APT43 malicious activity. All playbooks follow the same structure:

1. **Trigger Condition** — What detection/alert initiates the playbook
2. **Initial Triage** — Rapid assessment of threat level and scope
3. **Containment Actions** — Immediate steps to limit damage
4. **Deep Analysis** — Forensic investigation and root cause analysis
5. **Eradication & Recovery** — Malware removal and system restoration
6. **Verification & Lessons Learned** — Confirmation of effectiveness and process improvement

---

## K.2 Playbook 1: Credential Compromise Response

### K.2.1 Trigger Conditions

**Detection Sources (Any One Triggers Playbook):**
- SIEM alert: 5+ failed login attempts from unusual IP within 10 minutes
- EDR alert: Credential harvester malware detected (NALEPAY or similar)
- Manual discovery: Hunt identifies unusual credential access patterns
- External notification: CISA, FBI, or threat intel feed reports compromised credentials

---

### K.2.2 Initial Triage (Timeline: Immediate – 15 minutes)

**Step 1: Alert Confirmation**
- [ ] Verify alert source (SIEM, EDR, or manual discovery)
- [ ] Identify affected user account and system
- [ ] Determine account privilege level (regular user vs. admin vs. service account)
- [ ] Check for successful login post-compromise attempt

**Step 2: Scope Assessment**
- [ ] Query SIEM for all logins by compromised account in past 24 hours
- [ ] Identify all systems accessed with compromised credentials
- [ ] Check for lateral movement (RDP, SMB, WinRM) from compromised account
- [ ] Determine if credential is shared across multiple systems

**Step 3: Severity Determination**

| Severity | Criteria | Response Time |
|----------|----------|----------------|
| **CRITICAL** | Admin account + lateral movement detected + OT access attempted | IMMEDIATE (5 min) |
| **HIGH** | Service account OR >3 systems accessed with credentials | 15 minutes |
| **MEDIUM** | Regular user account, no lateral movement, <3 systems accessed | 30 minutes |
| **LOW** | Failed login attempts only, no successful access | 1 hour |

---

### K.2.3 Containment Actions (Timeline: 15-60 minutes)

**Immediate Actions (Execute within 15 minutes):**

1. **Credential Disablement**
   - [ ] Contact Active Directory administrator
   - [ ] Disable compromised user account (set "Account Disabled" flag)
   - [ ] Document time of disablement in case log
   - [ ] Notify user's manager and IT help desk of account lock

2. **Endpoint Isolation (If Credentials Harvested from Endpoint)**
   - [ ] Isolate affected system from network (disconnect network cable OR VPN disconnect)
   - [ ] Document isolation time in case log
   - [ ] Preserve forensic evidence before isolation (capture memory dump via EDR if possible)

3. **Password Reset & Notification**
   - [ ] Reset compromised account password (if appropriate — some service accounts may be application-dependent)
   - [ ] Notify user of compromise; direct to change passwords on other systems if same password reused
   - [ ] Provide credential reset assistance if needed

4. **Escalation Notification**
   - [ ] Notify CPT TL of confirmed credential compromise
   - [ ] Submit Incident Report to ARCYBER within 1 hour (see K.5)

---

### K.2.4 Deep Analysis (Timeline: 1-4 hours)

**Forensic Investigation:**

1. **Memory Dump Analysis (If Harvester Malware Detected)**
   - [ ] Obtain memory dump from affected system (via EDR endpoint isolation + imaging)
   - [ ] Extract process list, DLL imports, network connections
   - [ ] Search for credential harvester strings (NALEPAY, Mimikatz, etc.)
   - [ ] Identify C2 communication endpoints

2. **Process Execution Timeline**
   - [ ] Reconstruct process tree from affected system (parent → child relationships)
   - [ ] Identify malware execution timestamp and method (scheduled task? service? user action?)
   - [ ] Determine if malware auto-started or required user interaction

3. **Credential Theft Analysis**
   - [ ] Determine what credentials were stolen (domain creds? email? VPN? cloud?)
   - [ ] Check for credential reuse across accounts
   - [ ] Assess potential for lateral movement with stolen credentials

4. **C2 Communication Analysis**
   - [ ] Identify C2 server IP/domain from process memory
   - [ ] Search SIEM for all outbound connections to C2 IP/domain
   - [ ] Determine duration of C2 communication (when did beacon start? when stopped?)
   - [ ] Estimate data exfiltrated via C2 channel

---

### K.2.5 Eradication & Recovery (Timeline: 4-24 hours)

**Malware Removal:**

1. **If Harvester Malware Present on Endpoint**
   - [ ] Download latest malware removal tool (Windows Defender offline scanner, Kaspersky RescueDisk, etc.)
   - [ ] Boot affected system into safe mode or recovery environment
   - [ ] Execute full system scan with malware removal tool
   - [ ] Verify all detected malware removed (check scan logs)

2. **Registry & Persistence Cleanup**
   - [ ] Review Windows Event Log for suspicious scheduled tasks (Event ID 4697)
   - [ ] Delete any malicious scheduled tasks or services
   - [ ] Check registry for malicious Run keys (HKLM\Software\Microsoft\Windows\CurrentVersion\Run)
   - [ ] Remove any malicious registry entries

3. **Credential Rotation (Complete)**
   - [ ] Reset compromised account password a second time (post-malware removal)
   - [ ] If service account credentials stolen, rotate service account password and update all dependent services
   - [ ] Reset any cloud API keys or tokens that may have been accessed
   - [ ] Force re-authentication of any active sessions

4. **System Hardening**
   - [ ] Apply latest Windows security patches to affected system
   - [ ] Enable Windows Defender real-time protection
   - [ ] Configure Windows Firewall to block known C2 domains/IPs
   - [ ] Update EDR agent to latest version

---

### K.2.6 Verification & Lessons Learned (Timeline: 24-48 hours)

**Post-Incident Verification:**

- [ ] Monitor compromised account for 7 days — confirm no login attempts
- [ ] Monitor affected systems for suspicious process execution — confirm no re-infection
- [ ] Query SIEM for any additional systems accessed with stolen credentials
- [ ] Verify firewall rules blocking C2 communication are in place

**Lessons Learned (Within 3 Days):**

- [ ] Document findings in case log (what malware? how long was it present? what was stolen?)
- [ ] Update threat hunting rules based on discovered TTPs
- [ ] Brief team on lessons learned (if applicable to other systems)
- [ ] Recommend hardening actions to network owner (MFA enforcement? password policy update?)

---

## K.3 Playbook 2: Malware Detection & Containment

### K.3.1 Trigger Conditions

**Detection Sources:**
- EDR alert: Malware signature match (ShadowPad, Winnti, custom APT43 malware)
- SIEM alert: Behavioral anomaly detected (process injection, suspicious DLL loading, etc.)
- Manual discovery: Analyst identifies malware during threat hunt
- External notification: Threat intel feed reports new APT43 malware variant

---

### K.3.2 Initial Triage (Timeline: Immediate – 15 minutes)

**Step 1: Alert Verification**
- [ ] Confirm malware detection (check EDR alert confidence level)
- [ ] Identify affected system hostname, IP, user
- [ ] Determine malware family and hash (SHA-256)
- [ ] Check if malware is running or dormant

**Step 2: Impact Assessment**
- [ ] Check for network connections (C2 beaconing?)
- [ ] Determine if malware has persistence mechanisms (scheduled task? registry mod? service?)
- [ ] Check for credential access (LSASS access? browser credential theft?)
- [ ] Assess if malware is lateral movement tool (PsExec? WMI? RDP?)

**Step 3: Containment Decision**
- [ ] Is malware actively communicating with C2? → **IMMEDIATE CONTAINMENT**
- [ ] Is malware dormant but persistent? → **RAPID CONTAINMENT** (within 1 hour)
- [ ] Is malware staged but not yet executed? → **CONTROLLED ANALYSIS** (forensics first, then removal)

---

### K.3.3 Containment Actions (Timeline: 15-60 minutes)

**Immediate Host Isolation:**

1. **Network Disconnection**
   - [ ] Disconnect affected system from network (network cable OR VPN disconnect)
   - [ ] Document isolation time and reason in case log
   - [ ] Notify system owner and IT help desk of isolation

2. **Memory Capture (Pre-Isolation)**
   - [ ] If possible, capture memory dump via EDR BEFORE network disconnection
   - [ ] Preserve all running processes and network connections for analysis
   - [ ] Store memory dump on secure forensic workstation

3. **Escalation & Notification**
   - [ ] Notify CPT TL of confirmed malware detection
   - [ ] Prepare for potential forensic analysis (coordinate with Forensics Lead)
   - [ ] Submit Incident Report to ARCYBER within 1 hour

---

### K.3.4 Deep Analysis (Timeline: 2-6 hours)

**Malware Analysis & Attribution:**

1. **Static Analysis**
   - [ ] Hash malware sample (MD5, SHA-256)
   - [ ] Check against VirusTotal, MITRE ATT&CK, threat intel databases
   - [ ] Obtain binary properties (compilation date, sections, imports)
   - [ ] Check for known APT43 signatures or code similarities

2. **Dynamic Behavior Analysis**
   - [ ] Detonation in isolated sandbox (Cuckoo, CAPE, or similar)
   - [ ] Monitor process execution (API calls, network connections, file creation)
   - [ ] Identify C2 communication pattern (domain, port, encryption)
   - [ ] Document data exfiltration attempts (file types, volume)

3. **Advanced Analysis (If Required)**
   - [ ] Disassembly / reverse engineering (if simple sandboxing insufficient)
   - [ ] Decrypt or decode obfuscated strings and C2 commands
   - [ ] Identify malware variants (similar samples, code overlap)
   - [ ] Attribute to APT43 with confidence assessment

4. **C2 Infrastructure Analysis**
   - [ ] WHOIS lookup on C2 domain/IP
   - [ ] ASN analysis (hosting provider, geolocation)
   - [ ] Check for related domains/IPs (DNS sinkhole data, threat intel)
   - [ ] Determine if C2 is known APT43 infrastructure or new

---

### K.3.5 Eradication & Recovery (Timeline: 4-24 hours)

**Malware Removal:**

1. **Offline Malware Removal**
   - [ ] Boot system into safe mode or recovery environment
   - [ ] Execute Kaspersky Rescue Disk or similar comprehensive malware scanner
   - [ ] Remove all detected malware files and registry entries
   - [ ] Verify removal with clean boot and full system scan

2. **Persistence Mechanism Cleanup**
   - [ ] Remove scheduled tasks (review Event ID 4697 logs)
   - [ ] Remove Windows services (check SYSTEM hive registry)
   - [ ] Remove WMI event subscriptions (if applicable)
   - [ ] Check browser extensions and startup folders for malware

3. **System Restoration**
   - [ ] Apply latest Windows security patches
   - [ ] Update antivirus / EDR agent
   - [ ] Update browser plugins (Flash, Java, etc.)
   - [ ] Reset browser security settings and cached credentials

4. **Network Re-Connection**
   - [ ] Reconnect system to network (if deemed safe post-cleaning)
   - [ ] Monitor system for 24 hours for re-infection indicators
   - [ ] Update firewall rules to block identified C2 infrastructure

---

### K.3.6 Verification & Lessons Learned (Timeline: 24-48 hours)

**Post-Incident Verification:**

- [ ] Monitor affected system for 7 days — check for re-infection indicators
- [ ] Verify firewall rules blocking C2 are in place and effective
- [ ] Check other systems on same network for similar malware infections
- [ ] Verify all persistence mechanisms removed (clean reboot, check startup locations)

**Lessons Learned & Updates:**

- [ ] Update SIEM detection rules with new malware hashes and behavioral signatures
- [ ] Update EDR detection profiles with new malware variant
- [ ] Brief team on malware analysis findings (TTPs, C2 patterns, etc.)
- [ ] Share findings with NSA, FBI, CISA for broader threat intelligence

---

## K.4 Playbook 3: Lateral Movement Containment

### K.4.1 Trigger Conditions

**Detection Sources:**
- SIEM alert: Unusual RDP/SMB/WinRM connections between systems
- EDR alert: Process creation with admin credentials from unexpected system
- Manual discovery: Analyst identifies lateral movement during threat hunt
- Network detection: Zeek/Suricata IDS alert on SMB/RDP attack traffic

---

### K.4.2 Initial Triage (Timeline: Immediate – 15 minutes)

**Step 1: Connection Verification**
- [ ] Identify source system (attacker) and destination system (target)
- [ ] Determine connection type (RDP, SMB, WinRM, SSH, etc.)
- [ ] Check if connection is legitimate (user, service account, or malicious?)
- [ ] Verify authentication method (credentials used? tokens? Kerberos?)

**Step 2: Scope Assessment**
- [ ] Query SIEM for all connections FROM source system (lateral movement chain?)
- [ ] Identify all systems accessed via lateral movement
- [ ] Check for admin/service account credential reuse
- [ ] Determine if connection led to malware execution on destination

**Step 3: Target System Criticality**
- [ ] Is target system critical (domain controller? cloud tenant? OT network gateway?)
- [ ] Determine potential data accessible from target system
- [ ] Assess impact if target system fully compromised

---

### K.4.3 Containment Actions (Timeline: 15-60 minutes)

**Source System Isolation:**

1. **Isolate Source System (Attacker Origin)**
   - [ ] Disconnect source system from network immediately
   - [ ] Preserve memory dump (capture before isolation if possible)
   - [ ] Document isolation time and reason in case log

2. **Target System Hardening**
   - [ ] If target system NOT yet compromised: Monitor for persistence indicators
   - [ ] If target system compromised: Isolate target system as well
   - [ ] Reset credentials for all admin accounts used in lateral movement
   - [ ] Force logout of all active sessions on target system

3. **Firewall Rules**
   - [ ] Block lateral movement traffic: source IP → destination IP
   - [ ] Block lateral movement protocol ports (SMB 445, RDP 3389, WinRM 5985-5986)
   - [ ] Implement network micro-segmentation if not already in place

4. **Escalation Notification**
   - [ ] Notify CPT TL of confirmed lateral movement
   - [ ] If target is critical system: Escalate to Battalion CDR and ARCYBER
   - [ ] If target is OT network: Immediate escalation to HECO and SEMA

---

### K.4.4 Deep Analysis (Timeline: 2-4 hours)

**Attack Chain Reconstruction:**

1. **Source System Analysis**
   - [ ] Obtain memory dump from source system
   - [ ] Identify malware/tool used for lateral movement (PsExec? WMI? RDP?)
   - [ ] Reconstruct process execution chain
   - [ ] Identify credentials or tokens used for authentication

2. **Network Traffic Analysis**
   - [ ] Capture full network traffic (pcap) of lateral movement attempt
   - [ ] Analyze SMB/RDP/WinRM protocol details
   - [ ] Identify credentials transmitted in clear text (if any)
   - [ ] Check for credential relay attacks (Responder, Hashcat)

3. **Target System Forensics (If Compromised)**
   - [ ] Check for persistence mechanisms on target system
   - [ ] Identify files/data accessed or exfiltrated via lateral movement
   - [ ] Determine if malware was deployed to target system
   - [ ] Assess if lateral movement led to further compromise (privilege escalation, persistence)

---

### K.4.5 Eradication & Recovery (Timeline: 4-24 hours)

**Comprehensive Remediation:**

1. **Source System Cleanup**
   - [ ] Remove malware / lateral movement tools from source system
   - [ ] Clean registry, scheduled tasks, services of persistence mechanisms
   - [ ] Update patches and security software
   - [ ] Re-image if comprehensive compromise suspected

2. **Credential Reset & Authentication Hardening**
   - [ ] Reset ALL admin account passwords used in lateral movement
   - [ ] Implement MFA for admin accounts
   - [ ] Revoke any Kerberos tickets that may have been stolen
   - [ ] Rotate service account passwords

3. **Network Segmentation Improvements**
   - [ ] Implement network access controls (if not already in place)
   - [ ] Restrict lateral movement paths between network segments
   - [ ] Deploy host-based firewall rules limiting SMB/RDP/WinRM
   - [ ] Monitor for re-attempted lateral movement

4. **System Restoration**
   - [ ] Reconnect systems to network (post-cleaning verification)
   - [ ] Update EDR/SIEM detection rules for lateral movement patterns
   - [ ] Verify connectivity and baseline operation restored

---

### K.4.6 Verification & Lessons Learned (Timeline: 24-48 hours)

- [ ] Monitor source and destination systems for 7 days for re-exploitation
- [ ] Verify firewall rules blocking lateral movement are effective
- [ ] Check for similar lateral movement patterns from other compromised systems
- [ ] Brief team on attack chain and lateral movement techniques used by APT43

---

## K.5 Incident Report Template

**Format:** Standardized incident report delivered to ARCYBER within 1 hour of confirmation.

```
INCIDENT REPORT — OPORD 27-01 PEARL SENTINEL

INCIDENT ID: [OPORD-2026-001-001]
REPORT DATE/TIME: [DTG]
REPORTING OFFICER: CPT [Name], CPT 173 Team Lead

1. EXECUTIVE SUMMARY (BLUF)
   - Incident type: [Credential compromise / Malware / Lateral movement / Other]
   - Affected systems: [System names/IPs]
   - APT43 attribution confidence: [High / Medium / Low]
   - Containment status: [Contained / Ongoing / Unknown]
   - Escalation: [Yes / No; if yes, what level and to whom]

2. INCIDENT TIMELINE
   - Detection time: [DTG]
   - Confirmation time: [DTG]
   - Initial containment time: [DTG]
   - Forensic analysis start: [DTG]

3. TECHNICAL DETAILS
   - Malware hash (if applicable): [SHA-256]
   - Malware family: [Family name]
   - C2 infrastructure: [IP/domain]
   - Credentials compromised: [Account names, privilege level]
   - Systems affected: [Count, impact]

4. INDICATORS OF COMPROMISE (IOCs)
   - File hashes (executables, DLLs): [SHA-256]
   - C2 IP addresses: [IPs with ASN/country]
   - C2 domains: [FQDNs]
   - Network signatures: [Zeek/Suricata alert descriptions]

5. ATTRIBUTION ASSESSMENT
   - APT43 TTP correlation: [Which ATT&CK techniques matched]
   - Confidence level: [High / Medium / Low with justification]
   - Supporting evidence: [Malware overlap with known APT43 samples? C2 infrastructure? TTPs?]

6. CONTAINMENT ACTIONS TAKEN
   - Immediate actions: [Credentials reset? Systems isolated?]
   - Pre-authorized DCO-RA actions: [Which actions were executed]
   - Additional actions requiring approval: [If any]

7. FORENSIC FINDINGS
   - Malware behavior: [Command/control, persistence, data exfiltration]
   - Data compromised/accessed: [What data? By what method?]
   - Estimated impact: [Data sensitivity, affected users/systems]

8. RECOMMENDED ACTIONS
   - Immediate: [Patches? Firewall rules? Credential resets?]
   - Short-term: [Network segmentation? MFA deployment?]
   - Long-term: [Architecture changes? Hardening recommendations?]

9. DISTRIBUTION
   Recipient: ARCYBER, FBI Cyber, NSA Hawaii Liaison, CISA Regional, Battalion CDR
```

---

## K.6 Post-Incident Procedures

### K.6.1 Debrief & Lessons Learned (Day 3 Post-Incident)

**Team Meeting (All CPT 173 Staff):**

1. **What Happened?**
   - Chronological walkthrough of incident detection through resolution
   - What we did right? What could we improve?

2. **Technical Findings**
   - Malware analysis results
   - Attack chain reconstruction
   - Attribution assessment

3. **Process Improvements**
   - Update threat hunting rules based on discovered TTPs
   - Improve detection logic for future similar incidents
   - Training needs identified for team members

4. **Documentation Updates**
   - Update this annex based on lessons learned
   - Refine playbook steps that didn't work well
   - Add new indicators/signatures to detection rule library

---

### K.6.2 Intelligence Update & Dissemination

**Battalion S2 Briefing (Day 3):**

- Malware analysis findings
- C2 infrastructure assessment
- Attribution confidence and supporting evidence
- Recommended intelligence sharing (CISA alert? Sector-wide warning?)

**External Sharing (Day 3-5):**

- Share IOCs with FBI Cyber (if law enforcement coordination)
- Share findings with NSA (classified briefing via liaison)
- Share unclassified indicators with CISA for sector-wide dissemination
- Coordinate with threat intelligence community for malware identification

---

**RESPONSIBLE OFFICER:** IR Lead (SSG)

**APPROVED BY:** CPT 173 Team Lead + Battalion CDR

