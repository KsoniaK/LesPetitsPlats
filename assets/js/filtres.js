// Ingrédients: Map et suppression des doublons avec flat / Combinaison avec flatMap
const arrayIngredientsDoublons = recipes.flatMap(recipe => recipe.ingredients.map(ing => ing.ingredient));
const arrayIngredientsSansDoublons = Array.from(new Set(arrayIngredientsDoublons));
const datalistIngredients = document.getElementById("datalist-ingredients");
const datalistAppareils = document.getElementById("datalist-appareils");
const datalistUstensils = document.getElementById("datalist-ustensils");
// Section recettes
const allRecipesSection = document.getElementById("recettes");
document.getElementById('recherche_principale-input').addEventListener('input', () => search());

// -----------------------------------------------------
// Listes (ingrédients, appareils, ustensils) des inputs
// -----------------------------------------------------
// Pour chaque input cliqué afficher la liste correspondante
Array.from(document.querySelectorAll(".filtres_input")).map(input => {
  input.addEventListener('click', (e) => appearLists(e.target))
});
// Fonction selection filtres: ingrédients, appareils et ustensils
function appearLists(el){
  // const motsClef = el.dataset.filtre;
  const data = document.querySelector(`datalist[data-filtre=${el.dataset.filtre}]`);
  const imgDropDown = document.querySelector(`img[data-filtre=${el.dataset.filtre}]`);

          if(data.classList.contains('active')){
            data.classList.remove('active');
            imgDropDown.style.transform = 'rotate(0deg)';
            // console.log("fermé");
          }else{
            data.classList.add('active');
            imgDropDown.style.transform = 'rotate(180deg)';
          };


  // // Ne faire appraître qu'une seule liste à la fois
  // const activeDatalist = document.querySelector(`datalist[data-filtre=${el.dataset.filtre}]`);
  // const datalistsTab = Array.from(document.querySelectorAll("datalist"));

  // datalistsTab.filter(datalist =>{  
  //   if(activeDatalist.dataset.filtre !== datalist.dataset.filtre){
  //     datalist.style.display = "none";
  //   }else{
  //     datalist.style.display = "flex"
  //   }
  // });

};

// ----
// Tags
// ----
// Création du tag
let divsTag = [];

function createTag(e){
  const sectionTag = document.getElementById('section_tags');
  const searchedTag = e.target.value;
  const tagType = e.target.closest('section').getAttribute('data-type');
  
    sectionTag.innerHTML += `
      <div class="section_tags-tag" data-type="${tagType}" data-value="${searchedTag.toLowerCase()}">
        <p class="p-tag">${searchedTag}</p>
        <img class="section_tags-delete" src="assets/img/delete.png" alt="supprimer tag">
      </div>`

      divsTag.push({type: tagType, value: searchedTag.toLowerCase()});
      search();
      
      // Suppression du tag cliqué dans la datalist
      const optionsItems = Array.from(document.querySelectorAll('.ing'));
      const val = searchedTag;

        const resultat = optionsItems.filter(optionItem => {
          if(optionItem.textContent !== val ){
            return optionItem.textContent;
          }
        }).map(x => x.textContent)

        datalistIngredients.innerHTML = ""
        // essai 1
        datalistIngredients.innerHTML += 
        `
        ${resultat.map(res => 
          `<option class="option-item ing">${res}</option>`).join('')}
        `
      };

// Suppression du tag
function deleteTags(e){
  const cross = e.target;
  const tagType = cross.closest('div').getAttribute('data-type');
  const tagValue = cross.closest('div').getAttribute('data-value');
  // Suppression de la valeur du divsTag
  divsTag = divsTag.filter(tag => tag.value != tagValue && tag.type != tagType)
  cross.closest('div').remove();
  search();
};

// -------
// Filtres
// -------
// Fonction qui va lancer le filtre principal et les tags
function search(){
  let results = principalFilterNativeLoop();
  if (divsTag.length > 0)
    results = filteredRecipesByTag(results);
    displayRecipes(results);
};

