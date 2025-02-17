// function bildSliders() {
//   //BildSlider
//   let sliders = document.querySelectorAll(
//     '[class*="__swiper"]:not(.swiper-wrapper):not(.swiper)'
//   );
//   if (sliders) {
//     sliders.forEach((slider) => {
//       if (
//         slider.querySelector(".swiper-wrapper") ||
//         slider.querySelector(".swiper")
//       )
//         return;
//       slider.parentElement.classList.add("swiper");
//       slider.classList.add("swiper-wrapper");
//       for (const slide of slider.children) {
//         slide.classList.add("swiper-slide");
//       }
//     });
//   }
// }
class InstaGallery {
  static delegated = false;

  static delegate() {
    InstaGallery.delegated = true;
    let instaGalleryDOM = document.querySelectorAll(".inst-gallery");

    if (instaGalleryDOM)
      instaGalleryDOM.forEach((elem) => {
        new this(elem);
      });
  }

  constructor(instaGallery) {
    this.instaGallery = instaGallery;
    this.swiperLeft = this.instaGallery.querySelector(
      ".inst-gallery__left-arrow"
    );
    this.swiperRight = this.instaGallery.querySelector(
      ".inst-gallery__right-arrow"
    );

    //gallery
    this.swiper = new Swiper(
      this.instaGallery.querySelector(".inst-gallery__slider"),
      {
        spaceBetween: 48,
        slidesPerView: "auto",
        navigation: {
          prevEl: this.swiperLeft,
          nextEl: this.swiperRight,
        },
        breakpoints: {
          1200: {
            spaceBetween: 48,
          },
          1023: {
            spaceBetween: 8.8,
          },
          512: {
            spaceBetween: 7.46,
          },
        },
        watchSlidesProgress: true,
      }
    );
  }
}

document.addEventListener("DOMContentLoaded", function () {
  InstaGallery.delegate();
});
