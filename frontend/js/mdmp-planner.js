/**
 * MDMP Planner Module
 * Handles full MDMP step visualization and management
 */

const MDMP_STEPS = [
    { num: 1, name: 'Receipt of Mission', abbr: 'ROM', color: '#3b82f6', folder: 'PLANNING' },
    { num: 2, name: 'Mission Analysis', abbr: 'MA', color: '#06b6d4', folder: 'INTELLIGENCE' },
    { num: 3, name: 'COA Development', abbr: 'COA-D', color: '#8b5cf6', folder: 'PLANNING' },
    { num: 4, name: 'COA Analysis', abbr: 'COA-A', color: '#ec4899', folder: 'PLANNING' },
    { num: 5, name: 'COA Comparison', abbr: 'COA-C', color: '#f59e0b', folder: 'PLANNING' },
    { num: 6, name: 'COA Approval', abbr: 'COA-AP', color: '#10b981', folder: 'PLANNING' },
    { num: 7, name: 'Orders Production', abbr: 'OP', color: '#ef4444', folder: 'OPERATIONS' }
];

// Cache for current products
let currentMDMPProducts = [];
let currentMDMPStep = null;
let currentMDMPOpId = null;

/**
 * Map step numbers to folder names
 */
function getStepFolders(stepNum) {
    const folderMap = {
        1: ['planning', '1'],
        2: ['intelligence', '2'],
        3: ['planning', '3'],
        4: ['planning', '4'],
        5: ['planning', '5'],
        6: ['planning', '6'],
        7: ['operations', '7']
    };
    return folderMap[stepNum] || [];
}

/**
 * Get step count for a specific step
 */
function getStepDeliverableCount(stepNum, products) {
    const validFolders = getStepFolders(stepNum);

    return products.filter(p => {
        // Match by step number (handle both string and number)
        if (p.step === stepNum || p.step === stepNum.toString()) return true;

        // Match by folder/default step (backend returns these as strings)
        if (validFolders.includes(p.step)) return true;

        return false;
    }).length;
}

/**
 * Filter products for a specific step
 */
function getStepDeliverables(stepNum, products) {
    const validFolders = getStepFolders(stepNum);

    return products.filter(p => {
        // Match by step number (handle both string and number)
        if (p.step === stepNum || p.step === stepNum.toString()) return true;

        // Match by folder/default step (backend returns these as strings)
        if (validFolders.includes(p.step)) return true;

        return false;
    });
}

/**
 * Render the MDMP Planner view
 */
async function renderMDMPPlanner(opId) {
    const container = document.getElementById('view-mdmp-planner');
    if (!container) return;

    try {
        const products = await fetch(`/api/operations/${opId}/mdmp-products`)
            .then(r => r.json());

        // Cache products for later use
        currentMDMPProducts = products;
        currentMDMPOpId = opId;

        console.log('📋 Loaded MDMP products:', products.length, products);

        let html = `
            <div class="mdmp-steps">
                ${MDMP_STEPS.map(step => {
                    const count = getStepDeliverableCount(step.num, products);
                    return `
                        <div class="mdmp-step-card" onclick="displayMDMPStepDetails(${step.num}, '${opId}')">
                            <div class="step-number">Step ${step.num}: ${step.abbr}</div>
                            <div class="step-title">${step.name}</div>
                            <div class="step-status">${count} deliverable(s)</div>
                        </div>
                    `;
                }).join('')}
            </div>
            <div class="mdmp-details" id="mdmp-details-panel">
                <div class="mdmp-details-empty">Select a step to view details</div>
            </div>
        `;

        container.innerHTML = html;
    } catch (error) {
        console.error('Error rendering MDMP planner:', error);
        showError('view-mdmp-planner', 'Failed to load MDMP planner');
    }
}

/**
 * Display details for a specific MDMP step
 */
async function displayMDMPStepDetails(stepNum, opId) {
    const detailsPanel = document.getElementById('mdmp-details-panel');
    if (!detailsPanel) return;

    currentMDMPStep = stepNum;
    currentMDMPOpId = opId;

    try {
        const step = MDMP_STEPS.find(s => s.num === stepNum);
        const products = getStepDeliverables(stepNum, currentMDMPProducts);

        console.log(`📋 Step ${stepNum} products:`, products);

        let html = `
            <div style="margin-bottom: 1.5rem;">
                <h3 style="color: ${step.color}; font-size: 1.3rem;">Step ${stepNum}: ${step.name}</h3>
                <p style="color: #94a3b8; margin-top: 0.5rem;">${products.length} deliverable(s)</p>
            </div>
        `;

        if (products.length > 0) {
            html += `<ul class="deliverables-list">`;
            products.forEach(product => {
                html += `
                    <li class="deliverable-item">
                        <div style="flex: 1;">
                            <div class="deliverable-title">${escapeHtml(product.title)}</div>
                            <div class="deliverable-meta">
                                ${product.id} | Created: ${formatDate(product.created, 'short')}
                                <br>Status: <span class="status-badge ${getStatusClass(product.status)}">${product.status}</span>
                            </div>
                        </div>
                        <div class="deliverable-actions">
                            <button class="btn btn-small" onclick="editDeliverable('${opId}', '${product.id}', '${stepNum}')" title="Edit">✎</button>
                            <button class="btn btn-small" onclick="exportDeliverable('${opId}', '${product.id}')" title="Export">📥</button>
                            <button class="btn btn-small" onclick="deleteDeliverable('${opId}', '${product.id}', '${stepNum}')" title="Delete">🗑️</button>
                        </div>
                    </li>
                `;
            });
            html += `</ul>`;
        } else {
            html += `<p style="color: #94a3b8; font-style: italic;">No deliverables yet for this step.</p>`;
        }

        html += `
            <div style="margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid #475569;">
                <button class="btn btn-primary" onclick="addDeliverableToStep(${stepNum}, '${opId}')">+ Add Deliverable</button>
            </div>
        `;

        detailsPanel.innerHTML = html;

        // Update active step card
        document.querySelectorAll('.mdmp-step-card').forEach((card, idx) => {
            card.classList.toggle('active', idx + 1 === stepNum);
        });
    } catch (error) {
        console.error('Error displaying step details:', error);
        detailsPanel.innerHTML = `<div class="mdmp-details-empty">Error loading step details</div>`;
    }
}

