export function initFonctionsAnimation() {
    const section = document.querySelector('#fonctions');
    if (!section) return;

    const spiderContainer = section.querySelector('.spider-container');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                spiderContainer.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 }); // Se déclenche quand 20% de la section est visible
    observer.observe(section);
}

export function initFonctionsSpider() {
    const section = document.querySelector('#fonctions');
    if (!section) return;

    const spiderLegs = section.querySelectorAll('.spider-leg');
    const detailsStorage = section.querySelector('.feature-details-storage');
    const featurePanel = section.querySelector('.feature-panel');
    const spiderContainer = section.querySelector('.spider-container');

    if (!spiderLegs.length || !detailsStorage || !featurePanel) return;

    const openPanel = (featureName) => {
        const contentToClone = detailsStorage.querySelector(`.feature-detail-content[data-feature="${featureName}"]`);
        const contentWrapper = featurePanel.querySelector('.panel-content-wrapper');

        if (contentToClone && contentWrapper) {
            // Vider le contenu précédent et injecter le nouveau
            contentWrapper.innerHTML = '';
            contentWrapper.appendChild(contentToClone.cloneNode(true));
        }
    };

    spiderLegs.forEach(leg => {
        leg.addEventListener('click', (e) => {
            e.preventDefault();

            // Si on clique sur la patte déjà active, on ne fait rien
            if (leg.classList.contains('is-panel-source')) return;

            const featureName = leg.dataset.feature;
            openPanel(featureName);

            // Mettre en évidence la patte source et retirer des autres
            spiderLegs.forEach(l => l.classList.remove('is-panel-source'));
            leg.classList.add('is-panel-source');

            // Indiquer qu'une patte est active pour le style
            section.classList.add('is-leg-active');
        });
    });

    // --- LOGIQUE DE NAVIGATION PAR FLÈCHES ---

    const orderedNavigableLegs = Array.from(section.querySelectorAll('.spider-leg'));

    const prevButtons = section.querySelectorAll('.prev-btn');
    const nextButtons = section.querySelectorAll('.next-btn');
    const firstLeg = section.querySelectorAll('.fonction_Start');

    // Si un bouton "Commencer" est présent, on l'utilise pour activer la première patte
    firstLeg.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            orderedNavigableLegs[0].click();
        });
    });

    const navigateTo = (direction) => {
        let currentIndex = orderedNavigableLegs.findIndex(leg => leg.classList.contains('is-panel-source'));

        // Cas initial : aucune patte n'est sélectionnée, on active la première ou la dernière.
        if (currentIndex === -1) {
            if (direction === 'next') {
                orderedNavigableLegs[0].click(); // Active la première patte
            } else { // 'prev'
                orderedNavigableLegs[orderedNavigableLegs.length - 1].click(); // Active la dernière patte
            }
            return;
        }

        const totalLegs = orderedNavigableLegs.length;
        let newIndex;

        if (direction === 'next') {
            newIndex = (currentIndex + 1) % totalLegs;
        } else {
            newIndex = (currentIndex - 1 + totalLegs) % totalLegs;
        }

        orderedNavigableLegs[newIndex].click();
    };

    nextButtons.forEach(btn => btn.addEventListener('click', () => navigateTo('next')));
    prevButtons.forEach(btn => btn.addEventListener('click', () => navigateTo('prev')));
}