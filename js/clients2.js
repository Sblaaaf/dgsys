export function initClientAnimation() {
  const animationArea = document.getElementById('clients-animation-area');
  const cards = document.querySelectorAll('.client-card');

  if (!animationArea) {
    return;
  }

  let scrollY = 0;
  let mouseX = 0;
  let mouseY = 0;
  let areaCenterX = 0;
  let areaCenterY = 0;

  // Fonction pour mettre à jour les dimensions de la zone
  const updateAreaDimensions = () => {
    const areaRect = animationArea.getBoundingClientRect();
    areaCenterX = areaRect.left + areaRect.width / 2;
    areaCenterY = areaRect.top + areaRect.height / 2;
  };

  // Fonction unifiée pour appliquer les transformations
  const applyTransformations = () => {
    cards.forEach(card => {
      const speedX = parseFloat(card.dataset.speedX) || 0;
      const speedY = parseFloat(card.dataset.speedY) || 0;
      const speedRotate = parseFloat(card.dataset.speedRotate) || 0;

      // Calculs pour le scroll
      const scrollMoveX = scrollY * speedX;
      const scrollMoveY = scrollY * speedY;
      const scrollRotate = scrollY * speedRotate;

      // Calculs pour la souris (parallaxe)
      const mouseMoveX = mouseX * speedX;
      const mouseMoveY = mouseY * speedY;

      // On combine les deux translations
      const totalMoveX = scrollMoveX + mouseMoveX;
      const totalMoveY = scrollMoveY + mouseMoveY;

      card.style.transform = `translate(${totalMoveX}px, ${totalMoveY}px) rotate(${scrollRotate}deg)`;
    });
  };

  // Gestion du scroll
  window.addEventListener('scroll', () => {
    const areaRect = animationArea.getBoundingClientRect();
    scrollY = window.innerHeight - areaRect.top;
    applyTransformations();
  });

  // Gestion du mouvement de la souris
  animationArea.addEventListener('mousemove', (e) => {
    mouseX = e.clientX - areaCenterX;
    mouseY = e.clientY - areaCenterY;
    applyTransformations();
  });

  // Recalculer les dimensions au redimensionnement de la fenêtre
  window.addEventListener('resize', updateAreaDimensions);

  // Initialisation
  updateAreaDimensions();
  applyTransformations();
}