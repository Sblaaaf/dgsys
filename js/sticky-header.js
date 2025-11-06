function initStickyHeader() {
    const siteHeader = document.querySelector('.site-header');
    const heroSection = document.querySelector('.hero-section');
    const topBar = document.querySelector('.header-top-bar');
    
    const scrollThreshold = 10; 

    // Si le header principal n'existe pas, on ne fait rien.
    if (!siteHeader) return;

    // Si la top-bar n'est pas présente, on ajuste la position du header principal
    // pour qu'il ne colle pas en haut de la page.
    if (!topBar) {
        // On simule la hauteur de la top-bar        
        siteHeader.style.top = 'calc(2rem)';
        heroSection.style.top = 'calc(2rem)';
    }

    const handleScroll = () => {
        if (window.scrollY > scrollThreshold) {
            siteHeader.classList.add('is-sticky');
            // On ne cache la top-bar que si elle existe.
            if (topBar) topBar.classList.add('is-hidden');
        } else {
            siteHeader.classList.remove('is-sticky');
            // On ne réaffiche la top-bar que si elle existe.
            if (topBar) topBar.classList.remove('is-hidden');
        }
    };

    window.addEventListener('scroll', handleScroll);
}

export { initStickyHeader };