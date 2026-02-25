# OT / ICS / SCADA INCIDENT RESPONSE — INCIDENT RESPONSE PLAYBOOK
## 7-Step Framework | UNCLASSIFIED // FOUO

**Playbook ID:** IR-PB-015
**Version:** 1.0
**Classification:** UNCLASSIFIED // FOUO
**Threat Type:** Operational Technology / Industrial Control System / SCADA Compromise or Attack
**Primary Lead:** 17C Network Analyst (IT/OT boundary analysis)
**Supporting Entities:** IT Ops / OT Engineers (system knowledge), Cyber Ops Planner (mission impact COA), System/Mission Owner (operational decisions), S-2 (attribution)
**Notification:** Mission OIC (immediately) | BN/BDE CDR | Mission Owner | ARCYBER
**Authority:** CJCSM 6510.01B | AR 25-2 | FM 3-12 | ICS-CERT Guidelines | NIST SP 800-82 (ICS Security)
**Created:** 2026-02-25

**MITRE ATT&CK Framework:** ICS ATT&CK (not Enterprise ATT&CK — different technique set for OT)
**ICS ATT&CK Primary Tactics:**
- T0817 — Drive-by Compromise (IT to OT pivot via internet-facing system)
- T0866 — Exploitation of Remote Services (VPN/RDP into OT network)
- T0846 — Remote System Discovery (OT asset enumeration)
- T0855 — Unauthorized Command Message (attacker sending control commands)
- T0813 — Denial of Control (preventing operators from controlling systems)
- T0831 — Manipulation of Control (causing physical impact via control system)
- T0879 — Damage to Property (intentional physical damage via cyber means)

**OT System Types Covered:**
- SCADA (Supervisory Control and Data Acquisition)
- DCS (Distributed Control System)
- PLC (Programmable Logic Controller)
- HMI (Human Machine Interface)
- Historian servers (OT data collection)
- OT network infrastructure (switches, firewalls at Purdue model zones)

---

## BLUF

OT/ICS incidents are categorically different from IT incidents. **Physical impact is possible.** A miscalculated response action (incorrect isolation, improper shutdown) can cause more damage than the attack itself. Every response action in an OT environment must be coordinated with OT engineers and Mission/System Owners who understand the physical consequences. Cyber responders do not unilaterally take actions in OT environments.

**The OT response mantra:** Safety first. Mission continuity second. Investigation third.

**Critical OT principle:** In IT, isolate first, ask later. In OT, **coordinate first, never isolate unilaterally**. An OT system isolated at the wrong time may cause a physical process to lose control, run in an unsafe state, or fail in a dangerous manner.

---

## STEP 1: PREPARATION

### 1.1 Required Capabilities
| Capability | Entity | Purpose |
|-----------|--------|---------|
| OT network visibility (passive monitoring only) | Network Analyst | Asset discovery, traffic baseline (passive — do not use active scanners in OT) |
| IT/OT boundary monitoring (Purdue Zone 3.5 / DMZ) | Network Analyst | Detect IT-to-OT lateral movement |
| OT asset inventory (current) | IT Ops + OT Engineers | Know what's there |
| OT engineer support | IT Ops + Mission Owner | Physical process knowledge — required for any response action |
| Out-of-band management for OT network | IT Ops | Access control plane without impacting OT traffic |
| Manual operation procedures | Mission Owner / OT Engineers | Fallback if cyber systems unavailable |

### 1.2 Pre-Incident OT Security Requirements
- [ ] IT/OT network segmentation enforced (Purdue Model or equivalent)
- [ ] No direct internet access from OT network
- [ ] Jump server / DMZ enforced for any IT-to-OT access
- [ ] Passive OT monitoring deployed (Dragos, Claroty, Nozomi — or equivalent)
- [ ] OT asset inventory current (all PLCs, HMIs, historians, SCADA servers documented)
- [ ] Backup control procedures (manual operation procedures documented and trained)
- [ ] OT vendor emergency contacts documented
- [ ] IT/OT incident coordination procedures established with Mission Owner

