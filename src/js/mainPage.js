﻿let block = document.querySelector(".content-bar__container_hidden");
let btnOpenBlock = document.querySelector(".content-bar__button");
if(btnOpenBlock){

  btnOpenBlock.addEventListener("click", () => {
    btnOpenBlock.style.display = "none";
    block.classList.add("active");
  });
}
document.addEventListener("DOMContentLoaded", () => {});
function bildSliders() {
  //BildSlider
  let sliders = document.querySelectorAll(
    '[class*="__swiper"]:not(.swiper-wrapper):not(.swiper)'
  );
  if (sliders) {
    sliders.forEach((slider) => {
      if (
        slider.querySelector(".swiper-wrapper") ||
        slider.querySelector(".swiper")
      )
        return;
      slider.parentElement.classList.add("swiper");
      slider.classList.add("swiper-wrapper");
      for (const slide of slider.children) {
        slide.classList.add("swiper-slide");
      }
    });
  }
}
function initSliders() {
  bildSliders();

  if (document.querySelector(".slider-banner__slider")) {
    new Swiper(".slider-banner__slider", {
      observer: true,
      observeParents: true,
      slidesPerView: 1,
      spaceBetween: 0,
      autoHeight: false,
      speed: 300,
      autoplay: {
        delay: 3000,
      },
      loop: true,
      pagination: {
        el: ".slider-banner__pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".slider-banner__next",
        prevEl: ".slider-banner__back",
      },
      breakpoints: {
        319.98: {},
        429.98: {},

        767.98: {},
        1023.98: {},
      },
      on: {},
    });
  }
  if (document.querySelector(".partners__slider")) {
    new Swiper(".partners__slider", {
      observer: true,
      observeParents: true,
      slidesPerView: 4,
      spaceBetween: 24,
      autoHeight: false,
      centeredSlides: false,
      loop: false,
      speed: 300,
      grid: {
        rows: 2, // Количество строк
        fill: "row", // Заполнение по строкам (или 'column')
      },
      pagination: {
        el: ".slide-banner__pagination",
        clickable: true,
      },
      breakpoints: {
        319.98: {
          slidesPerView: "1.3",
          grid: {
            rows: 1, // Количество строк
            fill: "row", // Заполнение по строкам (или 'column')
          },
          loop: true,
          centeredSlides: true,
        },
        429.98: {
          grid: {
            rows: 1, // Количество строк
            fill: "row", // Заполнение по строкам (или 'column')
          },
          loop: true,
          centeredSlides: true,
          slidesPerView: "1.5",
        },

        767.98: {
          slidesPerView: "3.5",
          loop: true,
          centeredSlides: true,
          grid: {
            rows: 1, // Количество строк
            fill: "row", // Заполнение по строкам (или 'column')
          },
        },
        1023.98: {},
      },
      on: {},
    });
  }
}
initSliders();
