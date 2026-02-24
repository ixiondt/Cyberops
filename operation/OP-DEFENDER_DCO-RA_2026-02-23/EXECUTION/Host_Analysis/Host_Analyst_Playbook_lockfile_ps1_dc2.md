# HOST ANALYST PLAYBOOK: lockfile.ps1 Analysis
## OP-DEFENDER DCO-RA / dc2 (Domain Controller) / 2026-02-23
### Comprehensive Forensic Methodology for PowerShell Persistence Investigation

**Classification:** UNCLASSIFIED // FOUO
**Authority:** OPORD 26-02 / ARCYBER DCO-RA
**Incident Reference:** INCIDENT-001 / POAM-001 / POAM-002
**Playbook Owner:** CPT 173 Host Analyst Team
**Created:** 2026-02-23

---

## EXECUTIVE SUMMARY

**Incident:** Suspicious PowerShell script (`lockfile.ps1`) discovered on dc2 (BPEnergy Domain Controller)

**Severity:** 🔴 **CRITICAL** — Domain controller compromise threatens entire network infrastructure

**Threat Classification:** APT41 Persistence Mechanism (Suspected)

**Analyst Objective:** Determine if `lockfile.ps1` is:
1. Malicious persistence tool (primary hypothesis)
2. Legitimate system utility (low probability)
3. Dormant implant or staging tool (secondary hypothesis)

**Analysis Timeline:**
- **Phase 1 (Now → +24h):** Artifact extraction, static analysis, code review, IOC extraction
- **Phase 2 (+24h → +48h):** Scope determination, lateral movement assessment, credential compromise analysis
- **Phase 3 (+48h → +72h):** Attribution confirmation, threat intelligence correlation, remediation planning

**Analyst Authority:**
- Access: Full forensic access to dc2 (coordinate via OPORD 26-02 Annex L)
- Timeline: Completion target 2026-02-24 06:00 UTC (Phase 1)
- Tools: EDR/SIEM, Sysinternals, Velociraptor, Wireshark, Ghidra, REMnux sandbox
- Escalation: Any positive indicators → ARCYBER/Mission OIC within 30 minutes

---

## PART 1: INITIAL ARTIFACT ASSESSMENT

### Step 1.1: Artifact Identification & Collection

**Objective:** Safely identify and collect `lockfile.ps1` while preserving forensic integrity.

#### Location & File Metadata

```
File Name:          lockfile.ps1
Expected Location:  [Determine via EDR/SIEM logs]
Possible Locations:
  - C:\Windows\System32\
  - C:\Windows\Tasks\
  - C:\ProgramData\
  - C:\Users\[Service Accounts]\AppData\
  - %TEMP% directories
  - C:\scripts\ or similar (admin-created locations)
```

**Forensic Collection Procedure:**

1. **Hash the file BEFORE collection:**
   ```
   MD5:    [Calculated by analyst]
   SHA256: [Calculated by analyst]
   SSDEEP: [Calculated by analyst - fuzzy hash for comparison]
   ```

2. **Preserve file metadata:**
   - Creation Time (CRTIME)
   - Modification Time (MTIME)
   - Access Time (ATIME)
   - Change Time (CTIME)
   - Owner/Permissions
   - Alternate Data Streams (check for hidden content: `dir /R`)

3. **Copy to isolated analysis system:**
   - Never execute on production dc2
   - Isolate in air-gapped sandbox or VM
   - Maintain chain of custody documentation

4. **Document discovery context:**
   - How was it found? (EDR alert, manual scan, hunting, threat intelligence?)
   - Who found it? (Analyst name/team)
   - When was it found? (Exact timestamp)
   - Any related alerts or events at discovery time?

**Collection Checklist:**
- [ ] File hashed (MD5, SHA256, SSDEEP)
- [ ] Metadata captured
- [ ] File copied to isolated analysis system
- [ ] Chain of custody documented
- [ ] Backup copy stored in EXECUTION folder
- [ ] Permission verified (read-only)

---

### Step 1.2: Filename & Location Analysis

**Analysis Question:** Why "lockfile" on a domain controller, and what does the name suggest?

#### Filename Significance

```
Filename Pattern:  lockfile.ps1
Category:          Suspicious/Obfuscated
Reasons:
  - "lock" prefix suggests: file encryption, file locking, ransomware, or mutex/sync
  - Generic naming convention (not specific function name)
  - NOT typical Windows utility (calc.exe, svchost.exe, etc.)
  - Common APT obfuscation pattern (generic names to avoid detection)
```

**Hypothesis Generation:**

| Hypothesis | Likelihood | Reasoning |
|-----------|-----------|-----------|
| **Ransomware/Encryption Tool** | MEDIUM | "lockfile" suggests file locking or encryption |
| **Persistence Scheduler** | HIGH | PowerShell on DC typically used for scheduled execution |
| **Credential Harvester** | HIGH | DC compromise allows harvesting domain credentials |
| **C2 Loader/Beacon** | MEDIUM | PowerShell common for downloading additional malware |
| **Reconnaissance Tool** | MEDIUM | APT41 uses PowerShell for Active Directory enumeration |
| **Lateral Movement Script** | MEDIUM | PowerShell used for SMB/RDP lateral movement |
| **Benign Admin Script** | LOW | Unlikely - no legitimate reason for "lockfile.ps1" on DC |

#### Location Risk Assessment

```
dc2 (Domain Controller) = CRITICAL RISK
  ├─ Authenticates all domain users
  ├─ Stores user password hashes
  ├─ Manages group policies
  ├─ Controls kerberos tickets
  ├─ Synchronizes to cloud AAD (if hybrid)
  └─ If compromised: attacker controls entire network

PowerShell on DC = APT41 SIGNATURE TTP
  ├─ T1059: PowerShell execution
  ├─ T1053: Scheduled task scheduling
  ├─ T1047: WMI object creation (possible)
  └─ T1078: Valid account abuse (DC credentials available)
```

**Location Assessment:** 🔴 **CRITICAL RISK** — PowerShell on DC in APT41 context is advanced threat indicator.

---

### Step 1.3: Artifact Size & Encoding Assessment

**Objective:** Determine file size, encoding, and potential obfuscation.

#### File Size Analysis

```
Expected Size Ranges:
  - Empty or minimal (<1KB):       Possible launcher/stub
  - Small (1-10KB):               Common for PowerShell tools
  - Medium (10-100KB):            Possible binary blob or base64 payload
  - Large (>100KB):               Unlikely unless includes external data

Actual Size: [Analyst to determine]
Assessment: [Compare to benchmarks above]
```

**Interpretation:**
- **Very small:** Script may be installer that downloads actual payload
- **Large:** May contain binary payloads (obfuscated executables) or large data blobs
- **Medium:** Typical for APT41 PowerShell tools

#### Encoding Detection

```
Check for:
  - UTF-8 vs UTF-16 encoding
  - BOM (Byte Order Mark) presence
  - Non-ASCII characters (indicates encoding)
  - Base64 blobs (common in obfuscated PowerShell)
  - GZIP or other compression
```

