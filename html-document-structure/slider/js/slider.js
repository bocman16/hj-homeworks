const sliders = document.querySelector(".slider");
const slides = sliders.querySelectorAll(".slides li");
const sliderNav = sliders.querySelectorAll(".slider-nav a");

for (const button of sliderNav) {
  button.addEventListener("click", Slider);
};
function Slider(event) {
  const tagName = event.target.dataset.action;
  const currentSlide = sliders.querySelector(".slide-current");
  const prevSlide = currentSlide.previousElementSibling;
  const nextSlide = currentSlide.nextElementSibling;
  if ("next" === tagName) {
    currentSlide.classList.remove("slide-current");
    nextSlide.classList.add("slide-current");
  } else if ("prev" === tagName) {
    currentSlide.classList.remove("slide-current");
    prevSlide.classList.add("slide-current");
  } else if ("first" === tagName) {
    currentSlide.classList.remove("slide-current");
    slides[0].classList.add("slide-current");
  } else if ("last" === tagName) {
    currentSlide.classList.remove("slide-current");
    slides[6].classList.add("slide-current");
  }
  if (slides[0].classList.contains("slide-current")) {
    sliderNav[0].classList.add("disabled");
    sliderNav[2].classList.add("disabled");
    sliderNav[1].classList.remove("disabled");
    sliderNav[3].classList.remove("disabled");
  } else if (slides[6].classList.contains("slide-current")) {
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
document.addEventListener("DOMContentLoaded", closeButton);
function closeButton() {
  slides[0].classList.add("slide-current");
  if (slides[0].classList.contains("slide-current")) {
    sliderNav[0].classList.add("disabled");
    sliderNav[2].classList.add("disabled");
  };
};
