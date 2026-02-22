# OPORD 27-01 PEARL SENTINEL — Complete Package Index

**Operation:** PEARL SENTINEL
**Unit:** CPT 173 Mission Element, Cyber Protection Battalion
**Mission Type:** Defensive Cyberspace Operations – Response Actions (DCO-RA)
**Area of Operations:** Hawaii (Oahu, Maui, Big Island)
**Threat:** APT43 (State-Sponsored Cyber Espionage Group)
**Execution Start:** 15 MAR 2026
**Classification:** UNCLASSIFIED // FOR OFFICIAL USE ONLY

---

## Complete OPORD Document Set

### Main Operations Order
- **[OPORD_CPT173_HAWAII_DCO-RA.md](OPORD_CPT173_HAWAII_DCO-RA.md)** — 5-Paragraph OPORD
  - Section 1: Situation (OE, Enemy, Current Posture, Mission Statement)
  - Section 2: Mission (Concise mission statement with key implications)
  - Section 3: Execution (Concept of operations, task organization, synchronization, ROE summary)
  - Section 4: Support (Logistics, sustainment, medical, admin)
  - Section 5: Command & Signal (Chain of command, PACE plan, reports, coordinating instructions)

---

### Supporting Annexes (Detailed Guidance)

| Annex | Document | Purpose | Key Content |
|-------|----------|---------|-------------|
| **A** | [OPORD_27-01_ANNEX_A_TaskOrganization.md](OPORD_27-01_ANNEX_A_TaskOrganization.md) | Personnel structure, roles, qualifications | CPT 173 task org, interagency partners, training plan, personnel rotation |
| **B** | [OPORD_27-01_ANNEX_B_Intelligence.md](OPORD_27-01_ANNEX_B_Intelligence.md) | Threat assessment and intelligence | APT43 profile, MLCOA/MDCOA, PIRs, threat terrain analysis, intel dissemination |
| **C** | [OPORD_27-01_ANNEX_C_Operations.md](OPORD_27-01_ANNEX_C_Operations.md) | Operational execution & synchronization | Phase I-III timeline, daily rhythm, metrics, control measures, risk mitigation |
| **J** | [OPORD_27-01_ANNEX_J_CyberTechnicalProcedures.md](OPORD_27-01_ANNEX_J_CyberTechnicalProcedures.md) | Technical hunting & incident response | Hunt hypotheses, IR playbook, tool specifications, forensic procedures |
| **K** | [OPORD_27-01_ANNEX_K_IncidentResponsePlaybooks.md](OPORD_27-01_ANNEX_K_IncidentResponsePlaybooks.md) | Detailed incident response playbooks | 3 playbooks (credential compromise, malware detection, lateral movement), incident report template, post-incident procedures |
| **L** | [OPORD_27-01_ANNEX_L_ROE.md](OPORD_27-01_ANNEX_L_ROE.md) | Rules of Engagement & Legal Authority | DCO-M/DCO-RA authority, pre-authorized actions, ROE constraints, escalation procedures |

---

## How to Use This Package

### For Commanders & Leadership
1. **Start with:** [OPORD_CPT173_HAWAII_DCO-RA.md](OPORD_CPT173_HAWAII_DCO-RA.md) Sections 1-5 (20-minute read)
2. **Reference:** Annex C (Operations) for phase timeline and decision points
3. **Legal Review:** Annex L (ROE) for authority ceiling and constraints
4. **Risk:** Annex C Section 3 (Risk Control Measures)

### For CPT 173 Team Lead (CPT)
1. **Priority:** Annex A (task org, personnel roles), Annex C (daily operations)
2. **Execution:** Annex J (technical procedures, hunting hypotheses)
3. **Escalation:** Annex L (authority ceiling, escalation matrix)
4. **Intelligence:** Annex B (threat assessment, PIRs)

### For Incident Response Lead (SSG)
1. **Start with:** Annex J Section 2.2 (IR playbook and timeline)
2. **Reference:** Annex L Section 1.3 (pre-authorized containment actions)
3. **Coordination:** Annex C (daily synchronization points, escalation)

### For Threat Hunting Lead (SSG)
1. **Core Reference:** Annex J Section 1 (hunt hypotheses, SIEM queries)
2. **Threat Context:** Annex B (APT43 TTPs, MLCOA/MDCOA)
3. **Daily Execution:** Annex C Section 1 (Phase II daily rhythm, 8 hunts/day)

### For Forensics Lead (SSG)
1. **Primary:** Annex J Section 4 (forensic procedures, evidence handling)
2. **Incident Response:** Annex J Section 2 (IR timeline, forensic analysis stages)
3. **Intelligence:** Annex B (APT43 malware suite, C2 infrastructure)

### For Battalion S2 (Intelligence Officer)
1. **Main Reference:** Annex B (intelligence assessment, PIRs, threat intel)
2. **Execution:** Annex B Section B.6 (daily INTSUM format and distribution)
3. **Support:** Annex C (synchronization points, reporting requirements)

### For Battalion Legal / Judge Advocate
1. **Authority Basis:** Annex L Section 1 (legal framework, Title 10 authority)
2. **Constraints:** Annex L Section 2-4 (ROE, scope limitations, civilian considerations)
3. **Compliance:** Annex L Section 6 (enforcement, violation procedures)

---

## Key Decision Points

