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
  loadedContetnInput = new Array(0);
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
          1023: {
            spaceBetween: 48,
          },

          767: {
            spaceBetween: 7.46,
            slidesPerView: "auto",
          },
          320: {
            spaceBetween: 7.46,
            slidesPerView: "auto",
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
        `date-stories-${slide.dataset.index}`,
        slide.dataset.dateStories
      );

      this.createStory(slide);

      slide.querySelector(".inst-gallery__img img").classList.add("_viewed");
      this.fullGallerySetOpen(true);
      this.play(0);
    });

    this.preloadImg();

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
        slidesPerView: "1",
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
            // allowTouchMove: true,
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
      this.reset();
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

      this.fullGallerySlideTo(0);
      this.instaVideoList.forEach((elem) => elem.updateStyle());
      document.body.style.overflow = "hidden";
      this.reset();
    } else {
      this.stop();
      this.fullGallery.style.display = "none";
      this.fullGalleryIsOpen = false;

      this.fullGalleryWrapper.innerHTML = "";
      this.fullGalleryNavidation.innerHTML = "";
      document.body.style.overflow = "";
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
    const slideIndx = slide.dataset.index;

    let contetn = this.loadedContetnInput.find(
      (it) => it.slideIndex === Number(slideIndx)
    );

    for (let index = 0; index < contetn.imgListBg.length; index++) {
      const imgBg = contetn.imgListBg[index];
      const imgContetn = contetn.imgListContetn[index];
      const link = contetn.linkList[index];
      let newInstaSroty = document.createElement("div");
      newInstaSroty.setAttribute("class", "inst-story");

      debugger;
      newInstaSroty.insertAdjacentHTML(
        "beforeend",
        `
        <img class="inst-story__icon-logo" src="/srv/assets/images/main/stories/logo.svg">
        <img class="inst-story__img" src="${imgBg.src}" >
        
       ${imgContetn ? `<div class="inst-story__contetn"><img src="${imgContetn.src}"></div>` : ""}
       <div class="inst-story__button"></div>
       ${link ? `<a href='${link}' class="inst-story__link"></a>` : ""}
       <div></div>
        `
      );

      let newSlide = document.createElement("div");
      newSlide.setAttribute("class", "swiper-slide");

      newSlide.appendChild(newInstaSroty);

      this.fullGalleryWrapper.appendChild(newSlide);
      this.instaVideoList.push(
        new InstaStory(newInstaSroty, index, newSlide, this)
      );

      this.fullGalleryNavidation.insertAdjacentHTML(
        "beforeend",
        `
         <div class="inst-gallery-full__navigation-line">
          <div class="inst-gallery-full__navigation-line-progress" ></div>
      </div>
        `
      );
    }
    contetn.imgListBg.forEach((item, indx) => {
      // let newInstaSroty = document.createElement("div");
      // newInstaSroty.setAttribute("class", "inst-story");
      // debugger;
      // newInstaSroty.insertAdjacentHTML(
      //   "beforeend",
      //   `
      //   <img class="inst-story__icon-logo" src="/srv/assets/images/main/stories/logo.svg">
      //   <img class="inst-story__img" src="${contetn.imgListBg[0].src}" >
      //  ${contetn.imgListContetn[0].src ? `<div class="inst-story__contetn"><img src="${contetn.imgListContetn[0].src}"></div>` : ""}
      //  <div class="inst-story__button"></div>
      //  ${contetn.link ? `<a href='${contetn.link}' class="inst-story__link"></a>` : ""}
      //  <div></div>
      //   `
      // );
      // let newSlide = document.createElement("div");
      // newSlide.setAttribute("class", "swiper-slide");
      // newSlide.appendChild(newInstaSroty);
      // this.fullGalleryWrapper.appendChild(newSlide);
      // this.instaVideoList.push(
      //   new InstaStory(newInstaSroty, indx, newSlide, this)
      // );
      // this.fullGalleryNavidation.insertAdjacentHTML(
      //   "beforeend",
      //   `
      //    <div class="inst-gallery-full__navigation-line">
      //     <div class="inst-gallery-full__navigation-line-progress" ></div>
      // </div>
      //   `
      // );
    });
  };
  preloadImg = () => {
    this.slideGallery.forEach((slide, indx) => {
      const inputs = slide.querySelectorAll('input[name="contetnStory"]');
      const loadImgBg = [];
      const loadImgContetn = [];

      let linkArr = [];
      inputs.forEach((input) => {
        const contetn = input.value.split(",");
        const imgBg = new Image();
        const imgContetn = new Image();

        imgBg.src = contetn[0];
        imgContetn.src = contetn[2];

        loadImgBg.push(imgBg);
        loadImgContetn.push(imgContetn);

        linkArr.push(contetn[1]);
      });

      this.loadedContetnInput.push({
        slideIndex: indx,
        imgListBg: loadImgBg,
        imgListContetn: loadImgContetn,
        linkList: linkArr,
      });
    });
  };
  play = (indx) => {
    const lines = this.fullGalleryNavidation.querySelectorAll(
      ".inst-gallery-full__navigation-line"
    );

    if (this.interval) return; // Уже идет

    this.startTime = Date.now() - this.elapsedTime;
    this.interval = setInterval(() => {
      const now = Date.now();
      this.elapsedTime = now - this.startTime;
      this.progress = (this.elapsedTime / this.duration) * 100;

      if (this.progress >= 100) {
        this.reset();
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
  };
  stop = () => {
    this.pause();
  };
  pause = () => {
    clearInterval(this.interval);
    this.interval = null;
  };
  reset() {
    this.pause();
    this.width = 0;
    this.elapsedTime = 0;
  }

  setPlay = (indx) => {};
  nextSlide = () => {
    this.fullSwiper.slideNext();
    this.instaVideoList.forEach((elem) => elem.updateStyle());
    this.play(this.fullSwiper.activeIndex);
  };

  checkViewedStories = () => {
    this.slideGallery.forEach((slide) => {
      if (
        StorageHelper.getItem(`date-stories-${slide.dataset.index}`) !==
        slide.dataset.dateStories
      ) {
        slide
          .querySelector(".inst-gallery__img img")
          .classList.remove("_viewed");
      } else {
        slide.querySelector(".inst-gallery__img img").classList.add("_viewed");
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
      this.fullGallery.pause();
    };

    let touchDown = (event) => {
      this.fullGallery.pause();
    };

    let mouseUp = (event) => {
      this.fullGallery.play(this.index);
    };

    let touchUp = (event) => {
      this.fullGallery.play(this.index);
    };

    let click = (event) => {
      if (event.clientX > innerWidth / 2) {
        this.sliderNext(event);
      } else {
        this.sliderBack(event);
      }
      return;
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

  sliderNext = (event) => {
    if (event && event.target.tagName === "A") {
      return;
    }
    if (!this.fullGallery.instaVideoList[this.swiper.activeIndex + 1]) {
      return;
    }
    this.fullGallery.fullSwiper.slideNext();
    this.fullGallery.instaVideoList.forEach((elem) => elem.updateStyle());
  };

  sliderBack = (event) => {
    if (event && event.target.tagName === "A") {
      return;
    }
    if (!this.fullGallery.instaVideoList[this.swiper.activeIndex - 1]) {
      return;
    }
    this.fullGallery.fullSwiper.slidePrev();
    this.fullGallery.instaVideoList.forEach((elem) => elem.updateStyle());
  };
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
