"use strict";

const app = document.querySelector(".app"),
  controls = document.querySelector(".controls"),
  btnTakePhoto = controls.querySelector("#take-photo"),
  errors = document.getElementById("error-message"),
  listImages = document.querySelector(".list"),
  image = document.createElement("img"),
  canvas = document.createElement("canvas"),
  ctx = canvas.getContext("2d"),
  video = document.createElement("video"),
  audio = document.createElement("audio");

app.appendChild(video);

audio.src = "./audio/click.mp3";

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then(stream => {
      video.srcObject = stream;
      controls.style.display = "flex";

      video.addEventListener("canplay", evt => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        btnTakePhoto.addEventListener("click", () => {
          ctx.drawImage(video, 0, 0);
          image.src = canvas.toDataURL();
          createCard();
        });
      });
      video.play();
    })

    .catch(error => {
      errors.textContent = `Нет доступа к камере. Ошибка ${error.name}`;
      errors.style.display = "block";
    });
} else {
  errors.textContent = "Ваш браузер не поддерживает mediaDevices";
  errors.style.display = "block";
}

//создаем схему фото

function createCard() {
  const figure = document.createElement("figure"),
    img = document.createElement("img"),
    figcaption = document.createElement("figcaption"),
    a = document.createElement("a"),
    i = document.createElement("i"),
    cloneUpload = a.cloneNode(true),
    cloneUploadI = i.cloneNode(true),
    CloneDelete = a.cloneNode(true),
    CloneDeleteI = i.cloneNode(true);
  //////
  listImages.prepend(figure);
  figure.appendChild(img);
  img.src = image.src;
  ////////
  figure.appendChild(figcaption);
  figcaption.appendChild(a);
  a.href = image.src;
  a.download = "snapshot.png";

  a.appendChild(i);
  i.className = "material-icons";
  i.textContent = "file_download";
  ///////
  figcaption.appendChild(cloneUpload);
  cloneUpload.appendChild(cloneUploadI);
  cloneUploadI.className = "material-icons";
  cloneUploadI.textContent = "file_upload";
  //////
  figcaption.appendChild(CloneDelete);
  CloneDelete.appendChild(CloneDeleteI);
  CloneDeleteI.className = "material-icons";
  CloneDeleteI.textContent = "delete";

  audio.play();

  //обработка иконок
  const materialIcons = document.querySelectorAll(".material-icons");
  materialIcons.forEach(icon => {
    icon.addEventListener("click", processingIcon);
  });
};


function processingIcon(evt) {
  const figure = document.querySelector("figure");
  const dataUrl = canvas.toDataURL();

    if (evt.target.textContent === "file_download") {
        evt.target.style.display = "none";
    } else if (evt.target.textContent === "file_upload") {
      fetchRequest(dataUrl, evt.target);
    } else if (evt.target.textContent === "delete") {
        listImages.removeChild(figure);
    }
}

function fetchRequest(imgData, target) {
    const data = new FormData();
    const blob = dataUriToBlob(imgData);
    data.append('image', blob);
  
    fetch('https://neto-api.herokuapp.com/photo-booth', {
      body: data,
      credentials: 'same-origin',
      method: 'POST'
    })  .then(result => {
        console.log(result);
        target.style.display = 'none';
      });
}


function dataUriToBlob(dataURI) {
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const array = [];
    const byteString = atob(dataURI.split(',')[1]);
  
    for(let i = 0; i < byteString.length; i++) {
      array.push(byteString.charCodeAt(i));
    }
  
    return new Blob([new Uint8Array(array)], { type: mimeString });
  }