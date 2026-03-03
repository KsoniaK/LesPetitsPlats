(() => {
  const rechercheInput = document.getElementById('recherche_principale-input');
  const deleteIconMain = document.querySelector('.recherche_delete');
  const loupeIcon = document.querySelector('.recherche_loupe');

  function principalFilterNativeLoop() {
    const wordSearched = rechercheInput.value.toLowerCase();

    // Pas de recherche < 3 caractères si pas de tags
    if (wordSearched.length < 3 && window.divsTag.length === 0) return window.recipes;

    const results = new Set();
    window.recipes.forEach(recipe => {
      if (
        recipe.name.toLowerCase().includes(wordSearched) ||
        recipe.description.toLowerCase().includes(wordSearched) ||
        recipe.ingredients.some(ing => ing.ingredient.toLowerCase().includes(wordSearched))
      ) {
        results.add(recipe);
      }
    });
    return [...results];
  }

  function filteredRecipesByTag(datas) {
    return window.divsTag.reduce((res, tag) => {
      switch (tag.type) {
        case "ingredients":
          return res.filter(recipe =>
            recipe.ingredients.some(ing => ing.ingredient.toLowerCase().includes(tag.value))
          );
        case "appliance":
          return res.filter(recipe => recipe.appliance.toLowerCase().includes(tag.value));
        case "ustensils":
          return res.filter(recipe =>
            recipe.ustensils.some(ust => ust.toLowerCase().includes(tag.value))
          );
        default:
          return res;
      }
    }, datas);
  }

  function search() {
    let results = principalFilterNativeLoop();
    if (window.divsTag.length > 0) results = filteredRecipesByTag(results);
    window.displayRecipes(results);
  }

  // Exposer globalement pour tags.js
  window.search = search;

  // Live search
  rechercheInput.addEventListener('input', () => {
    const value = rechercheInput.value.trim();
    deleteIconMain.style.opacity = value.length > 0 ? '1' : '0';
    deleteIconMain.style.pointerEvents = value.length > 0 ? 'auto' : 'none';
    search();
  });

  deleteIconMain.addEventListener('click', () => {
    rechercheInput.value = '';
    deleteIconMain.style.opacity = '0';
    deleteIconMain.style.pointerEvents = 'none';
    window.displayRecipes(window.recipes);
  });

  loupeIcon.addEventListener('click', search);

  rechercheInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') search();
  });

})();