// VoderCall Landing Page JavaScript

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize all app functionality
function initializeApp() {
    setupMobileNavigation();
    setupSmoothScrolling();
    setupScrollEffects();
    setupAnimations();
    setupCTAButtons();
}

// Mobile Navigation Toggle
function setupMobileNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = navToggle.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (navToggle.classList.contains('active')) {
                    if (index === 0) span.style.transform = 'rotate(45deg) translate(6px, 6px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translate(6px, -6px)';
                } else {
                    span.style.transform = '';
                    span.style.opacity = '';
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = '';
                    span.style.opacity = '';
                });
            }
        });
        
        // Close menu when clicking nav links
        const navLinks = navMenu.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = '';
                    span.style.opacity = '';
                });
            });
        });
    }
}

// Enhanced Smooth Scrolling for Navigation Links
function setupSmoothScrolling() {
    // Get all navigation links that start with #
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const href = this.getAttribute('href');
            let targetSection = null;
            
            // Handle different href cases
            if (href === '#home') {
                targetSection = document.querySelector('.hero');
            } else if (href === '#features') {
                targetSection = document.querySelector('.features');
            } else if (href === '#how-it-works') {
                targetSection = document.querySelector('.how-it-works');
            } else if (href === '#pricing') {
                // If pricing section doesn't exist, scroll to social proof
                targetSection = document.querySelector('.social-proof');
            } else if (href === '#contact') {
                // If contact section doesn't exist, scroll to footer
                targetSection = document.querySelector('.footer');
            } else {
                // Fallback: try to find element by ID
                const targetId = href.substring(1);
                targetSection = document.getElementById(targetId);
            }
            
            if (targetSection) {
                const headerOffset = 80; // Account for fixed header
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                // Use smooth scrolling
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            } else {
                console.warn('Target section not found for:', href);
            }
        });
    });
    
    // Also handle any other CTA buttons that should scroll
    const ctaButtons = document.querySelectorAll('.btn');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                
                let targetSection = null;
                if (href === '#contact') {
                    targetSection = document.querySelector('.footer');
                } else {
                    const targetId = href.substring(1);
                    targetSection = document.getElementById(targetId);
                }
                
                if (targetSection) {
                    const headerOffset = 80;
                    const elementPosition = targetSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Scroll Effects (Header background, animations)
function setupScrollEffects() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Header background opacity
        if (scrollTop > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
        
        // Animate elements on scroll
        animateOnScroll();
        
        // Update active navigation item
        updateActiveNavItem();
        
        lastScrollTop = scrollTop;
    });
}

