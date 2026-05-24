document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Dark / Light Theme Controller ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    
    // Check local storage or system preferences
    const savedTheme = localStorage.getItem('portfolio-theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
    } else {
        const initialTheme = systemPrefersDark ? 'dark' : 'light';
        htmlElement.setAttribute('data-theme', initialTheme);
        localStorage.setItem('portfolio-theme', initialTheme);
    }
    
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('portfolio-theme', newTheme);
        
        // Dynamic micro-interaction effect on button click
        themeToggleBtn.style.transform = 'scale(0.8) rotate(45deg)';
        setTimeout(() => {
            themeToggleBtn.style.transform = 'none';
        }, 150);
    });

    // --- 2. Dynamic Typing Animation ---
    const typingElement = document.getElementById('typing-text');
    if (typingElement) {
        const words = ['Full Stack Developer', 'Backend Specialist', 'Mobile App Engineer', 'API Integrator'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        
        function type() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typingElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 150;
            }
            
            if (!isDeleting && charIndex === currentWord.length) {
                // Pause at complete word
                isDeleting = true;
                typingSpeed = 1500; 
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typingSpeed = 300; 
            }
            
            setTimeout(type, typingSpeed);
        }
        
        // Start typing after a short delay
        setTimeout(type, 500);
    }

    // --- 3. Mobile Navigation Drawer ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
            
            // Toggle hamburger icon animation
            const paths = mobileMenuBtn.querySelectorAll('path');
            if (navMenu.classList.contains('active')) {
                // Change to close icon
                paths[0].setAttribute('d', 'M18 6L6 18');
                paths[1].setAttribute('d', 'M6 6l12 12');
            } else {
                // Reset to hamburger
                paths[0].setAttribute('d', 'M3 12h18');
                paths[1].setAttribute('d', 'M3 6h18');
                // Re-append third path if exists
                if (paths.length < 3) {
                    const newPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                    newPath.setAttribute('d', 'M3 18h18');
                    mobileMenuBtn.querySelector('svg').appendChild(newPath);
                }
            }
        });
        
        // Close menu when clicking links
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                // Reset hamburger icon
                const paths = mobileMenuBtn.querySelectorAll('path');
                paths[0].setAttribute('d', 'M3 12h18');
                paths[1].setAttribute('d', 'M3 6h18');
            });
        });
    }

    // --- 4. Intersection Observer for Scroll Animations ---
    const animatedElements = document.querySelectorAll('.glass-card, .timeline-content, .education-card, .skill-category-card, .stat-card');
    
    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                observer.unobserve(entry.target); // Trigger only once
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach((el, index) => {
        // Add default fade transition properties in JS
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        el.style.transitionDelay = `${(index % 3) * 0.1}s`; // Stagger effect
        
        animationObserver.observe(el);
    });

    // Custom CSS injection for reveal animations
    const style = document.createElement('style');
    style.innerHTML = `
        .reveal-active {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        /* Mobile menu responsive drawer additions */
        @media (max-width: 768px) {
            .nav-menu {
                display: flex !important;
                flex-direction: column;
                position: fixed;
                top: var(--header-height);
                left: -100%;
                width: 100%;
                height: calc(100vh - var(--header-height));
                background: var(--bg-primary);
                padding: 40px 24px;
                gap: 24px;
                transition: var(--transition-smooth);
                z-index: 999;
                border-top: 1px solid var(--border-color);
            }
            .nav-menu.active {
                left: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // --- 5. Interactive Mock Terminal Typing ---
    // Runs after static typing triggers to populate values
    const devCodeElement = document.getElementById('dev-card-code-block');
    if (devCodeElement) {
        const codeLines = [
            '<span class="tag">const</span> developer = {',
            '    name: <span class="string">"Esakkiraja N"</span>,',
            '    role: <span class="string">"Full Stack Developer"</span>,',
            '    experience: <span class="key">3.1</span>, <span class="comment">// Years</span>',
            '    specialties: [',
            '        <span class="string">"PHP / CodeIgniter"</span>,',
            '        <span class="string">"Java / Spring Boot"</span>,',
            '        <span class="string">"Angular / Ionic / Svelte"</span>',
            '    ],',
            '    paymentGateways: <span class="key">true</span>,',
            '    CI_CD: <span class="string">"GitHub Actions & AWS"</span>',
            '};'
        ];
        
        let lineIdx = 0;
        devCodeElement.innerHTML = '';
        
        function renderCodeLine() {
            if (lineIdx < codeLines.length) {
                const lineDiv = document.createElement('div');
                lineDiv.innerHTML = codeLines[lineIdx];
                devCodeElement.appendChild(lineDiv);
                lineIdx++;
                setTimeout(renderCodeLine, 250);
            }
        }
        
        setTimeout(renderCodeLine, 1200);
    }

    // --- 6. Form Submission Micro-animation ---
    const contactForm = document.getElementById('portfolio-contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                <svg class="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                    <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
                    <path d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                Sending...
            `;
            
            // Injecting rotating spinner styles
            if (!document.getElementById('spin-style')) {
                const spinStyle = document.createElement('style');
                spinStyle.id = 'spin-style';
                spinStyle.innerHTML = `
                    @keyframes spin { 100% { transform: rotate(360deg); } }
                    .animate-spin { animation: spin 0.8s linear infinite; }
                `;
                document.head.appendChild(spinStyle);
            }
            
            setTimeout(() => {
                submitBtn.innerHTML = `
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Message Sent!
                `;
                submitBtn.style.background = 'linear-gradient(135deg, #22c55e 0%, #15803d 100%)';
                
                // Clear form
                contactForm.reset();
                
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                }, 3000);
            }, 1800);
        });
    }
});
