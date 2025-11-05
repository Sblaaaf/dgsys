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