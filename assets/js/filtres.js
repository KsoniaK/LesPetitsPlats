const datalistIngredients = document.getElementById("datalist-ingredients");
const datalistAppareils = document.getElementById("datalist-appareils");
const datalistUstensils = document.getElementById("datalist-ustensils");
// Section recettes
const allRecipesSection = document.getElementById("recettes");
document.getElementById('recherche_principale-input').addEventListener('input', () => search());

// ----------------------------------------------------
// Création du ontenu des filtres ingrédient, appareil et ustensil
// ----------------------------------------------------


// ---------------------------------------------------------
// Pour chaque input cliqué afficher la liste correspondante
// ---------------------------------------------------------
Array.from(document.querySelectorAll(".filtres_input")).map(input => {
  input.addEventListener('click', (e) => appearLists(e.target))
});
// Fonction selection filtres: ingrédients, appareils et ustensils
function appearLists(el){
  const data = document.querySelector(`datalist[data-filtre=${el.dataset.filtre}]`);
  const imgDropDown = document.querySelector(`img[data-filtre=${el.dataset.filtre}]`);

          if(data.classList.contains('active')){
            data.classList.remove('active');
            data.style.display = 'none';
            imgDropDown.style.transform = 'rotate(0deg)';
          }else{
            data.classList.add('active');
            data.style.display = 'block';
            imgDropDown.style.transform = 'rotate(180deg)';
          };
};

// ---------------
// Création du tag
// ---------------
// const optionsIngredients = Array.from(document.querySelectorAll('.option-ingredients'));
// optionsIngredients.map(optionIngredient => optionIngredient.addEventListener('click', createTag));
let divsTag = [];

function createTag(e){
  const sectionTag = document.getElementById('section_tags');
  const searchedTag = e.target.value;
  const tagType = e.target.closest('section').getAttribute('data-type');
  
    sectionTag.innerHTML += `
      <div class="section_tags-tag" data-type="${tagType}" data-value="${searchedTag.toLowerCase()}">
        <p>${searchedTag}</p>
        <img class="section_tags-delete" src="assets/img/delete.png" alt="supprimer tag">
      </div>`
  
    divsTag.push({type: tagType, value: searchedTag.toLowerCase()});
    search();
};

// ------------------
// Suppression du tag
// ------------------
function deleteTags(e){
  // console.log(e.target);
  const cross = e.target;
  const tagType = cross.closest('div').getAttribute('data-type');
  const tagValue = cross.closest('div').getAttribute('data-value');
  // merci de supprimer la value du divsTag
  divsTag = divsTag.filter(tag => tag.value != tagValue && tag.type != tagType)
  cross.closest('div').remove();
  search();
};







// ------------------------------------------------------------------------------
// Fonction pour les 4 recherches (principale, ingrédients, appareils, ustensils)
// ------------------------------------------------------------------------------
function search(){

  let results = principalFilter();
  console.log('res', results)
  if (divsTag.length > 0)
    results = filteredRecipesByTag(results);

  displayRecipes(results)
}
function principalFilter(){
  // Récupérer la saisie de l'utilisateur
  const wordSearched = document.getElementById('recherche_principale-input').value.toLowerCase();
  let filteredRecipes = recipes;
    if(wordSearched.length > 2){
      // allRecipesSection.innerHTML = "<h1>Merci d'entrer au moins 3 caractères pour lancer une recherche</h1>";
      filteredRecipes = recipes.filter(recette => {
        let titleDescritionIngredients = recette.name + recette.description + recette.ingredients.toString();
        if(titleDescritionIngredients.toLowerCase().includes(wordSearched)){
          return recette
        };
      })
  }
  return filteredRecipes;
}

function filteredRecipesByTag(datas) {
  let res = [];
  divsTag.forEach((tag) => {
    console.log(tag);
    switch (tag.type) {
      case "ingredients":
        res = datas.filter((recipe) =>
        recipe.ingredients.some((ing) =>
            ing.ingredient.toLowerCase().includes(tag.value)
        )
        );
        console.log(res);

        res = [... new Set(res)]
        break;
    }
  });

  return res;
}

