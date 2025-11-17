// Importe toutes nos fonctions
import { loadPartials } from './html-loader.js';
import { initMegamenu } from './megamenu.js';
import { initMobileNav } from './mobile-nav.js';
import { initHeroSlider } from './hero-slider.js';
import { initStickyHeader } from './sticky-header.js';
import { initSecteurHover } from './secteurs-hover.js';
import { initMetiers } from './metiers.js';
import { initMetiersPremium } from './metiers2.js';
import { initMetiersCarousel } from './metiers3.js'; 
import { initActivitesAnimation } from './activites.js'; 
import { initProduits2 } from './produits2.js';
import { initAvantagesSection } from './avantage.js';
import { initFaqAccordion } from './faq.js';


// Attend que le DOM soit chargé
document.addEventListener('DOMContentLoaded', async () => {
    
    // 1. Charge tous les partiels HTML (header, footer, etc.)
    await loadPartials();
    
    // 2. Maintenant que le HTML est là, initialise les scripts
    initMegamenu();
    initMobileNav();
    initHeroSlider(); 
    initStickyHeader();
    initSecteurHover();
    initMetiers();
    initMetiersPremium();
    initActivitesAnimation();
    initAvantagesSection(); 
    initProduits2();
    initMetiersCarousel();
    initFaqAccordion();

});