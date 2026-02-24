# Risk Prioritization Guide
**POAM Risk Assessment, Scoring, and Priority Assignment**

---

## Overview

This guide provides the **methodology for assessing risk** and **assigning priority** to POAMs. Risk prioritization determines:
- **Timeline** for remediation (immediate vs. standard maintenance cycle)
- **Resource allocation** (CRITICAL POAMs get priority resources)
- **Escalation triggers** (CRITICAL POAMs escalated to commander)
- **Commander attention** (CRITICAL/HIGH items require review)

---

## Quick Priority Matrix

| Priority | Timeline | Risk Level | Examples | Action |
|----------|----------|-----------|----------|--------|
| 🔴 **CRITICAL** | Immediate - 7 days | Active threat, ongoing compromise | Malware with active C2, privileged credential reuse, active exfiltration | Escalate immediately, daily tracking, commander approval if resource conflict |
| 🟠 **HIGH** | 24-72 hours | Known compromise, contained threat | Malware isolated but not removed, credential known compromised, detection gap affecting recurring threat | Assign owner, daily tracking, daily SITREP update |
| 🟡 **MEDIUM** | 7-14 days | Configuration gap, incomplete analysis | Missing patch (non-exploited), detection gap for emerging threat, investigation continuation | Coordinate with owner, weekly tracking, weekly SITREP update |
| 🟢 **LOW** | 30+ days | Hardening, optimization | Hardening improvement, security audit finding, lessons learned | Include in next maintenance cycle, monthly tracking |

---

## Risk Assessment Methodology

### Option 1: Simplified Assessment (Quick)
**Use for:** Most findings, standard response scenarios

**Steps:**
1. **Is threat ongoing or contained?**
   - Ongoing → CRITICAL
   - Contained → Assess next criterion

2. **Can threat recur/reuse without remediation?**
   - Yes → HIGH
   - No → Assess next criterion

3. **Does finding affect critical asset or compliance requirement?**
   - Yes → HIGH
   - No → MEDIUM/LOW based on timing

**Timeline:** 2-3 minutes per finding

---

### Option 2: Structured Scoring (Detailed)
**Use for:** High-priority findings, commander-level decisions

**Step 1: Score Likelihood (1-5)**
```
5 = Highly likely to occur or recur
    Example: Known threat reusing stolen credentials

4 = Likely
    Example: Malware from targeted campaign, high skill required from threat

3 = Moderate likelihood
    Example: Vulnerability with limited exploitability

2 = Unlikely
    Example: One-time attack, low skill required threat actor

1 = Highly unlikely
    Example: Theoretical vulnerability, no known exploitation
```

**Step 2: Score Impact (1-5)**
```
5 = Catastrophic
    - Mission failure or significant degradation
    - Compromise of critical or sensitive system
    - Major data loss or exfiltration
    - Example: Malware on domain controller with admin capabilities

4 = Major
    - Significant operational impact
    - System compromise with limited scope
    - Moderate data loss or unauthorized access
    - Example: Malware on user workstations with user-level access

3 = Moderate
    - Operational disruption or service degradation
    - Limited system compromise or data access
    - Example: Configuration deficiency affecting security posture

2 = Minor
    - Small operational impact
    - Limited functionality loss
    - Example: Low-risk vulnerability on non-critical system

1 = Insignificant
    - Negligible operational impact
    - Example: Hardening improvement with no current exploit
```

**Step 3: Calculate Risk Score**
```
Risk Score = Likelihood × Impact

CRITICAL:  16-25 (Likelihood 4-5 × Impact 4-5)
HIGH:      9-15  (Mixed 3-5 scoring with high likelihood or impact)
MEDIUM:    4-8   (Likelihood/Impact 2-3)
LOW:       1-3   (Low likelihood AND low impact)
```

**Step 4: Apply Context Modifiers**
- **Is this a known attack vector for your threat?** → Increase priority by 1 level
- **Are related assets already compromised?** → Increase priority by 1 level
- **Is this a compliance requirement?** → Minimum HIGH priority
- **Is exploit/tool publicly available?** → Increase likelihood by 1 point
- **Do you have detection capability?** → May decrease priority slightly

