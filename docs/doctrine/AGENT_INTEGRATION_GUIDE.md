# Doctrine Library Integration Guide
**How Agents Use docs/doctrine/ to Ground Responses**

---

## Overview

All specialized agents reference the doctrine library (33 publications) to provide grounded, doctrinally-aligned responses for MDMP planning, staff section products, intelligence, and tactical analysis. This guide explains how each agent leverages the library and how to request specific doctrinal support.

---

## Quick Reference by Agent

### Cyber Operations Planner
**Goal:** Ground MDMP products, COA development, and cyber task integration in authoritative doctrine

**Key Doctrine Used:**
- **ADP 5-0, FM 5-0** → Operations process phases, MDMP procedures, running estimates
- **FM 6-0** → Commander/staff organization, **OPORD annex formats A-Z**, staff responsibilities
- **FM 3-12 & ATP 3-12.3** → Cyber tasks (OCO, DCO, DODIN ops), control measures, synchronization
- **ATP 2-01.3** → Cyberspace terrain modeling (OAKOC-style analysis)
- **MITRE ATT&CK** → Threat COA development, indicator identification
- **JP 3-12** → Joint relationships, USCYBERCOM command structure

**When to Reference:**
- Drafting cyber annexes or running estimates
- Building threat COAs and PIR/RFI lists
- Integrating cyber into joint operations
- Wargaming cyber friction or decision points

---

### 17C Host Analyst
**Goal:** Ground endpoint analysis in intelligence methodology and threat frameworks

**Key Doctrine Used:**
- **ATP 2-01.3** → Persona layer IPB (privileged roles, service accounts, deviations from baseline)
- **FM 2-0** → Intelligence collection discipline, source validation
- **MITRE ATT&CK** → Technique mapping, TTP recognition, observable behaviors
- **ATP 3-12.3** → Endpoint tasking, forensic requirements, logging standards

---

### 17C Network Analyst
**Goal:** Ground traffic analysis in network terrain and threat detection logic

**Key Doctrine Used:**
- **ATP 2-01.3** → Logical layer IPB (addressing, routing domains, trust boundaries, choke points)
- **MITRE ATT&CK** → Network techniques, C2 signatures, lateral movement patterns
- **FM 2-0** → Collection management for NIDS/NDR, log source validation
- **JP 3-12** → Multi-domain detection coordination

---

### G2 Intelligence Officer
**Goal:** Ground intelligence products in collection doctrine and IPB methodology

**Key Doctrine Used:**
- **ADP 2-0** → Intelligence warfighting function, principles, intelligence process
- **FM 2-0** → Detailed intelligence operations, production, dissemination
- **ATP 2-01.3** → IPB methodology across all domains
- **FM 3-55** → Information collection, ISR planning, reconnaissance/surveillance
- **FM 6-0** → Annex B (Intelligence) and Annex L (Information Collection) formats

**When to Reference:**
- Building IPB products for any domain
- Developing collection plans and ISR synchronization
- Writing Annex B or Annex L
- PIR/RFI development and tracking

---

### G3 Operations Officer
**Goal:** Ground operations planning and orders production in operations doctrine

**Key Doctrine Used:**
- **ADP 3-0, FM 3-0** → Unified land operations, decisive action, operational framework
- **FM 5-0** → Planning process, MDMP, integrating processes
- **FM 6-0** → OPORD format, Annexes A/C/R/S/Z, staff coordination

**When to Reference:**
- Developing scheme of maneuver and task organization
- Writing OPORD main body and operations annex
- Synchronization matrix development
- Decision support template creation

---

### G4 Logistics Officer
**Goal:** Ground sustainment planning in logistics doctrine

**Key Doctrine Used:**
- **ADP 4-0** → Sustainment principles, sustainment warfighting function
- **FM 4-0** → Sustainment operations, distribution, maintenance, supply
- **FM 6-0** → Annex F (Sustainment) and Annex W (Operational Contract Support) formats

**When to Reference:**
- Writing logistics running estimates
- Developing Annex F sustainment plan
- CSS feasibility analysis during COA analysis
- Distribution and maintenance planning

---

### G6 Signal Officer
**Goal:** Ground communications planning in signal doctrine

**Key Doctrine Used:**
- **FM 6-02** → Signal support to operations, network operations, spectrum management
- **FM 6-0** → Annex H (Signal) format, PACE planning requirements

**When to Reference:**
- Developing PACE plans
- Writing Annex H
- Network architecture and diagrams
- Spectrum management and COMSEC planning

---

### FSCOORD (Fires)
**Goal:** Ground fire support planning in fires doctrine

**Key Doctrine Used:**
- **ADP 3-19** → Fires warfighting function, fire support planning
- **FM 6-0** → Annex D (Fires) format

**When to Reference:**
- Fire support planning and coordination
- High-payoff target list development
- Writing Annex D
- Targeting synchronization

---

### ENCOORD (Engineer)
**Goal:** Ground engineer planning in engineer operations doctrine

**Key Doctrine Used:**
- **FM 3-34** → Engineer operations, mobility/countermobility/survivability/general engineering
- **FM 6-0** → Annex G (Engineer) format

**When to Reference:**
- Obstacle plan development
- Survivability and force protection planning
- Writing Annex G
- Route clearance and construction planning

---

### Protection Officer
**Goal:** Ground protection planning in protection doctrine

**Key Doctrine Used:**
- **ADP 3-37** → Protection warfighting function, risk management, survivability
- **FM 6-0** → Annex E (Protection) format

**When to Reference:**
- Protection running estimate
- Risk management and vulnerability assessment
- Writing Annex E
- Force protection measures and OPSEC

