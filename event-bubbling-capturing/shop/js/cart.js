'use strict';

const itemsList = document.querySelector('.items-list');
itemsList.addEventListener('click', () => {
    event.preventDefault();
    const titlePrice = event.target.dataset;
    const tagName = event.target.tagName;
    if (tagName === "A") {
        addToCart(titlePrice);
    };
});