﻿function bildSliders() {
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
  //  новый блок
  if (document.querySelector(".sewera-number__slider")) {
    new Swiper(".sewera-number__slider", {
      slidesPerView: 4,
      spaceBetween: 24,
      speed: 300,
      autoHeight: false,
      observer: true,
      watchSlidesProgress: true,
      observeParents: true,

      breakpoints: {
        319.98: { spaceBetween: 20, slidesPerView: 1.3 },
        429.98: { spaceBetween: 20, slidesPerView: 1.3 },

        767.98: {
          spaceBetween: 20,
          slidesPerView: 2,
          grid: {
            rows: 2, // Количество строк
            fill: "row", // Заполнение по строкам
          },
        },
        1023.98: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
        1279.98: {
          slidesPerView: 4,
          spaceBetween: 24,
        },
      },
      on: {},
    });
  }
  if (document.querySelector(".our-partners__slider ")) {
    new Swiper(".our-partners__slider ", {
      slidesPerView: 9.5,
      spaceBetween: 24,
      speed: 300,
      autoHeight: false,
      observer: true,
      watchSlidesProgress: true,
      observeParents: true,
      loop: true,
      centeredSlides: true,
      breakpoints: {
        319.98: { spaceBetween: 20, slidesPerView: 1.5 },
        429.98: { spaceBetween: 20, slidesPerView: 2.5 },

        767.98: {
          spaceBetween: 20,
          slidesPerView: 4.5,
        },
        1023.98: {
          slidesPerView: 5.5,
          spaceBetween: 20,
        },
        1279.98: {
          slidesPerView: 9.5,
          spaceBetween: 24,
        },
      },
      on: {},
    });
  }
  if (document.querySelector(".contact-info__slider")) {
    new Swiper(".contact-info__slider ", {
      slidesPerView: 3,
      spaceBetween: 32,
      speed: 300,
      autoHeight: false,
      observer: true,
      watchSlidesProgress: true,
      observeParents: true,

      breakpoints: {
        319.98: { spaceBetween: 20, slidesPerView: 1.3 },
        429.98: { spaceBetween: 20, slidesPerView: 1.7 },

        767.98: {
          spaceBetween: 20,
          slidesPerView: 2.4,
        },
        1023.98: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1279.98: {
          slidesPerView: 3,
          spaceBetween: 32,
        },
      },
      on: {},
    });
  }
}
initSliders();
