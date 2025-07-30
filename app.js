// VoderCall Website JavaScript

// DOM Content Loaded Event Listener
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileNavigation();
    initSmoothScrolling();
    initAnimations();
    initFormHandling();
    initHeaderScroll();
    initCategoriesNavigation();
});

// Mobile Navigation Toggle
function initMobileNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target);
            const isClickOnHamburger = hamburger.contains(event.target);

            if (!isClickInsideNav && !isClickOnHamburger) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const headerOffset = 80;
                const elementPosition = targetSection.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Intersection Observer for Animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    const elementsToObserve = document.querySelectorAll(
        '.feature-card, .step, .pricing-card, .testimonial-card, .section-header'
    );

    elementsToObserve.forEach(element => {
        observer.observe(element);
    });
}

// Header Scroll Effect
function initHeaderScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }

        lastScrollTop = scrollTop;
    });
}

// Contact Form Handling
function initFormHandling() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            
            // Handle different form types (homepage vs contact page)
            let name;
            const firstName = formData.get('firstName');
            const lastName = formData.get('lastName');
            const contactName = formData.get('contactName');
            
            if (firstName && lastName) {
                // Contact page form
                name = `${firstName} ${lastName}`;
            } else if (contactName) {
                // Homepage form
                name = contactName;
            }t666665
            
            const email = formData.get('contactEmail');
            const message = formData.get('contactMessage');
            const subject = formData.get('subject');

            // Basic validation
            if (!name || !email || !message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }

            // Create email data with subject if available
            const emailSubject = subject ? 
                `${subject.charAt(0).toUpperCase() + subject.slice(1)} - Contact Form Submission` : 
                'New Contact Form Submission from VoderCall Website';
                
            const emailData = {
                to: 'marco@vodercall.ai',
                subject: emailSubject,
                body: `
New contact form submission:

Name: ${name}
Email: ${email}${subject ? `\nSubject: ${subject}` : ''}
Message: ${message}

Sent from VoderCall website contact form.
                `
            };

            // Simulate sending email (in a real application, this would be sent to a backend service)
            console.log('Email would be sent to:', emailData.to);
            console.log('Email data:', emailData);

            // Show success message
            showNotification('Thank you for your message, we will get back to you shortly.', 'success');
            contactForm.reset();
        });
    }
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6'};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 1001;
        font-weight: 600;
        max-width: 300px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Slide in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification && notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Button click animations
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn')) {
        const button = e.target;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
        `;

        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);

        setTimeout(() => {
            if (ripple && ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }
});

// Add ripple animation keyframe
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Pricing card hover effects
function initPricingEffects() {
    const pricingCards = document.querySelectorAll('.pricing-card');

    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            if (this.classList.contains('featured')) {
                this.style.transform = 'scale(1.05)';
            } else {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
}

// Initialize pricing effects after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initPricingEffects();
});

// Feature card interactions
function initFeatureCardEffects() {
    const featureCards = document.querySelectorAll('.feature-card');

    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.feature-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
                icon.style.background = 'linear-gradient(135deg, #10B981, #059669)';
            }
        });

        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.feature-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
                icon.style.background = 'linear-gradient(135deg, #3B82F6, #10B981)';
            }
        });
    });
}

// Initialize feature card effects
document.addEventListener('DOMContentLoaded', function() {
    initFeatureCardEffects();
});

// Voice wave animation for hero section
function initVoiceWaves() {
    const waves = document.querySelectorAll('.wave');

    waves.forEach((wave, index) => {
        wave.style.animationDelay = `${index * 0.2}s`;
        wave.style.animationDuration = `${1.5 + Math.random() * 0.5}s`;
    });
}

// Initialize voice waves
document.addEventListener('DOMContentLoaded', function() {
    initVoiceWaves();
});

// Scroll to top functionality
function addScrollToTop() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '↑';
    scrollButton.className = 'scroll-to-top';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--accent-color, #10B981);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 20px;
        font-weight: bold;
        cursor: pointer;
        box-shadow: 0 4px 20px rgba(16, 185, 129, 0.3);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
    `;

    document.body.appendChild(scrollButton);

    // Show/hide based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollButton.style.opacity = '1';
            scrollButton.style.visibility = 'visible';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.visibility = 'hidden';
        }
    });

    // Scroll to top on click
    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize scroll to top
document.addEventListener('DOMContentLoaded', function() {
    addScrollToTop();
});

// Performance optimization: Lazy load images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Categories Navigation
function initCategoriesNavigation() {
    const categoriesGrid = document.querySelector('.categories-grid');
    const prevBtn = document.querySelector('.categories-nav-prev');
    const nextBtn = document.querySelector('.categories-nav-next');

    if (!categoriesGrid || !prevBtn || !nextBtn) return;

    const scrollAmount = 220; // Width of category item + gap

    prevBtn.addEventListener('click', function() {
        categoriesGrid.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });

    nextBtn.addEventListener('click', function() {
        categoriesGrid.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

    // Update navigation buttons visibility based on scroll position
    function updateNavButtons() {
        const scrollLeft = categoriesGrid.scrollLeft;
        const maxScroll = categoriesGrid.scrollWidth - categoriesGrid.clientWidth;

        prevBtn.style.opacity = scrollLeft > 0 ? '1' : '0.5';
        nextBtn.style.opacity = scrollLeft < maxScroll ? '1' : '0.5';
    }

    categoriesGrid.addEventListener('scroll', updateNavButtons);
    updateNavButtons(); // Initial state
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', function() {
    initLazyLoading();
});

// Console welcome message
console.log(
    '%cVoderCall Website%c\n\nWelcome to VoderCall - Your AI Assistant for Restaurant Reservations!\n\nFor technical support, please visit: vodercall.ai/support',
    'color: #10B981; font-size: 18px; font-weight: bold;',
    'color: #6B7280; font-size: 14px;'
);