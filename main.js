// Importe toutes nos fonctions
import { loadPartials }                                 from './js/html-loader.js';
import { initMegamenu }                                 from './js/megamenu.js';
import { initMobileNav }                                from './js/mobile-nav.js';
import { initHeroSlider }                               from './js/hero-slider.js';
import { initStickyHeader }                             from './js/sticky-header.js';
import { initMetiers }                           from './js/metiers.js';
import { initActivitesAnimation, initActivitesSpider }  from './js/activites.js'; 
import { initFaqAccordion }                             from './js/faq.js';
import { initFonctionsAnimation, initFonctionsSpider }  from './js/fonctions.js';
import { initStatsCounter }                             from './js/stats.js';
import { initTarifs }                                   from './js/tarifs.js';
import { initSpiderActivitesMobile }                    from './js/spider_responsive.js';

// Attend que le DOM soit chargé
document.addEventListener('DOMContentLoaded', async () => {
    
    // 1. Charge tous les partiels HTML (header, footer, etc.)
    await loadPartials();
    
    // 2. Maintenant que le HTML est là, initialise les scripts
    initMegamenu();
    initMobileNav();
    initHeroSlider(); 
    initStickyHeader();
    initMetiers();
    initActivitesAnimation();
    initActivitesSpider();
    initFaqAccordion();
    initFonctionsAnimation();
    initFonctionsSpider();
    initStatsCounter();
    initTarifs();
    initSpiderActivitesMobile();

});