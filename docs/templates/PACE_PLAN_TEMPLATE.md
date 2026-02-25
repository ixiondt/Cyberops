# PACE Plan Template

## Primary-Alternate-Contingency-Emergency Communications Plan

Use this template to document your communications plan for cyber operations. A good PACE plan ensures continuity if primary comms fail.

---

## PACE Plan for [Operation Name]

### PACE Overview

| Tier | Means | Backup System | Trigger | Escalation Time |
|------|-------|---------------|---------|-----------------|
| **P**rimary | [Primary comms] | [Who monitors?] | [When do we use it?] | [How long to fail over?] |
| **A**lternate | [Alternate comms] | [Who monitors?] | [What failure triggers it?] | [Failover time?] |
| **C**ontingency | [Contingency comms] | [Who monitors?] | [When is it activated?] | [Failover time?] |
| **E**mergency | [Emergency comms] | [Who monitors?] | [Last resort scenarios] | [Fastest possible?] |

---

## Example: Cyber Operations Element PACE Plan

### PACE for Cyber Element (Daily Coordination)

| Tier | Means | Backup System | Trigger | Escalation Time |
|------|-------|---------------|---------|-----------------|
| **P**rimary | Secure SIPRNET email (daily 0600/1800) | MOC monitors inbox; Element Lead checks status | Normal operations | 15 min to send message |
| **A**lternate | Secure phone (STU-III) Element Lead cell | Assistant monitors phone; operations shift takes call | Email system unavailable >30 min | 2 min phone connection |
| **C**ontingency | In-person brief at MOC (0900 daily) | S-3 air to track | Secure comms unavailable >4 hours | Same-shift brief |
| **E**mergency | Visual signal / runner message | CQ desk | All secure comms down, immediate issue | Within 10 min foot traffic |

---

## Key Rules for PACE Plans

1. **Every tier must have a monitor/owner** — Someone is responsible for checking each comms channel
2. **Triggers are explicit** — When do we switch tiers? (time threshold? System failure? Higher guidance?)
3. **Escalation times are realistic** — Can you actually failover in 2 minutes? Or does it take 30?
4. **Test regularly** — Exercise PACE plan at least quarterly; catch failures before they matter operationally
5. **Log all tier changes** — Document when/why you switched (time, reason, who authorized)

---

## PACE Plan Template (Blank)

```
OPERATION: [Name/Code]
ELEMENT: [Unit/Cell responsible for this comms]
TIME PERIOD: [Duration of operation OR normal/combat/contingency phase]

PRIMARY COMMUNICATIONS:
  Means: [How do you communicate? Phone? Email? Video? In-person? Encrypted?]
  Monitor: [Who checks this channel? How often?]
  Backup: [If primary owner is unavailable, who takes over?]

ALTERNATE COMMUNICATIONS:
  Means: [Second option (different medium if possible)]
  Monitor: [Who is responsible?]
  Backup: [If monitor is unavailable, who takes over?]
  Trigger: [What failure activates this tier? Time? System error? Loss of primary contact?]
  Failover Time: [How long to switch from Primary to Alternate?]

CONTINGENCY COMMUNICATIONS:
  Means: [Third option (degraded but operational)]
  Monitor: [Who is responsible?]
  Trigger: [What failure activates this tier?]
  Failover Time: [How long to switch from Alternate to Contingency?]

EMERGENCY COMMUNICATIONS:
  Means: [Last resort (may be slow, insecure, or very limited)]
  Trigger: [When is this activated? (All other comms down? Catastrophic failure?)]
  Failover Time: [Fastest possible failover?]

TESTING SCHEDULE:
  Primary Test: [How often? Quarterly? Monthly?]
  Alternate Test: [When was it last tested?]
  Full PACE Drill: [How often do you test entire plan?]

LESSONS LEARNED:
  [What failures have occurred? What changed?]
  [What tier is most reliable? Which is most fragile?]
```

---

## Common PACE Scenarios

### Small Unit (3-5 person element)

| Tier | Means | Trigger |
|------|-------|---------|
| **P** | Element Lead personal phone + WhatsApp group | Normal ops |
| **A** | Element Lead's office phone + email | Personal cell down >5 min |
| **C** | Runner to TOC with message | All comms down OR phone system down |
| **E** | Direct radio to TOC (if available) | All other comms inoperable |

### Staff Section (10+ personnel, shift operations)

| Tier | Means | Trigger |
|------|-------|---------|
| **P** | SIPRNET email + daily standup (0600/1400/2200 UTC) | Normal ops |
| **A** | STU-III phone between shift leads | Email delayed >2 hours OR >3 messages backed up |
| **C** | In-person/VTC brief to S-3 (scheduled 0900/1700) | SIPRNET unavailable >4 hours |
| **E** | Foot runner to S-3 or secure phone via higher HQ | All normal comms down |

### Distributed Element (multiple locations, internet-dependent)

| Tier | Means | Trigger |
|------|-------|---------|
| **P** | Secure VPN + email + Slack (enterprise approved) | Normal ops |
| **A** | Cellular backup (government cell phone) + SMS group | Internet unavailable >10 min OR VPN down |
| **C** | Conference call via SIPRNET STU-III bridge | Cellular down OR VPN >1 hour outage |
| **E** | Contact higher HQ for relay / radio if available | All comms down |

---

## PACE Plan Verification Checklist

Before approving your PACE plan:

- [ ] **Every tier has a dedicated monitor** (not just "whoever answers the phone")
- [ ] **Backup for the monitor is named** (what if monitor is unavailable?)
- [ ] **Triggers are explicit** (time threshold? System failure? Status change?)
- [ ] **Failover times are realistic** (tested? Or aspirational?)
- [ ] **Test schedule is documented** (when was each tier last tested?)
- [ ] **Escalation process is clear** (who authorizes tier change? How is it logged?)
- [ ] **Plan includes degraded scenarios** (what if tier one AND tier two fail?)
- [ ] **Emergency tier is actually usable** (not theoretical/impossible to execute)

---

## Reference

**PACE plans are required in:**
- MDMP Step 3 (COA Development) — Every COA needs a PACE plan
- OPORD Annex H (Command and Signal) — Standard Army format
- All tactical operations — Especially cyber (our comms are often targets)

**See [docs/MDMP_LENS.md](../MDMP_LENS.md) for MDMP integration guidance**
