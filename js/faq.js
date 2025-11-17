export function initFaqAccordion() {
    const faqSection = document.querySelector('#faq');
    if (!faqSection) return;

    const accordionItems = faqSection.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');

        header.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');

            // Fermer tous les autres items
            accordionItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            // Ouvrir ou fermer l'item cliqué
            if (!isOpen) {
                item.classList.add('active');
            }
        });
    });
}