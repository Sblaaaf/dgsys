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