**Command to Assess:**
```powershell
# File encoding
file lockfile.ps1

# Check for base64
strings lockfile.ps1 | grep -E "^[A-Za-z0-9+/]{50,}={0,2}$"

# Check for common obfuscation patterns
strings lockfile.ps1 | grep -i "invoke\|iex\|downloadstring"
```

---

## PART 2: STATIC ANALYSIS (NO EXECUTION)

### Step 2.1: Baseline IOC Extraction

**Objective:** Extract indicators of compromise WITHOUT executing the script.

#### Command Reference Extraction

**PowerShell IOC Categories:**

```
1. COMMAND EXECUTION
   Pattern: Invoke-Expression, IEX, & $(), Invoke-WebRequest
   Risk: Script downloads/executes external content
   Action: Extract URLs, C2 addresses, command chains

2. PERSISTENCE INSTALLATION
   Pattern: New-ScheduledTask, Register-ScheduledJob, WMI subscriptions
   Risk: Establishes long-term presence
   Action: Extract task names, trigger times, execute paths

3. CREDENTIAL ACCESS
   Pattern: Get-ADUser, Invoke-Mimikatz, LSASS dumping, registry hives
   Risk: Domain credential compromise
   Action: Identify target credentials/accounts

4. LATERAL MOVEMENT
   Pattern: Invoke-Command, New-PSSession, SMB connections, pass-the-hash
   Risk: Spreads to other systems
   Action: Identify target systems/IPs

5. ANTI-FORENSICS
   Pattern: Remove-Item, Clear-EventLog, Disable-PSLogging
   Risk: Covers attacker tracks
   Action: Document evasion techniques
```

#### IOC Extraction Methods (Static)

**Method 1: String Extraction**
```bash
# Extract all strings
strings lockfile.ps1 > lockfile_strings.txt

# Search for common IOCs
grep -E "http|ftp|smb|\\\\\\\\|cmd|powershell|invoke" lockfile_strings.txt

# Look for domains/IPs
grep -E "[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}|[a-z]+\.[a-z]{2,}" lockfile_strings.txt
```

**Method 2: Code Review (Manual)**
- Open lockfile.ps1 in text editor (NOT PowerShell ISE yet)
- Scan for command keywords: `Invoke-`, `IEX`, `cmd.exe`, `wget`, `curl`, `New-ScheduledTask`, etc.
- Extract any URLs, domains, IP addresses
- Identify file paths, registry paths, usernames
- Document all external references

**Method 3: YARA Rules Matching**
```bash
# If available, run APT41-specific YARA rules
yara -r apt41_powershell_rules.yar lockfile.ps1

# Document any matches - indicate malware families
```

#### IOC Extraction Template

| IOC Type | Value | Source Line | Risk Level | Notes |
|----------|-------|------------|-----------|-------|
| URL | [example.com] | Line 45 | HIGH | C2 callback? |
| IP Address | [192.168.x.x] | Line 23 | MEDIUM | Internal or external? |
| Registry Path | [HKLM\...] | Line 12 | HIGH | Persistence mechanism |
| Scheduled Task | [TaskName] | Line 78 | HIGH | Execution trigger |
| Credential Target | [Domain\Admin] | Line 56 | CRITICAL | Domain admin? |
| File Path | [C:\Windows\...] | Line 34 | MEDIUM | Installation location |

---

### Step 2.2: Code Deobfuscation (If Necessary)

**Objective:** If PowerShell is obfuscated, decode to readable form.

#### Obfuscation Detection

```
Signs of Obfuscation:
  ✓ Hex encoding: 0x48 0x65 0x6C 0x6C 0x6F
  ✓ Base64 strings: TVq... or similar long encoded text
  ✓ Variable string concatenation: $a+$b+$c (reconstructs commands)
  ✓ Replaced keywords: "In`v`oke-Webrequest" (backtick escapes)
  ✓ Encoded character replacement: char(65)+char(66) = "AB"
  ✓ Logic obfuscation: Multiple conditionals obscuring true flow
```

#### Deobfuscation Tools & Techniques

**Tool 1: PowerShell Script Analyzer (Built-in)**
```powershell
# Run in ISOLATED VM - NOT on dc2!
# Use constrained language mode
$ExecutionPolicy = 'Bypass'
Unblock-File lockfile.ps1
# DO NOT RUN - just analyze structure
# Get-Content lockfile.ps1 | Measure-Object -Character
```

**Tool 2: Online Deobfuscators (Use with Caution)**
- CyberChef (gchq.github.io/CyberChef) - for hex/base64 decoding
- Dognaedis PowerShell Encoder (if available)
- Manual analysis in text editor

**Tool 3: REMnux Sandbox**
- Copy lockfile.ps1 to REMnux isolated VM
- Use PowerShell analysis tools in controlled environment
- Review deobfuscated output

#### Deobfuscation Process

```
Step 1: Identify obfuscation type (hex, base64, variable reconstruction, etc.)
Step 2: Extract encoded payload/commands
Step 3: Decode using appropriate tool
Step 4: Analyze decoded content for malicious patterns
Step 5: Document original vs. deobfuscated comparison
```

**Deobfuscation Documentation Template:**

```
Original (First 500 chars):
[Paste obfuscated code excerpt]

Deobfuscation Method Used:
[Hex decoding / Base64 decoding / Variable analysis / Other]

Deobfuscated Output:
[Paste decoded code]

Analysis of Deobfuscated Content:
[Identify commands, C2, persistence mechanisms, credential access, etc.]
```

---

### Step 2.3: Malware Analysis Submission & Hashing

**Objective:** Determine if `lockfile.ps1` is known malware.

#### VirusTotal Submission

```
IF NOT PREVIOUSLY SUBMITTED:
1. Visit virustotal.com (Web interface or API)
2. Upload lockfile.ps1 (SHA256 hash)
3. Wait for scan results (may take 2-5 minutes)
4. Document results:
   - Detection ratio (X/Y vendors detected as malicious)
   - Detected as: [Malware family name]
   - Vendor detections: [List vendors identifying it]
```

#### Interpretation Guide

| Detection Ratio | Interpretation | Action |
|----------------|----------------|--------|
| 0/X (No detections) | Unknown malware OR benign | Proceed to manual analysis |
| 1-3/X (Few detections) | Likely malware, unknown variant | Escalate to malware team |
| 4-10/X (Multiple detections) | Probable malware | ESCALATE - CRITICAL |
| 10+/X (High detections) | Known malware family | ESCALATE - CRITICAL |

#### YARA Rule Matching

```
If YARA rules available for APT41 malware families:
  - ShadowPad detection rules
  - Winnti variant rules
  - Custom PowerShell rules

Run: yara -r apt41_rules.yar lockfile.ps1
Document any positive matches
```

#### Threat Intelligence Correlation

**Check Against Known Indicators:**
- APT41 IOC databases (if available internally)
- MITRE ATT&CK APT41 group profile
- CISA/FBI alerts for APT41 activity
- Commercial threat intel feeds (if subscribed)

**Correlation Template:**

