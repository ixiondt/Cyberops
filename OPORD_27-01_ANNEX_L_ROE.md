# ANNEX L: RULES OF ENGAGEMENT & LEGAL AUTHORITY

**OPORD 27-01 | PEARL SENTINEL**
**CPT 173 DCO-RA Hawaii**

---

## L.1 Authority & Legal Framework

### L.1.1 Primary Authority Sources

**Title 10, U.S. Code — Armed Forces**
- § 394(b): Authority for support to state, local, and tribal governments in cybersecurity matters
- § 2601: Defense of Department of Defense information systems
- § 3571: Cyber operations in defense of DOD networks

**USCYBERCOM Directive**
- USCYBERCOM TASKORD 27-01: Authorizes CPT 173 to conduct DCO-M and pre-authorized DCO-RA operations in Hawaii AO

**ARCYBER FRAGO 01-27**
- Deploys CPT 173 to Hawaii; authorizes DCO-M (unlimited) and DCO-RA (pre-authorized actions list)
- Establishes chain of command and reporting requirements
- Defines scope of operations and geographical boundaries

**Legal Authority Certificate**
- Issued by DoD General Counsel; reviewed by ARCYBER Legal; confirms unclassified legal basis for operations

---

### L.1.2 Operational Authority Levels

| Authority Level | Scope | Pre-Approval Required | Escalation |
|-----------------|-------|----------------------|------------|
| **DCO-M (Monitor)** | Continuous monitoring, detection, analysis, forensics | None | N/A |
| **DCO-RA (Pre-Authorized)** | Credential disablement, host isolation, C2 disruption (see L.1.3) | None | CPT TL notification within 1 hour |
| **DCO-RA (Non-Authorized)** | Actions outside pre-authorized list | ARCYBER S3 (2-hour SLA) | CPT TL → Battalion CDR → ARCYBER |
| **Offensive Cyber Ops** | Attacks on adversary infrastructure or DoD cyber warfare | NOT AUTHORIZED | Do not execute; escalate to Battalion CDR |

---

### L.1.3 Pre-Authorized DCO-RA Actions

**Standing Authorization** (Execute without additional approval):

1. **Credential Disablement**
   - Authority: Network owner authorization in initial I-TEM
   - Action: Disable compromised user accounts (AD, email, VPN, cloud)
   - Coordination: Notify HECO/SEMA/DoD-IA security within 1 hour
   - Reporting: CPT TL notification; include in daily SITREP
   - Constraints: Do not disable critical system accounts without consultation with network owner

2. **Host Isolation**
   - Authority: Network owner pre-authorization (confirmed in writing)
   - Action: Disconnect compromised host from network (network cable OR VPN disconnect)
   - Coordination: Notify system owner and DoD-IA immediately; provide evidence
   - Reporting: Incident Report to ARCYBER within 1 hour
   - Constraints: Do not isolate production systems without network owner approval; allow 15-minute forensic evidence collection before isolation

3. **C2 Communication Disruption**
   - Authority: ARCYBER TASKORD 27-01; pre-authorized for known APT43 C2 indicators
   - Action: Block C2 domain/IP at perimeter firewall; disable outbound connections
   - Coordination: Notify ARCYBER S3 and NSA Liaison within 1 hour; provide technical justification
   - Reporting: Incident Report detailing C2 evidence and disruption actions
   - Constraints: Only block confirmed C2; false positives must be reviewed by Forensics Lead before firewall rule deployment

4. **Forensic Evidence Preservation**
   - Authority: Inherent to DCO-M and incident response
   - Action: Capture memory dumps, disk images, network traffic, log archives
   - Coordination: Notify system owner; coordinate storage and handling
   - Reporting: Forensic evidence logged in case management system
   - Constraints: Handle classified information per DoD 5220.22-M; destroy working copies after analysis

5. **Malware Analysis & Deep Dive**
   - Authority: Inherent to incident response; may involve outside analysis support
   - Action: Analyze malware samples (disassembly, behavioral analysis, C2 decryption)
   - Coordination: May send samples to NSA or 91st CPB for advanced analysis
   - Reporting: Forensic Report to Battalion S2, NSA, FBI within 24 hours
   - Constraints: Do not share malware with unauthorized recipients; maintain chain of custody

