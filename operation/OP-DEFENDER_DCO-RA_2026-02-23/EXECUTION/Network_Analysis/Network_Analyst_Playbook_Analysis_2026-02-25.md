# 17C Network Analyst Playbook Analysis - Network Threat Assessment

**OP-DEFENDER DCO-RA Incident Response Analysis**
**BPEnergy Corporate Network - APT41 (Winnti Group) Activity**

---

## DOCUMENT METADATA

| Field | Value |
|-------|-------|
| **Analysis ID** | NET-ANALYSIS-2026-02-25-001 |
| **Operation** | OP-DEFENDER_DCO-RA_2026-02-23 |
| **Analyst Role** | 17C Network Analyst |
| **Classification** | UNCLASSIFIED // FOUO |
| **Date Prepared** | 2026-02-25 |
| **Source Data** | ManhattanProtocol.drawio (C:\Users\Avalon\Nextcloud\Projects\) |

---

## EXECUTIVE SUMMARY - NET ANALYST FINDINGS

**BLUF:** The BPEnergy network architecture reveals significant segmentation gaps that would enable APT41 lateral movement from the initial web server compromise to domain controllers and beyond. The discovered lockfile.ps1 on dc2 (172.17.2.6) aligns with APT41's TTP pattern of establishing persistence on domain infrastructure. The network topology lacks adequate monitoring controls (NIDS/NDR) and contains multiple lateral movement pathways via SMB, WinRM, and RDP.

**Critical Findings Summary:**
1. **High-Risk Network Segmentation Gap** - Engineered, Dev, Technical Analyst, and HR subnets all communicate freely to core servers without network controls
2. **Missing Detection Capabilities** - Only EDR sensors visible (Defender), no NIDS/NDR for network-based detection
3. **Lateral Movement Vulnerability** - Multiple unmonitored paths exist from dc2 to OT systems and external connections
4. **Data Exfiltration Pathway Identified** - clear path from compromised systems to internet via PFSense
5. **Single Point of Failure** - PFSense firewall represents single internet egress point

---

## PART I: NETWORK ARCHITECTURE SUMMARY

### A. Physical Layout Overview

The network diagram shows a **two-site architecture** with central infrastructure at Site 1 and distributed user workgroups at Site 2.

**Site 1 (Central Infrastructure):**
- Core network infrastructure concentrator
- Houses primary domain controllers, file servers, and perimeter security
- Connected to internet via PFSense firewall
- Primary connectivity to Site 2 via 172.17.0.x point-to-point links

**Site 2 (Distributed Workgroups):**
- Distributed user workgroup segments
- Hosts Technical Analysts, Developers, Engineers, Executives, HR, and Staff subnets
- Connected to Site 1 via redundant PFSense firewalls

### B. Subnet Inventory and Purposes

| Subnet | CIDR | Purpose | Hosts | Location |
|--------|------|---------|-------|----------|
| Management | 172.17.0.0/30 | Internet perimeter | 2 hosts | Site 1 |
| Core Routing | 172.17.0.12/30 | Internal routing | 2 hosts | Site 1 |
| ISP Uplink | 172.17.0.16/30 | ISP connection | 2 hosts | Site 1 |
| ISP Uplink 2 | 172.17.0.24/30 | Secondary ISP | 2 hosts | Site 1 |
| Core Servers | 172.17.0.20/30 | Server farm uplink | 2 hosts | Site 1 |
| Core Services | 172.17.1.0/24 | DNS, SMTP, Web | 254 hosts | Site 1 |
| File Servers | 172.17.2.0/24 | File storage, DCs | 254 hosts | Site 1 |
| Blue Team | 172.17.10.0/24 | Security team | 254 hosts | Site 2 |
| Executives | 172.17.6.0/24 | Executive staff | 254 hosts | Site 2 |
| HR | 172.17.7.0/24 | Human Resources | 254 hosts | Site 2 |
| Staff | 172.17.8.0/24 | General staff | 254 hosts | Site 2 |
| Engineers | 172.17.3.0/24 | Engineering team | 254 hosts | Site 2 |
| Developers | 172.17.4.0/24 | Development team | 254 hosts | Site 2 |
| Technical Analysts | 172.17.5.0/24 | Technical analysts | 254 hosts | Site 2 |

