// Création des cartes recettes
const sectionRecettes = document.getElementById("recettes");
function createRecipes() {
  // console.log(recipes[0].ingredients[0].unit);
  // console.log(recipes);
  // Récupération de la section recettes
  
  // On boucle sur le tableau recipes pour avoir chaque recette
  function allRecipes(){
  recipes.map(recipe => {
    const arrayIngredients = recipe.ingredients;
    return sectionRecettes.innerHTML += 
    `
      <article class="recettes_recette">
        <!-- image de recettes_recette-illustration -->
        <div class="recettes_recette-illustration">
            <img src="assets/img/photo.jpg" alt="">
        </div>
        <!-- titre, temps, liste des ingrédients -->
        <section class="recettes_recette-description">
            <!-- titre, temps -->
            <div class="container">
              <h2>${recipe.name}</h2>
              <div class="container_temps">
                  <img class="container_temps-img" src="assets/img/clock.png" alt="">
                  <span>${recipe.time}</span>
              </div>
            </div>
            <!-- liste ingredients_etapes, recette -->
            <section class="ingredients_etapes">
              <div class="ingredients_etapes-ingredients">
            ${arrayIngredients.map(ingredient =>
                `
                  <p>
                  <strong>${ingredient.ingredient}: </strong> ${ingredient.quantity ? ingredient.quantity : ``}${ingredient.unit ? ingredient.unit : ``}
                  </p> 
                `
            ).join('')}
                </div>
                <div class="ingredients_etapes-etapes">
                    <p>${recipe.description}</p>
                </div>
            </section>
        </section>
    </article>
  `
    });
  };
  allRecipes();
};
createRecipes();



