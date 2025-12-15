/**
 * Sanitization utilities
 */

function sanitizeUsername(username) {
    let clean = username.trim();
    clean = clean.replace(/<[^>]*>/g, '');
    clean = clean.replace(/[^a-zA-Z0-9_-]/g, '');
    return clean;
}

function sanitizeEmail(email) {
    let clean = email.trim().toLowerCase();
    clean = clean.replace(/<[^>]*>/g, '');
    return clean;
}

function sanitizeText(text) {
    let clean = text.trim();
    clean = clean.replace(/<[^>]*>/g, '');
    const div = document?.createElement('div') || { textContent: clean, innerHTML: clean };
    div.textContent = clean;
    return div.innerHTML;
}

function sanitizeComment(text) {
    let clean = text.trim();
    clean = clean.replace(/<[^>]*>/g, '');
    const div = document?.createElement('div') || { textContent: clean, innerHTML: clean };
    div.textContent = clean;
    return div.innerHTML;
}

// Export for Node.js testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        sanitizeUsername,
        sanitizeEmail,
        sanitizeText,
        sanitizeComment
    };
}