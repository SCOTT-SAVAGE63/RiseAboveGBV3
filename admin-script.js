// Admin Dashboard JavaScript
class RiseAboveAdmin {
    constructor() {
        this.currentUser = null;
        this.failedAttempts = 0;
        this.isAuthenticated = this.checkAuthentication();
        this.init();
    }

    init() {
        if (this.isLoginPage()) {
            this.setupLoginPage();
        } else if (this.isDashboardPage()) {
            this.setupDashboard();
        }
        
        this.setupModals();
        this.setupSecurity();
        console.log('Rise Above GBVF Admin initialized');
    }

    // Page Detection
    isLoginPage() {
        return window.location.pathname.includes('login.html') || document.querySelector('.admin-login-page');
    }

    isDashboardPage() {
        return window.location.pathname.includes('dashboard.html') || document.querySelector('.admin-dashboard');
    }

    // Authentication Management
    checkAuthentication() {
        const token = localStorage.getItem('adminToken');
        const expiry = localStorage.getItem('tokenExpiry');
        
        if (!token || !expiry) {
            return false;
        }

        if (Date.now() > parseInt(expiry)) {
            this.logout();
            return false;
        }

        this.currentUser = JSON.parse(localStorage.getItem('adminUser') || '{}');
        return true;
    }

    setupLoginPage() {
        this.setupLoginForm();
        this.setupPasswordToggle();
        this.setupForgotPassword();
    }

