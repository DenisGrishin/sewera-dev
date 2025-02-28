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
        spaceBetween: 0,
        slidesPerView: "auto",
        breakpoints: {
          1023: {
            spaceBetween: 0,
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

    this.preloadContent = new PreloadContent(this.slideGallery);

    // события на иконку стоиса
    this.instaGallery.addEventListener("click", (e) => {
      const slide = e.target.closest(".inst-gallery__slide");

      if (!slide) return;

      StorageHelper.setItem(
        `date-stories-${slide.dataset.index}`,
        slide.dataset.dateStories
      );

      this.indxActvinstaGallerySwiper = slide.dataset.index;

      this.createStory(slide);

      this.storyGallerySetOpen(true);

      slide.querySelector(".inst-gallery__img img").classList.add("_viewed");

      if (slide.dataset.index == 0) {
        this.storySwiperBack.style.display = "none";
      }
      addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          this.storyGallerySetOpen(false);
        }
      });
      if (
        slide.dataset.index == this.slideGallery.length - 1 &&
        1 >= this.lengthСontent
      ) {
        this.storySwiperNext.style.display = "none";
      }
    });

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

      this.disableScroll();
      if (this.storyProgressBar) {
        this.storyProgressBar.play(0, this);
      }
    } else {
      this.instaDiscount = "";
      this.storyGallery.style.display = "none";
      this.storyGalleryIsOpen = false;
      if (this.typeCotent === "defaultStory") {
        this.storyProgressBar.stop();
      }
      this.indxActvinstaGallerySwiper = 0;
      this.removeStory();

      this.enableScroll();
    }
  };

  removeStory = () => {
    this.storyGalleryWrapper.innerHTML = "";
    this.elementStoryProgressBar.innerHTML = "";
    this.storyGalleryBtnNav.innerHTML = "";
    if (this.storyProgressBar) {
      this.storyProgressBar.stop();
    }
    this.storyProgressBar = "";
    this.instaDiscount = "";
    this.swiperStory.destroy(true, true);
  };

  createStory = (slide) => {
    this.content = this.preloadContent.findContent(slide);
    this.lengthСontent = this.preloadContent.lengthСontent;

    document.querySelector(".inst-gallery-full__nav").insertAdjacentHTML(
      "beforeend",
      `
									<div class="inst-gallery-full__back"></div>
									<div class="inst-gallery-full__next"></div>
								`
    );

    this.storySwiperBack = document.querySelector(".inst-gallery-full__back");
    this.storySwiperNext = document.querySelector(".inst-gallery-full__next");

    if (this.content.type === "defaultStory") {
      this.typeCotent = this.content.type;
      this.createDefaultStory(this.content);
    }
    if (this.content.type === "discount") {
      this.typeCotent = this.content.type;
      this.createDiscount(this.content);
    }
  };

  createDefaultStory = (content) => {
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
        
        <div class="inst-story__content">
        <div class="inst-story__button"></div>
          ${
            contentText
              ? `<div class="inst-story__content-text">${contentText}</div>`
              : ""
          }
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

    new InstaStory(this, this.storyProgressBar, this.lengthСontent);
  };
  createDiscount = (content) => {
    let newSlide = document.createElement("div");
    newSlide.setAttribute("class", "swiper-slide");

    let newInstaSroty = document.createElement("div");
    newInstaSroty.classList.add("inst-story", "inst-form");

    newSlide.appendChild(newInstaSroty);
    this.storyGalleryWrapper.appendChild(newSlide);
    // ${this.getMonths()}
    newInstaSroty.insertAdjacentHTML(
      "beforeend",
      `
      <div class="inst-form__content discount-category">
      <div class="discount-category__title">Выберите 3 услуги ${this.getMonths()}, на которые
					хотите
					получить скидку</div>
          		<ul class="discount-category__list ">
				
			      	</ul>
				<button type="button" class="discount-category__btn-next">Зафиксировать
					скидки</button>
      </div>
   
      
        `
    );
    const listItemDiscount = newInstaSroty.querySelector(
      ".discount-category__list"
    );

    for (let index = 0; index < content.listDisount.length; index++) {
      const itemDiscount = content.listDisount[index];

      listItemDiscount.insertAdjacentHTML(
        "beforeend",
        `
         <li class="discount-category__item item-disc">
						<label for="item-disc-${index}" class="item-disc__label">
							<input id="item-disc-${index}" hidden type="checkbox" name='${itemDiscount.discount},${itemDiscount.name}' class="item-disc__checkbox">
							<span class="item-disc__discount ${itemDiscount.icon}"><span>${itemDiscount.discount}%</span></span>
							<span class="item-disc__name">${itemDiscount.name}</span>
						</label>
					</li>
          `
      );
    }

    this.instaDiscount = new InstaDiscount(
      this,
      newInstaSroty,
      listItemDiscount,
      content.slideIndex
    );
    this.initSwiperStory();

    if (
      StorageHelper.getItem(
        `discount-${this.slideGallery[content.slideIndex].dataset.dateStories}`,
        true
      )
    ) {
      this.instaDiscount.createSuccessStep();
    }
  };
  getMonths = () => {
    const months = [
      "Января",
      "февраля",
      "Марта",
      "Апреля",
      "Мая",
      "Июня",
      "Июля",
      "Авгуса",
      "Сентября",
      "Октября",
      "Ноября",
      "Декабря",
    ];
    // Устанавливаем московское время (UTC+3)
    let now = new Date(
      new Date().toLocaleString("en-US", { timeZone: "Europe/Moscow" })
    );

    // Добавляем 7 дней
    let futureDate = new Date(now);
    futureDate.setDate(now.getDate() + 7);

    // Если месяц изменился — устанавливаем 1-е число нового месяца
    if (futureDate.getMonth() !== now.getMonth()) {
      futureDate.setDate(1); // Первое число следующего месяца
    }

    return months[futureDate.getMonth()];
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
      if (this.storyProgressBar) {
        this.storyProgressBar.reset();
        this.storyProgressBar.play(this.swiperStory.activeIndex, this);
      }
    });
  };
  disableScroll() {
    const scrollPosition = window.scrollY;
    document.body.style.paddingRight = `${
      window.innerWidth - document.body.clientWidth
    }px`;
    document.body.classList.add("no-scroll");
    window.scrollTo(0, scrollPosition);
  }
  enableScroll() {
    document.body.style.paddingRight = "0";
    document.body.classList.remove("no-scroll");
  }
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
    if (this.storyProgressBar) {
      this.storyProgressBar.reset();
    }
    this.indxActvinstaGallerySwiper = index;

    this.createStory(this.slideGallery[index]);

    if (this.storyProgressBar) {
      this.storyProgressBar.play(0, this);
    }
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
  constructor(instaGallery, storyProgressBar, lengthСontent) {
    this.instaGallery = instaGallery;
    this.swiperStory = instaGallery.swiperStory;
    this.buttons = document.querySelectorAll(".inst-story__button");
    this.storyProgressBar = storyProgressBar;
    this.lengthСontent = lengthСontent;
    this.btnCopy = document.querySelector("._copy");
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
        this.instaGallery
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

    if (this.btnCopy) {
      document.querySelector("._copy").addEventListener("click", () => {
        const text = "SEWERA";
        this.copyToClipboard(text);
      });
    }

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

  copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Текст скопирован в буфер обмена!");
      })
      .catch((err) => {
        console.error("Ошибка при копировании текста: ", err);
      });
  };
}
class InstaDiscount {
  listSelected = [];

