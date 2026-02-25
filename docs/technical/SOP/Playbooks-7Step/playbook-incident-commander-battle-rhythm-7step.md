# INCIDENT COMMANDER (IC) BATTLE RHYTHM — PLAYBOOK
## 7-Step Framework | UNCLASSIFIED // FOUO

**Playbook ID:** IR-PB-018
**Version:** 1.0
**Classification:** UNCLASSIFIED // FOUO
**Type:** Command Playbook — Governs Mission OIC / Incident Commander role across ALL incidents
**Primary Lead:** Mission OIC / Incident Commander (IC)
**Supporting Entities:** All entities — IC coordinates all response cells
**Authority:** FM 3-12 | ADP 5-0 | CJCSM 6510.01B | AR 25-2 | FM 6-0 (Commander and Staff)
**Created:** 2026-02-25

---

## BLUF

The Incident Commander (IC) is the single decision authority for all incident response actions above analyst level. This playbook governs the IC's battle rhythm — how they manage the incident, coordinate cells, make decisions, communicate with leadership, and maintain situational awareness from incident declaration to closure. The IC's primary product is **clarity** — clear decisions, clear communication, clear tracking.

**The IC is not a technical analyst.** The IC makes decisions based on analyst recommendations, maintains the battle rhythm, and manages the command-reporting chain. An IC who gets pulled into technical analysis loses command.

**IC Core Functions:**
1. Maintain situational awareness (own the COP)
2. Make decisions (own the authority)
3. Communicate (own the reporting chain)
4. Manage resources (own the cell)
5. Assess risk (own the risk acceptance)

---

## STEP 1: PREPARATION (PRE-INCIDENT IC READINESS)

### 1.1 IC Pre-Incident Readiness Checklist
- [ ] Playbook library current (all 18 playbooks reviewed in last 6 months)
- [ ] Contact roster current (all entities, alternates, and HQ contacts)
- [ ] Authority chain documented (who can the IC call for decisions above their level?)
- [ ] Reporting channels confirmed (ARCYBER, BN/BDE CDR, Legal, System Owner contacts)
- [ ] Legal pre-briefed on monitoring authority, insider threat procedures
- [ ] Battle rhythm template available (see Section 5)
- [ ] Incident decision authority matrix understood (see IR-Team-Entity-Reference.md)
- [ ] Out-of-band communication channel (phone, alternate network) confirmed

### 1.2 IC Required Briefings (Pre-Incident)
Before assuming IC role on an operation:
- [ ] Current threat landscape (S-2 threat brief)
- [ ] Supported organization overview (network, critical assets, System Owner contacts)
- [ ] OPORD authorities review (what DCO/DCO-RA actions are pre-authorized?)
- [ ] Legal authorities brief (monitoring, isolation, credential reset authorities)
- [ ] Personnel roster review (who are my analysts? their strengths and experience?)
- [ ] Incident tracking system familiarization (Operations Dashboard — `localhost:3000`)

### 1.3 IC Succession
IC succession order should be documented before incidents occur:
1. Mission OIC (Primary IC)
2. Element Lead (Alternate IC)
3. Senior 17C Host Analyst (Emergency IC — for technical decisions only, notify HQ immediately)

---

## STEP 2: DETECTION & IDENTIFICATION (IC INITIAL ACTIONS UPON INCIDENT NOTIFICATION)

### 2.1 IC Notification Trigger (From Any Entity)
Analysts notify IC when:
- True positive incident confirmed
- CAT level determined
- Any action requiring IC authority is needed

**Analyst → IC notification format:**
```
"[IC callsign], this is [Analyst]. INCIDENT NOTIFICATION.
Incident: [Brief description — one sentence]
Severity: CAT [X]
Affected: [System/Host]
Status: [What is happening right now]
Actions taken: [What analyst has already done]
Request: [What analyst needs from IC — approval, notification, resources]"
```

