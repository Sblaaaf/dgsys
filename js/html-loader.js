// on charge les partials
async function loadPartials() {
    // 1 Trouve les éléments [data-include]
    const elements = document.querySelectorAll('[data-include]');

    // 2 créer les arrays
    const promises = Array.from(elements).map(async (el) => {
        const file = el.getAttribute('data-include');
        try {
            // 3 Charge fichier
            const response = await fetch(file);
            if (!response.ok) {
                throw new Error(`Erreur: Fichier ${file} introuvable.`);
            }
            const html = await response.text();
            
            // 4 Affiche le contenu
            el.outerHTML = html;
        } catch (error) {
            console.error(`Erreur lors du chargement de ${file}:`, error);
            el.innerHTML = `<p style="color:red;">Erreur chargement partiel: ${file}</p>`;
        }
    });
    
    // 5 TOUS les fichiers chargés
    await Promise.all(promises);
}

// 6 go to main.js
export { loadPartials };