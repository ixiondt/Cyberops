/**
 * CyberOpsPlanner Dashboard Application Controller
 * Main entry point for the unified dashboard
 */

class CyberOpsPlanner {
    constructor() {
        this.currentOperation = null;
        this.currentView = 'overview';
        this.apiBase = '/api';
        this.init();
    }

    /**
     * Initialize the dashboard
     */
    async init() {
        console.log('🛡️ Initializing CyberOpsPlanner Dashboard');

        this.setupEventListeners();

        // Initialize form handlers and modal close buttons
        if (typeof initializeModalCloseButtons === 'function') {
            initializeModalCloseButtons();
        }
        if (typeof initializePOAMFormHandlers === 'function') {
            initializePOAMFormHandlers();
        }

        await this.loadOperations();

        // Load default operation if available
        const selector = document.getElementById('operation-selector');
        if (selector.options.length > 1) {
            selector.options[1].selected = true;
            await this.loadOperation();
        }
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Operation selector
        document.getElementById('operation-selector').addEventListener('change', () => {
            this.loadOperation();
        });

        // Tab navigation
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchView(e.target.dataset.view);
            });
        });
    }

    /**
     * Load all operations from server
     */
    async loadOperations() {
        try {
            const response = await fetch(`${this.apiBase}/operations`);
            const operations = await response.json();

            const selector = document.getElementById('operation-selector');

            // Clear existing options except first
            while (selector.options.length > 1) {
                selector.remove(1);
            }

            // Add operations
            operations.forEach(op => {
                const option = document.createElement('option');
                option.value = op.id;
                option.textContent = `${op.name} (${op.id})`;
                selector.appendChild(option);
            });

            if (operations.length === 0) {
                this.showNoOperations();
            }
        } catch (err) {
            console.error('Error loading operations:', err);
            this.showError('Failed to load operations');
        }
    }

    /**
     * Load selected operation
     */
    async loadOperation() {
        const selector = document.getElementById('operation-selector');
        const opId = selector.value;

        if (!opId) {
            this.showNoOperations();
            this.currentOperation = null;
            return;
        }

        try {
            const response = await fetch(`${this.apiBase}/operations/${opId}`);
            this.currentOperation = await response.json();

            // Show operation status
            const statusEl = document.getElementById('operation-status');
            if (statusEl) {
                statusEl.innerHTML = `
                    <div class="status-indicator"></div>
                    <span>${this.currentOperation.name || this.currentOperation.id}</span>
                `;
            }

            // Load current view
            this.switchView(this.currentView);
        } catch (err) {
            console.error('Error loading operation:', err);
            this.showError('Failed to load operation');
        }
    }

    /**
     * Switch between views
     */
    switchView(viewName) {
        if (!this.currentOperation) {
            this.showNoOperations();
            return;
        }

        // Update active tab
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        const activeBtn = document.querySelector(`[data-view="${viewName}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }

        // Hide all views
        document.querySelectorAll('.view-content').forEach(view => {
            view.classList.remove('active');
        });

        // Show selected view (handle both old and new view IDs)
        let viewEl = document.getElementById(`view-${viewName}`);
        if (!viewEl && viewName === 'mdmp-planner') {
            viewEl = document.getElementById('view-mdmp-planner');
        }
        if (!viewEl && viewName === 'mdmp') {
            viewEl = document.getElementById('view-mdmp-planner');
        }
        if (!viewEl && viewName === 'network-map') {
            viewEl = document.getElementById('view-network-map');
        }
        if (!viewEl && viewName === 'network') {
            viewEl = document.getElementById('view-network-map');
        }

        if (viewEl) {
            viewEl.classList.add('active');
        }

        this.currentView = viewName;

        // Load view content
        switch (viewName) {
            case 'overview':
                this.loadOverviewView();
                break;
            case 'mdmp':
            case 'mdmp-planner':
                // Load MDMP planner content (unified dashboard)
                loadMDMPPlannerContent(this.currentOperation.id);
                break;
            case 'incidents':
                if (typeof renderIncidentsView === 'function') {
                    renderIncidentsView(this.currentOperation.id);
                } else {
                    this.loadIncidentsView();
                }
                break;
            case 'poams':
                if (typeof renderPOAMsView === 'function') {
                    renderPOAMsView(this.currentOperation.id);
                } else {
                    this.loadPOAMsView();
                }
                break;
            case 'network':
            case 'network-map':
                if (typeof initializeNetworkMap === 'function') {
                    initializeNetworkMap(this.currentOperation.id);
                } else {
                    this.loadNetworkView();
                }
                break;
            case 'intelligence':
                this.loadIntelligenceView();
                break;
        }
    }

    /**
     * Load overview view
     */
    async loadOverviewView() {
        const viewEl = document.getElementById('view-overview');

        try {
            // Get metadata and summaries
            const metadata = this.currentOperation;
            const mdmpProducts = await fetch(`${this.apiBase}/operations/${this.currentOperation.id}/mdmp-products`)
                .then(r => r.json());
            const poams = await fetch(`${this.apiBase}/operations/${this.currentOperation.id}/poams`)
                .then(r => r.json());
            const incidents = await fetch(`${this.apiBase}/operations/${this.currentOperation.id}/incidents`)
                .then(r => r.json());

            // Get phase info
            const currentPhase = typeof getCurrentPhase === 'function' ? getCurrentPhase(metadata) : null;
            const phaseProgress = typeof getPhaseProgress === 'function' ? getPhaseProgress(metadata) : 0;

            let html = `
                <h2>Operation Overview</h2>

                ${currentPhase && typeof renderPhaseContextBanner === 'function' ? renderPhaseContextBanner(metadata) : ''}

                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-top: 2rem;">
                    <div style="background-color: #334155; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #3b82f6;">
                        <h3 style="color: #3b82f6; margin-bottom: 0.5rem;">MDMP Products</h3>
                        <p style="font-size: 2rem; font-weight: bold;">${mdmpProducts.length}</p>
                        <p style="color: #94a3b8; font-size: 0.9rem;">Total deliverables</p>
                    </div>
                    <div style="background-color: #334155; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #f59e0b;">
                        <h3 style="color: #f59e0b; margin-bottom: 0.5rem;">POAMs</h3>
                        <p style="font-size: 2rem; font-weight: bold;">${poams.length}</p>
                        <p style="color: #94a3b8; font-size: 0.9rem;">Actions & milestones</p>
                    </div>
                    <div style="background-color: #334155; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #ef4444;">
                        <h3 style="color: #ef4444; margin-bottom: 0.5rem;">Incidents</h3>
                        <p style="font-size: 2rem; font-weight: bold;">${incidents.length}</p>
                        <p style="color: #94a3b8; font-size: 0.9rem;">Active incidents</p>
                    </div>
                </div>

                ${currentPhase && typeof renderPhaseTimeline === 'function' ? renderPhaseTimeline(metadata) : ''}

                ${currentPhase && typeof renderPhaseDetails === 'function' ? renderPhaseDetails(metadata) : ''}

                ${currentPhase && typeof renderPhaseRecommendations === 'function' ? renderPhaseRecommendations(metadata) : ''}

                <div style="margin-top: 3rem;">
                    <h3>Operation Details</h3>
                    <table style="width: 100%; border-collapse: collapse; margin-top: 1rem;">
                        <tr style="border-bottom: 1px solid #475569;">
                            <td style="padding: 0.75rem; color: #94a3b8;">Operation ID:</td>
                            <td style="padding: 0.75rem; color: #e2e8f0;"><code>${this.currentOperation.id}</code></td>
                        </tr>
                        <tr style="border-bottom: 1px solid #475569;">
                            <td style="padding: 0.75rem; color: #94a3b8;">Status:</td>
                            <td style="padding: 0.75rem; color: #e2e8f0;">${this.currentOperation.status || 'Unknown'}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #475569;">
                            <td style="padding: 0.75rem; color: #94a3b8;">Created:</td>
                            <td style="padding: 0.75rem; color: #e2e8f0;">${this.formatDate(this.currentOperation.created)}</td>
                        </tr>
                        <tr>
                            <td style="padding: 0.75rem; color: #94a3b8;">Last Updated:</td>
                            <td style="padding: 0.75rem; color: #e2e8f0;">${this.formatDate(this.currentOperation.lastUpdated)}</td>
                        </tr>
                    </table>
                </div>
            `;

            viewEl.innerHTML = html;
        } catch (err) {
            console.error('Error loading overview:', err);
            viewEl.innerHTML = `<div class="empty-state"><p>Error loading overview: ${err.message}</p></div>`;
        }
    }

    /**
     * Load MDMP planner view (placeholder - will be expanded)
     */
    async loadMDMPView() {
        const viewEl = document.getElementById('view-mdmp');

        try {
            const products = await fetch(`${this.apiBase}/operations/${this.currentOperation.id}/mdmp-products`)
                .then(r => r.json());

            const mdmpSteps = [
                { num: 1, name: 'Receipt of Mission', color: '#3b82f6' },
                { num: 2, name: 'Mission Analysis', color: '#06b6d4' },
                { num: 3, name: 'COA Development', color: '#8b5cf6' },
                { num: 4, name: 'COA Analysis', color: '#ec4899' },
                { num: 5, name: 'COA Comparison', color: '#f59e0b' },
                { num: 6, name: 'COA Approval', color: '#10b981' },
                { num: 7, name: 'Orders Production', color: '#ef4444' }
            ];

            let html = `<h2>MDMP Planning Dashboard</h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-top: 2rem;">`;

            mdmpSteps.forEach(step => {
                const stepProducts = products.filter(p => {
                    if (p.step === step.num.toString()) return true;
                    if (p.step === `step${step.num}`) return true;
                    // Also check description for step mentions
                    return false;
                });

                html += `
                    <div style="background-color: #334155; border: 2px solid ${step.color}; border-radius: 8px; padding: 1.5rem; cursor: pointer;">
                        <h3 style="color: ${step.color}; margin-bottom: 0.5rem;">Step ${step.num}</h3>
                        <p style="color: #cbd5e1; font-size: 0.95rem; margin-bottom: 1rem;">${step.name}</p>
                        <p style="color: #94a3b8; font-size: 0.85rem;">${stepProducts.length} deliverable(s)</p>
                    </div>
                `;
            });

            html += `</div>`;

            if (products.length === 0) {
                html += `<div class="empty-state" style="margin-top: 2rem;">
                    <p>No MDMP products yet. Create your first planning deliverable.</p>
                </div>`;
            } else {
                html += `<h3 style="margin-top: 3rem;">Recent Products</h3>
                    <div style="margin-top: 1rem;">`;

                products.slice(0, 5).forEach(product => {
                    html += `
                        <div style="background-color: #334155; padding: 1rem; margin-bottom: 0.5rem; border-radius: 4px; display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <p style="color: #e2e8f0; margin-bottom: 0.25rem;">${product.title}</p>
                                <p style="color: #94a3b8; font-size: 0.85rem;">Updated: ${this.formatDate(product.lastUpdated)}</p>
                            </div>
                            <span style="background-color: #475569; padding: 0.25rem 0.75rem; border-radius: 4px; font-size: 0.85rem;">${product.status}</span>
                        </div>
                    `;
                });

                html += `</div>`;
            }

            viewEl.innerHTML = html;
        } catch (err) {
            console.error('Error loading MDMP view:', err);
            viewEl.innerHTML = `<div class="empty-state"><p>Error loading MDMP planner: ${err.message}</p></div>`;
        }
    }

    /**
     * Load incidents view (placeholder)
     */
    async loadIncidentsView() {
        const viewEl = document.getElementById('view-incidents');

        try {
            const incidents = await fetch(`${this.apiBase}/operations/${this.currentOperation.id}/incidents`)
                .then(r => r.json());

            if (incidents.length === 0) {
                viewEl.innerHTML = `
                    <h2>Incidents</h2>
                    <div class="empty-state">
                        <p>No incidents reported for this operation.</p>
                    </div>
                `;
                return;
            }

            let html = `<h2>Incidents</h2>
                <div style="margin-top: 2rem;">`;

            incidents.forEach(incident => {
                const severityColor = {
                    'critical': '#ef4444',
                    'high': '#f97316',
                    'medium': '#f59e0b',
                    'low': '#84cc16'
                }[incident.severity.toLowerCase()] || '#94a3b8';

                html += `
                    <div style="background-color: #334155; border-left: 4px solid ${severityColor}; padding: 1.5rem; margin-bottom: 1rem; border-radius: 4px;">
                        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.75rem;">
                            <h3 style="color: #e2e8f0;">${incident.title}</h3>
                            <span style="background-color: ${severityColor}; color: white; padding: 0.25rem 0.75rem; border-radius: 4px; font-size: 0.85rem;">${incident.severity}</span>
                        </div>
                        <p style="color: #cbd5e1; margin-bottom: 0.5rem;">${incident.id}</p>
                        <p style="color: #94a3b8; font-size: 0.9rem;">Status: <strong>${incident.status}</strong></p>
                        ${incident.affectedAssets.length > 0 ? `<p style="color: #94a3b8; font-size: 0.9rem;">Affected: ${incident.affectedAssets.join(', ')}</p>` : ''}
                    </div>
                `;
            });

            html += `</div>`;
            viewEl.innerHTML = html;
        } catch (err) {
            console.error('Error loading incidents:', err);
            viewEl.innerHTML = `<div class="empty-state"><p>Error loading incidents: ${err.message}</p></div>`;
        }
    }

    /**
     * Load POAMs view (placeholder)
     */
    async loadPOAMsView() {
        const viewEl = document.getElementById('view-poams');

        try {
            const poams = await fetch(`${this.apiBase}/operations/${this.currentOperation.id}/poams`)
                .then(r => r.json());

            if (poams.length === 0) {
                viewEl.innerHTML = `
                    <h2>Plans of Action and Milestones</h2>
                    <div class="empty-state">
                        <p>No POAMs created yet for this operation.</p>
                    </div>
                `;
                return;
            }

            let html = `<h2>Plans of Action and Milestones</h2>
                <div style="margin-top: 2rem;">`;

            // Group by status
            const byStatus = {};
            poams.forEach(poam => {
                if (!byStatus[poam.status]) byStatus[poam.status] = [];
                byStatus[poam.status].push(poam);
            });

            Object.entries(byStatus).forEach(([status, items]) => {
                html += `<h3 style="color: #cbd5e1; margin-top: 1.5rem; margin-bottom: 1rem; text-transform: capitalize;">${status} (${items.length})</h3>`;

                items.forEach(poam => {
                    const priorityColor = {
                        'critical': '#ef4444',
                        'high': '#f97316',
                        'medium': '#f59e0b',
                        'low': '#84cc16'
                    }[poam.priority.toLowerCase()] || '#94a3b8';

                    html += `
                        <div style="background-color: #334155; padding: 1rem; margin-bottom: 0.75rem; border-radius: 4px; border-left: 4px solid ${priorityColor};">
                            <div style="display: flex; justify-content: space-between; align-items: start;">
                                <div style="flex: 1;">
                                    <p style="color: #e2e8f0; font-weight: bold; margin-bottom: 0.25rem;">${poam.title}</p>
                                    <p style="color: #cbd5e1; font-size: 0.9rem; margin-bottom: 0.25rem;">${poam.id}</p>
                                    <p style="color: #94a3b8; font-size: 0.85rem;">Owner: ${poam.owner || 'Unassigned'}</p>
                                </div>
                                <span style="background-color: ${priorityColor}; color: white; padding: 0.25rem 0.75rem; border-radius: 4px; font-size: 0.85rem; text-transform: capitalize;">${poam.priority}</span>
                            </div>
                        </div>
                    `;
                });
            });

            html += `</div>`;
            viewEl.innerHTML = html;
        } catch (err) {
            console.error('Error loading POAMs:', err);
            viewEl.innerHTML = `<div class="empty-state"><p>Error loading POAMs: ${err.message}</p></div>`;
        }
    }

    /**
     * Load network view (placeholder)
     */
    async loadNetworkView() {
        let viewEl = document.getElementById('view-network');
        if (!viewEl) {
            viewEl = document.getElementById('view-network-map');
        }

        if (!viewEl) return;

        viewEl.innerHTML = `
            <h2>Network Topology</h2>
            <div class="empty-state">
                <p>Network visualization - loading...</p>
            </div>
        `;
    }

    /**
     * Load intelligence view
     */
    async loadIntelligenceView() {
        const viewEl = document.getElementById('view-intelligence');
        if (!viewEl) return;

        try {
            const mdmpProducts = await fetch(`${this.apiBase}/operations/${this.currentOperation.id}/mdmp-products?step=2`)
                .then(r => r.json());

            let html = `<h2>Intelligence & Threat Analysis</h2>
                <div style="margin-top: 2rem;">`;

            if (mdmpProducts.length > 0) {
                html += `<h3>Intelligence Products</h3>
                    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem;">`;

                mdmpProducts.forEach(product => {
                    html += `
                        <div style="background-color: #334155; padding: 1.5rem; border-radius: 8px; border-left: 4px solid #3b82f6;">
                            <p style="color: #3b82f6; font-weight: bold; margin-bottom: 0.5rem;">${product.title}</p>
                            <p style="color: #94a3b8; font-size: 0.9rem;">Updated: ${this.formatDate(product.lastUpdated)}</p>
                            <p style="color: #cbd5e1; font-size: 0.85rem; margin-top: 0.75rem;">Status: <span style="background-color: #475569; padding: 0.25rem 0.5rem; border-radius: 3px;">${product.status}</span></p>
                        </div>
                    `;
                });

                html += `</div>`;
            } else {
                html += `<div class="empty-state"><p>No intelligence products yet</p></div>`;
            }

            html += `</div>`;
            viewEl.innerHTML = html;
        } catch (err) {
            console.error('Error loading intelligence view:', err);
            viewEl.innerHTML = `<div class="empty-state"><p>Error loading intelligence: ${err.message}</p></div>`;
        }
    }

    /**
     * Show error message
     */
    showError(message) {
        document.querySelectorAll('.view-content').forEach(view => {
            view.classList.remove('active');
        });
        document.getElementById('view-overview').classList.add('active');
        document.getElementById('view-overview').innerHTML = `
            <div class="empty-state">
                <p style="color: #ef4444;">❌ ${message}</p>
            </div>
        `;
    }

    /**
     * Show no operations message
     */
    showNoOperations() {
        document.querySelectorAll('.view-content').forEach(view => {
            view.classList.remove('active');
        });
        document.getElementById('view-overview').classList.add('active');
        document.getElementById('view-overview').innerHTML = `
            <div class="empty-state">
                <p>📋 No operations found</p>
                <p style="color: #94a3b8; font-size: 0.9rem;">Select an operation from the dropdown to get started, or create a new operation in the operation/ folder.</p>
            </div>
        `;
    }

    /**
     * Format date for display
     */
    formatDate(dateStr) {
        if (!dateStr) return 'Unknown';
        try {
            const date = new Date(dateStr);
            return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
        } catch {
            return dateStr;
        }
    }
}

