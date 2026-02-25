# COMMAND & CONTROL (C2) RESPONSE — INCIDENT RESPONSE PLAYBOOK
## 7-Step Framework | UNCLASSIFIED // FOUO

**Playbook ID:** IR-PB-004
**Version:** 1.0
**Classification:** UNCLASSIFIED // FOUO
**Threat Type:** Command & Control — Beaconing / Active C2 Channel / RAT / Implant
**Primary Role:** 17C Network Analyst (Lead) + 17C Host Analyst (Support)
**Authority:** CJCSM 6510.01B | AR 25-2 | FM 3-12 | JP 3-12
**Created:** 2026-02-25
**Review Cycle:** Semi-annual or post-CAT I/II incident

**MITRE ATT&CK Primary Tactics:**
- T1071 — Application Layer Protocol (HTTP/S, DNS, SMTP as C2 channel)
- T1095 — Non-Application Layer Protocol (raw TCP/UDP, ICMP tunneling)
- T1572 — Protocol Tunneling (DNS tunneling, HTTPS tunneling)
- T1090 — Proxy (multi-hop proxies, domain fronting)
- T1219 — Remote Access Software (legitimate tools used for C2)
- T1008 — Fallback Channels (backup C2 mechanisms)
- T1568 — Dynamic Resolution (DGA, fast flux)

---

## BLUF

Active C2 means an adversary has persistent access to your network and is actively communicating with implanted malware. C2 detection is a CAT I/II incident. The priority is to **characterize the C2 channel**, **identify all affected hosts**, and **disrupt the channel** — in that order. Disrupting C2 without identifying all beaconing hosts allows the adversary to re-establish via fallback channels.

**The critical sequence:**
1. Characterize (what channel, what pattern, what hosts)
2. Image/preserve (forensic state before disruption)
3. Disrupt (block at network boundary)
4. Eradicate (remove implant from all hosts)

---

## STEP 1: PREPARATION

### 1.1 Required Capabilities
| Capability | Purpose |
|-----------|---------|
| Network flow analysis (NDR / SIEM) | Baseline establishment and anomaly detection |
| Full packet capture (PCAP) | C2 channel characterization, traffic decoding |
| DNS logging (full query/response) | DNS-based C2 detection |
| Proxy / web gateway logging | HTTP/S C2 detection |
| EDR with network telemetry | Per-process network connection tracking |
| Threat intelligence platform | IOC lookup, C2 infrastructure correlation |
| Out-of-band management | Admin access when blocking network traffic |

### 1.2 Baseline Requirements (Pre-Incident)
- Documented approved outbound ports and protocols per zone
- Known-good external connection inventory (update servers, cloud services, SaaS)
- Normal DNS query volume and destination baseline per host class
- Normal outbound traffic volumes per time-of-day and day-of-week
- Approved remote access tools and connection methods

### 1.3 C2 Detection Tuning Checklist
- [ ] DNS logging capturing all queries, not just recursive resolution
- [ ] Proxy SSL inspection enabled (or certificate pinning monitoring if not)
- [ ] EDR capturing per-process network connections
- [ ] NetFlow/IPFIX collection active on all boundary points
- [ ] Threat intelligence feeds (C2 IPs/domains) loaded into SIEM/NIDS

---

## STEP 2: DETECTION & IDENTIFICATION

### 2.1 C2 Beaconing Indicators
| Indicator | Description | Tool Source |
|-----------|-------------|-------------|
| Periodic outbound connections (fixed interval) | Beacon timing pattern | NDR, NetFlow |
| Low-and-slow data transfer (small, regular packets) | Command polling | PCAP, NDR |
| DNS queries to DGA-style domains | Algorithm-generated domain names | DNS logs, SIEM |
| HTTP/S to known-bad IP/domain | Direct C2 infrastructure contact | Proxy logs, threat intel |
| Unusual port usage (C2 over uncommon ports) | Protocol misuse | Firewall logs |
| Long-lived TCP/UDP connections | Persistent channel maintenance | NetFlow |
| HTTPS to uncommon or new IP (no domain, or recently registered domain) | Infrastructure freshness indicator | Proxy, passive DNS |
| HTTP traffic at unusual hours (off-hours beaconing) | Scheduled beacon | Proxy logs, SIEM |

### 2.2 Beacon Analysis Methodology
When a potential beacon is identified:

1. **Collect connection metadata:**
   - Source host, destination IP/domain, port, protocol
   - Packet sizes (consistent size = likely beacon)
   - Timing intervals (jitter pattern or precise intervals)
   - Session duration and volume

2. **Characterize the beacon pattern:**
   - Interval: Fixed vs. jittered (jitter is common in mature C2 frameworks)
   - Volume: Command only (very small) vs. data transfer (medium/large)
   - Direction: Outbound-only vs. bidirectional communication
   - Protocol: HTTP/S (blends in) vs. DNS (covert) vs. raw TCP (less common)

