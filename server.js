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
    if (pathname === '/api/export/annex') {
        const urlObj = new URL(req.url, `http://${req.headers.host}`);
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

// Create server
const server = http.createServer((req, res) => {
    const urlObj = new URL(req.url, `http://${req.headers.host}`);
    const pathname = urlObj.pathname;

    // Handle API requests
    if (pathname.startsWith('/api/')) {
        return handleApiRequest(pathname, req, res);
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
