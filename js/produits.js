export function initProduits2() {
  const section = document.querySelector('.dgsys-product-showcase-light');
  if (!section) return;

  // === Config des produits ===
  const DGSYS_PRODUCTS = {
    caisse: {
      key: "caisse",
      label: "Caisse & logiciel",
      tag: "Pack complet DGsys",
      title: "Caisse tactile Aures & logiciel de caisse DGsys",
      text:
        "Une solution matérielle et logicielle conçue pour les métiers de bouche, la restauration et le commerce de détail : interface rapide, navigation intuitive, conformité fiscale et exports comptables prêts pour votre cabinet.",
      tags: [
        "Caisse tactile Aures",
        "Logiciel DGsys certifié",
        "Exports comptables intégrés"
      ],
      // HERO vidéo principale
      video:
        "https://www.dgsys.fr/wp-content/uploads/2025/11/1114_jCd6b7Ef.mp4",
      // VIGNETTE (mini carré à droite)
      thumb:
        "https://www.dgsys.fr/wp-content/uploads/2025/11/Firefly-une-video-du-produit-qui-tourne-sur-lui-meme-a-integrer-sur-mon-site-pour-une-presentation-p-1-1.mp4",
      thumbType: "video",
      features: [
        {
          title: "Interface pensée métier",
          text: "Écrans optimisés pour la boulangerie, la restauration et le commerce de détail."
        },
        {
          title: "Pilotage centralisé",
          text: "Statistiques, configuration et exports comptables depuis un même environnement."
        }
      ]
    },
    monnayeur: {
      key: "monnayeur",
      label: "Monnayeur automatique",
      tag: "Sécurisation des espèces",
      title: "Monnayeur automatique connecté à votre caisse",
      text:
        "Encaissement automatisé, rendu monnaie immédiat et hygiène renforcée : moins d’erreurs de caisse, plus de sécurité au comptoir.",
      tags: [
        "Encaissement sécurisé des espèces",
        "Rendu monnaie automatique",
        "Intégration directe à la caisse DGsys"
      ],
      video:
        "https://www.dgsys.fr/wp-content/uploads/2025/11/1114-1.mp4",
      thumb:
        "https://www.dgsys.fr/wp-content/uploads/2025/11/Firefly-une-video-du-produit-qui-tourne-sur-lui-meme-a-integrer-sur-mon-site-pour-une-presentation-p-2.mp4",
      thumbType: "video",
      features: [
        {
          title: "Sécurité & traçabilité",
          text: "Limite les écarts de caisse, réduit la manipulation d’espèces et sécurise le tiroir."
        },
        {
          title: "Flux en caisse accéléré",
          text: "Rendu monnaie automatique et files d’attente réduites en heures de pointe."
        }
      ]
    },
    balances: {
      key: "balances",
      label: "Balances connectées",
      tag: "Vente au poids",
      title: "Balances connectées pour la vente au poids",
      text:
        "Idéales pour la boulangerie, l’épicerie ou le snacking : la pesée remonte automatiquement dans la caisse DGsys pour une facturation sans erreur.",
      tags: [
        "Connexion directe à la caisse",
        "Conformité métrologique",
        "Étiquettes & affichage client"
      ],
      video: null,
      thumb: null,
      thumbType: "none",
      features: [
        {
          title: "Précision & conformité",
          text: "Balances conformes aux normes en vigueur, calibrées pour une pesée fiable."
        },
        {
          title: "Intégration caisse",
          text: "Remontée automatique du poids, du prix et du total dans votre logiciel DGsys."
        }
      ]
    },
    tpe: {
      key: "tpe",
      label: "TPE & paiement",
      tag: "Encaissement carte",
      title: "TPE & paiement sans friction",
      text:
        "Paiement carte, sans contact et mobile, avec remontée automatique des montants depuis la caisse vers le TPE pour un encaissement fluide.",
      tags: [
        "CB & sans contact",
        "Rapprochement simplifié",
        "Intégration Ingenico / Verifone…"
      ],
      video: null,
      thumb: null,
      thumbType: "none",
      features: [
        {
          title: "Expérience client fluide",
          text: "Paiement rapide, sans contact, compatible avec les nouveaux usages."
        },
        {
          title: "Caisse & banque alignées",
          text: "Montants synchronisés pour simplifier vos rapprochements bancaires."
        }
      ]
    }
  };

  const heroTitle = document.getElementById("hero-title");
  const heroText = document.getElementById("hero-text");
  const heroTags = document.getElementById("hero-tags");
  const heroMedia = document.getElementById("hero-media");
  const heroFeatures = document.getElementById("hero-features");
  const heroBadge = document.getElementById("hero-badge");
  const thumbnailsContainer = document.getElementById("dgsys-thumbnails");
  const hero = document.getElementById("dgsys-hero");

  if (!heroTitle || !thumbnailsContainer) return;

  const order = ["caisse", "monnayeur", "balances", "tpe"];
  let currentKey = "caisse";
  let autoRotate = true;
  let autoTimer = null;

  function renderHero(productKey) {
    const p = DGSYS_PRODUCTS[productKey];
    if (!p) return;

    hero.dataset.active = productKey;
    currentKey = productKey;

    heroTitle.textContent = p.title;
    heroText.textContent = p.text;

    heroBadge.textContent =
      productKey === "caisse" ? "PACK COMPLET DGSYS" : p.label.toUpperCase();

    heroTags.innerHTML = p.tags.map(tag => `<span>${tag}</span>`).join('');

    heroMedia.innerHTML = "";
    if (p.video) {
      heroMedia.innerHTML = `<video class="hero-video" src="${p.video}" autoplay muted loop playsinline></video>`;
    } else {
      heroMedia.innerHTML = `<div style="width:100%;height:260px;display:flex;align-items:center;justify-content:center;color:#e5e7eb;font-size:1.1rem;">Visuel produit DGsys</div>`;
    }

    heroFeatures.innerHTML = p.features.map(f => `
      <div class="hero-feature">
        <h4>${f.title}</h4>
        <p>${f.text}</p>
      </div>
    `).join('');
  }

  function renderThumbnails(activeKey) {
    thumbnailsContainer.innerHTML = Object.values(DGSYS_PRODUCTS).map(p => {
      const shortText = p.text.split(".")[0] + ".";
      let thumbHTML = `<div style="width:100%;height:90%;background:#111827;"></div>`;
      if (p.thumb && p.thumbType === "video") {
        thumbHTML = `<video src="${p.thumb}" autoplay muted loop playsinline></video>`;
      } else if (p.thumb) {
        thumbHTML = `<img src="${p.thumb}" alt="">`;
      }
      return `
        <article class="side-card ${p.key === activeKey ? 'is-active' : ''}" data-product="${p.key}">
          <div class="side-thumb">${thumbHTML}</div>
          <div class="side-card-header">
            <h4>${p.label}</h4>
            <p class="side-tag">${p.tag}</p>
          </div>
          <p class="side-text">${shortText}</p>
        </article>
      `;
    }).join('');
  }

  function nextProduct() {
    const idx = order.indexOf(currentKey);
    const nextIdx = (idx + 1) % order.length;
    setActiveProduct(order[nextIdx]);
  }

  function stopAutoRotate() {
    if (autoRotate) {
      autoRotate = false;
      clearInterval(autoTimer);
      autoTimer = null;
    }
  }

  function setActiveProduct(key) {
    if (!DGSYS_PRODUCTS[key] || key === currentKey) return;

    hero.style.transform = "translateX(20px) scale(0.98)";
    hero.style.opacity = "0";

    setTimeout(() => {
      renderHero(key);
      renderThumbnails(key);
      hero.style.transition = 'none';
      hero.style.transform = "translateX(-20px) scale(0.98)";
      void hero.offsetWidth;
      hero.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
      hero.style.transform = "translateX(0) scale(1)";
      hero.style.opacity = "1";
      currentKey = key;
    }, 300);
  }

  thumbnailsContainer.addEventListener("click", (e) => {
    const card = e.target.closest(".side-card");
    if (card) {
      stopAutoRotate();
      setActiveProduct(card.dataset.product);
    }
  });

  renderHero("caisse");
  renderThumbnails("caisse");

  autoTimer = setInterval(nextProduct, 4000);
}