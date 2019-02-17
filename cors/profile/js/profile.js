'use strict';

function userValue(data){
    const content = document.querySelector('.content');
    const name = content.querySelector('[data-name]')
    const description = content.querySelector('[data-description]')
    const pic = content.querySelector('[data-pic]')
    const position = content.querySelector('[data-position]')
    const technologies = content.querySelector('[data-technologies]')
    const following = content.querySelector('[data-following]')
    name.textContent = data.name;

    console.log(data)
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
  loadData("https://neto-api.herokuapp.com/profile/me").then(userValue);
  
  
//  function technologiesUsed(){

//  }