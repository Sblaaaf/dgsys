export function initClientAnimation() {
  const animationArea = document.getElementById('clients-animation-area');
  if (!animationArea) return;
  
  const cards = animationArea.querySelectorAll('.client-card');
  if (cards.length === 0) return;
  
  let areaRect = animationArea.getBoundingClientRect();
  let mouseX = 0;
  let mouseY = 0;
  let isTicking = false;
  
  // Met à jour les dimensions de la zone d'animation
  const updateDimensions = () => {
    areaRect = animationArea.getBoundingClientRect();
  };
  
  // Calcule et applique les transformations
  const applyTransformations = () => {
    // Calcul de la progression du scroll par rapport à la zone visible
    // 0 = le haut de la zone atteint le bas de la fenêtre, 1 = le bas de la zone atteint le haut de la fenêtre
    const scrollProgress = (window.innerHeight - areaRect.top) / (window.innerHeight + areaRect.height);
  
    // Centre de la zone pour le calcul de la parallaxe de la souris
    const areaCenterX = areaRect.left + areaRect.width / 2;
    const areaCenterY = areaRect.top + areaRect.height / 2;
  
    // Calcul de la position de la souris par rapport au centre de la zone
    const mouseOffsetX = mouseX - areaCenterX;
    const mouseOffsetY = mouseY - areaCenterY;
  
    cards.forEach(card => {
      const speedX = parseFloat(card.dataset.speedX) || 0;
      const speedY = parseFloat(card.dataset.speedY) || 0;
      const speedRotate = parseFloat(card.dataset.speedRotate) || 0;
  
      // Mouvement basé sur le scroll (déplacement plus important)
      // On utilise une valeur arbitraire (ex: 300) pour amplifier le mouvement
      const scrollMoveX = speedX * scrollProgress * 300;
      const scrollMoveY = speedY * scrollProgress * 300;
      const scrollRotate = speedRotate * scrollProgress * 360;
  
      // Mouvement de parallaxe basé sur la souris (déplacement plus subtil)
      const mouseMoveX = mouseOffsetX * speedX * 0.5;
      const mouseMoveY = mouseOffsetY * speedY * 0.5;
  
      // Combinaison des deux mouvements
      const totalMoveX = scrollMoveX + mouseMoveX;
      const totalMoveY = scrollMoveY + mouseMoveY;
  
      card.style.transform = `translate(${totalMoveX}px, ${totalMoveY}px) rotate(${scrollRotate}deg)`;
    });
  
    isTicking = false;
  };
  
  // Demande une frame d'animation pour éviter les recalculs excessifs
  const requestTick = () => {
    if (!isTicking) {
      requestAnimationFrame(applyTransformations);
      isTicking = true;
    }
  };
  
  // Écouteur pour le scroll
  const onScroll = () => {
    // On met à jour les dimensions ici car la position de l'élément change avec le scroll
    updateDimensions();
    requestTick();
  };
  
  // Écouteur pour le mouvement de la souris
  const onMouseMove = (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    requestTick();
  };
  
  // Écouteur pour le redimensionnement de la fenêtre
  const onResize = () => {
    updateDimensions();
    requestTick();
  };
  
  // Attache les écouteurs d'événements
  window.addEventListener('scroll', onScroll, { passive: true });
  animationArea.addEventListener('mousemove', onMouseMove, { passive: true });
  window.addEventListener('resize', onResize, { passive: true });
  
  // Initialisation
  updateDimensions();
  applyTransformations(); // Applique l'état initial basé sur la position de scroll au chargement
}