6. **Credential Reset & Password Cycling**
   - Authority: Network owner pre-authorization; system administration access
   - Action: Reset credentials for compromised accounts; implement new password requirements
   - Coordination: Coordinate with user's manager and IT help desk
   - Reporting: Document all resets in case management system; include in Incident Report
   - Constraints: Minimize user impact; provide password reset assistance if needed

7. **Vulnerability Patching (Targeted)**
   - Authority: Network owner approval required
   - Action: Emergency patch deployment for vulnerabilities exploited by APT43
   - Coordination: Coordinate with HECO/SEMA IT for deployment windows
   - Reporting: Patch deployment logged in case management; effectiveness monitored
   - Constraints: Do not perform unauthorized patching; follow change control procedures

8. **Detection Rule Deployment**
   - Authority: Inherent to monitoring and detection
   - Action: Deploy new SIEM/EDR detection rules based on discovered APT43 TTPs
   - Coordination: Notify system owners of rule deployment; provide false positive baseline
   - Reporting: Rule documentation maintained; tuning conducted in Phase I
   - Constraints: Rules must be tested against baseline before production deployment; avoid excessive false positives (target <2%)

---

### L.1.4 Non-Authorized Actions (Require ARCYBER Approval)

**Actions Requiring Explicit Approval:**

- **Firewall Rule Changes** (beyond pre-authorized C2 blocking)
- **Network Segmentation Changes** (VLAN isolation, subnet creation)
- **Endpoint EDR Configuration Changes** (agent updates, policy changes)
- **Cloud Environment Changes** (IAM policy modification, resource deletion, encryption key rotation)
- **OT System Actions** (ANY action on SCADA, control systems, engineering workstations)
- **Multi-System Containment** (isolation of >5 systems simultaneously)
- **Third-Party Notification** (public disclosure, threat intel sharing beyond approved list)
- **Legal Action Requests** (search warrants, subpoenas, law enforcement coordination)

**Approval Process:**
1. CPT TL prepares written request to ARCYBER S3 with technical justification
2. ARCYBER S3 coordinates with legal and higher HQ (SLA: 2 hours)
3. ARCYBER returns approval/denial with signature
4. CPT TL logs approval in case management system; executes action
5. Reporting includes authorization documentation

---

## L.2 Rules of Engagement (ROE)

### L.2.1 Use of Force / Kinetic Considerations

**Not Applicable** — This is a cyber operation with no kinetic elements. CPT 173 has no authority to employ physical force or weapons.

---

### L.2.2 Offensive Operations

**Standing Rule:** CPT 173 has **NO AUTHORITY** to conduct offensive cyber operations, computer network attacks, or destruction of adversary infrastructure.

**Definition of Prohibited Actions:**
- Unauthorized access to systems outside Hawaii AO
- Deployment of malware or destructive code against APT43 infrastructure
- Manipulation or destruction of data on non-defense systems
- Coordination with external actors (hacktivists, foreign intelligence) for offensive action
- Attacking supporting infrastructure not directly threatening DoD systems

**Enforcement:** If CPT 173 discovers opportunity for offensive action:
1. **Do not execute**
2. **Immediately notify** Battalion CDR and ARCYBER
3. **Document evidence** of opportunity for higher-level decision
4. **Wait for approval** from DoD General Counsel / USCYBERCOM Commander (if approved at all)

---

### L.2.3 Civilian Infrastructure Considerations

**Principle:** Minimize impact on civilian critical infrastructure (HECO, SEMA, telecommunications).

**Constraints:**
- **OT Systems:** No automated containment; all actions require mutual agreement with HECO
- **Power Distribution:** No actions that could disrupt power to hospitals, emergency services, residential areas
- **Water Systems:** No actions affecting water treatment or distribution
- **Telecommunications:** Coordinate with Hawaiian Telcom before any network disruption actions

**Escalation:**
- If APT43 threatens OT systems → **IMMEDIATE escalation** to HECO leadership, Battalion CDR, ARCYBER CDR
- If containment actions would cause civilian impact → **Request approval** from HECO/SEMA leadership before execution

---

### L.2.4 Rules for Engagement with Classified Material

**Handling Requirements:**
- All classified material (TS/SCI, SECRET) handled via NSA-approved secure facilities only
- Classified material may **NOT** be transported outside SCIF without authorization
- All classified analysis documented separately from unclassified SITREP
- Working copies of classified material destroyed per DoD 5220.22-M (degaussing or secure destruction)

