export function initMetiers() {
    const section = document.querySelector('#metiers-accordion');
    if (!section) return;

    const layoutFlex = section.querySelector('.metiers-layout-flex');
    const wrapper = section.querySelector('#metiers-cards-wrapper');
    const scrollContainer = section.querySelector('.metiers-scroll-container');
    const cards = Array.from(section.querySelectorAll('.metier-card'));
    const prevBtn = section.querySelector('.scroll-arrow.prev');
    const nextBtn = section.querySelector('.scroll-arrow.next');

    let activeCardIndex = 0;

    // --- Flèches de navigation ---
    function updateArrowState() {
        if (!wrapper) return;
        const hasScroll = wrapper.scrollWidth > wrapper.clientWidth + 5;
        if (!hasScroll) {
            prevBtn.classList.add('is-disabled');
            nextBtn.classList.add('is-disabled');
            return;
        }
        prevBtn.classList.toggle('is-disabled', activeCardIndex === 0);
        nextBtn.classList.toggle('is-disabled', activeCardIndex === cards.length - 1);
    }

    const scrollToCard = (index) => {
        // Empêche le scroll si l'index est invalide
        if (index < 0 || index >= cards.length) return;

        const card = cards[index];
        if (!card) return;

        // Calcul pour centrer la carte
        const scrollLeft = card.offsetLeft - (wrapper.clientWidth / 2) + (card.offsetWidth / 2);

        wrapper.scrollTo({ left: scrollLeft, behavior: 'smooth' });
        setActiveCard(index);
        updateArrowState();

        // Le throttling est géré par l'appelant (wheel event ou click)
        // pour permettre une gestion plus fine de la libération du scroll vertical.
    };

    if (prevBtn && nextBtn && wrapper) {
        prevBtn.addEventListener('click', () => scrollToCard(Math.max(0, activeCardIndex - 1)));
        nextBtn.addEventListener('click', () => scrollToCard(Math.min(cards.length - 1, activeCardIndex + 1)));
        // Ajout des écouteurs de clic pour chaque carte
        cards.forEach((card, index) => {
            card.addEventListener('click', () => scrollToCard(index));
        });
    }

    // --- Cartes actives ---
    const setActiveCard = (index) => {
        if (index === activeCardIndex && cards[index].classList.contains('is-active')) return;
        cards.forEach((card, i) => card.classList.toggle('is-active', i === index));
        activeCardIndex = index;
    };
    setActiveCard(0);

    // --- Scroll horizontal via molette ---
    let isWheelThrottled = false; // Nouveau throttle spécifique à la molette
    let isScrollHijacked = false;
    let exitTimeout = null; // Pour gérer le délai de sortie

    window.addEventListener(
        'wheel',
        (e) => {
            if (!scrollContainer) return;

            const rect = scrollContainer.getBoundingClientRect();
            const viewportCenter = window.innerHeight / 2;
            const containerCenter = rect.top + rect.height / 2;

            // La zone d'activation est lorsque le centre du conteneur est très proche du centre du viewport
            const isCentered = Math.abs(containerCenter - viewportCenter) < 50; // Marge de 50px

            if (isCentered) {
                // Si on entre dans la zone, on annule toute tentative de sortie
                if (exitTimeout) {
                    clearTimeout(exitTimeout);
                    exitTimeout = null;
                }
                if (!isScrollHijacked) {
                    document.body.style.overflow = 'hidden';
                    isScrollHijacked = true;
                }
            } else {
                if (isScrollHijacked) {
                    // Si on quitte la zone, on ne libère pas le scroll immédiatement.
                    // On le fera au bout du carrousel.
                    // Mais si l'utilisateur s'éloigne beaucoup, on libère.
                    document.body.style.overflow = '';
                    isScrollHijacked = false;
                }
                return; // Si on n'est pas centré, on ne fait rien de plus
            }

            // Si le scroll n'est pas "hijacked" ou si la molette est en pause, on sort
            if (!isScrollHijacked || isWheelThrottled) {
                return;
            }

            // Libération du scroll si on est au bout et qu'on continue
            if ((activeCardIndex === 0 && e.deltaY < 0) || (activeCardIndex === cards.length - 1 && e.deltaY > 0)) {
                // On ajoute un délai avant de libérer le scroll vertical
                if (!exitTimeout) {
                    exitTimeout = setTimeout(() => {
                        document.body.style.overflow = '';
                        isScrollHijacked = false;
                        exitTimeout = null;
                    }, 600); // Délai de 600ms avant de quitter
                }
                return;
            }

            if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return; // Ignore scroll latéral pur

            e.preventDefault();
            isWheelThrottled = true; // Active le throttle

            let nextIndex = activeCardIndex;
            const direction = e.deltaY > 0 ? 1 : -1;
            nextIndex = Math.min(Math.max(activeCardIndex + direction, 0), cards.length - 1);

            // Si la carte suivante est la même que la carte actuelle (on est au bout), on libère le scroll vertical
            if (nextIndex === activeCardIndex) { // On est au bout du carrousel
                document.body.style.overflow = ''; // Libère le scroll vertical
                isScrollHijacked = false; // Désactive le hijacking
                isWheelThrottled = false; // Libère le throttle de la molette immédiatement
            } else {
                scrollToCard(nextIndex);
                // Libère le throttle de la molette après l'animation de scroll
                setTimeout(() => {
                    isWheelThrottled = false;
                }, 100); // Délai réduit pour un scroll plus réactif
            }
        },
        { passive: false }
    );

    updateArrowState();
    window.addEventListener('resize', updateArrowState);
}
