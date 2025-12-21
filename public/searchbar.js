import { displayCharacters } from './display.js';

const createSearchbar = (searchCharacters, allCharacters) => {
  const searchForm = document.querySelector('#searchForm');
  const searchText = document.querySelector('#searchText');
  const searchContainer = document.querySelector('#searchContainer');

  // Populate searchContainer with search characters (name + image only)
  searchContainer.innerHTML = '';
  searchCharacters.forEach(character => {
    const charDiv = document.createElement('div');
    charDiv.className = 'search-item';
    
    const img = document.createElement('img');
    img.src = character.image;
    img.alt = character.name;
    
    const name = document.createElement('span');
    name.textContent = character.name;
    
    charDiv.appendChild(img);
    charDiv.appendChild(name);
    
    // When a user clicks on a character from the searchContainer, fill in the search bar with that character's name
    charDiv.addEventListener('click', () => {
      searchText.value = character.name;
      // Filter and display the selected character
      const filteredCharacters = allCharacters.filter(char =>
        char.name.toLowerCase().includes(character.name.toLowerCase())
      );
      displayCharacters(filteredCharacters);
    });
    
    searchContainer.appendChild(charDiv);
  });


  searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const query = searchText.value.toLowerCase();
    // Filter from allCharacters (full data) instead of searchCharacters
    const filteredCharacters = allCharacters.filter(character =>
      character.name.toLowerCase().includes(query)
    );
    displayCharacters(filteredCharacters);
  });
};

export { createSearchbar };