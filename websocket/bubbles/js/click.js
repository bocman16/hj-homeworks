'use strict';

const connection = new WebSocket('wss://neto-api.herokuapp.com/mouse');

connection.addEventListener('open', () => {
    showBubbles(connection)
})

const getRelativeCoords = evt => {
    const data = {x: evt.offsetX || evt.layerX, y: event.offsetY || evt.layerY}
    connection.send(JSON.stringify(data));
}
document.addEventListener('click', getRelativeCoords)