function displayRecipes(datas) {
  sectionRecettes.innerHTML = '';
  datalistIngredients.innerHTML = '';
  datalistAppareils.innerHTML = '';
  datalistUstensils.innerHTML = '';

  if(datas.length > 0){
  datas.map(recipe => {
    const arrayIngredients = recipe.ingredients;
    sectionRecettes.innerHTML += 
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
    

    // Ingrédients: Map et suppression des doublons avec flat/ Combinaison avec flatMap
    const arrayIngredientsDoublons = datas.flatMap(recipe => recipe.ingredients.map(ing => ing.ingredient));
    const arrayIngredientsSansDoublons = Array.from(new Set(arrayIngredientsDoublons));
    // Appareils: Map et suppression des doublons avec flat/ Combinaison avec flatMap
    const arrayAppareilsDoublons = datas.flatMap(recipe => recipe.appliance);
    const arrayAppareilsSansDoublons = Array.from(new Set(arrayAppareilsDoublons));
    //Ustensils: Map et suppression des doublons avec flat/ Combinaison avec flatMap
    const arrayUstensilsDoublons = datas.flatMap(recipe => recipe.ustensils);
    const arrayUstensilsSansDoublons = Array.from(new Set(arrayUstensilsDoublons));

    // const datalistIngredients = document.getElementById("datalist-ingredients");
    // const datalistAppareils = document.getElementById("datalist-appareils");
    // const datalistUstensils = document.getElementById("datalist-ustensils");

    datalistIngredients.innerHTML += 
      `
        ${arrayIngredientsSansDoublons.map(ingredient =>
          `
            <option class="option-ingredients">${ingredient}</option>
          `
          ).join('')}
      `
    datalistAppareils.innerHTML += 
      `
        ${arrayAppareilsSansDoublons.map(appliance =>
          `
            <option>${appliance}</option>
          `
          ).join('')}
      `
    datalistUstensils.innerHTML += 
      `
        ${arrayUstensilsSansDoublons.map(ustensil =>
          `
            <option>${ustensil}</option>
          `
          ).join('')}
      `

    const optionsIngredients = Array.from(document.querySelectorAll('.option-ingredients'));
    optionsIngredients.map(optionIngredient => optionIngredient.addEventListener('click', createTag));
    const sectionsDelete = Array.from(document.querySelectorAll('.section_tags-delete'));
    sectionsDelete.map(optionIngredient => optionIngredient.addEventListener('click', deleteTags));

}else{
  sectionRecettes.innerHTML = 'pas de résultats trouvés';
};
    

}

displayRecipes(recipes);





































































// const inputIngredient = document.getElementById('filtres_ingredients');
// inputIngredient.addEventListener('input', searchTag('ingredientsFiltre'))
// const inputAppareil = document.getElementById('filtres_appareils');
// inputAppareil.addEventListener('input', searchTag('appareilsFiltre'))
// const inputUstensils = document.getElementById('filtres_ustensils');
// inputUstensils.addEventListener('input', searchTag('ustensilsFiltre'))

// function searchTag(element) {
//   switch (element) {
//     case 'ingredientsFiltre':
//       // console.log(element);
//       const datalistIngredients = document.getElementById("datalist-ingredients");
    
//       // datalistIngredients.innerHTML = "";
    
//       const searchedIngredients = element.target.value.toLowerCase();
    
//       const filteredArrayIngredients = arrayIngredientsSansDoublons.filter(ing => {
//         if(ing.toLowerCase().includes(searchedIngredients)){
//          datalistIngredients.innerHTML += `<option>${ing}</option>`;
//          return ing
//         };
//       });
    
//       if(filteredArrayIngredients.length <= 0) datalistIngredients.textContent = "Aucune recette ne correspond à votre critère... vous pouvez chercher:";
//       break;
//     // default:

//       case 'appareilsFiltre':
//       // console.log(element);
//           const datalistAppareils = document.getElementById("datalist-appareils");
        
//           // datalistAppareils.innerHTML = "";
        
//           const searchedAppareils = element.target.value.toLowerCase();
        
//           const filteredArrayAppareils = arrayAppareilsSansDoublons.filter(app => {
//             if(app.toLowerCase().includes(searchedAppareils)){
//               datalistAppareils.innerHTML += `<option>${app}</option>`;
//              return app
//             };
//           });
        
//           if(filteredArrayAppareils.length <= 0) datalistAppareils.textContent = "Aucune recette ne correspond à votre critère... vous pouvez chercher:";

//       case 'ustensilsFiltre':
//       // console.log(element);
//         const datalistUstensils = document.getElementById("datalist-ustensils");
      
//         // datalistUstensils.innerHTML = "";
      
//         const searchedUstensils = element.target.value.toLowerCase();
      
//         const filteredArrayUstensils = arrayUstensilsSansDoublons.filter(ust => {
//           if(ust.toLowerCase().includes(searchedUstensils)){
//             datalistUstensils.innerHTML += `<option>${ust}</option>`;
//            return ust
//           };
//         });
      
//         if(filteredArrayUstensils.length <= 0) datalistUstensils.textContent = "Aucune recette ne correspond à votre critère... vous pouvez chercher:";
//       break;
//   }
// }