// // Filtre principal
// function principalFilter(){
//   // Récupérer la saisie de l'utilisateur
//   const wordSearched = document.getElementById('recherche_principale-input').value.toLowerCase();
//   let filteredRecipes = recipes;

//     if(wordSearched.length > 2){
//       filteredRecipes = recipes.filter(recette => {
//         let titleDescritionIngredients = recette.name + recette.description + recette.ingredients.toString();
//         if(titleDescritionIngredients.toLowerCase().includes(wordSearched)){
//           return recette
//         };
//       });
//   };
//   return filteredRecipes;
// };

// ------------------------------ TEST BOUCLE NATIVE ---------------------------------------------

// Filtre principal
function principalFilterNativeLoop(){
  // Récupérer la saisie de l'utilisateur
  let array = [];
  const wordSearched = document.getElementById('recherche_principale-input').value.toLowerCase();
  let names, descriptions, ingredients;

  // if (wordSearched.length > 2) {
    for (let i = 0; i < recipes.length; i++) {
      names = recipes[i].name;
      descriptions = recipes[i].description;
          if(names.toLowerCase().includes(wordSearched)){
            array.push(recipes[i]);
          };
          if(descriptions.toLowerCase().includes(wordSearched)){
            array.push(recipes[i]);
          };

        for (let j = 0; j < recipes[i].ingredients.length; j++) {
          ingredients = recipes[i].ingredients[j].ingredient

          if (ingredients.toLowerCase().includes(wordSearched)){
            array.push(recipes[i]);
          }
        }
      // }
  }
  array = [... new Set(array)]
  // console.log(array);
  return array;
};

// ------------------------------ TEST BOUCLE NATIVE ---------------------------------------------

// Filtres tags
function filteredRecipesByTag(datas) {
  let res = [];

  divsTag.forEach((tag) => {
    switch (tag.type) {
      case "ingredients":
        res = datas.filter((recipe) =>
        recipe.ingredients.some((ing) =>
            ing.ingredient.toLowerCase().includes(tag.value)
          )
        );

        res = [... new Set(res)]
        break;

        case "appliance":
          res = datas.filter((recipe) =>
          recipe.appliance.toLowerCase().includes(tag.value)
          );
  
          res = [... new Set(res)]
          break;

          case "ustensils":
            res = datas.filter((recipe) =>
            recipe.ustensils.some((ust) =>
                ust.toLowerCase().includes(tag.value)
              )
            );
    
            res = [... new Set(res)]
            break;
    }
  });
  return res;
};