| Data Source | Match? | Reference | Confidence |
|------------|--------|-----------|-----------|
| VirusTotal | [Yes/No] | [Detection names] | [High/Medium/Low] |
| YARA Rules | [Yes/No] | [Rule name] | [High/Medium/Low] |
| MITRE ATT&CK | [Yes/No] | [TTP/Group] | [High/Medium/Low] |
| CISA Alerts | [Yes/No] | [Alert reference] | [High/Medium/Low] |
| Internal IOCs | [Yes/No] | [IOC match] | [High/Medium/Low] |

---

### Step 2.4: PowerShell Code Review (Manual Analysis)

**Objective:** Analyze PowerShell code for malicious functionality.

#### Code Review Methodology

**Stage 1: High-Level Structure (5 minutes)**
- Read through entire script (if < 500 lines)
- Identify major sections/functions
- Look for obvious malicious patterns:
  - `Invoke-Expression` / `IEX` (dynamic execution)
  - `DownloadString` / `DownloadFile` (external downloads)
  - `New-ScheduledTask` (persistence)
  - `Start-Process` (command execution)

**Stage 2: Functional Analysis (15 minutes)**
- For each major section, identify purpose:
  ```
  Section 1: Initialization/setup - check for C2 server setup
  Section 2: Main logic - check for credential access or lateral movement
  Section 3: Persistence - check for scheduled task or registry modifications
  Section 4: Cleanup/anti-forensics - check for log deletion
  ```

**Stage 3: Command Tracing (30 minutes)**
- Trace execution flow from entry point
- For each command, identify:
  - What does it do?
  - What data does it operate on?
  - Where does it send data?
  - What persistence does it install?

**Stage 4: IOC/TTP Documentation (15 minutes)**
- Compile all identified malicious indicators
- Cross-reference with MITRE ATT&CK tactics
- Create risk assessment

#### Code Review Template

```markdown
## Function: [Function Name]
**Line Numbers:** [Start-End]
**Purpose:** [What the function does]

### Code Snippet:
[Paste relevant code]

### Analysis:
- Command: [Command used]
- Arguments: [Arguments passed]
- Target: [What system/data does it affect]
- Risk: [HIGH/MEDIUM/LOW]
- MITRE ATT&CK: [Relevant techniques]

### Interpretation:
[Analyst's interpretation of what this does]

---
```

#### Common Malicious PowerShell Patterns

| Pattern | Malicious Indicator | Example |
|---------|-------------------|---------|
| `Invoke-Expression` | High - allows dynamic code execution | `IEX $downloaded_code` |
| `DownloadString` | High - downloads external content | `IEX (New-Object Net.WebClient).DownloadString('http://...'))` |
| `New-ScheduledTask` | High - persistence mechanism | Creates task running every hour |
| `HKLM:\Software\Microsoft\Windows\Run` | High - registry persistence | Adds to AutoRun keys |
| `WMI Event Subscription` | HIGH - sophisticated persistence | Registers for system event to trigger |
| `Mimikatz` | CRITICAL - credential theft | `Invoke-Mimikatz -Command '...'` |
| `Get-ADUser` / `Get-ADComputer` | HIGH - reconnaissance | Enumerates Active Directory |
| `SMBClient` / `Invoke-Command` | HIGH - lateral movement | Moves to other systems |
| `Clear-EventLog` | HIGH - anti-forensics | Deletes evidence |

---

## PART 3: TIMELINE RECONSTRUCTION & FORENSIC ANALYSIS

### Step 3.1: File System Timeline Analysis

**Objective:** Determine when `lockfile.ps1` was created, modified, and potentially executed.

#### File Timestamps

```
Timeline to collect from lockfile.ps1 file:

CRTIME (Creation Time):  [When file first created]
MTIME (Modification):    [When file last modified]
ATIME (Access Time):     [When file last read]
CTIME (Change Time):     [When metadata changed]

Analysis:
  - Creation time = approximate compromise date
  - Recent modification = recent attacker activity
  - Access time = execution attempts
```

#### Collect from File System Artifacts

**Forensic Sources on dc2:**

1. **Master File Table (MFT) Analysis** (requires disk-level forensics)
   - Copy MFT from Windows partition
   - Parse with tools: Sleuthkit, EverUtils, or PowerForensics
   - Recover full timeline of file operations

2. **NTFS Change Journal** ($UsnJrnl)
   - Records all file modifications on system
   - Extract timestamps for lockfile.ps1 and related files
   - Available via: `fsutil usn readjournal`

3. **File Characteristics from EDR**
   - Check Microsoft Defender for file metadata
   - Query Velociraptor on dc2 for file timestamps
   - Cross-reference with any file access logs

#### Timeline Hypothesis

```
Likely Timeline Pattern:

Day 1: Initial compromise → PowerShell script written/deployed to dc2
       CRTIME: [Date/time of compromise window]

Days 1-N: Script dormant or periodically executed
          ATIME updates, potentially MTIME changes

Current: Script discovered during forensic scan
         [Current date/time]

Implications:
  - How long has attacker had dc2 access?
  - Is script actively used or dormant?
  - Are there other artifacts from same timeframe?
```

---

### Step 3.2: Windows Event Log Analysis

**Objective:** Correlate PowerShell execution with Windows event logs.

#### Event Log Sources on dc2

```
Key Event Logs for PowerShell Persistence Analysis:

Security Event Log (Event ID Reference):
  - 1202: Scheduled task created
  - 4688: Process creation (cmd.exe, powershell.exe)
  - 4689: Process terminated
  - 4697: Firewall rule added
  - 4698: Scheduled task created (modern)
  - 4702: Scheduled task updated

System Event Log:
  - 7001: User logon/logoff
  - 7002: Service started/stopped
  - 7011: Scheduled task execution

Application Event Log:
  - PowerShell event logs (if enabled)

PowerShell Event Log (if enabled):
  - Event ID 400: Engine started
  - Event ID 403: Engine stopped
  - Event ID 4103: Script block execution
  - Event ID 4104: Detailed script execution
```

#### Event Log Extraction & Analysis

**Task 1: Scheduled Task Events**

```powershell
# Query for scheduled task creation around lockfile.ps1 creation time
# Look for Event ID 1202 or 4698
Get-WinEvent -LogName Security -FilterXPath "*[System[(EventID=1202 or EventID=4698)]]" |
  Where-Object {$_.TimeCreated -gt [DateTime]"2026-02-20" -and $_.TimeCreated -lt [DateTime]"2026-02-24"} |
  Format-List *

# Search for task names containing "lock", "file", "task", or other suspicious names
```

**Task 2: PowerShell Execution Events**

```powershell
# If PowerShell event logging enabled:
Get-WinEvent -LogName "Windows PowerShell" -FilterXPath "*[System[(EventID=400 or EventID=403 or EventID=4104)]]" |
  Where-Object {$_.TimeCreated -gt [DateTime]"2026-02-20"} |
  Select-Object -Property TimeCreated, EventID, Message |
  Where-Object {$_.Message -like "*lockfile*"}
```

**Task 3: Process Creation Audit (Event ID 4688)**

