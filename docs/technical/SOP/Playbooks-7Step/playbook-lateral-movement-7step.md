# LATERAL MOVEMENT RESPONSE — INCIDENT RESPONSE PLAYBOOK
## 7-Step Framework | UNCLASSIFIED // FOUO

**Playbook ID:** IR-PB-005
**Version:** 1.0
**Classification:** UNCLASSIFIED // FOUO
**Threat Type:** Lateral Movement — Attacker Traversal Across Network Segments / Hosts
**Primary Role:** 17C Network Analyst (Lead) + 17C Host Analyst (Support)
**Authority:** CJCSM 6510.01B | AR 25-2 | FM 3-12 | ATP 3-12.3
**Created:** 2026-02-25
**Review Cycle:** Semi-annual or post-CAT I/II incident

**MITRE ATT&CK Primary Tactics:**
- T1021 — Remote Services (RDP, SMB, SSH, WinRM, VNC)
- T1550 — Use Alternate Authentication Material (Pass-the-Hash, Pass-the-Ticket, Golden Ticket)
- T1557 — Adversary-in-the-Middle (LLMNR/NBT-NS Poisoning, ARP spoofing)
- T1210 — Exploitation of Remote Services (lateral movement via vuln exploitation)
- T1534 — Internal Spearphishing (phishing within environment post-access)
- T1563 — Remote Service Session Hijacking (RDP/SSH session hijacking)

---

## BLUF

Lateral movement means the adversary is **expanding their foothold** inside your network — moving from initial access point toward higher-value targets (DCs, mission-critical systems, data stores). The priority is to **map the full movement path**, **sever it**, and **close the pivot points** before the adversary reaches their ultimate objective. Detecting lateral movement early is the highest-value defensive opportunity.

**The defender's window:** The time between initial access and final objective achievement. Lateral movement detection closes this window.

---

## STEP 1: PREPARATION

### 1.1 Required Capabilities
| Capability | Purpose |
|-----------|---------|
| Network flow analysis | Detect east-west traffic anomalies between hosts |
| EDR with remote access telemetry | Detect RDP, SMB, WMI, WinRM lateral movement |
| Authentication log aggregation | Detect credential-based lateral movement (pass-the-hash, ticket abuse) |
| AD event log collection | Track privileged account usage, new logon events |
| Honeypot / deception assets | High-confidence detection of lateral movement |
| Network segmentation controls | Limit blast radius, force lateral movement through choke points |

### 1.2 Network Architecture Requirements (Pre-Incident)
- [ ] East-west traffic logging at critical segment boundaries
- [ ] Lateral movement choke points identified and monitored
- [ ] Tier-separated AD model (admin accounts not used on standard workstations)
- [ ] Privileged Access Workstations (PAWs) or jump servers enforced for admin access
- [ ] SMB/RDP restricted between workstation segments (no peer-to-peer)
- [ ] Lateral movement detection rules active in SIEM (authentication anomalies, admin tool usage)

### 1.3 Baseline Data Required
- Normal authentication patterns per account type (service, admin, user)
- Approved remote access paths (jump servers, VPN gateways, management VLANs)
- Expected east-west communication pairs (known good server-to-server traffic)
- Domain admin usage baseline (when and where they normally authenticate)

---

## STEP 2: DETECTION & IDENTIFICATION

### 2.1 Lateral Movement Indicators
| Indicator | Description | Detection Source |
|-----------|-------------|-----------------|
| Authentication to new hosts from compromised account | Account logging into systems it has never accessed | AD logs, SIEM |
| RDP/SMB connections between workstations | Peer-to-peer admin tool usage (unusual) | Firewall, EDR |
| Admin tool execution (PsExec, WMIC, PowerShell remoting) on remote hosts | Remote execution vectors | EDR, Sysmon |
| Pass-the-Hash indicators | NTLM auth without prior Kerberos ticket | AD security logs (Event 4624 type 3) |
| Kerberoasting or AS-REP Roasting | Service ticket abuse for credential cracking | AD logs (Event 4769, 4768) |
| Unusual service account logon | Service account used interactively | AD logs |
| Lateral movement to new network segment | Traffic crossing segment boundary from compromised host | Firewall/NDR |
| New admin share access (\\host\C$, \ADMIN$) | Direct host access via admin shares | Firewall, EDR |

