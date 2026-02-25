# DENIAL OF SERVICE RESPONSE — INCIDENT RESPONSE PLAYBOOK
## 7-Step Framework | UNCLASSIFIED // FOUO

**Playbook ID:** IR-PB-008
**Version:** 1.0
**Classification:** UNCLASSIFIED // FOUO
**Threat Type:** Denial of Service — Volumetric / Protocol / Application Layer / Distributed
**Primary Role:** 17C Network Analyst (Lead) + Cyber Ops Planner (Mission Impact Assessment)
**Authority:** CJCSM 6510.01B | AR 25-2 | FM 3-12 | JP 3-12
**Created:** 2026-02-25
**Review Cycle:** Semi-annual or post-incident

**MITRE ATT&CK Primary Tactics:**
- T1498 — Network Denial of Service (Volumetric: UDP/ICMP/SYN flood; Reflection/Amplification)
- T1499 — Endpoint Denial of Service (HTTP flood, Slowloris, resource exhaustion)
- T1490 — Inhibit System Recovery (destroying recovery capability as part of attack)
- T1529 — System Shutdown/Reboot (forced reboot as availability attack)

**DoS Attack Types:**
- **Volumetric:** Flood with traffic exceeding link capacity (UDP flood, ICMP flood, amplification)
- **Protocol:** Exploit protocol weaknesses to exhaust network state (SYN flood, fragmentation)
- **Application Layer:** Target specific application with legitimate-looking requests (HTTP GET/POST flood, DNS query flood)
- **Distributed (DDoS):** Same as above but from multiple source IPs (botnet-based)

---

## BLUF

A DoS incident is an availability attack. The mission impact is direct and immediate — services are degraded or unavailable. The response is primarily a network and infrastructure operations problem, not a forensic problem. The goal is **restore availability first**, then **identify source** and **prevent recurrence**. Mission OIC makes the call on accepting degraded operations vs. full mitigation response.

**Unlike most incidents: Detection-to-mitigation must be measured in minutes, not hours.**

---

## STEP 1: PREPARATION

### 1.1 Required Capabilities
| Capability | Purpose |
|-----------|---------|
| DDoS mitigation service | Upstream scrubbing / blackholing |
| Network flow monitoring | Real-time traffic analysis |
| ISP/upstream provider contact | Upstream blocking request |
| Firewall rate limiting | Source IP blocking, traffic shaping |
| Load balancer / CDN | Traffic distribution and absorption |
| Out-of-band management access | Administer network while under attack |
| Failover / alternate connectivity | Maintain connectivity if primary link saturated |

### 1.2 Pre-Incident Preparations
- [ ] DDoS mitigation provider contracted and tested (if applicable)
- [ ] ISP emergency contact documented (NOC phone, 24/7 contact)
- [ ] Firewall rate limiting rules pre-configured for rapid activation
- [ ] Blackhole routing capability confirmed on border routers
- [ ] Failover link or alternate ISP available
- [ ] Out-of-band management path verified (separate from impacted link)
- [ ] Critical service availability baselines documented (normal load, latency, packet loss)

### 1.3 PACE Plan for Connectivity
- **Primary:** Normal network path
- **Alternate:** Secondary ISP or backup link
- **Contingency:** VPN over cellular (for management access)
- **Emergency:** Physical/out-of-band console access to network devices

---

## STEP 2: DETECTION & IDENTIFICATION

### 2.1 DoS/DDoS Detection Indicators
| Indicator | DoS Type | Detection Source |
|-----------|----------|-----------------|
| Link utilization near 100% | Volumetric | NetFlow, SNMP monitoring |
| Service response time spike | Application layer | Application monitoring, SIEM |
| Connection state table exhaustion (firewall) | SYN flood | Firewall monitoring |
| DNS query flood (amplification source) | Amplification | DNS server monitoring |
| ICMP flood (request or response) | Volumetric | NetFlow, NIDS |
| HTTP request flood to specific URL | Application layer | Web server logs, WAF |
| BGP route withdrawal or instability | Infrastructure attack | BGP monitoring |
| Sudden user-reported service unavailability | Any | Help desk, monitoring |

### 2.2 DoS Characterization (Complete Before Response)
Determine the following before initiating countermeasures:

**Traffic analysis:**
- What protocol/port is the flood traffic using?
- What are the source IP(s)? (Single source = DoS; Multiple = DDoS)
- Is the source IP spoofed? (If yes, upstream blocking less effective)
- What is the traffic volume (Mbps/Gbps)?
- Is traffic reflection/amplification being used? (e.g., DNS amplification — attacker IP is spoofed, victim is the reflection target)