```powershell
# Look for powershell.exe or cmd.exe executions
Get-WinEvent -LogName Security -FilterXPath "*[System[(EventID=4688)]]" |
  Where-Object {$_.TimeCreated -gt [DateTime]"2026-02-20" -and ($_.Message -like "*powershell*" -or $_.Message -like "*cmd*")} |
  Format-Table TimeCreated, Message
```

#### Event Log Analysis Template

| Event ID | Time | Event Type | Command/Details | Risk Assessment |
|----------|------|-----------|-----------------|-----------------|
| 4688 | [Time] | Process Create | powershell.exe | HIGH - script execution |
| 1202 | [Time] | Scheduled Task | lockfile_task | CRITICAL - persistence |
| 4688 | [Time] | Process Create | cmd.exe /c [command] | HIGH - command execution |

---

### Step 3.3: PowerShell Execution History

**Objective:** Find evidence of PowerShell script execution on dc2.

#### PowerShell History Sources

```
Source 1: $PROFILE History (User-level)
  Location: %APPDATA%\Microsoft\Windows\PowerShell\PSReadline\ConsoleHost_history.txt
  Content: Commands user typed in PowerShell ISE/Console

Source 2: PowerShell Event Log (System-level)
  Location: Windows Powershell event log
  Event ID 4103-4104: Script block logging (if enabled)

Source 3: Security Event Log
  Event ID 4688: Process creation with command line

Source 4: Transcript Logs (if enabled)
  $PROFILE might reference transcript location
  Location: Varies, often in user temp or home directory
```

#### Transcript Analysis

```powershell
# Search for PowerShell transcript files
Get-Item -Path "C:\Users\*\*\*.log" -Include "*PowerShell*", "*Transcript*"
Get-Item -Path "C:\Windows\Temp\*" -Include "*PowerShell*", "*Transcript*"

# If found, analyze content:
Get-Content [transcript_file] | Select-String "lockfile" -Context 5,5
```

#### ScriptBlock Logging (If Enabled)

```
If organization has enabled PowerShell ScriptBlock Logging:
  - Every PowerShell command executed is logged to Event ID 4104
  - Can reconstruct exact commands run by analyzing logs

Check registry:
  HKLM\Software\Policies\Microsoft\Windows\PowerShell\ScriptBlockLogging
  Value: EnableScriptBlockLogging = 1 (enabled)
```

**If found, analyze for:**
- Commands that created scheduled tasks
- Commands that accessed credentials
- Commands that connected to remote systems
- Timeframe of execution

---

### Step 3.4: Registry Analysis (Persistence Mechanisms)

**Objective:** Find registry artifacts indicating persistence installation.

#### Registry Persistence Locations

```
CRITICAL Persistence Registry Paths to Check:

1. RUN KEYS (Auto-start on logon)
   HKLM\Software\Microsoft\Windows\CurrentVersion\Run
   HKLM\Software\Microsoft\Windows\CurrentVersion\RunOnce
   HKCU\Software\Microsoft\Windows\CurrentVersion\Run

   Search: Look for "lockfile" or suspicious script paths

2. SCHEDULED TASK REGISTRY
   HKLM\Software\Microsoft\Windows NT\CurrentVersion\Schedule\TaskCache\Tasks
   HKLM\Software\Microsoft\Windows NT\CurrentVersion\Schedule\TaskCache\Tree

   Search: Look for lockfile or scripts executing lockfile.ps1

3. WMI EVENT SUBSCRIPTIONS
   HKLM\Software\Classes\__FilterToConsumerBinding
   HKLM\Software\Classes\__EventFilter

   Search: Indicates WMI-based persistence

4. SHELL EXTENSIONS
   HKLM\Software\Microsoft\Windows\CurrentVersion\ShellServiceObjectDelayLoad

   Search: Legitimate shell extensions vs. malicious ones

5. SERVICES
   HKLM\System\CurrentControlSet\Services

   Search: Malicious service installation (rare for PowerShell but check)
```

#### Registry Query Commands

```powershell
# Scan Run keys for lockfile references
Get-ItemProperty -Path "HKLM:\Software\Microsoft\Windows\CurrentVersion\Run" |
  Select-Object @{Name="Value";Expression={$_ | ConvertTo-Json}} |
  Where-Object {$_.Value -like "*lockfile*" -or $_.Value -like "*powershell*"}

# Scan scheduled task registry
Get-Item -Path "HKLM:\Software\Microsoft\Windows NT\CurrentVersion\Schedule\TaskCache\Tasks\*" |
  Get-ItemProperty | Where-Object {$_.PSPath -like "*lockfile*"}

# Export full registry hive for offline analysis
reg export HKLM C:\forensics\HKLM.reg
reg export HKCU C:\forensics\HKCU.reg
```

#### Registry Timeline Analysis

```
For each registry persistence found:

1. Determine when key was written:
   - Registry key LastWrite time (metadata)
   - Indicates when persistence was installed

2. Timeline correlation:
   - Matches with file creation time?
   - Matches with first suspicious event log entry?
   - Indicates coordinated compromise activity

3. Attribution:
   - User account that made registry change
   - System context (SYSTEM vs. user account)
   - Indicates privilege level of attacker
```

#### Registry Analysis Template

| Registry Path | Value/Entry | Data | Last Write Time | Risk | Notes |
|---------------|------------|------|-----------------|------|-------|
| HKLM\...\Run | lockfile_task | C:\...\lockfile.ps1 | 2026-02-22 14:30 | CRITICAL | Persistence |

---

## PART 4: SCOPE DETERMINATION & LATERAL MOVEMENT ASSESSMENT

### Step 4.1: Network Connections Analysis

**Objective:** Determine if dc2 was used for lateral movement or C2 callbacks.

#### Network Forensics Sources

```
Data Sources on dc2:

1. Netstat/Network Statistics (from EDR/SIEM)
   - Active connections at time of incident
   - Remote IPs/ports connected to

2. Windows Firewall Logs
   - Outbound connections blocked/allowed
   - Timeline of network activity

3. DNS Query Logs
   - Domains queried by dc2
   - Indicates C2 domains, data exfiltration targets

4. Proxy/SIEM Logs
   - HTTP/HTTPS traffic from dc2
   - Any outbound data transfers

5. Zeek/Network IDS Logs
   - Beaconing patterns
   - Suspicious protocols
   - Data volume anomalies
```

#### Network Connection Analysis

**Task 1: Identify Outbound Connections**

```powershell
# From EDR/SIEM, query network connections from dc2:
# Look for:
#   - Non-standard ports (unusual outbound)
#   - External IPs (outside corporate ranges)
#   - Beaconing patterns (regular interval connections)

# If available, query netstat history:
Get-NetTCPConnection | Where-Object {$_.State -eq "Established" -and $_.RemoteAddress -notlike "192.168.*"} |
  Format-Table LocalAddress, LocalPort, RemoteAddress, RemotePort
```

**Task 2: DNS Query Analysis**

