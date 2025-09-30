// ===== GLOBAL VARIABLES =====
let matrixInterval;
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize all components
    initLoadingScreen();
    initNavigation();
    initMatrixBackground();
    initTypingEffect();
    initScrollEffects();
    initProjectFilters();
    initSkillPopups();
    initProgressBars();
    initScrollToTop();
    initKonamiCode();
    initEasterEgg();
    
    // Add resize listener for responsive adjustments
    window.addEventListener('resize', handleResize);
}

// ===== LOADING SCREEN =====
function initLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    
    // Simulate loading time
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        
        // Remove from DOM after animation completes
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000);
}

// ===== NAVIGATION =====
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Scroll effect for navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active nav link based on scroll position
        updateActiveNavLink();
    });
    
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ===== MATRIX BACKGROUND =====
function initMatrixBackground() {
    const canvas = document.getElementById('matrixCanvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    function setCanvasSize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    setCanvasSize();
    
    // Matrix characters
    const matrixChars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
    const chars = matrixChars.split("");
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];
    
    // Initialize drops
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * canvas.height / fontSize);
    }
    
    // Draw function
    function draw() {
        // Semi-transparent black to create trail effect
        ctx.fillStyle = "rgba(10, 10, 15, 0.04)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = "#00f5ff";
        ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;
        
        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            // Reset drop to top when it reaches bottom or randomly
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            
            drops[i]++;
        }
    }
    
    // Start animation
    matrixInterval = setInterval(draw, 35);
    
    // Handle window resize
    window.addEventListener('resize', () => {
        setCanvasSize();
        // Reinitialize drops array with new column count
        drops.length = 0;
        for (let i = 0; i < columns; i++) {
            drops[i] = Math.floor(Math.random() * canvas.height / fontSize);
        }
    });
}

// ===== TYPING EFFECT =====
function initTypingEffect() {
    const typingText = document.getElementById('typingText');
    const texts = [
        "Senior Software Test Engineer",
        "Automation Specialist",
        "Quality Assurance Expert",
        "SDET Professional"
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            // Deleting text
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            // Typing text
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        // Check if text is complete
        if (!isDeleting && charIndex === currentText.length) {
            // Pause at end of text
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Move to next text
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500;
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Start typing effect after a short delay
    setTimeout(type, 1000);
}

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
    // Initialize Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Special handling for progress bars
                if (entry.target.classList.contains('progress')) {
                    const progress = entry.target.getAttribute('data-progress');
                    setTimeout(() => {
                        entry.target.style.width = `${progress}%`;
                    }, 300);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.project-card, .skill-category, .cert-card, .github-card, .stat, .progress');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// ===== PROJECT FILTERS =====
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Get filter value
            const filterValue = button.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category').includes(filterValue)) {
                    card.style.display = 'block';
                    // Trigger reflow for animation
                    setTimeout(() => {
                        card.classList.add('visible');
                    }, 10);
                } else {
                    card.classList.remove('visible');
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ===== SKILL POPUPS =====
function initSkillPopups() {
    const skillItems = document.querySelectorAll('.skill-item[data-skill]');
    
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            // Position the popup
            const popup = item.querySelector('.skill-projects-popup');
            const rect = item.getBoundingClientRect();
            
            // Check if popup would go off screen
            if (rect.left + popup.offsetWidth > window.innerWidth) {
                popup.style.left = 'auto';
                popup.style.right = '0';
            } else {
                popup.style.left = '0';
                popup.style.right = 'auto';
            }
        });
    });
}

// ===== PROGRESS BARS =====
function initProgressBars() {
    // Progress bars are animated via Intersection Observer in initScrollEffects
    // This function is kept for future enhancements
}

// ===== SCROLL TO TOP =====
function initScrollToTop() {
    const scrollButton = document.querySelector('.scroll-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollButton.classList.add('visible');
        } else {
            scrollButton.classList.remove('visible');
        }
    });
    
    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== KONAMI CODE EASTER EGG =====
function initKonamiCode() {
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.code);
        
        // Keep only the last 10 keys
        if (konamiCode.length > 10) {
            konamiCode.shift();
        }
        
        // Check if sequence matches
        if (konamiCode.length === konamiSequence.length) {
            let match = true;
            for (let i = 0; i < konamiSequence.length; i++) {
                if (konamiCode[i] !== konamiSequence[i]) {
                    match = false;
                    break;
                }
            }
            
            if (match) {
                activateKonamiEffect();
                konamiCode = []; // Reset
            }
        }
    });
}

function activateKonamiEffect() {
    // Create celebration effect
    const colors = ['#00f5ff', '#ff2d75', '#9d4edd', '#00ff9d', '#ffbd00'];
    const body = document.body;
    
    // Add celebration class to body
    body.classList.add('konami-celebration');
    
    // Create floating elements
    for (let i = 0; i < 50; i++) {
        createFloatingElement(colors);
    }
    
    // Play celebration sound (optional)
    // playCelebrationSound();
    
    // Remove celebration class after animation
    setTimeout(() => {
        body.classList.remove('konami-celebration');
    }, 5000);
    
    // Show notification
    showNotification('🎉 Konami Code Activated! SDET Powers Unleashed! 🎉');
}

