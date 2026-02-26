/**
 * Synchronization Matrix View
 * Cross-staff integration: MDMP Steps (rows) x Staff Sections (columns)
 * Read-only aggregation of existing MDMP and Staff product data.
 */

const SYNC_STEPS = [
    { num: 1, name: 'Receipt of Mission', abbr: 'ROM', color: '#3b82f6' },
    { num: 2, name: 'Mission Analysis', abbr: 'MA', color: '#06b6d4' },
    { num: 3, name: 'COA Development', abbr: 'COA-D', color: '#8b5cf6' },
    { num: 4, name: 'COA Analysis', abbr: 'COA-A', color: '#ec4899' },
    { num: 5, name: 'COA Comparison', abbr: 'COA-C', color: '#f59e0b' },
    { num: 6, name: 'COA Approval', abbr: 'COA-AP', color: '#10b981' },
    { num: 7, name: 'Orders Production', abbr: 'OP', color: '#ef4444' }
];

// Unambiguous folder-to-step mapping for legacy MDMP products
// Only map folders that correspond to exactly one step (intelligence→2, operations→7)
// 'planning' maps to steps 1,3,4,5,6 so we skip it to avoid inflating counts
const LEGACY_FOLDER_MAP = {
    2: 'intelligence', 7: 'operations'
};

let _syncStaffConfig = null;

/**
 * Main entry point — called by dashboard-app.js switchView()
 */
async function renderSyncMatrixView(opId) {
    const summaryEl = document.getElementById('sync-matrix-summary');
    const gridEl = document.getElementById('sync-matrix-grid');
    if (!summaryEl || !gridEl) return;

    summaryEl.innerHTML = '<p style="color:#94a3b8;">Loading synchronization matrix...</p>';
    gridEl.innerHTML = '';

    // Load staff config (cached)
    if (!_syncStaffConfig) {
        try {
            const res = await fetch('/api/staff-sections');
            _syncStaffConfig = await res.json();
        } catch (e) {
            summaryEl.innerHTML = '<p style="color:#ef4444;">Failed to load staff configuration.</p>';
            return;
        }
    }

    const sections = _syncStaffConfig.sections;
    const sectionCodes = Object.keys(sections);

    // Fetch all data in parallel
    let mdmpProducts, annexes;
    const staffProductArrays = [];

    try {
        const results = await Promise.all([
            fetch(`/api/operations/${opId}/mdmp-products`).then(r => r.json()).catch(() => []),
            fetch(`/api/operations/${opId}/annexes`).then(r => r.json()).catch(() => []),
            ...sectionCodes.map(code =>
                fetch(`/api/operations/${opId}/staff/${code}/products`)
                    .then(r => r.json())
                    .catch(() => [])
            )
        ]);

        mdmpProducts = results[0];
        annexes = results[1];
        for (let i = 0; i < sectionCodes.length; i++) {
            staffProductArrays.push(results[i + 2]);
        }
    } catch (e) {
        summaryEl.innerHTML = '<p style="color:#ef4444;">Failed to load product data.</p>';
        return;
    }

    // Build staff products map
    const staffProductsMap = {};
    sectionCodes.forEach((code, idx) => {
        staffProductsMap[code] = Array.isArray(staffProductArrays[idx]) ? staffProductArrays[idx] : [];
    });

    // Build matrix data model
    const matrixData = buildMatrixData(sections, sectionCodes, staffProductsMap, annexes);

    // Render
    renderSyncSummary(summaryEl, matrixData);
    renderSyncGrid(gridEl, matrixData, opId);
}

/**
 * Aggregate all data into the matrix model
 */
