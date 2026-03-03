const filterContainers = document.querySelectorAll(
  '.container_ingredients, .container_appareils, .container_ustensils'
);

filterContainers.forEach(container => {
  const header = container.querySelector('.title-img_container');
  const content = container.querySelector('.filtre-content');
  const input = container.querySelector('.filtres_input');
  const deleteIcon = container.querySelector('img[src*="delete-input"]');
  const ul = content.querySelector('ul');

  // Ouverture/fermeture au clic sur le header
  header.addEventListener('click', () => {
    const isAlreadyOpen = container.classList.contains('active');

    // fermer tous les filtres
    filterContainers.forEach(c => {
      c.classList.remove('active');
      const cContent = c.querySelector('.filtre-content');
      if (cContent) cContent.classList.remove('has-value');
    });

    if (!isAlreadyOpen) container.classList.add('active');
  });

  // Filtrer les items au fur et à mesure que l'utilisateur tape
  input.addEventListener('input', (e) => {
    const value = e.target.value.toLowerCase();
    content.classList.toggle('has-value', value.length > 0);

    ul.querySelectorAll('li').forEach(li => {
      li.style.display = li.textContent.toLowerCase().includes(value)
        ? 'block'
        : 'none';
    });
  });

  // Effacer l'input au clic sur la croix
  deleteIcon.addEventListener('click', () => {
    input.value = '';
    content.classList.remove('has-value');
    ul.querySelectorAll('li').forEach(li => li.style.display = 'block');
  });
});

// Fermer les filtres si clic en dehors
document.addEventListener('click', (e) => {
  const isClickInside = e.target.closest('.container_ingredients, .container_appareils, .container_ustensils');
  if (!isClickInside) {
    filterContainers.forEach(container => {
      container.classList.remove('active');
      const content = container.querySelector('.filtre-content');
      if (content) content.classList.remove('has-value');
    });
  }
});