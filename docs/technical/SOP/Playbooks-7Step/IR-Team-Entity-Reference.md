# INCIDENT RESPONSE TEAM — ENTITY REFERENCE
## Roles, Responsibilities & Playbook Assignments
## CyberOpsPlanner | CPT / CSSP / DCO-RA Operations

**Classification:** UNCLASSIFIED // FOUO
**Version:** 1.1
**Effective Date:** 2026-02-25
**Authority:** FM 3-12 | ATP 3-12.3 | CJCSM 6510.01B | AR 25-2
**Owner:** Mission OIC / Element Lead

---

## 1. PURPOSE

This document defines every functional entity on a realistic incident response team, their responsibilities, their authorities, and which playbooks they own or support. Use this as the authoritative role assignment reference during incident response operations.

**BLUF:** Know your lane. Know your playbook. Know who makes the call.

---

## 2. INCIDENT RESPONSE TEAM STRUCTURE

```
┌──────────────────────────────────────────────────────────────────────┐
│                    INCIDENT COMMANDER (IC)                           │
│                    Mission OIC / Element Lead                        │
│   Decision authority | External reporting | Escalation chain        │
└─────────────────────────────┬────────────────────────────────────────┘
                              │
        ┌─────────────────────┼──────────────────────┐
        │                     │                      │
┌───────▼────────┐  ┌─────────▼────────┐  ┌─────────▼────────────┐
│  ANALYSIS CELL │  │  PLANNING CELL   │  │ INTELLIGENCE CELL    │
│                │  │                  │  │                      │
│ 17C Host       │  │ Cyber Ops        │  │ S-2 / Intel          │
│  Analyst       │  │  Planner         │  │  Analyst             │
│                │  │                  │  │                      │
│ 17C Network    │  │ Legal / JAG      │  │                      │
│  Analyst       │  │                  │  │                      │
└───────┬────────┘  └─────────┬────────┘  └─────────┬────────────┘
        │                     │                      │
        └─────────────────────┼──────────────────────┘
                              │
              ┌───────────────┼────────────────┐
              │               │                │
    ┌─────────▼──────┐  ┌─────▼────────┐  ┌───▼────────────┐
    │ IT OPS /       │  │ TIER 1 SOC / │  │ SYSTEM OWNER / │
    │ SYSADMIN       │  │ HELP DESK    │  │ MISSION OWNER  │
    └────────────────┘  └──────────────┘  └────────────────┘
```

---

## 3. ENTITY DEFINITIONS & RESPONSIBILITIES

---

### ENTITY 1: INCIDENT COMMANDER (IC) / MISSION OIC

**Who fills this role:** CPT / MAJ (Cyber Officer) / Element Lead
**Function:** Sole authority for incident decisions above analyst-level. Owns all external communication and reporting. Manages the incident commander battle rhythm.

**Core Responsibilities:**
- Declare incident severity (CAT I–IV)
- Authorize containment actions that impact production systems
- Authorize credential resets for privileged/service accounts
- Authorize network isolations affecting mission-critical infrastructure
- Manage all external reporting (ARCYBER, BN/BDE CDR, System Owner, Legal)
- Brief leadership on incident status
- Make risk acceptance decisions (e.g., mission continues with degraded posture)
- Authorize intelligence collection windows (controlled monitoring vs. immediate blocking)
- Make ransom payment decisions (Playbook: NEVER without legal/HQ chain)

**Decision Threshold:** Any action that:
- Affects a production system
- Has mission impact
- Requires external notification
- Involves legal authority considerations
- Exceeds analyst-level authority

**Owned Playbooks:**
| Playbook | Role |
|----------|------|
| IR-PB-018: Incident Commander Battle Rhythm | **OWNER** |
| IR-PB-003: Ransomware Response | **Decision authority — ransom, breach notification** |
| IR-PB-012: Insider Threat Response | **LEAD — legal/HR coordination** |
| ALL playbooks | Decision authority gatekeeper |

**Supported By:** All entities report to IC on all CAT I/II incidents.

---

### ENTITY 2: 17C HOST ANALYST

**Who fills this role:** 17C (Cyber Operations Specialist) / Senior Host Analyst
**Function:** Endpoint investigation, malware analysis, forensic timeline reconstruction, persistence hunting, artifact analysis.