### C. Core Network Devices and Infrastructure

**PFSense Firewalls:**
- **PFSense 1** (172.17.0.12/30) - Site 1 perimeter firewall
- **PFSense 2** (172.17.0.20/30) - Site 1 internal segment firewall
- **PFSense 3** (172.17.0.24/30) - Secondary perimeter

**Cisco Routers:**
- **Router 1** (172.17.0.40/30) - Site 2 core router
- **Router 2** (172.17.0.32/30) - Site 2 secondary router

### D. Physical vs Logical Layer Mapping

**Physical Layer:** Internet Cloud, PFSense Firewalls, Cisco Routers, Server infrastructure, Workstations

**Logical Layer:** Trust zones, subnet segmentation, routing domains

**Persona Layer:** Identity-based segmentation (Blue Team, Executives, HR, Staff, Engineers, Developers, Technical Analysts)

---

## PART II: SECURITY ZONES & TRUST BOUNDARIES

### A. Security Zone Definition

```
+----------------------------------------------------------------------+
|                           INTERNET (Untrusted)                       |
|                    202.84.75.2 - APT41 Originating IP              |
+-------------------|--------------------------------------------------+
                    | 172.17.0.0/30 (ISP Uplink)
                    |
        +----------------------------------------+
        |         P F S E N S E  F I R E W A L     |  [Perimeter Zone]
        |  (172.17.0.12/30)                        |
        +----------------------------------------+
                    |
                    | 172.17.0.12/30
        +----------------------------------------+
        |        Site 1 Core Network               |
        |  (172.17.0.0/24 Range)                   |
        +----------------------------------------+
                    |
         |----------------------------------|
         |  INTER-ZONE TRUST BOUNDARY            |
         |----------------------------------|
                    |
+-------------------|--------------------------------------------------+
|                      S I T E  1  -  C O R E  ( T r u s t e d )       |
+-------------------|--------------------------------------------------+
                    |
|-------------------|--------------------------------------------------|
| Zone 1: Perimeter Services (DMZ-equivalent)                        |
|   - Web Server: 172.17.1.8 (COMPROMISED)                           |
|   - DNS Server: 172.17.1.3                                         |
|   - SMTP Server: 172.17.1.2                                        |
|   - Protected by: PFSense Internal (172.17.0.20/30)                |
|---------------------------------------------------------------------|
| Zone 2: Core Infrastructure (HIGH TRUST)                           |
|   - Domain Controller: 172.17.2.6 (dc2) - COMPROMISED              |
|   - File Server 1: 172.17.2.3                                      |
|   - File Server 2: 172.17.2.4                                      |
|   - Protected by: Internal routing only                            |
|---------------------------------------------------------------------|
| Zone 3: Blue Team (Defender)                                       |
|   - Security Analyst Workstations: 172.17.10.0/24                  |
|---------------------------------------------------------------------|
+-------------------|--------------------------------------------------+
                    |
|-------------------|--------------------------------------------------|
| Zone 4: User Workgroups (Site 2 - Medium Trust)                    |
|   - Technical Analysts: 172.17.5.0/24                              |
|   - Developers: 172.17.4.0/24                                      |
|   - Engineers: 172.17.3.0/24                                       |
|   - Executives: 172.17.6.0/24                                      |
|   - HR: 172.17.7.0/24                                              |
|   - Staff: 172.17.8.0/24                                           |
|   - Protected by: Site 2 Router only                               |
|---------------------------------------------------------------------|
+---------------------------------------------------------------------+
```

### B. Trust Boundary Analysis

| Trust Boundary | Direction | Controls | Gap Assessment |
|----------------|-----------|----------|----------------|
| Internet → PFSense | Inbound | Firewall rules | Web server exposed to internet |
| PFSense → Core | Internal | Routing only | No segmentation between zones |
| Core → User Networks | Bidirectional | Router ACLs | Unmonitored lateral movement paths |
| Technical Analysts → Core | One-way | None shown | High-risk - TAs have server access |
| Developers → Core | One-way | None shown | High-risk - Devs have server access |
| Engineers → Core | One-way | None shown | High-risk - Engineers have server access |

