# DIGITAL FORENSICS & EVIDENCE COLLECTION — SOP PLAYBOOK
## 7-Step Framework | UNCLASSIFIED // FOUO

**Playbook ID:** IR-PB-016
**Version:** 1.0
**Classification:** UNCLASSIFIED // FOUO
**Type:** Supporting SOP — applies to ALL incident types requiring forensic collection
**Primary Lead:** 17C Host Analyst
**Supporting Entities:** 17C Network Analyst (network artifacts), IT Ops (access/logistics), Legal (chain of custody if prosecution likely)
**Authority:** CJCSM 6510.01B | AR 25-2 | DoD Digital Forensics Guidelines | Federal Rules of Evidence (if criminal prosecution)
**Created:** 2026-02-25

**This playbook is invoked by:** IR-PB-001, PB-002, PB-003, PB-006, PB-009, PB-010, PB-012 (and any incident requiring forensic evidence)

---

## BLUF

Digital forensics is the foundation of every incident response investigation. Evidence collected incorrectly is evidence that cannot be used — for investigation, for reporting, or for prosecution. Chain of custody, hash verification, and write-protection are not bureaucratic requirements; they are the difference between evidence and noise. This playbook establishes the minimum standard for forensic collection across all incidents.

**The forensic analyst's primary obligation:** Collect evidence that survives scrutiny. If you cannot testify that you preserved the evidence in its original state, the evidence is worthless.

---

## STEP 1: PREPARATION

### 1.1 Forensic Toolkit Requirements
| Tool Category | Purpose | Recommended |
|--------------|---------|-------------|
| Write blocker (hardware) | Prevent modification of original evidence | WiebeTech, Tableau, CRU |
| Forensic imaging | Bit-for-bit disk copy | FTK Imager, dd, dcfldd, Guymager |
| Memory acquisition | RAM capture | WinPmem, DumpIt, Magnet RAM Capture |
| Live response / triage | Remote artifact collection | Velociraptor, Kape, Magnet Axiom |
| Evidence storage | Isolated, encrypted, catalogued | Dedicated forensic NAS or portable drives |
| Hash tools | Verify evidence integrity | md5sum, sha256sum, fciv (built-in) |
| Chain of custody forms | Documentation | Local template (see IR-Team-Entity-Reference.md) |
| Evidence bags / labels | Physical evidence handling | Tamper-evident bags |

### 1.2 Analyst Preparation Before Collection
- [ ] Forensic workstation clean (no prior case data)
- [ ] Hash the forensic tools themselves (verify toolchain integrity)
- [ ] Document analyst identity and date/time start
- [ ] Legal review — is prosecution possible? (Higher chain of custody standard applies)
- [ ] Ensure adequate storage capacity (image is 1:1 with source drive size)
- [ ] Verify write blocker functioning before connecting evidence drive

### 1.3 Evidence Prioritization (Order of Volatility)
Collect in this order — most volatile to least volatile:
```
1. CPU registers / cache (captured in memory dump)
2. RAM (memory)
3. Network connections (netstat, active sessions — point in time capture)
4. Running processes (process list, handles, DLLs)
5. Open files / active users
6. Kernel statistics
7. Temporary file systems / disk cache
8. Disk (non-volatile — but collect before any remediation)
9. Remote logging / monitoring systems
10. Physical configuration / topology
```

---

## STEP 2: DETECTION & IDENTIFICATION (FOR THIS PLAYBOOK: EVIDENCE IDENTIFICATION)

### 2.1 Evidence Identification Checklist
For each incident, identify all potential evidence sources before collecting:

