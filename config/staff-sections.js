/**
 * Staff Section Configuration
 * Single source of truth for all military staff sections, annexes, and product templates.
 * CommonJS module — loaded by server.js, served to frontend via /api/staff-sections.
 *
 * Reference: FM 6-0, Commander and Staff Organization and Operations
 */

const STAFF_SECTIONS = {
    G1: {
        code: 'G1',
        name: 'Personnel',
        fullName: 'Assistant Chief of Staff, Personnel',
        color: '#3b82f6',
        annexes: [
            { letter: 'F', title: 'Sustainment', shared: true, note: 'Personnel Services appendix' }
        ],
        doctrine: ['FM 1-0', 'FM 6-0'],
        products: [
            { name: 'Personnel Running Estimate', steps: [1, 2, 3] },
            { name: 'Personnel Staff Estimate', steps: [2] },
            { name: 'Replacement Operations Plan', steps: [3, 4] },
            { name: 'Casualty Estimation', steps: [4] },
            { name: 'Personnel Annex Input', steps: [7] }
        ]
    },
    G2: {
        code: 'G2',
        name: 'Intelligence',
        fullName: 'Assistant Chief of Staff, Intelligence',
        color: '#06b6d4',
        annexes: [
            { letter: 'B', title: 'Intelligence' }
        ],
        doctrine: ['FM 2-0', 'ATP 2-01.3', 'JP 2-01.3'],
        products: [
            { name: 'Intelligence Running Estimate', steps: [1, 2, 3, 4] },
            { name: 'IPB Products', steps: [2] },
            { name: 'Threat COA (MLCOA)', steps: [2, 3] },
            { name: 'Threat COA (MDCOA)', steps: [2, 3] },
            { name: 'Collection Plan', steps: [3, 4] },
            { name: 'PIR/RFI Tracking', steps: [2, 3, 4, 5] },
            { name: 'Intelligence Annex', steps: [7] }
        ]
    },
    G3: {
        code: 'G3',
        name: 'Operations',
        fullName: 'Assistant Chief of Staff, Operations',
        color: '#8b5cf6',
        annexes: [
            { letter: 'A', title: 'Task Organization' },
            { letter: 'C', title: 'Operations' }
        ],
        doctrine: ['ADP 5-0', 'FM 6-0', 'ADP 3-0'],
        products: [
            { name: 'Operations Running Estimate', steps: [1, 2, 3, 4] },
            { name: 'Friendly COA Development', steps: [3] },
            { name: 'COA Sketch/Statement', steps: [3] },
            { name: 'Synchronization Matrix', steps: [3, 4, 7] },
            { name: 'Decision Support Template', steps: [4, 5] },
            { name: 'Task Organization', steps: [3, 7] },
            { name: 'OPORD / FRAGORD', steps: [7] }
        ]
    },
    G4: {
        code: 'G4',
        name: 'Logistics',
        fullName: 'Assistant Chief of Staff, Logistics',
        color: '#f59e0b',
        annexes: [
            { letter: 'F', title: 'Sustainment', shared: true, note: 'Logistics appendix' }
        ],
        doctrine: ['ADP 4-0', 'FM 4-0', 'FM 6-0'],
        products: [
            { name: 'Logistics Running Estimate', steps: [1, 2, 3, 4] },
            { name: 'Logistics Staff Estimate', steps: [2] },
            { name: 'Sustainment Overlay', steps: [3, 4] },
            { name: 'CSS Synchronization Matrix', steps: [4, 7] },
            { name: 'Sustainment Annex Input', steps: [7] }
        ]
    },
    G6: {
        code: 'G6',
        name: 'Signal',
        fullName: 'Assistant Chief of Staff, Signal',
        color: '#14b8a6',
        annexes: [
            { letter: 'H', title: 'Signal' }
        ],
        doctrine: ['FM 6-02', 'FM 6-0'],
        products: [
            { name: 'Signal Running Estimate', steps: [1, 2, 3, 4] },
            { name: 'Signal Staff Estimate', steps: [2] },
            { name: 'Communications Architecture', steps: [3] },
            { name: 'PACE Plan', steps: [3, 7] },
            { name: 'Signal Annex', steps: [7] }
        ]
    },
    CYBER: {
        code: 'CYBER',
        name: 'Cyber / EW',
        fullName: 'Cyberspace Operations / Electronic Warfare',
        color: '#00d4ff',
        legacy: true,
        annexes: [
            { letter: 'C', title: 'Operations', shared: true, note: 'Appendix 12 (Cyberspace Operations)' },
            { letter: 'C', title: 'Operations', shared: true, note: 'Appendix 13 (Electronic Warfare)' }
        ],
        doctrine: ['FM 3-12', 'ATP 3-12.3', 'JP 3-12'],
        products: [
            { name: 'Cyber Running Estimate', steps: [1, 2, 3, 4] },
            { name: 'Cyberspace IPB', steps: [2] },
            { name: 'Cyber Terrain Analysis', steps: [2] },
            { name: 'Cyber Threat COA', steps: [2, 3] },
            { name: 'Cyber COA Development', steps: [3] },
            { name: 'Cyber Wargame Results', steps: [4] },
            { name: 'Cyber Synchronization Matrix', steps: [4, 7] },
            { name: 'Annex M (Cyber Operations)', steps: [7] }
        ]
    },
    FIRES: {
        code: 'FIRES',
        name: 'Fires',
        fullName: 'Fire Support Coordinator (FSCOORD)',
        color: '#ef4444',
        annexes: [
            { letter: 'D', title: 'Fires' }
        ],
        doctrine: ['ADP 3-19', 'FM 3-09', 'ATP 3-60', 'FM 6-0'],
        products: [
            { name: 'Fire Support Running Estimate', steps: [1, 2, 3, 4] },
            { name: 'Fire Support Staff Estimate', steps: [2] },
            { name: 'High-Payoff Target List (HPTL)', steps: [3, 4] },
            { name: 'Target Selection Standards (TSS)', steps: [3, 4] },
            { name: 'Attack Guidance Matrix (AGM)', steps: [4, 7] },
            { name: 'Fire Support Annex', steps: [7] }
        ]
    },
    PROTECTION: {
        code: 'PROTECTION',
        name: 'Protection',
        fullName: 'Protection Cell / Protection Coordinator',
        color: '#a855f7',
        annexes: [
            { letter: 'E', title: 'Protection' }
        ],
        doctrine: ['ADP 3-37', 'FM 3-37', 'FM 6-0'],
        products: [
            { name: 'Protection Running Estimate', steps: [1, 2, 3, 4] },
            { name: 'Protection Staff Estimate', steps: [2] },
            { name: 'Critical Asset List (CAL)', steps: [2, 3] },
            { name: 'Defended Asset List (DAL)', steps: [3, 4] },
            { name: 'Protection Prioritization', steps: [3, 4] },
            { name: 'Protection Annex', steps: [7] }
        ]
    }
};

