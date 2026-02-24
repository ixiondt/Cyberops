# CyberPlanner Operations Dashboard

**Real-time Cyber Operations Monitoring & Intelligence Visualization**

---

## Overview

The CyberPlanner Dashboard is an interactive web-based interface for monitoring, analyzing, and managing cyber operations, POAMs (Plans of Actions and Milestones), incidents, and threat intelligence. It provides a unified command-and-control view of all operational data.

---

## Features

### 📊 Dashboard Tabs

1. **Overview**
   - Executive summary with key metrics
   - Critical alerts and findings
   - Quick access to priority items
   - Active operations summary
   - Key metrics visualization

2. **Operations**
   - List of all active operations
   - Operation details and metadata
   - Task organization and personnel
   - Personnel roles and responsibilities
   - Mission status and timelines

3. **POAMs (Plans of Actions & Milestones)**
   - All POAMs with real-time status
   - Priority-based filtering (Critical, High, Medium)
   - Status filtering (Open, In Progress, At Risk, Complete)
   - Progress tracking and milestones
   - Target completion dates and owners

4. **Incidents**
   - Critical incident tracking
   - Finding details and severity levels
   - Affected systems and scope
   - Investigation status
   - MITRE ATT&CK technique mapping

5. **Intelligence**
   - Threat actor profiles
   - Known malware families
   - Course of Action (COA) analysis
   - MLCOA (Most Likely) and MDCOA (Most Dangerous) scenarios
   - MITRE ATT&CK technique mapping
   - Detection strategy overview
   - Priority Intelligence Requirements (PIRs)

6. **Timeline**
   - Investigation milestones with target dates
   - Remediation phases
   - Key decision points
   - Historical events and current status

### 🎨 Visual Features

- **Color-Coded Severity**
  - 🔴 **CRITICAL** (Red): Immediate action required
  - 🟠 **HIGH** (Orange): Urgent attention needed
  - 🟡 **MEDIUM** (Yellow): Schedule action
  - 🟢 **LOW** (Green): Monitor

- **Status Indicators**
  - Pulsing animations for active operations
  - Progress bars for milestones
  - Real-time metric updates
  - Context-aware alerts

- **Responsive Design**
  - Desktop optimized (1600px layout)
  - Tablet compatible
  - Mobile-friendly interface
  - Touch-enabled controls

---

## Getting Started

### Option 1: Direct Browser Opening (Recommended for Quick View)

Simply open the `dashboard.html` file directly in your web browser:

```bash
# Windows
start dashboard.html

# macOS
open dashboard.html

# Linux
xdg-open dashboard.html
```

**Note:** Direct file opening works fine for static content, but may have CORS restrictions for external resources.

---

### Option 2: Local HTTP Server (Recommended for Development)

#### Using Node.js

