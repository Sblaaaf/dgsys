function initMetiersPremium() {
  const radios = [...document.querySelectorAll('input[name="p"]')];
  const idx = () => radios.findIndex(r => r.checked);
  const go = i => radios[(i + radios.length) % radios.length].checked = true;

  document.querySelectorAll('.arrow').forEach(btn =>
    btn.addEventListener('click', () => go(btn.dataset.dir === 'next' ? idx()+1 : idx()-1))
  );

  window.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') go(idx() + 1);
    if (e.key === 'ArrowLeft')  go(idx() - 1);
  });

  // Bouton "Voir tous les métiers"
  document.querySelector('.btn-all')?.addEventListener('click', () => {
    document.getElementById('s15').checked = true;
  });
}

// Exporte la fonction d'initialisation
export { initMetiersPremium };