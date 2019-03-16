"use strict";
document.addEventListener('mousemove', event => moveEyes(event))

function Eye(className) {
  this.eye = document.querySelector(`${className}`);
  this.box = this.eye.getBoundingClientRect();
  this.centrePoint =  window.getComputedStyle(this.eye).transformOrigin;
  this.centers = this.centrePoint.split(" ");
}

const le = new Eye('.cat_position_for_left_eye')
const re = new Eye('.cat_position_for_right_eye')


const moveEyes = throttle((event) =>{
  const mouseX = event.clientX;
  const mouseY = event.clientY;
  rotateEye(le, mouseX, mouseY);
  rotateEye(re, mouseX, mouseY);
})

function rotateEye(eye, mouseX, mouseY) {
  const centerY = eye.box.top + parseInt(eye.centers[1]) - window.pageYOffset;
  const centerX = eye.box.left + parseInt(eye.centers[0]) - window.pageXOffset;
  const radians = Math.atan2(mouseX - centerX, mouseY - centerY);
  const degrees = (radians * (180 / Math.PI) * -1) + 45;
  eye.eye.style.transform = 'rotate('+degrees+'deg)';
}

function throttle(callback) {
  let isWaiting = false;
  return function () {
    if (!isWaiting) {
      callback.apply(this, arguments);
      isWaiting = true;
      requestAnimationFrame(() => {
        isWaiting = false;
      });
    }
  };
}