### 1.3 Purdue Model Zone Awareness
```
Zone 5: Enterprise Network (standard IT)
Zone 4: Business Systems (ERP, historian)
Zone 3.5: DMZ / IT-OT Boundary (CRITICAL monitoring point)
Zone 3: Operations / SCADA Servers, Historians
Zone 2: HMIs, Engineering Workstations
Zone 1: Controllers (PLCs, DCS)
Zone 0: Field Devices (sensors, actuators, valves)
```
Incidents at Zone 2 and below have direct physical process impact potential.
All response coordination with OT engineers is MANDATORY for Zone 2 and below actions.

---

## STEP 2: DETECTION & IDENTIFICATION

### 2.1 OT Incident Detection Sources
| Source | What It Detects |
|--------|----------------|
| OT passive monitoring (Dragos/Claroty) | New assets, protocol anomalies, unauthorized commands |
| IT/OT DMZ firewall logs | Unauthorized traffic crossing from IT to OT zones |
| HMI / SCADA operator alerts | Unexpected system behavior, alarm floods, process anomalies |
| Historian data anomalies | Process values outside normal ranges |
| OT vendor monitoring | Remote access anomalies, firmware modification attempts |
| IT SIEM (if OT boundary logs ingested) | IT-side indicators of OT-targeted attack |

### 2.2 OT Attack Pattern Identification
**Phase 1 (IT Network — Standard Enterprise Tactics):**
- Phishing / initial access on IT network
- Lateral movement toward OT-connected systems (jump servers, historians)
- Credential theft targeting OT system accounts
- Reconnaissance of OT network topology from IT side

**Phase 2 (OT-Adjacent — Reconnaissance):**
- Enumeration of OT assets (ICS-specific protocols: Modbus, DNP3, S7, EtherNet/IP)
- Mapping of PLC/HMI configurations
- Collection of OT documentation (PLC ladder logic, process diagrams)

**Phase 3 (OT Network — Impact):**
- Manipulation of control commands (setpoints, valve positions, circuit breakers)
- HMI/SCADA disruption (operators lose visibility or control)
- Denial of control (operators cannot control the physical process)
- Physical impact (process runs in unsafe state, equipment damage)

### 2.3 17C Network Analyst — IT/OT Boundary Analysis
Focus initial analysis on the IT/OT boundary:
1. What IT systems have connectivity into the OT DMZ?
2. Any new connections crossing from IT zone to OT zone?
3. Any unusual protocols being used at the boundary?
4. Any VPN/remote access sessions into OT network from unusual sources?
5. Any OT device attempting outbound internet connections?

### 2.4 Severity Classification
| Situation | Category | Note |
|-----------|----------|------|
| Physical process impact confirmed | CAT I | Safety emergency response may be needed |
| Control system command manipulation | CAT I | Coordinate with Mission Owner immediately |
| HMI/SCADA unavailable (operators lost control) | CAT I | Manual operations activation |
| OT network compromise confirmed (no physical impact yet) | CAT I | Pre-impact response window |
| Attacker at IT/OT boundary (not yet in OT) | CAT I | Contain before OT penetration |
| IT-only attack against OT-supporting systems | CAT II | |

---

## STEP 3: CONTAINMENT

### 3.1 The OT Containment Rule
**Coordinate with OT engineers BEFORE any isolation action in OT network.**

Questions to answer with OT engineers before any containment action:
1. What is the physical consequence of isolating this device?
2. Can the physical process continue safely without this device?
3. Is there manual override available for this process?
4. What is the safety consequence of this device being unavailable?
5. Is there a safe state to put the system in before isolation?

### 3.2 Phased Containment Decision Framework
```
PHYSICAL IMPACT ACTIVE OR IMMINENT?
     │
     YES → SAFETY EMERGENCY FIRST (coordinate with OT engineers for safe shutdown/manual control)
     │     THEN cyber containment
     │
     NO → Is attacker in OT network or at the boundary?
            │
            AT BOUNDARY → Close the crossing point (DMZ firewall rule)
            │              Do NOT isolate OT devices without OT engineer sign-off
            │
            INSIDE OT → Coordinate with OT engineers for safe containment
                         Manual operations readiness before ANY isolation
```

