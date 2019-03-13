'use strict';

document.addEventListener('DOMContentLoaded', updateEyePos);
document.addEventListener('mousemove', onMouseMove);
document.addEventListener('scroll', updateEyePos);


const eye = document.querySelector('.cat_eye_left');
let eyePos;
let eyeOtherPos;

function updateEyePos() {
  eyePos = eye.getBoundingClientRect();
  eyeOtherPos = {x: (eyePos.left + eyePos.right) / 2, y: (eyePos.top + eyePos.bottom) / 2};
 
}


function onMouseMove(event) {
  updateEyeParams({x: event.clientX, y: event.clientY}, eyeOtherPos);
}

function updateEyeParams(mouseCoords, eyeCenterCoords) {
    const offsetX = (mouseCoords.x - eyeCenterCoords.x) /
      ((mouseCoords.x > eyeCenterCoords.x) ? window.innerWidth - eyeCenterCoords.x : eyeCenterCoords.x);
  
    const offsetY = (mouseCoords.y - eyeCenterCoords.y) /
      ((mouseCoords.y > eyeCenterCoords.y) ? window.innerHeight - eyeCenterCoords.y : eyeCenterCoords.y);
  
    const pupil = document.querySelector('.cat_eye_left');
    pupil.style.setProperty('--pupil-x', getResult(offsetX));
    pupil.style.setProperty('--pupil-y', getResult(offsetY));
  }
  
  
  function getResult(percent) {
    return `${Math.round(percent * 30)}px`; }