**Core Responsibilities:**
- Triage EDR alerts — true positive / false positive determination
- Forensic collection (memory, disk image, artifacts) — chain of custody
- Malware static and behavioral analysis (sandbox, string extraction, IOC extraction)
- Persistence mechanism enumeration and eradication
- Forensic timeline reconstruction (file, registry, event log correlation)
- Baseline deviation analysis
- Host containment (via EDR)
- Evidence preservation and documentation

**Tool Set (Capability Level):**
- EDR (CrowdStrike, Defender for Endpoint, Carbon Black, Velociraptor)
- Forensic imaging (FTK, dd, Magnet Axiom)
- Memory analysis (Volatility)
- Static analysis (Ghidra, PEStudio, CyberChef, Detect It Easy)
- Sandbox (Cuckoo, Any.run, Joe Sandbox)
- Log analysis (Event log viewers, Timeline Explorer, log2timeline/plaso)

**Owned Playbooks:**
| Playbook | Role |
|----------|------|
| IR-PB-001: Malware Triage | **LEAD** |
| IR-PB-002: Malware Outbreak | **LEAD** |
| IR-PB-003: Ransomware Response | **LEAD (host eradication)** |
| IR-PB-006: Credential Theft | **LEAD** |
| IR-PB-009: Privilege Escalation | **LEAD** |
| IR-PB-010: Persistence Response | **LEAD** |
| IR-PB-011: Phishing Response | **LEAD (host artifacts)** |
| IR-PB-012: Insider Threat | **Support (forensic collection)** |
| IR-PB-013: Web Application Attack | **Support (web server forensics)** |
| IR-PB-016: Digital Forensics & Evidence Collection | **LEAD** |
| IR-PB-017: Threat Hunt | **Co-LEAD (host hunt)** |

---

### ENTITY 3: 17C NETWORK ANALYST

**Who fills this role:** 17C (Cyber Operations Specialist) / Senior Network Analyst
**Function:** Network traffic analysis, C2 detection, lateral movement network-layer analysis, beaconing pattern recognition, egress analysis.

**Core Responsibilities:**
- Network flow analysis (baseline vs. anomaly)
- Full packet capture (PCAP) analysis and session reconstruction
- C2 beaconing detection and characterization
- Lateral movement network-layer evidence collection
- Exfiltration volume/protocol analysis
- DDoS/DoS traffic analysis and mitigation coordination
- DNS analysis (tunneling, DGA, unusual queries)
- Firewall/proxy/NDR alert triage
- Network-level containment (block rules, ACLs, BGP)

**Tool Set (Capability Level):**
- NDR (Darktrace, ExtraHop, Vectra, Stamus Networks)
- Packet capture (Wireshark, Zeek, Arkime/Moloch)
- SIEM (Splunk, Elastic, Microsoft Sentinel)
- NetFlow analysis (ntopng, SolarWinds, ManageEngine)
- DNS analysis (PassiveDNS, DNStwist)
- Threat intel (MISP, OpenCTI, VirusTotal)

**Owned Playbooks:**
| Playbook | Role |
|----------|------|
| IR-PB-004: Command & Control Response | **LEAD** |
| IR-PB-005: Lateral Movement Response | **LEAD** |
| IR-PB-007: Data Exfiltration Response | **LEAD** |
| IR-PB-008: Denial of Service Response | **LEAD** |
| IR-PB-011: Phishing Response | **Support (email gateway, C2 callback)** |
| IR-PB-013: Web Application Attack | **LEAD** |
| IR-PB-014: Cloud/SaaS Compromise | **LEAD** |
| IR-PB-015: OT/ICS Incident Response | **LEAD (network analysis)** |
| IR-PB-017: Threat Hunt | **Co-LEAD (network hunt)** |

---

### ENTITY 4: CYBER OPERATIONS PLANNER

**Who fills this role:** Cyber Officer (17A) / Senior Planner / Element Lead
**Function:** MDMP integration, COA development, response posture planning, synchronization, reporting products, running estimates.

**Core Responsibilities:**
- Maintain cyber running estimate throughout incident
- Develop response COAs (from playbook procedures + local context)
- Coordinate between technical cells and command
- Produce reporting products (incident reports, SITREPs, AAR)
- Maintain PIR/RFI tracker aligned to incident
- Identify and resolve friction points, coordinate resource gaps
- Draft orders/directives for response actions
- Coordinate with supported organization (System Owner, Mission Owner)
- Manage battle rhythm and reporting schedule
- MDMP integration — incident informs Step 2/4 products