    setupLoginForm() {
        const loginForm = document.getElementById('adminLoginForm');
        const loginButton = document.getElementById('loginButton');
        
        if (!loginForm) return;

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin(loginForm);
        });

        // Input validation
        const inputs = loginForm.querySelectorAll('input[required]');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateLoginField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });

        // Enter key submission
        loginForm.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleLogin(loginForm);
            }
        });
    }

    validateLoginField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        if (!value) {
            isValid = false;
            errorMessage = 'This field is required';
        } else if (field.type === 'password' && value.length < 6) {
            isValid = false;
            errorMessage = 'Password must be at least 6 characters';
        }

        this.setFieldValidity(field, isValid, errorMessage);
        return isValid;
    }

    async handleLogin(form) {
        const submitBtn = form.querySelector('.btn-admin-login');
        const btnText = submitBtn.querySelector('.btn-text');
        const spinner = submitBtn.querySelector('.loading-spinner');

        // Check if locked out
        if (this.failedAttempts >= 5) {
            this.showSecurityWarning();
            return;
        }

        // Show loading state
        btnText.textContent = 'Signing In...';
        spinner.style.display = 'block';
        submitBtn.disabled = true;

        // Validate form
        const allValid = this.validateLoginForm(form);
        
        if (!allValid) {
            this.showNotification('Please fix the errors in the form', 'error');
            btnText.textContent = 'Sign In';
            spinner.style.display = 'none';
            submitBtn.disabled = false;
            return;
        }

        const formData = new FormData(form);
        const credentials = {
            username: formData.get('username'),
            password: formData.get('password'),
            rememberMe: formData.get('rememberMe') === 'on'
        };

        try {
            // Simulate API call
            await this.authenticateUser(credentials);
            
            // Successful login
            this.failedAttempts = 0;
            this.showNotification('Login successful! Redirecting...', 'success');
            
            // Store authentication
            this.storeAuthentication(credentials);
            
            // Redirect to dashboard
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);

        } catch (error) {
            this.failedAttempts++;
            this.showNotification('Invalid username or password', 'error');
            
            if (this.failedAttempts >= 3) {
                this.showSecurityWarning();
            }
        } finally {
            btnText.textContent = 'Sign In';
            spinner.style.display = 'none';
            submitBtn.disabled = false;
        }
    }

    validateLoginForm(form) {
        const requiredFields = form.querySelectorAll('[required]');
        let allValid = true;

        requiredFields.forEach(field => {
            if (!this.validateLoginField(field)) {
                allValid = false;
            }
        });

        return allValid;
    }

    async authenticateUser(credentials) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate authentication - In real implementation, this would call an API
                const validUsers = [
                    { username: 'admin', password: 'admin123' },
                    { username: 'manager', password: 'manager123' }
                ];

                const isValid = validUsers.some(user => 
                    user.username === credentials.username && 
                    user.password === credentials.password
                );

                isValid ? resolve() : reject();
            }, 1500);
        });
    }

    storeAuthentication(credentials) {
        const token = this.generateToken();
        const expiry = Date.now() + (24 * 60 * 60 * 1000); // 24 hours
        
        localStorage.setItem('adminToken', token);
        localStorage.setItem('tokenExpiry', expiry.toString());
        localStorage.setItem('adminUser', JSON.stringify({
            username: credentials.username,
            loginTime: new Date().toISOString()
        }));

        if (credentials.rememberMe) {
            localStorage.setItem('rememberMe', 'true');
        }
    }

    generateToken() {
        return 'admin_' + Math.random().toString(36).substr(2) + Date.now().toString(36);
    }

    setupPasswordToggle() {
        const toggleBtn = document.getElementById('togglePassword');
        const passwordInput = document.getElementById('adminPassword');

        if (toggleBtn && passwordInput) {
            toggleBtn.addEventListener('click', () => {
                const type = passwordInput.type === 'password' ? 'text' : 'password';
                passwordInput.type = type;
                toggleBtn.textContent = type === 'password' ? '👁️' : '🔒';
            });
        }
    }

    setupForgotPassword() {
        const forgotLink = document.getElementById('forgotPassword');
        const modal = document.getElementById('forgotPasswordModal');

        if (forgotLink && modal) {
            forgotLink.addEventListener('click', (e) => {
                e.preventDefault();
                modal.style.display = 'block';
            });
        }
    }

    showSecurityWarning() {
        const warning = document.getElementById('securityWarning');
        if (warning) {
            warning.style.display = 'flex';
        }
    }

    // Dashboard Setup
    setupDashboard() {
        if (!this.isAuthenticated) {
            window.location.href = 'login.html';
            return;
        }

        this.setupSidebar();
        this.setupHeaderInteractions();
        this.setupQuickActions();
        this.setupContentSections();
        this.setupSearch();
    }

    setupSidebar() {
        const sidebar = document.getElementById('adminSidebar');
        const toggleBtn = document.getElementById('sidebarToggle');
        const mainContent = document.getElementById('adminMain');
        const submenuItems = document.querySelectorAll('.has-submenu');

        // Sidebar toggle
        if (toggleBtn && sidebar) {
            toggleBtn.addEventListener('click', () => {
                sidebar.classList.toggle('collapsed');
                sidebar.classList.toggle('show');
            });
        }

        // Submenu toggle
        submenuItems.forEach(item => {
            const link = item.querySelector('.nav-link');
            link.addEventListener('click', (e) => {
                if (!sidebar.classList.contains('collapsed')) {
                    e.preventDefault();
                    item.classList.toggle('active');
                }
            });
        });

        // Close sidebar when clicking on mobile
        if (mainContent) {
            mainContent.addEventListener('click', () => {
                if (window.innerWidth <= 1024) {
                    sidebar.classList.remove('show');
                }
            });
        }
    }

    setupHeaderInteractions() {
        // Notifications dropdown
        const notificationBtn = document.getElementById('notificationBtn');
        const notificationDropdown = document.getElementById('notificationDropdown');

        if (notificationBtn && notificationDropdown) {
            notificationBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                notificationDropdown.classList.toggle('show');
            });
        }

        // Profile dropdown
        const profileBtn = document.getElementById('profileBtn');
        const profileMenu = document.getElementById('profileMenu');

        if (profileBtn && profileMenu) {
            profileBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                profileMenu.classList.toggle('show');
            });
        }

        // Close dropdowns when clicking outside
        document.addEventListener('click', () => {
            if (notificationDropdown) notificationDropdown.classList.remove('show');
            if (profileMenu) profileMenu.classList.remove('show');
        });
    }

    setupQuickActions() {
        // Quick action buttons would be set up here
        const quickActions = document.querySelectorAll('.quick-action-card');
        
        quickActions.forEach(action => {
            action.addEventListener('click', () => {
                const actionType = action.querySelector('h4').textContent;
                this.handleQuickAction(actionType);
            });
        });
    }

    handleQuickAction(actionType) {
        switch(actionType) {
            case 'Write New Post':
                this.showBlogEditor();
                break;
            case 'Manage Media':
                this.showMediaManager();
                break;
            case 'Edit Pages':
                this.showPageEditor();
                break;
            case 'System Settings':
                this.showSettings();
                break;
        }
    }

    setupContentSections() {
        // Content section management would be implemented here
        // This would handle switching between different admin sections
    }

    setupSearch() {
        const searchInput = document.getElementById('adminSearch');
        const searchBtn = document.querySelector('.admin-search .search-btn');

        if (searchInput && searchBtn) {
            const performSearch = () => {
                const query = searchInput.value.trim();
                if (query) {
                    this.searchContent(query);
                }
            };

            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    performSearch();
                }
            });

            searchBtn.addEventListener('click', performSearch);
        }
    }

    searchContent(query) {
        // In a real implementation, this would search through content
        this.showNotification(`Searching for: ${query}`, 'info');
        // Actual search functionality would be implemented based on the current section
    }

    // Modal Management
    setupModals() {
        this.setupModalClose();
        this.setupFileUpload();
    }

    setupModalClose() {
        const closeButtons = document.querySelectorAll('.close-modal');
        
        closeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const modal = button.closest('.modal');
                if (modal) {
                    modal.style.display = 'none';
                }
            });
        });

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.style.display = 'none';
            }
        });
    }

    setupFileUpload() {
        const uploadArea = document.getElementById('uploadArea');
        const fileInput = document.getElementById('fileInput');

        if (uploadArea && fileInput) {
            // Drag and drop functionality
            ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
                uploadArea.addEventListener(eventName, preventDefaults, false);
            });

            function preventDefaults(e) {
                e.preventDefault();
                e.stopPropagation();
            }

            ['dragenter', 'dragover'].forEach(eventName => {
                uploadArea.addEventListener(eventName, () => {
                    uploadArea.classList.add('dragover');
                }, false);
            });

            ['dragleave', 'drop'].forEach(eventName => {
                uploadArea.addEventListener(eventName, () => {
                    uploadArea.classList.remove('dragover');
                           }, false);
            }

            // Handle file drop
            uploadArea.addEventListener('drop', (e) => {
                const files = e.dataTransfer.files;
                this.handleFiles(files);
            }, false);

            // Handle file input change
            fileInput.addEventListener('change', (e) => {
                this.handleFiles(e.target.files);
            });

            // Click to upload
            uploadArea.addEventListener('click', () => {
                fileInput.click();
            });
        }
    }

    handleFiles(files) {
        if (files.length > 0) {
            this.uploadFiles(files);
        }
    }

    async uploadFiles(files) {
        const uploadArea = document.getElementById('uploadArea');
        
        // Show upload progress
        uploadArea.innerHTML = `
            <div class="upload-progress">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: 0%"></div>
                </div>
                <p>Uploading ${files.length} file(s)...</p>
            </div>
        `;

        // Simulate upload progress
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += 5;
            const progressFill = uploadArea.querySelector('.progress-fill');
            if (progressFill) {
                progressFill.style.width = `${progress}%`;
            }
            
            if (progress >= 100) {
                clearInterval(progressInterval);
                setTimeout(() => {
                    this.showNotification(`Successfully uploaded ${files.length} file(s)`, 'success');
                    this.showMediaManager();
                }, 500);
            }
        }, 100);
    }

    // Security Features
    setupSecurity() {
        this.setupSessionTimeout();
        this.setupActivityMonitoring();
    }

    setupSessionTimeout() {
        let timeout;
        const resetTimeout = () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                this.showSessionWarning();
            }, 30 * 60 * 1000); // 30 minutes
        };

        // Reset timeout on user activity
        ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
            document.addEventListener(event, resetTimeout, false);
        });

        resetTimeout();
    }

    showSessionWarning() {
        if (confirm('Your session will expire due to inactivity. Would you like to stay logged in?')) {
            this.resetSession();
        } else {
            this.logout();
        }
    }

    resetSession() {
        // Reset session timeout
        this.setupSessionTimeout();
    }

    setupActivityMonitoring() {
        // Log admin activities (in a real implementation, this would send to a server)
        const originalPushState = history.pushState;
        history.pushState = function(state, title, url) {
            originalPushState.apply(this, arguments);
            window.dispatchEvent(new Event('locationchange'));
        };

        window.addEventListener('locationchange', () => {
            this.logActivity(`Navigated to: ${window.location.pathname}`);
        });

        // Log form submissions
        document.addEventListener('submit', (e) => {
            this.logActivity(`Form submitted: ${e.target.id || 'unknown form'}`);
        });
    }

    logActivity(activity) {
        const timestamp = new Date().toISOString();
        const user = this.currentUser?.username || 'unknown';
        console.log(`[ADMIN ACTIVITY] ${timestamp} - ${user} - ${activity}`);
        
        // In real implementation, send to server
        // this.sendToServer({ timestamp, user, activity });
    }

    // Content Management Methods
    showBlogEditor(postId = null) {
        const modal = document.getElementById('blogEditorModal');
        if (modal) {
            if (postId) {
                // Load existing post
                this.loadBlogPost(postId);
            } else {
                // New post
                this.initializeBlogEditor();
            }
            modal.style.display = 'block';
        }
    }

    initializeBlogEditor() {
        const modalBody = document.querySelector('#blogEditorModal .modal-body');
        if (modalBody) {
            modalBody.innerHTML = `
                <div class="blog-editor">
                    <div class="editor-header">
                        <input type="text" class="post-title" placeholder="Enter post title..." value="">
                        <select class="post-category">
                            <option value="">Select Category</option>
                            <option value="awareness">Awareness</option>
                            <option value="success">Success Stories</option>
                            <option value="events">Events</option>
                            <option value="resources">Resources</option>
                            <option value="updates">Updates</option>
                        </select>
                    </div>
                    
                    <div class="editor-toolbar">
                        <button type="button" class="toolbar-btn" data-command="bold">B</button>
                        <button type="button" class="toolbar-btn" data-command="italic">I</button>
                        <button type="button" class="toolbar-btn" data-command="insertUnorderedList">•</button>
                        <button type="button" class="toolbar-btn" data-command="insertOrderedList">1.</button>
                        <button type="button" class="toolbar-btn" data-command="createLink">🔗</button>
                        <button type="button" class="toolbar-btn" data-command="insertImage">🖼️</button>
                    </div>
                    
                    <div class="editor-content" contenteditable="true">
                        <p>Start writing your post here...</p>
                    </div>
                    
                    <div class="editor-sidebar">
                        <div class="sidebar-section">
                            <h4>Publish</h4>
                            <div class="publish-options">
                                <label>
                                    <input type="radio" name="status" value="draft" checked> Draft
                                </label>
                                <label>
                                    <input type="radio" name="status" value="published"> Published
                                </label>
                            </div>
                            <button class="btn-primary" id="publishBtn">Publish</button>
                        </div>
                        
                        <div class="sidebar-section">
                            <h4>Featured Image</h4>
                            <div class="featured-image-upload">
                                <div class="image-placeholder">🖼️</div>
                                <button class="btn-secondary" onclick="admin.showMediaManager()">Set Featured Image</button>
                            </div>
                        </div>
                        
                        <div class="sidebar-section">
                            <h4>Tags</h4>
                            <div class="tags-input">
                                <input type="text" placeholder="Add tags..." id="tagInput">
                                <div class="tags-container" id="tagsContainer"></div>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            this.setupBlogEditorEvents();
        }
    }

    setupBlogEditorEvents() {
        // Toolbar buttons
        const toolbarBtns = document.querySelectorAll('.toolbar-btn');
        toolbarBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const command = btn.getAttribute('data-command');
                document.execCommand(command, false, null);
            });
        });

        // Publish button
        const publishBtn = document.getElementById('publishBtn');
        if (publishBtn) {
            publishBtn.addEventListener('click', () => {
                this.saveBlogPost();
            });
        }

        // Tags input
        const tagInput = document.getElementById('tagInput');
        if (tagInput) {
            tagInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.addTag(tagInput.value);
                    tagInput.value = '';
                }
            });
        }
    }

    addTag(tagText) {
        const tagsContainer = document.getElementById('tagsContainer');
        if (tagsContainer && tagText.trim()) {
            const tag = document.createElement('span');
            tag.className = 'tag';
            tag.innerHTML = `
                ${tagText.trim()}
                <button type="button" class="remove-tag">&times;</button>
            `;
            
            tag.querySelector('.remove-tag').addEventListener('click', () => {
                tag.remove();
            });
            
            tagsContainer.appendChild(tag);
        }
    }

    async saveBlogPost() {
        const title = document.querySelector('.post-title').value;
        const content = document.querySelector('.editor-content').innerHTML;
        const category = document.querySelector('.post-category').value;
        const status = document.querySelector('input[name="status"]:checked').value;
        
        if (!title.trim()) {
            this.showNotification('Please enter a post title', 'error');
            return;
        }

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            this.showNotification('Blog post saved successfully!', 'success');
            this.closeModal('blogEditorModal');
            
            // Refresh blog posts list
            this.loadBlogPosts();
            
        } catch (error) {
            this.showNotification('Error saving blog post', 'error');
        }
    }

    showMediaManager() {
        const modal = document.getElementById('mediaUploadModal');
        if (modal) {
            modal.style.display = 'block';
        }
    }

    showPageEditor() {
        this.showNotification('Page editor would open here', 'info');
        // Implementation for page editor
    }

    showSettings() {
        this.showNotification('Settings panel would open here', 'info');
        // Implementation for settings
    }

    // Utility Methods
    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.admin-notification');
        existingNotifications.forEach(notification => {
            notification.remove();
        });

        const notification = document.createElement('div');
        notification.className = `admin-notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${this.getNotificationIcon(type)}</span>
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        document.body.appendChild(notification);

        // Add styles if not already present
        if (!document.querySelector('#notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'notification-styles';
            styles.textContent = `
                .admin-notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: white;
                    padding: 1rem 1.5rem;
                    border-radius: 8px;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                    z-index: 10000;
                    animation: slideInRight 0.3s ease;
                    max-width: 400px;
                }
                .notification-content {
                    display: flex;
                    align-items: center;
                    gap: 0.8rem;
                }
                .notification-success { border-left: 4px solid var(--green); }
                .notification-error { border-left: 4px solid var(--red); }
                .notification-info { border-left: 4px solid var(--blue); }
                .notification-warning { border-left: 4px solid var(--orange); }
                .notification-close {
                    background: none;
                    border: none;
                    font-size: 1.2rem;
                    cursor: pointer;
                    margin-left: auto;
                }
                @keyframes slideInRight {
                    from { transform: translateX(100%); }
                    to { transform: translateX(0); }
                }
            `;
            document.head.appendChild(styles);
        }

        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 5000);

        // Close button
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.remove();
        });
    }

    getNotificationIcon(type) {
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };
        return icons[type] || 'ℹ️';
    }

    setFieldValidity(field, isValid, message) {
        const errorElement = field.parentNode.querySelector('.error-message');
        
        if (isValid) {
            field.classList.remove('error');
            field.classList.add('valid');
            if (errorElement) errorElement.textContent = '';
        } else {
            field.classList.remove('valid');
            field.classList.add('error');
            if (errorElement) errorElement.textContent = message;
        }
    }

    clearFieldError(field) {
        field.classList.remove('error');
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) errorElement.textContent = '';
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
        }
    }

    // Logout functionality
    logout() {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('tokenExpiry');
        localStorage.removeItem('adminUser');
        window.location.href = 'login.html';
    }

    // Data management methods (would be implemented based on backend API)
    async loadBlogPosts() {
        // Implementation for loading blog posts
    }

    async loadBlogPost(postId) {
        // Implementation for loading a specific blog post
    }

    async updatePageContent(pageId, content) {
        // Implementation for updating page content
    }

    async uploadMedia(file) {
        // Implementation for media upload
    }
}

