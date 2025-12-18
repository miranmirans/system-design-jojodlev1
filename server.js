// import Express library and activate it
import express from "express";
const app = express();

import {fileURLToPath} from 'url';
import {dirname} from 'path';
import { readFileSync } from 'fs'; // Changed from read to readFileSync
import { join } from 'path'; 
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// Serve static files from /public folder with aggressive cache-busting
app.use(express.static('public', {
  etag: false,
  lastModified: false,
  setHeaders: (res, path) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Surrogate-Control', 'no-store');
  }
}))
// Define index.html as the root explicitly (useful on Vercel, optional when running Node locally).
app.get('/', (req, res) => { res.redirect('/index.html') })



// // listen for requests from the frontend
// app.get("/picture/:chosenDate", (req, res) => {
//     // assemble a url for NASA API
//     let url = new URL('https://api.nasa.gov/planetary/apod')
//     url.searchParams.set('date', req.params.chosenDate)     // chosenDate via the URL.
//     url.searchParams.set('api_key', process.env.NASA_KEY)   // API key via environment variable.
//     // Relay the results back to the frontend
//     fetch(url)
//         .then(response => response.json())
//         .then(json => res.send(json))
// });

//retrieve character data from jojo api
app.get('/allcharacters', (req, res) => {
    try {
            const characterPath = join(__dirname, 'jojocharacters.json');
            const characterData = readFileSync(characterPath, 'utf8');
            let allCharacters = JSON.parse(characterData);

            res.json(allCharacters);

    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error reading character data');
    }
});

//Start of Character of the Day generation code
function getCharacterOfTheDay(characters) {
    // Get current date in UTC (YYYY-MM-DD format) to ensure global consistency
    const today = new Date();
    const dateString = today.getFullYear() + '-' + 
                      String(today.getMonth() + 1).padStart(2, '0') + '-' + 
                      String(today.getDate()).padStart(2, '0');
        
    // Create a simple hash from the date string
    // This creates a deterministic "seed" from the date
    let hash = 0;
    for (let i = 0; i < dateString.length; i++) {
        const char = dateString.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
    }
    
    // Use the hash to select an index
    // Make sure it's positive and within array bounds
    const index = Math.abs(hash) % characters.length;
    
    console.log('Date string for character selection:', dateString);
    console.log('Generated hash:', hash);
    console.log('Selected index:', index);
    console.log('Character of the day:', characters[index].name);
    
    return characters[index];
}

// Add a new endpoint for character of the day
app.get('/characteroftheday', (req, res) => {
    console.log('Character of the day endpoint called');
    try {
        const characterPath = join(__dirname, 'jojocharacters.json');
        const characterData = readFileSync(characterPath, 'utf8');
        let allCharacters = JSON.parse(characterData);
        
        const characterOfTheDay = getCharacterOfTheDay(allCharacters);
        
        res.json(characterOfTheDay);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error reading character data');
    }
});


const port = 3000
// app.listen(...): starts the web server and prints a message when it's ready.
// You can then open the URL in your browser to use the app locally.
app.listen(port, () => {
    console.log(`Express is live at http://localhost:${port}`)
})
