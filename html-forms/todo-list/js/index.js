"use strict";

const output = document.getElementsByTagName("output");
const checkBox = document.getElementsByTagName("input");
const listBlock = document.getElementsByClassName("list-block");
document.addEventListener("DOMContentLoaded", init);

for (const button of checkBox) {
  button.addEventListener("input", showMessage);
};
function init() {
  for (let i = 0; i < checkBox.length; i++) {
    checkBox[i].checked = false;
  };
};

function showMessage() {
  let buttonPressed = 0;
  let totalButton = checkBox.length;
  for (let i = 0; i < checkBox.length; i++) {
    if (checkBox[i].checked) {
      buttonPressed++;
    };
  };
  output[0].value = `${buttonPressed} из ${totalButton}`;
  if (buttonPressed === 4) {
    listBlock[0].classList.add("complete");
  } else {
    listBlock[0].classList.remove("complete");
  };
};
