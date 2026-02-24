# CyberOpsPlanner Dashboard - Quick Start Guide

## Launch the Dashboard

```bash
cd C:\Users\Avalon\Nextcloud\Projects\CyberPlanner
node server.js
```

Open browser to: **http://localhost:3000/**

---

## Dashboard Interface

### Header
- **Logo**: CyberOpsPlanner title
- **Operation Selector**: Dropdown to choose active operation
- **Status Indicator**: Shows current operation status (Active/Inactive)

### Navigation Tabs
- **Overview** — Operation summary with key metrics
- **MDMP Planner** — 7-step military planning process
- **Incidents** — Active incidents sorted by severity
- **POAMs** — Plans of Action and Milestones
- **Network Map** — Network topology visualization (Phase 4)

---

## Features by View

### 📊 Overview
- Operation metadata (ID, status, created date, last updated)
- Summary cards showing:
  - Number of MDMP products
  - Number of POAMs
  - Number of active incidents
- Quick links to other views

### 📋 MDMP Planner
- 7 MDMP steps with names and color coding
- Product count for each step
- List of recent products with status
- (Phase 3: Click step to see deliverables, add/remove products)

### 🚨 Incidents
- All incidents for selected operation
- Grouped and sorted by severity (Critical > High > Medium > Low)
- Each incident shows:
  - Title and incident ID
  - Severity level (color-coded)
  - Current status
  - Affected assets
- (Phase 4: Click to see full details, create new incidents)

### 📌 POAMs
- All POAMs for selected operation
- Grouped by status (Open, In Progress, Closed, etc.)
- Each POAM shows:
  - Title and POAM ID
  - Priority level (color-coded)
  - Status
  - Assigned owner
- (Phase 4: Click to see milestones, update progress)

### 🗺️ Network Map
- Network topology visualization (Coming in Phase 4)
- Layer switching (Physical, Logical, Persona)
- Node highlighting and filtering

---

## Using the Dashboard

### Select an Operation
1. Click the operation selector dropdown in header
2. Choose from list of available operations
3. Dashboard loads metadata and updates all views
4. Status indicator shows operation is active

### Switch Views
1. Click any tab button in navigation
2. Current view changes with fade animation
3. Data loads from server for that view
4. Scroll down to see all content in view

### View Operation Details
- Overview tab shows summary of operation
- Operation metadata (ID, status, dates) displayed in table
- Metrics show count of products, POAMs, incidents

---

## API Reference (For Advanced Users)

All data comes from REST API endpoints on server:

```
GET /api/operations
GET /api/operations/{opId}
GET /api/operations/{opId}/mdmp-products
GET /api/operations/{opId}/poams
GET /api/operations/{opId}/incidents
POST /api/operations/{opId}/poams
POST /api/operations/{opId}/incidents
```

See `PHASE1-IMPLEMENTATION.md` for full API documentation.

---

## Troubleshooting

### Dashboard won't load
- Check server is running: `node server.js`
- Check port 3000 is not in use: `netstat -ano | findstr :3000`
- Try different port: `PORT=3001 node server.js`

### Operation selector is empty
- No operations in `operation/` folder
- Create operation folder: `operation/OP-NAME_TYPE_DATE/`
- Add `OPERATION_METADATA.md` with operation info

### Data not loading
- Check browser console for errors (F12)
- Check server console for API errors
- Verify operation folder structure exists
- Ensure OPERATION_METADATA.md is readable

### Styles look wrong
- Clear browser cache (Ctrl+F5)
- Check `css/dashboard.css` is accessible
- Verify server.js MIME type handling

---

## Next Steps

### Phase 2: Frontend Enhancement
- Add modal dialogs for forms
- Implement add/edit/delete UI
- Form validation

### Phase 3: MDMP Planner
- Full step interaction
- Deliverable management
- Status tracking

### Phase 4: Advanced Features
- Incident creation and editing
- POAM milestone tracking
- Network visualization

---

## Support

For issues or questions:
1. Check browser console (F12) for error messages
2. Check server console output
3. Review PHASE1-IMPLEMENTATION.md for technical details
4. Verify operation folder structure and files

---

**Dashboard Version:** 1.0 - Phase 1 Complete
**Last Updated:** 2026-02-24
