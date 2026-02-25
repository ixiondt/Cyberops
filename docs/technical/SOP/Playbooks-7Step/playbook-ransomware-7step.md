# RANSOMWARE RESPONSE — INCIDENT RESPONSE PLAYBOOK
## 7-Step Framework | UNCLASSIFIED // FOUO

**Playbook ID:** IR-PB-003
**Version:** 1.0
**Classification:** UNCLASSIFIED // FOUO
**Threat Type:** Ransomware — File Encryption / Double Extortion / Wiper Variant
**Primary Role:** 17C Host Analyst (Lead) + Cyber Ops Planner (Decision Support) + Network Analyst (Support)
**Authority:** CJCSM 6510.01B | AR 25-2 | FM 3-12 | CISA Ransomware Guidance
**Created:** 2026-02-25
**Review Cycle:** Semi-annual or post-CAT I incident

**MITRE ATT&CK Primary Tactics:**
- T1486 — Data Encrypted for Impact
- T1490 — Inhibit System Recovery (shadow copy deletion)
- T1489 — Service Stop (disabling security tools before encryption)
- T1562 — Impair Defenses (EDR / AV disabling)
- T1485 — Data Destruction (wiper variants)
- T1567 — Exfiltration Over Web Service (double extortion — data stolen before encryption)

**Escalation from:** IR-PB-001 (Malware Triage) or IR-PB-002 (Malware Outbreak)

---

## BLUF

Ransomware is a CAT I incident requiring **immediate, simultaneous action** across network, endpoint, and command channels. The window between ransomware detonation and full encryption can be **minutes**. Speed of isolation determines how many systems are recoverable. Do NOT pay ransom without explicit authorization from the highest appropriate legal/command authority. Recovery depends on the quality of your backups — validate backup integrity NOW.

**Three simultaneous actions at detection:**
1. Isolate affected systems (network and endpoint)
2. Notify Mission OIC and begin ARCYBER notification
3. Confirm backup integrity and availability

---

## STEP 1: PREPARATION

### 1.1 Ransomware-Specific Preparation Requirements

**Backup Validation (Most Critical Pre-Incident Action):**
- [ ] Backups exist for all mission-critical systems
- [ ] Backups are **offline or air-gapped** (ransomware commonly targets backup systems)
- [ ] Backup restoration tested within last 90 days
- [ ] Backup restoration time (RTO) documented per system
- [ ] Backups verified clean (not encrypted by pre-staged ransomware)

**Network Architecture:**
- [ ] Backup systems on separate, isolated network segment
- [ ] Critical systems network-segmented from user workstations
- [ ] Emergency isolation procedures for each segment documented

**Authority Pre-Coordination:**
- [ ] Ransom payment authority chain clearly documented (DO NOT pay without: Mission OIC + Legal + BN/BDE CDR + DoD CIO chain)
- [ ] Law enforcement notification procedure established (FBI / CISA coordination via ARCYBER)
- [ ] Insurance / risk management contacts established (if applicable)

### 1.2 Ransomware-Specific Preparation Checklist
- [ ] "Break glass" system isolation procedure tested
- [ ] Shadow Copy / VSS status verified on all critical systems
- [ ] PowerShell script execution policy enforced
- [ ] Macro execution policy enforced in Office suite
- [ ] Email attachment/link filtering active
- [ ] EDR capable of detecting ransomware behavior (encryption activity, shadow copy deletion)

---

## STEP 2: DETECTION & IDENTIFICATION

### 2.1 Ransomware Indicators (Detect Early — Before Full Encryption)

**Pre-Encryption Indicators (Act immediately on these):**
| Indicator | Urgency | Source |
|-----------|---------|--------|
| Shadow Copy / VSS deletion attempts | CRITICAL | EDR, Event Log 524/753 |
| Mass file rename operations | CRITICAL | EDR, file system monitoring |
| Security tool (EDR/AV) being disabled | CRITICAL | EDR |
| Encrypted file extension appearing in file shares | CRITICAL | File server monitoring |
| Ransom note files appearing (readme.txt, DECRYPT.txt) | CRITICAL | File monitoring |
| High-volume disk write / I/O spikes | HIGH | Performance monitoring |
| Network shares being enumerated and accessed | HIGH | Network monitoring |
| Backup service connections from unusual source | HIGH | Backup system logs |

