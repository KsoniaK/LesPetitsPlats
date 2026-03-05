// IIFE = Immediately Invoked Function Expression (scope local = éviter la pollution du scope global) : 
// - Code executé immediatement
// - Toutes les variables/fonctions à l’intérieur sont isolées
// - Ça évite de polluer l’espace global (window)

(() => {
  const sectionRecettes = document.getElementById("recettes");
  const datalistIngredients = document.getElementById("datalist-ingredients");
  const datalistAppareils = document.getElementById("datalist-appareils");
  const datalistUstensils = document.getElementById("datalist-ustensils");

  function displayRecipes(datas) {
    // Nettoyage DOM (reset): Avant tout affichage on vide les anciennes recettes + on vide les anciennes listes de filtres (évite doublons)
    sectionRecettes.innerHTML = '';
    datalistIngredients.innerHTML = '';
    datalistAppareils.innerHTML = '';
    datalistUstensils.innerHTML = '';

    const resteRecetteDiv = document.querySelector('.reste-recette_content'); //recettes trouvées
    const aucuneRecetteSection = document.querySelector('.recettes');
    const inputContent = document.querySelector('.recherche_input').value; // Récupère le texte tapé par l’utilisateur (pour l’afficher dans le message)

    // Sécurité : on vérifie que l’élément existe dans le DOM (évite de tout bloquer !!)
    if (resteRecetteDiv) {
      if (datas.length === 0) { // Si aucune recette trouvée
        aucuneRecetteSection.textContent = `"Aucune recette ne contient ${inputContent}, vous pouvez chercher: 'tarte aux pommes', 'poisson', etc ... "` // textContent = sécurisé contre les injections HTML
        resteRecetteDiv.textContent = `${datas.length} recette trouvée `;
      } else {
        resteRecetteDiv.textContent = `${datas.length} recette${datas.length > 1 ? 's' : ''} trouvée${datas.length > 1 ? 's' : ''}`;
      }
    }

    // Arrêt si aucune recette (inutile d’afficher des cartes et inutile d’afficher des cartes)
    if (datas.length === 0) return; 

    // Pour chaque recette : on génère une carte HTML (map() retourne un tableau de strings, .join('') les transforme en HTML final)
    sectionRecettes.innerHTML = datas.map(recipe => `
      <article class="recettes_recette">
        <div class="recettes_recette-illustration">
          <img src="assets/img/${recipe.image || 'placeholder.png'}" alt="${recipe.name}"> <!-- fallback placeholder.png si image manquante -->
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
                <p>${i.ingredient}${i.quantity ? `<br> ${i.quantity}` : ''}${i.unit ? ` ${i.unit}` : ''}</p> <!-- ternaire = évitent d’afficher undefined -->
              `).join('')}
            </div>
          </div>
        </div>
      </article>
    `).join('');

    // Mise à jour des filtres
      //  flatMap = récupère tous les ingrédients
      //  Set = supprime les doublons
      //  Array.from = transforme en vrai tableau JS (ici pas de .map() avec new Set, obligé d'avoir Array.from())
    const ingredients = 
    Array.from(new Set(
      datas.flatMap(r => r.ingredients.map(i => i.ingredient))
    ));
    const appareils = Array.from(new Set(datas.map(r => r.appliance)));
    const ustensils = Array.from(new Set(datas.flatMap(r => r.ustensils)));

    datalistIngredients.innerHTML = ingredients.map(i => `<li class="li-item ing" data-type="ingredients">${i}</li>`).join('');
    datalistAppareils.innerHTML = appareils.map(a => `<li class="li-item app" data-type="appliance">${a}</li>`).join('');
    datalistUstensils.innerHTML = ustensils.map(u => `<li class="li-item ust" data-type="ustensils">${u}</li>`).join('');
  }

  // Exposer globalement pour que search.js et tags.js puissent l’utiliser (nécessaire car code dans une IIFE !!)
  window.displayRecipes = displayRecipes;

  // Affichage des 50 recettes au chargement (recipes vient de service.js)
  window.displayRecipes(window.recipes);

})();