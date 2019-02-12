'use strict';

const connection = new WebSocket('wss://neto-api.herokuapp.com/counter');

window.addEventListener('beforeunload', () => {
    connection.onclose = function () {};
    connection.close(1000, 'Работа закончена')
})

connection.addEventListener('message', event => {
    const counter = document.querySelector('.counter');
    const outputErrors = document.querySelector('output.errors');
    let message = JSON.parse(event.data);
    counter.textContent = message.connections;
    outputErrors.textContent = message.errors;
})