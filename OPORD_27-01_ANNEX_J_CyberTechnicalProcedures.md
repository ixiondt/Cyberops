# ANNEX J: CYBER TECHNICAL PROCEDURES

**OPORD 27-01 | PEARL SENTINEL**
**CPT 173 DCO-RA Hawaii**

---

## J.1 Threat Hunting Procedures

### J.1.1 Hunt Hypothesis Framework

**Format:** Each hypothesis follows this structure:

1. **Hypothesis Title** — Brief description of what we're hunting for
2. **APT43 TTP Source** — Which MITRE ATT&CK technique(s) this targets
3. **Detection Logic** — How will we identify this activity in logs?
4. **SIEM Query** — Specific Splunk/ELK query to execute
5. **Expected Result** — What a true positive looks like
6. **False Positive Risk** — Common false positives to exclude
7. **Follow-Up Actions** — If found, what's the next step?

---

### J.1.2 Daily Hunt Hypotheses (Standard Package)

**Hunt 1: Credential Anomaly Detection**
- **TTP Source:** T1078 (Valid Accounts), T1110 (Brute Force)
- **Detection Logic:** Multiple failed login attempts from single IP, unusual login time/location, MFA bypass attempts
- **SIEM Query:** `index=authentication attempt=failed source_ip!=trusted_range | stats count by source_ip, user | where count > 10`
- **Expected Result:** Failed logins from non-DoD IP ranges (0-5 expected; >10 = suspicious)
- **Follow-Up:** Cross-reference source IP with threat intel; check for successful login post-failures

---

**Hunt 2: C2 Beaconing Detection**
- **TTP Source:** T1071 (Application Layer Protocol), T1048 (Exfiltration Over Alternative Protocol)
- **Detection Logic:** Periodic outbound connections to same destination; TLS certificate anomalies; DNS query patterns
- **SIEM Query:** `index=network dest_port=443 | stats count, distinct(dest_ip), distinct(src_ip) by dest_ip | where count > 100 AND distinct_dest_ip=1`
- **Expected Result:** Regular periodic connections to single IP (every 5-60 minutes)
- **Follow-Up:** Capture network traffic; analyze certificate; perform WHOIS/ASN lookup on destination

---

**Hunt 3: Lateral Movement Detection**
- **TTP Source:** T1570 (Lateral Tool Transfer), T1570 (Lateral Movement)
- **Detection Logic:** Unusual SMB, RDP, or WinRM connections between systems; access to admin shares
- **SIEM Query:** `index=network protocol=smb OR protocol=rdp | search access=admin$ OR access=c$ | stats count by src_ip, dest_ip, user`
- **Expected Result:** Legitimate lateral movement traffic known from baseline
- **Follow-Up:** Check destination system for persistence indicators; perform memory imaging if compromised

---

**Hunt 4: Persistence Mechanism Detection**
- **TTP Source:** T1053 (Scheduled Task), T1547 (Boot or Logon Autostart Execution), T1547.01 (Registry Run Keys)
- **Detection Logic:** New scheduled tasks, service installations, WMI event subscriptions
- **SIEM Query:** `index=endpoint event_id=4697 OR event_id=4688 (Image=*schtasks* OR Image=*sc.exe*) | search keywords NOT IN (approved_list)`
- **Expected Result:** Known legitimate scheduled tasks
- **Follow-Up:** Examine task content; check if it downloads additional files; monitor for execution

---

**Hunt 5: Data Exfiltration Detection**
- **TTP Source:** T1041 (Exfiltration Over C2 Channel), T1537 (Transfer Data to Cloud Account)
- **Detection Logic:** Large file transfers to external IPs; uploads to cloud storage; suspicious traffic volume
- **SIEM Query:** `index=proxy bytes_out > 100000000 dest_domain NOT IN (approved_domains) | stats sum(bytes_out) by src_ip, dest_ip, dest_domain`
- **Expected Result:** Baseline file transfer volume (business normal)
- **Follow-Up:** Check file type and sensitivity; correlate with user activity; capture full session

---