**Owned Playbooks:**
| Playbook | Role |
|----------|------|
| IR-PB-003: Ransomware Response | **Decision support — COA development** |
| IR-PB-007: Data Exfiltration Response | **Coordinate breach notification process** |
| IR-PB-008: Denial of Service Response | **Mission impact assessment** |
| IR-PB-012: Insider Threat Response | **Coordinate with Legal/HR** |
| IR-PB-015: OT/ICS Incident Response | **Mission impact + COA** |
| ALL playbooks | **Step 7 (Coordination & Reporting) — reporting products** |

---

### ENTITY 5: S-2 / INTELLIGENCE ANALYST

**Who fills this role:** S-2 NCO or Officer / All-Source Analyst / CTI Analyst
**Function:** Threat intelligence, actor attribution, MITRE ATT&CK mapping, PIR/RFI support, collection plan management.

**Core Responsibilities:**
- Develop and maintain threat actor profiles for supported organization
- Map incident IOCs/TTPs to MITRE ATT&CK
- Assess threat actor capability, intent, and opportunity in this OE
- Generate threat COAs (MLCOA/MDCOA) from incident evidence
- Manage PIR/RFI tracker — update based on incident findings
- Coordinate with ARCYBER intelligence branch
- Submit finished intelligence products (threat assessments, threat COAs)
- Assess attribution confidence based on forensic evidence
- Disseminate IOCs to appropriate audiences

**Owned Playbooks:**
| Playbook | Role |
|----------|------|
| IR-PB-017: Threat Hunt | **LEAD (hunt hypothesis development)** |
| ALL playbooks | **Step 2 (Detection) — threat intel input** |
| ALL playbooks | **Step 6 (Post-Incident Analysis) — MITRE mapping, attribution** |

---

### ENTITY 6: IT OPERATIONS / SYSADMIN

**Who fills this role:** System Administrator / Network Engineer / IT Operations NCO
**Function:** Infrastructure management, system restoration, network device administration, credential resets, patch application.

**Core Responsibilities:**
- Execute network isolation / VLAN changes (directed by IC)
- Apply firewall / ACL rules (directed by Network Analyst)
- Perform system rebuilds and restorations (directed by IC)
- Execute bulk credential resets
- Apply patches on directed timeline
- Manage backup systems and restoration procedures
- Maintain network device configurations
- Provide network architecture knowledge to analyst cells
- Execute technical hardening actions (directed by analyst cells)

**Owned Playbooks:**
| Playbook | Role |
|----------|------|
| IR-PB-002: Malware Outbreak | **Support — mass isolation, credential reset** |
| IR-PB-003: Ransomware Response | **LEAD — restoration / rebuild** |
| IR-PB-008: Denial of Service Response | **Support — ISP contact, routing changes** |
| IR-PB-015: OT/ICS Incident Response | **Critical support — OT system knowledge** |
| ALL playbooks | **Step 5 (Recovery) — system restoration** |

---

### ENTITY 7: LEGAL / JAG OFFICER

**Who fills this role:** Staff Judge Advocate / Legal Advisor
**Function:** Authority validation, notification obligation determination, insider threat legal guidance, ransom payment legality, law enforcement coordination.

**Core Responsibilities:**
- Validate legal authorities for all response actions (DCO, DCO-RA, Title 10/32)
- Determine breach notification obligations (PII, CUI, Privacy Act)
- Advise on insider threat investigation legality (consent, monitoring authority)
- Advise on ransom payment legality (OFAC sanctions, federal law)
- Coordinate with law enforcement (FBI, CISA) as appropriate
- Review all external-facing communications for legal compliance
- Advise on chain of custody requirements for potential prosecution

**Owned Playbooks:**
| Playbook | Role |
|----------|------|
| IR-PB-012: Insider Threat Response | **Co-LEAD (legal framework)** |
| IR-PB-003: Ransomware Response | **Critical support — ransom legality** |
| IR-PB-007: Data Exfiltration Response | **Critical support — breach notification** |
| ALL CAT I/II playbooks | **Step 7 support — notification obligations** |

