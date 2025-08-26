// Hangout Milkshakes & Waffles - Enhanced Website Experience

class ParallaxController {
    constructor() {
        this.scrollY = 0;
        this.ticking = false;
        this.elements = {
            navbar: document.getElementById('navbar'),
            heroLayers: document.querySelectorAll('.parallax-layer'),
            floatingLogo: document.querySelector('.floating-logo'),
            heroContent: document.querySelector('.hero-content'),
            waffleBackground: document.querySelector('.waffle-background'),
            floatingCards: document.querySelectorAll('.floating-card'),
            navLinks: document.querySelectorAll('.nav-link'),
            heroCTA: document.querySelector('.hero-cta')
        };

        this.init();
    }

    init() {
        this.setupScrollListener();
        this.setupIntersectionObserver();
        this.setupSmoothScroll();
        this.setupNavigation();
        this.setupBackgroundParallax();
        this.requestTick();
    }

    setupScrollListener() {
        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.updateScrollPosition();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    updateScrollPosition() {
        this.scrollY = window.pageYOffset;
        this.updateParallaxElements();
        this.updateBackgroundParallax();
        this.updateNavbar();
    }

    setupBackgroundParallax() {
        // Enhanced parallax for background images
        this.backgroundElements = [
            { element: document.querySelector('.hero'), speed: 0.5 },
            { element: document.querySelector('.featured-waffle'), speed: 0.3 },
            { element: document.querySelector('.menu-section'), speed: 0.4 },
            { element: document.querySelector('.signature-collection'), speed: 0.2 },
            { element: document.querySelector('.handcrafted-shakes'), speed: 0.3 },
            { element: document.querySelector('.about-section'), speed: 0.2 },
            { element: document.querySelector('.contact-section'), speed: 0.3 }
        ];
    }

    updateBackgroundParallax() {
        const windowHeight = window.innerHeight;

        this.backgroundElements.forEach(({ element, speed }) => {
            if (element) {
                const rect = element.getBoundingClientRect();
                const isVisible = rect.top < windowHeight && rect.bottom > 0;

                if (isVisible) {
                    const elementTop = element.getBoundingClientRect().top + this.scrollY;
                    const yPos = (this.scrollY - elementTop) * speed;
                    element.style.backgroundPosition = `center ${yPos}px`;
                }
            }
        });
    }

    updateParallaxElements() {
        const windowHeight = window.innerHeight;
        const scrollPercent = this.scrollY / windowHeight;

        // Hero parallax layers with different speeds
        if (this.elements.heroLayers.length > 0 && this.scrollY < windowHeight * 1.5) {
            this.elements.heroLayers.forEach((layer, index) => {
                const speed = 0.3 + (index * 0.1);
                const yPos = this.scrollY * speed;
                layer.style.transform = `translate3d(0, ${yPos}px, 0)`;
            });
        }

        // Floating logo scaling and movement
        if (this.elements.floatingLogo && this.scrollY < windowHeight) {
            const scale = Math.max(0.8, 1 - scrollPercent * 0.2);
            const yPos = this.scrollY * 0.2;
            const rotation = scrollPercent * 5;
            this.elements.floatingLogo.style.transform = `translate3d(0, ${yPos}px, 0) scale(${scale}) rotate(${rotation}deg)`;
        }

        // Hero content fade and slide
        if (this.elements.heroContent && this.scrollY < windowHeight) {
            const opacity = Math.max(0, 1 - scrollPercent * 1.5);
            const yPos = this.scrollY * 0.6;
            const blur = scrollPercent * 2;
            this.elements.heroContent.style.transform = `translate3d(0, ${yPos}px, 0)`;
            this.elements.heroContent.style.opacity = opacity;
            this.elements.heroContent.style.filter = `blur(${blur}px)`;
        }

        // Hero CTA enhanced movement
        if (this.elements.heroCTA && this.scrollY < windowHeight) {
            const yPos = this.scrollY * 0.3;
            const scale = Math.max(0.9, 1 - scrollPercent * 0.1);
            this.elements.heroCTA.style.transform = `translate3d(0, ${yPos}px, 0) scale(${scale})`;
        }

        // Waffle section parallax
        if (this.elements.waffleBackground) {
            const waffleSection = document.querySelector('.featured-waffle');
            const rect = waffleSection.getBoundingClientRect();

            if (rect.top < windowHeight && rect.bottom > 0) {
                const sectionScrollPercent = (windowHeight - rect.top) / (windowHeight + rect.height);
                const yPos = sectionScrollPercent * 80;
                const rotation = sectionScrollPercent * 2;
                this.elements.waffleBackground.style.transform = `translate3d(0, ${yPos}px, 0) rotate(${rotation}deg) scale(1.1)`;
                this.elements.waffleBackground.style.opacity = 0.8 + (sectionScrollPercent * 0.2);
            }
        }

        // Enhanced floating cards with complex motion
        this.elements.floatingCards.forEach((card, index) => {
            const aboutSection = document.querySelector('.about-section');
            const rect = aboutSection.getBoundingClientRect();

            if (rect.top < windowHeight && rect.bottom > 0) {
                const sectionScrollPercent = (windowHeight - rect.top) / (windowHeight + rect.height);
                const amplitude = 30 + (index * 8);
                const frequency = 0.6 + (index * 0.3);
                const phase = index * Math.PI / 2;

                const yPos = Math.sin(sectionScrollPercent * Math.PI * frequency + phase) * amplitude;
                const xPos = Math.cos(sectionScrollPercent * Math.PI * frequency * 0.5 + phase) * 15;
                const rotation = Math.sin(sectionScrollPercent * Math.PI * frequency * 0.7 + phase) * 8;
                const scale = 0.9 + Math.sin(sectionScrollPercent * Math.PI * 2 + phase) * 0.1;

                card.style.transform = `translate3d(${xPos}px, ${yPos}px, 0) rotate(${rotation}deg) scale(${scale})`;
                card.style.opacity = 0.7 + (Math.sin(sectionScrollPercent * Math.PI + phase) * 0.3);
            }
        });

        // Section transition effects
        this.updateSectionTransitions();
    }

    updateSectionTransitions() {
        const sections = document.querySelectorAll('section');
        const windowHeight = window.innerHeight;

        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            const isVisible = rect.top < windowHeight * 0.8 && rect.bottom > windowHeight * 0.2;

            if (isVisible) {
                const sectionCenter = rect.top + rect.height / 2;
                const distanceFromCenter = Math.abs(windowHeight / 2 - sectionCenter);
                const proximity = Math.max(0, 1 - (distanceFromCenter / windowHeight));

                const scale = 0.98 + (proximity * 0.02);
                const brightness = 0.9 + (proximity * 0.1);

                section.style.transform = `scale(${scale})`;
                section.style.filter = `brightness(${brightness})`;
                section.style.transition = 'transform 0.3s ease, filter 0.3s ease';
            }
        });
    }

    updateNavbar() {
        if (this.scrollY > 50) {
            this.elements.navbar.classList.add('scrolled');
            this.elements.navbar.style.backdropFilter = 'blur(15px)';
        } else {
            this.elements.navbar.classList.remove('scrolled');
            this.elements.navbar.style.backdropFilter = 'blur(10px)';
        }
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');

                    // Menu category stagger effect
                    if (entry.target.classList.contains('menu-category') ||
                        entry.target.classList.contains('signature-card') ||
                        entry.target.classList.contains('handcrafted-card')) {
                        const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
                        entry.target.style.transitionDelay = `${index * 150}ms`;
                    }
                }
            });
        }, observerOptions);

        // Observe animated elements
        document.querySelectorAll('.menu-category, .signature-card, .handcrafted-card, .contact-item, .delivery-info').forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });

        // Special observer for background-dependent elements
        const backgroundObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.enhanceBackgroundEffects(entry.target);
                }
            });
        }, { threshold: 0.3 });

        document.querySelectorAll('.hero, .featured-waffle, .menu-section, .signature-collection, .handcrafted-shakes, .about-section, .contact-section')
            .forEach(section => backgroundObserver.observe(section));
    }

    enhanceBackgroundEffects(section) {
        // Add dynamic overlay effects based on scroll
        if (!section.querySelector('.dynamic-overlay')) {
            const overlay = document.createElement('div');
            overlay.className = 'dynamic-overlay';
            overlay.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 1;
                transition: opacity 0.5s ease;
            `;
            section.appendChild(overlay);
        }
    }

    setupSmoothScroll() {
        // Enhanced navigation links smooth scroll
        this.elements.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();

                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    // Remove active class from all links with animation
                    this.elements.navLinks.forEach(navLink => {
                        navLink.classList.remove('active');
                        navLink.style.transform = 'scale(1)';
                    });

                    // Add active class with animation
                    link.classList.add('active');
                    link.style.transform = 'scale(1.05)';

                    // Calculate target position with offset
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 80;

                    // Custom smooth scroll with easing
                    this.smoothScrollTo(targetPosition, 1000);
                }
            });
        });

        // Hero CTA enhanced scroll to menu
        if (this.elements.heroCTA) {
            this.elements.heroCTA.addEventListener('click', (e) => {
                e.preventDefault();

                // Add click animation
                this.elements.heroCTA.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.elements.heroCTA.style.transform = 'scale(1)';
                }, 150);

                const menuSection = document.querySelector('#menu');
                if (menuSection) {
                    const targetPosition = menuSection.getBoundingClientRect().top + window.pageYOffset - 80;
                    this.smoothScrollTo(targetPosition, 1200);
                }
            });
        }
    }

    smoothScrollTo(targetPosition, duration) {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        const easeInOutCubic = (t) => {
            return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        };

        const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);

            const ease = easeInOutCubic(progress);
            window.scrollTo(0, startPosition + distance * ease);

            if (progress < 1) {
                requestAnimationFrame(animation);
            }
        };

        requestAnimationFrame(animation);
    }

    setupNavigation() {
        const sections = document.querySelectorAll('section[id]');

        const highlightNavOnScroll = () => {
            const scrollPos = window.pageYOffset + 150;

            sections.forEach(section => {
                const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;
                const sectionHeight = section.offsetHeight;
                const sectionId = '#' + section.id;

                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    this.elements.navLinks.forEach(link => {
                        link.classList.remove('active');
                        link.style.transform = 'scale(1)';

                        if (link.getAttribute('href') === sectionId) {
                            link.classList.add('active');
                            link.style.transform = 'scale(1.05)';
                        }
                    });
                }
            });
        };

        let navTicking = false;
        window.addEventListener('scroll', () => {
            if (!navTicking) {
                requestAnimationFrame(() => {
                    highlightNavOnScroll();
                    navTicking = false;
                });
                navTicking = true;
            }
        });

        highlightNavOnScroll();
    }

    requestTick() {
        if (!this.ticking) {
            requestAnimationFrame(() => {
                this.updateScrollPosition();
                this.ticking = false;
            });
        }
        this.ticking = true;
    }
}

// Enhanced Interactive Effects
class InteractiveEffects {
    constructor() {
        this.init();
    }

    init() {
        this.setupHoverEffects();
        this.setupButtonAnimations();
        this.setupCardTilt();
        this.setupBackgroundInteractions();
        this.setupMouseParallax();
    }

    setupBackgroundInteractions() {
        // Mouse movement effects on backgrounds
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;

            // Hero section mouse parallax
            const heroLayers = document.querySelectorAll('.parallax-layer');
            heroLayers.forEach((layer, index) => {
                const speed = (index + 1) * 0.5;
                const x = (mouseX - 0.5) * speed * 20;
                const y = (mouseY - 0.5) * speed * 20;

                layer.style.transform += ` translate(${x}px, ${y}px)`;
            });

            // Floating cards mouse interaction
            const floatingCards = document.querySelectorAll('.floating-card');
            floatingCards.forEach((card, index) => {
                const rect = card.getBoundingClientRect();
                const cardCenterX = rect.left + rect.width / 2;
                const cardCenterY = rect.top + rect.height / 2;

                const deltaX = e.clientX - cardCenterX;
                const deltaY = e.clientY - cardCenterY;
                const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

                if (distance < 200) {
                    const force = (200 - distance) / 200;
                    const moveX = (deltaX / distance) * force * 15;
                    const moveY = (deltaY / distance) * force * 15;

                    card.style.transform += ` translate(${moveX}px, ${moveY}px)`;
                }
            });
        });
    }

    setupMouseParallax() {
        // Section backgrounds respond to mouse movement
        const sections = document.querySelectorAll('.hero, .featured-waffle, .menu-section, .signature-collection, .handcrafted-shakes, .about-section, .contact-section');

        sections.forEach(section => {
            section.addEventListener('mousemove', (e) => {
                const rect = section.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
                const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

                // Subtle background shift based on mouse position
                const bgX = x * 10;
                const bgY = y * 10;

                section.style.backgroundPosition = `calc(50% + ${bgX}px) calc(50% + ${bgY}px)`;
            });

            section.addEventListener('mouseleave', () => {
                section.style.backgroundPosition = 'center center';
            });
        });
    }

    setupHoverEffects() {
        // Enhanced menu category hover effects
        document.querySelectorAll('.menu-category, .signature-card, .handcrafted-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-12px) scale(1.03)';
                card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
                card.style.filter = 'brightness(1.05)';

                // Animate items inside cards
                const items = card.querySelectorAll('.menu-item');
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.transform = 'translateX(5px)';
                    }, index * 50);
                });
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = 'var(--shadow-md)';
                card.style.filter = 'brightness(1)';

                // Reset items
                const items = card.querySelectorAll('.menu-item');
                items.forEach(item => {
                    item.style.transform = 'translateX(0)';
                });
            });
        });
    }

    setupButtonAnimations() {
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', function (e) {
                // Enhanced ripple effect
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height) * 1.5;
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;

                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, transparent 70%);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: advancedRipple 0.8s ease-out;
                    pointer-events: none;
                `;

                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);

                // Button press animation
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);

                setTimeout(() => {
                    ripple.remove();
                }, 800);
            });
        });

        // Add enhanced ripple animation
        if (!document.querySelector('#advanced-ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'advanced-ripple-styles';
            style.textContent = `
                @keyframes advancedRipple {
                    0% {
                        transform: scale(0);
                        opacity: 0.8;
                    }
                    50% {
                        opacity: 0.4;
                    }
                    100% {
                        transform: scale(1);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    setupCardTilt() {
        document.querySelectorAll('.contact-item').forEach(item => {
            item.addEventListener('mousemove', (e) => {
                const rect = item.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 8;
                const rotateY = (centerX - x) / 8;

                item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateX(8px) scale(1.02)`;
                item.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
            });

            item.addEventListener('mouseleave', () => {
                item.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateX(0px) scale(1)';
                item.style.boxShadow = 'var(--shadow-sm)';
            });
        });
    }
}

