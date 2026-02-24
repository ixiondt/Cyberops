/**
 * Form Utilities - Validation, Modal Management, Notifications
 */

// ============================================
// Modal Management
// ============================================

function openModal(modalId, title) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        if (title) {
            const titleEl = modal.querySelector('h3');
            if (titleEl) {
                titleEl.textContent = title;
            }
        }
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}

// ============================================
// Validation Functions
// ============================================

function validatePOAMForm(data) {
    const errors = [];

    // NIST SP 800-171 Required Fields
    if (!data.weakness || data.weakness.trim() === '') {
        errors.push('Weakness/Finding description is required');
    }

    if (!data.responsibleOrganization || data.responsibleOrganization.trim() === '') {
        errors.push('Responsible Organization is required');
    }

    if (!data.nistControl || data.nistControl.trim() === '') {
        errors.push('NIST 800-171 Control is required (e.g., SI-4)');
    }

    if (!data.scheduledCompletionDate) {
        errors.push('Scheduled Completion Date is required');
    }

    if (!data.weaknessIdentification) {
        errors.push('Weakness Identification method is required');
    }

    // Validate NIST Control format (e.g., SI-4, AC-2)
    if (data.nistControl && !data.nistControl.match(/^[A-Z]{2,3}-\d{1,2}$/)) {
        errors.push('NIST Control must be in format like SI-4, AC-2, or IA-2');
    }

    const validStatuses = ['ongoing', 'complete'];
    if (data.status && !validStatuses.includes(data.status)) {
        errors.push('Invalid status selected');
    }

    const validPriorities = ['critical', 'high', 'medium', 'low'];
    if (data.priority && !validPriorities.includes(data.priority)) {
        errors.push('Invalid priority selected');
    }

    const validIdentificationMethods = ['assessment', 'audit', 'incident', 'scan', 'threat-modeling', 'penetration-test', 'other'];
    if (data.weaknessIdentification && !validIdentificationMethods.includes(data.weaknessIdentification)) {
        errors.push('Invalid weakness identification method');
    }

    return errors;
}

function validateIncidentForm(data) {
    const errors = [];

    if (!data.title || data.title.trim() === '') {
        errors.push('Incident title is required');
    }

    if (!data.severity) {
        errors.push('Incident severity is required');
    }

    const validSeverities = ['critical', 'high', 'medium', 'low'];
    if (data.severity && !validSeverities.includes(data.severity)) {
        errors.push('Invalid severity selected');
    }

    const validStatuses = ['active', 'investigating', 'contained', 'resolved'];
    if (data.status && !validStatuses.includes(data.status)) {
        errors.push('Invalid status selected');
    }

    return errors;
}

// ============================================
// Notification System
// ============================================

function showNotification(message, type = 'info', duration = 3000) {
    const container = document.getElementById('notifications-container');
    if (!container) {
        console.warn('Notifications container not found');
        return;
    }

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.setAttribute('role', 'alert');
    notification.textContent = message;

    container.appendChild(notification);

    // Auto-remove after duration
    if (duration > 0) {
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 300);
        }, duration);
    }

    return notification;
}

// Convenience methods
function showSuccess(message) {
    return showNotification(message, 'success', 3000);
}

function showError(message) {
    return showNotification(message, 'error', 4000);
}

function showWarning(message) {
    return showNotification(message, 'warning', 3500);
}

function showInfo(message) {
    return showNotification(message, 'info', 3000);
}

// ============================================
// Form Field Error Display
// ============================================

function displayFormError(fieldId, message) {
    const errorEl = document.getElementById(`error-${fieldId}`);
    if (errorEl) {
        errorEl.textContent = message;
        errorEl.style.display = 'block';
    }

    const inputEl = document.getElementById(fieldId);
    if (inputEl) {
        inputEl.style.borderColor = '#fca5a5';
    }
}

function clearFormError(fieldId) {
    const errorEl = document.getElementById(`error-${fieldId}`);
    if (errorEl) {
        errorEl.textContent = '';
        errorEl.style.display = 'none';
    }

    const inputEl = document.getElementById(fieldId);
    if (inputEl) {
        inputEl.style.borderColor = '';
    }
}