**Endpoint Evidence:**
- [ ] RAM (if system is live and malware may be memory-resident)
- [ ] Disk image (full or targeted acquisition)
- [ ] Event logs (Security, System, Application, PowerShell, Sysmon)
- [ ] Registry (live export or disk-level acquisition)
- [ ] Browser artifacts (history, cache, cookies, saved passwords)
- [ ] Prefetch files (Windows — tracks execution history)
- [ ] LNK / Jump List files (recently accessed files)
- [ ] $MFT (Master File Table — file system metadata)
- [ ] Volume Shadow Copies (historical snapshots)
- [ ] Pagefile / Hiberfil.sys (may contain memory artifacts)
- [ ] Scheduled tasks, services, registry run keys

**Network Evidence:**
- [ ] Firewall logs (inbound/outbound, allowed/denied)
- [ ] Proxy logs (HTTP/S requests, destinations, user agents, volumes)
- [ ] DNS logs (all queries for affected hosts)
- [ ] NetFlow / IPFIX (session-level network records)
- [ ] Full packet capture (PCAP) if available for time window
- [ ] Email server logs (delivery logs, authentication logs)
- [ ] VPN access logs

**Cloud Evidence (if applicable):**
- [ ] Cloud audit logs (CloudTrail, Azure Activity Log, GCP Audit)
- [ ] Identity provider sign-in logs
- [ ] Cloud storage access logs

**Physical / Environmental Evidence:**
- [ ] Physical access logs (badge swipes)
- [ ] CCTV footage (for physical security incidents)
- [ ] Hardware (if removable media or device is part of incident)

### 2.2 Evidence Scope Decision
Before collecting everything, prioritize based on incident type:
| Incident | Priority Evidence |
|----------|------------------|
| Malware triage | RAM + disk image + process list + network connections |
| Credential theft | Event logs + memory (for live credential captures) + authentication logs |
| C2 detection | Network flow + PCAP + EDR process/connection telemetry |
| Lateral movement | Authentication logs + network logs + EDR telemetry from all pivot hosts |
| Exfiltration | Proxy logs + PCAP + file access audit + staging location disk |
| Insider threat | File access audit + email logs + USB/physical access logs + disk image |

---

## STEP 3: CONTAINMENT (FOR THIS PLAYBOOK: EVIDENCE PRESERVATION)

### 3.1 Do Not Contaminate Evidence
**Critical rules before touching any evidence:**
- Never write to the original evidence (always use write blocker or forensic copy)
- Never run analysis tools directly on original evidence (work from a copy)
- Never boot from the original disk (OS writes to disk on boot)
- Never install software on the suspect system
- Never browse the web from the suspect system
- Document the system state before ANY change is made

### 3.2 Live System vs. Offline Collection Decision
| System State | Approach |
|-------------|---------|
| System is live, malware likely executing | Collect RAM + live artifacts FIRST, then image |
| System is live, no active malware | Collect live artifacts, then shutdown for disk image |
| System is already off | Disk image only (RAM data is lost) |
| System must stay live (production/critical) | Live response only (Velociraptor/KAPE) — do not power off |

### 3.3 Memory Acquisition Procedure
For live systems where malware may be memory-resident:

1. **Notify IC** — Memory acquisition takes 15-45 minutes depending on RAM size
2. **Start memory capture** — Use approved tool (WinPmem, DumpIt, Magnet RAM Capture)
3. **Do NOT interact with the system** while capture is running (minimize system activity)
4. **Hash the memory image** immediately after capture (MD5 + SHA256)
5. **Document:** Tool used, time started, time completed, file size, hash values
6. **Copy to forensic storage** — do not work from the original capture file

### 3.4 Disk Image Acquisition Procedure
1. **Shutdown system cleanly** (note: if malware is active, consider RAM first — shutdown kills memory)
2. **Remove drive** (or use live imaging if drive cannot be removed)
3. **Connect to write blocker**
4. **Verify write blocker is blocking** (read-only mode confirmed)
5. **Image to forensic storage** using FTK Imager, dd, or dcfldd
6. **Generate hash of image** (MD5 + SHA256) during or after imaging
7. **Verify hash against source** — image hash must match source hash
8. **Document:** Drive serial number, capacity, image file name, hash values, analyst, date/time
9. **Label original drive** with case number and "EVIDENCE — DO NOT MODIFY"
10. **Store original in tamper-evident bag**

