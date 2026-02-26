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

// Staff section configuration (single source of truth)
const { STAFF_SECTIONS, ANNEX_MAP } = require('./config/staff-sections');

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';
const OPERATIONS_DIR = path.join(__dirname, 'operation');

// ============================================
// UTILITY FUNCTIONS FOR FILE OPERATIONS
// ============================================

/**
 * List all operations in the operation/ folder
 */
function listOperations() {
    try {
        if (!fs.existsSync(OPERATIONS_DIR)) {
            return [];
        }

        const items = fs.readdirSync(OPERATIONS_DIR);
        const operations = [];

        items.forEach(item => {
            const itemPath = path.join(OPERATIONS_DIR, item);
            const stat = fs.statSync(itemPath);

            if (stat.isDirectory() && item.startsWith('OP-')) {
                const metadata = getOperationMetadata(item);
                operations.push({
                    id: item,
                    name: metadata.name || item,
                    status: metadata.status || 'unknown',
                    created: metadata.created || '',
                    lastUpdated: metadata.lastUpdated || ''
                });
            }
        });

        return operations.sort((a, b) => b.lastUpdated.localeCompare(a.lastUpdated));
    } catch (err) {
        console.error('Error listing operations:', err);
        return [];
    }
}

/**
 * Get operation metadata from OPERATION_METADATA.md
 */
function getOperationMetadata(opId) {
    try {
        const metadataFile = path.join(OPERATIONS_DIR, opId, 'OPERATION_METADATA.md');

        if (!fs.existsSync(metadataFile)) {
            return {};
        }

        const content = fs.readFileSync(metadataFile, 'utf8');
        const metadata = {};

        // Parse markdown for common fields
        const lines = content.split('\n');
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];

            // Extract operation name
            if (line.includes('Operation Name:')) {
                const value = line.split('Operation Name:')[1]?.trim() || opId;
                metadata.name = value.replace(/^\*+\s*/, '').trim();
            }

            // Extract current status (try Current Status first, then Status)
            if (line.includes('**Current Status:**') || line.includes('Current Status:')) {
                const value = line.split(/\*\*?Current Status:\*\*?/)[1]?.trim() || 'unknown';
                metadata.status = value.replace(/^\*+\s*/, '').trim();
            } else if (line.includes('Status:') && !metadata.status) {
                const value = line.split('Status:')[1]?.trim() || 'unknown';
                metadata.status = value.replace(/^\*+\s*/, '').trim();
            }

            // Extract creation date
            if (line.includes('Created:')) {
                const value = line.split('Created:')[1]?.trim() || '';
                metadata.created = value.replace(/^\*+\s*/, '').trim();
            }

            // Extract last update date
            if (line.includes('Last Updated:') || line.includes('Status Last Updated:')) {
                const value = line.split(/Last Updated:|Status Last Updated:/)[1]?.trim() || '';
                metadata.lastUpdated = value.replace(/^\*+\s*/, '').trim();
            }
        }

        // Also get file's modification date as fallback
        if (!metadata.lastUpdated) {
            const stat = fs.statSync(metadataFile);
            metadata.lastUpdated = stat.mtime.toISOString();
        }

        return metadata;
    } catch (err) {
        console.error(`Error reading metadata for ${opId}:`, err);
        return {};
    }
}

/**
 * Get all MDMP products for an operation, optionally filtered by step
 */