function createFloatingElement(colors) {
    const element = document.createElement('div');
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = Math.random() * 20 + 10;
    
    element.style.position = 'fixed';
    element.style.width = `${size}px`;
    element.style.height = `${size}px`;
    element.style.backgroundColor = color;
    element.style.borderRadius = '50%';
    element.style.top = `${Math.random() * 100}vh`;
    element.style.left = `${Math.random() * 100}vw`;
    element.style.pointerEvents = 'none';
    element.style.zIndex = '9999';
    element.style.animation = `float-up ${Math.random() * 3 + 2}s ease-in forwards`;
    
    document.body.appendChild(element);
    
    // Remove element after animation
    setTimeout(() => {
        element.remove();
    }, 5000);
}

// ===== SDET BUG EASTER EGG =====
function initEasterEgg() {
    const sdetBug = document.querySelector('.sdet-bug-easter-egg');
    
    sdetBug.addEventListener('click', () => {
        // Create bug trail effect
        createBugTrail();
        
        // Show notification
        showNotification('🐛 Bug squashed! You found the SDET Easter Egg! 🐛');
    });
}

function createBugTrail() {
    const bug = document.querySelector('.sdet-bug-easter-egg');
    const trailCount = 10;
    
    for (let i = 0; i < trailCount; i++) {
        setTimeout(() => {
            const trail = bug.cloneNode(true);
            trail.style.position = 'fixed';
            trail.style.opacity = '0.5';
            trail.style.animation = `fade-out 1s ease-in forwards`;
            document.body.appendChild(trail);
            
            // Remove trail after animation
            setTimeout(() => {
                trail.remove();
            }, 1000);
        }, i * 100);
    }
}

// ===== PROJECT MODAL FUNCTIONS =====
function openProjectDetails(projectId) {
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    // Set modal content based on projectId
    // This is a simplified version - you would expand this with actual project data
    modalTitle.textContent = 'Project Details';
    modalBody.innerHTML = `
        <div class="project-details">
            <h4>Detailed information about ${projectId}</h4>
            <p>This would contain comprehensive details about the project, technologies used, challenges faced, and outcomes achieved.</p>
            <div class="detail-section">
                <h5>Key Features</h5>
                <ul>
                    <li>Feature 1</li>
                    <li>Feature 2</li>
                    <li>Feature 3</li>
                </ul>
            </div>
            <div class="detail-section">
                <h5>Technologies</h5>
                <div class="tech-tags">
                    <span class="tech-tag">Java</span>
                    <span class="tech-tag">Selenium</span>
                    <span class="tech-tag">TestNG</span>
                </div>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function openProjectDemo(demoId) {
    // This would open a project demo - implementation depends on your demo content
    showNotification(`🚀 Launching ${demoId} demo...`);
}

function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// ===== UTILITY FUNCTIONS =====
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.backgroundColor = 'var(--primary)';
    notification.style.color = 'var(--dark)';
    notification.style.padding = '1rem 1.5rem';
    notification.style.borderRadius = 'var(--border-radius)';
    notification.style.boxShadow = 'var(--shadow)';
    notification.style.zIndex = '10000';
    notification.style.fontWeight = '600';
    notification.style.transform = 'translateX(100%)';
    notification.style.transition = 'transform 0.3s ease';
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

function handleResize() {
    // Handle any resize-specific logic
    // Matrix background is already handled in its own function
}

// ===== RESUME DOWNLOAD =====
function downloadResume(event) {
    // Optional: Add analytics or tracking here
    console.log('Resume download initiated');
    
    // The actual download is handled by the HTML link
    // This function is kept for any additional functionality
}

// ===== CSS ANIMATIONS FOR KONAMI EFFECT =====
// Add CSS for Konami celebration
const konamiStyles = `
@keyframes float-up {
    0% {
        transform: translateY(0) rotate(0deg);
        opacity: 1;
    }
    100% {
        transform: translateY(-100vh) rotate(360deg);
        opacity: 0;
    }
}

@keyframes fade-out {
    0% {
        opacity: 0.5;
    }
    100% {
        opacity: 0;
    }
}

.konami-celebration {
    animation: color-pulse 0.5s ease-in-out 3;
}

@keyframes color-pulse {
    0% {
        filter: hue-rotate(0deg);
    }
    50% {
        filter: hue-rotate(180deg);
    }
    100% {
        filter: hue-rotate(360deg);
    }
}
`;

// Inject Konami styles into the document
const styleSheet = document.createElement('style');
styleSheet.textContent = konamiStyles;
document.head.appendChild(styleSheet);