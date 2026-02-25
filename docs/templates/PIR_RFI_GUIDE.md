# PIR / RFI Tracking Guide

## Priority Intelligence Requirements (PIRs) & Requests for Information (RFIs)

Use this guide to develop and track PIRs (what you need to know to support decision-making) and RFIs (specific information requests).

---

## What's the Difference?

### PIRs (Priority Intelligence Requirements)
**"What do I need to KNOW to make the commander's critical decisions?"**

PIRs are **decision-focused** questions. They answer "What intelligence must I have to support the commander's decision?" Not just "what would be nice to know," but "what decision hangs on this?"

**Example PIRs:**
- "Can the threat conduct zero-day exploitation against our specific systems?" (Affects defense prioritization)
- "How many of our users are vulnerable to phishing?" (Affects initial access likelihood assessment)
- "Are we currently under threat from actor X?" (Affects threat posture for commander's CCIR)

### RFIs (Requests for Information)
**"Who has this information? How do I get it?"**

RFIs are **collection-focused** questions. They specify where/how to get the information PIRs need.

**Example RFIs:**
- RFI-01: "Provide current vulnerabilities on [server list] matched against APT-XX known CVEs" (from: Vulnerability Management team)
- RFI-02: "Provide email phishing click rates for past 90 days" (from: Email Security team)
- RFI-03: "Provide latest threat activity on our network" (from: SOC/SIEM)

---

## PIR / RFI Workflow

```
1. DEVELOP PIRS (Mission Analysis phase)
   ↓
2. IDENTIFY GAPS (What do we not know?)
   ↓
3. CREATE RFIs (Who can fill the gap? How do we ask?)
   ↓
4. ASSIGN OWNERS (Who is responsible for each RFI?)
   ↓
5. SET TIMELINE (When do we need the answer?)
   ↓
6. CLOSE RFIs (Information received → update PIR assessment)
   ↓
7. REFINE PIRS (As operation progresses, new PIRs emerge)
```

---

## PIR Development Template

### Step 1: Identify Decision

**What is the commander deciding?**
- Approve COA A, B, or C?
- Go ahead with operation or delay?
- Invest in defense against threat X?
- Escalate incident to higher authority?

### Step 2: What Information Supports That Decision?

**What facts would affect the decision?**

| Decision | Key Facts | PIR |
|----------|-----------|-----|
| **Approve COA A (offensive cyber)** | Can we detect/attribute our actions? | PIR: "Can threat detect our cyber action within X hours?" |
| | Will threat retaliate? | PIR: "What is threat's retaliation capability against us?" |
| | Do we have required authorities? | PIR: "What approval level is required for [action]?" |
| **Go ahead with operation** | Is current threat posture acceptable? | PIR: "Are we currently under active threat?" |
| | Do we have required defenses in place? | PIR: "Are critical systems fully patched against known APT vulnerabilities?" |

### Step 3: Write the PIR

**Good PIR:**
- Decision-focused (answers "should we?" not just "what is?")
- Specific to your OE (not generic threat intelligence)
- Time-bound (needed by when?)
- Measurable (how will you know when it's answered?)

**Example PIR:**
```
PIR-01: What is the current compromise status of our network?
  Why it matters: Affects whether to execute operation as planned or delay for defensive actions
  Collection focus: Current detections, forensic indicators, threat activity on our infrastructure
  Owner: SOC/Cyber Element Lead
  Due: Daily update, or immediately if threat detected
  Success metric: List of confirmed compromised systems OR assessment "no current detections"
```

---

## RFI Development Template

### Good RFI Characteristics

1. **Specific** — Not "give us cyber intelligence" but "give us APT-XX's known CVE targets"
2. **Scoped** — Not "vulnerability report for entire network" but "vulnerability report for servers [list]"
3. **Formatted** — Specify expected format (spreadsheet? Briefing? Raw data?)
4. **Timed** — "We need this by [date/time]"
5. **Owned** — "Send to [person/email]"

### RFI Template

```
RFI-[Number]: [Title]

REQUEST:
  Provide: [What exactly do you want?]
  For: [Which systems/units/timeframe?]
  Format: [How should answer be provided? Excel? Briefing? Raw logs?]
  By: [Date/time when answer is due]

REFERENCE PIR:
  Related to PIR: [Which PIR does this support?]

OWNER:
  Request submitted by: [Name/position]
  Source (who answers): [Name/team/department]
  Response sent to: [Name/email]

STATUS:
  [ ] Open (awaiting response)
  [ ] In progress (source working on it)
  [ ] Closed (response received and processed)

RESPONSE:
  Response received: [Date]
  Summary: [What did source provide?]
  PIR impact: [Did this answer the PIR?]
```

---

## Example PIR/RFI Set

### Operation: EXAMPLE

**PIR-01: Current Threat Posture**
- Question: Are we currently under active threat from APT-XX?
- Why: Affects whether to proceed with operation as scheduled
- Collection focus: Detections, IOCs, threat activity on our network
- Owner: Cyber Element Lead / SOC

**RFI-01** (supports PIR-01):
```
Provide: Current EDR/SIEM detections matching APT-XX IOC list
For: All systems, past 7 days
Format: CSV with system name, detection type, time detected
By: 0800 tomorrow (2026-02-25)
Source: SOC/EDR team
```

**RFI-02** (supports PIR-01):
```
Provide: Network indicator assessment (DNS queries to known APT-XX C2 domains)
For: Past 30 days, DNS query log summary
Format: Table with: domain, count of queries, systems that queried
By: 0800 tomorrow
Source: Network Analyst / NIDS team
```

---

### PIR-02: Threat Capability Assessment
- Question: Can APT-XX exploit vulnerabilities in our current systems?
- Why: Affects defense prioritization and COA selection
- Collection focus: Threat's known CVEs vs. our patch level
- Owner: Cyber Element Lead / Vulnerability Management

**RFI-03** (supports PIR-02):
```
Provide: Vulnerability assessment for servers [list of 15 critical servers]
For: Known APT-XX exploitation targets (CVE-2021-1234, CVE-2021-5678, CVE-2022-9999)
Format: Spreadsheet: [System] | [CVE] | [Status: Patched/Vulnerable] | [Date patched]
By: 0800 tomorrow
Source: Vulnerability Management team
```

**RFI-04** (supports PIR-02):
```
Provide: APT-XX technical profile update (latest known CVEs, TTPs, tools)
For: Internal threat briefing
Format: 1-page technical summary
By: 0800 tomorrow
Source: Threat Intelligence team or higher HQ
```

---

### PIR-03: Initial Access Probability
- Question: What is the likelihood APT-XX can gain initial access via phishing?
- Why: Affects whether to increase user security training
- Collection focus: Phishing click rates, user vulnerability to social engineering
- Owner: Cyber Element Lead / S-3

**RFI-05** (supports PIR-03):
```
Provide: Email security metrics - phishing click rate
For: Past 90 days, broken down by division/battalion
Format: Table: [Unit] | [Phishing tests sent] | [Click rate %] | [Reported rate %]
By: 1000 today
Source: Email Security / Training team
```

---

## PIR/RFI Tracking Table

**Use this format to track status across your operation:**

| PIR | RFI | Title | Owner | Source | Due | Status | Response | Impact |
|-----|-----|-------|-------|--------|-----|--------|----------|--------|
| **PIR-01** | RFI-01 | Current detections | Cyber Lead | SOC | 0800 2/25 | ☐ Open | | |
| | RFI-02 | DNS indicators | Cyber Lead | NetAnal | 0800 2/25 | ☐ Open | | |
| **PIR-02** | RFI-03 | Vulnerability status | Cyber Lead | VulnMgmt | 0800 2/25 | ☐ Open | | |
| | RFI-04 | Threat update | Cyber Lead | ThreatInt | 0800 2/25 | ☐ Open | | |
| **PIR-03** | RFI-05 | Phishing metrics | Cyber Lead | Email Sec | 1000 2/25 | ☐ Open | | |

---

## Key Rules

1. **Every PIR must have a decision** (not just "what would be nice to know")
2. **Every RFI must support a PIR** (not random information requests)
3. **RFIs must have owners** (who is responsible? Who do we contact?)
4. **Timelines must be realistic** (can source provide answer by deadline?)
5. **Track and close RFIs** (don't let them linger; close or re-baseline if outdated)
6. **Update PIRs as situation evolves** (new information → refine PIRs)

---

## PIR Verification Checklist

Before finalizing your PIR/RFI list:

- [ ] **Each PIR ties to a commander decision** (what decision does this PIR support?)
- [ ] **Each RFI supports a PIR** (what PIR does this RFI help answer?)
- [ ] **RFI owners are identified and aware** (do sources know they're supporting this operation?)
- [ ] **Timelines are achievable** (can sources really provide info by deadline?)
- [ ] **Tracking mechanism is in place** (how will you monitor PIR/RFI status?)
- [ ] **PIRs are specific to YOUR OE** (not generic threat intelligence)
- [ ] **Closure criteria are clear** (how do you know when a PIR/RFI is "closed"?)

---

## Reference Doctrine

- **ADP 5-0** (Operations Process) — PIR section
- **FM 5-0** (Planning and Orders Production) — PIR/RFI development guidance
- **ATP 2-01** (Intelligence Support to Operations) — Intelligence requirements development

**For MDMP integration, see [docs/MDMP_LENS.md](../MDMP_LENS.md) (especially Step 2: Mission Analysis)**
