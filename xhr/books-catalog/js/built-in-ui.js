/* Данный JS код */

// Регулируем видимость карточки
function toggleCardVisible() {
    document.getElementById('content').classList.toggle('hidden');
    document.getElementById('card').classList.toggle('hidden');
}


document.getElementById('close').addEventListener('click', toggleCardVisible);

document.getElementById('content').addEventListener('click', (event) => {
    let target = null;
    if (event.target.tagName === 'LI') {
        target = event.target;
    }
    if (event.target.parentNode.tagName === 'LI') {
        target = event.target.parentNode;
    }

    if (target) {
        toggleCardVisible();
        document.getElementById('card-title').innerHTML = target.dataset.title;
        document.getElementById('card-author').innerHTML = target.dataset.author;
        document.getElementById('card-info').innerHTML = target.dataset.info;
        document.getElementById('card-price').innerHTML = target.dataset.price;
    }
});

let xhr = new XMLHttpRequest();
xhr.addEventListener("load", onLoad);
xhr.open("GET", 'https://neto-api.herokuapp.com/book/', true);
xhr.send();

function onLoad() {
    let book = JSON.parse(xhr.responseText);
    let container = document.getElementById("content");
    container.innerHTML -= `<li data-title data-author data-info data-price> <img src = ''></li>`;
    for (let i = 0; i < book.length; i++) {
        container.innerHTML += `<li data-title data-author data-info data-price> <img src = ''></li>`;
        const bookList = document.querySelectorAll('ul#content li');
        const imges = document.querySelectorAll('li img');
        bookList[i].dataset.title = book[i].title;
        bookList[i].dataset.author.name = book[i].author.name;
        bookList[i].dataset.info = book[i].info;
        bookList[i].dataset.price = book[i].price;
        imges[i].src = book[i].cover.small;
    };
};

