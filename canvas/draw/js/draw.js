"use strict";

const convas = document.querySelector("#draw");
const ctx = convas.getContext("2d");
const PI = Math.PI;
let draw = false; // Статус рисования

ctx.lineJoin = "round";
ctx.lineCap = "round";

document.body.style.overflow = "hidden";

window.addEventListener("resize", () => {
  sizeDraw();
});

// Размеры холста относительно экрана
const sizeDraw = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  convas.setAttribute("width", width);
  convas.setAttribute("height", height);
  ctx.clearRect(0, 0, width, height);
};
sizeDraw();


convas.addEventListener("mousedown", e => {
  draw = true;
});

convas.addEventListener("mouseup", () => {
  draw = false;
});

convas.addEventListener("mouseleave", () => {
  draw = false;
});

convas.addEventListener("mousemove", e => {
  if (draw) {
    const point = [e.offsetX, e.offsetY];
    circle(point, lineSize(), hue(e));
  }
});

convas.addEventListener("dblclick", () => {
  ctx.clearRect(0, 0, convas.width, convas.height);
});

// Рисование точки
const circle = (point, size, hue) => {
  ctx.beginPath();
  ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.arc(...point, size, 0, 2 * PI);
  ctx.fill();
};

// Изменение цвета
const changeHue = () => {
  const minHue = 0;
  const maxHue = 359;
  let currentHue = 0;

  return event => {
    event.shiftKey ? currentHue-- : currentHue++;
    
    if (currentHue < minHue) {
      currentHue = maxHue;
    }
    if (currentHue > maxHue) {
      currentHue = minHue;
    }
    return currentHue;
  };
};
const hue = changeHue(); // Цвет

// Изменение размера
const changeLineSize = () => {
  const lineMinWidth = 5;
  const lineMaxWidth = 100;
  let currentLineWidth = lineMinWidth;
  let inc = true;

  return () => {
    if (currentLineWidth < lineMaxWidth && inc) {
      return currentLineWidth++;
    } else {
      inc = false;
    }

    if (currentLineWidth > lineMinWidth && !inc) {
      return currentLineWidth--;
    } else {
      inc = true;
    }
  };
};
const lineSize = changeLineSize(); // Размер