---

## How to Request Doctrinal Support

### By Staff Section
```
"G4 perspective: is this COA logistically feasible?"
→ Agent references FM 4-0 sustainment planning factors
```

### By Annex
```
"Help me write Annex H (Signal) for this operation"
→ Agent references FM 6-02 + FM 6-0 Annex H format
```

### By MDMP Phase
```
"What does each staff section owe for Step 2 (Mission Analysis)?"
→ Agent references FM 5-0 + FM 6-0 staff responsibilities
```

### Cross-Functional
```
"Does the cyber plan impact the G6 PACE plan?"
→ Agent references FM 3-12 (cyber tasks) + FM 6-02 (signal) for integration
```

---

## Doctrine Library File Map (Full)

| Doctrine | File | Primary Staff | Key Content |
|----------|------|---------------|-------------|
| **ADP 5-0** | ARN18126-ADP_5-0-000-WEB-3.pdf | All | Operations process, MDMP |
| **FM 5-0** | ARN44590-FM_5-0-001-WEB-3.pdf | All | Detailed MDMP, planning |
| **ADP 6-0** | ARN34403-ADP_6-0-000-WEB-3.pdf | All | Command/staff organization |
| **FM 6-0** | ARN35404-FM_6-0-000-WEB-1.pdf | All | **Annex formats A-Z**, staff duties |
| **ADP 3-0** | ARN43323-ADP_3-0-000-WEB-1.pdf | G3 | Operations doctrine |
| **FM 3-0** | ARN43326-FM_3-0-000-WEB-1.pdf | G3 | Operations, LSCO |
| **ADP 2-0** | ARN18009-ADP_2-0-000-WEB-2.pdf | G2 | Intelligence WfF |
| **FM 2-0** | fm2_0.pdf | G2 | Intelligence process |
| **ATP 2-01.3** | ATP_2-01.3_Intelligence_Preparation_of_the_Battlefield.pdf | G2 | IPB methodology |
| **FM 3-55** | ARN35577-FM_3-55-000-WEB-0.pdf | G2 | Information collection |
| **ADP 4-0** | ARN18450_ADP 4-0 FINAL WEB.pdf | G4 | Sustainment doctrine |
| **FM 4-0** | ARN41683-FM_4-0-000-WEB-2.pdf | G4 | Sustainment ops |
| **FM 6-02** | ARN19185_FM 6-02_FINAL_WEB.pdf | G6 | Signal support |
| **ADP 3-19** | ARN18615_ADP 3-19 FINAL WEB.pdf | Fires | Fires WfF |
| **FM 3-34** | ARN45471-FM_3-34-000-WEB-1.pdf | Engineer | Engineer ops |
| **ADP 3-37** | ARN40011-ADP_3-37-000-WEB-1.pdf | Protection | Protection WfF |
| **ADP 3-13** | ARN39736-ADP_3-13-000-WEB-1.pdf | G7/IO | Information advantage |
| **FM 3-13** | fm3-13_2016.pdf | G7/IO | IO doctrine |
| **FM 3-12** | Document-11-Department-of-the-Army-FM-3-12.pdf | Cyber/CEMA | Cyber/EW ops |
| **ATP 3-12.3** | atp3-12-3.pdf | Cyber/CEMA | Cyber techniques |
| **JP 3-12** | 2018-JP-3-12-Cyberspace-Operations.pdf | Cyber/CEMA | Joint cyber |
| **FM 3-14** | ARN46041-FM_3-14-000-WEB-1.pdf | Space (SSE) | Space operations |
| **FM 3-04** | ARN43343-FM_3-04-000-WEB-1.pdf | Aviation | Army aviation |
| **JP 2-01.3** | jp2_01_3.pdf | G2/Joint | Joint intelligence |
| **ATP 1-0.1** | ATP1-0-1_\ 23_March2015.pdf | G2/CI | Counterintelligence |
| **ATP 5-0.1** | downloads_Army_Design_Methodology_ATP_5-0.1_July_2015.pdf | G5/Plans | Design methodology |
| **ATP 5-0.2.1** | atp5_0x2_1.pdf | All | MDMP techniques |
| **ADRP 3-0** | ADRP3_0_2017.pdf | G3 (legacy) | Operations (superseded) |
| **MITRE ATT&CK** | (3 files) | Cyber/G2 | Threat framework |

---

## Integration Tips

### 1. Lead with Doctrine, Not Opinion
> *"Per FM 6-0, Appendix D, Annex H is the responsibility of the G6 and includes PACE plans, network architecture, and spectrum management."*

### 2. Reference MITRE ATT&CK for Technique Alignment
> *"This matches MITRE ATT&CK T1071 (Application Layer Protocol) because of the observed HTTP beaconing pattern."*

### 3. Separate Doctrine from Unit SOP
> *"FM 3-12 defines the cyber task as [X]. Your TACSOP may implement it as [Y]."*

### 4. Cross-Reference Between Staff Sections
> *"The G4 sustainment estimate (per FM 4-0) identifies bandwidth constraints that directly impact the G6 PACE plan (FM 6-02) and cyber operations (FM 3-12)."*

---

## Updating the Doctrine Library

**To add new doctrine:**
1. Place PDF in `docs/doctrine/`
2. Update `INDEX.md` with filename, key sections, staff section, and application
3. Update relevant agent skill YAML to reference the new source
4. Update this guide if a new agent/role uses the doctrine

---

**Last Updated:** 2026-02-26
**Total Publications:** 33 | **Staff Sections Covered:** G1-G9, Fires, Engineer, Protection, Cyber/CEMA, Aviation, Space
**Maintained by:** CyberPlanner System
