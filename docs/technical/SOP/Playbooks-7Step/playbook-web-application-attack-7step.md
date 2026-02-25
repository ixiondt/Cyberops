# WEB APPLICATION ATTACK RESPONSE — INCIDENT RESPONSE PLAYBOOK
## 7-Step Framework | UNCLASSIFIED // FOUO

**Playbook ID:** IR-PB-013
**Version:** 1.0
**Classification:** UNCLASSIFIED // FOUO
**Threat Type:** Web Application Attack — SQL Injection / Web Shell / Authentication Bypass / API Abuse / XSS
**Primary Lead:** 17C Network Analyst
**Supporting Entities:** 17C Host Analyst (web server forensics), IT Ops (patching), S-2 (attribution)
**Notification:** Mission OIC (if web shell or authentication bypass confirmed)
**Authority:** CJCSM 6510.01B | AR 25-2 | OWASP Application Security Standards | NIST SP 800-53
**Created:** 2026-02-25

**MITRE ATT&CK Primary Tactics:**
- T1190 — Exploit Public-Facing Application (web app vulnerability exploitation)
- T1505.003 — Web Shell (persistence via server-side script)
- T1059 — Command and Scripting Interpreter (via web shell execution)
- T1110 — Brute Force (credential stuffing, password spray against login forms)
- T1212 — Exploitation for Credential Access (auth bypass)
- T1552 — Unsecured Credentials (credentials exposed via web app vulnerability)
- T1046 — Network Service Scanning (reconnaissance of web application)

**Web Attack Types Covered:**
- SQL Injection (SQLi)
- Web Shell Upload / Execution
- Authentication Bypass / Broken Authentication
- Cross-Site Scripting (XSS) — stored/reflected
- Server-Side Request Forgery (SSRF)
- API Abuse / Unauthorized API Access
- Directory Traversal / Local File Inclusion (LFI)
- Remote File Inclusion (RFI)
- Credential Stuffing / Brute Force against web login

---

## BLUF

Web application attacks target the internet-facing attack surface. The severity ranges widely — from low-risk reflected XSS to catastrophic database compromise via SQL injection or full server takeover via web shell. The response is primarily a network analyst function (traffic analysis, WAF review, access log analysis) with host analyst support (web server forensics, web shell identification). A confirmed web shell is a CAT I incident — treat it as full system compromise.

**The decisive classification question:** Is this active exploitation with data access, or is this scanning/probing that hasn't yet succeeded?

---

## STEP 1: PREPARATION

### 1.1 Required Capabilities
| Capability | Entity | Purpose |
|-----------|--------|---------|
| Web Application Firewall (WAF) | IT Ops / Network Analyst | Block/detect attack patterns |
| Web server access logs | Network Analyst + Host Analyst | Reconstruct attack timeline |
| Application logs | IT Ops | Identify affected functions, DB queries |
| Database audit logging | IT Ops | SQL injection impact assessment |
| API gateway logging | Network Analyst | API abuse detection |
| EDR on web server | Host Analyst | Web shell detection, child process monitoring |
| Vulnerability scanner | IT Ops | Identify unpatched web application CVEs |

### 1.2 Pre-Incident Web Security Controls
- [ ] WAF deployed and in blocking mode (not detection-only)
- [ ] OWASP Top 10 addressed in application security review
- [ ] Web server access logging enabled (all requests, full URI, response codes)
- [ ] Database query logging enabled for production databases
- [ ] File integrity monitoring (FIM) on web root directory
- [ ] EDR on web server with FIM and process monitoring
- [ ] Application authentication: MFA, account lockout, rate limiting on login
- [ ] Patch management current for web server, CMS, frameworks, dependencies

### 1.3 Web Application Inventory
- [ ] All internet-facing web applications documented (URL, technology stack, data classification)
- [ ] Authentication mechanisms documented per application
- [ ] Known vulnerabilities (CVEs) tracked against installed versions
- [ ] Backend database systems mapped per web application

---

## STEP 2: DETECTION & IDENTIFICATION

### 2.1 Detection Sources
| Source | What It Detects |
|--------|----------------|
| WAF alerts | Attack pattern matches (SQLi, XSS, LFI, RCE signatures) |
| Web server error logs | Unusual 500 errors (possible successful injection), 403 patterns |
| IDS/NIDS | Injection payload signatures in HTTP traffic |
| EDR (web server) | Suspicious child processes spawned by web server process (web shell) |
| FIM alert | New file created in web root (web shell upload) |
| Database audit logs | Unusual queries, schema modification, bulk data reads |
| SIEM correlation | High request volume from single IP to same endpoint (brute force) |

### 2.2 Attack Type Identification

