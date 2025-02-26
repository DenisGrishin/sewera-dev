﻿document.addEventListener("DOMContentLoaded", () => {
  let block = document.querySelector(".content-bar__container_hidden");
  let btnOpenBlock = document.querySelector(".content-bar__button");

  btnOpenBlock.addEventListener("click", () => {
    btnOpenBlock.style.display = "none";
    block.classList.add("active");
  });
});
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
        el: ".slide-banner__pagination",
        clickable: true,
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
}
initSliders();
