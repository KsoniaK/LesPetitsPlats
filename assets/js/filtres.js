// Ingrédients: Map et suppression des doublons avec flat/ Combinaison avec flatMap
const arrayIngredientsDoublons = recipes.flatMap(recipe => recipe.ingredients.map(ing => ing.ingredient));
const arrayIngredientsSansDoublons = Array.from(new Set(arrayIngredientsDoublons));
// Appareils: Map et suppression des doublons avec flat/ Combinaison avec flatMap
const arrayAppareilsDoublons = recipes.flatMap(recipe => recipe.appliance);
const arrayAppareilsSansDoublons = Array.from(new Set(arrayAppareilsDoublons));
//Ustensils: Map et suppression des doublons avec flat/ Combinaison avec flatMap
const arrayUstensilsDoublons = recipes.flatMap(recipe => recipe.ustensils);
const arrayUstensilsSansDoublons = Array.from(new Set(arrayUstensilsDoublons));
// Liste des titres
const allTitles = recipes.map(recipe => recipe.name);
// console.log(allTitles);
const allDescriptions = recipes.map(recipe => recipe.description);
// console.log(allDescriptions);
// Section recettes
const allRecipesSection = document.getElementById("recettes");
// console.log(allRecipesSection);

// ----------------------------------------------------
// Contenu des filtres ingrédient, appareil et ustensil
// ----------------------------------------------------
function filtres(){
  const datalistIngredients = document.getElementById("datalist-ingredients");
  const datalistAppareils = document.getElementById("datalist-appareils");
  const datalistUstensils = document.getElementById("datalist-ustensils");

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
}
filtres();



