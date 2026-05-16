document.addEventListener('DOMContentLoaded', () => {
    
    // Typing Animation for Roles
    const roles = [
        "Software Engineer.",
        "Machine Learning Engineer.",
        "Data Scientist.",
        "Data Analyst.",
        "Gen AI Engineer.",
        "Agentic AI Engineer.",
        "AI Engineer."
    ];
    
    const typingElement = document.querySelector('.typing-text');
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 100;
    let erasingDelay = 50;
    let newTextDelay = 2000;

    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingDelay = erasingDelay;
        } else {
            typingElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingDelay = 100; // randomise delay slightly for realism
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typingDelay = newTextDelay;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex++;
            if (roleIndex >= roles.length) {
                roleIndex = 0;
            }
            typingDelay = 500;
        }

        setTimeout(type, typingDelay);
    }

    // Start typing animation
    if(roles.length) setTimeout(type, newTextDelay + 250);

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mouse tracking for glowing cards
    const glowCards = document.querySelectorAll('.about-text, .experience-card, .project-card, .skill-category, .contact-card');
    
    glowCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // Global mouse tracking for dotted aura
    const globalGlow = document.getElementById('global-cursor-glow');
    if(globalGlow) {
        document.addEventListener('mousemove', e => {
            const x = e.clientX;
            const y = e.clientY;
            globalGlow.style.setProperty('--mouse-x', `${x}px`);
            globalGlow.style.setProperty('--mouse-y', `${y}px`);
        });
    }

    // Contact Modal Logic
    const sayHelloBtn = document.getElementById('say-hello-btn');
    const contactModal = document.getElementById('contact-modal');
    const closeModalBtn = document.querySelector('.close-modal');

    if(sayHelloBtn && contactModal) {
        sayHelloBtn.addEventListener('click', (e) => {
            e.preventDefault();
            contactModal.classList.add('show');
        });

        closeModalBtn.addEventListener('click', () => {
            contactModal.classList.remove('show');
        });

        // Close when clicking outside of modal content
        window.addEventListener('click', (e) => {
            if (e.target === contactModal) {
                contactModal.classList.remove('show');
            }
        });
    }
});
