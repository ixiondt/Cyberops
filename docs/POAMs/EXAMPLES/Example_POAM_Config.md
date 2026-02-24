# EXAMPLE: Plan of Action and Milestones (POAM)
**Configuration Deficiency - Unpatched Server**

---

**POAM ID:** OP-GUARDIAN-POAM-02
**Finding Title:** Critical vulnerability CVE-2024-1234 unpatched on web server WEB-PROD-03
**Priority:** 🟠 HIGH (7 days)
**Owner:** SFC Martinez / System Admin Team
**Status:** Open
**Target Completion:** 2026-03-02

---

## 1. EXECUTIVE SUMMARY

**Finding:** CVE-2024-1234 (Apache vulnerability, CVSS 8.6) found unpatched on production web server. Known public exploit available. Not exploited in current incident but represents significant attack surface.

**Remediation:** Apply security patch during scheduled maintenance window. Verify patch applied. Monitor logs post-patch.

**Milestones:**
1. Obtain patch and test in lab (Day 1-2)
2. Plan maintenance window and notify stakeholders (Day 2-3)
3. Apply patch to production (Day 4-5)
4. Verify patch applied and system functional (Day 5)
5. Monitor for issues post-patch (Day 5-7)

---

## 2. RISK ASSESSMENT

**Priority:** 🟠 HIGH

**Risk Scoring:**
- Likelihood: 4 (Public exploit available, known targeting of Apache)
- Impact: 4 (RCE could compromise web server and access backend systems)
- Score: 16 (HIGH)

**Rationale:** CVE has public exploit, affecting critical web server, but currently mitigated by WAF. Patch available and tested by vendor.

---

## 3. KEY SECTIONS

| Section | Content |
|---------|---------|
| Remediation Owner | SFC Martinez (primary), LTC Williams (coordinator) |
| Completion Criteria | Patch version confirmed, system functional, logs clean |
| Dependencies | Change control approval, maintenance window coordination |
| Verification | Patch version query, functionality test, log review |
| Residual Risk | Server still vulnerable to unpatched 0-day; mitigated by WAF and monitoring |

---

## 4. MILESTONES

| Date | Milestone | Owner | Verification |
|------|-----------|-------|--------------|
| 2026-02-24 | Test patch in lab environment | SFC Martinez | Lab server patched and tested |
| 2026-02-25 | Schedule maintenance window with stakeholders | LTC Williams | Maintenance window confirmed, 2026-02-27 22:00-23:30 UTC |
| 2026-02-26 | Obtain approval via change control | SFC Martinez | Change-ID CHG-2026-0893 approved |
| 2026-02-27 22:00 | Apply patch to WEB-PROD-03 | SFC Martinez | Patch applied, system rebooted if needed |
| 2026-02-28 | Verify functionality and patch status | SFC Martinez | Web application functional, patch version confirmed |
| 2026-03-02 | Post-patch monitoring complete | SIEM/SOC | Seven days of logs reviewed, no issues detected |

---

## 5. CLOSURE

**Completion Verification:** All milestones achieved, patch applied and verified, system operational, 7-day monitoring confirms no issues.

**Lessons Learned:** Vulnerability scanning should catch unpatched systems in real-time. Consider automated patching for non-critical systems.

---

**Classification:** UNCLASSIFIED // FOUO
**Reference:** docs/POAMs/TEMPLATES/POAM_Template.md for full template
