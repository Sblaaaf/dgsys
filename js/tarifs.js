export function initTarifs() {
    const section = document.querySelector('#tarifs');
    if (!section) return;
    
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
    };

}