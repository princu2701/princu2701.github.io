// DOM Elements
const loadingScreen = document.querySelector('.loading-screen');
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const scrollToTopBtn = document.querySelector('.scroll-to-top');

// Global Variables
let isFilteringProjects = false;
let currentFilter = 'all';

// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.classList.add('hide');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1200);
});

// Typing Animation
const typingTexts = [
    "Software Test Engineer",
    "SDET Specialist", 
    "Automation QA Enthusiast",
    "Quality Assurance Professional",
    "Test Automation Expert",
    "CI/CD Integration Specialist"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeText() {
    const typingElement = document.getElementById('typingText');
    if (!typingElement) return;
    
    const currentText = typingTexts[textIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => {
            isDeleting = true;
        }, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
    }
    
    const typingSpeed = isDeleting ? 50 : 100;
    setTimeout(typeText, typingSpeed);
}

// Enhanced Project Filtering
function initProjectFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (isFilteringProjects) return;
            
            const filter = button.getAttribute('data-filter');
            if (filter === currentFilter) return;
            
            currentFilter = filter;
            isFilteringProjects = true;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Animate projects out
            projectCards.forEach((card, index) => {
                card.style.transition = 'all 0.4s ease';
                card.style.transform = 'translateY(30px) scale(0.9)';
                card.style.opacity = '0';
            });
            
            setTimeout(() => {
                // Filter and animate projects in
                projectCards.forEach((card, index) => {
                    const categories = card.getAttribute('data-category') || '';
                    const shouldShow = filter === 'all' || categories.includes(filter);
                    
                    if (shouldShow) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.transform = 'translateY(0) scale(1)';
                            card.style.opacity = '1';
                        }, index * 100);
                    } else {
                        card.style.display = 'none';
                    }
                });
                
                setTimeout(() => {
                    isFilteringProjects = false;
                }, 500);
            }, 400);
        });
    });
}

// Project Demo Functions
function openProjectDemo(demoType) {
    const demoData = {
        'selenium-demo': {
            title: 'Selenium Framework Demo',
            content: `
                <div class="demo-console">
                    <div class="console-header">
                        <span class="console-title">Test Execution Console</span>
                        <span class="console-status running">Running...</span>
                    </div>
                    <div class="console-output">
                        <div class="console-line success">✓ WebDriver initialized successfully</div>
                        <div class="console-line">→ Navigating to login page...</div>
                        <div class="console-line success">✓ Login page loaded</div>
                        <div class="console-line">→ Entering credentials...</div>
                        <div class="console-line success">✓ Authentication successful</div>
                        <div class="console-line">→ Running test suite...</div>
                        <div class="console-line success">✓ All 15 test cases passed</div>
                        <div class="console-line info">📊 Test Coverage: 95%</div>
                    </div>
                </div>
            `
        },
        'cypress-demo': {
            title: 'Cypress E2E Demo',
            content: `
                <div class="demo-console">
                    <div class="console-header">
                        <span class="console-title">Cypress Test Runner</span>
                        <span class="console-status running">Active</span>
                    </div>
                    <div class="console-output">
                        <div class="console-line">🚀 Starting Cypress...</div>
                        <div class="console-line success">✓ POM structure validated</div>
                        <div class="console-line">→ Executing user journey tests...</div>
                        <div class="console-line success">✓ Homepage elements verified</div>
                        <div class="console-line success">✓ Form submission working</div>
                        <div class="console-line success">✓ API integration tests passed</div>
                        <div class="console-line info">🎯 40 components tested successfully</div>
                    </div>
                </div>
            `
        },
        'api-demo': {
            title: 'API Testing Demo',
            content: `
                <div class="demo-console">
                    <div class="console-header">
                        <span class="console-title">API Test Execution</span>
                        <span class="console-status running">Testing</span>
                    </div>
                    <div class="console-output">
                        <div class="console-line">🔗 Connecting to API endpoints...</div>
                        <div class="console-line success">✓ GET /api/users - 200 OK</div>
                        <div class="console-line success">✓ POST /api/auth - 201 Created</div>
                        <div class="console-line success">✓ PUT /api/profile - 200 OK</div>
                        <div class="console-line success">✓ DELETE /api/session - 204 No Content</div>
                        <div class="console-line info">📈 100% API coverage achieved</div>
                        <div class="console-line info">⚡ Average response time: 145ms</div>
                    </div>
                </div>
            `
        }
    };
    
    const demo = demoData[demoType];
    if (demo) {
        showProjectModal(demo.title, demo.content);
    }
}