**Post-Encryption Indicators (Damage already done — focus on scope):**
- Files with unknown or ransomware-associated extensions (e.g., .locked, .encrypted, .WNCRY)
- Ransom notes present in multiple directories
- Shadow copies deleted
- Backup files overwritten or encrypted

### 2.2 Ransomware Family Identification
Identify the ransomware family early — it affects recovery options:

| Factor | Why It Matters |
|--------|---------------|
| Ransomware family | Some families have published decryptors (free recovery possible) |
| Encryption algorithm | AES-256 with unique key per host = rebuild required; some use weak key derivation = possible decryption |
| Double extortion | Data already stolen — recovery addresses availability but not confidentiality |
| Wiper variant | No decryptor possible — backup/rebuild only |

**Identification method:** Ransom note content, encrypted file extension, file marker bytes, EDR detection name, submission to ID Ransomware database (via ARCYBER/cyber reachback).

### 2.3 Scope Determination (Critical for Containment Planning)
- How many hosts show encryption activity?
- Are network shares encrypted (affects all hosts with share access)?
- Are backup systems affected?
- Is AD/DC affected (affects entire domain recovery)?
- Is OT/mission system affected?

### 2.4 Severity Classification
**All ransomware incidents are CAT I or CAT II minimum.**
| Scope | Category |
|-------|----------|
| Any mission-critical or infrastructure system | CAT I |
| Any domain controller | CAT I |
| Any OT-connected system | CAT I |
| Multiple user systems (no critical infra) | CAT II |
| Single user system, isolated | CAT II |

---

## STEP 3: CONTAINMENT

### 3.1 Ransomware Containment Is a Race
Every second of delay = more files encrypted. Containment must be **immediate and simultaneous.**

### 3.2 Immediate Actions (0–5 Minutes)
- [ ] **EDR mass isolation** — Isolate ALL hosts showing ransomware indicators immediately
- [ ] **Network kill switch** — If worm behavior detected, emergency-segment infected VLAN(s)
- [ ] **Protect backups immediately** — Isolate backup systems if not already air-gapped
- [ ] **Notify Mission OIC** — "Ransomware active — initiating isolation — recommend ARCYBER notification"
- [ ] **DO NOT SHUT DOWN SYSTEMS** — Memory forensics possible; encrypted keys may be in memory

### 3.3 Short-Term Containment (5–30 Minutes)
- [ ] **Confirm spread stopped** — No new encryption activity on clean systems
- [ ] **Protect DCs and auth systems** — Highest priority for isolation from infected segment
- [ ] **Block all external communication from infected hosts** — Prevent additional data exfiltration and C2
- [ ] **Identify clean systems confirmed** — Build definitive "known clean" list
- [ ] **Notify ARCYBER** — CAT I notification via established channel

### 3.4 Ransom Demand Handling
**DO NOT make any ransom payment decision without:**
- [ ] Mission OIC approval
- [ ] Legal counsel review (DoD prohibitions on payments to sanctioned actors)
- [ ] BN/BDE CDR notification
- [ ] ARCYBER / Higher HQ coordination
- [ ] FBI/CISA notification (may affect payment legality assessment)

**Default position:** Do not pay. Pursue backup restoration. Payment does not guarantee recovery and may violate federal law if the threat actor is sanctioned.

### 3.5 Evidence Preservation
- [ ] Memory dump from key infected systems BEFORE any shutdown or remediation
- [ ] Disk images from patient zero and first-wave infected systems
- [ ] Network flow logs from infection period
- [ ] All ransom notes preserved
- [ ] Encrypted file samples preserved (needed for decryptor testing)

