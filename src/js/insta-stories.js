class InstaGallery {
  static delegated = false;
  fullGalleryIsOpen = false;
  instaVideoList = new Array(0);

  loadedContetnInput = new Array(0);
  indxActvSlideOutsideSwiper = 0;
  currentSwiperSlide = 0;

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
    this.elementStoryProgressBar = this.instaGallery.querySelector(
      ".inst-gallery-full__navigation"
    );

    this.fullGalleryBtnNav = document.querySelector(".inst-gallery-full__nav");

    this.fullGalleryWrapper.innerHTML = "";
    this.elementStoryProgressBar.innerHTML = "";

    //gallery
    this.outsideSwiper = new Swiper(
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

    // события на иконку стоиса
    this.instaGallery.addEventListener("click", (e) => {
      const slide = e.target.closest(".inst-gallery__slide");

      if (!slide) return;

      StorageHelper.setItem(
        `date-stories-${slide.dataset.index}`,
        slide.dataset.dateStories
      );

      this.indxActvSlideOutsideSwiper = slide.dataset.index;

      this.initSwiperStory();
      this.createStories(slide);
      this.fullGallerySetOpen(true);

      slide.querySelector(".inst-gallery__img img").classList.add("_viewed");

      if (slide.dataset.index == 0) {
        this.fullSwiperBack.style.display = "none";
      }
    });

    this.preloadContent();

    // закрыть сторисы на кнопку справа вверху
    this.fullGalleryClose.addEventListener(
      "click",
      () => {
        this.fullGallerySetOpen(false);
      },
      { passive: true }
    );

    this.checkIfAllStoriesViewed();

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
      document.body.style.overflow = "hidden";
      this.storyProgressBar.play(0, this);
    } else {
      this.fullGallery.style.display = "none";
      this.fullGalleryIsOpen = false;
      this.storyProgressBar.stop();
      this.indxActvSlideOutsideSwiper = 0;
      this.removeStory();
      document.body.style.overflow = "";
    }
  };

  removeStory = () => {
    this.fullGalleryWrapper.innerHTML = "";
    this.elementStoryProgressBar.innerHTML = "";
    this.fullGalleryBtnNav.innerHTML = "";
    this.swiperStory.destroy(true, true);
  };

  createStories = (slide) => {
    const slideIndx = slide.dataset.index;
    const lengthContetn = slide.querySelectorAll(".content").length;

    let contetn = this.loadedContetnInput.find(
      (it) => it.slideIndex === Number(slideIndx)
    );
    document.querySelector(".inst-gallery-full__nav").insertAdjacentHTML(
      "beforeend",
      `
									<div class="inst-gallery-full__left"></div>
									<div class="inst-gallery-full__right"></div>
								`
    );

    this.fullSwiperBack = document.querySelector(".inst-gallery-full__left");
    this.fullSwiperNext = document.querySelector(".inst-gallery-full__right");

    this.storyProgressBar = new StoryProgressBar(this);
    let newInstaSroty;
    for (let index = 0; index < contetn.imgListBg.length; index++) {
      const imgBg = contetn.imgListBg[index];
      const link = contetn.linkList[index];
      const title = contetn.titleList[index];
      const description = contetn.descriptionList[index];
      const textLink = contetn.textLinkList[index];
      const colorBtn = contetn.colorBtnList[index];

      newInstaSroty = document.createElement("div");
      newInstaSroty.setAttribute("class", "inst-story");

      newInstaSroty.insertAdjacentHTML(
        "beforeend",
        `
     
        <img class="inst-story__img" src="${imgBg.src}" >
        
        <div class="inst-story__contetn">
        <div class="inst-story__button"></div>
          ${title ? `<div class="inst-story__title">${title}</div>` : ""}
          ${description ? `<div class="inst-story__description">${description}</div>` : ""}
          ${link ? `<a href='${link}' style="background-color:${colorBtn}" class="inst-story__link"><span>${textLink}</span></a>` : ""}
          </div>
       
        `
      );

      let newSlide = document.createElement("div");
      newSlide.setAttribute("class", "swiper-slide");

      newSlide.appendChild(newInstaSroty);

      this.fullGalleryWrapper.appendChild(newSlide);

      this.elementStoryProgressBar.insertAdjacentHTML(
        "beforeend",
        `
         <div class="inst-gallery-full__navigation-line">
          <div class="inst-gallery-full__navigation-line-progress" ></div>
      </div>
        `
      );
    }

    new InstaStory(0, this, this.storyProgressBar, lengthContetn);

    this.onSlideChange();
  };
  // ! start======
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
      // this.hiddenNextBtnNav();
      // this.showBackBtnNav();
      this.storyProgressBar.reset();
      this.storyProgressBar.play(this.swiperStory.activeIndex, this);
    });
  };

  preloadContent = () => {
    this.slideGallery.forEach((slide, index) => {
      const inputs = slide.querySelectorAll('input[name="contetnStories"]');

      const loadImgBg = [];
      const linkList = [];
      const titleList = [];
      const descriptionList = [];
      const textLinkList = [];
      const colorBtnList = [];

      inputs.forEach((input) => {
        const contetn = input.value.split("|");
        const imgBg = new Image();

        imgBg.src = contetn[0];

        loadImgBg.push(imgBg);

        linkList.push(contetn[1]);
        titleList.push(contetn[2]);
        descriptionList.push(contetn[3]);
        textLinkList.push(contetn[4]);
        colorBtnList.push(contetn[5]);
      });

      this.loadedContetnInput.push({
        slideIndex: index,
        imgListBg: loadImgBg,
        linkList: linkList,
        titleList: titleList,
        descriptionList: descriptionList,
        textLinkList: textLinkList,
        colorBtnList: colorBtnList,
      });
    });
  };
  // ! end ===
  nextStory = () => {
    this.currentSwiperSlide = Number(this.indxActvSlideOutsideSwiper) + 1;

    this.hiddenNextBtnNav();
    if (this.currentSwiperSlide > this.slideGallery.length - 1) return;

    this.updateStateStories(this.currentSwiperSlide);
  };

  prevStory = () => {
    this.currentSwiperSlide = Number(this.indxActvSlideOutsideSwiper) - 1;

    if (this.currentSwiperSlide === -1) return;

    this.updateStateStories(this.currentSwiperSlide);

    if (this.currentSwiperSlide == 0) {
      this.fullSwiperBack.style.display = "none";
    }
  };
  updateStateStories = (index) => {
    if (!this.isStoriesViewed(index)) {
      this.slideGallery[index]
        .querySelector(".inst-gallery__img img")
        .classList.add("_viewed");
    }
    this.storyProgressBar.reset();
    this.removeStory();
    this.indxActvSlideOutsideSwiper = index;
    this.initSwiperStory();
    this.createStories(this.slideGallery[index]);
    debugger;
    // ! приходит другой индекс
    this.storyProgressBar.play(index, this);
  };
  hiddenNextBtnNav = () => {
    if (
      this.currentSwiperSlide == this.slideGallery.length &&
      this.swiperStory.activeIndex ==
        document.querySelectorAll(".inst-gallery-full__navigation-line")
          .length -
          1
    ) {
      this.fullSwiperNext.style.display = "none";
    }
  };

  showBackBtnNav = () => {
    if (
      this.swiperStory.activeIndex <
      document.querySelectorAll(".inst-gallery-full__navigation-line").length -
        1
    ) {
      this.fullSwiperNext.style.display = "flex";
    }
  };

  // ! надо start ===
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
  // ! end ====
  // меняем класс для того тчоб было анимция вращения
}

class InstaStory {
  constructor(index, instaGallery, storyProgressBar, lengthContetn) {
    this.index = index;
    this.instaGallery = instaGallery;
    this.swiperStory = instaGallery.swiperStory;
    this.buttons = document.querySelectorAll(".inst-story__button");
    this.storyProgressBar = storyProgressBar;
    this.lengthContetn = lengthContetn;

    // this.storyProgressBar.play(0, this.instaGallery);
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
      // ! что то тут

      this.storyProgressBar.play(this.index, this.instaGallery);
    };

    let touchUp = (event) => {
      clearInterval(pauseTimeout);
      this.storyProgressBar.play(this.index, storyProgressBar.play);
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

    this.instaGallery.fullSwiperNext.addEventListener("click", click, {
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
  duration = 3000;
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