**Hunt 6: Privilege Escalation Detection**
- **TTP Source:** T1558 (Steal or Forge Kerberos Tickets), T1187 (Forced Authentication), T1134 (Access Token Manipulation)
- **Detection Logic:** Kerberoasting activity, token theft, UAC bypass attempts
- **SIEM Query:** `index=endpoint EventCode=4769 OR EventCode=4624 AND LogonType=3 | search TargetUserName NOT IN (approved_service_accounts) | stats count by TargetUserName, LogonType`
- **Expected Result:** Known service account Kerberos activity
- **Follow-Up:** Validate service account usage; check for unusual authentication methods

---

**Hunt 7: OT Network Reconnaissance Detection**
- **TTP Source:** T1518 (Software Discovery), T1046 (Network Service Discovery)
- **Detection Logic:** Queries to OT network ranges, SCADA port scanning, engineering workstation access
- **SIEM Query:** `index=network (dest_ip=10.100.0.0/16 OR dest_port=502 OR dest_port=44818) src_ip NOT IN (approved_ot_access) | stats count by src_ip, dest_ip, dest_port`
- **Expected Result:** No queries to OT ranges from non-approved systems
- **Follow-Up:** **IMMEDIATE ESCALATION** to HECO; check source system for compromiseFollowup: IMMEDIATE ESCALATION

---

**Hunt 8: Defense Evasion Detection**
- **TTP Source:** T1070 (Indicator Removal on Host), T1202 (Indirect Command Execution), T1140 (Deobfuscation)
- **Detection Logic:** Log deletion, tool removal, suspicious PowerShell obfuscation, AV/EDR tampering
- **SIEM Query:** `index=endpoint EventCode=104 OR (Image=*powershell* CommandLine=*-enc* ) OR (Image=*taskkill* TargetImage=*MsMpEng*) | stats count by src_ip, user, Image`
- **Expected Result:** No evasion activity
- **Follow-Up:** Immediate host isolation; memory imaging; full forensic analysis

---

## J.2 Incident Response Playbook (Standard)

### J.2.1 Incident Confirmation Criteria

**Confirmed Malicious Activity Threshold:** 2+ independent detection sources OR 1 detection + forensic evidence

**Detection Sources:**
- SIEM alert (Splunk detection rule triggered)
- EDR alert (CrowdStrike alert + high confidence score)
- Network detection (Zeek/Suricata IDS alert)
- Manual hunt discovery (analyst-identified anomaly)
- Forensic artifact (malware sample, scheduled task, registry mod)

---

### J.2.2 Incident Response Timeline

| Stage | Timeline | Owner | Actions |
|-------|----------|-------|---------|
| **Detection & Alert** | Real-time | MOC Watch | SIEM/EDR trigger alert; human review within 5 minutes |
| **Initial Triage** | 5-15 min | Network Lead | Correlate alert with other data sources; determine if likely malicious |
| **Confirmation** | 15-30 min | Forensics Lead | Obtain forensic evidence (memory dump, process logs) confirming malicious activity |
| **Escalation** | 30 min | CPT TL | Notify Battalion CDR and ARCYBER S2/S3 of confirmed incident |
| **Preliminary Containment** | 30-60 min | IR Lead | Implement initial containment per approved playbook (credential reset, host isolation) |
| **Deep Analysis** | 1-4 hours | Forensics Lead | Malware analysis, C2 identification, artifact interpretation, attribution |
| **Eradication** | 4-24 hours | IR Lead + Network Lead | Remove malware, close persistence mechanisms, reset credentials, patch vulnerabilities |
| **Verification** | 24-48 hours | Network/Forensics Leads | Verify eradication effectiveness; monitor for re-infection indicators |
| **Reporting** | Within 1 hour of confirmation | CPT TL + Reporting NCO | Incident Report to ARCYBER, FBI, NSA, CISA |
| **Lessons Learned** | Within 3 days | CPT TL | Debrief with team; document findings; update hunting rules if needed |

---

### J.2.3 Pre-Incident Containment Playbook

**Trigger:** Confirmation of APT43 malware or persistence mechanism

**Pre-Authorized Actions (Execute without further approval):**
1. Disable compromised user credentials (contact AD admin)
2. Isolate affected host from network (disconnect network cable OR VPN disconnect)
3. Preserve forensic evidence (memory dump via EDR, process list, network connections)
4. Notify network owner (HECO/SEMA/DoD-IA) of compromised host

