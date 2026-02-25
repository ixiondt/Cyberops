# CLOUD / SaaS COMPROMISE RESPONSE — INCIDENT RESPONSE PLAYBOOK
## 7-Step Framework | UNCLASSIFIED // FOUO

**Playbook ID:** IR-PB-014
**Version:** 1.0
**Classification:** UNCLASSIFIED // FOUO
**Threat Type:** Cloud Infrastructure / SaaS Account Compromise — Unauthorized Cloud Access / Identity Attack / Misconfiguration Exploitation
**Primary Lead:** 17C Network Analyst
**Supporting Entities:** 17C Host Analyst (endpoint artifacts), IT Ops (cloud admin), S-2 (attribution), Legal (if data breach)
**Notification:** Mission OIC (if sensitive data accessed or persistence established in cloud)
**Authority:** CJCSM 6510.01B | AR 25-2 | Cloud Security Policy (DoD CIO) | CSP Shared Responsibility Model
**Created:** 2026-02-25

**MITRE ATT&CK Primary Tactics:**
- T1078.004 — Cloud Accounts (compromised cloud identity / SSO credential)
- T1530 — Data from Cloud Storage (S3, Azure Blob, GCS unauthorized access)
- T1537 — Transfer Data to Cloud Account (cloud-to-cloud exfiltration)
- T1562.008 — Disable or Modify Cloud Logs (CloudTrail, Azure Monitor tampering)
- T1136.003 — Create Cloud Account (persistence via new cloud user or service principal)
- T1098.001 — Additional Cloud Credentials (OAuth token abuse, access key creation)
- T1619 — Cloud Storage Object Discovery (bucket/blob enumeration)
- T1580 — Cloud Infrastructure Discovery (inventory enumeration)

**Cloud Environments Covered:**
- Microsoft 365 / Azure AD / Entra ID
- Amazon Web Services (AWS)
- Google Cloud Platform (GCP)
- SaaS applications (Salesforce, ServiceNow, Okta, etc.)

---

## BLUF

Cloud compromise incidents are fundamentally different from on-premises incidents. The attacker may have access from anywhere in the world with no network footprint on your monitored infrastructure. Access may persist via OAuth tokens, API keys, or service principal credentials that survive password resets. Cloud activity logs are your primary forensic artifact — and attackers know this, so log tampering is a common early action. The shared responsibility model means some forensic data exists only at the cloud provider level.

**Key differences from on-premises incidents:**
- No endpoint to isolate (unless hybrid identity)
- Authentication artifacts in cloud audit logs (Azure AD, CloudTrail, GCP Audit)
- Attackers can maintain access via tokens even after password reset
- Cloud-native persistence mechanisms (new service principal, new IAM role, federation trust modification)
- Cloud provider's IR team may be required for some forensic data

---

## STEP 1: PREPARATION

### 1.1 Required Capabilities
| Capability | Entity | Purpose |
|-----------|--------|---------|
| Cloud audit log access (CloudTrail, Azure Monitor, GCP Audit) | Network Analyst | Primary forensic source |
| SIEM with cloud log ingestion | Network Analyst | Correlation and alerting |
| Identity provider (IdP) admin access | IT Ops | User/session management |
| Cloud Security Posture Management (CSPM) | Network Analyst | Misconfiguration detection |
| OAuth / token revocation capability | IT Ops | Terminate persistent access |
| Multi-cloud access to all active subscriptions | IT Ops | Complete visibility |

### 1.2 Cloud Security Pre-Incident Requirements
- [ ] All cloud audit logging enabled (CloudTrail all regions, Azure Diagnostic Settings, GCP Audit Log)
- [ ] Cloud logs ingested into SIEM (do not rely solely on cloud-native portal)
- [ ] MFA enforced on all cloud identities (admin and user)
- [ ] No long-lived access keys for human identities (use MFA-backed SSO)
- [ ] Cloud activity alerts configured (new admin user creation, role assignment, unusual API calls)
- [ ] Privileged cloud role assignment requires approval workflow
- [ ] Public cloud storage buckets/blobs audited — no unauthorized public exposure

