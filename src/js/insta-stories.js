class InstaGallery {
  static delegated = false;
  fullGalleryIsOpen = false;
  instaVideoList = new Array(0);
  interval = null;
  duration = 30000;
  progress = 0;
  startTime = null;
  elapsedTime = 0;
  loadedContetnInput = new Array(0);
  indxActvSlideSwiper = 0;
  currentSwiperSlide = 0;
  isPause = false;

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
      this.indxActvSlideSwiper = slide.dataset.index;
      this.createStories(slide);

      slide.querySelector(".inst-gallery__img img").classList.add("_viewed");
      this.fullGallerySetOpen(true);
      this.play(0);
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
    // слайдер на сторис
    this.initSwiperStories();

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

      this.fullGallerySlideTo(0);

      document.body.style.overflow = "hidden";
      this.reset();
    } else {
      this.stop();
      this.fullGallery.style.display = "none";
      this.fullGalleryIsOpen = false;
      this.indxActvSlideSwiper = 0;
      this.removeStories();
      document.body.style.overflow = "";
    }
  };

  // перключает по слйадом в стрис
  fullGallerySlideTo(index) {
    if (index === this.fullSwiper.activeIndex) return;
    this.fullSwiper.slideTo(index);

    this.play(index);
  }

  removeStories = () => {
    this.fullGalleryWrapper.innerHTML = "";
    this.fullGalleryNavidation.innerHTML = "";
  };

  createStories = (slide) => {
    const slideIndx = slide.dataset.index;

    let contetn = this.loadedContetnInput.find(
      (it) => it.slideIndex === Number(slideIndx)
    );

    for (let index = 0; index < contetn.imgListBg.length; index++) {
      const imgBg = contetn.imgListBg[index];
      const link = contetn.linkList[index];
      const title = contetn.titleList[index];
      const description = contetn.descriptionList[index];
      const textBtn = contetn.textBtnList[index];
      const colorBtn = contetn.colorBtnList[index];

      let newInstaSroty = document.createElement("div");
      newInstaSroty.setAttribute("class", "inst-story");

      newInstaSroty.insertAdjacentHTML(
        "beforeend",
        `
        <img class="inst-story__icon-logo" src="/srv/assets/images/main/stories/logo.svg">
        <img class="inst-story__img" src="${imgBg.src}" >
        <div class="inst-story__button"></div>

          <div class="inst-story__contetn">
          ${title ? `<div class="inst-story__title">${title}</div>` : ""}
          ${description ? `<div class="inst-story__description">${description}</div>` : ""}
          ${link ? `<a href='${link}' style="background-color:${colorBtn}" class="inst-story__link"><span>${textBtn}</span></a>` : ""}
          </div>
       
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
  };

  preloadContent = () => {
    this.slideGallery.forEach((slide, index) => {
      const inputs = slide.querySelectorAll('input[name="contetnStories"]');

      const loadImgBg = [];
      const linkList = [];
      const titleList = [];
      const descriptionList = [];
      const textBtnList = [];
      const colorBtnList = [];

      inputs.forEach((input) => {
        const contetn = input.value.split("|");
        const imgBg = new Image();

        imgBg.src = contetn[0];

        loadImgBg.push(imgBg);

        linkList.push(contetn[1]);
        titleList.push(contetn[2]);
        descriptionList.push(contetn[3]);
        textBtnList.push(contetn[4]);
        colorBtnList.push(contetn[5]);
      });

      this.loadedContetnInput.push({
        slideIndex: index,
        imgListBg: loadImgBg,
        linkList: linkList,
        titleList: titleList,
        descriptionList: descriptionList,
        textBtnList: textBtnList,
        colorBtnList: colorBtnList,
      });
    });
  };
  nextStories = () => {
    this.currentSwiperSlide = Number(this.indxActvSlideSwiper) + 1;

    if (this.currentSwiperSlide > this.slideGallery.length - 1) return;

    this.updateStateStories(this.currentSwiperSlide);
  };
  prevStories = () => {
    this.currentSwiperSlide = Number(this.indxActvSlideSwiper) - 1;

    if (this.currentSwiperSlide === -1) return;

    this.updateStateStories(this.currentSwiperSlide);
  };

  updateStateStories = (index) => {
    if (!this.isStoriesViewed(index)) {
      this.slideGallery[index]
        .querySelector(".inst-gallery__img img")
        .classList.add("_viewed");
    }

    this.reset();
    this.removeStories();
    this.indxActvSlideSwiper = index;
    this.createStories(this.slideGallery[index]);
    this.play(0);
    this.initSwiperStories();
  };

  initSwiperStories = () => {
    this.fullSwiper = new Swiper(
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
    //slideChange
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
    });
  };
  play = (indx) => {
    this.isPause = false;
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
          this.nextStories();
          // this.fullGallerySetOpen(false);
          return;
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
    this.isPause = true;
    clearInterval(this.interval);
    this.interval = null;
  };
  reset() {
    this.pause();
    this.width = 0;
    this.elapsedTime = 0;
  }

  nextSlide = () => {
    this.fullSwiper.slideNext();
    this.play(this.fullSwiper.activeIndex);
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

    let isPause = false;
    let mouseDown = (event) => {
      console.log("mouseDown");

      this.fullGallery.pause();
    };

    let touchDown = (event) => {
      this.fullGallery.pause();
    };

    let mouseUp = (event) => {
      console.log("mouseUp");

      this.fullGallery.play(this.index);
    };

    let touchUp = (event) => {
      this.fullGallery.play(this.index);
    };

    let click = (event) => {
      // if (isPause) {
      //   // isPause = false;
      //   return;
      // }
      console.log("click");
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
    if (
      this.fullGallery.fullSwiper.activeIndex ==
      this.fullGallery.fullSwiper.slides.length - 1
    ) {
      this.fullGallery.nextStories();

      return;
    }
    // if (!this.fullGallery.instaVideoList[this.swiper.activeIndex + 1]) {
    //   return;
    // }

    this.fullGallery.fullSwiper.slideNext();
  };

  sliderBack = (event) => {
    if (this.fullGallery.fullSwiper.activeIndex == 0) {
      this.fullGallery.prevStories();

      return;
    }
    console.log(this.fullGallery.instaVideoList[this.swiper.activeIndex - 1]);

    // if (!this.fullGallery.instaVideoList[this.swiper.activeIndex - 1]) {
    //   return;
    // }
    this.fullGallery.fullSwiper.slidePrev();
  };
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
