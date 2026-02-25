# INSIDER THREAT RESPONSE — INCIDENT RESPONSE PLAYBOOK
## 7-Step Framework | UNCLASSIFIED // FOUO

**Playbook ID:** IR-PB-012
**Version:** 1.0
**Classification:** UNCLASSIFIED // FOUO
**Threat Type:** Insider Threat — Malicious Insider / Negligent Insider / Account Compromise with Insider Access Pattern
**Primary Lead:** Mission OIC / IC (LEAD) + Legal / JAG (Co-LEAD)
**Supporting Entities:** 17C Host Analyst (forensics), 17C Network Analyst (monitoring), S-2 (analysis), Cyber Ops Planner (coordination)
**Notification:** BN/BDE CDR | Counterintelligence | HR / G1 (as appropriate)
**Authority:** CJCSM 6510.01B | AR 25-2 | AR 380-67 (Personnel Security) | DoD 5240.1-R (CI Activities) | Privacy Act
**Created:** 2026-02-25

**MITRE ATT&CK Primary Tactics:**
- T1078 — Valid Accounts (insider uses legitimate credentials — hardest to detect)
- T1213 — Data from Information Repositories (insider collecting from SharePoint, file shares, databases)
- T1560 — Archive Collected Data (packaging data for exfiltration)
- T1052 — Exfiltration Over Physical Medium (USB, personal device, printing)
- T1567 — Exfiltration Over Web Service (personal cloud, personal email)
- T1485 — Data Destruction (destructive insider sabotage)
- T1489 — Service Stop (insider-caused disruption)

**CRITICAL DIFFERENCE FROM OTHER PLAYBOOKS:**
This playbook is unlike all others. The threat actor has **legitimate credentials**, **authorized access**, **knowledge of the environment**, and potentially **knowledge of your monitoring capabilities**. Legal authority, evidentiary integrity, and covert monitoring are all primary considerations — not afterthoughts.

---

## BLUF

Insider threat incidents require a fundamentally different command posture. **Legal leads.** The Mission OIC cannot act unilaterally on investigation or monitoring activities without Legal confirmation of authority. Premature confrontation destroys the investigation. Moving too slowly allows damage to continue or evidence to be destroyed. The IC must balance speed, legal compliance, evidence preservation, and covert collection — simultaneously.

**Three categories of insider threat (different response for each):**
1. **Malicious insider** — Intentionally stealing data, sabotaging systems, or enabling external access
2. **Negligent insider** — Accidental data exposure, policy violation without malicious intent
3. **Compromised insider** — External attacker operating via legitimate credentials (not a true insider — treat as credential theft + lateral movement)

**Always rule out Category 3 before assuming 1 or 2.**

---

## STEP 1: PREPARATION

### 1.1 Required Capabilities (Must Exist Before Incident)
| Capability | Entity | Note |
|-----------|--------|------|
| SIEM with user behavior analytics (UEBA) | Network Analyst | Baseline normal for each user |
| DLP with endpoint and email coverage | Network Analyst | Detect data staging and exfil |
| Privileged access monitoring (PAM) | IT Ops | Alert on unusual privileged actions |
| Legal authority documentation | Legal / IC | What monitoring is authorized, by whom, and under what conditions |
| HR / G1 coordination SOP | Planner | Who to contact, what to say, when |
| Counterintelligence coordination channel | S-2 | Army CI (ACIC) or component equivalent |
| Secure case management system | IC | Isolated from suspect (no shared SIEM access) |

### 1.2 Legal Authority Pre-Coordination (Critical Pre-Incident)
Before any monitoring or investigation of a suspected insider:
- [ ] Legal confirms monitoring authority (consent policy, system banner, applicable law)
- [ ] Legal confirms lawful basis for any elevated monitoring of the suspect's accounts
- [ ] Legal confirms chain of custody requirements for any digital evidence collected
- [ ] Counterintelligence coordination established for national security insider threats
- [ ] HR/G1 notification protocol established (when, who, what to say)

### 1.3 Insider Threat Program Requirements
- [ ] System use banners deployed on all systems (informed consent for monitoring)
- [ ] User activity monitoring policy documented and communicated
- [ ] Insider threat working group or program established per DoD requirements
- [ ] Background investigation status tracking current
- [ ] Security clearance revocation procedures documented

---

## STEP 2: DETECTION & IDENTIFICATION

### 2.1 Insider Threat Indicators
**Behavioral Indicators (Human Intelligence / HR):**
- Expressions of grievance toward organization or leadership
- Unusual work hours (very early/late access to systems)
- Disregard for security policies or willingness to circumvent controls
- Recent life events (financial stress, family conflict, legal issues)
- Unexplained affluence or lifestyle change
- Attempts to access systems/data outside of job function
- Expressions of sympathy to adversary nations or organizations

