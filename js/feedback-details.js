// feedback-detail.js - Handles feedback detail page

// Configuration - API Gateway endpoint (will be added later)
const API_BASE_URL = 'YOUR_API_GATEWAY_URL'; // TODO: Replace with actual API Gateway URL

// Store current feedback ID
let currentFeedbackId = null;

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

// ===== URL Parameter Helper =====

/**
 * Get feedback ID from URL parameter
 * @returns {string|null} - Feedback ID or null
 */
function getFeedbackIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// ===== Input Sanitization =====

/**
 * Sanitize comment text
 * @param {string} text - Raw comment text
 * @returns {string} - Sanitized text
 */
function sanitizeComment(text) {
    let clean = text.trim();
    clean = clean.replace(/<[^>]*>/g, '');
    
    const div = document.createElement('div');
    div.textContent = clean;
    return div.innerHTML;
}

/**
 * Validate comment
 * @param {string} comment - Comment to validate
 * @returns {object} - {valid: boolean, message: string}
 */
function validateComment(comment) {
    if (comment.length < 1) {
        return { valid: false, message: 'Comment cannot be empty' };
    }
    if (comment.length > 500) {
        return { valid: false, message: 'Comment must be 500 characters or less' };
    }
    return { valid: true, message: '' };
}

// ===== API Call Functions (Placeholders for AWS Lambda) =====

/**
 * Get single feedback item by ID
 * @param {string} feedbackId - Feedback ID
 * @returns {Promise<object>} - API response
 */
async function getFeedbackAPI(feedbackId) {
    // TODO: Replace with actual API Gateway call
    
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Mock feedback data
            const mockFeedback = {
                feedbackId: feedbackId,
                title: 'Add dark mode support',
                description: 'It would be great to have a dark mode option for better viewing at night. This would help reduce eye strain and save battery on mobile devices.',
                category: 'feature',
                status: 'under-review',
                userId: 'user-123',
                username: 'johndoe',
                voteCount: 15,
                createdAt: '2024-12-01T10:30:00Z'
            };
            
            resolve({
                success: true,
                feedback: mockFeedback
            });
            
            // Example of actual API call (uncomment when ready):
            /*
            fetch(`${API_BASE_URL}/feedback/${feedbackId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject(error));
            */
        }, 300);
    });
}

/**
 * Toggle vote on feedback item
 * @param {string} feedbackId - Feedback ID
 * @param {string} userId - User ID
 * @returns {Promise<object>} - API response
 */
async function toggleVoteAPI(feedbackId, userId) {
    // TODO: Replace with actual API Gateway call
    
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Mock response - in real implementation, this would check if vote exists
            const response = {
                success: true,
                action: 'voted', // or 'unvoted'
                newVoteCount: 16
            };
            
            resolve(response);
            
            // Example of actual API call (uncomment when ready):
            /*
            fetch(`${API_BASE_URL}/vote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ feedbackId, userId })
            })
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject(error));
            */
        }, 300);
    });
}

/**
 * Get comments for a feedback item
 * @param {string} feedbackId - Feedback ID
 * @returns {Promise<object>} - API response with comments
 */
async function getCommentsAPI(feedbackId) {
    // TODO: Replace with actual API Gateway call
    
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Mock comments data
            const mockComments = [
                {
                    commentId: 'comment-001',
                    feedbackId: feedbackId,
                    userId: 'user-456',
                    username: 'janedoe',
                    commentText: 'This is a great idea! I would definitely use dark mode.',
                    createdAt: '2024-12-02T11:15:00Z'
                },
                {
                    commentId: 'comment-002',
                    feedbackId: feedbackId,
                    userId: 'user-789',
                    username: 'bobsmith',
                    commentText: 'Please make sure it works on mobile too!',
                    createdAt: '2024-12-03T09:30:00Z'
                }
            ];
            
            resolve({
                success: true,
                comments: mockComments,
                count: mockComments.length
            });
            
            // Example of actual API call (uncomment when ready):
            /*
            fetch(`${API_BASE_URL}/comments/${feedbackId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject(error));
            */
        }, 300);
    });
}