---

### ENTITY 8: TIER 1 SOC / HELP DESK

**Who fills this role:** Tier 1 Analyst / SOC Analyst / Help Desk Technician
**Function:** Initial alert triage, ticket creation, user report intake, basic containment, escalation to Tier 2 (17C analysts).

**Core Responsibilities:**
- Monitor SIEM/EDR dashboards for alerts
- Triage alerts — obvious false positives vs. potential incidents
- Create incident tickets with initial triage information
- Intake and document user-reported issues
- Perform basic containment (per SOP — e.g., disable a user account on confirmed phish)
- Escalate to 17C Host/Network Analyst per severity criteria
- Maintain incident ticket throughout lifecycle
- Execute Nextcloud ticket workflow (see sop-nextcloud-ticket-workflow.docx)

**Owned Playbooks:**
| Playbook | Role |
|----------|------|
| IR-PB-001: Malware Triage | **First triage step — escalate to 17C** |
| IR-PB-011: Phishing Response | **Initial user report intake + escalation** |
| All playbooks | **Step 2 first actions — initial triage and ticket creation** |

---

### ENTITY 9: SYSTEM OWNER / MISSION OWNER

**Who fills this role:** Program Manager / CIO / Mission Commander / Asset Owner
**Function:** Decision authority for actions affecting their systems; accept/reject risk; coordinate mission impact.

**Core Responsibilities:**
- Authorize containment actions on owned systems
- Accept residual risk decisions (mission continues despite degraded posture)
- Coordinate mission-critical system prioritization for restoration
- Provide system architecture knowledge to analyst cells
- Sign off on restoration / return-to-network decisions
- Coordinate with IT Ops for maintenance windows
- Accept POA&M findings and commit to remediation timelines

**Owned Playbooks:**
| Playbook | Role |
|----------|------|
| IR-PB-015: OT/ICS Incident Response | **Critical decision authority** |
| IR-PB-003: Ransomware Response | **Data loss acceptance decisions** |
| ALL playbooks | **Step 5 (Recovery) — sign-off on restoration** |

---

## 4. PLAYBOOK OWNERSHIP MASTER TABLE

| Playbook | IC | Host Analyst | Network Analyst | Planner | S-2 | IT Ops | Legal | Tier 1 SOC | Sys Owner |
|----------|:--:|:------------:|:---------------:|:-------:|:---:|:------:|:-----:|:----------:|:---------:|
| PB-001 Malware Triage | Decision | **LEAD** | Support | Report | Intel | | | Initial | |
| PB-002 Malware Outbreak | Decision | **LEAD** | Support | Report | Intel | Support | | Initial | Notify |
| PB-003 Ransomware | Decision | **LEAD** | Support | COA | Intel | Restore | Legality | Initial | Approve |
| PB-004 C2 Response | Decision | Support | **LEAD** | Report | Intel | Support | | Initial | Notify |
| PB-005 Lateral Movement | Decision | Support | **LEAD** | Report | Intel | Support | | Initial | Notify |
| PB-006 Credential Theft | Decision | **LEAD** | Support | Report | Intel | Reset | | Initial | Notify |
| PB-007 Data Exfiltration | Decision | Support | **LEAD** | Notify | Intel | | Breach | Initial | Notify |
| PB-008 Denial of Service | Decision | | **LEAD** | Impact | Intel | ISP/Route | | Initial | Approve |
| PB-009 Priv Escalation | Decision | **LEAD** | Support | Report | Intel | | | Initial | Notify |
| PB-010 Persistence | Decision | **LEAD** | Support | Report | Intel | | | Initial | Notify |
| PB-011 Phishing | Decision | **LEAD** | Support | Report | Intel | | | **Initial** | Notify |
| PB-012 Insider Threat | **LEAD** | Forensics | Monitor | Coord | Intel | Preserve | **Co-LEAD** | | Notify |
| PB-013 Web App Attack | Decision | Support | **LEAD** | Report | Intel | Patch | | Initial | Notify |
| PB-014 Cloud/SaaS | Decision | Support | **LEAD** | Report | Intel | | | Initial | Notify |
| PB-015 OT/ICS | Decision | Support | **LEAD** | COA | Intel | **Critical** | | | **Approve** |
| PB-016 Digital Forensics | Decision | **LEAD** | Support | | | | | | |
| PB-017 Threat Hunt | Decision | **Co-LEAD** | **Co-LEAD** | Coord | **LEAD** | | | | |
| PB-018 IC Battle Rhythm | **LEAD** | Brief | Brief | Support | Brief | Brief | Brief | Brief | Brief |

