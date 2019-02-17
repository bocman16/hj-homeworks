"use strict";

function userValue(data) {
  const container = document.querySelector(".container");
  container.querySelector("[data-wallpaper]").src = data.wallpaper;
  container.querySelector("[data-username]").textContent = data.username;
  container.querySelector("[data-description]").textContent = data.description;
  container.querySelector("[data-pic]").src = data.pic;
  container.querySelector("[data-tweets]").textContent = data.tweets;
  container.querySelector("[data-followers]").textContent = data.followers;
  container.querySelector("[data-following]").textContent = data.following;
}

function randName() {
  let callbackName = "cb" + String(Math.random()).slice(-6);
  return callbackName;
}

function loadData(url) {
  const functionName = randName();
  return new Promise((done, fail) => {
    window[functionName] = done;
    const script = document.createElement("script");
    script.src = `${url}?jsonp=${functionName}`;
    document.body.appendChild(script);
  });
}
loadData("https://neto-api.herokuapp.com/twitter/jsonp").then(userValue);