// Project Details Functions
function openProjectDetails(projectType) {
    const projectData = {
        'selenium-project': {
            title: 'RealTime Selenium Project - Technical Deep Dive',
            content: `
                <div class="project-details">
                    <h4>🎯 Project Overview</h4>
                    <p>Enterprise-grade Selenium automation framework built for scalable web application testing with comprehensive reporting and CI/CD integration.</p>
                    
                    <h4>🔧 Technical Architecture</h4>
                    <ul>
                        <li><strong>Framework:</strong> Page Object Model (POM) with Selenium WebDriver 4.x</li>
                        <li><strong>Language:</strong> Java 11+ with Maven build management</li>
                        <li><strong>Testing:</strong> TestNG for test execution and parallel testing</li>
                        <li><strong>Reporting:</strong> Allure Reports with screenshots and videos</li>
                        <li><strong>CI/CD:</strong> Jenkins pipeline with Docker containerization</li>
                    </ul>
                    
                    <h4>📊 Key Achievements</h4>
                    <div class="achievement-grid">
                        <div class="achievement-item">
                            <span class="achievement-value">95%</span>
                            <span class="achievement-label">Test Coverage</span>
                        </div>
                        <div class="achievement-item">
                            <span class="achievement-value">75%</span>
                            <span class="achievement-label">Time Reduction</span>
                        </div>
                        <div class="achievement-item">
                            <span class="achievement-value">50+</span>
                            <span class="achievement-label">Test Scenarios</span>
                        </div>
                    </div>
                    
                    <h4>🚀 Implementation Highlights</h4>
                    <ul>
                        <li>Cross-browser testing (Chrome, Firefox, Safari, Edge)</li>
                        <li>Parallel execution across multiple environments</li>
                        <li>Data-driven testing with Excel/CSV integration</li>
                        <li>Advanced wait strategies and element synchronization</li>
                        <li>Screenshot capture on test failures</li>
                        <li>Integration with JIRA for bug tracking</li>
                    </ul>
                </div>
            `
        },
        'cypress-project': {
            title: 'Cypress POM Framework - Modern E2E Testing',
            content: `
                <div class="project-details">
                    <h4>🎯 Project Overview</h4>
                    <p>Modern end-to-end testing framework using Cypress with clean Page Object Model architecture for maintainable and scalable test automation.</p>
                    
                    <h4>🔧 Technical Stack</h4>
                    <ul>
                        <li><strong>Framework:</strong> Cypress 12.x with TypeScript support</li>
                        <li><strong>Architecture:</strong> Page Object Model with command chaining</li>
                        <li><strong>Reporting:</strong> Mochawesome reports with screenshots</li>
                        <li><strong>Integration:</strong> GitHub Actions for automated testing</li>
                        <li><strong>Environment:</strong> Multi-environment configuration support</li>
                    </ul>
                    
                    <h4>📈 Performance Metrics</h4>
                    <div class="achievement-grid">
                        <div class="achievement-item">
                            <span class="achievement-value">98%</span>
                            <span class="achievement-label">Test Reliability</span>
                        </div>
                        <div class="achievement-item">
                            <span class="achievement-value">40+</span>
                            <span class="achievement-label">Components</span>
                        </div>
                        <div class="achievement-item">
                            <span class="achievement-value">5</span>
                            <span class="achievement-label">Modules</span>
                        </div>
                    </div>
                    
                    <h4>✨ Key Features</h4>
                    <ul>
                        <li>Real-time browser testing with visual feedback</li>
                        <li>Automatic waiting and retry mechanisms</li>
                        <li>Network traffic interception and mocking</li>
                        <li>Visual regression testing capabilities</li>
                        <li>Custom commands for common operations</li>
                        <li>Comprehensive test data management</li>
                    </ul>
                </div>
            `
        }
    };
    
    const project = projectData[projectType];
    if (project) {
        showProjectModal(project.title, project.content);
    }
}

