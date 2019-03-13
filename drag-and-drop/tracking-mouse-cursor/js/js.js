'use strict';


document.addEventListener("DOMContentLoaded", function () {
    let X = 0;
    let Y = 0;

    function move() {
        document.querySelector('.cat_eye_left').style.left = X + 'px';
        document.querySelector('.cat_eye_left').style.top = Y + 'px';
    }
    document.addEventListener("mousemove", function (e) {
        X = e.clientX;
        Y = e.clientY;
    }, false);

    setInterval(move, 100);
});

console.log('sss')