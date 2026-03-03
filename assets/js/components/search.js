(() => {
  const rechercheInput = document.getElementById('recherche_principale-input');
  const deleteIconMain = document.querySelector('.recherche_delete');
  const loupeIcon = document.querySelector('.recherche_loupe');

  // Filtre de la recherche principale
  function principalFilterNativeLoop() {
    // On récupère la saisie utilisateur
    let array = [];
    const wordSearched = document.getElementById('recherche_principale-input').value.toLowerCase();
    let names, descriptions, ingredients;

    for (let i = 0; i < recipes.length; i++){
      names = recipes[i].name;
      descriptions = recipes[i].description;

        if(names.toLowerCase().includes(wordSearched)){
          array.push(recipes[i])
        };

        if(descriptions.toLowerCase().includes(wordSearched)){
          array.push(recipes[i])
        };

        for (let j = 0; j < recipes[i].ingredients.length; j++){
          ingredients = recipes[i].ingredients[j].ingredient
        };
          if(ingredients.toLowerCase().includes(wordSearched)){
            array.push(recipes[i])
          };
    };
    array = [...new Set(array)]
    return array;
  };

  // Filtre par Tag
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