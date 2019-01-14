'use strict';

const source = document.getElementById('source');
const from = document.getElementById('from');
const to = document.getElementById('to');
const result = document.getElementById('result');
document.getElementById("loader").classList.remove("hidden");

let xhr = new XMLHttpRequest();
xhr.addEventListener("load", onLoad);
xhr.open("GET", 'https://neto-api.herokuapp.com/currency', true);
xhr.send();

function onLoad() {
    document.getElementById("loader").classList.add("hidden");
    document.getElementById("content").classList.remove("hidden");
    try {
        let currency = JSON.parse(xhr.responseText);
        for (let i = 0; i < currency.length; i++) {
            from.innerHTML += `<option></option>`;
            to.innerHTML += `<option></option>`;
            const optionFrom = document.querySelectorAll('#from option');
            const optionTo = document.querySelectorAll('#to option');
            optionFrom[i].innerHTML = currency[i].code;
            optionFrom[i].value = currency[i].value;
            optionTo[i].innerHTML = currency[i].code;
            optionTo[i].value = currency[i].value;
        };
    } catch (error) {
        console.log(`Ошибка в данных`);
    }
    showMessage();
};


source.addEventListener('input', showMessage);
from.addEventListener('input', showMessage);
to.addEventListener('input', showMessage);

function showMessage() {
    let tootl;
    let selectedFromOptions = from.selectedOptions;
    let selectedToOptions = to.selectedOptions;
    for (let i = 0; i < selectedFromOptions.length; i++) {
        tootl = source.value * selectedFromOptions[i].value / selectedToOptions[i].value;
        tootl = tootl.toFixed(2);
    }
    result.value = `${tootl}`;
};
