# PHISHING & INITIAL ACCESS VIA EMAIL — INCIDENT RESPONSE PLAYBOOK
## 7-Step Framework | UNCLASSIFIED // FOUO

**Playbook ID:** IR-PB-011
**Version:** 1.0
**Classification:** UNCLASSIFIED // FOUO
**Threat Type:** Phishing — Spear Phishing / Business Email Compromise Delivery / Malicious Link or Attachment
**Primary Lead:** 17C Host Analyst + Tier 1 SOC (initial intake)
**Supporting Entities:** 17C Network Analyst, S-2 / Intelligence Analyst, Cyber Ops Planner
**Notification:** Mission OIC (if malware executed or credential harvested)
**Authority:** CJCSM 6510.01B | AR 25-2 | FM 3-12
**Created:** 2026-02-25

**MITRE ATT&CK Primary Tactics:**
- T1566 — Phishing (spear phishing attachment, spear phishing link, voice phishing)
- T1566.001 — Spear Phishing Attachment (malicious macro, PDF exploit, ISO/LNK delivery)
- T1566.002 — Spear Phishing Link (credential harvesting page, drive-by download)
- T1534 — Internal Spearphishing (attacker reusing compromised mailbox to target others)
- T1598 — Phishing for Information (credential harvesting, pretexting)
- T1078 — Valid Accounts (if credentials harvested from phishing page)

**Escalates To:**
- IR-PB-001 (Malware Triage) — if malicious attachment executed
- IR-PB-006 (Credential Theft) — if phishing page credentials captured
- IR-PB-004 (C2 Response) — if C2 callback detected post-phishing

---

## BLUF

Phishing is the most common initial access vector in enterprise breaches. Most phishing incidents are either **non-executed** (user reported before clicking, or click blocked) or **executed** (attachment opened, link clicked with credential entry). The response posture is completely different for each. Non-executed = investigate and harden. Executed = immediate incident response with host analyst lead. Do not treat a reported phish as a low-priority ticket until execution has been ruled out.

**The two decisive questions:**
1. Did any user click the link or open the attachment? (If yes → escalate immediately)
2. Did any user enter credentials on a phishing page? (If yes → credential theft playbook)

---

## STEP 1: PREPARATION

### 1.1 Required Capabilities
| Capability | Entity | Purpose |
|-----------|--------|---------|
| Email gateway / SEG | IT Ops | Block malicious email, enable URL rewriting |
| Email sandbox | Network Analyst | Detonate attachment in isolation |
| EDR | Host Analyst | Detect post-execution malware behavior |
| SIEM with email log integration | Network Analyst | Correlate email delivery with endpoint alerts |
| Phishing simulation platform | Cyber Ops Planner | Measure user susceptibility (training program) |
| Email header analysis capability | Tier 1 SOC | Determine spoofing, routing, sender authenticity |
| User reporting mechanism | All users | Enable users to report suspicious emails |

### 1.2 Pre-Incident Controls
- [ ] Email gateway enforcing DMARC/DKIM/SPF validation
- [ ] URL rewriting / time-of-click protection enabled
- [ ] Attachment sandboxing on email gateway
- [ ] Phishing report button deployed to all users
- [ ] User security awareness training current (less than 12 months)
- [ ] Email alert workflow: user reports → Tier 1 SOC → 17C analyst

### 1.3 Phishing Response SLA (Pre-Agreed)
| Report Type | Tier 1 Response | 17C Analysis | OIC Notification |
|-------------|:--------------:|:------------:|:---------------:|
| User reported, no click | 30 min | 2 hours | If broad campaign |
| User reported, clicked link | 15 min | 30 min | Immediately |
| User reported, opened attachment | 5 min | 15 min | Immediately |
| EDR alert from attachment execution | Immediate | Immediate | Immediately |

---

## STEP 2: DETECTION & IDENTIFICATION

### 2.1 Detection Sources
| Source | What It Detects |
|--------|----------------|
| User phishing report button | Suspicious email reported by recipient |
| Email gateway alert | Blocked malicious attachment or URL |
| EDR alert | Malicious document execution, macro execution, suspicious child process |
| SIEM correlation | Email delivery + endpoint alert within short time window |
| Network proxy alert | User clicked link to known-bad domain |
| DNS alert | User resolution of phishing domain |
| Threat intelligence | Campaign IOCs matching inbound email attributes |

### 2.2 Phishing Triage — Tier 1 SOC Initial Actions
**Tier 1 SOC performs these steps on every phishing report:**

