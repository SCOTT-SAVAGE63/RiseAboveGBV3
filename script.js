
// Rise Above GBVF - Main JavaScript File
//class RiseAboveGBVF {
    constructor(); {
        this.init();
    }

    init(); {
        this.setupMobileMenu();
        this.setupScrollAnimations();
        this.setupCounterAnimations();
        this.setupFormHandlers();
        this.setupEmergencyFeatures();
        this.setupInteractiveElements();
        this.setupSmoothScrolling();
        console.log('Rise Above GBVF initialized');
    }

    // Mobile Menu Toggle
    setupMobileMenu(); {
        const menuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');
        
        if (menuBtn && navLinks) {
            menuBtn.addEventListener('click', () => {
                navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
                menuBtn.classList.toggle('active');
            });
        }

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-container') && window.innerWidth <= 768) {
                navLinks.style.display = 'none';
                menuBtn.classList.remove('active');
            }
        });
    }

  
    // Form Handling
    setupFormHandlers() ;{
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit(form);
            });
        });

        // Add real-time validation
        const inputs = document.querySelectorAll('input[required], textarea[required]');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    validateField(field) ;{
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        if (!value) {
            isValid = false;
            errorMessage = 'This field is required';
        } else {
            switch (field.type) {
                case 'email':
                    if (!this.isValidEmail(value)) {
                        isValid = false;
                        errorMessage = 'Please enter a valid email address';
                    }
                    break;
                case 'tel':
                    if (!this.isValidPhone(value)) {
                        isValid = false;
                        errorMessage = 'Please enter a valid phone number';
                    }
                    break;
            }
        }

        this.setFieldValidity(field, isValid, errorMessage);
        return isValid;
    }

    isValidEmail(email) ;{
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    isValidPhone(phone) ;{
        return /^[\+]?[0-9\s\-\(\)]{10,}$/.test(phone);
    }

    setFieldValidity(field, isValid, message) ;{
        if (isValid) {
            field.classList.remove('error');
            field.classList.add('valid');
            this.removeFieldError(field);
        } else {
            field.classList.remove('valid');
            field.classList.add('error');
            this.showFieldError(field, message);
        }
    }

    showFieldError(field, message) ;{
        this.removeFieldError(field);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
    }

    removeFieldError(field) ;{
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }

    clearFieldError(field) ;{
        field.classList.remove('error');
        this.removeFieldError(field);
    }

    async .handleFormSubmit(form) ;{
        const formData = new FormData(form);
        const allFieldsValid = this.validateForm(form);

        if (!allFieldsValid) {
            this.showNotification('Please fix the errors in the form', 'error');
            return;
        }

        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        try {
            // Simulate API call - replace with actual endpoint
            await this.simulateApiCall(formData);
            this.showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
            form.reset();
        } catch (error) {
            this.showNotification('Sorry, there was an error sending your message. Please try again.', 'error');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }

    validateForm(form) ;{
        const requiredFields = form.querySelectorAll('input[required], textarea[required]');
        let allValid = true;

        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                allValid = false;
            }
        });

        return allValid;
    }

    simulateApiCall(formData) ;{
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate random success/failure for demo
                Math.random() > 0.2 ? resolve() : reject();
            }, 2000);
        });
    }

    // Emergency Features
    setupEmergencyFeatures() ;{
        // Quick Exit
        const quickExit = document.getElementById('quickExit');
        if (quickExit) {
            quickExit.addEventListener('click', () => {
                // Redirect to neutral site
                window.location.href = 'https://www.weather.com';
            });
        }

        // Get Help Now button
        const helpBtn = document.querySelector('.btn-help');
        if (helpBtn) {
            helpBtn.addEventListener('click', () => {
                this.showEmergencyModal();
            });
        }
    }

    showEmergencyModal() ;{
        const modal = document.createElement('div');
        modal.className = 'emergency-modal glass-card';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>🚨 Need Immediate Help?</h3>
                <div class="emergency-numbers">
                    <div class="emergency-number">
                        <strong>Rise Above GBVF Crisis Line</strong>
                        <div class="number">074 067 7801</div>
                    </div>
                    <div class="emergency-number">
                        <strong>Phoenix Police</strong>
                        <div class="number">(031) 507 2050</div>
                    </div>
                    <div class="emergency-number">
                        <strong>Mahatma Gandhi Hospital</strong>
                        <div class="number">(031) 502 1719</div>
                    </div>
                </div>
                <div class="modal-actions">
                    <button class="btn-primary" onclick="window.location.href='tel:0740677801'">Call Now</button>
                    <button class="btn-secondary" onclick="this.closest('.emergency-modal').remove()">Close</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    // Interactive Elements
    setupInteractiveElements() ;{
        // Add hover effects to cards
        const cards = document.querySelectorAll('.glass-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px)';
                card.style.boxShadow = '0 15px 35px rgba(31, 38, 135, 0.5)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = 'var(--glass-shadow)';
            });
        });

        // Service card interactions
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach(card => {
            card.addEventListener('click', () => {
                const title = card.querySelector('h3').textContent;
                this.showServiceModal(title);
            });
        });
    }

    showServiceModal(serviceName) ;{
        const modal = document.createElement('div');
        modal.className = 'service-modal glass-card';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>${serviceName}</h3>
                <p>For more information about ${serviceName.toLowerCase()}, please contact us directly. Our team is ready to help you.</p>
                <div class="modal-actions">
                    <button class="btn-primary" onclick="window.location.href='contact.html'">Contact Us</button>
                    <button class="btn-secondary" onclick="this.closest('.service-modal').remove()">Close</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    // Smooth Scrolling
    setupSmoothScrolling() ;{
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Notification System
    showNotification(message, type = 'info') ;{
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        // Add styles if not already present
        if (!document.querySelector('#notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'notification-styles';
            styles.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    padding: 1rem 2rem;
                    border-radius: 10px;
                    color: white;
                    z-index: 10000;
                    animation: slideIn 0.3s ease;
                }
                .notification-success { background: var(--green); }
                .notification-error { background: var(--red); }
                .notification-info { background: var(--blue); }
                @keyframes slideIn {
                    from { transform: translateX(100%); }
                    to { transform: translateX(0); }
                }
            `;
            document.head.appendChild(styles);
        }

        document.body.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }
//}

// Additional utility functions
const Utils = {
    // Debounce function for performance
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Format phone number
    formatPhoneNumber(phone) {
        return phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
    },

    // Local storage utilities
    setStorage(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.warn('Local storage not available');
        }
    },

    getStorage(key) {
        try {
            return JSON.parse(localStorage.getItem(key));
        } catch (e) {
            return null;
        }
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.RiseAboveGBVF = new RiseAboveGBVF();

  // ========================================
    // ANIMATED STATISTICS COUNTER
    // ========================================
    let statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false; 
    function animateStats() {
       
        if (hasAnimated) return;
        
        const statsSection = document.querySelector('.stats-section');
        if (!statsSection) return;
        
        const rect = statsSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        
        if (isVisible) {
            hasAnimated = true;
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        stat.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        stat.textContent = target;
                    }
                };
                
                updateCounter();
            });
        }
    }
    
    window.addEventListener('scroll', animateStats);
    animateStats();


});

// Add error boundary
window.addEventListener('error', (e) => {
    console.error('Application error:', e.error);
});

// Export for module usage if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { RiseAboveGBVF, Utils };
}

// Add these methods to the RiseAboveGBVF class

// Timeline animation
setupTimelineAnimations() ;{
    const timelineItems = document.querySelectorAll('.timeline-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = index % 2 === 0 ? 'translateX(-50px)' : 'translateX(50px)';
        item.style.transition = 'all 0.6s ease';
        observer.observe(item);
    });
}

// Enhanced counter animations for impact section
setupImpactCounters() ;{
    const impactStats = document.querySelectorAll('.impact-stat .stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                this.animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    impactStats.forEach(stat => observer.observe(stat));
}

// Team member hover effects
setupTeamInteractions() ;{
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', () => {
            member.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        member.addEventListener('mouseleave', () => {
            member.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Update the init method to include new features
init() ;{
    this.setupMobileMenu();
    this.setupScrollAnimations();
    this.setupCounterAnimations();
    this.setupFormHandlers();
    this.setupEmergencyFeatures();
    this.setupInteractiveElements();
    this.setupSmoothScrolling();
    this.setupTimelineAnimations();
    this.setupImpactCounters();
    this.setupTeamInteractions();
    console.log('Rise Above GBVF About Page initialized');
}

// Contact Page Specific Functionality
setupContactPage() ;{
    this.setupContactForm();
    this.setupFAQToggle();
    this.setupMapInteractions();
    this.setupModalFunctionality();
    console.log('Contact page features initialized');
}

// Enhanced Contact Form Handling
setupContactForm() ;{
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => this.validateContactField(input));
        input.addEventListener('input', () => this.clearFieldError(input));
    });

    // Form submission
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleContactSubmission(contactForm);
    });
}

validateContactField(field) ;{
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    } else if (field.type === 'email' && value && !this.isValidEmail(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
    } else if (field.type === 'tel' && value && !this.isValidPhone(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid phone number';
    }

    this.setFieldValidity(field, isValid, errorMessage);
    return isValid;
}

async. handleContactSubmission(form) ;{
    const submitBtn = form.querySelector('.form-submit');
    const btnText = submitBtn.querySelector('.btn-text');
    const spinner = submitBtn.querySelector('.loading-spinner');

    // Show loading state
    btnText.textContent = 'Sending...';
    spinner.style.display = 'block';
    submitBtn.disabled = true;

    // Validate all fields
    const allValid = this.validateContactForm(form);
    
    if (!allValid) {
        this.showNotification('Please fix the errors in the form', 'error');
        btnText.textContent = 'Send Message';
        spinner.style.display = 'none';
        submitBtn.disabled = false;
        return;
    }

    try {
        // Simulate API call
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                Math.random() > 0.1 ? resolve() : reject();
            }, 2000);
        });

        this.showNotification('Message sent successfully! We\'ll contact you within 24 hours.', 'success');
        form.reset();
        
        // Clear all validation states
        form.querySelectorAll('.error, .valid').forEach(el => {
            el.classList.remove('error', 'valid');
        });
        form.querySelectorAll('.error-message').forEach(el => {
            el.textContent = '';
        });

    } catch (error) {
        this.showNotification('Sorry, there was an error sending your message. Please try again or call us directly.', 'error');
    } finally {
        btnText.textContent = 'Send Message';
        spinner.style.display = 'none';
        submitBtn.disabled = false;
    }
}

validateContactForm(form) ;{
    const requiredFields = form.querySelectorAll('[required]');
    let allValid = true;

    requiredFields.forEach(field => {
        if (!this.validateContactField(field)) {
            allValid = false;
        }
    });

    return allValid;
}

// FAQ Toggle Functionality
setupFAQToggle() ;{
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

// Map Interactions
setupMapInteractions() ;{
    const map = document.getElementById('interactiveMap');
    if (map) {
        map.addEventListener('click', () => {
            this.showNotification('Opening directions in Google Maps...', 'info');
            // In a real implementation, this would open actual Google Maps
            setTimeout(() => {
                window.open('https://maps.google.com?q=Shastripark,Phoenix,KwaZulu+Natal,South+Africa', '_blank');
            }, 1000);
        });
    }
}

// Get Directions Function
getDirections() ;{
    this.showNotification('Opening directions to our office...', 'info');
    setTimeout(() => {
        window.open('https://maps.google.com?q=Shastripark,Phoenix,KwaZulu+Natal,South+Africa', '_blank');
    }, 1000);
}

// Modal Functionality
setupModalFunctionality() ;{
    const modal = document.getElementById('bookingModal');
    const closeBtn = document.querySelector('.close-modal');
    const bookingForm = document.getElementById('bookingForm');

    // Open modal function (called from HTML)
    window.openBookingModal = () => {
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    };

    // Close modal
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    // Close when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Booking form handling
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleBookingSubmission(bookingForm);
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
}

handleBookingSubmission(form) ;{
    this.showNotification('Appointment request received! We\'ll contact you to confirm.', 'success');
    form.reset();
}

// Update main init method to include contact page features
init() ;{
    this.setupMobileMenu();
    this.setupScrollAnimations();
    this.setupCounterAnimations();
    this.setupFormHandlers();
    this.setupEmergencyFeatures();
    this.setupInteractiveElements();
    this.setupSmoothScrolling();
    
    // Check if we're on contact page
    if (window.location.pathname.includes('contact.html') || document.querySelector('.contact-hero')) {
        this.setupContactPage();
    }
    
    // Check if we're on about page
    if (window.location.pathname.includes('about.html') || document.querySelector('.about-hero')) {
        this.setupTimelineAnimations();
        this.setupImpactCounters();
        this.setupTeamInteractions();
    }
    
    console.log('Rise Above GBVF website initialized');
}

// Resources Page Specific Functionality
setupResourcesPage() ;{
    this.setupSafetyTabs();
    this.setupResourceModals();
    this.setupDownloadButtons();
    this.setupPlatformLinks();
    console.log('Resources page features initialized');
}

// Safety Planning Tabs
setupSafetyTabs() ;{
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            // Add active class to clicked button
            button.classList.add('active');

            // Show corresponding tab pane
            const tabId = button.getAttribute('data-tab');
            const tabPane = document.getElementById(tabId);
            if (tabPane) {
                tabPane.classList.add('active');
            }
        });
    });
}

// Resource Information Modals
setupResourceModals() ;{
    const modal = document.getElementById('resourceModal');
    const closeBtn = document.querySelector('.close-modal');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    // Close when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Global function to show resource info
window.showResourceInfo = (resourceType) => {
    const modal = document.getElementById('resourceModal');
    const modalContent = document.getElementById('modalContent');
    
    let content = '';
    
    switch(resourceType) {
        case 'thuthuzela':
            content = `
                <h3>Thuthuzela Care Centre</h3>
                <p>Thuthuzela Care Centres are one-stop facilities that provide comprehensive support to survivors of sexual assault.</p>
                <div class="resource-details">
                    <h4>Services Include:</h4>
                    <ul>
                        <li>Medical examination and treatment</li>
                        <li>Forensic evidence collection</li>
                        <li>Counseling and psychological support</li>
                        <li>Legal assistance and court preparation</li>
                        <li>Social services support</li>
                    </ul>
                    <p><strong>All services are completely free of charge.</strong></p>
                </div>
            `;
            break;
        // Add more resource types as needed
    }
    
    modalContent.innerHTML = content;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Download Functions
window.downloadRightsGuide = () => {
    this.showNotification('Downloading Know Your Rights Guide...', 'info');
    // In real implementation, this would trigger actual file download
    setTimeout(() => {
        this.showNotification('Rights guide downloaded successfully!', 'success');
    }, 1500);
}

window.downloadSafetyPlan = () => {
    this.showNotification('Downloading Safety Plan Template...', 'info');
    // In real implementation, this would trigger actual file download
    setTimeout(() => {
        this.showNotification('Safety plan template downloaded!', 'success');
    }, 1500);
}

window.showProtectionOrderGuide = () => {
    const modal = document.getElementById('resourceModal');
    const modalContent = document.getElementById('modalContent');
    
    modalContent.innerHTML = `
        <h3>Protection Order Guide</h3>
        <p>A step-by-step guide to obtaining a protection order in South Africa.</p>
        <div class="guide-steps">
            <div class="guide-step">
                <h4>Step 1: Visit Your Nearest Court</h4>
                <p>Go to the magistrate's court closest to where you live, work, or where the abuse occurred.</p>
            </div>
            <div class="guide-step">
                <h4>Step 2: Complete Forms</h4>
                <p>Ask for Form 2 (Application for Protection Order). Court clerks can help you complete it.</p>
            </div>
            <div class="guide-step">
                <h4>Step 3: Interim Order</h4>
                <p>The magistrate may grant an interim order immediately for your protection.</p>
            </div>
            <div class="guide-step">
                <h4>Step 4: Service of Documents</h4>
                <p>The court will arrange for the respondent to be served with the papers.</p>
            </div>
            <div class="guide-step">
                <h4>Step 5: Final Order</h4>
                <p>Attend the return date hearing where the magistrate will make a final decision.</p>
            </div>
        </div>
        <button class="btn-primary" onclick="downloadProtectionOrderGuide()">Download Full Guide</button>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

window.downloadProtectionOrderGuide = () => {
    this.showNotification('Downloading Protection Order Guide...', 'info');
    setTimeout(() => {
        this.showNotification('Guide downloaded successfully!', 'success');
    }, 1500);
}

// Platform Link Functions
window.openWhatsApp = () => {
    this.showNotification('Opening WhatsApp...', 'info');
    // In real implementation, this would open WhatsApp with pre-filled message
    setTimeout(() => {
        window.open('https://wa.me/27740677801?text=Hello%20Rise%20Above%20GBVF,%20I%20need%20help', '_blank');
    }, 500);
}

window.saveWhatsAppNumber = () => {
    this.showNotification('WhatsApp number saved to contacts', 'success');
    // In real implementation, this would trigger contact saving
}

window.listenToPodcast = () => {
    this.showNotification('Opening podcast...', 'info');
    // In real implementation, this would open podcast platform
}

window.visitFacebook = () => {
    this.showNotification('Opening Facebook...', 'info');
    // In real implementation, this would open Facebook page
}

window.visitInstagram = () => {
    this.showNotification('Opening Instagram...', 'info');
    // In real implementation, this would open Instagram profile
}

// Directions Function
window.getDirections = (address) => {
    this.showNotification('Opening directions in Google Maps...', 'info');
    const encodedAddress = encodeURIComponent(address + ', Phoenix, KwaZulu Natal');
    setTimeout(() => {
        window.open(`https://maps.google.com?q=${encodedAddress}`, '_blank');
    }, 500);
}

// Nearby Services Function
window.showNearbyServices = () => {
    const modal = document.getElementById('resourceModal');
    const modalContent = document.getElementById('modalContent');
    
    modalContent.innerHTML = `
        <h3>Services Near Phoenix</h3>
        <div class="services-list">
            <div class="service-item">
                <h4>🏠 Phoenix Safe House</h4>
                <p>Confidential location • 24/7 intake • Family accommodation</p>
                <p>📞 Contact for location details</p>
            </div>
            <div class="service-item">
                <h4>💬 Support Groups</h4>
                <p>Weekly meetings • Confidential • Various locations</p>
                <p>📞 074 067 7801 for schedule</p>
            </div>
            <div class="service-item">
                <h4>⚖️ Legal Clinic</h4>
                <p>Free legal advice • Protection order assistance</p>
                <p>📍 Phoenix Community Centre • Wednesdays 2-5 PM</p>
            </div>
        </div>
        <p><em>All locations are confidential to ensure safety. Contact us for specific addresses.</em></p>
        <button class="btn-primary" onclick="window.location.href='contact.html'">Contact for Locations</button>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Update main init method to include resources page features
init() ;{
    this.setupMobileMenu();
    this.setupScrollAnimations();
    this.setupCounterAnimations();
    this.setupFormHandlers();
    this.setupEmergencyFeatures();
    this.setupInteractiveElements();
    this.setupSmoothScrolling();
    
    // Check if we're on contact page
    if (window.location.pathname.includes('contact.html') || document.querySelector('.contact-hero')) {
        this.setupContactPage();
    }
    
    // Check if we're on about page
    if (window.location.pathname.includes('about.html') || document.querySelector('.about-hero')) {
        this.setupTimelineAnimations();
        this.setupImpactCounters();
        this.setupTeamInteractions();
    }
    
    // Check if we're on resources page
    if (window.location.pathname.includes('resources.html') || document.querySelector('.resources-hero')) {
        this.setupResourcesPage();
    }
    
    console.log('Rise Above GBVF website initialized');
}

// Donate Page Specific Functionality
setupDonatePage() ;{
    this.setupDonationForm();
    this.setupAmountSelection();
    this.setupFrequencySelection();
    this.setupPaymentMethodToggle();
    this.setupRecognitionTabs();
    console.log('Donate page features initialized');
}

// Donation Amount Selection
setupAmountSelection() ;{
    const amountButtons = document.querySelectorAll('.amount-btn');
    const customAmountInput = document.getElementById('customAmount');
    const summaryAmount = document.getElementById('summaryAmount');
    const summaryTotal = document.getElementById('summaryTotal');
    const successAmount = document.getElementById('successAmount');

    let selectedAmount = 500; // Default amount

    amountButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            amountButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get selected amount
            selectedAmount = parseInt(button.getAttribute('data-amount'));
            this.updateDonationSummary(selectedAmount);
            
            // Clear custom amount
            customAmountInput.value = '';
        });
    });

    // Custom amount input
    customAmountInput.addEventListener('input', () => {
        if (customAmountInput.value) {
            // Remove active class from preset buttons
            amountButtons.forEach(btn => btn.classList.remove('active'));
            
            selectedAmount = parseInt(customAmountInput.value) || 0;
            this.updateDonationSummary(selectedAmount);
        }
    });

    // Initialize summary
    this.updateDonationSummary(selectedAmount);
}

// Frequency Selection
setupFrequencySelection() ;{
    const frequencyButtons = document.querySelectorAll('.frequency-btn');
    const summaryFrequency = document.getElementById('summaryFrequency');

    frequencyButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            frequencyButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            // Update summary
            const frequency = button.getAttribute('data-frequency');
            summaryFrequency.textContent = this.getFrequencyText(frequency);
        });
    });
}

getFrequencyText(frequency) ;{
    const frequencyMap = {
        'once': 'One-time',
        'monthly': 'Monthly',
        'quarterly': 'Quarterly'
    };
    return frequencyMap[frequency] || 'One-time';
}

// Payment Method Toggle
setupPaymentMethodToggle() ;{
    const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]');
    const cardFields = document.getElementById('cardFields');
    const bankFields = document.getElementById('bankFields');

    paymentMethods.forEach(method => {
        method.addEventListener('change', () => {
            if (method.value === 'card') {
                cardFields.style.display = 'block';
                bankFields.style.display = 'none';
            } else if (method.value === 'bank') {
                cardFields.style.display = 'none';
                bankFields.style.display = 'block';
            }
        });
    });
}

// Update Donation Summary
updateDonationSummary(amount) ;{
    const summaryAmount = document.getElementById('summaryAmount');
    const summaryTotal = document.getElementById('summaryTotal');
    const successAmount = document.getElementById('successAmount');

    const formattedAmount = this.formatCurrency(amount);
    
    summaryAmount.textContent = formattedAmount;
    summaryTotal.textContent = formattedAmount;
    successAmount.textContent = formattedAmount;

    // Update impact message
    this.updateImpactMessage(amount);
}

formatCurrency(amount) ;{
    return 'R' + amount.toLocaleString('en-ZA');
}

updateImpactMessage(amount) ;{
    const impactMessage = document.querySelector('.impact-message');
    const selectedAmount = document.querySelector('.selected-amount');
    const impactList = document.querySelector('.impact-list');

    selectedAmount.textContent = this.formatCurrency(amount);

    // Update impact items based on amount
    let impactItems = [];
    
    if (amount >= 1000) {
        impactItems = [
            '✅ Community workshop for 50+ people',
            '✅ Emergency shelter for 4 survivors',
            '✅ Legal assistance for 2 cases',
            '✅ Counseling sessions for a month'
        ];
    } else if (amount >= 500) {
        impactItems = [
            '✅ Emergency shelter for 2 survivors',
            '✅ Safety planning resources',
            '✅ Immediate crisis support'
        ];
    } else if (amount >= 250) {
        impactItems = [
            '✅ Professional counseling session',
            '✅ Safety resources package',
            '✅ Crisis line support'
        ];
    } else {
        impactItems = [
            '✅ Emergency safety kit',
            '✅ Immediate support resources',
            '✅ Crisis intervention'
        ];
    }

    impactList.innerHTML = impactItems.map(item => `<li>${item}</li>`).join('');
}

// Donation Form Handling
setupDonationForm() ;{
    const donationForm = document.getElementById('donationForm');
    
    if (donationForm) {
        donationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleDonationSubmission(donationForm);
        });

        // Real-time validation
        const requiredFields = donationForm.querySelectorAll('input[required]');
        requiredFields.forEach(field => {
            field.addEventListener('blur', () => this.validateDonationField(field));
            field.addEventListener('input', () => this.clearFieldError(field));
        });
    }
}

validateDonationField(field) ;{
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    if (!value) {
        isValid = false;
        errorMessage = 'This field is required';
    } else if (field.type === 'email' && !this.isValidEmail(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
    } else if (field.type === 'tel' && value && !this.isValidPhone(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid phone number';
    }

    this.setFieldValidity(field, isValid, errorMessage);
    return isValid;
}

async .handleDonationSubmission(form) ;{
    const submitBtn = form.querySelector('.btn-donate');
    const btnText = submitBtn.querySelector('.btn-text');
    const spinner = submitBtn.querySelector('.loading-spinner');

    // Show loading state
    btnText.textContent = 'Processing...';
    spinner.style.display = 'block';
    submitBtn.disabled = true;

    // Validate all fields
    const allValid = this.validateDonationForm(form);
    
    if (!allValid) {
        this.showNotification('Please fix the errors in the form', 'error');
        btnText.textContent = 'Complete Donation';
        spinner.style.display = 'none';
        submitBtn.disabled = false;
        return;
    }

    try {
        // Simulate payment processing
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                Math.random() > 0.1 ? resolve() : reject();
            }, 3000);
        });

        // Show success modal
        this.showSuccessModal();

    } catch (error) {
        this.showNotification('Sorry, there was an error processing your donation. Please try again.', 'error');
    } finally {
        btnText.textContent = 'Complete Donation';
        spinner.style.display = 'none';
        submitBtn.disabled = false;
    }
}

validateDonationForm(form) ;{
    const requiredFields = form.querySelectorAll('[required]');
    let allValid = true;

    requiredFields.forEach(field => {
        if (!this.validateDonationField(field)) {
            allValid = false;
        }
    });

    return allValid;
}

// Success Modal
showSuccessModal() ;{
    const modal = document.getElementById('successModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

window.closeSuccessModal = () => {
    const modal = document.getElementById('successModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

window.printReceipt = () => {
    this.showNotification('Printing receipt...', 'info');
    // In real implementation, this would trigger print dialog
    setTimeout(() => {
        window.print();
    }, 500);
}

// Recognition Tabs
setupRecognitionTabs() ;{
    const recognitionTabs = document.querySelectorAll('.recognition-tab');
    const recognitionPanes = document.querySelectorAll('.recognition-pane');

    recognitionTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and panes
            recognitionTabs.forEach(t => t.classList.remove('active'));
            recognitionPanes.forEach(p => p.classList.remove('active'));

            // Add active class to clicked tab
            tab.classList.add('active');

            // Show corresponding pane
            const tabId = tab.getAttribute('data-tab');
            const tabPane = document.getElementById(tabId);
            if (tabPane) {
                tabPane.classList.add('active');
            }
        });
    });
}

// Alternative Donation Methods
window.copyBankDetails = () => {
    const bankDetails = `
Bank: Standard Bank
Account Name: Rise Above GBVF NPO
Account Number: 0123456789
Branch Code: 123456
Reference: Your Name + Donation
    `.trim();

    // In real implementation, this would use the Clipboard API
    this.showNotification('Bank details copied to clipboard!', 'success');
}

window.openSnapScan = () => {
    this.showNotification('Opening SnapScan...', 'info');
    // In real implementation, this would open SnapScan app or website
    setTimeout(() => {
        window.open('https://pos.snapscan.io/qr/RiseAboveGBVF', '_blank');
    }, 500);
}

window.setupDebitOrder = () => {
    const modal = document.getElementById('resourceModal');
    const modalContent = document.getElementById('modalContent');
    
    modalContent.innerHTML = `
        <h3>Set Up Recurring Donation</h3>
        <p>To set up a recurring debit order, please download and complete our debit order form, then email it to donations@riseabovegbvf.org</p>
        
        <div class="debit-info">
            <h4>Benefits of Monthly Giving:</h4>
            <ul>
                <li>✅ Consistent support for survivors</li>
                <li>✅ Reduced administrative costs</li>
                <li>✅ Easier budgeting for you</li>
                <li>✅ Ongoing tax benefits</li>
            </ul>
        </div>
        
        <div class="modal-actions">
            <button class="btn-primary" onclick="downloadDebitForm()">Download Form</button>
            <button class="btn-secondary" onclick="closeModal()">Close</button>
        </div>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

window.downloadDebitForm = () => {
    this.showNotification('Downloading debit order form...', 'info');
    // In real implementation, this would trigger file download
    setTimeout(() => {
        this.showNotification('Form downloaded successfully!', 'success');
    }, 1500);
}

window.contactInKind = () => {
    this.showNotification('Redirecting to contact page...', 'info');
    setTimeout(() => {
        window.location.href = 'contact.html?subject=in-kind-donation';
    }, 1000);
}

window.switchToMonthly = () => {
    const monthlyBtn = document.querySelector('.frequency-btn[data-frequency="monthly"]');
    if (monthlyBtn) {
        monthlyBtn.click();
    }
    this.scrollToDonationForm();
}

window.scrollToDonationForm = () => {
    const donationSection = document.querySelector('.donation-section');
    if (donationSection) {
        donationSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Close modal function for debit order
window.closeModal = () => {
    const modal = document.getElementById('resourceModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Update main init method to include donate page features
init() ;{
    this.setupMobileMenu();
    this.setupScrollAnimations();
    this.setupCounterAnimations();
    this.setupFormHandlers();
    this.setupEmergencyFeatures();
    this.setupInteractiveElements();
    this.setupSmoothScrolling();
    
    // Check if we're on contact page
    if (window.location.pathname.includes('contact.html') || document.querySelector('.contact-hero')) {
        this.setupContactPage();
    }
    
    // Check if we're on about page
    if (window.location.pathname.includes('about.html') || document.querySelector('.about-hero')) {
        this.setupTimelineAnimations();
        this.setupImpactCounters();
        this.setupTeamInteractions();
    }
    
    // Check if we're on resources page
    if (window.location.pathname.includes('resources.html') || document.querySelector('.resources-hero')) {
        this.setupResourcesPage();
    }
    
    // Check if we're on donate page
    if (window.location.pathname.includes('donate.html') || document.querySelector('.donate-hero')) {
        this.setupDonatePage();
    }
    
    console.log('Rise Above GBVF website initialized');
}

// Volunteer Page Specific Functionality
setupVolunteerPage() ;{
    this.setupOpportunityFilters();
    this.setupVolunteerForm();
    this.setupRoleModals();
    this.setupVolunteerFAQ();
    console.log('Volunteer page features initialized');
}

// Opportunity Filtering
setupOpportunityFilters() ;{
    const filterButtons = document.querySelectorAll('.filter-btn');
    const opportunityCards = document.querySelectorAll('.opportunity-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            // Filter opportunities
            opportunityCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Role Details Modal
setupRoleModals() ;{
    const modal = document.getElementById('roleModal');
    const closeBtn = document.querySelector('.close-modal');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    // Close when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Global function to show role details
window.showRoleDetails = (roleId) => {
    const modal = document.getElementById('roleModal');
    const modalContent = document.getElementById('roleModalContent');
    
    let content = '';
    
    switch(roleId) {
        case 'counseling-support':
            content = `
                <h3>Counseling Support Volunteer - Detailed Information</h3>
                <div class="role-details">
                    <div class="detail-section">
                        <h4>📊 Time Commitment & Schedule</h4>
                        <p>• Minimum 4 hours per week (flexible scheduling)<br>
                        • Shifts available: Weekdays 9AM-5PM, Evenings 6PM-9PM, Weekends 10AM-2PM<br>
                        • Minimum 3-month commitment required</p>
                    </div>
                    
                    <div class="detail-section">
                        <h4>🎯 Training Program</h4>
                        <p>Our comprehensive 20-hour training includes:<br>
                        • Crisis intervention techniques<br>
                        • Active listening skills<br>
                        • Trauma-informed care principles<br>
                        • Safety and confidentiality protocols<br>
                        • Cultural sensitivity training<br>
                        • Ongoing supervision and support</p>
                    </div>
                    
                    <div class="detail-section">
                        <h4>💼 Ideal Candidate</h4>
                        <p>This role is perfect for:<br>
                        • Psychology or social work students<br>
                        • Retired healthcare professionals<br>
                        • Individuals with personal growth from similar experiences<br>
                        • Anyone with strong empathy and listening skills</p>
                    </div>
                    
                    <div class="detail-section">
                        <h4>🌟 Benefits & Support</h4>
                        <p>• Professional reference after 3 months<br>
                        • Free ongoing training and development<br>
                        • Supervision and debriefing sessions<br>
                        • Travel reimbursement<br>
                        • Volunteer recognition events</p>
                    </div>
                </div>
                <div class="modal-actions">
                    <button class="btn-primary" onclick="applyForRole('counseling-support')">Apply Now</button>
                    <button class="btn-secondary" onclick="closeRoleModal()">Close</button>
                </div>
            `;
            break;
        // Add more role details as needed
    }
    
    modalContent.innerHTML = content;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

window.closeRoleModal = () => {
    const modal = document.getElementById('roleModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Volunteer Form Handling
setupVolunteerForm(); {
    const volunteerForm = document.getElementById('volunteerForm');
    
    if (volunteerForm) {
        volunteerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleVolunteerSubmission(volunteerForm);
        });

        // Real-time validation
        const requiredFields = volunteerForm.querySelectorAll('input[required], select[required]');
        requiredFields.forEach(field => {
            field.addEventListener('blur', () => this.validateVolunteerField(field));
            field.addEventListener('input', () => this.clearFieldError(field));
        });

        // Checkbox validation for roles
        const roleCheckboxes = volunteerForm.querySelectorAll('input[name="roles"]');
        const rolesGroup = volunteerForm.querySelector('.checkbox-group');
        
        rolesGroup.addEventListener('change', () => {
            const checkedRoles = Array.from(roleCheckboxes).some(cb => cb.checked);
            if (!checkedRoles) {
                this.showFieldError(rolesGroup, 'Please select at least one role of interest');
            } else {
                this.clearFieldError(rolesGroup);
            }
        });
    }
}

validateVolunteerField(field) ;{
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    if (!value) {
        isValid = false;
        errorMessage = 'This field is required';
    } else if (field.type === 'email' && !this.isValidEmail(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
    } else if (field.type === 'tel' && !this.isValidPhone(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid phone number';
    }

    this.setFieldValidity(field, isValid, errorMessage);
    return isValid;
}

async.handleVolunteerSubmission(form); {
    const submitBtn = form.querySelector('.btn-volunteer');
    const btnText = submitBtn.querySelector('.btn-text');
    const spinner = submitBtn.querySelector('.loading-spinner');

    // Show loading state
    btnText.textContent = 'Submitting...';
    spinner.style.display = 'block';
    submitBtn.disabled = true;

    // Validate all fields
    const allValid = this.validateVolunteerForm(form);
    
    if (!allValid) {
        this.showNotification('Please fix the errors in the form', 'error');
        btnText.textContent = 'Submit Application';
        spinner.style.display = 'none';
        submitBtn.disabled = false;
        return;
    }

    try {
        // Simulate form submission
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                Math.random() > 0.1 ? resolve() : reject();
            }, 2000);
        });

        // Show success modal
        this.showApplicationSuccess();

        // Reset form
        form.reset();

    } catch (error) {
        this.showNotification('Sorry, there was an error submitting your application. Please try again.', 'error');
    } finally {
        btnText.textContent = 'Submit Application';
        spinner.style.display = 'none';
        submitBtn.disabled = false;
    }
}

validateVolunteerForm(form) ;{
    const requiredFields = form.querySelectorAll('[required]');
    let allValid = true;

    // Check role selection
    const roleCheckboxes = form.querySelectorAll('input[name="roles"]');
    const checkedRoles = Array.from(roleCheckboxes).some(cb => cb.checked);
    if (!checkedRoles) {
        this.showFieldError(form.querySelector('.checkbox-group'), 'Please select at least one role of interest');
        allValid = false;
    }

    // Check required fields
    requiredFields.forEach(field => {
        if (!this.validateVolunteerField(field)) {
            allValid = false;
        }
    });

    return allValid;
}

// Application Success Modal
showApplicationSuccess(); {
    const modal = document.getElementById('applicationSuccessModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

window.closeApplicationSuccess = () => {
    const modal = document.getElementById('applicationSuccessModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

window.printApplication = () => {
    this.showNotification('Printing application confirmation...', 'info');
    // In real implementation, this would trigger print dialog
    setTimeout(() => {
        window.print();
    }, 500);
}

// Volunteer FAQ
setupVolunteerFAQ() ;{
    const faqItems = document.querySelectorAll('.volunteer-faq .faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

// Global navigation functions
window.scrollToOpportunities = () => {
    const opportunitiesSection = document.getElementById('opportunities');
    if (opportunitiesSection) {
        opportunitiesSection.scrollIntoView({ behavior: 'smooth' });
    }
}

window.scrollToApplication = () => {
    const applicationSection = document.getElementById('application');
    if (applicationSection) {
        applicationSection.scrollIntoView({ behavior: 'smooth' });
    }
}

window.applyForRole = (roleId) => {
    // Pre-fill the application form with the selected role
    const roleCheckbox = document.querySelector(`input[value="${roleId}"]`);
    if (roleCheckbox) {
        roleCheckbox.checked = true;
    }
    
    // Scroll to application form
    this.scrollToApplication();
    
    // Close role modal if open
    this.closeRoleModal();
}

// Update main init method to include volunteer page features
init(); {
    this.setupMobileMenu();
    this.setupScrollAnimations();
    this.setupCounterAnimations();
    this.setupFormHandlers();
    this.setupEmergencyFeatures();
    this.setupInteractiveElements();
    this.setupSmoothScrolling();
    
    // Check if we're on contact page
    if (window.location.pathname.includes('contact.html') || document.querySelector('.contact-hero')) {
        this.setupContactPage();
    }
    
    // Check if we're on about page
    if (window.location.pathname.includes('about.html') || document.querySelector('.about-hero')) {
        this.setupTimelineAnimations();
        this.setupImpactCounters();
        this.setupTeamInteractions();
    }
    
    // Check if we're on resources page
    if (window.location.pathname.includes('resources.html') || document.querySelector('.resources-hero')) {
        this.setupResourcesPage();
    }
    
    // Check if we're on donate page
    if (window.location.pathname.includes('donate.html') || document.querySelector('.donate-hero')) {
        this.setupDonatePage();
    }
    
    // Check if we're on volunteer page
    if (window.location.pathname.includes('volunteer.html') || document.querySelector('.volunteer-hero')) {
        this.setupVolunteerPage();
    }
    
    console.log('Rise Above GBVF website initialized');
}

// News/Blog Page Specific Functionality
setupNewsPage(); {
    this.setupBlogFilters();
    this.setupSearchFunctionality();
    this.setupPagination();
    this.setupBlogModals();
    this.setupSocialSharing();
    console.log('News page features initialized');
}

// Blog Category Filtering
setupBlogFilters(); {
    const categoryFilters = document.querySelectorAll('.category-filter');
    const categoryItems = document.querySelectorAll('.category-item');
    const blogCards = document.querySelectorAll('.blog-card');

    // Main category filters
    categoryFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            // Remove active class from all filters
            categoryFilters.forEach(f => f.classList.remove('active'));
            // Add active class to clicked filter
            filter.classList.add('active');
            
            const category = filter.getAttribute('data-category');
            this.filterBlogPosts(category);
        });
    });

    // Sidebar category links
    categoryItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const category = item.getAttribute('data-category');
            
            // Update main filters
            categoryFilters.forEach(f => {
                f.classList.remove('active');
                if (f.getAttribute('data-category') === category) {
                    f.classList.add('active');
                }
            });
            
            this.filterBlogPosts(category);
        });
    });
}

filterBlogPosts(category); {
    const blogCards = document.querySelectorAll('.blog-card');
    
    blogCards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

// Search Functionality
setupSearchFunctionality(); {
    const searchInput = document.getElementById('newsSearch');
    const searchButton = document.querySelector('.search-btn');
    const searchTags = document.querySelectorAll('.search-tag');

    // Search input
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            this.performSearch(e.target.value);
        });
        
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.performSearch(e.target.value);
            }
        });
    }

    // Search button
    if (searchButton) {
        searchButton.addEventListener('click', () => {
            this.performSearch(searchInput.value);
        });
    }

    // Search tags
    searchTags.forEach(tag => {
        tag.addEventListener('click', () => {
            const tagText = tag.getAttribute('data-tag');
            searchInput.value = tagText;
            this.performSearch(tagText);
        });
    });
}

performSearch(query) ;{
    const blogCards = document.querySelectorAll('.blog-card');
    const searchTerm = query.toLowerCase().trim();

    if (!searchTerm) {
        // Show all cards if search is empty
        blogCards.forEach(card => {
            card.style.display = 'block';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        });
        return;
    }

    blogCards.forEach(card => {
        const title = card.querySelector('.post-title').textContent.toLowerCase();
        const excerpt = card.querySelector('.post-excerpt').textContent.toLowerCase();
        const tags = card.querySelector('.post-tags').textContent.toLowerCase();

        if (title.includes(searchTerm) || excerpt.includes(searchTerm) || tags.includes(searchTerm)) {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });

    // Show search results message
    this.showSearchResults(query);
}

showSearchResults(query); {
    // Remove existing search results message
    const existingMessage = document.querySelector('.search-results-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    if (query) {
        const message = document.createElement('div');
        message.className = 'search-results-message glass-card';
        message.innerHTML = `
            <p>Search results for: <strong>"${query}"</strong></p>
            <button class="btn-clear-search">Clear Search</button>
        `;
        
        const blogGrid = document.getElementById('blogGrid');
        blogGrid.parentNode.insertBefore(message, blogGrid);

        // Clear search button
        const clearBtn = message.querySelector('.btn-clear-search');
        clearBtn.addEventListener('click', () => {
            document.getElementById('newsSearch').value = '';
            this.performSearch('');
            message.remove();
        });
    }
}

// Pagination
setupPagination() ;{
    const paginationNumbers = document.querySelectorAll('.pagination-number');
    const prevBtn = document.querySelector('.pagination-btn.prev');
    const nextBtn = document.querySelector('.pagination-btn.next');

    paginationNumbers.forEach(number => {
        number.addEventListener('click', () => {
            // Remove active class from all numbers
            paginationNumbers.forEach(n => n.classList.remove('active'));
            // Add active class to clicked number
            number.classList.add('active');
            
            // Simulate page change
            this.changePage(parseInt(number.textContent));
        });
    });

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            const currentPage = this.getCurrentPage();
            if (currentPage > 1) {
                this.changePage(currentPage - 1);
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const currentPage = this.getCurrentPage();
            this.changePage(currentPage + 1);
        });
    }
}

getCurrentPage(); {
    const activeNumber = document.querySelector('.pagination-number.active');
    return activeNumber ? parseInt(activeNumber.textContent) : 1;
}

changePage(pageNumber); {
    // In a real implementation, this would load new content from a server
    // For now, we'll just simulate the page change
    this.showNotification(`Loading page ${pageNumber}...`, 'info');
    
    // Update pagination UI
    const paginationNumbers = document.querySelectorAll('.pagination-number');
    paginationNumbers.forEach(number => {
        number.classList.remove('active');
        if (parseInt(number.textContent) === pageNumber) {
            number.classList.add('active');
        }
    });

    // Update prev/next buttons
    const prevBtn = document.querySelector('.pagination-btn.prev');
    const nextBtn = document.querySelector('.pagination-btn.next');
    
    if (prevBtn) {
        prevBtn.disabled = pageNumber === 1;
    }
    if (nextBtn) {
        nextBtn.disabled = pageNumber === 8; // Assuming 8 is the last page
    }

    // Scroll to top of blog section
    const blogSection = document.querySelector('.blog-section');
    if (blogSection) {
        blogSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Blog Post Modals
setupBlogModals() ;{
    const modal = document.getElementById('blogPostModal');
    const closeBtn = modal.querySelector('.close-modal');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    // Close when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Global function to read posts
window.readPost = (postId) => {
    const modal = document.getElementById('blogPostModal');
    const modalContent = document.getElementById('blogPostContent');
    
    let content = '';
    
    switch(postId) {
        case 'survivor-advocate':
            content = this.generatePostContent(
                'From Survivor to Advocate: Nomusa\'s Journey of Healing',
                'success',
                'March 12, 2025',
                '8 min read',
                `
                <div class="post-header">
                    <div class="post-meta">
                        <span class="post-category success">Success Story</span>
                        <span class="post-date">March 12, 2025</span>
                        <span class="read-time">8 min read</span>
                    </div>
                    <h1>From Survivor to Advocate: Nomusa\'s Journey of Healing</h1>
                    <div class="post-image-large">
                        <div class="image-placeholder">📸</div>
                    </div>
                </div>

                <div class="post-content-full">
                    <p>When Nomusa first walked through our doors two years ago, she carried the weight of years of abuse and the fear that had become her constant companion. Today, she stands as a beacon of hope for other survivors, leading peer support groups and sharing her story to inspire healing and empowerment.</p>

                    <h2>The Beginning of Healing</h2>
                    <p>"I never thought I could escape the cycle of violence," Nomusa shares. "The fear was paralyzing. But when I found Rise Above GBVF, I found people who believed in me even when I didn't believe in myself."</p>

                    <p>Her journey began with individual counseling sessions, where she started to unpack the trauma she had endured. "The counselors didn't just listen—they helped me understand that what happened wasn't my fault. That was the first step toward healing."</p>

                    <blockquote>
                        "Healing isn't about forgetting what happened. It's about reclaiming your power and writing a new story for yourself."
                    </blockquote>

                    <h2>Finding Strength in Community</h2>
                    <p>After six months of individual support, Nomusa joined our peer support program. "Meeting other women who understood exactly what I was going through changed everything. We weren't just survivors—we were warriors supporting each other's battles."</p>

                    <p>It was in these support groups that Nomusa discovered her natural ability to listen and empathize with others. "I realized that my experience could actually help someone else feel less alone. That realization was transformative."</p>

                    <h2>Becoming an Advocate</h2>
                    <p>Today, Nomusa co-facilitates two support groups each week and has become a trusted voice in our community outreach programs. "I want every woman who's suffering in silence to know that there is hope. There is a way out, and there are people who will stand with you."</p>

                    <div class="impact-stats-inline">
                        <div class="stat">
                            <strong>2</strong>
                            <span>Support Groups Led</span>
                        </div>
                        <div class="stat">
                            <strong>15+</strong>
                            <span>Survivors Mentored</span>
                        </div>
                        <div class="stat">
                            <strong>24</strong>
                            <span>Months Sober</span>
                        </div>
                    </div>

                    <p>Her work has not only helped other survivors but has been crucial to her own continued healing. "Every time I help someone else find their strength, I strengthen my own recovery. We're all in this together."</p>

                    <h2>Looking Forward</h2>
                    <p>Nomusa is now pursuing certification in counseling and plans to establish her own support organization in the future. "I've found my purpose. What was meant to break me actually showed me who I'm meant to be."</p>

                    <div class="call-to-action">
                        <h3>Inspired by Nomusa's Story?</h3>
                        <p>If you or someone you know needs support, remember that help is available. You don't have to walk this path alone.</p>
                        <div class="action-buttons">
                            <button class="btn-primary" onclick="window.location.href='contact.html'">Get Help Now</button>
                            <button class="btn-secondary" onclick="window.location.href='volunteer.html'">Become a Volunteer</button>
                        </div>
                    </div>
                </div>

                <div class="post-footer">
                    <div class="post-tags-full">
                        <span class="tag-label">Tags:</span>
                        <span class="post-tag">#HealingJourney</span>
                        <span class="post-tag">#Empowerment</span>
                        <span class="post-tag">#PeerSupport</span>
                        <span class="post-tag">#SuccessStory</span>
                    </div>
                    <div class="social-share-full">
                        <span>Share this story:</span>
                        <button class="share-btn" data-platform="facebook" data-url="survivor-advocate">📘</button>
                        <button class="share-btn" data-platform="twitter" data-url="survivor-advocate">🐦</button>
                        <button class="share-btn" data-platform="whatsapp" data-url="survivor-advocate">📱</button>
                        <button class="share-btn" data-platform="linkedin" data-url="survivor-advocate">💼</button>
                    </div>
                </div>
                `
            );
            break;
        // Add more post content as needed
    }
    
    modalContent.innerHTML = content;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    // Re-attach social sharing for the modal
    this.setupSocialSharing();
}

generatePostContent(title, category, date, readTime, content); {
    return content;
}

// Social Sharing
setupSocialSharing(); {
    const shareButtons = document.querySelectorAll('.share-btn');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', () => {
            const platform = button.getAttribute('data-platform');
            const url = button.getAttribute('data-url') || window.location.href;
            const title = encodeURIComponent('Rise Above GBVF - Important Story');
            
            let shareUrl = '';
            
            switch(platform) {
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                    break;
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?text=${title}&url=${encodeURIComponent(url)}`;
                    break;
                case 'whatsapp':
                    shareUrl = `https://wa.me/?text=${title}%20${encodeURIComponent(url)}`;
                    break;
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
                    break;
            }
            
            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        });
    });
}

// Featured post function
window.readFeaturedPost = () => {
    this.readPost('phoenix-march');
}

// Event functions
window.viewAllEvents = () => {
    this.showNotification('Redirecting to events calendar...', 'info');
    // In real implementation, this would navigate to events page
}

window.listenToPodcast = () => {
    this.showNotification('Opening podcast...', 'info');
    // In real implementation, this would open podcast platform
}

// Update main init method to include news page features
init() ;{
    this.setupMobileMenu();
    this.setupScrollAnimations();
    this.setupCounterAnimations();
    this.setupFormHandlers();
    this.setupEmergencyFeatures();
    this.setupInteractiveElements();
    this.setupSmoothScrolling();
    
    // Check if we're on contact page
    if (window.location.pathname.includes('contact.html') || document.querySelector('.contact-hero')) {
        this.setupContactPage();
    }
    
    // Check if we're on about page
    if (window.location.pathname.includes('about.html') || document.querySelector('.about-hero')) {
        this.setupTimelineAnimations();
        this.setupImpactCounters();
        this.setupTeamInteractions();
    }
    
    // Check if we're on resources page
    if (window.location.pathname.includes('resources.html') || document.querySelector('.resources-hero')) {
        this.setupResourcesPage();
    }
    
    // Check if we're on donate page
    if (window.location.pathname.includes('donate.html') || document.querySelector('.donate-hero')) {
        this.setupDonatePage();
    }
    
    // Check if we're on volunteer page
    if (window.location.pathname.includes('volunteer.html') || document.querySelector('.volunteer-hero')) {
        this.setupVolunteerPage();
    }
    
    // Check if we're on news page
    if (window.location.pathname.includes('news.html') || document.querySelector('.news-hero')) {
        this.setupNewsPage();
    }
    
    console.log('Rise Above GBVF website initialized');
}