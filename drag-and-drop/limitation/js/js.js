'use strict';

const eyes = document.querySelector('.block'),
    message = document.querySelector('.message'),
    textarea = document.querySelector('.textarea');

textarea.addEventListener('mouseover', () => {
    eyes.classList.add('active')
})

textarea.addEventListener('mouseout', () => {
    eyes.classList.remove('active')
})

textarea.addEventListener('keydown', () => {
    eyes.classList.add('active')
    message.classList.remove('view')
})

textarea.addEventListener('keydown', debounce(() => {
    eyes.classList.remove('active')
    message.classList.add('view')
}, 2000));


function debounce(callback, delay) {
    let timeout;
    return () => {
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            timeout = null;
            callback();
        }, delay);
    };
};