**Impact analysis:**
- Which services/systems are degraded or unavailable?
- Is this affecting all users or specific segments?
- Is management access to network equipment affected?
- What is the mission impact? (Can the mission continue with degraded service?)

### 2.3 DoS vs. DDoS Response Difference
| Scenario | Primary Mitigation |
|----------|-------------------|
| Single source DoS | Block source IP at firewall / upstream |
| DDoS (multiple sources) | DDoS scrubbing service, upstream blackholing, rate limiting |
| Reflection/amplification | Block reflected protocol (DNS, NTP, memcached) to/from open resolvers |
| Application layer DDoS | WAF rules, rate limiting by IP/session, CAPTCHA challenge |
| Protocol flood (SYN) | SYN cookies, rate limiting, firewall state protection |

### 2.4 Severity Classification
| Scope | Category |
|-------|----------|
| Mission-critical service unavailable | CAT I |
| Multiple services degraded, mission impact | CAT II |
| Single non-critical service affected | CAT III |
| Degraded but service available | CAT III |

---

## STEP 3: CONTAINMENT

### 3.1 Mitigation Decision Framework
```
IDENTIFY ATTACK TYPE
       │
       ├── VOLUMETRIC → Link saturated?
       │      YES → ISP-level mitigation request + blackhole routing
       │      NO → Firewall rate limiting + source IP blocking
       │
       ├── PROTOCOL (SYN flood) → Enable SYN cookies + rate limiting
       │
       └── APPLICATION LAYER → WAF rules + rate limiting + CDN mitigation
```

### 3.2 Immediate Mitigation Actions
- [ ] **Contact ISP NOC** — Request upstream blocking or traffic scrubbing (if volumetric)
- [ ] **Activate DDoS mitigation service** — If contracted scrubbing/CDN service available
- [ ] **Block identified source IPs** — At firewall (for single-source or small botnet)
- [ ] **Apply rate limiting** — Per-IP connection rate limiting at firewall
- [ ] **Blackhole route** — Null-route the attacked destination IP (accepts service loss to protect infrastructure)
- [ ] **Enable SYN cookies** — If SYN flood confirmed
- [ ] **Notify Mission OIC** — Report impact and mitigation actions taken

### 3.3 Application Layer Specific Mitigation
For HTTP/HTTPS application flood:
- [ ] Enable Web Application Firewall (WAF) rules
- [ ] Rate limit requests per source IP
- [ ] Challenge suspicious sources (CAPTCHA if applicable)
- [ ] Temporarily block attacking country/ASN ranges (if attributed geographically)
- [ ] Reduce maximum connection limits on web server

### 3.4 Out-of-Band Management During Attack
Ensure the team can administer network devices during the attack:
- [ ] Confirm out-of-band access to firewalls, routers, switches is working
- [ ] Confirm management traffic is not impacted by attack
- [ ] Use dedicated management network or console access if primary path affected

---

## STEP 4: ERADICATION

### 4.1 Eradication for DoS Incidents
**DoS eradication is fundamentally different from malware incidents.** There is no implant to remove from your network. Eradication means:
1. Stopping the attack at the source or upstream
2. Closing the vulnerability that made the attack effective
3. Hardening to prevent same attack from succeeding again

### 4.2 Attack Source Investigation (Post-Containment)
After service is restored, investigate:
- Identify attack source as precisely as possible (IP block, ASN, botnet family if known)
- Determine if DoS is a diversion (attackers sometimes use DoS to distract while conducting other intrusions)
- **Check for concurrent intrusion activity** — DoS used as diversion is a common TTP

### 4.3 Vulnerability Remediation
Identify and remediate what made the DoS effective:
- Was there insufficient bandwidth capacity?
- Was the firewall not properly rate-limiting?
- Was a misconfigured open resolver contributing to amplification?
- Was an unpatched vulnerability exploited for application-layer attack?

