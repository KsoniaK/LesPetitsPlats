// Filtres ingrédients, appareils, ustensils
function filtres(){
  const sectionFiltres = document.getElementById("filtres");

  return sectionFiltres.innerHTML = 
  `
    <div class="container_ingredients">
    <input list="bieres" type="text" class="filtres_ingredients" placeholder="Ingredients">
    <img src="assets/img/down-arrow.png" alt=""/>
    <datalist id="bieres">
        <option value="Meteor"></option>
        <option value="Pils"></option>
        <option value="Kronenbourg"></option>
        <option value="Grimbergen"></option>
    </datalist>
    <div class="selection_ingredients" style="display:none;">
        <div class="selection_ingredients-nom">
            <p>premier</p>
            <p>deuxieme</p>
            <p>troisieme</p>
            <p>quatrieme</p>
            <p>cinquieme</p>
            <p>sixième</p>
            <p>septieme</p>
            <p>huitième</p>
            <p>neuvième</p>
            <p>dixième</p>
        </div>
        <div class="selection_ingredients-nom">
            <p>premier</p>
            <p>deuxieme</p>
            <p>troisieme</p>
            <p>quatrieme</p>
            <p>cinquieme</p>
            <p>sixième</p>
            <p>septieme</p>
            <p>huitième</p>
            <p>neuvième</p>
            <p>dixième</p>
        </div>
        <div class="selection_ingredients-nom">
            <p>premier</p>
            <p>deuxieme</p>
            <p>troisieme</p>
            <p>quatrieme</p>
            <p>cinquieme</p>
            <p>sixième</p>
            <p>septieme</p>
            <p>huitième</p>
            <p>neuvième</p>
            <p>dixième</p>
        </div>
    </div>
  </div>
  <!-- appareil -->
  <!-- <label for="choix_bieres">Indiquez votre bière préférée :</label> -->
  <div class="container_appareils">
  <input list="bieres" type="text" class="filtres_appareils" placeholder="Appareils">
  <img src="assets/img/down-arrow.png" alt=""/>
  <datalist id="bieres">
    <option value="Meteor"></option>
    <option value="Pils"></option>
    <option value="Kronenbourg"></option>
    <option value="Grimbergen"></option>
  </datalist>
  <div class="selection_appareils" style="display:none;">
    <div class="selection_appareils-nom">
        <p>premier</p>
        <p>deuxieme</p>
        <p>troisieme</p>
        <p>quatrieme</p>
        <p>cinquieme</p>
        <p>sixième</p>
        <p>septieme</p>
        <p>huitième</p>
        <p>neuvième</p>
        <p>dixième</p>
    </div>
    <div class="selection_appareils-nom">
        <p>premier</p>
        <p>deuxieme</p>
        <p>troisieme</p>
        <p>quatrieme</p>
        <p>cinquieme</p>
        <p>sixième</p>
        <p>septieme</p>
        <p>huitième</p>
        <p>neuvième</p>
        <p>dixième</p>
    </div>
    <div class="selection_appareils-nom">
        <p>premier</p>
        <p>deuxieme</p>
        <p>troisieme</p>
        <p>quatrieme</p>
        <p>cinquieme</p>
        <p>sixième</p>
        <p>septieme</p>
        <p>huitième</p>
        <p>neuvième</p>
        <p>dixième</p>
    </div>
  </div>
  </div>
  <!-- ustensils -->
  <!-- <label for="choix_bieres">Indiquez votre bière préférée :</label> -->
  <div class="container_ustensils">
  <input list="bieres" type="text" class="filtres_ustensils" placeholder="Ustensils">
  <img src="assets/img/down-arrow.png" alt=""/>
  <datalist id="bieres">
    <option value="Meteor"></option>
    <option value="Pils"></option>
    <option value="Kronenbourg"></option>
    <option value="Grimbergen"></option>
  </datalist>
  <div class="selection_ustensils" style="display:none;">
    <div class="selection_ustensils-nom">
        <p>premier</p>
        <p>deuxieme</p>
        <p>troisieme</p>
        <p>quatrieme</p>
        <p>cinquieme</p>
        <p>sixième</p>
        <p>septieme</p>
        <p>huitième</p>
        <p>neuvième</p>
        <p>dixième</p>
    </div>
    <div class="selection_ustensils-nom">
        <p>premier</p>
        <p>deuxieme</p>
        <p>troisieme</p>
        <p>quatrieme</p>
        <p>cinquieme</p>
        <p>sixième</p>
        <p>septieme</p>
        <p>huitième</p>
        <p>neuvième</p>
        <p>dixième</p>
    </div>
    <div class="selection_ustensils-nom">
        <p>premier</p>
        <p>deuxieme</p>
        <p>troisieme</p>
        <p>quatrieme</p>
        <p>cinquieme</p>
        <p>sixième</p>
        <p>septieme</p>
        <p>huitième</p>
        <p>neuvième</p>
        <p>dixième</p>
    </div>
  </div>
  </div>
`
}
filtres();