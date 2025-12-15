/**
 * Formatting utilities
 */

function formatDate(isoDate) {
    const date = new Date(isoDate);
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return date.toLocaleDateString('en-US', options);
}

function getCategoryDisplay(category) {
    const categories = {
        'bug': 'Bug',
        'feature': 'Feature Request',
        'enhancement': 'Enhancement',
        'ui-ux': 'UI/UX'
    };
    return categories[category] || category;
}

function getStatusDisplay(status) {
    const statuses = {
        'planned': 'Planned',
        'in-progress': 'In Progress',
        'completed': 'Completed',
        'under-review': 'Under Review'
    };
    return statuses[status] || status;
}

// Export for Node.js testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        formatDate,
        getCategoryDisplay,
        getStatusDisplay
    };
}