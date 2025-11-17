export function initActivitesAnimation() {
    const section = document.querySelector('#activites');
    if (!section) return;

    const spiderContainer = section.querySelector('.spider-container');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                spiderContainer.classList.add('is-visible');
                observer.unobserve(entry.target); // L'animation ne se joue qu'une fois
            }
        });
    }, { threshold: 0.3 }); // Se déclenche quand 30% de la section est visible

    observer.observe(section);
}

export function initActivitesSpider() {
    const section = document.querySelector('#activites');
    if (!section) return;

    const spiderLegs = section.querySelectorAll('.spider-leg');
    const detailsStorage = section.querySelector('.feature-details-storage');
    const panelLeft = section.querySelector('.feature-panel-left');
    const panelRight = section.querySelector('.feature-panel-right');
    const closeButtons = section.querySelectorAll('.close-panel-btn');
    const spiderContainer = section.querySelector('.spider-container');

    if (!spiderLegs.length || !detailsStorage || !panelLeft || !panelRight) return;

    const openPanel = (panel, featureName) => {
        const contentToClone = detailsStorage.querySelector(`.feature-detail-content[data-feature="${featureName}"]`);
        const contentWrapper = panel.querySelector('.panel-content-wrapper');

        if (contentToClone && contentWrapper) {
            // Vider le contenu précédent et injecter le nouveau
            contentWrapper.innerHTML = '';
            contentWrapper.appendChild(contentToClone.cloneNode(true));

            // Fermer l'autre panneau s'il est ouvert
            const otherPanel = (panel === panelLeft) ? panelRight : panelLeft;
            otherPanel.classList.remove('is-open');
            
            // Ouvrir le panneau
            panel.classList.add('is-open');

            // Gérer les classes sur le conteneur principal
            if (panel === panelLeft) {
                spiderContainer.classList.add('left-panel-active');
                spiderContainer.classList.remove('right-panel-active');
            } else {
                spiderContainer.classList.add('right-panel-active');
                spiderContainer.classList.remove('left-panel-active');
            }
        }
    };

    const closeAllPanels = () => {
        panelLeft.classList.remove('is-open');
        panelRight.classList.remove('is-open');
        spiderContainer.classList.remove('left-panel-active', 'right-panel-active');
        spiderLegs.forEach(leg => leg.classList.remove('is-panel-source'));
    };

    spiderLegs.forEach(leg => {
        leg.addEventListener('click', (e) => {
            e.preventDefault();
            const featureName = leg.dataset.feature;
            const isLeftGroup = leg.closest('.spider-legs-group').classList.contains('group-left');

            if (isLeftGroup) {
                openPanel(panelRight, featureName);
            } else {
                openPanel(panelLeft, featureName);
            }

            // Mettre en évidence la patte source et retirer des autres
            spiderLegs.forEach(l => l.classList.remove('is-panel-source'));
            leg.classList.add('is-panel-source');
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', closeAllPanels);
    });
}
