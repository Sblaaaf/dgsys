export function initMetiersPremium() {
    const section = document.querySelector('#metiers-premium');
    if (!section) return;

    const triggerCards = section.querySelectorAll('.metier-trigger-card');
    const detailContainer = section.querySelector('#metier-detail-container');
    const detailTemplate = section.querySelector('#metier-detail-template');
    const dataElement = section.querySelector('#metiers-data');

    if (!triggerCards.length || !detailContainer || !detailTemplate || !dataElement) {
        console.error('Metiers Premium: Missing required elements.');
        return;
    }

    const metiersData = JSON.parse(dataElement.textContent);
    const metierKeys = Array.from(triggerCards).map(card => card.dataset.metier);
    let activeMetierKey = null;

    function updateView(metierKey, isInitial = false) {
        if (!metierKey || !metiersData[metierKey]) return;

        activeMetierKey = metierKey;

        // Mettre à jour la carte active
        triggerCards.forEach(card => {
            card.classList.toggle('is-active', card.dataset.metier === metierKey);
        });

        // Vider le conteneur et créer le nouveau panneau
        detailContainer.innerHTML = '';
        const panelClone = detailTemplate.content.cloneNode(true);
        const panel = panelClone.querySelector('.metier-detail-panel');
        const data = metiersData[metierKey];

        // Remplir le template avec les données
        panel.querySelector('.detail-image').src = data.image;
        panel.querySelector('.detail-image').alt = data.title;
        panel.querySelector('.detail-family-badge').textContent = data.family;
        panel.querySelector('.detail-title').textContent = data.title;
        panel.querySelector('.detail-subtitle').textContent = data.subtitle;
        panel.querySelector('.detail-description').textContent = data.description;
        panel.querySelector('.detail-icon').className = `detail-icon ${data.icon}`;
        
        const ctaButton = panel.querySelector('.detail-cta-button');
        ctaButton.href = data.url;

        // Remplir le témoignage
        if (data.testimonial) {
            panel.querySelector('.testimonial-avatar').src = data.testimonial.avatar;
            panel.querySelector('.testimonial-avatar').alt = `Avatar de ${data.testimonial.name}`;
            panel.querySelector('.testimonial-name').textContent = data.testimonial.name;
            panel.querySelector('.testimonial-text').textContent = data.testimonial.text;
            
            const ratingContainer = panel.querySelector('.testimonial-rating');
            ratingContainer.innerHTML = ''; // Vider les anciennes étoiles
            for (let i = 0; i < 5; i++) {
                const star = document.createElement('i');
                star.className = i < data.testimonial.rating ? 'fas fa-star' : 'far fa-star';
                ratingContainer.appendChild(star);
            }
        }

        const featuresList = panel.querySelector('.detail-features-list');
        featuresList.innerHTML = '';
        data.features.forEach(featureText => {
            const li = document.createElement('li');
            li.innerHTML = `<i class="fas fa-check-circle"></i><span>${featureText}</span>`;
            featuresList.appendChild(li);
        });

        // Remplir les métiers similaires
        const relatedGrid = panel.querySelector('.related-metiers-grid');
        if (relatedGrid) {
            const currentIndex = metierKeys.indexOf(metierKey);
            const relatedKeys = [];
            // On prend les 4 prochains métiers dans la liste
            for (let i = 1; i <= 4; i++) {
                const nextIndex = (currentIndex + i) % metierKeys.length;
                relatedKeys.push(metierKeys[nextIndex]);
            }

            relatedKeys.forEach(relatedKey => {
                const relatedData = metiersData[relatedKey];
                if (!relatedData) return;

                const miniCard = document.createElement('button');
                miniCard.className = 'metier-trigger-card metier-trigger-card--mini';
                miniCard.dataset.metier = relatedKey;
                miniCard.innerHTML = `
                    <i class="${relatedData.icon}"></i>
                    <h3>${relatedData.title}</h3>
                `;
                miniCard.addEventListener('click', () => updateView(relatedKey));
                relatedGrid.appendChild(miniCard);
            });
        }

        // Ajouter les écouteurs pour la navigation
        const prevBtn = panel.querySelector('.metiers-arrow.prev');
        const nextBtn = panel.querySelector('.metiers-arrow.next');

        prevBtn.addEventListener('click', () => navigate(-1));
        nextBtn.addEventListener('click', () => navigate(1));

        // Ajouter le panneau au DOM
        detailContainer.appendChild(panelClone);

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
                detailContainer.innerHTML = '';
                card.classList.remove('is-active');
            } else {
                updateView(metierKey);
            }
        });
    });

    // Associer l'image de fond à chaque carte pour l'effet de survol
    triggerCards.forEach(card => {
        const metierKey = card.dataset.metier;
        const data = metiersData[metierKey];
        if (data && data.image) {
            card.style.setProperty('--bg-image', `url(${data.image})`);
        }
    });

    // Optionnel: ouvrir le premier métier au chargement
    // updateView(metierKeys[0], true);
}

initMetiersPremium();