**Sharing Restrictions:**
- Classified intelligence shared only with cleared personnel with need-to-know
- Sharing with FBI/CISA limited to unclassified or declassified findings
- Intelligence Community material (SIGINT, HUMINT) shared only via NSA liaison with proper handling instructions

---

### L.2.5 Evidence Handling & Chain of Custody

**Chain of Custody Requirements (For Potential Evidence):**

1. **Initial Collection:**
   - Documenter records date, time, location, system identifier
   - Hash value (MD5, SHA-256) computed and recorded
   - Evidence stored on write-protected media (read-only devices)
   - Forensic toolkit documentation (tool version, settings, output)

2. **Analysis & Storage:**
   - Analyst signs evidence log upon receipt
   - All modifications documented (analysis tool, parameters, date/time)
   - Original evidence maintained separate from working copies
   - Working copies handled per DoD data classification standards

3. **Transfer & Handoff:**
   - Prior to transfer, hash verified and documented
   - Receiving party (NSA, FBI, 91st CPB) signs evidence receipt
   - Chain of custody log maintained with signature dates/times
   - Digital transfer via encrypted channels only

4. **Retention & Destruction:**
   - Evidence retained minimum 30 days post-incident
   - Longer retention required if FBI/law enforcement investigation ongoing
   - Classified material destroyed via approved methods (degaussing, incineration)
   - Unclassified material destroyed per NIST guidelines

**Legal Implication:** Chain of custody must be maintained if evidence will be used in law enforcement action or legal proceeding.

---

## L.3 Scope Limitations

### L.3.1 Geographic Boundaries

**Authorized AO:**
- Primary: Island of Oahu (DoD installations, HECO, SEMA)
- Secondary: Maui and Big Island (cloud infrastructure, critical infrastructure partnerships)
- Tertiary: Hawaii-to-mainland interconnects (submarine cables, satellite)

**Prohibited Areas:**
- **Off-Limits:** Foreign networks, overseas infrastructure, non-U.S. systems
- **Restricted:** Any system outside USCYBERCOM authority without explicit higher approval
- **Limitation:** No operations supporting offensive actions or intelligence collection outside Title 10 defense authority

---

### L.3.2 Data Classification & Access

**Authorized Access:**
- Unclassified / FOUO intelligence and data
- Controlled Unclassified Information (CUI) with appropriate handling
- Operational data necessary for mission execution (network logs, system configurations, asset inventory)

**Restricted Access:**
- **NOT AUTHORIZED:** Intelligence Community (SIGINT, HUMINT) material — handled only via NSA liaison
- **NOT AUTHORIZED:** Foreign intelligence — coordination only via NSA
- **NOT AUTHORIZED:** Criminal investigation data — coordination only via FBI with proper legal authority

---

### L.3.3 Timeline & Mission Duration

