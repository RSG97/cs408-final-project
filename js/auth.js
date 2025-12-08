// auth.js - Handles user authentication (login and registration)

const API_BASE_URL = 'YOUR_API_GATEWAY_URL'; // TODO: Replace with actual API Gateway URL

// ===== Input Sanitization Functions =====

/**
 * Sanitize username - removes special characters, trims whitespace
 * @param {string} username - Raw username input
 * @returns {string} - Sanitized username
 */
function sanitizeUsername(username) {
    // Remove leading/trailing whitespace
    let clean = username.trim();
    
    // Remove any HTML tags
    clean = clean.replace(/<[^>]*>/g, '');
    
    // Only allow alphanumeric, underscore, and hyphen
    clean = clean.replace(/[^a-zA-Z0-9_-]/g, '');
    
    return clean;
}

/**
 * Sanitize email - trims, converts to lowercase
 * @param {string} email - Raw email input
 * @returns {string} - Sanitized email
 */
function sanitizeEmail(email) {
    // Remove whitespace and convert to lowercase
    let clean = email.trim().toLowerCase();
    
    // Remove any HTML tags
    clean = clean.replace(/<[^>]*>/g, '');
    
    return clean;
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid email format
 */
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {object} - {valid: boolean, message: string}
 */
function validatePassword(password) {
    if (password.length < 8) {
        return { valid: false, message: 'Password must be at least 8 characters long' };
    }
    return { valid: true, message: '' };
}

/**
 * Validate username
 * @param {string} username - Username to validate
 * @returns {object} - {valid: boolean, message: string}
 */
function validateUsername(username) {
    if (username.length < 3 || username.length > 20) {
        return { valid: false, message: 'Username must be between 3 and 20 characters' };
    }
    return { valid: true, message: '' };
}

// ===== Display Message Functions =====

/**
 * Show success or error message to user
 * @param {string} elementId - ID of message element
 * @param {string} message - Message to display
 * @param {boolean} isError - True for error, false for success
 */
function showMessage(elementId, message, isError = false) {
    const messageElement = document.getElementById(elementId);
    messageElement.textContent = message;
    messageElement.style.display = 'block';
    messageElement.className = isError ? 'form-message error' : 'form-message success';
}

/**
 * Hide message element
 * @param {string} elementId - ID of message element
 */
function hideMessage(elementId) {
    const messageElement = document.getElementById(elementId);
    messageElement.style.display = 'none';
}

// ===== Session Management =====

/**
 * Save user session to localStorage
 * @param {object} userData - User data (userId, username, email)
 */
function saveUserSession(userData) {
    localStorage.setItem('userId', userData.userId);
    localStorage.setItem('username', userData.username);
    localStorage.setItem('userEmail', userData.email);
}

/**
 * Get current user session
 * @returns {object|null} - User data or null if not logged in
 */
function getUserSession() {
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username');
    const userEmail = localStorage.getItem('userEmail');
    
    if (userId && username) {
        return { userId, username, email: userEmail };
    }
    return null;
}

/**
 * Clear user session (logout)
 */
function clearUserSession() {
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('userEmail');
}

/**
 * Check if user is logged in
 * @returns {boolean}
 */
function isUserLoggedIn() {
    return getUserSession() !== null;
}

// ===== API Call Functions (Placeholders for AWS Lambda) =====

/**
 * Register new user - calls AWS Lambda function
 * @param {object} userData - {username, email, password}
 * @returns {Promise<object>} - API response
 */
async function registerUserAPI(userData) {
    // TODO: Replace with actual API Gateway call
    // For now, simulate API call with setTimeout
    
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulated response - replace with actual fetch call
            const response = {
                success: true,
                message: 'User registered successfully',
                userId: 'user-' + Date.now(),
                username: userData.username,
                email: userData.email
            };
            resolve(response);
            
            // Example of actual API call (uncomment when ready):
            /*
            fetch(`${API_BASE_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            })
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject(error));
            */
        }, 500);
    });
}

/**
 * Login user - calls AWS Lambda function
 * @param {object} credentials - {email, password}
 * @returns {Promise<object>} - API response
 */
