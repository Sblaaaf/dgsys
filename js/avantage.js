function initAvantagesSection() {
    const section = document.getElementById('avantages');
    if (!section) return;

    const cards = Array.from(section.querySelectorAll('.stack .card-avantage'));

    function activate(cardToActivate) {
        // Si la carte est déjà ouverte, on ne fait rien (ou on pourrait la fermer)
        if (cardToActivate.classList.contains('expanded')) return;

        cards.forEach(c => {
            const isActive = (c === cardToActivate);
            c.classList.toggle('expanded', isActive);
            c.classList.toggle('collapsed', !isActive);
        });
    }

    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            activate(card);
        });
    });
}

export { initAvantagesSection };