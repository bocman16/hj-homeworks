"use strict";
const form = document.querySelector(".contentform");
const buttonContact = document.querySelector("main button");
const formButton = document.querySelector(`[type="submit"]`);
const AllOutput = document.querySelector("#output");
const data = document.querySelectorAll("input, textarea");

form.addEventListener("input", showMessage);
function showMessage() {
  let container = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].value) {
      container.push(data[i].value);
    };
  };
  if (container.length === data.length) {
    formButton.removeAttribute("disabled");
  } else {
    container.length = 0;
    formButton.setAttribute("disabled", "");
  };
};
form.addEventListener("input", indexHome);
function indexHome() {
  const index = document.querySelector('[name="zip"]');
  let IndexValue = index.value;
  const number = /\d/;
  for (let numbers of IndexValue) {
    if (!number.test(numbers)) {
      index.value = "";
    };
  };
};
buttonContact.addEventListener("click", showMessages);
formButton.addEventListener("click", showMessages);

function showMessages(event) {
  event.preventDefault();
  const tagName = event.currentTarget;
  if (tagName === formButton) {
    form.classList.add("hidden");
    AllOutput.classList.remove("hidden");
  }
  else if (tagName === buttonContact) {
    form.classList.remove("hidden");
    AllOutput.classList.add("hidden");
  }
  data.forEach(el => {
    const elem = AllOutput.querySelector(`#${el.name}`);
    if (elem) {
      elem.textContent = el.value;
    }
  });
};
