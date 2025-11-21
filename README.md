<p align="center">
  <a href="https://www.dgsys.fr/" target="_blank">
    <img src="https://www.dgsys.fr/wp-content/uploads/2021/10/logo-dgsys-2021-une-ligne.svg" width="400" alt="Logo DGSys">
  </a>
</p>

<h1 align="center">Projet de Refonte du Site Web DGSys</h1>

<p align="center">
  <!-- TODO: Remplacer les placeholders par les vrais badges -->
  <img src="https://img.shields.io/github/actions/workflow/status/votre-organisation/dgsys-website/ci.yml?branch=main&style=for-the-badge" alt="Build Status">
  <img src="https://img.shields.io/codecov/c/github/votre-organisation/dgsys-website?style=for-the-badge" alt="Code Coverage">
  <img src="https://img.shields.io/github/license/votre-organisation/dgsys-website?style=for-the-badge" alt="License">
</p>

Ce dépôt contient le code source et la documentation pour la refonte complète du site institutionnel de [DGSys](https://www.dgsys.fr/), expert en informatique industrielle, automatismes et systèmes embarqués.

L'objectif est de moderniser la présence en ligne de DGSys, d'améliorer l'expérience utilisateur (UX), d'optimiser les performances et de mieux refléter l'expertise et le dynamisme de l'entreprise à travers une plateforme web performante et maintenable.

## 📖 Table des matières

1.  [🎯 Objectifs](#-objectifs)
2.  [🎨 Identité Visuelle](#-identité-visuelle)
3.  [🛠️ Stack Technique](#️-stack-technique)
4.  [🚀 Démarrage Rapide](#-démarrage-rapide)
5.  [📁 Structure du Projet](#-structure-du-projet)
6.  [⚙️ Scripts Disponibles](#️-scripts-disponibles)
7.  [🤝 Contribution](#-contribution)
8.  [📄 Licence](#-licence)

---

## 🎯 Objectifs

-   **Design Moderne et Responsive :** Créer une interface utilisateur épurée, professionnelle et entièrement adaptable à tous les supports (ordinateurs, tablettes, mobiles).
-   **Expérience Utilisateur (UX) Optimisée :** Simplifier la navigation pour permettre un accès rapide et intuitif aux informations clés : expertises, réalisations, offres d'emploi, etc.
-   **Performance Accrue :** Mettre en œuvre les meilleures pratiques de développement web pour garantir des temps de chargement rapides et un score de performance élevé (Core Web Vitals).
-   **Mise en Valeur du Contenu :** Créer des modèles de page flexibles pour mieux présenter les projets, les études de cas et l'expertise technique de DGSys.
-   **Optimisation pour le Référencement (SEO) :** Structurer le code et le contenu pour maximiser la visibilité sur les moteurs de recherche.

## 🎨 Identité Visuelle

La refonte respecte et modernise la charte graphique de DGSys.

### Logo

Le logo officiel est utilisé comme point central de l'identité de la marque.

<img src="https://www.dgsys.fr/wp-content/uploads/2021/10/logo-dgsys-2021-une-ligne.svg" width="300">

### Palette de Couleurs

La palette principale s'articule autour des couleurs historiques de DGSys, avec des teintes de support pour garantir la lisibilité et l'accessibilité.

| Couleur | Hexadécimal | Usage |
| :--- | :--- | :--- |
| **Bleu DGSys** | `#003366` | Titres, éléments d'appel à l'action, icônes |
| **Cyan DGSys** | `#00A3E0` | Liens, accents, surlignages |
| **Gris Foncé** | `#333333` | Texte principal |
| **Gris Moyen** | `#767676` | Texte secondaire, métadonnées |
| **Gris Clair** | `#F2F2F2` | Arrière-plans de section |
| **Blanc** | `#FFFFFF` | Arrière-plans principaux, texte sur fond sombre |

### Typographie

La police de caractères principale est **Open Sans**, choisie pour son excellente lisibilité sur écran et son apparence à la fois moderne et professionnelle.

## 🛠️ Stack Technique

Ce projet est construit sur un ensemble de technologies modernes pour assurer performance, sécurité et maintenabilité.

-   **Framework Frontend :** Next.js (React)
-   **Styling :** Tailwind CSS
-   **Gestion de Contenu (CMS) :** Headless CMS (ex: Strapi, Sanity, ou WordPress en mode API)
-   **Déploiement :** Vercel / Netlify

## 🚀 Démarrage Rapide

Suivez ces étapes pour lancer une version de développement du projet sur votre machine locale.

1.  **Cloner le dépôt :**
    ```bash
    # Remplacez l'URL par celle de votre dépôt
    git clone https://github.com/[VOTRE_ORGANISATION]/[NOM_DU_DEPOT].git
    cd dgsys-website
    ```

2.  **Installer les dépendances :**
    Ce projet utilise `npm`.
    ```bash
    npm install
    ```

3.  **Configurer les variables d'environnement :**
    Créez un fichier `.env.local` à la racine du projet en copiant `.env.example` et en remplissant les valeurs requises.
    ```bash
    cp .env.example .env.local
    ```
    Exemple de contenu pour `.env.local` :
    ```env
    # URL de l'API du Headless CMS
    CMS_API_URL="https://votre-cms.com/api"
    CMS_API_TOKEN="votre-token-secret"

    # Autres variables d'environnement
    NEXT_PUBLIC_ANALYTICS_ID="UA-XXXXX-Y"
    ```

4.  **Lancer le serveur de développement :**
    ```bash
    npm run dev
    ```

Ouvrez http://localhost:3000 dans votre navigateur pour voir le résultat.

## 📁 Structure du Projet

Le projet suit une architecture classique pour une application Next.js.

```
/
├── components/     # Composants React réutilisables (boutons, cartes, etc.)
├── lib/            # Fonctions utilitaires, helpers, clients API
├── pages/          # Pages de l'application et routes (basé sur le système de fichiers)
├── public/         # Fichiers statiques (images, polices, favicons)
├── styles/         # Fichiers de styles globaux (ex: globals.css pour Tailwind)
└── ...             # Fichiers de configuration (next.config.js, tailwind.config.js, etc.)
```

## ⚙️ Scripts Disponibles

-   `npm run dev`: Lance l'application en mode développement.
-   `npm run build`: Compile l'application pour la production.
-   `npm run start`: Démarre un serveur de production.
-   `npm run lint`: Lance l'analyse statique du code avec ESLint.

## 🤝 Contribution
Les contributions qui améliorent le projet sont les bienvenues ! Pour contribuer :
1.  Forkez le dépôt.
2.  Créez une nouvelle branche pour votre fonctionnalité (`git checkout -b feature/nom-de-la-feature`).
3.  Commitez vos changements (`git commit -m 'Ajout de ...'`).
4.  Poussez votre branche (`git push origin feature/nom-de-la-feature`).
5.  Ouvrez une **Pull Request**.

Veuillez vous assurer que votre code respecte les standards de qualité du projet et passe les vérifications de `lint`. Pour des directives plus détaillées, veuillez consulter le fichier `CONTRIBUTING.md` (s'il existe).

## 📄 Licence
Ce projet est sous licence **Propriétaire**. Voir le fichier `LICENSE` pour plus de détails.