**Technical Indicators (SIEM / EDR / DLP):**
| Indicator | Description | Source |
|-----------|-------------|--------|
| Mass file access outside normal pattern | User accessing many files they don't normally touch | SIEM / DLP |
| Large data download or copy | Volume anomaly on file server | DLP, file server logs |
| USB insertion + large file copy | Physical exfil preparation | EDR |
| Personal email access + attachment | Emailing data out via personal account | Proxy / DLP |
| Off-hours system access to sensitive data | Access at unusual time | SIEM |
| Deletion of large volumes of data | Sabotage or evidence destruction | EDR / audit logs |
| Access to systems outside job scope | Unauthorized reconnaissance | SIEM / AD logs |
| Multiple failed authentication attempts after hours | Attempted unauthorized access | AD logs |
| Cloud storage upload volume spike | Exfil to personal cloud | Proxy / DLP |

### 2.2 Initial Classification (IC + Legal Decision)
Before declaring an insider threat investigation:

| Question | Impact |
|----------|--------|
| Is this a technical anomaly or human behavior indicator? | May be compromised account (external) — rule out first |
| Is there corroborating behavioral/HR intelligence? | Strengthens insider hypothesis |
| Has the suspect had any recent life event stressors? | Indicator, not determinative |
| Does access pattern match malicious intent or negligence? | Drives response track (malicious vs. negligent) |
| Is national security equities involved? | Triggers CI notification |

### 2.3 Rule Out Compromised Account First
Before declaring insider threat:
- [ ] Verify no external access to the suspect's credentials (password breach check, phishing history)
- [ ] Verify no other user is sharing the account or its credentials
- [ ] Verify no malware on suspect's workstation that could be performing actions on their behalf
- If any of these are positive: → This is IR-PB-006 (Credential Theft), NOT an insider threat

### 2.4 Severity Classification
| Scope | Category | Additional |
|-------|----------|-----------|
| Active national security damage (exfil to foreign actor) | CAT I | + CI notification |
| Active exfiltration of sensitive/CUI data | CAT I | + Data breach assessment |
| Data destruction / sabotage ongoing | CAT I | |
| Data access without confirmed exfil | CAT II | |
| Policy violation, no confirmed data loss | CAT III | |
| Negligent (accidental) data exposure | CAT III–IV | Different track |

---

## STEP 3: CONTAINMENT

### 3.1 Covert vs. Overt Containment — IC + Legal Decision

**This is the most critical decision in insider threat response.**

| Approach | When Appropriate | Risk |
|----------|-----------------|------|
| **Covert monitoring** (no action against suspect) | Early stage, intelligence collection value, Legal authorized | Continued damage during collection window |
| **Partial containment** (access restrictions without tipping off) | Legal authorized, some damage ongoing | May arouse suspicion |
| **Overt containment** (suspend account, confront) | Imminent damage, CI decision, investigation complete | Destroys evidence collection opportunity |
| **Immediate termination of access** | Ongoing active damage, safety concern | Ends collection but stops bleeding |

**Default guidance:** Consult Legal before taking any action. The wrong sequence destroys either the evidence or the investigation.

### 3.2 Covert Collection Phase (Legal Authorized)
If Legal authorizes covert monitoring:
- [ ] Enhanced logging on suspect's accounts — all actions logged (additional level beyond standard)
- [ ] DLP alert escalation — all suspect data transfers flagged immediately
- [ ] Network monitoring enhancement — all outbound from suspect's endpoints flagged
- [ ] Physical security awareness — building access logs, badge readers
- [ ] All collection by cleared personnel on a need-to-know basis only
- [ ] **Information about investigation restricted to IC, Legal, designated analysts ONLY**

### 3.3 Protecting the Investigation
- [ ] Investigation discussion not on normal channels (use separate secure comms)
- [ ] Do NOT use shared SIEM dashboards where suspect might see elevated activity on their account
- [ ] Do NOT discuss investigation in areas where suspect could overhear
- [ ] Do NOT alert HR/G1 until Legal approves (they may interact with suspect)
- [ ] Limit knowledge of investigation to absolute minimum personnel

### 3.4 Evidence Preservation (Must Run Parallel to Monitoring)
- [ ] All digital evidence collected with chain of custody maintained
- [ ] Forensic-quality copies of any accessed systems
- [ ] Export of email, file access, and authentication logs for investigation window
- [ ] Legal confirms evidence handling requirements for potential prosecution

---

## STEP 4: ERADICATION

### 4.1 Access Termination (Following IC + Legal Decision to Act)
When decision is made to terminate the insider's access:
- [ ] Account disabled simultaneously across all systems (single coordinated action)
- [ ] Physical access revoked (badge, PIV card)
- [ ] VPN / remote access certificates revoked
- [ ] Any accounts the insider had visibility of must be rotated (they may have memorized passwords or captured credentials during authorized access)
- [ ] Any backdoors the insider may have established must be hunted (→ IR-PB-010 Persistence)

### 4.2 Damage Assessment
Determine what the insider actually accessed, copied, or destroyed:
- Complete audit trail of data accessed during investigation window AND prior suspicious period
- Identify all data taken (classify sensitivity level)
- Identify any systems modified or sabotaged
- Identify any unauthorized accounts created or configurations changed

