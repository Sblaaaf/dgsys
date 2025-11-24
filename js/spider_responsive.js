/* ============================
   VERSION MOBILE (liste verticale)
   ============================ */

export function initSpiderActivitesMobile() {
    const section = document.querySelector('#activites');
    if (!section) return;

    const mobileLegs = section.querySelectorAll('.mobile-leg');
    const detailsStorage = section.querySelector('.feature-details-storage');
    const panelLeft = section.querySelector('.feature-panel-left');
    const panelRight = section.querySelector('.feature-panel-right');

    const openPanel = (featureName) => {
        const content = detailsStorage.querySelector(`[data-feature="${featureName}"]`);
        if (!content) return;

        const panel = panelLeft; // On utilise un seul panneau en mobile
        const wrapper = panel.querySelector('.panel-content-wrapper');

        wrapper.innerHTML = "";
        wrapper.appendChild(content.cloneNode(true));

        panel.classList.add('is-open');
    };

    const closeButtons = section.querySelectorAll('.close-panel-btn');
    closeButtons.forEach(btn =>
        btn.addEventListener('click', () => {
            panelLeft.classList.remove('is-open');
            panelRight.classList.remove('is-open');
        })
    );

    mobileLegs.forEach(btn =>
        btn.addEventListener('click', () => openPanel(btn.dataset.feature))
    );
}