3. **Identify all hosts exhibiting this pattern:**
   - Search SIEM/NDR for all hosts connecting to same C2 IP/domain
   - Search for similar timing/volume patterns to other potential C2 infrastructure
   - EDR query for processes making similar connections across all managed hosts

### 2.3 C2 Channel Classification
| Type | Description | Detection Priority |
|------|-------------|-------------------|
| Direct C2 | Implant connects directly to C2 server | High — visible in firewall/proxy |
| Redirector-based | C2 traffic routed through compromised intermediary | Medium — need to trace hop chain |
| Domain-fronted | C2 hidden behind legitimate CDN/cloud service | Hard — SSL inspection required |
| DNS tunneled | C2 commands in DNS query/response | Hard — requires DNS content analysis |
| Living-off-the-land (LOTL) | C2 using legitimate tools (WMI, PowerShell remoting) | Very hard — need behavior analysis |

### 2.4 Affected Host Inventory
Build complete list of all hosts communicating with identified C2 infrastructure:
```
C2 HOST TRACKER
| Hostname | IP | Process | Beacon Interval | First Seen | Last Seen | Status |
|----------|----|---------|:---------------:|:----------:|:---------:|:------:|
```

---

## STEP 3: CONTAINMENT

### 3.1 Containment Sequence — Order Matters
```
Step 1: IDENTIFY all C2-connected hosts first (not just the first one found)
Step 2: IMAGE key hosts forensically (preserve C2 artifacts in memory/disk)
Step 3: BLOCK C2 at network boundary (firewall/proxy/DNS)
Step 4: ISOLATE all beaconing hosts from network (EDR or VLAN)
Step 5: MONITOR for fallback C2 channels (expect adversary to try alternate paths)
```

**Do NOT block C2 before identifying all hosts** — You will tip off the adversary via one path while missing others.

### 3.2 Network-Level Containment
- [ ] **Block C2 IPs at firewall** (inbound + outbound, all ports)
- [ ] **Block C2 domains at DNS/proxy** (FQDN + any known subdomains)
- [ ] **Monitor for DGA fallback** — Block known DGA algorithm domains if family identified
- [ ] **Enable enhanced logging** on firewall/proxy for 24 hours post-block (detect fallback attempts)
- [ ] **Block known C2 port/protocol combinations** (if custom port identified)

### 3.3 Host-Level Containment
- [ ] EDR isolation for all identified beaconing hosts
- [ ] Terminate C2 process on isolated hosts (after memory image captured)
- [ ] Preserve all C2-related artifacts (config files, dropped tools, staged data)

### 3.4 C2 Disruption vs. Intelligence Collection Decision
**Consider:** Sometimes maintaining controlled visibility on a C2 channel (without blocking) provides intelligence value to understand adversary intent and objectives.

Decision authority: **Mission OIC** (with CTI team recommendation)

| Option | Benefit | Risk |
|--------|---------|------|
| Immediate block | Stops active threat quickly | Loses intelligence collection opportunity |
| Controlled monitoring (temporary) | Intelligence collection, operator identification | Continued adversary access during observation window |
| Sinkholing C2 domain | Redirects callbacks to analyst-controlled server | Requires DNS control, technical complexity |

Default: **Immediate block** unless CTI team recommends and Mission OIC approves short-term collection window.

---

## STEP 4: ERADICATION

### 4.1 Implant Removal
C2 is a symptom — the implant is the cause. Remove the implant from every affected host.

For each host in C2 host tracker:
1. Identify the C2 implant (EDR telemetry, memory forensics, process analysis)
2. Identify all implant components (dropper, loader, beacon payload, additional modules)
3. Identify all persistence mechanisms installed by implant
4. Remove all components (implant, persistence, staging files)
5. Validate removal — rescan with updated detection signatures

### 4.2 Persistence Eradication
C2 implants universally install persistence. Check all:
- [ ] Scheduled tasks (Task Scheduler, cron)
- [ ] Registry run keys and startup folders (Windows)
- [ ] Services (new or modified)
- [ ] WMI subscriptions
- [ ] Boot loader modifications
- [ ] Browser extensions / plugins
- [ ] SSH authorized_keys (Linux/Unix)

### 4.3 C2 Infrastructure Blocking (Comprehensive)
- [ ] All known C2 IPs blocked (not just the first one)
- [ ] All known C2 domains blocked
- [ ] All known C2 URL patterns blocked at proxy
- [ ] Certificate fingerprints blocked if known (for TLS-based C2)
- [ ] Threat intel platform updated with all C2 IOCs from this incident

### 4.4 Post-Eradication Monitoring (C2 Specific)
After blocking C2 and removing implants, monitor for:
- Fallback beacon attempts to alternate C2 infrastructure
- Re-infection attempts (same initial access vector)
- Lateral movement from any hosts not yet fully eradicated
- New implant variants (adversary may redeploy with modified tooling)