function getMDMPProducts(opId, step = null) {
    try {
        const products = [];
        const planningDir = path.join(OPERATIONS_DIR, opId, 'PLANNING');
        const intelligenceDir = path.join(OPERATIONS_DIR, opId, 'INTELLIGENCE');
        const operationsDir = path.join(OPERATIONS_DIR, opId, 'OPERATIONS');

        const dirs = [
            { dir: planningDir, defaultStep: 'planning' },
            { dir: intelligenceDir, defaultStep: 'intelligence' },
            { dir: operationsDir, defaultStep: 'operations' }
        ];

        dirs.forEach(({ dir, defaultStep }) => {
            if (!fs.existsSync(dir)) return;

            const files = fs.readdirSync(dir);
            files.forEach(file => {
                if (!file.endsWith('.md')) return;

                const filePath = path.join(dir, file);
                const stat = fs.statSync(filePath);
                const content = fs.readFileSync(filePath, 'utf8');

                // Extract metadata from first few lines
                let productStep = step;
                let title = file.replace('.md', '').replace(/_/g, ' ');
                let status = 'pending';

                // Parse for metadata in comments
                const metaMatch = content.match(/<!-- METADATA\s*([\s\S]*?)-->/);
                if (metaMatch) {
                    const metaContent = metaMatch[1];
                    const stepMatch = metaContent.match(/step:\s*(\d+)/);
                    const titleMatch = metaContent.match(/title:\s*(.+)/);
                    const statusMatch = metaContent.match(/status:\s*(.+)/);

                    if (stepMatch) productStep = parseInt(stepMatch[1]);
                    if (titleMatch) title = titleMatch[1].trim();
                    if (statusMatch) status = statusMatch[1].trim();
                }

                // Also check for # heading
                const headingMatch = content.match(/^#\s+(.+)$/m);
                if (headingMatch) {
                    title = headingMatch[1];
                }

                if (!step || productStep === step) {
                    products.push({
                        id: path.basename(file, '.md'),
                        title,
                        status,
                        step: productStep || defaultStep,
                        created: stat.birthtime.toISOString(),
                        lastUpdated: stat.mtime.toISOString(),
                        filePath: path.relative(OPERATIONS_DIR, filePath),
                        size: stat.size
                    });
                }
            });
        });

        return products.sort((a, b) => a.created.localeCompare(b.created));
    } catch (err) {
        console.error(`Error getting MDMP products for ${opId}:`, err);
        return [];
    }
}

/**
 * Get all POAMs for an operation (NIST SP 800-171 compliant)
 */
function getPOAMs(opId) {
    try {
        const poams = [];
        const poamDir = path.join(OPERATIONS_DIR, opId, 'POAMs');

        if (!fs.existsSync(poamDir)) {
            return [];
        }

        const files = fs.readdirSync(poamDir);
        files.forEach(file => {
            if (!file.startsWith('POAM-') || !file.endsWith('.md')) return;

            const filePath = path.join(poamDir, file);
            const stat = fs.statSync(filePath);
            const content = fs.readFileSync(filePath, 'utf8');

            // Extract metadata from NIST metadata block
            const metadataRegex = /<!-- NIST SP 800-171 POA&M METADATA\n([\s\S]*?)\n-->/;
            let weakness = '';
            let nistControl = '';
            let responsibleOrganization = '';
            let scheduledCompletionDate = '';
            let status = 'ongoing';
            let priority = 'medium';
            let weaknessIdentification = '';

            const metadataMatch = content.match(metadataRegex);
            if (metadataMatch) {
                const metadataContent = metadataMatch[1];
                const lines = metadataContent.split('\n');

                lines.forEach(line => {
                    const trimmed = line.trim();
                    if (trimmed.startsWith('weakness:')) weakness = line.split(':')[1]?.trim() || '';
                    if (trimmed.startsWith('nistControl:')) nistControl = line.split(':')[1]?.trim() || '';
                    if (trimmed.startsWith('responsibleOrganization:')) responsibleOrganization = line.split(':')[1]?.trim() || '';
                    if (trimmed.startsWith('scheduledCompletionDate:')) scheduledCompletionDate = line.split(':')[1]?.trim() || '';
                    if (trimmed.startsWith('status:')) status = line.split(':')[1]?.trim() || 'ongoing';
                    if (trimmed.startsWith('priority:')) priority = line.split(':')[1]?.trim() || 'medium';
                    if (trimmed.startsWith('weaknessIdentification:')) weaknessIdentification = line.split(':')[1]?.trim() || '';
                });
            } else {
                // Fallback: extract from markdown content (for old format)
                const lines = content.split('\n');
                for (let i = 0; i < Math.min(30, lines.length); i++) {
                    const line = lines[i];
                    if (line.startsWith('# POA&M:')) weakness = line.replace(/^# POA&M:\s*/, '').trim();
                    if (line.includes('**Title:**')) weakness = line.split('**Title:**')[1]?.trim() || weakness;
                    if (line.includes('**Status:**')) status = line.split('**Status:**')[1]?.trim().replace(/[✅🔄]/g, '').trim() || 'ongoing';
                    if (line.includes('**Severity:**')) priority = line.split('**Severity:**')[1]?.trim().replace(/[🔴🟠🟡🟢]/g, '').trim().toLowerCase() || 'medium';
                    if (line.includes('**Control:**')) nistControl = line.split('**Control:**')[1]?.trim() || '';
                    if (line.includes('**Weakness:**')) weakness = line.split('**Weakness:**')[1]?.trim() || weakness;
                    if (line.includes('**Responsible Organization:**')) responsibleOrganization = line.split('**Responsible Organization:**')[1]?.trim() || '';
                    if (line.includes('**Target Remediation:**')) scheduledCompletionDate = line.split('**Target Remediation:**')[1]?.trim() || '';
                }
            }

            // Generate title from weakness or filename
            const title = weakness || file.replace(/^POAM-\d+_/, '').replace('.md', '');
            const dueDate = scheduledCompletionDate;
            const owner = responsibleOrganization;

            poams.push({
                id: path.basename(file, '.md').split('_')[0], // Extract POAM-###
                title: title,
                weakness: weakness,
                nistControl: nistControl,
                responsibleOrganization: responsibleOrganization,
                scheduledCompletionDate: scheduledCompletionDate,
                weaknessIdentification: weaknessIdentification,
                status: status,
                priority: priority,
                owner: owner,
                dueDate: dueDate,
                description: weakness,
                created: stat.birthtime.toISOString(),
                lastUpdated: stat.mtime.toISOString(),
                filePath: path.relative(OPERATIONS_DIR, filePath)
            });
        });

        return poams.sort((a, b) => {
            const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
            const aPriority = priorityOrder[a.priority.toLowerCase()] || 2;
            const bPriority = priorityOrder[b.priority.toLowerCase()] || 2;
            return aPriority - bPriority || b.lastUpdated.localeCompare(a.lastUpdated);
        });
    } catch (err) {
        console.error(`Error getting POAMs for ${opId}:`, err);
        return [];
    }
}

/**
 * Get all incidents for an operation
 */
function getIncidents(opId) {
    try {
        const incidents = [];
        const execDir = path.join(OPERATIONS_DIR, opId, 'EXECUTION');

        if (!fs.existsSync(execDir)) {
            return [];
        }

        const files = fs.readdirSync(execDir);
        files.forEach(file => {
            if (!file.startsWith('Incident_') || !file.endsWith('.md')) return;

            const filePath = path.join(execDir, file);
            const stat = fs.statSync(filePath);
            const content = fs.readFileSync(filePath, 'utf8');

            // Extract metadata
            let title = '';
            let severity = 'medium';
            let status = 'active';
            let affectedAssets = [];

            const lines = content.split('\n');
            for (let i = 0; i < Math.min(30, lines.length); i++) {
                const line = lines[i];
                if (line.startsWith('# ')) title = line.replace(/^#\s+/, '').trim();
                if (line.includes('**Severity:**')) severity = line.split('**Severity:**')[1]?.trim() || 'medium';
                if (line.includes('**Status:**')) status = line.split('**Status:**')[1]?.trim() || 'active';
                if (line.includes('**Affected Assets:**')) {
                    const assetStr = line.split('**Affected Assets:**')[1]?.trim() || '';
                    affectedAssets = assetStr.split(',').map(a => a.trim()).filter(a => a);
                }
            }

            incidents.push({
                id: path.basename(file, '.md'),
                title: title || file.replace('.md', ''),
                severity,
                status,
                affectedAssets,
                created: stat.birthtime.toISOString(),
                lastUpdated: stat.mtime.toISOString(),
                filePath: path.relative(OPERATIONS_DIR, filePath)
            });
        });

        return incidents.sort((a, b) => {
            const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
            const aSeverity = severityOrder[a.severity.toLowerCase()] || 2;
            const bSeverity = severityOrder[b.severity.toLowerCase()] || 2;
            return aSeverity - bSeverity || b.lastUpdated.localeCompare(a.lastUpdated);
        });
    } catch (err) {
        console.error(`Error getting incidents for ${opId}:`, err);
        return [];
    }
}

/**
 * Create a new POAM file (NIST SP 800-171 compliant)
 */
function createPOAM(opId, poamData) {
    try {
        const poamDir = path.join(OPERATIONS_DIR, opId, 'POAMs');

        // Ensure directory exists
        if (!fs.existsSync(poamDir)) {
            fs.mkdirSync(poamDir, { recursive: true });
        }

        // Generate POAM ID
        const existingPoams = fs.readdirSync(poamDir).filter(f => f.startsWith('POAM-'));
        const maxId = existingPoams.reduce((max, f) => {
            const match = f.match(/POAM-(\d+)/);
            return match ? Math.max(max, parseInt(match[1])) : max;
        }, 0);

        const poamId = `POAM-${String(maxId + 1).padStart(3, '0')}`;

        // Use weakness field as filename base (NIST standard)
        const filenameSafe = (poamData.weakness || poamData.title || 'POAM')
            .replace(/\s+/g, '_')
            .replace(/[^a-zA-Z0-9_-]/g, '')
            .substring(0, 40);
        const filename = `${poamId}_${filenameSafe}.md`;
        const filePath = path.join(poamDir, filename);

        // Create POAM content with NIST SP 800-171 metadata
        const now = new Date().toISOString();
        const today = now.split('T')[0];

        const metadata = {
            weakness: poamData.weakness || 'TBD',
            responsibleOrganization: poamData.responsibleOrganization || 'TBD',
            nistControl: poamData.nistControl || 'TBD',
            scheduledCompletionDate: poamData.scheduledCompletionDate || today,
            weaknessIdentification: poamData.weaknessIdentification || 'assessment',
            status: poamData.status || 'ongoing',
            priority: poamData.priority || 'medium',
            resourceEstimate: poamData.resourceEstimate || '',
            milestones: poamData.milestones || '',
            changesNote: poamData.changesNote || '',
            createdDate: today,
            lastUpdatedDate: today
        };

        // Build metadata comment block
        let metadataBlock = '<!-- NIST SP 800-171 POA&M METADATA\n';
        Object.entries(metadata).forEach(([key, value]) => {
            if (value) {
                if (key === 'milestones' && Array.isArray(value)) {
                    metadataBlock += `${key}:\n`;
                    value.forEach(m => metadataBlock += `  - ${m}\n`);
                } else if (key === 'milestones' && typeof value === 'string' && value.includes('\n')) {
                    metadataBlock += `${key}:\n`;
                    value.split('\n').forEach(m => {
                        if (m.trim()) metadataBlock += `  - ${m.trim()}\n`;
                    });
                } else {
                    metadataBlock += `${key}: ${value}\n`;
                }
            }
        });
        metadataBlock += '-->\n\n';

        // Create POAM content
        const content = `${metadataBlock}# POA&M: ${poamData.weakness || 'New Finding'}

## NIST SP 800-171 Compliance

**Control:** ${poamData.nistControl || 'TBD'}
**Severity:** ${poamData.priority === 'critical' ? '🔴' : poamData.priority === 'high' ? '🟠' : poamData.priority === 'medium' ? '🟡' : '🟢'} ${poamData.priority?.toUpperCase() || 'MEDIUM'}
**Weakness:** ${poamData.weakness || 'TBD'}

---

## Executive Summary

**POAM ID:** ${poamId}
**Responsible Organization:** ${poamData.responsibleOrganization || 'TBD'}
**Status:** ${poamData.status === 'complete' ? '✅ Complete' : '🔄 Ongoing'}
**Target Remediation:** ${poamData.scheduledCompletionDate || 'TBD'}

---

## Weakness Description

${poamData.weakness || 'Description of the control requirement not met.'}

---

## Remediation Plan

**Responsible Organization:** ${poamData.responsibleOrganization || 'TBD'}
**Resource Estimate:** ${poamData.resourceEstimate || 'TBD'}
**Target Completion:** ${poamData.scheduledCompletionDate || 'TBD'}

### Milestones

${poamData.milestones ? poamData.milestones.split('\n').map(m => m.trim()).filter(m => m).map(m => `- ${m}`).join('\n') : '- [ ] Milestone 1\n- [ ] Milestone 2\n- [ ] Milestone 3'}

### Changes to Original Plan

${poamData.changesNote || 'No changes to original milestones'}

---

**Identification Method:** ${poamData.weaknessIdentification || 'Assessment'}
**Created:** ${today}
**Last Updated:** ${today}

UNCLASSIFIED // FOUO | CyberOpsPlanner | ${today}
`;

        fs.writeFileSync(filePath, content, 'utf8');

        return {
            success: true,
            id: poamId,
            filename,
            filePath: path.relative(OPERATIONS_DIR, filePath),
            message: `POAM ${poamId} created successfully`
        };
    } catch (err) {
        console.error(`Error creating POAM for ${opId}:`, err);
        return {
            success: false,
            error: err.message
        };
    }
}

/**
 * Update a POAM file (NIST SP 800-171 compliant)
 */
function updatePOAM(opId, poamId, poamData) {
    try {
        const poamDir = path.join(OPERATIONS_DIR, opId, 'POAMs');

        // Find the POAM file
        const files = fs.readdirSync(poamDir);
        const poamFile = files.find(f => f.startsWith(poamId));

        if (!poamFile) {
            return {
                success: false,
                error: `POAM ${poamId} not found`
            };
        }

        const filePath = path.join(poamDir, poamFile);
        let content = fs.readFileSync(filePath, 'utf8');

        // Update metadata block if present
        const metadataRegex = /<!-- NIST SP 800-171 POA&M METADATA\n([\s\S]*?)\n-->/;
        const today = new Date().toISOString().split('T')[0];

        if (metadataRegex.test(content)) {
            // Update existing metadata block
            let metadataBlock = '<!-- NIST SP 800-171 POA&M METADATA\n';

            // Preserve existing values but update changed ones
            Object.entries(poamData).forEach(([key, value]) => {
                if (value) {
                    if (key === 'milestones' && Array.isArray(value)) {
                        metadataBlock += `${key}:\n`;
                        value.forEach(m => metadataBlock += `  - ${m}\n`);
                    } else if (key === 'milestones' && typeof value === 'string' && value.includes('\n')) {
                        metadataBlock += `${key}:\n`;
                        value.split('\n').forEach(m => {
                            if (m.trim()) metadataBlock += `  - ${m.trim()}\n`;
                        });
                    } else if (key !== 'createdDate') { // Don't change created date
                        metadataBlock += `${key}: ${value}\n`;
                    }
                }
            });

            // Always update lastUpdatedDate
            metadataBlock += `lastUpdatedDate: ${today}\n`;
            metadataBlock += '-->\n';

            content = content.replace(metadataRegex, metadataBlock);
        }

        // Update specific content sections for NIST fields
        if (poamData.weakness) {
            content = content.replace(
                /# POA&M:.+/,
                `# POA&M: ${poamData.weakness}`
            );
            content = content.replace(
                /\*\*Weakness:\*\*.+/,
                `**Weakness:** ${poamData.weakness}`
            );
        }

        if (poamData.nistControl) {
            content = content.replace(
                /\*\*Control:\*\*.+/,
                `**Control:** ${poamData.nistControl}`
            );
        }

        if (poamData.status) {
            const statusIcon = poamData.status === 'complete' ? '✅' : '🔄';
            const statusText = poamData.status === 'complete' ? 'Complete' : 'Ongoing';
            content = content.replace(
                /\*\*Status:\*\* .+/,
                `**Status:** ${statusIcon} ${statusText}`
            );
        }

        if (poamData.priority) {
            const priorityIcon = poamData.priority === 'critical' ? '🔴' :
                                poamData.priority === 'high' ? '🟠' :
                                poamData.priority === 'medium' ? '🟡' : '🟢';
            content = content.replace(
                /\*\*Severity:\*\* .+/,
                `**Severity:** ${priorityIcon} ${poamData.priority.toUpperCase()}`
            );
        }

        if (poamData.responsibleOrganization) {
            content = content.replace(
                /\*\*Responsible Organization:\*\*.+/,
                `**Responsible Organization:** ${poamData.responsibleOrganization}`
            );
        }

        if (poamData.scheduledCompletionDate) {
            content = content.replace(
                /\*\*Target Remediation:\*\*.+/,
                `**Target Remediation:** ${poamData.scheduledCompletionDate}`
            );
        }

        // Update last modified timestamp in footer
        content = content.replace(
            /CyberOpsPlanner \| \d{4}-\d{2}-\d{2}$/m,
            `CyberOpsPlanner | ${today}`
        );

        fs.writeFileSync(filePath, content, 'utf8');

        return {
            success: true,
            id: poamId,
            message: `POAM ${poamId} updated successfully`
        };
    } catch (err) {
        console.error(`Error updating POAM for ${opId}:`, err);
        return {
            success: false,
            error: err.message
        };
    }
}

/**
 * Delete a POAM file
 */
function deletePOAM(opId, poamId) {
    try {
        const poamDir = path.join(OPERATIONS_DIR, opId, 'POAMs');

        // Find the POAM file
        const files = fs.readdirSync(poamDir);
        const poamFile = files.find(f => f.startsWith(poamId));

        if (!poamFile) {
            return {
                success: false,
                error: `POAM ${poamId} not found`
            };
        }

        const filePath = path.join(poamDir, poamFile);
        fs.unlinkSync(filePath);

        return {
            success: true,
            id: poamId,
            message: `POAM ${poamId} deleted successfully`
        };
    } catch (err) {
        console.error(`Error deleting POAM for ${opId}:`, err);
        return {
            success: false,
            error: err.message
        };
    }
}

/**
 * Create a new MDMP product (deliverable)
 */
function createMDMPProduct(opId, productData) {
    try {
        const step = productData.step || 1;

        // Map step to folder
        const stepFolderMap = {
            1: 'PLANNING', 2: 'INTELLIGENCE', 3: 'PLANNING', 4: 'PLANNING',
            5: 'PLANNING', 6: 'PLANNING', 7: 'OPERATIONS'
        };
        const stepNames = {
            1: 'Receipt of Mission', 2: 'Mission Analysis', 3: 'COA Development',
            4: 'COA Analysis', 5: 'COA Comparison', 6: 'COA Approval', 7: 'Orders Production'
        };

        const folder = stepFolderMap[step];
        const stepName = stepNames[step];

        if (!folder) {
            return {
                success: false,
                error: `Invalid MDMP step: ${step}`
            };
        }

        const productDir = path.join(OPERATIONS_DIR, opId, folder);

        // Ensure directory exists
        if (!fs.existsSync(productDir)) {
            fs.mkdirSync(productDir, { recursive: true });
        }

        // Generate product ID
        const now = new Date();
        const dateStr = now.toISOString().split('T')[0];
        const productId = `MDMP-Step${step}-${dateStr}`;

        // Create filename
        const filenameSafe = (productData.title || `Deliverable-Step-${step}`)
            .replace(/\s+/g, '_')
            .replace(/[^a-zA-Z0-9_-]/g, '')
            .substring(0, 40);
        const filename = `${productId}_${filenameSafe}.md`;
        const filePath = path.join(productDir, filename);

        // Create product content
        const content = `<!-- METADATA
step: ${step}
title: ${productData.title || 'Untitled Deliverable'}
created: ${dateStr}
status: draft
owner: ${productData.owner || 'TBD'}
-->

# ${productData.title || 'Untitled Deliverable'}

**MDMP Step ${step}:** ${stepName}
**Status:** Draft
**Created:** ${dateStr}

## Overview

${productData.description || 'Deliverable for MDMP step ' + step}

## Key Points

- Point 1
- Point 2
- Point 3

## Recommendations

To be completed...

---

Generated by CyberOpsPlanner Dashboard | ${dateStr}
`;

        fs.writeFileSync(filePath, content, 'utf8');

        return {
            success: true,
            id: productId,
            filename,
            filePath: path.relative(OPERATIONS_DIR, filePath),
            message: `MDMP product created successfully`
        };
    } catch (err) {
        console.error(`Error creating MDMP product for ${opId}:`, err);
        return {
            success: false,
            error: err.message
        };
    }
}

/**
 * Delete an MDMP product
 */
function deleteMDMPProduct(opId, productId) {
    try {
        // Find the product file across all folders
        const folders = ['PLANNING', 'INTELLIGENCE', 'OPERATIONS'];
        let filePath = null;

        for (const folder of folders) {
            const folderPath = path.join(OPERATIONS_DIR, opId, folder);
            if (!fs.existsSync(folderPath)) continue;

            const files = fs.readdirSync(folderPath);
            const productFile = files.find(f => f.includes(productId));

            if (productFile) {
                filePath = path.join(folderPath, productFile);
                break;
            }
        }

        if (!filePath) {
            return {
                success: false,
                error: `MDMP product ${productId} not found`
            };
        }

        fs.unlinkSync(filePath);

        return {
            success: true,
            id: productId,
            message: `MDMP product deleted successfully`
        };
    } catch (err) {
        console.error(`Error deleting MDMP product for ${opId}:`, err);
        return {
            success: false,
            error: err.message
        };
    }
}

/**
 * Create a new incident report
 */
function createIncident(opId, incidentData) {
    try {
        const execDir = path.join(OPERATIONS_DIR, opId, 'EXECUTION');

        // Ensure directory exists
        if (!fs.existsSync(execDir)) {
            fs.mkdirSync(execDir, { recursive: true });
        }

        // Generate incident ID
        const now = new Date();
        const dateStr = now.toISOString().split('T')[0].replace(/-/g, '');
        const timeStr = String(now.getHours()).padStart(2, '0') + String(now.getMinutes()).padStart(2, '0');
        const incidentId = `Incident_${dateStr}_${timeStr}`;
        const filename = `${incidentId}_${incidentData.title.replace(/\s+/g, '_').substring(0, 30)}.md`;
        const filePath = path.join(execDir, filename);

        // Create incident content
        const nowFormatted = new Date().toISOString().split('T')[0];
        const content = `# ${incidentData.title}

**Incident ID:** ${incidentId}
**Reported:** ${nowFormatted}
**Severity:** ${incidentData.severity || 'medium'}
**Status:** ${incidentData.status || 'active'}
**Affected Assets:** ${incidentData.affectedAssets?.join(', ') || 'TBD'}

## Description

${incidentData.description || 'Initial incident description.'}

## Timeline

| Time | Event | Notes |
|------|-------|-------|
| ${nowFormatted} | Incident Reported | Initial detection/report |

## Analysis

- **Suspected Attack Vector:** ${incidentData.vector || 'TBD'}
- **Initial Scope:** ${incidentData.scope || 'TBD'}
- **Containment Status:** ${incidentData.containmentStatus || 'Ongoing'}

## Response Actions

- [ ] Isolate affected systems
- [ ] Collect forensic data
- [ ] Notify stakeholders
- [ ] Initiate investigation

## Recommendations

${incidentData.recommendations || 'Recommendations to be determined during investigation.'}

---
Generated by CyberOpsPlanner Dashboard | ${nowFormatted}
`;

        fs.writeFileSync(filePath, content, 'utf8');

        return {
            success: true,
            id: incidentId,
            filename,
            filePath: path.relative(OPERATIONS_DIR, filePath),
            message: `Incident ${incidentId} created successfully`
        };
    } catch (err) {
        console.error(`Error creating incident for ${opId}:`, err);
        return {
            success: false,
            error: err.message
        };
    }
}

/**
 * Update MDMP step status
 */
function updateMDMPStepStatus(opId, step, status) {
    try {
        const metadataFile = path.join(OPERATIONS_DIR, opId, 'OPERATION_METADATA.md');

        if (!fs.existsSync(metadataFile)) {
            return {
                success: false,
                error: 'Operation metadata file not found'
            };
        }

        let content = fs.readFileSync(metadataFile, 'utf8');

        // Update step status (simplified - looks for pattern like "Step X Status: value")
        const stepPattern = new RegExp(`Step ${step} Status:.*`, 'i');

        if (stepPattern.test(content)) {
            content = content.replace(stepPattern, `Step ${step} Status: ${status}`);
        } else {
            // Add new entry if not found
            content += `\nStep ${step} Status: ${status}`;
        }

        // Update lastUpdated timestamp
        const now = new Date().toISOString().split('T')[0];
        content = content.replace(/Last Updated:.+/, `Last Updated: ${now}`);

        fs.writeFileSync(metadataFile, content, 'utf8');

        return {
            success: true,
            message: `Step ${step} status updated to ${status}`
        };
    } catch (err) {
        console.error(`Error updating MDMP step status for ${opId}:`, err);
        return {
            success: false,
            error: err.message
        };
    }
}

/**
 * Update operation phase in metadata
 */
function updateOperationPhase(opId, phaseId) {
    try {
        const metadataFile = path.join(OPERATIONS_DIR, opId, 'OPERATION_METADATA.md');

        if (!fs.existsSync(metadataFile)) {
            return {
                success: false,
                error: 'Operation metadata file not found'
            };
        }

        let content = fs.readFileSync(metadataFile, 'utf8');

        // Map phaseId to full phase name
        const phaseMap = {
            'planning': 'Planning Phase - Deployment & Integration',
            'execution': 'Execution Phase - Active Operations',
            'transition': 'Transition Phase - Hardening & Sustainment',
            'completion': 'Completion Phase - Assessment & Closure'
        };

        const phaseName = phaseMap[phaseId.toLowerCase()] || phaseId;

        // Update Current Status line
        const statusPattern = /\*\*Current Status:\*\*.*/i;

        if (statusPattern.test(content)) {
            content = content.replace(statusPattern, `**Current Status:** ${phaseName}`);
        } else {
            // Add new entry if not found
            content += `\n**Current Status:** ${phaseName}`;
        }

        // Update Status Last Updated timestamp
        const now = new Date().toISOString();
        const lastUpdatedPattern = /\*\*Status Last Updated:\*\*.*/i;

        if (lastUpdatedPattern.test(content)) {
            content = content.replace(lastUpdatedPattern, `**Status Last Updated:** ${now}`);
        } else {
            content += `\n**Status Last Updated:** ${now}`;
        }

        fs.writeFileSync(metadataFile, content, 'utf8');

        return {
            success: true,
            message: `Operation phase transitioned to ${phaseName}`,
            phase: phaseId,
            phaseName: phaseName
        };
    } catch (err) {
        console.error(`Error updating operation phase for ${opId}:`, err);
        return {
            success: false,
            error: err.message
        };
    }
}

// ============================================
// STAFF SECTION PRODUCT FUNCTIONS
// ============================================

/**
 * Get all products for a staff section within an operation
 */
function getStaffProducts(opId, sectionCode) {
    try {
        const products = [];
        const section = STAFF_SECTIONS[sectionCode];
        if (!section) return [];

        // Primary path: STAFF/{code}/products/
        const staffDir = path.join(OPERATIONS_DIR, opId, 'STAFF', sectionCode, 'products');
        if (fs.existsSync(staffDir)) {
            const files = fs.readdirSync(staffDir);
            files.forEach(file => {
                if (!file.endsWith('.md')) return;
                const filePath = path.join(staffDir, file);
                const stat = fs.statSync(filePath);
                const content = fs.readFileSync(filePath, 'utf8');

                let title = file.replace('.md', '').replace(/_/g, ' ');
                let status = 'draft';
                let step = null;
                let owner = '';

                const metaMatch = content.match(/<!-- METADATA\s*([\s\S]*?)-->/);
                if (metaMatch) {
                    const mc = metaMatch[1];
                    const titleMatch = mc.match(/title:\s*(.+)/);
                    const statusMatch = mc.match(/status:\s*(.+)/);
                    const stepMatch = mc.match(/step:\s*(\d+)/);
                    const ownerMatch = mc.match(/owner:\s*(.+)/);
                    if (titleMatch) title = titleMatch[1].trim();
                    if (statusMatch) status = statusMatch[1].trim();
                    if (stepMatch) step = parseInt(stepMatch[1]);
                    if (ownerMatch) owner = ownerMatch[1].trim();
                }

                const headingMatch = content.match(/^#\s+(.+)$/m);
                if (headingMatch) title = headingMatch[1];

                products.push({
                    id: path.basename(file, '.md'),
                    title,
                    status,
                    step,
                    owner,
                    sectionCode,
                    created: stat.birthtime.toISOString(),
                    lastUpdated: stat.mtime.toISOString(),
                    filePath: path.relative(OPERATIONS_DIR, filePath),
                    size: stat.size
                });
            });
        }

        // Legacy path for CYBER section: also scan PLANNING/, INTELLIGENCE/, OPERATIONS/
        if (section.legacy) {
            const legacyProducts = getMDMPProducts(opId);
            legacyProducts.forEach(p => {
                // Avoid duplicates
                if (!products.find(existing => existing.id === p.id)) {
                    products.push({ ...p, sectionCode: 'CYBER', legacy: true });
                }
            });
        }

        return products.sort((a, b) => a.created.localeCompare(b.created));
    } catch (err) {
        console.error(`Error getting staff products for ${opId}/${sectionCode}:`, err);
        return [];
    }
}

/**
 * Create a new staff product
 */
function createStaffProduct(opId, sectionCode, productData) {
    try {
        const section = STAFF_SECTIONS[sectionCode];
        if (!section) {
            return { success: false, error: `Unknown staff section: ${sectionCode}` };
        }

        const productDir = path.join(OPERATIONS_DIR, opId, 'STAFF', sectionCode, 'products');
        if (!fs.existsSync(productDir)) {
            fs.mkdirSync(productDir, { recursive: true });
        }

        const now = new Date();
        const dateStr = now.toISOString().split('T')[0];
        const filenameSafe = (productData.title || 'Product')
            .replace(/\s+/g, '_')
            .replace(/[^a-zA-Z0-9_-]/g, '')
            .substring(0, 40);
        const filename = `${sectionCode}-${dateStr}_${filenameSafe}.md`;
        const filePath = path.join(productDir, filename);

        const step = productData.step || '';
        const content = `<!-- METADATA
sectionCode: ${sectionCode}
title: ${productData.title || 'Untitled Product'}
created: ${dateStr}
status: draft
step: ${step}
owner: ${productData.owner || 'TBD'}
-->

# ${productData.title || 'Untitled Product'}

**Staff Section:** ${section.name} (${sectionCode})
**Status:** Draft
**Created:** ${dateStr}
${step ? `**MDMP Step:** ${step}` : ''}

## Overview

${productData.description || `${section.name} product for the current operation.`}

## Key Points

- Point 1
- Point 2
- Point 3

## Recommendations

To be completed...

---

UNCLASSIFIED // FOUO | CyberOpsPlanner | ${dateStr}
`;

        fs.writeFileSync(filePath, content, 'utf8');

        return {
            success: true,
            id: path.basename(filename, '.md'),
            filename,
            filePath: path.relative(OPERATIONS_DIR, filePath),
            message: `${section.name} product created successfully`
        };
    } catch (err) {
        console.error(`Error creating staff product for ${opId}/${sectionCode}:`, err);
        return { success: false, error: err.message };
    }
}

/**
 * Delete a staff product
 */
function deleteStaffProduct(opId, sectionCode, productId) {
    try {
        const productDir = path.join(OPERATIONS_DIR, opId, 'STAFF', sectionCode, 'products');
        if (!fs.existsSync(productDir)) {
            return { success: false, error: `Product directory not found` };
        }

        const files = fs.readdirSync(productDir);
        const productFile = files.find(f => f.includes(productId));
        if (!productFile) {
            return { success: false, error: `Product ${productId} not found` };
        }

        fs.unlinkSync(path.join(productDir, productFile));
        return { success: true, id: productId, message: `Product deleted successfully` };
    } catch (err) {
        console.error(`Error deleting staff product:`, err);
        return { success: false, error: err.message };
    }
}

/**
 * Get annex status for all annexes in an operation
 */
function getAnnexStatus(opId) {
    const annexes = [];
    for (const [letter, info] of Object.entries(ANNEX_MAP)) {
        const annex = {
            letter,
            title: info.title,
            owner: info.owner,
            description: info.description,
            status: 'not_started',
            filePath: null
        };

        // Check STAFF/{owner}/annexes/ first
        if (info.owner && STAFF_SECTIONS[info.owner]) {
            const annexPath = path.join(OPERATIONS_DIR, opId, 'STAFF', info.owner, 'annexes', `Annex_${letter}_${info.title.replace(/\s+/g, '_')}.md`);
            if (fs.existsSync(annexPath)) {
                annex.status = 'exists';
                annex.filePath = path.relative(OPERATIONS_DIR, annexPath);
            }
        }

        // Fallback: check OPERATIONS/ for legacy files
        if (!annex.filePath) {
            const opsDir = path.join(OPERATIONS_DIR, opId, 'OPERATIONS');
            if (fs.existsSync(opsDir)) {
                const files = fs.readdirSync(opsDir);
                const match = files.find(f => {
                    const fl = f.toLowerCase();
                    if (fl.includes(`annex_${letter.toLowerCase()}`) || fl.includes(`annex-${letter.toLowerCase()}`)) return true;
                    // Legacy name mappings
                    if (letter === 'M' && fl.includes('cyber_annex')) return true;
                    if (letter === 'A' && fl.includes('task_organization')) return true;
                    return false;
                });
                if (match) {
                    annex.status = 'exists';
                    annex.filePath = path.relative(OPERATIONS_DIR, path.join(opsDir, match));
                }
            }
        }

        annexes.push(annex);
    }
    return annexes;
}

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
    console.log(`📡 API: ${req.method} ${pathname}`);

    // Network Map API Endpoints
    if (pathname === '/api/network-map/data') {
        const operationId = urlObj.searchParams.get('operation');
        if (!operationId) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Missing required parameter: operation' }));
            return;
        }
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
        let aborted = false;
        req.on('data', chunk => {
            if (aborted) return;
            body += chunk.toString();
            if (body.length > 10 * 1024 * 1024) {
                aborted = true;
                res.writeHead(413, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Payload too large' }));
                req.socket.destroy();
            }
        });

        req.on('end', () => {
            try {
                const payload = JSON.parse(body);
                const operationId = payload.operation;
                if (!operationId) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Missing required field: operation' }));
                    return;
                }
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
        const operationId = urlObj.searchParams.get('operation');
        if (!operationId) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Missing required parameter: operation' }));
            return;
        }
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
        const operationId = urlObj.searchParams.get('operation');
        if (!operationId) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Missing required parameter: operation' }));
            return;
        }

        // Dynamic annex lookup from config
        const annexLetter = annexName.replace('ANNEX-', '');
        const annexConfig = ANNEX_MAP[annexLetter];

        if (!annexConfig) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: `Unknown annex: ${annexName}` }));
            return;
        }

        const annexTitle = `ANNEX ${annexLetter}: ${annexConfig.title.toUpperCase()}`;

        // Search for annex file: STAFF/{owner}/annexes/ first, then OPERATIONS/ fallback
        let annexPath = null;
        const owner = annexConfig.owner;

        if (owner && STAFF_SECTIONS[owner]) {
            const staffAnnexPath = path.join(OPERATIONS_DIR, operationId, 'STAFF', owner, 'annexes');
            if (fs.existsSync(staffAnnexPath)) {
                const files = fs.readdirSync(staffAnnexPath);
                const match = files.find(f => f.startsWith(`Annex_${annexLetter}`));
                if (match) annexPath = path.join(staffAnnexPath, match);
            }
        }

        // Fallback: OPERATIONS/ folder for legacy files
        if (!annexPath) {
            const opsDir = path.join(OPERATIONS_DIR, operationId, 'OPERATIONS');
            if (fs.existsSync(opsDir)) {
                const files = fs.readdirSync(opsDir);
                const match = files.find(f =>
                    f.toLowerCase().includes(`annex_${annexLetter.toLowerCase()}`) ||
                    f.toLowerCase().includes(`annex-${annexLetter.toLowerCase()}`) ||
                    (annexLetter === 'M' && f.toLowerCase().includes('cyber_annex')) ||
                    (annexLetter === 'A' && f.toLowerCase().includes('task_organization'))
                );
                if (match) annexPath = path.join(opsDir, match);
            }
        }

        if (!annexPath) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: `Annex ${annexLetter} file not found. Create the annex first.` }));
            return;
        }

        const annexInfo = { title: annexTitle, file: path.relative(__dirname, annexPath) };

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
    }

    // ============================================
    // NEW API ENDPOINTS - DOCTRINE REFERENCES
    // ============================================

    // GET /api/doctrine - Get all doctrine references
    if (pathname === '/api/doctrine') {
        try {
            const doctrine = getAllDoctrine();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(doctrine, null, 2));
        } catch (err) {
            console.error('Error retrieving doctrine:', err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message }));
        }
        return;
    }

    // GET /api/doctrine/step/:step - Get doctrine for MDMP step
    if (pathname.match(/^\/api\/doctrine\/step\/\d+$/)) {
        try {
            const step = pathname.split('/').pop();
            const doctrine = getDoctrineByStep(step);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(doctrine, null, 2));
        } catch (err) {
            console.error('Error retrieving doctrine by step:', err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message }));
        }
        return;
    }

    // GET /api/doctrine/role/:role - Get doctrine for a role
    if (pathname.match(/^\/api\/doctrine\/role\/.+$/)) {
        try {
            const roleParts = pathname.split('/api/doctrine/role/');
            const role = decodeURIComponent(roleParts[1]);
            const doctrine = getDoctrineByRole(role);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(doctrine, null, 2));
        } catch (err) {
            console.error('Error retrieving doctrine by role:', err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message }));
        }
        return;
    }

    // NEW API ENDPOINTS - OPERATION MANAGEMENT
    // ============================================

    // GET /api/operations - List all operations
    if (pathname === '/api/operations') {
        try {
            const operations = listOperations();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(operations, null, 2));
        } catch (err) {
            console.error('Error listing operations:', err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message }));
        }
        return;
    }

    // GET /api/operations/{opId} - Get operation metadata
    if (pathname.match(/^\/api\/operations\/[^/]+$/) && !pathname.includes('/mdmp-products') && !pathname.includes('/poams') && !pathname.includes('/incidents') && !pathname.includes('/mdmp-step')) {
        const opId = pathname.split('/')[3];
        try {
            const metadata = getOperationMetadata(opId);
            if (Object.keys(metadata).length === 0) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: `Operation ${opId} not found` }));
                return;
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ ...metadata, id: opId }, null, 2));
        } catch (err) {
            console.error(`Error getting operation ${opId}:`, err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message }));
        }
        return;
    }

    // GET /api/operations/{opId}/mdmp-products - Get MDMP products
    if (pathname.match(/^\/api\/operations\/[^/]+\/mdmp-products/)) {
        const pathParts = pathname.split('/');
        const opId = pathParts[3];
        const step = urlObj.searchParams.get('step') ? parseInt(urlObj.searchParams.get('step')) : null;

        try {
            const products = getMDMPProducts(opId, step);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(products, null, 2));
        } catch (err) {
            console.error(`Error getting MDMP products for ${opId}:`, err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message }));
        }
        return;
    }

    // GET /api/operations/{opId}/poams - Get all POAMs
    if (pathname.match(/^\/api\/operations\/[^/]+\/poams$/) && req.method === 'GET') {
        const opId = pathname.split('/')[3];

        try {
            const poams = getPOAMs(opId);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(poams, null, 2));
        } catch (err) {
            console.error(`Error getting POAMs for ${opId}:`, err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message }));
        }
        return;
    }

    // POST /api/operations/{opId}/poams - Create new POAM
    if (pathname.match(/^\/api\/operations\/[^/]+\/poams$/) && req.method === 'POST') {
        const opId = pathname.split('/')[3];
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
            if (body.length > 1024 * 1024) {
                res.writeHead(413, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Payload too large' }));
                req.socket.destroy();
                return;
            }
        });

        req.on('end', () => {
            try {
                const poamData = JSON.parse(body);
                const result = createPOAM(opId, poamData);

                res.writeHead(result.success ? 201 : 400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(result, null, 2));
            } catch (err) {
                console.error('Error creating POAM:', err);
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: err.message }));
            }
        });
        return;
    }

    // PUT /api/operations/{opId}/poams/{poamId} - Update POAM
    if (pathname.match(/^\/api\/operations\/[^/]+\/poams\/[^/]+$/) && req.method === 'PUT') {
        const pathParts = pathname.split('/');
        const opId = pathParts[3];
        const poamId = pathParts[5];
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
            if (body.length > 1024 * 1024) {
                res.writeHead(413, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Payload too large' }));
                req.socket.destroy();
                return;
            }
        });

        req.on('end', () => {
            try {
                const poamData = JSON.parse(body);
                const result = updatePOAM(opId, poamId, poamData);

                res.writeHead(result.success ? 200 : 400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(result, null, 2));
            } catch (err) {
                console.error('Error updating POAM:', err);
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: err.message }));
            }
        });
        return;
    }

    // DELETE /api/operations/{opId}/poams/{poamId} - Delete POAM
    if (pathname.match(/^\/api\/operations\/[^/]+\/poams\/[^/]+$/) && req.method === 'DELETE') {
        const pathParts = pathname.split('/');
        const opId = pathParts[3];
        const poamId = pathParts[5];

        try {
            const result = deletePOAM(opId, poamId);
            res.writeHead(result.success ? 200 : 404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(result, null, 2));
        } catch (err) {
            console.error('Error deleting POAM:', err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message }));
        }
        return;
    }

    // GET /api/operations/{opId}/incidents - Get all incidents
    if (pathname.match(/^\/api\/operations\/[^/]+\/incidents$/) && req.method === 'GET') {
        const opId = pathname.split('/')[3];

        try {
            const incidents = getIncidents(opId);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(incidents, null, 2));
        } catch (err) {
            console.error(`Error getting incidents for ${opId}:`, err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message }));
        }
        return;
    }

    // POST /api/operations/{opId}/incidents - Create new incident
    if (pathname.match(/^\/api\/operations\/[^/]+\/incidents$/) && req.method === 'POST') {
        const opId = pathname.split('/')[3];
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
            if (body.length > 1024 * 1024) {
                res.writeHead(413, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Payload too large' }));
                req.socket.destroy();
                return;
            }
        });

        req.on('end', () => {
            try {
                const incidentData = JSON.parse(body);
                const result = createIncident(opId, incidentData);

                res.writeHead(result.success ? 201 : 400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(result, null, 2));
            } catch (err) {
                console.error('Error creating incident:', err);
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: err.message }));
            }
        });
        return;
    }

    // POST /api/operations/{opId}/mdmp-step/{step}/update - Update MDMP step status
    if (pathname.match(/^\/api\/operations\/[^/]+\/mdmp-step\/\d+\/update$/) && req.method === 'POST') {
        const pathParts = pathname.split('/');
        const opId = pathParts[3];
        const step = parseInt(pathParts[5]);
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
            if (body.length > 10 * 1024) {
                req.connection.destroy();
            }
        });

        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                const result = updateMDMPStepStatus(opId, step, data.status);

                res.writeHead(result.success ? 200 : 400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(result, null, 2));
            } catch (err) {
                console.error(`Error updating MDMP step ${step}:`, err);
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: err.message }));
            }
        });
        return;
    }

    // PUT /api/operations/{opId}/phase - Update operation phase
    if (pathname.match(/^\/api\/operations\/[^/]+\/phase$/) && req.method === 'PUT') {
        console.log(`🔄 Phase transition request: ${pathname}`);
        const pathParts = pathname.split('/');
        const opId = pathParts[3];
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
            if (body.length > 10 * 1024) {
                req.connection.destroy();
            }
        });

        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                const phaseId = data.phase;

                if (!phaseId) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'phase field required' }));
                    return;
                }

                const result = updateOperationPhase(opId, phaseId);

                res.writeHead(result.success ? 200 : 400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(result, null, 2));
            } catch (err) {
                console.error(`Error updating phase for ${opId}:`, err);
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: err.message }));
            }
        });
        return;
    }

    // POST /api/operations/{opId}/mdmp-products - Create new MDMP product
    if (pathname.match(/^\/api\/operations\/[^/]+\/mdmp-products$/) && req.method === 'POST') {
        const opId = pathname.split('/')[3];
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
            if (body.length > 1024 * 1024) {
                res.writeHead(413, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Payload too large' }));
                req.socket.destroy();
                return;
            }
        });

        req.on('end', () => {
            try {
                const productData = JSON.parse(body);
                const result = createMDMPProduct(opId, productData);

                res.writeHead(result.success ? 201 : 400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(result, null, 2));
            } catch (err) {
                console.error('Error creating MDMP product:', err);
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: err.message }));
            }
        });
        return;
    }

    // DELETE /api/operations/{opId}/mdmp-products/{productId} - Delete MDMP product
    if (pathname.match(/^\/api\/operations\/[^/]+\/mdmp-products\/[^/]+$/) && req.method === 'DELETE') {
        const pathParts = pathname.split('/');
        const opId = pathParts[3];
        const productId = pathParts[5];

        try {
            const result = deleteMDMPProduct(opId, productId);
            res.writeHead(result.success ? 200 : 404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(result, null, 2));
        } catch (err) {
            console.error('Error deleting MDMP product:', err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message }));
        }
        return;
    }

    // ============================================
    // STAFF SECTION API ENDPOINTS
    // ============================================

    // GET /api/staff-sections - Get all staff section configs
    if (pathname === '/api/staff-sections') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ sections: STAFF_SECTIONS, annexMap: ANNEX_MAP }, null, 2));
        return;
    }

    // GET /api/operations/{opId}/staff/{code}/products - List products for section
    if (pathname.match(/^\/api\/operations\/[^/]+\/staff\/[^/]+\/products$/) && req.method === 'GET') {
        const pathParts = pathname.split('/');
        const opId = pathParts[3];
        const sectionCode = pathParts[5];

        try {
            const products = getStaffProducts(opId, sectionCode);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(products, null, 2));
        } catch (err) {
            console.error(`Error getting staff products:`, err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message }));
        }
        return;
    }

    // POST /api/operations/{opId}/staff/{code}/products - Create product for section
    if (pathname.match(/^\/api\/operations\/[^/]+\/staff\/[^/]+\/products$/) && req.method === 'POST') {
        const pathParts = pathname.split('/');
        const opId = pathParts[3];
        const sectionCode = pathParts[5];
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
            if (body.length > 1024 * 1024) {
                res.writeHead(413, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Payload too large' }));
                req.socket.destroy();
                return;
            }
        });

        req.on('end', () => {
            try {
                const productData = JSON.parse(body);
                const result = createStaffProduct(opId, sectionCode, productData);
                res.writeHead(result.success ? 201 : 400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(result, null, 2));
            } catch (err) {
                console.error('Error creating staff product:', err);
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: err.message }));
            }
        });
        return;
    }

    // DELETE /api/operations/{opId}/staff/{code}/products/{id} - Delete product
    if (pathname.match(/^\/api\/operations\/[^/]+\/staff\/[^/]+\/products\/[^/]+$/) && req.method === 'DELETE') {
        const pathParts = pathname.split('/');
        const opId = pathParts[3];
        const sectionCode = pathParts[5];
        const productId = pathParts[7];

        try {
            const result = deleteStaffProduct(opId, sectionCode, productId);
            res.writeHead(result.success ? 200 : 404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(result, null, 2));
        } catch (err) {
            console.error('Error deleting staff product:', err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message }));
        }
        return;
    }

    // GET /api/operations/{opId}/annexes - List all annexes with status
    if (pathname.match(/^\/api\/operations\/[^/]+\/annexes$/) && req.method === 'GET') {
        const opId = pathname.split('/')[3];

        try {
            const annexes = getAnnexStatus(opId);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(annexes, null, 2));
        } catch (err) {
            console.error(`Error getting annexes:`, err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message }));
        }
        return;
    }

    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'API endpoint not found' }));
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

