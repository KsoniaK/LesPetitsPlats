// Filtres ingrédients, appareils et ustensils
function filtres(){
  const datalistIngredients = document.getElementById("datalist-ingredients");
  const datalistAppareils = document.getElementById("datalist-appareils");
  const datalistUstensils = document.getElementById("datalist-ustensils");

  recipes.map(recipe => {
  const arrayIngredients = recipe.ingredients;
  const allAppareils = recipe.appliance;
  const arrayUstensils = recipe.ustensils;

  datalistIngredients.innerHTML += 
    `
      ${arrayIngredients.map(ingredient =>
        `
          <option>${ingredient.ingredient}</option>
        `
        ).join('')}
    `
  datalistAppareils.innerHTML +=
    `
          <option>${allAppareils}</option>
    `
  datalistUstensils.innerHTML += 
    `
      ${arrayUstensils.map(ustensil =>
        `
          <option>${ustensil}</option>
        `
        ).join('')}
    `
  });
  return({datalistIngredients, datalistAppareils, datalistUstensils});
}
filtres();
console.log(filtres.datalistUstensils);


// // Fonction selection filtres: ingrédients, appareils et ustensils
// function appearListIngredients(){
//   document.getElementById("datalist-ingredient").textContent = datalistVisible;
//   const allInputs = Array.from(document.querySelectorAll(".filtres_input"));
//   const imgsDropDown = Array.from(document.querySelectorAll(".filtres-img"));

//   allInputs.map(input =>{
//       input.addEventListener('click', function(){
//         const datalistBalises = Array.from(document.getElementsByTagName('datalist'));
//         const test = document.getElementById("filtres_ingredients").textContent = verification
          
//           // datalistBalises.map(datalistBalise =>{
              // const dataIngredients = document.querySelector(".datalist_ingredients");
              // const dataAppareils = document.querySelector(".datalist_appareils");
              // const dataUstensils = document.querySelector(".datalist_ustensils");
//           //  const classActive = datalistBalise.classList.contains('active');
//           //  console.log(classActive);

//           //   switch (classActive) {
//           //     case test:
//           //       dataIngredients.classList.remove('active');
//           //       dataIngredients.style.display = "block";
//           //       imgsDropDown.map(img =>{
//           //         img.style.transform = 'rotate(180deg)';
//           //       })
//           //       break;
//           //     case "datalist_appareils":
//           //       dataAppareils.classList.remove('active');
//           //       dataAppareils.style.display = "block";
//           //       imgsDropDown.map(img =>{
//           //         img.style.transform = 'rotate(180deg)';
//           //       })
//           //       break;
//           //     case "datalist_ustensils":
//           //       dataUstensils.classList.remove('active');
//           //       dataUstensils.style.display = "block";
//           //       imgsDropDown.map(img =>{
//           //         img.style.transform = 'rotate(180deg)';
//           //       })
//           //       break;
//           //     default:
//           //     console.log("if");
//           //     break;
//           //   }


//           //   switch (!classActive) {
//           //     case "datalist_ingredients":
//           //       dataIngredients.classList.add('active');
//           //       dataIngredients.style.display = "none";
//           //       imgsDropDown.map(img =>{
//           //         img.style.transform = 'rotate(0deg)';
//           //       })
//           //       break;
//           //     case "datalist_appareils":
//           //       dataAppareils.classList.add('active');
//           //       dataAppareils.style.display = "none";
//           //       imgsDropDown.map(img =>{
//           //         img.style.transform = 'rotate(0deg)';
//           //       })
//           //       break;
//           //     case "datalist_ustensils":
//           //       dataUstensils.classList.add('active');
//           //       dataUstensils.style.display = "none";
//           //       imgsDropDown.map(img =>{
//           //         img.style.transform = 'rotate(0deg)';
//           //       })
//           //       break;
//           //     default:
//           //     console.log("else");
//           //     break;
//           //   }
//           // });
//         })
//   })
// }
// appearListIngredients();


Array.from(document.querySelectorAll(".filtres_input")).map(input => {
  input.addEventListener('click', (e) => appearListIngredients(e.target))
});

// Fonction selection filtres: ingrédients, appareils et ustensils
function appearListIngredients(el){
  const data = document.querySelector(`datalist[data-filtre=${el.dataset.filtre}]`);
  const imgDropDown = document.querySelector(`img[data-filtre=${el.dataset.filtre}]`);

          if(data.classList.contains('active')){
            data.classList.remove('active');
            data.style.display = 'none';
            imgDropDown.style.transform = 'rotate(180deg)';
          }else{
            data.classList.add('active');
            data.style.display = 'block';
            imgDropDown.style.transform = 'rotate(0deg)';
          }
}

// tab = ['sandrine', 'mathieu', 'marc'];

// const  test1  = tab.forEach(x => console.log('coucou ', x))
// const  test2 = tab.map(x => console.log('coucou ', x))


// // Auto-complétion filtres: ingrédients, appareils et ustensils
// function autoCompleteMatch(){

// }
// autoCompleteMatch();