1. **Locate the email** in email gateway/admin console
2. **Examine email headers** — sender IP, SPF/DKIM/DMARC result, routing hops
3. **Extract IOCs from email:**
   - Sender email address and display name
   - Reply-to address (often different from sender)
   - Subject line
   - Links / URLs (do NOT click — extract from source)
   - Attachment names and file types
   - Email body text indicators
4. **Check IOCs against threat intelligence** (VirusTotal, internal TI platform)
5. **Determine click/open status:**
   - Query email gateway: Did the user click any links?
   - Check EDR: Any suspicious process activity on user's endpoint after email arrival time?
   - Ask the user (if safe to do so): Did they click or open anything?
6. **Classify:**
   - No click, no open → Phishing attempt, no execution
   - Clicked link → Potential credential harvest → Escalate to 17C
   - Opened attachment → Potential malware execution → Escalate to 17C IMMEDIATELY

### 2.3 17C Host Analyst Actions — If Executed
**Take over from Tier 1 SOC at this point.**

1. **Check EDR telemetry** on affected endpoint:
   - What process spawned from the document/attachment?
   - What did that process do? (Network connections, file writes, registry changes)
   - Was a dropper or downloader executed?
   - Is there a running C2 process?

2. **Identify payload type:**
   - Macro-based malware (VBA) — look for WINWORD/EXCEL spawning cmd/PowerShell
   - LNK/ISO execution — look for mshta, wscript, cscript, PowerShell
   - PDF exploit — look for Acrobat spawning unusual child processes
   - HTML Application (.hta) — look for mshta.exe execution

3. **Determine if C2 was established:**
   - Any outbound connections from affected host following execution?
   - → Activate IR-PB-004 (C2 Response) if confirmed

4. **Determine credential capture:**
   - Did user click a link and visit a page that requested login?
   - If yes: What credentials were entered? → Activate IR-PB-006 (Credential Theft)

### 2.4 Campaign Scope Assessment — 17C Network Analyst
Determine if this is a targeted (single user) or campaign (multiple recipients) attack:
- Search email gateway logs for same sender / same attachment hash / same URL
- Identify all recipients in the environment
- Identify all users who clicked or opened (vs. those who did not)

### 2.5 Severity Classification
| Situation | Category |
|-----------|----------|
| Attachment executed, C2 established, admin host | CAT I |
| Credentials harvested for privileged account | CAT I |
| Attachment executed, standard user | CAT II |
| Credential harvest, standard user | CAT II |
| Link clicked, no credential entry, no malware | CAT III |
| Email arrived, nothing clicked/opened | CAT IV |

---

## STEP 3: CONTAINMENT

### 3.1 Email-Level Containment (Tier 1 SOC + IT Ops)
- [ ] **Quarantine the phishing email** from all mailboxes in environment
  - Search by: sender, subject, attachment hash, URL
  - Quarantine from all recipients (not just the reporter)
- [ ] **Block sender domain/IP** at email gateway
- [ ] **Block malicious URL(s)** at web proxy (if link-based phish)
- [ ] **Block malicious attachment hash** at email gateway and EDR

### 3.2 Endpoint Containment — If Attachment Executed (17C Host Analyst)
- [ ] EDR isolation on affected host (prevent C2 outbound, prevent lateral movement)
- [ ] Preserve memory dump and disk image before remediation
- [ ] Block identified C2 destination at firewall/proxy (→ Network Analyst)
- [ ] Notify Mission OIC — CAT II or higher

### 3.3 Credential Containment — If Credentials Harvested (17C Host Analyst → Mission OIC)
- [ ] Identify exact credentials entered (what account, what service/page asked for them)
- [ ] Disable affected account immediately
- [ ] Force logoff of all active sessions for that account
- [ ] → Activate IR-PB-006 (Credential Theft)

### 3.4 Internal Spearphishing Check
If phishing email originated from an internal compromised mailbox:
- [ ] Disable the compromised email account
- [ ] Alert all internal recipients of the compromised-account phishing email
- [ ] → This is now also a credential theft / account compromise incident

---

## STEP 4: ERADICATION

### 4.1 If No Malware Executed
- [ ] All phishing emails removed from environment
- [ ] Sender blocked
- [ ] Malicious URL blocked
- [ ] User counseled / additional training assigned

