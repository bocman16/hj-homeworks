'use strict';

const app = document.querySelector('.app');
const video = document.createElement('video');
app.appendChild(video);


navigator.mediaDevices
.getUserMedia({video: true, audio: false})
.then((stream) => {
   const video = document.querySelector('video');
    video.src = URL.createObjectURL(stream);
    video.play()
    })
.catch(err => console.warn('oh noes'));