### C. Choke Points and Key Terrain Analysis

**Critical Choke Points:**

| Choke Point | Location | Traffic Flow | Risk |
|-------------|----------|--------------|------|
| PFSense Internet Egress | 172.17.0.12 | Inbound/Outbound | Single point of failure |
| Site 1 Core Router | 172.17.0.16/30 | Site 1 Site 2 | Primary lateral movement path |
| Server Farm Firewall | 172.17.0.20/30 | User nets to servers | Unfiltered lateral movement |
| Web Server Zone | 172.17.1.8 | Internet to Internal | Initial access vector (CONFIRMED) |

**Key Terrain:**

| Key Terrain | Value | Current Protection | APT41 Targeting |
|-------------|-------|-------------------|-----------------|
| **Domain Controller (dc2)** | Domain authentication | Isolated physically | PRIMARY TARGET - lockfile.ps1 confirmed |
| **File Servers** | Data repository | Router ACLs only | High-value for IP theft |
| **Web Server** | Internet gateway | PFSense only | CONFIRMED initial access |
| **DNS/SMTP Servers** | Infrastructure | Router ACLs only | Credential harvesting potential |

### D. Segmentation Gaps Identified

1. **NO INTERNAL FIREWALL BETWEEN USER NETWORKS AND SERVERS**
   - Technical Analysts, Developers, Engineers, HR, Execs, Staff all have direct L3 routes to core servers
   - No micro-segmentation between trust levels
   - **Impact:** Any compromised workstation enables lateral movement to dc2

2. **NO NETWORK-BASED INTRUSION DETECTION**
   - Diagram shows only Defender endpoint sensors (6 total visible)
   - No NIDS/NDR visible between subnets or at internet egress
   - **Impact:** Lateral movement undetectable from network perspective

3. **NO FIREWALL BETWEEN PFSense AND CORE ROUTER**
   - All traffic from PFSense flows directly to internal routers without additional filtering

4. **NO TRAFFIC MIRRORING FOR ANALYSIS**
   - No SPAN ports or traffic replication shown

---

## PART III: THREAT ANALYSIS - APT41 LATERAL MOVEMENT PATHWAY

### A. Attack Timeline Correlation

```
Phase 1: Initial Access (09FEB26 11:16:07 UTC)
└── External IP: 202.84.75.2 (APT41)
    └── Command Injection → Web Server (172.17.1.8)
        └── MITRE T1190 (Exploit Public-Facing Application)

Phase 2: Lateral Movement (09FEB26 11:16:47 UTC)
└── Web Server (172.17.1.8)
    └── WinRM → Technical Analyst Workstation (172.17.5.2)
        └── MITRE T1021.006 (Windows Remote Management)
        └── T1563.002 (SSH Hijacking - if applicable)

Phase 3: Credential Access / Persistence
└── Technical Analyst Workstation
    └── Potential credential harvesting
    └── Lateral movement to other systems

Phase 4: Domain Control
└── Domain Controller (dc2) - 172.17.2.6
    └── lockfile.ps1 - Persistence mechanism
    └── MITRE T1053 (Scheduled Task)
    └── MITRE T1547 (Boot/Logon Autostart)
```

### B. Lateral Movement Pathways Analysis

**Pathway 1: WinRM/SMB from Web Server to Technical Analyst (CONFIRMED)**
- Source: Web Server (172.17.1.8)
- Destination: Technical Analyst Workstation (172.17.5.2)
- Protocol: WinRM (5985/5986) or SMB (445)
- Evidence: Attack progression diagram explicitly shows this path
- MITRE: T1021.006, T1021.002

**Pathway 2: SMB/Pass-the-Hash to Domain Controller (LIKELY)**
- Source: Any compromised workstation
- Destination: Domain Controller (dc2) - 172.17.2.6
- Protocol: SMB (445) or DCOM
- Technique: Pass-the-hash, Pass-the-ticket
- Evidence: lockfile.ps1 on dc2 indicates successful lateral movement
- MITRE: T1021.002, T1550.002