/**
 * Submit a new comment
 * @param {object} commentData - Comment data
 * @returns {Promise<object>} - API response
 */
async function submitCommentAPI(commentData) {
    // TODO: Replace with actual API Gateway call
    
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const response = {
                success: true,
                message: 'Comment posted successfully',
                commentId: 'comment-' + Date.now()
            };
            
            resolve(response);
            
            // Example of actual API call (uncomment when ready):
            /*
            fetch(`${API_BASE_URL}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(commentData)
            })
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject(error));
            */
        }, 300);
    });
}

/**
 * Delete a feedback item
 * @param {string} feedbackId - Feedback ID
 * @param {string} userId - User ID (for authorization)
 * @returns {Promise<object>} - API response
 */
async function deleteFeedbackAPI(feedbackId, userId) {
    // TODO: Replace with actual API Gateway call
    
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const response = {
                success: true,
                message: 'Feedback deleted successfully'
            };
            
            resolve(response);
            
            // Example of actual API call (uncomment when ready):
            /*
            fetch(`${API_BASE_URL}/feedback/${feedbackId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId })
            })
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject(error));
            */
        }, 300);
    });
}

// ===== Display Functions =====

/**
 * Format date to readable string
 * @param {string} isoDate - ISO date string
 * @returns {string} - Formatted date
 */
function formatDate(isoDate) {
    const date = new Date(isoDate);
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return date.toLocaleDateString('en-US', options);
}

/**
 * Get display text for category
 * @param {string} category - Category code
 * @returns {string} - Display text
 */
function getCategoryDisplay(category) {
    const categories = {
        'bug': 'Bug',
        'feature': 'Feature Request',
        'enhancement': 'Enhancement',
        'ui-ux': 'UI/UX'
    };
    return categories[category] || category;
}

/**
 * Get display text for status
 * @param {string} status - Status code
 * @returns {string} - Display text
 */
function getStatusDisplay(status) {
    const statuses = {
        'planned': 'Planned',
        'in-progress': 'In Progress',
        'completed': 'Completed',
        'under-review': 'Under Review'
    };
    return statuses[status] || status;
}

/**
 * Display feedback details on the page
 * @param {object} feedback - Feedback object
 */
function displayFeedback(feedback) {
    document.getElementById('feedback-title').textContent = feedback.title;
    document.getElementById('feedback-description').textContent = feedback.description;
    document.getElementById('feedback-category').textContent = getCategoryDisplay(feedback.category);
    document.getElementById('feedback-status').textContent = getStatusDisplay(feedback.status);
    document.getElementById('feedback-author').textContent = `Posted by: ${feedback.username}`;
    document.getElementById('feedback-date').textContent = formatDate(feedback.createdAt);
    document.getElementById('vote-count').textContent = feedback.voteCount;
    
    // Show/hide delete button based on ownership
    const user = getCurrentUser();
    const deleteBtn = document.getElementById('delete-feedback-btn');
    
    if (user && user.userId === feedback.userId) {
        deleteBtn.style.display = 'block';
    } else {
        deleteBtn.style.display = 'none';
    }
}

/**
 * Display comments
 * @param {array} comments - Array of comment objects
 */
function displayComments(comments) {
    const container = document.getElementById('comments-container');
    
    if (!comments || comments.length === 0) {
        container.innerHTML = '<p class="no-comments">No comments yet. Be the first to comment!</p>';
        return;
    }
    
    const commentsHTML = comments.map(comment => `
        <div class="comment">
            <div class="comment-author">${comment.username}</div>
            <div class="comment-date">${formatDate(comment.createdAt)}</div>
            <div class="comment-text">${comment.commentText}</div>
        </div>
    `).join('');
    
    container.innerHTML = commentsHTML;
}

// ===== Event Handlers =====

/**
 * Handle upvote button click
 */