### 2.2 Lateral Movement Path Reconstruction
Goal: Map exactly how the attacker moved and what hosts they touched.

**Pivot point analysis:**
```
LATERAL MOVEMENT MAP TEMPLATE
[HOST A] ──(method: RDP / credential used)──► [HOST B]
[HOST B] ──(method: PsExec / credential used)──► [HOST C]
[HOST C] ──(method: WMI / service account)──► [HOST D - DC]
```

**For each hop, determine:**
- Source host
- Destination host
- Protocol/method used (RDP, SMB, WMI, WinRM, SSH)
- Credential used (which account)
- Timestamp (when did this hop occur)
- What the attacker did at each host (discovery, collection, persistence installation)

### 2.3 Scope Determination
- Total number of hosts touched (confirmed, suspected)
- Credentials used in lateral movement (need rotation list)
- Privileged accounts accessed or leveraged
- Mission-critical systems reached or in movement path
- Data stores accessed or in movement path
- Time window of movement activity (start → detection)

### 2.4 Severity Assessment
| Scope | Category |
|-------|----------|
| DC / AD infrastructure reached or targeted | CAT I |
| Mission-critical system or data store reached | CAT I |
| Multiple segments traversed | CAT I |
| Admin credentials used in movement | CAT II |
| Lateral movement within single segment, no critical systems | CAT II |
| Single hop, non-critical system | CAT III |

---

## STEP 3: CONTAINMENT

### 3.1 Containment Goal
**Cut the lateral movement path without alerting the adversary to the full extent of detection.**

Aggressive containment is appropriate — but preserve the ability to monitor if Mission OIC approves an intelligence collection window.

### 3.2 Pivot Point Isolation
Isolate each host identified as a pivot point (lateral movement source or destination):
- [ ] EDR isolation on all confirmed lateral movement hosts
- [ ] Network access blocked between affected systems (firewall ACL)
- [ ] Any hosts in the movement path that haven't yet been reached — increase monitoring

### 3.3 Credential Containment
For every credential observed in lateral movement:
- [ ] **Disable the account** (if active threat movement ongoing)
- [ ] **Force logout of all active sessions** using that account
- [ ] **Invalidate Kerberos tickets** (if Kerberos-based movement suspected — requires domain-wide ticket purge)
- [ ] **Reset the credential** before any host is restored to network
- [ ] Document all accounts in the lateral movement path for rotation

### 3.4 Segment Control
- [ ] Apply emergency ACLs between affected and clean segments
- [ ] Block lateral movement protocols (RDP, SMB, WinRM) between non-admin segments
- [ ] Enable enhanced monitoring on all segment boundaries
- [ ] Protect high-value targets not yet reached (DCs, mission servers) — increase monitoring, restrict inbound connections

### 3.5 Deception / Intelligence Collection Option
If movement is slow (credential-based, not worm-speed):
- Maintain monitoring on attacker's current position
- Observe attacker's next target to confirm ultimate objective
- Mission OIC approval required
- Time-limited (hours, not days)

---

## STEP 4: ERADICATION

### 4.1 Full Scope Eradication Requirements
**Partial eradication (cleaning some hosts but not all) is not eradication.** Attacker retains foothold.

- [ ] All hosts in lateral movement path identified
- [ ] All persistence mechanisms on all touched hosts removed
- [ ] All used credentials rotated
- [ ] Initial access vector on patient zero closed

### 4.2 Eradication Actions (Per Host on Lateral Movement Path)
1. Remove all implants and attacker-installed tools
2. Remove all persistence mechanisms (scheduled tasks, services, registry keys)
3. Remove any unauthorized accounts or account modifications
4. Audit group membership changes during the compromise period
5. Remove any staged data or reconnaissance outputs

### 4.3 Active Directory Eradication (If AD Touched)
If attacker reached any DC or used AD-based credential attacks:
- [ ] Forest-wide credential rotation (all accounts, all tiers)
- [ ] krbtgt account reset (twice, 10 hours apart — required after Golden Ticket compromise)
- [ ] AD audit: new accounts, modified permissions, group membership changes, GPO changes
- [ ] Remove any attacker-created accounts or elevated privileges
- [ ] Review and restore any modified GPOs

### 4.4 Network Hardening Post-Eradication
- Block unauthorized lateral movement protocols between segments permanently
- Enforce jump server/PAW requirements for admin access
- Disable NTLM authentication where not required (reduce pass-the-hash risk)
- Enable Kerberos AES encryption (disable older cipher suites)

