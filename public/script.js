import { createSearchbar } from './searchbar.js';
import { displayCharacters } from './display.js';

// Function to fetch and display characters
const getCharacters = () => {
    fetch('/allcharacters')
        .then(response => response.json())
        .then(characters => {
            console.log('Fetched characters:', characters);
            displayCharacters(characters);
            
            // Fetch search data and pass full characters for filtering
            fetch('/allcharacterssearch')
                .then(response => response.json())
                .then(scharacters => {
                    console.log('Fetched searchbar characters:', scharacters);
                    createSearchbar(scharacters, characters);
                })
                .catch(error => console.error('Error:', error));
        })
        .catch(error => console.error('Error:', error));
};

// Load characters when the page loads
getCharacters();