**Actions Requiring ARCYBER Approval (within 2 hours):**
1. Block C2 domain/IP at perimeter firewall
2. Revoke cloud API keys or service principal credentials
3. Expand containment to additional systems
4. Public notification or threat intel sharing

**OT-Specific Actions (Requires HECO Coordination):**
1. Do NOT automatically isolate OT systems
2. Contact HECO 24/7 OT escalation line immediately
3. Request mutual agreement before any OT actions
4. Coordinate timing to minimize operational impact

---

## J.3 Tool Specifications & Access Requirements

### J.3.1 SIEM (Splunk)

**Access Level:** Read-only to logs; no modification of production data

**Data Sources Ingested:**
- Firewall logs (Palo Alto Networks)
- Proxy logs (Blue Coat, Zscaler)
- DNS logs (enterprise DNS servers)
- Authentication logs (Active Directory, cloud IAM)
- Endpoint logs (CrowdStrike, Windows Event Forwarding)
- Network flow (NetFlow from routers/switches)

**Key Dashboards:**
- APT43 TTP Dashboard (malware hashes, C2 IPs, known indicators)
- Credential Anomaly Dashboard (failed logins, MFA failures, unusual logon times)
- Data Exfiltration Dashboard (outbound bytes by destination, large transfers)
- Lateral Movement Dashboard (SMB/RDP/WinRM traffic patterns)

---

### J.3.2 EDR (CrowdStrike Falcon)

**Access Level:** Read-only for analysis and investigation; no automation of remediation (manual approval required)

**Key Capabilities:**
- Process execution visibility (parent-child relationships, command-line arguments)
- Memory injection detection (DLL injection, process hollowing)
- Credential access detection (LSASS access, registry key querying)
- Behavioral indicators (anomalous process behavior, living-off-the-land tool usage)

**Key Dashboards:**
- Detections Dashboard (alert count, severity, top affected hosts)
- Process Execution Timeline (attack kill chain reconstruction)
- Threat Intelligence Integration (APT43 indicator correlation)

---

### J.3.3 Network Detection & Response (Zeek/Suricata)

**Access Level:** Read-only to network traffic logs; no modification of IDS signatures without change control

**Monitoring Coverage:**
- All inbound/outbound traffic (full packet capture at network TAP)
- DNS query logging (recursive resolvers)
- HTTPS certificate inspection (TLS certificate anomalies)
- Lateral movement detection (unusual east-west traffic)

---

## J.4 Forensic Procedures

### J.4.1 Memory Imaging

**Procedure:** Capture system RAM to external drive for offline analysis

**Tools:** FTK Imager (Windows), GDB (Linux)

**Output:** Memory dump file (4-16 GB typical); store on secure forensic workstation

**Analysis:** Malware string extraction, process tree reconstruction, C2 connection identification

---

### J.4.2 Log Collection & Analysis

**Windows Event Logs Collected:**
- Security (event ID 4624-4659: authentication, privilege escalation)
- System (event ID 7045: service installation)
- Application (error logs, warnings)
- PowerShell Operational (event ID 4100-4104: PowerShell execution)

**Analysis Tools:** Event Log Explorer, SIEM queries, manual timeline construction

---

## J.5 Approved External Coordination Points

### J.5.1 Law Enforcement (FBI Cyber)

**Point of Contact:** FBI Special Agent [TBD], Honolulu Field Office

**Information Sharing:**
- Incident reports (within 1 hour of confirmation)
- Forensic findings (within 24 hours)
- Attribution assessment (confidence level, supporting evidence)

**Coordination on Takedowns:** Federal law enforcement approval required before public attribution or C2 takedown

---

### J.5.2 Counterintelligence (NSA Liaison)

**Point of Contact:** NSA LTC [TBD], Hawaii Liaison Office

**Information Sharing:**
- Classified threat intelligence (via secure communications)
- Malware samples and analysis (via secure transfer)
- Attribution assessment (classified confidence levels)

---

### J.5.3 Critical Infrastructure (CISA)

**Point of Contact:** CISA Regional Incident Coordinator [TBD]

**Information Sharing:**
- Critical infrastructure threat notifications (sector-wide alerts)
- Vulnerability notifications affecting HECO or state systems
- Recommended mitigations for sector

---

**RESPONSIBLE OFFICER:** CPT 173 Team Lead

**APPROVED BY:** LTC [Battalion Commander]