```
Query DNS logs for dc2 around lockfile.ps1 creation time:
- Domains queried by dc2
- Any suspicious C2 domains?
- Any data exfiltration domains?

Example suspicious patterns:
  - Random-looking subdomains (domain generation algorithm - DGA)
  - Frequency: queries every X minutes (beaconing)
  - External DNS servers (bypassing corporate DNS)
```

**Task 3: SMB Session Analysis**

```
Search for SMB connections from dc2 to other systems:
- net sessions output (if available historically)
- SMB 445 connections to other servers
- Indicates lateral movement attempts

Red flags:
  - Connections to workstations (unusual for DC)
  - Connections to non-domain systems
  - Connection times outside business hours
```

#### Network Connection Documentation

| Destination IP | Destination Port | Protocol | Time | Volume | Risk Assessment |
|----------------|-----------------|----------|------|--------|-----------------|
| 192.168.1.x | 445 | SMB | [Time] | [MB] | Lateral move attempt? |
| 10.x.x.x | 443 | HTTPS | [Time] | [MB] | C2 callback? |
| [External IP] | 53 | DNS | [Time] | [KB] | DGA callback? |

---

### Step 4.2: Credential Compromise Assessment

**Objective:** Determine if domain credentials were harvested from dc2.

#### Credential Access Indicators on DC

```
Domain Controller Critical Credentials:

1. Domain Admin Accounts
   - Administrator (SID: -500)
   - Service accounts with domain admin privileges

2. Service Accounts
   - KRBTGT (Kerberos Account - if compromised = game over)
   - Directory Sync accounts (Azure AD Connect)
   - Managed Service Accounts (MSAs)

3. User Credentials
   - Local cached credentials
   - Kerberos tickets (in-memory)
```

#### Credential Harvesting Methods (Check for Evidence)

```
Method 1: LSASS Memory Dump
  - Evidence: lsass.exe process dumped via MiniDump
  - Location: Temporary files with lsass dump
  - Check: Task Manager history, file system artifacts

Method 2: Registry Hive Extraction
  - Evidence: SAM, SECURITY, SYSTEM hives copied
  - Location: Temporary directories, removable media
  - Check: Registry hive copy commands in logs

Method 3: Active Directory Database Dump
  - Evidence: ntds.dit copied/accessed
  - Location: Shadow copy access, ntds.dit cache
  - Check: VSS (Volume Shadow Copy) access logs

Method 4: Kerberos Ticket Harvesting
  - Evidence: Kerberos tickets exported
  - Tool: Mimikatz, Invoke-Rubeus
  - Check: Process execution logs, memory dumps
```

#### Credential Compromise Check Procedure

```powershell
# 1. Check for credential dumping tools on dc2
Get-Process | Where-Object {$_.ProcessName -like "*lsass*" -or $_.Name -like "*mimikatz*"}

# 2. Check for SAM/SECURITY hive access
Get-WinEvent -LogName Security -FilterXPath "*[System[(EventID=4656 or EventID=4663)]]" |
  Where-Object {$_.Message -like "*SAM*" -or $_.Message -like "*SECURITY*"} |
  Format-List TimeCreated, Message

# 3. Check for NTDS.DIT access
Get-WinEvent -LogName Security |
  Where-Object {$_.Message -like "*ntds.dit*"} |
  Format-List TimeCreated, Message

# 4. Check for domain user enumeration
Get-WinEvent -LogName Security |
  Where-Object {$_.Message -like "*Get-ADUser*"} |
  Format-List TimeCreated, Message

# 5. Check DC password last changed
Get-ADUser -Identity "Administrator" -Properties PasswordLastSet |
  Select-Object Name, PasswordLastSet
```

#### Credential Assessment Decision Tree

```
Question 1: Is LSASS memory dump evidence found?
  YES → Assume credentials harvested (CRITICAL - force domain password reset)
  NO  → Continue to Question 2

Question 2: Is ntds.dit access in logs?
  YES → Assume AD credentials harvested (CRITICAL - force all password resets)
  NO  → Continue to Question 3

Question 3: Is Mimikatz or credential dumping tool found?
  YES → Assume credentials at risk (HIGH - monitor for unauthorized use)
  NO  → Likely credential access NOT primary objective

Conclusion: [Credential compromise assessment]
Risk: [CRITICAL / HIGH / MEDIUM / LOW]
```

---

### Step 4.3: Lateral Movement Path Analysis

**Objective:** Determine if attacker used dc2 to move to other systems.

#### Lateral Movement Investigation

```
From dc2 Compromise, Attacker Can:

1. Leverage DC credentials to authenticate to:
   - All domain-joined workstations
   - Cloud services (if Azure AD sync enabled)
   - OT management network
   - Production servers

2. Use kerberos tickets to access:
   - File servers (SMB)
   - Remote Desktop (RDP)
   - SQL Servers
   - Web services

3. Deploy additional malware via:
   - Group Policy (if DC not isolated)
   - WMI (if WMI not restricted)
   - PSEXEC/SMB lateral movement
```

#### Investigation Checklist

- [ ] Check dc2 audit logs for authentication to other systems (Event ID 4776, 4768)
- [ ] Check other systems' logs for authentication FROM dc2
- [ ] Query network logs for SMB/RDP sessions initiated from dc2
- [ ] Check for Group Policy modifications from dc2 around lockfile.ps1 timeframe
- [ ] Scan other systems for similar PowerShell scripts or artifacts
- [ ] Check for remote execution evidence (WMI, PSEXEC, scheduled tasks from dc2)

#### Lateral Movement Assessment Template

| Target System | Connection Type | Time | Result | Evidence |
|---------------|-----------------|------|--------|----------|
| [Workstation] | SMB 445 | [Time] | Success? | [Log entry] |
| [Server] | RDP 3389 | [Time] | Success? | [Log entry] |

---

## PART 5: DYNAMIC ANALYSIS (SAFE EXECUTION IN SANDBOX)

### Step 5.1: Isolated Sandbox Execution

**CRITICAL WARNING:** Do NOT execute on dc2 or production network.

#### Sandbox Setup

```
Requirement: Air-gapped virtual machine
  - No network connectivity
  - Isolated from production dc2
  - Network monitoring enabled
  - Process monitoring enabled
  - File system monitoring enabled

Sandbox Options:
  1. Cuckoo Sandbox (automated analysis)
  2. REMnux (manual analysis capability)
  3. Isolated Windows VM with tools
```

#### Pre-Execution Checklist

- [ ] VM isolated from network
- [ ] Snapshot created (revert after execution)
- [ ] Monitoring tools running (Procmon, Regshot, API Monitor)
- [ ] Network traffic capture running (if safe to enable)
- [ ] Execution time logged

#### Cuckoo Sandbox Execution

```bash
# If Cuckoo available:
cuckoo submit lockfile.ps1

# Wait for analysis to complete
# Review report for:
#   - Files created/modified
#   - Registry changes
#   - Network connections attempted
#   - Processes spawned
#   - Capabilities detected
```

#### Manual Sandbox Analysis (REMnux)

