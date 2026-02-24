# EXAMPLE: Plan of Action and Milestones (POAM)
**Detection Gap - EDR Rule Development**

---

**POAM ID:** OP-GUARDIAN-POAM-03
**Finding Title:** Detection gap for encoded PowerShell execution (Emotet installation vector)
**Priority:** 🟠 HIGH (14 days)
**Owner:** CPT Smith / S-2 SOC
**Status:** Open
**Target Completion:** 2026-03-09

---

## 1. EXECUTIVE SUMMARY

**Finding:** Malware (Emotet) was present on endpoint WIN-USR-0847 but EDR did not generate alert for suspicious PowerShell activity (persistence installation). Analysis reveals EDR detection rule for encoded PowerShell was not active. Detection gap allows similar attacks to proceed undetected.

**Remediation:** Develop EDR detection rule for encoded PowerShell execution. Test on past incidents. Deploy to production. Monitor effectiveness.

**Milestones:**
1. Design detection rule (Day 1-3)
2. Test on past incident data (Day 3-7)
3. Obtain SOC approval (Day 7-10)
4. Deploy to test environment (Day 10-12)
5. Deploy to production (Day 12-14)
6. Monitor and tune (Day 14+)

---

## 2. RISK ASSESSMENT

**Priority:** 🟠 HIGH

**Risk Scoring:**
- Likelihood: 4 (Encoded PowerShell commonly used, multiple variants)
- Impact: 4 (PowerShell with SYSTEM privileges can install persistent malware)
- Score: 16 (HIGH)

**Rationale:** Detection gap affects active threat (current incident proof). Recurring attack vector (phishing → PowerShell → malware). SOC must improve detection to catch future attempts.

---

## 3. KEY SECTIONS

| Section | Content |
|---------|---------|
| Remediation Owner | CPT Smith (SOC lead), SFC Lee (detection engineer) |
| Detection Technique | Behavioral: Process execution of PowerShell with encoded script parameter, parent process unusual (explorer.exe, outlook.exe, etc.) |
| Test Plan | Re-analyze past 6 months of Emotet incidents (3 cases), verify rule detects all |
| Deployment | Gradual rollout: test environment (3 days) → canary production (2 days) → full production (1 day) |
| Monitoring | Weekly tuning, track false positive rate, correlation with threat intel |
| Residual Risk | Sophisticated threat actors may use different installation vectors; monitoring ongoing |

---

## 4. MILESTONES

| Date | Milestone | Owner | Verification |
|------|-----------|-------|--------------|
| 2026-02-24 | Analyze Emotet PowerShell techniques from incident | CPT Smith | Technical analysis complete, 3 observable indicators identified |
| 2026-02-26 | Design EDR detection rule | SFC Lee | Rule pseudocode approved by SOC lead, YARA signature validated |
| 2026-03-01 | Test rule on past 6 months incident data | SFC Lee | Rule tested on 3 historical Emotet incidents, 100% detection rate, 0 false positives in test set |
| 2026-03-03 | Obtain S-2 approval for rule deployment | CPT Smith | SOC leadership approves, rule added to deployment queue |
| 2026-03-04 | Deploy to EDR test environment | SFC Lee | Rule deployed to 5-system test bed, events logged, no errors |
| 2026-03-06 | Deploy to canary production (10% of fleet) | SFC Lee | Rule active on canary systems, baseline monitoring for false positives |
| 2026-03-08 | Deploy to full production (100% of fleet) | SFC Lee | Rule active on all endpoints, SIEM correlation enabled |
| 2026-03-09 | Establish monitoring and tuning schedule | CPT Smith | Weekly tuning meetings scheduled, false positive threshold set at <1% |

---

## 5. TECHNICAL DETAILS

**Detection Rule (Pseudocode):**
```
Alert when:
  - Parent process: explorer.exe, outlook.exe, chrome.exe, firefox.exe
  - Child process: powershell.exe
  - Command line contains: -EncodedCommand, -enc, -e
  - Process owner: not SYSTEM (unless explorer.exe parent is SYSTEM)
  - File access: write to HKLM registry (Run keys)
  - Network: outbound HTTPS to unknown IP
Severity: HIGH
```

**Observable Indicators to Test Against:**
1. Command: `powershell.exe -enc JABjAD0AJ...` (base64 encoded)
2. Registry modification: HKLM\Software\Microsoft\Windows\CurrentVersion\Run
3. Network connection: 203.0.113.50:443 (C2 callback)

---

## 6. CLOSURE

**Completion Verification:** Rule deployed and active on all production endpoints. Tested against historical data with high detection rate. Monitoring baseline established. No false positives in first week.

**Lessons Learned:** EDR rule library needs quarterly review of threat intel for new techniques. Emotet variations may bypass this rule; ongoing monitoring required.

**Post-Implementation:**
- Intelligence brief on EDR detection capabilities for team
- Add to security training (PowerShell execution is high-risk)
- Update detection runbook for SOC

---

## 7. RESIDUAL RISK

**Risk After Closure:** Threat actor may use alternative installation vectors (VBScript, JavaScript, compiled executables) not covered by this rule. Additional detection rules needed for defense-in-depth.

**Monitoring Plan:**
- Daily check of rule alerts (any false positives?)
- Weekly analysis of PowerShell execution patterns
- Monthly threat intel review for new techniques
- Escalate any alerts to incident response immediately

---

**Classification:** UNCLASSIFIED // FOUO
**Reference:** docs/POAMs/GUIDANCE/POAM_Generation_Guide.md for process; docs/POAMs/TEMPLATES/Finding_to_POAM_Mapping.md for detection gap classification