// Modal Functions
function showProjectModal(title, content) {
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    modalTitle.textContent = title;
    modalBody.innerHTML = content;
    modal.style.display = 'block';
    
    // Add scroll lock
    document.body.style.overflow = 'hidden';
    
    // Close on escape key
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            closeProjectModal();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
    
    // Close on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeProjectModal();
        }
    });
}

function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

// Mobile Navigation
function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Smooth Scrolling
function smoothScrollTo(targetId) {
    const target = document.querySelector(targetId);
    if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Navigation Links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        smoothScrollTo(targetId);
        
        // Close mobile menu
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Navbar Scroll Effect
function handleNavbarScroll() {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Active Navigation Link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Scroll to Top Button
function handleScrollToTop() {
    if (window.scrollY > 500) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
}

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Enhanced Matrix Background Effect
function createMatrixEffect() {
    const canvas = document.getElementById('matrixCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*(){}[]<>TEST_AUTOMATION_SDET_PRINCE_RAJ';
    const lettersArray = letters.split('');
    
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    
    const drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100;
    }
    
    let frameCount = 0;
    
    function drawMatrix() {
        // Performance optimization: reduce opacity updates
        if (frameCount % 2 === 0) {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        
        ctx.fillStyle = '#00f5ff';
        ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;
        
        for (let i = 0; i < drops.length; i++) {
            const text = lettersArray[Math.floor(Math.random() * lettersArray.length)];
            const x = i * fontSize;
            const y = drops[i] * fontSize;
            
            // Add slight opacity variation
            ctx.globalAlpha = 0.8 + Math.random() * 0.2;
            ctx.fillText(text, x, y);
            
            if (y > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
        
        ctx.globalAlpha = 1;
        frameCount++;
    }
    
    setInterval(drawMatrix, 50);
}

// Enhanced Scroll-Rewind Reveal 2.0
function createIntersectionObserver() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Staggered animation delay
                entry.target.style.transitionDelay = `${index * 100}ms`;
                
                // Animate progress bars
                const progressBars = entry.target.querySelectorAll('.progress');
                progressBars.forEach(bar => {
                    const progress = bar.getAttribute('data-progress');
                    if (progress) {
                        setTimeout(() => {
                            bar.style.width = progress + '%';
                        }, 500);
                    }
                });
            } else {
                // Remove visible class when element scrolls out (scroll-rewind)
                entry.target.classList.remove('visible');
                
                // Reset progress bars
                const progressBars = entry.target.querySelectorAll('.progress');
                progressBars.forEach(bar => {
                    bar.style.width = '0%';
                });
            }
        });
    }, observerOptions);
    
    // Observe all sections and animated elements
    const animatedElements = document.querySelectorAll(
        '.about-text, .current-role-card, .skill-category, .project-card, .github-card, .cert-card, .timeline-item, .contact-info, .contact-links'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Enhanced Project Card Interactions
function enhanceProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        // Add progressive enhancement
        card.style.transitionDelay = `${index * 150}ms`;
        
        // Enhanced hover effects
        card.addEventListener('mouseenter', () => {
            // 3D tilt effect
            card.style.transform = 'translateY(-15px) scale(1.03) rotateX(5deg) rotateY(5deg)';
            card.style.boxShadow = '0 25px 50px rgba(0, 245, 255, 0.2), 0 0 0 1px rgba(0, 245, 255, 0.1)';
            
            // Enhance tech badges
            const techBadges = card.querySelectorAll('.tech-badge');
            techBadges.forEach((badge, i) => {
                setTimeout(() => {
                    badge.style.transform = 'translateY(-3px) scale(1.05)';
                }, i * 50);
            });
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
            
            // Reset tech badges
            const techBadges = card.querySelectorAll('.tech-badge');
            techBadges.forEach(badge => {
                badge.style.transform = '';
            });
        });
        
        // Add click ripple effect
        card.addEventListener('click', (e) => {
            const ripple = document.createElement('div');
            const rect = card.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: radial-gradient(circle, rgba(0, 245, 255, 0.3) 0%, transparent 70%);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
                z-index: 1;
            `;
            
            card.style.position = 'relative';
            card.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Resume Download Function
function downloadResume() {
    showNotification('🔥 Resume will be available soon! Building an impressive one for you!');
}

// Enhanced Notification System
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, #00f5ff, #ff6b6b);
        color: #000;
        padding: 1rem 2rem;
        border-radius: 8px;
        z-index: 10001;
        font-weight: 600;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 10px 30px rgba(0, 245, 255, 0.3);
        max-width: 300px;
        word-wrap: break-word;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Enhanced Skill Item Interactions
function enhanceSkillItems() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-5px) scale(1.1)';
            
            // Add glow effect to icon
            const icon = item.querySelector('i');
            if (icon) {
                icon.style.filter = 'drop-shadow(0 0 8px #00f5ff)';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
            
            // Remove glow effect
            const icon = item.querySelector('i');
            if (icon) {
                icon.style.filter = 'none';
            }
        });
    });
}

// Performance Optimization
function optimizePerformance() {
    // Reduce animations on slower devices
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        document.documentElement.style.setProperty('--animation-speed', '0.3s');
        
        // Disable heavy animations
        const heavyAnimations = document.querySelectorAll('.skill-category, .project-card');
        heavyAnimations.forEach(element => {
            element.style.animation = 'none';
        });
    }
    
    // Pause matrix animation when not visible
    let matrixPaused = false;
    document.addEventListener('visibilitychange', () => {
        if (document.hidden && !matrixPaused) {
            matrixPaused = true;
        } else if (!document.hidden && matrixPaused) {
            matrixPaused = false;
        }
    });
}

// Touch Gestures for Mobile
function initTouchGestures() {
    let startY = 0;
    let currentY = 0;
    
    document.addEventListener('touchstart', (e) => {
        startY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchmove', (e) => {
        currentY = e.touches[0].clientY;
        const diff = startY - currentY;
        
        // Add subtle parallax effect on mobile scroll
        if (Math.abs(diff) > 10) {
            const parallaxElements = document.querySelectorAll('.parallax-band');
            parallaxElements.forEach(element => {
                element.style.transform = `translateY(${diff * 0.1}px)`;
            });
        }
    });
}

// Konami Code Confetti Easter Egg
(() => {
    const seq = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','KeyB','KeyA'];
    let idx = 0;
    
    window.addEventListener('keydown', e => {
        if (e.code === seq[idx]) { 
            idx++; 
            if (idx === seq.length) { 
                boom(); 
                idx = 0; 
            } 
        } else { 
            idx = 0; 
        }
    });
    
    function boom() {
        import('https://cdn.skypack.dev/canvas-confetti').then(mod => {
            const confetti = mod.default;
            confetti({
                spread: 90,
                particleCount: 150,
                origin: { y: 0.6 }
            });
            showNotification('🎉 Konami Code activated! You found the SDET secret!');
        });
    }
})();

// Scroll Event Handler
function handleScroll() {
    handleNavbarScroll();
    updateActiveNavLink();
    handleScrollToTop();
}

// Initialize Everything
function init() {
    // Start typing animation
    setTimeout(typeText, 500);
    
    // Create matrix effect
    createMatrixEffect();
    
    // Set up intersection observer
    createIntersectionObserver();
    
    // Initialize project filtering
    initProjectFiltering();
    
    // Enhance skill items
    enhanceSkillItems();
    
    // Enhance project cards
    enhanceProjectCards();
    
    // Initialize touch gestures
    initTouchGestures();
    
    // Optimize performance
    optimizePerformance();
    
    // Add event listeners
    hamburger?.addEventListener('click', toggleMobileMenu);
    window.addEventListener('scroll', handleScroll);
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navMenu?.classList.remove('active');
            hamburger?.classList.remove('active');
        }
    });
    
    // Add staggered animation delays for better UX
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach((category, index) => {
        category.style.transitionDelay = `${index * 150}ms`;
    });
    
    const certCards = document.querySelectorAll('.cert-card');
    certCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 120}ms`;
    });
    
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 200}ms`;
    });
    
    // Welcome message
    setTimeout(() => {
        showNotification('🚀 Welcome to Prince Raj\'s Elite SDET Portfolio! Explore the interactive features!');
    }, 2000);
}

// Start when DOM is ready
document.addEventListener('DOMContentLoaded', init);

// Additional smooth scroll for any remaining links
document.addEventListener('click', (e) => {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        smoothScrollTo(targetId);
    }
});

// Add CSS animations for notifications and effects
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    @keyframes ripple {
        to { transform: scale(2); opacity: 0; }
    }
    
    .demo-console {
        background: #000;
        border-radius: 8px;
        padding: 1rem;
        font-family: 'JetBrains Mono', monospace;
        margin: 1rem 0;
    }
    
    .console-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid #333;
    }
    
    .console-title {
        color: #00f5ff;
        font-weight: 600;
    }
    
    .console-status {
        padding: 0.2rem 0.5rem;
        border-radius: 4px;
        font-size: 0.8rem;
        font-weight: 600;
    }
    
    .console-status.running {
        background: rgba(0, 255, 0, 0.2);
        color: #00ff00;
    }
    
    .console-output {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
    
    .console-line {
        color: #e2e8f0;
        font-size: 0.9rem;
        line-height: 1.4;
    }
    
    .console-line.success {
        color: #00ff00;
    }
    
    .console-line.info {
        color: #00f5ff;
    }
    
    .project-details h4 {
        color: #00f5ff;
        margin: 1.5rem 0 1rem 0;
        font-size: 1.2rem;
    }
    
    .project-details ul {
        margin: 1rem 0;
        padding-left: 1.5rem;
    }
    
    .project-details li {
        margin-bottom: 0.5rem;
        line-height: 1.6;
    }
    
    .achievement-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: 1rem;
        margin: 1rem 0;
    }
    
    .achievement-item {
        text-align: center;
        padding: 1rem;
        background: rgba(0, 245, 255, 0.1);
        border-radius: 8px;
        border: 1px solid rgba(0, 245, 255, 0.2);
    }
    
    .achievement-value {
        display: block;
        font-size: 1.5rem;
        font-weight: 700;
        color: #00f5ff;
        margin-bottom: 0.5rem;
    }
    
    .achievement-label {
        font-size: 0.9rem;
        color: #94a3b8;
    }
`;
document.head.appendChild(style);

// Make functions globally accessible
window.downloadResume = downloadResume;
window.openProjectDemo = openProjectDemo;
window.openProjectDetails = openProjectDetails;
window.closeProjectModal = closeProjectModal;

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            if (perfData && perfData.loadEventEnd > 3000) {
                console.log('⚡ Portfolio loaded in', perfData.loadEventEnd, 'ms');
            }
        }, 1000);
    });
}
