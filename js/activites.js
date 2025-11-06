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
    const spiderContainer = document.querySelector('.spider-container');
    if (!spiderContainer) return;

    const spiderBody = spiderContainer.querySelector('.spider-body');
    const legLabels = spiderContainer.querySelectorAll('.leg-label');

    if (!spiderBody || legLabels.length === 0) return;

    legLabels.forEach(label => {
        // On écoute l'événement sur le parent 'spider-leg' pour une meilleure détection
        const leg = label.closest('.spider-leg');
        if (leg) {
            leg.addEventListener('mouseenter', () => {
                spiderBody.classList.add('is-leg-hovered');
            });
    
            leg.addEventListener('mouseleave', () => {
                spiderBody.classList.remove('is-leg-hovered');
            });
        }
    });
}