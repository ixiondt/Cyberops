# ANNEX C: OPERATIONS & SYNCHRONIZATION

**OPORD 27-01 | PEARL SENTINEL**
**CPT 173 DCO-RA Hawaii Operations**

---

## C.1 Phase Breakdown & Execution Timeline

### Phase I: Deployment & Integration (15–20 MAR 2026)

**Operational Objective:** Stand up Mission Operations Center (MOC), validate authorities and access, establish baseline threat posture understanding.

**Daily Execution Timeline:**

| Date | Time (Z) | Milestone | Owner | Notes |
|------|----------|-----------|-------|-------|
| **15 MAR** | Various | **Personnel arrival at Joint Base** | CPT TL | Air transportation; inprocessing begins |
| | 1400Z | Initial Facility Inspection & MOC Setup | WO1 Deputy | Secure space assessment, power/network verification |
| | 1800Z | First Meeting w/ Battalion CDR & S3 | CPT TL | Mission overview, logistics coordination |
| | 2000Z | Security Brief & Building Access | Base Security | Badge issuance, facility orientation, emergency procedures |
| **16 MAR** | 0800Z | Initial Coordination Call w/ HECO/SEMA | CPT TL | Establish single points of contact, escalation procedures |
| | 1000Z | NSA Liaison Briefing (Classified) | NSA LTC | Threat intel briefing, information sharing agreement |
| | 1200Z | Tool Access Validation | IT NCO | SIEM (Splunk), EDR (CrowdStrike), cloud audit log access test |
| | 1400Z | Network Architecture Walkthrough | DISA/HECO CSO | Understand DoD & HECO network topology, boundaries, choke points |
| | 1600Z | MOC Staffing & Watch Schedule Briefing | NCOIC | 24/7 watch rotation, accountability procedures |
| **17 MAR** | 0600Z | **MOC Watch Activation (0600Z 17 MAR)** | NCOIC | First 24/7 watch begins; minimum 2 personnel on duty |
| | 0800Z | Incident Response Playbook Training | IR Lead | Scenario-based tabletop exercise; credential compromise, malware, OT threat |
| | 1200Z | APT43 TTP Deep Dive & Malware Review | S2 + Forensics Lead | Threat actor tactics, observed malware, C2 patterns, evasion methods |
| | 1400Z | SIEM & EDR Tool Bootcamp | Network Lead | Hands-on training on Splunk queries, CrowdStrike alerts, dashboard navigation |
| | 1800Z | Initial Network Baseline Assessment (Begin) | Network Lead | Automated baseline collection of network flows, DNS, proxy activity |
| **18 MAR** | Continuous | Baseline Data Collection | Network/Forensics Leads | 24-hour flow collection; asset inventory; system fingerprinting |
| | 0900Z | Authority & ROE Briefing | ARCYBER Legal Officer | DCO-M/DCO-RA authority limits, escalation thresholds, legal constraints |
| | 1100Z | Cloud Access Validation (AWS/Azure) | Cloud Admin | Verify read-only access to CloudTrail, Azure Activity Log, IAM audit logs |
| | 1300Z | Written Authority Confirmation Received | CPT TL | ARCYBER FRAGO 01-27 (DCO-RA pre-authorization matrix) |
| **19 MAR** | 0800Z | Daily SITREP Preparation (First) | Reporting NCO | Draft and deliver first daily SITREP to ARCYBER |
| | 1000Z | Threat Hunting Hypothesis Development | Network/Forensics Leads | Draft 5-8 hunt hypotheses based on APT43 TTPs and baseline data |
| | 1200Z | Hunt Playbooks Validation | IR Lead | Review incident response & containment procedures; identify any gaps |
| | 1400Z | Interagency Coordination Call | CPT TL + S2 | NSA, FBI, CISA coordination; threat intel fusion; POC confirmation |
| | 1600Z | First Daily SITREP to ARCYBER & HECO/SEMA | CPT TL | Phase I progress update, baseline assessment findings, PIR status |
| **20 MAR** | 0800Z | Hunt Execution Begins | Network/Forensics Leads | Execute first 8 threat hunting hypotheses against baseline data |
| | 1200Z | Tabletop Exercise: "Hypothetical Malware Detection" | All Staff | Simulated incident response; test playbooks, escalation procedures |
| | 1600Z | Phase I Summary SITREP | CPT TL | Final Phase I status; recommendations for Phase II transition |
| | 2000Z | **Phase II Approval Decision (By CPT TL & Battalion CDR)** | CPT TL + CDR | MOC operational, baseline complete, ready for active operations? |

**Phase I End State (20 MAR 1800Z):**
- ✅ MOC fully operational with 24/7 watch capability and redundant comms
- ✅ All authorized personnel on-site with valid network access (SIEM, EDR, cloud, OT monitoring)
- ✅ Baseline network assessment completed; asset inventory finalized
- ✅ Threat hunting playbooks validated; hunt hypotheses ready for execution
- ✅ Incident response procedures trained and tested (tabletop exercise completed)
- ✅ Authorities confirmed in writing (DCO-RA pre-authorization matrix received)
- ✅ Initial Assessment Report delivered to ARCYBER

