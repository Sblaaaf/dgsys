export function initMetiersCarousel() {
    const section = document.querySelector('#metiers3-carousel');
    if (!section) return;

    const track = section.querySelector('.carousel-track');
    const wrapper = section.querySelector('.carousel-wrapper'); // Get the wrapper
    const cards = Array.from(section.querySelectorAll('.carousel-card'));
    const nextButton = section.querySelector('.carousel-arrow.next');
    const prevButton = section.querySelector('.carousel-arrow.prev');
    const showMasterCardBtn = section.querySelector('#show-master-card-btn');
    const masterCard = section.querySelector('.carousel-card.master-card');

    if (cards.length === 0) return;

    let activeIndex = 0; // Index dans le tableau des cartes *visibles*
    let isThrottled = false;
    const masterCardIndex = cards.findIndex(card => card.classList.contains('master-card'));

    // Retourne les cartes actuellement visibles
    function getVisibleCards() {
        return cards.filter(card => !card.classList.contains('is-hidden-by-user'));
    }

    function updateCarousel() {
        const visibleCards = getVisibleCards();
        const numCards = visibleCards.length;

        // Gère la visibilité du bouton "Choisir"
        showMasterCardBtn.classList.toggle('is-user-hidden', !masterCard.classList.contains('is-hidden-by-user'));

        // On itère sur les cartes visibles pour leur appliquer les classes
        visibleCards.forEach((card, i) => {
            // Retirer toutes les classes de position précédentes
            card.classList.remove('active', 'prev-1', 'next-1', 'prev-2', 'next-2', 'prev-3', 'next-3', 'hidden');

            // Calculer la différence par rapport à l'index actif
            let diff = i - activeIndex;

            // Gérer la boucle pour le carrousel circulaire
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

        // Ajuste dynamiquement la hauteur du conteneur
        const activeCardElement = visibleCards[activeIndex];
        if (activeCardElement && wrapper) {
            wrapper.style.height = `${activeCardElement.scrollHeight}px`;
        }
    }

    function navigate(direction) {
        const visibleCards = getVisibleCards();
        const numCards = visibleCards.length;
        if (numCards === 0) return;

        // Si on quitte la master-card, on la masque
        if (cards[activeIndex].classList.contains('master-card')) {
            masterCard.classList.add('is-hidden-by-user');
        }

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
            const visibleCards = getVisibleCards();
            const visibleIndex = visibleCards.indexOf(card);

            if (visibleIndex === -1 || visibleIndex === activeIndex) return;

            // Calcule la différence pour naviguer
            let diff = visibleIndex - activeIndex;
            if (Math.abs(diff) > visibleCards.length / 2) {
                diff = diff > 0 ? diff - visibleCards.length : diff + visibleCards.length;
            }
            navigate(diff);
        });
    });

    // Écouteur pour les liens internes de la master-card
    if (masterCard) {
        const masterLinks = masterCard.querySelectorAll('.master-card-link');
        masterLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();

                const targetDataIndex = parseInt(link.dataset.targetIndex, 10);
                const targetCard = cards.find(card => parseInt(card.dataset.index, 10) === targetDataIndex);

                if (!targetCard) return;

                // Masquer la master-card
                masterCard.classList.add('is-hidden-by-user');
                
                // Trouver le nouvel index de la carte cible dans la liste des cartes visibles
                const visibleCards = getVisibleCards();
                const newActiveIndex = visibleCards.indexOf(targetCard);

                if (newActiveIndex !== -1) {
                    activeIndex = newActiveIndex;
                }
                
                updateCarousel();
            });
        });
    }

    // --- Bouton "Choisir parmi tous les métiers" ---
    showMasterCardBtn.addEventListener('click', () => {
        masterCard.classList.remove('is-hidden-by-user');
        
        // Le nouvel index actif sera l'index de la master-card dans la liste maintenant complète
        const visibleCards = getVisibleCards();
        activeIndex = visibleCards.indexOf(masterCard);

        updateCarousel();
    });


    // Scroll avec la molette
    /* track.addEventListener('wheel', (e) => {
        if (isThrottled) return;
        isThrottled = true;

        
        if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) {
            isThrottled = false;
            return;
        }
        
        e.preventDefault();

        const direction = e.deltaY > 0 ? 1 : -1;
        navigate(direction);

        setTimeout(() => {
            isThrottled = false;
        }, 300);
    }, { passive: false }); */

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