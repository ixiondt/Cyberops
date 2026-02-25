/**
 * Incident Tracker Module
 * Manages incident creation, display, and filtering
 */

/**
 * Render incidents view
 */
async function renderIncidentsView(opId) {
    const container = document.getElementById('view-incidents');
    if (!container) return;

    try {
        showLoading('incidents-list', 'Loading incidents...');

        const incidents = await fetch(`/api/operations/${opId}/incidents`)
            .then(r => r.json());

        if (incidents.length === 0) {
            showEmpty('incidents-list', 'No incidents reported yet for this operation');
            return;
        }

        let html = `<div class="incidents-list">`;

        incidents.forEach(incident => {
            const severityClass = getSeverityClass(incident.severity);

            html += `
                <div class="incident-card ${severityClass}">
                    <div class="incident-header">
                        <div>
                            <div class="incident-title">${escapeHtml(incident.title)}</div>
                            <div class="incident-meta">${incident.id}</div>
                        </div>
                        <span class="incident-severity ${severityClass}">${incident.severity}</span>
                    </div>
                    <div class="incident-meta">
                        Status: <strong>${incident.status}</strong> |
                        Reported: ${formatDate(incident.created, 'short')}
                    </div>
                    ${incident.affectedAssets && incident.affectedAssets.length > 0 ? `
                        <div class="incident-assets">
                            <strong>Affected:</strong> ${incident.affectedAssets.join(', ')}
                        </div>
                    ` : ''}
                    <div style="margin-top: 0.75rem;">
                        <button class="btn btn-small" onclick="viewIncidentDetail('${opId}', '${incident.id}')">View</button>
                        <button class="btn btn-small btn-danger" onclick="deleteIncident('${opId}', '${incident.id}')">Delete</button>
                    </div>
                </div>
            `;
        });

        html += `</div>`;

        document.getElementById('incidents-list').innerHTML = html;
    } catch (error) {
        console.error('Error rendering incidents:', error);
        showError('incidents-list', 'Failed to load incidents');
    }
}

/**
 * View incident details
 */
async function viewIncidentDetail(opId, incidentId) {
    try {
        const response = await fetch(`/api/operations/${opId}/incidents`);
        const incidents = await response.json();
        const incident = incidents.find(i => i.id === incidentId);

        if (!incident) {
            showError('Incident not found');
            return;
        }

        const modal = document.getElementById('incident-modal');
        if (modal) {
            modal.querySelector('h3').textContent = incident.title;

            const body = modal.querySelector('.modal-body') || modal.querySelector('.modal-content');
            if (body) {
                body.innerHTML = `
                    <div>
                        <p><strong>ID:</strong> ${escapeHtml(incident.id)}</p>
                        <p><strong>Severity:</strong> <span class="${getSeverityClass(incident.severity)}">${incident.severity}</span></p>
                        <p><strong>Status:</strong> ${incident.status}</p>
                        <p><strong>Reported:</strong> ${formatDate(incident.created, 'long')}</p>
                        ${incident.affectedAssets && incident.affectedAssets.length > 0 ? `
                            <p><strong>Affected Assets:</strong> ${incident.affectedAssets.join(', ')}</p>
                        ` : ''}
                    </div>
                `;
            }

            openModal('incident-modal', incident.title);
        }
    } catch (error) {
        console.error('Error viewing incident:', error);
        showError('Failed to load incident details');
    }
}

/**
 * Delete an incident
 */
async function deleteIncident(opId, incidentId) {
    if (!confirm('Delete this incident? This cannot be undone.')) {
        return;
    }

    try {
        // TODO: Implement backend delete endpoint for incidents
        showInfo('Incident deletion functionality coming soon');
        renderIncidentsView(opId);
    } catch (error) {
        console.error('Error deleting incident:', error);
        showError('Failed to delete incident');
    }
}

/**
 * Filter incidents based on search and severity
 */
function filterIncidents() {
    const searchText = document.getElementById('filter-incidents')?.value.toLowerCase() || '';
    const severityFilter = document.getElementById('severity-filter')?.value || '';

    document.querySelectorAll('.incident-card').forEach(card => {
        const title = card.querySelector('.incident-title')?.textContent.toLowerCase() || '';
        const severity = card.querySelector('.incident-severity')?.textContent.toLowerCase() || '';
        const assets = card.querySelector('.incident-assets')?.textContent.toLowerCase() || '';

        const matchesSearch = title.includes(searchText) || assets.includes(searchText);
        const matchesSeverity = !severityFilter || severity.includes(severityFilter.toLowerCase());

        card.parentElement.style.display = (matchesSearch && matchesSeverity) ? '' : 'none';
    });
}