**Pathway 3: RDP to High-Value Systems**
- Source: Compromised workstation
- Destination: Executives, HR, Technical Analysts, Engineers
- Protocol: RDP (3389)
- Evidence: None directly shown, but no RDP restrictions visible
- MITRE: T1021.001

**Pathway 4: SSH/HTTPS to External Destinations**
- Source: Compromised workstation
- Destination: 202.84.75.2 (External APT41 infrastructure)
- Protocol: SSH (22) or HTTPS (443)
- Evidence: External attack origin at 202.84.75.2
- MITRE: T1571 (Non-Standard Port)

### C. C2 Communication Path Analysis

**C2 Infrastructure Indicators:**
- **External IP:** 202.84.75.2 (confirmed APT41 origin point)
- **Suspicious Domain:** casepilot360.com (web server downloaded from this domain)
- **Additional C2:** 93.82.71.40 (identified in timeline - istoragehub.com domain)
- **Exfiltration Destination:** 172.17.X.X subnet (unspecified - potential internal staging)

**C2 Detection Points:**
1. Site 1 Egress (PFSense) - Potential monitoring point
2. Site 2 Router - Could detect lateral movement C2

**Current Monitoring Gaps:**
- No firewall logging shown for C2 detection
- No DNS request logging visible
- No HTTPS inspection for encrypted C2

### D. Data Exfiltration Pathway Assessment

```
Compromised Systems → Internal Staging (172.17.X.X) → Site 2 Router → Site 1 Core Router → PFSense Firewall → INTERNET
```

**Exfiltration Concerns:**
- Large file transfers to 172.17.X.X subnet
- HTTPS to external IPs without visible inspection
- DNS tunneling possible (no DNS query logging visible)
- SMB exfiltration to internal staging before external transfer

### E. OT System Reachability Assessment

**Network Context:**
- BPEnergy is a Defense Contractor supporting Critical Infrastructure
- OT systems likely connected to manufacturing/production environment
- No OT network explicitly shown in current diagram

**Risk Assessment:**
- **HIGH RISK IF CONNECTED:** If OT systems share network with Engineering (172.17.3.0/24), lateral movement to OT is possible
- **HIGH RISK IF CONNECTED:** If OT management uses same credentials, DC compromise enables OT access
- **MEDIUM RISK:** Even without direct connectivity, DC compromise provides reconnaissance value for OT targeting

**Recommendation:** Verify OT network segmentation from corporate network. If connected, treat as compromised and initiate OT isolation procedures.

---

## PART IV: VULNERABILITIES & GAP ANALYSIS

### A. High-Value Target Analysis

| Target | Value | Location | Current Protection | Vulnerability |
|--------|-------|----------|-------------------|---------------|
| Domain Controller (dc2) | CRITICAL | 172.17.2.6 | Isolated physically only | Compromised - lockfile.ps1 |
| File Server 1 | HIGH | 172.17.2.3 | Router ACLs | Accessible from any workstation |
| File Server 2 | HIGH | 172.17.2.4 | Router ACLs | Accessible from any workstation |
| Web Server | MEDIUM | 172.17.1.8 | PFSense only | Compromised - Initial Access vector |
| Mail Server | MEDIUM | 172.17.2.10 | Router ACLs | Potential credential harvesting |
| DNS Server | LOW-MEDIUM | 172.17.1.3 | Router ACLs | DNS rebinding, cache poisoning |
| Backup Server | MEDIUM | 172.17.2.9 | Router ACLs | Backup credentials harvesting |

### B. EDR/Defender Coverage Analysis

**Visible Defender Sensors (6 total):**
1. Site 1 Core Router - Defender Sensor
2. Site 2 Router - Defender Sensor
3. Technical Analyst subnet - Defender Sensor
4. Dev subnet - Defender Sensor
5. Engineer subnet - Defender Sensor
6. Site 2 infrastructure - Defender Sensor