---

## STEP 5: RECOVERY

### 5.1 Restoration Sequence
Priority based on criticality and role in the movement path:
1. Authentication infrastructure (rebuild if compromised)
2. Systems used as pivot points (rebuild — attacker had full access)
3. Systems attacker observed but may not have fully accessed (validate + harden)
4. Mission-critical systems (rebuild if attacker reached them)

### 5.2 Credential Recovery
Full credential rotation is required across all accounts accessed during the lateral movement window. Coordinate with:
- System owners (service account resets may impact applications)
- IT operations (domain-wide resets require planning window)
- End users (user account resets)

### 5.3 Enhanced Monitoring Focus
Post-lateral-movement recovery, monitor specifically:
- Authentication events for restored accounts
- East-west traffic patterns (new anomalies = re-lateral-movement)
- Admin tool usage on restored hosts
- Kerberos ticket usage patterns
- Logon events on DCs (particularly if AD was touched)

---

## STEP 6: POST-INCIDENT ANALYSIS

### 6.1 Lateral Movement Timeline
```
[DATE/TIME] Patient zero: initial access
[DATE/TIME] First lateral movement hop
[DATE/TIME] Second hop (and subsequent)
[DATE/TIME] Closest approach to final objective
[DATE/TIME] Detection
[DATE/TIME] Containment (path severed)
[DATE/TIME] Eradication complete
Number of hosts in movement path: [N]
Credentials used: [list of account types]
Attacker objective (assessed): [data / persistence / disruption]
Objective achieved? YES / NO
```

### 6.2 Root Cause — Why Did Lateral Movement Succeed?
- **Flat network?** (No east-west segmentation between workstations and servers)
- **Credential reuse?** (Same password across multiple systems)
- **Excess privilege?** (Admins logging in from workstations, service accounts with domain admin)
- **Missing detection?** (No east-west monitoring, no authentication anomaly detection)
- **Speed of response?** (Was detection-to-containment time adequate?)

### 6.3 Detection Improvement
- Add detection rules for specific lateral movement technique(s) used
- Review authentication anomaly thresholds in SIEM
- Add honeypot accounts and honey-tokens to detect future lateral movement attempts

---

## STEP 7: COORDINATION & REPORTING

### 7.1 Reporting Timeline
| Event | Recipient | Deadline |
|-------|-----------|----------|
| Lateral movement confirmed (CAT I/II) | Mission OIC | Immediately |
| CAT I notification | ARCYBER | Within 1 hour |
| Host inventory (all pivot points) | Mission OIC | Within 4 hours |
| AD compromise notification | Mission OIC + BN/BDE CDR | Immediately if AD reached |
| Status updates | All above | Every 8 hours while active |
| Final incident report | ARCYBER + BN/BDE CDR | Within 72 hours of closure |

### 7.2 Incident Closure Criteria
- [ ] Complete lateral movement path mapped and documented
- [ ] All pivot point hosts eradicated
- [ ] All accessed credentials rotated
- [ ] AD remediated (if applicable)
- [ ] Segmentation gaps closed
- [ ] Enhanced monitoring active (60 days)
- [ ] Final report submitted
- [ ] AAR conducted

---

## QUICK REFERENCE CARD

```
LATERAL MOVEMENT RESPONSE
──────────────────────────
1. MAP THE PATH (before cutting it — know all hops)
2. SEVER THE PATH (isolate all pivot points simultaneously)
3. LOCK CREDENTIALS (disable every account in movement path)
4. PROTECT AD (if attacker near DC — alert OIC immediately)
5. ERADICATE ALL FOOTHOLDS (every host touched needs cleanup)

IF AD IS COMPROMISED:
→ krbtgt reset x2 (10 hours apart)
→ Forest-wide credential rotation
→ All GPOs audited and verified
```

---

**Classification:** UNCLASSIFIED // FOUO
**Playbook ID:** IR-PB-005 | Lateral Movement Response
**Prepared By:** CyberOpsPlanner System
**Date:** 2026-02-25
**Related Playbooks:** IR-PB-004 (C2 Response), IR-PB-006 (Credential Theft), IR-PB-009 (Privilege Escalation)
**Technical Reference:** `docs/technical/SOP/(d) lateral-movement-response-playbook.docx`
