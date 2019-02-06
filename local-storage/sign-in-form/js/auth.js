"use strict";

const baseUrl = 'https://neto-api.herokuapp.com/';

const getUrl = string => `${baseUrl}${string}`;

const mapValue = {
    signIn: 'аворизован',
    signUp: 'зарегистирирован'
};

const mapResultValue = Object.keys(mapValue).reduce((prev, cur) => {
    prev[cur] = mapValue[cur];
    console.log(prev)
    return prev;
}, {});


const renderOutput = (form, response) => {
    const output = form.querySelector('output');
    output.value = !response.error ?
        `Пользователь ${response.name} успешно ${mapResultValue[form.dataset.param]}` :
        response.message;
};

const dataChange = {
    render: renderOutput,
    form: '',
};

const loadData = (url, data, paramsForm) =>
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': "application/json; charset=utf-8"
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => {
        const {
            render,
            form
        } = paramsForm;
        render(form, res);
    })
    .catch(error => console.log(error));

const getFormData = form => {
    const formData = new FormData(form);
    return [...formData].reduce((prev, cur) => {
        prev[cur[0]] = cur[1];
        return prev;
    }, {});
};

const handleSubmitForm = evt => {
    evt.preventDefault();
    const signin = document.querySelector('.sign-in-htm');
    const form = evt.currentTarget;
    if (signin === form) {
        form.dataset.param = 'signIn'
    } else {
        form.dataset.param = 'signUp'
    }
    const paramUrl = getUrl([form.dataset.param]);
    dataChange.form = form;
    loadData(paramUrl, getFormData(form), dataChange);

};

const forms = document.querySelectorAll('form');
[...forms].forEach(form => form.addEventListener('submit', handleSubmitForm));






// async/await

// const loadData = async (url, data, paramsForm) => {
//     const obj = {
//         method: 'POST',
//         headers: {'Content-Type': "application/json; charset=utf-8"},
//         body: ''
//     };
//     try {
//         obj.body = JSON.stringify(data);
//         const request = await fetch(url, obj);
//         const response = await request.json();
//         const {render, form} = paramsForm;
//         render(form, response);
//     } catch (e) {
//         console.log(e.message);
//     }
// };