```
Steps:
1. Copy lockfile.ps1 to REMnux
2. Enable monitoring (Procmon, Regshot, netcat sniffing)
3. Execute: powershell -ExecutionPolicy Bypass -File lockfile.ps1
4. Monitor behavior for 5-10 seconds
5. Capture output, network connections, file/registry changes
6. Terminate script (Ctrl+C)
7. Review logs
```

#### Sandbox Analysis Documentation

```
Execution Results:

Time Started: [Time]
Time Ended: [Time]
Exit Code: [0=success, other=error]

Files Created:
  [List files created]

Registry Keys Modified:
  [List registry modifications]

Processes Spawned:
  [List child processes]

Network Connections:
  [List any attempted connections]

Error/Warning Messages:
  [Any errors during execution]

Overall Assessment:
  [What did the script try to do?]
```

---

### Step 5.2: Detonation Analysis (If Malware)

**Objective:** Safely understand malware behavior through controlled execution.

#### Detonation Monitoring

```
Tools to Run During Execution:

1. Process Monitor (Procmon)
   - Logs: Process creation, DLL loading, file I/O, registry access

2. Regshot
   - Before/after registry comparison
   - Shows all registry modifications

3. Network Monitor
   - Captures all network packets
   - Shows attempted connections, protocols, data

4. File System Monitor
   - Documents all file creation/modification

5. API Monitor (if available)
   - Logs API calls (Windows API, network API, registry API)
```

#### Behavioral Analysis Output

```
If Malware Detonates:

Capabilities Observed:
  ☐ Persistence installation (scheduled task, registry run key, WMI)
  ☐ Credential harvesting (LSASS, SAM, ntds.dit)
  ☐ C2 communication (network callbacks)
  ☐ Lateral movement (SMB, RDP, psexec)
  ☐ Data exfiltration (outbound data, file staging)
  ☐ Anti-forensics (log deletion, artifact removal)
  ☐ Privilege escalation (UAC bypass, token elevation)

Specific Indicators:
  - C2 IP/Domain: [If found]
  - Persistence Location: [If found]
  - Staged Malware: [If found]
  - Exfil Data: [If found]
```

---

## PART 6: ATTRIBUTION & THREAT INTELLIGENCE CORRELATION

### Step 6.1: APT41 Attribution Assessment

**Objective:** Correlate findings with known APT41 TTPs and infrastructure.

#### APT41 TTP Correlation

```
Known APT41 Tactics (From MITRE ATT&CK):

T1053: Scheduled Task/Job
  ✓ APT41 uses scheduled tasks for persistence
  Finding: lockfile.ps1 installed as scheduled task?
  Match: HIGH if confirmed

T1047: Windows Management Instrumentation (WMI)
  ✓ APT41 uses WMI subscriptions for sophisticated persistence
  Finding: WMI event subscription for lockfile.ps1?
  Match: HIGH if confirmed

T1059: PowerShell Execution
  ✓ APT41 commonly uses PowerShell for post-exploitation
  Finding: PowerShell script in discovery
  Match: HIGH - signature TTP

T1197: LSASS Memory Dump (Credential Access)
  ✓ APT41 dumps LSASS for credential harvesting
  Finding: LSASS dump evidence?
  Match: HIGH if confirmed

T1014: Rootkit Installation
  ✓ APT41 uses kernel-mode rootkits (Winnti)
  Finding: Kernel-mode implant?
  Match: MEDIUM - requires reverse engineering
```

#### IOC Correlation with Known APT41 Infrastructure

```
Known APT41 Indicators (If Available):

C2 Infrastructure:
  Known APT41 C2 IPs/Domains: [From threat intel]
  Extracted from lockfile.ps1: [From static analysis]
  Match: [Yes/No]

Malware Families:
  Known APT41 families: ShadowPad, Winnti, DEADEYE, KEYPLUG
  Identified in lockfile.ps1: [From analysis]
  Match: [Yes/No/Suspicious]

Targeting Pattern:
  Known APT41 targets: Defense contractors, IP theft, CI
  BPEnergy: Defense contractor, critical energy infrastructure
  Match: YES - perfectly aligned with APT41 targeting
```

#### Attribution Confidence Assessment

```
Attribution Scoring (0-100):

Infrastructure IOC Matches:        [0-25 points]
Malware Family Identification:     [0-25 points]
TTP Correlation:                   [0-25 points]
Targeting Pattern Match:           [0-25 points]

TOTAL CONFIDENCE SCORE:            [Sum of above]

Interpretation:
  80-100:   HIGH - Confident APT41 attribution
  60-79:    MEDIUM-HIGH - Likely APT41
  40-59:    MEDIUM - Could be APT41 or copycat
  20-39:    LOW - Suggests APT41-like activity
  0-19:     VERY LOW - Insufficient evidence

Final Assessment: [HIGH/MEDIUM/LOW confidence APT41 attribution]
```

---

### Step 6.2: Threat Intelligence Product

**Objective:** Create intelligence assessment correlated with APT41 capabilities.

#### Threat Intelligence Template

```markdown
## THREAT INTELLIGENCE ASSESSMENT: lockfile.ps1 Analysis

**Classification:** UNCLASSIFIED // FOUO
**Date:** 2026-02-23
**Analyst:** [Host Analyst Name]

### Executive Summary

[1-2 paragraph summary of finding, threat actor likelihood, and impact]

### Technical Analysis

[Key technical findings - IOCs, malware identification, capabilities]

### TTPs Identified

[List MITRE ATT&CK techniques observed]

### Attribution Assessment

[Confidence assessment for APT41 vs. other threat actors]

### Intelligence Gaps

[What additional information would improve assessment?]

### Recommended Actions

[Intelligence collection priorities, detection improvements]

### References

[MITRE ATT&CK, threat intel sources, CISA alerts, internal IOC databases]
```

---

## PART 7: CONTAINMENT & ERADICATION PLANNING

### Step 7.1: Containment Strategy

**Objective:** Define containment procedures to prevent further damage.

#### Containment Phases

```
PHASE 1: IMMEDIATE CONTAINMENT (Next 2 hours)
  ☐ dc2 network isolation (coordinate with BPEnergy)
  ☐ Block any identified C2 infrastructure
  ☐ Disable any identified scheduled tasks
  ☐ Reset domain service account passwords (if compromised)
  ☐ Notify ARCYBER and BPEnergy leadership

PHASE 2: FORENSIC PRESERVATION (2-4 hours)
  ☐ Forensic image of dc2 (if time permits before eradication)
  ☐ Full memory dump
  ☐ Registry export
  ☐ Event log export
  ☐ Chain of custody maintained

PHASE 3: EXTENDED INVESTIGATION (4-24 hours)
  ☐ Check all other domain controllers for same indicators
  ☐ Scan all domain computers for lateral movement evidence
  ☐ Query cloud logs for Azure AD abuse
  ☐ Monitor for attacker re-infection attempts
```

#### Containment Approval & Coordination

