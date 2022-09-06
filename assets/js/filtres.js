// // Filtres ingrédients, appareils et ustensils
// function filtres(){
//   const datalistIngredients = document.getElementById("datalist-ingredients");
//   const datalistAppareils = document.getElementById("datalist-appareils");
//   const datalistUstensils = document.getElementById("datalist-ustensils");
//   const arrayIngredientsDoublons = recipes.flatMap(ingres => ingres.ingredients.map(ing => ing.ingredient));
//   const arrayIngredientsSansDoublons = Array.from(new Set(arrayIngredientsDoublons)).sort();
//   // console.log(arrayIngredientsDoublons);
//   // console.log(arrayIngredientsSansDoublons);

//   recipes.map(recipe => {
//   const arrayIngredients = recipe.ingredients;
//   const allAppareils = recipe.appliance;
//   const arrayUstensils = recipe.ustensils;

//   datalistIngredients.innerHTML += 
//     `
//       ${arrayIngredientsSansDoublons.map(ingredient =>
//         `
//           <option>${ingredient}</option>
//         `
//         ).join('')}
//     `
//   datalistAppareils.innerHTML +=
//     `
//           <option>${allAppareils}</option>
//     `
//   datalistUstensils.innerHTML += 
//     `
//       ${arrayUstensils.map(ustensil =>
//         `
//           <option>${ustensil}</option>
//         `
//         ).join('')}
//     `
//   });
// }
// filtres();

// Filtres ingrédients, appareils et ustensils
function filtres(){
  const datalistIngredients = document.getElementById("datalist-ingredients");
  const datalistAppareils = document.getElementById("datalist-appareils");
  const datalistUstensils = document.getElementById("datalist-ustensils");

  // Ingrédients: Map et suppression des doublons avec flat/ Combinaison avec flatMap
  const arrayIngredientsDoublons = recipes.flatMap(recipe => recipe.ingredients.map(ing => ing.ingredient));
  const arrayIngredientsSansDoublons = Array.from(new Set(arrayIngredientsDoublons)).sort();
  // console.log(arrayIngredientsSansDoublons.length);
  datalistIngredients.innerHTML += 
    `
      ${arrayIngredientsSansDoublons.map(ingredient =>
        `
          <option>${ingredient}</option>
        `
        ).join('')}
    `
  // Appareils: Map et suppression des doublons avec flat/ Combinaison avec flatMap
  const arrayAppareilsDoublons = recipes.flatMap(recipe => recipe.appliance);
  const arrayAppareilsSansDoublons = Array.from(new Set(arrayAppareilsDoublons)).sort();
  // console.log(arrayAppareilsSansDoublons.length);
  datalistAppareils.innerHTML += 
    `
      ${arrayAppareilsSansDoublons.map(appliance =>
        `
          <option>${appliance}</option>
        `
        ).join('')}
    `
  //Ustensils: Map et suppression des doublons avec flat/ Combinaison avec flatMap
  const arrayUstensilsDoublons = recipes.flatMap(recipe => recipe.ustensils);
  const arrayUstensilsSansDoublons = Array.from(new Set(arrayUstensilsDoublons)).sort();
  // console.log(arrayUstensilsSansDoublons.length);
  datalistUstensils.innerHTML += 
    `
      ${arrayUstensilsSansDoublons.map(ustensils =>
        `
          <option>${ustensils}</option>
        `
        ).join('')}
    `
}
filtres();



// -------------------------
// Pour chaque input cliqué
// -------------------------
Array.from(document.querySelectorAll(".filtres_input")).map(input => {
  input.addEventListener('click', (e) => appearListIngredients(e.target))
});

// Fonction selection filtres: ingrédients, appareils et ustensils
function appearListIngredients(el){
  const data = document.querySelector(`datalist[data-filtre=${el.dataset.filtre}]`);
  // console.log(el.dataset);
  const imgDropDown = document.querySelector(`img[data-filtre=${el.dataset.filtre}]`);

          if(data.classList.contains('active')){
            data.classList.remove('active');
            data.style.display = 'none';
            imgDropDown.style.transform = 'rotate(180deg)';
          }else{
            data.classList.add('active');
            data.style.display = 'block';
            imgDropDown.style.transform = 'rotate(0deg)';
          };
};

// ------------------------------
// Fonction recherche ingrédients
// ------------------------------
const input = document.getElementById('filtres_ingredients');
// console.log(input);
input.addEventListener('input', filterIngredients)

function filterIngredients(e){
  const datalistIngredients = document.getElementById("datalist-ingredients");
  const arrayIngredientsDoublons = recipes.flatMap(ingres => ingres.ingredients.map(ing => ing.ingredient));
  const arrayIngredientsSansDoublons = Array.from(new Set(arrayIngredientsDoublons))
  // console.log(arrayIngredientsDoublons);

  datalistIngredients.innerHTML = ""

  const searchedIngredients = e.target.value.toLowerCase();
  // console.log(searchedIngredients);

  const filteredArray = arrayIngredientsSansDoublons.filter(ing => ing.toLowerCase().includes(searchedIngredients))
  console.log(filteredArray);
  datalistIngredients.innerHTML = filteredArray;

  if(filteredArray.length <= 0){
    datalistIngredients.innerHTML = "Aucune recette ne correspond à votre critère... vous pouvez chercher:" + arrayIngredientsSansDoublons
  }
};