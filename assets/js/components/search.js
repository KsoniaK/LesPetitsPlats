(() => {
  const rechercheInput = document.getElementById('recherche_principale-input');
  const deleteIconMain = document.querySelector('.recherche_delete');
  const loupeIcon = document.querySelector('.recherche_loupe');

// filtre les recettes à partir du texte saisi
function principalFilter() {
  const wordSearched = rechercheInput.value.toLowerCase(); // faire une recherche insensible à la casse

  // Pas de recherche < 3 caractères + pas de tags actifs
  if (wordSearched.length < 3 && window.divsTag.length === 0) {
    return window.recipes; // on en filtre pas et on retourne toutes les recettes
  }

  // parcourt le tableau, teste chaque recette et garde uniquement celles qui retournent true = filter() retourne un nouveau tableau
  return window.recipes.filter(recipe => {
    return (
      recipe.name.toLowerCase().includes(wordSearched) ||
      recipe.description.toLowerCase().includes(wordSearched) ||
      recipe.ingredients.some(ing => // retourne true dès qu’un seul ingrédient correspond
        ing.ingredient.toLowerCase().includes(wordSearched)
      )
    );
  });
}

  // Filtre une liste de recettes selon les tags actifs
  function filteredRecipesByTag(datas) {
    return window.divsTag.reduce((res, tag) => { // reduce applique chaque tag l’un après l’autre : res = résultats intermédiaires, tag = tag courant
      switch (tag.type) { // Selon le type du tag
        // Garde les recettes qui contiennent cet ingrédient
        case "ingredients":
          return res.filter(recipe =>
            recipe.ingredients.some(ing => ing.ingredient.toLowerCase().includes(tag.value))
          );
        case "appliance":
          return res.filter(recipe =>
            recipe.appliance.toLowerCase().trim().includes(tag.value.toLowerCase().trim()) // toLowerCase() et trim() pour éviter les problèmes de casse et d’espaces
          );
        case "ustensils":
          return res.filter(recipe =>
            recipe.ustensils.some(ust => ust.toLowerCase().includes(tag.value))
          );
        // Sécurité : si type inconnu, on ne change rien 
        default:
          return res;
      }
    }, datas); // Valeur initiale du reduce = recettes déjà filtrées
  }

  function search() {
    // D’abord filtre texte
    let results = principalFilter();
      // Puis filtre par tags si présents
      if (window.divsTag.length > 0) results = filteredRecipesByTag(results);
      window.displayRecipes(results); // Met à jour l’affichage
  }

  // Exposer globalement pour tags.js
  window.search = search;

  // Live search (Se déclenche à chaque frappe)
  rechercheInput.addEventListener('input', () => {
    const value = rechercheInput.value.trim(); // Supprime les espaces inutiles
    deleteIconMain.style.opacity = value.length > 0 ? '1' : '0';
    deleteIconMain.style.pointerEvents = value.length > 0 ? 'auto' : 'none';
    search();
  });

  deleteIconMain.addEventListener('click', () => {
    rechercheInput.value = ''; // Vide l’input
    deleteIconMain.style.opacity = '0';
    deleteIconMain.style.pointerEvents = 'none';
    window.displayRecipes(window.recipes); // Réinitialise l’affichage
  });

  loupeIcon.addEventListener('click', search);
  
  rechercheInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') search();
  });

})();