function buildMatrixData(sections, sectionCodes, staffProductsMap, annexes) {
    const matrix = {};

    for (const step of SYNC_STEPS) {
        matrix[step.num] = {};

        for (const code of sectionCodes) {
            const section = sections[code];

            // Expected: config templates whose steps array includes this step
            const expected = (section.products || []).filter(t => t.steps.includes(step.num));

            // Actual: staff products matching this step
            const actual = (staffProductsMap[code] || []).filter(p => {
                if (p.step === step.num || p.step === String(step.num)) return true;
                // Legacy MDMP products may use folder names
                if (p.legacy && typeof p.step === 'string' &&
                    p.step.toLowerCase() === LEGACY_FOLDER_MAP[step.num]) return true;
                return false;
            });

            // Determine cell status
            let status = 'not_applicable';
            if (expected.length > 0) {
                if (actual.length === 0) {
                    status = 'not_started';
                } else if (actual.length < expected.length) {
                    status = 'in_progress';
                } else {
                    status = 'complete';
                }
            }

            matrix[step.num][code] = { expected, actual, status };
        }
    }

    // Step 7 annex status per section
    const step7Annexes = {};
    for (const code of sectionCodes) {
        const section = sections[code];
        const sectionLetters = (section.annexes || []).map(a => a.letter);
        // Deduplicate (CYBER has two entries for 'C')
        const uniqueLetters = [...new Set(sectionLetters)];
        step7Annexes[code] = (Array.isArray(annexes) ? annexes : [])
            .filter(a => uniqueLetters.includes(a.letter));
    }

    // Summary stats
    const stepStats = {};
    for (const step of SYNC_STEPS) {
        let totalExpected = 0, totalActual = 0;
        for (const code of sectionCodes) {
            const cell = matrix[step.num][code];
            totalExpected += cell.expected.length;
            totalActual += Math.min(cell.actual.length, cell.expected.length);
        }
        stepStats[step.num] = { expected: totalExpected, actual: totalActual };
    }

    const sectionStats = {};
    for (const code of sectionCodes) {
        let totalExpected = 0, totalActual = 0;
        for (const step of SYNC_STEPS) {
            const cell = matrix[step.num][code];
            totalExpected += cell.expected.length;
            totalActual += Math.min(cell.actual.length, cell.expected.length);
        }
        sectionStats[code] = { expected: totalExpected, actual: totalActual };
    }

    return { matrix, sections, sectionCodes, step7Annexes, stepStats, sectionStats };
}

/**
 * Render summary bar with overall and per-section completion
 */
function renderSyncSummary(container, data) {
    const { sections, sectionCodes, sectionStats } = data;

    let totalExpected = 0, totalActual = 0;
    for (const code of sectionCodes) {
        totalExpected += sectionStats[code].expected;
        totalActual += sectionStats[code].actual;
    }
    const overallPct = totalExpected > 0 ? Math.round((totalActual / totalExpected) * 100) : 0;

    container.innerHTML = `
        <div class="sync-summary-bar">
            <div class="sync-summary-overall">
                <span class="sync-summary-label">Overall Completion</span>
                <div class="sync-progress-bar">
                    <div class="sync-progress-fill" style="width: ${overallPct}%"></div>
                </div>
                <span class="sync-summary-pct">${overallPct}%</span>
                <span class="sync-summary-count">(${totalActual}/${totalExpected} products)</span>
            </div>
            <div class="sync-summary-sections">
                ${sectionCodes.map(code => {
                    const s = sectionStats[code];
                    const pct = s.expected > 0 ? Math.round((s.actual / s.expected) * 100) : 0;
                    return `<div class="sync-summary-chip" style="border-color: ${sections[code].color};">
                        <span style="color: ${sections[code].color}; font-weight: bold;">${code}</span>
                        <span>${pct}%</span>
                    </div>`;
                }).join('')}
            </div>
        </div>
    `;
}

/**
 * Render the main matrix table
 */
