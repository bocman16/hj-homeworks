'use strict';

const divPooling = document.querySelectorAll('.pooling div');

const loadPooling = namber => {
    if (namber >= 0 || namber <= 10) {
        let numberArry = parseInt(namber) - 1;
        divPooling.forEach(number => {
            if (number.classList.contains('flip-it')) {
                number.classList.remove('flip-it');
            }
            divPooling[numberArry].classList.add('flip-it');
        });
    }else{return false}
}

setInterval(() => {
    fetch('https://neto-api.herokuapp.com/comet/pooling')
        .then(res => res.json())
        .then(res => loadPooling(res))
        .catch(error => console.log(error))

}, 5000);