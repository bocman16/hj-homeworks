const sliders = document.querySelector(".slider");
const slides = sliders.querySelectorAll(".slides li");
const sliderNav = sliders.querySelectorAll(".slider-nav a");

for (const button of sliderNav) {
  button.addEventListener("click", Slider);
  button.addEventListener("click", slideCurrent);
};

function Slider(event) {
  const tagName = event.target.dataset.action;
  const currentSlide = sliders.querySelector(".slide-current");
  const prevSlide = currentSlide.previousElementSibling;
  const nextSlide = currentSlide.nextElementSibling;
  currentSlide.classList.remove("slide-current");
  if ("next" === tagName) {
    nextSlide.classList.add("slide-current");
  } else if ("prev" === tagName) {
    prevSlide.classList.add("slide-current");
  } else if ("first" === tagName) {
    slides[0].classList.add("slide-current");
  } else if ("last" === tagName) {
    slides[6].classList.add("slide-current");
  };
};

function slideCurrent() {
  if (slides[0].classList.contains("slide-current")) {
    sliderNav[0].classList.add("disabled");
    sliderNav[2].classList.add("disabled");
    sliderNav[1].classList.remove("disabled");
    sliderNav[3].classList.remove("disabled");
  } else if (slides[slides.length - 1].classList.contains("slide-current")) {
    sliderNav[1].classList.add("disabled");
    sliderNav[3].classList.add("disabled");
    sliderNav[0].classList.remove("disabled");
    sliderNav[2].classList.remove("disabled");
  } else {
    for (let button of sliderNav) {
      button.classList.remove("disabled");
    };
  };
};

document.addEventListener("DOMContentLoaded", handleButtonClick);
function handleButtonClick() {
  slides[0].classList.add("slide-current");
  if (slides[0].classList.contains("slide-current")) {
    sliderNav[0].classList.add("disabled");
    sliderNav[2].classList.add("disabled");
  };
};
