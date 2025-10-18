import { displayCharacters } from './display.js';

const createSearchbar = (characters) => {
  const searchForm = document.querySelector('#searchForm');
  const searchText = document.querySelector('#searchText');

  searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const query = searchText.value.toLowerCase();
    const filteredCharacters = characters.filter(character =>
      character.name.toLowerCase().includes(query)
    );
    displayCharacters(filteredCharacters);
  });
};

export { createSearchbar };