// ============================================
// DOCTRINE REFERENCE SYSTEM
// ============================================

/**
 * Doctrine references mapped by MDMP step and role
 * Extracted from docs/doctrine/INDEX.md
 */
const doctrineReferences = {
    mdmpSteps: {
        1: { // Receipt of Mission
            title: "Receipt of Mission",
            references: [
                { publication: "ADP 5-0", file: "ARN18126-ADP_5-0-000-WEB-3.pdf", section: "Operations Process phases, running estimates", cyber: "MDMP foundation; cyber integration at each step" },
                { publication: "FM 2-0", file: "fm2_0.pdf", section: "Intelligence process, threat baseline", cyber: "Threat assessment foundation for cyber" }
            ]
        },
        2: { // Mission Analysis
            title: "Mission Analysis",
            references: [
                { publication: "ATP 2-01.3", file: "ATP_2-01.3_Intelligence_Preparation_of_the_Battlefield.pdf", section: "IPB methodology, cyberspace terrain", cyber: "Cyberspace IPB (OT/IT, logical, physical layers)" },
                { publication: "FM 3-12", file: "Document-11-Department-of-the-Army-FM-3-12.pdf", section: "Cyberspace operations doctrine, terrain", cyber: "Cyber terrain analysis, OAKOC in cyber" }
            ]
        },
        3: { // COA Development
            title: "COA Development",
            references: [
                { publication: "FM 3-12", file: "Document-11-Department-of-the-Army-FM-3-12.pdf", section: "Cyber tasks, control measures", cyber: "Cyber task definitions, task organization" },
                { publication: "ATP 3-12.3", file: "atp3-12-3.pdf", section: "Cyberspace techniques, TTPs, C2", cyber: "Detailed operational procedures for cyber tasks" },
                { publication: "ATP 5-0.1", file: "downloads_Army_Design_Methodology_ATP_5-0.1_July_2015.pdf", section: "Design methodology", cyber: "Approach to COA development" }
            ]
        },
        4: { // COA Analysis (Wargame)
            title: "COA Analysis / Wargame",
            references: [
                { publication: "JP 3-12", file: "2018-JP-3-12-Cyberspace-Operations.pdf", section: "Joint cyber ops, friction points", cyber: "Joint friction, decision points, branch/sequel" },
                { publication: "MITRE ATT&CK", file: "getting-started-with-attack-october-2019.pdf", section: "Threat modeling, tactic/technique mapping", cyber: "Threat COA indicators, wargame indicators" },
                { publication: "ATP 5-0.2.1", file: "atp5_0x2_1.pdf", section: "Wargame procedures", cyber: "Wargame methodology for cyber effects" }
            ]
        },
        5: { // COA Comparison
            title: "COA Comparison",
            references: [
                { publication: "ATP 5-0.2.1", file: "atp5_0x2_1.pdf", section: "Decision criteria, evaluation framework", cyber: "Cyber-specific evaluation criteria" },
                { publication: "FM 3-13", file: "fm3-13_2016.pdf", section: "Information operations integration", cyber: "Cyber as enabler for IO effects" }
            ]
        },
        6: { // COA Approval
            title: "COA Approval",
            references: [
                { publication: "ADP 5-0", file: "ARN18126-ADP_5-0-000-WEB-3.pdf", section: "Commander decision-making, CCIR", cyber: "Commander's critical information requirements for cyber" },
                { publication: "JP 3-12", file: "2018-JP-3-12-Cyberspace-Operations.pdf", section: "USCYBERCOM relationships", cyber: "Joint approval authorities, command relationships" }
            ]
        },
        7: { // Orders Production
            title: "Orders Production",
            references: [
                { publication: "FM 3-12", file: "Document-11-Department-of-the-Army-FM-3-12.pdf", section: "Annex M (Cyber Operations)", cyber: "Cyber annex format, template, control measures" },
                { publication: "ATP 3-12.3", file: "atp3-12-3.pdf", section: "Task definitions, cyber operations tasks", cyber: "Task nomenclature, reporting requirements" }
            ]
        }
    },
    roles: {
        "Cyber Operations Planner": [
            { publication: "FM 3-12", file: "Document-11-Department-of-the-Army-FM-3-12.pdf", key: "Cyber task definitions, control measures, synchronization" },
            { publication: "ATP 3-12.3", file: "atp3-12-3.pdf", key: "Operational procedures, techniques" },
            { publication: "ATP 2-01.3", file: "ATP_2-01.3_Intelligence_Preparation_of_the_Battlefield.pdf", key: "Threat models, IPB methodology" },
            { publication: "MITRE ATT&CK", file: "getting-started-with-attack-october-2019.pdf", key: "Threat COA development" },
            { publication: "JP 3-12", file: "2018-JP-3-12-Cyberspace-Operations.pdf", key: "Joint relationships, command structure" },
            { publication: "ADP 5-0", file: "ARN18126-ADP_5-0-000-WEB-3.pdf", key: "MDMP phases, operations process" }
        ],
        "Host Analyst": [
            { publication: "FM 2-0", file: "fm2_0.pdf", key: "Analysis methodology, collection discipline" },
            { publication: "MITRE ATT&CK", file: "getting-started-with-attack-october-2019.pdf", key: "Technique mapping, host-level tactics" }
        ],
        "Network Analyst": [
            { publication: "FM 2-0", file: "fm2_0.pdf", key: "Analysis methodology, traffic collection" },
            { publication: "MITRE ATT&CK", file: "getting-started-with-attack-october-2019.pdf", key: "Technique mapping, network-level tactics" },
            { publication: "ATP 2-01.3", file: "ATP_2-01.3_Intelligence_Preparation_of_the_Battlefield.pdf", key: "Network terrain analysis" }
        ]
    }
};