  constructor(instaGallery, newInstaSroty, listItemDiscount, slideIndex) {
    this.instaGallery = instaGallery;
    this.newInstaSroty = newInstaSroty;
    this.listItemDiscount = listItemDiscount;
    this.dateStories =
      instaGallery.slideGallery[slideIndex].dataset.dateStories;

    this.contetnBlock = this.newInstaSroty.querySelector(".inst-form__content");
    this.nextBtn = this.newInstaSroty.querySelector(
      ".discount-category__btn-next"
    );

    this.listItemDiscount.addEventListener("change", this.chooseDiscounts);

    this.nextBtn.addEventListener("click", this.nextStep);

    this.instaGallery.storySwiperNext.addEventListener("click", this.click);
    this.instaGallery.storySwiperBack.addEventListener("click", this.click);
  }

  click = (event) => {
    if (event.clientX > innerWidth / 2) {
      this.instaGallery.nextStory();
    } else {
      this.instaGallery.prevStory();
    }
  };

  nextStep = (event) => {
    if (this.listSelected.length !== 3) return;

    this.createFinishStep();
  };

  createFinishStep = () => {
    this.contetnBlock.innerHTML = "";
    this.contetnBlock.insertAdjacentHTML(
      "beforeend",
      `
      
				<div class="discount-category__title">Услуги, которые вы выбрали:</div>

				<ul class="discount-category__list-selected ">
				
				</ul>

				<div class="discount-category__title">Зафиксировать скидки</div>

				<form class="discount-category__form form-discount-category">
        <input type="hidden" name="subject" value="Сторис скидки на услуги">
        <input type="hidden" name="Ссылка источник" value="https://sewera.ru/">
					<div class="form-discount-category__block-input">
						<label for="name-item-disc">Ваше имя</label>
						<input type="text" class="form-discount-category__input" required  placeholder="Имя" name="Имя"
							id="name-item-disc">
					</div>

					<div class="form-discount-category__block-input">
						<label for="tel-item-disc">Ваш номер телефона</label>
						<input type="tel" class="form-discount-category__input phone_mask" required  placeholder="+7 (___) ___-__-__"
							name="Телефон" id="tel-item-disc">
					</div>

					<div class="form-discount-category__agreements-data">Нажимая кнопку
						«Зафиксировать»,
						вы соглашаетесь
						с <a href="politika-konfidencialnosti/" target="_blank">политикой обработки персональных
							данных</a></div>

              
              
              <button type="submit" class="discount-category__submit">Зафиксировать
              </button>
          </form>
      `
    );

    const selectorListSelected = this.contetnBlock.querySelector(
      ".discount-category__list-selected"
    );
    const form = this.contetnBlock.querySelector(".form-discount-category");

    if (selectorListSelected && form) {
      for (let index = 0; index < 3; index++) {
        const item = this.listSelected[index];

        selectorListSelected.insertAdjacentHTML(
          "beforeend",
          `
        	<li class="item-selected">
						<span class="item-selected__discount ${item.icon}"><span>${item.discount}%</span></span>
						<span class="item-selected__name">${item.name}</span>
					</li>
        `
        );

        form.insertAdjacentHTML(
          "beforeend",
          `
        	<input type='hidden' name='${item.name}' value='${item.discount}%'>
          `
        );
      }
    }

    form.addEventListener("submit", this.submit);
    this.initMaskPhone();
  };
  // ${this.getMonths()}
  createSuccessStep = () => {
    this.contetnBlock.innerHTML = "";
    this.contetnBlock.classList.add("discount-category-success");
    this.contetnBlock.insertAdjacentHTML(
      "beforeend",
      `
      <div class='discount-category__big-title'>Ваши скидки на ${this.getMonths()}</div>
      <ul class="discount-category__list-selected _decor-line">
				
			</ul>
      `
    );
    const selectorListSelected = this.contetnBlock.querySelector(
      ".discount-category__list-selected"
    );
    let objLoclaStorage = StorageHelper.getItem(
      `discount-${this.dateStories}`,
      true
    );
    for (let index = 0; index < 3; index++) {
      const item = objLoclaStorage.listSelected[index];

      selectorListSelected.insertAdjacentHTML(
        "beforeend",
        `
        <li class="item-selected">
          <span class="item-selected__discount ${item.icon}"><span>${item.discount}%</span></span>
          <span class="item-selected__name">${item.name}</span>
        </li>
      `
      );
    }
  };
  getMonths = () => {
    const months = [
      "Январь",
      "февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ];

    // return months[new Date().getMonth()];
    // Устанавливаем московское время (UTC+3)
    let now = new Date(
      new Date().toLocaleString("en-US", { timeZone: "Europe/Moscow" })
    );

    // Добавляем 7 дней
    let futureDate = new Date(now);
    futureDate.setDate(now.getDate() + 7);

    // Если месяц изменился — устанавливаем 1-е число нового месяца
    if (futureDate.getMonth() !== now.getMonth()) {
      futureDate.setDate(1); // Первое число следующего месяца
    }

    // Получаем название месяца на русском

    return months[futureDate.getMonth()];
  };
  submit = (event) => {
    event.preventDefault();
    var th = $(".form-discount-category");

    $(".load__preloader").fadeIn("", () => {
      $.ajax({
        type: "POST",
        url: "/index.php?route=common/footer/form_submit_modal",
        data: th.serialize(),
        dataType: "json",
      })
        .done((json) => {
          if (json["success"]) {
            $(".load__preloader").fadeOut("slow");
            StorageHelper.setItem(
              `discount-${this.dateStories}`,
              {
                listSelected: this.listSelected,
              },
              true
            );

            this.createSuccessStep();
          }
        })
        .fail((jqXHR, textStatus, errorThrown) => {
          console.error("Ошибка AJAX запроса:", textStatus, errorThrown);
          $(".load__preloader").fadeOut("slow");
        });
    });
  };

  initMaskPhone = () => {
    $.fn.setCursorPosition = function (pos) {
      if (
        $(this).get(0).setSelectionRange &&
        $(this).val().replace(/\D/g, "").length != 11
      ) {
        $(this).get(0).setSelectionRange(pos, pos);
      }
    };

    $.mask.definitions["N"] = "[/0-6|9/]";

    $(".phone_mask")
      .click(function () {
        $(this).setCursorPosition(2);
      })
      .mask("+7 N99 999-99-99");
  };
  chooseDiscounts = (event) => {
    let item = event.target.closest(".discount-category__item");

    if (!item) return;

    const input = item.querySelector(".item-disc__checkbox");

    if (this.listSelected.some((it) => input.id === it.id)) {
      this.listSelected = this.listSelected.filter((it) => input.id !== it.id);

      item.classList.remove("_seleced");

      if (this.listSelected.length <= 3) {
        this.listItemDiscount.classList.remove("_fixed");
        this.nextBtn.classList.remove("discount-category__btn-next_arrow");
      }

      return;
    }

    const icon = item.querySelector(".item-disc__discount").classList[1]
      ? item.querySelector(".item-disc__discount").classList[1]
      : "";
    this.listSelected.push({
      id: input.id,
      discount: input.name.split(",")[0],
      name: input.name.split(",")[1],
      icon: icon,
    });

    if (this.listSelected.length >= 3) {
      this.listItemDiscount.classList.add("_fixed");

      this.nextBtn.classList.add("discount-category__btn-next_arrow");
    }

    item.classList.add("_seleced");
  };
}

class PreloadContent {
  loadedContetnInput = [];
  lengthСontent = 0;
  constructor(slideGallery) {
    slideGallery.forEach((slide, index) => {
      const input = slide.querySelector("input");
      if (input) {
        if (input.name === "contentStories") {
          this.preloadDefaultStory(slide, index);
        }

        if (input.name === "contentDiscount") {
          console.log(true);
          this.preloadDiscount(slide, index);
        }
      }
    });
  }