**SQL Injection:**
- Web server logs: URLs containing SQL metacharacters (`' -- ; UNION SELECT`)
- Application logs: Database error messages returned to client
- Database logs: Unusual query patterns (UNION SELECT, information_schema queries, stacked queries)
- Impact: Read/modify/delete database contents, sometimes OS command execution

**Web Shell:**
- FIM alert: New file in web root (especially .php, .aspx, .jsp, .cgi, .py files unexpectedly created)
- EDR: Web server process (httpd, w3wp.exe, nginx) spawning cmd.exe, /bin/sh, PowerShell
- Access logs: Requests to unusual filenames with POST parameters
- Impact: Full server command execution — treat as complete host compromise

**Authentication Bypass:**
- Access logs: Successful logins with no prior authentication attempts (token forgery, session fixation)
- Application logs: Admin function access without logged authentication event
- SIEM: Access to protected resources without corresponding authentication event
- Impact: Unauthorized access to application functionality and data

**Credential Stuffing / Brute Force:**
- Access logs: High volume of POST requests to login endpoint from same/rotating IPs
- Application logs: High volume of authentication failures
- SIEM: 401/403 response code pattern against login URL
- Impact: Account compromise if any valid credential pairs exist

### 2.3 17C Network Analyst — Attack Reconstruction
Using WAF and access logs, reconstruct:
1. **First malicious request:** When did attack begin?
2. **Attack progression:** Reconnaissance → exploitation → post-exploitation
3. **Success indicators:** HTTP 200 responses to attack payloads = possible successful exploitation
4. **Affected endpoints:** Which specific URLs/endpoints were targeted?
5. **Data returned:** For SQL injection — what data may have been returned in responses?
6. **Attacker IP(s):** Single IP, rotating IPs, Tor exit nodes?

### 2.4 17C Host Analyst — Web Server Forensics
On the web server itself:
1. **New files in web root** (web shell check)
2. **Web server process tree** — any unusual child processes?
3. **Outbound connections from web server** — C2 beacon or data exfiltration?
4. **File access outside web root** — directory traversal success?
5. **Database credential access** — did the attacker obtain DB credentials?

### 2.5 Severity Classification
| Situation | Category |
|-----------|----------|
| Web shell confirmed — server command execution | CAT I |
| SQL injection with data exfiltration | CAT I |
| Authentication bypass to admin/privileged function | CAT I |
| SQL injection — database read (no exfil confirmed) | CAT II |
| Credential stuffing with confirmed account compromise | CAT II |
| Attack attempt — WAF blocked, no successful exploitation | CAT IV |
| Scanning / reconnaissance only | CAT IV |

---

## STEP 3: CONTAINMENT

### 3.1 Web Shell Containment (If Confirmed)
**A web shell = full system compromise. Treat as host compromise.**
- [ ] Take web server offline immediately (coordinate with System Owner)
- [ ] EDR isolate the web server
- [ ] → Activate IR-PB-001 (Malware Triage) for the web server host
- [ ] Block all external access to the web application
- [ ] Notify Mission OIC — CAT I

### 3.2 SQL Injection Containment
- [ ] Block attacker IP(s) at WAF and firewall
- [ ] Take vulnerable endpoint offline or apply emergency WAF rule to block the attack pattern
- [ ] Assess data exposure — what data could have been accessed?
- [ ] If credentials exposed → IR-PB-006 (Credential Theft)
- [ ] If data exfiltration confirmed → IR-PB-007 (Data Exfiltration)
- [ ] Notify Mission OIC if sensitive data accessed

### 3.3 Authentication Bypass Containment
- [ ] Invalidate all active sessions for the affected application
- [ ] Take the vulnerable authentication endpoint offline or block externally
- [ ] Force re-authentication for all users
- [ ] Assess what was accessed while bypass was active

### 3.4 Credential Stuffing Containment
- [ ] Block attacking IP range(s) at WAF
- [ ] Enable CAPTCHA/rate limiting on login endpoint
- [ ] Force password reset for all accounts that received successful authentication during attack window
- [ ] Enable MFA if not already deployed

---

## STEP 4: ERADICATION

### 4.1 Vulnerability Remediation (Primary Eradication)
The web application vulnerability must be closed:
- **SQL Injection:** Apply parameterized queries / prepared statements fix (code change) + WAF virtual patch interim
- **Web Shell:** Remove uploaded shell; identify and patch upload vulnerability or execution path
- **Auth Bypass:** Apply authentication fix; review all auth logic
- **Credential Stuffing:** Enforce MFA; rate limit; account lockout

### 4.2 Web Shell Eradication
If web shell found:
1. Identify the web shell file and all related files the attacker uploaded or created
2. Check entire web root for any additional shells (attackers commonly plant multiple)
3. Identify how the shell was uploaded (file upload vulnerability, RFI, credential access to server)
4. Remove all malicious files
5. Patch the upload/execution vulnerability
6. → Full eradication per IR-PB-001 if OS-level commands were executed via shell

