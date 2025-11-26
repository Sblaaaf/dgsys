export function initMetiersPremium() {
    const section = document.querySelector('#metiers-premium');
    if (!section) return;

    const triggerCards = section.querySelectorAll('.metier-trigger-card');
    const detailContainer = section.querySelector('#metier-detail-container');
    const detailPanels = section.querySelectorAll('.metier-detail-panel');
    const navControls = section.querySelector('.detail-controls');

    if (!triggerCards.length || !detailContainer || !detailPanels.length) {
        console.error('Metiers Premium: Missing required elements.');
        return;
    }

    const metierKeys = Array.from(triggerCards).map(card => card.dataset.metier);
    let activeMetierKey = null;
    let zIndexCounter = 2; // Démarrer le z-index à 2

    function updateView(metierKey, isInitial = false) {
        if (!metierKey) return;

        activeMetierKey = metierKey;

        // Mettre à jour la carte de déclenchement active
        triggerCards.forEach(card => {
            card.classList.toggle('is-active', card.dataset.metier === metierKey);
        });

        // Afficher le panneau de détails et les contrôles
        detailContainer.classList.add('is-visible');
        if (navControls) navControls.classList.add('is-visible');

        // Gérer la superposition des panneaux
        let activePanel = null;
        detailPanels.forEach(p => {
            if (p.dataset.metier === metierKey) {
                p.classList.add('is-active');
                p.style.zIndex = zIndexCounter++; // Incrémenter et assigner le nouveau z-index
                activePanel = p;
            } else {
                p.classList.remove('is-active'); // Ne retirer que si ce n'est pas le panneau actif
            }
        });

        if (!activePanel) return;

        // Gérer le carrousel des métiers similaires
        const scroller = activePanel.querySelector('.related-metiers-scroller');
        if (scroller) {
            const gridWrapper = scroller.querySelector('.related-metiers-grid-wrapper');
            const prevArrow = scroller.querySelector('.related-scroll-arrow.prev');
            const nextArrow = scroller.querySelector('.related-scroll-arrow.next');

            const updateArrows = () => {
                const maxScrollLeft = gridWrapper.scrollWidth - gridWrapper.clientWidth;
                prevArrow.disabled = gridWrapper.scrollLeft <= 0;
                nextArrow.disabled = gridWrapper.scrollLeft >= maxScrollLeft - 1; // -1 pour la précision
            };

            prevArrow.addEventListener('click', () => {
                gridWrapper.scrollLeft -= gridWrapper.clientWidth * 0.8;
            });

            nextArrow.addEventListener('click', () => {
                gridWrapper.scrollLeft += gridWrapper.clientWidth * 0.8;
            });

            gridWrapper.addEventListener('scroll', updateArrows);

            // Vérifier si le défilement est nécessaire et masquer les flèches si non
            // Utilise un petit délai pour s'assurer que le DOM est bien rendu
            setTimeout(() => {
                if (gridWrapper.scrollWidth <= gridWrapper.clientWidth) {
                    scroller.classList.add('no-scroll');
                    prevArrow.style.display = 'none';
                    nextArrow.style.display = 'none';
                }
                updateArrows();
            }, 100);
        }

        // Scroll vers le panneau si ce n'est pas le chargement initial
        if (!isInitial) {
            detailContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    function navigate(direction) {
        if (!activeMetierKey) return;

        const currentIndex = metierKeys.indexOf(activeMetierKey);
        const newIndex = (currentIndex + direction + metierKeys.length) % metierKeys.length;
        const newMetierKey = metierKeys[newIndex];
        
        updateView(newMetierKey);
    }

    // Écouteurs sur les cartes de sélection
    triggerCards.forEach(card => {
        card.addEventListener('click', () => {
            const metierKey = card.dataset.metier;
            if (metierKey === activeMetierKey) {
                // Si on clique sur la carte déjà active, on ferme le panneau
                activeMetierKey = null;
                card.classList.remove('is-active');
                detailContainer.classList.remove('is-visible');
                if (navControls) navControls.classList.remove('is-visible');
                // Réinitialiser tous les panneaux
                detailPanels.forEach(p => {
                    p.classList.remove('is-active');
                });
            } else {
                updateView(metierKey);
            }
        });
    });

    // Écouteurs sur les flèches de navigation centralisées
    if (navControls) {
        navControls.querySelector('.metiers-arrow.prev').addEventListener('click', () => navigate(-1));
        navControls.querySelector('.metiers-arrow.next').addEventListener('click', () => navigate(1));
    }

    // Initialisation : générer le contenu statique une seule fois
    function initializePanels() {
        const container = document.getElementById('metier-detail-container');
        container.innerHTML = ''; // Vider le conteneur au cas où

        // Cache tous les panneaux au début
        detailPanels.forEach(panel => {
            panel.classList.remove('is-active');
        });
    }

    // Optionnel: ouvrir le premier métier au chargement
    updateView(metierKeys[0], true);
}

initMetiersPremium();