// Enhanced Notification System
class NotificationSystem {
    constructor() {
        this.init();
    }

    init() {
        this.createNotificationContainer();
    }

    createNotificationContainer() {
        if (!document.querySelector('#notification-container')) {
            const container = document.createElement('div');
            container.id = 'notification-container';
            container.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                z-index: 10000;
                pointer-events: none;
            `;
            document.body.appendChild(container);
        }
    }

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        const colors = {
            success: 'linear-gradient(135deg, #4CAF50, #45a049)',
            info: 'linear-gradient(135deg, #2196F3, #1976D2)',
            warning: 'linear-gradient(135deg, #FF9800, #F57C00)',
            error: 'linear-gradient(135deg, #f44336, #d32f2f)'
        };

        notification.style.cssText = `
            background: ${colors[type]};
            color: white;
            padding: 16px 24px;
            border-radius: 12px;
            margin-bottom: 12px;
            transform: translateX(100%) scale(0.8);
            transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            pointer-events: auto;
            box-shadow: 0 8px 25px rgba(0,0,0,0.2);
            font-weight: 500;
            max-width: 320px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            cursor: pointer;
        `;
        notification.textContent = message;

        const container = document.querySelector('#notification-container');
        container.appendChild(notification);

        // Animate in with bounce effect
        setTimeout(() => {
            notification.style.transform = 'translateX(0) scale(1)';
        }, 100);

        // Click to dismiss
        notification.addEventListener('click', () => {
            notification.style.transform = 'translateX(100%) scale(0.8)';
            setTimeout(() => notification.remove(), 400);
        });

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(100%) scale(0.8)';
                setTimeout(() => notification.remove(), 400);
            }
        }, 5000);

        return notification;
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize main controllers
    const parallaxController = new ParallaxController();
    const interactiveEffects = new InteractiveEffects();
    const notificationSystem = new NotificationSystem();

    // Enhanced loading animation
    document.body.style.opacity = '0';
    document.body.style.filter = 'blur(3px)';

    setTimeout(() => {
        document.body.style.transition = 'opacity 0.8s ease-in-out, filter 0.8s ease-in-out';
        document.body.style.opacity = '1';
        document.body.style.filter = 'blur(0px)';

        // Show welcome notification
        setTimeout(() => {
            notificationSystem.showNotification('Welcome to Hangout! 🥤 Scroll to explore our delicious menu', 'info');
        }, 1000);
    }, 200);

    // Enhanced delivery button functionality
    document.querySelectorAll('.delivery-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();

            if (btn.classList.contains('swiggy')) {
                notificationSystem.showNotification('Opening Swiggy... Order your favorites! 🛵', 'info');
                setTimeout(() => {
                    window.open('https://www.swiggy.com/city/hyderabad/hangout-milkshakes-and-waffles-beside-nexa-showroom-chayamina-enclave-kukatpally-rest943995', '_blank');
                }, 1500);
            } else if (btn.classList.contains('zomato')) {
                notificationSystem.showNotification('Opening Zomato... Delicious treats await! 🍕', 'info');
                setTimeout(() => {
                    window.open('https://www.zomato.com/hyderabad/hangout-3-kukatpally', '_blank');
                }, 1500);
            }
        });
    });

    // Enhanced phone number functionality
    document.addEventListener('click', (e) => {
        if (e.target.textContent && e.target.textContent.includes('+91 86880 23266')) {
            e.preventDefault();
            notificationSystem.showNotification('Calling Hangout... 📞', 'success');
            setTimeout(() => {
                window.location.href = 'tel:+918688023266';
            }, 1000);
        }
    });

    // Instagram link with enhanced feedback
    document.addEventListener('click', (e) => {
        if (e.target.textContent && e.target.textContent.includes('@hangoutworld')) {
            e.preventDefault();
            notificationSystem.showNotification('Opening Instagram... Follow us for updates! 📸', 'info');
            setTimeout(() => {
                window.open('https://instagram.com/hangoutworld', '_blank');
            }, 1200);
        }
    });

    // Enhanced order buttons functionality
    document.querySelectorAll('.order-btn, .btn--outline').forEach(btn => {
        if (btn.textContent.includes('Order')) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();

                const itemName = btn.closest('.featured-text, .handcrafted-card, .signature-card')?.querySelector('.section-title, .handcrafted-name, .signature-name')?.textContent || 'Item';
                const itemPrice = btn.closest('.featured-text, .handcrafted-card, .signature-card')?.querySelector('.price-tag, .handcrafted-price, .signature-price')?.textContent || '';

                notificationSystem.showNotification(
                    `${itemName} ${itemPrice} - Call +91 86880 23266 to order! 🎉`,
                    'success'
                );
            });
        }
    });

    // Keyboard navigation support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // Close any open notifications
            document.querySelectorAll('#notification-container > div').forEach(notification => {
                notification.click();
            });
        }
    });

    console.log('🥤 Hangout Milkshakes & Waffles - Streamlined Website Loaded Successfully!');
    console.log('✨ Features: Enhanced Parallax, Clean Navigation, Simplified Franchise Section');
});