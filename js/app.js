// app.js - Main feed page functionality

// Configuration - API Gateway endpoint (will be added later)
const API_BASE_URL = 'YOUR_API_GATEWAY_URL'; // TODO: Replace with actual API Gateway URL

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

// ===== API Call Functions (Placeholders for AWS Lambda) =====

/**
 * Load all feedback from AWS
 * @param {string} filter - Optional filter value
 * @returns {Promise<object>} - API response with feedback array
 */
async function loadFeedbackAPI(filter = 'all') {
    // TODO: Replace with actual API Gateway call
    // This will use query parameters for conditional retrieval
    
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulated feedback data - replace with actual fetch call
            const mockFeedback = [
                {
                    feedbackId: 'fb-001',
                    title: 'Add dark mode support',
                    description: 'It would be great to have a dark mode option for better viewing at night',
                    category: 'feature',
                    status: 'under-review',
                    userId: 'user-123',
                    username: 'johndoe',
                    voteCount: 15,
                    createdAt: '2024-12-01T10:30:00Z'
                },
                {
                    feedbackId: 'fb-002',
                    title: 'Fix login button alignment',
                    description: 'The login button appears misaligned on mobile devices',
                    category: 'bug',
                    status: 'in-progress',
                    userId: 'user-456',
                    username: 'janedoe',
                    voteCount: 8,
                    createdAt: '2024-12-05T14:20:00Z'
                },
                {
                    feedbackId: 'fb-003',
                    title: 'Improve search performance',
                    description: 'Search results take too long to load with large datasets',
                    category: 'enhancement',
                    status: 'planned',
                    userId: 'user-789',
                    username: 'bobsmith',
                    voteCount: 23,
                    createdAt: '2024-12-03T09:15:00Z'
                }
            ];
            
            // Filter based on selection
            let filteredFeedback = mockFeedback;
            
            if (filter !== 'all') {
                const user = getCurrentUser();
                
                // Filter by category
                if (['bug', 'feature', 'enhancement', 'ui-ux'].includes(filter)) {
                    filteredFeedback = mockFeedback.filter(fb => fb.category === filter);
                }
                // Filter by status
                else if (['planned', 'in-progress', 'completed', 'under-review'].includes(filter)) {
                    filteredFeedback = mockFeedback.filter(fb => fb.status === filter);
                }
                // Filter by user's submissions
                else if (filter === 'my-submissions' && user) {
                    filteredFeedback = mockFeedback.filter(fb => fb.userId === user.userId);
                }
            }
            
            const response = {
                success: true,
                feedback: filteredFeedback,
                count: filteredFeedback.length
            };
            
            resolve(response);
            
            // Example of actual API call (uncomment when ready):
            /*
            let url = `${API_BASE_URL}/feedback`;
            
            // Add query parameters for filtering
            if (filter !== 'all') {
                const params = new URLSearchParams();
                
                if (['bug', 'feature', 'enhancement', 'ui-ux'].includes(filter)) {
                    params.append('category', filter);
                } else if (['planned', 'in-progress', 'completed', 'under-review'].includes(filter)) {
                    params.append('status', filter);
                } else if (filter === 'my-submissions') {
                    const user = getCurrentUser();
                    if (user) {
                        params.append('userId', user.userId);
                    }
                }
                
                url += '?' + params.toString();
            }
            
            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject(error));
            */
        }, 500);
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
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
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
 * Create HTML for a single feedback card
 * @param {object} feedback - Feedback item
 * @returns {string} - HTML string
 */
function createFeedbackCard(feedback) {
    return `
        <div class="feedback-card" data-feedback-id="${feedback.feedbackId}">
            <div class="vote-section">
                <div class="vote-count">${feedback.voteCount}</div>
                <div class="vote-label">votes</div>
            </div>
            <div class="feedback-info">
                <h3 class="feedback-title">${feedback.title}</h3>
                <p class="feedback-description">${feedback.description}</p>
                <div class="feedback-meta">
                    <span class="category-tag">${getCategoryDisplay(feedback.category)}</span>
                    <span class="status-tag">${getStatusDisplay(feedback.status)}</span>
                    <span class="author">by ${feedback.username}</span>
                    <span class="date">${formatDate(feedback.createdAt)}</span>
                </div>
            </div>
        </div>
    `;
}

