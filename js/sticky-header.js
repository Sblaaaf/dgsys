function initStickyHeader() {
    const siteHeader = document.querySelector('.site-header');
    const topBar = document.querySelector('.header-top-bar');
    
    const scrollThreshold = 10; 

    if (!siteHeader || !topBar) return;

    const handleScroll = () => {
        if (window.scrollY > scrollThreshold) {
            siteHeader.classList.add('is-sticky');
            topBar.classList.add('is-hidden');
        } else {
            siteHeader.classList.remove('is-sticky');
            topBar.classList.remove('is-hidden');
        }
    };

    window.addEventListener('scroll', handleScroll);
}

export { initStickyHeader };