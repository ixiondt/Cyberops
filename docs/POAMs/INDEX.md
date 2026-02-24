# POAM System Index
**Master Reference for Finding Classification, POAM Types, and Integration**

---

## Quick Navigation

### By Role
- [Host Analyst POAM Contributions](#host-analyst-poam-contributions)
- [Network Analyst POAM Contributions](#network-analyst-poam-contributions)
- [Cyber Operations Planner POAM Contributions](#cyber-operations-planner-poam-contributions)
- [S-1/Admin POAM Contributions](#s-1admin-poam-contributions)
- [S-3/Operations POAM Management](#s-3operations-poam-management)

### By Finding Type
- [Malware Findings](#malware-findings)
- [Credential Compromise](#credential-compromise)
- [Lateral Movement](#lateral-movement)
- [Configuration Deficiency](#configuration-deficiency)
- [Detection Gaps](#detection-gaps)
- [Vulnerability/Exposure](#vulnerabilityexposure)
- [Process/Procedure Gaps](#proceduregaps)
- [Incomplete Investigation](#incomplete-investigation)

### By Timeline
- [Immediate (CRITICAL)](#immediate-critical)
- [24-72 Hours (HIGH)](#24-72-hours-high)
- [7-14 Days (MEDIUM)](#7-14-days-medium)
- [30+ Days (LOW)](#30-days-low)

### By Document Type
- [Templates](#templates)
- [Guidance](#guidance)
- [Examples](#examples)
- [Tracker](#tracker)

---

## Finding Types & POAM Mapping

### Malware Findings

**When Identified:**
- EDR detection of known/unknown malware
- Host Analyst forensic analysis confirms malware presence
- Network Analyst C2 callback identified
- Threat intel indicates active compromise

**POAM Generation:**
- **Timing:** During response (immediate POAM creation)
- **Owner:** Host Analyst (containment lead) + S-3 (execution coordination)
- **Template:** Use `POAM_Template.md` with MALWARE category
- **Example:** See `EXAMPLES/Example_POAM_Malware.md`

**Typical Milestones:**
1. Endpoint isolated (Immediate)
2. Malware sample collected for analysis (Day 0-1)
3. Malware removed/endpoint reimaged (Day 1-3)
4. Clean state verification (EDR clean, no C2) (Day 3-5)
5. Endpoint hardened per baseline (Day 5-7)
6. 30-day post-remediation monitoring (Day 7-37)

**Risk Priority:**
- CRITICAL if: C2 active, exfiltration detected, lateral movement confirmed
- HIGH if: Malware contained, no active C2, single endpoint
- MEDIUM if: Malware from untargeted/mass campaign, low-risk payload

**Risk Prioritization:**
- Use `Risk_Prioritization.md` MALWARE section
- Reference `Finding_to_POAM_Mapping.md` MALWARE decision tree

**Residual Risk Documentation:**
- Threat actor knowledge of compromise (account credentials)
- Possible data exfiltration (scope unknown)
- Reinfection if not fully eradicated
- Other systems in same domain potentially compromised

**References:**
- ATP 3-12.3 (Endpoint hardening standards)
- MITRE ATT&CK (persistence, lateral movement techniques)

---

### Credential Compromise

**When Identified:**
- Compromised credentials identified in logs (login from unusual location/time)
- Account used for lateral movement or exfiltration
- Known breach credential matched to internal user
- Credential stuffing attempt detected

**POAM Generation:**
- **Timing:** Immediate (POAM created during response)
- **Owner:** S-1/Identity Admin (credential reset) + S-2 (threat tracking)
- **Template:** Use `POAM_Template.md` with CREDENTIAL_COMPROMISE category
- **Example:** Reference malware POAM as secondary action

**Typical Milestones:**
1. Compromised account identified and documented (Immediate)
2. Account reset/revoked (Immediate - 2 hours)
3. Device audit for unauthorized access (Day 0-1)
4. Related accounts audited (Day 1-3)
5. User notification and retraining (Day 1-5)
6. Threat intel dissemination (Day 1-7)
7. 60-day enhanced monitoring (Day 7-67)

**Risk Priority:**
- CRITICAL if: Privileged account, active reuse detected, sensitive systems accessed
- HIGH if: Standard user account, known compromise, used for lateral movement
- MEDIUM if: Single-use compromise (no lateral movement), remediated within 24 hours
- LOW if: Credential from breach report, no evidence of use

**Residual Risk Documentation:**
- Threat actor may have recorded sensitive data accessed
- Reuse attempt likely (monitor for it)
- Other compromised systems in same domain possible

**References:**
- CJCSM 6510.01 (Cyber incident handling policy)
- AR 25-2 (Army cybersecurity, credential management)

---

### Lateral Movement

**When Identified:**
- Network Analyst detects unusual traffic patterns across network boundaries
- Host Analyst finds evidence of access from unexpected source
- Threat intel indicates lateral movement technique used
- Access logs show impossible travel or unusual privilege escalation

**POAM Generation:**
- **Timing:** Within 24 hours of detection
- **Owner:** Network Team (segmentation) + S-3 (architecture coordination)
- **Template:** Use `POAM_Template.md` with LATERAL_MOVEMENT category
- **Example:** See `EXAMPLES/Example_POAM_Detection.md` for detection enhancement

**Typical Milestones:**
1. Affected systems identified and audited (Day 0-1)
2. Movement path reconstructed (Day 1-3)
3. Detection rule/signature deployed (Day 3-7)
4. Network segmentation improved (Day 7-14)
5. Enhanced monitoring enabled (Day 14+)
6. Architecture review completed (Day 14-30)

**Risk Priority:**
- CRITICAL if: Ongoing lateral movement detected, privileged credential used, data exfiltration confirmed
- HIGH if: Lateral movement confirmed, contained, privilege escalation prevented
- MEDIUM if: Lateral movement suspected but unconfirmed, limited success
- LOW if: Single host to host, low-value systems, isolated from critical infrastructure

**Residual Risk Documentation:**
- Threat actor understands network architecture
- Likely to reuse discovered credentials
- Network segmentation may remain insufficient for advanced threat
- Continued monitoring required

**References:**
- ATP 2-01.3 (Logical layer terrain, choke points)
- MITRE ATT&CK (lateral movement techniques)
- FM 3-12 (Network defense control measures)

---

### Configuration Deficiency

**When Identified:**
- Security baseline audit reveals system not meeting standards
- Malware analysis shows successful exploitation of known vulnerability
- Compliance scan identifies missing patches or hardening
- Process gap allows unauthorized changes

**POAM Generation:**
- **Timing:** Within 7 days of identification (can batch with other config POAMs)
- **Owner:** System Admin (remediation) + S-3 (coordination)
- **Template:** Use `POAM_Template.md` with CONFIG_DEFICIENCY category
- **Example:** See `EXAMPLES/Example_POAM_Config.md`

**Typical Milestones:**
1. Configuration deficiency documented (Day 0-1)
2. Risk assessment completed (Day 1-3)
3. Remediation plan approved (Day 3-7)
4. Change control submitted (Day 7-14)
5. Remediation applied (Day 14-30 or depends on approval)
6. Verification completed (Day 30+2)
7. Monitoring rule deployed (Day 30+5)

**Risk Priority:**
- CRITICAL if: Exploited during active incident, affects critical asset, compliance-required fix
- HIGH if: Known exploitation technique, affects multiple systems, baseline requirement
- MEDIUM if: Hardening improvement, applies to non-critical systems
- LOW if: Performance optimization, non-essential security enhancement

**Residual Risk Documentation:**
- Patch management process improvement needed
- Similar deficiencies may exist on other systems
- Historical vulnerability may have been exploited before detection

**References:**
- AR 25-2 (Security baselines, compliance)
- ATP 3-12.3 (Endpoint hardening standards)
- ATP 2-01.3 (Configuration baseline deviation analysis)

---

### Detection Gaps

**When Identified:**
- Response reveals no alert was generated for known attack indicator
- Malware present but not detected by EDR/SIEM
- Network traffic analysis shows missed C2 or lateral movement
- Log source unavailable or insufficient

**POAM Generation:**
- **Timing:** Within 7 days post-response (group into detection enhancement cycle)
- **Owner:** S-2/SOC (rule development) + Network/Host Team (validation)
- **Template:** Use `POAM_Template.md` with DETECTION_GAP category
- **Example:** See `EXAMPLES/Example_POAM_Detection.md`

**Typical Milestones:**
1. Gap analysis completed (Day 1-3)
2. Detection rule designed and tested (Day 3-7)
3. Rule/signature deployed to test environment (Day 7-10)
4. Validation completed on past incidents (Day 10-14)
5. Production deployment (Day 14-21)
6. Monitoring and tuning (Day 21+)

**Risk Priority:**
- CRITICAL if: Detection gap affects active threat, ongoing attack vector
- HIGH if: Detection gap affects recurring attack type, multiple incidents
- MEDIUM if: Detection gap affects emerging threat, limited historical impact
- LOW if: Detection improvement (not gap), opportunistic enhancement

**Residual Risk Documentation:**
- Similar gaps may exist for related indicators
- Threat may adapt to known detections
- False positive/tuning period required

**References:**
- FM 2-0 (Collection management, source validation)
- ATP 2-01.3 (PIR/EEI development from threat COAs)
- MITRE ATT&CK (indicator mapping to techniques)

---

### Vulnerability/Exposure

**When Identified:**
- Vulnerability scan results show unpatched systems
- Malware analysis exploits CVE (critical update not applied)
- Infrastructure assessment shows exposed service/port
- Credential exposure identified in breach database

**POAM Generation:**
- **Timing:** Within 7 days (batch by severity and system criticality)
- **Owner:** System Admin (patching) + S-3 (priority coordination)
- **Template:** Use `POAM_Template.md` with VULNERABILITY category
- **Example:** Adapt from CONFIG_DEFICIENCY example

**Typical Milestones:**
1. Vulnerability assessed and prioritized (Day 0-3)
2. Patch/workaround identified (Day 3-7)
3. Change control submitted (Day 7-14)
4. Patch testing completed (Day 14-21)
5. Patch applied to production (Day 21-30 or per severity)
6. Verification completed (Day 30+2)

**Risk Priority:**
- CRITICAL if: Exploitable remotely, no workaround, actively exploited in wild
- HIGH if: Affects critical system, exploitable with limited complexity
- MEDIUM if: Affects non-critical system, exploitable with medium complexity
- LOW if: Affects non-critical system, high exploitation complexity, workaround available

**Residual Risk Documentation:**
- Similar vulnerabilities may exist on other systems
- Threat actor now knows system was vulnerable (may retry)
- Dependency conflicts may prevent patching on some systems

**References:**
- AR 25-2 (Patch management, compliance)
- NIST SP 800-30 (Vulnerability assessment methodology)

---

### Process/Procedure Gaps

**When Identified:**
- Response identifies missing documentation or unclear procedures
- Training gap discovered (personnel didn't follow correct procedure)
- Manual process error caused security deficiency
- Escalation protocol not followed correctly

**POAM Generation:**
- **Timing:** Within 14 days post-response (lower urgency than technical fixes)
- **Owner:** Training/Operations (procedure development) + Element Lead (enforcement)
- **Template:** Use `POAM_Template.md` with PROCESS_GAP category
- **Example:** Adapt from CONFIG_DEFICIENCY or DETECTION_GAP example

**Typical Milestones:**
1. Gap analysis and root cause completed (Day 1-7)
2. Procedure drafted and reviewed (Day 7-14)
3. Procedure approved and published (Day 14-21)
4. Personnel trained (Day 21-28)
5. Procedure tested/validated (Day 28+)
6. Documentation updated in wiki/system (Day 28+5)

**Risk Priority:**
- HIGH if: Gap enabled security incident or delayed response
- MEDIUM if: Gap caused inefficiency or oversight
- LOW if: Improvement to documented procedure

**Residual Risk Documentation:**
- Personnel may revert to old procedures without reinforcement
- Documentation must be accessible and clear

**References:**
- ATP 5-0.2.1 (MDMP procedures and discipline)
- CLAUDE.md (Response procedures and escalation protocols)

---

### Incomplete Investigation

**When Identified:**
- Analysis ran out of time or resources before completion
- Follow-on forensics or correlation still needed
- Threat intel assessment pending
- Root cause analysis incomplete

**POAM Generation:**
- **Timing:** Within 3 days of response completion
- **Owner:** Team Lead (investigation continuation) + Element Lead (resourcing)
- **Template:** Use `POAM_Template.md` with INVESTIGATION_INCOMPLETE category
- **Example:** Adapt from DETECTION_GAP or MALWARE example

**Typical Milestones:**
1. Investigation continuation planned (Day 1-3)
2. Additional forensics completed (Day 3-7)
3. Data correlation/analysis completed (Day 7-14)
4. Threat intel assessment finalized (Day 14-21)
5. Root cause analysis completed (Day 14-21)
6. Final report issued (Day 21-28)

**Risk Priority:**
- HIGH if: Investigation may reveal additional compromise
- MEDIUM if: Root cause unclear, affects future prevention
- LOW if: Historical analysis or intelligence enhancement

**Residual Risk Documentation:**
- Investigation may reveal additional scope
- Threat assessment may change based on findings
- Risk acceptance may require commander approval

**References:**
- ATP 2-01.3 (Threat analysis discipline, confidence levels)
- FM 2-0 (Collection completeness and source reliability)

---

## Risk Priority Quick Reference

### Immediate (CRITICAL)
**Response Required:** Within hours
**Examples:**
- Malware with active C2 callback
- Privileged credential actively used for lateral movement
- Active exfiltration or data theft in progress
- Exploitable vulnerability affecting critical system, patch delayed

**Action:** Escalate immediately to commander, request emergency resources/approval

### 24-72 Hours (HIGH)
**Response Required:** Within 24-72 hours
**Examples:**
- Malware contained, awaiting removal/reimaging
- Compromised credential reset, monitoring active
- Lateral movement confirmed but contained
- Missing detection rule for known threat

**Action:** Assign owner, confirm resource availability, daily status tracking

### 7-14 Days (MEDIUM)
**Response Required:** Within 7-14 days
**Examples:**
- Configuration deficiency, non-critical system
- Vulnerability with limited exploitability
- Detection gap for emerging threat
- Incomplete investigation requiring follow-up

**Action:** Coordinate with system owners, integrate into maintenance cycle

### 30+ Days (LOW)
**Response Required:** Within 30+ days (standard maintenance cycle)
**Examples:**
- Hardening improvement recommendations
- Process/procedure optimization
- Low-risk vulnerability with workaround
- Lessons learned implementation

**Action:** Include in next scheduled maintenance/update cycle

---

## POAM Workflow by Role

### Host Analyst
**Identifies:** Malware, baseline deviations, suspicious processes, configuration issues
**Creates:** Malware POAMs, configuration deficiency POAMs, investigation continuation POAMs
**Provides:** Technical remediation guidance, verification procedures
**Input to:** POAM_Template (technical details, verification criteria)

### Network Analyst
**Identifies:** C2 communications, lateral movement, traffic anomalies, detection gaps
**Creates:** Detection gap POAMs, lateral movement POAMs, investigation continuation POAMs
**Provides:** Detection rule guidance, network architecture assessment
**Input to:** POAM_Template (detection specifics, network context)

### Cyber Operations Planner
**Identifies:** Risk prioritization, doctrine alignment, authority gaps, integration issues
**Creates:** Priority classification, timeline adjustment recommendations
**Provides:** MDMP integration, risk governance, escalation coordination
**Input to:** Risk_Prioritization matrix, authority/ROE coordination

### S-1/Identity Admin
**Identifies:** Credential compromise scope, account usage patterns
**Creates:** Credential compromise POAMs
**Provides:** Password reset procedures, audit completion, user notification
**Input to:** Credential POAM execution, monitoring rules

### S-2 Intelligence
**Identifies:** Threat intelligence requirements, indicator tracking, collection gaps
**Creates:** Detection gap POAMs (for threat indicators), investigation continuation POAMs
**Provides:** Threat context, indicator lists, collection management
**Input to:** Detection rules, threat correlation

### S-3 Operations
**Identifies:** Resource conflicts, priority conflicts, timeline issues
**Creates:** Escalation POAMs (resource shortage, authority needed)
**Manages:** POAM prioritization, execution coordination, status tracking
**Leads:** Weekly POAM status meeting, escalation decisions

### Element Lead / OIC
**Approves:** Finding → POAM conversion, resource allocation, timeline changes
**Escalates:** "At Risk" POAMs to higher authority
**Accepts:** Residual risk (commander signature if required)
**Reviews:** POAM status in daily SITREP

### Commander
**Approves:** Resource reallocation for CRITICAL POAMs
**Accepts:** Residual risk documentation
**Reviews:** Weekly priority summary from S-3

---

## Files Reference

| File | Purpose | Owner | Update Frequency |
|------|---------|-------|------------------|
| README.md | System overview and quick start | Everyone | As needed |
| INDEX.md | This file - master reference | S-2/S-3 | Weekly during active response |
| TEMPLATES/POAM_Template.md | POAM creation template | Response analyst | Per finding (create new copy per POAM) |
| TEMPLATES/POAM_Tracker.md | Status matrix for all POAMs | S-3 | Daily during active response, weekly after |
| TEMPLATES/Finding_to_POAM_Mapping.md | Decision logic for classification | Element Lead | As new finding types emerge |
| GUIDANCE/POAM_Generation_Guide.md | Step-by-step generation procedures | Element Lead | Quarterly review |
| GUIDANCE/Risk_Prioritization.md | Risk matrix and scoring | Element Lead / Planner | Per operation |
| GUIDANCE/Agent_Integration.md | How agents contribute findings | Element Lead | Quarterly review |
| EXAMPLES/Example_POAM_Malware.md | Worked malware example | Training | Reference only |
| EXAMPLES/Example_POAM_Config.md | Worked config deficiency example | Training | Reference only |
| EXAMPLES/Example_POAM_Detection.md | Worked detection gap example | Training | Reference only |
| TRACKER/POAM_Log.md | Current active POAMs | S-3 | During operations (daily), post-ops (final snapshot) |

---

**Last Updated:** 2026-02-24
**Classification:** UNCLASSIFIED // FOUO
