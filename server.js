const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

const { animals } = require('./data/animals.json');

function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = [];
    let filteredResults = animalsArray;
    if (query.personalityTraits) {
        // if personalityTraits is a string, place it into a new array and save
        if (typeof query.personalityTraits === 'string') {
            personalityTraitsArray = [query.personalityTraits];
        } else {
            personalityTraitsArray = query.personalityTraits;
        }
        // loop through each trait in the personalityTraits array: 
        personalityTraitsArray.forEach(trait => {
            filteredResults = filteredResults.filter(
              animal => animal.personalityTraits.indexOf(trait) !== -1
            );
        });
    }
    if (query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if (query.species) {
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if (query.name) {
        filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    return filteredResults;
};

function findById(id, animalsArray) {
    const result = animalsArray.filter(animal => animal.id === id)[0];
    return result;
};

app.get('/api/animals', (req, res) => {
    let result = animals; 
    if (req.query) {
        result = filterByQuery(req.query, result);
    }
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

app.get('/api/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    res.json(result);
})

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});

