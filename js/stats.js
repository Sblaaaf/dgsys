export function initStatsCounter() {
    const statsSection = document.querySelector('.stats-section');
    if (!statsSection) return;

    const animateValue = (element, start, end, duration, decimals) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            let currentValue = progress * (end - start) + start;

            // Gérer les nombres décimaux
            if (decimals > 0) {
                element.innerHTML = currentValue.toFixed(decimals);
            } else {
                element.innerHTML = Math.floor(currentValue);
            }

            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                // Assurer que la valeur finale est exacte
                element.innerHTML = end.toFixed(decimals);
            }
        };
        window.requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statValues = entry.target.querySelectorAll('.stat-value');
                statValues.forEach(stat => {
                    const value = parseFloat(stat.dataset.value);
                    const decimals = parseInt(stat.dataset.decimals) || 0;
                    animateValue(stat, 0, value, 2000, decimals);
                });
                // On arrête d'observer une fois l'animation lancée
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 }); // Se déclenche quand 50% de la section est visible

    observer.observe(statsSection);
}