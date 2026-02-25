/**
 * Phase Tracker Module
 * Manages operation phases and transitions
 */

// Define operation phases with their properties
const OPERATION_PHASES = [
    {
        id: 'planning',
        name: 'Planning Phase',
        description: 'Deployment & Integration',
        order: 1,
        color: '#3b82f6',
        icon: '📋',
        tasks: [
            'Mission analysis',
            'Resource allocation',
            'Team briefing',
            'System integration'
        ]
    },
    {
        id: 'execution',
        name: 'Execution Phase',
        description: 'Active Operations',
        order: 2,
        color: '#f59e0b',
        icon: '⚙️',
        tasks: [
            'Real-time monitoring',
            'Incident response',
            'Analysis & reporting',
            'Threat hunting'
        ]
    },
    {
        id: 'transition',
        name: 'Transition Phase',
        description: 'Hardening & Sustainment',
        order: 3,
        color: '#10b981',
        icon: '🔒',
        tasks: [
            'Defense hardening',
            'Knowledge transfer',
            'Documentation',
            'Lessons learned'
        ]
    },
    {
        id: 'completion',
        name: 'Completion Phase',
        description: 'Assessment & Closure',
        order: 4,
        color: '#8b5cf6',
        icon: '✅',
        tasks: [
            'Final assessment',
            'After-action report',
            'Archive documentation',
            'Operation closure'
        ]
    }
];

/**
 * Get current phase from operation metadata
 */
function getCurrentPhase(operation) {
    if (!operation) return OPERATION_PHASES[0];

    const phaseStr = operation.status || operation.phase || 'planning';
    // Extract phase ID: "Planning Phase - Deployment & Integration" → "planning"
    // Also handles markdown formatting: "** Planning Phase" → "planning"
    const cleaned = phaseStr.replace(/^\*+\s*/, '').toLowerCase().trim();
    const phaseId = cleaned.split(/[\s\-]/)[0].trim();

    return OPERATION_PHASES.find(p => p.id === phaseId) || OPERATION_PHASES[0];
}

/**
 * Get phase progress (0-100)
 */
function getPhaseProgress(operation) {
    const currentPhase = getCurrentPhase(operation);
    return (currentPhase.order / OPERATION_PHASES.length) * 100;
}

/**
 * Render phase timeline/progress indicator
 */
function renderPhaseTimeline(operation) {
    const currentPhase = getCurrentPhase(operation);

    let html = `
        <div style="margin: 1.5rem 0;">
            <h3 style="color: #cbd5e1; margin-bottom: 1rem;">Operation Timeline</h3>
            <div style="display: flex; gap: 0.5rem; justify-content: space-between; align-items: center;">
    `;

    OPERATION_PHASES.forEach((phase, idx) => {
        const isActive = phase.id === currentPhase.id;
        const isCompleted = phase.order < currentPhase.order;

        html += `
            <div style="flex: 1; text-align: center;">
                <div style="
                    width: 50px;
                    height: 50px;
                    margin: 0 auto 0.5rem;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.5rem;
                    background-color: ${isActive || isCompleted ? phase.color : '#334155'};
                    color: white;
                    cursor: pointer;
                    transition: all 0.3s;
                    border: 2px solid ${isActive ? '#e2e8f0' : 'transparent'};
                " onclick="transitionToPhase('${operation.id}', '${phase.id}')" title="Click to ${isCompleted ? 're-enter' : 'transition to'} ${phase.name}">
                    ${phase.icon}
                </div>
                <p style="color: #cbd5e1; font-size: 0.85rem; margin: 0;">
                    <strong>${phase.name}</strong><br>
                    <span style="color: #94a3b8; font-size: 0.75rem;">${phase.description}</span>
                </p>
            </div>
            ${idx < OPERATION_PHASES.length - 1 ? `
                <div style="
                    width: 2px;
                    height: 3px;
                    background-color: ${isCompleted || phase.order <= currentPhase.order ? phase.color : '#475569'};
                    margin-bottom: 2rem;
                "></div>
            ` : ''}
        `;
    });

    html += `
            </div>
        </div>
    `;

    return html;
}

/**
 * Render current phase details
 */
function renderPhaseDetails(operation) {
    const currentPhase = getCurrentPhase(operation);
    const nextPhase = OPERATION_PHASES[currentPhase.order];

    let html = `
        <div style="background-color: #334155; border-left: 4px solid ${currentPhase.color}; padding: 1.5rem; border-radius: 8px; margin: 1.5rem 0;">
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
                <div>
                    <h3 style="color: ${currentPhase.color}; margin: 0 0 0.5rem 0;">
                        ${currentPhase.icon} ${currentPhase.name}
                    </h3>
                    <p style="color: #cbd5e1; margin: 0; font-size: 0.95rem;">${currentPhase.description}</p>
                </div>
                ${nextPhase ? `
                    <button class="btn btn-primary" onclick="transitionToPhase('${operation.id}', '${nextPhase.id}')" style="margin-left: 1rem;">
                        → ${nextPhase.name}
                    </button>
                ` : `
                    <span style="background-color: #1e3a1f; color: #dcfce7; padding: 0.5rem 1rem; border-radius: 4px; font-size: 0.9rem;">
                        ✅ Operation Complete
                    </span>
                `}
            </div>

            <div style="margin-top: 1rem;">
                <p style="color: #94a3b8; font-weight: 600; margin-bottom: 0.75rem;">Phase Tasks:</p>
                <ul style="list-style: none; padding: 0; margin: 0;">
                    ${currentPhase.tasks.map((task, idx) => `
                        <li style="color: #cbd5e1; padding: 0.4rem 0; border-bottom: 1px solid #475569;">
                            ${idx + 1}. ${task}
                        </li>
                    `).join('')}
                </ul>
            </div>
        </div>
    `;

    return html;
}

