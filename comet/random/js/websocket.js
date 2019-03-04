'use strict';


const div = document.querySelectorAll('.websocket div');
const connection = new WebSocket('wss://neto-api.herokuapp.com/comet/websocket');

connection.addEventListener('message', event => {
    if (event.data >= 0 || event.data <= 10) {
        let numberArry = parseInt(event.data) - 1;
        div.forEach(number => {
            if (number.classList.contains('flip-it')) {
                number.classList.remove('flip-it');
            }
            div[numberArry].classList.add('flip-it');
        });
    }else {return false}
});