// Update active navigation item based on scroll position
function updateActiveNavItem() {
    const sections = [
        { element: document.querySelector('.hero'), id: 'home' },
        { element: document.querySelector('.features'), id: 'features' },
        { element: document.querySelector('.how-it-works'), id: 'how-it-works' },
        { element: document.querySelector('.social-proof'), id: 'pricing' },
        { element: document.querySelector('.footer'), id: 'contact' }
    ];
    
    const navLinks = document.querySelectorAll('.nav__link');
    const scrollPos = window.scrollY + 100; // Offset for header
    
    sections.forEach(section => {
        if (section.element) {
            const sectionTop = section.element.offsetTop;
            const sectionHeight = section.element.offsetHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${section.id}`) {
                        link.classList.add('active');
                    }
                });
            }
        }
    });
}

// Animate elements when they come into view
function animateOnScroll() {
    const elements = document.querySelectorAll('.feature-card, .process-step, .testimonial');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Setup initial animations
function setupAnimations() {
    // Set initial state for animated elements
    const animatedElements = document.querySelectorAll('.feature-card, .process-step, .testimonial');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    });
    
    // Trigger initial animation check
    setTimeout(() => {
        animateOnScroll();
    }, 100);
    
    // Animate hero elements on load
    animateHeroElements();
    
    // Setup counter animations
    setupCounterAnimations();
}

// Hero elements animation
function animateHeroElements() {
    const heroTitle = document.querySelector('.hero__title');
    const heroDescription = document.querySelector('.hero__description');
    const heroActions = document.querySelector('.hero__actions');
    const heroVisual = document.querySelector('.hero__visual');
    
    // Set initial styles
    [heroTitle, heroDescription, heroActions].forEach(element => {
        if (element) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        }
    });
    
    if (heroVisual) {
        heroVisual.style.opacity = '0';
        heroVisual.style.transform = 'scale(0.8)';
        heroVisual.style.transition = 'all 1s cubic-bezier(0.16, 1, 0.3, 1)';
    }
    
    // Stagger animations
    setTimeout(() => {
        if (heroTitle) {
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }
    }, 200);
    
    setTimeout(() => {
        if (heroDescription) {
            heroDescription.style.opacity = '1';
            heroDescription.style.transform = 'translateY(0)';
        }
    }, 400);
    
    setTimeout(() => {
        if (heroActions) {
            heroActions.style.opacity = '1';
            heroActions.style.transform = 'translateY(0)';
        }
    }, 600);
    
    setTimeout(() => {
        if (heroVisual) {
            heroVisual.style.opacity = '1';
            heroVisual.style.transform = 'scale(1)';
        }
    }, 800);
}

// Counter animations for statistics
function setupCounterAnimations() {
    const counters = document.querySelectorAll('.stat__number');
    let counterAnimated = false;
    
    function animateCounters() {
        if (counterAnimated) return;
        
        const socialProofSection = document.querySelector('.social-proof');
        if (!socialProofSection) return;
        
        const rect = socialProofSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
            counterAnimated = true;
            
            counters.forEach(counter => {
                const target = counter.textContent;
                const numericValue = parseInt(target.replace(/[^\d]/g, ''));
                const suffix = target.replace(/[\d]/g, '');
                
                if (numericValue) {
                    animateCounter(counter, 0, numericValue, suffix, 2000);
                }
            });
        }
    }
    
    // Check on scroll
    window.addEventListener('scroll', animateCounters);
    // Check on load
    setTimeout(animateCounters, 1000);
}

// Animate individual counter
function animateCounter(element, start, end, suffix, duration) {
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + (end - start) * easeOutQuart);
        
        element.textContent = current.toLocaleString() + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(animation);
        } else {
            element.textContent = end.toLocaleString() + suffix;
        }
    }
    
    requestAnimationFrame(animation);
}

// Setup CTA Button interactions
function setupCTAButtons() {
    const ctaButtons = document.querySelectorAll('.btn');
    
    ctaButtons.forEach(button => {
        // Add ripple effect
        button.addEventListener('click', function(e) {
            // Skip ripple effect if it's a navigation link
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                return; // Let the smooth scrolling handle this
            }
            
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                background-color: rgba(255, 255, 255, 0.3);
                left: ${x}px;
                top: ${y}px;
                width: ${size}px;
                height: ${size}px;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.remove();
                }
            }, 600);
        });
        
        // Enhanced hover effects
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// Add CSS for ripple animation and active nav states
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .nav__link.active {
        color: var(--vodercall-primary);
        font-weight: var(--font-weight-semibold);
    }
    
    .nav__link.active::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        right: 0;
        height: 2px;
        background: var(--vodercall-primary);
        border-radius: 1px;
    }
    
    .nav__link {
        position: relative;
    }
`;
document.head.appendChild(style);

// Intersection Observer for better performance
function setupIntersectionObserver() {
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observe animated elements
        const elementsToObserve = document.querySelectorAll('.feature-card, .process-step, .testimonial');
        elementsToObserve.forEach(element => {
            observer.observe(element);
        });
    }
}

// Handle form submissions (if any forms are added)
function setupForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add loading state
            const submitButton = form.querySelector('button[type="submit"]');
            if (submitButton) {
                const originalText = submitButton.textContent;
                submitButton.textContent = 'Processing...';
                submitButton.disabled = true;
                
                // Simulate form submission
                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    
                    // Show success message (you can customize this)
                    alert('Thank you! We\'ll get back to you soon.');
                }, 2000);
            }
        });
    });
}

// Keyboard navigation support
function setupKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // Escape key to close mobile menu
        if (e.key === 'Escape') {
            const navMenu = document.getElementById('navMenu');
            const navToggle = document.getElementById('navToggle');
            
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                
                const spans = navToggle.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = '';
                    span.style.opacity = '';
                });
            }
        }
    });
}

// Initialize additional features
setTimeout(() => {
    setupIntersectionObserver();
    setupForms();
    setupKeyboardNavigation();
}, 100);

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll handler for performance
const debouncedScrollHandler = debounce(function() {
    animateOnScroll();
    updateActiveNavItem();
}, 16); // ~60fps

// Preload critical resources
function preloadResources() {
    const criticalImages = [
        // Add any critical image URLs here when available
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Initialize preloading
preloadResources();

// Export functions for potential external use
window.VoderCall = {
    animateOnScroll,
    setupCounterAnimations,
    debounce,
    updateActiveNavItem
};