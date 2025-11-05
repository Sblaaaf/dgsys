// Fonction d'initialisation des megamenus
function initMegamenu() {
    
    // 1. Sélectionne TOUS les déclencheurs
    const triggers = document.querySelectorAll('[data-megamenu-trigger]');
    const megamenus = document.querySelectorAll('.megamenu');
    
    // 2. Fonction pour fermer tous les menus ouverts
    function closeAllMegamenus() {
        megamenus.forEach(menu => {
            menu.classList.remove('is-open');
        });
        triggers.forEach(trigger => {
            trigger.classList.remove('active');
        });
    }

    // 3. Ajoute un écouteur sur chaque déclencheur
    triggers.forEach(trigger => {
        const menuId = trigger.dataset.megamenuTrigger;
        const menu = document.getElementById(menuId);

        if (menu) {
            trigger.addEventListener('click', function(event) {
                event.preventDefault();
                
                // Vérifie s'il était déjà ouvert
                const wasOpen = menu.classList.contains('is-open');
                
                // Ferme tout
                closeAllMegamenus();
                
                // Si ce n'était pas celui qui était ouvert, on l'ouvre
                if (!wasOpen) {
                    menu.classList.add('is-open');
                    trigger.classList.add('active');
                }
            });
        }
    });

    // 4. Ferme tout si on clique n'importe où ailleurs
    document.addEventListener('click', function(event) {
        // Si le clic n'est ni sur un menu, ni sur un déclencheur...
        if (!event.target.closest('.megamenu') && !event.target.closest('[data-megamenu-trigger]')) {
            closeAllMegamenus();
        }
    });
}

// Exporte la fonction d'initialisation
export { initMegamenu };