/**
 * FM 6-0 Annex Map
 * All standard OPORD annexes with owning staff section.
 * Letters I, O, X are excluded per convention.
 */
const ANNEX_MAP = {
    A: { title: 'Task Organization', owner: 'G3', description: 'Task organization for the operation' },
    B: { title: 'Intelligence', owner: 'G2', description: 'Intelligence estimate, IPB, threat COAs' },
    C: { title: 'Operations', owner: 'G3', description: 'Scheme of maneuver, operations overlay',
         appendixes: {
             12: { title: 'Cyberspace Operations', owner: 'CYBER' },
             13: { title: 'Electronic Warfare', owner: 'CYBER' }
         }
    },
    D: { title: 'Fires', owner: 'FIRES', description: 'Fire support plan, HPTL, AGM' },
    E: { title: 'Protection', owner: 'PROTECTION', description: 'Protection plan, force protection' },
    F: { title: 'Sustainment', owner: 'G4', description: 'Logistics, personnel services, health service support',
         shared: ['G1', 'G4'] },
    G: { title: 'Engineer', owner: 'ENGINEER', description: 'Engineer operations, obstacle plan' },
    H: { title: 'Signal', owner: 'G6', description: 'Signal operations, communications plan' },
    J: { title: 'Public Affairs', owner: 'PAO', description: 'Public affairs guidance and plan' },
    K: { title: 'Civil Affairs', owner: 'G9', description: 'Civil affairs operations' },
    L: { title: 'Information Collection', owner: 'G2', description: 'Information collection plan' },
    M: { title: 'Assessment', owner: 'G5', description: 'Assessment plan',
         note: 'Often used for Cyber Operations Annex at division and below' },
    N: { title: 'Space Operations', owner: 'G3', description: 'Space operations support' },
    P: { title: 'Host-Nation Support', owner: 'G9', description: 'Host-nation support plan' },
    Q: { title: 'Knowledge Management', owner: 'G6', description: 'Knowledge management plan' },
    R: { title: 'Reports', owner: 'G3', description: 'Reports and returns' },
    S: { title: 'Special Technical Operations', owner: 'G3', description: 'STO plan' },
    T: { title: 'Spare', owner: null, description: 'Available for use' },
    U: { title: 'Inspector General', owner: 'IG', description: 'Inspector general plan' },
    V: { title: 'Interagency Coordination', owner: 'G9', description: 'Interagency coordination plan' },
    W: { title: 'Operational Contract Support', owner: 'G4', description: 'Contractor management plan' },
    Y: { title: 'Spare', owner: null, description: 'Available for use' },
    Z: { title: 'Distribution', owner: 'G3', description: 'Distribution plan for the order' }
};

module.exports = { STAFF_SECTIONS, ANNEX_MAP };