### 3.5 Chain of Custody Documentation
Complete chain of custody form for every evidence item:
```
CHAIN OF CUSTODY ENTRY
Item ID: [Case Number]-[Sequential Item Number]
Item Description: [Drive/Image/USB/Server]
Date/Time Collected:
Collected By: [Analyst Name, Rank]
Collection Method: [Imaging tool, live collection tool]
Storage Location: [Forensic NAS path, physical location]
MD5 Hash:
SHA256 Hash:
Released To: [If transferred to another analyst]
Released Date/Time:
```

---

## STEP 4: ERADICATION (FOR THIS PLAYBOOK: ANALYSIS EXECUTION)

### 4.1 Analysis Environment Requirements
- Dedicated forensic workstation (isolated from production network)
- All analysis performed on COPIES — never originals
- Tools validated and licensed (commercial tools require license compliance)
- Internet access for hash lookups (VirusTotal, TI platforms) — isolated from case data

### 4.2 Memory Analysis Workflow
From memory image:
1. **Identify OS and memory profile** (required for Volatility analysis)
2. **List running processes** — identify unusual names, parent-child relationships
3. **Network connections** — what processes had open connections at time of capture
4. **DLL / injected code** — identify code injected into legitimate processes
5. **Registry hives in memory** — extract and analyze
6. **String extraction** — URL strings, C2 patterns, credentials in plaintext
7. **Malware artifacts** — unlinked processes, hidden drivers, rootkit indicators

### 4.3 Disk Analysis Workflow
From disk image:
1. **Mount image read-only** in forensic tool
2. **Parse filesystem** (identify files by extension, metadata, hash)
3. **Timeline analysis** — build event chronology from filesystem metadata ($MFT, $LogFile, $USNJrnl)
4. **Event log analysis** — extract and review Security, System, Application, PowerShell logs
5. **Registry analysis** — autorun locations, recently accessed files, user activity
6. **Prefetch analysis** — identify programs that were executed
7. **Browser artifacts** — history, downloads, cached credentials
8. **Deleted file recovery** — recover deleted malware artifacts from unallocated space
9. **String search** — search for IOCs (C2 URLs, file names, email addresses)

### 4.4 Log Analysis Workflow
From collected logs:
1. **Import into analysis tool** (ELK, Splunk, Timeline Explorer, LogParser)
2. **Establish baseline timeline** from log data
3. **Filter to incident window** (expand by 2x in both directions — attackers pre-stage)
4. **Identify attacker events** (authentication anomalies, tool execution, data access)
5. **Correlate across log sources** (endpoint + network + authentication)
6. **Build timeline** — chronological sequence of attacker actions

---

## STEP 5: RECOVERY (FOR THIS PLAYBOOK: EVIDENCE STORAGE & RETENTION)

### 5.1 Evidence Storage Requirements
- All evidence stored in access-controlled, dedicated forensic repository
- Evidence encrypted at rest (if stored digitally)
- Access log maintained — who accessed what evidence and when
- Evidence storage backup — forensic images backed up to secondary location
- Physical evidence stored in locked, access-controlled evidence locker

### 5.2 Evidence Retention Policy
| Incident Severity | Minimum Retention |
|------------------|------------------|
| CAT I (confirmed breach) | 7 years (potential criminal prosecution) |
| CAT II | 3 years |
| CAT III | 1 year |
| CAT IV | 90 days |
| Legal hold (active litigation/prosecution) | Until legal hold released |

### 5.3 Evidence Handling During Investigation
- Document every time evidence is accessed (analyst, date, purpose)
- Never email forensic images or sensitive evidence — use secure transfer
- Lock down access to evidence to need-to-know analysts
- If evidence may be used in prosecution: Legal review of handling procedures before analysis

