# CTI Integration Guide

## Cyber Threat Intelligence Integration (No "Reporting for Reporting's Sake")

Cyber threat intelligence (CTI) must answer planning questions that directly support operational decision-making. This guide defines how to integrate CTI into your planning cycle.

---

## The Planning Questions CTI Must Answer

### Question 1: What Can the Threat Do in YOUR Environment?

**Not:** "Here's what APT-XX can do in general"

**Instead:** "Here's what APT-XX can do against your specific environment"

**CTI analysis required:**
- Threat's known exploitation tactics against YOUR operating system versions
- Threat's known persistence methods against YOUR defender tools (EDR, AV)
- Threat's known lateral movement paths against YOUR network segmentation
- Threat's known exfiltration methods against YOUR egress filtering

**Example:**
```
THREAT: APT-XX
CAPABILITY (GENERAL): Windows privilege escalation via token abuse
CTI FOR YOUR OE: We patched CVE-2021-1234, but APT-XX has zero-day for Windows 10 21H2
YOUR IMPLICATION: APT-XX can escalate on unpatched workstations; our patch level doesn't completely mitigate
```

---

### Question 2: What Are Their Likely Access Paths and Objectives?

**Not:** "APT-XX targets government entities and steals data"

**Instead:** "APT-XX would likely target YOUR division via spearphishing, aiming to steal operational plans"

**CTI analysis required:**
- Threat's known targeting of YOUR sector/mission (does their TTPs match your profile?)
- Threat's known entry methods (are YOUR users likely to click phishing? Is YOUR perimeter vulnerable?)
- Threat's known persistence needs (do they stay for weeks? Would your detection catch them?)
- Threat's known objectives (are they after data? Disruption? Espionage?)

**Example:**
```
THREAT: APT-XX
SECTOR TARGETING: Primarily foreign militaries; some focus on U.S. DoD logistics
ENTRY METHOD: Spearphishing CFOs (APT-XX targets financial decisions)
YOUR IMPLICATION: Your G-4 (logistics) is a likely target; higher phishing success expected
```

---

### Question 3: What Indicators Support Threat COA Confirmation or Denial?

**Not:** "Here's a list of 500 IOCs (IP addresses, domains, file hashes)"

**Instead:** "Here are the indicators that would tell you APT-XX is executing their MLCOA against you"

**CTI analysis required:**
- What artifacts would you see if threat successfully exploited your environment? (malware hashes, registry keys, log patterns)
- What C2 indicators are specific to this threat? (domain registration patterns, IP geolocation, beacon timing)
- What lateral movement indicators are signature to this threat? (tool artifacts, command syntax, process creation patterns)

**Example (Threat COA: Spearphish G-4, steal operational plans, exfil via email):**
```
CONFIRMATION INDICATORS:
- Phishing email from external domain spoofing senior officer (would appear in email logs)
- File access to G-4 shared folder from unusual workstation (would log in file server audit)
- Unusual outbound email to external recipient with attachment (would trigger DLP)
- Process artifacts of APT-XX malware family (specific registry keys, injected DLLs)

DENIAL INDICATORS:
- No spoofed phishing emails detected (attack didn't occur as expected)
- No unusual logon to G-4 shared folder (lateral movement didn't succeed)
- No outbound email matches threat pattern (exfil blocked or not attempted)
```

---

### Question 4: What Actions Support Targeting, Defense Prioritization, and Risk Decisions?

**Not:** "Here's a threat overview briefing"

**Instead:** "Based on this threat, you should prioritize defending X, Y, Z; target threat at decision points A, B, C"

**CTI analysis required:**
- Threat's dependency on specific tools/techniques (what would disrupt them most?)
- Threat's known avoidance behaviors (what makes them stop and move to easier target?)
- Threat's detection weaknesses (what do they struggle with?)

**Example:**
```
THREAT: APT-XX
KNOWN AVOIDANCE: APT-XX avoids networks with EDR tools; they will pivot to undefended segment
ACTION FOR YOU: Prioritize EDR deployment to G-4 (high-value target that threat would seek)
ALTERNATIVE: If G-4 can't get EDR, prioritize network segmentation (force threat to spend more time/exposure)
```

---

## CTI Outputs You Can Generate

### 1. Threat Profile
- **Capability:** What TTPs do they use? What tools? What skill level?
- **Intent:** What are they after? Espionage? Disruption? Financial gain?
- **Opportunities in YOUR OE:** Where are the vulnerabilities they'd exploit?
- **Constraints on them:** What would make them fail?

### 2. Threat Course of Action Statements
**Most Likely COA (MLCOA):**
"APT-XX would likely spearphish G-4 personnel with attachment, establish persistence via scheduled task, escalate via shared admin password on backup system, exfiltrate operational plans via email."

**Most Dangerous COA (MDCOA):**
"APT-XX could use zero-day exploit on perimeter system, establish secure persistence via webshell in DMZ, lateral move to classified network via cross-domain solution, exfiltrate classified operational plans for 30 days undetected."