**Operation Timeline:**
- **Authorized Period:** 15 MAR 2026 — TBD (Commander's discretion)
- **Extension:** Requires formal tasking order from ARCYBER
- **Termination:** CPT 173 remains deployed until Phase III completion and formal transition

**Authority Expiration:**
- DCO-M authority expires with mission termination
- DCO-RA authority expires with mission termination
- No continued operations post-transition without new authorization

---

## L.4 Escalation & Authority Decisions

### L.4.1 Escalation Matrix

| Situation | Immediate Action | Escalation Path | Timeline |
|-----------|-----------------|-----------------|----------|
| **Critical APT43 Activity** | CPT TL notification | CPT TL → Battalion CDR → ARCYBER CDR | Immediate (within 15 min) |
| **OT Network Threat** | HECO emergency contact | CPT TL → HECO Leadership → Battalion CDR → ARCYBER CDR | Immediate |
| **Required DCO-RA (Non-Authorized)** | Document evidence | CPT TL → ARCYBER S3 (written request) | 2-hour approval SLA |
| **Legal/Regulatory Issue** | CPT TL consultation | CPT TL → ARCYBER Legal → DoD General Counsel | Per legal escalation path |
| **Civilian Impact Imminent** | Do not execute action | CPT TL → HECO/SEMA → Battalion CDR → ARCYBER | Immediate |
| **Intelligence Gap / PIR** | CPT TL assessment | CPT TL → Battalion S2 → NSA Liaison | 24-hour response |

---

### L.4.2 Commander's Critical Information Requirements (CCIRs)

**CCIR 1: APT43 Presence Confirmation**
- **Question:** Is APT43 currently active/persistent in Hawaii networks?
- **Escalation Trigger:** Any confirmed APT43 indicator detected
- **Notification:** Immediate call to Battalion CDR and ARCYBER S2

**CCIR 2: OT Network Threat**
- **Question:** Is APT43 threatening critical infrastructure OT systems?
- **Escalation Trigger:** Any reconnaissance toward OT network or control systems
- **Notification:** Immediate escalation to HECO, Battalion CDR, ARCYBER CDR

**CCIR 3: Data Exfiltration Indicators**
- **Question:** What sensitive data has been compromised or is at risk?
- **Escalation Trigger:** Confirmed data exfiltration or exfil-ready staging detected
- **Notification:** Incident Report to ARCYBER, FBI, NSA within 1 hour

**CCIR 4: Attribution Confidence**
- **Question:** What confidence level do we have in APT43 attribution?
- **Escalation Trigger:** New malware or TTP linked to different threat actor
- **Notification:** Intelligence update to Battalion S2 and NSA Liaison

---

## L.5 Restrictions on Information Sharing

### L.5.1 Authorized Recipients

**Unclassified/FOUO Findings May Be Shared With:**
- ARCYBER (HQ and field elements)
- FBI Cyber Division (Honolulu office)
- CISA (Regional office)
- DoD-IA (Regional team)
- HECO and SEMA (through official channels, CPT TL approval)
- Battalion Staff (all levels)

**Classified Findings Shared Only Via:**
- NSA Liaison (secure communications, proper classification handling)
- Cleared DoD personnel (SCIF access, need-to-know basis)
- FBI (with legal authorization, controlled dissemination)

---

### L.5.2 Restricted Sharing

**Prohibited Recipients:**
- Media (no public disclosure without ARCYBER public affairs approval)
- Academic institutions (no unclassified research sharing without approval)
- Foreign governments (no sharing without ARCYBER and State Department coordination)
- Private sector / contractors (no sensitive information without DoD contract oversight)
- Intelligence Community partners other than NSA (unless formally coordinated)

---

### L.5.3 Public Attribution

**Policy:** No public attribution of APT43 activity without ARCYBER, FBI, and NSA coordination.

**Escalation Path for Attribution Consideration:**
1. CPT TL proposes attribution with forensic justification
2. Battalion CDR reviews and concurs/non-concurs
3. ARCYBER legal reviews for compliance
4. NSA Liaison provides counterintelligence perspective
5. FBI consulted for law enforcement implications
6. Final approval from DoD General Counsel (if deemed appropriate for disclosure)

---

## L.6 Enforcement & Compliance

### L.6.1 Compliance Monitoring

**Monthly ROE Audit:**
- Battalion S1 reviews all incidents and escalations for ROE compliance
- Legal review of any gray-area decisions
- Training refresher for any identified gaps in understanding

**Annual Certification:**
- All CPT 173 personnel annually certify understanding of ROE
- Sign-off on compliance with legal and authority constraints
- Training on updates to authorities or legal frameworks

---

### L.6.2 Violation Procedures

**If ROE Violation Suspected:**
1. **Immediate Notification:** Suspending action; notify CPT TL and Battalion CDR
2. **Investigation:** ARCYBER legal and Battalion S1 investigates circumstances
3. **Documentation:** Formal incident report documenting violation and circumstances
4. **Remediation:** Personnel retraining or removal from operation (if serious)
5. **Higher Review:** ARCYBER commander briefed; consideration for command action if warranted

**No Retaliation Policy:** Personnel raising ROE concerns protected from retaliation; command encourages reporting of gray-area situations.

---

**RESPONSIBLE OFFICER:** ARCYBER Legal Advisor

**APPROVED BY:** LTC [Battalion Commander] + ARCYBER Judge Advocate

---

## APPENDIX: LEGAL AUTHORITY REVIEW

**This OPORD has been reviewed and approved by:**
- ✅ ARCYBER Legal Advisor
- ✅ DoD General Counsel (delegated review)
- ✅ NSA Legal Counsel (intelligence sharing provisions)
- ✅ USCYBERCOM Judge Advocate

**Classification:** UNCLASSIFIED // FOR OFFICIAL USE ONLY

**Authority Certificate Reference:** DCO-Auth-2026-001 (DoD General Counsel, DCO Legal Framework)

