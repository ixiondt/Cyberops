# CyberPlanner Network Mapping Feature - User Guide

## Overview

The **Network Map** tool provides interactive visualization of your cyberspace terrain across three critical layers:

- **Physical Layer** — Data centers, links, edge nodes, physical locations
- **Logical Layer** — Subnets, VLANs, firewalls, routers, security controls
- **Persona Layer** — User accounts, service accounts, privilege tiers, trust relationships

This tool directly supports **MDMP Step 2 (Mission Analysis)** by providing the **IPB Cyberspace Terrain** product required for operations planning.

---

## Quick Start

### 1. Access the Network Map

From the **MDMP Dashboard**, click the interactive link under **Step 2: Mission Analysis**:

```
🗺️ Cyberspace Terrain Network Map (INTERACTIVE)
```

Or navigate directly:
```
http://localhost:3000/network-map.html?operation=OP-DEFENDER_DCO-RA_2026-02-23
```

### 2. View Network Topology

- **Layer Selector** (Left Sidebar): Switch between Physical/Logical/Persona views
- **Network Canvas** (Center): Interactive hierarchical diagram
- **Node Inspector** (Right Sidebar): Click nodes to see detailed metadata
- **Statistics** (Left Sidebar): Summary counts of nodes, edges, subnets

### 3. Interact with the Diagram

- **Zoom**: Scroll wheel or pinch on touchpad
- **Pan**: Click and drag the canvas
- **Fit View**: Click "🔍 Fit to View" button
- **Node Details**: Click any node to inspect its properties
- **Hover**: Tooltips show node information

---

## Data Input Methods

### Method 1: JSON Topology File (Recommended)

**Best for:** Complete network architectures with multiple layers

1. Click **"📥 Load Data"** button (left sidebar)
2. Select your **JSON topology file** (see template format below)
3. Click **"Load Data"** button
4. Network diagram updates automatically

**Template Location:**
```
docs/templates/network_topology_template.json
```

**Example JSON Structure:**
```json
{
  "operation": "OP-DEFENDER_DCO-RA_2026-02-23",
  "classification": "UNCLASSIFIED // FOUO",
  "layers": {
    "physical": {
      "nodes": [...],
      "edges": [...]
    },
    "logical": {
      "nodes": [...],
      "edges": [...]
    },
    "persona": {
      "nodes": [...],
      "edges": [...]
    }
  }
}
```

### Method 2: CSV Host List

**Best for:** Bulk import of endpoint/host information

1. Click **"📥 Load Data"** button
2. Select a **CSV file** with format:
   ```
   IP,Hostname,OS,Role,Criticality,Subnet
   10.2.0.10,web-prod-01,Windows Server 2019,Web Server,HIGH,10.2.0.0/24
   10.2.0.11,app-prod-01,Linux CentOS,App Server,CRITICAL,10.2.0.0/24
   10.0.1.10,mgmt-admin-01,Windows Server 2022,Admin,CRITICAL,10.0.0.0/24
   ```
3. Click **"Load Data"**
4. Hosts are visualized in logical layer

**CSV Columns:**
- **IP**: IPv4 address (10.x.x.x format)
- **Hostname**: FQDN or system name
- **OS**: Operating system identifier
- **Role**: Functional role (Web Server, Database, Admin, etc.)
- **Criticality**: CRITICAL | HIGH | MEDIUM | LOW
- **Subnet**: CIDR notation (10.0.0.0/24)

### Method 3: Manual Entry (Future Enhancement)

In-application forms will allow creation of nodes and edges directly in the UI.

---

## Exporting Data

### Export as Image (PNG)

1. View desired layer and layout
2. Click **"📸 Export Image"** button
3. PNG file downloads to your computer
4. Use in briefings, reports, documentation

**File Naming:** `network-map-[layer]-[date].png`

### Export IPB Document (Word)

1. Ensure network topology is loaded
2. Click **"📄 Export IPB"** button
3. AR 25-50 compliant Word document downloads
4. Document includes:
   - Physical layer analysis
   - Logical layer architecture
   - Persona account structure
   - OAKOC analysis (Observation, Avenues, Key Terrain, Obstacles, Cover)
   - NAI/TAI recommendations
   - PIR mapping

**File Naming:** `IPB_Cyberspace_Terrain_[operation]_[date].docx`

---

## Criticality Color Coding

Network nodes are color-coded by criticality level (military standard):

| Color | Criticality | Impact |
|-------|-------------|--------|
| 🔴 Red | CRITICAL | Mission failure if compromised |
| 🟠 Orange | HIGH | Significant operational impact |
| 🟡 Yellow | MEDIUM | Moderate degradation |
| 🟢 Green | LOW | Minimal impact |

---

## Layer-Specific Analysis

### Physical Layer

**Focus:** Geographic distribution, infrastructure resilience

