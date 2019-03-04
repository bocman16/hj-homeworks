'use strict';

const divLong = document.querySelectorAll('.long-pooling div');

const loadNumber = namber => {
    if (namber >= 0 || namber <= 10) {
        let numberArry = parseInt(namber) - 1;
        divLong.forEach(number => {
            if (number.classList.contains('flip-it')) {
                number.classList.remove('flip-it');
            }
            divLong[numberArry].classList.add('flip-it');
        });
    }else{return false}
}

setInterval(() => {
    fetch('https://neto-api.herokuapp.com/comet/long-pooling')
        .then(res => res.json())
        .then(res => loadNumber(res))
        .catch(error => console.log(error))

}, 5000);