// ---------------------------------------------------------
// Pour chaque input cliqué afficher la liste correspondante
// ---------------------------------------------------------
Array.from(document.querySelectorAll(".filtres_input")).map(input => {
  input.addEventListener('click', (e) => appearLists(e.target))
});
// Fonction selection filtres: ingrédients, appareils et ustensils
function appearLists(el){
  const data = document.querySelector(`datalist[data-filtre=${el.dataset.filtre}]`);
  // console.log(el.dataset);
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

// ------------------------------
// Fonction recherche ingrédients
// ------------------------------
const inputIngredient = document.getElementById('filtres_ingredients');
inputIngredient.addEventListener('input', filterIngredients)

function filterIngredients(e){
  const datalistIngredients = document.getElementById("datalist-ingredients");
  // const sectionRecettes = document.getElementById("recettes");

  datalistIngredients.innerHTML = "";

  const searchedIngredients = e.target.value.toLowerCase();

  const filteredArrayIngredients = arrayIngredientsSansDoublons.filter(ing => {
    if(ing.toLowerCase().includes(searchedIngredients)){
     datalistIngredients.innerHTML += `<option class="option-ingredients">${ing}</option>`;
     return ing
    };
  });

  if(filteredArrayIngredients.length <= 0) datalistIngredients.textContent = "Aucune recette ne correspond à votre critère... vous pouvez chercher:";
};

// ------------------------------
// Fonction recherche appareils
// ------------------------------
const inputAppareil = document.getElementById('filtres_appareils');
inputAppareil.addEventListener('input', filterAppareils)

function filterAppareils(e){
  const datalistAppareils = document.getElementById("datalist-appareils");
  // const sectionRecettes = document.getElementById("recettes");

  datalistAppareils.innerHTML = "";

  const searchedAppareils = e.target.value.toLowerCase();

  const filteredArrayAppareils = arrayAppareilsSansDoublons.filter(app => {
    if(app.toLowerCase().includes(searchedAppareils)){
      datalistAppareils.innerHTML += `<option>${app}</option>`;
     return app
    };
  });

  if(filteredArrayAppareils.length <= 0) datalistAppareils.textContent = "Aucune recette ne correspond à votre critère... vous pouvez chercher:";
};

// ------------------------------
// Fonction recherche ustensils
// ------------------------------
const inputUstensils = document.getElementById('filtres_ustensils');
inputUstensils.addEventListener('input', filterUstensils)

function filterUstensils(e){
  const datalistUstensils = document.getElementById("datalist-ustensils");
  // const sectionRecettes = document.getElementById("recettes");

  datalistUstensils.innerHTML = "";

  const searchedUstensils = e.target.value.toLowerCase();

  const filteredArrayUstensils = arrayUstensilsSansDoublons.filter(ust => {
    if(ust.toLowerCase().includes(searchedUstensils)){
      datalistUstensils.innerHTML += `<option>${ust}</option>`;
     return ust
    };
  });

  if(filteredArrayUstensils.length <= 0) datalistUstensils.textContent = "Aucune recette ne correspond à votre critère... vous pouvez chercher:";
};

// ---------------
// Création du tag
// ---------------
const optionsIngredients = Array.from(document.querySelectorAll('.option-ingredients'));
optionsIngredients.map(optionIngredient => optionIngredient.addEventListener('click', createTag));
let divsTag = [];

function createTag(e){
  // console.log("cliqué");
  const sectionTag = document.getElementById('section_tags');
  const searchedTagIngredients = e.target.value;
  
  if(divsTag.includes(searchedTagIngredients)){
    // console.log("ok");
  }else{
    sectionTag.innerHTML += `
      <div class="section_tags-tag" data-id="${Date.now()}">
      <p>${searchedTagIngredients}</p>
      <img class="section_tags-delete" src="assets/img/delete.png" alt="supprimer tag" data-id="${Date.now()}">
      </div>`
    // console.log("non");
  };

  const crossDeleteTags = Array.from(document.querySelectorAll('.section_tags-delete'));
  crossDeleteTags.map(crossDeleteTag => crossDeleteTag.addEventListener('click', deleteTags));
  
  divsTag = Array.from(document.querySelectorAll('.section_tags-tag')).map(divTag => divTag.innerText)
};

// ------------------
// Suppression du tag
// ------------------
function deleteTags(e){
  // console.log(e.target);
  const cross = e.target;
  const crossId = cross.getAttribute('data-id');
  document.querySelector(`div[data-id = '${crossId}']`).style.display = "none";
};



// ----------------------------
// Création du filtre principal
// ----------------------------
const principalFilterInput = document.getElementById("recherche_principale-input");
// console.log(principalFilterInput);
principalFilterInput.addEventListener('input', principalFilter)
let filteredarrayTitleIngredientsDescription = [];

function principalFilter(e){
  // Récupérer les listes nécessaires à la recherche dans: titre, ingrédients, description (récupérées et mises en variables globales)
  // Les réunir dans un seul tableau
  const arrayTitleIngredientsDescription = allTitles.concat(allDescriptions, arrayIngredientsSansDoublons);

  // allRecipesSection.innerHTML = `${sectionRecettes}`;
  allRecipesSection.innerHTML = '';

  // Récupérer la section contenant toutes les recettes (récupérée et mise en variable principale car besoin dans d'autres filtres pour autres scénarios)

  // Récupérer la saisie de l'utilisateur
  const wordSearched = e.target.value.toLowerCase();

  filteredRecipes = recipes.filter(recette => {
    let titleDescritionIngredients = recette.name + recette.description + recette.ingredients.toString();
    if(titleDescritionIngredients.toLowerCase().includes(wordSearched)){
      // console.log(filteredarrayTitleIngredientsDescription);

      // return allRecipesSection.innerHTML +=  createRecipes(filteredarrayTitleIngredientsDescription);
      // return allRecipesSection.innerHTML +=  "CORRESPONDACEEEEEEEEEEEE = " + recette
      // return createRecipes();
      // return allRecipesSection.textContent +=  sectionRecettes
      // allRecipes(allRecipesSection);
     return recette
    };
  });
  console.log(filteredRecipes);
  // createRecipes(filteredRecipes);

  // if(wordSearched.length < 3){
  //   allRecipesSection.innerHTML = "<h1>Merci d'entrer au moins 3 caractères pour lancer une recherche</h1>";
  //   // console.log(wordSearched.length);
  // }else if(filteredarrayTitleIngredientsDescription.length == 0){
  //   allRecipesSection.innerHTML = "<h1>Aucune recette ne correspond à votre critère... vous pouvez chercher: </h1>";
  // }
  // else{
  //   allRecipesSection.innerHTML += 'On entre dans aucune condition !!';
  // }
};





























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