/**
 * Network Visualization Module
 * Manages network topology display using vis-network library
 */

let networkGraph = null;
let currentLayer = 'physical';
let networkData = null;

/**
 * Initialize network map
 */
async function initializeNetworkMap(opId) {
    const container = document.getElementById('network-container');
    if (!container) return;

    try {
        // Load network data
        const response = await fetch(`/api/network-map/data?operation=${opId}`);
        const data = await response.json();
        networkData = data;

        // Initialize vis-network
        const nodes = new vis.DataSet();
        const edges = new vis.DataSet();

        // Populate network data based on current layer
        populateNetworkData(data, currentLayer, nodes, edges);

        const options = {
            physics: {
                enabled: true,
                barnesHut: {
                    gravitationalConstant: -26000,
                    centralGravity: 0.005,
                    springLength: 200,
                    springConstant: 0.08
                }
            },
            interaction: {
                navigationButtons: true,
                keyboard: true,
                zoomView: true,
                dragView: true
            }
        };

        networkGraph = new vis.Network(container, { nodes, edges }, options);

        setupNetworkEventHandlers();
        setupLayerSwitching();

        showSuccess('Network map loaded');
    } catch (error) {
        console.error('Error initializing network map:', error);
        showError('network-container', 'Failed to load network map');
    }
}

/**
 * Populate network data for specific layer
 */
function populateNetworkData(data, layer, nodes, edges) {
    if (!data.layers || !data.layers[layer]) {
        return;
    }

    const layerData = data.layers[layer];

    // Add nodes
    if (layerData.nodes) {
        layerData.nodes.forEach(node => {
            nodes.add({
                id: node.id,
                label: node.label,
                title: node.description,
                color: getNodeColor(node),
                shape: getNodeShape(node)
            });
        });
    }

    // Add edges
    if (layerData.edges) {
        layerData.edges.forEach(edge => {
            edges.add({
                from: edge.source,
                to: edge.target,
                label: edge.type,
                title: edge.description
            });
        });
    }
}

/**
 * Get node color based on type/threat level
 */
function getNodeColor(node) {
    if (node.threat_level === 'high') return '#ef4444';
    if (node.threat_level === 'medium') return '#f59e0b';
    if (node.threat_level === 'low') return '#22c55e';
    if (node.criticality === 'CRITICAL') return '#dc2626';
    return '#3b82f6';
}

/**
 * Get node shape based on type
 */
function getNodeShape(node) {
    if (node.type === 'firewall' || node.type === 'router') return 'diamond';
    if (node.type === 'database' || node.type === 'server') return 'box';
    if (node.type === 'user' || node.type === 'account') return 'ellipse';
    if (node.type === 'service') return 'star';
    return 'dot';
}

/**
 * Setup network event handlers
 */
function setupNetworkEventHandlers() {
    if (!networkGraph) return;

    networkGraph.on('click', (params) => {
        if (params.nodes.length > 0) {
            const nodeId = params.nodes[0];
            showNodeDetails(nodeId);
        }
    });
}

/**
 * Show node details
 */
function showNodeDetails(nodeId) {
    if (!networkData || !networkData.layers) return;

    // Search for node across all layers
    let nodeInfo = null;
    Object.values(networkData.layers).forEach(layer => {
        if (layer.nodes) {
            const found = layer.nodes.find(n => n.id === nodeId);
            if (found) nodeInfo = found;
        }
    });

    if (!nodeInfo) return;

    const modal = document.getElementById('mdmp-step-modal');
    if (!modal) return;

    modal.querySelector('h3').textContent = nodeInfo.label;
    modal.querySelector('#mdmp-step-details-content').innerHTML = `
        <div>
            <p><strong>ID:</strong> ${escapeHtml(nodeInfo.id)}</p>
            <p><strong>Type:</strong> ${nodeInfo.type}</p>
            <p><strong>Description:</strong> ${nodeInfo.description || 'N/A'}</p>
            ${nodeInfo.criticality ? `<p><strong>Criticality:</strong> ${nodeInfo.criticality}</p>` : ''}
            ${nodeInfo.threat_level ? `<p><strong>Threat Level:</strong> ${nodeInfo.threat_level}</p>` : ''}
        </div>
    `;

    openModal('mdmp-step-modal');
}

/**
 * Setup layer switching
 */
function setupLayerSwitching() {
    document.querySelectorAll('.layer-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const layer = e.target.dataset.layer;
            switchNetworkLayer(layer);
        });
    });
}

/**
 * Switch network layer
 */
function switchNetworkLayer(layer) {
    if (!networkGraph || !networkData) return;

    currentLayer = layer;

    // Update active button
    document.querySelectorAll('.layer-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.layer === layer);
    });

    // Reload network data
    const nodes = new vis.DataSet();
    const edges = new vis.DataSet();

    populateNetworkData(networkData, layer, nodes, edges);

    networkGraph.setData({ nodes, edges });
    showInfo(`Switched to ${layer} layer`);
}

/**
 * Export network data
 */
function exportNetworkData() {
    if (!networkData) {
        showWarning('No network data to export');
        return;
    }

    const dataStr = JSON.stringify(networkData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `network-topology-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);

    showSuccess('Network data exported');
}

/**
 * Import network data from CSV/JSON
 */
function importNetworkData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,.csv';
    input.onchange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            const content = await file.text();
            const data = file.name.endsWith('.json')
                ? JSON.parse(content)
                : parseCSVNetworkData(content);

            // Save via API
            await fetch('/api/network-map/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            networkData = data;
            initializeNetworkMap(currentOperation?.id);
            showSuccess('Network data imported successfully');
        } catch (error) {
            console.error('Error importing network data:', error);
            showError('Failed to import network data');
        }
    };
    input.click();
}

/**
 * Parse CSV network data
 */
function parseCSVNetworkData(csv) {
    // TODO: Implement CSV parsing
    // Return structured network data
    return { layers: {} };
}