### 3.3 IT-Side Containment (Network Analyst Lead — No OT Engineer Coordination Required)
Actions on IT side of boundary (safe to take unilaterally):
- [ ] Isolate IT systems that the attacker used to reach OT boundary
- [ ] Close unauthorized IT-to-OT firewall rules
- [ ] Block attacker on IT network (EDR isolation of IT hosts)
- [ ] Disable any unauthorized VPN accounts used to access OT network
- [ ] Increase logging on IT/OT DMZ to maximum

### 3.4 OT-Side Containment (Must Be Coordinated With OT Engineers)
OT-side actions require OT engineer sign-off:
- [ ] Confirm manual operation capability available (fallback confirmed before isolation)
- [ ] Coordinate with Mission Owner — are operations safe to suspend?
- [ ] Isolate specific compromised OT devices per OT engineer guidance
- [ ] Segregate OT zones below area of compromise (limit blast radius within OT)

### 3.5 Manual Operations Activation (Mission Owner Decision)
If OT system must be taken offline for response:
- [ ] Mission Owner activates manual operation procedures
- [ ] OT engineers supervise manual operations
- [ ] Cyber responders do NOT direct physical process operations
- [ ] Maintain communications with Mission Owner on cyber response timeline vs. manual operation endurance

---

## STEP 4: ERADICATION

### 4.1 OT Eradication Principles
- **Do not re-image PLCs/controllers without vendor support** — OT device firmware is proprietary
- **Do not patch OT systems during active operations without Mission Owner approval**
- **OT vendors must validate firmware integrity** before devices return to service
- **Physical inspection may be required** — cyber incidents in OT can require physical assessment of controlled equipment

### 4.2 OT Eradication Actions
1. **Identify attacker access path into OT** (which IT system, which credential, which protocol)
2. **Close the access path** (close firewall rule, disable account, patch jump server)
3. **Validate OT device integrity** (firmware hash verification, vendor-assisted validation)
4. **Remove any attacker-installed tools** on OT-adjacent IT systems (historians, SCADA servers)
5. **Reset all credentials** used for OT access (domain accounts, local OT accounts, vendor accounts)
6. **Validate control system configurations** (verify setpoints, configurations, logic not modified)

### 4.3 ICS-Specific Eradication Coordination
- OT vendor engagement (Siemens, Rockwell, Honeywell, etc.) for device validation
- ICS-CERT notification for industrial control system incident (via ARCYBER channel)
- Physical inspection of critical equipment for signs of impact

---

## STEP 5: RECOVERY

### 5.1 OT Recovery Sequence
1. Confirm all attacker access paths closed
2. OT vendor validates device firmware and configuration integrity
3. Physical process engineers validate system in safe state
4. Restore automated control in phased approach (not all at once)
5. Enhanced monitoring during restoration period
6. Mission Owner sign-off on each phase of restoration

### 5.2 IT/OT Boundary Hardening Before Restoration
- [ ] All unauthorized IT-to-OT connections removed from firewall
- [ ] Jump server access requires MFA
- [ ] OT access logging confirmed active (all connections logged)
- [ ] Passive OT monitoring confirmed active
- [ ] Vendor remote access restricted (time-limited, monitored sessions only)

### 5.3 Enhanced OT Monitoring (90 Days)
- Continuous OT passive monitoring at elevated alerting threshold
- Daily review of IT/OT boundary traffic
- Weekly review of OT asset inventory for new/changed devices
- Alert on any new OT asset or protocol anomaly

---

## STEP 6: POST-INCIDENT ANALYSIS