/**
 * Export MDMP annex as Word document
 */
async function exportAnnex(annexName, annexTitle) {
    const statusDiv = document.getElementById('mdmp-export-status');
    if (!statusDiv) return;

    try {
        statusDiv.innerHTML = `ℹ️ Exporting ${annexTitle}...`;

        // Sample content for demonstration
        const mdContent = `# ${annexTitle}\n\nExported from CyberOpsPlanner\n\n[Annex content would be populated from MDMP products here]`;

        const response = await fetch('/api/export/annex', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                annexTitle: annexTitle,
                annexFile: annexName,
                mdContent: mdContent
            })
        });

        if (!response.ok) throw new Error('Export failed');

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${annexName}_${new Date().toISOString().split('T')[0]}.docx`;
        a.click();

        statusDiv.innerHTML = `✓ ${annexTitle} exported successfully`;
        setTimeout(() => { statusDiv.innerHTML = ''; }, 3000);
    } catch (err) {
        statusDiv.innerHTML = `✗ Export failed: ${err.message}`;
    }
}

/**
 * Load and populate MDMP Planner sections in unified dashboard
 */
async function loadMDMPPlannerContent(opId) {
    try {
        // Load MDMP products
        const productsResponse = await fetch(`/api/operations/${opId}/mdmp-products`);
        const products = await productsResponse.json();

        // Load doctrine
        const doctrineResponse = await fetch('/api/doctrine');
        const doctrine = await doctrineResponse.json();

        // Render MDMP Flow
        renderMDMPFlow(products);
        renderMDMPProgress(products);
        renderMDMPProducts(products);
        renderMDMPDoctrine(doctrine);
    } catch (err) {
        console.error('Error loading MDMP content:', err);
    }
}

/**
 * Render MDMP process flow steps
 */
function renderMDMPFlow(products) {
    const container = document.getElementById('mdmp-flow');
    if (!container) return;

    const STEPS = [
        { num: 1, name: 'Receipt of Mission', color: '#3b82f6' },
        { num: 2, name: 'Mission Analysis', color: '#06b6d4' },
        { num: 3, name: 'COA Development', color: '#8b5cf6' },
        { num: 4, name: 'COA Analysis', color: '#ec4899' },
        { num: 5, name: 'COA Comparison', color: '#f59e0b' },
        { num: 6, name: 'COA Approval', color: '#10b981' },
        { num: 7, name: 'Orders Production', color: '#ef4444' }
    ];

    container.innerHTML = STEPS.map(step => {
        const stepProducts = products.filter(p => p.step === step.num || p.step === step.num.toString());
        return `
            <div style="flex: 0 0 140px; background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); border: 2px solid ${step.color}; border-radius: 8px; padding: 12px; text-align: center;">
                <div style="font-size: 16px; font-weight: bold; color: ${step.color};">${step.num}</div>
                <div style="font-size: 10px; color: #cbd5e1; margin-top: 6px;">${step.name.split(' ')[0]}</div>
                <div style="margin-top: 6px; font-size: 9px; color: #94a3b8;">${stepProducts.length} items</div>
            </div>
        `;
    }).join('');
}

/**
 * Render MDMP progress bars
 */
function renderMDMPProgress(products) {
    const container = document.getElementById('mdmp-progress');
    if (!container) return;

    const progressData = [
        { label: 'Mission Analysis', step: 1 },
        { label: 'COA Development', step: 3 },
        { label: 'Wargaming', step: 4 },
        { label: 'Decision & Orders', steps: [5,6,7] }
    ];

    container.innerHTML = progressData.map(item => {
        const steps = Array.isArray(item.steps) ? item.steps : [item.step];
        const stepProducts = products.filter(p => steps.includes(parseInt(p.step)) || steps.includes(p.step));
        const percentage = Math.min(100, stepProducts.length * 25);

        return `
            <div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                    <span style="color: #cbd5e1; font-size: 11px;">${item.label}</span>
                    <span style="color: #0066cc; font-size: 10px; font-weight: bold;">${percentage}%</span>
                </div>
                <div style="background: rgba(100,100,100,0.2); height: 6px; border-radius: 3px; overflow: hidden;">
                    <div style="background: #0066cc; height: 100%; width: ${percentage}%;"></div>
                </div>
            </div>
        `;
    }).join('');
}

/**
 * Render MDMP products by step
 */
function renderMDMPProducts(products) {
    const container = document.getElementById('mdmp-products');
    if (!container) return;

    const STEPS = [
        { num: 1, name: 'Receipt of Mission', icon: '1️⃣' },
        { num: 2, name: 'Mission Analysis', icon: '2️⃣' },
        { num: 3, name: 'COA Development', icon: '3️⃣' },
        { num: 4, name: 'COA Analysis', icon: '4️⃣' },
        { num: 5, name: 'COA Comparison', icon: '5️⃣' },
        { num: 6, name: 'COA Approval', icon: '6️⃣' },
        { num: 7, name: 'Orders Production', icon: '7️⃣' }
    ];

    container.innerHTML = STEPS.map(step => {
        const stepProducts = products.filter(p => p.step === step.num || p.step === step.num.toString());
        const list = stepProducts.length > 0
            ? stepProducts.map(p => `<li style="color: #cbd5e1; font-size: 10px; margin-bottom: 4px;">✓ ${p.name || p.file}</li>`).join('')
            : '<li style="color: #94a3b8; font-size: 10px;">No products yet</li>';

        return `
            <div style="background: rgba(100,150,200,0.05); border: 1px solid rgba(100,150,200,0.2); border-radius: 6px; padding: 12px;">
                <div style="color: #0066cc; font-weight: bold; font-size: 11px; margin-bottom: 8px;">${step.icon} Step ${step.num}</div>
                <ul style="list-style: none; margin: 0; padding: 0;">${list}</ul>
            </div>
        `;
    }).join('');
}

/**
 * Render doctrine references for MDMP planner
 */
function renderMDMPDoctrine(doctrine) {
    const container = document.getElementById('mdmp-doctrine');
    if (!container || !doctrine.mdmpSteps) return;

    const html = Array.from({ length: 7 }, (_, i) => {
        const step = i + 1;
        const stepData = doctrine.mdmpSteps[step];
        if (!stepData || !stepData.references) return '';

        const refsHtml = stepData.references.map(ref => `
            <div style="background: rgba(0,102,204,0.08); border-left: 2px solid #0066cc; padding: 8px; margin-bottom: 6px; border-radius: 3px; font-size: 9px;">
                <div style="color: #0066cc; font-weight: bold;">${ref.publication}</div>
                <div style="color: #cbd5e1; margin-top: 2px;">${ref.section.substring(0, 40)}...</div>
            </div>
        `).join('');

        return `
            <div style="background: rgba(0,102,204,0.05); border: 1px solid rgba(0,102,204,0.2); border-radius: 6px; padding: 10px;">
                <div style="color: #0066cc; font-weight: bold; font-size: 10px; margin-bottom: 8px;">📚 Step ${step}</div>
                ${refsHtml}
            </div>
        `;
    }).join('');

    container.innerHTML = html || '<div style="color: #94a3b8;">Loading doctrine references...</div>';
}

// Initialize dashboard when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.dashboard = new CyberOpsPlanner();
});
