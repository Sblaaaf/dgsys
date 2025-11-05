// Fonction d'initialisation du menu mobile
function initMobileNav() {
    const mobileToggleBtn = document.getElementById('mobile-nav-toggle');
    const primaryNav = document.getElementById('primary-navigation');

    if (mobileToggleBtn && primaryNav) {
        mobileToggleBtn.addEventListener('click', function() {
            mobileToggleBtn.classList.toggle('is-open');
            primaryNav.classList.toggle('is-open');

            if (primaryNav.classList.contains('is-open')) {
                document.body.style.overflow = 'hidden';
                mobileToggleBtn.setAttribute('aria-expanded', 'true');
            } else {
                document.body.style.overflow = '';
                mobileToggleBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

// Exporte la fonction d'initialisation
export { initMobileNav };