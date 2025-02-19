"use strict";
if (!window.require_once_stories_js) {
  window.require_once_stories_js = 1;

  class InstaVideo {
    index = 0;

    isPlayed = false;
    isErrored = false;
    isLoading = false;

    swiper;
    allVideos;
    //  длина видео
    length = 10;

    onEnd = () => {};

    onError = () => {};

    onProgress = (progress) => {};

    onSliderEnd = () => {};

    sliderNext = (event) => {
      if (event && event.target.tagName === "A") {
        this.onSliderEnd();
        return;
      }
      if (!this.allVideos[this.swiper.activeIndex + 1]) {
        this.onSliderEnd();
        return;
      }
      this.allVideos.forEach((elem) => {
        elem.setPlay(false);
      });
      this.allVideos[this.swiper.activeIndex + 1].setPlay(true);
      this.swiper.slideNext();
      this.allVideos.forEach((elem) => {
        elem.updateStyle();
      });
    };

    sliderBack = (event) => {
      if (event && event.target.tagName === "A") {
        this.onSliderEnd();
        return;
      }
      if (!this.allVideos[this.swiper.activeIndex - 1]) {
        this.onSliderEnd();
        return;
      }
      this.allVideos.forEach((elem) => {
        elem.setPlay(false);
      });
      this.allVideos[this.swiper.activeIndex - 1].setPlay(true);
      this.swiper.slidePrev();
      this.allVideos.forEach((elem) => {
        elem.updateStyle();
      });
    };
    // меняем класс для того тчоб было анимция вращения
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

    viewError = false;
    viewLoading = false;

    constructor(instaVideo, index, slideElement, fullGallery) {
      this.instaVideo = instaVideo;
      this.player = instaVideo.querySelector(".insta-video__player");
      this.button = instaVideo.querySelector(".insta-video__button");
      this.index = index;
      this.slideElement = slideElement;
      this.fullGallery = fullGallery;

      //Pause action
      let isPause = false;
      let pauseTimer;

      this.x = 0;

      let mouseDown = (event) => {};

      let touchDown = (event) => {};

      let mouseUp = (event) => {};

      let touchUp = (event) => {};
      // на слайдды внутри
      let click = (event) => {
        if (!this.isPlayed) {
          this.fullGallery.fullGallerySlideTo(this.index);
          return;
        }

        if (isPause) {
          isPause = false;
          return;
        }

        if (event.clientX > innerWidth / 2) {
          this.sliderNext(event);
        } else {
          this.sliderBack(event);
        }
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
    // end constructor
    // сраьботвает когда открвыае стоис
    LoadAndPlay = () => {};

    setPlay(play) {
      setTimeout(() => {
        this.onProgress(10);
        this.updateStyle();
      }, 100);
    }

    setProgress(time) {
      // ;
      // this.onProgress(time);
    }
  }

  class InstaGallery {
    fullGalleryIsOpen = false;

    instaVideoList = new Array(0);
    static delegated = false;

    static delegate() {
      InstaGallery.delegated = true;
      let instaGalleryDOM = document.querySelectorAll(".insta-gallery");
      if (instaGalleryDOM) instaGalleryDOM.forEach((elem) => new this(elem));
    }

    constructor(instaGallery) {
      this.instaGallery = instaGallery;
      this.swiperLeft = this.instaGallery.querySelector(
        ".insta-gallery__left-arrow"
      );
      this.swiperRight = this.instaGallery.querySelector(
        ".insta-gallery__right-arrow"
      );

      //gallery
      this.swiper = new Swiper(
        this.instaGallery.querySelector(".insta-gallery__swiper"),
        {
          spaceBetween: 8.8,
          slidesPerView: "6",
          navigation: {
            prevEl: this.swiperLeft,
            nextEl: this.swiperRight,
          },
          breakpoints: {
            1200: {
              spaceBetween: 10,
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

      //full gallery
      this.fullGallery = this.instaGallery.querySelector(".insta-gallery-full");
      this.fullGalleryClose = this.instaGallery.querySelector(
        ".insta-gallery-full__close"
      );
      this.fullGalleryWrapper = this.instaGallery.querySelector(
        ".insta-gallery-full__swiper .swiper-wrapper"
      );

      //navigation
      this.fullGalleryNavidation = this.instaGallery.querySelector(
        ".insta-gallery-full__navigation"
      );

      this.fullGalleryWrapper.innerHTML = "";
      this.fullGalleryNavidation.innerHTML = "";

      let index = 0;

      this.swiper.slides.forEach((elem, index) => {
        let image = elem.querySelector(".insta-gallery__preview");
        let imgSrc = elem.getAttribute("data-video");

        //Add open video action
        image.addEventListener(
          "click",
          () => {
            this.fullSwiper.slideTo(index - 1, 0);
            this.fullGallerySetOpen(true);
          },
          { passive: true }
        );

        //initialize video
        let newInstaVideo = document.createElement("div");

        newInstaVideo.setAttribute("class", "insta-video");

        newInstaVideo.innerHTML = `
                    <div class="insta-video__button"></div>
                    <img class="insta-video__player" src="${imgSrc}">`;

        let newSlide = document.createElement("div");
        newSlide.setAttribute("class", "swiper-slide");
        newSlide.appendChild(newInstaVideo);
        this.fullGalleryWrapper.appendChild(newSlide);

        this.instaVideoList.push(
          new InstaVideo(newInstaVideo, index, newSlide, this)
        );

        index++;

        this.fullGalleryNavidation.innerHTML += `
                <div class="insta-gallery-full__navigation-line">
                    <div class="insta-gallery-full__navigation-line-progress" style="width: 0"></div>
                </div>
            `;
      });

      //full swiper
      this.fullSwiper = new Swiper(
        this.instaGallery.querySelector(".insta-gallery-full__swiper"),
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
            430: {
              spaceBetween: 31,
            },
          },
        }
      );
      // закрыть сторисы на кнопку справа вверху
      this.fullGalleryClose.addEventListener(
        "click",
        () => {
          this.fullGallerySetOpen(false);
        },
        { passive: true }
      );

      //full swiper actions
      this.instaVideoList.forEach((video, index) => {
        video.swiper = this.fullSwiper;
        video.allVideos = this.instaVideoList;
        video.onSliderEnd = () => {
          this.fullGallerySetOpen(false);
        };
      });

      //Navigation action
      this.fullSwiper.on("slideChange", (swiper) => {
        this.fullGalleryNavidation
          .querySelectorAll(".insta-gallery-full__navigation-line")
          .forEach((elem, index) => {
            elem.querySelector(
              ".insta-gallery-full__navigation-line-progress"
            ).style.display = "none";

            if (index < swiper.activeIndex) {
              elem.style.backgroundColor = "#FFF";
            } else {
              elem.style.backgroundColor = "";
            }

            if (index === swiper.activeIndex) {
              elem.querySelector(
                ".insta-gallery-full__navigation-line-progress"
              ).style.display = "";
            }

            elem.querySelector(
              ".insta-gallery-full__navigation-line-progress"
            ).style.width = "0";
          });
      });

      //Progress action
      this.instaVideoList.forEach((elem, index) => {
        elem.onProgress = (progress) => {
          let line = this.fullGalleryNavidation.children[index].querySelector(
            ".insta-gallery-full__navigation-line-progress"
          );

          line.classList.add("_progressev-actv");
        };

        elem.onEnd = () => {
          if (this.fullSwiper.activeIndex === this.fullSwiper.slides.length - 1)
            this.fullGallerySetOpen(false);
          else this.fullSwiper.slideNext();
        };
      });

      //keyboard buttons actions
      // addEventListener(
      //   "keydown",
      //   (event) => {
      //     if (event.key === "Escape") {
      //       this.fullGallerySetOpen(false);
      //     }

      //     if (event.key === " ") {
      //       if (this.fullGalleryIsOpen) this.fullGallerySetPlay(!this.isPlay);
      //     }

      //     if (event.key === "ArrowLeft") {
      //       if (0 > this.fullSwiper.activeIndex - 1) {
      //         this.fullGallerySetOpen(false);
      //         return;
      //       }
      //       this.fullGallerySlideTo(this.fullSwiper.activeIndex - 1);
      //     } else if (event.key === "ArrowRight") {
      //       if (
      //         this.fullSwiper.slides.length <
      //         this.fullSwiper.activeIndex + 2
      //       ) {
      //         this.fullGallerySetOpen(false);
      //         return;
      //       }
      //       this.fullGallerySlideTo(this.fullSwiper.activeIndex + 1);
      //     }
      //   },
      //   { passive: true }
      // );

      //Click other action
      this.fullGallery.addEventListener(
        "click",
        (event) => {
          let isTarget = event.target === this.fullGallery;
          if (isTarget) this.fullGallerySetOpen(false);
        },
        { passive: true }
      );
    }
    // end constructor
    isPlay = false;

    fullGallerySetPlay(state) {
      if (state === this.isPlay) return;
      this.isPlay = !!state;
      this.updatePlay();
    }

    updatePlay() {}
    // перключает по слйадом в стрис
    fullGallerySlideTo(index) {
      this.fullSwiper.slideTo(index);
      this.updatePlay();
      this.instaVideoList.forEach((elem) => elem.updateStyle());
      this.instaVideoList.forEach((video) => video.setProgress(0));
    }

    fullGallerySetOpen(state) {
      if (this.fullGalleryIsOpen === state) return;

      if (state) {
        this.fullGallery.style.display = "";
        this.fullGalleryIsOpen = true;
        this.fullGallerySetPlay(true);
        this.instaVideoList.forEach((elem) => elem.updateStyle());
        this.instaVideoList.forEach((video) => video.setProgress(0));
      } else {
        this.fullGallery.style.display = "none";
        this.fullGalleryIsOpen = false;
        this.fullGallerySetPlay(false);
      }
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    InstaGallery.delegate();
  });
}
