# Tools Reference — Capability Level

This document describes common defensive tools at the **capability level** (what they're for, what outputs they provide, where they fit in your architecture). Do not refer to this for specific commands or configuration steps — consult tool documentation for those details.

---

## Endpoint Detection & Response (EDR)

**What it does:**
- Collects telemetry from endpoints (process creation, file operations, network connections, registry changes, DLL loading)
- Correlates endpoint events into potential threat indicators
- Provides triage interface for analysts to investigate suspicious processes/behaviors
- Supports containment workflows (isolate endpoint, kill process, quarantine file)

**When to use:**
- Detecting malware or suspicious process behavior
- Investigating host-level artifacts (lateral movement, persistence, data exfiltration)
- Hunting for adversary activity on endpoints
- Incident response triage (what happened on this system?)

**Limitations:**
- Only sees what happens on the endpoint (can't see network traffic unless agent is present)
- Subject to endpoint agent failures (killed process, disabled service)
- Requires proper configuration to generate useful alerts (poorly tuned → noise or misses)
- Blind to unmanaged devices (BYOD, guest networks, systems without agent)

**Integration points:**
- SIEM (EDR events feed into correlation engine)
- Threat intelligence (EDR can match hashes/indicators to known malware)
- Email system (EDR can see files opened from email attachments)

---

## Security Information & Event Management (SIEM)

**What it does:**
- Collects logs from all sources (firewalls, proxies, servers, endpoints, cloud services, authentication systems)
- Normalizes log format (converts vendor-specific formats to common schema)
- Stores logs (enables historical search and forensics)
- Correlates events across sources (identifies patterns across systems)
- Generates alerts (when correlation rules are triggered)
- Provides dashboards (real-time view of security status)

**When to use:**
- Detecting multi-system attacks (lateral movement, data exfiltration, C2 communication)
- Forensic analysis (what happened over hours/days across the network?)
- Compliance reporting (log retention, audit trails)
- Incident tracking (correlate all events related to a specific incident)

**Limitations:**
- Only correlates what you log (blind to systems/events not feeding logs)
- Correlation rules must be tuned (generic rules = false positives; missing attacks)
- Lag time between event and log ingestion (real-time detection requires low-latency logging)
- Storage costs (retaining years of logs is expensive)

**Integration points:**
- EDR (endpoint events feed into SIEM)
- Network visibility (firewall/proxy logs feed into SIEM)
- Identity/authentication (logon events feed into SIEM)
- Threat intelligence (SIEM can match indicators to known threats)

---

## Network Intrusion Detection & Response (NIDS / NDR)

**What it does:**
- Monitors network traffic (either at network tap or packet broker)
- Analyzes traffic patterns (identifies anomalies, known malicious traffic)
- Detects C2 beaconing (regular outbound traffic patterns characteristic of command-and-control)
- Detects lateral movement (unusual traffic between internal systems)
- Detects exfiltration (unusual outbound traffic, especially to suspicious destinations)
- Provides threat intelligence (IOC matching, known malware signature detection)

**When to use:**
- Detecting C2 communications (beaconing to external servers)
- Detecting lateral movement (East-West traffic between internal systems)
- Detecting data exfiltration (unusual outbound traffic)
- Network forensics (what happened on the wire during incident?)

**Limitations:**
- Can't see encrypted traffic (HTTPS, VPN, SSH prevent deep packet inspection)
- Requires traffic visibility (if traffic bypasses your monitoring, you won't see it)
- False positives (legitimate traffic can trigger malware signatures)
- Tunnel traffic bypasses detection (VPN, TOR, proxies hide payload)

**Integration points:**
- SIEM (network events feed into correlation engine)
- Threat intelligence (network signatures for known C2)
- Firewall (can block traffic detected as malicious)

---

## Packet Capture (PCAP)

**What it does:**
- Captures raw network packets
- Enables deep-dive analysis of specific traffic (what protocols? What data?)
- Supports forensic reconstruction (replay traffic, extract files)

**When to use:**
- Validating NIDS/NDR detections (is the traffic really malicious?)
- Incident forensics (reconstruct attacker actions)
- Protocol analysis (what is this unknown protocol doing?)
- Malware analysis (what data does malware exfiltrate?)

**Limitations:**
- Encrypted traffic is unreadable (can see volume, timing, endpoints, but not content)
- Storage intensive (network traffic generates huge volumes of data)
- Privacy/legal concerns (may contain user data, email, etc.)
- Requires specialized tools to analyze (not readable as plain text)

**Integration points:**
- NIDS/NDR (PCAP backing store for further analysis)
- Incident forensics (extract files, timeline reconstruction)

---

## Log Sources & What They Tell You

| Log Source | What it sees | Best for | Integration |
|-----------|------------|---------|-------------|
| **Authentication logs** (AD, LDAP) | Login attempts, account lockouts, permission changes | Detecting compromised credentials, lateral movement | SIEM correlation for failed login patterns |
| **DNS logs** | Domain queries, resolution failures | Detecting C2 domain communications, data exfiltration to suspicious domains | SIEM + threat intel matching |
| **Proxy/firewall logs** | Outbound web traffic, blocked connections | Detecting C2 over HTTP, data exfiltration, policy violations | SIEM + threat intel matching |
| **Email logs** | Inbound/outbound email, attachments, external recipients | Detecting phishing, data exfiltration via email | SIEM + DLP correlation |
| **Endpoint logs** | Process creation, file operations, registry changes | Malware behavior, persistence, lateral movement prep | EDR + SIEM |
| **Cloud audit logs** | Cloud service actions, configuration changes, data access | Detecting cloud compromise, data access anomalies | SIEM for multi-cloud correlation |
| **Firewall logs** | Inbound/outbound traffic, dropped connections | Detecting attacks at perimeter, data exfiltration | SIEM for multi-source correlation |

---

## Asset Inventory & Vulnerability Management

**What it does:**
- Maintains inventory of all systems on network (what's installed? What OS versions?)
- Scans systems for known vulnerabilities (CVE matching)
- Prioritizes vulnerabilities by severity and exploitability
- Tracks remediation status (which vulnerabilities have been patched?)

**When to use:**
- Assessing exposure to known CVEs (how many systems vulnerable to APT-XX's exploits?)
- Patch prioritization (which vulnerabilities matter most?)
- Capability assessment (can we defend against this threat?)

**Limitations:**
- Only finds known vulnerabilities (zero-days are invisible)
- Doesn't find misconfigurations or logical vulnerabilities
- Requires accurate asset inventory (misses systems not in database)
- Scan-based (doesn't assess runtime behavior)

**Integration points:**
- Threat modeling (what CVEs does threat use? Which systems are vulnerable?)
- Risk assessment (what's our exposure?)

---

## Threat Intelligence Platforms

**What it does:**
- Centralizes IOC/TTP management (IP addresses, domains, malware hashes, attacker techniques)
- Enables dissemination (shares indicators with defensive tools)
- Integrates with detection systems (SIEM, NIDS, EDR can use indicators)
- Provides reporting/dashboards (what threats are we seeing? What's our exposure?)

**When to use:**
- Matching detected artifacts to known threats (is this malware? What threat group?)
- Sharing indicators across team (all tools have access to latest IOCs)
- Threat reporting (what threats is the organization facing?)

**Limitations:**
- Only useful if you have good threat intelligence to ingest
- Lag between threat discovery and indicator availability
- False positives if indicators are overly broad
- Privacy/legal concerns (some threat intel comes from controversial sources)

**Integration points:**
- SIEM (indicators for correlation)
- NIDS/NDR (malware signature matching)
- EDR (file hash matching)
- Firewall (domain/IP blocking)

---

## Data Loss Prevention (DLP)

**What it does:**
- Monitors data movements (files, email, removable media)
- Identifies sensitive data (credit cards, SSNs, classified markings, custom patterns)
- Blocks or logs sensitive data movements (prevents email to external recipients, USB copy, etc.)
- Provides audit trail (who moved what data? When? Where?)

**When to use:**
- Detecting data exfiltration (blocking email to external recipients with sensitive attachments)
- Compliance (preventing accidental disclosure of PII)
- Incident forensics (understanding scope of data theft)

**Limitations:**
- Only catches what it's configured to detect (if you don't define "sensitive," it won't catch it)
- Can block legitimate work (false positives create user frustration)
- Encrypted data is harder to detect (content inspection may fail on encrypted formats)
- Doesn't detect if attacker copies data using different method (e.g., cloud file sync instead of email)

**Integration points:**
- Email (catch outbound sensitive data in emails)
- File servers (catch sensitive data copies to USB/cloud)
- Incident response (evidence of exfiltration attempts)

---

## How These Tools Work Together

**Typical detection flow:**
```
1. Endpoint (EDR) detects suspicious process → sends alert to SIEM
2. SIEM correlates with network logs (NIDS) → sees C2 traffic
3. NIDS also detects DNS query to known malicious domain → blocks at firewall
4. DLP logs attempt to email sensitive files → incident created
5. Asset inventory shows system is vulnerable to threat's known CVE → prioritizes patching
6. Threat intel platform identifies file hash → matches known malware family
```

**Typical incident response flow:**
```
1. Alert → EDR shows suspicious process
2. Containment → Isolate endpoint, kill process
3. Investigation → SIEM correlates logs to find lateral movement
4. Forensics → PCAP shows what data was exfiltrated
5. Hunting → Search logs for similar activity on other systems
6. Remediation → Patch vulnerability, reset credentials, update IOCs
```

---

## Key Principle: Defense in Depth

No single tool catches everything. Your defense must layer:
- **Prevention** (block attacks before they succeed) — firewall, email filtering, EDR blocking
- **Detection** (catch attacks you couldn't prevent) — SIEM correlation, NIDS, behavioral analysis
- **Response** (stop attack once detected) — EDR isolation, traffic blocking, incident response

**For architecture-level cyber task integration, see [docs/MDMP_LENS.md](./MDMP_LENS.md) and [docs/guides/operations/MULTI-OPERATION-GUIDE.md](./guides/operations/MULTI-OPERATION-GUIDE.md)**