---

## STEP 4: ERADICATION

### 4.1 Eradication Prerequisites
**Check each before beginning eradication:**
- [ ] All infected hosts isolated
- [ ] Backup systems confirmed safe and isolated
- [ ] Full scope of infection confirmed (no hidden infected systems)
- [ ] Initial access vector identified (phishing / exploit / RDP brute / supply chain)
- [ ] Ransomware family and variant confirmed
- [ ] Free decryptor checked and tested (if available for this family)

### 4.2 Do NOT Attempt In-Place Recovery Until
- Encryption has fully stopped (active ransomware is gone)
- The initial access vector is patched/closed
- Compromised credentials are rotated
- Persistence mechanisms are removed

### 4.3 Eradication Actions
1. **Remove all ransomware artifacts** from infected systems
2. **Remove all persistence mechanisms** (ransomware commonly installs persistence to re-encrypt after reboot)
3. **Identify and close initial access vector** — patch vulnerability, disable exposed RDP, revoke phished credential
4. **Rotate ALL credentials** — Ransomware actors commonly use credential theft before encryption
5. **Validate no remaining implants** — Ransomware is often dropped by a broader RAT/dropper; eliminate the whole chain
6. **Update detection signatures** — Push new EDR/SIEM rules for this ransomware family

### 4.4 Decryptor Availability Check
Before rebuilding all systems, check:
- No More Ransom Project (via ARCYBER reachback or classified equivalent)
- Vendor-specific decryptors (check against confirmed ransomware family)
- Test decryptor on a COPY of encrypted files — never on originals

---

## STEP 5: RECOVERY

### 5.1 Recovery Decision Tree
```
BACKUP AVAILABLE AND CLEAN?
     │
     YES → Restore from backup → Verify clean → Rejoin network
     │
     NO → Was a free decryptor found?
              │
              YES → Test on isolated copy → Decrypt → Verify → Rejoin
              │
              NO → Rebuild from baseline image → Restore data from oldest clean backup
                   → Accept data loss for time between last clean backup and infection
```

### 5.2 Restoration Sequence (Same Priority Order as Outbreak)
1. Domain controllers / authentication infrastructure
2. Backup systems (restore backup capability first)
3. Mission-critical systems
4. Business-critical systems
5. User workstations (batch by priority)

### 5.3 Restoration Hardening (Apply Before Rejoining Network)
- [ ] Current patches applied
- [ ] EDR deployed and validated
- [ ] Enhanced logging enabled
- [ ] Principle of least privilege enforced
- [ ] RDP access restricted or MFA-enforced
- [ ] PowerShell execution policy restricted
- [ ] Scheduled task and startup location monitoring enabled

### 5.4 Data Recovery Assessment
Document for each system:
- Last clean backup date
- Estimated data loss window (backup date → infection date)
- Business/mission impact of data loss
- Any manual recovery options (staff knowledge, paper records, partner systems)
- Mission OIC + System Owner decision on acceptable data loss

### 5.5 Post-Recovery Monitoring
- 60-day enhanced monitoring for ransomware (longer than standard — actors often return)
- Daily review of backup system health
- Weekly review of encrypted file extension monitoring
- Any anomaly → immediate investigation

---

## STEP 6: POST-INCIDENT ANALYSIS

### 6.1 Ransomware Incident Timeline
```
[DATE/TIME] Initial access (from forensics — may predate encryption by days/weeks)
[DATE/TIME] Ransomware deployed/staged on patient zero
[DATE/TIME] Ransomware detonated (encryption began)
[DATE/TIME] First detection
[DATE/TIME] Isolation initiated
[DATE/TIME] Spread stopped
[DATE/TIME] ARCYBER notified
[DATE/TIME] Backup integrity confirmed
[DATE/TIME] Eradication complete
[DATE/TIME] Recovery started
[DATE/TIME] Recovery complete
[DATE/TIME] Enhanced monitoring active
Total systems encrypted: [N]
Total systems rebuilt: [N]
Data loss window: [days/hours]
Estimated mission impact: [description]
```

