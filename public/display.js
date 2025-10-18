// Get the container where we'll display the characters
const characterContainer = document.querySelector('#characters');

// Function to display characters
export const displayCharacters = (characters) => {
    // Clear the container
    characterContainer.innerHTML = `
        <div class="propertyHeader">
            <h2 class="propertyLabel propertyCharacterLabel">character</h2>
            <div class="propertiesFilteredContainer">
                <h2 class="propertyLabel">gender</h2>
                <h2 class="propertyLabel">affiliation</h2>
                <h2 class="propertyLabel">nationality</h2>
                <h2 class="propertyLabel">stand type</h2>
                <h2 class="propertyLabel">part</h2>
            </div>
        </div>
    `;

    // Display each character
    characters.forEach(character => {
        const characterDiv = document.createElement('div');
        characterDiv.className = 'character-card';
        
        // Filter and order the properties we want to display
        const propertiesToShow = ['gender', 'affiliation', 'nationality', 'standType', 'part'];
        
        // Create filtered property object
        const filteredProperties = propertiesToShow.map(prop => ({
            name: prop.charAt(0).toUpperCase() + prop.slice(1),
            value: Array.isArray(character[prop]) ? character[prop].join(', ') : (character[prop] || 'N/A')
        }));

        // Add character info to the div using the Wordle-style template
        characterDiv.innerHTML = `
            <div class="property">
                <div class="propertyImage" style="background-image: url('${character.image || ''}')">
                </div>
                <div class="propertiesContainer">
                    ${filteredProperties.map(prop => `
                        <div class="propertyBox">
                            <p class="propertyValue">${prop.value}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        characterContainer.appendChild(characterDiv);
    });
};