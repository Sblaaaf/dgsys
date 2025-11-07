export function initMetiersCarousel() {
    const section = document.querySelector('#metiers3-carousel');
    if (!section) return;

    const track = section.querySelector('.carousel-track');
    const wrapper = section.querySelector('.carousel-wrapper'); // Get the wrapper
    const cards = Array.from(section.querySelectorAll('.carousel-card'));
    const nextButton = section.querySelector('.carousel-arrow.next');
    const prevButton = section.querySelector('.carousel-arrow.prev');

    if (cards.length === 0) return;

    let activeIndex = 0;
    let isThrottled = false;

    // Function to update card positions and wrapper height
    function updateCarousel() {
        const numCards = cards.length;

        cards.forEach((card, i) => {
            // Retirer toutes les classes de position précédentes
            card.classList.remove('active', 'prev-1', 'next-1', 'prev-2', 'next-2', 'prev-3', 'next-3', 'hidden');

            // Calculer la différence par rapport à l'index actif
            let diff = i - activeIndex;

            // Gérer la boucle
            if (Math.abs(diff) > numCards / 2) {
                diff = diff > 0 ? diff - numCards : diff + numCards;
            }

            // Assigner la nouvelle classe de position
            switch (diff) {
                case 0:
                    card.classList.add('active');
                    break;
                case 1:
                    card.classList.add('next-1');
                    break;
                case -1:
                    card.classList.add('prev-1');
                    break;
                case 2:
                    card.classList.add('next-2');
                    break;
                case -2:
                    card.classList.add('prev-2');
                    break;
                case 3:
                    card.classList.add('next-3');
                    break;
                case -3:
                    card.classList.add('prev-3');
                    break;
                default:
                    card.classList.add('hidden');
                    break;
            }
        });

        // Dynamically adjust the carousel-wrapper height based on the active card
        const activeCardElement = cards[activeIndex];
        if (activeCardElement && wrapper) {
            // Add a buffer (e.g., 50px) for vertical centering and potential spacing
            // The active card is centered, so its height needs to fit within the wrapper
            wrapper.style.height = `${activeCardElement.offsetHeight + 50}px`;
        }
    }

    function navigate(direction) {
        const numCards = cards.length;
        activeIndex = (activeIndex + direction + numCards) % numCards;
        updateCarousel();
    }

    // --- Écouteurs d'événements ---

    // Flèches
    if (nextButton && prevButton) {
        nextButton.addEventListener('click', () => navigate(1));
        prevButton.addEventListener('click', () => navigate(-1));
    }

    // Clic sur les cartes
    cards.forEach((card, index) => {
        card.addEventListener('click', () => {
            // Si la carte cliquée est la master-card, on ne fait rien sur la carte elle-même,
            // la navigation se fera via les liens internes.
            if (card.classList.contains('master-card')) {
                // Si la master-card est déjà active, ne rien faire.
                if (index === activeIndex) return;
                // Sinon, la rendre active si elle n'est pas déjà.
                activeIndex = index;
                updateCarousel();
            } else {
                // Pour les cartes métiers, si on clique sur la carte déjà active, on ne fait rien.
                if (index === activeIndex) {
                    return;
                }
                // Sinon, la rendre active.
                activeIndex = index;
                updateCarousel();
            }
        });
    });

    // Écouteur pour les liens internes de la master-card
    const masterCard = section.querySelector('.carousel-card.master-card');
    if (masterCard) {
        const masterLinks = masterCard.querySelectorAll('.master-card-link');
        masterLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault(); // Empêche le comportement par défaut du lien
                const targetIndex = parseInt(link.dataset.targetIndex, 10);
                if (!isNaN(targetIndex) && targetIndex !== activeIndex) {
                    activeIndex = targetIndex;
                    updateCarousel();
                }
            });
        });
    }

    // Scroll avec la molette
    track.addEventListener('wheel', (e) => {
        if (isThrottled) return;
        isThrottled = true;

        // On ignore les scrolls horizontaux purs (trackpad)
        if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) {
            isThrottled = false;
            return;
        }
        
        e.preventDefault();

        const direction = e.deltaY > 0 ? 1 : -1;
        navigate(direction);

        setTimeout(() => {
            isThrottled = false;
        }, 300); // Délai pour éviter un défilement trop rapide
    }, { passive: false });

    // Touches clavier (gauche/droite)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            navigate(1);
        } else if (e.key === 'ArrowLeft') {
            navigate(-1);
        }
    });

    // Update carousel on window resize to adjust height dynamically
    window.addEventListener('resize', updateCarousel);

    // Initialisation
    updateCarousel();
}