function renderSyncGrid(container, data, opId) {
    const { matrix, sections, sectionCodes, step7Annexes, stepStats } = data;

    let html = `
        <table class="sync-table">
            <thead>
                <tr>
                    <th class="sync-th-step">MDMP Step</th>
                    ${sectionCodes.map(code => `
                        <th class="sync-th-section" style="border-top: 3px solid ${sections[code].color};">
                            <div class="sync-th-code" style="color: ${sections[code].color};">${code}</div>
                            <div class="sync-th-name">${sections[code].name}</div>
                        </th>
                    `).join('')}
                    <th class="sync-th-total">Step Total</th>
                </tr>
            </thead>
            <tbody>
    `;

    for (const step of SYNC_STEPS) {
        const ss = stepStats[step.num];
        const stepPct = ss.expected > 0 ? Math.round((ss.actual / ss.expected) * 100) : 100;

        html += `<tr class="sync-row" data-step="${step.num}">`;
        html += `<td class="sync-td-step" style="border-left: 4px solid ${step.color};">
            <div class="sync-step-num">Step ${step.num}</div>
            <div class="sync-step-name">${step.name}</div>
        </td>`;

        for (const code of sectionCodes) {
            const cell = matrix[step.num][code];
            html += renderSyncCell(cell, step, code, sections[code]);
        }

        html += `<td class="sync-td-total">
            <span class="sync-total-pct">${stepPct}%</span>
            <span class="sync-total-count">${ss.actual}/${ss.expected}</span>
        </td></tr>`;

        // Expandable detail row (hidden)
        html += `<tr class="sync-detail-row" id="sync-detail-${step.num}" style="display: none;">
            <td colspan="${sectionCodes.length + 2}">
                <div id="sync-detail-content-${step.num}" class="sync-detail-content"></div>
            </td>
        </tr>`;
    }

    // Annex status row
    html += renderAnnexRow(step7Annexes, sections, sectionCodes);

    html += '</tbody></table>';
    container.innerHTML = html;

    // Attach click handlers to clickable cells
    container.querySelectorAll('.sync-cell').forEach(cell => {
        cell.addEventListener('click', () => {
            const stepNum = parseInt(cell.dataset.step);
            const sectionCode = cell.dataset.section;
            toggleCellDetail(stepNum, sectionCode, data, opId);
        });
    });
}

/**
 * Render a single matrix cell
 */
function renderSyncCell(cell, step, code, section) {
    const icons = {
        not_applicable: '<span class="sync-status sync-na">--</span>',
        not_started:    '<span class="sync-status sync-notstarted">&#x25CB;</span>',
        in_progress:    '<span class="sync-status sync-inprogress">&#x25D1;</span>',
        complete:       '<span class="sync-status sync-complete">&#x25CF;</span>'
    };

    const bgColors = {
        not_applicable: 'transparent',
        not_started:    'rgba(239, 68, 68, 0.12)',
        in_progress:    'rgba(245, 158, 11, 0.12)',
        complete:       'rgba(16, 185, 129, 0.12)'
    };

    const isClickable = cell.expected.length > 0;
    return `<td class="sync-td-cell ${isClickable ? 'sync-cell' : ''}"
        data-step="${step.num}" data-section="${code}"
        style="background-color: ${bgColors[cell.status]}; ${isClickable ? 'cursor: pointer;' : ''}">
        ${icons[cell.status]}
        ${cell.expected.length > 0
            ? `<div class="sync-cell-count">${cell.actual.length}/${cell.expected.length}</div>`
            : ''}
    </td>`;
}

/**
 * Toggle inline detail for a cell click
 */
