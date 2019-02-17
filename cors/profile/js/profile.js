'use strict';

const content = document.querySelector('.content');

function userValue(data) {
  content.querySelector('[data-name]').textContent = data.name;
  content.querySelector('[data-description]').textContent = data.description;
  content.querySelector('[data-pic]').src = data.pic;
  content.querySelector('[data-position]').textContent = data.position;
  let id = `${data.id}/technologies`;
  loadData(`https://neto-api.herokuapp.com/profile/` + `${id}`).then(technologiesUsed);
};

function randName() {
  let callbackName = "cb" + String(Math.random()).slice(-6);
  return callbackName;
};

function loadData(url) {
  const functionName = randName();
  return new Promise((done, fail) => {
    window[functionName] = done;
    const script = document.createElement("script");
    script.src = `${url}?jsonp=${functionName}`;
    document.body.appendChild(script);
  });
};
loadData("https://neto-api.herokuapp.com/profile/me").then(userValue);


function technologiesUsed(id) {
  const technologies = content.querySelector('[data-technologies]');
  for (let i = 0; i < id.length; i++) {
    technologies.insertAdjacentHTML(`beforeEnd`, `<span class="devicons devicons-${id[i]}"></span>`);
  }
  content.style.display = 'initial';
};