---

## STEP 6: POST-INCIDENT ANALYSIS (FOR THIS PLAYBOOK: FORENSIC REPORT)

### 6.1 Forensic Report Structure
Every forensic analysis produces a report with the following sections:

```
1. CASE OVERVIEW
   - Incident reference number
   - Analyst name(s) and qualifications
   - Evidence received (with hashes and custody documentation)
   - Scope of analysis

2. METHODOLOGY
   - Tools used (name, version)
   - Forensic process (how evidence was collected and analyzed)
   - Limitations (what could not be analyzed and why)

3. FINDINGS
   - Chronological timeline of events
   - Malware/attacker artifacts identified
   - MITRE ATT&CK technique mapping
   - IOCs extracted (hashes, IPs, domains, file paths)

4. CONCLUSIONS
   - Answering the key investigative questions:
     - Was there a compromise? (YES/NO)
     - When did it occur?
     - What did the attacker do?
     - What data was accessed?
     - Is there residual attacker presence?

5. EVIDENCE LIST
   - All evidence items with collection metadata and hash values

6. APPENDICES
   - Detailed tool output (log excerpts, screenshots)
   - IOC tables
   - Timeline export
```

### 6.2 Forensic Report Peer Review
All forensic reports for CAT I/II incidents require:
- Primary analyst completes report
- Second analyst reviews methodology and findings
- IC/Element Lead reviews for completeness before submission

---

## STEP 7: COORDINATION & REPORTING

### 7.1 Forensic Deliverable Timeline
| Deliverable | Due | Recipient |
|-------------|-----|-----------|
| Initial findings summary | Within 4 hours of analysis start | Mission OIC, Element Lead |
| IOC list (for immediate blocking) | Within 2 hours of extraction | Network Analyst, IT Ops |
| Preliminary forensic report | Within 24 hours of analysis | Mission OIC |
| Final forensic report | Within 72 hours of analysis | Mission OIC, ARCYBER |

### 7.2 Evidence Transfer (If Required)
If evidence must be transferred (to ARCYBER, CID, FBI):
- [ ] Chain of custody form signed by both releasing and receiving parties
- [ ] Hash values confirmed by receiving party
- [ ] Physical transfer in tamper-evident packaging if physical media
- [ ] Secure file transfer (not email) for digital artifacts
- [ ] Legal review if transferring for criminal prosecution purposes

### 7.3 Analyst Testimony Preparation
If prosecution is possible, the collecting analyst may need to testify:
- Maintain detailed notes of all collection and analysis steps
- Document tool versions, settings, and outputs
- Be prepared to explain methodology in non-technical terms
- Legal review of testimony preparation process

---

## QUICK REFERENCE CARD

```
FORENSIC COLLECTION ORDER OF VOLATILITY
─────────────────────────────────────────
1. RAM (if system live — collect first)
2. Network connections (point in time — live)
3. Running processes (live)
4. Disk image (via write blocker)
5. Event logs (export)
6. Network logs (from SIEM/firewall/proxy)

NEVER:
✗ Write to original evidence
✗ Boot from original disk
✗ Run analysis on original evidence
✗ Install software on suspect system
✗ Transfer evidence without chain of custody form

ALWAYS:
✓ Hash everything (before and after)
✓ Write-block before connecting
✓ Document every action (who/what/when)
✓ Work from forensic copies
```

---

**Classification:** UNCLASSIFIED // FOUO
**Playbook ID:** IR-PB-016 | Digital Forensics & Evidence Collection
**Primary Lead:** 17C Host Analyst
**Prepared By:** CyberOpsPlanner System | **Date:** 2026-02-25
**Invoked By:** IR-PB-001, 002, 003, 006, 009, 010, 012 (and any incident requiring forensic evidence)
**Reference:** `docs/technical/SOP/Playbooks NOV/Host_Analysis_Playbook.docx`
