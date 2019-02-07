"use strict";
const loadData = (data, url, registr) => {
    const output = document.querySelectorAll('output');
    fetch(url, {
            body: JSON.stringify(data),
            method: 'POST',
            headers: {
                'Content-Type': "application/json; charset=utf-8"
            },
        })
        .then(res => res.json())
        .then(res => {
            for (let name of output) {
                if (res.error) {
                    name.value = res.message
                } else {
                    name.value = `«Пользователь ${res.name} успешно ${registr}`
                }
            }
        })
        .catch(error => console.log(error))
};
const getFormData = form => {
    const formData = new FormData(form);
    const newFormData = {};
    for (const [key, value] of formData) {
        newFormData[key] = value;
    }
   return newFormData
};

const handleSubmitForm = evt => {
    evt.preventDefault();
    const signin = document.querySelector('.sign-in-htm');
    const form = evt.currentTarget;
    let url;
    let registr;
    if (signin === form) {
        url = 'https://neto-api.herokuapp.com/signin'
        registr = 'авторизован';
    } else {
        url = 'https://neto-api.herokuapp.com/signup'
        registr = 'зарегистрирован';
    }
    loadData(getFormData(form), url, registr);
}

const forms = document.querySelectorAll('form');
[...forms].forEach(form => form.addEventListener('submit', handleSubmitForm));