# AR 25-50 Word Export Implementation Summary

## What Was Implemented

You can now **export operational annexes as Microsoft Word documents formatted according to AR 25-50** (Army Regulation for Official Military Correspondence).

---

## Quick Start

### 1. Install Dependencies (One-Time)

```bash
cd C:\Users\Avalon\Nextcloud\Projects\CyberPlanner
npm install
```

### 2. Start the Server

```bash
node server.js
```

**Output:**
```
╔════════════════════════════════════════════════════════════╗
║     🛡️  CyberPlanner Operations Dashboard Server            ║
╠════════════════════════════════════════════════════════════╣
║ Server running at: http://localhost:3000                   ║
```

### 3. Open MDMP Dashboard

Navigate to: **`http://localhost:3000/mdmp-dashboard.html`**

### 4. Export Annexes

Look for the **"Export Annexes (AR 25-50 Format)"** section and click:
- `📋 Export Annex M` — Downloads Cyber Operations Annex as `.docx`
- `👥 Export Annex A` — Downloads Task Organization Annex as `.docx`

Files download automatically with format: `ANNEX-M_2026-02-24.docx`

---

## Key Features

### Military Document Compliance

| Requirement | Implementation |
|---|---|
| **Margins** | 1-inch on all sides |
| **Font** | 12pt, professional (Arial/Times New Roman) |
| **Classification** | UNCLASSIFIED // FOUO headers & footers |
| **Structure** | Proper section hierarchy and spacing |
| **Formatting** | Professional military style per AR 25-50 |

### Document Quality

✅ **Professional Format** — Ready for submission to higher HQ
✅ **Automated Generation** — Instant conversion from Markdown
✅ **Editable** — Open in Microsoft Word for further customization
✅ **Consistent** — All exports follow military standard formatting

---

## Files Changed/Created

### New Files
- **`package.json`** — Node.js project manifest with dependencies
- **`EXPORT_ANNEXES_README.md`** — Complete documentation

### Modified Files
- **`server.js`** — Enhanced with:
  - `/api/export/annex` endpoint
  - Markdown-to-Word conversion function
  - AR 25-50 compliance styling (margins, fonts, formatting)

- **`mdmp-dashboard.html`** — Enhanced with:
  - Export buttons in UI
  - Green color-coded export section
  - JavaScript functions for API calls
  - Real-time status feedback

### Dependencies Added
- `docx@^8.5.0` — Microsoft Word document generation library

---

## How It Works

```
User clicks "Export Annex M"
        ↓
Browser sends: /api/export/annex?name=ANNEX-M&operation=OP-DEFENDER...
        ↓
Server reads: operation/OP-DEFENDER_DCO-RA_2026-02-23/OPERATIONS/Cyber_Annex_*.md
        ↓
Server converts Markdown → Word document with AR 25-50 formatting
        ↓
Server returns binary .docx file (20-50 KB)
        ↓
Browser downloads: ANNEX-M_2026-02-24.docx
        ↓
User opens in Microsoft Word
```

---

## Adding More Annexes

To add additional annexes (e.g., Annex L: ROE, Annex B: Intelligence):

### Step 1: Edit `server.js`

Find this section (around line 65):
```javascript
const annexMap = {
    'ANNEX-M': {...},
    'ANNEX-A': {...}
};
```

Add new annex:
```javascript
'ANNEX-L': {
    file: `operation/${operationId}/EXECUTION/Annex_L_ROE.md`,
    title: 'ANNEX L: RULES OF ENGAGEMENT'
}
```

### Step 2: Edit `mdmp-dashboard.html`

Find the export buttons section (around line 1300) and add:
```html
<button class="export-button" onclick="exportAnnex('ANNEX-L', 'Rules of Engagement')">
    ⚖️ Export Annex L<br>
    <span style="font-size: 11px;">Rules of Engagement</span>
</button>
```

### Step 3: Restart Server

```bash
node server.js
```

---

## Technical Architecture

### Backend (Node.js)
- **Runtime:** Node.js 14+
- **Core Library:** `docx` (Office Open XML generator)
- **API:** REST endpoint `/api/export/annex`
- **Format:** Binary DOCX file generation

### Frontend (Browser)
- **UI:** React-style button components in vanilla HTML
- **API Call:** Fetch API with query parameters
- **Download:** HTML5 Blob-to-file download mechanism
- **Status Feedback:** Real-time UI updates

### Document Generation
- **Input:** Markdown files from `operation/` folder
- **Processing:** Parse markdown structure → Word document object model
- **Output:** AR 25-50 formatted `.docx` file

---

## API Reference

### Endpoint: `/api/export/annex`

**Method:** GET

**Parameters:**
```
?name=ANNEX-M&operation=OP-DEFENDER_DCO-RA_2026-02-23
```

**Response:**
- **Success (200):** Binary .docx file
- **Error (400):** `{"error": "Unknown annex: INVALID"}`
- **Error (500):** `{"error": "[Server error message]"}`

**Example:**
```bash
curl -G http://localhost:3000/api/export/annex \
  --data-urlencode "name=ANNEX-M" \
  -o ANNEX-M.docx
```

---

## Common Troubleshooting

### "Word export not available. Run npm install."
→ Run: `npm install`

### "Port 3000 already in use"
→ Use different port: `PORT=3001 node server.js`

### Downloaded file won't open in Word
→ Check server console for errors, verify annex file exists

### Export button doesn't respond
→ Open browser console (F12), check Network tab for API errors

---

## Next Steps

### Recommended Enhancements
- [ ] Batch export as ZIP archive
- [ ] Custom letterhead support
- [ ] Watermark support (DRAFT/FINAL)
- [ ] Table formatting preservation
- [ ] PDF export option
- [ ] Automatic signature block generation

### Additional Annexes to Export
- [ ] Annex B: Intelligence Preparation
- [ ] Annex C: Operations Plan
- [ ] Annex L: Rules of Engagement
- [ ] Annex J: Cyber Technical Procedures
- [ ] Annex K: Incident Response Playbooks

### Integration Opportunities
- [ ] Tie to GitHub Actions for automated export on commit
- [ ] Email distribution directly from dashboard
- [ ] SharePoint integration for document library
- [ ] Archive exported versions with timestamps

---

## Documentation Files

| File | Purpose |
|------|---------|
| **`EXPORT_ANNEXES_README.md`** | Complete technical documentation |
| **`IMPLEMENTATION_SUMMARY.md`** | This file — Quick overview |
| **`server.js`** | Backend API implementation |
| **`mdmp-dashboard.html`** | Frontend UI with export buttons |
| **`package.json`** | Dependencies manifest |

---

## Command Reference

```bash
# Install dependencies
npm install

# Start server (port 3000)
node server.js

# Start server (custom port)
PORT=3001 node server.js

# Check installed packages
npm list

# View documentation
cat EXPORT_ANNEXES_README.md

# Test API with curl
curl http://localhost:3000/api/export/annex?name=ANNEX-M -o test.docx
```

---

## Standards Compliance

- ✅ **AR 25-50** — Army Official Correspondence and Memorandums
- ✅ **ADP 5-0** — Military Decision-Making Process
- ✅ **FM 3-12** — Cyberspace and Electromagnetic Warfare Operations
- ✅ **UNCLASSIFIED // FOUO** — Proper marking throughout

---

## Support

For detailed information, see: **`EXPORT_ANNEXES_README.md`**

For project context, see: **`CLAUDE.md`**

---

**Status:** ✅ Implementation Complete
**Date:** 2026-02-24
**Version:** 2.0 (Word Export)
**Classification:** UNCLASSIFIED // FOUO