| Decision Point | Timeline | Owner | Document Reference |
|---|---|---|---|
| **DP-1:** MOC operational & baseline complete | 20 MAR 1800Z | CPT TL | Annex C Section 1 (Phase I end state) |
| **DP-2:** Phase II approval (move to active hunting) | 21 MAR 0800Z | Battalion CDR | Annex C Section 1 |
| **DP-3:** Authority confirmation (DCO-RA pre-auth received) | 18 MAR 1300Z | ARCYBER | Annex L Section 1.1 |
| **DP-4:** Critical incident response (OT threat escalation) | Upon detection | CPT TL → Battalion CDR → ARCYBER | Annex L Section 4.1 |
| **DP-5:** Phase III transition (mission end) | TBD (Commander's discretion) | Battalion CDR + ARCYBER CDR | Annex C Section 1 (Phase III) |

---

## Critical Success Factors

1. **Phase I Baseline:** Must complete comprehensive baseline in Phase I (48-hour intensive collection)
2. **Interagency Coordination:** NSA, FBI, CISA coordination established within first 48 hours
3. **Tool Access:** SIEM, EDR, cloud audit logs operational by 17 MAR
4. **Authority Confirmation:** Written DCO-RA pre-authorization received by 18 MAR
5. **Team Readiness:** All personnel trained on APT43 TTPs and incident response playbooks by 20 MAR
6. **OT Coordination:** 24/7 escalation contact with HECO OT established and tested

---

## Escalation & Authority Thresholds

**Immediate Escalation to Battalion CDR:**
- Confirmed APT43 activity detected
- OT network threat discovered
- Critical infrastructure impact imminent
- Authority constraint preventing necessary response action

**ARCYBER S3 Notification (within 1 hour):**
- Pre-authorized DCO-RA action executed
- Significant incident declared (>1 system compromised)
- Forensic findings requiring attribution assessment

**ARCYBER Commander Escalation (within 2 hours):**
- Non-authorized DCO-RA request (requires approval)
- Critical event or OT threat requiring strategic decision
- Legal / ROE violation suspected

---

## Document Control

| Document | Version | Date | Authority | Classification |
|----------|---------|------|-----------|-----------------|
| OPORD 27-01 (Main) | 1.0 | 15 MAR 2026 | LTC [CDR] | UNCLASSIFIED // FOUO |
| Annex A | 1.0 | 15 MAR 2026 | Battalion S1 | UNCLASSIFIED // FOUO |
| Annex B | 1.0 | 15 MAR 2026 | Battalion S2 | UNCLASSIFIED // FOUO |
| Annex C | 1.0 | 15 MAR 2026 | Battalion S3 | UNCLASSIFIED // FOUO |
| Annex J | 1.0 | 15 MAR 2026 | CPT 173 TL | UNCLASSIFIED // FOUO |
| Annex L | 1.0 | 15 MAR 2026 | ARCYBER JAG | UNCLASSIFIED // FOUO |

---

## Distribution

**Standard Recipients:**
- HQ ARCYBER (CDR, S1, S2, S3)
- Battalion Headquarters (All staff)
- CPT 173 Team
- NSA Hawaii Liaison
- FBI Cyber Division (Honolulu)
- CISA Regional Office
- DoD-IA Regional Team
- Joint Task Force Hawaii

**Classified/Sanitized Versions:**
- Unclassified version for HECO/SEMA (relevant sections only)
- Classified version (TS/SCI) for NSA and counterintelligence purposes

---

## Quick Reference: Phase Timeline

```
PHASE I (15-20 MAR): Deployment & Integration
├─ 15 MAR: Personnel Arrival, Facility Inspection, Initial Coordination
├─ 16 MAR: Tool Access Validation, Network Architecture Briefing
├─ 17 MAR: MOC Watch Activation, Training, Baseline Collection Begins
├─ 18 MAR: Authority Confirmation, Cloud Access Validation
├─ 19 MAR: First Daily SITREP, Hunt Hypotheses Development
└─ 20 MAR: Hunt Execution Begins, Tabletop Exercise, Phase II Decision

PHASE II (21 MAR – TBD): Active Defensive Operations
├─ Daily: 8 threat hunts, incident response capability, 24/7 MOC
├─ Real-time: APT43 activity detection, rapid incident response, forensic analysis
└─ Weekly: Summary brief, intelligence updates, lessons learned

PHASE III (TBD – End): Transition & Hardening
├─ Final Assessment Report
├─ Knowledge Transfer Training (HECO/SEMA staff)
├─ System Validation & Hardening
└─ Formal Transition to Hawaii Command
```

---

## Contact Information (To Be Filled By Assigning Authority)

| Role | Name | Rank | Phone | Email |
|------|------|------|-------|-------|
| CPT 173 Team Lead | TBD | CPT | TBD | TBD |
| Battalion Commander | TBD | LTC | TBD | TBD |
| Battalion S2 | TBD | CPT/1LT | TBD | TBD |
| Battalion S3 | TBD | CPT/1LT | TBD | TBD |
| ARCYBER G3 (Operations) | TBD | CPT/MAJ | TBD | TBD |
| ARCYBER Legal Advisor | TBD | CPT/MAJ JAG | TBD | TBD |

---

**OPORD STATUS:** Ready for Issue

**SIGNATURE:** _________________________________
**DATE/TIME:** _________________________________

---

*For questions or updates to this OPORD, contact the Battalion S3 or CPT 173 Team Lead.*