---

## STEP 5: RECOVERY

### 5.1 System Restoration Assessment
For each C2-affected host, determine restoration path:
- **Heavily compromised** (multiple implants, extended dwell time, credential access confirmed): Full rebuild
- **Single implant, short dwell, no credential access**: Validated removal + hardening + close monitoring
- **Uncertainty about full scope of access**: Default to rebuild

### 5.2 Hardening Before Restoration
- Apply all outstanding patches
- Rotate all credentials on affected systems
- Enforce least privilege (remove admin rights not required for function)
- Deploy enhanced endpoint logging (Sysmon or equivalent)
- Validate EDR agent active and at current version

### 5.3 Network Restoration
- Maintain enhanced logging for 60 days post-eradication (C2 actors often return)
- Keep C2 IOC blocks in place indefinitely (no expiration)
- Monitor for connections to similar IP/domain ranges (attacker infrastructure pivot)
- Add new C2 patterns to ongoing threat hunt criteria

---

## STEP 6: POST-INCIDENT ANALYSIS

### 6.1 C2 Kill Chain Analysis
Reconstruct the full C2 lifecycle:
```
[DATE/TIME] Initial access (how did implant get on host?)
[DATE/TIME] First beacon (when did C2 activate?)
[DATE/TIME] C2 activity period (what was the adversary doing?)
[DATE/TIME] Detection (what triggered detection?)
[DATE/TIME] C2 blocked
[DATE/TIME] Implant removed
Dwell time (initial access to detection): [N days]
C2 activity window: [N days]
Data accessed / exfiltrated: [Assessment]
```

### 6.2 C2 Infrastructure Analysis
Document for threat intelligence:
- Complete list of C2 IPs and domains observed
- C2 framework identified (Cobalt Strike, Metasploit, custom, etc.)
- Hosting pattern (bulletproof hosting, compromised servers, cloud)
- Certificate details (if HTTPS C2)
- DGA algorithm (if applicable)
- Share with ARCYBER / cyber threat intelligence community

### 6.3 MITRE ATT&CK C2 Technique Mapping
Map all observed C2 techniques to ATT&CK for detection rule development and threat profile update.

### 6.4 Detection Gap Analysis
- Why was C2 active for [N] days before detection?
- What signature or behavioral rule would have caught this earlier?
- Was the C2 using a known-evasion technique (domain fronting, jitter)?
- Was the initial C2 channel detectable but missed due to tool gap or analyst gap?

---

## STEP 7: COORDINATION & REPORTING

### 7.1 C2 Reporting Timeline
| Event | Recipient | Deadline |
|-------|-----------|----------|
| C2 confirmed | Mission OIC | Immediately |
| CAT I/II notification | ARCYBER | Within 1 hour (CAT I) / 8 hours (CAT II) |
| C2 infrastructure IOCs | CTI team / ARCYBER | Within 4 hours |
| Status updates | Mission OIC, ARCYBER | Every 8 hours while active |
| C2 disruption confirmed | All above | Immediately upon milestone |
| Final incident report | ARCYBER + BN/BDE CDR | Within 72 hours of closure |

### 7.2 Intelligence Sharing
C2 IOCs are high-value threat intelligence. Share with:
- ARCYBER (mandatory)
- CTI community / ISAC (if applicable)
- Partner CPT/CSSP elements operating in same environment

### 7.3 Incident Closure Criteria
- [ ] All C2 channels disrupted and blocked
- [ ] All implants removed from all hosts
- [ ] All persistence mechanisms removed
- [ ] Dwell time and activity scope fully characterized
- [ ] All C2 IOCs disseminated to threat intelligence community
- [ ] Detection rules updated
- [ ] Enhanced monitoring active (60 days)
- [ ] Final incident report submitted

---

## QUICK REFERENCE CARD

```
C2 RESPONSE SEQUENCE
─────────────────────
1. IDENTIFY ALL BEACONING HOSTS (before blocking)
2. IMAGE KEY HOSTS (memory + disk, preserve C2 artifacts)
3. BLOCK C2 (firewall + DNS + proxy — all layers)
4. ISOLATE HOSTS (EDR or VLAN)
5. MONITOR FOR FALLBACK (adversary will try alternate channel)
6. ERADICATE IMPLANTS (all persistence mechanisms)

DWELL TIME = TIME C2 WAS ACTIVE.
THAT IS THE WINDOW FOR DATA ACCESS — ASSESS EVERYTHING.
```

---

**Classification:** UNCLASSIFIED // FOUO
**Playbook ID:** IR-PB-004 | Command & Control Response
**Prepared By:** CyberOpsPlanner System
**Date:** 2026-02-25
**Related Playbooks:** IR-PB-005 (Lateral Movement), IR-PB-007 (Data Exfiltration), IR-PB-010 (Persistence)
**Technical Reference:** `docs/technical/SOP/(d) command-and-control-response-playbook.docx`
