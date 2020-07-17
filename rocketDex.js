// DOM Objects
const mainScreen = document.querySelector('.main-screen');
const pokeName = document.querySelector('.poke-name');
const pokeId = document.querySelector('.poke-id');
const pokeFrontImage = document.querySelector('.poke-front-image');
const pokeBackImage = document.querySelector('.poke-back-image');
const pokeTypeOne = document.querySelector('.poke-type-one');
const pokeTypeTwo = document.querySelector('.poke-type-two');
const pokeWeight = document.querySelector('.poke-weight');
const pokeHeight = document.querySelector('.poke-height');
const pokeListItems = document.querySelectorAll('.list-item');
const leftButton = document.querySelector('.left-button');
const rightButton = document.querySelector('.right-button');

// constants and variables

const TYPES = [
    'normal', 'fighting', 'ground',
    'poison', 'flying', 'rock',
    'grass', 'water', 'fire',
    'dragon', 'ghost', 'psychic',
    'dark', 'fairy', 'ice',
    'steel', 'bug', 'electric'
];

let prevUrl = null;
let nextUrl = null;

// Functions
const capitalize = (str) => str[0].toUpperCase() + str.substr(1);



const resetScreen = () => {
    mainScreen.classList.remove('hide');
    for (const type of TYPES) {
        mainScreen.classList.remove(type);
    }
};




const fetchPokeList = url =>{
    fetch(url)
.then(res => res.json())
.then(data => {

    const { results, previous, next } = data;
    prevUrl = previous;
    nextUrl = next;

    
    for(let i = 0; i < pokeListItems.length; i++) {
        const pokeListItem = pokeListItems[i];
        const resultData = results[i];
        
        if (resultData) {
            const { name, url } = resultData;
            const urlArray = url.split('/');
            const id = urlArray[urlArray.length - 2];
            pokeListItem.textContent = id + '. ' + capitalize(name);
        } else {
            pokeListItem.textContent = '';
        }
    }
});
};

const handleRightButtonClick = () => {
    if (nextUrl) {
        fetchPokeList(nextUrl);
    }
};

const handleLeftButtonClick = () => {
    if (prevUrl) {
        fetchPokeList(prevUrl);
    }
};



// get data for left side of the screen
fetch('https://pokeapi.co/api/v2/pokemon/200')
.then(res => 
res.json())
.then(data => {
    resetScreen();

    const dataTypes = data['types'];
    const dataFirstType = dataTypes[0];
    const dataSecondType = dataTypes[1];
    pokeTypeOne.textContent = capitalize(dataTypes[0]['type']['name']);

    if (dataSecondType) {
        pokeTypeTwo.classList.remove('hide');
        pokeTypeTwo.textContent = capitalize(dataSecondType['type']['name']);
    } else {
        pokeTypeTwo.classList.add('hide');
        pokeTypeTwo.textContent = '';
    }

    mainScreen.classList.add(dataFirstType['type']['name']);
    mainScreen.classList.remove('hide');
    

    pokeName.textContent = capitalize (data['name']);
    pokeId.textContent = '#' + data['id'].toString().padStart(3, '0');
    pokeWeight.textContent = ['weight'];
    pokeHeight.textContent = ['height'];
    pokeFrontImage.src = data['sprites']['front_default'] || '';
    pokeBackImage.src = data['sprites']['back_default'] || '';
});


// get data for the right side of the screen




// adding event listeners
leftButton.addEventListener('click', handleLeftButtonClick);
rightButton.addEventListener('click', handleRightButtonClick);



// init app

fetchPokeList('https://pokeapi.co/api/v2/pokemon?offset=20&limit=20');