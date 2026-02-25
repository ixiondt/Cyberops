/**
 * POAM Tracker Module
 * Manages POAMs (Plans of Action and Milestones)
 * NIST SP 800-171 Compliant POA&M Tracking
 */

/**
 * Initialize POAM form handlers
 * Call this once on page load
 */
function initializePOAMFormHandlers() {
    const poamForm = document.getElementById('poam-form');
    if (!poamForm) return;

    // Handle form submission
    poamForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        await handlePOAMFormSubmit();
    });

    // Handle modal close - reset form
    const closeButtons = document.querySelectorAll('[data-modal="poam-modal"]');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            resetPOAMForm();
            closeModal('poam-modal');
        });
    });

    // Handle "New POAM" button
    const newPoamBtn = document.getElementById('btn-new-poam');
    if (newPoamBtn) {
        newPoamBtn.addEventListener('click', () => {
            resetPOAMForm();
            const form = document.getElementById('poam-form');
            form.dataset.mode = 'create';
            form.dataset.poamId = '';
            openModal('poam-modal', 'Create New POA&M');
        });
    }
}

/**
 * Handle POAM form submission (Create/Update)
 */
async function handlePOAMFormSubmit() {
    const form = document.getElementById('poam-form');
    if (!form) return;

    // Get form data - NIST SP 800-171 fields
    const formData = {
        weakness: document.getElementById('poam-weakness')?.value || '',
        responsibleOrganization: document.getElementById('poam-responsible-org')?.value || '',
        nistControl: document.getElementById('poam-nist-control')?.value || '',
        scheduledCompletionDate: document.getElementById('poam-completion-date')?.value || '',
        weaknessIdentification: document.getElementById('poam-weakness-identification')?.value || '',
        resourceEstimate: document.getElementById('poam-resource-estimate')?.value || '',
        milestones: document.getElementById('poam-milestones')?.value || '',
        changesNote: document.getElementById('poam-changes-milestones')?.value || '',
        status: document.getElementById('poam-status')?.value || 'ongoing',
        priority: document.getElementById('poam-priority')?.value || 'medium'
    };

    // Validate form data
    const errors = validatePOAMForm(formData);
    if (errors.length > 0) {
        clearFormErrors();
        errors.forEach(error => {
            showError(error);
        });
        return;
    }

    try {
        const mode = form.dataset.mode || 'create';
        const opId = form.dataset.opId;
        const poamId = form.dataset.poamId;

        if (!opId) {
            showError('Operation ID not set');
            return;
        }

        let url, method;
        if (mode === 'edit' && poamId) {
            url = `/api/operations/${opId}/poams/${poamId}`;
            method = 'PUT';
        } else {
            url = `/api/operations/${opId}/poams`;
            method = 'POST';
        }

        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            showError(`Failed to save POAM: ${errorData.error || 'Unknown error'}`);
            return;
        }

        showSuccess(mode === 'edit' ? 'POAM updated successfully' : 'POAM created successfully');

        // Close modal and refresh
        closeModal('poam-modal');
        resetPOAMForm();

        // Refresh POAMs list
        if (typeof renderPOAMsView === 'function') {
            await renderPOAMsView(opId);
        }
    } catch (error) {
        console.error('Error saving POAM:', error);
        showError(`Error saving POAM: ${error.message}`);
    }
}

/**
 * Reset POAM form to create mode
 */
function resetPOAMForm() {
    const form = document.getElementById('poam-form');
    if (!form) return;

    // Clear all form fields
    form.reset();

    // Reset form state
    form.dataset.mode = 'create';
    form.dataset.poamId = '';
    form.dataset.opId = '';

    // Clear any error messages
    clearFormErrors();

    // Reset default values
    document.getElementById('poam-status').value = 'ongoing';
    document.getElementById('poam-priority').value = 'medium';
    document.getElementById('poam-weakness-identification').value = 'assessment';
}

/**
 * Render POAMs view
 */