### 2.2 IC Initial Decision Sequence (First 15 Minutes)
```
IC RECEIVES INCIDENT NOTIFICATION
            │
            ▼
VALIDATE: Is this a true positive? (Ask analyst — confirm)
            │
            ▼
CLASSIFY: What CAT level? (Determine from playbook criteria)
            │
            ▼
NOTIFY: Who must be notified at this CAT level?
  CAT I → BN/BDE CDR + ARCYBER + System Owner + Legal
  CAT II → BN/BDE CDR + ARCYBER + System Owner
  CAT III → Element Lead + System Owner (as appropriate)
  CAT IV → Document, monitor
            │
            ▼
AUTHORIZE: What actions has the analyst requested?
  Authorized → Direct analyst to proceed
  Not authorized → Determine right level → Notify → Get approval → Direct
            │
            ▼
ESTABLISH: Battle rhythm (see Section 5)
```

### 2.3 IC Situational Awareness (What IC Must Know at All Times)

**The IC's Common Operating Picture must always show:**
1. Current incident status (what is happening, who is doing what)
2. Time elapsed since detection and since last key milestone
3. Next decision point and when it's due
4. Reporting deadlines and status (what's been sent, what's pending)
5. Resource status (analysts on task, breaks needed, support required)
6. Risk posture (what is currently at risk, what's been secured)

**IC uses the Operations Dashboard** (`localhost:3000`) as their primary tracking tool.

---

## STEP 3: CONTAINMENT (IC DECISION AUTHORITY AND COORDINATION)

### 3.1 IC Decision Authority Framework
The IC makes YES/NO decisions on every request that exceeds analyst authority. To make good decisions, the IC needs:
- **Recommendation** from the analyst (what do you recommend?)
- **Risk assessment** (what happens if we do this? what happens if we don't?)
- **Alternative** (is there another option?)
- **Timeline** (how long do we have to decide?)

**IC Decision Format (to analysts):**
- "Approved — proceed."
- "Approved with condition — [condition]."
- "Denied — do [alternative] instead."
- "Hold — I need to notify [X] first. Stand by for decision."

### 3.2 Escalation Decisions (IC → BN/BDE CDR)
IC escalates to BN/BDE CDR when:
- CAT I confirmed
- Mission impact (capability degraded or unavailable)
- Domain controller or authentication infrastructure affected
- Ransom demand received
- Insider threat confirmed
- Action required that exceeds IC authority (IC documents what authority is needed)

**IC → BN/BDE CDR notification format:**
```
"Sir/Ma'am, INCIDENT NOTIFICATION.
We have a [CAT X] incident — [BRIEF DESCRIPTION].
[X] systems are affected. Mission impact: [DESCRIPTION].
We have [CONTAINMENT STATUS].
I need your authority to [ACTION REQUIRING CDR AUTHORITY].
Reporting to ARCYBER is [PENDING / COMPLETE].
Recommend: [RECOMMENDED COURSE OF ACTION].
Time sensitive: [IF YES — WHY]."
```

### 3.3 Coordination Across Cells
IC coordinates simultaneous efforts across all cells:
- **Analysis Cell** (Host + Network Analysts): Technical investigation and containment
- **Planning Cell** (Planner + Legal): Reporting products, authority coordination
- **Intelligence Cell** (S-2): Threat intelligence, attribution, PIR/RFI updates
- **IT Ops**: Technical execution (isolation, resets, restoration)
- **External**: System Owner, ARCYBER, Legal, Law Enforcement

**IC coordination tools:**
- Incident tracker (Operations Dashboard)
- Shared communication channel for incident (separate from normal comms)
- Whiteboard / common display showing current status

---

## STEP 4: ERADICATION (IC OVERSIGHT AND APPROVAL GATES)

### 4.1 IC Eradication Approval Gates
For each major eradication action, IC confirms:
- [ ] Forensic collection complete (do not eradicate before imaging)
- [ ] Full scope determined (do not eradicate one host if others are still infected)
- [ ] Eradication plan reviewed (what exactly will be done, in what order)
- [ ] System Owner coordinated (for production system changes)
- [ ] Rollback plan exists (what if eradication causes unexpected impact)
- [ ] Authorization documented (IC explicitly approves each significant action)

### 4.2 IC Risk Acceptance Documentation
For every risk acceptance decision the IC makes:
```
RISK ACCEPTANCE RECORD
Date/Time:
Incident:
Risk: [What risk is being accepted]
Reason: [Why it is being accepted]
Mitigating factors: [What reduces the risk]
Accepted by: [IC Name, Rank]
Authority to accept: [IC authority, or CDR authority]
```

---

## STEP 5: RECOVERY (IC BATTLE RHYTHM — ONGOING)

### 5.1 IC Battle Rhythm Template

**CAT I Incident Battle Rhythm:**
```
[+00:00] Incident confirmed — IC notified
[+00:15] CAT I classification confirmed — BN/BDE CDR notified
[+00:30] ARCYBER CAT I notification submitted
[+01:00] Initial incident report drafted (Planner)
[+02:00] Containment status brief to BN/BDE CDR
[+06:00] First status update to all recipients
[+12:00] SITREP (progress, findings, next 12 hours)
[+24:00] Detailed incident report (if investigation ongoing)
Every 6 hours: Status update until containment achieved
Every 12 hours: SITREP until incident closed
Upon milestone: Immediate notification (containment achieved, eradication complete, recovery)
```

**CAT II Incident Battle Rhythm:**
```
[+00:00] Incident confirmed — IC notified
[+00:30] CAT II classification confirmed — System Owner notified
[+08:00] ARCYBER CAT II notification submitted
[+04:00] Initial incident report drafted
Every 12 hours: Status update until containment
Every 24 hours: SITREP until closure
```

### 5.2 IC Status Brief Format (Every 6-12 Hours)
```
INCIDENT STATUS BRIEF — [INCIDENT ID] — [DATE/TIME]
To: [Recipient list]
From: [IC Name]

1. SITUATION:
   Status: [ACTIVE INVESTIGATION / CONTAINED / ERADICATION / RECOVERY / CLOSED]
   Incident: [Brief description]
   CAT: [X]
   Affected: [Systems/hosts/services]
   Mission impact: [Current impact]

2. ACTIONS IN LAST [6/12] HOURS:
   [Bullet — what was done]
   [Bullet — what was completed]

3. ASSESSMENT:
   [Current understanding of scope and threat]
   [Confidence level]

4. RISK:
   [Current risk to mission]
   [Risk trend: increasing / stable / decreasing]

5. NEXT [6/12] HOURS:
   [Planned actions]
   [Decisions needed]
   [Decision authority needed]

6. RESOURCES:
   [Support needed / status of team]

POC: [IC Name, Phone]
```

---

## STEP 6: POST-INCIDENT ANALYSIS (IC — AAR AND CLOSURE)

### 6.1 IC Incident Closure Criteria (Applies to ALL Incidents)
Before declaring an incident CLOSED:
- [ ] Threat fully eradicated from environment (all analysts confirm)
- [ ] No residual attacker presence (validated by analyst team)
- [ ] All affected systems restored and validated
- [ ] All reporting obligations met (ARCYBER, BN/BDE CDR, System Owner, Legal)
- [ ] Enhanced monitoring active for required period
- [ ] Final incident report submitted and acknowledged
- [ ] Lessons learned captured

### 6.2 IC-Led After Action Review (AAR)
For every CAT I/II incident, IC leads AAR within 72 hours of incident closure:

**AAR Agenda:**
1. What we thought would happen vs. what actually happened (timeline review)
2. What went right (sustain)
3. What went wrong (improve)
4. What caused each gap (root cause)
5. What action items address each gap (who owns, when due)
6. Doctrine/playbook updates required

**AAR Attendees:** All response entities (IC, Host Analyst, Network Analyst, Planner, S-2, IT Ops, Legal if applicable)

**AAR Product:** Documented lessons learned submitted to BN/BDE CDR and filed in operation folder.

### 6.3 IC Incident Closure Declaration
```
INCIDENT CLOSURE DECLARATION — [INCIDENT ID]
Date/Time Closed: [DATE/TIME]
Declared Closed By: [IC Name, Rank]
Closure Basis: [All closure criteria met — list each]
Final Report Reference: [Report number]
Enhanced Monitoring Status: [Duration and responsible analyst]
Lessons Learned Reference: [AAR document]
POA&Ms Generated: [List any POA&Ms created]
```

---

## STEP 7: COORDINATION & REPORTING (IC — COMPLETE REPORTING MANAGEMENT)

### 7.1 IC Reporting Authority
**The IC signs or approves all external reports.** No external communication on an active incident without IC knowledge.

### 7.2 Required Reports by CAT Level

| Report | CAT I | CAT II | CAT III | CAT IV |
|--------|:-----:|:------:|:-------:|:------:|
| BN/BDE CDR notification | ≤1 hr | ≤4 hrs | ≤24 hrs | Daily SITREP |
| ARCYBER initial notification | ≤1 hr | ≤8 hrs | ≤24 hrs | ≤72 hrs |
| System Owner notification | ≤1 hr | ≤4 hrs | ≤8 hrs | As appropriate |
| Legal notification | ≤1 hr (if PII/CUI) | If PII/CUI | If applicable | |
| Status updates | Q6 hrs | Q12 hrs | Q24 hrs | |
| Final report | ≤72 hrs of closure | ≤72 hrs | ≤72 hrs | ≤72 hrs |

### 7.3 IC Reporting Tracker
IC maintains a reporting tracker during the incident:
```
REPORTING TRACKER — [INCIDENT ID]
| Report | Due | Sent | Recipient | Ack Received |
|--------|-----|------|-----------|:------------:|
| Initial notification | [TIME] | [SENT Y/N] | BN/BDE CDR | |
| ARCYBER CAT notification | [TIME] | [SENT Y/N] | ARCYBER | |
| System Owner notification | [TIME] | [SENT Y/N] | [NAME] | |
| 6-hour status | [TIME] | [SENT Y/N] | All | |
| Final report | [TIME] | [SENT Y/N] | All | |
```

### 7.4 IC Communication Rules
- All external communications reviewed by IC before sending (or IC delegates to Planner with oversight)
- Ransom demand responses require Legal + CDR coordination before any response
- Media inquiries → IC acknowledges receipt, routes immediately to PAO, no further comment
- Law enforcement coordination → IC + Legal
- ARCYBER requests → IC responds, may delegate technical detail to analyst

---

## QUICK REFERENCE CARD

```
IC INITIAL ACTIONS (0-30 MINUTES)
───────────────────────────────────
1. VALIDATE — confirm true positive with analyst
2. CLASSIFY — CAT level based on scope/impact
3. NOTIFY — per CAT notification matrix
4. AUTHORIZE — analyst's requested containment actions
5. ESTABLISH BATTLE RHYTHM — reporting schedule, status updates
6. DOCUMENT — every decision, every action, with timestamp

IC STANDING RULES:
✓ Own the decisions — analysts recommend, IC decides
✓ Own the communication — all external traffic through IC
✓ Own the battle rhythm — don't let the ops rhythm drift
✓ Stay out of technical analysis — that's your analysts' job
✓ Track everything — time, decisions, actions, reports
✗ Never accept risk above your authority — escalate
✗ Never delay notification to "get more info first" — send what you have, update
✗ Never let the report slide — late reporting is a failure independent of the incident
```

---

**Classification:** UNCLASSIFIED // FOUO
**Playbook ID:** IR-PB-018 | Incident Commander Battle Rhythm
**Primary Lead:** Mission OIC / Incident Commander
**Prepared By:** CyberOpsPlanner System | **Date:** 2026-02-25
**This playbook governs:** All incidents (IR-PB-001 through IR-PB-017)
**Doctrine Reference:** FM 6-0 (Commander and Staff) | ADP 5-0 (Operations Process) | CJCSM 6510.01B