**Example Calculation:**
```
Finding: Unpatched CVE-2024-1234 on user workstation

Likelihood: 3 (Known exploit, but requires user interaction)
Impact: 4 (Could lead to malware installation and lateral movement)
Base Score: 3 × 4 = 12 (HIGH)

Modifier: Public exploit available (+1 likelihood)
Adjusted: 4 × 4 = 16 (Still HIGH, but at higher end)

Final Priority: HIGH (24-72 hours)
```

**Timeline:** 5-10 minutes per finding

---

## Priority Decision Trees

### Malware Finding Priority

```
Malware detected?
├─ Is C2 callback ongoing/recent?
│  ├─ YES → CRITICAL
│  └─ NO → Continue
├─ Is malware still present on system?
│  ├─ YES (uncontained) → CRITICAL
│  ├─ YES (contained) → HIGH
│  └─ NO (removed) → Continue
├─ Was exfiltration detected?
│  ├─ YES (ongoing/recent) → CRITICAL
│  ├─ YES (past, scope unknown) → HIGH
│  └─ NO/UNKNOWN → Continue
├─ Are multiple systems infected?
│  ├─ YES → HIGH
│  └─ NO → Continue
├─ Is system critical to operations?
│  ├─ YES → HIGH
│  └─ NO → MEDIUM
```

---

### Credential Compromise Priority

```
Credential compromised?
├─ Is account privileged (admin, domain admin, etc.)?
│  ├─ YES → CRITICAL (unless remediated in < 1 hour)
│  └─ NO → Continue
├─ Has account been used for suspicious activity?
│  ├─ YES (lateral movement) → CRITICAL
│  ├─ YES (data access) → HIGH
│  ├─ YES (unknown use) → HIGH
│  └─ NO/UNKNOWN → Continue
├─ Is this from active breach or external disclosure?
│  ├─ Active breach → HIGH
│  ├─ External disclosure (mass) → MEDIUM
│  └─ No evidence of use → MEDIUM
├─ Monitoring capability for reuse?
│  ├─ Strong monitoring in place → Can reduce to MEDIUM
│  └─ Limited monitoring → Keep at HIGH
```

---

### Detection Gap Priority

```
Detection gap identified?
├─ Does gap affect active/ongoing attack?
│  ├─ YES → HIGH
│  └─ NO → Continue
├─ Is this a recurring threat (multiple incidents)?
│  ├─ YES → HIGH
│  └─ NO → Continue
├─ Can detection rule be developed quickly (< 1 day)?
│  ├─ YES → MEDIUM (fast remediation possible)
│  └─ NO (complex rule needed) → MEDIUM-HIGH
├─ Does gap affect critical assets?
│  ├─ YES → HIGH
│  └─ NO → MEDIUM
```

---

### Configuration Deficiency Priority

```
Configuration deficiency identified?
├─ Is it compliance-required fix?
│  ├─ YES → HIGH (at minimum)
│  └─ NO → Continue
├─ Was it exploited in current incident?
│  ├─ YES → HIGH/CRITICAL (depends on impact)
│  └─ NO → Continue
├─ Is there a known public exploit?
│  ├─ YES → HIGH
│  └─ NO → Continue
├─ Is system critical to operations?
│  ├─ YES → HIGH
│  └─ NO → MEDIUM/LOW
```

---

## Priority Assignment by Finding Type

### MALWARE Findings

**CRITICAL (Immediate - 7 days):**
- Active C2 callback detected
- Exfiltration confirmed or suspected
- Malware on domain controller or critical system
- Multiple systems infected
- Malware prevents containment (e.g., firewall compromise)

**HIGH (24-72 hours):**
- Malware removed, awaiting verification
- Malware contained but not removed
- Single workstation with user-level malware
- Malware family known to have persistence

**MEDIUM (7-14 days):**
- Malware from untargeted/mass campaign
- Malware removed and verified clean, post-incident monitoring
- Investigation pending on malware family/origin

**LOW (30+ days):**
- Historical finding (old infection timeline)
- Low-risk payload (no lateral movement, no persistence)

---

### CREDENTIAL COMPROMISE Findings

**CRITICAL (Immediate-24 hours):**
- Privileged account (admin, DA, service account)
- Active reuse detected (login from unusual location)
- Used for lateral movement or data access