function clearFormErrors() {
    document.querySelectorAll('.form-error').forEach(el => {
        el.textContent = '';
        el.style.display = 'none';
    });

    document.querySelectorAll('input, select, textarea').forEach(el => {
        el.style.borderColor = '';
    });
}

// ============================================
// Date Utilities
// ============================================

function formatDate(dateString, format = 'short') {
    if (!dateString) return 'N/A';

    try {
        const date = new Date(dateString);

        if (format === 'short') {
            return date.toLocaleDateString();
        } else if (format === 'long') {
            return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
        } else if (format === 'iso') {
            return date.toISOString().split('T')[0];
        }

        return date.toLocaleDateString();
    } catch {
        return dateString;
    }
}

function formatTime(dateString) {
    if (!dateString) return 'N/A';

    try {
        const date = new Date(dateString);
        return date.toLocaleTimeString();
    } catch {
        return dateString;
    }
}

// ============================================
// Severity and Priority Badge Helpers
// ============================================

function getSeverityClass(severity) {
    const severityMap = {
        'critical': 'severity-critical',
        'high': 'severity-high',
        'medium': 'severity-medium',
        'low': 'severity-low'
    };
    return severityMap[severity?.toLowerCase()] || 'severity-low';
}

function getPriorityClass(priority) {
    const priorityMap = {
        'critical': 'priority-critical',
        'high': 'priority-high',
        'medium': 'priority-medium',
        'low': 'priority-low'
    };
    return priorityMap[priority?.toLowerCase()] || 'priority-low';
}

function getStatusClass(status) {
    const statusMap = {
        'open': 'status-open',
        'in-progress': 'status-in-progress',
        'complete': 'status-complete',
        'active': 'status-open',
        'investigating': 'status-in-progress',
        'contained': 'status-in-progress',
        'resolved': 'status-complete'
    };
    return statusMap[status?.toLowerCase()] || 'status-open';
}

// ============================================
// Array and Object Utilities
// ============================================

function groupBy(array, key) {
    return array.reduce((result, item) => {
        const group = item[key];
        if (!result[group]) {
            result[group] = [];
        }
        result[group].push(item);
        return result;
    }, {});
}

function sortBy(array, key, direction = 'asc') {
    return [...array].sort((a, b) => {
        const aVal = a[key];
        const bVal = b[key];

        if (aVal < bVal) return direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return direction === 'asc' ? 1 : -1;
        return 0;
    });
}

function filterBy(array, key, value) {
    return array.filter(item => item[key] === value);
}

// ============================================
// HTML Escaping
// ============================================

function escapeHtml(text) {
    if (!text) return '';

    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };

    return text.replace(/[&<>"']/g, char => map[char]);
}

// ============================================
// Loading States
// ============================================

function showLoading(elementId, message = 'Loading...') {
    const el = document.getElementById(elementId);
    if (el) {
        el.innerHTML = `
            <div class="loading">
                <div class="spinner"></div>
                <p>${escapeHtml(message)}</p>
            </div>
        `;
    }
}

function showEmpty(elementId, message = 'No items found') {
    const el = document.getElementById(elementId);
    if (el) {
        el.innerHTML = `
            <div class="empty-state">
                <p>${escapeHtml(message)}</p>
            </div>
        `;
    }
}

function showError(elementId, message = 'An error occurred') {
    const el = document.getElementById(elementId);
    if (el) {
        el.innerHTML = `
            <div class="empty-state">
                <p style="color: #fca5a5;">❌ ${escapeHtml(message)}</p>
            </div>
        `;
    }
}

// ============================================
// API Error Handling
// ============================================

async function handleApiResponse(response) {
    if (!response.ok) {
        let errorMessage = 'An error occurred';

        try {
            const data = await response.json();
            errorMessage = data.error || `HTTP ${response.status}`;
        } catch {
            errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        }

        throw new Error(errorMessage);
    }

    return response.json();
}

// ============================================
// Debouncing and Throttling
// ============================================

function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
}

function throttle(func, delay) {
    let lastCall = 0;
    return function(...args) {
        const now = Date.now();
        if (now - lastCall >= delay) {
            lastCall = now;
            func(...args);
        }
    };
}
