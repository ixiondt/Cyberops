#!/usr/bin/env node

/**
 * CyberPlanner Dashboard Server
 *
 * Simple HTTP server to serve the operations dashboard
 *
 * Usage:
 *   node server.js
 *   then open http://localhost:3000 in your browser
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

// Create server
const server = http.createServer((req, res) => {
    // Default to dashboard
    let filePath = req.url === '/' ? '/dashboard.html' : req.url;

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
        '.wasm': 'application/wasm'
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
            res.writeHead(200, { 'Content-Type': contentType });
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
