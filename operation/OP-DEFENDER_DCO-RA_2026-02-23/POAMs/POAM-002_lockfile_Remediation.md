# POAM-002: lockfile.ps1 Remediation & Eradication

**Containment, Eradication, Recovery, and Hardening Post-lockfile.ps1 Compromise**

---

## POAM METADATA

**POAM ID:** OP-DEFENDER-POAM-002

**POAM Title:** Contain, Eradicate, and Remediate lockfile.ps1 Malware Compromise

**Priority:** 🔴 CRITICAL

**Created:** 2026-02-23 (Time TBD)

**Created By:** CPT 173 Host Analysis Team / S-3 Operations / CyberOpsPlanner

**Status:** ⏳ OPEN (Awaiting POAM-001 Investigation Completion)

**Target Completion:** 2026-03-02 18:00 UTC (7-day remediation window from investigation start)

**Finding Reference:** INCIDENT-001 (Incident Report) + POAM-001 (Investigation findings)

**Blocked By:** POAM-001 (Investigation must complete before remediation can be planned in detail)

**Blocks:** POAM-003 (Detection Rules) - cannot create rules until malware behavior fully understood

---

## REMEDIATION SCOPE & OBJECTIVES

**Primary Objective:** Eradicate lockfile.ps1 persistence mechanism and any lateral movement from dc2, restore clean domain controller operation, prevent recurrence through detection rules.

**Secondary Objective:** Reset all potentially compromised credentials, monitor for attacker return, implement hardening measures to deny future APT41 attacks.

**Tertiary Objective:** Maintain BPEnergy operational continuity during remediation (minimal downtime).

**Success Criteria:**
1. ✅ lockfile.ps1 and any associated malware removed from dc2
2. ✅ All persistence mechanisms disabled (scheduled tasks, WMI subscriptions, registry run keys)
3. ✅ All potentially compromised credentials reset and rotated
4. ✅ Affected lateral movement systems cleaned
5. ✅ dc2 restored to known-clean baseline
6. ✅ Detection rules deployed and operational
7. ✅ 30-day post-remediation monitoring complete with zero recurrence

---

## REMEDIATION PLAN

### Phase 1: Pre-Remediation Preparation (Parallel with POAM-001 Milestone 3-4)

**Status:** ⏳ AWAITING Investigation Findings

**Timeline:** 2026-02-24 12:00 - 2026-02-24 18:00 UTC (6 hours)

**Owner:** S-3 Operations / CPT 173 Lead

**Tasks:**

1. **Receive Investigation Findings**
   - [ ] Receive POAM-001 Investigation Complete notification
   - [ ] Review all forensic findings, malware identification, scope assessment
   - [ ] Assess affected systems list and credential compromise scope

2. **Remediation Plan Development**
   Based on investigation findings, develop detailed remediation procedures:
   - [ ] Specific persistence mechanisms to remove (scheduled tasks, WMI subscriptions, registry keys)
   - [ ] Credentials to reset (identified from credential harvesting analysis)
   - [ ] Lateral movement targets to remediate (if scope expanded beyond dc2)
   - [ ] Detection rules to create/deploy
   - [ ] Hardening measures to implement (registry hardening, PowerShell logging, UAC)

3. **Coordination & Approvals**
   - [ ] Coordinate with BPEnergy OT/Manufacturing for maintenance window availability
   - [ ] Schedule dc2 remediation during low-traffic window (minimize user impact)
   - [ ] Obtain ARCYBER approval for proposed remediation actions
   - [ ] Obtain BPEnergy CIO approval for dc2 offline period and credential resets
   - [ ] Prepare alternate authentication infrastructure (secondary DC or temporary credentials)

4. **Backout Plan Development**
   - [ ] Document rollback procedures if remediation causes unintended consequences
   - [ ] Identify known-good baseline for dc2 configuration
   - [ ] Document all changes made during remediation for potential rollback

5. **Stakeholder Notification**
   - [ ] Notify all stakeholders of planned remediation timeline and impact
   - [ ] Communicate credential reset requirements to affected users
   - [ ] Brief BPEnergy leadership on remediation strategy and risks

**Success Criteria:**
- Investigation findings fully understood
- Detailed remediation procedures documented
- All approvals obtained
- Maintenance window scheduled
- Backout plan ready

---

### Phase 2: Containment & Forensic Evidence Preservation

**Status:** ⏳ AWAITING Phase 1 Completion

