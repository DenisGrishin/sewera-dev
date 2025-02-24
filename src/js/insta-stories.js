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
bildSliders();
class InstaGallery {
  static delegated = false;
  storyGalleryIsOpen = false;
  loadedContetnInput = new Array(0);
  indxActvinstaGallerySwiper = 0;
  currentSwiperSlide = 0;
  lengthСontent = 0;

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
    this.storyGalleryClose = this.instaGallery.querySelector(
      ".inst-gallery-full__close"
    );
    this.storyGallery = this.instaGallery.querySelector(".inst-gallery-full");

    this.storyGalleryWrapper = this.instaGallery.querySelector(
      ".inst-gallery-full__swiper .swiper-wrapper"
    );
    //navigation
    this.elementStoryProgressBar = this.instaGallery.querySelector(
      ".inst-gallery-full__navigation"
    );

    this.storyGalleryBtnNav = document.querySelector(".inst-gallery-full__nav");

    this.storyGalleryWrapper.innerHTML = "";
    this.elementStoryProgressBar.innerHTML = "";

    //gallery

    this.outsideSwiper = new Swiper(
      this.instaGallery.querySelector(".inst-gallery__slider"),
      {
        spaceBetween: 48,
        slidesPerView: "auto",
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

    // события на иконку стоиса
    this.instaGallery.addEventListener("click", (e) => {
      const slide = e.target.closest(".inst-gallery__slide");

      if (!slide) return;

      StorageHelper.setItem(
        `date-stories-${slide.dataset.index}`,
        slide.dataset.dateStories
      );

      this.indxActvinstaGallerySwiper = slide.dataset.index;

      this.initSwiperStory();
      this.createStories(slide);
      this.storyGallerySetOpen(true);

      slide.querySelector(".inst-gallery__img img").classList.add("_viewed");

      if (slide.dataset.index == 0) {
        this.storySwiperBack.style.display = "none";
      }

      if (
        slide.dataset.index == this.slideGallery.length - 1 &&
        1 >= this.lengthСontent
      ) {
        this.storySwiperNext.style.display = "none";
      }
    });

    this.preloadContent();

    // закрыть сторисы на кнопку справа вверху
    this.storyGalleryClose.addEventListener(
      "click",
      () => {
        this.storyGallerySetOpen(false);
      },
      { passive: true }
    );

    this.checkIfAllStoriesViewed();

    this.storyGallery.addEventListener(
      "click",
      (event) => {
        let isTarget = event.target === this.storyGallery;
        if (isTarget) this.storyGallerySetOpen(false);
      },
      { passive: true }
    );
  }
  // constructor end ========================
  storyGallerySetOpen = (state) => {
    if (this.storyGalleryIsOpen === state) return;

    if (state) {
      this.storyGallery.style.display = "";
      this.storyGalleryIsOpen = true;
      document.body.style.overflow = "hidden";
      this.storyProgressBar.play(0, this);
    } else {
      this.storyGallery.style.display = "none";
      this.storyGalleryIsOpen = false;
      this.storyProgressBar.stop();
      this.indxActvinstaGallerySwiper = 0;
      this.removeStory();
      document.body.style.overflow = "";
    }
  };

  removeStory = () => {
    this.storyGalleryWrapper.innerHTML = "";
    this.elementStoryProgressBar.innerHTML = "";
    this.storyGalleryBtnNav.innerHTML = "";
    this.swiperStory.destroy(true, true);
  };

  createStories = (slide) => {
    const slideIndx = slide.dataset.index;
    this.lengthСontent = slide.querySelectorAll(".content").length;

    let content = this.loadedContetnInput.find(
      (it) => it.slideIndex === Number(slideIndx)
    );
    document.querySelector(".inst-gallery-full__nav").insertAdjacentHTML(
      "beforeend",
      `
									<div class="inst-gallery-full__back"></div>
									<div class="inst-gallery-full__next"></div>
								`
    );

    this.storySwiperBack = document.querySelector(".inst-gallery-full__back");
    this.storySwiperNext = document.querySelector(".inst-gallery-full__next");

    this.storyProgressBar = new StoryProgressBar(this);
    let newInstaSroty;
    for (let index = 0; index < content.imgListBg.length; index++) {
      const imgBg = content.imgListBg[index];
      const contentText = content.listContentText[index];

      newInstaSroty = document.createElement("div");
      newInstaSroty.setAttribute("class", "inst-story");

      newInstaSroty.insertAdjacentHTML(
        "beforeend",
        `
     
        <img class="inst-story__img" src="${imgBg.src}" >
        
        <div class="inst-story__contetn">
        <div class="inst-story__button"></div>
          ${contentText ? `<div class="inst-story__content-text">${contentText}</div>` : ""}
        </div>
          `
      );

      let newSlide = document.createElement("div");
      newSlide.setAttribute("class", "swiper-slide");

      newSlide.appendChild(newInstaSroty);

      this.storyGalleryWrapper.appendChild(newSlide);

      this.elementStoryProgressBar.insertAdjacentHTML(
        "beforeend",
        `
         <div class="inst-gallery-full__navigation-line">
          <div class="inst-gallery-full__navigation-line-progress" ></div>
      </div>
        `
      );
    }

    this.initSwiperStory();

    new InstaStory(0, this, this.storyProgressBar, this.lengthСontent);
  };

  initSwiperStory = () => {
    this.swiperStory = new Swiper(
      this.instaGallery.querySelector(".inst-gallery-full__swiper"),
      {
        spaceBetween: 0,
        speed: 300,
        allowTouchMove: false,
        slidesPerView: 1,

        breakpoints: {
          1200: {},
          1023: {},
          512: {},
          320: {
            // allowTouchMove: true,
          },
        },
      }
    );

    this.onSlideChange();
  };

  onSlideChange = () => {
    //slideChange
    this.swiperStory.on("slideChange", (swiper) => {
      this.elementStoryProgressBar
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
      this.updateNavigationButtons();
      this.storyProgressBar.reset();
      this.storyProgressBar.play(this.swiperStory.activeIndex, this);
    });
  };

  preloadContent = () => {
    this.slideGallery.forEach((slide, index) => {
      const inputs = slide.querySelectorAll('input[name="contetnStories"]');

      const loadImgBg = [];
      const contentText = [];

      inputs.forEach((input) => {
        const content = input.value.split("|");
        const imgBg = new Image();
        imgBg.src = content[0];
        loadImgBg.push(imgBg);
        contentText.push(content[1]);
      });

      this.loadedContetnInput.push({
        slideIndex: index,
        imgListBg: loadImgBg,
        listContentText: contentText,
      });
    });
  };

  nextStory = () => {
    this.currentSwiperSlide = Number(this.indxActvinstaGallerySwiper) + 1;

    this.storySwiperNext.style.display = "none";

    if (this.currentSwiperSlide > this.slideGallery.length - 1) return;

    this.updateStateStories(this.currentSwiperSlide);
  };

  prevStory = () => {
    this.currentSwiperSlide = Number(this.indxActvinstaGallerySwiper) - 1;

    if (this.currentSwiperSlide === -1) return;

    this.updateStateStories(this.currentSwiperSlide);

    if (this.currentSwiperSlide == 0) {
      this.storySwiperBack.style.display = "none";
    }
  };
  updateStateStories = (index) => {
    if (!this.isStoriesViewed(index)) {
      this.slideGallery[index]
        .querySelector(".inst-gallery__img img")
        .classList.add("_viewed");
    }
    this.removeStory();
    this.storyProgressBar.reset();
    this.indxActvinstaGallerySwiper = index;

    this.createStories(this.slideGallery[index]);

    this.storyProgressBar.play(0, this);
  };

  updateNavigationButtons = () => {
    if (
      this.swiperStory.activeIndex == 1 &&
      this.indxActvinstaGallerySwiper == 0
    ) {
      this.storySwiperBack.style.display = "flex";
    }

    if (
      this.swiperStory.activeIndex == this.lengthСontent - 1 &&
      this.indxActvinstaGallerySwiper == this.slideGallery.length - 1
    ) {
      this.storySwiperNext.style.display = "none";
    }

    if (
      this.swiperStory.activeIndex == this.lengthСontent - 1 &&
      this.indxActvinstaGallerySwiper == this.slideGallery.length - 1
    ) {
      this.storySwiperNext.style.display = "none";
    }

    if (
      this.swiperStory.activeIndex == this.lengthСontent - 2 &&
      this.indxActvinstaGallerySwiper == this.slideGallery.length - 1
    ) {
      this.storySwiperNext.style.display = "flex";
    }
  };

  checkIfAllStoriesViewed = () => {
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

  isStoriesViewed = (index) => {
    const stories = this.slideGallery[index];
    const indexStories = stories.dataset.index;
    const dateStories = stories.dataset.dateStories;

    if (StorageHelper.getItem(`date-stories-${indexStories}`)) {
      return true;
    } else {
      StorageHelper.setItem(`date-stories-${indexStories}`, dateStories);
      return false;
    }
  };
}

class InstaStory {
  constructor(index, instaGallery, storyProgressBar, lengthСontent) {
    this.index = index;
    this.instaGallery = instaGallery;
    this.swiperStory = instaGallery.swiperStory;
    this.buttons = document.querySelectorAll(".inst-story__button");
    this.storyProgressBar = storyProgressBar;
    this.lengthСontent = lengthСontent;

    let isPause = false;
    let pauseTimeout;

    let mouseDown = (event) => {
      isPause = false;
      pauseTimeout = setTimeout(() => {
        isPause = true;
      }, 200);
      this.storyProgressBar.pause();
    };

    let touchDown = (event) => {
      isPause = false;
      pauseTimeout = setTimeout(() => {
        isPause = true;
      }, 200);
      this.storyProgressBar.pause();
    };

    let mouseUp = (event) => {
      clearInterval(pauseTimeout);

      this.storyProgressBar.play(
        this.swiperStory.activeIndex,
        this.instaGallery
      );
    };

    let touchUp = (event) => {
      clearInterval(pauseTimeout);

      this.storyProgressBar.play(
        this.swiperStory.activeIndex,
        storyProgressBar.play
      );
    };

    let click = (event) => {
      if (isPause) {
        return;
      }
      if (event.clientX > innerWidth / 2) {
        this.sliderNext(event);
      } else {
        this.sliderBack(event);
      }
      return;
    };

    this.instaGallery.storySwiperNext.addEventListener("click", click, {
      passive: true,
    });
    this.instaGallery.storySwiperBack.addEventListener("click", click, {
      passive: true,
    });
    this.buttons.forEach((button) => {
      button.addEventListener("click", click, { passive: true });
      button.addEventListener("mousedown", mouseDown, { passive: true });
      button.addEventListener("touchstart", touchDown, { passive: true });
      button.addEventListener("mouseup", mouseUp, { passive: true });
      button.addEventListener("touchend", touchUp, { passive: true });
      button.oncontextmenu = (event) => {
        return false;
      };
    });
  }

  sliderNext = (event) => {
    if (this.swiperStory.activeIndex == this.swiperStory.slides.length - 1) {
      this.instaGallery.nextStory();
      return;
    }
    this.swiperStory.slideNext();
  };

  sliderBack = (event) => {
    if (this.swiperStory.activeIndex == 0) {
      this.instaGallery.prevStory();
      return;
    }

    this.swiperStory.slidePrev();
  };
}

class StoryProgressBar {
  interval = null;
  duration = 30000;
  progress = 0;
  startTime = null;
  elapsedTime = 0;
  isPause = false;

  constructor(instaGallery) {
    this.elementStoryProgressBar = instaGallery.elementStoryProgressBar;
  }

  play = (indexSlide, instaGallery) => {
    const lines = this.elementStoryProgressBar.querySelectorAll(
      ".inst-gallery-full__navigation-line"
    );
    const line = lines[indexSlide].querySelector(
      ".inst-gallery-full__navigation-line-progress"
    );

    if (this.interval) return;

    this.startTime = Date.now() - this.elapsedTime;

    this.interval = setInterval(() => {
      const now = Date.now();
      this.elapsedTime = now - this.startTime;
      this.progress = (this.elapsedTime / this.duration) * 100;

      if (this.progress >= 100) {
        this.reset();

        if (indexSlide === lines.length - 1) {
          instaGallery.nextStory();
          return;
        }

        instaGallery.swiperStory.slideNext();
        return;
      }
      if (lines[indexSlide]) {
        line.style.width = this.progress + "%";
      } else {
        instaGallery.nextStory();
      }
    }, 100);
  };
  stop = () => {
    this.pause();
  };
  pause = () => {
    this.isPause = true;
    clearInterval(this.interval);
    this.interval = null;
  };
  reset() {
    this.pause();
    this.width = 0;
    this.elapsedTime = 0;
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

InstaGallery.delegate();
// ! сдеалть чтоб на послднем слайде выключался
// ! контент