// -----------------------
// Affichage des résultats
// -----------------------
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
    
    // Ingrédients: Map et suppression des doublons avec flat / Combinaison avec flatMap
    const arrayIngredientsDoublons = datas.flatMap(recipe => recipe.ingredients.map(ing => ing.ingredient));
    const arrayIngredientsSansDoublons = Array.from(new Set(arrayIngredientsDoublons));
    // Appareils: Map et suppression des doublons avec flat / Combinaison avec flatMap
    const arrayAppareilsDoublons = datas.flatMap(recipe => recipe.appliance);
    const arrayAppareilsSansDoublons = Array.from(new Set(arrayAppareilsDoublons));
    // Ustensils: Map et suppression des doublons avec flat / Combinaison avec flatMap
    const arrayUstensilsDoublons = datas.flatMap(recipe => recipe.ustensils);
    const arrayUstensilsSansDoublons = Array.from(new Set(arrayUstensilsDoublons));

    datalistIngredients.innerHTML += 
      `
        ${arrayIngredientsSansDoublons.map(ingredient =>
          `
            <option class="option-item ing">${ingredient}</option>
          `
          ).join('')}
      `
    datalistAppareils.innerHTML += 
      `
        ${arrayAppareilsSansDoublons.map(appliance =>
          `
            <option class="option-item app">${appliance}</option>
          `
          ).join('')}
      `
    datalistUstensils.innerHTML += 
      `
        ${arrayUstensilsSansDoublons.map(ustensil =>
          `
            <option class="option-item ust">${ustensil}</option>
          `
          ).join('')}
      `
    
      // input tag ingrédients
      let inputIngredientContent = document.getElementById("filtres_ingredients");
      inputIngredientContent.addEventListener('input', searchedIng);
      
      function searchedIng(){
        let searchedIngInput = inputIngredientContent.value

        datalistIngredients.innerHTML = "";
        
        const filteredArrayIngredients = arrayIngredientsSansDoublons.filter(ing => {
          if(ing.toLowerCase().includes(searchedIngInput)){
           datalistIngredients.innerHTML += `<option class="option-item">${ing}</option>`;
           return ing
          };
        });
        if(filteredArrayIngredients.length <= 0){
          datalistIngredients.textContent = "Aucun ingrédient ne correspond à votre recherche";
        }else{
          const optionsTags = Array.from(document.querySelectorAll('.option-item'));
          optionsTags.map(optionsTag => optionsTag.addEventListener('click', createTag));
        }
      }

      // input tag appareils
      let inputAppareilContent = document.getElementById("filtres_appareils");
      inputAppareilContent.addEventListener('input', searchedApp);
      
      function searchedApp(){
        let searchedAppInput = inputAppareilContent.value

        datalistAppareils.innerHTML = "";
        
        const filteredArrayAppareils = arrayAppareilsSansDoublons.filter(app => {
          if(app.toLowerCase().includes(searchedAppInput)){
            datalistAppareils.innerHTML += `<option class="option-item">${app}</option>`;
           return app
          };
        });
        if(filteredArrayAppareils.length <= 0){
          datalistAppareils.textContent = "Aucun appareil ne correspond à votre recherche";
        }else{
          const optionsTags = Array.from(document.querySelectorAll('.option-item'));
          optionsTags.map(optionsTag => optionsTag.addEventListener('click', createTag));
        };
      }

            // input tag ustensils
            let inputUstensilContent = document.getElementById("filtres_ustensils");
            inputUstensilContent.addEventListener('input', searchedUst);
            
            function searchedUst(){
              let searchedUstInput = inputUstensilContent.value
      
              datalistUstensils.innerHTML = "";
              
              const filteredArrayUstensils = arrayUstensilsSansDoublons.filter(ust => {
                if(ust.toLowerCase().includes(searchedUstInput)){
                  datalistUstensils.innerHTML += `<option class="option-item">${ust}</option>`;
                 return ust
                };
              });
              if(filteredArrayUstensils.length <= 0){
                datalistUstensils.textContent = "Aucun ustensil ne correspond à votre recherche";
              }else{
                const optionsTags = Array.from(document.querySelectorAll('.option-item'));
                optionsTags.map(optionsTag => optionsTag.addEventListener('click', createTag));
              };
            }

    // Evènement au click = création / suppression tags
    const optionsTags = Array.from(document.querySelectorAll('.option-item'));
    optionsTags.map(optionsTag => optionsTag.addEventListener('click', createTag));
    const sectionsDelete = Array.from(document.querySelectorAll('.section_tags-delete'));
    sectionsDelete.map(optionsTag => optionsTag.addEventListener('click', deleteTags));
    }else{
    // Datalists
    const dataIng = document.getElementById('datalist-ingredients');
    const dataApp = document.getElementById('datalist-appareils');
    const dataUst = document.getElementById('datalist-ustensils');

    sectionRecettes.innerHTML = `Aucun résultat trouvé... vous pouvez chercher: `;
    dataIng.style.backgroundColor = 'transparent'
    dataApp.style.backgroundColor = 'transparent'
    dataUst.style.backgroundColor = 'transparent'
  };
};
displayRecipes(recipes);