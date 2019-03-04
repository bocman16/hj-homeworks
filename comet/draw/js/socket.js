'use strict';

const ws = new WebSocket("wss://neto-api.herokuapp.com/draw");

const editor = window.editor;
editor.addEventListener('update', e => {
    const canvas = document.querySelector('#canvas');
    canvas.toBlob(blob => {
        ws.send(blob)
    })
})