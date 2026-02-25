# IPB / Cyber Terrain Model

## Cyber Terrain Assessment Framework

This document defines how to model cyberspace terrain during Intelligence Preparation of the Operational Environment (IPB). Use this framework to develop your cyber environment assessment, identify key terrain, and guide collection planning.

---

## Three-Layer Cyber Terrain Model

### Physical Layer
**What:** Locations, infrastructure, data centers, hosting, links, endpoints, OT/IT boundaries

**Key elements:**
- Data center locations (on-premise, cloud regions, CDN locations)
- Network edge points (gates, firewalls, WAN links, internet egress)
- End-user locations (buildings, remote work sites, deployed assets)
- Operational technology boundaries (OT systems, SCADA, ICS connected to IT)
- Third-party connections (partner networks, ISP contracts, cloud providers)

**Critical terrain examples:**
- Your primary internet egress (single point of failure for external comms)
- Data center hosting classified/sensitive information
- OT boundaries (where IT connects to physical systems)
- Backup/redundant sites (can threat reach them?)

**Collection focus:**
- Asset inventory (what systems are where?)
- Network topology (how is everything connected?)
- Hosting contracts (who controls critical infrastructure?)
- Redundancy/failover architecture (can we survive loss of one site?)

---

### Logical Layer
**What:** Addressing, routing/switching domains, identity stores, trust relationships, major services, segmentation, access controls

**Key elements:**
- Network addressing scheme (subnets, VLAN boundaries, DMZs)
- Routing domains (BGP ASNs, internal routing protocols)
- Identity stores (Active Directory, LDAP, cloud directory services)
- Trust relationships (domain trusts, cross-forest trusts, federation)
- Major services and dependencies (DNS, DHCP, NTP, authentication systems)
- Segmentation and access controls (firewalls, network segmentation, NAC policies)
- Data flows (what systems talk to what, where does sensitive data flow?)

**Critical terrain examples:**
- Your primary domain controller (if compromised, attacker controls all authentication)
- DNS server (if compromised or redirected, attacker can control network traffic)
- Internet proxy (central logging point but also single point of leverage for attacker)
- Sensitive data repositories (where is customer data, proprietary info, PII stored?)
- Segmentation boundaries (what would prevent lateral movement?)

**Collection focus:**
- Network segmentation design (how isolated are critical assets?)
- Identity architecture (how are users/services authenticated?)
- Data flow mapping (sensitive data paths)
- Access control rules (what's restricted? What's wide open?)
- Trust relationships (what could be abused for lateral movement?)

---

### Persona Layer
**What:** Privileged roles, user groups, service accounts, API identities, key administrators, third-party access, shared credentials

**Key elements:**
- Administrative accounts (domain admins, local admins, privileged users)
- Service accounts (system accounts that run services/applications)
- API identities (cloud service principals, OAuth tokens, API keys)
- Delegation (who can act on behalf of whom?)
- Third-party access (who has vendor/partner access to your systems?)
- Shared credentials (are there shared passwords? Documented anywhere?)
- Privileged groups (who belongs to critical groups? How are they monitored?)

**Critical terrain examples:**
- Domain administrator accounts (compromise = full domain control)
- Service account for backup systems (can access all backed-up data)
- Cloud service principal with broad permissions (compromise = cloud infrastructure control)
- Shared administrative password (any compromise gets admin access)
- Overly privileged regular users (could be pivot point for escalation)

**Collection focus:**
- Privilege escalation paths (how would attacker go from user → admin?)
- Persistence mechanisms (how would attacker maintain access?)
- Delegation risks (could attacker impersonate a privileged account?)
- Third-party access inventory (who has what access? Is it still needed?)
- Credential hygiene (are privileges properly isolated? Are shared passwords in use?)

---

## Required IPB Outputs (Cyber-Specific)

### 1. Operational Environment Definition
**What:** Boundary of your cyber domain (what systems are in scope?)

