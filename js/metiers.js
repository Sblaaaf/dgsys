export function initMetiers() {
    const section = document.querySelector('#metiers-accordion');
    if (!section) return;

    const layoutFlex = section.querySelector('.metiers-layout-flex');
    const wrapper = section.querySelector('#metiers-cards-wrapper');
    const cards = section.querySelectorAll('.metier-card');
    // Les flèches sont maintenant dans un conteneur parent
    const prevBtn = section.querySelector('.scroll-arrow.prev');
    const nextBtn = section.querySelector('.scroll-arrow.next');

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
        // Calcul dynamique de la distance de défilement
        const getScrollAmount = () => {
            const firstCard = wrapper.querySelector('.metier-card');
            if (!firstCard) return wrapper.clientWidth / 2; // Fallback

            const gap = parseFloat(getComputedStyle(wrapper).gap) || 16; // 1rem = 16px par défaut
            return firstCard.offsetWidth + gap;
        };

        prevBtn.addEventListener('click', () => {
            wrapper.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
        });
        nextBtn.addEventListener('click', () => {
            wrapper.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
        });
        wrapper.addEventListener('scroll', updateArrowState);
    }

    // --- Logique d'ouverture/fermeture des cartes au clic (supprimée pour revenir au hover CSS) ---
    // Plus rien à faire ici, tout est géré par le CSS avec :hover

    // --- Logique de "Scroll Hijacking" (Bonus) ---
    let isScrollingHorizontally = false;

    // Détecte si la souris est sur la zone de scroll pour activer le défilement horizontal
    layoutFlex.addEventListener('mouseenter', () => isScrollingHorizontally = true);
    layoutFlex.addEventListener('mouseleave', () => isScrollingHorizontally = false);

    window.addEventListener('wheel', (e) => {
        if (isScrollingHorizontally && wrapper.scrollWidth > wrapper.clientWidth) {
            // Si on scroll vers le bas (e.deltaY > 0) et qu'on n'est pas à la fin du scroll horizontal
            // OU si on scroll vers le haut (e.deltaY < 0) et qu'on n'est pas au début du scroll horizontal,
            // ALORS on empêche le scroll vertical et on scroll horizontalement.
            const atStart = wrapper.scrollLeft <= 0;
            const atEnd = wrapper.scrollLeft >= wrapper.scrollWidth - wrapper.clientWidth - 1;
            if (! ( (e.deltaY < 0 && atStart) || (e.deltaY > 0 && atEnd) ) ) {
                e.preventDefault();
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