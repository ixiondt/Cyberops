/**
 * POAM Tracker Module
 * Manages POAMs (Plans of Action and Milestones)
 */

/**
 * Render POAMs view
 */
async function renderPOAMsView(opId) {
    const container = document.getElementById('view-poams');
    if (!container) return;

    try {
        showLoading('poams-list', 'Loading POAMs...');

        const poams = await fetch(`/api/operations/${opId}/poams`)
            .then(r => r.json());

        if (poams.length === 0) {
            showEmpty('poams-list', 'No POAMs created yet for this operation');
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

        document.getElementById('poams-list').innerHTML = html;
    } catch (error) {
        console.error('Error rendering POAMs:', error);
        showError('poams-list', 'Failed to load POAMs');
    }
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

        // Populate form
        document.getElementById('poam-title').value = poam.title;
        document.getElementById('poam-priority').value = poam.priority;
        document.getElementById('poam-status').value = poam.status;
        document.getElementById('poam-owner').value = poam.owner || '';
        document.getElementById('poam-duedate').value = poam.dueDate || '';
        document.getElementById('poam-description').value = poam.description || '';
        document.getElementById('poam-notes').value = poam.notes || '';

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
