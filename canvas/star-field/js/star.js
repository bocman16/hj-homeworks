'use strict';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let width = canvas.width;
let height = canvas.height;


canvas.addEventListener('click', generateNewPicture);

function removePicture() {
    canvas.width = canvas.width;
};

let count = [];
function generateNewPicture() {
    for (let i = 0; i < getRandomOfStars(); i++) {
        ctx.fillStyle = colorOfStars();
        ctx.fillRect(locationStarX(), locationStarY(), sizeOfStars(), sizeOfStars());
        ctx.globalAlpha = starBrightness()
    };
    count++;
    if (count > 1) {
        removePicture()
        count = 0
        generateNewPicture()
    };
};
generateNewPicture();



function getRandomOfStars() {
    const numberStars = Math.random() * (400 - 200) + 200;
    return numberStars.toFixed();
};

function sizeOfStars() {
    const sizeSstars = Math.random() * (1.1 - 0) + 0;
    return sizeSstars.toFixed(1);
};

function colorOfStars() {
    const colorStars = [`#ffffff`, `#ffe9c4`, `#d4fbff`];
    return colorStars[Math.floor(Math.random() * 3)];
};

function starBrightness() {
    const sizeBrightness = Math.random() * (1.1 - 0.8) + 0.8;
    return sizeBrightness.toFixed(1);
};

function locationStarX() {
    const locationStar = Math.random() * (width - 0) + 0;
    return locationStar.toFixed();
};

function locationStarY() {
    const locationStar = Math.random() * (height - 0) + 0;
    return locationStar.toFixed();
};