### 4.4 Permanent Hardening Actions
| Attack Type | Hardening Action |
|-------------|-----------------|
| Volumetric DDoS | Increase upstream capacity or contract scrubbing service |
| SYN flood | Enable SYN cookies permanently; review firewall state table limits |
| DNS amplification | Close open resolvers; apply response rate limiting |
| HTTP flood | Implement WAF; enable connection rate limiting |
| General | Implement BCP38 (anti-spoofing on your own network's egress) |

---

## STEP 5: RECOVERY

### 5.1 Service Restoration
After attack subsides or is blocked:
- [ ] Verify service availability (functional test)
- [ ] Verify normal response times restored
- [ ] Confirm no residual attack traffic
- [ ] Remove emergency blocks that may impact legitimate users
- [ ] Restore any temporarily restricted services

### 5.2 Graduated Rate Limit Relaxation
After blocking attack sources:
1. Maintain rate limiting at slightly elevated threshold initially
2. Gradually relax to normal threshold as traffic stabilizes
3. Monitor for resumption of attack

### 5.3 Failover Recovery
If failover link was activated:
- [ ] Confirm primary link restored to normal
- [ ] Verify no residual attack before switching back to primary
- [ ] Update routing/DNS as needed

### 5.4 Post-Recovery Monitoring (30 Days)
- Monitor for attack resumption (DDoS attackers often retry)
- Monitor for other intrusion activity (DoS-as-diversion — check for compromise during attack)
- Monitor ISP scrubbing effectiveness if service remains active

---

## STEP 6: POST-INCIDENT ANALYSIS

### 6.1 DoS Incident Timeline
```
[DATE/TIME] Attack started (from traffic analysis)
[DATE/TIME] First detection (alert or user report)
[DATE/TIME] Attack characterized (type, source, volume)
[DATE/TIME] Mitigation initiated
[DATE/TIME] ISP/scrubbing engaged (if applicable)
[DATE/TIME] Attack mitigated / service restored
[DATE/TIME] Attack stopped
Total availability impact: [minutes/hours]
Maximum traffic volume: [Gbps/Mbps]
Services affected: [list]
Mission impact: [description]
```

### 6.2 DoS-as-Diversion Check
**This is mandatory for every significant DoS incident.**

During the DoS attack window:
- Was any other intrusion activity occurring simultaneously?
- Were there authentication anomalies on any systems during the attack?
- Were any new connections established from internal to external during the attack?
- Were any security tools disabled or logs cleared during the attack window?

If yes to any: Escalate immediately — treat as concurrent intrusion response.

### 6.3 Mitigation Effectiveness Assessment
- How quickly was mitigation applied?
- What was the total service downtime?
- What would have reduced downtime further?
- Is contracted scrubbing service adequate for observed attack volume?

---

## STEP 7: COORDINATION & REPORTING

### 7.1 Reporting Timeline
| Event | Recipient | Deadline |
|-------|-----------|----------|
| Service degradation confirmed | Mission OIC | Immediately |
| CAT classification | ARCYBER | Within 1-24 hours (per CAT level) |
| Mitigation action notification | System Owner + Mission OIC | Before action |
| Service restoration | Mission OIC | Immediately upon restoration |
| Attack characterization report | ARCYBER | Within 24 hours |
| Final incident report | ARCYBER + BN/BDE CDR | Within 72 hours of closure |

### 7.2 Mission Impact Reporting
Brief Mission OIC on:
- Duration of service unavailability
- Which specific services/capabilities were affected
- Mission tasks affected or delayed
- Estimated time to full restoration
- Risk of attack resumption

### 7.3 ISP/Provider Coordination
- Document all ISP NOC interactions (time, contact, action requested, result)
- Obtain attack traffic data from ISP for incident report
- Discuss upstream mitigation options and SLAs

### 7.4 Incident Closure Criteria
- [ ] Attack stopped (no ongoing attack traffic)
- [ ] All services restored to normal performance
- [ ] Attack characterized (type, source if known, volume)
- [ ] Vulnerability closed (attack was able to succeed because of X — X is now fixed)
- [ ] No concurrent intrusion activity confirmed
- [ ] Enhanced monitoring active (30 days)
- [ ] Final incident report submitted
- [ ] Hardening actions implemented or POA&M created

---

## QUICK REFERENCE CARD

```
DoS/DDoS RESPONSE
──────────────────
1. CHARACTERIZE ATTACK (type, volume, source)
2. CALL ISP NOC (if volumetric — upstream mitigation)
3. APPLY FIREWALL RATE LIMITING + SOURCE BLOCK
4. NOTIFY OIC (mission impact assessment)
5. CHECK FOR CONCURRENT INTRUSION (DoS = common diversion TTP)
6. RESTORE SERVICE → HARDEN → MONITOR

VOLUMETRIC DDoS = UPSTREAM IS THE ONLY REAL SOLUTION.
FIREWALL BLOCKING CANNOT STOP LINK SATURATION.
```

---

**Classification:** UNCLASSIFIED // FOUO
**Playbook ID:** IR-PB-008 | Denial of Service Response
**Prepared By:** CyberOpsPlanner System
**Date:** 2026-02-25
**Related Playbooks:** IR-PB-001 (Malware Triage — check for concurrent malware during DoS), IR-PB-004 (C2 — check for C2 during DoS diversion)
**Technical Reference:** `docs/technical/SOP/(d) denial-of-service-response-playbook.docx`