  get getContetn() {
    return this.loadedContetnInput;
  }

  findContent = (slide) => {
    const slideIndx = slide.dataset.index;
    this.lengthСontent = slide.querySelectorAll(".content").length;

    return this.loadedContetnInput.find(
      (it) => it.slideIndex === Number(slideIndx)
    );
  };

  preloadDiscount = (slide, index) => {
    const listDisount = [];
    const inputs = slide.querySelectorAll('input[name="contentDiscount"]');

    inputs.forEach((input) => {
      const content = input.value.split("|");
      listDisount.push({
        icon: content[0],
        discount: content[1],
        name: content[2],
      });
    });
    this.loadedContetnInput.push({
      slideIndex: index,
      type: "discount",
      listDisount: listDisount,
    });
  };

  preloadDefaultStory = (slide, index) => {
    const loadImgBg = [];
    const contentText = [];

    const inputs = slide.querySelectorAll('input[name="contentStories"]');

    inputs.forEach((input) => {
      const content = input.value.split("|");
      const imgBg = new Image();
      imgBg.src = content[0];
      loadImgBg.push(imgBg);
      contentText.push(content[1]);
    });

    this.loadedContetnInput.push({
      slideIndex: index,
      type: "defaultStory",
      imgListBg: loadImgBg,
      listContentText: contentText,
    });
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
  static setItem(key, value, isObj = false) {
    if (!isObj) return localStorage.setItem(key, value);

    localStorage.setItem(key, JSON.stringify(value));
  }

  static getItem(key, isObj = false) {
    if (!isObj) return localStorage.getItem(key);

    return JSON.parse(localStorage.getItem(key));
  }

  static removeItem(key) {
    localStorage.removeItem(key);
  }
}

InstaGallery.delegate();
