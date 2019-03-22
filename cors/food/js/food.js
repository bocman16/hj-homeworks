/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */


const wrapper = document.querySelector('.wrapper');

function theseRecipes(data) {
  wrapper.querySelector('[data-pic]').style.backgroundImage = `url(${data.pic})`;
  wrapper.querySelector('[data-title]').textContent = data.title;
  const ingredients = wrapper.querySelector('[data-ingredients]');


  for (let i = 0; i < data.ingredients.length; i++) {
    ingredients.textContent += `${data.ingredients[i]},`;
  }
  ingredients.textContent = ingredients.textContent.slice(0, -1);
}

function recipeRating(data) {
  const star = wrapper.querySelector('[data-star]');
  wrapper.querySelector('[data-rating]').textContent = data.rating.toFixed(2);
  wrapper.querySelector('[data-votes]').textContent = `(${data.votes} оценок)`;
  star.style.width = data.rating * 100 / 10;
}

function listUser(data) {
  const consumers = wrapper.querySelector('[data-consumers]');
  for (let i = 0; i < data.consumers.length; i++) {
    consumers.insertAdjacentHTML('beforeend', `<img src="${data.consumers[i].pic}" title="${data.consumers[i].name}">`);
  }
  consumers.insertAdjacentHTML('beforeend', `<span>(+${data.total})</span>`);
}

function randName() {
  const callbackName = `cb${String(Math.random()).slice(-6)}`;
  return callbackName;
}

function loadData(url) {
  const functionName = randName();
  return new Promise((done, fail) => {
    window[functionName] = done;
    const script = document.createElement('script');
    script.src = `${url}?jsonp=${functionName}`;
    document.body.appendChild(script);
  });
}

Promise.all([loadData('https://neto-api.herokuapp.com/food/42').then(theseRecipes),
  loadData('https://neto-api.herokuapp.com/food/42/rating').then(recipeRating),
  loadData('https://neto-api.herokuapp.com/food/42/consumers').then(listUser),
]);