async function renderPOAMsView(opId) {
    const container = document.getElementById('view-poams');
    if (!container) return;

    try {
        // Set form operation context for this view
        const form = document.getElementById('poam-form');
        if (form) {
            form.dataset.opId = opId;
        }

        showLoading('poams-list', 'Loading POAMs...');

        const poams = await fetch(`/api/operations/${opId}/poams`)
            .then(r => r.json());

        // Render section header with title and create button
        let sectionHtml = `
            <div class="section-header">
                <h2>POAMs - Plans of Action and Milestones</h2>
                <button class="btn btn-primary" onclick="createNewPOAM('${opId}')">+ New POAM</button>
            </div>
            <div class="filters">
                <input type="text" id="filter-poams" class="search-input" placeholder="Filter POAMs..." onkeyup="filterPOAMs()">
                <select id="status-filter" class="filter-select" onchange="filterPOAMs()">
                    <option value="">All Statuses</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="complete">Complete</option>
                </select>
                <select id="priority-filter" class="filter-select" onchange="filterPOAMs()">
                    <option value="">All Priorities</option>
                    <option value="critical">🔴 Critical</option>
                    <option value="high">🟠 High</option>
                    <option value="medium">🟡 Medium</option>
                    <option value="low">🟢 Low</option>
                </select>
            </div>
        `;

        if (poams.length === 0) {
            sectionHtml += `<div class="empty-state"><p>No POAMs created yet for this operation</p></div>`;
            const poamsList = document.getElementById('poams-list');
            if (poamsList) {
                poamsList.innerHTML = '';
            }
            if (container.querySelector('.section-header')) {
                container.querySelector('.section-header').remove();
            }
            if (container.querySelector('.filters')) {
                container.querySelector('.filters').remove();
            }
            container.insertAdjacentHTML('beforeend', sectionHtml);
            return;
        }

        let html = `<div class="poams-list">`;

        poams.forEach(poam => {
            const statusClass = getStatusClass(poam.status);
            const priorityClass = getPriorityClass(poam.priority);

            html += `
                <div class="poam-card">
                    <div class="poam-info">
                        <div class="poam-id">${escapeHtml(poam.id)}</div>
                        <div class="poam-title">${escapeHtml(poam.title)}</div>
                        <div class="poam-meta">
                            <span><strong>Owner:</strong> ${poam.owner || 'Unassigned'}</span>
                            ${poam.dueDate ? `<span><strong>Due:</strong> ${formatDate(poam.dueDate, 'short')}</span>` : ''}
                            <span><strong>Updated:</strong> ${formatDate(poam.lastUpdated, 'short')}</span>
                        </div>
                    </div>
                    <div class="poam-actions">
                        <span class="priority-badge ${priorityClass}">${poam.priority}</span>
                        <span class="status-badge ${statusClass}">${poam.status}</span>
                        <button class="btn btn-small" onclick="editPOAM('${opId}', '${escapeHtml(poam.id)}')">Edit</button>
                        <button class="btn btn-small btn-danger" onclick="deletePOAM('${opId}', '${escapeHtml(poam.id)}')">Delete</button>
                    </div>
                </div>
            `;
        });

        html += `</div>`;

        // Clear container and rebuild with header, filters, and list
        const poamsList = document.getElementById('poams-list');
        if (poamsList) {
            // Remove existing header and filters
            const existingHeader = container.querySelector('.section-header');
            if (existingHeader) existingHeader.remove();
            const existingFilters = container.querySelector('.filters');
            if (existingFilters) existingFilters.remove();

            // Add header and filters at the top of view
            container.insertAdjacentHTML('afterbegin', sectionHtml);

            // Update the list content
            poamsList.innerHTML = html;
        }
    } catch (error) {
        console.error('Error rendering POAMs:', error);
        showError('poams-list', 'Failed to load POAMs');
    }
}

/**
 * Create new POAM (open modal in create mode with operation context)
 */
