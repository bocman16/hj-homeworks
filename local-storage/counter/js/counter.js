"use strict";

const counter = document.querySelector("#counter");
const button = document.querySelectorAll(".wrap-btns");
counter.textContent = localStorage.counterData || "0";

for (let click of button) {
  click.addEventListener("click", count);
}

function count(event) {
  const increment = document.querySelector("#increment");
  const decrement = document.querySelector("#decrement");
  if (event.target === increment) {
    counter.textContent++;
  } else if (event.target === decrement && counter.textContent > 0) {
    counter.textContent--;
  } else {
    counter.textContent = 0;
  }
  localStorage.counterData = counter.textContent;
}