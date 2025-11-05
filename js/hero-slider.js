// Fonction d'initialisation du carrousel héros
function initHeroSlider() {
    const slider = document.getElementById('hero-slider');
    const captionContainer = document.getElementById('hero-captions');

    if (!slider || !captionContainer) return;

    const slides = slider.querySelectorAll('.hero-slide');
    const captions = captionContainer.querySelectorAll('.hero-caption');

    if (slides.length === 0 || slides.length !== captions.length) {
        console.warn("Hero Slider: Le nombre de slides et de légendes ne correspond pas.");
        return;
    }

    let currentSlide = 0;

    setInterval(() => {
        // 1. Gère les slides
        slides[currentSlide].classList.remove('is-active');
        // 2. Gère les légendes
        captions[currentSlide].classList.remove('is-active');
        
        // Calcule le prochain index
        currentSlide = (currentSlide + 1) % slides.length;
        
        // 3. Affiche la prochaine slide
        slides[currentSlide].classList.add('is-active');
        // 4. Affiche la prochaine légende
        captions[currentSlide].classList.add('is-active');
        
    }, 5000); // Change toutes les 5 secondes
}

// Exporte la fonction d'initialisation
export { initHeroSlider };