**Legend:** LEAD = owns the playbook execution | Co-LEAD = shared ownership | Support = technical support | Decision = authority over key actions | Notify = notification recipient | Brief = receives status updates

---

## 5. ESCALATION PATHS

### Analyst → Element Lead
**Trigger:** Any of the following:
- True positive confirmed (any severity)
- Scope exceeds single system
- User with administrative privilege is suspect
- Unsure of classification or next step

### Element Lead → Mission OIC (IC)
**Trigger:** Any of the following:
- CAT I or CAT II confirmed
- Production system isolation required
- Privileged credential compromise suspected
- ARCYBER notification required
- Insider threat suspected
- Legal/authority question arises

### Mission OIC → BN/BDE CDR
**Trigger:** Any of the following:
- CAT I confirmed
- Mission impact (capability degraded or unavailable)
- Domain controller compromise
- OT/ICS system affected
- Data breach with significant PII or mission data
- Ransomware affecting multiple systems
- Insider threat confirmed

### Mission OIC → ARCYBER (Required Reporting)
**Trigger:** CAT I within 1 hour, CAT II within 8 hours, CAT III/IV within 24-72 hours.

---

## 6. CONTACT ROSTER TEMPLATE

| Role | Name | Phone | Email | Alt Contact |
|------|------|-------|-------|-------------|
| IC / Mission OIC | [NAME] | [PHONE] | [EMAIL] | [BACKUP] |
| Host Analyst Lead | [NAME] | [PHONE] | [EMAIL] | [BACKUP] |
| Network Analyst Lead | [NAME] | [PHONE] | [EMAIL] | [BACKUP] |
| Cyber Ops Planner | [NAME] | [PHONE] | [EMAIL] | [BACKUP] |
| S-2 / Intel Analyst | [NAME] | [PHONE] | [EMAIL] | [BACKUP] |
| IT Ops Lead | [NAME] | [PHONE] | [EMAIL] | [BACKUP] |
| Legal / JAG | [NAME] | [PHONE] | [EMAIL] | [BACKUP] |
| BN/BDE CDR | [NAME] | [PHONE] | [EMAIL] | [BACKUP] |
| ARCYBER Operations | [CLASSIFIED CHANNEL] | | | |
| System Owner | [NAME] | [PHONE] | [EMAIL] | [BACKUP] |
| FBI Cyber (via ARCYBER) | [CHANNEL] | | | |

---

## 7. AUTHORITY MATRIX (EXPANDED)

| Action | Tier 1 | Analyst | Element Lead | Mission OIC | BN/BDE CDR |
|--------|:------:|:-------:|:------------:|:-----------:|:----------:|
| Open incident ticket | ✓ | ✓ | | | |
| Classify incident (CAT) | | ✓ | Approve | | |
| Isolate non-critical host | | ✓ | | | |
| Isolate critical/production host | | | ✓ | Approve | |
| Isolate DC / auth infrastructure | | | | ✓ | Notify |
| Block outbound C2 (network level) | | | ✓ | Approve | |
| Emergency segment isolation | | | | ✓ | Notify |
| Reset standard user credential | | ✓ | | | |
| Reset admin / privileged credential | | | ✓ | Approve | |
| Domain-wide credential reset | | | | ✓ | Notify |
| Submit CAT I/II to ARCYBER | | | | ✓ | Notify |
| Notify System Owner | | | ✓ | | |
| Notify BN/BDE CDR | | | | ✓ | |
| Authorize DCO-RA action | | | | ✓ | Notify HQ |
| Insider threat investigation open | | | | ✓ + Legal | Notify |
| Ransom payment decision | | | | ✓ + Legal | Approve + HQ |
| Rebuild production system | | | | ✓ + Sys Owner | |
| AAR brief to leadership | | | | ✓ | Attend |

---

**Classification:** UNCLASSIFIED // FOUO
**Prepared By:** CyberOpsPlanner System
**Date:** 2026-02-25
**Version:** 1.1 (includes PB-011 through PB-018)