### 1.3 Cloud Identity Inventory
- [ ] Complete list of cloud admin accounts (human and service principal/IAM roles)
- [ ] All OAuth application authorizations inventoried
- [ ] All API keys and access key IDs inventoried with owner and purpose
- [ ] All federated identity trusts documented (SAML, OAuth, OIDC providers)
- [ ] Cloud vendor emergency contact procedures documented

---

## STEP 2: DETECTION & IDENTIFICATION

### 2.1 Cloud Compromise Detection Indicators
| Indicator | Cloud Environment | Source |
|-----------|-----------------|--------|
| Login from impossible geography (user in two continents simultaneously) | All | Azure AD / CloudTrail / Okta |
| OAuth application consent to high-permission scopes | M365 / Azure | Azure AD audit |
| New admin user created (especially service principal) | All | Cloud audit logs |
| Access key created for IAM user | AWS | CloudTrail |
| CloudTrail / Azure Monitor logging disabled | AWS / Azure | CloudTrail / Activity Log |
| Large data download from cloud storage | All | Storage access logs |
| Unusual API call volume (enumeration pattern) | All | CloudTrail / Azure Activity |
| New federated identity trust added | Azure AD | Azure AD audit |
| Conditional access policy modified | Azure | Azure AD audit |
| MFA disabled for account | All | IdP logs |
| Anomalous email forwarding rule (auto-forward to external) | M365 | Exchange audit logs |
| New enterprise application with mail.read or files.readwrite scope | M365 | Azure AD audit |

### 2.2 17C Network Analyst — Cloud Log Analysis

**Azure / M365 Priority Log Sources:**
```
Azure AD Sign-In Logs → Authentication events, location, MFA status
Azure AD Audit Logs → User/role/app modifications
M365 Unified Audit Log → Exchange, SharePoint, Teams activity
Azure Activity Log → Azure resource modifications
Microsoft Defender for Cloud → Security alerts
```

**AWS Priority Log Sources:**
```
CloudTrail → All API calls (authentication + resource actions)
GuardDuty → Threat detection alerts
S3 Server Access Logs → Data access
CloudWatch Logs → Application and service logs
IAM Access Analyzer → Overly permissive policies
```

### 2.3 Token Abuse Assessment
Cloud attackers frequently pivot from initial access to persistent tokens:
- Check for newly created OAuth application authorizations
- Check for new service principals / IAM users created
- Check for new API keys issued
- Check for new role assignments
- Check for conditional access policy modifications (weakening MFA requirements)

### 2.4 Scope Determination
- Which user accounts are confirmed compromised?
- Which cloud services were accessed (email, files, compute, storage)?
- Were new cloud resources created by the attacker (VMs, storage buckets, Lambda/Azure Functions)?
- Was cloud-to-cloud exfiltration attempted (attacker copying data to attacker-controlled cloud)?
- Are there on-premises systems connected to the cloud environment (hybrid — attacker may pivot on-prem)?

### 2.5 Severity Classification
| Situation | Category |
|-----------|----------|
| Cloud admin account compromised | CAT I |
| Federation trust or IdP compromised | CAT I |
| Large-scale data access from cloud storage | CAT I |
| Cloud audit logging disabled | CAT I |
| Standard user cloud account compromised | CAT II |
| Limited API key exposure (non-privileged) | CAT II |
| Misconfiguration exposing public data (no access confirmed) | CAT III |

---

## STEP 3: CONTAINMENT

### 3.1 Cloud Containment Sequence
```
1. REVOKE ALL ACTIVE SESSIONS (not just passwords — tokens survive password reset)
2. REVOKE ALL OAUTH TOKEN GRANTS for compromised accounts
3. REVOKE/ROTATE API KEYS
4. DISABLE COMPROMISED ACCOUNT (after session/token revocation)
5. REMOVE ATTACKER-CREATED PERSISTENCE (new users, app registrations, roles)
6. RE-ENABLE LOGGING (if disabled by attacker — immediately)
```