async function loginUserAPI(credentials) {
    // TODO: Replace with actual API Gateway call
    // For now, simulate API call
    
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulated response - replace with actual fetch call
            const response = {
                success: true,
                message: 'Login successful',
                userId: 'user-' + Date.now(),
                username: 'testuser',
                email: credentials.email
            };
            resolve(response);
            
            // Example of actual API call (uncomment when ready):
            /*
            fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials)
            })
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject(error));
            */
        }, 500);
    });
}

// ===== Registration Form Handler =====

/**
 * Handle registration form submission
 * @param {Event} event - Form submit event
 */
async function handleRegister(event) {
    event.preventDefault();
    hideMessage('register-message');
    
    // Get form values
    const usernameInput = document.getElementById('register-username').value;
    const emailInput = document.getElementById('register-email').value;
    const passwordInput = document.getElementById('register-password').value;
    const confirmPasswordInput = document.getElementById('register-confirm-password').value;
    
    // Sanitize inputs
    const username = sanitizeUsername(usernameInput);
    const email = sanitizeEmail(emailInput);
    
    // Validate username
    const usernameValidation = validateUsername(username);
    if (!usernameValidation.valid) {
        showMessage('register-message', usernameValidation.message, true);
        return;
    }
    
    // Validate email
    if (!validateEmail(email)) {
        showMessage('register-message', 'Please enter a valid email address', true);
        return;
    }
    
    // Validate password
    const passwordValidation = validatePassword(passwordInput);
    if (!passwordValidation.valid) {
        showMessage('register-message', passwordValidation.message, true);
        return;
    }
    
    // Check passwords match
    if (passwordInput !== confirmPasswordInput) {
        showMessage('register-message', 'Passwords do not match', true);
        return;
    }
    
    // Prepare data for API
    const userData = {
        username: username,
        email: email,
        password: passwordInput // Lambda will hash this
    };
    
    try {
        // Call API
        const response = await registerUserAPI(userData);
        
        if (response.success) {
            // Save session
            saveUserSession({
                userId: response.userId,
                username: response.username,
                email: response.email
            });
            
            // Show success message
            showMessage('register-message', 'Registration successful! Redirecting...', false);
            
            // Redirect to home page after 1.5 seconds
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        } else {
            showMessage('register-message', response.error || 'Registration failed', true);
        }
    } catch (error) {
        showMessage('register-message', 'An error occurred. Please try again.', true);
        console.error('Registration error:', error);
    }
}

// ===== Login Form Handler =====

/**
 * Handle login form submission
 * @param {Event} event - Form submit event
 */
async function handleLogin(event) {
    event.preventDefault();
    hideMessage('login-message');
    
    // Get form values
    const emailInput = document.getElementById('login-email').value;
    const passwordInput = document.getElementById('login-password').value;
    
    // Sanitize email
    const email = sanitizeEmail(emailInput);
    
    // Validate email
    if (!validateEmail(email)) {
        showMessage('login-message', 'Please enter a valid email address', true);
        return;
    }
    
    // Validate password (basic check)
    if (!passwordInput || passwordInput.length < 8) {
        showMessage('login-message', 'Please enter your password', true);
        return;
    }
    
    // Prepare credentials
    const credentials = {
        email: email,
        password: passwordInput
    };
    
    try {
        // Call API
        const response = await loginUserAPI(credentials);
        
        if (response.success) {
            // Save session
            saveUserSession({
                userId: response.userId,
                username: response.username,
                email: response.email
            });
            
            // Show success message
            showMessage('login-message', 'Login successful! Redirecting...', false);
            
            // Redirect to home page after 1.5 seconds
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        } else {
            showMessage('login-message', response.error || 'Invalid credentials', true);
        }
    } catch (error) {
        showMessage('login-message', 'An error occurred. Please try again.', true);
        console.error('Login error:', error);
    }
}

// ===== Initialize Event Listeners =====

document.addEventListener('DOMContentLoaded', function() {
    // Check which page we're on and attach appropriate event listener
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});