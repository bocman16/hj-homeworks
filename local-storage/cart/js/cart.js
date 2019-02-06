'use strict';

const colorSwatch = document.querySelector('#colorSwatch'); //Варианты цвета
const sizeSwatch = document.querySelector('#sizeSwatch'); //Варианты размера
const quickCart = document.querySelector('#quick-cart'); //Корзина 
const quickCartPrice = document.querySelector('.quick-cart-price'); //Общая стоимость всех товаров
// const header = document.querySelector('.header');
// quickCart.addEventListener('submit', handleSubmitForm)

// colorSwatch.addEventListener('click', event => {
//     event.preventDefault();
//     console.log(event.target)
// })
document.addEventListener('DOMContentLoaded', handleSubmitForm)

function handleSubmitForm() {
    Promise.all([
            fetch('https://neto-api.herokuapp.com/cart/colors'),
            fetch('https://neto-api.herokuapp.com/cart/sizes'),
            fetch('https://neto-api.herokuapp.com/cart')
        ])
        .then(([res1, res2, res3]) => {
            res1.json(), res2.json(), res3.json()
        .then((data) => {
            console.log(data)
        })
        .catch((error) => {
            console.log(error)
        })
    })
}
function loadData(url, callBack) {
    fetch(url)
      .then(res => res.json())
      .then(res => callBack(res))
      .catch(error => console.log(error))
  }
  Promise.all([
    loadData(url.color, loadColors),
    loadData(url.size, loadSizes),
]);