/**
 * Add a deliverable to an MDMP step
 */
async function addDeliverableToStep(stepNum, opId) {
    const step = MDMP_STEPS.find(s => s.num === stepNum);
    const title = `${step.name} Deliverable - ${new Date().toISOString().split('T')[0]}`;

    try {
        showInfo('Creating deliverable...');

        // Call backend API to create product
        const response = await fetch(`/api/operations/${opId}/mdmp-products`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                step: stepNum,
                title: title,
                description: `${step.name} deliverable for this operation`,
                owner: 'TBD',
                status: 'draft'
            })
        });

        if (!response.ok) {
            const error = await response.json();
            showError(`Failed to create deliverable: ${error.error}`);
            return;
        }

        const result = await response.json();
        showSuccess(`Deliverable "${title}" created`);

        // Reload products from server
        const products = await fetch(`/api/operations/${opId}/mdmp-products`)
            .then(r => r.json());
        currentMDMPProducts = products;

        // Refresh display
        displayMDMPStepDetails(stepNum, opId);
    } catch (error) {
        console.error('Error adding deliverable:', error);
        showError(`Failed to add deliverable: ${error.message}`);
    }
}

/**
 * Edit a deliverable
 */
async function editDeliverable(opId, productId, stepNum) {
    try {
        const product = currentMDMPProducts.find(p => p.id === productId);
        if (!product) {
            showError('Deliverable not found');
            return;
        }

        // Show edit modal with product details
        const modal = document.getElementById('mdmp-step-modal');
        if (!modal) return;

        modal.querySelector('h3').textContent = `Edit: ${product.title}`;
        modal.querySelector('#mdmp-step-details-content').innerHTML = `
            <div>
                <p><strong>Title:</strong> ${escapeHtml(product.title)}</p>
                <p><strong>ID:</strong> ${product.id}</p>
                <p><strong>Step:</strong> ${stepNum}</p>
                <p><strong>Status:</strong> ${product.status}</p>
                <p><strong>Created:</strong> ${formatDate(product.created, 'long')}</p>
                <p><strong>Updated:</strong> ${formatDate(product.lastUpdated, 'long')}</p>
                <p style="margin-top: 1rem; padding: 1rem; background-color: #475569; border-radius: 4px; color: #cbd5e1;">
                    ℹ️ Full editing is available in the operation folder:<br>
                    <code>${product.filePath || `STEP-${stepNum}/${product.title.replace(/\s+/g, '_')}.md`}</code>
                </p>
                <div style="margin-top: 1rem;">
                    <button class="btn btn-primary" onclick="closeModal('mdmp-step-modal')">OK</button>
                </div>
            </div>
        `;
        openModal('mdmp-step-modal');
    } catch (error) {
        console.error('Error editing deliverable:', error);
        showError('Failed to edit deliverable');
    }
}

/**
 * Delete a deliverable
 */
async function deleteDeliverable(opId, productId, stepNum) {
    if (!confirm('Delete this deliverable? This cannot be undone.')) {
        return;
    }

    try {
        const response = await fetch(`/api/operations/${opId}/mdmp-products/${productId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            const error = await response.json();
            showError(`Failed to delete deliverable: ${error.error}`);
            return;
        }

        showSuccess('Deliverable deleted');

        // Reload products from server
        const products = await fetch(`/api/operations/${opId}/mdmp-products`)
            .then(r => r.json());
        currentMDMPProducts = products;

        // Refresh display
        displayMDMPStepDetails(stepNum, opId);
    } catch (error) {
        console.error('Error deleting deliverable:', error);
        showError(`Failed to delete deliverable: ${error.message}`);
    }
}

/**
 * Export a deliverable as Word document
 */
async function exportDeliverable(opId, productId) {
    try {
        const product = currentMDMPProducts.find(p => p.id === productId);
        if (!product) {
            showError('Deliverable not found');
            return;
        }

        showInfo('Exporting deliverable...');

        // Use the existing export endpoint
        const url = `/api/export/annex?name=${encodeURIComponent(product.title)}&operation=${opId}`;

        // Download file
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${product.title}.docx`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        showSuccess(`"${product.title}" exported successfully`);
    } catch (error) {
        console.error('Error exporting deliverable:', error);
        showError(`Failed to export deliverable: ${error.message}`);
    }
}
