export function initProduits2() {
  const detailsContainer = document.getElementById("dgsys-product-details");
  const thumbnailsContainer = document.getElementById("dgsys-thumbnails");
  
  if (!detailsContainer || !thumbnailsContainer) {
    // Si la section n'est pas sur la page, on ne fait rien.
    return;
  }

  const detailItems = detailsContainer.querySelectorAll('.product-detail-item');
  const thumbnailCards = thumbnailsContainer.querySelectorAll('.side-card');

  thumbnailsContainer.addEventListener("click", (e) => {
    const card = e.target.closest(".side-card");
    if (!card) return;

    const targetId = card.dataset.target;
    const targetDetail = document.getElementById(targetId);

    if (!targetDetail) return;

    // 1. Gérer les vignettes (boutons)
    thumbnailCards.forEach(c => c.classList.remove('is-active'));
    card.classList.add('is-active');

    // 2. Gérer les blocs de détails
    detailItems.forEach(item => item.classList.remove('is-visible'));
    targetDetail.classList.add('is-visible');
  });
}