### 6.1 OT Incident Timeline
```
[DATE/TIME] IT compromise (initial access on IT network)
[DATE/TIME] IT-to-OT lateral movement attempt
[DATE/TIME] OT network access achieved
[DATE/TIME] OT reconnaissance / enumeration
[DATE/TIME] OT impact activity (if reached)
[DATE/TIME] Physical impact (if caused)
[DATE/TIME] Detection
[DATE/TIME] IT-side containment
[DATE/TIME] OT-side containment (coordinated)
[DATE/TIME] OT eradication complete
[DATE/TIME] Physical operations restored
Physical process impact: [YES/NO — description if yes]
Equipment damage: [YES/NO — description]
```

### 6.2 ICS ATT&CK Mapping
Map all observed techniques to MITRE ICS ATT&CK matrix (not Enterprise ATT&CK). The ICS ATT&CK matrix has separate tactics appropriate for OT environments including:
- Inhibit Response Function
- Impair Process Control
- Impact

### 6.3 Mission Impact Assessment (Planner Lead)
- Duration of OT unavailability
- Mission tasks delayed or degraded
- Physical process consequences (equipment stress, product loss, safety events)
- Residual risk during recovery period

### 6.4 Architecture Recommendations
- Purdue Model zone enforcement gaps (if IT-to-OT boundary was traversed)
- OT remote access policy (vendor access is the most common attack vector)
- OT monitoring deployment (passive — never active scanning in OT)
- OT patch management process (scheduled maintenance windows)

---

## STEP 7: COORDINATION & REPORTING

### 7.1 OT Incident Reporting (Additional Stakeholders)
| Recipient | When | What |
|-----------|------|------|
| Mission OIC | Immediately | Any OT indicator |
| BN/BDE CDR | Immediately (OT compromise) | Mission impact assessment |
| Mission Owner | Immediately | Operational decision authority |
| ARCYBER | Within 1 hour (CAT I) | Per CJCSM 6510.01B |
| ICS-CERT / CISA (via ARCYBER) | Within 24 hours | Critical infrastructure coordination |
| OT Vendor | As soon as possible | Technical support for device validation |
| Safety Officer | If physical safety event | Separate from cyber reporting chain |

### 7.2 Physical Consequence Documentation
If any physical impact occurred:
- Document all physical process consequences (equipment, product, personnel safety)
- Safety Officer and Mission Owner document separately from cyber incident report
- Coordinate with Legal on liability and reporting requirements

### 7.3 Incident Closure Criteria
- [ ] All attacker access paths closed
- [ ] OT device integrity validated (firmware, configuration)
- [ ] Physical process restored to full operation
- [ ] IT/OT boundary hardened
- [ ] All OT credentials rotated
- [ ] ICS-CERT notification made
- [ ] Enhanced OT monitoring active (90 days)
- [ ] Mission impact assessment completed
- [ ] Final incident report submitted

---

## QUICK REFERENCE CARD

```
OT/ICS INCIDENT RESPONSE RULES
────────────────────────────────
SAFETY FIRST — before any cyber action, ask: what is the physical consequence?
COORDINATE WITH OT ENGINEERS — never isolate OT devices unilaterally
MANUAL OPERATIONS READY — before any OT isolation
IT-SIDE = YOUR LANE — contain on IT side freely
OT-SIDE = COORDINATED — every action requires OT engineer sign-off
DO NOT ACTIVE SCAN OT NETWORKS — passive monitoring only

WRONG ISOLATION IN OT CAN CAUSE MORE DAMAGE THAN THE ATTACK.
```

---

**Classification:** UNCLASSIFIED // FOUO
**Playbook ID:** IR-PB-015 | OT/ICS Incident Response
**Primary Lead:** 17C Network Analyst (IT/OT analysis) | Mission Owner (OT operational decisions)
**Prepared By:** CyberOpsPlanner System | **Date:** 2026-02-25
**ICS ATT&CK Reference:** `docs/technical/SOP/MITRE ATT&CK/ics-attack-v11.1.xlsx`
**Related Playbooks:** IR-PB-005 (Lateral Movement — IT-to-OT), IR-PB-006 (Credential Theft), IR-PB-008 (Denial of Service)
