"use script";

let movedPiece = null;
let shiftX = 0;
let shiftY = 0;

document.addEventListener("mousedown", event => {
  if (event.target.classList.contains("logo")) {
    movedPiece = event.target;
    // const bounds = event.target.getBoundingClientRect();
    shiftX =
      event.pageX -
      event.target.getBoundingClientRect().left -
      window.pageXOffset;
    shiftY =
      event.pageY -
      event.target.getBoundingClientRect().top -
      window.pageYOffset;
    movedPiece.style.left = event.pageX - shiftX + "px";
    movedPiece.style.top = event.pageY - shiftY + "px";
  }
});

document.addEventListener("mousemove", event => {
  if (movedPiece) {
    // Предотвращаем выделение текста
    event.preventDefault();
    movedPiece.style.left = event.pageX - shiftX + "px";
    movedPiece.style.top = event.pageY - shiftY + "px";
    movedPiece.classList.add("moving");
  }
});

document.addEventListener("mouseup", event => {
  if (movedPiece) {
    const trash_bin = document
      .elementFromPoint(event.clientX, event.clientY)
      .closest("#trash_bin");
    if (trash_bin) {
      movedPiece.classList.remove("moving");
      movedPiece.style.display = "none";
    } else {
      movedPiece.classList.remove("moving");
      movedPiece = null;
    }
  }
});