async function handleUpvote() {
    const user = getCurrentUser();
    
    if (!user) {
        alert('Please login to vote on feedback');
        window.location.href = 'login.html';
        return;
    }
    
    try {
        const response = await toggleVoteAPI(currentFeedbackId, user.userId);
        
        if (response.success) {
            // Update vote count display
            document.getElementById('vote-count').textContent = response.newVoteCount;
            
            // Optional: Show visual feedback
            const upvoteBtn = document.getElementById('upvote-btn');
            upvoteBtn.textContent = response.action === 'voted' ? '▼' : '▲';
        }
    } catch (error) {
        alert('Failed to process vote. Please try again.');
        console.error('Vote error:', error);
    }
}

/**
 * Handle comment form submission
 */
async function handleCommentSubmit(event) {
    event.preventDefault();
    
    const user = getCurrentUser();
    
    if (!user) {
        alert('Please login to comment');
        window.location.href = 'login.html';
        return;
    }
    
    const commentInput = document.getElementById('comment-text');
    const commentText = commentInput.value;
    
    // Sanitize comment
    const sanitized = sanitizeComment(commentText);
    
    // Validate comment
    const validation = validateComment(sanitized);
    if (!validation.valid) {
        alert(validation.message);
        return;
    }
    
    // Prepare comment data
    const commentData = {
        feedbackId: currentFeedbackId,
        userId: user.userId,
        username: user.username,
        commentText: sanitized,
        createdAt: new Date().toISOString()
    };
    
    try {
        const response = await submitCommentAPI(commentData);
        
        if (response.success) {
            // Clear form
            commentInput.value = '';
            
            // Reload comments
            await loadComments();
        } else {
            alert('Failed to post comment');
        }
    } catch (error) {
        alert('An error occurred. Please try again.');
        console.error('Comment submission error:', error);
    }
}

/**
 * Handle delete button click
 */
async function handleDelete() {
    const user = getCurrentUser();
    
    if (!user) {
        alert('You must be logged in to delete feedback');
        return;
    }
    
    // Confirm deletion
    if (!confirm('Are you sure you want to delete this feedback? This action cannot be undone.')) {
        return;
    }
    
    try {
        const response = await deleteFeedbackAPI(currentFeedbackId, user.userId);
        
        if (response.success) {
            alert('Feedback deleted successfully');
            // Redirect to home page
            window.location.href = 'index.html';
        } else {
            alert(response.error || 'Failed to delete feedback. You can only delete your own feedback.');
        }
    } catch (error) {
        alert('An error occurred. Please try again.');
        console.error('Delete error:', error);
    }
}

/**
 * Handle back button click
 */
function handleBack() {
    window.location.href = 'index.html';
}

// ===== Load Functions =====

/**
 * Load feedback details
 */
async function loadFeedback() {
    try {
        const response = await getFeedbackAPI(currentFeedbackId);
        
        if (response.success) {
            displayFeedback(response.feedback);
        } else {
            alert('Feedback not found');
            window.location.href = 'index.html';
        }
    } catch (error) {
        alert('Failed to load feedback');
        console.error('Load feedback error:', error);
    }
}

/**
 * Load comments for current feedback
 */
async function loadComments() {
    try {
        const response = await getCommentsAPI(currentFeedbackId);
        
        if (response.success) {
            displayComments(response.comments);
        }
    } catch (error) {
        console.error('Load comments error:', error);
    }
}

// ===== Initialize =====

document.addEventListener('DOMContentLoaded', async function() {
    // Get feedback ID from URL
    currentFeedbackId = getFeedbackIdFromURL();
    
    if (!currentFeedbackId) {
        alert('No feedback ID provided');
        window.location.href = 'index.html';
        return;
    }
    
    // Load feedback and comments
    await loadFeedback();
    await loadComments();
    
    // Add event listeners
    const upvoteBtn = document.getElementById('upvote-btn');
    const commentForm = document.getElementById('comment-form');
    const deleteBtn = document.getElementById('delete-feedback-btn');
    const backBtn = document.getElementById('back-btn');
    
    if (upvoteBtn) {
        upvoteBtn.addEventListener('click', handleUpvote);
    }
    
    if (commentForm) {
        commentForm.addEventListener('submit', handleCommentSubmit);
    }
    
    if (deleteBtn) {
        deleteBtn.addEventListener('click', handleDelete);
    }
    
    if (backBtn) {
        backBtn.addEventListener('click', handleBack);
    }
});