**EDR Coverage Gaps:**
- **NO EDR on Domain Controller (dc2)** - Critical gap
- **NO EDR on File Servers** - Data exposure risk
- **NO EDR on Web Server** - Initial access blind spot
- **NO EDR on Mail/SMTP Servers** - Credential theft blind spot
- **NO EDR on DNS Server** - DNS-based C2 blind spot

**Recommendation:** Deploy Defender or EDR sensors to ALL server-class systems and executive workstations immediately.

### C. Network Monitoring (NIDS/NDR) Gap Analysis

**Current Network Monitoring:**
- **NIDS/NDR:** None visible in diagram
- **Packet Capture:** Not shown
- **Flow Analysis:** Not visible

**Critical Monitoring Gaps:**
1. **No inbound traffic inspection at PFSense** - APT41 initial access should be detectable
2. **No lateral movement detection** - SMB, WinRM, RDP lateral movement undetectable
3. **No DNS request logging** - C2 domain resolution undetectable
4. **No HTTPS inspection** - Encrypted C2 communication undetectable
5. **No traffic mirroring** - Cannot deploy external NIDS without SPAN ports

**Recommendation:** Implement network monitoring at internet egress points, inter-subnet boundaries, server network ingress, and all firewall rule processing points.

### D. Single Points of Failure

| Component | Location | Impact if Failed |
|-----------|----------|-----------------|
| PFSense 1 | 172.17.0.12/30 | Complete internet outage |
| Site 1 Core Router | 172.17.0.16/30 | Site 1-2 connectivity loss |
| Domain Controller (dc2) | 172.17.2.6 | Domain authentication failure |
| DNS Server | 172.17.1.3 | Name resolution failure |

---

## PART V: DETECTION LOGIC RECOMMENDATIONS

### A. NIDS/NDR Rules for C2 Detection (Beaconing Patterns)

**DNS-Based C2 Detection:**
```nids
# Detect DNS queries to suspicious domains
alert dns any any -> any any (msg:"CPT-NETWORK-001: Suspicious DNS Query - casepilot360.com"; dns_query; content:"casepilot360"; nocase; sid:1000001; rev:1;)

# Detect DNS tunneling - long subdomain queries
alert dns any any -> any any (msg:"CPT-NETWORK-002: Potential DNS Tunneling"; dns_query; length:>50; threshold:type both, track by_src, count 5, seconds 60; sid:1000002; rev:1;)
```

**HTTPS C2 Detection (Beaconing Analysis):**
```nids
# Detect regular interval HTTPS connections (typical beacon pattern)
alert tls any any -> any 443 (msg:"CPT-NETWORK-004: Regular Interval HTTPS Beacon"; tls_sess; threshold:type both, track by_src, count 10, seconds 300; sid:1000004; rev:1;)

# Detect connections to known APT41 infrastructure IP
alert tls any any -> 202.84.75.2 443 (msg:"CPT-NETWORK-005: Connection to Known APT41 IP"; flow:established; sid:1000005; rev:1;)
```

**SMB/WinRM Lateral Movement Detection:**
```nids
# Detect SMB lateral movement - multiple destination IPs
alert smb any any -> any 445 (msg:"CPT-NETWORK-007: Potential Lateral Movement - SMB"; flow:established; threshold:type both, track by_src, count 5, seconds 60; sid:1000007; rev:1;)

# Detect WinRM connections to multiple systems
alert tcp any any -> any 5985 (msg:"CPT-NETWORK-008: Potential Lateral Movement - WinRM HTTP"; flow:established; threshold:type both, track by_src, count 3, seconds 120; sid:1000008; rev:1;)
alert tcp any any -> any 5986 (msg:"CPT-NETWORK-009: Potential Lateral Movement - WinRM HTTPS"; flow:established; threshold:type both, track by_src, count 3, seconds 120; sid:1000009; rev:1;)
```

### B. Lateral Movement Detection Logic

**SIEM Correlation Rules:**