---

### Phase II: Active Defensive Operations (21 MAR – TBD)

**Operational Objective:** 24/7 continuous monitoring, intelligence-driven threat hunting, rapid incident response, APT43 eradication.

**Daily Operational Rhythm:**

| Time (Z) | Synchronization Event | Duration | Attendees | Purpose |
|----------|----------------------|----------|-----------|---------|
| **0800Z** | MOC Daily Standup | 15 min | All CPT 173 staff | Overnight threat update, daily hunt priorities, resource needs |
| **1200Z** | Mid-Day Tactical Update | 10 min | CPT TL + Hunt Leads | Hunt hypothesis progress, any incidents detected, resource reallocation |
| **1600Z** | **Daily SITREP to Higher HQ** | 30 min | CPT TL, Battalion S3 | Progress vs PIRs, incidents, threat trend analysis, risks/issues, next 24h |
| **1800Z** | Incident Response Briefing (if applicable) | 30 min | IR Lead, CPT TL | Detailed incident status, containment progress, forensic findings |
| **2400Z** | Evening Situation Consolidation | 15 min | NCOIC + Watch Personnel | Prepare handoff for next shift; hunt log updates |

**Daily Hunt Cycle (8 hypotheses/day target):**

1. **Hypothesis 1:** Credential anomalies (failed logins, unusual IPs, MFA bypass attempts)
2. **Hypothesis 2:** C2 Beaconing (periodic outbound connections, DNS query patterns, TLS certificate anomalies)
3. **Hypothesis 3:** Lateral Movement (SMB, RDP, WinRM usage to high-value systems)
4. **Hypothesis 4:** Persistence Mechanisms (scheduled tasks, service installations, registry modifications, WMI events)
5. **Hypothesis 5:** Data Exfiltration (large file transfers, web-based uploads to cloud storage)
6. **Hypothesis 6:** Privilege Escalation (Kerberoasting, token theft, UAC bypass indicators)
7. **Hypothesis 7:** OT Network Reconnaissance (queries to OT networks, control system enumeration)
8. **Hypothesis 8:** Defense Evasion (log deletion, tool usage anomalies, AV/EDR bypass attempts)

---

### Phase III: Transition & Hardening (TBD – Commander's Decision)

**Operational Objective:** Consolidate operational gains, transfer knowledge and capability to Hawaii command, establish sustainable defensive posture.

**Transition Timeline (Estimated 2-4 weeks):** Final assessment, knowledge transfer training, system validation, formal transition to Hawaii command.

---

## C.2 Operational Control Measures & Constraints

### Authority Ceiling

- **DCO-M (Monitor):** Unlimited authority for continuous monitoring, detection, analysis, forensics
- **DCO-RA (Pre-Authorized):** Authority for credential disablement, host isolation, C2 disruption
- **DCO-RA (Non-Authorized):** Any action outside pre-authorized list requires ARCYBER S3 approval (2-hour response window)

### Operational Constraints

- **OT Actions:** No automated OT containment; all OT actions require manual coordination with HECO and CPT 173 mutual agreement
- **Production System Changes:** No changes without explicit written approval from network owner
- **Non-Mission Data:** No access to corporate data unrelated to APT43 investigation
- **Data Retention:** Forensic data retained for 30 days minimum; classified material destroyed per DoD guidelines

---

## C.3 Risk Control Measures

| Risk | Probability | Mitigation |
|------|-------------|-----------|
| **OT Coordination Delay** | MODERATE | Pre-establish 24/7 OT escalation contact; practice rapid escalation |
| **Cloud Persistence Unknown** | MODERATE | Prioritize cloud IAM audit; daily cloud-specific threat hunting |
| **Authority Approval Lag** | MODERATE | Pre-negotiate standard playbooks with ARCYBER |
| **Limited Baseline Data** | HIGH | Intensive baseline collection in Phase I (48 hours minimum) |
| **False Positive Overload** | MODERATE | Implement tuning period; train analysts on APT43-specific indicators |
| **MOC Staffing Burnout** | MODERATE | Implement 5-day rotation schedule; quarterly personnel relief |

---

## C.4 Operational Metrics & Success Measures

### Key Performance Indicators

| Metric | Phase I Target | Phase II Target |
|--------|----------------|-----------------|
| **Hunt Execution Rate** | 5-8 hunts/day | 8-10 hunts/day |
| **Incident Detection Accuracy** | Baseline | <5% false positive rate |
| **Incident Response Time** | Confirm within 30 min | Confirm within 15 min |
| **Containment Response Time** | Execute within 1 hour | Execute within 30 min |
| **MOC Availability** | 99.5% | 99.9% |

---

**RESPONSIBLE OFFICER:** Battalion S3 (Operations Officer)

**APPROVED BY:** LTC [Battalion Commander]

