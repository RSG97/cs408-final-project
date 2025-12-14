// submit-feedback.js - Handles feedback submission

// Configuration - API Gateway endpoint
const API_BASE_URL = 'https://rnhmcguiqa.execute-api.us-east-2.amazonaws.com/prod';

// ===== Input Sanitization Functions =====

/**
 * Sanitize text input - removes HTML tags, trims whitespace
 * @param {string} text - Raw text input
 * @returns {string} - Sanitized text
 */
function sanitizeText(text) {
    // Remove leading/trailing whitespace
    let clean = text.trim();
    
    // Remove any HTML tags
    clean = clean.replace(/<[^>]*>/g, '');
    
    // Escape special characters for safety
    const div = document.createElement('div');
    div.textContent = clean;
    
    return div.innerHTML;
}

/**
 * Validate title length
 * @param {string} title - Title to validate
 * @returns {object} - {valid: boolean, message: string}
 */
function validateTitle(title) {
    if (title.length < 5) {
        return { valid: false, message: 'Title must be at least 5 characters long' };
    }
    if (title.length > 100) {
        return { valid: false, message: 'Title must be 100 characters or less' };
    }
    return { valid: true, message: '' };
}

/**
 * Validate description length
 * @param {string} description - Description to validate
 * @returns {object} - {valid: boolean, message: string}
 */
function validateDescription(description) {
    if (description.length < 10) {
        return { valid: false, message: 'Description must be at least 10 characters long' };
    }
    if (description.length > 1000) {
        return { valid: false, message: 'Description must be 1000 characters or less' };
    }
    return { valid: true, message: '' };
}

// ===== Display Message Functions =====

/**
 * Show success or error message to user
 * @param {string} message - Message to display
 * @param {boolean} isError - True for error, false for success
 */
function showMessage(message, isError = false) {
    const messageElement = document.getElementById('form-message');
    messageElement.textContent = message;
    messageElement.style.display = 'block';
    messageElement.className = isError ? 'form-message error' : 'form-message success';
}

/**
 * Hide message element
 */
function hideMessage() {
    const messageElement = document.getElementById('form-message');
    messageElement.style.display = 'none';
}

// ===== Session Helper =====

/**
 * Get current user from session
 * @returns {object|null} - User data or null
 */
function getCurrentUser() {
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username');
    
    if (userId && username) {
        return { userId, username };
    }
    return null;
}

// ===== API Call Function (Placeholder for AWS Lambda) =====

/**
 * Submit feedback to AWS Lambda
 * @param {object} feedbackData - Feedback object
 * @returns {Promise<object>} - API response
 */
async function submitFeedbackAPI(feedbackData) {
    const response = await fetch(`${API_BASE_URL}/feedback`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData)
    });
    
    return await response.json();
}

// ===== Form Handler =====

/**
 * Handle feedback form submission
 * @param {Event} event - Form submit event
 */
async function handleSubmit(event) {
    event.preventDefault();
    hideMessage();
    
    // Check if user is logged in
    const user = getCurrentUser();
    if (!user) {
        showMessage('You must be logged in to submit feedback. Please login first.', true);
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
        return;
    }
    
    // Get form values
    const titleInput = document.getElementById('feedback-title').value;
    const descriptionInput = document.getElementById('feedback-description').value;
    const categoryInput = document.getElementById('feedback-category').value;
    
    // Sanitize text inputs
    const title = sanitizeText(titleInput);
    const description = sanitizeText(descriptionInput);
    
    // Validate title
    const titleValidation = validateTitle(title);
    if (!titleValidation.valid) {
        showMessage(titleValidation.message, true);
        return;
    }
    
    // Validate description
    const descriptionValidation = validateDescription(description);
    if (!descriptionValidation.valid) {
        showMessage(descriptionValidation.message, true);
        return;
    }
    
    // Validate category selection
    if (!categoryInput) {
        showMessage('Please select a category', true);
        return;
    }
    
    // Prepare feedback data for API
    const feedbackData = {
        title: title,
        description: description,
        category: categoryInput,
        userId: user.userId,
        username: user.username,
        status: 'under-review', // Default status
        voteCount: 0,
        createdAt: new Date().toISOString()
    };
    
    try {
        // Call API
        const response = await submitFeedbackAPI(feedbackData);
        
        if (response.success) {
            // Show success message
            showMessage('Feedback submitted successfully! Redirecting to home page...', false);
            
            // Clear form
            document.getElementById('feedback-form').reset();
            
            // Redirect to home page after 2 seconds
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        } else {
            showMessage(response.error || 'Failed to submit feedback', true);
        }
    } catch (error) {
        showMessage('An error occurred. Please try again.', true);
        console.error('Feedback submission error:', error);
    }
}

// ===== Cancel Button Handler =====

/**
 * Handle cancel button click
 */
function handleCancel() {
    window.location.href = 'index.html';
}

// ===== Initialize Event Listeners =====

document.addEventListener('DOMContentLoaded', function() {
    const feedbackForm = document.getElementById('feedback-form');
    const cancelBtn = document.getElementById('cancel-btn');
    
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', handleSubmit);
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', handleCancel);
    }
});