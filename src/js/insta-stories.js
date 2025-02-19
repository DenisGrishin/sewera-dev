class InstaGallery {
  static delegated = false;
  fullGalleryIsOpen = false;
  instaVideoList = new Array(0);

  interval = null;
  duration = 30000;
  progress = 0;
  startTime = null;
  elapsedTime = 0;
  currentProgreess = 0;
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
        slidesPerView: "5",
        breakpoints: {
          1201: {},
          1200: {
            spaceBetween: 48,
            slidesPerView: "auto",
          },

          320: {
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
      this.play(0);
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
            spaceBetween: 0,
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

      this.play(this.fullSwiper.activeIndex);
      this.instaVideoList.forEach((elem) => elem.updateStyle());
    });

    this.checkViewedStories();

    this.fullGallery.addEventListener(
      "click",
      (event) => {
        let isTarget = event.target === this.fullGallery;
        if (isTarget) this.fullGallerySetOpen(false);
      },
      { passive: true }
    );
  }
  // constructor end ========================
  fullGallerySetOpen = (state) => {
    if (this.fullGalleryIsOpen === state) return;

    if (state) {
      this.fullGallery.style.display = "";
      this.fullGalleryIsOpen = true;
      this.fullSwiper.activeIndex = 0;
      this.instaVideoList.forEach((elem) => elem.updateStyle());
      document.body.style.overflow = "hidden";
      // this.instaVideoList.forEach((video) => video.setProgress(0));
    } else {
      this.stop();
      this.fullGallery.style.display = "none";
      this.fullGalleryIsOpen = false;
      this.fullSwiper.activeIndex = 0;
      this.fullGalleryWrapper.innerHTML = "";
      this.fullGalleryNavidation.innerHTML = "";
      document.body.style.overflow = ""; // Включаем скролл обратно
    }
  };

  // перключает по слйадом в стрис
  fullGallerySlideTo(index) {
    if (index === this.fullSwiper.activeIndex) return;
    this.fullSwiper.slideTo(index);
    this.instaVideoList.forEach((elem) => {
      elem.updateStyle();
    });
    this.play(index);
  }

  createStory = (slide) => {
    const contetns = slide.querySelectorAll('input[name="contetnStory"]');

    contetns.forEach((item, indx) => {
      const listContent = item.value.split(",");

      let newInstaSroty = document.createElement("div");
      newInstaSroty.setAttribute("class", "inst-story");

      newInstaSroty.insertAdjacentHTML(
        "beforeend",
        `
        <img class="inst-story__icon-logo" src="img/stories/logo.svg">
        

        <img class="inst-story__player" src="${listContent[0]}">
       <div class="inst-story__button"></div>
       <a href='${listContent[1]}' class="inst-story__link"></a>
       <div></div>
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

  play = (indx, currentProgress = 6.66) => {
    const lines = this.fullGalleryNavidation.querySelectorAll(
      ".inst-gallery-full__navigation-line"
    );

    // let progreess = currentProgress; // 3.33
    // // let progreess = 10; // 10

    // let progreessStart = 3.33;
    // // let progreessStart = 10;

    // this.isPlayed = true;

    // setTimeout(() => {
    //   lines[indx]
    //     .querySelector(".inst-gallery-full__navigation-line-progress")
    //     .classList.add("_start");

    //   lines[indx].querySelector(
    //     ".inst-gallery-full__navigation-line-progress"
    //   ).style.width = progreessStart + "%";
    // }, 10);

    if (this.interval) return; // Уже идет

    this.startTime = Date.now() - this.elapsedTime;
    this.interval = setInterval(() => {
      const now = Date.now();
      this.elapsedTime = now - this.startTime;
      this.progress = (this.elapsedTime / this.duration) * 100;

      if (this.progress >= 100) {
        this.stop();

        if (indx === lines.length - 1) {
          // this.fullGallerySetOpen(false);
        } else {
          this.nextSlide();
        }

        return;
      }

      lines[indx].querySelector(
        ".inst-gallery-full__navigation-line-progress"
      ).style.width = this.progress + "%";
    }, 100);

    // this.interval = setInterval(() => {
    //   this.currentProgreess = progreess;
    //   if (progreess >= 100) {
    //     this.stop();
    //

    //     if (indx === lines.length - 1) {
    //       // this.fullGallerySetOpen(false);
    //     } else {
    //       this.nextSlide();
    //     }

    //     return;
    //   }
    //   if (
    //     lines[indx].querySelector(
    //       ".inst-gallery-full__navigation-line-progress"
    //     )
    //   ) {
    //     lines[indx].querySelector(
    //       ".inst-gallery-full__navigation-line-progress"
    //     ).style.width = progreess + "%";

    //     progreess = progreess + progreessStart;
    //   }
    // }, 1000);
  };
  stop = () => {
    this.pause();
    console.log("Прогресс завершен!");
  };
  pause = () => {
    clearInterval(this.interval);
    this.interval = null;
  };
  setPuase = (indx) => {
    const lines = this.fullGalleryNavidation.querySelectorAll(
      ".inst-gallery-full__navigation-line"
    );
    lines[indx]
      .querySelector(".inst-gallery-full__navigation-line-progress")
      .classList.remove("_start");

    this.stop();
  };

  setPlay = (indx) => {};
  nextSlide = () => {
    this.fullSwiper.slideNext();
    this.instaVideoList.forEach((elem) => elem.updateStyle());
    this.play(this.fullSwiper.activeIndex);
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
    this.button = instaStory.querySelector(".inst-story__button");
    let mouseDown = (event) => {
      this.fullGallery.pause(this.index);
    };

    let touchDown = (event) => {};

    let mouseUp = (event) => {
      this.fullGallery.play(this.index);
    };

    let touchUp = (event) => {};

    let click = (event) => {
      this.fullGallery.fullGallerySlideTo(this.index);
      // this.fullGallery.startProgress(this.index);

      return;

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
