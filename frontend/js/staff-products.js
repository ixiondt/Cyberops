/**
 * Staff Products View
 * Renders a grid of staff section cards with product lists, create/export actions.
 */

let _staffSections = null;
let _staffAnnexMap = null;
let _currentStaffOpId = null;

/**
 * Load staff section config from API (cached)
 */
async function loadStaffConfig() {
    if (_staffSections) return;
    try {
        const res = await fetch('/api/staff-sections');
        const data = await res.json();
        _staffSections = data.sections;
        _staffAnnexMap = data.annexMap;
    } catch (err) {
        console.error('Error loading staff sections config:', err);
    }
}

/**
 * Main render function called by dashboard-app.js
 */
async function renderStaffProductsView(opId) {
    _currentStaffOpId = opId;
    await loadStaffConfig();
    if (!_staffSections) return;

    // Populate filter dropdown
    const filter = document.getElementById('staff-section-filter');
    if (filter && filter.options.length <= 1) {
        Object.values(_staffSections).forEach(section => {
            const opt = document.createElement('option');
            opt.value = section.code;
            opt.textContent = `${section.code} - ${section.name}`;
            filter.appendChild(opt);
        });
        filter.addEventListener('change', () => renderStaffGrid(opId, filter.value));
    }

    const filterValue = filter ? filter.value : '';
    await renderStaffGrid(opId, filterValue);
}

/**
 * Render the grid of staff section cards
 */
