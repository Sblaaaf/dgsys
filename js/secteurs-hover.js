function initSecteurHover() {
    const triggers = document.querySelectorAll('.secteur-trigger-item');
    const previews = document.querySelectorAll('.secteur-preview-content');

    if (triggers.length === 0 || previews.length === 0) {
        return;
    }

    triggers.forEach(trigger => {
        trigger.addEventListener('mouseenter', () => {
            // 1. Récupérer la cible
            const targetId = trigger.dataset.target;
            const targetPreview = document.getElementById(targetId);

            if (!targetPreview) return;

            // 2. Désactiver tous les éléments actifs
            triggers.forEach(t => t.classList.remove('is-active'));
            previews.forEach(p => p.classList.remove('is-active'));

            // 3. Activer l'élément survolé et sa prévisualisation
            trigger.classList.add('is-active');
            targetPreview.classList.add('is-active');
        });
    });
}

export { initSecteurHover };