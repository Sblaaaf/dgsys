export function initMetiers() {
    const section = document.querySelector('#metiers-accordion');
    if (!section) return;

    const wrapper = section.querySelector('#metiers-cards-wrapper');
    const cards = section.querySelectorAll('.metier-card');
    // Les flèches sont maintenant dans un conteneur parent
    const prevBtn = section.querySelector('.metiers-nav-arrows .scroll-arrow.prev');
    const nextBtn = section.querySelector('.metiers-nav-arrows .scroll-arrow.next');
    const filterBtns = section.querySelectorAll('.filter-btn');

    // --- Logique de défilement horizontal avec les flèches ---
    function updateArrowState() {
        if (!wrapper) return;
        // Utiliser un seuil pour être sûr que le scroll est significatif
        const hasScroll = wrapper.scrollWidth > wrapper.clientWidth + 5;

        if (!hasScroll) {
            prevBtn.classList.add('is-disabled');
            nextBtn.classList.add('is-disabled');
            return;
        }
        prevBtn.classList.toggle('is-disabled', wrapper.scrollLeft <= 0);
        nextBtn.classList.toggle('is-disabled', wrapper.scrollLeft >= wrapper.scrollWidth - wrapper.clientWidth - 1);
    }

    if (prevBtn && nextBtn && wrapper) {
        prevBtn.addEventListener('click', () => {
            wrapper.scrollBy({ left: -wrapper.clientWidth / 2, behavior: 'smooth' });
        });
        nextBtn.addEventListener('click', () => {
            wrapper.scrollBy({ left: wrapper.clientWidth / 2, behavior: 'smooth' });
        });
        wrapper.addEventListener('scroll', updateArrowState);
    }

    // --- Logique de filtrage ---
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('is-active'));
            btn.classList.add('is-active');
            const filter = btn.dataset.filter;

            cards.forEach(card => {
                const category = card.dataset.category;
                card.classList.toggle('is-hidden', filter !== 'all' && category !== filter);
            });
            // Mettre à jour l'état des flèches après le filtrage
            setTimeout(updateArrowState, 500); // Attendre la fin de la transition CSS
        });
    });

    // --- Logique de "Scroll Hijacking" (Bonus) ---
    let isScrollingHorizontally = false;
    const observer = new IntersectionObserver((entries) => {
        isScrollingHorizontally = entries.some(entry => entry.isIntersecting);
    }, { threshold: 0.6 }); // Se déclenche quand 60% de la section est visible

    observer.observe(section);

    window.addEventListener('wheel', (e) => {
        if (isScrollingHorizontally && wrapper.scrollWidth > wrapper.clientWidth) {
            // Si on scroll vers le bas (e.deltaY > 0) et qu'on n'est pas à la fin du scroll horizontal
            // OU si on scroll vers le haut (e.deltaY < 0) et qu'on n'est pas au début
            if ((e.deltaY > 0 && wrapper.scrollLeft < (wrapper.scrollWidth - wrapper.clientWidth - 1)) || (e.deltaY < 0 && wrapper.scrollLeft > 0)) {
                e.preventDefault(); // Empêche le scroll vertical de la page
                wrapper.scrollLeft += e.deltaY;
            }
        }
    }, { passive: false });

    // Initialiser l'état des flèches au chargement et au redimensionnement
    updateArrowState();
    window.addEventListener('resize', updateArrowState);
}
/*             wrapper.scrollLeft += e.deltaY;
        }
    }, { passive: false });

    // Initialiser l'état des flèches au chargement et au redimensionnement
    updateArrowState();
    window.addEventListener('resize', updateArrowState);
} */