**Timeline:** 2026-02-24 18:00 - 2026-02-25 06:00 UTC (12 hours)

**Owner:** CPT 173 Host Analysis Team

**Tasks:**

1. **Final Forensic Collection** (Before any remediation actions)
   - [ ] Final disk image of dc2 (for evidence/legal purposes)
   - [ ] Final registry dump
   - [ ] Final event log collection
   - [ ] Verify chain of custody documentation

2. **Persistence Mechanism Identification**
   - [ ] Document all scheduled tasks referencing lockfile.ps1 or suspicious scripts
   - [ ] Document all registry run keys/startup folders with malware references
   - [ ] Document all WMI event subscriptions or filters related to malware
   - [ ] Document any kernel-mode rootkits if detected (Winnti-like behavior)

3. **Persistence Mechanism Disabling** (Non-destructive - preparation for removal)
   - [ ] Disable (but don't delete yet) all identified scheduled tasks
   - [ ] Disable (but don't delete yet) all registry persistence mechanisms
   - [ ] Disable (but don't delete yet) WMI subscriptions
   - Reason: Verify behavior doesn't resume, capture any error/alert activity, document for legal evidence

4. **Monitoring for Attacker Response**
   - [ ] If malware is active, disabling persistence may trigger attacker actions
   - [ ] Monitor for:
     - [ ] C2 reconnection attempts (suggesting attacker monitoring)
     - [ ] Defensive actions (log deletion, additional malware deployment)
     - [ ] Lateral movement (attacker pivoting to other systems)
   - [ ] Document all suspicious activity (potential evidence of attacker monitoring)

**Success Criteria:**
- All evidence collected and preserved
- Persistence mechanisms identified and documented
- Persistence disabled without removing (yet)
- Attacker response (if any) documented

---

### Phase 3: Eradication - System Cleaning

**Status:** ⏳ AWAITING Phase 2 Completion

**Timeline:** 2026-02-25 06:00 - 2026-02-26 18:00 UTC (36 hours)

**Owner:** CPT 173 Host Analysis Team + BPEnergy System Administration

**Critical Coordination:** Must minimize dc2 offline time; alternate authentication infrastructure required

**Tasks:**

1. **Malware & Script Removal**
   - [ ] Remove lockfile.ps1 binary from disk
   - [ ] Remove any associated malware files identified during analysis (if scope expanded)
   - [ ] Remove any malware dropped files (temporary executables, DLLs, additional scripts)
   - [ ] Verify removal via disk scanning (Defender, Malwarebytes, other AV)

2. **Persistence Mechanism Removal**
   - [ ] Delete all disabled scheduled tasks from Phase 2
   - [ ] Delete all registry persistence mechanisms (run keys, startup folders, image hijacking)
   - [ ] Remove all WMI event subscriptions
   - [ ] Verify no remaining suspicious autostart mechanisms

3. **System Configuration Hardening**
   - [ ] Reset dc2 system registry to known-good baseline (if backup available)
   - [ ] Implement PowerShell logging (ScriptBlock logging, Transcription) to prevent future script-based attacks
   - [ ] Enable Windows Defender exclusions for critical services only (to prevent AV conflicts)
   - [ ] Apply latest security patches and GPO updates
   - [ ] Re-enable Windows Defender real-time monitoring

4. **Verification & Validation**
   - [ ] Run full antivirus scan (multiple vendors if possible: Defender, Malwarebytes, etc.)
   - [ ] Run behavioral analysis tools (Autoruns, Process Explorer, Process Monitor)
   - [ ] Verify no suspicious scheduled tasks remain
   - [ ] Verify registry clean (Rootkit scan with specialized tools)
   - [ ] Boot into Safe Mode and verify clean (if possible without disrupting domain)

**Success Criteria:**
- All malware removed and verified
- All persistence mechanisms deleted
- System hardening applied
- Validation scans show clean status

---

### Phase 4: Credential Management & Lateral Movement Remediation

**Status:** ⏳ AWAITING Phase 3 Completion

**Timeline:** 2026-02-26 06:00 - 2026-02-27 06:00 UTC (24 hours)

**Owner:** S-3 Operations + BPEnergy Identity/Security Teams

**Tasks:**

1. **Compromised Credential Assessment**
   - [ ] From POAM-001 investigation: Identify which credentials were harvested/compromised
   - [ ] Identify scope: Single service account, multiple admins, or widespread compromise
   - [ ] Determine if Azure AD tokens compromised (if hybrid identity compromise)

2. **Credential Reset & Rotation**
   - [ ] Reset all identified compromised DC service accounts with strong new passwords
   - [ ] Reset all admin accounts with potential access to dc2
   - [ ] Consider full domain-wide password reset if compromise was extensive (attackers may have dumped NTLM hashes)
   - [ ] Force Azure AD token refresh if cloud identity compromise confirmed
   - [ ] Rotate API keys/service principals in cloud environments if compromised

3. **Lateral Movement Remediation** (If scope expanded beyond dc2)
   - [ ] For each affected system identified in POAM-001 investigation:
     - [ ] Collect forensic evidence
     - [ ] Remove malware and persistence mechanisms
     - [ ] Apply system patches and hardening
   - [ ] Prioritize OT/manufacturing systems if any compromise detected
   - [ ] Prioritize cloud management systems if AWS/Azure access compromised
   - [ ] Timeline for lateral movement systems: TBD based on scope (may extend beyond Phase 4)

4. **User Notification & Training**
   - [ ] Notify all users with compromised credentials of password reset requirement
   - [ ] Schedule security awareness training focused on:
     - [ ] PowerShell script security risks
     - [ ] Spearphishing recognition (APT41 typical initial vector)
     - [ ] Credential security and strong password practices
   - [ ] Optional: Implement additional MFA for sensitive accounts

**Success Criteria:**
- All compromised credentials reset with verification
- Azure AD tokens refreshed if compromised
- Lateral movement systems remediated
- User notifications and training completed

---

### Phase 5: Detection Rule Development & Deployment

**Status:** ⏳ AWAITING Phase 3 Investigation Results + Phase 4 Findings

**Timeline:** 2026-02-26 12:00 - 2026-02-28 12:00 UTC (2+ days, parallel with Phase 4)

**Owner:** S-2 Intelligence Analyst + CPT 174 Reverse Engineer

**Tasks:**

1. **Threat Intelligence Extraction**
   - [ ] From POAM-001 investigation: Extract all behavioral indicators
     - [ ] File paths and naming patterns
     - [ ] Registry modification patterns
     - [ ] Scheduled task creation patterns
     - [ ] Network communication patterns (if C2 identified)
     - [ ] PowerShell command patterns and obfuscation techniques
     - [ ] Process execution parent-child relationships

2. **Detection Rule Creation** (Multi-layer approach)
   - [ ] **EDR-based rules** (Microsoft Defender / other EDR)
     - [ ] PowerShell script block suspicious patterns (T1059)
     - [ ] Scheduled task creation monitoring (T1053)
     - [ ] Registry persistence key creation (T1547)
     - [ ] WMI event subscription creation
     - [ ] LSASS access patterns (if credential stealing detected)

   - [ ] **SIEM-based rules** (Log correlation)
     - [ ] PowerShell execution logging (4688, 4720 events)
     - [ ] Scheduled task creation (Windows Event ID 106, 129)
     - [ ] Registry modification events
     - [ ] Failed authentication patterns (potential lateral movement)

   - [ ] **Network-based rules** (Zeek, Suricata)
     - [ ] C2 communication patterns (if IOCs identified)
     - [ ] Suspicious DNS queries (if domain names extracted)
     - [ ] SMB lateral movement patterns
     - [ ] RDP/WinRM suspicious source IPs

   - [ ] **YARA rules** (File scanning)
     - [ ] Malware signature patterns
     - [ ] Suspicious PowerShell patterns
     - [ ] Obfuscation patterns typical of APT41

3. **Detection Rule Validation** (Critical - false positive assessment)
   - [ ] Test rules in lab environment against benign PowerShell scripts
   - [ ] Verify no false positives for legitimate system maintenance scripts
   - [ ] Verify no false positives for standard domain admin activities
   - [ ] Tune rule thresholds to balance detection vs false positives

4. **Detection Rule Documentation**
   - [ ] Document rule purpose, triggering conditions, and expected output
   - [ ] Document how rule relates to MITRE ATT&CK technique
   - [ ] Document known limitations and edge cases
   - [ ] Create SOC runbook for rule alerts (investigation procedures)

5. **Detection Rule Deployment**
   - [ ] Deploy to EDR infrastructure (Defender / other EDR)
   - [ ] Deploy to SIEM (log analysis + alerts)
   - [ ] Deploy to network detection (Zeek/Suricata)
   - [ ] Deploy YARA rules to file scanning infrastructure
   - [ ] Verify all systems operational and tuned

**Success Criteria:**
- 10+ detection rules created targeting lockfile.ps1 behaviors
- All rules tested and validated (false positive rate < 1%)
- Rules deployed to all detection layers (host, network, cloud)
- SOC trained on rule alerts and response procedures

---

### Phase 6: Post-Remediation Monitoring & Verification

**Status:** ⏳ AWAITING Phase 5 Completion

**Timeline:** 2026-02-28 12:00 - 2026-03-30 12:00 UTC (30 days minimum)

**Owner:** S-2 Intelligence + MOC 24/7 Watch

**Tasks:**

1. **Immediate Verification** (First 24 hours post-remediation)
   - [ ] Verify dc2 operational and domain services responding
   - [ ] Verify all domain systems connecting successfully to dc2
   - [ ] Verify users able to authenticate and access resources
   - [ ] Verify no new persistence mechanisms appearing
   - [ ] Verify no unusual network traffic from dc2

2. **Continuous Monitoring** (7-day intensive monitoring)
   - [ ] Daily review of EDR and SIEM alerts for:
     - [ ] Recurrence of lockfile.ps1 or similar malware
     - [ ] Suspicious PowerShell execution patterns
     - [ ] Lateral movement attempts
     - [ ] Credential abuse attempts
     - [ ] C2 communication attempts
   - [ ] Analyze any new incidents immediately (may indicate attacker return)
   - [ ] Document any detection rule efficacy improvements

3. **Extended Monitoring** (30-day period)
   - [ ] Weekly review of threat intelligence for new APT41 IOCs
   - [ ] Monthly threat hunting for missed persistence or implants
   - [ ] Monitor for attacker re-compromise attempts
   - [ ] Assess baseline deviations in dc2 behavior

4. **Artifact Preservation & Legal Coordination** (If needed)
   - [ ] Maintain chain of custody for all forensic evidence
   - [ ] Coordinate with legal/JAG for potential law enforcement notification
   - [ ] Prepare incident summary for potential DOJ/FBI reporting
   - [ ] Document all remediation actions for legal defensibility

**Success Criteria:**
- 30-day period with zero recurrence of malware/persistence
- Detection rules triggered appropriately on suspicious activity
- No new compromise indicators discovered
- dc2 fully operational and stable

---

## REMEDIATION CONTINGENCIES & RISKS

**Risk 1: Failed Remediation / Incomplete Eradication**
- **Risk:** Persistence mechanism not fully removed; attacker maintains access
- **Mitigation:** Multiple validation scans and verification steps in Phase 3
- **Mitigation:** 30-day monitoring to detect any recurrence
- **Fallback:** If recurrence detected: Rebuild dc2 from scratch using known-good backup

**Risk 2: Production Disruption During dc2 Remediation**
- **Risk:** dc2 offline periods could disrupt authentication/services
- **Mitigation:** Prepare secondary DC or temporary credential infrastructure
- **Mitigation:** Schedule remediation during low-traffic window
- **Mitigation:** Minimize dc2 downtime (target < 2 hours total offline)
- **Fallback:** Rollback procedures if critical services fail

**Risk 3: Lateral Movement Missed**
- **Risk:** Attacker has already moved to other systems; eradicating dc2 doesn't stop attack
- **Mitigation:** Comprehensive threat hunting in Phase 1-4 (POAM-001 investigation)
- **Mitigation:** Network monitoring for lateral movement indicators
- **Mitigation:** Credential reset prevents attacker from using stolen credentials
- **Fallback:** If additional systems compromised: Expand remediation scope

**Risk 4: Detection Rules Ineffective**
- **Risk:** Created detection rules don't catch similar future attacks
- **Mitigation:** Rules based on actual malware behavior from forensic analysis
- **Mitigation:** Validation testing against known samples
- **Mitigation:** 30-day monitoring period to assess rule effectiveness
- **Fallback:** Rule tuning and refinement based on monitoring results

---

## RESOURCE REQUIREMENTS

**Personnel:**
- CPT 173 Host Analysis Team (3-4 analysts) - 24/7 during Phase 2-5
- S-3 Operations Officer (Coordination) - Full-time during Phase 1-4
- BPEnergy System Administrators - 24/7 during dc2 remediation (Phase 3)
- S-2 Intelligence Analyst - Part-time during Phase 5 (detection rule development)
- MOC Watch (24/7) - Continuous monitoring Phase 6

**Tools & Equipment:**
- Forensic collection tools (write blockers, imaging software)
- Malware analysis lab (Ghidra, Cuckoo Sandbox, IDA Pro)
- EDR management console (Microsoft Defender admin center)
- SIEM management console (log review and rule deployment)
- Network detection tools (Zeek, Suricata admin interface)
- Antivirus/antimalware tools for multiple vendors (scanning verification)

**Timeline & Effort:**
- Phase 1: 6 hours (planning and coordination)
- Phase 2: 12 hours (forensics preservation and diagnostics)
- Phase 3: 36 hours (malware removal and system cleaning)
- Phase 4: 24 hours (credential reset and lateral movement remediation)
- Phase 5: 48+ hours (detection rule development and testing)
- Phase 6: 720+ hours (30-day monitoring, minimal active effort but continuous oversight)

**Total Active Effort:** ~150-200 hours across all phases

---

## SUCCESS METRICS

**CRITICAL Success Metrics:**
1. dc2 fully operational and malware-free (verified by multiple scanning methods)
2. All compromised credentials reset and rotated
3. Zero recurrence of lockfile.ps1 or similar malware over 30-day monitoring period
4. 10+ detection rules deployed and operational
5. All affected lateral movement systems remediated
6. 100% of users successfully re-authenticated with new credentials

**Secondary Success Metrics:**
1. Detection rules effective (catch suspicious PowerShell execution, scheduled task creation, etc.)
2. Forensic evidence properly preserved for potential legal proceedings
3. BPEnergy operations maintained with <2 hours total downtime
4. All stakeholders properly briefed on findings and remediation

---

## DEPENDENCIES & BLOCKERS

**Depends On:**
- ✅ POAM-001 Investigation (must complete to finalize Phase 1 remediation plan)

**Blocks:**
- ⏳ POAM-003 (Detection Rules Deployment - refined based on Phase 5 findings)

**External Dependencies:**
- BPEnergy system administration support (for dc2 remediation)
- BPEnergy OT/Manufacturing leadership (for maintenance window coordination)
- ARCYBER approval authority (for DCO-RA actions and credential reset authority)

---

## ESCALATION & REPORTING

**Daily Status:** Brief in daily SITREP (1600 UTC) - Phase/Milestone status

**Escalation Triggers:**
- If remediation fails and malware recurs → Escalate to ARCYBER and BPEnergy CIO immediately
- If lateral movement detected during Phase 4 → Expand scope and escalate
- If detection rules ineffective during Phase 6 → Escalate for rule refinement

**Final Reporting:**
- Upon completion: Final remediation report documenting all actions and verification
- Post-30-day monitoring: Closure report confirming no recurrence and operation success

---

## REFERENCES & SUPPORTING DOCUMENTATION

**Related POAMs:**
- [POAM-001_lockfile_Investigation.md](POAM-001_lockfile_Investigation.md) - Investigation findings (input to this POAM)
- [POAM-003_Detection_Rules.md](POAM-003_Detection_Rules.md) - Detection rule deployment (dependent)

**Related Incident Documents:**
- [Incident_Report_001_lockfile_ps1_dc2_2026-02-23.md](../Incident_Reports/Incident_Report_001_lockfile_ps1_dc2_2026-02-23.md)

**OPORD References:**
- OPORD 26-02 Annex K (Incident Response Playbooks) - 6-phase IR model
- OPORD 26-02 Annex L (Authorities & ROE) - Remediation authority

**MITRE ATT&CK References:**
- T1140: Deobfuscate/Decode Files or Information
- T1070: Indicator Removal
- T1562: Impair Defenses (anti-forensics)

---

## CLOSEOUT CRITERIA

POAM-002 will be considered CLOSED when:
1. ✅ All malware removed and verified clean
2. ✅ All persistence mechanisms eradicated
3. ✅ All compromised credentials reset
4. ✅ All lateral movement systems remediated
5. ✅ All detection rules deployed and operational
6. ✅ 30-day post-remediation monitoring completed with zero recurrence
7. ✅ Final remediation report approved and documented

---

**Classification:** UNCLASSIFIED // FOUO

**POAM Status:** ⏳ OPEN (Awaiting Investigation Completion)

**Current Blocker:** POAM-001 Investigation (Must complete before detailed remediation can begin)

**Target Completion:** 2026-03-02 18:00 UTC (7 days from investigation start)

**See:** [POAM_Tracker_2026-02-23.md](POAM_Tracker_2026-02-23.md) for summary status