```
Rule 1: Lateral Movement from Domain Controller
IF: source=dc2 (172.17.2.6)
AND: protocol IN (SMB, WinRM, RDP)
AND: multiple destination hosts (>3)
AND:短时间内 connections (<5 minutes)
THEN: Alert "CRITICAL: DC Lateral Movement Detected"

Rule 2: Multiple Host Access Pattern
IF: source=any_workstation
AND: accesses >5 different hosts
AND: within 10 minutes
AND: protocol IN (SMB, WinRM, RDP, DCOM)
THEN: Alert "HIGH: Suspicious Lateral Movement Pattern"

Rule 3: PowerShell Remote Execution
IF: command_line CONTAINS "Invoke-Command", "Enter-PSSession", "New-PSSession"
AND: destination IP not in allowed_admin_hosts
THEN: Alert "MEDIUM: PowerShell Remote Execution - Review Required"
```

### C. Data Exfiltration Monitoring

**Recommended Thresholds:**

| Metric | Baseline | Alert Threshold | Duration |
|--------|----------|-----------------|----------|
| Outbound bytes per host | <500 MB/day | >2 GB/day | 24h |
| Outbound bytes to single IP | <100 MB | >500 MB | 1h |
| SMB transfer rate | <50 MB/min | >200 MB/min | Continuous |

### D. Network Segmentation Validation Rules

```
# Rule: Technical Analysts must NOT access Domain Controllers directly
IF: source_subnet = 172.17.5.0/24 (Technical Analysts)
AND: destination = 172.17.2.6/32 (dc2)
AND: port IN (445, 135, 139, 3389, 5985, 5986)
THEN: DENY (Segmentation Violation)

# Rule: All hosts must NOT communicate with external APT41 IPs
IF: destination_ip IN (202.84.75.2, 93.82.71.40)
AND: port IN (443, 80, 22, 53)
THEN: DENY (Known Threat IP)
```

---

## PART VI: CONTAINMENT & MITIGATION RECOMMENDATIONS

### A. Immediate Containment Actions (Hours 0-24)

**1. Network Isolation of Compromised Systems:**

```
Immediate Isolation:
├── dc2 (172.17.2.6) - Domain Controller
│   └── Action: Isolate from network (CRITICAL - but coordinate with BPEnergy)
│
├── Technical Analyst workstations (172.17.5.0/24)
│   └── Action: Block to/from this subnet at Site 2 Router
│
├── Web Server (172.17.1.8)
│   └── Action: Block all traffic except from PFSense (for analysis)
```

**2. Firewall Rule Implementation:**

```bash
# Block traffic from compromised subnet at PFSense
pfctl -t blocked_hosts -T add 172.17.5.0/24
pfctl -t blocked_hosts -T add 172.17.2.6

# Block outbound to APT41 infrastructure
pfctl -t apt41_ips -T add 202.84.75.2
pfctl -t apt41_ips -T add 93.82.71.40
```

**3. DNS Sinkholing:**
- Configure DNS to redirect suspicious domains to internal monitoring server
- Example: casepilot360.com, istoragehub.com

### B. Segmentation Improvements (Days 1-7)

**Proposed Network Architecture Changes:**

```
Current Architecture (VULNERABLE):
Internet → PFSense → Router → ALL Subnets (no segmentation)

Proposed Architecture (SECURE):
Internet → PFSense → Router → [Firewall Zones]
                                  ├── Zone 1: Servers (DC, File, Mail)
                                  ├── Zone 2: Technical Analysts (Isolated)
                                  ├── Zone 3: Developers (Isolated)
                                  ├── Zone 4: Engineers (Isolated)
                                  ├── Zone 5: Executives/HR/Staff
                                  └── Zone 6: Blue Team (Full access)
```

### C. EDR/NDR Sensor Placement Recommendations

**Sensor Deployment Priority:**

| Priority | Location | Sensor Type | Reason |
|----------|----------|-------------|--------|
| 1 (CRITICAL) | Domain Controller | EDR + NDR | DC is compromised |
| 2 (CRITICAL) | File Servers | EDR + NDR | Data exposure risk |
| 3 (CRITICAL) | Web Server | EDR + NDR | Initial access vector |
| 4 (HIGH) | Mail Server | EDR + NDR | Credential theft vector |
| 5 (HIGH) | DNS Server | EDR + NDR | DNS-based C2 detection |
| 6 (HIGH) | Executive Workstations | EDR | High-value targets |

