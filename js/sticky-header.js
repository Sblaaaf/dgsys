function initStickyHeader() {
    const siteHeader = document.querySelector('.site-header');
    const heroSection = document.querySelector('.hero-section');
    const topBar = document.querySelector('.header-top-bar');
    
    // si header absent > return
    if (!siteHeader) return;

    // Seuils différents pour l'activation et la désactivation du sticky
    const stickyThreshold = 10; // Seuil pour devenir sticky en descendant
    const unstickyThreshold = 10;  // Seuil pour redevenir normal en remontant

    // Si la top-bar est absente, on ajuste la position du header et de la hero section
    if (!topBar) {
        siteHeader.style.top = 'calc(2rem)';
        if (heroSection) {
            heroSection.style.top = 'calc(2rem)';
        }
    }

    let ticking = false;

    const handleScroll = () => {
        const isCurrentlySticky = siteHeader.classList.contains('is-sticky');
        const scrollY = window.scrollY;

        if (!isCurrentlySticky && scrollY > stickyThreshold) {
            siteHeader.classList.add('is-sticky');
            if (topBar) topBar.classList.add('is-hidden'); // On cache la top-bar
        } else if (isCurrentlySticky && scrollY <= unstickyThreshold) {
            siteHeader.classList.remove('is-sticky');
            if (topBar) topBar.classList.remove('is-hidden'); // On réaffiche la top-bar
        }
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
}

export { initStickyHeader };