**Include:**
- System list (all servers, workstations, devices in the OE)
- Boundaries (where does "your network" end? Do you own/control it?)
- Interconnections (how does your network connect to others?)
- Scope limitations (what's excluded? Why?)

**Example:**
```
Our OE is the XYZ Division headquarters network:
- 200 workstations across 3 buildings
- 15 servers (email, file, domain, web)
- Connected to higher HQ via dedicated link (ISP contracted by higher HQ)
- NOT in scope: higher HQ network, deployed brigade networks
```

---

### 2. Environmental Effects (Cyber Constraints & Opportunities)

**Constraints** (things that limit our cyber options):
- Classification requirements (must protect certain systems at SECRET level)
- Availability requirements (24/7 uptime for critical systems)
- Bandwidth limitations (satellite links, limited WAN capacity)
- Personnel limitations (only 3 cyber personnel available)
- Tool limitations (can't use certain security tools due to policy/licensing)

**Opportunities** (things we can leverage):
- Redundant internet egress (can route traffic multiple ways)
- Cloud-ready architecture (can scale quickly)
- Strong segmentation (can contain threats quickly)
- Mature logging (can detect threats faster)
- Well-documented systems (easier to defend what we understand)

**Example:**
```
CONSTRAINTS:
- Only 2 person-hours per day for monitoring (no 24/7 manning)
- Must maintain 99.9% uptime for email (can't take systems down for patching)
- Classified systems must use air-gap or approved cross-domain solution

OPPORTUNITIES:
- Cloud backup system (can quickly restore from cloud if disaster strikes)
- Robust network segmentation (can isolate compromised segment without affecting whole network)
- EDR tools on 80% of endpoints (good detection capability)
```

---

### 3. Threat Model
**What:** What the threat can do in YOUR environment

**Include:**
- Threat actor capabilities (tools, techniques, skill level)
- Threat intent (what are they after? Data? Disruption? Espionage?)
- Opportunities in your OE (what in your environment makes them successful?)
- Likely access paths (how would they get in? How would they persist?)
- Constraints on threat (what would make them fail?)

**Example:**
```
Threat: Nation-state (APT-XX)

CAPABILITY:
- Zero-day exploits (custom malware)
- Advanced social engineering
- Supply chain compromise capability
- Persistent C2 infrastructure

INTENT:
- Steal XYZ Division operational plans for next month's exercise

OPPORTUNITIES IN OUR OE:
- Unpatched systems in DMZ (vulnerability in web proxy)
- Users click phishing links (historical data shows 15% click rate)
- Backup admin has shared password with 3 people (credential compromise vector)
- External-facing server not monitored 24/7 (we might not detect breach for days)

LIKELY ACCESS PATH:
1. Spearphish division G-3 (high probability)
2. Compromise G-3 workstation (standard Windows domain join)
3. Lateral movement to file server (shared password on backup admin account)
4. Copy operation plan files
5. Exfiltrate via VPN or proxy (we have dual internet egress)

CONSTRAINTS ON THREAT:
- Must avoid detection for 30 days (need dwell time for exfil)
- Cannot use zero-days on critical systems (might flag us to defenders)
```

---

### 4. Threat Course of Action (COA) Development

**Most Likely COA (MLCOA):** Most probable threat behavior given threat capabilities and opportunities

**Most Dangerous COA (MDCOA):** Most damaging to you if it occurs

**For each COA, map:**
- Threat entry method
- Persistence mechanisms
- Lateral movement path
- Objective achievement (how threat gets what they want)
- Exfiltration method
- Decision points (where would we detect them?)
- NAIs/TAIs (where/when would we see indicators?)

**Example MLCOA:**
```
ENTRY: Spearphishing email to brigade staff officer
PERSISTENCE: Scheduled Task, Registry Run key (standard Windows persistence)
LATERAL: Use legitimate admin credentials (harvested from workstation)
OBJECTIVE: Map drive to G-3 folder, download operation plans
EXFIL: Email to external account via compromised workstation
DETECTION POINTS:
- Unusual outbound email to external recipient (should detect)
- Anomalous domain queries for file servers (SIEM could alert)
- Lateral movement to G-3 server (should log logon event)
```

---

### 5. Intelligence Preparation Outputs: PIRs & Collection

**Priority Intelligence Requirements (PIRs):**
| PIR | Question | Why It Matters | Collection Focus |
|-----|----------|----------------|------------------|
| PIR 1 | Are our perimeter systems patched to current level? | Affects threat's entry capability | Vulnerability scan, patch reports |
| PIR 2 | What shared passwords exist in critical systems? | Affects threat's privilege escalation | Credential audit, admin interviews |
| PIR 3 | Which users are targeted by phishing? What's our click rate? | Affects threat's initial access success | Email security logs, user training data |

**Collection focus (what to monitor to confirm/deny threat COAs):**
- Phishing email indicators (do we see spear-phishing for our personnel?)
- Credential attack indicators (do we see failed login attempts from suspicious sources?)
- Lateral movement indicators (do we see admin accounts being used from unusual locations?)
- Data access indicators (do we see unusual access to sensitive data repositories?)

---

## How to Use This Model

### In Planning
1. **Map your OE** using the three-layer model (physical/logical/persona)
2. **Identify critical terrain** (systems/paths critical to mission success)
3. **Assess threat** against your specific terrain (threat tailored to YOUR network)
4. **Develop threat COAs** scoped to your environment
5. **Plan collection** against threat decision points

### In Execution
1. **Monitor against threat COAs** (watch for indicators that threat COA is unfolding)
2. **Track decision points** (when do we decide: is this a threat action or benign?)
3. **Adjust collection** if threat behavior changes

### In Wargaming/Planning
1. **Use threat COAs** as basis for "Red Team" (threat representative) in wargaming
2. **Map friction points** (where does our defense work? Where doesn't it?)
3. **Identify gaps** (what collection do we lack? What capabilities?)

---

## Reference Doctrine

- **ATP 2-01.3** — Intelligence Preparation of the Battlefield (includes cyberspace appendix)
- **FM 2-0** — Intelligence
- **FM 3-12** — Cyberspace and Electromagnetic Warfare Operations

---

**Use this framework to ground your cyber terrain assessment in realistic threat context.**