### 3. PIR/EEI Recommendations Tied to NAIs
**PIR 1:** Are we seeing phishing emails characteristic of APT-XX?
- **NAI 1:** Email logs for past 90 days
- **EEI:** Spearphishing volume from external domains spoofing DoD personnel
- **Owner:** S2/SOC

**PIR 2:** Do we have unpatched systems APT-XX can exploit?
- **NAI 2:** Vulnerability assessment results for known APT-XX CVEs
- **EEI:** Count of systems with unpatched CVE-2021-1234, CVE-2021-5678
- **Owner:** CIO/CND

### 4. Collection Plan Inputs
| Collection Focus | What to Look For | Why | Frequency |
|------------------|------------------|-----|-----------|
| **Phishing** | Emails matching APT-XX domain spoofing pattern | Early warning of attack attempt | Daily |
| **Lateral Movement** | Logons to shared folders from unusual workstations | Detect escalation attempt | Real-time (SIEM alert) |
| **Data Access** | File access to G-4 shared folders outside normal hours | Detect objective achievement | Real-time (DLP alert) |
| **Exfiltration** | Outbound emails to external recipients with attachments | Detect data theft | Real-time (email DLP) |
| **Persistence** | Registry keys/DLLs matching APT-XX malware signatures | Detect compromise | Daily (EDR scan) |

---

## How to Use CTI in Your Planning Cycle

### Step 1: Mission Analysis
1. **Identify threat** — Who is likely to target your operation?
2. **Request CTI** — What does this threat do? How would they target YOU?
3. **Update IPB** — Add threat to your cyber terrain assessment

### Step 2: COA Development
1. **Map threat COAs** against your terrain (where would they succeed? Where would they fail?)
2. **Design cyber defenses** against threat-specific TTPs (not generic "cyber defense")
3. **Plan for threat-specific detection** (not generic "detect malicious activity")

### Step 3: COA Analysis (Wargame)
1. **Use threat COAs** as Red Team input (how would real threat attack this COA?)
2. **Test detection logic** against threat signatures (would we actually see these indicators?)
3. **Assess friction points** (where would threat face our defenses? Where would they slip through?)

### Step 4: Reporting
1. **Tie indicators to decision points** — What threat indicators tell you to execute branch/sequel?
2. **Link defense priorities to threat** — Why are you defending X? Because threat targets X.
3. **Provide threat-scoped recommendations** — What specific actions against THIS threat should you take?

---

## Examples

### Example 1: Threat Profile Input to COA Development

**Threat:** APT-XX (advanced persistent threat, targets DoD logistics)

**CTI facts:**
- Uses spearphishing for entry (60% success rate reported)
- Relies on credential harvesting for lateral movement (no sophisticated exploitation after entry)
- Maintains persistence via scheduled tasks (Windows log event 4688)
- Exfiltrates via email or SMB to external server
- Avoids networks with EDR (they pivot away)

**Your COA IMPLICATION:**
- COA-A (invest in EDR) → Threat would avoid you, reducing risk
- COA-B (improve email filtering) → Reduces initial entry vector for threat's preferred method
- COA-C (force MFA on admin accounts) → Blocks their credential-based lateral movement
- COA-D (network segmentation) → Slows lateral movement, gives you time to detect

**Your evaluation:** EDR + Email filtering (COA-A+B) is best defense against this specific threat

---

### Example 2: Collection Plan Scoped to Threat

**Threat COA:** Spearphish G-4, escalate via shared admin password, exfil via email

**Your collection plan:**
```
COLLECTION TARGET 1: Phishing emails
- Look for: External emails spoofing senior officer names
- Tool: Email gateway logs, user reports
- Frequency: Daily summary, real-time flagging
- Decision trigger: >5 phishing emails detected → Increase alert level

COLLECTION TARGET 2: Credential compromise
- Look for: Failed logins from unusual locations, account lockouts
- Tool: Domain controller event logs, SIEM correlation
- Frequency: Real-time (SIEM alert)
- Decision trigger: >10 failed logins to shared admin account → Lockdown mode

COLLECTION TARGET 3: Data access anomalies
- Look for: Access to G-4 shared folder outside business hours from unusual workstations
- Tool: File server audit logs, UEBA
- Frequency: Real-time (alert) + daily summary
- Decision trigger: After-hours access to classified folder → Immediate incident response

COLLECTION TARGET 4: Exfiltration
- Look for: Outbound email with attachment from G-4 to external recipient
- Tool: Email DLP, email logs
- Frequency: Real-time
- Decision trigger: Blocked email with classified attachment → Incident response + forensics
```

---

## Reference

- **CTI analysis should always support the commander's decision** — not provide information for information's sake
- **Threat-scoped intelligence is more actionable** than generic threat intelligence
- **Connect indicators to decision points** — help the commander know when to execute a branch or sequel based on threat actions

**For more on intelligence preparation, see [docs/doctrine/INDEX.md](./doctrine/INDEX.md) or [docs/IPB_CYBER_TERRAIN.md](./IPB_CYBER_TERRAIN.md)**