- **Nodes:** Data centers, edge nodes, facilities
- **Edges:** Network links (MPLS, Internet, Private)
- **Key Questions:**
  - Which data centers host critical systems?
  - What are the geographic dependencies?
  - Which links are single points of failure?

### Logical Layer

**Focus:** Network segmentation, security controls, traffic flow

- **Nodes:** Subnets (10.x.x.x/y), firewalls, routers, IDS/IPS
- **Edges:** Traffic flows, trust boundaries
- **Key Terrain:** Resources marked `key_terrain: true`
- **Key Questions:**
  - How is the network segmented?
  - What are the network choke points?
  - Which security devices must remain operational?

### Persona Layer

**Focus:** Access control, privilege escalation paths, account trust

- **Nodes:** User accounts, service accounts, groups
- **Edges:** Trust relationships, privilege delegation
- **Risk Analysis:** Service accounts with admin privileges
- **Key Questions:**
  - Who can escalate privileges?
  - Which accounts have cross-system access?
  - What are the trust boundaries between accounts?

---

## OAKOC Analysis Integration

The network map tool generates **OAKOC analysis** for threat assessment:

- **Observation** — Where can attackers be detected?
- **Avenues** — What are likely attack paths?
- **Key Terrain** — Critical infrastructure to defend
- **Obstacles** — What impedes attacker progress?
- **Cover** — Where can attackers hide?

Use this analysis to inform:
- Detection strategy (monitoring placement)
- Defense prioritization (resource allocation)
- Red team exercises (attack scenario planning)
- Risk assessment (threat/impact analysis)

---

## API Endpoints (Advanced)

### GET /api/network-map/data

Retrieve network topology JSON for an operation:

```bash
curl http://localhost:3000/api/network-map/data?operation=OP-DEFENDER_DCO-RA_2026-02-23
```

### POST /api/network-map/save

Save updated network topology:

```bash
curl -X POST http://localhost:3000/api/network-map/save \
  -H "Content-Type: application/json" \
  -d @network_topology_data.json
```

### GET /api/export/ipb-terrain

Export IPB document as Word file:

```bash
curl http://localhost:3000/api/export/ipb-terrain?operation=OP-DEFENDER_DCO-RA_2026-02-23 \
  -o IPB_Terrain.docx
```

---

## File Locations

### Operation Data

```
operation/OP-[CODE]_[TYPE]_[DATE]/
└── INTELLIGENCE/
    └── network_topology_data.json      ← Network topology for this operation
```

### Templates

```
docs/templates/
└── network_topology_template.json      ← Template for new operations
```

### Server Configuration

```
server.js                                ← Node.js HTTP server
network-map.html                         ← Network visualization UI
mdmp-dashboard.html                      ← MDMP workflow integration
```

---

## Troubleshooting

### Network diagram won't load

**Check:**
1. Is server running? (`node server.js`)
2. Is operation parameter correct? (`?operation=OP-YOUR-OPERATION`)
3. Does the JSON file exist? (`operation/OP-X/INTELLIGENCE/network_topology_data.json`)

### Nodes not displaying

**Check:**
1. JSON structure is valid (use template)
2. `layers.physical.nodes` array is populated
3. Node IDs are unique within the layer

### CSV import shows no hosts

**Check:**
1. CSV header matches: `IP,Hostname,OS,Role,Criticality,Subnet`
2. No blank lines in CSV
3. Data rows start on line 2 (line 1 is header)

### Export button doesn't work

**Check:**
1. Ensure network data is loaded first
2. Check browser console (F12 → Console tab) for errors
3. Verify docx package is installed (`npm install`)

---

## Best Practices

1. **Keep JSON Updated** — Update `network_topology_data.json` as network changes
2. **Use Consistent Naming** — Node labels should be human-readable and consistent
3. **Mark Key Terrain** — Set `key_terrain: true` for critical resources
4. **Regular Exports** — Generate IPB documents weekly or after major changes
5. **Layer Analysis** — Review each layer independently for different threat perspectives
6. **Criticality Assessment** — Ensure criticality levels match your COOP/contingency plans

---

## Integration with MDMP

The Network Map tool is designed as part of the **MDMP Step 2 (Mission Analysis)** workflow:

| MDMP Step | Product | Status |
|-----------|---------|--------|
| Step 1 | Receipt of Mission | ✅ Prior to network map |
| **Step 2** | **Mission Analysis** | **← Network Map provides IPB** |
| Step 2 Output | IPB_Cyberspace_Terrain.md | ✅ Generated by network map |
| Step 3 | COA Development | ✅ Uses network map insights |
| Step 4 | Wargaming | ✅ Models paths from network map |

---

## Contact & Support

For issues or feature requests:
- Check the **CLAUDE.md** project instructions
- Review **PROJECT_GUIDE.md** for architecture overview
- Consult doctrine references in **docs/doctrine/**

---

**Classification:** UNCLASSIFIED // FOUO
**Last Updated:** 2026-02-24
**Version:** 1.0