async function renderStaffGrid(opId, filterCode) {
    const container = document.getElementById('staff-sections-grid');
    const detailEl = document.getElementById('staff-section-detail');
    if (!container) return;

    // Hide detail view when showing grid
    if (detailEl) detailEl.style.display = 'none';

    const sections = filterCode
        ? { [filterCode]: _staffSections[filterCode] }
        : _staffSections;

    // Fetch product counts for all sections in parallel
    const sectionEntries = Object.entries(sections);
    const productCounts = await Promise.all(
        sectionEntries.map(async ([code]) => {
            try {
                const res = await fetch(`/api/operations/${opId}/staff/${code}/products`);
                const products = await res.json();
                return { code, products };
            } catch {
                return { code, products: [] };
            }
        })
    );

    const countMap = {};
    productCounts.forEach(({ code, products }) => {
        countMap[code] = products;
    });

    container.innerHTML = `
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem; margin-top: 1.5rem;">
            ${sectionEntries.map(([code, section]) => {
                const products = countMap[code] || [];
                const annexLetters = section.annexes.map(a => a.letter).join(', ');
                const lastUpdated = products.length > 0
                    ? new Date(products[products.length - 1].lastUpdated).toLocaleDateString()
                    : 'No products';

                return `
                    <div class="staff-card" style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); border: 1px solid rgba(100,150,200,0.2); border-radius: 8px; overflow: hidden; cursor: pointer;" onclick="showStaffSectionDetail('${opId}', '${code}')">
                        <div style="height: 4px; background: ${section.color};"></div>
                        <div style="padding: 1.25rem;">
                            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.75rem;">
                                <div>
                                    <span style="font-size: 1.25rem; font-weight: bold; color: ${section.color};">${code}</span>
                                    <span style="color: #cbd5e1; margin-left: 0.5rem; font-size: 0.9rem;">${section.name}</span>
                                </div>
                                <span style="background: ${section.color}22; color: ${section.color}; padding: 0.2rem 0.6rem; border-radius: 12px; font-size: 0.8rem; font-weight: bold;">${products.length}</span>
                            </div>
                            <div style="color: #94a3b8; font-size: 0.85rem; margin-bottom: 0.5rem;">
                                Annexes: <strong style="color: #cbd5e1;">${annexLetters || 'N/A'}</strong>
                            </div>
                            <div style="color: #64748b; font-size: 0.8rem;">
                                ${lastUpdated}
                            </div>
                            <div style="margin-top: 0.75rem; display: flex; flex-wrap: wrap; gap: 0.25rem;">
                                ${section.doctrine.map(d => `<span style="background: #334155; color: #94a3b8; padding: 0.15rem 0.4rem; border-radius: 3px; font-size: 0.7rem;">${d}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

/**
 * Show expanded detail view for a staff section
 */
async function showStaffSectionDetail(opId, sectionCode) {
    const section = _staffSections[sectionCode];
    if (!section) return;

    const gridEl = document.getElementById('staff-sections-grid');
    const detailEl = document.getElementById('staff-section-detail');
    if (!detailEl) return;

    // Fetch products
    let products = [];
    try {
        const res = await fetch(`/api/operations/${opId}/staff/${sectionCode}/products`);
        products = await res.json();
    } catch (err) {
        console.error('Error loading staff products:', err);
    }

    // Build product list HTML
    const productListHtml = products.length > 0
        ? products.map(p => `
            <div style="background: #334155; padding: 1rem; border-radius: 6px; border-left: 3px solid ${section.color}; display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <div style="color: #e2e8f0; font-weight: bold; font-size: 0.95rem;">${p.title}</div>
                    <div style="color: #94a3b8; font-size: 0.8rem; margin-top: 0.25rem;">
                        ${p.step ? `Step ${p.step} | ` : ''}${p.status} | ${new Date(p.lastUpdated).toLocaleDateString()}
                        ${p.legacy ? ' <span style="color: #f59e0b;">(legacy)</span>' : ''}
                    </div>
                </div>
                ${!p.legacy ? `<button class="btn btn-small" style="color: #ef4444; border-color: #ef4444;" onclick="event.stopPropagation(); deleteStaffProductUI('${opId}', '${sectionCode}', '${p.id}')">Delete</button>` : ''}
            </div>
        `).join('')
        : '<div style="color: #64748b; text-align: center; padding: 2rem;">No products yet. Create one to get started.</div>';

    // Build product template buttons
    const templateBtns = section.products.map(t => `
        <button class="btn btn-small" style="font-size: 0.8rem;" onclick="createStaffProductUI('${opId}', '${sectionCode}', '${t.name.replace(/'/g, "\\'")}', '${t.steps[0] || ''}')">
            + ${t.name}
        </button>
    `).join('');

    // Build annex export buttons
    const annexBtns = section.annexes.map(a => `
        <button class="btn btn-primary" style="font-size: 0.85rem;" onclick="exportStaffAnnex('${opId}', '${a.letter}')">
            Export Annex ${a.letter}${a.shared ? ` (${a.note || 'shared'})` : ''}
        </button>
    `).join('');

    detailEl.innerHTML = `
        <div style="margin-top: 1.5rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <div>
                    <button class="btn btn-small" onclick="backToStaffGrid('${opId}')" style="margin-right: 1rem;">&#8592; Back</button>
                    <span style="font-size: 1.5rem; font-weight: bold; color: ${section.color};">${sectionCode}</span>
                    <span style="color: #cbd5e1; margin-left: 0.5rem; font-size: 1.1rem;">${section.fullName}</span>
                </div>
            </div>

            <!-- Annex Export -->
            ${section.annexes.length > 0 ? `
            <div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); border: 2px solid ${section.color}44; border-radius: 8px; padding: 1.25rem; margin-bottom: 1.5rem;">
                <h3 style="color: ${section.color}; font-size: 0.95rem; margin-bottom: 0.75rem;">Annex Export (AR 25-50 Format)</h3>
                <div style="display: flex; flex-wrap: wrap; gap: 0.75rem;">
                    ${annexBtns}
                </div>
                <div id="staff-export-status" style="color: #94a3b8; font-size: 0.8rem; margin-top: 0.5rem;"></div>
            </div>
            ` : ''}

            <!-- Product Templates -->
            <div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); border: 1px solid rgba(100,150,200,0.2); border-radius: 8px; padding: 1.25rem; margin-bottom: 1.5rem;">
                <h3 style="color: #cbd5e1; font-size: 0.95rem; margin-bottom: 0.75rem;">Create Product</h3>
                <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                    ${templateBtns}
                </div>
            </div>

            <!-- Product List -->
            <div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); border: 1px solid rgba(100,150,200,0.2); border-radius: 8px; padding: 1.25rem;">
                <h3 style="color: #cbd5e1; font-size: 0.95rem; margin-bottom: 1rem;">Products (${products.length})</h3>
                <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                    ${productListHtml}
                </div>
            </div>

            <!-- Doctrine References -->
            <div style="background: linear-gradient(135deg, #1a2332 0%, #0d1626 100%); border: 1px solid ${section.color}33; border-radius: 8px; padding: 1.25rem; margin-top: 1.5rem;">
                <h3 style="color: ${section.color}; font-size: 0.95rem; margin-bottom: 0.75rem;">Doctrine References</h3>
                <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                    ${section.doctrine.map(d => `<span style="background: ${section.color}22; color: ${section.color}; padding: 0.3rem 0.7rem; border-radius: 4px; font-size: 0.85rem;">${d}</span>`).join('')}
                </div>
            </div>
        </div>
    `;

    if (gridEl) gridEl.style.display = 'none';
    detailEl.style.display = 'block';
}

/**
 * Return to the staff grid view
 */
function backToStaffGrid(opId) {
    const gridEl = document.getElementById('staff-sections-grid');
    const detailEl = document.getElementById('staff-section-detail');
    if (gridEl) gridEl.style.display = '';
    if (detailEl) detailEl.style.display = 'none';
}

/**
 * Create a staff product via API
 */
async function createStaffProductUI(opId, sectionCode, title, step) {
    try {
        const res = await fetch(`/api/operations/${opId}/staff/${sectionCode}/products`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, step: step || undefined })
        });
        const result = await res.json();
        if (result.success) {
            showStaffSectionDetail(opId, sectionCode);
        } else {
            alert('Error creating product: ' + (result.error || 'Unknown error'));
        }
    } catch (err) {
        alert('Error creating product: ' + err.message);
    }
}

/**
 * Delete a staff product via API
 */
async function deleteStaffProductUI(opId, sectionCode, productId) {
    if (!confirm('Delete this product?')) return;
    try {
        const res = await fetch(`/api/operations/${opId}/staff/${sectionCode}/products/${productId}`, {
            method: 'DELETE'
        });
        const result = await res.json();
        if (result.success) {
            showStaffSectionDetail(opId, sectionCode);
        } else {
            alert('Error deleting product: ' + (result.error || 'Unknown error'));
        }
    } catch (err) {
        alert('Error deleting product: ' + err.message);
    }
}

/**
 * Export a staff annex as Word document
 */
async function exportStaffAnnex(opId, annexLetter) {
    const statusDiv = document.getElementById('staff-export-status');
    try {
        if (statusDiv) statusDiv.textContent = `Exporting Annex ${annexLetter}...`;

        const response = await fetch(`/api/export/annex?name=ANNEX-${annexLetter}&operation=${opId}`);
        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error || 'Export failed');
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ANNEX-${annexLetter}_${new Date().toISOString().split('T')[0]}.docx`;
        a.click();
        window.URL.revokeObjectURL(url);

        if (statusDiv) statusDiv.textContent = `Annex ${annexLetter} exported successfully.`;
        setTimeout(() => { if (statusDiv) statusDiv.textContent = ''; }, 3000);
    } catch (err) {
        if (statusDiv) statusDiv.textContent = `Export failed: ${err.message}`;
    }
}
