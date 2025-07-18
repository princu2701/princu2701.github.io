// DOM Elements
const loadingScreen = document.querySelector('.loading-screen');
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const scrollToTopBtn = document.querySelector('.scroll-to-top');

// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.classList.add('hide');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1000);
});

// Typing Animation
const typingTexts = [
    "Software Test Engineer",
    "SDET Specialist", 
    "Automation QA Enthusiast",
    "Quality Assurance Professional",
    "Test Automation Expert"
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

// Matrix Background Effect
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
    
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*(){}[]<>';
    const lettersArray = letters.split('');
    
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    
    const drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100;
    }
    
    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00f5ff';
        ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;
        
        for (let i = 0; i < drops.length; i++) {
            const text = lettersArray[Math.floor(Math.random() * lettersArray.length)];
            const x = i * fontSize;
            const y = drops[i] * fontSize;
            
            ctx.fillText(text, x, y);
            
            if (y > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(drawMatrix, 50);
}

// Intersection Observer for Animations
function createIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
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
    
    // Add event listeners
    hamburger.addEventListener('click', toggleMobileMenu);
    window.addEventListener('scroll', handleScroll);
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
    
    // Add staggered animation delays
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach((category, index) => {
        category.style.transitionDelay = `${index * 0.1}s`;
    });
    
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    const certCards = document.querySelectorAll('.cert-card');
    certCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.2}s`;
    });
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