**NDR Sensor Placement:**
1. Internet egress (PFSense outbound interface)
2. Site 1-2 router interface
3. Server network ingress
4. Each major user subnet

### D. Monitoring Enhancements

**Immediate Enhancements (Next 24-48 hours):**

1. **Enable PowerShell Script Block Logging on dc2**
2. **Enable Windows Event Forwarding** to Blue Team SIEM
3. **Deploy Initial Detection Rules** for PowerShell execution on DC

**Long-term Enhancements (Next 30 days):**
1. Deploy full NIDS/NDR infrastructure
2. Implement traffic mirroring for external analysis
3. Deploy DNS query logging solution
4. Implement HTTPS inspection for C2 detection

---

## PART VII: MITRE ATT&CK TECHNIQUE MAPPING

### A. Techniques Identified in Current Operation

| Technique ID | Technique Name | Confidence | Status |
|--------------|----------------|------------|--------|
| T1190 | Exploit Public-Facing Application | HIGH | CONFIRMED - Web server compromise |
| T1021.006 | Windows Remote Management | HIGH | CONFIRMED - Lateral movement to TA |
| T1021.002 | SMB/Windows Admin Shares | MEDIUM | SUSPECTED - DC compromise path |
| T1053.005 | Scheduled Task | HIGH | SUSPECTED - lockfile.ps1 persistence |
| T1547.001 | Registry Run Keys | MEDIUM | SUSPECTED - Alternative persistence |
| T1546.003 | Windows Management Filtering | MEDIUM | SUSPECTED - WMI subscription |
| T1003.001 | LSASS Memory | MEDIUM | SUSPECTED - Credential harvesting |
| T1071.001 | Application Layer Protocol (HTTPS) | MEDIUM | SUSPECTED - C2 communication |
| T1567.002 | Exfiltration Over Web Service | MEDIUM | SUSPECTED - Data theft |
| T1078.002 | Valid Accounts (Domain) | HIGH | SUSPECTED - DC access |

### B. MITRE ATT&CK Matrix View

```
                    APT41 TTP Map - OP-DEFENDER Incident

  RECONNAISSANCE              (Not yet detected)
  RESOURCES DEVELOPMENT       (Not yet detected)
  INITIAL ACCESS              ✅ 202.84.75.2 → Web Server (T1190)
  EXECUTION                   ✅ lockfile.ps1 (T1059)
  PERSISTENCE                 🔴 lockfile.ps1 (T1053, T1547, T1546)
  PRIVILEGE ESCALATION        (Assumed from DC compromise)
  DEFENSE EVASION             (Not yet detected)
  CREDENTIAL ACCESS           🔴 Suspected (T1003 - LSASS)
  DISCOVERY                   (Not yet detected)
  LATERAL MOVEMENT            ✅ TA Workstation (T1021.006)
  COLLECTION                  🔴 Suspected (data staging)
  COMMAND AND CONTROL         🔴 C2 to 202.84.75.2 (T1071.001)
  EXFILTRATION                🔴 To 172.17.X.X (T1567.002)
  IMPACT                      🔴 Domain compromise (T1485)
```

---

## APPENDIX A: NETWORK TOPOLOGY DIAGRAM

