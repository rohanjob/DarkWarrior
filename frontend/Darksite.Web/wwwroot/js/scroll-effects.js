/**
 * DARKSITE - Scroll Effects & Parallax
 * GSAP-inspired scroll animations
 * Study Purpose Only
 */

(function () {
    'use strict';

    // Particle background generator
    function createParticles() {
        const particlesContainer = document.getElementById('particles-bg');
        if (!particlesContainer) return;

        const particleCount = 50;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';

            // Random position
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';

            // Random animation delay
            particle.style.animationDelay = Math.random() * 20 + 's';

            // Random size variation
            const size = 1 + Math.random() * 3;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';

            particlesContainer.appendChild(particle);
        }
    }

    // Parallax scroll effect
    function initParallax() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;

            // Parallax for hero section
            const hero = document.querySelector('.hero-content');
            if (hero) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
                hero.style.opacity = 1 - (scrolled / 800);
            }

            // Parallax for cards
            const cards = document.querySelectorAll('.card');
            cards.forEach((card, index) => {
                const cardTop = card.getBoundingClientRect().top;
                const cardVisible = cardTop < window.innerHeight;

                if (cardVisible) {
                    const delay = index * 0.1;
                    card.style.opacity = '1';
                    card.style.transform = `translateY(0)`;
                    card.style.transition = `all 0.6s ease ${delay}s`;
                }
            });
        });
    }

    // Glitch effect for headers
    function initGlitchEffect() {
        const glitchElements = document.querySelectorAll('.glitch');

        glitchElements.forEach(element => {
            setInterval(() => {
                // Random glitch trigger
                if (Math.random() > 0.95) {
                    element.style.animation = 'none';
                    setTimeout(() => {
                        element.style.animation = 'glitch-animation 0.3s';
                    }, 10);
                }
            }, 100);
        });
    }

    // Terminal typing effect
    function typewriterEffect(element, text, speed = 50) {
        let i = 0;
        element.innerHTML = '';

        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }

        type();
    }

    // Initialize all terminal typewriters
    function initTerminalEffects() {
        const terminals = document.querySelectorAll('.terminal-content[data-text]');

        terminals.forEach(terminal => {
            const text = terminal.getAttribute('data-text');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        typewriterEffect(terminal, text);
                        observer.unobserve(entry.target);
                    }
                });
            });

            observer.observe(terminal);
        });
    }

    // Smooth reveal on scroll
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.reveal');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, {
            threshold: 0.15
        });

        reveals.forEach(reveal => {
            observer.observe(reveal);
        });
    }

    // Cursor glow effect
    function initCursorGlow() {
        const cursor = document.createElement('div');
        cursor.className = 'cursor-glow';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(0, 255, 65, 0.3), transparent);
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
        `;
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
        });

        // Expand on click
        document.addEventListener('mousedown', () => {
            cursor.style.transform = 'scale(2)';
        });

        document.addEventListener('mouseup', () => {
            cursor.style.transform = 'scale(1)';
        });
    }

    // Matrix-style text rain (optional cool effect)
    function matrixRain() {
        const canvas = document.createElement('canvas');
        canvas.id = 'matrix-canvas';
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            opacity: 0.05;
        `;

        document.body.insertBefore(canvas, document.body.firstChild);

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const chars = '01';
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = Array(Math.floor(columns)).fill(1);

        function draw() {
            ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#00ff41';
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }

                drops[i]++;
            }
        }

        setInterval(draw, 33);
    }

    // Initialize all effects
    function init() {
        createParticles();
        initParallax();
        initGlitchEffect();
        initTerminalEffects();
        revealOnScroll();
        initCursorGlow();
        // matrixRain(); // Uncomment for matrix effect
    }

    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Export utilities
    window.DarksiteEffects = {
        typewriter: typewriterEffect,
        createParticles: createParticles
    };
})();