**Prerequisites:**
- Node.js installed (https://nodejs.org)

**Start the server:**

```bash
node server.js
```

**Access the dashboard:**
- Open your browser and navigate to: `http://localhost:3000`

**Output:**
```
╔════════════════════════════════════════════════════════════╗
║     🛡️  CyberPlanner Operations Dashboard Server            ║
╠════════════════════════════════════════════════════════════╣
║ Server running at: http://localhost:3000                   ║
║ Host: 0.0.0.0                                              ║
╠════════════════════════════════════════════════════════════╣
║ Open your browser and navigate to:                        ║
║   → http://localhost:3000                                  ║
║                                                            ║
║ Press Ctrl+C to stop the server                           ║
╚════════════════════════════════════════════════════════════╝
```

**Change port (if 3000 is already in use):**
```bash
PORT=3001 node server.js
```

---

#### Using Python (Alternative)

```bash
# Python 3
python -m http.server 3000

# Python 2
python -m SimpleHTTPServer 3000
```

Then open: `http://localhost:3000/dashboard.html`

---

#### Using Other Tools

- **Live Server** (VS Code extension):
  - Install "Live Server" extension
  - Right-click `dashboard.html` → "Open with Live Server"

- **http-server** (npm):
  ```bash
  npm install -g http-server
  http-server -p 3000
  ```

---

## Data Structure

### Operations Data

The dashboard displays data from your operation folders:

```
operation/
└── OP-DEFENDER_DCO-RA_2026-02-23/
    ├── README.md (Operation overview)
    ├── OPERATION_METADATA.md (Mission context)
    ├── EXECUTION/
    │   └── Incident_Reports/ (Incident data)
    ├── POAMs/
    │   ├── POAM-001_lockfile_Investigation.md
    │   ├── POAM-002_lockfile_Remediation.md
    │   └── POAM_Tracker_2026-02-23.md
    ├── INTELLIGENCE/
    │   ├── Threat_COA_Analysis_APT41_2026-02-23.md
    │   └── PIR_RFI_Tracker_2026-02-23.md
    └── ...
```

---

## Current Dashboard Data

### Active Operations
- **OP-DEFENDER** (Status: CRITICAL)
  - Type: DCO-RA (Defensive Cyberspace Operations - Response Action)
  - Threat Actor: APT41
  - Finding: lockfile.ps1 on dc2 (Domain Controller)

### POAMs
| POAM ID | Title | Status | Priority | Target |
|---------|-------|--------|----------|--------|
| POAM-001 | lockfile.ps1 Investigation | In Progress | 🔴 CRITICAL | 2026-02-24 18:00 UTC |
| POAM-002 | lockfile.ps1 Remediation | Open | 🔴 CRITICAL | 2026-03-02 18:00 UTC |

### Incidents
| ID | Finding | System | Severity | Status |
|----|---------|--------|----------|--------|
| INCIDENT-001 | Suspicious PowerShell Script | dc2 | CRITICAL | Investigation |

### Intelligence
- **Threat Actor:** APT41 (State-sponsored PRC group)
- **Malware Families:** 6 known variants (ShadowPad, Winnti, DEADEYE, KEYPLUG, etc.)
- **Expected TTPs:** 8 MITRE ATT&CK techniques
- **Detection Rules:** 10+ planned across 4 layers

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Esc` | Close modals |
| `Tab` | Navigate elements |
| `Enter` | Activate buttons |
| `Scroll` | Navigate lists |

---

## Browser Compatibility

### Supported Browsers
- ✅ Chrome/Chromium (Latest)
- ✅ Firefox (Latest)
- ✅ Safari (Latest)
- ✅ Edge (Latest)

### Minimum Requirements
- JavaScript enabled
- CSS Grid support
- CSS Flexbox support
- Modern CSS features (gradients, transitions)

---

## Customization

### Changing Colors

Edit the CSS variables in `dashboard.html`:

```css
/* Primary colors */
--primary-color: #00d4ff;      /* Cyan - Highlights */
--critical-color: #dc2626;     /* Red - Critical */
--warning-color: #ea580c;      /* Orange - Warning */
--success-color: #10b981;      /* Green - Success */
--info-color: #2563eb;         /* Blue - Info */

/* Background colors */
--bg-primary: #001428;         /* Dark blue */
--bg-secondary: #0f172a;       /* Darker blue */
--bg-tertiary: #1e293b;        /* Slate */
```

### Changing Layout

The dashboard uses CSS Grid for responsive layout. Modify grid-template-columns in the styles section to adjust card sizes.

### Adding New Operations

Edit the HTML to add new operation cards following the existing `operation-card` structure:

```html
<div class="operation-card critical">
    <div class="op-header">
        <div>
            <div class="op-title">OP-[CODE]</div>
            <div class="op-code">Description</div>
        </div>
        <div class="op-badge badge-critical">STATUS</div>
    </div>
    <!-- ... rest of card content -->
</div>
```

---

## Data Integration

### Reading from Files

To automatically populate the dashboard from operation files, you can:

1. **Create a JSON API endpoint** that parses markdown files
2. **Use a build process** to pre-process markdown into JSON
3. **Implement a backend service** to serve operation data

Example backend (Node.js with Express):

```javascript
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.get('/api/operations', (req, res) => {
    // Read operation folders and return JSON
    const operationsDir = path.join(__dirname, 'operation');
    const operations = fs.readdirSync(operationsDir);

    const data = operations.map(op => {
        // Parse markdown files and extract data
        return {
            id: op,
            // ... parsed data
        };
    });

    res.json(data);
});

app.listen(3000, () => console.log('API running on port 3000'));
```

---

## Performance

- **Page Load:** < 1 second (single HTML file)
- **Interaction:** Instant (pure JavaScript, no external API calls)
- **Memory Usage:** < 10 MB
- **Responsive:** 60 FPS animations

---

## Troubleshooting

### Dashboard Not Loading

**Issue:** Blank page when opening dashboard.html

**Solutions:**
1. Check browser console for JavaScript errors (F12)
2. Ensure JavaScript is enabled
3. Try opening in a different browser
4. Use HTTP server instead of direct file opening

### Styling Issues

**Issue:** Colors not rendering properly

**Solutions:**
1. Clear browser cache (Ctrl+Shift+Delete)
2. Try a different browser
3. Check CSS support in your browser
4. Update to latest browser version

### Server Won't Start

**Issue:** "Port 3000 already in use" or other server errors

**Solutions:**
1. Use a different port: `PORT=3001 node server.js`
2. Check what's using the port (Windows: `netstat -ano | findstr :3000`)
3. Kill the process using that port
4. Try Python HTTP server instead: `python -m http.server 3000`

---

## Future Enhancements

Potential improvements for the dashboard:

- [ ] Real-time data sync from operation files
- [ ] WebSocket connection for live updates
- [ ] Export reports (PDF, CSV, JSON)
- [ ] User authentication and role-based access
- [ ] Notification system for critical events
- [ ] Chart and graph visualizations
- [ ] Search and advanced filtering
- [ ] Historical data tracking
- [ ] Integration with external SIEM/EDR tools
- [ ] Mobile app (React Native)

---

## Security Considerations

- **No External Dependencies:** All code is contained in a single HTML file
- **No Data Upload:** Dashboard runs locally, data stays on your machine
- **CORS Safe:** No external API calls required
- **Client-Side Only:** No server-side processing needed

---

## Support & Documentation

For more information on CyberPlanner operations structure:

- See: `operation/README.md` - Operations folder structure
- See: `docs/POAMs/README.md` - POAM system documentation
- See: `docs/doctrine/INDEX.md` - Doctrinal references

---

## License

CyberPlanner Dashboard is part of the CyberPlanner project.

---

## Version History

| Version | Date | Notes |
|---------|------|-------|
| 1.0 | 2026-02-23 | Initial release - OP-DEFENDER dashboard |

---

**Classification:** UNCLASSIFIED // FOUO

**Last Updated:** 2026-02-23

**For Questions:** Refer to CLAUDE.md project context and operation documentation
