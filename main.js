// Importe toutes nos fonctions
import { loadPartials }                                 from './js/html-loader.js';
import { initMegamenu }                                 from './js/megamenu.js';
import { initMobileNav }                                from './js/mobile-nav.js';
import { initHeroSlider }                               from './js/hero-slider.js';
import { initStickyHeader }                             from './js/sticky-header.js';
import { initSecteurHover }                             from './js/secteurs-hover.js';
import { initMetiers }                                  from './js/metiers.js';
import { initMetiersPremium }                           from './js/metiers-premium.js';
import { initMetiers as initMetiers4 }                  from './js/metiers4.js'; 
import { initActivitesAnimation, initActivitesSpider }  from './js/activites.js'; 
import { initProduits2 }                                from './js/produits2.js';
import { initAvantagesSection }                         from './js/avantage.js';
import { initFaqAccordion }                             from './js/faq.js';
import { initFonctionsAnimation, initFonctionsSpider }  from './js/fonctions.js';
import { initStatsCounter }                             from './js/stats.js';
import { initTarifsV2 }                                 from './js/tarifs2.js';
// import { initClientAnimation }                          from './js/clients2.js';


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
    initMetiers4();
    initActivitesAnimation();
    initActivitesSpider();
    initAvantagesSection(); 
    initProduits2();
    initFaqAccordion();
    initFonctionsAnimation();
    initFonctionsSpider();
    initStatsCounter();
    initTarifsV2();
    // initClientAnimation();

});