/**
 * Display feedback items in the container
 * @param {array} feedbackList - Array of feedback items
 */
function displayFeedback(feedbackList) {
    const container = document.getElementById('feedback-container');
    
    if (!feedbackList || feedbackList.length === 0) {
        container.innerHTML = '<p class="empty-message">No feedback found. Be the first to submit!</p>';
        return;
    }
    
    // Sort by vote count (highest first)
    const sortedFeedback = feedbackList.sort((a, b) => b.voteCount - a.voteCount);
    
    // Generate HTML for all feedback cards
    const cardsHTML = sortedFeedback.map(feedback => createFeedbackCard(feedback)).join('');
    
    container.innerHTML = cardsHTML;
    
    // Add click event listeners to all cards
    const cards = container.querySelectorAll('.feedback-card');
    cards.forEach(card => {
        card.addEventListener('click', function() {
            const feedbackId = this.getAttribute('data-feedback-id');
            // Navigate to feedback detail page
            window.location.href = `feedback-detail.html?id=${feedbackId}`;
        });
        
        // Add hover effect styling
        card.style.cursor = 'pointer';
    });
}

/**
 * Show loading message
 */
function showLoading() {
    const container = document.getElementById('feedback-container');
    container.innerHTML = '<p class="loading-message">Loading feedback...</p>';
}

/**
 * Show error message
 * @param {string} message - Error message
 */
function showError(message) {
    const container = document.getElementById('feedback-container');
    container.innerHTML = `<p class="error-message">${message}</p>`;
}

// ===== Event Handlers =====

/**
 * Handle load feedback button click
 */
async function handleLoadFeedback() {
    const filterDropdown = document.getElementById('filter-dropdown');
    const selectedFilter = filterDropdown.value;
    
    showLoading();
    
    try {
        const response = await loadFeedbackAPI(selectedFilter);
        
        if (response.success) {
            displayFeedback(response.feedback);
        } else {
            showError('Failed to load feedback');
        }
    } catch (error) {
        showError('An error occurred while loading feedback');
        console.error('Load feedback error:', error);
    }
}

/**
 * Handle filter dropdown change - auto-load when filter changes
 */
async function handleFilterChange() {
    await handleLoadFeedback();
}

// ===== Update Navigation (Show/Hide Login/Register based on auth status) =====

/**
 * Update navigation links based on login status
 */
function updateNavigation() {
    const user = getCurrentUser();
    const navLinks = document.querySelector('.nav-links');
    
    if (user && navLinks) {
        // User is logged in - show username and logout option
        const loginLink = navLinks.querySelector('a[href="login.html"]');
        const registerLink = navLinks.querySelector('a[href="register.html"]');
        
        if (loginLink) {
            loginLink.textContent = `Hello, ${user.username}`;
            loginLink.href = '#';
            loginLink.style.cursor = 'default';
        }
        
        if (registerLink) {
            registerLink.textContent = 'Logout';
            registerLink.href = '#';
            registerLink.addEventListener('click', function(e) {
                e.preventDefault();
                localStorage.clear();
                window.location.reload();
            });
        }
    }
}

// ===== Initialize =====

document.addEventListener('DOMContentLoaded', function() {
    // Update navigation based on login status
    updateNavigation();
    
    // Get button and dropdown
    const loadBtn = document.getElementById('load-feedback-btn');
    const filterDropdown = document.getElementById('filter-dropdown');
    
    // Add event listeners
    if (loadBtn) {
        loadBtn.addEventListener('click', handleLoadFeedback);
    }
    
    if (filterDropdown) {
        filterDropdown.addEventListener('change', handleFilterChange);
    }
    
    // Auto-load all feedback when page loads
    handleLoadFeedback();
});