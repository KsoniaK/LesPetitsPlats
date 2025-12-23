(() => {
  // // -----------------------------
  // // Données uniques (au chargement)
  // // -----------------------------
  // const arrayIngredientsSansDoublons = Array.from(new Set(
  //   recipes.flatMap(recipe => recipe.ingredients.map(ing => ing.ingredient))
  // ));

  // const arrayAppareilsSansDoublons = Array.from(new Set(
  //   recipes.map(recipe => recipe.appliance)
  // ));

  // const arrayUstensilsSansDoublons = Array.from(new Set(
  //   recipes.flatMap(recipe => recipe.ustensils)
  // ));

  // -----------------------------
  // Sélecteurs DOM
  // -----------------------------
  const sectionRecettes = document.getElementById("recettes");
  const sectionTag = document.getElementById("section_tags");

  const datalistIngredients = document.getElementById("datalist-ingredients");
  const datalistAppareils = document.getElementById("datalist-appareils");
  const datalistUstensils = document.getElementById("datalist-ustensils");

  // -----------------------------
  // Gestion des filtres (ingrédients, appareils, ustensils)
  // -----------------------------
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

  // -----------------------------
  // Tags
  // -----------------------------
  let divsTag = [];

  function createTag(e) {
    const searchedTag = e.target.textContent.trim();
    const tagType = e.target.closest('[data-type]').dataset.type;

    if (divsTag.some(tag => tag.value === searchedTag.toLowerCase() && tag.type === tagType)) return;

    sectionTag.insertAdjacentHTML('beforeend', `
      <div class="section_tags-tag" data-type="${tagType}" data-value="${searchedTag.toLowerCase()}">
        <p class="p-tag">${searchedTag}</p>
        <img class="section_tags-delete" src="assets/img/delete-input.png" alt="supprimer tag">
      </div>
    `);

    divsTag.push({ type: tagType, value: searchedTag.toLowerCase() });
    search();
  }

  function deleteTag(e) {
    const tagDiv = e.target.closest('.section_tags-tag');
    const { type, value } = tagDiv.dataset;

    divsTag = divsTag.filter(tag => !(tag.type === type && tag.value === value));
    tagDiv.remove();
    search();
  }

  // Délégation d'événements pour tags
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('li-item')) createTag(e);
    if (e.target.classList.contains('section_tags-delete')) deleteTag(e);
  });

  // -----------------------------
  // Barre principale de recherche
  // -----------------------------
  const rechercheInput = document.getElementById('recherche_principale-input');
  const deleteIconMain = document.querySelector('.recherche_delete');
  const loupeIcon = document.querySelector('.recherche_loupe');

  // Live search dès la première lettre
  rechercheInput.addEventListener('input', () => {
    const value = rechercheInput.value.trim();

    // Afficher ou cacher la croix
    deleteIconMain.style.opacity = value.length > 0 ? '1' : '0';
    deleteIconMain.style.pointerEvents = value.length > 0 ? 'auto' : 'none';

    // 🔥 Recherche en direct
    search();
  });

  // Effacer l'input au clic sur la croix
  deleteIconMain.addEventListener('click', () => {
    rechercheInput.value = '';
    deleteIconMain.style.opacity = '0';
    deleteIconMain.style.pointerEvents = 'none';
    displayRecipes(recipes);
  });

  // Loupe → lance la recherche (optionnel avec live search)
  loupeIcon.addEventListener('click', () => search());

  // Enter → lance la recherche
  rechercheInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') search();
  });

  // -----------------------------
  // Fonction search (cœur logique)
  // -----------------------------
  function search() {
    let results = principalFilterNativeLoop();
    if (divsTag.length > 0) results = filteredRecipesByTag(results);
    displayRecipes(results);
  }

  function principalFilterNativeLoop() {
    const results = new Set();
    const wordSearched = rechercheInput.value.toLowerCase();

    recipes.forEach(recipe => {
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
    return divsTag.reduce((res, tag) => {
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

  // -----------------------------
  // Affichage recettes + mise à jour filtres
  // -----------------------------
  
  function displayRecipes(datas) {
  sectionRecettes.innerHTML = '';
  datalistIngredients.innerHTML = '';
  datalistAppareils.innerHTML = '';
  datalistUstensils.innerHTML = '';

  // Sélection sécurisée du <p> pour le compteur
  const resteRecetteDiv = document.querySelector('.reste-recette p');
  const aucuneRecetteSection = document.querySelector('.recettes');
  let inputContent = document.querySelector('.recherche_input').value;
  console.log(inputContent);
  

  // Mise à jour du compteur
  if (resteRecetteDiv) {
    if (datas.length === 0) {
      aucuneRecetteSection.textContent = `"Aucune recette ne contient ${inputContent}, vous pouvez chercher: 'tarte aux pommes', 'poisson', etc ... "`
    } else {
      resteRecetteDiv.textContent = `${datas.length} recette${datas.length > 1 ? 's' : ''} trouvée${datas.length > 1 ? 's' : ''}`;
    }
  }

  if (datas.length === 0) return;

  // Affichage des recettes
  sectionRecettes.innerHTML = datas.map(recipe => `
    <article class="recettes_recette">
      <div class="recettes_recette-illustration">
        <img src="assets/img/${recipe.image}" alt="${recipe.name}">
      </div>
      <div class="recettes_recette-description">
        <div class="container">
          <h2>${recipe.name}</h2>
          <div class="container_temps">
            <span>${recipe.time} min</span>
          </div>
        </div>
        <div class="ingredients_etapes">
          <div class="ingredients_etapes-etapes">
            <h3>Recette</h3>
            <p>${recipe.description}</p>
          </div>
          <h3>Ingrédients</h3>
          <div class="ingredients_etapes-ingredients">
            ${recipe.ingredients.map(i => `
              <p>${i.ingredient}${i.quantity ? `<br> ${i.quantity}` : ''}${i.unit ? ` ${i.unit}` : ''}</p>
            `).join('')}
          </div>
        </div>
      </div>
    </article>
  `).join('');

  // Mise à jour des filtres
  const ingredients = Array.from(new Set(datas.flatMap(r => r.ingredients.map(i => i.ingredient))));
  const appareils = Array.from(new Set(datas.map(r => r.appliance)));
  const ustensils = Array.from(new Set(datas.flatMap(r => r.ustensils)));

  datalistIngredients.innerHTML = ingredients.map(i => `<li class="li-item ing">${i}</li>`).join('');
  datalistAppareils.innerHTML = appareils.map(a => `<li class="li-item app">${a}</li>`).join('');
  datalistUstensils.innerHTML = ustensils.map(u => `<li class="li-item ust">${u}</li>`).join('');
}



  // -----------------------------
  // Initialisation
  // -----------------------------
  displayRecipes(recipes);

})();
