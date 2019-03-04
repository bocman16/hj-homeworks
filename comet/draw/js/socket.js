'use strict';

const ws = new WebSocket("wss://neto-api.herokuapp.com/draw");

const editor = window.editor;
editor.addEventListener('update', e => {
    e.canvas.toBlob(blob => {
        ws.send(blob)
    })
})