function toggleCellDetail(stepNum, sectionCode, matrixData, opId) {
    const detailRow = document.getElementById(`sync-detail-${stepNum}`);
    const contentDiv = document.getElementById(`sync-detail-content-${stepNum}`);
    if (!detailRow || !contentDiv) return;

    // Toggle: if same cell clicked again, collapse
    if (detailRow.style.display !== 'none' && contentDiv.dataset.activeSection === sectionCode) {
        detailRow.style.display = 'none';
        contentDiv.dataset.activeSection = '';
        return;
    }

    contentDiv.dataset.activeSection = sectionCode;
    detailRow.style.display = '';

    const cell = matrixData.matrix[stepNum][sectionCode];
    const section = matrixData.sections[sectionCode];
    const stepInfo = SYNC_STEPS[stepNum - 1];

    let html = `
        <div class="sync-detail-header" style="border-left: 4px solid ${section.color};">
            <span style="color: ${section.color}; font-weight: bold; font-size: 1.1rem;">${sectionCode} - ${section.name}</span>
            <span style="color: #94a3b8;">Step ${stepNum}: ${stepInfo.name}</span>
        </div>
        <div class="sync-detail-body">
    `;

    // Expected products from config
    html += '<div class="sync-detail-section"><h4>Expected Products</h4>';
    if (cell.expected.length === 0) {
        html += '<p class="sync-detail-na">No products expected for this step/section.</p>';
    } else {
        cell.expected.forEach(template => {
            const match = cell.actual.find(p =>
                p.title && p.title.toLowerCase().includes(template.name.toLowerCase().substring(0, 15))
            );
            html += `<div class="sync-detail-product ${match ? 'sync-fulfilled' : 'sync-missing'}">
                <span class="sync-detail-icon">${match ? '&#x2713;' : '&#x2717;'}</span>
                <span class="sync-detail-name">${escapeHtml(template.name)}</span>
                ${match
                    ? `<span class="sync-detail-meta">${match.status || 'draft'}${match.lastUpdated ? ' | ' + formatDate(match.lastUpdated, 'short') : ''}</span>`
                    : '<span class="sync-detail-meta sync-meta-missing">Not created</span>'
                }
            </div>`;
        });
    }
    html += '</div>';

    // Actual products created (may include extras not in templates)
    const extras = cell.actual.filter(p => {
        return !cell.expected.some(t =>
            p.title && p.title.toLowerCase().includes(t.name.toLowerCase().substring(0, 15))
        );
    });

    if (extras.length > 0) {
        html += '<div class="sync-detail-section"><h4>Additional Products</h4>';
        extras.forEach(p => {
            html += `<div class="sync-detail-product sync-fulfilled">
                <span class="sync-detail-icon">&#x2713;</span>
                <span class="sync-detail-name">${escapeHtml(p.title || p.id)}</span>
                <span class="sync-detail-meta">${p.status || 'draft'}${p.legacy ? ' (legacy)' : ''}${p.lastUpdated ? ' | ' + formatDate(p.lastUpdated, 'short') : ''}</span>
            </div>`;
        });
        html += '</div>';
    }

    // Step 7 annex status
    if (stepNum === 7 && matrixData.step7Annexes[sectionCode]) {
        const sectionAnnexes = matrixData.step7Annexes[sectionCode];
        if (sectionAnnexes.length > 0) {
            html += '<div class="sync-detail-section"><h4>Annex Status</h4>';
            sectionAnnexes.forEach(a => {
                const exists = a.status === 'exists';
                html += `<div class="sync-detail-product ${exists ? 'sync-fulfilled' : 'sync-missing'}">
                    <span class="sync-detail-icon">${exists ? '&#x2713;' : '&#x2717;'}</span>
                    <span class="sync-detail-name">Annex ${a.letter}: ${a.title}</span>
                    <span class="sync-detail-meta">${exists ? 'Exists' : 'Not started'}</span>
                </div>`;
            });
            html += '</div>';
        }
    }

    html += '</div>';
    contentDiv.innerHTML = html;
}

/**
 * Render the annex status row below Step 7
 */
function renderAnnexRow(step7Annexes, sections, sectionCodes) {
    let html = `<tr class="sync-row sync-annex-row">
        <td class="sync-td-step" style="border-left: 4px solid #ef4444;">
            <div class="sync-step-num">Annexes</div>
            <div class="sync-step-name">OPORD Annexes</div>
        </td>`;

    let totalAnnexes = 0, existingAnnexes = 0;

    for (const code of sectionCodes) {
        const sectionAnnexes = step7Annexes[code] || [];
        const exists = sectionAnnexes.filter(a => a.status === 'exists').length;
        const total = sectionAnnexes.length;
        totalAnnexes += total;
        existingAnnexes += exists;

        let cellBg = 'transparent';
        if (total > 0) {
            cellBg = exists === total ? 'rgba(16, 185, 129, 0.12)'
                   : exists > 0 ? 'rgba(245, 158, 11, 0.12)'
                   : 'rgba(239, 68, 68, 0.12)';
        }

        const letters = sectionAnnexes.map(a =>
            `<span class="sync-annex-letter ${a.status === 'exists' ? 'sync-annex-exists' : 'sync-annex-missing'}">${a.letter}</span>`
        ).join('');

        html += `<td class="sync-td-cell" style="background-color: ${cellBg};">
            ${total > 0 ? `<div class="sync-annex-letters">${letters}</div>` : '<span class="sync-status sync-na">--</span>'}
        </td>`;
    }

    html += `<td class="sync-td-total">
        <span class="sync-total-count">${existingAnnexes}/${totalAnnexes}</span>
    </td></tr>`;

    return html;
}