### 4.3 Data Recovery (If Sabotage)
If insider destroyed or modified data:
- Restore from backup systems (verify insider did not also tamper with backups)
- Determine data loss window and impact

---

## STEP 5: RECOVERY

### 5.1 Organizational Recovery
Beyond technical recovery, insider threats require organizational recovery:
- [ ] Technical systems restored and hardened
- [ ] Team briefed appropriately (without compromising personnel privacy or ongoing legal action)
- [ ] Access control review — remove any unnecessary access across the team (not targeted at suspect)
- [ ] Data classification and access audit — ensure appropriate need-to-know controls

### 5.2 Trust and Morale Consideration (IC + Command)
Insider threat incidents impact team cohesion. IC should:
- Brief team at appropriate level (without violating privacy or compromising legal proceedings)
- Reinforce mission focus
- Not allow investigation to damage morale beyond what is necessary
- Debrief with leadership on team health

### 5.3 Process Hardening
Close gaps the insider exploited:
- Implement separation of duties for sensitive functions
- Enhance least-privilege enforcement
- Increase monitoring thresholds for sensitive data access
- Implement two-person integrity for critical actions

---

## STEP 6: POST-INCIDENT ANALYSIS

### 6.1 Insider Threat Post-Incident Report
**This report has a restricted distribution.** Not standard SITREP — route through Legal and CI channels.

Document:
- What indicators were present before discovery (were they missed or not yet observable?)
- What was the actual damage (data taken, systems affected, mission impact)
- How did the insider circumvent controls (what gaps existed)
- What personnel security indicators were present but not escalated

### 6.2 Lessons Learned (Restricted)
- What monitoring gaps allowed the activity to continue?
- What would have detected this earlier?
- Were there behavioral indicators that went unreported?
- What training/reporting culture changes are needed?

### 6.3 CI / Personnel Security Coordination
- ACIC (Army Counterintelligence Command) coordination for national security cases
- Personnel security referral for any clearance-related findings
- Adjudication process for affected personnel

---

## STEP 7: COORDINATION & REPORTING

### 7.1 Notification Chain — Insider Threat (DIFFERENT from standard)
| Notify | When | Who Initiates |
|--------|------|--------------|
| Legal / JAG | Immediately upon suspicion | IC |
| Mission OIC / IC | Immediately upon confirmed suspicion | Element Lead |
| BN/BDE CDR | Upon confirmation | IC |
| ACIC / Counterintelligence | If national security equities | IC + Legal |
| HR / G1 | When Legal authorizes | IC |
| ARCYBER | Upon confirmation per CJCSM | IC |
| Law enforcement (CID / FBI) | If criminal activity | IC + Legal |

**Do NOT notify HR/G1 without Legal clearance.**
**Do NOT notify the suspect.**
**Do NOT notify the suspect's supervisor without Legal clearance.**

### 7.2 Reporting Restrictions
Insider threat reports contain personnel information and may be subject to:
- Privacy Act protections
- Ongoing investigation confidentiality
- Legal proceeding sensitivity
- Classification based on CI equities

All reports route through Legal before external dissemination.

### 7.3 Incident Closure Criteria
- [ ] Insider's access fully terminated
- [ ] Damage fully assessed
- [ ] Legal proceedings initiated or decision made not to prosecute
- [ ] ACIC referral made (if national security equities)
- [ ] Personnel security referral completed
- [ ] Technical hardening implemented
- [ ] Restricted post-incident report submitted
- [ ] Leadership briefed

---

## QUICK REFERENCE CARD

```
INSIDER THREAT FIRST ACTIONS
──────────────────────────────
1. RULE OUT COMPROMISED ACCOUNT (technical check first)
2. NOTIFY IC AND LEGAL IMMEDIATELY (before any other action)
3. RESTRICT KNOWLEDGE OF INVESTIGATION (need-to-know only)
4. DO NOT CONFRONT SUSPECT (without IC + Legal decision)
5. PRESERVE EVIDENCE FORENSICALLY (chain of custody)
6. COVERT MONITORING IF LEGAL AUTHORIZED
7. OVERT CONTAINMENT ONLY ON IC + LEGAL DECISION

THE BIGGEST MISTAKE: ALERTING THE SUSPECT PREMATURELY.
THE SECOND BIGGEST MISTAKE: ACTING WITHOUT LEGAL AUTHORITY.
```

---

**Classification:** UNCLASSIFIED // FOUO
**Playbook ID:** IR-PB-012 | Insider Threat Response
**Primary Lead:** Mission OIC (IC) + Legal / JAG (Co-LEAD)
**Supporting:** 17C Host Analyst (forensics), 17C Network Analyst (monitoring), S-2 (analysis)
**Prepared By:** CyberOpsPlanner System | **Date:** 2026-02-25
**Related Playbooks:** IR-PB-006 (Credential Theft — rule out first), IR-PB-007 (Data Exfiltration — concurrent)
