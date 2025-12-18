import { createSearchbar } from './searchbar.js';
import { displayCharacters } from './display.js';

// Function to fetch and display characters
const getCharacters = () => {
    fetch('/allcharacters')
        .then(response => response.json())
        .then(characters => {
            console.log('Fetched characters:', characters);
            displayCharacters(characters);
            createSearchbar(characters);
        })
        .catch(error => console.error('Error:', error));
};

// Load characters when the page loads
getCharacters();


// Function to fetch and display SEARCH characters
const getSearchCharacters = () => {
    fetch('/allcharacterssearch')
        .then(response => response.json())
        .then(scharacters => {
            console.log('Fetched searchbar characters:', scharacters);
            createSearchbar(scharacters);
        })
        .catch(error => console.error('Error:', error));
};

// Load characters when the page loads
getSearchCharacters();