/**
 * Get doctrine references for a specific MDMP step
 */
function getDoctrineByStep(step) {
    const stepNum = parseInt(step);
    if (stepNum < 1 || stepNum > 7) {
        return { error: "Invalid MDMP step. Must be 1-7." };
    }
    return doctrineReferences.mdmpSteps[stepNum] || { error: "No doctrine found for this step" };
}

/**
 * Get doctrine references for a specific role
 */
function getDoctrineByRole(role) {
    return doctrineReferences.roles[role] || { error: "Role not found. Try 'Cyber Operations Planner', 'Host Analyst', or 'Network Analyst'" };
}

/**
 * Get all doctrine references
 */
function getAllDoctrine() {
    return doctrineReferences;
}

// Create server
const server = http.createServer((req, res) => {
    const urlObj = new URL(req.url, `http://${req.headers.host}`);
    const pathname = urlObj.pathname;

    // Handle favicon requests (no 404 spam)
    if (pathname === '/favicon.ico') {
        res.writeHead(204);
        res.end();
        return;
    }

    // Handle API requests
    if (pathname.startsWith('/api/')) {
        return handleApiRequest(pathname, req, res);
    }

    // Serve documentation and playbook files from /docs/ folder
    if (pathname.startsWith('/docs/')) {
        const docPath = path.join(__dirname, pathname);
        const fullPath = docPath;

        fs.readFile(fullPath, (err, content) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end(`404 - Documentation file not found: ${pathname}\n`);
            } else {
                const extname = String(path.extname(fullPath)).toLowerCase();
                const mimeTypes = {
                    '.md': 'text/markdown',
                    '.html': 'text/html',
                    '.js': 'application/javascript',
                    '.css': 'text/css',
                    '.json': 'application/json',
                    '.pdf': 'application/pdf',
                    '.txt': 'text/plain'
                };
                const contentType = mimeTypes[extname] || 'application/octet-stream';

                res.writeHead(200, {
                    'Content-Type': contentType,
                    'Access-Control-Allow-Origin': '*'
                });
                res.end(content, 'utf-8');
            }
        });
        return;
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

    // Default to new unified dashboard (index.html)
    let filePath = pathname === '/' ? '/index.html' : pathname;

    // Map URL to file path (serve from frontend folder)
    const fullPath = path.join(__dirname, 'frontend', filePath);

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