```
+============================================================================+
|                          BPEnergy Network Topology                         |
|                    OP-DEFENDER Incident Response Analysis                  |
|                              2026-02-25                                    |
+============================================================================+

                          [INTERNET CLOUD]
                                |
                    +---------------------+
                    |     PFSense         |
                    |  172.17.0.12/30     |
                    +----------+----------+
                               |
                    +----------+----------+
                    |  Site 1 Core Router |
                    |  172.17.0.16/30     |
                    +----------+----------+
                               |
         +---------------------+---------------------+
         |                     |                     |
    +----+----+           +----+----+           +---+---+
    | PFSense |           |  Router  |           |Router |
    | Internal|           |(Site 2)  |           |(Site 2)|
    +----+----+           +----+----+           +---+---+
         |                     |                     |
+--------+--------+   +--------+--------+   +-------+--------+
|   Server Farm   |   |  User Networks   |   |  User Networks |
|  (Site 1)       |   |  (Site 2)        |   |  (Site 2)      |
+--------+--------+   +--------+--------+   +-------+--------+
         |                     |                     |
    +----+----+           +---+---+---+---+   +---+---+---+---+
    |Web Srv  |           | TA  |Dev|Eng|Exec|   |HR   |Staff|Blue|
    |172.17.1.8|           |5.0  |4.0|3.0|6.0 |   |7.0  |8.0  |10.0|
    +----+----+           +---+---+---+---+   +---+---+---+---+
         |
    +----+----+
    |DNS Srv  |
    |172.17.1.3|
    +----+----+
         |
    +----+----+
    |SMTP Srv |
    |172.17.1.2|
    +----+----+
         |
    +----+----+
    |File Srv1|
    |172.17.2.3|
    +----+----+
         |
    +----+----+
    |File Srv2|
    |172.17.2.4|
    +----+----+
         |
    +----+----+
    |DC (dc2)  |
    |172.17.2.6|
    |LOCKFILE  |
    |PS1 FOUND |
    +----+----+

ATTACK PATH (APT41):
202.84.75.2 (Internet)
    ↓ T1190 (Web Exploit)
172.17.1.8 (Web Server) COMPROMISED
    ↓ T1021.006 (WinRM)
172.17.5.2 (Technical Analyst) COMPROMISED
    ↓ T1021.002 (SMB)
172.17.2.6 (dc2) COMPROMISED - lockfile.ps1 detected
```

---

## APPENDIX B: INDICATORS OF COMPROMISE (IOCs)

### A. File IOCs
| Filename | Location | Status | Action |
|----------|----------|--------|--------|
| lockfile.ps1 | dc2 (172.17.2.6) | CONFIRMED | Extract hash, analyze, deploy detection |

### B. Network IOCs
| IP Address | Domain | Role | Status |
|------------|--------|------|--------|
| 202.84.75.2 | - | APT41 Originating IP | BLOCK |
| 93.82.71.40 | istoragehub.com | C2 Infrastructure | BLOCK |

### C. Registry IOCs (to hunt on dc2)
- HKLM\Software\Microsoft\Windows\CurrentVersion\Run\*
- HKLM\System\CurrentControlSet\Services\*
- HKLM\Software\Classes\WMI\EventFilter

---

## APPENDIX C: RESPONSE RECOMMENDATIONS SUMMARY

| Priority | Action | Timeline | Owner |
|----------|--------|----------|-------|
| CRITICAL | Isolate dc2 from network | Hours 0-2 | Network Team |
| CRITICAL | Block APT41 infrastructure IPs | Hours 0-2 | Firewall Admin |
| CRITICAL | Extract lockfile.ps1 for analysis | Hours 2-6 | Host Analysis |
| HIGH | Deploy EDR to all servers | Days 1-3 | Security Team |
| HIGH | Implement network segmentation | Days 3-7 | Network Team |
| HIGH | Enable PowerShell logging on DCs | Days 1-2 | Security Team |
| MEDIUM | Deploy NIDS/NDR sensors | Days 7-14 | Security Team |
| MEDIUM | Implement DNS query logging | Days 7-14 | Security Team |

---

## APPENDIX D: REFERENCE DOCUMENTS

1. **Incident Report 001**: `operation/OP-DEFENDER_DCO-RA_2026-02-23/EXECUTION/Incident_Reports/Incident_Report_001_lockfile_ps1_dc2_2026-02-23.md`
2. **Threat COA Analysis APT41**: `operation/OP-DEFENDER_DCO-RA_2026-02-23/INTELLIGENCE/Threat_COA_Analysis_APT41_2026-02-23.md`
3. **ManhattanProtocol.drawio**: `C:\Users\Avalon\Nextcloud\Projects\ManhattanProtocol.drawio`

---

**Classification:** UNCLASSIFIED // FOUO

**Next Update:** Upon completion of forensic analysis (2026-02-26)

**Prepared By:** 17C Network Analyst - CyberOpsPlanner

**Review By:** MAJ Manbear (Mission OIC) - OP-DEFENDER