/**
 * Render phase-specific recommendations
 */
function renderPhaseRecommendations(operation) {
    const currentPhase = getCurrentPhase(operation);

    const recommendations = {
        'planning': {
            title: '📋 Planning Recommendations',
            items: [
                'Complete MDMP analysis before execution',
                'Ensure all personnel are briefed',
                'Verify system integrations',
                'Establish communication procedures'
            ]
        },
        'execution': {
            title: '⚙️ Execution Recommendations',
            items: [
                'Monitor incident alerts in real-time',
                'Document all findings with timestamps',
                'Maintain communication with stakeholders',
                'Update POAMs and status tracker regularly'
            ]
        },
        'transition': {
            title: '🔒 Transition Recommendations',
            items: [
                'Harden defensive posture based on findings',
                'Transfer knowledge to operations team',
                'Complete all documentation',
                'Schedule lessons learned session'
            ]
        },
        'completion': {
            title: '✅ Completion Recommendations',
            items: [
                'Finalize after-action report',
                'Archive all operation data',
                'Update incident response procedures',
                'Schedule follow-up assessment'
            ]
        }
    };

    const rec = recommendations[currentPhase.id] || recommendations.planning;

    let html = `
        <div style="background-color: #334155; padding: 1.5rem; border-radius: 8px; margin: 1.5rem 0;">
            <h3 style="color: ${currentPhase.color}; margin-top: 0;">${rec.title}</h3>
            <ul style="list-style: none; padding: 0; margin: 0;">
                ${rec.items.map(item => `
                    <li style="color: #cbd5e1; padding: 0.75rem 0; border-bottom: 1px solid #475569; display: flex; align-items: center;">
                        <span style="color: ${currentPhase.color}; margin-right: 0.75rem; font-weight: bold;">▸</span>
                        ${item}
                    </li>
                `).join('')}
            </ul>
        </div>
    `;

    return html;
}

/**
 * Transition to a new phase
 */
async function transitionToPhase(opId, phaseId) {
    const newPhase = OPERATION_PHASES.find(p => p.id === phaseId);
    if (!newPhase) {
        showError('Invalid phase');
        return;
    }

    if (!confirm(`Transition to "${newPhase.name}"?\n\nThis will update the operation status and affect available actions.`)) {
        return;
    }

    try {
        showInfo(`Transitioning to ${newPhase.name}...`);

        // Update backend
        const response = await fetch(`/api/operations/${opId}/phase`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phase: phaseId })
        });

        if (response.ok) {
            const result = await response.json();
            showSuccess(`✅ ${result.message || `Operation moved to ${newPhase.name}`}`);

            // Reload operation data to get updated status
            if (window.dashboard) {
                await window.dashboard.loadOperation();
            }
        } else {
            const error = await response.json().catch(() => ({}));
            const errorMsg = error.error || response.statusText;
            console.error('Phase transition error:', errorMsg);
            showError(`❌ Failed to transition phase: ${errorMsg}`);
        }
    } catch (error) {
        console.error('Error transitioning phase:', error);
        showError(`❌ Error: ${error.message}`);
    }
}

/**
 * Get phase-appropriate view recommendations
 */
function getPhaseViewRecommendations(operation) {
    const currentPhase = getCurrentPhase(operation);

    const viewRecs = {
        'planning': {
            primary: 'MDMP Planner',
            description: 'Focus on mission analysis and COA development',
            views: ['overview', 'mdmp-planner', 'intelligence']
        },
        'execution': {
            primary: 'Incidents & POAMs',
            description: 'Track active incidents and remediation actions',
            views: ['incidents', 'poams', 'network-map']
        },
        'transition': {
            primary: 'POAMs & Network',
            description: 'Implement hardening actions and improvements',
            views: ['poams', 'network-map', 'mdmp-planner']
        },
        'completion': {
            primary: 'Overview & Intelligence',
            description: 'Review findings and prepare final assessment',
            views: ['overview', 'intelligence', 'poams']
        }
    };

    return viewRecs[currentPhase.id] || viewRecs.planning;
}

/**
 * Render phase context banner
 */
function renderPhaseContextBanner(operation) {
    const currentPhase = getCurrentPhase(operation);
    const phaseRecs = getPhaseViewRecommendations(operation);

    return `
        <div style="
            background: linear-gradient(135deg, ${currentPhase.color}20 0%, ${currentPhase.color}05 100%);
            border-left: 4px solid ${currentPhase.color};
            padding: 1rem;
            border-radius: 4px;
            margin-bottom: 1.5rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        ">
            <div>
                <p style="color: ${currentPhase.color}; font-weight: 600; margin: 0 0 0.25rem 0;">
                    ${currentPhase.icon} ${currentPhase.name}
                </p>
                <p style="color: #cbd5e1; font-size: 0.9rem; margin: 0;">
                    📌 Primary focus: ${phaseRecs.primary}<br>
                    ${phaseRecs.description}
                </p>
            </div>
        </div>
    `;
}
