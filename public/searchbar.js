import { displayCharacters } from './display.js';

// Variable to store the user's selected character
let selectedCharacter = null;

const createSearchbar = (searchCharacters, allCharacters) => {
  const searchForm = document.querySelector('#searchForm');
  const searchText = document.querySelector('#searchText');
  const searchContainer = document.querySelector('#searchContainer');

  // Function to populate searchContainer with filtered characters
  const populateSearchContainer = (characters) => {
    searchContainer.innerHTML = '';
    characters.forEach(character => {
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
        // Find and store the full character object
        const fullCharacter = allCharacters.find(char =>
          char.name.toLowerCase() === character.name.toLowerCase()
        );
        selectedCharacter = fullCharacter;
        // Display the character with comparison
        displayCharacters([fullCharacter], true);
      });
      
      searchContainer.appendChild(charDiv);
    });
  };

  // Initially populate with all search characters
  populateSearchContainer(searchCharacters);

  // Filter searchContainer on keydown
  searchText.addEventListener('keydown', (event) => {
    // Use setTimeout to get the value after the key is pressed
    setTimeout(() => {
      const query = searchText.value.toLowerCase();
      const filteredSearchCharacters = searchCharacters.filter(character =>
        character.name.toLowerCase().includes(query)
      );
      populateSearchContainer(filteredSearchCharacters);
    }, 0);
  });


  searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const query = searchText.value.toLowerCase();
    // Filter from allCharacters (full data) instead of searchCharacters
    const filteredCharacters = allCharacters.filter(character =>
      character.name.toLowerCase().includes(query)
    );
    if (filteredCharacters.length > 0) {
      selectedCharacter = filteredCharacters[0];
      // Display with comparison enabled
      displayCharacters(filteredCharacters, true);
    }
  });
};

export { createSearchbar, selectedCharacter };