### 6.2 Key Analysis Questions
1. **How long was the attacker in the environment before encrypting?** (Ransomware actors typically dwell 2-4 weeks before detonation)
2. **Was data exfiltrated before encryption?** (Double extortion — if yes, this is also a Data Exfiltration incident — IR-PB-007)
3. **How did initial access occur?** (Phishing / exploit / RDP brute / supply chain / insider)
4. **Why weren't backups adequate?** (If backup-related gaps existed)
5. **What detection signatures would have caught this earlier?**

### 6.3 Mandatory Post-Incident Actions
- [ ] POA&M for every gap identified (backup, patching, segmentation, detection)
- [ ] Architecture review recommendation for network segmentation
- [ ] Backup strategy review (ensure air-gapped, tested, adequate retention)
- [ ] Privileged access review (ransomware commonly uses admin credentials)
- [ ] Update ransomware response playbook with specifics from this incident

---

## STEP 7: COORDINATION & REPORTING

### 7.1 Ransomware Reporting Requirements (Additional to Standard)
| Report | Recipient | Deadline | Authority |
|--------|-----------|----------|-----------|
| Initial notification | Mission OIC | Immediately | Analyst |
| CAT I report | ARCYBER | Within 1 hour | Mission OIC |
| Law enforcement notification | FBI / CISA (via ARCYBER) | Within 24 hours | Mission OIC + Legal |
| Ransom demand notification | BN/BDE CDR + Legal | Before any response to demand | Mission OIC |
| Status updates | All above | Every 6 hours while active | Mission OIC |
| Final incident report | ARCYBER + BN/BDE CDR | Within 72 hours of closure | Mission OIC |

### 7.2 Ransom Payment Decision Chain (If Raised)
**Do not initiate payment discussions without completing this chain:**
1. Mission OIC documents ransom demand details
2. Legal review — is payment legally permissible? (OFAC sanctions check)
3. BN/BDE CDR decision recommendation
4. ARCYBER coordination
5. Documented decision (pay or not pay) with rationale
6. If payment approved: only via authorized, documented method; preserve all records

### 7.3 Public Disclosure Considerations
- Do NOT make public statements about ransomware incident without HQ approval
- Route all media queries through PAO
- Coordinate with higher HQ on disclosure requirements (PII breach, federal system compromise)

### 7.4 Incident Closure Criteria
- [ ] All systems restored or rebuilt
- [ ] Backups validated and accessible
- [ ] Initial access vector eliminated
- [ ] All credentials rotated
- [ ] Enhanced monitoring active (60-day window)
- [ ] Final report submitted
- [ ] Law enforcement notification made (if required)
- [ ] AAR complete
- [ ] Lessons learned incorporated

---

## QUICK REFERENCE CARD

```
RANSOMWARE FIRST 5 MINUTES
───────────────────────────
1. ISOLATE — EDR mass isolation + network segment
2. PROTECT BACKUPS — Isolate if not already air-gapped
3. NOTIFY OIC — "Ransomware active — containing now"
4. DO NOT SHUTDOWN — Keep memory available for forensics
5. DO NOT PAY — Not without full authorization chain

SPEED > THOROUGHNESS IN FIRST 30 MINUTES.
ERADICATE THOROUGHLY — THEN RESTORE QUICKLY.
NEVER REBUILD BEFORE CLOSING INITIAL ACCESS VECTOR.
```

---

**Classification:** UNCLASSIFIED // FOUO
**Playbook ID:** IR-PB-003 | Ransomware Response
**Prepared By:** CyberOpsPlanner System
**Date:** 2026-02-25
**Escalates From:** IR-PB-001 (Malware Triage), IR-PB-002 (Malware Outbreak)
**Related Playbooks:** IR-PB-007 (Data Exfiltration — if double extortion confirmed)
**Technical Reference:** `docs/technical/SOP/(d) ransomware-response-playbook.docx`
