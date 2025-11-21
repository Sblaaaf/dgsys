export function initMetiers() {
    const section = document.querySelector('#metiers');
    if (!section) return;

    const links = section.querySelectorAll('.metier-link');
    const cards = section.querySelectorAll('.metier-card');
    const nextButton = section.querySelector('.metiers-arrow.next');
    const prevButton = section.querySelector('.metiers-arrow.prev');

    if (links.length === 0 || cards.length === 0) return;

    let activeIndex = 0;

    function updateView(newIndex) {
        activeIndex = newIndex;

        // Mettre à jour la carte active
        cards.forEach((card, index) => {
            if (index === activeIndex) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });

        // Mettre à jour le lien actif dans la grille
        links.forEach((link, index) => {
            if (index === activeIndex) {
                link.classList.add('active-link');
            } else {
                link.classList.remove('active-link');
            }
        });
    }

    function navigate(direction) {
        const numCards = cards.length;
        const newIndex = (activeIndex + direction + numCards) % numCards;
        updateView(newIndex);
    }

    // --- Écouteurs d'événements ---

    // Clic sur les liens de la grille
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const newIndex = parseInt(link.dataset.index, 10);
            updateView(newIndex);
        });
    });

    // Clic sur les flèches de navigation
    if (nextButton && prevButton) {
        nextButton.addEventListener('click', () => navigate(1));
        prevButton.addEventListener('click', () => navigate(-1));
    }

    // Touches clavier (gauche/droite)
    document.addEventListener('keydown', (e) => {
        // S'assurer que l'interaction est pertinente (par ex, si la section est visible)
        if (!section.contains(document.activeElement) && section.getBoundingClientRect().top > window.innerHeight) return;

        if (e.key === 'ArrowRight') {
            navigate(1);
        } else if (e.key === 'ArrowLeft') {
            navigate(-1);
        }
    });

    // Initialisation
    updateView(0); // Affiche la première carte au chargement
}