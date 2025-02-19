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
  fullGalleryIsOpen = false;
  instaVideoList = new Array(0);
  isPlayed = true;

  static delegate() {
    InstaGallery.delegated = true;
    let instaGalleryDOM = document.querySelectorAll(".inst-gallery");

    if (instaGalleryDOM.length !== 0) {
      instaGalleryDOM.forEach((elem) => {
        new this(elem);
      });
    }
  }

  constructor(instaGallery) {
    //gallery
    this.instaGallery = instaGallery;
    this.slideGallery = this.instaGallery.querySelectorAll(
      ".inst-gallery__slide"
    );

    //full gallery
    this.fullGalleryClose = this.instaGallery.querySelector(
      ".inst-gallery-full__close"
    );
    this.fullGallery = this.instaGallery.querySelector(".inst-gallery-full");

    this.fullGalleryWrapper = this.instaGallery.querySelector(
      ".inst-gallery-full__swiper .swiper-wrapper"
    );
    //navigation
    this.fullGalleryNavidation = this.instaGallery.querySelector(
      ".inst-gallery-full__navigation"
    );

    this.fullGalleryWrapper.innerHTML = "";
    this.fullGalleryNavidation.innerHTML = "";

    //gallery
    this.swiper = new Swiper(
      this.instaGallery.querySelector(".inst-gallery__slider"),
      {
        spaceBetween: 48,
        slidesPerView: "auto",
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

    this.slideGallery.forEach((slide, index) => {
      slide.setAttribute("data-index", index);
    });
    // события на слайд
    this.instaGallery.addEventListener("click", (e) => {
      const slide = e.target.closest(".inst-gallery__slide");
      if (!slide) return;

      StorageHelper.setItem(
        `stories-${slide.dataset.index}`,
        `viewedStories-${slide.dataset.index}`
      );

      this.createStory(slide);

      slide.classList.add("_viewed");
      this.fullGallerySetOpen(true);
      this.setPlayed(0);
    });

    // закрыть сторисы на кнопку справа вверху
    this.fullGalleryClose.addEventListener(
      "click",
      () => {
        this.fullGallerySetOpen(false);
      },
      { passive: true }
    );
    // слайдер на сторис
    this.fullSwiper = new Swiper(
      this.instaGallery.querySelector(".inst-gallery-full__swiper"),
      {
        spaceBetween: 0,
        speed: 300,
        allowTouchMove: false,
        slidesPerView: 1,
        breakpoints: {
          1200: {
            spaceBetween: 42,
          },
          1023: {
            spaceBetween: 31,
          },
          512: {
            spaceBetween: 27,
          },
          320: {
            spaceBetween: 27,
            allowTouchMove: true,
          },
        },
      }
    );

    //Navigation action
    this.fullSwiper.on("slideChange", (swiper) => {
      this.fullGalleryNavidation
        .querySelectorAll(".inst-gallery-full__navigation-line")
        .forEach((elem, index) => {
          elem.querySelector(
            ".inst-gallery-full__navigation-line-progress"
          ).style.display = "none";

          if (index < swiper.activeIndex) {
            elem.style.backgroundColor = "#FFF";
          } else {
            elem.style.backgroundColor = "";
          }

          if (index === swiper.activeIndex) {
            elem.querySelector(
              ".inst-gallery-full__navigation-line-progress"
            ).style.display = "";
          }

          elem.querySelector(
            ".inst-gallery-full__navigation-line-progress"
          ).style.width = "0";
        });

      this.instaVideoList.forEach((elem) => elem.updateStyle());
    });

    this.checkViewedStories();
  }
  // constructor end ========================
  fullGallerySetOpen = (state) => {
    if (this.fullGalleryIsOpen === state) return;

    if (state) {
      this.fullGallery.style.display = "";
      this.fullGalleryIsOpen = true;
      this.fullSwiper.activeIndex = 0;
      this.instaVideoList.forEach((elem) => elem.updateStyle());
      // this.instaVideoList.forEach((video) => video.setProgress(0));
    } else {
      this.fullGallery.style.display = "none";
      this.fullGalleryIsOpen = false;
      this.fullSwiper.activeIndex = 0;
      this.fullGalleryWrapper.innerHTML = "";
      this.fullGalleryNavidation.innerHTML = "";
    }
  };

  // перключает по слйадом в стрис
  fullGallerySlideTo(index) {
    if (index === this.fullSwiper.activeIndex) return;
    this.fullSwiper.slideTo(index);
    this.instaVideoList.forEach((elem) => {
      elem.updateStyle();
    });
    this.setPlayed(index);
  }

  createStory = (slide) => {
    const contetns = slide.querySelectorAll('input[name="contetnStory"]');

    contetns.forEach((item, indx) => {
      const listContent = item.value.split(",");

      let newInstaSroty = document.createElement("div");
      newInstaSroty.setAttribute("class", "insta-story");

      newInstaSroty.insertAdjacentHTML(
        "beforeend",
        `
        <img class="insta-story__player" src="${listContent[0]}">
       <div class="insta-story__button"></div>
        `
      );

      let newSlide = document.createElement("div");
      newSlide.setAttribute("class", "swiper-slide");

      newSlide.appendChild(newInstaSroty);
      this.fullGalleryWrapper.appendChild(newSlide);
      this.instaVideoList.push(
        new InstaStory(newInstaSroty, indx, newSlide, this)
      );

      this.fullGalleryNavidation.insertAdjacentHTML(
        "beforeend",
        `
         <div class="inst-gallery-full__navigation-line">
          <div class="inst-gallery-full__navigation-line-progress" ></div>
      </div>
        `
      );
    });
  };

  setPlayed = (indx) => {
    const lines = this.fullGalleryNavidation.querySelectorAll(
      ".inst-gallery-full__navigation-line"
    );
    if (!this.isPlayed && indx === lines.length - 1) {
      this.fullGallerySetOpen(false);
      return;
    }

    let maxWidth = 100;
    // let widthLine = 6.66; // 3.33
    let widthLine = 10; // 10
    let widthStart = 10;
    this.isPlayed = true;
    setTimeout(() => {
      lines[indx]
        .querySelector(".inst-gallery-full__navigation-line-progress")
        .classList.add("_start");

      lines[indx].querySelector(
        ".inst-gallery-full__navigation-line-progress"
      ).style.width = widthStart + "%";
    }, 10);

    let ci = setInterval(() => {
      if (widthLine >= maxWidth) {
        clearInterval(ci);

        this.nextSlide();

        if (indx < lines.length - 2) {
          this.isPlayed = false;
        }
        return;
      }
      if (
        lines[indx].querySelector(
          ".inst-gallery-full__navigation-line-progress"
        )
      ) {
        lines[indx].querySelector(
          ".inst-gallery-full__navigation-line-progress"
        ).style.width = widthLine + "%";

        widthLine = widthLine + widthStart;
      }
    }, 1000);
  };

  nextSlide = () => {
    this.fullSwiper.slideNext();
    this.instaVideoList.forEach((elem) => elem.updateStyle());
    this.setPlayed(this.fullSwiper.activeIndex);
  };

  checkViewedStories = () => {
    this.slideGallery.forEach((slide) => {
      if (
        StorageHelper.getItem(`stories-${slide.dataset.index}`) ===
        `viewedStories-${slide.dataset.index}`
      ) {
        slide.classList.add("_viewed");
      }
    });
  };

  // меняем класс для того тчоб было анимция вращения
}

class InstaStory {
  constructor(instaStory, index, slideElement, fullGallery) {
    this.instaStory = instaStory;
    this.index = index;
    this.slideElement = slideElement;
    this.fullGallery = fullGallery;
    this.swiper = fullGallery.fullSwiper;
    this.button = instaStory.querySelector(".insta-story__button");
    let mouseDown = (event) => {};

    let touchDown = (event) => {};

    let mouseUp = (event) => {};

    let touchUp = (event) => {};

    let click = (event) => {
      this.fullGallery.fullGallerySlideTo(this.index);
      // this.fullGallery.startProgress(this.index);

      return;

      // if (isPause) {
      //   isPause = false;
      //   return;
      // }

      // if (event.clientX > innerWidth / 2) {
      //   this.sliderNext(event);
      // } else {
      //   this.sliderBack(event);
      // }
    };

    this.button.addEventListener("click", click, { passive: true });
    this.button.addEventListener("mousedown", mouseDown, { passive: true });
    this.button.addEventListener("touchstart", touchDown, { passive: true });
    this.button.addEventListener("mouseup", mouseUp, { passive: true });
    this.button.addEventListener("touchend", touchUp, { passive: true });
    this.button.oncontextmenu = (event) => {
      return false;
    };
  }
  updateStyle() {
    let activeIndex = this.swiper.activeIndex;

    this.slideElement.classList.remove("swiper-slide_left-step-1");
    this.slideElement.classList.remove("swiper-slide_left-step-2");
    this.slideElement.classList.remove("swiper-slide_right-step-1");
    this.slideElement.classList.remove("swiper-slide_right-step-2");
    this.slideElement.classList.remove("swiper-slide_not-visible");

    if (activeIndex === this.index) {
    } else if (activeIndex === this.index - 1) {
      this.slideElement.classList.add("swiper-slide_left-step-1");
    } else if (activeIndex === this.index + 1) {
      this.slideElement.classList.add("swiper-slide_right-step-1");
    } else if (activeIndex === this.index - 2) {
      this.slideElement.classList.add("swiper-slide_left-step-2");
    } else if (activeIndex === this.index + 2) {
      this.slideElement.classList.add("swiper-slide_right-step-2");
    } else {
      this.slideElement.classList.add("swiper-slide_not-visible");
    }
  }
}

class StorageHelper {
  static setItem(key, value) {
    localStorage.setItem(key, value);
  }

  static getItem(key) {
    return localStorage.getItem(key);
  }

  static removeItem(key) {
    localStorage.removeItem(key);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  InstaGallery.delegate();
});
