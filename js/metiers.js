export function initMetiers() {
    const section = document.querySelector('#metiers-accordion');
    if (!section) return;
    const wrapper = section.querySelector('#metiers-cards-wrapper');
    const scrollContainer = section.querySelector('.metiers-scroll-container');
    const allCards = Array.from(section.querySelectorAll('.metier-card'));
    const masterCard = allCards[0]; // La première carte est la master card
    const carouselCards = allCards.slice(1); // Les autres cartes sont celles du carrousel
    const prevBtn = section.querySelector('.scroll-arrow.prev');
    const nextBtn = section.querySelector('.scroll-arrow.next');

    let activeCarouselCardIndex = 0; // Index de la carte active dans le tableau carouselCards

    // --- Calcul dynamique de la largeur des cartes ---
    function calculateAndSetCardWidths() {
        if (!wrapper || carouselCards.length === 0) return;

        const containerWidth = wrapper.clientWidth;
        const openCardWidth = 580; // Largeur de la carte métier ouverte
        const totalCards = allCards.length; // Master card + toutes les cartes métiers
        const carouselCardsCount = carouselCards.length; // Nombre de cartes métiers (hors master)

        // On récupère les valeurs de gap et margin depuis le CSS pour un calcul précis
        const gapStyle = window.getComputedStyle(wrapper).getPropertyValue('gap');
        const cardGap = parseFloat(gapStyle) || (0.7 * parseFloat(getComputedStyle(document.documentElement).fontSize)); // Fallback sur 0.7rem

        // La carte active a une marge de 0.9rem de chaque côté, donc 1.8rem au total
        const activeCardHorizontalMargin = (parseFloat(window.getComputedStyle(carouselCards[0]).marginLeft) || 0) * 2;

        // Calcul de l'espace total occupé par les espacements
        const totalGapSpace = (totalCards - 1) * cardGap;

        // Calcul de l'espace restant pour les cartes fermées
        // Espace total - largeur master - largeur carte ouverte - espace total des gaps - marge carte ouverte
        const occupiedWidth = masterCardWidthFixed + openCardWidth + totalGapSpace + activeCardHorizontalMargin;
        const availableWidthForClosedCards = containerWidth - occupiedWidth;

        // Calcul de la largeur d'une seule carte fermée
        const closedCarouselCardsCount = carouselCardsCount - 1; // Nombre de cartes métiers fermées
        let closedCardWidth = 0;
        if (closedCarouselCardsCount > 0) {
            closedCardWidth = availableWidthForClosedCards / closedCarouselCardsCount;
        }

        // On s'assure que la carte ne soit pas trop petite (sécurité)
        closedCardWidth = Math.max(closedCardWidth, 60); // 60px est le min-width défini en CSS

        // On applique la nouvelle largeur à toutes les cartes
        carouselCards.forEach((card) => {
            if (!card.classList.contains('is-active')) { // Si ce n'est pas la carte active du carrousel
                card.style.width = `${closedCardWidth}px`; // Applique la largeur calculée
            } else {
                card.style.width = ''; // Laisse le CSS gérer la largeur de la carte active
            }
        });
    }

    // --- Flèches de navigation ---
    function updateArrowState() {
        if (!wrapper || carouselCards.length === 0) return;
        const hasScroll = wrapper.scrollWidth > wrapper.clientWidth + 5;
        if (!hasScroll) {
            prevBtn.classList.add('is-disabled');
            nextBtn.classList.add('is-disabled');
            return;
        }
        prevBtn.classList.toggle('is-disabled', activeCarouselCardIndex === 0);
        nextBtn.classList.toggle('is-disabled', activeCarouselCardIndex === carouselCards.length - 1);
    }

    const scrollToCard = (index) => {
        // Empêche le scroll si l'index est invalide
        if (index < 0 || index >= carouselCards.length) return;

        const card = carouselCards[index];
        if (!card) return;

        // Calcul pour centrer la carte
        // On doit prendre en compte la masterCard pour le décalage initial
        const masterCardOffset = masterCard.offsetWidth + parseFloat(window.getComputedStyle(wrapper).getPropertyValue('gap'));
        const scrollLeft = card.offsetLeft - masterCardOffset - (wrapper.clientWidth / 2) + (card.offsetWidth / 2);

        wrapper.scrollTo({ left: scrollLeft, behavior: 'smooth' });
        setActiveCard(index);
    };

    if (prevBtn && nextBtn && wrapper) {
        prevBtn.addEventListener('click', () => scrollToCard(Math.max(0, activeCarouselCardIndex - 1)));
        nextBtn.addEventListener('click', () => scrollToCard(Math.min(carouselCards.length - 1, activeCarouselCardIndex + 1)));
        // Ajout des écouteurs de clic pour chaque carte
        carouselCards.forEach((card, index) => {
            card.addEventListener('click', () => scrollToCard(index));
        });
    }

    // --- Cartes actives ---
    const setActiveCard = (index) => {
        if (index === activeCarouselCardIndex) return;

        // On met à jour les classes
        carouselCards.forEach((card, i) => {
            card.classList.toggle('is-active', i === index);
            // On retire le style en ligne pour que le CSS de la carte active prenne le dessus
            card.style.width = '';
        });
        activeCarouselCardIndex = index;
        calculateAndSetCardWidths(); // Recalcule les largeurs après le changement
        updateArrowState();
    };

    // --- Scroll horizontal via molette ---
    let isMouseOverContainer = false;
    let isWheelThrottled = false;

    if (scrollContainer) {
        scrollContainer.addEventListener('mouseenter', () => {
            isMouseOverContainer = true;
            // Bloque le défilement vertical de la page tant que la souris est sur le conteneur
            document.body.style.overflow = 'hidden';
        });

        scrollContainer.addEventListener('mouseleave', () => {
            isMouseOverContainer = false;
            // Restaure le défilement vertical de la page
            document.body.style.overflow = '';
        });
    }

    window.addEventListener(
        'wheel',
        (e) => {
            // Si la souris n'est pas sur le conteneur ou si un scroll est déjà en cours, on ne fait rien.
            if (!isMouseOverContainer || isWheelThrottled) {
                return;
            }

            // Si on est au bout et qu'on continue de scroller dans la même direction, on ne bloque pas l'événement
            // (cela permettrait un scroll "chaîné" si on le souhaitait, mais ici on ne fait rien) (activeCardIndex est maintenant activeCarouselCardIndex)
            const isAtStart = activeCarouselCardIndex === 0;
            const isAtEnd = activeCarouselCardIndex === carouselCards.length - 1;
            const isScrollingUpAtStart = isAtStart && e.deltaY < 0; // Correction: activeCardIndex -> activeCarouselCardIndex
            const isScrollingDownAtEnd = isAtEnd && e.deltaY > 0;
            
            if (isScrollingUpAtStart || isScrollingDownAtEnd) {
                return;
            }

            // On ignore les scrolls horizontaux purs (trackpad)
            if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return; // Ignore scroll latéral pur

            e.preventDefault();
            isWheelThrottled = true; // Active le throttle

            const direction = e.deltaY > 0 ? 1 : -1;
            const nextIndex = Math.min(Math.max(activeCarouselCardIndex + direction, 0), carouselCards.length - 1);

            // Si la carte suivante est la même que la carte actuelle (on est au bout), on libère le scroll vertical
            if (nextIndex === activeCarouselCardIndex) { // On est au bout du carrousel
                isWheelThrottled = false; // Libère le throttle de la molette immédiatement
            } else {
                scrollToCard(nextIndex);
                // Libère le throttle de la molette après l'animation de scroll
                setTimeout(() => {
                    isWheelThrottled = false;
                }, 200); // Délai correspondant à l'animation de scroll
            }
        },
        { passive: false }
    );

    // --- Écouteurs pour les boutons de la master card ---
    const masterCardButtons = masterCard.querySelectorAll('.grid-master-buttons .btn');
    masterCardButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetIndex = parseInt(button.dataset.targetIndex, 10);
            scrollToCard(targetIndex);
        });
    });

    // Initialisation
    setActiveCard(0); // Active la première carte du carrousel et lance le premier calcul
    window.addEventListener('resize', () => {
        calculateAndSetCardWidths();
        updateArrowState();
    });
}
