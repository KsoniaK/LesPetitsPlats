(() => {
  const sectionRecettes = document.getElementById("recettes");
  const datalistIngredients = document.getElementById("datalist-ingredients");
  const datalistAppareils = document.getElementById("datalist-appareils");
  const datalistUstensils = document.getElementById("datalist-ustensils");

  function displayRecipes(datas) {
    sectionRecettes.innerHTML = '';
    datalistIngredients.innerHTML = '';
    datalistAppareils.innerHTML = '';
    datalistUstensils.innerHTML = '';

    const resteRecetteDiv = document.querySelector('.reste-recette p');
    const aucuneRecetteSection = document.querySelector('.recettes');
    const inputContent = document.querySelector('.recherche_input').value;

    if (resteRecetteDiv) {
      if (datas.length === 0) {
        aucuneRecetteSection.textContent = `"Aucune recette ne contient ${inputContent}, vous pouvez chercher: 'tarte aux pommes', 'poisson', etc ... "`
        resteRecetteDiv.textContent = `${datas.length} recette trouvée `;
      } else {
        resteRecetteDiv.textContent = `${datas.length} recette${datas.length > 1 ? 's' : ''} trouvée${datas.length > 1 ? 's' : ''}`;
      }
    }

    if (datas.length === 0) return;

    // Affichage des recettes
    sectionRecettes.innerHTML = datas.map(recipe => `
      <article class="recettes_recette">
        <div class="recettes_recette-illustration">
          <img src="assets/img/${recipe.image || 'placeholder.png'}" alt="${recipe.name}">
          <span>${recipe.time} min</span>
        </div>
        <div class="recettes_recette-description">
          <div class="container">
            <h2>${recipe.name}</h2>
            <div class="container_temps">
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

  // Exposer globalement pour que search.js et tags.js puissent l’utiliser
  window.displayRecipes = displayRecipes;

  // Affichage initial
  window.displayRecipes(window.recipes);

})();