// Additional CSS for admin notifications and editor
const adminStyles = `
    .blog-editor {
        display: grid;
        grid-template-columns: 1fr 300px;
        gap: 2rem;
        height: 600px;
    }
    
    .editor-header {
        grid-column: 1 / -1;
        display: flex;
        gap: 1rem;
        margin-bottom: 1rem;
    }
    
    .post-title {
        flex: 1;
        padding: 1rem;
        border: 1px solid #ddd;
        border-radius: 5px;
        font-size: 1.5rem;
        font-weight: bold;
    }
    
    .post-category {
        padding: 1rem;
        border: 1px solid #ddd;
        border-radius: 5px;
        min-width: 200px;
    }
    
    .editor-toolbar {
        grid-column: 1 / -1;
        display: flex;
        gap: 0.5rem;
        padding: 0.5rem;
        background: #f5f5f5;
        border-radius: 5px;
        margin-bottom: 1rem;
    }
    
    .toolbar-btn {
        padding: 0.5rem 1rem;
        border: 1px solid #ddd;
        background: white;
        border-radius: 3px;
        cursor: pointer;
    }
    
    .editor-content {
        border: 1px solid #ddd;
        border-radius: 5px;
        padding: 1rem;
        min-height: 400px;
        background: white;
    }
    
    .editor-sidebar {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }
    
    .sidebar-section {
        background: #f9f9f9;
        padding: 1rem;
        border-radius: 5px;
    }
    
    .sidebar-section h4 {
        margin: 0 0 1rem 0;
        color: #333;
    }
    
    .publish-options {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        margin-bottom: 1rem;
    }
    
    .featured-image-upload {
        text-align: center;
    }
    
    .image-placeholder {
        width: 100%;
        height: 150px;
        background: #f0f0f0;
        border: 2px dashed #ddd;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        margin-bottom: 1rem;
    }
    
    .tags-input input {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid #ddd;
        border-radius: 3px;
        margin-bottom: 0.5rem;
    }
    
    .tags-container {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    }
    
    .tag {
        background: var(--blue);
        color: white;
        padding: 0.3rem 0.6rem;
        border-radius: 15px;
        font-size: 0.8rem;
        display: flex;
        align-items: center;
        gap: 0.3rem;
    }
    
    .remove-tag {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        font-size: 1rem;
        line-height: 1;
    }
    
    .upload-progress {
        text-align: center;
    }
    
    .progress-bar {
        width: 100%;
        height: 10px;
        background: #f0f0f0;
        border-radius: 5px;
        overflow: hidden;
        margin-bottom: 1rem;
    }
    
    .progress-fill {
        height: 100%;
        background: var(--green);
        transition: width 0.3s ease;
    }
`;

// Add admin styles to document
if (!document.querySelector('#admin-dynamic-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'admin-dynamic-styles';
    styleSheet.textContent = adminStyles;
    document.head.appendChild(styleSheet);
}

// Initialize admin when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.admin = new RiseAboveAdmin();
});

// Global functions for HTML onclick handlers
window.showBlogManager = () => {
    if (window.admin) window.admin.showBlogEditor();
};

window.showMediaManager = () => {
    if (window.admin) window.admin.showMediaManager();
};

window.showPageEditor = () => {
    if (window.admin) window.admin.showPageEditor();
};

window.showSettings = () => {
    if (window.admin) window.admin.showSettings();
};