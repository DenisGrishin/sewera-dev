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
function switchTabClass() {
  const slectorBtn = document.querySelectorAll(".ya-map__tab");
  if (slectorBtn) {
    slectorBtn.forEach((element) => {
      element.addEventListener("click", (e) => {
        if (element.closest("._active-tab-map")) {
          return;
        }
        slectorBtn.forEach((el) => el.classList.remove("_active-tab-map"));
        element.classList.add("_active-tab-map");
      });
    });
  }
}
function initMap() {
  const cityList = [
    {
      city: "москва",
      center: [55.73, 37.6],
      zoom: 8,
    },
    {
      city: "питер",
      center: [59.93, 30.31],
      zoom: 8,
    },
    {
      city: "рф",
      center: [66.25, 94.15],
      zoom: 3,
    },
  ];

  const tabsMap = document.querySelectorAll("button[data-city-map]");

  switchTabClass();
  if (document.getElementById("map-info")) {
    var myMap = new ymaps.Map(
      "map-info",
      {
        center: cityList[0].center,
        zoom: 8,
      },
      {
        searchControlProvider: "yandex#search",
      }
    );

    ymaps.borders
      .load("001", {
        lang: "ru",
        quality: 1,
      })
      .then(function (geojson) {
        var regions = ymaps.geoQuery(geojson);

        regions.setOptions({
          fillColor: "#ff670100", // Цвет заливки
          strokeColor: "#ff670100", // Цвет обводки
          strokeWidth: 0, // Толщина линии
        });
        regions.search('properties.iso3166 = "RU"').setOptions({
          fillColor: "#ff670100", // Цвет заливки
          strokeColor: "#102938", // Цвет обводки
          strokeWidth: 1, // Толщина линии
        });

        regions.addToMap(myMap);
      });
    if (tabsMap.length !== 0) {
      tabsMap.forEach((element) => {
        const dataCity = element.dataset.cityMap;
        let objCity = cityList.find((el) => dataCity === el.city);

        dataCity !== "рф"
          ? myMap.geoObjects.add(new ymaps.Placemark(objCity.center, {}))
          : "";
        element.addEventListener("click", (e) => {
          myMap.setCenter(objCity.center, objCity.zoom);
        });
      });
    }

    myMap.controls.remove("zoomControl"); // удаляем контрол зуммирования
    myMap.controls.remove("geolocationControl"); // удаляем геолокацию
    myMap.controls.remove("searchControl"); // удаляем поиск
    myMap.controls.remove("trafficControl"); // удаляем контроль трафика
    myMap.controls.remove("typeSelector"); // удаляем тип
    myMap.controls.remove("fullscreenControl"); // удаляем кнопку перехода в полноэкранный режим
    myMap.controls.remove("rulerControl"); // удаляем контрол правил
    myMap.behaviors.disable(["scrollZoom"]); // отключаем скролл карты (опционально)
  }
}
if (typeof ymaps !== "undefined") {
  ymaps.ready(initMap);
}
