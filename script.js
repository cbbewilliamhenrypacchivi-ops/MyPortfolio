// ========================================
// NAVEGACIÓN ACTIVA AL HACER SCROLL
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navBreakpoint = 960;
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // ========================================
    // SMOOTH SCROLL EN NAVEGACIÓN
    // ========================================
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }

            if (window.innerWidth <= navBreakpoint && navMenu) {
                navMenu.dataset.visible = 'false';
                navToggle?.setAttribute('aria-expanded', 'false');
            }
        });
    });

    function adjustNavVisibility() {
        if (!navMenu || !navToggle) return;
        if (window.innerWidth > navBreakpoint) {
            navMenu.dataset.visible = 'true';
            navToggle.setAttribute('aria-expanded', 'true');
        } else {
            navMenu.dataset.visible = 'false';
            navToggle.setAttribute('aria-expanded', 'false');
        }
    }

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            const isVisible = navMenu.dataset.visible === 'true';
            navMenu.dataset.visible = isVisible ? 'false' : 'true';
            navToggle.setAttribute('aria-expanded', String(!isVisible));
        });

        window.addEventListener('resize', adjustNavVisibility);
        adjustNavVisibility();
    }

    // ========================================
    // ANIMACIÓN AL HACER SCROLL (Intersection Observer)
    // ========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.animation = 'fadeInUp 0.6s ease-out';
            }
        });
    }, observerOptions);

    // Observar elementos con clase específica
    document.querySelectorAll('.work-card, .skill-card, .service-item').forEach(el => {
        observer.observe(el);
    });

    // ========================================
    // EFECTO PARALLAX EN HERO Y FOTO DE SOBRE MÍ
    // ========================================
    const hero = document.querySelector('.hero');
    const aboutImage = document.querySelector('.about-image');
    const aboutPlaceholder = aboutImage?.querySelector('.image-placeholder');
    const cursorEffectBreakpoint = 960;

    let heroMouseMoveHandler = null;
    let heroMouseLeaveHandler = null;
    let aboutMouseMoveHandler = null;

    function matchMediaQuery(query) {
        return typeof window.matchMedia === 'function' ? window.matchMedia(query).matches : true;
    }

    function shouldEnableCursorEffects() {
        return window.innerWidth > cursorEffectBreakpoint &&
            matchMediaQuery('(hover: hover)') &&
            matchMediaQuery('(pointer: fine)');
    }

    function handleHeroMouseMove(e) {
        if (!hero) return;
        const rect = hero.getBoundingClientRect();
        const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
        const yPercent = ((e.clientY - rect.top) / rect.height) * 100;
        hero.style.backgroundPosition = `${xPercent}% ${yPercent}%`;
    }

    function handleHeroMouseLeave() {
        if (!hero) return;
        hero.style.backgroundPosition = 'center';
    }

    function enableHeroParallax() {
        if (!hero || heroMouseMoveHandler) return;
        heroMouseMoveHandler = handleHeroMouseMove;
        heroMouseLeaveHandler = handleHeroMouseLeave;
        hero.addEventListener('mousemove', heroMouseMoveHandler);
        hero.addEventListener('mouseleave', heroMouseLeaveHandler);
    }

    function disableHeroParallax() {
        if (!hero || !heroMouseMoveHandler) return;
        hero.removeEventListener('mousemove', heroMouseMoveHandler);
        hero.removeEventListener('mouseleave', heroMouseLeaveHandler);
        heroMouseMoveHandler = null;
        heroMouseLeaveHandler = null;
        hero.style.backgroundPosition = 'center';
    }

    function handleAboutMouseMove(e) {
        if (!aboutImage || !aboutPlaceholder) return;
        const rect = aboutImage.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        const rotateX = (y - 0.5) * 10;
        const rotateY = (x - 0.5) * 10;

        aboutPlaceholder.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }

    function enableAboutParallax() {
        if (!aboutImage || !aboutPlaceholder || aboutMouseMoveHandler) return;
        aboutImage.style.perspective = '1000px';
        aboutMouseMoveHandler = handleAboutMouseMove;
        aboutImage.addEventListener('mousemove', aboutMouseMoveHandler);
    }

    function disableAboutParallax() {
        if (!aboutImage || !aboutPlaceholder || !aboutMouseMoveHandler) return;
        aboutImage.removeEventListener('mousemove', aboutMouseMoveHandler);
        aboutMouseMoveHandler = null;
        aboutPlaceholder.style.transform = 'rotateX(0) rotateY(0)';
    }

    function updateCursorEffects() {
        if (shouldEnableCursorEffects()) {
            enableHeroParallax();
            enableAboutParallax();
        } else {
            disableHeroParallax();
            disableAboutParallax();
        }
    }

    updateCursorEffects();
    window.addEventListener('resize', updateCursorEffects);

    // ========================================
    // ANIMACIONES DE NÚMEROS AL SCROLL
    // ========================================
    function animateOnScroll() {
        const elements = document.querySelectorAll('.work-card');
        
        elements.forEach((element, index) => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.style.animation = `scaleIn 0.6s ease-out ${index * 0.1}s both`;
            }
        });
    }

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Ejecutar al cargar

    // ========================================
    // EFECTO DE HOVER EN TARJETAS
    // ========================================
    document.querySelectorAll('.work-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });



    // ========================================
    // ANIMACIÓN DE CARGA INICIAL
    // ========================================
    window.addEventListener('load', function() {
        document.body.style.opacity = '1';
        
        const elements = document.querySelectorAll('.nav-link, .hero-content, .skill-card');
        elements.forEach((el, index) => {
            el.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s both`;
        });
    });

    // ========================================
    // DETECCIÓN DE NAVEGADOR OSCURO
    // ========================================
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.style.colorScheme = 'dark';
    }

    // ========================================
    // EVENT LISTENER PARA CAMBIOS DE TAMAÑO
    // ========================================
    window.addEventListener('resize', function() {
        const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        if (vw < 768) {
            // Ajustes para móvil si es necesario
        }
    });

    function setupToggleableCards(elements, { activeClass, ariaAttr, role = 'button' }) {
        if (!elements || !elements.length) return;

        elements.forEach(card => {
            card.setAttribute('role', role);
            card.setAttribute('tabindex', '0');
            card.setAttribute(ariaAttr, 'false');

            const toggleInfo = () => {
                const isVisible = card.classList.toggle(activeClass);
                card.setAttribute(ariaAttr, String(isVisible));
            };

            card.addEventListener('click', toggleInfo);

            card.addEventListener('keydown', event => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    toggleInfo();
                }
            });
        });
    }

    setupToggleableCards(document.querySelectorAll('.service-item'), {
        activeClass: 'info-visible',
        ariaAttr: 'aria-pressed'
    });

    setupToggleableCards(document.querySelectorAll('.skill-card'), {
        activeClass: 'info-visible',
        ariaAttr: 'aria-pressed'
    });

    setupToggleableCards(document.querySelectorAll('.best-work-card'), {
        activeClass: 'info-visible',
        ariaAttr: 'aria-expanded'
    });
});

// ========================================
// FUNCIÓN DE UTILIDAD PARA DETECTAR MOVIMIENTO
// ========================================
function handleMouseMove(e, target) {
    if (!target) return;
    
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;
    
    target.style.backgroundPosition = `${xPercent}% ${yPercent}%`;
}