**HIGH (24-72 hours):**
- Standard user account, confirmed compromise
- Used for suspicious activity (log access, file read)
- Credential from active breach

**MEDIUM (7-14 days):**
- Credential from mass breach, no evidence of use
- Monitoring enabled, low risk of reuse
- Compliance training required in addition to reset

**LOW (30+ days):**
- Historical credential exposure (> 30 days old, no use)
- Credential from inactive/deprovisioned account

---

### LATERAL MOVEMENT Findings

**CRITICAL (Immediate):**
- Ongoing lateral movement detected
- Movement to critical systems confirmed
- Privilege escalation involved

**HIGH (24-72 hours):**
- Confirmed lateral movement but contained
- Movement path partially mapped
- Temporary detection/monitoring rules deployed

**MEDIUM (7-14 days):**
- Suspected lateral movement, unconfirmed
- Movement path needs investigation
- Network segmentation improvements needed

**LOW (30+ days):**
- Historical lateral movement (> 7 days old)
- Low-risk target systems affected

---

### CONFIGURATION DEFICIENCY Findings

**CRITICAL/HIGH (1-7 days):**
- Compliance-required fix (AR 25-2, policy mandate)
- Exploited in current incident
- Known public exploit, affects critical system
- Security baseline baseline deviation on critical system

**MEDIUM (7-30 days):**
- Security baseline deviation, non-critical system
- Hardening requirement not yet exploited
- Fix requires change control and testing

**LOW (30+ days):**
- Performance optimization with security benefit
- Hardening improvement (defense-in-depth)
- Non-urgent compliance follow-up

---

### DETECTION GAP Findings

**HIGH (7-14 days):**
- Gap affects active/ongoing attack
- Recurring threat not detected
- Critical attack technique/tool not detected
- Gap enables major mission impact

**MEDIUM (14-30 days):**
- Gap affects emerging threat
- One-time incident, low recurrence risk
- Complex rule development required

**LOW (30+ days):**
- Opportunistic detection improvement
- Defense-in-depth enhancement
- Low-priority threat technique

---

### VULNERABILITY Findings

**CRITICAL (Immediate-7 days):**
- Remote code execution, no authentication required
- Actively exploited in wild
- Affects critical asset, no workaround
- Public exploit available

**HIGH (7-30 days):**
- Remotely exploitable, requires some action (auth, user click)
- Affects critical asset, workaround available
- Compliance-required patch

**MEDIUM (30-60 days):**
- Limited exploitability (local access required, high complexity)
- Affects non-critical system
- Workaround available

**LOW (60+ days):**
- Theoretical vulnerability, no known exploit
- Affects decommissioned system
- Performance impact from patch worries operations

---

## Adjusting Priority

### Factors That Increase Priority

**By one level:**
- Threat actor targeting your organization (vs. mass campaign)
- Related assets already compromised (escalates investigation needs)
- Recurring threat (pattern shows attacker returning)
- Legal/compliance deadline approaching

**To CRITICAL:**
- Active threat still present
- Privilege escalation involved
- Critical infrastructure affected
- Compliance violation with enforcement deadline

---

### Factors That Decrease Priority

**By one level:**
- Strong compensating controls in place (detection rules, segmentation)
- Limited scope (single system, single user)
- External vendor managing remediation (delays timeline)
- Scheduled maintenance window available (can batch with other fixes)

**Not below MEDIUM (unless commander accepts residual risk):**
- Compliance-required findings
- Known threat affecting your environment
- Exploitation confirmed

---

## Timeline Mapping

| Priority | Timeline | Example Milestones |
|----------|----------|-------------------|
| 🔴 **CRITICAL** | Days 0-7 | Day 0: Isolate. Day 1: Collect evidence. Day 3: Remove. Day 5: Verify. Day 7: Monitor starts. |
| 🟠 **HIGH** | Days 1-72 | Day 1: Plan. Day 3: Execute. Day 5: Verify. Day 30: Monitor. Day 60: Close. |
| 🟡 **MEDIUM** | Days 7-14 | Week 1: Plan & test. Week 2: Deploy & verify. Weeks 3-4: Monitor. |
| 🟢 **LOW** | Days 30+ | Month 1: Plan. Month 2: Test & deploy. Month 3+: Monitor & close. |

