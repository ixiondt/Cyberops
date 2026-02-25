# NIST SP 800-171 POA&M Integration

**CyberOpsPlanner now integrates NIST SP 800-171 POA&M (Plan of Action and Milestones) standard.**

---

## Overview

The POA&M module has been updated to align with:
- **NIST SP 800-171** — Security Requirements for Protecting Controlled Unclassified Information (CUI)
- **CUI POA&M Template** — Standard fields and structure for compliance tracking
- **Federal compliance requirements** — Standard POA&M format used across DoD and Federal agencies

---

## POA&M Fields (NIST SP 800-171 Format)

### Required Fields

| Field | Purpose | Example |
|-------|---------|---------|
| **Weakness / Finding** | Description of the control requirement not met | "Multi-factor authentication (SI-4) not implemented on VPN access" |
| **Responsible Organization** | Office/Department responsible for remediation | "Network Operations Center" or "Security Engineering" |
| **NIST 800-171 Control** | Specific control identifier | SI-4, AC-2, IA-2, AU-2, etc. |
| **Scheduled Completion Date** | Target date for remediation completion | 2026-06-30 |
| **Weakness Identification** | How the weakness was discovered | Assessment, Audit, Incident, Scan, etc. |

### Optional Fields

| Field | Purpose | Example |
|-------|---------|---------|
| **Resource Estimate** | Funding status | Funded / Unfunded / Reallocation |
| **Milestones with Interim Dates** | Progress checkpoints | "Phase 1: 2026-04-15, Phase 2: 2026-05-30, Final: 2026-06-30" |
| **Status** | Current state | Ongoing / Complete |
| **Priority** | Remediation urgency | Critical / High / Medium / Low |
| **Changes to Milestones** | Modification notes | "Extended Phase 2 due to vendor delays" |

---

## NIST 800-171 Control Categories

### Common Control Families

**Access Control (AC)**
- AC-2: Account Management
- AC-3: Access Enforcement
- AC-4: Information Flow Enforcement

**Identification & Authentication (IA)**
- IA-2: Authentication
- IA-4: Identifier Management
- IA-5: Authentication Mechanisms

**Audit & Accountability (AU)**
- AU-2: Audit Events
- AU-3: Content of Audit Records
- AU-6: Audit Review, Analysis, and Reporting

**System & Information Integrity (SI)**
- SI-3: Malicious Code Protection
- SI-4: Information System Monitoring
- SI-7: Information System Monitoring

**Configuration Management (CM)**
- CM-3: Configuration Change Control
- CM-5: Access Restrictions
- CM-6: Configuration Settings

---

## Creating a POA&M (Step-by-Step)

### Step 1: Open Dashboard

```
http://localhost:3000
```

### Step 2: Navigate to POAMs Tab

Click "POAMs" in the navigation tabs.

### Step 3: Click "+ New POAM"

Opens the POA&M creation modal with NIST SP 800-171 fields.

### Step 4: Fill Required Fields

**Example: MFA Implementation Weakness**

```
Weakness / Finding:
  "Multi-factor authentication not enabled for remote VPN access.
   Current state: Username/password only. Control requirement: SI-4
   (Information System Monitoring) requires MFA for all remote access."

Responsible Organization:
  "Network Operations Center"

NIST 800-171 Control:
  "SI-4"

Scheduled Completion Date:
  "2026-06-30"

Weakness Identification:
  "Security Assessment" (from dropdown)
```

### Step 5: Fill Optional Fields

```
Resource Estimate:
  "Funded" (already budgeted for MFA solution)

Milestones with Interim Completion Dates:
  "Milestone 1: MFA solution selected - 2026-04-15
   Milestone 2: MFA piloted on subset of users - 2026-05-15
   Milestone 3: MFA deployed organization-wide - 2026-06-30"

Status:
  "Ongoing"

Priority:
  "🔴 Critical"

Changes to Milestones:
  (leave blank - no changes yet)
```

### Step 6: Save POA&M

Click "Save POA&M (NIST 800-171)" button.

POA&M is saved to:
```
operation/OP-[NAME]/POAMs/POAM-[ID]_[description].md
```

---

## POA&M File Format

### Example Saved File

**Filename:** `POAM-001_MFA_Implementation_VPN_Access.md`

```markdown
<!-- NIST SP 800-171 POA&M METADATA
weakness: Multi-factor authentication not enabled for remote VPN access
responsibleOrganization: Network Operations Center
nistControl: SI-4
scheduledCompletionDate: 2026-06-30
weaknessIdentification: Security Assessment
status: ongoing
priority: critical
resourceEstimate: funded
milestones:
  - Phase 1: MFA solution selected - 2026-04-15
  - Phase 2: MFA pilot deployment - 2026-05-15
  - Phase 3: Full organization deployment - 2026-06-30
changesNote: (none)
createdDate: 2026-02-25
lastUpdatedDate: 2026-02-25
-->

# POA&M-001: Multi-Factor Authentication Implementation (VPN Access)

## NIST 800-171 Compliance

**Control:** SI-4 (Information System Monitoring)
**Weakness:** Multi-factor authentication not enabled for remote VPN access

---

## Weakness Description

**Current State:**
- Remote VPN access secured by username/password authentication only
- No multi-factor authentication (MFA) implemented
- Violates SI-4 control requirement for strong authentication

**Control Requirement:**
SI-4 requires information system monitoring to detect and respond to unauthorized
access attempts. Strong authentication mechanisms (including MFA) are essential
for remote access security.

**Risk:**
- Credential compromise can lead to unauthorized network access
- No secondary validation prevents account takeover
- Violates CUI protection requirements

---

## Remediation Plan

**Responsible Organization:** Network Operations Center

**Target Completion:** 2026-06-30

### Phase 1: Solution Selection
**Target:** 2026-04-15
- Evaluate MFA solutions (hardware tokens, TOTP, push notification)
- Assess compatibility with current VPN infrastructure
- Get vendor quotes and procurement approval

### Phase 2: Pilot Deployment
**Target:** 2026-05-15
- Deploy MFA on 50-100 test users
- Validate user experience and integration
- Identify and resolve issues

### Phase 3: Full Deployment
**Target:** 2026-06-30
- Roll out MFA to all VPN users
- Train support staff on MFA troubleshooting
- Update security policies

---

## Resources & Estimate

**Status:** Funded (existing budget: $50,000)

**Required Resources:**
- MFA solution licensing: $30,000
- Integration & testing: 3 weeks, 2 FTE
- Training & documentation: 1 week, 1 FTE

---

## Tracking & Status

**Current Status:** Ongoing
**Priority:** 🔴 Critical
**Last Updated:** 2026-02-25

**Progress:**
- [x] Approved by Security Committee
- [x] Vendor evaluation in progress
- [ ] Solution selected
- [ ] Pilot complete
- [ ] Full deployment

---

**UNCLASSIFIED // FOUO**
```

