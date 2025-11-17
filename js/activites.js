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
    const featureContents = section.querySelectorAll('.feature-detail-content');
    const spiderContainer = section.querySelector('.spider-container');

    if (!spiderLegs.length || !featureContents.length || !spiderContainer) return;

    const highlightFeature = (featureName) => {
        featureContents.forEach(content => {
            if (content.dataset.feature === featureName) {
                content.classList.add('is-active');
            } else {
                content.classList.remove('is-active');
            }
        });
    };

    spiderLegs.forEach(leg => {
        leg.addEventListener('mouseenter', () => {
            highlightFeature(leg.dataset.feature);
        });
    });

    spiderContainer.addEventListener('mouseleave', () => {
        // Optionnel: revenir au premier élément quand on quitte la zone
        featureContents.forEach((content, index) => {
            content.classList.toggle('is-active', index === 0);
        });
    });
}
