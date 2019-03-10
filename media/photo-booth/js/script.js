'use strict';

const app = document.querySelector('.app'),
    controls = document.querySelector('.controls'),
    btnTakePhoto = controls.querySelector('#take-photo'),
    errors = document.getElementById('error-message'),
    listImages = document.querySelector('.list'),
    video = document.createElement('video'),
    audio = document.createElement('audio');

audio.src = './audio/click.mp3';
app.appendChild(video);
video.width="320"
video.height="240"

navigator.mediaDevices
    .getUserMedia({ video: true,audio: false})
    .then((stream) => {
        video.src = URL.createObjectURL(stream);
        video.play()
    })
    .catch(err => console.log(err.message));

    console.log('sss')