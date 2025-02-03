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
        429.98: {
          spaceBetween: 20,
          slidesPerView: 1.3,
          grid: {
            rows: 1,
            fill: "row",
          },
        },

        767.98: {
          spaceBetween: 20,
          slidesPerView: 2,
          grid: {
            rows: 2,
            fill: "row",
          },
        },
        1023.98: {
          slidesPerView: 4,
          spaceBetween: 20,
          grid: {
            rows: 1,
            fill: "row",
          },
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
    setTimeout(() => {
      const swiper = new Swiper(".our-partners__slider ", {
        slidesPerView: 6.2,
        spaceBetween: 24,
        speed: 3750,
        autoHeight: false,
        observer: true,
        loop: true,

        autoplay: {
          delay: 0,
          disableOnInteraction: false,
        },
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
            slidesPerView: 6.2,
            spaceBetween: 24,
          },
        },
        on: {},
      });
    }, 1000);
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
  const textInfo = document.querySelector(".map-info__text");

  if (slectorBtn) {
    slectorBtn.forEach((element) => {
      element.addEventListener("click", (e) => {
        if (element.closest("._active-tab-map")) {
          return;
        }

        slectorBtn.forEach((el) => el.classList.remove("_active-tab-map"));

        textInfo.innerHTML = element.dataset.textMap;
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
      zoom: 7,
      polygon: [],
    },
    {
      city: "питер",
      center: [59.93, 30.31],
      zoom: 7,
      polygon: [
        [61.106088074302846, 28.84990729821095],
        [60.54048161644306, 27.852634950925818],
        [60.75790210590904, 28.70283621526761],
        [60.71577485205364, 28.815934690349366],
        [60.36998777034415, 28.591678325406576],
        [60.16918067335956, 29.40829044088855],
        [60.211534546111665, 29.565211415079403],
        [60.187888023113686, 29.76919931592809],
        [60.15288724263536, 29.946358034169208],
        [60.12523238261545, 30.01739461918757],
        [60.0423242615806, 29.96706282242633],
        [59.98493140629839, 30.238787111520338],
        [59.93232002134522, 30.232711129552428],
        [59.84017052918489, 30.131823462708525],
        [59.885551817464716, 29.780468838045408],
        [59.93961408752628, 29.49723475289224],
        [59.964616467662836, 29.19559571694552],
        [59.91991225984697, 29.093497700881187],
        [59.83296746003299, 29.087954398797308],
        [59.78396907811887, 28.914027896498567],
        [59.75631501176312, 28.72500164979357],
        [59.800093425856545, 28.60943866524633],
        [59.80224973132346, 28.510190763084665],
        [59.73798583871411, 28.485433522283643],
        [59.66933873971914, 28.443601343301964],
        [59.6455402380044, 28.376395134689574],
        [59.65854803135656, 28.293968754917074],
        [59.69130561691546, 28.200415788977097],
        [59.74283516453832, 28.176907105205913],
        [59.767886802293845, 28.119769460495604],
        [59.671623961424615, 28.052389391540657],
        [59.53828823226743, 28.139961089731088],
        [59.35798953936603, 28.280648261698502],
        [59.02248117220134, 27.802166784452368],
        [59.00045046566632, 28.16716353323224],
        [58.90325564969078, 28.305782371843577],
        [58.892541977172385, 28.547145432234146],
        [58.839964234623864, 28.845593925558575],
        [58.81921766186278, 29.117229752723944],
        [58.71702324975635, 29.25362211337176],
        [58.61141214319082, 29.417761707109804],
        [58.52810610714258, 29.61583387713702],
        [58.45004102025334, 29.77698972302713],
        [58.47175326366724, 30.057070714286084],
        [58.528177693429086, 30.078493270758997],
        [58.670382603306024, 30.045047415771506],
        [58.784750929872246, 30.172568775367296],
        [58.77110172497413, 30.343612119793363],
        [58.74393741340788, 30.50480117892272],
        [58.76087846060315, 30.64903410782111],
        [58.89266306882436, 30.720318055999343],
        [58.931775319679105, 30.87541133018749],
        [59.08920426528445, 31.001107474298152],
        [59.05199909544481, 31.247310598952225],
        [59.16120182948734, 31.46040108683397],
        [59.24601344328124, 31.51924861119312],
        [59.3841107762172, 31.519650608045566],
        [59.37453535197764, 31.743859355535903],
        [59.41319939652709, 31.895892426683588],
        [59.4229337327242, 32.06818148171814],
        [59.35859553485514, 32.20693837199164],
        [59.28307118884456, 32.32414465705074],
        [59.17916450331086, 32.39505501883892],
        [59.15220746691128, 32.516090367786234],
        [59.16411241403188, 32.67707713805814],
        [59.25209559211132, 32.704493920109],
        [59.34898953782607, 32.772563410771056],
        [59.396925101876036, 32.86750784159898],
        [59.44235324548666, 33.07951705642466],
        [59.413053844884786, 33.23037247596619],
        [59.42351502348515, 33.46150882912565],
        [59.3621493877059, 33.71617224039184],
        [59.28076198027452, 33.85555732820072],
        [59.18093545333778, 34.07927365350611],
        [59.218446738264504, 34.31479262566086],
        [59.18449031867098, 34.46167119790215],
        [59.15756557610953, 34.569028458632886],
        [59.134213013591875, 34.74295902207777],
        [59.19477306563164, 34.801078803116695],
        [59.2564359565597, 34.97977799727809],
        [59.2912162694453, 35.12579135405289],
        [59.32989570283232, 35.26304437874467],
        [59.394126305198824, 35.282047170349756],
        [59.44494765499957, 35.336190323574385],
        [59.527887428452004, 35.279241905261756],
        [59.55491865313289, 35.38593012930545],
        [59.56172289354441, 35.45519752319393],
        [59.63727521994343, 35.448287025471046],
        [59.65468260646398, 35.555353868864756],
        [59.686264326387004, 35.562483180192146],
        [59.703950761999664, 35.42163323598487],
        [59.76838546078838, 35.34683149778368],
        [59.85256037133368, 35.3567480923831],
        [59.92369691755857, 35.406137191942264],
        [59.9805250889039, 35.28730686193509],
        [60.017895388841026, 35.10473292452272],
        [60.08351447005737, 35.16532530607367],
        [60.18264270143564, 35.12041199589066],
        [60.25167418889458, 35.135359361852636],
        [60.33731700421731, 35.225018017333184],
        [60.599637668599655, 35.24198481129656],
        [60.66614517771396, 35.19836887519892],
        [60.73404500750823, 35.14189036348486],
        [60.860688754947546, 35.23361484311272],
        [60.88857627351911, 35.38923417605841],
        [60.93444654114589, 35.52607157330945],
        [61.02021458655281, 35.63697856871454],
        [61.1083074214377, 35.66627786728151],
        [61.15697755043698, 35.65753483388153],
        [61.138111449137995, 35.513698102849844],
        [61.12318207774868, 35.36526337298682],
        [61.1832439172974, 35.335165607609014],
        [61.23909327326484, 35.34306604636703],
        [61.228582198408304, 35.19403076257794],
        [61.22860626645772, 35.028774374516416],
        [61.26035502030351, 34.80014854115669],
        [61.228371912248804, 34.62740677860907],
        [61.16914050333483],
        34.521057796999315,
        [61.1381625782991, 34.375724845099],
        [61.193136211572295, 34.274744102545526],
        [61.207127022717884, 34.01546202975132],
        [61.203757474773255, 33.698387119373336],
        [61.16566629145257, 33.56353423301232],
        [61.15193178960703, 33.495864964454626],
        [61.10094639830956, 33.57979779688657],
        [61.14509680547397, 33.76467751366431],
        [61.12465903378748, 33.91802782223414],
        [61.008016691462956, 33.941252627795365],
        [60.9144170484949, 33.816468775562356],
        [60.92079313266953, 33.67582168857538],
        [60.95277608109717, 33.57544502404991],
        [60.99486230036612, 33.50047914244152],
        [60.9656518934932, 33.47746318511602],
        [60.920762010627215, 33.49682021768072],
        [60.88595190808354, 33.39188123480494],
        [60.8360574570367, 33.341192219070024],
        [60.753586881331614, 33.26077873445362],
        [60.696863877704004, 33.128608162644554],
        [60.66744942292257, 33.013157521200924],
        [60.47643160894205, 32.82599005653793],
        [60.50472927233986, 32.65483755366424],
        [60.396308853622884, 32.74780061241211],
        [60.31819019883031, 32.66598898975374],
        [60.245199187531796, 32.65909996699057],
        [60.161066458141306, 32.61444214580604],
        [60.12614806592467, 32.495855101856904],
        [60.09471699316654, 32.301778825749864],
        [60.11039252448461, 32.18459263609901],
        [60.16749132430087, 32.070916239492675],
        [60.18998264893045, 31.889161919783447],
        [60.18675966797986, 31.73410743459536],
        [60.119836209160354, 31.65017367415598],
        [60.0605217394008, 31.6046419601648],
        [59.99324259600215, 31.610785530865854],
        [59.93335651991168, 31.59401443688691],
        [59.880472446391366, 31.50763516198711],
        [59.886351135496454, 31.27940617403553],
        [59.90097354234132, 31.142684758149613],
        [59.91566408008279, 30.99993686742772],
        [59.95660389144942, 30.951398418986003],
        [60.00105689222647, 31.02619414415352],
        [60.07363677987078, 31.053152954550058],
        [60.151108957508114, 30.981435482398467],
        [60.22734836046297, 30.91402784967906],
        [60.375430876166945, 30.82185987239356],
        [60.49908511402646, 30.692137455248258],
        [60.58062586990846, 30.57597504845583],
        [60.64945709096361, 30.443091178705856],
        [60.73859746306803, 30.47682683528842],
        [60.806970681028275, 30.462987825587703],
        [61.00722789319536, 30.257720710362037],
        [61.0946869940374, 30.081598200023848],
        [61.151348903426424, 29.830549834254754],
        [61.15529478015222, 29.613444318104058],
        [61.212959857671194, 29.516226783570488],
        [61.263060270690886, 29.348334364957054],
        [61.25454458553398, 29.24086735976627],
        [61.106088074302846, 28.84990729821095],
      ],
    },
    {
      city: "рф",
      center: [66.25, 94.15],
      zoom: 3,
      polygon: [],
    },
  ];

  const tabsMap = document.querySelectorAll("button[data-city-map]");

  switchTabClass();
  if (document.getElementById("map-info")) {
    var myMap = new ymaps.Map(
      "map-info",
      {
        center: cityList[0].center,
        zoom: 7,
      },
      {
        searchControlProvider: "yandex#search",
      }
    );
    // Создаем круг
    var myCircle = new ymaps.Circle(
      [
        // Координаты центра круга.
        [55.76, 37.6],
        // Радиус круга в метрах.
        160000,
      ],
      {
        balloonContent: "Радиус круга - 165 км",
        hintContent: "Подвинь меня",
      },
      {
        draggable: false,

        fillColor: "#009CD9",

        strokeColor: "#0067A0",

        strokeOpacity: 1,

        strokeWidth: 1,
        fillOpacity: 0.2,
      }
    );
    myMap.geoObjects.add(myCircle);
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
        let myPolygon = new ymaps.Polygon(
          [objCity.polygon],
          {
            hintContent: "Многоугольник",
          },
          {
            fillColor: "#009CD9",
            strokeWidth: 1,
            strokeColor: "#0067A0",
            strokeOpacity: 1,
            fillOpacity: 0.2,
          }
        );
        myMap.geoObjects.add(myPolygon);
        dataCity !== "рф"
          ? myMap.geoObjects.add(new ymaps.Placemark(objCity.center, {}))
          : "";
        element.addEventListener("click", (e) => {
          myMap.setCenter(objCity.center, objCity.zoom);
        });
      });
    }

    // myMap.controls.remove("zoomControl"); // удаляем контрол зуммирования
    myMap.controls.remove("geolocationControl"); // удаляем геолокацию
    myMap.controls.remove("searchControl"); // удаляем поиск
    myMap.controls.remove("trafficControl"); // удаляем контроль трафика
    myMap.controls.remove("typeSelector"); // удаляем тип
    myMap.controls.remove("fullscreenControl"); // удаляем кнопку перехода в полноэкранный режим
    myMap.controls.remove("rulerControl"); // удаляем контрол правил
    myMap.behaviors.disable(["scrollZoom"]); // отключаем скролл карты (опционально)
  }

  if (document.getElementById("map-info-contact")) {
    var myMap = new ymaps.Map(
      "map-info-contact",
      {
        center: [55.570398, 37.47549],
        zoom: 11,
      },
      {
        searchControlProvider: "yandex#search",
      }
    );

    let address1 = new ymaps.Placemark(
      [55.492202, 37.325189], // Координаты метки
      {
        hintContent:
          "Основной офис, где можно выпить кофе/чай и пообщаться с вашим менеджером или инженером", // Подсказка при наведении
      },
      {
        iconLayout: "default#image", // Тип иконки
        iconImageHref:
          "https://sewera.manager3.fvds.ru//srv/assets/images/info-page/icons/sewera-marker.svg", // Путь к изображению иконки
        iconImageSize: [46, 46], // Размер иконки
        iconImageOffset: [-16, -32], // Смещение иконки
      }
    );
    let address2 = new ymaps.Placemark(
      [55.65015, 37.539626], // Координаты метки
      {
        hintContent: "Бэк-офис", // Подсказка при наведении
      },
      {
        iconLayout: "default#image", // Тип иконки
        iconImageHref:
          "https://sewera.manager3.fvds.ru//srv/assets/images/info-page/icons/sewera-marker.svg", // Путь к изображению иконки
        iconImageSize: [46, 46], // Размер иконки
        iconImageOffset: [-16, -32], // Смещение иконки
      }
    );
    myMap.geoObjects.add(address1);
    myMap.geoObjects.add(address2);
    // myMap.controls.remove("zoomControl"); // удаляем контрол зуммирования
    myMap.controls.remove("geolocationControl"); // удаляем геолокацию
    myMap.controls.remove("searchControl"); // удаляем поиск
    myMap.controls.remove("trafficControl"); // удаляем контроль трафика
    myMap.controls.remove("typeSelector"); // удаляем тип
    myMap.controls.remove("fullscreenControl"); // удаляем кнопку перехода в полноэкранный режим
    myMap.controls.remove("rulerControl"); // удаляем контрол правил
    myMap.behaviors.disable(["scrollZoom"]); // отключаем скролл карты (опционально)
  }
  if (document.getElementById("map-info-delivery")) {
    var myMap = new ymaps.Map(
      "map-info-delivery",
      {
        center: [55.570398, 37.47549],
        zoom: 11,
      },
      {
        searchControlProvider: "yandex#search",
      }
    );

    let address1 = new ymaps.Placemark(
      [55.492202, 37.325189], // Координаты метки
      {
        hintContent:
          "Основной офис, где можно выпить кофе/чай и пообщаться с вашим менеджером или инженером", // Подсказка при наведении
      },
      {
        iconLayout: "default#image", // Тип иконки
        iconImageHref:
          "https://sewera.manager3.fvds.ru//srv/assets/images/info-page/icons/sewera-marker.svg", // Путь к изображению иконки
        iconImageSize: [46, 46], // Размер иконки
        iconImageOffset: [-16, -32], // Смещение иконки
      }
    );
    let address2 = new ymaps.Placemark(
      [55.65015, 37.539626], // Координаты метки
      {
        hintContent: "Бэк-офис", // Подсказка при наведении
      },
      {
        iconLayout: "default#image", // Тип иконки
        iconImageHref:
          "https://sewera.manager3.fvds.ru//srv/assets/images/info-page/icons/sewera-marker.svg", // Путь к изображению иконки
        iconImageSize: [46, 46], // Размер иконки
        iconImageOffset: [-16, -32], // Смещение иконки
      }
    );
    myMap.geoObjects.add(address1);
    myMap.geoObjects.add(address2);
    // myMap.controls.remove("zoomControl"); // удаляем контрол зуммирования
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