```
Per OPORD 26-02 Annex L (DCO-RA Authority):
  - Network isolation requires: MAJ Manbear + BPEnergy OT Leadership approval
  - Credential reset requires: Domain Admin coordination
  - Escalation path: CPT 173 Lead → MAJ Lounsbury → MAJ Manbear → ARCYBER

Communication Template:
  "CRITICAL: dc2 isolation recommended to contain APT41 persistence.
   Domain-wide credential reset required. Timeline: [X hours].
   Impact: Authentication service outage during DC takeover."
```

---

### Step 7.2: Eradication Procedure

**Objective:** Remove malicious artifacts and restore system to clean state.

#### Eradication Checklist

```
BEFORE ERADICATION:
☐ Forensic image captured
☐ Stakeholders notified
☐ Backup plan confirmed (rollback procedure)
☐ Maintenance window scheduled
☐ Alternative DC online and verified

ERADICATION STEPS:
☐ Delete lockfile.ps1 file
☐ Remove scheduled task(s) referencing lockfile
☐ Remove registry persistence keys
☐ Remove WMI subscriptions (if found)
☐ Clear associated event logs (after forensics copied)
☐ Reset all service account passwords
☐ Force-sync Azure AD (if hybrid configured)
☐ Verify no persistence remains

VERIFICATION:
☐ Scan for similar files (fuzzy hash matching)
☐ Scan remaining systems for lateral movement evidence
☐ Monitor for re-infection attempts
☐ Verify DC authentication services restored
☐ Monitor DC logs for unauthorized activity (24-hour baseline)
```

---

## PART 8: FINDINGS DOCUMENTATION & REPORTING

### Step 8.1: Forensic Analysis Report

**Objective:** Document complete analysis for record and escalation.

#### Report Template (Host Analyst Findings)

```markdown
# HOST ANALYST FORENSIC REPORT: lockfile.ps1
## OP-DEFENDER DCO-RA / dc2 / 2026-02-23

### EXECUTIVE SUMMARY

**Finding:** PowerShell script (lockfile.ps1) discovered on domain controller dc2
**Classification:** CRITICAL - Likely APT41 persistence mechanism
**Analyst:** [CPT 173 Host Analyst Name]
**Analysis Period:** 2026-02-23 [Start] - 2026-02-24 [End]

### I. ARTIFACT ANALYSIS

#### A. File Characteristics
- Filename: lockfile.ps1
- Hash (SHA256): [Value]
- Size: [X KB]
- Created: [Timestamp]
- Modified: [Timestamp]
- Location: [Path on dc2]

#### B. Static Analysis Results
- VirusTotal Detection: [X/Y vendors]
- Detected As: [Malware family]
- Obfuscation: [Yes/No - describe]
- IOCs Extracted: [List: URLs, IPs, domains, registry paths]

#### C. Code Analysis
- Functionality: [Persistence installer / Credential harvester / C2 loader / Lateral movement tool]
- MITRE ATT&CK Techniques: [List techniques]
- Risk Level: [CRITICAL/HIGH/MEDIUM/LOW]

### II. TIMELINE ANALYSIS

#### File System Timeline
- Creation Time: [Date/time] (Approximate compromise window)
- Modification History: [Any recent modifications?]
- Access Timeline: [Evidence of repeated execution]

#### Event Log Correlation
- Scheduled Task Creation: Event ID [XXX] at [Time]
- Process Execution: Event ID [XXX] at [Time]
- PowerShell Events: [ScriptBlock logging if available]

#### Attribution Timeline
- First Evidence of Compromise: [Date/time]
- Persistence Installation: [Date/time]
- Last Activity: [Date/time]
- Dwell Time: [X days] - Time attacker had access before discovery

### III. SCOPE DETERMINATION

#### A. Direct Impact
- Affected Systems: dc2 (Domain Controller)
- Criticality: CRITICAL - impacts entire domain

#### B. Lateral Movement Assessment
- Evidence of Lateral Movement: [Yes/No]
- Target Systems: [List if found]
- Credential Compromise: [Likely/Confirmed/None]

#### C. Blast Radius
- Users Affected: All domain users (if DC credentials compromised)
- Systems Affected: All domain-joined systems potentially accessible
- Cloud Services: Azure AD (if sync enabled) potentially affected

### IV. APT41 ATTRIBUTION

#### A. TTP Correlation
- T1053 (Scheduled Task): ✓ CONFIRMED [or NOT FOUND]
- T1047 (WMI): ✓ CONFIRMED [or NOT FOUND]
- T1059 (PowerShell): ✓ CONFIRMED
- T1197 (LSASS Dump): ✓ CONFIRMED [or NOT FOUND]

#### B. IOC Correlation
- C2 Infrastructure: [Match to known APT41 C2? Yes/No]
- Malware Family: [ShadowPad/Winnti/Unknown?]
- Targeting Pattern: Defense contractor + IP theft + APT41 signature

#### C. Attribution Confidence
- Confidence Score: [0-100]
- Assessment: [HIGH/MEDIUM/LOW confidence APT41]
- Caveats: [Limitations in analysis, uncertainty areas]

### V. RECOMMENDATIONS

#### A. Immediate Actions (Within 2 hours)
1. dc2 network isolation
2. Domain-wide credential reset
3. C2 infrastructure blocking
4. Threat hunting on other domain controllers

#### B. Short-term Actions (Within 24 hours)
1. Lateral movement investigation on affected systems
2. Eradication of persistence mechanisms
3. Deployment of detection rules
4. 30-day monitoring period initiation

#### C. Long-term Actions (Within 14 days)
1. Post-incident review
2. Lessons learned documentation
3. Security posture improvements
4. Staff training on findings

### CONCLUSION

[Summary of findings and confidence in attribution]

---

**Report Status:** FINAL
**Approved By:** [MAJ Manbear or CPT 173 Lead]
**Date:** 2026-02-24
```

---

### Step 8.2: Integration with POAMs

**Objective:** Link forensic findings to POAMs for tracking remediation.

#### POAM-001 Update (Investigation)

```
POAM-001: lockfile Investigation
Status: COMPLETE
Findings: [Brief summary of forensic analysis]
- APT41 persistence mechanism CONFIRMED
- Domain controller compromise CONFIRMED
- Lateral movement assessment: [In progress / Complete]
- Credential compromise: [Status]

Next POAM: POAM-002 (Remediation)
```

#### POAM-002 Update (Remediation)

```
POAM-002: lockfile Remediation
Status: READY TO EXECUTE
Based on Investigation Findings:
- Eradication procedure: [Developed]
- Containment strategy: [Approved]
- Monitoring plan: [Established]
- Timeline: [X hours for execution]

Prerequisite Complete: POAM-001 Investigation (2026-02-24)
Target Completion: 2026-02-24 [Time]
Owner: CPT 173 Remediation Team
```

---

## APPENDIX A: DECISION TREES

### Decision Tree 1: Malware Classification

