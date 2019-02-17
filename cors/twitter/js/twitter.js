"use strict";

function userValue(data) {
  const container = document.querySelector(".container");
  const wallpaper = container.querySelector("[data-wallpaper]");
  const username = container.querySelector("[data-username]");
  const description = container.querySelector("[data-description]");
  const pic = container.querySelector("[data-pic]");
  const tweets = container.querySelector("[data-tweets]");
  const followers = container.querySelector("[data-followers]");
  const following = container.querySelector("[data-following]");
  wallpaper.src = data.wallpaper;
  username.textContent = data.username;
  description.textContent = data.description;
  pic.src = data.pic;
  tweets.textContent = data.tweets;
  followers.textContent = data.followers;
  following.textContent = data.following;
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