function createNewPOAM(opId) {
    resetPOAMForm();
    const form = document.getElementById('poam-form');
    if (form) {
        form.dataset.mode = 'create';
        form.dataset.poamId = '';
        form.dataset.opId = opId;
    }
    openModal('poam-modal', 'Create New POA&M (NIST SP 800-171)');
}

/**
 * Edit POAM
 */
async function editPOAM(opId, poamId) {
    try {
        const response = await fetch(`/api/operations/${opId}/poams`);
        const poams = await response.json();
        const poam = poams.find(p => p.id === poamId);

        if (!poam) {
            showError('POAM not found');
            return;
        }

        // Populate form - NIST SP 800-171 Fields
        // Map old fields to new NIST fields where applicable
        const setFieldValue = (id, value) => {
            const el = document.getElementById(id);
            if (el) el.value = value || '';
        };

        // NIST Required Fields
        setFieldValue('poam-weakness', poam.weakness || poam.description || '');
        setFieldValue('poam-responsible-org', poam.responsibleOrganization || poam.owner || '');
        setFieldValue('poam-nist-control', poam.nistControl || '');
        setFieldValue('poam-completion-date', poam.scheduledCompletionDate || poam.dueDate || '');
        setFieldValue('poam-weakness-identification', poam.weaknessIdentification || 'assessment');

        // Optional Fields
        setFieldValue('poam-resource-estimate', poam.resourceEstimate || '');
        setFieldValue('poam-milestones', poam.milestones || '');
        setFieldValue('poam-changes-milestones', poam.changesNote || '');

        // Status and Priority
        setFieldValue('poam-status', poam.status || 'ongoing');
        setFieldValue('poam-priority', poam.priority || 'medium');

        // Change form to update mode
        const form = document.getElementById('poam-form');
        form.dataset.poamId = poamId;
        form.dataset.opId = opId;
        form.dataset.mode = 'edit';

        openModal('poam-modal', `Edit: ${poam.title}`);
    } catch (error) {
        console.error('Error editing POAM:', error);
        showError('Failed to load POAM details');
    }
}

/**
 * Delete POAM
 */
async function deletePOAM(opId, poamId) {
    if (!confirm(`Delete POAM ${poamId}? This cannot be undone.`)) {
        return;
    }

    try {
        const response = await fetch(`/api/operations/${opId}/poams/${poamId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            showSuccess(`POAM ${poamId} deleted`);
            renderPOAMsView(opId);
        } else {
            showError('Failed to delete POAM');
        }
    } catch (error) {
        console.error('Error deleting POAM:', error);
        showError('Error deleting POAM');
    }
}

/**
 * Filter POAMs
 */
function filterPOAMs() {
    const searchText = document.getElementById('filter-poams')?.value.toLowerCase() || '';
    const statusFilter = document.getElementById('status-filter')?.value || '';
    const priorityFilter = document.getElementById('priority-filter')?.value || '';

    document.querySelectorAll('.poam-card').forEach(card => {
        const title = card.querySelector('.poam-title')?.textContent.toLowerCase() || '';
        const statusBadge = card.querySelector('.status-badge');
        const priorityBadge = card.querySelector('.priority-badge');

        const status = statusBadge?.textContent.toLowerCase() || '';
        const priority = priorityBadge?.textContent.toLowerCase() || '';

        const matchesSearch = title.includes(searchText);
        const matchesStatus = !statusFilter || status.includes(statusFilter.toLowerCase());
        const matchesPriority = !priorityFilter || priority.includes(priorityFilter.toLowerCase());

        card.parentElement.style.display = (matchesSearch && matchesStatus && matchesPriority) ? '' : 'none';
    });
}

/**
 * Update POAM status (quick update)
 */
async function updatePOAMStatus(opId, poamId, newStatus) {
    try {
        const response = await fetch(`/api/operations/${opId}/poams/${poamId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus })
        });

        if (response.ok) {
            showSuccess('POAM status updated');
            renderPOAMsView(opId);
        } else {
            showError('Failed to update POAM status');
        }
    } catch (error) {
        console.error('Error updating POAM:', error);
        showError('Error updating POAM status');
    }
}
