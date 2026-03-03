(() => {
  const sectionTag = document.getElementById("section_tags");
  window.divsTag = []; // global pour search.js

  function createTag(e) {
    const searchedTag = e.target.textContent.trim();
    const tagType = e.target.closest('[data-type]').dataset.type;

    if (window.divsTag.some(tag => tag.value === searchedTag.toLowerCase() && tag.type === tagType)) return;

    sectionTag.insertAdjacentHTML('beforeend', `
      <div class="section_tags-tag" data-type="${tagType}" data-value="${searchedTag.toLowerCase()}">
        <p class="p-tag">${searchedTag}</p>
        <img class="section_tags-delete" src="assets/img/delete-input.png" alt="supprimer tag">
      </div>
    `);

    window.divsTag.push({ type: tagType, value: searchedTag.toLowerCase() });
    window.search(); // recherche après ajout
  }

  function deleteTag(e) {
    const tagDiv = e.target.closest('.section_tags-tag');
    const { type, value } = tagDiv.dataset;

    window.divsTag = window.divsTag.filter(tag => !(tag.type === type && tag.value === value));
    tagDiv.remove();
    window.search(); // recherche après suppression
  }

  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('li-item')) createTag(e);
    if (e.target.classList.contains('section_tags-delete')) deleteTag(e);
  });

})();