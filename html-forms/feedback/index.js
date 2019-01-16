"use strict";

const form = document.getElementsByClassName("contentform");
const buttonContact = document.getElementsByClassName("button-contact");
const output = document.getElementById("output");
const nameField = document.getElementsByTagName("input");
const name = document.getElementsByTagName("name");

/////////////////////////////////////////////////

// form[0].addEventListener("change", showMessage);
// function showMessage() {
//   let container = [];
//   for (let i = 0; i < nameField.length; i++) {
//     if (nameField[i].value) {
//       container.push(nameField[i].value);
//       console.log(nameField[i].value)
//     }
//   }
//   if (container.length === 3) {
//     buttonContact[0].removeAttribute("disabled");
//   } else {
//     container.length = 0;
//     buttonContact[0].setAttribute("disabled", "");
//   }
// }

///////////////////////////////////////////////////////
form[0].addEventListener("input", indexHome);
function indexHome() {
  const index = document.querySelectorAll('[name="zip"]');
  let IndexValue = index[0].value;
  const number = /\d/;
  for (let numbers of IndexValue) {
    if (!number.test(numbers)) {
      index[0].value = "";
    }
  }
}

///////////////////////////////////////////////////////////
// for (const button of buttonContact) {
//     button.addEventListener('click', showMessages);
// };

buttonContact[0].addEventListener("click", showMessages);
function showMessages(event) {
  event.preventDefault();
  const tagName = event.currentTarget.tagName;
  if (tagName) {
    form[0].classList.add("hidden");
    output.classList.remove("hidden");
  }
}
//////////////////////////////////////////////////////
buttonContact[1].addEventListener("click", logEvent);
function logEvent(event) {
  const tagName = event.currentTarget;
  if (tagName) {
    form[0].classList.remove("hidden");
    output.classList.add("hidden");
  }
}

//////////////////////////////////////////TEEEEEEESSSSSSSSSSTTTTTTTTTTTT////////////////////////////////////////
const AllOutput = document.querySelectorAll("#output output"); //тут собраны output в которые нужно добавить value
//const nameField = document.getElementsByTagName("input");//тут инпуты из которых нужно брать значение name.value


form[0].addEventListener("change", showMessage);
function showMessage() {
  let container = [];
  for (let i = 0; i < nameField.length; i++) {
    if (nameField[i].value) {
      container.push(nameField[i].value);
    }
  }

  if (container.length >= 3) {
    buttonContact[0].removeAttribute("disabled");
  } else {
    container.length = 0;
    buttonContact[0].setAttribute("disabled", "");
  }
}