### 3.2 Identity Containment Actions

**Microsoft Azure / Entra ID:**
- [ ] Revoke all refresh tokens: `Revoke-AzureADUserAllRefreshToken` (equivalent in portal)
- [ ] Disable the compromised account
- [ ] Revoke any OAuth apps the attacker authorized
- [ ] Remove any new enterprise applications the attacker registered
- [ ] Check and restore conditional access policies
- [ ] Remove any new users created by attacker

**AWS:**
- [ ] Deactivate all access keys for compromised IAM user
- [ ] Revoke all active sessions: attach DenyAll inline policy
- [ ] Remove the compromised IAM user from all groups
- [ ] Delete any IAM users/roles/keys created by attacker
- [ ] Check and restore SCPs and resource policies modified by attacker

### 3.3 Cloud Persistence Removal — Priority
Attackers establish cloud persistence independently of the initial compromised credential:
- [ ] New IAM users/Azure AD users created by attacker (remove)
- [ ] New service principals / application registrations (remove/disable)
- [ ] New API keys / access keys (revoke)
- [ ] New role assignments to legitimate accounts (remove)
- [ ] New federated identity trusts (remove if unauthorized)
- [ ] Email forwarding rules (remove)
- [ ] New subscription owners or co-administrators (remove)

### 3.4 Re-Enable Logging (Immediate if Tampered)
If attacker disabled cloud logging:
- [ ] Re-enable CloudTrail in all regions immediately
- [ ] Re-enable Azure Diagnostic Settings on all subscriptions
- [ ] Acknowledge that there is a forensic gap during the log-disabled window
- [ ] Reconstruct activity during gap from other sources (NetFlow, SIEM if logs were streaming before disabling)

---

## STEP 4: ERADICATION

### 4.1 Identity Cleanup
- Remove all unauthorized identities (users, service principals, application registrations)
- Rotate all credentials for accounts in the blast radius
- Force MFA re-enrollment for all affected accounts
- Review and clean all role assignments modified during compromise period

### 4.2 Resource Cleanup
If attacker created cloud resources:
- [ ] Identify all resources created during compromise window (filter CloudTrail/Activity Log by timeframe)
- [ ] Terminate unauthorized compute instances (VMs, Lambda, etc.)
- [ ] Delete unauthorized storage resources
- [ ] Remove unauthorized network configurations (security groups, peering, VPN connections)
- [ ] Check cloud spend — attacker may have been running crypto mining or attack infrastructure

### 4.3 Hybrid Environment Pivot Assessment
If cloud environment is hybrid-joined to on-premises:
- Did the attacker use cloud access to pivot on-premises?
- Check for unusual cloud-to-on-premises authentication events
- → If confirmed: activate on-premises playbooks (IR-PB-005, IR-PB-006)

---

## STEP 5: RECOVERY

### 5.1 Identity Recovery
- Re-enable accounts after credential rotation and MFA enforcement
- Verify all accounts have MFA enforced before restoring access
- Validate conditional access policies are at required security baseline

### 5.2 Cloud Security Posture Validation
Before restoring full cloud operations:
- [ ] Run CSPM scan — all findings addressed
- [ ] Verify no public cloud storage exposures
- [ ] Verify no overly permissive IAM roles remaining
- [ ] Confirm logging re-enabled in all regions/subscriptions
- [ ] Alert thresholds validated and active

### 5.3 Enhanced Cloud Monitoring (60 Days)
- Alert on all admin actions (user creation, role assignment, policy change)
- Alert on any MFA bypass or conditional access policy modification
- Alert on unusual geographic sign-in
- Alert on any new OAuth application authorization

---