### 4.3 Post-Exploitation Eradication
If the attacker executed commands via web shell or SQLi OS execution:
- Treat as full host compromise (IR-PB-001)
- Hunt for persistence (IR-PB-010)
- Check for lateral movement (IR-PB-005)
- Check for credential theft (IR-PB-006)

### 4.4 WAF Rule Deployment
After eradication, deploy WAF rules to:
- Block the specific attack patterns used
- Alert on variants of the attack pattern
- Rate limit the endpoints that were targeted

---

## STEP 5: RECOVERY

### 5.1 Application Restoration
Before returning web application to service:
- [ ] Vulnerability that was exploited is fully patched (code fix, not just WAF rule)
- [ ] Full security review of application code for similar vulnerabilities
- [ ] WAF in blocking mode with updated rules
- [ ] Web server rebuilt from clean baseline (if web shell or OS access confirmed)
- [ ] All credentials that were potentially exposed rotated
- [ ] System Owner sign-off on restoration

### 5.2 Database Recovery
If SQL injection accessed the database:
- [ ] Audit database users — remove any unauthorized accounts
- [ ] Rotate all database credentials
- [ ] Review database contents for unauthorized modifications
- [ ] Restore from backup if data was modified or deleted

### 5.3 Enhanced Monitoring (30 Days)
- WAF at elevated alerting threshold
- FIM on web root — alert on any new file
- EDR child process monitoring on web server
- Database query anomaly monitoring
- Daily review of web server access logs

---

## STEP 6: POST-INCIDENT ANALYSIS

### 6.1 Attack Timeline
```
[DATE/TIME] First attacker scan/probe observed
[DATE/TIME] First successful attack request
[DATE/TIME] Exploitation confirmed (web shell, data access, auth bypass)
[DATE/TIME] Post-exploitation activity (commands via shell, data staging)
[DATE/TIME] Detection
[DATE/TIME] Containment
[DATE/TIME] Application taken offline
[DATE/TIME] Eradication complete
[DATE/TIME] Application restored to service
Data potentially exposed: [description]
Attacker dwell time with web shell: [hours/days]
```

### 6.2 OWASP Top 10 Correlation
Map the vulnerability to OWASP Top 10 for reporting and remediation planning:
- A01: Broken Access Control
- A02: Cryptographic Failures
- A03: Injection (SQL, OS, LDAP)
- A04: Insecure Design
- A05: Security Misconfiguration
- A07: Identification and Authentication Failures
- A08: Software and Data Integrity Failures

### 6.3 Application Security Recommendations
- Full DAST (dynamic application security testing) scan
- Code review for similar vulnerabilities across application
- Penetration test of all internet-facing applications
- SDLC integration — security testing before deployment

---

## STEP 7: COORDINATION & REPORTING

### 7.1 Reporting Timeline
| Event | Recipient | Deadline |
|-------|-----------|----------|
| Web shell confirmed (CAT I) | Mission OIC | Immediately |
| SQLi with data access (CAT I/II) | Mission OIC | Immediately |
| CAT notification | ARCYBER | Per CAT timeline |
| System Owner notification | System Owner | Before any offline action |
| Data breach assessment | Legal (if PII/CUI accessed) | Within 4 hours |
| Final report | ARCYBER + Mission OIC | Within 72 hours |

### 7.2 Incident Closure Criteria
- [ ] All identified vulnerabilities patched
- [ ] Web shell removed and all persistence eliminated
- [ ] All exposed credentials rotated
- [ ] Data exposure fully characterized
- [ ] Application restored with enhanced security controls
- [ ] Enhanced monitoring active (30 days)
- [ ] Final report submitted

---

## QUICK REFERENCE CARD

```
WEB APP ATTACK CLASSIFICATION
──────────────────────────────
WAF ALERT ONLY (blocked) → Tune rules, log, CAT IV
ATTACK SUCCEEDED (HTTP 200 to attack payload) → Investigate immediately
WEB SHELL CONFIRMED → CAT I, EDR isolate server, offline now
SQLI WITH DATA READ → CAT II minimum, assess data sensitivity
AUTH BYPASS → What did they access? CAT based on data sensitivity

WEB SHELL = HOST COMPROMISE.
TREAT IT EXACTLY LIKE A MALWARE INFECTION ON THAT SERVER.
```

---

**Classification:** UNCLASSIFIED // FOUO
**Playbook ID:** IR-PB-013 | Web Application Attack Response
**Primary Lead:** 17C Network Analyst | Server Forensics: 17C Host Analyst
**Prepared By:** CyberOpsPlanner System | **Date:** 2026-02-25
**Related Playbooks:** IR-PB-001 (if web shell), IR-PB-006 (if credentials stolen), IR-PB-007 (if data exfiltrated)