---

## Tracking & Filtering

### Dashboard POAM View

The POAMs tab displays all POA&Ms with:

**Filters:**
- **Status Filter:** Ongoing / Complete
- **Priority Filter:** Critical / High / Medium / Low
- **Search:** Search by description or control

**Columns Displayed:**
- POA&M ID
- NIST Control
- Weakness Description
- Responsible Organization
- Scheduled Completion Date
- Status & Priority Badge
- Progress

### Example POAM List

```
ID          Control  Weakness Description                    Org              Due Date      Status     Priority
POAM-001    SI-4     MFA for VPN Access                      NetOps           2026-06-30    Ongoing    🔴 Critical
POAM-002    AC-2     Account Management Controls             Security         2026-05-15    Ongoing    🟠 High
POAM-003    IA-2     Authentication Mechanisms               Identity         2026-07-31    Ongoing    🟡 Medium
POAM-004    AU-2     Audit Event Logging                     Audit            2026-03-31    Complete   ✅
```

---

## Exporting POA&Ms

### Export to Word (NIST Format)

POA&Ms can be exported to Word document format matching:
- NIST SP 800-171 requirements
- CUI POA&M template structure
- Federal compliance format

### Bulk Export

All POA&Ms for an operation can be exported to:
- Single consolidated document
- Excel spreadsheet for tracking
- CSV for import to CMMC tracking systems

---

## NIST Control Quick Reference

### SI-4 (Information System Monitoring)

```
Requirement: Monitor system components and information for unusual activity

POA&M Example: Implement SIEM solution for centralized log collection
- Responsible: Security Operations Center
- Target: 2026-09-30
- Priority: Critical
```

### AC-2 (Account Management)

```
Requirement: Create, enable, disable, and remove system accounts per policy

POA&M Example: Implement automated account provisioning
- Responsible: Identity & Access Management
- Target: 2026-08-31
- Priority: High
```

### IA-2 (Authentication)

```
Requirement: Enforce multi-factor authentication for all access

POA&M Example: Deploy MFA for VPN and remote access
- Responsible: Network Operations
- Target: 2026-06-30
- Priority: Critical
```

---

## Integration with Operations

### POA&M Lifecycle

**1. Identification**
- Finding identified through assessment, audit, or incident
- Weakness documented in POA&M

**2. Planning**
- Assign responsible organization
- Define milestones and completion date
- Allocate resources

**3. Execution**
- Track progress through dashboard
- Update milestones as work progresses
- Document changes and delays

**4. Verification**
- Verify remediation completion
- Update POA&M status to "Complete"
- Document evidence of control implementation

**5. Closure**
- Archive completed POA&M
- Maintain for compliance audit trail

---

## Best Practices

### ✅ Do's

- ✅ Use specific NIST control identifiers (SI-4, not "Security Monitoring")
- ✅ Include detailed weakness descriptions with current vs. required state
- ✅ Set realistic completion dates with interim milestones
- ✅ Track all changes to original milestones
- ✅ Assign responsibility to specific organizations
- ✅ Prioritize based on risk and business impact
- ✅ Export for compliance audits and reporting

### ❌ Don'ts

- ❌ Don't use vague control descriptions
- ❌ Don't miss completion date updates
- ❌ Don't leave POA&Ms in "Ongoing" after completion
- ❌ Don't ignore milestone delays without documentation
- ❌ Don't use generic weakness descriptions
- ❌ Don't forget to maintain audit trail

---

## Compliance Reporting

### Annual Assessment

POA&Ms support annual NIST SP 800-171 compliance assessments:

```
Total POA&Ms: 47
  - Critical: 8 (all on track)
  - High: 15 (2 delayed)
  - Medium: 18 (all on track)
  - Low: 6 (1 complete)

Overall Compliance: 94% (44/47 on schedule)
Overdue: 2 (remediation in progress)
```

### CMMC Program

POA&Ms map directly to CMMC (Cybersecurity Maturity Model Certification)
assessment results and can be exported for contractor submission.

---

## Support

For questions about NIST SP 800-171 POA&M fields:
- Refer to **NIST SP 800-171 Rev 2** — specific control requirements
- Check **CUI POA&M Template** — field reference
- Review **operation/[OP-NAME]/POAMs/** — examples from past operations
- Contact your organization's compliance officer for control interpretation

---

**UNCLASSIFIED // FOUO**

CyberOpsPlanner v3.0 | NIST SP 800-171 POA&M Integration