## STEP 6: POST-INCIDENT ANALYSIS

### 6.1 Cloud Incident Timeline
```
[DATE/TIME] Initial cloud access (from audit logs)
[DATE/TIME] First post-login activity
[DATE/TIME] Persistence established (new user/key/app)
[DATE/TIME] Data accessed (storage, email, files)
[DATE/TIME] Logging tampered (if applicable)
[DATE/TIME] Detection
[DATE/TIME] Containment (session/token revocation)
[DATE/TIME] Attacker persistence removed
Cloud dwell time: [N hours/days]
Data potentially accessed: [description]
Attacker-created resources: [list]
```

### 6.2 Initial Access Vector Analysis
How did attacker get cloud credentials?
- Phishing (credential harvesting page) → IR-PB-011
- Password spray against cloud identity → Strengthen MFA
- API key exposed in code repository (GitHub, GitLab)
- SSRF vulnerability exposing cloud metadata credentials
- Compromised on-premises account synchronized to cloud (hybrid)
- Third-party application compromise (OAuth token theft)

### 6.3 Cloud Security Improvement Recommendations
- Enforce MFA on all identities (no exceptions)
- Implement privileged identity management (PIM) for cloud admin roles (JIT access)
- Regular access key rotation (or eliminate long-lived keys entirely)
- Code repository scanning for secrets
- Cloud entitlement management review (least privilege)

---

## STEP 7: COORDINATION & REPORTING

### 7.1 Cloud Incident Reporting
| Event | Recipient | Deadline |
|-------|-----------|----------|
| Cloud admin compromise (CAT I) | Mission OIC | Immediately |
| ARCYBER notification | ARCYBER | Within 1 hour (CAT I) |
| Cloud provider notification | CSP Security Team | If provider-side investigation needed |
| Data breach assessment | Legal | If sensitive data accessed |
| Status updates | All above | Every 8 hours |
| Final report | ARCYBER + Mission OIC | Within 72 hours |

### 7.2 Cloud Provider Coordination
Cloud providers have IR teams that can assist:
- AWS: AWS Security (via AWS Support or AWS Shield)
- Microsoft: MSTIC / Microsoft Security Response Center
- Google: Google Cloud Security Operations
- Contact via official channels per contract/SLA

### 7.3 Incident Closure Criteria
- [ ] All unauthorized access revoked (sessions, tokens, API keys)
- [ ] All attacker-created identities and resources removed
- [ ] All compromised accounts restored with MFA enforced
- [ ] Logging confirmed active across all environments
- [ ] Cloud security posture scan: clean
- [ ] Enhanced monitoring active (60 days)
- [ ] Data breach assessment complete (if applicable)
- [ ] Final report submitted

---

## QUICK REFERENCE CARD

```
CLOUD COMPROMISE RESPONSE
──────────────────────────
1. REVOKE SESSIONS + TOKENS (password reset alone is NOT enough)
2. REVOKE API KEYS (all keys for compromised account)
3. RE-ENABLE LOGGING (if disabled — do this immediately)
4. HUNT ATTACKER PERSISTENCE (new users, apps, roles, keys)
5. REMOVE ALL ATTACKER-CREATED RESOURCES
6. FORCE MFA BEFORE RESTORING ACCESS

TOKEN-BASED ACCESS SURVIVES PASSWORD RESET.
REVOKE REFRESH TOKENS EXPLICITLY — DO NOT ASSUME RESET IS ENOUGH.
```

---

**Classification:** UNCLASSIFIED // FOUO
**Playbook ID:** IR-PB-014 | Cloud / SaaS Compromise Response
**Primary Lead:** 17C Network Analyst | IT Ops: Cloud administration actions
**Prepared By:** CyberOpsPlanner System | **Date:** 2026-02-25
**Related Playbooks:** IR-PB-006 (Credential Theft), IR-PB-007 (Data Exfiltration), IR-PB-011 (Phishing — common initial vector)
