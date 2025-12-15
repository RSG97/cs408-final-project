/**
 * Validation utilities
 */

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    if (password.length < 8) {
        return { valid: false, message: 'Password must be at least 8 characters long' };
    }
    return { valid: true, message: '' };
}

function validateUsername(username) {
    if (username.length < 3 || username.length > 20) {
        return { valid: false, message: 'Username must be between 3 and 20 characters' };
    }
    return { valid: true, message: '' };
}

function validateTitle(title) {
    if (title.length < 5) {
        return { valid: false, message: 'Title must be at least 5 characters long' };
    }
    if (title.length > 100) {
        return { valid: false, message: 'Title must be 100 characters or less' };
    }
    return { valid: true, message: '' };
}

function validateDescription(description) {
    if (description.length < 10) {
        return { valid: false, message: 'Description must be at least 10 characters long' };
    }
    if (description.length > 1000) {
        return { valid: false, message: 'Description must be 1000 characters or less' };
    }
    return { valid: true, message: '' };
}

function validateComment(comment) {
    if (comment.length < 1) {
        return { valid: false, message: 'Comment cannot be empty' };
    }
    if (comment.length > 500) {
        return { valid: false, message: 'Comment must be 500 characters or less' };
    }
    return { valid: true, message: '' };
}

// Export for Node.js testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateEmail,
        validatePassword,
        validateUsername,
        validateTitle,
        validateDescription,
        validateComment
    };
}