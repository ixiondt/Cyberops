#!/usr/bin/env node

/**
 * CyberPlanner Dashboard Server
 *
 * HTTP server with API endpoint for AR 25-50 compliant Word document export
 *
 * Usage:
 *   npm install (first time)
 *   node server.js
 *   then open http://localhost:3000 in your browser
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

// Optional: Try to load docx library for export functionality
let docx = null;
try {
  docx = require('docx');
} catch (err) {
  console.warn('⚠️  docx library not installed. Run "npm install" for Word export functionality.');
}

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

// AR 25-50 compliance helper function
function createAr25_50Document(annexTitle, annexFile, mdContent) {
    if (!docx) {
        return null;
    }

    // Parse markdown content to plain text with structure
    const lines = mdContent.split('\n');
    const paragraphs = [];

    // Add header with classification
    paragraphs.push(
        new docx.Paragraph({
            text: 'UNCLASSIFIED // FOUO',
            alignment: docx.AlignmentType.CENTER,
            bold: true,
            size: 22 // 11pt
        })
    );

    // Add blank line
    paragraphs.push(new docx.Paragraph({ text: '' }));

    // Add document header
    paragraphs.push(
        new docx.Paragraph({
            text: annexTitle,
            alignment: docx.AlignmentType.CENTER,
            bold: true,
            size: 28 // 14pt
        })
    );

    // Add blank line
    paragraphs.push(new docx.Paragraph({ text: '' }));

    // Parse markdown content
    let inCodeBlock = false;
    let isHeading = false;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        if (line.startsWith('```')) {
            inCodeBlock = !inCodeBlock;
            continue;
        }

        if (inCodeBlock) {
            paragraphs.push(
                new docx.Paragraph({
                    text: line,
                    size: 20 // 10pt for code
                })
            );
            continue;
        }

        // Handle headings
        if (line.startsWith('# ')) {
            paragraphs.push(
                new docx.Paragraph({
                    text: line.replace(/^#\s+/, ''),
                    bold: true,
                    size: 28, // 14pt
                    spacing: { before: 240, after: 120 }
                })
            );
        } else if (line.startsWith('## ')) {
            paragraphs.push(
                new docx.Paragraph({
                    text: line.replace(/^##\s+/, ''),
                    bold: true,
                    size: 26, // 13pt
                    spacing: { before: 200, after: 100 }
                })
            );
        } else if (line.startsWith('### ')) {
            paragraphs.push(
                new docx.Paragraph({
                    text: line.replace(/^###\s+/, ''),
                    bold: true,
                    size: 24, // 12pt
                    spacing: { before: 160, after: 80 }
                })
            );
        } else if (line.startsWith('- ')) {
            // Bullet point
            paragraphs.push(
                new docx.Paragraph({
                    text: line.replace(/^-\s+/, ''),
                    bullet: { level: 0 },
                    size: 22 // 11pt
                })
            );
        } else if (line.startsWith('| ')) {
            // Skip tables in this simple implementation
            continue;
        } else if (line.length > 0 && !line.startsWith('---')) {
            // Regular paragraph
            paragraphs.push(
                new docx.Paragraph({
                    text: line,
                    size: 22 // 11pt
                })
            );
        } else if (line.length === 0) {
            // Blank line
            paragraphs.push(new docx.Paragraph({ text: '' }));
        }
    }

    // Add footer with classification and date
    paragraphs.push(new docx.Paragraph({ text: '' }));
    paragraphs.push(
        new docx.Paragraph({
            text: `UNCLASSIFIED // FOUO | Generated: ${new Date().toISOString()}`,
            size: 18, // 9pt
            alignment: docx.AlignmentType.CENTER
        })
    );

    // Create document with AR 25-50 compliance (1" margins on all sides = 1440 twips)
    const doc = new docx.Document({
        sections: [{
            properties: {
                page: {
                    margins: {
                        top: 1440,    // 1 inch
                        right: 1440,  // 1 inch
                        bottom: 1440, // 1 inch
                        left: 1440    // 1 inch
                    }
                }
            },
            children: paragraphs
        }]
    });

    return doc;
}

// API endpoint handler
async function handleApiRequest(pathname, req, res) {
    const urlObj = new URL(req.url, `http://${req.headers.host}`);

    // Network Map API Endpoints
    if (pathname === '/api/network-map/data') {
        const operationId = urlObj.searchParams.get('operation') || 'OP-DEFENDER_DCO-RA_2026-02-23';
        const dataFile = path.join(__dirname, `operation/${operationId}/INTELLIGENCE/network_topology_data.json`);

        try {
            if (fs.existsSync(dataFile)) {
                const data = fs.readFileSync(dataFile, 'utf8');
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(data);
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Network topology data not found for operation' }));
            }
        } catch (err) {
            console.error('Network data retrieval error:', err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message }));
        }
        return;
    }

    if (pathname === '/api/network-map/save') {
        if (req.method !== 'POST') {
            res.writeHead(405, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Method not allowed' }));
            return;
        }

        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
            if (body.length > 10 * 1024 * 1024) {
                req.connection.destroy();
            }
        });

        req.on('end', () => {
            try {
                const payload = JSON.parse(body);
                const operationId = payload.operation || 'OP-DEFENDER_DCO-RA_2026-02-23';
                const dataDir = path.join(__dirname, `operation/${operationId}/INTELLIGENCE`);

                // Ensure directory exists
                if (!fs.existsSync(dataDir)) {
                    fs.mkdirSync(dataDir, { recursive: true });
                }

                const dataFile = path.join(dataDir, 'network_topology_data.json');

                // Update lastUpdated timestamp
                payload.lastUpdated = new Date().toISOString();

                fs.writeFileSync(dataFile, JSON.stringify(payload, null, 2), 'utf8');

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    success: true,
                    message: 'Network topology saved',
                    file: dataFile
                }));
            } catch (err) {
                console.error('Network data save error:', err);
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: err.message }));
            }
        });
        return;
    }

    if (pathname === '/api/export/ipb-terrain') {
        const operationId = urlObj.searchParams.get('operation') || 'OP-DEFENDER_DCO-RA_2026-02-23';
        const dataFile = path.join(__dirname, `operation/${operationId}/INTELLIGENCE/network_topology_data.json`);

        try {
            if (!fs.existsSync(dataFile)) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Network topology data not found' }));
                return;
            }

            const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));

            // Generate IPB document content
            const ipbContent = generateIPBDocument(data);
            const doc = createAr25_50Document('IPB CYBERSPACE TERRAIN ANALYSIS', 'IPB_Terrain.md', ipbContent);

            if (!doc) {
                res.writeHead(503, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Word export not available' }));
                return;
            }

            const buffer = await docx.Packer.toBuffer(doc);
            const filename = `IPB_Cyberspace_Terrain_${operationId}_${new Date().toISOString().split('T')[0]}.docx`;

            res.writeHead(200, {
                'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'Content-Disposition': `attachment; filename="${filename}"`,
                'Content-Length': buffer.length
            });
            res.end(buffer);
        } catch (err) {
            console.error('IPB export error:', err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message }));
        }
        return;
    }

    // Original annex export endpoint
    if (pathname === '/api/export/annex') {
        const annexName = urlObj.searchParams.get('name') || 'ANNEX-M';
        const operationId = urlObj.searchParams.get('operation') || 'OP-DEFENDER_DCO-RA_2026-02-23';

        // Map annex names to file paths
        const annexMap = {
            'ANNEX-M': {
                file: `operation/${operationId}/OPERATIONS/Cyber_Annex_Operational_Focus_2026-02-23.md`,
                title: 'ANNEX M: CYBER OPERATIONS ANNEX'
            },
            'ANNEX-A': {
                file: `operation/${operationId}/OPERATIONS/Task_Organization_Summary_2026-02-23.md`,
                title: 'ANNEX A: TASK ORGANIZATION'
            }
        };

        const annexInfo = annexMap[annexName];
        if (!annexInfo) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: `Unknown annex: ${annexName}` }));
            return;
        }

        const annexPath = path.join(__dirname, annexInfo.file);

        try {
            const mdContent = fs.readFileSync(annexPath, 'utf8');
            const doc = createAr25_50Document(annexInfo.title, annexInfo.file, mdContent);

            if (!doc) {
                res.writeHead(503, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Word export not available. Run npm install.' }));
                return;
            }

            // Generate buffer
            const buffer = await docx.Packer.toBuffer(doc);

            // Send as downloadable file
            const filename = `${annexName}_${new Date().toISOString().split('T')[0]}.docx`;
            res.writeHead(200, {
                'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'Content-Disposition': `attachment; filename="${filename}"`,
                'Content-Length': buffer.length
            });
            res.end(buffer);
        } catch (err) {
            console.error('Export error:', err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message }));
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'API endpoint not found' }));
    }
}

// Generate IPB Cyberspace Terrain document from network topology
function generateIPBDocument(networkData) {
    const layers = networkData.layers || {};

    let content = `# IPB CYBERSPACE TERRAIN ANALYSIS
${networkData.operation || 'OP-UNKNOWN'}

## 1. PHYSICAL LAYER ANALYSIS

### 1.1 Infrastructure Overview
The physical layer consists of geographically distributed data centers and edge nodes providing mission-critical connectivity and computing resources.

`;

    // Add physical layer details
    if (layers.physical && layers.physical.nodes) {
        content += `#### Facilities (${layers.physical.nodes.length} total):\n\n`;
        layers.physical.nodes.forEach(node => {
            content += `- **${node.label}**: ${node.description}\n`;
            if (node.location) content += `  - Location: ${node.location}\n`;
            if (node.criticality) content += `  - Criticality: ${node.criticality}\n`;
            if (node.bandwidth) content += `  - Bandwidth: ${node.bandwidth}\n`;
            if (node.redundancy) content += `  - Redundancy: ${node.redundancy}\n`;
        });
        content += '\n';
    }

    // Add logical layer
    content += `## 2. LOGICAL LAYER ANALYSIS

### 2.1 Network Architecture
The logical layer defines subnets, security zones, and network segmentation policies.

`;

    if (layers.logical && layers.logical.nodes) {
        // Count by type
        const types = {};
        layers.logical.nodes.forEach(n => {
            types[n.type] = (types[n.type] || 0) + 1;
        });

        content += `#### Network Resources:\n\n`;
        Object.entries(types).forEach(([type, count]) => {
            content += `- **${type}**: ${count}\n`;
        });
        content += '\n';

        // Key terrain analysis
        const keyTerrain = layers.logical.nodes.filter(n => n.key_terrain);
        if (keyTerrain.length > 0) {
            content += `#### Key Terrain (${keyTerrain.length}):\n\n`;
            keyTerrain.forEach(node => {
                content += `- **${node.label}**: ${node.description}\n`;
                if (node.criticality) content += `  - Criticality: ${node.criticality}\n`;
            });
            content += '\n';
        }
    }

    // Add persona layer
    content += `## 3. PERSONA LAYER ANALYSIS

### 3.1 Account and Privilege Structure
The persona layer identifies user accounts, service accounts, and privilege tiers critical to mission operations.

`;

    if (layers.persona && layers.persona.nodes) {
        const criticalAccounts = layers.persona.nodes.filter(n => n.criticality === 'CRITICAL');
        if (criticalAccounts.length > 0) {
            content += `#### Critical Accounts/Roles (${criticalAccounts.length}):\n\n`;
            criticalAccounts.forEach(node => {
                content += `- **${node.label}**: ${node.description}\n`;
                if (node.privilege_level) content += `  - Privilege: ${node.privilege_level}\n`;
                if (node.risk_level) content += `  - Risk: ${node.risk_level}\n`;
            });
            content += '\n';
        }
    }

    // Add OAKOC analysis
    content += `## 4. OAKOC ANALYSIS (Observation, Avenues, Key Terrain, Obstacles, Cover)

### 4.1 Observation
Primary network monitoring points: Firewalls, IDS/IPS sensors, proxy gateways, authentication servers.

### 4.2 Avenues of Approach
- External/DMZ path for internet-sourced threats
- Internal lateral movement paths between subnets
- Privilege escalation paths through service accounts

### 4.3 Key Terrain
Critical infrastructure nodes that, if compromised, would significantly impact mission:
- Core routers and switches
- Critical domain admin and database service accounts
- Physical data center access points

### 4.4 Obstacles
- Network segmentation via firewalls
- Authentication requirements (AD, MFA where deployed)
- Logging and monitoring controls

### 4.5 Cover
Hidden attack infrastructure:
- Unauthorized shadow IT or rogue access points
- Unpatched systems in network gaps
- Compromised but dormant accounts

## 5. THREAT COA MAPPING

Named Areas of Interest (NAIs) for threat detection:
- Network edges (firewall logs, IDS alerts)
- Service account usage patterns
- Privilege escalation attempts
- Data exfiltration channels

## 6. RECOMMENDED INTELLIGENCE REQUIREMENTS

Primary Intelligence Requirements (PIRs):
1. What access methods are most likely for this threat?
2. What lateral movement paths would be preferred?
3. Which critical accounts pose highest compromise risk?
4. What detection gaps exist in our current monitoring?

## 7. NOTES

- Classification: ${networkData.classification || 'UNCLASSIFIED // FOUO'}
- Last Updated: ${networkData.lastUpdated || 'Unknown'}
- Source: CyberPlanner Network Mapping Tool

---

UNCLASSIFIED // FOUO`;

    return content;
}

// Create server
const server = http.createServer((req, res) => {
    const urlObj = new URL(req.url, `http://${req.headers.host}`);
    const pathname = urlObj.pathname;

    // Handle API requests
    if (pathname.startsWith('/api/')) {
        return handleApiRequest(pathname, req, res);
    }

    // Serve node_modules for offline CDN fallback
    if (pathname.startsWith('/node_modules/')) {
        const modulePath = path.join(__dirname, pathname);
        const fullPath = modulePath;

        fs.readFile(fullPath, (err, content) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('404 - Module not found\n');
            } else {
                const extname = String(path.extname(fullPath)).toLowerCase();
                const mimeTypes = {
                    '.js': 'application/javascript',
                    '.css': 'text/css',
                    '.json': 'application/json',
                    '.map': 'application/json'
                };
                const contentType = mimeTypes[extname] || 'application/octet-stream';

                res.writeHead(200, {
                    'Content-Type': contentType,
                    'Access-Control-Allow-Origin': '*',
                    'Cache-Control': 'public, max-age=31536000'
                });
                res.end(content, 'utf-8');
            }
        });
        return;
    }

    // Default to dashboard
    let filePath = pathname === '/' ? '/dashboard.html' : pathname;

    // Map URL to file path
    const fullPath = path.join(__dirname, filePath);

    // Get file extension
    const extname = String(path.extname(fullPath)).toLowerCase();

    // MIME types
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.wasm': 'application/wasm',
        '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        '.md': 'text/markdown'
    };

    const contentType = mimeTypes[extname] || 'application/octet-stream';

    // Try to serve the file
    fs.readFile(fullPath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end(`
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <title>404 - Not Found</title>
                        <style>
                            body { font-family: Arial, sans-serif; background: #1e293b; color: #e2e8f0; padding: 50px; }
                            .container { max-width: 600px; margin: 0 auto; }
                            h1 { color: #dc2626; }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <h1>404 - File Not Found</h1>
                            <p>The file you requested was not found: <code>${filePath}</code></p>
                            <p><a href="/" style="color: #00d4ff;">← Back to Dashboard</a></p>
                        </div>
                    </body>
                    </html>
                `);
            } else {
                res.writeHead(500);
                res.end(`Server Error: ${err}`);
            }
        } else {
            res.writeHead(200, {
                'Content-Type': contentType,
                'Access-Control-Allow-Origin': '*'
            });
            res.end(content, 'utf-8');
        }
    });
});

// Start server
server.listen(PORT, HOST, () => {
    console.log('\n');
    console.log('╔════════════════════════════════════════════════════════════╗');
    console.log('║     🛡️  CyberPlanner Operations Dashboard Server            ║');
    console.log('╠════════════════════════════════════════════════════════════╣');
    console.log(`║ Server running at: http://localhost:${PORT}                     ║`);
    console.log(`║ Host: ${HOST}                              ║`);
    console.log('╠════════════════════════════════════════════════════════════╣');
    console.log('║ Open your browser and navigate to:                        ║');
    console.log(`║   → http://localhost:${PORT}                                  ║`);
    console.log('║                                                            ║');
    console.log('║ Press Ctrl+C to stop the server                           ║');
    console.log('╚════════════════════════════════════════════════════════════╝');
    console.log('\n');
});

// Handle server errors
server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`\n❌ Error: Port ${PORT} is already in use`);
        console.error('   Try a different port:');
        console.error(`   PORT=3001 node server.js\n`);
    } else {
        console.error(`Server error: ${err}\n`);
    }
    process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('\n\n⏹️  Server shutting down...');
    server.close(() => {
        console.log('✅ Server stopped\n');
        process.exit(0);
    });
});
