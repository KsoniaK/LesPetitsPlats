(() => {
  const sectionTag = document.getElementById("section_tags");
  // On crée un tableau global pour stocker tous les tags sélectionnés. Global pour search.js et pouvoir filtrer les recettes
  window.divsTag = [];

  function createTag(e) {
    const searchedTag = e.target.textContent.trim(); // texte du tag cliqué
    const tagType = e.target.closest('[data-type]').dataset.type; // closest('[data-type]') remonte à l’élément parent contenant l’attribut data-type

    // Vérifie si le tag existe déjà
      // some() → renvoie true si un tag identique existe
      // Si déjà présent, on sort de la fonction (pas de doublon)
    if (window.divsTag.some(tag => tag.value === searchedTag.toLowerCase() && tag.type === tagType)) return;

    // insertAdjacentHTML('beforeend', …) -> ajoute le nouveau tag à la fin du conteneur
    sectionTag.insertAdjacentHTML('beforeend', `
      <div class="section_tags-tag" data-type="${tagType}" data-value="${searchedTag.toLowerCase()}">
        <p class="p-tag">${searchedTag}</p>
        <img class="section_tags-delete" src="assets/img/delete-input.png" alt="supprimer tag">
      </div>
    `);

    // On ajoute le tag au tableau global
      // type -> type de tag
      // value -> texte du tag en minuscule
    window.divsTag.push({ type: tagType, value: searchedTag.toLowerCase() });

    // Lance la fonction search() définie dans search.js + Filtre immédiatement les recettes selon les tags actifs
    window.search(); 
  }


  function deleteTag(e) {
    const tagDiv = e.target.closest('.section_tags-tag');
    const { type, value } = tagDiv.dataset;

    // Supprime le tag du tableau global
      // filter() renvoie tous les tags qui ne correspondent pas au tag supprimé
    window.divsTag = window.divsTag.filter(tag => !(tag.type === type && tag.value === value));
    tagDiv.remove(); // Supprime le tag du DOM

    // Relance la recherche après suppression
    window.search(); 
  }

  // Écouteur global pour tous les clics sur la page
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('li-item')) createTag(e); // Si on clique sur un élément de la liste de filtre (li-item) → crée un tag
    if (e.target.classList.contains('section_tags-delete')) deleteTag(e); // Pareil pour suppression tag
  });

})();