### 4.2 If Malware Executed
Follow IR-PB-001 (Malware Triage) for full eradication procedure.
Additionally:
- [ ] Remediate the email delivery vector (strengthen email security controls)
- [ ] Remove any credentials entered on phishing page from all systems they could access

### 4.3 Email Infrastructure Hardening
Post-incident hardening:
- [ ] Enforce DMARC reject policy (if not already set to reject)
- [ ] Enable attachment sandboxing for all attachment types used in this attack
- [ ] Enable advanced URL analysis / click protection for the URL type used
- [ ] Add specific email template patterns to detection rules (future campaigns likely to reuse)

---

## STEP 5: RECOVERY

### 5.1 Endpoint Recovery
- If malware executed: Follow IR-PB-001 Recovery steps
- Rebuild from clean image if payload established persistence

### 5.2 User Awareness Recovery
- Provide targeted feedback to users who clicked (not punitive — educational)
- Brief leadership on campaign scope and user reporting rate
- Update phishing simulation scenarios to match real-world campaign style

### 5.3 Email Security Posture
- Validate quarantine sweep removed all instances of phishing email
- Confirm blocking rules are active and effective
- Monitor for variant campaigns (attackers often re-use infrastructure with minor modifications)

---

## STEP 6: POST-INCIDENT ANALYSIS

### 6.1 Phishing Campaign Analysis (S-2 / Intelligence Analyst Lead)
- Phishing email attribution (known actor, new campaign, commodity tooling)
- Infrastructure analysis (hosting, registration dates, bulletproof hosting)
- Targeting pattern (who was targeted — what is the attacker trying to access?)
- Campaign timeline (when did emails start arriving? How many waves?)
- MITRE ATT&CK: T1566.00X + delivery payload technique

### 6.2 User Response Analysis
```
PHISHING RESPONSE METRICS
Total emails delivered: [N]
Total recipients: [N]
Recipients who reported: [N] ([%])
Recipients who clicked/opened before report: [N] ([%])
Recipients who entered credentials: [N] ([%])
Mean time to report (from delivery): [minutes/hours]
```

### 6.3 Detection Gap
- Was the phishing email blocked or did it deliver?
- How many users received it before quarantine?
- What email security control failure allowed delivery?

---

## STEP 7: COORDINATION & REPORTING

### 7.1 Reporting Requirements
| Event | Recipient | Deadline |
|-------|-----------|----------|
| Malware execution confirmed | Mission OIC | Immediately |
| Credential harvest confirmed | Mission OIC | Immediately |
| Broad campaign (10+ recipients) | Mission OIC | Within 2 hours |
| CAT I/II notification | ARCYBER | Per CAT timeline |
| User notification (phished users) | All affected users | Within 24 hours |
| Final report | Mission OIC + ARCYBER | Within 72 hours |

### 7.2 IOC Sharing
- Share phishing campaign IOCs with ARCYBER / threat intelligence community
- Update internal TI platform with sender, URL, attachment hash, infrastructure IOCs

### 7.3 Incident Closure Criteria
- [ ] All phishing emails removed from all mailboxes
- [ ] All blocking rules confirmed active
- [ ] Execution confirmed/denied on all recipient endpoints
- [ ] Credential harvest confirmed/denied for all click victims
- [ ] Any downstream incidents (malware, C2, credential theft) resolved
- [ ] Email security posture hardened
- [ ] Users counseled / training updated
- [ ] Final report submitted

---

## QUICK REFERENCE CARD

```
PHISHING RESPONSE FLOW
───────────────────────
USER REPORTS PHISH → Tier 1 SOC triage
                        │
         ┌──────────────┼──────────────┐
      No click       Clicked link    Opened attachment
         │               │                │
   Quarantine +      Credential         17C Host Analyst
   Block sender      check →            IMMEDIATELY →
   No escalation     IR-PB-006          EDR check →
                                        IR-PB-001

QUARANTINE FIRST (all recipients) — THEN INVESTIGATE.
ONE CLICK = ASSUME EXECUTION UNTIL PROVEN OTHERWISE.
```

---

**Classification:** UNCLASSIFIED // FOUO
**Playbook ID:** IR-PB-011 | Phishing & Initial Access via Email
**Primary Lead:** 17C Host Analyst | Initial Intake: Tier 1 SOC
**Prepared By:** CyberOpsPlanner System | **Date:** 2026-02-25
**Escalates To:** IR-PB-001 (Malware Triage), IR-PB-006 (Credential Theft), IR-PB-004 (C2 Response)