---

## Commander Attention Requirements

### Commander Must Review:
- **All CRITICAL POAMs** (daily review)
- **Overdue HIGH POAMs** (immediate review)
- **POAMs with resource conflicts** (decision required)
- **Residual risk acceptances** (signature required if accepting risk)

### Commander Decision Points:
1. **Resource Reallocation:** If resource bottleneck blocks CRITICAL POAM
2. **Timeline Extension:** If remediation timeline impacts other operations
3. **Residual Risk Acceptance:** If POAM cannot close within acceptable risk threshold
4. **Escalation:** If POAM requires higher authority approval

---

## Risk Tolerance & Policy

### Organizational Risk Tolerance
**CRITICAL findings:**
- Must remediate or escalate to higher authority
- No permanent acceptance without commander/flag officer approval
- Cannot be deferred more than 7 days without escalation

**HIGH findings:**
- Must remediate or document residual risk
- Can be deferred 72 hours for operational necessity
- Residual risk monitored closely

**MEDIUM findings:**
- Remediate per normal ops cycle
- Can be deferred 30 days if other priorities higher
- Standard monitoring applies

**LOW findings:**
- Remediate per standard maintenance cycle
- Can be deferred indefinitely if no impact
- Include in standard security reviews

---

## Compliance References

**From Army Doctrine:**
- **AR 25-2** — Cybersecurity policy, patch management timelines
- **ADP 5-0** — Running estimates track risk and constraints

**From External Standards:**
- **NIST SP 800-30** — Risk assessment methodology (this guide adapts NIST)
- **CJCSM 6510.01** — Cyber incident handling policy timelines

---

## Examples

### Example 1: Malware Priority Assessment

**Finding:** Malware detected on user workstation WIN-USER-0123

**Quick Assessment:**
- Is C2 active? Not detected
- Is malware contained? Yes (endpoint isolated)
- Multiple systems? No
- Critical asset? No

**Decision:** HIGH priority (24-72 hours)

**Reasoning:** Malware is contained but still present. Removal and verification needed within 72 hours. Not CRITICAL because contained; not MEDIUM because active malware requires near-term action.

---

### Example 2: Configuration Priority Assessment

**Finding:** Apache Tomcat runs as root on non-critical web server

**Quick Assessment:**
- Compliance requirement? No (not AR 25-2 mandate)
- Exploited in incident? No
- Public exploit? Yes, but not critical
- Critical system? No

**Scoring:**
- Likelihood: 2 (Public exploit but requires other factors)
- Impact: 2 (Non-critical system, local threat)
- Score: 2 × 2 = 4 (LOW)

**Decision:** LOW/MEDIUM priority (30+ days)

**Reasoning:** Non-critical system, no exploitation, public exploit available but requires conditions. Can be batched with next maintenance cycle.

---

### Example 3: Detection Gap Priority Assessment

**Finding:** Malware from incident not detected by EDR

**Quick Assessment:**
- Does gap affect active attack? Yes (malware just found)
- Is this recurring? Unknown (new malware family)
- Critical assets affected? No (but critical EDR gap)
- Rule complexity? Medium

**Decision:** HIGH priority (7-14 days)

**Reasoning:** Detection gap affected current incident (confirmed threat). SOC needs rule deployed quickly. HIGH because immediate threat, but can wait 14 days for proper rule development and validation.

---

## Priority Review Schedule

**Daily During CRITICAL Events:**
- Review all POAMs
- Flag any "At Risk" items
- Brief commander on CRITICAL items

**Daily During Active Incident Response:**
- Review CRITICAL and HIGH POAMs
- Update timeline if changes occur
- Escalate blockers

**Weekly During Standard Operations:**
- Full POAM review meeting (S-3 leads)
- Risk re-assessment (any priority changes?)
- Escalate any overdue POAMs

**Monthly During Routine Operations:**
- Archive completed POAMs
- Review residual risk monitoring
- Plan resource allocation for new POAMs

---

**Last Updated:** 2026-02-24
**Classification:** UNCLASSIFIED // FOUO