```
START
│
├─ VirusTotal Detection?
│  ├─ YES (10+ vendors): CONFIRMED MALWARE → ESCALATE CRITICAL
│  ├─ MAYBE (1-9 vendors): LIKELY MALWARE → Further analysis needed
│  └─ NO (0 vendors): UNKNOWN/NEW → Continue to next decision
│
├─ Code contains obvious malicious patterns?
│  ├─ YES (Invoke-Expression, IEX, DownloadString): HIGH SUSPICION
│  ├─ MAYBE (Suspicious but could be benign): MEDIUM SUSPICION
│  └─ NO (No obvious malicious code): INVESTIGATE FURTHER
│
├─ MITRE TTPs match APT41 known behavior?
│  ├─ YES (Multiple TTP matches): HIGH CONFIDENCE APT41
│  ├─ MAYBE (Some TTP overlap): MEDIUM CONFIDENCE APT41-like
│  └─ NO (Different TTPs): LOW APT41 confidence
│
└─ CONCLUSION: [MALWARE / SUSPICIOUS / BENIGN]
   THREAT LEVEL: [CRITICAL / HIGH / MEDIUM / LOW]
   RECOMMENDED ACTION: [ESCALATE / INVESTIGATE / MONITOR / CLOSE]
```

### Decision Tree 2: Credential Compromise

```
START: Was lockfile.ps1 executed with SYSTEM or Admin privileges?
│
├─ YES (SYSTEM/Admin):
│  ├─ Does script contain credential dumping code?
│  │  ├─ YES: ASSUME CREDENTIAL COMPROMISE → Force password reset
│  │  └─ NO: Continue to next check
│  ├─ Is LSASS dump in event logs?
│  │  ├─ YES: CONFIRMED CREDENTIAL COMPROMISE → Force domain-wide reset
│  │  └─ NO: Continue to next check
│  └─ Is ntds.dit or SAM access in logs?
│     ├─ YES: CONFIRMED CREDENTIAL DATABASE COMPROMISE → Critical
│     └─ NO: Credential access unlikely
│
└─ NO (User privileges only):
   └─ Limited credential access - only user account credentials at risk

CONCLUSION: [CRITICAL CREDENTIAL COMPROMISE / POSSIBLE / UNLIKELY]
ACTION: [Force password reset / Monitor accounts / No action needed]
```

---

## APPENDIX B: IOC EXTRACTION TEMPLATE

```
LOCKFILE.PS1 IOC EXTRACTION SUMMARY

=== DOMAINS & HOSTNAMES ===
[Extracted domain 1]
[Extracted domain 2]

=== IP ADDRESSES ===
[Extracted IP 1]
[Extracted IP 2]

=== REGISTRY PATHS ===
[Registry path 1]
[Registry path 2]

=== FILE PATHS ===
[File path 1]
[File path 2]

=== USERNAMES/SERVICE ACCOUNTS ===
[Username 1]
[Username 2]

=== C2 CALLBACKS ===
[C2 domain/IP 1]
[C2 domain/IP 2]

=== PROCESS EXECUTION ===
[Process 1]
[Process 2]

=== SCHEDULED TASKS ===
[Task 1]
[Task 2]

=== FILE HASHES (If extracted binaries) ===
MD5: [Hash]
SHA256: [Hash]
```

---

## APPENDIX C: FORENSIC TOOLS & COMMANDS REFERENCE

```
Windows Forensic Commands:

File Analysis:
  hash lockfile.ps1              # Simple hash
  certutil -hashfile lockfile.ps1 SHA256   # Certified hash
  strings lockfile.ps1           # Extract readable strings

Event Log Query:
  Get-WinEvent -LogName Security -FilterXPath "*[System[(EventID=1202)]]"
  Get-WinEvent -LogName "Windows PowerShell"

Registry Analysis:
  reg query HKLM\Software\Microsoft\Windows\CurrentVersion\Run
  reg export HKLM C:\forensics\HKLM.reg

PowerShell Analysis:
  Get-Content lockfile.ps1 | Measure-Object -Line, -Character
  powershell -NoProfile -ExecutionPolicy Bypass -File "analyze.ps1"

Network Analysis:
  netstat -abn (shows connections and process names)
  Get-NetTCPConnection
  tcpdump -i any -w capture.pcap  (Linux)

File System:
  Get-Item C:\path\to\lockfile.ps1 | Get-ItemProperty
  dir /s /c "lockfile*" (find similar files)
```

---

## APPENDIX D: ESCALATION PROCEDURES

```
ESCALATION PATH for lockfile.ps1 Findings

FINDING LEVEL 1 - Suspicious File Found
  Action: Document, create POAM-001
  Notify: CPT 173 Element Lead
  Timeline: Immediate (same day)

FINDING LEVEL 2 - Confirmed Malware
  Action: Create incident report, initiate analysis
  Notify: MAJ Lounsbury (CPT 173 Lead) + S-2 Intelligence
  Timeline: Within 2 hours

FINDING LEVEL 3 - APT41 Attribution Confirmed
  Action: Activate full response, containment plan
  Notify: MAJ Manbear (Mission OIC) + LTC Jackson (Battalion Cdr)
  Timeline: Within 30 minutes

FINDING LEVEL 4 - Domain-wide Compromise or Lateral Movement
  Action: Full escalation, emergency response
  Notify: ARCYBER Operations + BPEnergy CIO + Battalion Commander
  Timeline: IMMEDIATE - phone call first, then written report

CRITICAL ESCALATION TRIGGERS:
  ☐ Credential compromise confirmed
  ☐ C2 infrastructure identified and active
  ☐ Lateral movement to critical systems
  ☐ Successful data exfiltration evidence
  ☐ Active attacker activity during investigation

→ IMMEDIATE escalation to ARCYBER / Battalion Commander on ANY of above
```

---

## EXECUTION SUMMARY

**This Host Analyst Playbook provides:**

✅ **Phase 1 (Static Analysis):** Safe artifact assessment, IOC extraction, deobfuscation, VirusTotal correlation
✅ **Phase 2 (Timeline Reconstruction):** File system, event log, PowerShell history, registry analysis
✅ **Phase 3 (Scope Determination):** Network connections, credential compromise assessment, lateral movement analysis
✅ **Phase 4 (Dynamic Analysis):** Sandbox execution, behavioral analysis, capabilities determination
✅ **Phase 5 (Attribution):** APT41 TTP correlation, IOC matching, confidence assessment
✅ **Phase 6 (Containment/Eradication):** Step-by-step procedures for cleanup and recovery
✅ **Phase 7 (Documentation):** Forensic report template, POAM integration, escalation procedures

**Total Analysis Time Target:** 24-72 hours (depending on findings complexity)

**Success Criteria:**
- [ ] Malware identified and classified
- [ ] IOCs extracted and shared
- [ ] Scope determined
- [ ] Lateral movement assessed
- [ ] Credential compromise confirmed/ruled out
- [ ] Attribution confidence established
- [ ] Remediation procedure ready
- [ ] Report complete and approved

---

**Classification:** UNCLASSIFIED // FOUO
**Authority:** OPORD 26-02 / ARCYBER DCO-RA
**Created:** 2026-02-23
**Updated:** 2026-02-24
**Owner:** CPT 173 Host Analyst Team
**Next Review:** Upon completion of Phase 1 (2026-02-24 06:00 UTC)

---

**READY FOR ANALYST EXECUTION**
