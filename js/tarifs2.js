export function initTarifsV2() {
    const section = document.querySelector('#tarifs-v2');
    if (!section) return;
    
    const cardsGrid = section.querySelector('.tarifs-v2-grid');
    const cards = section.querySelectorAll('.tarif-card-v2');
    const billingSwitch = section.querySelector('#billing-switch');
    const priceElements = section.querySelectorAll('.price');
    const periodElements = section.querySelectorAll('.price-period');
    const billingLabels = section.querySelectorAll('.billing-label');
    // --- Logique du sélecteur de prix ---
    function updatePrices() {
        const isPurchase = billingSwitch.checked;
        const period = isPurchase ? 'purchase' : 'monthly';

        priceElements.forEach(el => {
            el.textContent = el.dataset[period];
        });

        periodElements.forEach(el => {
            el.textContent = el.dataset[period];
        });

        billingLabels.forEach(label => {
            label.classList.toggle('is-active', label.dataset.period === period);
        });
    }

    if (billingSwitch) {
        billingSwitch.addEventListener('change', updatePrices);
        // Initialiser la vue
        updatePrices();
    }

    // --- Logique de survol des cartes ---
    if (cards.length > 0 && cardsGrid) {
        const middleCard = cards[1]; // La carte centrale est la deuxième (index 1)

        // Fonction pour réinitialiser à l'état initial
        const resetToDefault = () => {
            cards.forEach(card => card.classList.remove('is-highlighted'));
            if (middleCard) {
                middleCard.classList.add('is-highlighted');
            }
        };

        // Appliquer l'état de survol
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                cards.forEach(c => c.classList.remove('is-highlighted'));
                card.classList.add('is-highlighted');
            });
        });

        // Réinitialiser quand la souris quitte la grille des cartes
        cardsGrid.addEventListener('mouseleave', () => {
            resetToDefault();
        });
    }

    // --- Logique pour l'animation au scroll ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                section.classList.add('is-visible');
                observer.unobserve(entry.target); // N'animer qu'une seule fois
            }
        });
    }, {
        threshold: 0.2 // Déclenche quand 20% de la section est visible
    });

    observer.observe(section);

}