/******/ (() => {
  // webpackBootstrap
  /******/ "use strict";

  var __webpack_exports__ = {}; // CONCATENATED MODULE: ./src/js/files/functions.js

  // Вспомогательные модули плавного расскрытия и закрытия объекта ======================================================================================================================================================================
  let _slideUp = (target, duration = 500, showmore = 0) => {
    if (!target.classList.contains("_slide")) {
      target.classList.add("_slide");
      target.style.transitionProperty = "height, margin, padding";
      target.style.transitionDuration = duration + "ms";
      target.style.height = `${target.offsetHeight}px`;
      target.offsetHeight;
      target.style.overflow = "hidden";
      target.style.height = showmore ? `${showmore}px` : `0px`;
      target.style.paddingTop = 0;
      target.style.paddingBottom = 0;
      target.style.marginTop = 0;
      target.style.marginBottom = 0;
      window.setTimeout(() => {
        target.hidden = !showmore ? true : false;
        !showmore ? target.style.removeProperty("height") : null;
        target.style.removeProperty("padding-top");
        target.style.removeProperty("padding-bottom");
        target.style.removeProperty("margin-top");
        target.style.removeProperty("margin-bottom");
        !showmore ? target.style.removeProperty("overflow") : null;
        target.style.removeProperty("transition-duration");
        target.style.removeProperty("transition-property");
        target.classList.remove("_slide");
      }, duration);
    }
  };
  let _slideDown = (target, duration = 500, showmore = 0) => {
    if (!target.classList.contains("_slide")) {
      target.classList.add("_slide");
      target.hidden = target.hidden ? false : null;
      showmore ? target.style.removeProperty("height") : null;
      let height = target.offsetHeight;
      target.style.overflow = "hidden";
      target.style.height = showmore ? `${showmore}px` : `0px`;
      target.style.paddingTop = 0;
      target.style.paddingBottom = 0;
      target.style.marginTop = 0;
      target.style.marginBottom = 0;
      target.offsetHeight;
      target.style.transitionProperty = "height, margin, padding";
      target.style.transitionDuration = duration + "ms";
      target.style.height = height + "px";
      target.style.removeProperty("padding-top");
      target.style.removeProperty("padding-bottom");
      target.style.removeProperty("margin-top");
      target.style.removeProperty("margin-bottom");
      window.setTimeout(() => {
        target.style.removeProperty("height");
        target.style.removeProperty("overflow");
        target.style.removeProperty("transition-duration");
        target.style.removeProperty("transition-property");
        target.classList.remove("_slide");
      }, duration);
    }
  };
  let _slideToggle = (target, duration = 500) => {
    if (target.hidden) {
      return _slideDown(target, duration);
    } else {
      return _slideUp(target, duration);
    }
  };

  // Модуь работы с табами =======================================================================================================================================================================================================================
  /*
Для родителя табов пишем атрибут data-tabs
Для родителя заголовков табов пишем атрибут data-tabs-titles
Для родителя блоков табов пишем атрибут data-tabs-body

Если нужно чтобы табы открывались с анимацией
добавляем к data-tabs data-tabs-animate
По умолчанию, скорость анимации 500ms,
указать свою скорость можно так: data-tabs-animate="1000"

Если нужно чтобы табы превращались в "спойлеры" на неком размере экранов пишем параметры ширины.
Например: data-tabs="992" - табы будут превращаться в спойлеры на экранах меньше или равно 992px
*/

  function tabs() {
    const tabs = document.querySelectorAll("[data-tabs]");
    let tabsActiveHash = [""];

    if (tabs.length > 0) {
      const hash = "#tab-0-1";
      if (hash.startsWith("tab-")) {
        tabsActiveHash = "#tab-0-1";
      }

      setTimeout(() => {
        tabs.forEach((tabsBlock, index) => {
          tabsBlock.classList.add("_tab-init");
          tabsBlock.setAttribute("data-tabs-index", index);
          tabsBlock.addEventListener("click", setTabsAction);
          initTabs(tabsBlock);
        });
      }, 30);
    }

    // Работа с контентом
    function initTabs(tabsBlock) {
      const tabsTitles = tabsBlock.querySelectorAll("[data-tabs-titles]>*");
      const tabsContent = tabsBlock.querySelectorAll("[data-tabs-body]>*");
      const tabsBlockIndex = tabsBlock.dataset.tabsIndex;

      const tabsActiveHashBlock = tabsActiveHash[0] == tabsBlockIndex;

      if (tabsActiveHashBlock) {
        const tabsActiveTitle = tabsBlock.querySelector(
          "[data-tabs-titles]>._tab-active"
        );
        tabsActiveTitle.classList.remove("_tab-active");
      }
      if (tabsContent.length > 0) {
        tabsContent.forEach((tabsContentItem, index) => {
          tabsTitles[index].setAttribute("data-tabs-title", "");
          tabsContentItem.setAttribute("data-tabs-item", "");

          if (tabsActiveHashBlock && index == tabsActiveHash[1]) {
            tabsTitles[index].classList.add("_tab-active");
          }
          tabsContentItem.hidden =
            !tabsTitles[index].classList.contains("_tab-active");
        });
      }
    }
    function setTabsStatus(tabsBlock) {
      const tabsTitles = tabsBlock.querySelectorAll("[data-tabs-title]");
      const tabsContent = tabsBlock.querySelectorAll("[data-tabs-item]");
      const tabsBlockIndex = tabsBlock.dataset.tabsIndex;

      function isTabsAnamate(tabsBlock) {
        if (tabsBlock.hasAttribute("data-tabs-animate")) {
          return tabsBlock.dataset.tabsAnimate > 0
            ? tabsBlock.dataset.tabsAnimate
            : 500;
        }
      }
      const tabsBlockAnimate = isTabsAnamate(tabsBlock);

      if (tabsContent.length > 0) {
        tabsContent.forEach((tabsContentItem, index) => {
          if (tabsTitles[index].classList.contains("_tab-active")) {
            if (tabsBlockAnimate) {
              _slideDown(tabsContentItem, tabsBlockAnimate);
            } else {
              tabsContentItem.hidden = false;
            }
            if (!tabsContentItem.closest(".popup")) {
              location.hash = `tab-${tabsBlockIndex}-${index}`;
            }
          } else {
            if (tabsBlockAnimate) {
              _slideUp(tabsContentItem, tabsBlockAnimate);
            } else {
              tabsContentItem.hidden = true;
            }
          }
        });
      }
    }
    function setTabsAction(e) {
      const el = e.target;

      if (el.closest(".block__more")) {
        return;
      }
      if (el.closest("[data-tabs-title]")) {
        setTimeout(() => {
          showMore();
        }, 10);

        const tabTitle = el.closest("[data-tabs-title]");
        const tabsBlock = tabTitle.closest("[data-tabs]");
        if (
          !tabTitle.classList.contains("_tab-active") &&
          !tabsBlock.querySelectorAll("._slide").length
        ) {
          const tabActiveTitle = tabsBlock.querySelector(
            "[data-tabs-title]._tab-active"
          );
          if (tabActiveTitle) {
            tabActiveTitle.classList.remove("_tab-active");
          }

          tabTitle.classList.add("_tab-active");

          setTabsStatus(tabsBlock);
        }
        e.preventDefault();
      }
    }
  }
  // Модуль "показать еще" =======================================================================================================================================================================================================================
  /*
Документация по работе в шаблоне:
data-showmore-media = "768,min"
data-showmore="size/items"
data-showmore-content="размер/кол-во"
data-showmore-button="скорость"
Сниппет (HTML): showmore
*/
  // Обработа медиа запросов из атрибутов
  function dataMediaQueries(array, dataSetValue) {
    // Получение объектов с медиа запросами
    const media = Array.from(array).filter(function (item, index, self) {
      if (item.dataset[dataSetValue]) {
        return item.dataset[dataSetValue].split(",")[0];
      }
    });
    // Инициализация объектов с медиа запросами
    if (media.length) {
      const breakpointsArray = [];
      media.forEach((item) => {
        const params = item.dataset[dataSetValue];
        const breakpoint = {};
        const paramsArray = params.split(",");
        breakpoint.value = paramsArray[0];
        breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
        breakpoint.item = item;
        breakpointsArray.push(breakpoint);
      });
      // Получаем уникальные брейкпоинты
      let mdQueries = breakpointsArray.map(function (item) {
        return (
          "(" +
          item.type +
          "-width: " +
          item.value +
          "px)," +
          item.value +
          "," +
          item.type
        );
      });

      mdQueries = uniqArray(mdQueries);
      const mdQueriesArray = [];

      if (mdQueries.length) {
        // Работаем с каждым брейкпоинтом
        mdQueries.forEach((breakpoint) => {
          const paramsArray = breakpoint.split(",");
          const mediaBreakpoint = paramsArray[1];
          const mediaType = paramsArray[2];
          const matchMedia = window.matchMedia(paramsArray[0]);
          // Объекты с нужными условиями
          const itemsArray = breakpointsArray.filter(function (item) {
            if (item.value === mediaBreakpoint && item.type === mediaType) {
              return true;
            }
          });
          mdQueriesArray.push({
            itemsArray,
            matchMedia,
          });
        });
        return mdQueriesArray;
      }
    }
  }
  // Уникализация массива
  function uniqArray(array) {
    return array.filter(function (item, index, self) {
      return self.indexOf(item) === index;
    });
  }
  const isShowOneCard = (hiddenHeight, selector) => {
    const blocksSM = document.querySelectorAll(selector);

    if (blocksSM.length !== 0) {
      blocksSM.forEach((block) => {
        if (block.parentElement.classList.contains("_showmore-active")) {
          _slideUp(block, 0, hiddenHeight);
          block.parentElement.classList.remove("_showmore-active");
        }
      });
    }
  };
  function showMore() {
    const showMoreBlocks = document.querySelectorAll("[data-showmore]");
    let showMoreBlocksRegular;
    let mdQueriesArray;
    // ==============

    // ==============

    if (showMoreBlocks.length) {
      // Получение обычных объектов
      showMoreBlocksRegular = Array.from(showMoreBlocks).filter(
        function (item, index, self) {
          return !item.dataset.showmoreMedia;
        }
      );

      // Инициализация обычных объектов
      showMoreBlocksRegular.length ? initItems(showMoreBlocksRegular) : null;

      document.querySelectorAll("[data-showmore-button]").forEach((element) => {
        element.addEventListener("click", showMoreActions, true);
      });
      // window.addEventListener('resize', showMoreActions);
      // Получение объектов с медиа запросами
      // добавил новое
      mdQueriesArray = dataMediaQueries(showMoreBlocks, "showmoreMedia");

      if (mdQueriesArray && mdQueriesArray.length) {
        mdQueriesArray.forEach((mdQueriesItem) => {
          // Событие
          mdQueriesItem.matchMedia.addEventListener("change", function () {
            initItems(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
          });
        });
        initItemsMedia(mdQueriesArray);
      }
    }
    function initItemsMedia(mdQueriesArray) {
      mdQueriesArray.forEach((mdQueriesItem) => {
        initItems(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
      });
    }
    function initItems(showMoreBlocks, matchMedia) {
      showMoreBlocks.forEach((showMoreBlock) => {
        initItem(showMoreBlock, matchMedia);
      });
    }
    function initItem(showMoreBlock, matchMedia = false) {
      showMoreBlock = matchMedia ? showMoreBlock.item : showMoreBlock;
      const showMoreContent = showMoreBlock.querySelector(
        "[data-showmore-content]"
      );
      const showMoreButton = showMoreBlock.querySelector(
        "[data-showmore-button]"
      );
      const hiddenHeight = getHeight(showMoreBlock, showMoreContent);

      if (matchMedia.matches || !matchMedia) {
        if (hiddenHeight < getOriginalHeight(showMoreContent)) {
          _slideUp(showMoreContent, 0, hiddenHeight);
          showMoreButton.hidden = false;
        } else {
          _slideDown(showMoreContent, 0, hiddenHeight);
          showMoreButton.hidden = true;
        }
      } else {
        _slideDown(showMoreContent, 0, hiddenHeight);
        showMoreButton.hidden = true;
      }
    }
    function getHeight(showMoreBlock, showMoreContent) {
      let hiddenHeight = 0;
      const showMoreType = showMoreBlock.dataset.showmore
        ? showMoreBlock.dataset.showmore
        : "size";
      if (showMoreType === "items") {
        const showMoreTypeValue = showMoreContent.dataset.showmoreContent
          ? showMoreContent.dataset.showmoreContent
          : 3;
        const showMoreItems = showMoreContent.children;
        for (let index = 1; index < showMoreItems.length; index++) {
          const showMoreItem = showMoreItems[index - 1];
          hiddenHeight += showMoreItem.offsetHeight;
          if (index === showMoreTypeValue) break;
        }
      } else {
        const showMoreTypeValue = showMoreContent.dataset.showmoreContent
          ? showMoreContent.dataset.showmoreContent
          : 150;
        hiddenHeight = showMoreTypeValue;
      }
      return hiddenHeight;
    }

    function getOriginalHeight(showMoreContent) {
      let hiddenHeight = showMoreContent.offsetHeight;
      showMoreContent.style.removeProperty("height");
      let originalHeight = showMoreContent.offsetHeight;
      showMoreContent.style.height = `${hiddenHeight}px`;

      return originalHeight;
    }
    function showMoreActions(e) {
      const targetEvent = e.target;
      const targetType = e.type;
      if (targetType === "click") {
        if (targetEvent.closest("[data-showmore-button]")) {
          const showMoreButton = targetEvent.closest("[data-showmore-button]");
          const showMoreBlock = showMoreButton.closest("[data-showmore]");
          const showMoreContent = showMoreBlock.querySelector(
            "[data-showmore-content]"
          );
          getOriginalHeight(showMoreContent);
          const showMoreSpeed =
            showMoreBlock.dataset.showmoreButton ||
            showMoreButton.dataset.showmoreButton
              ? showMoreBlock.dataset.showmoreButton ||
                showMoreButton.dataset.showmoreButton
              : "500";

          const hiddenHeight = getHeight(showMoreBlock, showMoreContent);

          if (!showMoreContent.classList.contains("_slide")) {
            // ==========
            if (!e.target.closest("._showmore-active")) {
              isShowOneCard(hiddenHeight, ".brand-carusel__content");
            }

            // =============
            showMoreBlock.classList.contains("_showmore-active")
              ? _slideUp(showMoreContent, showMoreSpeed, hiddenHeight)
              : _slideDown(showMoreContent, showMoreSpeed, hiddenHeight);
            showMoreBlock.classList.toggle("_showmore-active");
          }
        }
      } else if (targetType === "resize") {
        showMoreBlocksRegular.length ? initItems(showMoreBlocksRegular) : null;
        mdQueriesArray.length ? initItemsMedia(mdQueriesArray) : null;
      }
      if (document.querySelector(".ya-map__tab") && targetType === "click") {
        if (!e.target.matches(".ya-map__tab")) {
          e.stopImmediatePropagation();
        }
      }
    }
  }
  // CONCATENATED MODULE: ./node_modules/nouislider/dist/nouislider.mjs
  var PipsMode;
  (function (PipsMode) {
    PipsMode["Range"] = "range";
    PipsMode["Steps"] = "steps";
    PipsMode["Positions"] = "positions";
    PipsMode["Count"] = "count";
    PipsMode["Values"] = "values";
  })(PipsMode || (PipsMode = {}));
  var PipsType;
  (function (PipsType) {
    PipsType[(PipsType["None"] = -1)] = "None";
    PipsType[(PipsType["NoValue"] = 0)] = "NoValue";
    PipsType[(PipsType["LargeValue"] = 1)] = "LargeValue";
    PipsType[(PipsType["SmallValue"] = 2)] = "SmallValue";
  })(PipsType || (PipsType = {}));
  //region Helper Methods
  function isValidFormatter(entry) {
    return isValidPartialFormatter(entry) && typeof entry.from === "function";
  }
  function isValidPartialFormatter(entry) {
    // partial formatters only need a to function and not a from function
    return typeof entry === "object" && typeof entry.to === "function";
  }
  function removeElement(el) {
    el.parentElement.removeChild(el);
  }
  function isSet(value) {
    return value !== null && value !== undefined;
  }
  // Bindable version
  function preventDefault(e) {
    e.preventDefault();
  }
  // Removes duplicates from an array.
  function unique(array) {
    return array.filter(function (a) {
      return !this[a] ? (this[a] = true) : false;
    }, {});
  }
  // Round a value to the closest 'to'.
  function closest(value, to) {
    return Math.round(value / to) * to;
  }
  // Current position of an element relative to the document.
  function offset(elem, orientation) {
    var rect = elem.getBoundingClientRect();
    var doc = elem.ownerDocument;
    var docElem = doc.documentElement;
    var pageOffset = getPageOffset(doc);
    // getBoundingClientRect contains left scroll in Chrome on Android.
    // I haven't found a feature detection that proves this. Worst case
    // scenario on mis-match: the 'tap' feature on horizontal sliders breaks.
    if (/webkit.*Chrome.*Mobile/i.test(navigator.userAgent)) {
      pageOffset.x = 0;
    }
    return orientation
      ? rect.top + pageOffset.y - docElem.clientTop
      : rect.left + pageOffset.x - docElem.clientLeft;
  }
  // Checks whether a value is numerical.
  function isNumeric(a) {
    return typeof a === "number" && !isNaN(a) && isFinite(a);
  }
  // Sets a class and removes it after [duration] ms.
  function addClassFor(element, className, duration) {
    if (duration > 0) {
      addClass(element, className);
      setTimeout(function () {
        removeClass(element, className);
      }, duration);
    }
  }
  // Limits a value to 0 - 100
  function limit(a) {
    return Math.max(Math.min(a, 100), 0);
  }
  // Wraps a variable as an array, if it isn't one yet.
  // Note that an input array is returned by reference!
  function asArray(a) {
    return Array.isArray(a) ? a : [a];
  }
  // Counts decimals
  function countDecimals(numStr) {
    numStr = String(numStr);
    var pieces = numStr.split(".");
    return pieces.length > 1 ? pieces[1].length : 0;
  }
  // http://youmightnotneedjquery.com/#add_class
  function addClass(el, className) {
    if (el.classList && !/\s/.test(className)) {
      el.classList.add(className);
    } else {
      el.className += " " + className;
    }
  }
  // http://youmightnotneedjquery.com/#remove_class
  function removeClass(el, className) {
    if (el.classList && !/\s/.test(className)) {
      el.classList.remove(className);
    } else {
      el.className = el.className.replace(
        new RegExp(
          "(^|\\b)" + className.split(" ").join("|") + "(\\b|$)",
          "gi"
        ),
        " "
      );
    }
  }
  // https://plainjs.com/javascript/attributes/adding-removing-and-testing-for-classes-9/
  function hasClass(el, className) {
    return el.classList
      ? el.classList.contains(className)
      : new RegExp("\\b" + className + "\\b").test(el.className);
  }
  // https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollY#Notes
  function getPageOffset(doc) {
    var supportPageOffset = window.pageXOffset !== undefined;
    var isCSS1Compat = (doc.compatMode || "") === "CSS1Compat";
    var x = supportPageOffset
      ? window.pageXOffset
      : isCSS1Compat
        ? doc.documentElement.scrollLeft
        : doc.body.scrollLeft;
    var y = supportPageOffset
      ? window.pageYOffset
      : isCSS1Compat
        ? doc.documentElement.scrollTop
        : doc.body.scrollTop;
    return {
      x: x,
      y: y,
    };
  }
  // we provide a function to compute constants instead
  // of accessing window.* as soon as the module needs it
  // so that we do not compute anything if not needed
  function getActions() {
    // Determine the events to bind. IE11 implements pointerEvents without
    // a prefix, which breaks compatibility with the IE10 implementation.
    return window.navigator.pointerEnabled
      ? {
          start: "pointerdown",
          move: "pointermove",
          end: "pointerup",
        }
      : window.navigator.msPointerEnabled
        ? {
            start: "MSPointerDown",
            move: "MSPointerMove",
            end: "MSPointerUp",
          }
        : {
            start: "mousedown touchstart",
            move: "mousemove touchmove",
            end: "mouseup touchend",
          };
  }
  // https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md
  // Issue #785
  function getSupportsPassive() {
    var supportsPassive = false;
    /* eslint-disable */
    try {
      var opts = Object.defineProperty({}, "passive", {
        get: function () {
          supportsPassive = true;
        },
      });
      // @ts-ignore
      window.addEventListener("test", null, opts);
    } catch (e) {}
    /* eslint-enable */
    return supportsPassive;
  }
  function getSupportsTouchActionNone() {
    return window.CSS && CSS.supports && CSS.supports("touch-action", "none");
  }
  //endregion
  //region Range Calculation
  // Determine the size of a sub-range in relation to a full range.
  function subRangeRatio(pa, pb) {
    return 100 / (pb - pa);
  }
  // (percentage) How many percent is this value of this range?
  function fromPercentage(range, value, startRange) {
    return (value * 100) / (range[startRange + 1] - range[startRange]);
  }
  // (percentage) Where is this value on this range?
  function toPercentage(range, value) {
    return fromPercentage(
      range,
      range[0] < 0 ? value + Math.abs(range[0]) : value - range[0],
      0
    );
  }
  // (value) How much is this percentage on this range?
  function isPercentage(range, value) {
    return (value * (range[1] - range[0])) / 100 + range[0];
  }
  function getJ(value, arr) {
    var j = 1;
    while (value >= arr[j]) {
      j += 1;
    }
    return j;
  }
  // (percentage) Input a value, find where, on a scale of 0-100, it applies.
  function toStepping(xVal, xPct, value) {
    if (value >= xVal.slice(-1)[0]) {
      return 100;
    }
    var j = getJ(value, xVal);
    var va = xVal[j - 1];
    var vb = xVal[j];
    var pa = xPct[j - 1];
    var pb = xPct[j];
    return pa + toPercentage([va, vb], value) / subRangeRatio(pa, pb);
  }
  // (value) Input a percentage, find where it is on the specified range.
  function fromStepping(xVal, xPct, value) {
    // There is no range group that fits 100
    if (value >= 100) {
      return xVal.slice(-1)[0];
    }
    var j = getJ(value, xPct);
    var va = xVal[j - 1];
    var vb = xVal[j];
    var pa = xPct[j - 1];
    var pb = xPct[j];
    return isPercentage([va, vb], (value - pa) * subRangeRatio(pa, pb));
  }
  // (percentage) Get the step that applies at a certain value.
  function getStep(xPct, xSteps, snap, value) {
    if (value === 100) {
      return value;
    }
    var j = getJ(value, xPct);
    var a = xPct[j - 1];
    var b = xPct[j];
    // If 'snap' is set, steps are used as fixed points on the slider.
    if (snap) {
      // Find the closest position, a or b.
      if (value - a > (b - a) / 2) {
        return b;
      }
      return a;
    }
    if (!xSteps[j - 1]) {
      return value;
    }
    return xPct[j - 1] + closest(value - xPct[j - 1], xSteps[j - 1]);
  }
  //endregion
  //region Spectrum
  var Spectrum = /** @class */ (function () {
    function Spectrum(entry, snap, singleStep) {
      this.xPct = [];
      this.xVal = [];
      this.xSteps = [];
      this.xNumSteps = [];
      this.xHighestCompleteStep = [];
      this.xSteps = [singleStep || false];
      this.xNumSteps = [false];
      this.snap = snap;
      var index;
      var ordered = [];
      // Map the object keys to an array.
      Object.keys(entry).forEach(function (index) {
        ordered.push([asArray(entry[index]), index]);
      });
      // Sort all entries by value (numeric sort).
      ordered.sort(function (a, b) {
        return a[0][0] - b[0][0];
      });
      // Convert all entries to subranges.
      for (index = 0; index < ordered.length; index++) {
        this.handleEntryPoint(ordered[index][1], ordered[index][0]);
      }
      // Store the actual step values.
      // xSteps is sorted in the same order as xPct and xVal.
      this.xNumSteps = this.xSteps.slice(0);
      // Convert all numeric steps to the percentage of the subrange they represent.
      for (index = 0; index < this.xNumSteps.length; index++) {
        this.handleStepPoint(index, this.xNumSteps[index]);
      }
    }
    Spectrum.prototype.getDistance = function (value) {
      var distances = [];
      for (var index = 0; index < this.xNumSteps.length - 1; index++) {
        distances[index] = fromPercentage(this.xVal, value, index);
      }
      return distances;
    };
    // Calculate the percentual distance over the whole scale of ranges.
    // direction: 0 = backwards / 1 = forwards
    Spectrum.prototype.getAbsoluteDistance = function (
      value,
      distances,
      direction
    ) {
      var xPct_index = 0;
      // Calculate range where to start calculation
      if (value < this.xPct[this.xPct.length - 1]) {
        while (value > this.xPct[xPct_index + 1]) {
          xPct_index++;
        }
      } else if (value === this.xPct[this.xPct.length - 1]) {
        xPct_index = this.xPct.length - 2;
      }
      // If looking backwards and the value is exactly at a range separator then look one range further
      if (!direction && value === this.xPct[xPct_index + 1]) {
        xPct_index++;
      }
      if (distances === null) {
        distances = [];
      }
      var start_factor;
      var rest_factor = 1;
      var rest_rel_distance = distances[xPct_index];
      var range_pct = 0;
      var rel_range_distance = 0;
      var abs_distance_counter = 0;
      var range_counter = 0;
      // Calculate what part of the start range the value is
      if (direction) {
        start_factor =
          (value - this.xPct[xPct_index]) /
          (this.xPct[xPct_index + 1] - this.xPct[xPct_index]);
      } else {
        start_factor =
          (this.xPct[xPct_index + 1] - value) /
          (this.xPct[xPct_index + 1] - this.xPct[xPct_index]);
      }
      // Do until the complete distance across ranges is calculated
      while (rest_rel_distance > 0) {
        // Calculate the percentage of total range
        range_pct =
          this.xPct[xPct_index + 1 + range_counter] -
          this.xPct[xPct_index + range_counter];
        // Detect if the margin, padding or limit is larger then the current range and calculate
        if (
          distances[xPct_index + range_counter] * rest_factor +
            100 -
            start_factor * 100 >
          100
        ) {
          // If larger then take the percentual distance of the whole range
          rel_range_distance = range_pct * start_factor;
          // Rest factor of relative percentual distance still to be calculated
          rest_factor =
            (rest_rel_distance - 100 * start_factor) /
            distances[xPct_index + range_counter];
          // Set start factor to 1 as for next range it does not apply.
          start_factor = 1;
        } else {
          // If smaller or equal then take the percentual distance of the calculate percentual part of that range
          rel_range_distance =
            ((distances[xPct_index + range_counter] * range_pct) / 100) *
            rest_factor;
          // No rest left as the rest fits in current range
          rest_factor = 0;
        }
        if (direction) {
          abs_distance_counter = abs_distance_counter - rel_range_distance;
          // Limit range to first range when distance becomes outside of minimum range
          if (this.xPct.length + range_counter >= 1) {
            range_counter--;
          }
        } else {
          abs_distance_counter = abs_distance_counter + rel_range_distance;
          // Limit range to last range when distance becomes outside of maximum range
          if (this.xPct.length - range_counter >= 1) {
            range_counter++;
          }
        }
        // Rest of relative percentual distance still to be calculated
        rest_rel_distance = distances[xPct_index + range_counter] * rest_factor;
      }
      return value + abs_distance_counter;
    };
    Spectrum.prototype.toStepping = function (value) {
      value = toStepping(this.xVal, this.xPct, value);
      return value;
    };
    Spectrum.prototype.fromStepping = function (value) {
      return fromStepping(this.xVal, this.xPct, value);
    };
    Spectrum.prototype.getStep = function (value) {
      value = getStep(this.xPct, this.xSteps, this.snap, value);
      return value;
    };
    Spectrum.prototype.getDefaultStep = function (value, isDown, size) {
      var j = getJ(value, this.xPct);
      // When at the top or stepping down, look at the previous sub-range
      if (value === 100 || (isDown && value === this.xPct[j - 1])) {
        j = Math.max(j - 1, 1);
      }
      return (this.xVal[j] - this.xVal[j - 1]) / size;
    };
    Spectrum.prototype.getNearbySteps = function (value) {
      var j = getJ(value, this.xPct);
      return {
        stepBefore: {
          startValue: this.xVal[j - 2],
          step: this.xNumSteps[j - 2],
          highestStep: this.xHighestCompleteStep[j - 2],
        },
        thisStep: {
          startValue: this.xVal[j - 1],
          step: this.xNumSteps[j - 1],
          highestStep: this.xHighestCompleteStep[j - 1],
        },
        stepAfter: {
          startValue: this.xVal[j],
          step: this.xNumSteps[j],
          highestStep: this.xHighestCompleteStep[j],
        },
      };
    };
    Spectrum.prototype.countStepDecimals = function () {
      var stepDecimals = this.xNumSteps.map(countDecimals);
      return Math.max.apply(null, stepDecimals);
    };
    Spectrum.prototype.hasNoSize = function () {
      return this.xVal[0] === this.xVal[this.xVal.length - 1];
    };
    // Outside testing
    Spectrum.prototype.convert = function (value) {
      return this.getStep(this.toStepping(value));
    };
    Spectrum.prototype.handleEntryPoint = function (index, value) {
      var percentage;
      // Covert min/max syntax to 0 and 100.
      if (index === "min") {
        percentage = 0;
      } else if (index === "max") {
        percentage = 100;
      } else {
        percentage = parseFloat(index);
      }
      // Check for correct input.
      if (!isNumeric(percentage) || !isNumeric(value[0])) {
        throw new Error("noUiSlider: 'range' value isn't numeric.");
      }
      // Store values.
      this.xPct.push(percentage);
      this.xVal.push(value[0]);
      var value1 = Number(value[1]);
      // NaN will evaluate to false too, but to keep
      // logging clear, set step explicitly. Make sure
      // not to override the 'step' setting with false.
      if (!percentage) {
        if (!isNaN(value1)) {
          this.xSteps[0] = value1;
        }
      } else {
        this.xSteps.push(isNaN(value1) ? false : value1);
      }
      this.xHighestCompleteStep.push(0);
    };
    Spectrum.prototype.handleStepPoint = function (i, n) {
      // Ignore 'false' stepping.
      if (!n) {
        return;
      }
      // Step over zero-length ranges (#948);
      if (this.xVal[i] === this.xVal[i + 1]) {
        this.xSteps[i] = this.xHighestCompleteStep[i] = this.xVal[i];
        return;
      }
      // Factor to range ratio
      this.xSteps[i] =
        fromPercentage([this.xVal[i], this.xVal[i + 1]], n, 0) /
        subRangeRatio(this.xPct[i], this.xPct[i + 1]);
      var totalSteps = (this.xVal[i + 1] - this.xVal[i]) / this.xNumSteps[i];
      var highestStep = Math.ceil(Number(totalSteps.toFixed(3)) - 1);
      var step = this.xVal[i] + this.xNumSteps[i] * highestStep;
      this.xHighestCompleteStep[i] = step;
    };
    return Spectrum;
  })();
  //endregion
  //region Options
  /*	Every input option is tested and parsed. This will prevent
    endless validation in internal methods. These tests are
    structured with an item for every option available. An
    option can be marked as required by setting the 'r' flag.
    The testing function is provided with three arguments:
        - The provided value for the option;
        - A reference to the options object;
        - The name for the option;

    The testing function returns false when an error is detected,
    or true when everything is OK. It can also modify the option
    object, to make sure all values can be correctly looped elsewhere. */
  //region Defaults
  var defaultFormatter = {
    to: function (value) {
      return value === undefined ? "" : value.toFixed(2);
    },
    from: Number,
  };
  var cssClasses = {
    target: "target",
    base: "base",
    origin: "origin",
    handle: "handle",
    handleLower: "handle-lower",
    handleUpper: "handle-upper",
    touchArea: "touch-area",
    horizontal: "horizontal",
    vertical: "vertical",
    background: "background",
    connect: "connect",
    connects: "connects",
    ltr: "ltr",
    rtl: "rtl",
    textDirectionLtr: "txt-dir-ltr",
    textDirectionRtl: "txt-dir-rtl",
    draggable: "draggable",
    drag: "state-drag",
    tap: "state-tap",
    active: "active",
    tooltip: "tooltip",
    pips: "pips",
    pipsHorizontal: "pips-horizontal",
    pipsVertical: "pips-vertical",
    marker: "marker",
    markerHorizontal: "marker-horizontal",
    markerVertical: "marker-vertical",
    markerNormal: "marker-normal",
    markerLarge: "marker-large",
    markerSub: "marker-sub",
    value: "value",
    valueHorizontal: "value-horizontal",
    valueVertical: "value-vertical",
    valueNormal: "value-normal",
    valueLarge: "value-large",
    valueSub: "value-sub",
  };
  // Namespaces of internal event listeners
  var INTERNAL_EVENT_NS = {
    tooltips: ".__tooltips",
    aria: ".__aria",
  };
  //endregion
  function testStep(parsed, entry) {
    if (!isNumeric(entry)) {
      throw new Error("noUiSlider: 'step' is not numeric.");
    }
    // The step option can still be used to set stepping
    // for linear sliders. Overwritten if set in 'range'.
    parsed.singleStep = entry;
  }
  function testKeyboardPageMultiplier(parsed, entry) {
    if (!isNumeric(entry)) {
      throw new Error("noUiSlider: 'keyboardPageMultiplier' is not numeric.");
    }
    parsed.keyboardPageMultiplier = entry;
  }
  function testKeyboardMultiplier(parsed, entry) {
    if (!isNumeric(entry)) {
      throw new Error("noUiSlider: 'keyboardMultiplier' is not numeric.");
    }
    parsed.keyboardMultiplier = entry;
  }
  function testKeyboardDefaultStep(parsed, entry) {
    if (!isNumeric(entry)) {
      throw new Error("noUiSlider: 'keyboardDefaultStep' is not numeric.");
    }
    parsed.keyboardDefaultStep = entry;
  }
  function testRange(parsed, entry) {
    // Filter incorrect input.
    if (typeof entry !== "object" || Array.isArray(entry)) {
      throw new Error("noUiSlider: 'range' is not an object.");
    }
    // Catch missing start or end.
    if (entry.min === undefined || entry.max === undefined) {
      throw new Error("noUiSlider: Missing 'min' or 'max' in 'range'.");
    }
    parsed.spectrum = new Spectrum(
      entry,
      parsed.snap || false,
      parsed.singleStep
    );
  }
  function testStart(parsed, entry) {
    entry = asArray(entry);
    // Validate input. Values aren't tested, as the public .val method
    // will always provide a valid location.
    if (!Array.isArray(entry) || !entry.length) {
      throw new Error("noUiSlider: 'start' option is incorrect.");
    }
    // Store the number of handles.
    parsed.handles = entry.length;
    // When the slider is initialized, the .val method will
    // be called with the start options.
    parsed.start = entry;
  }
  function testSnap(parsed, entry) {
    if (typeof entry !== "boolean") {
      throw new Error("noUiSlider: 'snap' option must be a boolean.");
    }
    // Enforce 100% stepping within subranges.
    parsed.snap = entry;
  }
  function testAnimate(parsed, entry) {
    if (typeof entry !== "boolean") {
      throw new Error("noUiSlider: 'animate' option must be a boolean.");
    }
    // Enforce 100% stepping within subranges.
    parsed.animate = entry;
  }
  function testAnimationDuration(parsed, entry) {
    if (typeof entry !== "number") {
      throw new Error(
        "noUiSlider: 'animationDuration' option must be a number."
      );
    }
    parsed.animationDuration = entry;
  }
  function testConnect(parsed, entry) {
    var connect = [false];
    var i;
    // Map legacy options
    if (entry === "lower") {
      entry = [true, false];
    } else if (entry === "upper") {
      entry = [false, true];
    }
    // Handle boolean options
    if (entry === true || entry === false) {
      for (i = 1; i < parsed.handles; i++) {
        connect.push(entry);
      }
      connect.push(false);
    }
    // Reject invalid input
    else if (
      !Array.isArray(entry) ||
      !entry.length ||
      entry.length !== parsed.handles + 1
    ) {
      throw new Error(
        "noUiSlider: 'connect' option doesn't match handle count."
      );
    } else {
      connect = entry;
    }
    parsed.connect = connect;
  }
  function testOrientation(parsed, entry) {
    // Set orientation to an a numerical value for easy
    // array selection.
    switch (entry) {
      case "horizontal":
        parsed.ort = 0;
        break;
      case "vertical":
        parsed.ort = 1;
        break;
      default:
        throw new Error("noUiSlider: 'orientation' option is invalid.");
    }
  }
  function testMargin(parsed, entry) {
    if (!isNumeric(entry)) {
      throw new Error("noUiSlider: 'margin' option must be numeric.");
    }
    // Issue #582
    if (entry === 0) {
      return;
    }
    parsed.margin = parsed.spectrum.getDistance(entry);
  }
  function testLimit(parsed, entry) {
    if (!isNumeric(entry)) {
      throw new Error("noUiSlider: 'limit' option must be numeric.");
    }
    parsed.limit = parsed.spectrum.getDistance(entry);
    if (!parsed.limit || parsed.handles < 2) {
      throw new Error(
        "noUiSlider: 'limit' option is only supported on linear sliders with 2 or more handles."
      );
    }
  }
  function testPadding(parsed, entry) {
    var index;
    if (!isNumeric(entry) && !Array.isArray(entry)) {
      throw new Error(
        "noUiSlider: 'padding' option must be numeric or array of exactly 2 numbers."
      );
    }
    if (
      Array.isArray(entry) &&
      !(entry.length === 2 || isNumeric(entry[0]) || isNumeric(entry[1]))
    ) {
      throw new Error(
        "noUiSlider: 'padding' option must be numeric or array of exactly 2 numbers."
      );
    }
    if (entry === 0) {
      return;
    }
    if (!Array.isArray(entry)) {
      entry = [entry, entry];
    }
    // 'getDistance' returns false for invalid values.
    parsed.padding = [
      parsed.spectrum.getDistance(entry[0]),
      parsed.spectrum.getDistance(entry[1]),
    ];
    for (index = 0; index < parsed.spectrum.xNumSteps.length - 1; index++) {
      // last "range" can't contain step size as it is purely an endpoint.
      if (parsed.padding[0][index] < 0 || parsed.padding[1][index] < 0) {
        throw new Error(
          "noUiSlider: 'padding' option must be a positive number(s)."
        );
      }
    }
    var totalPadding = entry[0] + entry[1];
    var firstValue = parsed.spectrum.xVal[0];
    var lastValue = parsed.spectrum.xVal[parsed.spectrum.xVal.length - 1];
    if (totalPadding / (lastValue - firstValue) > 1) {
      throw new Error(
        "noUiSlider: 'padding' option must not exceed 100% of the range."
      );
    }
  }
  function testDirection(parsed, entry) {
    // Set direction as a numerical value for easy parsing.
    // Invert connection for RTL sliders, so that the proper
    // handles get the connect/background classes.
    switch (entry) {
      case "ltr":
        parsed.dir = 0;
        break;
      case "rtl":
        parsed.dir = 1;
        break;
      default:
        throw new Error("noUiSlider: 'direction' option was not recognized.");
    }
  }
  function testBehaviour(parsed, entry) {
    // Make sure the input is a string.
    if (typeof entry !== "string") {
      throw new Error(
        "noUiSlider: 'behaviour' must be a string containing options."
      );
    }
    // Check if the string contains any keywords.
    // None are required.
    var tap = entry.indexOf("tap") >= 0;
    var drag = entry.indexOf("drag") >= 0;
    var fixed = entry.indexOf("fixed") >= 0;
    var snap = entry.indexOf("snap") >= 0;
    var hover = entry.indexOf("hover") >= 0;
    var unconstrained = entry.indexOf("unconstrained") >= 0;
    var dragAll = entry.indexOf("drag-all") >= 0;
    var smoothSteps = entry.indexOf("smooth-steps") >= 0;
    if (fixed) {
      if (parsed.handles !== 2) {
        throw new Error(
          "noUiSlider: 'fixed' behaviour must be used with 2 handles"
        );
      }
      // Use margin to enforce fixed state
      testMargin(parsed, parsed.start[1] - parsed.start[0]);
    }
    if (unconstrained && (parsed.margin || parsed.limit)) {
      throw new Error(
        "noUiSlider: 'unconstrained' behaviour cannot be used with margin or limit"
      );
    }
    parsed.events = {
      tap: tap || snap,
      drag: drag,
      dragAll: dragAll,
      smoothSteps: smoothSteps,
      fixed: fixed,
      snap: snap,
      hover: hover,
      unconstrained: unconstrained,
    };
  }
  function testTooltips(parsed, entry) {
    if (entry === false) {
      return;
    }
    if (entry === true || isValidPartialFormatter(entry)) {
      parsed.tooltips = [];
      for (var i = 0; i < parsed.handles; i++) {
        parsed.tooltips.push(entry);
      }
    } else {
      entry = asArray(entry);
      if (entry.length !== parsed.handles) {
        throw new Error("noUiSlider: must pass a formatter for all handles.");
      }
      entry.forEach(function (formatter) {
        if (
          typeof formatter !== "boolean" &&
          !isValidPartialFormatter(formatter)
        ) {
          throw new Error(
            "noUiSlider: 'tooltips' must be passed a formatter or 'false'."
          );
        }
      });
      parsed.tooltips = entry;
    }
  }
  function testHandleAttributes(parsed, entry) {
    if (entry.length !== parsed.handles) {
      throw new Error("noUiSlider: must pass a attributes for all handles.");
    }
    parsed.handleAttributes = entry;
  }
  function testAriaFormat(parsed, entry) {
    if (!isValidPartialFormatter(entry)) {
      throw new Error("noUiSlider: 'ariaFormat' requires 'to' method.");
    }
    parsed.ariaFormat = entry;
  }
  function testFormat(parsed, entry) {
    if (!isValidFormatter(entry)) {
      throw new Error("noUiSlider: 'format' requires 'to' and 'from' methods.");
    }
    parsed.format = entry;
  }
  function testKeyboardSupport(parsed, entry) {
    if (typeof entry !== "boolean") {
      throw new Error(
        "noUiSlider: 'keyboardSupport' option must be a boolean."
      );
    }
    parsed.keyboardSupport = entry;
  }
  function testDocumentElement(parsed, entry) {
    // This is an advanced option. Passed values are used without validation.
    parsed.documentElement = entry;
  }
  function testCssPrefix(parsed, entry) {
    if (typeof entry !== "string" && entry !== false) {
      throw new Error("noUiSlider: 'cssPrefix' must be a string or `false`.");
    }
    parsed.cssPrefix = entry;
  }
  function testCssClasses(parsed, entry) {
    if (typeof entry !== "object") {
      throw new Error("noUiSlider: 'cssClasses' must be an object.");
    }
    if (typeof parsed.cssPrefix === "string") {
      parsed.cssClasses = {};
      Object.keys(entry).forEach(function (key) {
        parsed.cssClasses[key] = parsed.cssPrefix + entry[key];
      });
    } else {
      parsed.cssClasses = entry;
    }
  }
  // Test all developer settings and parse to assumption-safe values.
  function testOptions(options) {
    // To prove a fix for #537, freeze options here.
    // If the object is modified, an error will be thrown.
    // Object.freeze(options);
    var parsed = {
      margin: null,
      limit: null,
      padding: null,
      animate: true,
      animationDuration: 300,
      ariaFormat: defaultFormatter,
      format: defaultFormatter,
    };
    // Tests are executed in the order they are presented here.
    var tests = {
      step: { r: false, t: testStep },
      keyboardPageMultiplier: { r: false, t: testKeyboardPageMultiplier },
      keyboardMultiplier: { r: false, t: testKeyboardMultiplier },
      keyboardDefaultStep: { r: false, t: testKeyboardDefaultStep },
      start: { r: true, t: testStart },
      connect: { r: true, t: testConnect },
      direction: { r: true, t: testDirection },
      snap: { r: false, t: testSnap },
      animate: { r: false, t: testAnimate },
      animationDuration: { r: false, t: testAnimationDuration },
      range: { r: true, t: testRange },
      orientation: { r: false, t: testOrientation },
      margin: { r: false, t: testMargin },
      limit: { r: false, t: testLimit },
      padding: { r: false, t: testPadding },
      behaviour: { r: true, t: testBehaviour },
      ariaFormat: { r: false, t: testAriaFormat },
      format: { r: false, t: testFormat },
      tooltips: { r: false, t: testTooltips },
      keyboardSupport: { r: true, t: testKeyboardSupport },
      documentElement: { r: false, t: testDocumentElement },
      cssPrefix: { r: true, t: testCssPrefix },
      cssClasses: { r: true, t: testCssClasses },
      handleAttributes: { r: false, t: testHandleAttributes },
    };
    var defaults = {
      connect: false,
      direction: "ltr",
      behaviour: "tap",
      orientation: "horizontal",
      keyboardSupport: true,
      cssPrefix: "noUi-",
      cssClasses: cssClasses,
      keyboardPageMultiplier: 5,
      keyboardMultiplier: 1,
      keyboardDefaultStep: 10,
    };
    // AriaFormat defaults to regular format, if any.
    if (options.format && !options.ariaFormat) {
      options.ariaFormat = options.format;
    }
    // Run all options through a testing mechanism to ensure correct
    // input. It should be noted that options might get modified to
    // be handled properly. E.g. wrapping integers in arrays.
    Object.keys(tests).forEach(function (name) {
      // If the option isn't set, but it is required, throw an error.
      if (!isSet(options[name]) && defaults[name] === undefined) {
        if (tests[name].r) {
          throw new Error("noUiSlider: '" + name + "' is required.");
        }
        return;
      }
      tests[name].t(
        parsed,
        !isSet(options[name]) ? defaults[name] : options[name]
      );
    });
    // Forward pips options
    parsed.pips = options.pips;
    // All recent browsers accept unprefixed transform.
    // We need -ms- for IE9 and -webkit- for older Android;
    // Assume use of -webkit- if unprefixed and -ms- are not supported.
    // https://caniuse.com/#feat=transforms2d
    var d = document.createElement("div");
    var msPrefix = d.style.msTransform !== undefined;
    var noPrefix = d.style.transform !== undefined;
    parsed.transformRule = noPrefix
      ? "transform"
      : msPrefix
        ? "msTransform"
        : "webkitTransform";
    // Pips don't move, so we can place them using left/top.
    var styles = [
      ["left", "top"],
      ["right", "bottom"],
    ];
    parsed.style = styles[parsed.dir][parsed.ort];
    return parsed;
  }
  //endregion
  function scope(target, options, originalOptions) {
    var actions = getActions();
    var supportsTouchActionNone = getSupportsTouchActionNone();
    var supportsPassive = supportsTouchActionNone && getSupportsPassive();
    // All variables local to 'scope' are prefixed with 'scope_'
    // Slider DOM Nodes
    var scope_Target = target;
    var scope_Base;
    var scope_Handles;
    var scope_Connects;
    var scope_Pips;
    var scope_Tooltips;
    // Slider state values
    var scope_Spectrum = options.spectrum;
    var scope_Values = [];
    var scope_Locations = [];
    var scope_HandleNumbers = [];
    var scope_ActiveHandlesCount = 0;
    var scope_Events = {};
    // Document Nodes
    var scope_Document = target.ownerDocument;
    var scope_DocumentElement =
      options.documentElement || scope_Document.documentElement;
    var scope_Body = scope_Document.body;
    // For horizontal sliders in standard ltr documents,
    // make .noUi-origin overflow to the left so the document doesn't scroll.
    var scope_DirOffset =
      scope_Document.dir === "rtl" || options.ort === 1 ? 0 : 100;
    // Creates a node, adds it to target, returns the new node.
    function addNodeTo(addTarget, className) {
      var div = scope_Document.createElement("div");
      if (className) {
        addClass(div, className);
      }
      addTarget.appendChild(div);
      return div;
    }
    // Append a origin to the base
    function addOrigin(base, handleNumber) {
      var origin = addNodeTo(base, options.cssClasses.origin);
      var handle = addNodeTo(origin, options.cssClasses.handle);
      addNodeTo(handle, options.cssClasses.touchArea);
      handle.setAttribute("data-handle", String(handleNumber));
      if (options.keyboardSupport) {
        // https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex
        // 0 = focusable and reachable
        handle.setAttribute("tabindex", "0");
        handle.addEventListener("keydown", function (event) {
          return eventKeydown(event, handleNumber);
        });
      }
      if (options.handleAttributes !== undefined) {
        var attributes_1 = options.handleAttributes[handleNumber];
        Object.keys(attributes_1).forEach(function (attribute) {
          handle.setAttribute(attribute, attributes_1[attribute]);
        });
      }
      handle.setAttribute("role", "slider");
      handle.setAttribute(
        "aria-orientation",
        options.ort ? "vertical" : "horizontal"
      );
      if (handleNumber === 0) {
        addClass(handle, options.cssClasses.handleLower);
      } else if (handleNumber === options.handles - 1) {
        addClass(handle, options.cssClasses.handleUpper);
      }
      origin.handle = handle;
      return origin;
    }
    // Insert nodes for connect elements
    function addConnect(base, add) {
      if (!add) {
        return false;
      }
      return addNodeTo(base, options.cssClasses.connect);
    }
    // Add handles to the slider base.
    function addElements(connectOptions, base) {
      var connectBase = addNodeTo(base, options.cssClasses.connects);
      scope_Handles = [];
      scope_Connects = [];
      scope_Connects.push(addConnect(connectBase, connectOptions[0]));
      // [::::O====O====O====]
      // connectOptions = [0, 1, 1, 1]
      for (var i = 0; i < options.handles; i++) {
        // Keep a list of all added handles.
        scope_Handles.push(addOrigin(base, i));
        scope_HandleNumbers[i] = i;
        scope_Connects.push(addConnect(connectBase, connectOptions[i + 1]));
      }
    }
    // Initialize a single slider.
    function addSlider(addTarget) {
      // Apply classes and data to the target.
      addClass(addTarget, options.cssClasses.target);
      if (options.dir === 0) {
        addClass(addTarget, options.cssClasses.ltr);
      } else {
        addClass(addTarget, options.cssClasses.rtl);
      }
      if (options.ort === 0) {
        addClass(addTarget, options.cssClasses.horizontal);
      } else {
        addClass(addTarget, options.cssClasses.vertical);
      }
      var textDirection = getComputedStyle(addTarget).direction;
      if (textDirection === "rtl") {
        addClass(addTarget, options.cssClasses.textDirectionRtl);
      } else {
        addClass(addTarget, options.cssClasses.textDirectionLtr);
      }
      return addNodeTo(addTarget, options.cssClasses.base);
    }
    function addTooltip(handle, handleNumber) {
      if (!options.tooltips || !options.tooltips[handleNumber]) {
        return false;
      }
      return addNodeTo(handle.firstChild, options.cssClasses.tooltip);
    }
    function isSliderDisabled() {
      return scope_Target.hasAttribute("disabled");
    }
    // Disable the slider dragging if any handle is disabled
    function isHandleDisabled(handleNumber) {
      var handleOrigin = scope_Handles[handleNumber];
      return handleOrigin.hasAttribute("disabled");
    }
    function disable(handleNumber) {
      if (handleNumber !== null && handleNumber !== undefined) {
        scope_Handles[handleNumber].setAttribute("disabled", "");
        scope_Handles[handleNumber].handle.removeAttribute("tabindex");
      } else {
        scope_Target.setAttribute("disabled", "");
        scope_Handles.forEach(function (handle) {
          handle.handle.removeAttribute("tabindex");
        });
      }
    }
    function enable(handleNumber) {
      if (handleNumber !== null && handleNumber !== undefined) {
        scope_Handles[handleNumber].removeAttribute("disabled");
        scope_Handles[handleNumber].handle.setAttribute("tabindex", "0");
      } else {
        scope_Target.removeAttribute("disabled");
        scope_Handles.forEach(function (handle) {
          handle.removeAttribute("disabled");
          handle.handle.setAttribute("tabindex", "0");
        });
      }
    }
    function removeTooltips() {
      if (scope_Tooltips) {
        removeEvent("update" + INTERNAL_EVENT_NS.tooltips);
        scope_Tooltips.forEach(function (tooltip) {
          if (tooltip) {
            removeElement(tooltip);
          }
        });
        scope_Tooltips = null;
      }
    }
    // The tooltips option is a shorthand for using the 'update' event.
    function tooltips() {
      removeTooltips();
      // Tooltips are added with options.tooltips in original order.
      scope_Tooltips = scope_Handles.map(addTooltip);
      bindEvent(
        "update" + INTERNAL_EVENT_NS.tooltips,
        function (values, handleNumber, unencoded) {
          if (!scope_Tooltips || !options.tooltips) {
            return;
          }
          if (scope_Tooltips[handleNumber] === false) {
            return;
          }
          var formattedValue = values[handleNumber];
          if (options.tooltips[handleNumber] !== true) {
            formattedValue = options.tooltips[handleNumber].to(
              unencoded[handleNumber]
            );
          }
          scope_Tooltips[handleNumber].innerHTML = formattedValue;
        }
      );
    }
    function aria() {
      removeEvent("update" + INTERNAL_EVENT_NS.aria);
      bindEvent(
        "update" + INTERNAL_EVENT_NS.aria,
        function (values, handleNumber, unencoded, tap, positions) {
          // Update Aria Values for all handles, as a change in one changes min and max values for the next.
          scope_HandleNumbers.forEach(function (index) {
            var handle = scope_Handles[index];
            var min = checkHandlePosition(
              scope_Locations,
              index,
              0,
              true,
              true,
              true
            );
            var max = checkHandlePosition(
              scope_Locations,
              index,
              100,
              true,
              true,
              true
            );
            var now = positions[index];
            // Formatted value for display
            var text = String(options.ariaFormat.to(unencoded[index]));
            // Map to slider range values
            min = scope_Spectrum.fromStepping(min).toFixed(1);
            max = scope_Spectrum.fromStepping(max).toFixed(1);
            now = scope_Spectrum.fromStepping(now).toFixed(1);
            handle.children[0].setAttribute("aria-valuemin", min);
            handle.children[0].setAttribute("aria-valuemax", max);
            handle.children[0].setAttribute("aria-valuenow", now);
            handle.children[0].setAttribute("aria-valuetext", text);
          });
        }
      );
    }
    function getGroup(pips) {
      // Use the range.
      if (pips.mode === PipsMode.Range || pips.mode === PipsMode.Steps) {
        return scope_Spectrum.xVal;
      }
      if (pips.mode === PipsMode.Count) {
        if (pips.values < 2) {
          throw new Error(
            "noUiSlider: 'values' (>= 2) required for mode 'count'."
          );
        }
        // Divide 0 - 100 in 'count' parts.
        var interval = pips.values - 1;
        var spread = 100 / interval;
        var values = [];
        // List these parts and have them handled as 'positions'.
        while (interval--) {
          values[interval] = interval * spread;
        }
        values.push(100);
        return mapToRange(values, pips.stepped);
      }
      if (pips.mode === PipsMode.Positions) {
        // Map all percentages to on-range values.
        return mapToRange(pips.values, pips.stepped);
      }
      if (pips.mode === PipsMode.Values) {
        // If the value must be stepped, it needs to be converted to a percentage first.
        if (pips.stepped) {
          return pips.values.map(function (value) {
            // Convert to percentage, apply step, return to value.
            return scope_Spectrum.fromStepping(
              scope_Spectrum.getStep(scope_Spectrum.toStepping(value))
            );
          });
        }
        // Otherwise, we can simply use the values.
        return pips.values;
      }
      return []; // pips.mode = never
    }
    function mapToRange(values, stepped) {
      return values.map(function (value) {
        return scope_Spectrum.fromStepping(
          stepped ? scope_Spectrum.getStep(value) : value
        );
      });
    }
    function generateSpread(pips) {
      function safeIncrement(value, increment) {
        // Avoid floating point variance by dropping the smallest decimal places.
        return Number((value + increment).toFixed(7));
      }
      var group = getGroup(pips);
      var indexes = {};
      var firstInRange = scope_Spectrum.xVal[0];
      var lastInRange = scope_Spectrum.xVal[scope_Spectrum.xVal.length - 1];
      var ignoreFirst = false;
      var ignoreLast = false;
      var prevPct = 0;
      // Create a copy of the group, sort it and filter away all duplicates.
      group = unique(
        group.slice().sort(function (a, b) {
          return a - b;
        })
      );
      // Make sure the range starts with the first element.
      if (group[0] !== firstInRange) {
        group.unshift(firstInRange);
        ignoreFirst = true;
      }
      // Likewise for the last one.
      if (group[group.length - 1] !== lastInRange) {
        group.push(lastInRange);
        ignoreLast = true;
      }
      group.forEach(function (current, index) {
        // Get the current step and the lower + upper positions.
        var step;
        var i;
        var q;
        var low = current;
        var high = group[index + 1];
        var newPct;
        var pctDifference;
        var pctPos;
        var type;
        var steps;
        var realSteps;
        var stepSize;
        var isSteps = pips.mode === PipsMode.Steps;
        // When using 'steps' mode, use the provided steps.
        // Otherwise, we'll step on to the next subrange.
        if (isSteps) {
          step = scope_Spectrum.xNumSteps[index];
        }
        // Default to a 'full' step.
        if (!step) {
          step = high - low;
        }
        // If high is undefined we are at the last subrange. Make sure it iterates once (#1088)
        if (high === undefined) {
          high = low;
        }
        // Make sure step isn't 0, which would cause an infinite loop (#654)
        step = Math.max(step, 0.0000001);
        // Find all steps in the subrange.
        for (i = low; i <= high; i = safeIncrement(i, step)) {
          // Get the percentage value for the current step,
          // calculate the size for the subrange.
          newPct = scope_Spectrum.toStepping(i);
          pctDifference = newPct - prevPct;
          steps = pctDifference / (pips.density || 1);
          realSteps = Math.round(steps);
          // This ratio represents the amount of percentage-space a point indicates.
          // For a density 1 the points/percentage = 1. For density 2, that percentage needs to be re-divided.
          // Round the percentage offset to an even number, then divide by two
          // to spread the offset on both sides of the range.
          stepSize = pctDifference / realSteps;
          // Divide all points evenly, adding the correct number to this subrange.
          // Run up to <= so that 100% gets a point, event if ignoreLast is set.
          for (q = 1; q <= realSteps; q += 1) {
            // The ratio between the rounded value and the actual size might be ~1% off.
            // Correct the percentage offset by the number of points
            // per subrange. density = 1 will result in 100 points on the
            // full range, 2 for 50, 4 for 25, etc.
            pctPos = prevPct + q * stepSize;
            indexes[pctPos.toFixed(5)] = [
              scope_Spectrum.fromStepping(pctPos),
              0,
            ];
          }
          // Determine the point type.
          type =
            group.indexOf(i) > -1
              ? PipsType.LargeValue
              : isSteps
                ? PipsType.SmallValue
                : PipsType.NoValue;
          // Enforce the 'ignoreFirst' option by overwriting the type for 0.
          if (!index && ignoreFirst && i !== high) {
            type = 0;
          }
          if (!(i === high && ignoreLast)) {
            // Mark the 'type' of this point. 0 = plain, 1 = real value, 2 = step value.
            indexes[newPct.toFixed(5)] = [i, type];
          }
          // Update the percentage count.
          prevPct = newPct;
        }
      });
      return indexes;
    }
    function addMarking(spread, filterFunc, formatter) {
      var _a, _b;
      var element = scope_Document.createElement("div");
      var valueSizeClasses =
        ((_a = {}),
        (_a[PipsType.None] = ""),
        (_a[PipsType.NoValue] = options.cssClasses.valueNormal),
        (_a[PipsType.LargeValue] = options.cssClasses.valueLarge),
        (_a[PipsType.SmallValue] = options.cssClasses.valueSub),
        _a);
      var markerSizeClasses =
        ((_b = {}),
        (_b[PipsType.None] = ""),
        (_b[PipsType.NoValue] = options.cssClasses.markerNormal),
        (_b[PipsType.LargeValue] = options.cssClasses.markerLarge),
        (_b[PipsType.SmallValue] = options.cssClasses.markerSub),
        _b);
      var valueOrientationClasses = [
        options.cssClasses.valueHorizontal,
        options.cssClasses.valueVertical,
      ];
      var markerOrientationClasses = [
        options.cssClasses.markerHorizontal,
        options.cssClasses.markerVertical,
      ];
      addClass(element, options.cssClasses.pips);
      addClass(
        element,
        options.ort === 0
          ? options.cssClasses.pipsHorizontal
          : options.cssClasses.pipsVertical
      );
      function getClasses(type, source) {
        var a = source === options.cssClasses.value;
        var orientationClasses = a
          ? valueOrientationClasses
          : markerOrientationClasses;
        var sizeClasses = a ? valueSizeClasses : markerSizeClasses;
        return (
          source +
          " " +
          orientationClasses[options.ort] +
          " " +
          sizeClasses[type]
        );
      }
      function addSpread(offset, value, type) {
        // Apply the filter function, if it is set.
        type = filterFunc ? filterFunc(value, type) : type;
        if (type === PipsType.None) {
          return;
        }
        // Add a marker for every point
        var node = addNodeTo(element, false);
        node.className = getClasses(type, options.cssClasses.marker);
        node.style[options.style] = offset + "%";
        // Values are only appended for points marked '1' or '2'.
        if (type > PipsType.NoValue) {
          node = addNodeTo(element, false);
          node.className = getClasses(type, options.cssClasses.value);
          node.setAttribute("data-value", String(value));
          node.style[options.style] = offset + "%";
          node.innerHTML = String(formatter.to(value));
        }
      }
      // Append all points.
      Object.keys(spread).forEach(function (offset) {
        addSpread(offset, spread[offset][0], spread[offset][1]);
      });
      return element;
    }
    function removePips() {
      if (scope_Pips) {
        removeElement(scope_Pips);
        scope_Pips = null;
      }
    }
    function pips(pips) {
      // Fix #669
      removePips();
      var spread = generateSpread(pips);
      var filter = pips.filter;
      var format = pips.format || {
        to: function (value) {
          return String(Math.round(value));
        },
      };
      scope_Pips = scope_Target.appendChild(addMarking(spread, filter, format));
      return scope_Pips;
    }
    // Shorthand for base dimensions.
    function baseSize() {
      var rect = scope_Base.getBoundingClientRect();
      var alt = "offset" + ["Width", "Height"][options.ort];
      return options.ort === 0
        ? rect.width || scope_Base[alt]
        : rect.height || scope_Base[alt];
    }
    // Handler for attaching events trough a proxy.
    function attachEvent(events, element, callback, data) {
      // This function can be used to 'filter' events to the slider.
      // element is a node, not a nodeList
      var method = function (event) {
        var e = fixEvent(event, data.pageOffset, data.target || element);
        // fixEvent returns false if this event has a different target
        // when handling (multi-) touch events;
        if (!e) {
          return false;
        }
        // doNotReject is passed by all end events to make sure released touches
        // are not rejected, leaving the slider "stuck" to the cursor;
        if (isSliderDisabled() && !data.doNotReject) {
          return false;
        }
        // Stop if an active 'tap' transition is taking place.
        if (
          hasClass(scope_Target, options.cssClasses.tap) &&
          !data.doNotReject
        ) {
          return false;
        }
        // Ignore right or middle clicks on start #454
        if (
          events === actions.start &&
          e.buttons !== undefined &&
          e.buttons > 1
        ) {
          return false;
        }
        // Ignore right or middle clicks on start #454
        if (data.hover && e.buttons) {
          return false;
        }
        // 'supportsPassive' is only true if a browser also supports touch-action: none in CSS.
        // iOS safari does not, so it doesn't get to benefit from passive scrolling. iOS does support
        // touch-action: manipulation, but that allows panning, which breaks
        // sliders after zooming/on non-responsive pages.
        // See: https://bugs.webkit.org/show_bug.cgi?id=133112
        if (!supportsPassive) {
          e.preventDefault();
        }
        e.calcPoint = e.points[options.ort];
        // Call the event handler with the event [ and additional data ].
        callback(e, data);
        return;
      };
      var methods = [];
      // Bind a closure on the target for every event type.
      events.split(" ").forEach(function (eventName) {
        element.addEventListener(
          eventName,
          method,
          supportsPassive ? { passive: true } : false
        );
        methods.push([eventName, method]);
      });
      return methods;
    }
    // Provide a clean event with standardized offset values.
    function fixEvent(e, pageOffset, eventTarget) {
      // Filter the event to register the type, which can be
      // touch, mouse or pointer. Offset changes need to be
      // made on an event specific basis.
      var touch = e.type.indexOf("touch") === 0;
      var mouse = e.type.indexOf("mouse") === 0;
      var pointer = e.type.indexOf("pointer") === 0;
      var x = 0;
      var y = 0;
      // IE10 implemented pointer events with a prefix;
      if (e.type.indexOf("MSPointer") === 0) {
        pointer = true;
      }
      // Erroneous events seem to be passed in occasionally on iOS/iPadOS after user finishes interacting with
      // the slider. They appear to be of type MouseEvent, yet they don't have usual properties set. Ignore
      // events that have no touches or buttons associated with them. (#1057, #1079, #1095)
      if (e.type === "mousedown" && !e.buttons && !e.touches) {
        return false;
      }
      // The only thing one handle should be concerned about is the touches that originated on top of it.
      if (touch) {
        // Returns true if a touch originated on the target.
        var isTouchOnTarget = function (checkTouch) {
          var target = checkTouch.target;
          return (
            target === eventTarget ||
            eventTarget.contains(target) ||
            (e.composed && e.composedPath().shift() === eventTarget)
          );
        };
        // In the case of touchstart events, we need to make sure there is still no more than one
        // touch on the target so we look amongst all touches.
        if (e.type === "touchstart") {
          var targetTouches = Array.prototype.filter.call(
            e.touches,
            isTouchOnTarget
          );
          // Do not support more than one touch per handle.
          if (targetTouches.length > 1) {
            return false;
          }
          x = targetTouches[0].pageX;
          y = targetTouches[0].pageY;
        } else {
          // In the other cases, find on changedTouches is enough.
          var targetTouch = Array.prototype.find.call(
            e.changedTouches,
            isTouchOnTarget
          );
          // Cancel if the target touch has not moved.
          if (!targetTouch) {
            return false;
          }
          x = targetTouch.pageX;
          y = targetTouch.pageY;
        }
      }
      pageOffset = pageOffset || getPageOffset(scope_Document);
      if (mouse || pointer) {
        x = e.clientX + pageOffset.x;
        y = e.clientY + pageOffset.y;
      }
      e.pageOffset = pageOffset;
      e.points = [x, y];
      e.cursor = mouse || pointer; // Fix #435
      return e;
    }
    // Translate a coordinate in the document to a percentage on the slider
    function calcPointToPercentage(calcPoint) {
      var location = calcPoint - offset(scope_Base, options.ort);
      var proposal = (location * 100) / baseSize();
      // Clamp proposal between 0% and 100%
      // Out-of-bound coordinates may occur when .noUi-base pseudo-elements
      // are used (e.g. contained handles feature)
      proposal = limit(proposal);
      return options.dir ? 100 - proposal : proposal;
    }
    // Find handle closest to a certain percentage on the slider
    function getClosestHandle(clickedPosition) {
      var smallestDifference = 100;
      var handleNumber = false;
      scope_Handles.forEach(function (handle, index) {
        // Disabled handles are ignored
        if (isHandleDisabled(index)) {
          return;
        }
        var handlePosition = scope_Locations[index];
        var differenceWithThisHandle = Math.abs(
          handlePosition - clickedPosition
        );
        // Initial state
        var clickAtEdge =
          differenceWithThisHandle === 100 && smallestDifference === 100;
        // Difference with this handle is smaller than the previously checked handle
        var isCloser = differenceWithThisHandle < smallestDifference;
        var isCloserAfter =
          differenceWithThisHandle <= smallestDifference &&
          clickedPosition > handlePosition;
        if (isCloser || isCloserAfter || clickAtEdge) {
          handleNumber = index;
          smallestDifference = differenceWithThisHandle;
        }
      });
      return handleNumber;
    }
    // Fire 'end' when a mouse or pen leaves the document.
    function documentLeave(event, data) {
      if (
        event.type === "mouseout" &&
        event.target.nodeName === "HTML" &&
        event.relatedTarget === null
      ) {
        eventEnd(event, data);
      }
    }
    // Handle movement on document for handle and range drag.
    function eventMove(event, data) {
      // Fix #498
      // Check value of .buttons in 'start' to work around a bug in IE10 mobile (data.buttonsProperty).
      // https://connect.microsoft.com/IE/feedback/details/927005/mobile-ie10-windows-phone-buttons-property-of-pointermove-event-always-zero
      // IE9 has .buttons and .which zero on mousemove.
      // Firefox breaks the spec MDN defines.
      if (
        navigator.appVersion.indexOf("MSIE 9") === -1 &&
        event.buttons === 0 &&
        data.buttonsProperty !== 0
      ) {
        return eventEnd(event, data);
      }
      // Check if we are moving up or down
      var movement =
        (options.dir ? -1 : 1) * (event.calcPoint - data.startCalcPoint);
      // Convert the movement into a percentage of the slider width/height
      var proposal = (movement * 100) / data.baseSize;
      moveHandles(
        movement > 0,
        proposal,
        data.locations,
        data.handleNumbers,
        data.connect
      );
    }
    // Unbind move events on document, call callbacks.
    function eventEnd(event, data) {
      // The handle is no longer active, so remove the class.
      if (data.handle) {
        removeClass(data.handle, options.cssClasses.active);
        scope_ActiveHandlesCount -= 1;
      }
      // Unbind the move and end events, which are added on 'start'.
      data.listeners.forEach(function (c) {
        scope_DocumentElement.removeEventListener(c[0], c[1]);
      });
      if (scope_ActiveHandlesCount === 0) {
        // Remove dragging class.
        removeClass(scope_Target, options.cssClasses.drag);
        setZindex();
        // Remove cursor styles and text-selection events bound to the body.
        if (event.cursor) {
          scope_Body.style.cursor = "";
          scope_Body.removeEventListener("selectstart", preventDefault);
        }
      }
      if (options.events.smoothSteps) {
        data.handleNumbers.forEach(function (handleNumber) {
          setHandle(
            handleNumber,
            scope_Locations[handleNumber],
            true,
            true,
            false,
            false
          );
        });
        data.handleNumbers.forEach(function (handleNumber) {
          fireEvent("update", handleNumber);
        });
      }
      data.handleNumbers.forEach(function (handleNumber) {
        fireEvent("change", handleNumber);
        fireEvent("set", handleNumber);
        fireEvent("end", handleNumber);
      });
    }
    // Bind move events on document.
    function eventStart(event, data) {
      // Ignore event if any handle is disabled
      if (data.handleNumbers.some(isHandleDisabled)) {
        return;
      }
      var handle;
      if (data.handleNumbers.length === 1) {
        var handleOrigin = scope_Handles[data.handleNumbers[0]];
        handle = handleOrigin.children[0];
        scope_ActiveHandlesCount += 1;
        // Mark the handle as 'active' so it can be styled.
        addClass(handle, options.cssClasses.active);
      }
      // A drag should never propagate up to the 'tap' event.
      event.stopPropagation();
      // Record the event listeners.
      var listeners = [];
      // Attach the move and end events.
      var moveEvent = attachEvent(
        actions.move,
        scope_DocumentElement,
        eventMove,
        {
          // The event target has changed so we need to propagate the original one so that we keep
          // relying on it to extract target touches.
          target: event.target,
          handle: handle,
          connect: data.connect,
          listeners: listeners,
          startCalcPoint: event.calcPoint,
          baseSize: baseSize(),
          pageOffset: event.pageOffset,
          handleNumbers: data.handleNumbers,
          buttonsProperty: event.buttons,
          locations: scope_Locations.slice(),
        }
      );
      var endEvent = attachEvent(actions.end, scope_DocumentElement, eventEnd, {
        target: event.target,
        handle: handle,
        listeners: listeners,
        doNotReject: true,
        handleNumbers: data.handleNumbers,
      });
      var outEvent = attachEvent(
        "mouseout",
        scope_DocumentElement,
        documentLeave,
        {
          target: event.target,
          handle: handle,
          listeners: listeners,
          doNotReject: true,
          handleNumbers: data.handleNumbers,
        }
      );
      // We want to make sure we pushed the listeners in the listener list rather than creating
      // a new one as it has already been passed to the event handlers.
      listeners.push.apply(listeners, moveEvent.concat(endEvent, outEvent));
      // Text selection isn't an issue on touch devices,
      // so adding cursor styles can be skipped.
      if (event.cursor) {
        // Prevent the 'I' cursor and extend the range-drag cursor.
        scope_Body.style.cursor = getComputedStyle(event.target).cursor;
        // Mark the target with a dragging state.
        if (scope_Handles.length > 1) {
          addClass(scope_Target, options.cssClasses.drag);
        }
        // Prevent text selection when dragging the handles.
        // In noUiSlider <= 9.2.0, this was handled by calling preventDefault on mouse/touch start/move,
        // which is scroll blocking. The selectstart event is supported by FireFox starting from version 52,
        // meaning the only holdout is iOS Safari. This doesn't matter: text selection isn't triggered there.
        // The 'cursor' flag is false.
        // See: http://caniuse.com/#search=selectstart
        scope_Body.addEventListener("selectstart", preventDefault, false);
      }
      data.handleNumbers.forEach(function (handleNumber) {
        fireEvent("start", handleNumber);
      });
    }
    // Move closest handle to tapped location.
    function eventTap(event) {
      // The tap event shouldn't propagate up
      event.stopPropagation();
      var proposal = calcPointToPercentage(event.calcPoint);
      var handleNumber = getClosestHandle(proposal);
      // Tackle the case that all handles are 'disabled'.
      if (handleNumber === false) {
        return;
      }
      // Flag the slider as it is now in a transitional state.
      // Transition takes a configurable amount of ms (default 300). Re-enable the slider after that.
      if (!options.events.snap) {
        addClassFor(
          scope_Target,
          options.cssClasses.tap,
          options.animationDuration
        );
      }
      setHandle(handleNumber, proposal, true, true);
      setZindex();
      fireEvent("slide", handleNumber, true);
      fireEvent("update", handleNumber, true);
      if (!options.events.snap) {
        fireEvent("change", handleNumber, true);
        fireEvent("set", handleNumber, true);
      } else {
        eventStart(event, { handleNumbers: [handleNumber] });
      }
    }
    // Fires a 'hover' event for a hovered mouse/pen position.
    function eventHover(event) {
      var proposal = calcPointToPercentage(event.calcPoint);
      var to = scope_Spectrum.getStep(proposal);
      var value = scope_Spectrum.fromStepping(to);
      Object.keys(scope_Events).forEach(function (targetEvent) {
        if ("hover" === targetEvent.split(".")[0]) {
          scope_Events[targetEvent].forEach(function (callback) {
            callback.call(scope_Self, value);
          });
        }
      });
    }
    // Handles keydown on focused handles
    // Don't move the document when pressing arrow keys on focused handles
    function eventKeydown(event, handleNumber) {
      if (isSliderDisabled() || isHandleDisabled(handleNumber)) {
        return false;
      }
      var horizontalKeys = ["Left", "Right"];
      var verticalKeys = ["Down", "Up"];
      var largeStepKeys = ["PageDown", "PageUp"];
      var edgeKeys = ["Home", "End"];
      if (options.dir && !options.ort) {
        // On an right-to-left slider, the left and right keys act inverted
        horizontalKeys.reverse();
      } else if (options.ort && !options.dir) {
        // On a top-to-bottom slider, the up and down keys act inverted
        verticalKeys.reverse();
        largeStepKeys.reverse();
      }
      // Strip "Arrow" for IE compatibility. https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
      var key = event.key.replace("Arrow", "");
      var isLargeDown = key === largeStepKeys[0];
      var isLargeUp = key === largeStepKeys[1];
      var isDown =
        key === verticalKeys[0] || key === horizontalKeys[0] || isLargeDown;
      var isUp =
        key === verticalKeys[1] || key === horizontalKeys[1] || isLargeUp;
      var isMin = key === edgeKeys[0];
      var isMax = key === edgeKeys[1];
      if (!isDown && !isUp && !isMin && !isMax) {
        return true;
      }
      event.preventDefault();
      var to;
      if (isUp || isDown) {
        var direction = isDown ? 0 : 1;
        var steps = getNextStepsForHandle(handleNumber);
        var step = steps[direction];
        // At the edge of a slider, do nothing
        if (step === null) {
          return false;
        }
        // No step set, use the default of 10% of the sub-range
        if (step === false) {
          step = scope_Spectrum.getDefaultStep(
            scope_Locations[handleNumber],
            isDown,
            options.keyboardDefaultStep
          );
        }
        if (isLargeUp || isLargeDown) {
          step *= options.keyboardPageMultiplier;
        } else {
          step *= options.keyboardMultiplier;
        }
        // Step over zero-length ranges (#948);
        step = Math.max(step, 0.0000001);
        // Decrement for down steps
        step = (isDown ? -1 : 1) * step;
        to = scope_Values[handleNumber] + step;
      } else if (isMax) {
        // End key
        to = options.spectrum.xVal[options.spectrum.xVal.length - 1];
      } else {
        // Home key
        to = options.spectrum.xVal[0];
      }
      setHandle(handleNumber, scope_Spectrum.toStepping(to), true, true);
      fireEvent("slide", handleNumber);
      fireEvent("update", handleNumber);
      fireEvent("change", handleNumber);
      fireEvent("set", handleNumber);
      return false;
    }
    // Attach events to several slider parts.
    function bindSliderEvents(behaviour) {
      // Attach the standard drag event to the handles.
      if (!behaviour.fixed) {
        scope_Handles.forEach(function (handle, index) {
          // These events are only bound to the visual handle
          // element, not the 'real' origin element.
          attachEvent(actions.start, handle.children[0], eventStart, {
            handleNumbers: [index],
          });
        });
      }
      // Attach the tap event to the slider base.
      if (behaviour.tap) {
        attachEvent(actions.start, scope_Base, eventTap, {});
      }
      // Fire hover events
      if (behaviour.hover) {
        attachEvent(actions.move, scope_Base, eventHover, {
          hover: true,
        });
      }
      // Make the range draggable.
      if (behaviour.drag) {
        scope_Connects.forEach(function (connect, index) {
          if (
            connect === false ||
            index === 0 ||
            index === scope_Connects.length - 1
          ) {
            return;
          }
          var handleBefore = scope_Handles[index - 1];
          var handleAfter = scope_Handles[index];
          var eventHolders = [connect];
          var handlesToDrag = [handleBefore, handleAfter];
          var handleNumbersToDrag = [index - 1, index];
          addClass(connect, options.cssClasses.draggable);
          // When the range is fixed, the entire range can
          // be dragged by the handles. The handle in the first
          // origin will propagate the start event upward,
          // but it needs to be bound manually on the other.
          if (behaviour.fixed) {
            eventHolders.push(handleBefore.children[0]);
            eventHolders.push(handleAfter.children[0]);
          }
          if (behaviour.dragAll) {
            handlesToDrag = scope_Handles;
            handleNumbersToDrag = scope_HandleNumbers;
          }
          eventHolders.forEach(function (eventHolder) {
            attachEvent(actions.start, eventHolder, eventStart, {
              handles: handlesToDrag,
              handleNumbers: handleNumbersToDrag,
              connect: connect,
            });
          });
        });
      }
    }
    // Attach an event to this slider, possibly including a namespace
    function bindEvent(namespacedEvent, callback) {
      scope_Events[namespacedEvent] = scope_Events[namespacedEvent] || [];
      scope_Events[namespacedEvent].push(callback);
      // If the event bound is 'update,' fire it immediately for all handles.
      if (namespacedEvent.split(".")[0] === "update") {
        scope_Handles.forEach(function (a, index) {
          fireEvent("update", index);
        });
      }
    }
    function isInternalNamespace(namespace) {
      return (
        namespace === INTERNAL_EVENT_NS.aria ||
        namespace === INTERNAL_EVENT_NS.tooltips
      );
    }
    // Undo attachment of event
    function removeEvent(namespacedEvent) {
      var event = namespacedEvent && namespacedEvent.split(".")[0];
      var namespace = event
        ? namespacedEvent.substring(event.length)
        : namespacedEvent;
      Object.keys(scope_Events).forEach(function (bind) {
        var tEvent = bind.split(".")[0];
        var tNamespace = bind.substring(tEvent.length);
        if (
          (!event || event === tEvent) &&
          (!namespace || namespace === tNamespace)
        ) {
          // only delete protected internal event if intentional
          if (!isInternalNamespace(tNamespace) || namespace === tNamespace) {
            delete scope_Events[bind];
          }
        }
      });
    }
    // External event handling
    function fireEvent(eventName, handleNumber, tap) {
      Object.keys(scope_Events).forEach(function (targetEvent) {
        var eventType = targetEvent.split(".")[0];
        if (eventName === eventType) {
          scope_Events[targetEvent].forEach(function (callback) {
            callback.call(
              // Use the slider public API as the scope ('this')
              scope_Self,
              // Return values as array, so arg_1[arg_2] is always valid.
              scope_Values.map(options.format.to),
              // Handle index, 0 or 1
              handleNumber,
              // Un-formatted slider values
              scope_Values.slice(),
              // Event is fired by tap, true or false
              tap || false,
              // Left offset of the handle, in relation to the slider
              scope_Locations.slice(),
              // add the slider public API to an accessible parameter when this is unavailable
              scope_Self
            );
          });
        }
      });
    }
    // Split out the handle positioning logic so the Move event can use it, too
    function checkHandlePosition(
      reference,
      handleNumber,
      to,
      lookBackward,
      lookForward,
      getValue,
      smoothSteps
    ) {
      var distance;
      // For sliders with multiple handles, limit movement to the other handle.
      // Apply the margin option by adding it to the handle positions.
      if (scope_Handles.length > 1 && !options.events.unconstrained) {
        if (lookBackward && handleNumber > 0) {
          distance = scope_Spectrum.getAbsoluteDistance(
            reference[handleNumber - 1],
            options.margin,
            false
          );
          to = Math.max(to, distance);
        }
        if (lookForward && handleNumber < scope_Handles.length - 1) {
          distance = scope_Spectrum.getAbsoluteDistance(
            reference[handleNumber + 1],
            options.margin,
            true
          );
          to = Math.min(to, distance);
        }
      }
      // The limit option has the opposite effect, limiting handles to a
      // maximum distance from another. Limit must be > 0, as otherwise
      // handles would be unmovable.
      if (scope_Handles.length > 1 && options.limit) {
        if (lookBackward && handleNumber > 0) {
          distance = scope_Spectrum.getAbsoluteDistance(
            reference[handleNumber - 1],
            options.limit,
            false
          );
          to = Math.min(to, distance);
        }
        if (lookForward && handleNumber < scope_Handles.length - 1) {
          distance = scope_Spectrum.getAbsoluteDistance(
            reference[handleNumber + 1],
            options.limit,
            true
          );
          to = Math.max(to, distance);
        }
      }
      // The padding option keeps the handles a certain distance from the
      // edges of the slider. Padding must be > 0.
      if (options.padding) {
        if (handleNumber === 0) {
          distance = scope_Spectrum.getAbsoluteDistance(
            0,
            options.padding[0],
            false
          );
          to = Math.max(to, distance);
        }
        if (handleNumber === scope_Handles.length - 1) {
          distance = scope_Spectrum.getAbsoluteDistance(
            100,
            options.padding[1],
            true
          );
          to = Math.min(to, distance);
        }
      }
      if (!smoothSteps) {
        to = scope_Spectrum.getStep(to);
      }
      // Limit percentage to the 0 - 100 range
      to = limit(to);
      // Return false if handle can't move
      if (to === reference[handleNumber] && !getValue) {
        return false;
      }
      return to;
    }
    // Uses slider orientation to create CSS rules. a = base value;
    function inRuleOrder(v, a) {
      var o = options.ort;
      return (o ? a : v) + ", " + (o ? v : a);
    }
    // Moves handle(s) by a percentage
    // (bool, % to move, [% where handle started, ...], [index in scope_Handles, ...])
    function moveHandles(upward, proposal, locations, handleNumbers, connect) {
      var proposals = locations.slice();
      // Store first handle now, so we still have it in case handleNumbers is reversed
      var firstHandle = handleNumbers[0];
      var smoothSteps = options.events.smoothSteps;
      var b = [!upward, upward];
      var f = [upward, !upward];
      // Copy handleNumbers so we don't change the dataset
      handleNumbers = handleNumbers.slice();
      // Check to see which handle is 'leading'.
      // If that one can't move the second can't either.
      if (upward) {
        handleNumbers.reverse();
      }
      // Step 1: get the maximum percentage that any of the handles can move
      if (handleNumbers.length > 1) {
        handleNumbers.forEach(function (handleNumber, o) {
          var to = checkHandlePosition(
            proposals,
            handleNumber,
            proposals[handleNumber] + proposal,
            b[o],
            f[o],
            false,
            smoothSteps
          );
          // Stop if one of the handles can't move.
          if (to === false) {
            proposal = 0;
          } else {
            proposal = to - proposals[handleNumber];
            proposals[handleNumber] = to;
          }
        });
      }
      // If using one handle, check backward AND forward
      else {
        b = f = [true];
      }
      var state = false;
      // Step 2: Try to set the handles with the found percentage
      handleNumbers.forEach(function (handleNumber, o) {
        state =
          setHandle(
            handleNumber,
            locations[handleNumber] + proposal,
            b[o],
            f[o],
            false,
            smoothSteps
          ) || state;
      });
      // Step 3: If a handle moved, fire events
      if (state) {
        handleNumbers.forEach(function (handleNumber) {
          fireEvent("update", handleNumber);
          fireEvent("slide", handleNumber);
        });
        // If target is a connect, then fire drag event
        if (connect != undefined) {
          fireEvent("drag", firstHandle);
        }
      }
    }
    // Takes a base value and an offset. This offset is used for the connect bar size.
    // In the initial design for this feature, the origin element was 1% wide.
    // Unfortunately, a rounding bug in Chrome makes it impossible to implement this feature
    // in this manner: https://bugs.chromium.org/p/chromium/issues/detail?id=798223
    function transformDirection(a, b) {
      return options.dir ? 100 - a - b : a;
    }
    // Updates scope_Locations and scope_Values, updates visual state
    function updateHandlePosition(handleNumber, to) {
      // Update locations.
      scope_Locations[handleNumber] = to;
      // Convert the value to the slider stepping/range.
      scope_Values[handleNumber] = scope_Spectrum.fromStepping(to);
      var translation = transformDirection(to, 0) - scope_DirOffset;
      var translateRule =
        "translate(" + inRuleOrder(translation + "%", "0") + ")";
      scope_Handles[handleNumber].style[options.transformRule] = translateRule;
      updateConnect(handleNumber);
      updateConnect(handleNumber + 1);
    }
    // Handles before the slider middle are stacked later = higher,
    // Handles after the middle later is lower
    // [[7] [8] .......... | .......... [5] [4]
    function setZindex() {
      scope_HandleNumbers.forEach(function (handleNumber) {
        var dir = scope_Locations[handleNumber] > 50 ? -1 : 1;
        var zIndex = 3 + (scope_Handles.length + dir * handleNumber);
        scope_Handles[handleNumber].style.zIndex = String(zIndex);
      });
    }
    // Test suggested values and apply margin, step.
    // if exactInput is true, don't run checkHandlePosition, then the handle can be placed in between steps (#436)
    function setHandle(
      handleNumber,
      to,
      lookBackward,
      lookForward,
      exactInput,
      smoothSteps
    ) {
      if (!exactInput) {
        to = checkHandlePosition(
          scope_Locations,
          handleNumber,
          to,
          lookBackward,
          lookForward,
          false,
          smoothSteps
        );
      }
      if (to === false) {
        return false;
      }
      updateHandlePosition(handleNumber, to);
      return true;
    }
    // Updates style attribute for connect nodes
    function updateConnect(index) {
      // Skip connects set to false
      if (!scope_Connects[index]) {
        return;
      }
      var l = 0;
      var h = 100;
      if (index !== 0) {
        l = scope_Locations[index - 1];
      }
      if (index !== scope_Connects.length - 1) {
        h = scope_Locations[index];
      }
      // We use two rules:
      // 'translate' to change the left/top offset;
      // 'scale' to change the width of the element;
      // As the element has a width of 100%, a translation of 100% is equal to 100% of the parent (.noUi-base)
      var connectWidth = h - l;
      var translateRule =
        "translate(" +
        inRuleOrder(transformDirection(l, connectWidth) + "%", "0") +
        ")";
      var scaleRule = "scale(" + inRuleOrder(connectWidth / 100, "1") + ")";
      scope_Connects[index].style[options.transformRule] =
        translateRule + " " + scaleRule;
    }
    // Parses value passed to .set method. Returns current value if not parse-able.
    function resolveToValue(to, handleNumber) {
      // Setting with null indicates an 'ignore'.
      // Inputting 'false' is invalid.
      if (to === null || to === false || to === undefined) {
        return scope_Locations[handleNumber];
      }
      // If a formatted number was passed, attempt to decode it.
      if (typeof to === "number") {
        to = String(to);
      }
      to = options.format.from(to);
      if (to !== false) {
        to = scope_Spectrum.toStepping(to);
      }
      // If parsing the number failed, use the current value.
      if (to === false || isNaN(to)) {
        return scope_Locations[handleNumber];
      }
      return to;
    }
    // Set the slider value.
    function valueSet(input, fireSetEvent, exactInput) {
      var values = asArray(input);
      var isInit = scope_Locations[0] === undefined;
      // Event fires by default
      fireSetEvent = fireSetEvent === undefined ? true : fireSetEvent;
      // Animation is optional.
      // Make sure the initial values were set before using animated placement.
      if (options.animate && !isInit) {
        addClassFor(
          scope_Target,
          options.cssClasses.tap,
          options.animationDuration
        );
      }
      // First pass, without lookAhead but with lookBackward. Values are set from left to right.
      scope_HandleNumbers.forEach(function (handleNumber) {
        setHandle(
          handleNumber,
          resolveToValue(values[handleNumber], handleNumber),
          true,
          false,
          exactInput
        );
      });
      var i = scope_HandleNumbers.length === 1 ? 0 : 1;
      // Spread handles evenly across the slider if the range has no size (min=max)
      if (isInit && scope_Spectrum.hasNoSize()) {
        exactInput = true;
        scope_Locations[0] = 0;
        if (scope_HandleNumbers.length > 1) {
          var space_1 = 100 / (scope_HandleNumbers.length - 1);
          scope_HandleNumbers.forEach(function (handleNumber) {
            scope_Locations[handleNumber] = handleNumber * space_1;
          });
        }
      }
      // Secondary passes. Now that all base values are set, apply constraints.
      // Iterate all handles to ensure constraints are applied for the entire slider (Issue #1009)
      for (; i < scope_HandleNumbers.length; ++i) {
        scope_HandleNumbers.forEach(function (handleNumber) {
          setHandle(
            handleNumber,
            scope_Locations[handleNumber],
            true,
            true,
            exactInput
          );
        });
      }
      setZindex();
      scope_HandleNumbers.forEach(function (handleNumber) {
        fireEvent("update", handleNumber);
        // Fire the event only for handles that received a new value, as per #579
        if (values[handleNumber] !== null && fireSetEvent) {
          fireEvent("set", handleNumber);
        }
      });
    }
    // Reset slider to initial values
    function valueReset(fireSetEvent) {
      valueSet(options.start, fireSetEvent);
    }
    // Set value for a single handle
    function valueSetHandle(handleNumber, value, fireSetEvent, exactInput) {
      // Ensure numeric input
      handleNumber = Number(handleNumber);
      if (!(handleNumber >= 0 && handleNumber < scope_HandleNumbers.length)) {
        throw new Error(
          "noUiSlider: invalid handle number, got: " + handleNumber
        );
      }
      // Look both backward and forward, since we don't want this handle to "push" other handles (#960);
      // The exactInput argument can be used to ignore slider stepping (#436)
      setHandle(
        handleNumber,
        resolveToValue(value, handleNumber),
        true,
        true,
        exactInput
      );
      fireEvent("update", handleNumber);
      if (fireSetEvent) {
        fireEvent("set", handleNumber);
      }
    }
    // Get the slider value.
    function valueGet(unencoded) {
      if (unencoded === void 0) {
        unencoded = false;
      }
      if (unencoded) {
        // return a copy of the raw values
        return scope_Values.length === 1
          ? scope_Values[0]
          : scope_Values.slice(0);
      }
      var values = scope_Values.map(options.format.to);
      // If only one handle is used, return a single value.
      if (values.length === 1) {
        return values[0];
      }
      return values;
    }
    // Removes classes from the root and empties it.
    function destroy() {
      // remove protected internal listeners
      removeEvent(INTERNAL_EVENT_NS.aria);
      removeEvent(INTERNAL_EVENT_NS.tooltips);
      Object.keys(options.cssClasses).forEach(function (key) {
        removeClass(scope_Target, options.cssClasses[key]);
      });
      while (scope_Target.firstChild) {
        scope_Target.removeChild(scope_Target.firstChild);
      }
      delete scope_Target.noUiSlider;
    }
    function getNextStepsForHandle(handleNumber) {
      var location = scope_Locations[handleNumber];
      var nearbySteps = scope_Spectrum.getNearbySteps(location);
      var value = scope_Values[handleNumber];
      var increment = nearbySteps.thisStep.step;
      var decrement = null;
      // If snapped, directly use defined step value
      if (options.snap) {
        return [
          value - nearbySteps.stepBefore.startValue || null,
          nearbySteps.stepAfter.startValue - value || null,
        ];
      }
      // If the next value in this step moves into the next step,
      // the increment is the start of the next step - the current value
      if (increment !== false) {
        if (value + increment > nearbySteps.stepAfter.startValue) {
          increment = nearbySteps.stepAfter.startValue - value;
        }
      }
      // If the value is beyond the starting point
      if (value > nearbySteps.thisStep.startValue) {
        decrement = nearbySteps.thisStep.step;
      } else if (nearbySteps.stepBefore.step === false) {
        decrement = false;
      }
      // If a handle is at the start of a step, it always steps back into the previous step first
      else {
        decrement = value - nearbySteps.stepBefore.highestStep;
      }
      // Now, if at the slider edges, there is no in/decrement
      if (location === 100) {
        increment = null;
      } else if (location === 0) {
        decrement = null;
      }
      // As per #391, the comparison for the decrement step can have some rounding issues.
      var stepDecimals = scope_Spectrum.countStepDecimals();
      // Round per #391
      if (increment !== null && increment !== false) {
        increment = Number(increment.toFixed(stepDecimals));
      }
      if (decrement !== null && decrement !== false) {
        decrement = Number(decrement.toFixed(stepDecimals));
      }
      return [decrement, increment];
    }
    // Get the current step size for the slider.
    function getNextSteps() {
      return scope_HandleNumbers.map(getNextStepsForHandle);
    }
    // Updatable: margin, limit, padding, step, range, animate, snap
    function updateOptions(optionsToUpdate, fireSetEvent) {
      // Spectrum is created using the range, snap, direction and step options.
      // 'snap' and 'step' can be updated.
      // If 'snap' and 'step' are not passed, they should remain unchanged.
      var v = valueGet();
      var updateAble = [
        "margin",
        "limit",
        "padding",
        "range",
        "animate",
        "snap",
        "step",
        "format",
        "pips",
        "tooltips",
      ];
      // Only change options that we're actually passed to update.
      updateAble.forEach(function (name) {
        // Check for undefined. null removes the value.
        if (optionsToUpdate[name] !== undefined) {
          originalOptions[name] = optionsToUpdate[name];
        }
      });
      var newOptions = testOptions(originalOptions);
      // Load new options into the slider state
      updateAble.forEach(function (name) {
        if (optionsToUpdate[name] !== undefined) {
          options[name] = newOptions[name];
        }
      });
      scope_Spectrum = newOptions.spectrum;
      // Limit, margin and padding depend on the spectrum but are stored outside of it. (#677)
      options.margin = newOptions.margin;
      options.limit = newOptions.limit;
      options.padding = newOptions.padding;
      // Update pips, removes existing.
      if (options.pips) {
        pips(options.pips);
      } else {
        removePips();
      }
      // Update tooltips, removes existing.
      if (options.tooltips) {
        tooltips();
      } else {
        removeTooltips();
      }
      // Invalidate the current positioning so valueSet forces an update.
      scope_Locations = [];
      valueSet(
        isSet(optionsToUpdate.start) ? optionsToUpdate.start : v,
        fireSetEvent
      );
    }
    // Initialization steps
    function setupSlider() {
      // Create the base element, initialize HTML and set classes.
      // Add handles and connect elements.
      scope_Base = addSlider(scope_Target);
      addElements(options.connect, scope_Base);
      // Attach user events.
      bindSliderEvents(options.events);
      // Use the public value method to set the start values.
      valueSet(options.start);
      if (options.pips) {
        pips(options.pips);
      }
      if (options.tooltips) {
        tooltips();
      }
      aria();
    }
    setupSlider();
    var scope_Self = {
      destroy: destroy,
      steps: getNextSteps,
      on: bindEvent,
      off: removeEvent,
      get: valueGet,
      set: valueSet,
      setHandle: valueSetHandle,
      reset: valueReset,
      disable: disable,
      enable: enable,
      // Exposed for unit testing, don't use this in your application.
      __moveHandles: function (upward, proposal, handleNumbers) {
        moveHandles(upward, proposal, scope_Locations, handleNumbers);
      },
      options: originalOptions,
      updateOptions: updateOptions,
      target: scope_Target,
      removePips: removePips,
      removeTooltips: removeTooltips,
      getPositions: function () {
        return scope_Locations.slice();
      },
      getTooltips: function () {
        return scope_Tooltips;
      },
      getOrigins: function () {
        return scope_Handles;
      },
      pips: pips, // Issue #594
    };
    return scope_Self;
  }
  // Run the standard initializer
  function initialize(target, originalOptions) {
    if (!target || !target.nodeName) {
      throw new Error(
        "noUiSlider: create requires a single element, got: " + target
      );
    }
    // Throw an error if the slider was already initialized.
    if (target.noUiSlider) {
      throw new Error("noUiSlider: Slider was already initialized.");
    }
    // Test the options and create the slider environment;
    var options = testOptions(originalOptions);
    var api = scope(target, options, originalOptions);
    target.noUiSlider = api;
    return api;
  }

  /* harmony default export */ const nouislider = {
    // Exposed for unit testing, don't use this in your application.
    __spectrum: Spectrum,
    // A reference to the default classes, allows global changes.
    // Use the cssClasses option for changes to one slider.
    cssClasses: cssClasses,
    create: initialize,
  }; // CONCATENATED MODULE: ./src/js/files/script.js

  // Подключение из node_modules

  // Модуль работы со спойлерами =======================================================================================================================================================================================================================
  /*
Для родителя слойлеров пишем атрибут data-spollers
Для заголовков слойлеров пишем атрибут data-spoller
Если нужно включать\выключать работу спойлеров на разных размерах экранов
пишем параметры ширины и типа брейкпоинта.

Например:
data-spollers="992,max" - спойлеры будут работать только на экранах меньше или равно 992px
data-spollers="768,min" - спойлеры будут работать только на экранах больше или равно 768px

Если нужно что бы в блоке открывался болько один слойлер добавляем атрибут data-one-spoller
*/
  function spollers() {
    const spollersArray = document.querySelectorAll("[data-spollers]");
    if (spollersArray.length > 0) {
      // Получение обычных слойлеров
      const spollersRegular = Array.from(spollersArray).filter(
        function (item, index, self) {
          return !item.dataset.spollers.split(",")[0];
        }
      );
      // Инициализация обычных слойлеров
      if (spollersRegular.length) {
        initSpollers(spollersRegular);
      }

      // Инициализация
      function initSpollers(spollersArray, matchMedia = false) {
        spollersArray.forEach((spollersBlock) => {
          spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
          if (matchMedia.matches || !matchMedia) {
            spollersBlock.classList.add("_spoller-init");
            initSpollerBody(spollersBlock);
            spollersBlock.addEventListener("click", setSpollerAction);
          } else {
            spollersBlock.classList.remove("_spoller-init");
            initSpollerBody(spollersBlock, false);
            spollersBlock.removeEventListener("click", setSpollerAction);
          }
        });
      }
      // Работа с контентом
      function initSpollerBody(spollersBlock, hideSpollerBody = true) {
        const spollerTitles = spollersBlock.querySelectorAll("[data-spoller]");
        if (spollerTitles.length > 0) {
          spollerTitles.forEach((spollerTitle) => {
            if (hideSpollerBody) {
              spollerTitle.removeAttribute("tabindex");
              if (!spollerTitle.classList.contains("_spoller-active")) {
                spollerTitle.nextElementSibling.hidden = true;
              }
            } else {
              spollerTitle.setAttribute("tabindex", "-1");
              spollerTitle.nextElementSibling.hidden = false;
            }
          });
        }
      }
      function setSpollerAction(e) {
        const el = e.target;
        if (el.closest("[data-spoller]")) {
          const spollerTitle = el.closest("[data-spoller]");
          const spollersBlock = spollerTitle.closest("[data-spollers]");
          const oneSpoller = spollersBlock.hasAttribute("data-one-spoller")
            ? true
            : false;
          if (!spollersBlock.querySelectorAll("._slide").length) {
            if (
              oneSpoller &&
              !spollerTitle.classList.contains("_spoller-active")
            ) {
              hideSpollersBody(spollersBlock);
            }
            spollerTitle.classList.toggle("_spoller-active");
            if (e.target.closest(".site-selection-accord__header")) {
              _slideToggle(spollerTitle.nextElementSibling, 0);
            } else {
              _slideToggle(spollerTitle.nextElementSibling, 500);
            }
          }
          e.preventDefault();
        }
      }
      function hideSpollersBody(spollersBlock) {
        const spollerActiveTitle = spollersBlock.querySelector(
          "[data-spoller]._spoller-active"
        );
        if (spollerActiveTitle) {
          spollerActiveTitle.classList.remove("_spoller-active");
          _slideUp(spollerActiveTitle.nextElementSibling, 500);
        }
      }
    }
  } // CONCATENATED MODULE: ./src/js/files/script.js

  //================================================================================================================================================================================================================================================================================================================

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

  function toggleNavigation(swiper) {
    const totalSlides = swiper.slides.length;
    const slidesPerView = swiper.params.slidesPerView;

    if (totalSlides <= slidesPerView) {
      swiper.navigation.disable();

      swiper.navigation.nextEl.hidden = true;
      swiper.navigation.prevEl.hidden = true;
    } else {
      swiper.navigation.enable();
      swiper.navigation.nextEl.hidden = false;
      swiper.navigation.prevEl.hidden = false;
    }
  }
  function initSliders() {
    bildSliders();
    // отзавы
    if (document.querySelector(".sw-review ")) {
      new Swiper(".sw-review ", {
        slidesPerView: 2,
        spaceBetween: 32,
        centeredSlides: 0,
        loop: 1,
        allowTouchMove:
          "ontouchstart" in window ||
          navigator.maxTouchPoints > 0 ||
          navigator.msMaxTouchPoints > 0,
        navigation: { nextEl: ".sw-review-next", prevEl: ".sw-review-prev" },
        pagination: {
          el: "#sw-review .swiper-pagination",
          clickable: true,
          type: "fraction",
          renderFraction: function (currentClass, totalClass) {
            return (
              '<span class="' +
              currentClass +
              '"></span>' +
              " из " +
              '<span class="' +
              totalClass +
              '"></span>'
            );
          },
        },
        breakpoints: {
          1300: { slidesPerView: 2, spaceBetween: 32 },
          1024: { slidesPerView: 2, spaceBetween: 20 },
          600: { slidesPerView: 2.5, spaceBetween: 20 },
          100: { slidesPerView: 1.5, spaceBetween: 20 },
        },
        on: {
          slideChange: function (swiper) {
            $(".moreBtn").each(function (k, elt) {
              $(elt)
                .parent()
                .find(".reviewBody")
                .removeClass("active")
                .attr("style", "");
              $(elt).html("Показать полностью");
            });
          },
        },
      });

      $(".review-box").each(function (k, elt) {
        let rvb = $(elt).find(".reviewBody")[0];
        if (rvb.scrollHeight - rvb.clientHeight > 0)
          $(elt).find(".moreBtn").addClass("active");
      });

      $(".moreBtn").on("click", function () {
        let $rvb = $(this).parent().find(".reviewBody");
        if ($rvb.hasClass("active")) {
          $rvb.removeClass("active").attr("style", "");
          $(this).html("Показать полностью");
        } else {
          $rvb
            .addClass("active")
            .attr("style", "max-height:" + $rvb[0].scrollHeight + "px");
          $(this).html("Свернуть отзыв");
        }
      });
    }
    // слайдер 'Виды скважин на воду' два слайда
    if (document.querySelector("#type-service-big__slider")) {
      const swiper = new Swiper("#type-service-big__slider", {
        slidesPerView: 2,
        spaceBetween: 20,
        speed: 300,
        autoHeight: false,
        observer: true,
        watchSlidesProgress: true,
        observeParents: true,
        navigation: {
          nextEl: ".type-service-big__nav .type-service-big__next",
          prevEl: ".type-service-big__nav .type-service-big__prev",
        },
        breakpoints: {
          319.98: {
            slidesPerView: 1.3,
            spaceBetween: 15,
          },
          429.98: {
            slidesPerView: 1.3,
            spaceBetween: 15,
          },

          767.98: {
            autoplay: false,
            spaceBetween: 15,

            slidesPerView: 1.4,
          },
          1023.98: {
            slidesPerView: 2,
            spaceBetween: 30,
            autoplay: false,
          },
        },
        on: {
          init: function () {
            toggleNavigation(this);
          },
          resize: function () {
            toggleNavigation(this);
          },
        },
      });
    }
    if (document.querySelector("#type-service-big__slider_other")) {
      const swiper = new Swiper("#type-service-big__slider_other", {
        slidesPerView: 2,
        spaceBetween: 20,
        speed: 300,
        autoHeight: false,
        observer: true,
        watchSlidesProgress: true,
        observeParents: true,
        navigation: {
          nextEl: ".type-service-big__nav #type-service-big__next_other",
          prevEl: ".type-service-big__nav #type-service-big__prev_other",
        },
        breakpoints: {
          319.98: {
            slidesPerView: 1.3,
            spaceBetween: 15,
          },
          429.98: {
            slidesPerView: 1.3,
            spaceBetween: 15,
          },

          767.98: {
            autoplay: false,
            spaceBetween: 15,

            slidesPerView: 1.4,
          },
          1023.98: {
            slidesPerView: 2,
            spaceBetween: 30,
            autoplay: false,
          },
        },
        on: {
          init: function () {
            toggleNavigation(this);
          },
          resize: function () {
            toggleNavigation(this);
          },
        },
      });
    }
    // каток "Индивидуальный ледяной каток у вашего дома"
    if (document.querySelector(".advantages-katok__slider")) {
      new Swiper(".advantages-katok__slider", {
        breakpoints: {
          320: {
            slidesPerView: 1.28,
            spaceBetween: 16,
          },
          768: {
            spaceBetween: 16,
          },
          1023.98: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
        },

        on: {},
      });
    }
    // каток "Дополнительные услуги  для вашего катка"
    if (document.querySelector(".slider-services-katok__slider")) {
      new Swiper(".slider-services-katok__slider", {
        breakpoints: {
          320: {
            slidesPerView: 1.28,
            spaceBetween: 16,
          },
          768: {
            spaceBetween: 16,
            slidesPerView: 2.5,
          },
          1023.98: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
          1279.98: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
        },

        on: {},
      });
    }

    // За что нас ценят "партнеры"
    if (document.querySelector(".our-advantages__slider")) {
      new Swiper(".our-advantages__slider", {
        breakpoints: {
          320: {
            slidesPerView: 1.5,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
        },

        on: {},
      });
    }
    // освещение квиз на первом шаге
    if (document.querySelector(".form-qwiz__slider")) {
      new Swiper(".form-qwiz__slider", {
        watchSlidesProgress: true,
        observer: true,
        observeParents: true,

        breakpoints: {
          320: {
            slidesPerView: 2.2,
            spaceBetween: 16,
          },
          768: {
            spaceBetween: 0,
            slidesPerView: 0,
          },
        },

        on: {},
      });
    }
    // освещение примеры
    if (document.querySelector(".slider-type__slider")) {
      new Swiper(".slider-type__slider", {
        navigation: {
          nextEl: ".slider-type__nav .slider-type__next",
          prevEl: ".slider-type__nav .slider-type__prev",
        },
        breakpoints: {
          320: {
            slidesPerView: 1.2,
            spaceBetween: 16,
          },
          768: {
            spaceBetween: 16,
            slidesPerView: 1.2,
          },
          1023.98: {
            slidesPerView: 1,
            spaceBetween: 24,
          },
          1279.98: {
            slidesPerView: 1,
            spaceBetween: 40,
          },
        },

        on: {},
      });
    }
    // освещение виды
    if (document.querySelector(".slider-services-katok__slider")) {
      new Swiper(".slider-services-katok__slider", {
        // Arrows
        navigation: {
          nextEl: ".slider-services-katok__nav .slider-services-katok__next",
          prevEl: ".slider-services-katok__nav .slider-services-katok__prev",
        },
        breakpoints: {
          320: {
            slidesPerView: 1.28,
            spaceBetween: 16,
          },
          768: {
            spaceBetween: 16,
            slidesPerView: 2.5,
          },
          1023.98: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
          1279.98: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
        },

        on: {},
      });
    }
    // Как выглядит сотрудничество с нами "партнеры"
    if (document.querySelector(".cooperation__slider")) {
      new Swiper(".cooperation__slider", {
        breakpoints: {
          320: {
            slidesPerView: 1.5,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
        },

        on: {},
      });
    }
    // С нами уже работают "партнеры"
    if (document.querySelector(".our-partners__slider")) {
      new Swiper(".our-partners__slider", {
        breakpoints: {
          320: {
            slidesPerView: 1.5,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2.3,
            spaceBetween: 20,
          },
        },

        on: {},
      });
    }
    if (document.querySelector(".slider-type-service__slider")) {
      const swiper = new Swiper(".slider-type-service__slider", {
        slidesPerView: 1,
        spaceBetween: 30,
        speed: 300,

        observer: true,
        watchSlidesProgress: true,
        observeParents: true,
        autoHeight: true,
        navigation: {
          nextEl: ".slider-type-service__nav .slider-type-service__next",
          prevEl: ".slider-type-service__nav .slider-type-service__prev",
        },
        breakpoints: {
          319.98: {
            slidesPerView: 1.15,
            spaceBetween: 15,
            autoHeight: false,
          },

          767.98: {
            slidesPerView: 1.5,
            spaceBetween: 15,
            autoHeight: false,
          },
          1023.98: {
            slidesPerView: 1,
            spaceBetween: 30,
            autoHeight: true,
          },
        },
        on: {},
      });
      swiper.on("slideChange", function () {
        isShowOneCard(190, ".slider-type-service__sm-content ");
      });
    }
    // слайдер 'Галерея наших работ'
    if (document.querySelector(".carousel-gallery__slider")) {
      new Swiper(".carousel-gallery__slider", {
        slidesPerView: 4.5,
        spaceBetween: 15,
        speed: 300,
        autoHeight: false,
        observer: true,
        watchSlidesProgress: true,
        observeParents: true,

        navigation: {
          nextEl: ".carousel-gallery__nav .carousel-gallery__next",
          prevEl: ".carousel-gallery__nav .carousel-gallery__prev",
        },
        breakpoints: {
          319.98: {
            slidesPerView: 1.3,
            spaceBetween: 10,
          },
          429.98: {
            slidesPerView: 1.5,
            spaceBetween: 10,
          },
          529.98: {
            slidesPerView: 2.5,
            spaceBetween: 10,
          },
          767.98: {
            slidesPerView: 3.2,
            spaceBetween: 10,
          },
          1023.98: {
            slidesPerView: 3.5,
            spaceBetween: 15,
          },
          1279.98: {
            slidesPerView: 4.5,
            spaceBetween: 15,
          },
        },
        on: {},
      });
    }
    // слайдер внутри карточек полулярные услгуи или виды услуг, галлерея
    // const insideSliderAll = document.querySelectorAll(".inside-slider__slider");

    // if (insideSliderAll) {
    //   insideSliderAll.forEach((element) => {
    //     element.classList.forEach((elClass) => {
    //       if (elClass.startsWith("inside-slider__slider_")) {
    //         element.classList.remove(elClass);
    //       }
    //     });
    //   });

    //   insideSliderAll.forEach((slider, indx) => {
    //     slider.classList.add(`inside-slider__slider_${indx + 1}`);

    //     if (document.querySelector(`.inside-slider__slider_${indx + 1}`)) {
    //       const swiper = new Swiper(`.inside-slider__slider_${indx + 1}`, {
    //         slidesPerView: 1,
    //         spaceBetween: 20,
    //         speed: 300,
    //         autoHeight: false,

    //         effect: "fade",
    //         observer: true,
    //         observeParents: true,
    //         pagination: {
    //           el: ".inside-slider__pagination ",
    //           clickable: true,
    //         },
    //         breakpoints: {
    //           319.98: { loop: true },
    //           429.98: {
    //             spaceBetween: 0,
    //           },
    //           1023.98: {
    //             loop: false,
    //           },
    //         },
    //         on: {},
    //       });

    //       const paginationSelector = slider.querySelector(
    //         ".inside-slider__pagination"
    //       );

    //       paginationSelector.classList.add(`inside-slider__pagination_${indx}`);

    //       const bullets = slider.querySelectorAll(
    //         `.inside-slider__pagination_${indx} span`
    //       );

    //       bullets.forEach((pagination, i) => {
    //         pagination.addEventListener("mouseover", (event) => {
    //           swiper.slideTo(i, 300, true);
    //         });
    //       });
    //     }
    //   });
    // }

    // ========================================================================================================================================================================================================================
    const insideSliderAll = document.querySelectorAll(".inside-slider__slider");

    if (insideSliderAll) {
      insideSliderAll.forEach((element, indx) => {
        const navSlider = element.querySelector(".inside-slider__nav");
        if (navSlider) {
          navSlider.classList.add(`inside-slider__nav_${indx}`);
        }
        element.classList.forEach((elClass) => {
          if (elClass.startsWith("inside-slider__slider_")) {
            element.classList.remove(elClass);
          }
        });
      });
      insideSliderAll.forEach((slider, indx) => {
        slider.classList.add(`inside-slider__slider_${indx}`);

        if (document.querySelector(`.inside-slider__slider_${indx}`)) {
          const swiper = new Swiper(`.inside-slider__slider_${indx}`, {
            slidesPerView: 1,
            spaceBetween: 20,
            speed: 300,
            autoHeight: false,

            navigation: {
              nextEl: `.inside-slider__nav_${indx} .inside-slider__next`,
              prevEl: `.inside-slider__nav_${indx} .inside-slider__prev`,
            },
            effect: "fade",
            observer: true,
            observeParents: true,
            pagination: {
              el: ".inside-slider__pagination ",
              clickable: true,
            },
            breakpoints: {
              319.98: { loop: true },
              429.98: {
                spaceBetween: 0,
                loop: true,
              },
              1023.98: {
                loop: false,
              },
            },
            on: {},
          });

          const paginationSelector = slider.querySelector(
            ".inside-slider__pagination"
          );

          paginationSelector.classList.add(`inside-slider__pagination_${indx}`);

          const bullets = slider.querySelectorAll(
            `.inside-slider__pagination_${indx} span`
          );

          bullets.forEach((pagination, i) => {
            pagination.addEventListener("mouseover", (event) => {
              swiper.slideTo(i, 300, true);
            });
          });
        }
      });
    }
    // слайдер 'Популярные услуги'
    if (document.querySelector(".popolar-services__slider")) {
      new Swiper(".popolar-services__slider", {
        slidesPerView: 3,
        spaceBetween: 30,
        speed: 300,
        autoHeight: false,
        observer: true,
        watchSlidesProgress: true,
        observeParents: true,
        navigation: {
          nextEl: ".popolar-services__nav .popolar-services__next",
          prevEl: ".popolar-services__nav .popolar-services__prev",
        },
        breakpoints: {
          319.98: {
            slidesPerView: 1.15,
            spaceBetween: 15,
          },

          767.98: {
            slidesPerView: 1.7,
            spaceBetween: 15,
          },
          1023.98: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        },
        on: {
          init: function () {
            toggleNavigation(this);
          },
          resize: function () {
            toggleNavigation(this);
          },
        },
      });
    }
    // слайдер 'Септики, с которыми мы работаем' сервис
    if (window.innerWidth < 767.98) {
      if (document.querySelector(".slider-septic__slider")) {
        new Swiper(".slider-septic__slider", {
          slidesPerView: 3,
          spaceBetween: 30,
          speed: 300,
          autoHeight: false,
          observer: true,
          watchSlidesProgress: true,
          observeParents: true,

          breakpoints: {
            319.98: {
              slidesPerView: 1.3,
              spaceBetween: 15,
            },

            767.98: {},
          },
          on: {},
        });
      }
    }
    // слайдер со сторис попап
    if (document.querySelector(".stories__wrapper")) {
      document.querySelectorAll(".stories__wrapper").forEach((slider) => {
        new Swiper(slider.querySelector(".swiper:not(.swiper-initialized)"), {
          loop: false,
          allowTouchMove: false,
          breakpoints: {
            319.98: { allowTouchMove: true, slidesPerView: 1.2 },
            429.98: { slidesPerView: 1.2, allowTouchMove: false },
            1023.98: {
              slidesPerView: 1,
            },
            320: {
              // allowTouchMove: true,
            },
            577: {
              // allowTouchMove: false,
            },
          },

          pagination: {
            el: ".swiper-pagination",
            type: "fraction",
            renderFraction: function (currentClass, totalClass) {
              return (
                `<span class="${currentClass}"></span>` +
                " из " +
                `<span class="${totalClass}"></span>`
              );
            },
          },

          navigation: {
            nextEl: slider.querySelector(".stories__nav-btn.next"),
            prevEl: slider.querySelector(".stories__nav-btn.prev"),
          },
        });
      });

      function videoModal() {
        const linksList = document.querySelectorAll(".stories__link");

        const modal = document.querySelector(".video-modal");
        const btnClose = document.querySelector(".video-modal__close");
        const player = document.querySelector(".video-block__player");

        const btnSound = document.querySelector(".video-modal__sound");
        const iconMute = document.querySelector(".video-modal__icon-muted");
        const iconLoud = document.querySelector(".video-modal__icon-loud");

        const btnPlayPause = document.querySelector(".video-block__button");
        const playerLineProgress = document.querySelector(
          ".video-modal__navigation-line-progress"
        );

        function toggleClassOpen() {
          modal.classList.toggle("open");
        }

        function addSrcVideo(srcVideo) {
          player.src = srcVideo;
        }

        function playVideo() {
          player.play();
        }

        function stopVideo() {
          player.pause();
        }

        function updatelLoading() {
          const percent = (player.currentTime / player.duration) * 100;
          playerLineProgress.style.flexBasis = `${percent}%`;
        }

        function openModal() {
          let srcVideo = this.dataset.video;

          toggleClassOpen();
          addSrcVideo(srcVideo);
          playVideo();
        }

        function closeModal() {
          stopVideo();
          OffSound();
          player.currentTime = 0;
          playerLineProgress.style.flexBasis = `0%`;
          toggleClassOpen();
        }

        function toggleSound() {
          if (player.muted === true) {
            player.muted = false;
            iconMute.style.display = "none";
            iconLoud.style.display = "block";
          } else {
            player.muted = true;
            iconMute.style.display = "block";
            iconLoud.style.display = "none";
          }
        }

        function OffSound() {
          player.muted = true;
          iconMute.style.display = "block";
          iconLoud.style.display = "none";
        }

        linksList.forEach((link) => link.addEventListener("click", openModal));
        player.addEventListener("timeupdate", updatelLoading);
        btnClose.addEventListener("click", closeModal);
        btnSound.addEventListener("click", toggleSound);
        player.addEventListener("ended", closeModal);

        btnPlayPause.addEventListener("mousedown", stopVideo);
        btnPlayPause.addEventListener("touchstart", stopVideo);

        btnPlayPause.addEventListener("mouseup", playVideo);
        btnPlayPause.addEventListener("touchend", playVideo);

        document.addEventListener("keydown", (event) => {
          if (event.code == "Space" && modal.classList.contains("open")) {
            player.paused !== true
              ? stopVideo()
              : playVideo(); /*Остановка/воспроизведение видео при нажатии клавиши пробел*/
          }
        });

        document.addEventListener("keydown", (event) => {
          if (event.code == "Escape" && modal.classList.contains("open"))
            closeModal(); /*Закрытие модалки и сотановка видео при нажатии клавиши Esc*/
        });
      }
      videoModal();
    }
    // слайдер со сторис
    if (document.querySelector("#slider-stories")) {
      const swiper = new Swiper("#slider-stories", {
        slidesPerView: 1,
        spaceBetween: 15,
        speed: 300,
        autoHeight: false,
        watchSlidesProgress: true,
        observer: true,
        watchSlidesProgress: true,
        observeParents: true,
        navigation: {
          nextEl: ".stories__nav .stories__next",
          prevEl: ".stories__nav .stories__prev",
        },
        breakpoints: {
          319.98: { slidesPerView: 1.2 },

          1023.98: {
            slidesPerView: 1,
          },
        },
        on: {},
      });
      swiper.on("slideChange", function () {
        isShowOneCard(66, ".stories__sh-content");
      });
    }
    // слайдер 'Какие услуги мы предлагаем'
    if (document.querySelector(".offer-services__slider")) {
      new Swiper(".offer-services__slider", {
        slidesPerView: 3,
        spaceBetween: 15,
        speed: 300,
        autoHeight: false,
        observer: true,
        watchSlidesProgress: true,
        observeParents: true,
        breakpoints: {
          319.98: {
            slidesPerView: 1.15,
          },
          429.98: {
            slidesPerView: 1.17,
            spaceBetween: 15,
          },
        },
        on: {},
      });
    }

    // слайдер 'Какие услуги мы предлагаем'
    if (document.querySelector(".offer-services__slider")) {
      new Swiper(".offer-services__slider", {
        slidesPerView: 3,
        spaceBetween: 15,
        speed: 300,
        autoHeight: false,

        breakpoints: {
          319.98: {
            slidesPerView: 1.15,
          },
          429.98: {
            slidesPerView: 1.17,
            spaceBetween: 15,
          },
        },
        on: {},
      });
    }
    // слайдер 'Этапы работ по благоустройству'
    if (document.querySelector(".stages-work__slider")) {
      const swiper = new Swiper(".stages-work__slider", {
        slidesPerView: 3,
        spaceBetween: 30,
        speed: 300,
        autoHeight: false,
        navigation: {
          nextEl: ".stages-work__nav .stages-work__next",
          prevEl: ".stages-work__nav .stages-work__prev",
        },
        breakpoints: {
          319.98: {
            slidesPerView: 1.3,
          },
          429.98: {
            slidesPerView: 1.3,
            spaceBetween: 15,
          },

          767.98: {
            autoplay: false,
            slidesPerView: 2.2,
            spaceBetween: 15,
          },
          1023.98: {
            slidesPerView: 3,
            spaceBetween: 20,
            autoplay: false,
          },
        },
        on: {},
      });
    }
    // слайдер 'Виды скважин на воду' три слайда
    if (document.querySelector("#types-wells__slider-one")) {
      const swiper = new Swiper("#types-wells__slider-one", {
        observer: true,
        watchSlidesProgress: true,
        observeParents: true,
        slidesPerView: 3,
        spaceBetween: 20,
        speed: 300,
        autoHeight: false,

        breakpoints: {
          319.98: {
            slidesPerView: 1.3,
            spaceBetween: 15,
          },
          429.98: {
            slidesPerView: 1.3,
            spaceBetween: 10,
          },

          767.98: {
            autoplay: false,
            slidesPerView: 1.6,
          },
          1023.98: {
            slidesPerView: 2.2,
            spaceBetween: 20,
            autoplay: false,
          },
          1279.98: {
            slidesPerView: 3,
            spaceBetween: 20,
            autoplay: false,
          },
        },
        on: {},
      });
      swiper.on("slideChange", function () {
        isShowOneCard(0, ".types-wells__content");
      });
    }

    // слайдер 'Популярные модели скважины '

    if (document.querySelector(".popular-models-obsrtv__slider")) {
      new Swiper(".popular-models-obsrtv__slider", {
        slidesPerView: 1,
        spaceBetween: 0,
        speed: 300,

        loop: false,
        navigation: {
          nextEl: ".popular-models__nav .popular-models__next",
          prevEl: ".popular-models__nav .popular-models__prev",
        },
        breakpoints: {
          320: {
            slidesPerView: 1.2,
            centeredSlides: false,
          },
          374.98: {
            slidesPerView: 1.4,
            // centeredSlides: true,
          },

          768: {
            centeredSlides: false,
            slidesPerView: 2.5,
          },
          1024: { slidesPerView: 3 },
          1280: {
            slidesPerView: 4,
            initialSlide: 0,
          },
        },
        on: {},
      });
    }
    // слайдер 'Виды обустройства скважины под ключ'
    if (document.querySelector(".types-arrangement__slider")) {
      new Swiper(".types-arrangement__slider", {
        observer: true,
        watchSlidesProgress: true,
        observeParents: true,
        slidesPerView: 2,
        spaceBetween: 20,
        speed: 300,
        autoHeight: false,

        breakpoints: {
          319.98: {
            slidesPerView: 1.2,
            spaceBetween: 15,
          },
          429.98: {
            slidesPerView: 1.2,
            spaceBetween: 10,
          },
          529.98: {
            slidesPerView: 1.6,
            spaceBetween: 10,
          },
          767.98: {
            autoplay: false,
            slidesPerView: 2.1,
          },
          1023.98: {
            slidesPerView: 3,
            spaceBetween: 20,
            autoplay: false,
          },
          1279.98: {
            slidesPerView: 3,
            spaceBetween: 20,
            autoplay: false,
          },
        },
        on: {},
      });
    }
    // слайдер 'Выполненные работы'
    if (document.querySelector(".completed-work__slider")) {
      new Swiper(".completed-work__slider", {
        observer: true,
        observeParents: true,
        slidesPerView: 2,
        spaceBetween: 30,
        speed: 300,

        navigation: {
          nextEl: ".completed-work__nav .completed-work__next",
          prevEl: ".completed-work__nav .completed-work__prev",
        },
        breakpoints: {
          320: {
            slidesPerView: 1.2,
            spaceBetween: 15,
          },
          430: {
            slidesPerView: 1.3,
            spaceBetween: 15,
          },
          768: { slidesPerView: 1, spaceBetween: 30 },
          1023.98: {
            slidesPerView: 1,
          },
          1279.98: {
            slidesPerView: 2,
          },
        },
        on: {},
      });
    }
    // слайдер 'Бренды септиков'
    if (document.querySelector(".brand-carusel__slider")) {
      const swiper = new Swiper(".brand-carusel__slider", {
        observer: true,
        watchSlidesProgress: true,
        observeParents: true,
        slidesPerView: 3,
        spaceBetween: 30,
        speed: 300,
        autoHeight: false,
        navigation: {
          nextEl: ".brand-carusel__nav .brand-carusel__next",
          prevEl: ".brand-carusel__nav .brand-carusel__prev",
        },
        breakpoints: {
          319.98: {
            slidesPerView: 1.3,
            spaceBetween: 15,
          },

          767.98: {
            autoplay: false,
            slidesPerView: 2.2,
          },
          1023.98: {
            slidesPerView: 3,
            spaceBetween: 20,
            autoplay: false,
          },
          1279.98: {
            slidesPerView: 3,
            spaceBetween: 20,
            autoplay: false,
          },
        },
        on: {
          init: function () {
            toggleNavigation(this);
          },
          resize: function () {
            toggleNavigation(this);
          },
        },
      });

      swiper.on("slideChange", function () {
        isShowOneCard(0, ".brand-carusel__content");
      });
    }
    // слайдер 'Популярные модели септиков'
    if (document.querySelector(".popular-models__slider")) {
      let pop = new Swiper(".popular-models__slider", {
        watchSlidesProgress: true,
        slidesPerView: 4,
        spaceBetween: 0,
        speed: 300,

        loop: false,
        navigation: {
          nextEl: ".popular-models__nav .popular-models__next",
          prevEl: ".popular-models__nav .popular-models__prev",
        },
        breakpoints: {
          320: {
            slidesPerView: 1.2,
          },
          374.98: {
            slidesPerView: 1.4,
          },

          768: {
            slidesPerView: 2.5,
          },
          1024: { slidesPerView: 3 },
          1280: {
            slidesPerView: 4,
            initialSlide: 0,
          },
        },
        on: {},
      });
    }
    // слайдер телеграм
    if (document.querySelector(".submitted__slider-post")) {
      new Swiper(".submitted__slider-post", {
        observer: true,
        observeParents: true,
        slidesPerView: 3,
        spaceBetween: 30,
        autoHeight: false,
        speed: 300,

        navigation: {
          nextEl: ".submitted__nav .submitted__next",
          prevEl: ".submitted__nav .submitted__prev",
        },
        breakpoints: {
          320: {
            slidesPerView: 1.4,
            spaceBetween: 15,
          },
          430: { slidesPerView: 1.4, spaceBetween: 15 },
          768: {
            slidesPerView: "2.5",
          },
          1023.98: {
            spaceBetween: 30,
            slidesPerView: "3",
          },
        },

        on: {},
      });
    }
    // слайдер youtube
    if (document.querySelector("#slider-video")) {
      new Swiper("#slider-video", {
        observer: true,
        observeParents: true,
        slidesPerView: "2",
        spaceBetween: 30,
        autoHeight: false,
        speed: 300,

        // Arrows
        navigation: {
          nextEl: ".submitted__youtube-nav .submitted__youtube-next",
          prevEl: ".submitted__youtube-nav .submitted__youtube-prev",
        },
        breakpoints: {
          320: {
            slidesPerView: 1.5,
            spaceBetween: 15,
          },
          430: {
            centeredSlides: false,
            slidesPerView: 1.6,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 2.5,
            centeredSlides: false,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        },

        on: {},
      });
    }

    // слайдер журнал
    if (document.querySelector("#magazine-slide")) {
      new Swiper("#magazine-slide", {
        observer: true,
        observeParents: true,
        slidesPerView: 3,
        speed: 300,
        navigation: {
          nextEl: ".submitted__magazine-nav .submitted__magazine-next",
          prevEl: ".submitted__magazine-nav .submitted__magazine-prev",
        },
        breakpoints: {
          320: {
            slidesPerView: 1.3,
            spaceBetween: 15,
          },
          430: {
            centeredSlides: false,
            slidesPerView: 1.6,
            spaceBetween: 20,
          },
          768: { slidesPerView: 2.5, spaceBetween: 20 },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        },

        on: {},
      });
    }
    // слайдер 'Варианты анализа воды'
    if (document.querySelector(".water-analysis__slider")) {
      new Swiper(".water-analysis__slider", {
        observer: true,
        observeParents: true,
        slidesPerView: 3,
        spaceBetween: 30,
        autoHeight: false,
        speed: 300,

        breakpoints: {
          319.98: {
            slidesPerView: 1.2,
            spaceBetween: 20,
          },

          767.98: {
            slidesPerView: 1.2,
            spaceBetween: 30,
          },
          1023.98: { slidesPerView: 2 },
        },

        on: {},
      });
    }
    // слайдер 'Что мы можем?'
    if (document.querySelector("#we-doing")) {
      new Swiper("#we-doing", {
        observer: true,
        observeParents: true,
        slidesPerView: 4,
        spaceBetween: 25,
        autoHeight: false,
        speed: 300,
        loop: true,
        autoplay: {
          delay: 3000,
        },
        // Arrows
        navigation: {
          nextEl: ".we-doing__nav .we-doing__next",
          prevEl: ".we-doing__nav .we-doing__prev",
        },

        breakpoints: {
          319.98: {
            slidesPerView: 1.1,
            spaceBetween: 15,
            loop: true,
            autoplay: {
              delay: 3000,
            },
            centeredSlides: true,
          },
          429.98: { slidesPerView: 1.1 },

          767.98: {
            slidesPerView: 2.3,
            spaceBetween: 15,
          },
          1023.98: { slidesPerView: 3, spaceBetween: 20 },
          1439.98: {
            spaceBetween: 24,
          },
        },

        on: {},
      });
    }
    // слайдер 'Примеры работ'
    if (document.querySelector("#work-examples")) {
      new Swiper("#work-examples", {
        observer: true,
        observeParents: true,
        slidesPerView: 4,
        spaceBetween: 25,
        autoHeight: false,
        speed: 300,
        loop: true,
        autoplay: {
          delay: 4000,
        },
        // Arrows
        navigation: {
          nextEl: ".work-examples__nav .work-examples__next",
          prevEl: ".work-examples__nav .work-examples__prev",
        },

        breakpoints: {
          319.98: {
            slidesPerView: 1.1,
            spaceBetween: 15,
            loop: true,
            autoplay: {
              delay: 3000,
            },
            centeredSlides: true,
          },
          429.98: { slidesPerView: 1.2 },
          529.98: { slidesPerView: 1.8 },

          767.98: {
            slidesPerView: 2.3,
            spaceBetween: 15,
          },
          1023.98: { slidesPerView: 3, spaceBetween: 20 },
          1439.98: {
            spaceBetween: 24,
          },
        },

        on: {},
      });
    }
    // слайдер 'Варианты ухода за газоном'
    if (document.querySelector(".lawn-options__slider")) {
      new Swiper(".lawn-options__slider", {
        observer: true,
        observeParents: true,
        slidesPerView: 3,
        spaceBetween: 30,
        autoHeight: false,
        speed: 300,
        pagination: {
          el: ".so-discount__pagging",
          clickable: true,
        },

        breakpoints: {
          319.98: {
            slidesPerView: 1.1,
            spaceBetween: 30,
          },
          429.98: { slidesPerView: 1.28 },

          767.98: {
            slidesPerView: 2.25,
            spaceBetween: 30,
          },
          1023.98: { slidesPerView: 3 },
        },

        on: {},
      });
    }
    // слайдер 'Как выгоднее с нами работать?'
    if (document.querySelector(".so-discount__slider")) {
      new Swiper(".so-discount__slider", {
        observer: true,
        observeParents: true,
        slidesPerView: 3,
        spaceBetween: 30,
        autoHeight: false,
        speed: 300,
        pagination: {
          el: ".so-discount__pagging",
          clickable: true,
        },

        breakpoints: {
          319.98: {
            slidesPerView: 1.1,
            spaceBetween: 30,
          },
          429.98: { slidesPerView: 1.28 },

          767.98: {
            slidesPerView: 2.25,
            spaceBetween: 30,
          },
          1023.98: { slidesPerView: 3 },
        },

        on: {},
      });
    }
    // слайдер c sewera
    if (
      document.querySelector(".banner-gallery__slider:not(.swiper-initialized)")
    ) {
      new Swiper(".banner-gallery__slider:not(.swiper-initialized)", {
        observer: true,
        observeParents: true,
        slidesPerView: 1,
        spaceBetween: 0,
        autoHeight: false,
        speed: 300,
        autoplay: {
          delay: 3000,
        },
        loop: true,
        navigation: {
          prevEl: ".banner-gallery__navigation .banner-gallery__btn_prev",
          nextEl: ".banner-gallery__navigation .banner-gallery__btn_next",
        },
        pagination: {
          el: ".banner-gallery__pagination",
          clickable: true,
        },

        breakpoints: {},

        on: {},
      });
    }
    // слайдер "Цена бурения скважины на песок"
    if (document.querySelector(".drilling-price__slider")) {
      new Swiper(".drilling-price__slider", {
        observer: true,
        observeParents: true,
        slidesPerView: 2,
        spaceBetween: 30,
        autoHeight: false,
        speed: 300,

        breakpoints: {
          319.98: {
            slidesPerView: 1.1,
            spaceBetween: 15,
          },
          429.98: { slidesPerView: 1.3 },

          767.98: {
            slidesPerView: 1.5,
            spaceBetween: 15,
          },
          1023.98: { slidesPerView: 2 },
        },

        on: {},
      });
    }
  }
  function createPaginationBullet() {
    const paginationll = document.querySelectorAll(
      ".inside-slider__pagination"
    );

    if (paginationll.length !== 0) {
      paginationll.forEach((el) => {
        if (el.children.length === 1) {
          el.hidden = true;
          return;
        }
        let sum = 100 / +el.children.length;

        Array.from(el.children).forEach((bullet) => {
          bullet.style.flex = `0 1 ${sum}%`;
        });
      });
    }
  }
  initSliders();
  createPaginationBullet();

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
  /* инициализация карты */

  function initMap() {
    const cityList = [
      {
        city: "москва",
        center: [55.73, 37.6],
        zoom: 8,
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
    ];

    const tabsMap = document.querySelectorAll("button[data-city-map]");
    const btnTabs = document.querySelector(
      "nav[data-tabs-titles].ya-map__navigation"
    );
    switchTabClass();
    if (document.getElementById("map")) {
      var myMap = new ymaps.Map(
        "map",
        {
          center: cityList[0].center,
          zoom: 8,
        },
        {
          searchControlProvider: "yandex#search",
        }
      );

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
          myMap.geoObjects.add(new ymaps.Placemark(objCity.center, {}));
          element.addEventListener("click", (e) => {
            myMap.setCenter(objCity.center, objCity.zoom);
          });
        });
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
      }
      if (!btnTabs && tabsMap.length === 0) {
        myMap.geoObjects.add(new ymaps.Placemark([55.73, 37.6], {}));
        let myPolygon = new ymaps.Polygon(
          [
            [
              [54.80831947994278, 38.18433433925412],
              [54.87945876925923, 38.52995859405644],
              [55.122011885673516, 38.67767483903884],
              [55.37773639221365, 38.95005546337981],
              [55.69101620830514, 39.06854923170738],
              [55.962220037403114, 39.09331426601756],
              [56.118493229997256, 38.83962697728742],
              [56.38328535103986, 38.538312268742686],
              [56.72694946754399, 38.84094055277811],
              [56.54218234666476, 37.45911829335503],
              [56.484269925944716, 36.55340126947627],
              [56.082994973012944, 35.26044765213379],
              [55.528582146509564, 35.79574540554199],
              [54.886906159423376, 36.2751232506904],
              [54.80831947994278, 38.18433433925412],
            ],
          ],
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
      }

      // myMap.controls.remove('zoomControl'); // удаляем контрол зуммирования
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

  // ===================================================================
  /* кнопка инфо  Модификации */
  function tabModificationModel() {
    const infoModelBtn = document.querySelectorAll(".card-product__info-btn");
    if (infoModelBtn) {
      //  кнопка "Модификации:" подсказка
      infoModelBtn.forEach((element) => {
        // полуялоныe модели
        element.addEventListener("click", function (e) {
          element.classList.toggle("_show");
        });
        document.addEventListener("click", (e) => {
          let target = e.target;

          if (element.contains(target)) return;
          if (!element.firstChild.contains(target)) {
            element.classList.remove("_show");
          }
        });
      });
    }

    const slidesModel = document.querySelector(".popular-models__swiper");
    if (slidesModel) {
      slidesModel.addEventListener("click", function (e) {
        let target = e.target;
        selectTab(target, ".card-product__top-btn");
        selectTab(target, ".card-product__bottom-btn");

        const slideModel = document.querySelectorAll(".popular-models__slide");

        if (target.closest("[data-slide-id]")) {
          let actvSlide = target.closest("[data-slide-id]").dataset.slideId;

          const nameModel = slideModel[actvSlide].querySelector(
            ".card-product__name"
          );
          const listModel = slideModel[actvSlide].querySelectorAll(
            ".card-product__list li"
          );
          const priceModel = slideModel[actvSlide].querySelector(
            ".card-product__current-price"
          );
          const discModel = slideModel[actvSlide].querySelector(
            ".card-product__discount-price"
          );
          const butBtnModel =
            slideModel[actvSlide].querySelector(".card-product__btn");

          const imgModel = slideModel[actvSlide].querySelector(
            ".card-product__img img"
          );
          const topBtn = slideModel[actvSlide].querySelector(
            ".card-product__top-btns"
          );
          const bottomBtn = slideModel[actvSlide].querySelector(
            ".card-product__bottom-btns"
          );
          // Верхняя кнопка модифкаций "превая"
          if (target.closest("[data-top-sm]")) {
            let objPropModif;

            if (target.hasAttribute("data-top-sm")) {
              objPropModif = Object.assign(
                target.closest("[data-top-sm]").dataset
              );
            }

            if (bottomBtn) {
              objPropModif = searchActiveBtn(topBtn, bottomBtn);
            }

            editPropModel(objPropModif);
          }
          // Верхняя кнопка модифкаций "второя"
          if (target.closest("[data-top-pr]")) {
            let objPropModif;

            // если нет нижних кнопок модификации срабатывает вот этот код
            if (target.hasAttribute("data-top-pr")) {
              objPropModif = Object.assign(
                target.closest("[data-top-pr]").dataset
              );
            }
            // если есть нижних кнопок модификации срабатывает вот этот код
            if (bottomBtn) {
              objPropModif = searchActiveBtn(topBtn, bottomBtn);
            }

            editPropModel(objPropModif);
          }
          //нижние кнопеи модифкации
          if (target.closest("[data-bottom-btn]")) {
            let objPropModif = searchActiveBtn(topBtn, bottomBtn);

            editPropModel(objPropModif);
          }

          /* поиск активного  класса в topBtn */
          function searchActiveBtn(selectorTopBtn, selectorBottomBtn = "") {
            let objData;
            let topKey;

            Array.from(selectorTopBtn.children).forEach((el) => {
              if (el.closest("._active-btn")) {
                topKey = Object.keys(el.dataset)[0];
              }
            });

            if (selectorBottomBtn) {
              Array.from(selectorBottomBtn.children).forEach((el) => {
                if (el.closest("._active-btn")) {
                  objData = el.dataset;
                }
              });
            }

            return getDataBottomProp(topKey, objData);
          }
          // собираем обьект из data атрибутов
          function getDataBottomProp(keyValue, obj) {
            let newObj = {};

            for (const key in obj) {
              if (Object.hasOwnProperty.call(obj, key)) {
                const element = obj[key];
                if (element) {
                  let propData = element.split("|");
                  // если свойства одиноковое до обоих моделий
                  if (propData.length == 1) {
                    newObj[key] = propData[0];
                    continue;
                  }
                  propData = keyValue === "topSm" ? propData[0] : propData[1];

                  newObj[key] = propData;
                }
              }
            }

            return newObj;
          }
          function editPropModel(objPropModif) {
            // меняем ссылку на Название модели

            nameModel.setAttribute(
              "href",
              `https://sewera.ru/products/${objPropModif.link}`
            );
            // меняем ссылку на блок с картинкой link
            slideModel[actvSlide]
              .querySelector(".card-product__top")
              .setAttribute(
                "href",
                `https://sewera.ru/products/${objPropModif.link}`
              );

            // Меняем картинку в модели img
            if (objPropModif.img) {
              createImgSrc(imgModel, objPropModif.img);
            }

            // Название модели name
            nameModel.innerHTML = objPropModif.name ? objPropModif.name : "";

            // Глубина подводящей трубы до нижнего края (см) –  prop1
            listModel[0].firstElementChild.innerHTML = objPropModif.prop1
              ? objPropModif.prop1
              : listModel[1].firstElementChild.innerHTML;

            // Кол-во пользователей (до) –  prop2
            listModel[1].firstElementChild.innerHTML = objPropModif.prop2
              ? objPropModif.prop2
              : listModel[1].firstElementChild.innerHTML;
            // Объем залпового сброса (л) prop3
            listModel[2].firstElementChild.innerHTML = objPropModif.prop3
              ? objPropModif.prop3
              : listModel[2].firstElementChild.innerHTML;

            // Способ водоотведения – prop4
            listModel[3].firstElementChild.innerHTML = objPropModif.prop4
              ? objPropModif.prop4
              : listModel[3].firstElementChild.innerHTML;

            // Цена priceCrnt
            priceModel.firstElementChild.innerHTML = objPropModif.priceCrnt
              ? objPropModif.priceCrnt
              : priceModel.firstElementChild.innerHTML;

            // Цена priceDisc
            if (discModel) {
              if (!objPropModif.priceDisc) {
                discModel.style.display = "none";
                slideModel[actvSlide].querySelector(
                  ".card-product__dicount"
                ).style.display = "none";
              } else {
                discModel.style.display = "inline";
                slideModel[actvSlide].querySelector(
                  ".card-product__dicount"
                ).style.display = "inline";
              }
              discModel.firstElementChild.innerHTML = "";
              discModel.firstElementChild.innerHTML = objPropModif.priceDisc;
            }

            // data-form
            butBtnModel.dataset.form = nameModel.innerText;

            // data-price
            butBtnModel.dataset.price = `${priceModel.firstElementChild.innerText} руб.`;
          }
        }
      });
    }
    /* добавдляем класс _active-btn */
    function selectTab(target, selectorBtn) {
      if (target.closest(selectorBtn) && !target.closest("._active-btn")) {
        Array.from(target.parentElement.children).forEach((el, i) => {
          el.classList.remove("_active-btn");
        });
        target.classList.add("_active-btn");
      }
    }
    // созадние пути для картнки
    function createImgSrc(img, btn) {
      if (btn) {
        const endIndxSrc = img.src.lastIndexOf("/");
        img.src = img.src.slice(0, endIndxSrc + 1) + btn + ".png";
      }
    }
  }
  tabModificationModel();
  // ================================================================================================
  // ================================================================================================
  // =============================================================
  function rangeInit() {
    const arbitraryValuesForSlider = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "10 +",
    ];
    const zaborValuesForSlider = [
      "10 м",
      "20 м",
      "30 м",
      "40 м",
      "50 м",
      "60 м",
      "70 м",
      "80 м",
      "90 м",
      "100 м",
      "100 +",
    ];
    const kalitkaValuesForSlider = ["1", "2", "3", "4", "5", "5 +"];
    var format = {
      to: function (value) {
        return arbitraryValuesForSlider[Math.round(value)];
      },
      from: function (value) {
        return arbitraryValuesForSlider.indexOf(value);
      },
    };
    var zaborFormat = {
      to: function (value) {
        return zaborValuesForSlider[Math.round(value)];
      },
      from: function (value) {
        return zaborValuesForSlider.indexOf(value);
      },
    };
    var kalitkaFormat = {
      to: function (value) {
        return kalitkaValuesForSlider[Math.round(value)];
      },
      from: function (value) {
        return kalitkaValuesForSlider.indexOf(value);
      },
    };
    const priceSlider = document.querySelector("#range");
    const zborSlider = document.querySelector("#zaborRange");
    const kalitkaSlider = document.querySelector("#kalitkaZaborRange");

    if (kalitkaSlider) {
      initialize(kalitkaSlider, {
        start: 1,
        step: 1,
        range: {
          min: [0],
          max: [kalitkaValuesForSlider.length - 1],
        },
        tooltips: true,
        format: kalitkaFormat,
        connect: [true, false],
        pips: {
          mode: "count",
          stepped: true,
          values: 6,
          format: kalitkaFormat,
        },
      });
    }
    if (zborSlider) {
      initialize(zborSlider, {
        start: "30 м",
        step: 1,
        range: {
          min: [0],
          max: [zaborValuesForSlider.length - 1],
        },
        tooltips: true,
        format: zaborFormat,
        connect: [true, false],
        pips: {
          mode: "count",
          stepped: true,
          values: 11,
          format: zaborFormat,
        },
      });
    }
    if (priceSlider) {
      initialize(priceSlider, {
        start: 3,
        step: 1,
        range: {
          min: [0],
          max: [arbitraryValuesForSlider.length - 1],
        },
        tooltips: true,
        format: format,
        connect: [true, false],
        pips: {
          mode: "count",
          stepped: true,
          values: 11,
          format: format,
        },
      });
      priceSlider.noUiSlider.on("change", function () {
        const valueRange = document.querySelector(".noUi-handle");
        const inputRange = document.querySelector(".form-qwiz__input-number");
        if (valueRange.ariaValueText === "10+") {
          inputRange.classList.add("_show");
          document
            .querySelector(".qwiz-section__next-btn")
            .classList.add("_disabled");
          document.querySelector(".qwiz-section__next-btn").disabled = true;
        } else {
          inputRange.classList.remove("_show");
          document
            .querySelector(".qwiz-section__next-btn")
            .classList.remove("_disabled");
          document.querySelector(".qwiz-section__next-btn").disabled = false;
        }

        const range_input = document.getElementById("range_input");
        if (range_input) {
          range_input.value = this.get();
          if (range_input.value == "10+") range_input.value = "";
        }
      });
    }
  }
  rangeInit();

  // ================================================================================================
  // для освещенния, для установки пл дефолту чек
  function showSliderMobile() {
    const desktop = document.querySelector("._desktop");
    const mobile = document.querySelector("._mobile");

    if (desktop || mobile) {
      if (window.innerWidth > 767.98) {
        mobile.checked = false;

        desktop.checked = true;
      } else {
        mobile.checked = true;

        desktop.checked = false;
      }
    }
  }
  showSliderMobile();
  // освещение показывает что выбрал юзер
  function showItemOsveshhenie() {
    const itemsStepOne = document.getElementById("items-step-1");
    const itemsStepTwo = document.getElementById("items-step-2");

    if (itemsStepOne || itemsStepTwo) {
      getItemDecorQwiz(itemsStepOne, "step-list-1");
      getItemDecorQwiz(itemsStepTwo, "step-list-2");
    }
  }
  function getItemDecorQwiz(itemsStep, listStep) {
    const arrItemCheck = [];
    const inputs = itemsStep.querySelectorAll(`input`);

    Array.from(inputs).forEach((it) => {
      if (it.checked) {
        arrItemCheck.push(it.value);
      }
    });

    createItemDecorQwiz(arrItemCheck, listStep);
  }
  function createItemDecorQwiz(arrItem, listStep) {
    const list = document.getElementById(listStep).children;

    Array.from(list).forEach((it) => {
      if (arrItem.some((el) => it.textContent.trim() === el)) {
        it.classList.add("_active");
      }
    });
  }
  // ================================================================================================

  // =============================================================
  function initQwiz() {
    const qwizFrom = document.querySelector("#services_quiz_form");

    // ! вешаем события дописать что где
    function eventRadio(selector, nextBtn) {
      if (selector) {
        selector.forEach((it) => {
          it.addEventListener("click", () => {
            clickRadioCheck(selector, nextBtn);
          });
        });
      }
    }

    function clickRadioCheck(slector, nextBtn) {
      checkRadioValue(slector);
      removeDisabledBtn(nextBtn);
    }
    function checkRadioValue(selector) {
      let res = false;
      selector.forEach((el) => {
        if (el.checked) {
          res = true;
        }
      });
      return res;
    }

    if (qwizFrom) {
      const inputChecks = document.querySelectorAll(".form-qwiz__input");
      const steps = document.querySelectorAll(".form-qwiz__step");
      const prevBtn = document.querySelector(".qwiz-section__prev-btn");
      const nextBtn = document.querySelector(".qwiz-section__next-btn");
      const panelNavigate =
        document.querySelector(".qwiz-section__bottom") ||
        document.querySelector(".qwiz-section__navigate");
      const stepCurrentNumber = document.querySelector(
        ".qwiz-section__current-step"
      );
      const restartBtn = document.querySelector(".form-qwiz__restart-btn");
      const finishStep = document.querySelector(".qwiz-section__finish-step");
      const chekBoxInpt = document.querySelectorAll(".form-qwiz__input-check");
      const chekBoxInptService = document.querySelectorAll(".form-qwiz__input");
      // flagQ если есть доп.вопрос доходим до него и меняет кол-во шагов
      let flagQ = false;
      let currentStep = 0;
      let isStatusQuestion = false;

      nextBtn.addEventListener("click", nextStep);
      prevBtn.addEventListener("click", prevStep);

      if (document.querySelectorAll(".form-qwiz__items").length !== 0) {
        document.querySelectorAll(".form-qwiz__items").forEach((element) => {
          element.addEventListener("click", (e) => isClickCheckBox(e, true));
        });
      }

      if (finishStep) {
        finishStep.innerHTML = `/ ${
          document.getElementById("filter-septik")
            ? steps.length - 3
            : document.querySelector("._additional-question")
              ? steps.length - 2
              : steps.length - 1
        }`;
      }

      // кнопка чтоб сдлеать следующий шаг на "отправить заявку" в фильтре септик
      const btnSumbmitNext = document.querySelector(".form-qwiz__btn-finish");
      if (btnSumbmitNext) {
        btnSumbmitNext.addEventListener("click", function (e) {
          nextStep();
          document.querySelector(
            ".qwiz-section__progress-step "
          ).style.display = "none";
        });
      }
      // ===========================================
      if (restartBtn)
        restartBtn.addEventListener("click", function (e) {
          currentStep = 0;
          nextBtn.classList.remove("_disabled");
          nextBtn.disabled = false;
          isStatusQuestion = false;
          stepCurrentNumber.innerHTML = 1;
          prevBtn.classList.add("._disabled");
          prevBtn.disabled = true;

          steps.forEach((step) => {
            step.classList.remove("_current");
          });
          steps[0].classList.add("_current");
          panelNavigate.style.display = "flex";
          stepCurrentNumber.parentNode.style.display = "flex";
          stepCurrentNumber.parentNode.classList.remove("_ready");
          inputChecks.forEach((inpt) => {
            inpt.checked = false;
          });
        });

      const IsUrl = window.location.href.includes("/service/");

      //  клик проверка кнопок в кивез
      function isClickCheckBox(e, isCheckBox) {
        let target = e.target;
        let isVali = validateCheck(chekBoxInpt);
        let isValiService = validateCheck(chekBoxInptService);

        if (target.classList.contains("form-qwiz__input-check")) {
          disabledNextBtn(isVali);
        }

        if (IsUrl) {
          disabledNextBtn(isValiService);
        }
        isCheck();
      }
      function disabledNextBtn(funcBoolean) {
        if (!funcBoolean && currentStep === 2) {
          addDisabledBtn(nextBtn);
        }
        if (funcBoolean) {
          removeDisabledBtn(nextBtn);
        }
      }
      function isCheck() {
        if (document.querySelector("._active-additional-question")) {
          if (document.querySelector("._active-additional-question").checked) {
            isStatusQuestion = true;
            return;
          }
        }
        isStatusQuestion = false;
      }
      // ==============================================================================
      const arrInpt = [];
      steps.forEach((element) => {
        const inpt = element.querySelectorAll("input[type='radio']");
        arrInpt.push(inpt);
      });
      arrInpt.forEach((element) => {
        eventRadio(element, nextBtn);
      });

      function valditeRadiobtn(stepNumber, selector) {
        if (currentStep === stepNumber && !selector) {
          addDisabledBtn(nextBtn);
        }
      }

      // проврка чек боксов isClickCheckBox
      function validateCheck(selectorCheckBox) {
        if (selectorCheckBox) {
          for (let i = 0; i < selectorCheckBox.length; i++) {
            const element = selectorCheckBox[i];

            if (element.checked) return true;
          }
          return false;
        }
      }
      // првоеряет чекбоксы есть активыне в шаге или нет
      function validateStepNextBtn() {
        const inputChecks = steps[currentStep].querySelectorAll(
          ".form-qwiz__input-check"
        );
        inputChecks.forEach((input) => {
          if (input.checked) {
            removeDisabledBtn(nextBtn);
            return;
          }
        });
      }

      // шаг вперед

      function nextStep(e) {
        ++currentStep;
        let arrRadioBolean = [];
        arrInpt.forEach((element) => {
          arrRadioBolean.push(checkRadioValue(element));
        });

        for (let i = 0; i < arrRadioBolean.length - 1; i++) {
          valditeRadiobtn(i, arrRadioBolean[i]);
        }

        validateStepNextBtn();
        // для старацниы освещения
        if (
          document.getElementById("qwiz-osveshhenie") &&
          steps.length === currentStep + 3
        ) {
          showItemOsveshhenie();
          removeDisabledBtn(nextBtn);
          nextBtn.querySelector("span").textContent = "Всё правильно";
        }
        if (
          document.getElementById("qwiz-osveshhenie") &&
          steps.length === currentStep + 2
        ) {
          document.querySelector(
            ".qwiz-section__progress-step "
          ).style.display = "none";
        }

        // убираем disabled в filter-septik cантехнике
        if (
          steps.length === currentStep + 5 &&
          document.getElementById("filter-septik")
        ) {
          removeDisabledBtn(nextBtn);
        }
        // итог filter-septik, вкоючаем фильтер по септикам
        if (
          steps.length === currentStep + 3 &&
          document.getElementById("filter-septik")
        ) {
          filterSeptik();
          panelNavigate.style.display = "none";
          stepCurrentNumber.parentNode.classList.add("_ready");
        }

        if (currentStep === 1) {
          prevBtn.style.display = "flex";
          panelNavigate.style.justifyContent = "space-between";
        }
        if (currentStep === steps.length - 2) {
          stepCurrentNumber.parentNode.classList.add("_ready");
        }

        if (steps.length - 1 === currentStep) {
          stepCurrentNumber.parentNode.style.display = "none";
        }

        // добавялем макс.кол-во шагов после доп.вопроса
        if (
          finishStep.hidden &&
          !steps[currentStep].closest("._additional-question")
        ) {
          finishStep.hidden = false;
        }

        if (flagQ || isStatusQuestion) {
          stepCurrentNumber.innerHTML = `${currentStep}`;
        } else {
          stepCurrentNumber.innerHTML = `${currentStep + 1}`;
        }
        if (steps[currentStep].closest("._additional-question")) {
          flagQ = true;
        }

        if (
          steps[currentStep].closest("._additional-question") &&
          !isStatusQuestion
        ) {
          switchCurrentClassName(steps, currentStep - 1, currentStep + 1);
          currentStep = currentStep + 1;
          return;
        }

        //доп.вопрос появялеться если выбрали нужный пункт
        if (
          steps[currentStep].closest("._additional-question") &&
          isStatusQuestion
        ) {
          stepCurrentNumber.innerHTML = "Доп. вопрос";
          finishStep.hidden = true;
          switchCurrentClassName(steps, currentStep - 1, currentStep);
          // если следующий щаг рандж то убираем дизайб с кнопки
          if (steps[currentStep].closest(".form-qwiz__step_range")) {
            removeDisabledBtn(nextBtn);
          }
          return;
        }

        if (steps.length - 1 === currentStep) {
          if (document.querySelector(".qwiz-section__navigate")) {
            document.querySelector(
              ".qwiz-section__progress-step "
            ).style.display = "none";
          }
        }

        if (steps.length - 2 === currentStep) {
          let nav =
            panelNavigate || document.querySelector(".qwiz-section__navigate");
          nav.style.display = "none";
        }
        if (steps.length === currentStep) {
          steps[currentStep - 1].style.display = "none";
          return;
        }

        // после доп.вопроса делаем актуальный шаг
        if (
          steps[currentStep - 1].closest("._additional-question") &&
          isStatusQuestion
        ) {
          stepCurrentNumber.innerHTML = `${currentStep}`;
          switchCurrentClassName(steps, currentStep - 1, currentStep);
          removeDisabledBtn(nextBtn);
          return;
        }

        prevBtn.classList.remove("_disabled");
        prevBtn.disabled = false;
        // если следующий щаг рандж то убираем дизайб с кнопки
        if (steps[currentStep].closest(".form-qwiz__step_range")) {
          removeDisabledBtn(nextBtn);
        }
        switchCurrentClassName(steps, currentStep - 1, currentStep);
      }
      // шаг назад
      function prevStep(e) {
        if (
          document.getElementById("radioQwiz") ||
          document.getElementById("filter-septik")
        ) {
          removeDisabledBtn(nextBtn);
        }

        if (currentStep === steps.length - 3) {
          nextBtn.classList.remove("_disabled");
        }

        if (prevBtn.classList.contains("_disabled")) {
          return;
        }

        // при шаге назад возврашаем макс.кол-во шаг и выключаем флаг вопроса

        if (
          steps[currentStep].closest("._additional-question") &&
          isStatusQuestion
        ) {
          finishStep.hidden = false;
          flagQ = false;
          isStatusQuestion = false;
        }

        currentStep--;
        // нужно для доп.вопоса где чекбоксы, чтоб коректно раблтала
        if (
          currentStep === steps.length - 3 &&
          steps[currentStep - 1].querySelector(".form-qwiz__items-validate")
        ) {
          finishStep.hidden = false;
          flagQ = false;
          isStatusQuestion = true;
        }

        if (flagQ) {
          stepCurrentNumber.innerHTML = `${currentStep}`;
        } else {
          stepCurrentNumber.innerHTML = `${currentStep + 1}`;
        }

        // при шаге назад активируем доп.вопрос
        if (
          steps[currentStep].closest("._additional-question") &&
          isStatusQuestion
        ) {
          stepCurrentNumber.innerHTML = "Доп. вопрос";
          finishStep.hidden = true;
          flagQ = false;
        }
        // при шаге назад если не  активируем доп.вопрос
        if (
          steps[currentStep].closest("._additional-question") &&
          !isStatusQuestion
        ) {
          stepCurrentNumber.innerHTML = `${currentStep}`;
          switchCurrentClassName(steps, currentStep + 1, currentStep - 1);
          currentStep = currentStep - 1;
          flagQ = false;
          return;
        }
        if (currentStep === 0) {
          addDisabledBtn(prevBtn);
        }

        switchCurrentClassName(steps, currentStep + 1, currentStep);

        if (
          steps[currentStep + 1].closest("._additional-question") &&
          !isStatusQuestion
        ) {
          switchCurrentClassName(steps, currentStep + 2, currentStep);
        }
      }

      qwizFrom.addEventListener("submit", function (e) {
        e.preventDefault();
        var th = $("#services_quiz_form");
        $(".load__preloader").fadeIn("", function () {
          $.ajax({
            type: "POST",
            url: "/index.php?route=common/footer/quiz_submit",
            data: th.serialize(),
            dataType: "json",
          }).done(function (json) {
            if (json["success"]) {
              $(".load__preloader").fadeOut("slow");
              window.location.href = "https://sewera.ru/sent/";
            }
          });
        });
        return false;
      });
    }
    function removeDisabledBtn(seclectorBtn) {
      seclectorBtn.classList.remove("_disabled");
      seclectorBtn.disabled = false;
    }
    function addDisabledBtn(seclectorBtn) {
      seclectorBtn.classList.add("_disabled");
      seclectorBtn.disabled = true;
    }
    // меняем класс  у текущего шага
    function switchCurrentClassName(steps, stepRemove, stepAdd) {
      steps[stepRemove].classList.remove("_current");
      steps[stepAdd].classList.add("_current");
    }
  }
  initQwiz();

  function getValueAdditionalQuestion(selector) {
    let value = 0;
    selector.forEach((element) => {
      if (element.checked) {
        value = element.value;
      }
    });
    return Number(value);
  }
  // события на ввод только чисел и проврка на пустой инпут
  function validateUserValueInput() {
    const inputRange = document.querySelector(
      ".form-qwiz__input-number  input"
    );
    if (inputRange) {
      inputRange.addEventListener("keydown", (e) => {
        if (e.key === "Enter") e.preventDefault();
      });

      inputRange.addEventListener("input", (e) => {
        const nextBtn = document.querySelector(".qwiz-section__next-btn");

        const num = 50;

        if (e.target.value > num) {
          e.target.value = num;
          e.target.max = num;
        }

        inputRange.value = inputRange.value.replace(/[^0-9]/g, "");

        if (inputRange.value.length !== 0) {
          nextBtn.classList.remove("_disabled");
          nextBtn.disabled = false;
        } else {
          nextBtn.classList.add("_disabled");
          nextBtn.disabled = true;
        }
      });
    }
  }
  validateUserValueInput();

  // кнопеи сантехники
  function countPlumbingItems(params) {
    const plusBtn = document.querySelectorAll(".form-qwiz__btns-plumbing");
    if (plusBtn) {
      plusBtn.forEach((element) => {
        element.addEventListener("click", function (e) {
          let target = e.target;

          if (target.closest("._plus-plumbing")) {
            if (element.children[1].value >= 5) return;
            element.children[1].value++;
          }
          if (target.closest("._minus-plumbing")) {
            if (element.children[1].value <= 0) return;
            element.children[1].value--;
          }
        });
      });
    }
  }
  countPlumbingItems();
  function filterSeptik() {
    const dataSeptic = [
      // akvalos

      {
        linkSeptik: "septik-akvalos-2",
        nameSeptik: "Септик Аквалос 2",
        pipeDepth: "30",
        userValue: "2",
        salvoReleaseVolume: "120",
        energyConsumption: "1,37",
        productivity: "0.4",
        price: "82 800",
        mounting: "27 000",
      },
      {
        linkSeptik: "septik-akvalos-3",
        nameSeptik: "Аквалос 3",
        pipeDepth: "50",
        userValue: "2",
        salvoReleaseVolume: "220",
        energyConsumption: "1,37",
        productivity: "0.6",
        price: "93 150",
        mounting: "27 000",
      },
      {
        linkSeptik: "septik-akvalos-4",

        nameSeptik: "Аквалос 4",
        pipeDepth: "60",
        userValue: "4",
        salvoReleaseVolume: "250",
        energyConsumption: "1,37",
        productivity: "0.8",
        price: "106 200",
        mounting: "27 000",
      },
      {
        linkSeptik: "septik-akvalos-4-gorizontalnij",
        nameSeptik: "Аквалос 4 Гориз.",
        pipeDepth: "30",
        userValue: "4",
        salvoReleaseVolume: "250",
        energyConsumption: "0,9",
        productivity: "0.8",
        price: "120 600",
        mounting: "32 000",
      },
      {
        linkSeptik: "septik-akvalos-5",
        nameSeptik: "Аквалос 5",
        pipeDepth: "60",
        userValue: "5",
        salvoReleaseVolume: "390",
        energyConsumption: "1,37",
        productivity: "0.9",
        price: "116 100",
        mounting: "34 000",
      },
      {
        linkSeptik: "septik-akvalos-5-gorizontalnij",
        nameSeptik: "Аквалос 5 Гориз.",
        pipeDepth: "30",
        userValue: "5",
        salvoReleaseVolume: "300",
        energyConsumption: "0,9",
        productivity: "0.9",
        price: "130 050",
      },
      {
        linkSeptik: "septik-akvalos-7",
        nameSeptik: "Аквалос 7",
        pipeDepth: "60",
        userValue: "7",
        salvoReleaseVolume: "550",
        energyConsumption: "1,37",
        productivity: "1.2",
        price: "140 400",
        mounting: "38 000",
      },
      {
        linkSeptik: "septik-akvalos-7-gorizontalnij",
        nameSeptik: "Аквалос 7 Гориз.",
        pipeDepth: "30",
        userValue: "7",
        salvoReleaseVolume: "550",
        energyConsumption: "0,9",
        productivity: "1.2",
        price: "158 400",
        mounting: "40 000",
      },
      {
        linkSeptik: "septik-akvalos-8",
        nameSeptik: "Аквалос 8",
        pipeDepth: "60",
        userValue: "8",
        salvoReleaseVolume: "700",
        energyConsumption: "1,57",
        productivity: "1.6",
        price: "148 500",
        mounting: "40 000",
      },
      {
        linkSeptik: "septik-akvalos-10",
        nameSeptik: "Аквалос 10",
        pipeDepth: "60",
        userValue: "10",
        salvoReleaseVolume: "900",
        energyConsumption: "2,57",
        productivity: "2.0",
        price: "194 400",
        mounting: "49 000",
      },
      {
        linkSeptik: "septik-akvalos-10-gorizontalnij",
        nameSeptik: "Аквалос 10 Гориз.",
        pipeDepth: "30",
        userValue: "10",
        salvoReleaseVolume: "800",
        energyConsumption: "0,9",
        productivity: "2.0",
        price: "201 600",
        mounting: "51 000",
      },
      {
        linkSeptik: "septik-akvalos-15",
        nameSeptik: "Аквалос 15",
        pipeDepth: "60",
        userValue: "15",
        salvoReleaseVolume: "1125",
        energyConsumption: "2,57",
        productivity: "3.0",
        price: "253 800",
        mounting: "55 000",
      },
      {
        linkSeptik: "septik-akvalos-20",
        nameSeptik: "Аквалос 20",
        pipeDepth: "60",
        userValue: "20",
        salvoReleaseVolume: "1350",
        energyConsumption: "1,5",
        productivity: "4.0",
        price: "323 100",
        mounting: "60 000",
      },

      //topas

      {
        linkSeptik: "septik-topas-4",
        nameSeptik: "Топас 4",
        pipeDepth: "60",
        userValue: "4",
        salvoReleaseVolume: "175",
        energyConsumption: "1",
        productivity: "0.8",
        price: "122 310",
        mounting: "27 000",
      },
      {
        linkSeptik: "septik-topas-5",
        nameSeptik: "Топас 5",
        pipeDepth: "60",
        userValue: "5",
        salvoReleaseVolume: "220",
        energyConsumption: "1",
        productivity: "1",
        price: "143 550",
        mounting: "34 000",
      },
      {
        linkSeptik: "septik-topas-6",

        nameSeptik: "Топас 6",
        pipeDepth: "60",
        userValue: "6",
        salvoReleaseVolume: "250",
        energyConsumption: "1",
        productivity: "1.15",
        price: "144 810",
        mounting: "34 000",
      },
      {
        linkSeptik: "septik-topas-8",
        nameSeptik: "Топас 8",
        pipeDepth: "60",
        userValue: "8",
        salvoReleaseVolume: "440",
        energyConsumption: "1",
        productivity: "1.5",
        price: "166 410",
        mounting: "40 000",
      },
      {
        linkSeptik: "septik-topas-9",
        nameSeptik: "Топас 9",
        pipeDepth: "60",
        userValue: "9",
        salvoReleaseVolume: "510",
        energyConsumption: "1",
        productivity: "1.7",
        price: "168 390",
        mounting: "40 000",
      },
      {
        linkSeptik: "septik-topas-10",
        nameSeptik: "Топас 10",
        pipeDepth: "60",
        userValue: "10",
        salvoReleaseVolume: "760",
        energyConsumption: "2",
        productivity: "2",
        price: "226 710",
        mounting: "49 000",
      },
      {
        linkSeptik: "septik-topas-12",
        nameSeptik: "Топас 12",
        pipeDepth: "60",
        userValue: "12",
        salvoReleaseVolume: "830",
        energyConsumption: "2",
        productivity: "2.2",
        price: "228 870",
        mounting: "55 000",
      },

      //	 astra

      {
        linkSeptik: "septik-astra-3",
        nameSeptik: "Астра 3",
        pipeDepth: "60",
        userValue: "3",
        salvoReleaseVolume: "130",
        energyConsumption: "1",
        productivity: "0.6",
        price: "102 000",
        mounting: "27 000",
      },
      {
        linkSeptik: "septik-astra-4",
        nameSeptik: "Астра 4",
        pipeDepth: "60",
        userValue: "4",
        salvoReleaseVolume: "150",
        energyConsumption: "1",
        productivity: "0.8",
        price: "106 250",
        mounting: "27 000",
      },

      {
        linkSeptik: "septik-astra-5",
        nameSeptik: "Астра 5",
        pipeDepth: "60",
        userValue: "5",
        salvoReleaseVolume: "250",
        energyConsumption: "1.5",
        productivity: "1",
        price: "123 250",
        mounting: "34 000",
      },
      {
        linkSeptik: "septik-astra-6",

        nameSeptik: "Астра 6",
        pipeDepth: "60",
        userValue: "6",
        salvoReleaseVolume: "280",
        energyConsumption: "1.5",
        productivity: "1.2",
        price: "130 050",
        mounting: "34 000",
      },
      {
        linkSeptik: "septik-astra-7",
        nameSeptik: "Астра 7",
        pipeDepth: "60",
        userValue: "8",
        salvoReleaseVolume: "300",
        energyConsumption: "1.5",
        productivity: "1.4",
        price: "136 850",
        mounting: "38 000",
      },
      {
        linkSeptik: "septik-astra-8",
        nameSeptik: "Астра 8",
        pipeDepth: "60",
        userValue: "8",
        salvoReleaseVolume: "350",
        energyConsumption: "1.5",
        productivity: "1.6",
        price: "148 699",
        mounting: "40 000",
      },
      {
        linkSeptik: "septik-astra-9",
        nameSeptik: "Астра 9",
        pipeDepth: "60",
        userValue: "9",
        salvoReleaseVolume: "450",
        energyConsumption: "1.5",
        productivity: "1.8",
        price: "169 150",
        mounting: "40 000",
      },
      {
        linkSeptik: "septik-astra-10",
        nameSeptik: "Астра 10",
        pipeDepth: "60",
        userValue: "10",
        salvoReleaseVolume: "550",
        energyConsumption: "1.5",
        productivity: "2",
        price: "196 350",
        mounting: "49 000",
      },
      {
        linkSeptik: "septik-astra-15",
        nameSeptik: "Астра 15",
        pipeDepth: "60",
        userValue: "15",
        salvoReleaseVolume: "600",
        energyConsumption: "2.4",
        productivity: "3",
        price: "255 000",
        mounting: "55 000",
      },

      // Малахит

      {
        linkSeptik: "septik-malahit-4",
        nameSeptik: "Малахит 4",
        pipeDepth: "60",
        userValue: "4",
        salvoReleaseVolume: "220",
        energyConsumption: "1.2",
        productivity: "0.9",
        price: "116 494",
        mounting: "27 000",
      },

      {
        linkSeptik: "septik-malahit-5",
        nameSeptik: "Малахит 5",
        pipeDepth: "60",
        userValue: "5",
        salvoReleaseVolume: "263",
        energyConsumption: "1.5",
        productivity: "1",
        price: "137 694",
        mounting: "34 000",
      },
      {
        linkSeptik: "septik-malahit-6",

        nameSeptik: "Малахит 6",
        pipeDepth: "60",
        userValue: "6",
        salvoReleaseVolume: "290",
        energyConsumption: "1.5",
        productivity: "1.2",
        price: "153 594",
        mounting: "34 000",
      },
      {
        linkSeptik: "septik-malahit-8",
        nameSeptik: "Малахит 8",
        pipeDepth: "60",
        userValue: "8",
        salvoReleaseVolume: "420",
        energyConsumption: "1.7",
        productivity: "1.6",
        price: "185 394",
        mounting: "40 000",
      },
      {
        linkSeptik: "septik-malahit-10",

        nameSeptik: "Малахит 10",
        pipeDepth: "60",
        userValue: "10",
        salvoReleaseVolume: "500",
        energyConsumption: "1.7",
        productivity: "2",
        price: "222 494",
        mounting: "49 000",
      },
      {
        linkSeptik: "septik-malahit-12",
        nameSeptik: "Малахит 12",
        pipeDepth: "60",
        userValue: "12",
        salvoReleaseVolume: "645",
        energyConsumption: "1.7",
        productivity: "2.5",
        price: "243 694",
        mounting: "55 000",
      },

      // евролос

      {
        linkSeptik: "septik-evrolos-bio-3",
        nameSeptik: "Евролос БИО 3",
        pipeDepth: "60",
        userValue: "3",
        salvoReleaseVolume: "150",
        energyConsumption: "1",
        productivity: "0.6",
        price: "116 900",
        mounting: "27 000",
      },
      {
        linkSeptik: "septik-evrolos-bio-4",
        nameSeptik: "Евролос БИО 4",
        pipeDepth: "60",
        userValue: "4",
        salvoReleaseVolume: "180",
        energyConsumption: "1.2",
        productivity: "0.8",
        price: "122 300",
        mounting: "27 000",
      },

      {
        linkSeptik: "septik-evrolos-bio-5",
        nameSeptik: "Евролос БИО 5",
        pipeDepth: "60",
        userValue: "5",
        salvoReleaseVolume: "210",
        energyConsumption: "1.5",
        productivity: "1",
        price: "129 400",
        mounting: "34 000",
      },
      {
        linkSeptik: "septik-evrolos-bio-6",

        nameSeptik: "Евролос БИО 6",
        pipeDepth: "60",
        userValue: "6",
        salvoReleaseVolume: "270",
        energyConsumption: "1.5",
        productivity: "1.3",
        price: "142 500",
        mounting: "34 000",
      },
      {
        linkSeptik: "septik-evrolos-bio-8",
        nameSeptik: "Евролос БИО 8",
        pipeDepth: "60",
        userValue: "8",
        salvoReleaseVolume: "370",
        energyConsumption: "1.5",
        productivity: "1.6",
        price: "166 800",
        mounting: "40 000",
      },
      {
        linkSeptik: "septik-evrolos-bio-10",

        nameSeptik: "Евролос БИО 10",
        pipeDepth: "60",
        userValue: "10",
        salvoReleaseVolume: "550",
        energyConsumption: "1.7",
        productivity: "2",
        price: "208 700",
        mounting: "49 000",
      },
      {
        linkSeptik: "septik-malahit-12",
        nameSeptik: "Евролос БИО 12",
        pipeDepth: "60",
        userValue: "12",
        salvoReleaseVolume: "680",
        energyConsumption: "1.7",
        productivity: "2.4",
        price: "228 600",
        mounting: "55 000",
      },
    ];
    const inputRange = document.querySelector(
      ".form-qwiz__input-number  input"
    );

    // расчет сколько нужноь производительности септика на n кол-во людей
    function getAmountUserValue() {
      let res = (Number(getQuantityUser()) * 150 * 1.2) / 1000;

      if (res <= 0.4) {
        res = 0.4;
      }

      return res;
    }

    // берем значения с ранжа или инпута
    function getQuantityUser() {
      const valueRange = document.querySelector(".noUi-handle");

      return valueRange.ariaValueText === "10+"
        ? inputRange.value
        : valueRange.ariaValueText;
    }

    // расчет производительности на всю сантехнику дома (раковины, ванна, туалет и т.д)
    function getValueItemPlumbing() {
      const selectorsCount = document.querySelectorAll(
        ".form-qwiz__count-plumbing"
      );
      let resSum = 0;
      let currentSum = 0;
      selectorsCount.forEach((element) => {
        let dataValue = element.dataset.plumbingValue;
        currentSum = dataValue * element.value;
        resSum += currentSum;
      });

      return resSum;
    }

    function resultSeptic() {
      let sum = (
        getAmountUserValue() +
        getValueItemPlumbing() / 1000 / 2
      ).toFixed(1);

      if (sum >= 4) {
        sum = 4;
      }

      const resFilterRange = filterRange(dataSeptic, +sum, +sum, []);

      showReusltSeptik(resFilterRange.slice(0, 3));
    }
    resultSeptic();
    function filterRange(septikArr, min, max, resArr) {
      for (let i = 0; i < septikArr.length; i++) {
        if (
          min <= septikArr[i].productivity &&
          septikArr[i].productivity <= max
        ) {
          resArr.push(septikArr[i]);
          septikArr.splice(i, 1);
        }
      }
      if (max >= 4) {
        return resArr;
      }

      return filterRange(septikArr, min, max + 0.1, resArr);
    }

    // выводим данные в итоги
    function showReusltSeptik(res) {
      const listResSelector = document.querySelectorAll(
        ".form-qwiz__content-finish"
      );

      const sumNameSelector = document.querySelector(".form-qwiz__sum-finish");

      let objRes = createObjRes(res);

      const [arrRes, sumRes] = objRes;

      sumNameSelector.innerHTML = sumRes;

      const sumInput = document.getElementById("finish-sum_input");
      if (sumInput) sumInput.value = sumRes;

      if (objRes) {
        for (let indx = 0; indx < listResSelector.length; indx++) {
          const element = listResSelector[indx];
          if (indx === 0) {
            createNewLinkSeptick(element, res);

            continue;
          }

          element.innerHTML =
            arrRes[indx] +
            '<input type="hidden" name="' +
            element.previousElementSibling.innerText +
            '" value="' +
            arrRes[indx] +
            '">';
        }
      }
    }

    // собираем обьект с данынми
    function createObjRes(res) {
      if (res.length === 0) return;

      const resObj = {};

      resObj.link = "";
      resObj.userValue = getQuantityUser();
      resObj.plannedSalvoRelease = `${getValueItemPlumbing()} л.`;
      resObj.salvoReleaseVolume = `${res[0].salvoReleaseVolume} л.`;
      resObj.price = `~${res[0].price} руб.`;
      resObj.pipeDepth = `от ${res[0].pipeDepth} см`;
      resObj.deliveryPrice = "9100 руб.";
      resObj.productivity = `${res[0].productivity} м³`;
      resObj.mounting = `${res[0].mounting} руб.`;
      resObj.energyConsumption = `${res[0].energyConsumption} кВт/сутки`;
      const threeRadioBtns = document.querySelectorAll(
        'input[name="Количество колец"]'
      );

      let wellRingsPrice = 0;
      let checkedWellRing = document.querySelector(
        'input[name="Количество колец"]:checked'
      );
      if (checkedWellRing) wellRingsPrice = checkedWellRing.dataset.price;

      let sumName = new Intl.NumberFormat("ru", {}).format(
        Number(res[0].price.replace(/\s+/g, "")) +
          Number(res[0].mounting.replace(/\s+/g, "")) +
          9100 +
          Number(wellRingsPrice)
      );
      console.log(getValueAdditionalQuestion(threeRadioBtns));
      let arrRes = Object.values(resObj);

      return [arrRes, `${sumName} руб.`];
    }

    // создаем ссылки на септике в итоге
    function createNewLinkSeptick(listLink, res) {
      let inputValue = "";
      let inputName = listLink.previousElementSibling.innerText;

      let theFirstChild = listLink.firstChild;

      for (let i = 0; i < 3; i++) {
        let newLink = document.createElement("a");
        if (res[i]) {
          newLink.setAttribute(
            "href",
            `https://sewera.ru/products/${res[i].linkSeptik}`
          );
          newLink.setAttribute("target", "_blank");
          if (i < 2) {
            inputValue += `${res[i].nameSeptik}, `;
            newLink.innerHTML = `${res[i].nameSeptik}, `;
          } else {
            inputValue += `${res[i].nameSeptik}`;
            newLink.innerHTML = `${res[i].nameSeptik}`;
          }
          listLink.insertBefore(newLink, theFirstChild);
        }
      }

      listLink.insertAdjacentHTML(
        "beforeend",
        '<input type="hidden" name="' +
          inputName +
          '" value="' +
          inputValue +
          '">'
      );
    }
  }

  // ========================================================================
  // ========================================================================
  // select
  // ========================================================================
  // ========================================================================
  // Подключение функционала "Чертогов Фрилансера"

  // import { formValidate } from '../files/forms/forms.js';

  // Подключение файла стилей
  // Базовые стили поключаются в src/scss/forms.scss
  // Файл базовых стилей src/scss/forms/select.scss

  /*
 Документация:
 Снипет (HTML): sel
 */
  /*
 // Настройки
 Для селекта (select):
 class="имя класса" - модификатор к конкретному селекту
 multiple - мультивыбор
 data-tags - режим тегов, только для (только для multiple)
 data-scroll - включит прокрутку для выпадающего списка, дополнительно можно подключить кастомный скролл simplebar в app.js. Указанное число для атрибута ограничит высоту
 data-checkbox - стилизация элементов по checkbox (только для multiple)
 data-show-selected - отключает скрытие выбранного элемента
 data-search - позволяет искать по выпадающему списку
 data-open - селект открыт сразу
 data-submit - отправляет форму при изменении селекта

 Для плейсхолдера (Плейсхолдер - это option с value=""):
 data-label для плейсхолдера, добавляет label к селекту
 data-show для плейсхолдера, показывает его в списке (только для единичного выбора)

 Для элемента (option):
 data-class="имя класса" - добавляет класс
 data-asset="путь к картинке или текст" - добавляет структуру 2х колонок и данными
 data-href="адрес ссылки" - добавляет ссылку в элемент списка
 data-href-blank - откроет ссылку в новом окне
 */

  /*
 // Возможные доработки:
 попап на мобилке
 */

  // Класс построения Select
  class SelectConstructor {
    constructor(props, data = null) {
      let defaultConfig = {
        init: true,
        logging: true,
      };
      this.config = Object.assign(defaultConfig, props);
      // CSS классы модуля
      this.selectClasses = {
        classSelect: "select", // Главный блок
        classSelectBody: "select__body", // Тело селекта
        classSelectTitle: "select__title", // Заголовок
        classSelectValue: "select__value", // Значение в заголовке
        classSelectLabel: "select__label", // Лабел
        classSelectInput: "select__input", // Поле ввода
        classSelectText: "select__text", // Оболочка текстовых данных
        classSelectLink: "select__link", // Ссылка в элементе
        classSelectOptions: "select__options", // Выпадающий список
        classSelectOptionsScroll: "select__scroll", // Оболочка при скролле
        classSelectOption: "select__option", // Пункт
        classSelectContent: "select__content", // Оболочка контента в заголовке
        classSelectRow: "select__row", // Ряд
        classSelectData: "select__asset", // Дополнительные данные
        classSelectDisabled: "_select-disabled", // Запрешен
        classSelectTag: "_select-tag", // Класс тега
        classSelectOpen: "_select-open", // Список открыт
        classSelectActive: "_select-active", // Список выбран
        classSelectFocus: "_select-focus", // Список в фокусе
        classSelectMultiple: "_select-multiple", // Мультивыбор
        classSelectCheckBox: "_select-checkbox", // Стиль чекбокса
        classSelectOptionSelected: "_select-selected", // Выбранный пункт
      };
      this._this = this;
      // Запуск инициализации
      if (this.config.init) {
        // Получение всех select на странице
        const selectItems = data
          ? document.querySelectorAll(data)
          : document.querySelectorAll("select");
        if (selectItems.length) {
          this.selectsInit(selectItems);
        } else {
        }
      }
    }
    // Конструктор CSS класса
    getSelectClass(className) {
      return `.${className}`;
    }
    // Геттер элементов псевдоселекта
    getSelectElement(selectItem, className) {
      return {
        originalSelect: selectItem.querySelector("select"),
        selectElement: selectItem.querySelector(this.getSelectClass(className)),
      };
    }
    // Функция инициализации всех селектов
    selectsInit(selectItems) {
      selectItems.forEach((originalSelect, index) => {
        this.selectInit(originalSelect, index + 1);
      });
      // Обработчики событий...
      // ...при клике
      document.addEventListener(
        "click",
        function (e) {
          this.selectsActions(e);
        }.bind(this)
      );
      // ...при нажатии клавиши
      document.addEventListener(
        "keydown",
        function (e) {
          this.selectsActions(e);
        }.bind(this)
      );
      // ...при фокусе
      document.addEventListener(
        "focusin",
        function (e) {
          this.selectsActions(e);
        }.bind(this)
      );
      // ...при потере фокуса
      document.addEventListener(
        "focusout",
        function (e) {
          this.selectsActions(e);
        }.bind(this)
      );
      document.addEventListener(
        "input",
        function (e) {
          this.selectsActions(e);
        }.bind(this)
      );
    }
    // Функция инициализации конкретного селекта
    selectInit(originalSelect, index) {
      const _this = this;
      // Создаем оболочку
      let selectItem = document.createElement("div");
      selectItem.classList.add(this.selectClasses.classSelect);
      // Выводим оболочку перед оригинальным селектом
      originalSelect.parentNode.insertBefore(selectItem, originalSelect);
      // Помещаем оригинальный селект в оболочку
      selectItem.appendChild(originalSelect);
      // Скрываем оригинальный селект
      originalSelect.hidden = true;

      // Присваиваем уникальный ID
      index ? (originalSelect.dataset.id = index) : null;

      // Конструктор косновных элементов
      selectItem.insertAdjacentHTML(
        "beforeend",
        `<div class="${this.selectClasses.classSelectBody}"><div hidden class="${this.selectClasses.classSelectOptions}"></div></div>`
      );
      // Запускаем конструктор псевдоселекта
      this.selectBuild(originalSelect);

      // Работа с плейсхолдером
      if (this.getSelectPlaceholder(originalSelect)) {
        // Запоминаем плейсхолдер
        originalSelect.dataset.placeholder =
          this.getSelectPlaceholder(originalSelect).value;
        // Если включен режим label
        if (this.getSelectPlaceholder(originalSelect).label.show) {
          const selectItemTitle = this.getSelectElement(
            selectItem,
            this.selectClasses.classSelectTitle
          ).selectElement;
          selectItemTitle.insertAdjacentHTML(
            "afterbegin",
            `<span class="${this.selectClasses.classSelectLabel}">${
              this.getSelectPlaceholder(originalSelect).label.text
                ? this.getSelectPlaceholder(originalSelect).label.text
                : this.getSelectPlaceholder(originalSelect).value
            }</span>`
          );
        }
      }
      // Запоминаем скорость
      originalSelect.dataset.speed = originalSelect.dataset.speed
        ? originalSelect.dataset.speed
        : "150";
      // Событие при изменении оригинального select

      originalSelect.addEventListener("change", function (e) {
        _this.selectChange(e);
      });
    }
    // Конструктор псевдоселекта
    selectBuild(originalSelect) {
      const selectItem = originalSelect.parentElement;
      // Добавляем ID селекта
      selectItem.dataset.id = originalSelect.dataset.id;
      // Получаем класс оригинального селекта, создаем модификатор и добавляем его
      selectItem.classList.add(
        originalSelect.getAttribute("class")
          ? `select_${originalSelect.getAttribute("class")}`
          : ""
      );
      // Если множественный выбор, добавляем класс
      originalSelect.multiple
        ? selectItem.classList.add(this.selectClasses.classSelectMultiple)
        : selectItem.classList.remove(this.selectClasses.classSelectMultiple);
      // Cтилизация элементов под checkbox (только для multiple)
      originalSelect.hasAttribute("data-checkbox") && originalSelect.multiple
        ? selectItem.classList.add(this.selectClasses.classSelectCheckBox)
        : selectItem.classList.remove(this.selectClasses.classSelectCheckBox);
      // Сеттер значения заголовка селекта
      this.setSelectTitleValue(selectItem, originalSelect);
      // Сеттер элементов списка (options)
      this.setOptions(selectItem, originalSelect);
      // Если включена опция поиска data-search, запускаем обработчик

      originalSelect.hasAttribute("data-search")
        ? this.searchActions(selectItem)
        : null;
      // Если указана настройка data-open, открываем селект
      originalSelect.hasAttribute("data-open")
        ? this.selectAction(selectItem)
        : null;
      // Обработчик disabled
      this.selectDisabled(selectItem, originalSelect);
    }
    // Функция реакций на события
    selectsActions(e) {
      const targetElement = e.target;
      const targetType = e.type;

      if (
        targetElement.closest(
          this.getSelectClass(this.selectClasses.classSelect)
        ) ||
        targetElement.closest(
          this.getSelectClass(this.selectClasses.classSelectTag)
        )
      ) {
        const selectItem = targetElement.closest(".select")
          ? targetElement.closest(".select")
          : document.querySelector(
              `.${this.selectClasses.classSelect}[data-id="${
                targetElement.closest(
                  this.getSelectClass(this.selectClasses.classSelectTag)
                ).dataset.selectId
              }"]`
            );
        const originalSelect = this.getSelectElement(selectItem).originalSelect;
        if (targetType === "click") {
          if (!originalSelect.disabled) {
            if (
              targetElement.closest(
                this.getSelectClass(this.selectClasses.classSelectTag)
              )
            ) {
              // Обработка клика на тег
              const targetTag = targetElement.closest(
                this.getSelectClass(this.selectClasses.classSelectTag)
              );
              const optionItem = document.querySelector(
                `.${this.selectClasses.classSelect}[data-id="${targetTag.dataset.selectId}"] .select__option[data-value="${targetTag.dataset.value}"]`
              );
              this.optionAction(selectItem, originalSelect, optionItem);
            } else if (
              targetElement.closest(
                this.getSelectClass(this.selectClasses.classSelectTitle)
              )
            ) {
              // Обработка клика на заголовок селекта
              this.selectAction(selectItem);
            } else if (
              targetElement.closest(
                this.getSelectClass(this.selectClasses.classSelectOption)
              )
            ) {
              // Обработка клика на элемент селекта
              const optionItem = targetElement.closest(
                this.getSelectClass(this.selectClasses.classSelectOption)
              );
              // используется в калк в водоснобжении
              const inputTitle = document.querySelectorAll(
                ".calc-vodosnabzhenie .calc-wells__title-block"
              );
              const selectTitle = document.getElementById("calc");
              const inputVodosnabzhenie = document.querySelector(
                ".calc-vodosnabzhenie .calc-wells__inpt "
              );
              const selectVodosnabzhenie = document.querySelector(
                ".calc-wells__select"
              );
              if (inputTitle !== 0) {
                if (optionItem.innerText === "Скважина") {
                  inputTitle[0].innerHTML = "Глубина скважины, м";
                  inputTitle[0].classList.remove("_active");
                  inputTitle[1].classList.remove("_active");
                  inputTitle[0].classList.add("_active");
                  inputVodosnabzhenie.value = "";
                  inputVodosnabzhenie.placeholder = "Глубина скважины, м";
                  selectTitle.hidden = false;
                  selectVodosnabzhenie.hidden = true;
                  inputVodosnabzhenie.hidden = false;
                }
                if (optionItem.innerText === "Колодец") {
                  inputTitle[0].innerHTML = "Количество колец, шт";

                  inputTitle[0].classList.add("_active");
                  inputVodosnabzhenie.placeholder = "Количество колец, шт";
                  inputVodosnabzhenie.value = "";
                  selectVodosnabzhenie.hidden = true;
                  inputVodosnabzhenie.hidden = false;
                  selectTitle.hidden = true;
                }
              }
              this.optionAction(selectItem, originalSelect, optionItem);
            }
          }
        } else if (targetType === "focusin") {
          if (
            targetElement.closest(
              this.getSelectClass(this.selectClasses.classSelect)
            )
          ) {
            // document.querySelector('.select__input').select();
            // document.querySelector('.select__input').value = '';
            const selectOptions = this.getSelectElement(
              selectItem,
              this.selectClasses.classSelectOptions
            ).selectElement;
            const selectOptionsItems = selectOptions.querySelectorAll(
              `.${this.selectClasses.classSelectOption}`
            );
            // selectOptionsItems.forEach((element) => {
            //   element.hidden = false;
            // });
            selectItem.classList.add(this.selectClasses.classSelectFocus);
            // targetType === 'focusin'
            //   ? selectItem.classList.add(this.selectClasses.classSelectFocus)
            //   : selectItem.classList.remove(this.selectClasses.classSelectFocus);
          }
        } else if (targetType === "focusout") {
          if (
            targetElement.closest(
              this.getSelectClass(this.selectClasses.classSelect)
            )
          ) {
            selectItem.classList.remove(this.selectClasses.classSelectFocus);
          }
        } else if (targetType === "keydown" && e.code === "Escape") {
          this.selectsСlose();
        } else if (targetType === "input") {
          this.searchActions(selectItem);
        }
      } else {
        this.selectsСlose();
      }
    }

    // Функция закрытия всех селектов
    selectsСlose() {
      const selectActiveItems = document.querySelectorAll(
        `${this.getSelectClass(
          this.selectClasses.classSelect
        )}${this.getSelectClass(this.selectClasses.classSelectOpen)}`
      );
      if (selectActiveItems.length) {
        selectActiveItems.forEach((selectActiveItem) => {
          this.selectAction(selectActiveItem);
        });
      }
    }
    // Функция открытия/закрытия конкретного селекта
    selectAction(selectItem) {
      const originalSelect = this.getSelectElement(selectItem).originalSelect;
      const selectOptions = this.getSelectElement(
        selectItem,
        this.selectClasses.classSelectOptions
      ).selectElement;
      if (!selectOptions.classList.contains("_slide")) {
        selectItem.classList.toggle(this.selectClasses.classSelectOpen);

        _slideToggle(selectOptions, originalSelect.dataset.speed);
      }
    }
    // Сеттер значения заголовка селекта
    setSelectTitleValue(selectItem, originalSelect) {
      const selectItemBody = this.getSelectElement(
        selectItem,
        this.selectClasses.classSelectBody
      ).selectElement;
      const selectItemTitle = this.getSelectElement(
        selectItem,
        this.selectClasses.classSelectTitle
      ).selectElement;
      if (selectItemTitle) selectItemTitle.remove();
      selectItemBody.insertAdjacentHTML(
        "afterbegin",
        this.getSelectTitleValue(selectItem, originalSelect)
      );
    }
    // Конструктор значения заголовка
    getSelectTitleValue(selectItem, originalSelect) {
      // Получаем выбранные текстовые значения
      let selectTitleValue = this.getSelectedOptionsData(
        originalSelect,
        2
      ).html;
      // Обработка значений мультивыбора
      // Если включен режим тегов (указана настройка data-tags)
      if (originalSelect.multiple && originalSelect.hasAttribute("data-tags")) {
        selectTitleValue = this.getSelectedOptionsData(originalSelect)
          .elements.map(
            (option) =>
              `<span role="button" data-select-id="${
                selectItem.dataset.id
              }" data-value="${
                option.value
              }" class="_select-tag">${this.getSelectElementContent(
                option
              )}</span>`
          )
          .join("");
        // Если вывод тегов во внешний блок
        if (
          originalSelect.dataset.tags &&
          document.querySelector(originalSelect.dataset.tags)
        ) {
          document.querySelector(originalSelect.dataset.tags).innerHTML =
            selectTitleValue;
          if (originalSelect.hasAttribute("data-search"))
            selectTitleValue = false;
        }
      }
      // Значение(я) или плейсхолдер
      selectTitleValue = selectTitleValue.length
        ? selectTitleValue
        : originalSelect.dataset.placeholder;
      // Если есть значение, добавляем класс
      this.getSelectedOptionsData(originalSelect).values.length
        ? selectItem.classList.add(this.selectClasses.classSelectActive)
        : selectItem.classList.remove(this.selectClasses.classSelectActive);
      // Возвращаем поле ввода для поиска или текст
      if (originalSelect.hasAttribute("data-search")) {
        // Выводим поле ввода для поиска
        // value="${selectTitleValue}"
        return `<div class="${this.selectClasses.classSelectTitle}"><span class="${this.selectClasses.classSelectValue}"><input  autocomplete="off" type="text" placeholder="${selectTitleValue}"  data-placeholder="${selectTitleValue}" class="${this.selectClasses.classSelectInput}"></span></div>`;
      } else {
        // Если выбран элемент со своим классом
        const customClass =
          this.getSelectedOptionsData(originalSelect).elements.length &&
          this.getSelectedOptionsData(originalSelect).elements[0].dataset.class
            ? ` ${
                this.getSelectedOptionsData(originalSelect).elements[0].dataset
                  .class
              }`
            : "";
        // Выводим текстовое значение
        return `<button type="button" class="${this.selectClasses.classSelectTitle}"><span class="${this.selectClasses.classSelectValue}"><span class="${this.selectClasses.classSelectContent}${customClass}">${selectTitleValue}</span></span></button>`;
      }
    }
    // Конструктор данных для значения заголовка
    getSelectElementContent(selectOption) {
      // Если для элемента указан вывод картинки или текста, перестраиваем конструкцию
      const selectOptionData = selectOption.dataset.asset
        ? `${selectOption.dataset.asset}`
        : "";
      const selectOptionDataHTML =
        selectOptionData.indexOf("img") >= 0
          ? `<img src="${selectOptionData}" alt="">`
          : selectOptionData;
      let selectOptionContentHTML = ``;
      selectOptionContentHTML += selectOptionData
        ? `<span class="${this.selectClasses.classSelectRow}">`
        : "";
      selectOptionContentHTML += selectOptionData
        ? `<span class="${this.selectClasses.classSelectData}">`
        : "";
      selectOptionContentHTML += selectOptionData ? selectOptionDataHTML : "";
      selectOptionContentHTML += selectOptionData ? `</span>` : "";
      selectOptionContentHTML += selectOptionData
        ? `<span class="${this.selectClasses.classSelectText}">`
        : "";
      selectOptionContentHTML += selectOption.textContent;
      selectOptionContentHTML += selectOptionData ? `</span>` : "";
      selectOptionContentHTML += selectOptionData ? `</span>` : "";
      return selectOptionContentHTML;
    }
    // Получение данных плейсхолдера
    getSelectPlaceholder(originalSelect) {
      const selectPlaceholder = Array.from(originalSelect.options).find(
        (option) => !option.value
      );
      if (selectPlaceholder) {
        return {
          value: selectPlaceholder.textContent,
          show: selectPlaceholder.hasAttribute("data-show"),
          label: {
            show: selectPlaceholder.hasAttribute("data-label"),
            text: selectPlaceholder.dataset.label,
          },
        };
      }
    }
    // Получение данных из выбранных элементов
    getSelectedOptionsData(originalSelect, type) {
      // Получаем все выбранные объекты из select
      let selectedOptions = [];
      if (originalSelect.multiple) {
        // Если мультивыбор
        // Убираем плейсхолдер, получаем остальные выбранные элементы
        selectedOptions = Array.from(originalSelect.options)
          .filter((option) => option.value)
          .filter((option) => option.selected);
      } else {
        // Если единичный выбор
        selectedOptions.push(
          originalSelect.options[originalSelect.selectedIndex]
        );
      }
      return {
        elements: selectedOptions.map((option) => option),
        values: selectedOptions
          .filter((option) => option.value)
          .map((option) => option.value),
        html: selectedOptions.map((option) =>
          this.getSelectElementContent(option)
        ),
      };
    }
    // Конструктор элементов списка
    getOptions(originalSelect) {
      // Настрока скролла элементов
      let selectOptionsScroll = originalSelect.hasAttribute("data-scroll")
        ? `data-simplebar`
        : "";
      let selectOptionsScrollHeight = originalSelect.dataset.scroll
        ? `style="max-height:${originalSelect.dataset.scroll}px"`
        : "";
      // Получаем элементы списка
      let selectOptions = Array.from(originalSelect.options);
      if (selectOptions.length > 0) {
        let selectOptionsHTML = ``;
        // Если указана настройка data-show, показываем плейсхолдер в списке
        if (
          (this.getSelectPlaceholder(originalSelect) &&
            !this.getSelectPlaceholder(originalSelect).show) ||
          originalSelect.multiple
        ) {
          selectOptions = selectOptions.filter((option) => option.value);
        }
        // Строим и выводим основную конструкцию
        selectOptionsHTML += selectOptionsScroll
          ? `<div ${selectOptionsScroll} ${selectOptionsScrollHeight} class="${this.selectClasses.classSelectOptionsScroll}">`
          : "";
        selectOptions.forEach((selectOption) => {
          // Получаем конструкцию конкретного элемента списка
          selectOptionsHTML += this.getOption(selectOption, originalSelect);
        });
        selectOptionsHTML += selectOptionsScroll ? `</div>` : "";
        return selectOptionsHTML;
      }
    }
    // Конструктор конкретного элемента списка
    getOption(selectOption, originalSelect) {
      // Если элемент выбран и включен режим мультивыбора, добавляем класс
      const selectOptionSelected =
        selectOption.selected && originalSelect.multiple
          ? ` ${this.selectClasses.classSelectOptionSelected}`
          : "";
      // Если элемент выбрани нет настройки data-show-selected, скрываем элемент
      const selectOptionHide =
        selectOption.selected &&
        !originalSelect.hasAttribute("data-show-selected")
          ? `hidden`
          : ``;
      // Если для элемента указан класс добавляем
      const selectOptionClass = selectOption.dataset.class
        ? ` ${selectOption.dataset.class}`
        : "";
      // Если указан режим ссылки
      const selectOptionLink = selectOption.dataset.href
        ? selectOption.dataset.href
        : false;
      const selectOptionLinkTarget = selectOption.hasAttribute(
        "data-href-blank"
      )
        ? `target="_blank"`
        : "";
      // Строим и возвращаем конструкцию элемента
      let selectOptionHTML = ``;
      selectOptionHTML += selectOptionLink
        ? `<a ${selectOptionLinkTarget} ${selectOptionHide} href="${selectOptionLink}" data-value="${selectOption.value}" class="${this.selectClasses.classSelectOption}${selectOptionClass}${selectOptionSelected}">`
        : `<button ${selectOptionHide} class="${this.selectClasses.classSelectOption}${selectOptionClass}${selectOptionSelected}" data-value="${selectOption.value}" type="button">`;
      selectOptionHTML += this.getSelectElementContent(selectOption);
      selectOptionHTML += selectOptionLink ? `</a>` : `</button>`;
      return selectOptionHTML;
    }
    // Сеттер элементов списка (options)
    setOptions(selectItem, originalSelect) {
      // Получаем объект тела псевдоселекта
      const selectItemOptions = this.getSelectElement(
        selectItem,
        this.selectClasses.classSelectOptions
      ).selectElement;
      // Запускаем конструктор элементов списка (options) и добавляем в тело псевдоселекта
      selectItemOptions.innerHTML = this.getOptions(originalSelect);
    }
    // Обработчик клика на элемент списка
    optionAction(selectItem, originalSelect, optionItem) {
      if (originalSelect.multiple) {
        // Если мультивыбор
        // Выделяем классом элемент
        optionItem.classList.toggle(
          this.selectClasses.classSelectOptionSelected
        );
        // Очищаем выбранные элементы
        const originalSelectSelectedItems =
          this.getSelectedOptionsData(originalSelect).elements;
        originalSelectSelectedItems.forEach((originalSelectSelectedItem) => {
          originalSelectSelectedItem.removeAttribute("selected");
        });
        // Выбираем элементы
        const selectSelectedItems = selectItem.querySelectorAll(
          this.getSelectClass(this.selectClasses.classSelectOptionSelected)
        );
        selectSelectedItems.forEach((selectSelectedItems) => {
          originalSelect
            .querySelector(
              `option[value="${selectSelectedItems.dataset.value}"]`
            )
            .setAttribute("selected", "selected");
        });
      } else {
        // Если единичный выбор
        // Если не указана настройка data-show-selected, скрываем выбранный элемент
        if (!originalSelect.hasAttribute("data-show-selected")) {
          // Сначала все показать
          if (
            selectItem.querySelector(
              `${this.getSelectClass(
                this.selectClasses.classSelectOption
              )}[hidden]`
            )
          ) {
            selectItem.querySelector(
              `${this.getSelectClass(
                this.selectClasses.classSelectOption
              )}[hidden]`
            ).hidden = false;
          }
          // Скрываем выбранную
          optionItem.hidden = true;
        }
        originalSelect.value = optionItem.hasAttribute("data-value")
          ? optionItem.dataset.value
          : optionItem.textContent;
        this.selectAction(selectItem);
      }
      // Обновляем заголовок селекта
      this.setSelectTitleValue(selectItem, originalSelect);
      // Вызываем реакцию на изменение селекта
      this.setSelectChange(originalSelect);
    }
    // Реакция на измененение оригинального select
    selectChange(e) {
      const originalSelect = e.target;
      this.selectBuild(originalSelect);
      this.setSelectChange(originalSelect);
    }
    // Обработчик изменения в селекте
    setSelectChange(originalSelect) {
      const btnSum = document.querySelector(".calc-wells__btn");
      const oneSelect = document.querySelector('select[data-id="1"]');
      const calcObustroystva = document.getElementById("obustroystva-calc");
      let valueDepth;
      const vodosnabzhenieSelect = document.querySelector(
        'select[name="Источник водоснабжения"]'
      );
      if (
        document.querySelector(".select__input") &&
        document.querySelector(".calc-wells__inpt")
      ) {
        valueDepth =
          document.querySelector(".calc-wells__inpt").value ||
          document.querySelector(".select__input").dataset.placeholder;
      }

      if (
        !calcObustroystva &&
        originalSelect.dataset.id == 1 &&
        oneSelect.value &&
        valueDepth &&
        !vodosnabzhenieSelect
      ) {
        btnSum.classList.remove("_disable");
        btnSum.disabled = false;
      }
      if (
        calcObustroystva &&
        originalSelect.dataset.id == 2 &&
        btnSum &&
        document.querySelector(".calc-wells__inpt").value
      ) {
        btnSum.classList.remove("_disable");
        btnSum.disabled = false;
      }
      if (
        !calcObustroystva &&
        originalSelect.dataset.id == 3 &&
        btnSum &&
        document.querySelector(".select__input").dataset.placeholder &&
        oneSelect.value
      ) {
        btnSum.classList.remove("_disable");
        btnSum.disabled = false;
      }
      // Моментальная валидация селекта
      if (originalSelect.hasAttribute("data-validate")) {
        // formValidate.validateInput(originalSelect);
      }
      // При изменении селекта отправляем форму

      if (originalSelect.hasAttribute("data-submit") && originalSelect.value) {
        let tempButton = document.createElement("button");
        tempButton.type = "submit";
        originalSelect.closest("form").append(tempButton);
        tempButton.click();
        tempButton.remove();
      }
      const selectItem = originalSelect.parentElement;
      // Вызов коллбэк функции
      this.selectCallback(selectItem, originalSelect);
    }
    // Обработчик disabled
    selectDisabled(selectItem, originalSelect) {
      if (originalSelect.disabled) {
        selectItem.classList.add(this.selectClasses.classSelectDisabled);
        this.getSelectElement(
          selectItem,
          this.selectClasses.classSelectTitle
        ).selectElement.disabled = true;
      } else {
        selectItem.classList.remove(this.selectClasses.classSelectDisabled);
        this.getSelectElement(
          selectItem,
          this.selectClasses.classSelectTitle
        ).selectElement.disabled = false;
      }
    }
    // Обработчик поиска по элементам списка
    searchActions(selectItem) {
      const originalSelect = this.getSelectElement(selectItem).originalSelect;
      const selectInput = this.getSelectElement(
        selectItem,
        this.selectClasses.classSelectInput
      ).selectElement;
      const selectOptions = this.getSelectElement(
        selectItem,
        this.selectClasses.classSelectOptions
      ).selectElement;
      const selectOptionsItems = selectOptions.querySelectorAll(
        `.${this.selectClasses.classSelectOption}`
      );
      const _this = this;

      // selectInput.addEventListener('input', function () {
      selectOptionsItems.forEach((selectOptionsItem) => {
        if (
          selectOptionsItem.textContent
            .toUpperCase()
            .indexOf(selectInput.value.toUpperCase()) >= 0
        ) {
          selectOptionsItem.hidden = false;
        } else {
          selectOptionsItem.hidden = true;
        }
      });
      // Если список закрыт открываем
      selectOptions.hidden === true ? _this.selectAction(selectItem) : null;
      // });
    }
    // Коллбэк функция
    selectCallback(selectItem, originalSelect) {
      document.dispatchEvent(
        new CustomEvent("selectCallback", {
          detail: {
            select: originalSelect,
          },
        })
      );
    }
  }

  const selectCalc = new SelectConstructor();

  // ==============================================================
  // ==============================================================
  // калькуляторо для скважины
  // ==============================================================
  // ==============================================================
  function initCalcWells() {
    const imgBlock = document.querySelector(".calc-wells__bg-img");
    const finishBlock = document.querySelector(".calc-wells__finish");
    const sumBtn = document.querySelector(".calc-wells__btn");
    const inputsCalcWells = document.querySelectorAll(
      ".calc-wells input[type=text],.calc-wells input[type=number]"
    );
    const inputHiddenSum = document.getElementById("calc-wells__sum");
    const sumBlock = document.querySelector(".calc-wells__sum");
    //выкоючаем кнопку entre и tab
    inputsCalcWells.forEach((input) => {
      input.addEventListener("keydown", (event) => {
        if (event.keyCode == 13 || event.keyCode === 9) {
          event.preventDefault();
          return false;
        }
      });
    });
    // стоимость колодца
    function sumPriceKolodec(valueRings, valueObustroystva) {
      let priceRings = getPriceRings(valueRings);
      let krykiPrice = (valueRings - 1) * 4000;
      let sum = priceRings + valueObustroystva + krykiPrice;

      return String(new Intl.NumberFormat("ru", {}).format(sum)) + " руб.";
    }
    // считает кольца в кальке колодец
    function getPriceRings(valueRings) {
      if (valueRings <= 9) {
        return valueRings * 11000;
      } else if (valueRings <= 15) {
        return (valueRings - 9) * 12500 + 11000 * 9;
      } else {
        return (valueRings - 15) * 14000 + 12500 * 6 + 11000 * 9;
      }
    }
    // максимальное число в инпуте ввод и валидация на пустой
    function valideInput(selector, max = 250, select) {
      selector.addEventListener("input", (event) => {
        const vidVodosnabzhenie =
          findValueOption(select).innerText === "Скважина" ? 250 : 50;
        const numMax = vidVodosnabzhenie;

        if (event.target.value > numMax) {
          event.target.value = numMax;
          event.target.max = numMax;
        }

        if (selector.value === "") {
          sumBtn.disabled = true;
          sumBtn.classList.add("_disable");
        } else {
          sumBtn.disabled = false;
          sumBtn.classList.remove("_disable");
        }
      });
    }
    // преключаем между "Глубина скважины" и "Район бурения"
    const inptCalc = document.querySelector(".calc-wells__inpt");
    const slectAreaCalc = document.querySelector(".calc-wells__select");
    const inptBtn = document.querySelector("#int");
    const calcBtn = document.querySelector("#calc");
    let isActiv = true;
    function isShowCaclTab(calcBtn, inptBtn, inptCalc, slectAreaCalc) {
      if (inptBtn) {
        inptBtn.addEventListener("click", (e) =>
          cliclBtn(calcBtn, inptBtn, inptCalc, slectAreaCalc, true)
        );
      }
      if (calcBtn) {
        calcBtn.addEventListener("click", (e) =>
          cliclBtn(inptBtn, calcBtn, slectAreaCalc, inptCalc, false)
        );
      }
      function cliclBtn(
        removeSelector,
        addSelector,
        isHiddenCalc,
        isHiddenInpt,
        booleanValue
      ) {
        removeSelector.classList.remove("_active");
        addSelector.classList.add("_active");
        isHiddenInpt.hidden = true;
        isHiddenCalc.hidden = false;
        isActiv = booleanValue;
        inptCalc.value = "";
        sumBtn.classList.add("_disable");
        sumBtn.disabled = true;
        if (document.querySelector(".select__input")) {
          document.querySelector(".select__input").placeholder =
            "Район бурения";
          document.querySelector(".select__input").dataset.placeholder = "";
        }
      }
    }
    if (document.querySelector(".calc-wells-kolodec")) {
      const oneSelect = document.querySelector('select[data-id="1"]');
      const inputRings = document.getElementById("rings");

      sumBtn.addEventListener("click", function (e) {
        let valueObustroystva = Number(oneSelect.value);
        let valueRings = Number(inputRings.value);

        sumBlock.innerHTML = sumPriceKolodec(valueRings, valueObustroystva);
        inputHiddenSum.value = sumBlock.innerText;

        if (windowSizeUser()) {
          animatBlcok();
        } else {
          finishBlock.classList.add("_animat-mob");
        }
      });

      valideInput(inputRings, 50);
    }

    if (
      !document.querySelector(".calc-vodosnabzhenie") &&
      !document.querySelector(".calc-wells-kolodec") &&
      document.querySelector(".calc-wells")
    ) {
      const oneSelect = document.querySelector('select[data-id="1"]');
      const twoSelect = document.querySelector(
        'select[name="Вид обустройства"]'
      );
      const threeSelect = document.querySelector(
        'select[name="Район бурения"]'
      );

      const calcObustroystva = document.getElementById("obustroystva-calc");
      const calcMgbu = document.getElementById("mgbu");
      const sumBlock = document.querySelector(".calc-wells__sum");
      let res = 0;
      if (document.querySelector(".select__input")) {
        document.querySelector(".select__input").dataset.placeholder = "";
      }
      isShowCaclTab(calcBtn, inptBtn, inptCalc, slectAreaCalc);

      // кнопка "Рассчитать"
      sumBtn.addEventListener("click", resultCalc);

      function resultCalc(e) {
        let depthValue = isActiv
          ? inptCalc.value
          : findValueOption(threeSelect).dataset.valueDepth;
        let wellsValue = calcMgbu ? 4000 : 3650;

        if (depthValue < 40) {
          depthValue = 40;
        }

        if (calcObustroystva) {
          let cablePrice = 300 + 100 + 170;

          let vidObustroistva = document.querySelector(
            'select[name="Вид обустройства"] option:checked'
          );
          let vidObustroistvaPrice = 0;
          if (vidObustroistva)
            vidObustroistvaPrice = vidObustroistva.dataset.price;

          let arrangementPrice = vidObustroistvaPrice;
          depthValue = +depthValue / 2;

          if (depthValue > 70) {
            cablePrice = 470 + 100 + 170;
          }

          res = String(+depthValue * +cablePrice + +arrangementPrice);
        } else {
          let vidObustroistva = document.querySelector(
            'select[name="Вид обустройства"] option:checked'
          );
          let arrangementPrice = vidObustroistva.dataset.price
            ? vidObustroistva.dataset.price
            : 0;
          if (depthValue > 80) {
            wellsValue = wellsValue + 100;
          }
          res = String(+wellsValue * +depthValue + +arrangementPrice);
        }

        const newRes = res
          .split("")
          .reverse()
          .map((it, indx) => {
            if (indx == 0) return it;
            if (indx % 3 == 0) {
              return `${it} `;
            }
            return it;
          })
          .reverse()
          .join("");

        if (newRes) {
          if (windowSizeUser()) {
            animatBlcok();
          } else {
            finishBlock.classList.add("_animat-mob");
          }
          finishBlock.hidden = false;
          sumBlock.innerHTML = `${newRes} руб.`;
          inputHiddenSum.value = newRes;
        }
      }
      // события на проверку на пустое значения
      // события  на ввод макс.глубину 250
      inptCalc.addEventListener("input", (event) => {
        const numMax = calcMgbu ? 150 : 250;

        if (event.target.value > numMax) {
          event.target.value = numMax;
          event.target.max = numMax;
        }

        if (calcObustroystva && twoSelect.value) {
          sumBtn.disabled = inptCalc.value.trim().length === 0;
          sumBtn.classList.remove("_disable");
        }
        if (inptCalc.value !== "" && oneSelect.value) {
          sumBtn.disabled = false;
          sumBtn.classList.remove("_disable");
          return;
        }
        if (inptCalc.value === "") {
          sumBtn.disabled = true;
          sumBtn.classList.add("_disable");
        }
      });
      // берем значения с "Район бурения"
    }
    function findValueOption(select, dataName = "") {
      const option = select.querySelector(`option[value="${select.value}"]`);
      return option;
    }
    if (document.querySelector(".calc-vodosnabzhenie")) {
      const oneSelect = document.querySelector('select[data-id="1"]');
      const inputClacl = document.getElementById("len");
      const twoSelect = document.querySelector('select[data-id="2"]');

      isShowCaclTab(calcBtn, inptBtn, inptCalc, slectAreaCalc);
      valideInput(inputClacl, 250, oneSelect);

      sumBtn.addEventListener("click", function (e) {
        let valueObustroystva = Number(oneSelect.value);
        let valueInput = Number(inputClacl.value);
        let twoValueSelect = Number(twoSelect.value);
        const threeSelect = document.querySelector(
          'select[name="Район бурения"]'
        );
        const isObustroistva = Number(twoValueSelect)
          ? Number(valueObustroystva)
          : 0;
        const vidObustroistva = findValueOption(oneSelect).dataset.obustroystva;
        const areaWellsValue = findValueOption(threeSelect).dataset.valueDepth;
        if (vidObustroistva === "Скважина") {
          let priceMeter = 3650;
          let meterWellsValue = Number(valueInput)
            ? valueInput
            : areaWellsValue;

          if (meterWellsValue <= 40) {
            meterWellsValue = 40;
          }
          if (meterWellsValue > 80) {
            priceMeter = priceMeter + 100;
          }

          let sum =
            String(
              new Intl.NumberFormat("ru", {}).format(
                meterWellsValue * priceMeter + isObustroistva
              )
            ) + " руб.";

          sumBlock.innerHTML = sum;
          inputHiddenSum.value = sum;
        }

        if (vidObustroistva === "Колодец") {
          let sum = sumPriceKolodec(valueInput, isObustroistva);
          sumBlock.innerHTML = sum;
          inputHiddenSum.value = sum;
        }

        if (windowSizeUser()) {
          animatBlcok();
        } else {
          finishBlock.classList.add("_animat-mob");
        }
      });
    }
    //анимация
    function animatBlcok() {
      imgBlock.classList.add("_animat");
      finishBlock.classList.add("_animat");
    }
    const calcWellsBtnSubmit = document.getElementById("calc-wells__finish");
    if (calcWellsBtnSubmit) {
      calcWellsBtnSubmit.addEventListener("submit", function (e) {
        e.preventDefault();
        var th = $(calcWellsBtnSubmit);
        $(".load__preloader").fadeIn("", function () {
          $.ajax({
            type: "POST",
            url: "/index.php?route=common/footer/quiz_submit",
            data: th.serialize(),
            dataType: "json",
          }).done(function (json) {
            if (json["success"]) {
              window.location.href = "https://sewera.ru/sent/";
              $(".load__preloader").fadeOut("slow");
            }
          });
        });

        return false;
      });
    }
    function windowSizeUser() {
      if (window.matchMedia("(min-width: 1023.98px)").matches) {
        return true;
      } else {
        pageNavigation();
        return false;
      }
    }

    window.addEventListener("resize", windowSizeUser);
  }
  initCalcWells();
  function pageNavigation() {
    // data-goto - указать ID блока
    // data-goto-header - учитывать header
    // data-goto-speed - скорость (только если используется доп плагин)
    // Работаем при клике на пункт
    document.addEventListener("click", pageNavigationAction);
    // Если подключен scrollWatcher, подсвечиваем текущий пукт меню
    document.addEventListener("watcherCallback", pageNavigationAction);
    // Основная функция
    function pageNavigationAction(e) {
      if (e.type === "click") {
        const targetElement = e.target;
        if (targetElement.closest("[data-goto]")) {
          const gotoLink = targetElement.closest("[data-goto]");
          const gotoLinkSelector = gotoLink.dataset.goto
            ? gotoLink.dataset.goto
            : "";
          const noHeader = gotoLink.hasAttribute("data-goto-header")
            ? true
            : false;
          const gotoSpeed = gotoLink.dataset.gotoSpeed
            ? gotoLink.dataset.gotoSpeed
            : "500";
          gotoBlock(gotoLinkSelector, noHeader, gotoSpeed);
          e.preventDefault();
        }
      } else if (e.type === "watcherCallback") {
        if (e.detail) {
          const entry = e.detail.entry;
          const targetElement = entry.target;
          // Обработка пунктов навигации, если указано значение navigator подсвечиваем текущий пукт меню
          if (targetElement.dataset.watch === "navigator") {
            const navigatorItem = targetElement.id;
            const navigatorActiveItem = document.querySelector(
              `[data-goto]._navigator-active`
            );
            const navigatorCurrentItem = document.querySelector(
              `[data-goto="${navigatorItem}"]`
            );
            if (entry.isIntersecting) {
              // Видим объект
              // navigatorActiveItem ? navigatorActiveItem.classList.remove('_navigator-active') : null;
              navigatorCurrentItem
                ? navigatorCurrentItem.classList.add("_navigator-active")
                : null;
            } else {
              // Не видим объект
              navigatorCurrentItem
                ? navigatorCurrentItem.classList.remove("_navigator-active")
                : null;
            }
          }
        }
      }
    }
  }
  // Модуль плавной проктутки к блоку
  let gotoBlock = (targetBlock, noHeader = false, speed = 500, offset = 0) => {
    const targetBlockElement = document.querySelector(targetBlock);
    if (targetBlockElement) {
      let headerItem = "";
      let headerItemHeight = 0;
      if (noHeader) {
        headerItem = "header.header";
        headerItemHeight = document.querySelector(headerItem).offsetHeight;
      }
      let options = {
        speedAsDuration: true,
        speed: speed,
        header: headerItem,
        offset: offset,
        easing: "easeOutQuad",
      };
      // Закрываем меню, если оно открыто
      document.documentElement.classList.contains("menu-open")
        ? menuClose()
        : null;

      if (typeof SmoothScroll !== "undefined") {
        // Прокрутка с использованием дополнения
        new SmoothScroll().animateScroll(targetBlockElement, "", options);
      } else {
        // Прокрутка стандартными средствами
        let targetBlockElementPosition =
          targetBlockElement.getBoundingClientRect().top + scrollY;
        window.scrollTo({
          top: headerItemHeight
            ? targetBlockElementPosition - headerItemHeight
            : targetBlockElementPosition,
          behavior: "smooth",
        });
      }
    } else {
    }
  };
  // function stopPropBtnSlider() {
  //   const btns = document.querySelectorAll('.popolar-services__btn');

  //   btns.forEach((el) => {
  //     el.addEventListener('click', function (e) {
  //       e.preventDefault();
  //     });
  //   });
  // }

  // скрипт котрый отвечает за то что убирает margin в футаре
  function hiddenFooterMargin() {
    const footer = document.querySelector(".footer");
    const wrapperSite = document.querySelector("#wrapper-page");
    if (!document.querySelector(".banner-bottom")) return;
    if (wrapperSite.lastElementChild.classList.contains("banner-bottom")) {
      document.querySelector(".banner-bottom").classList.remove("section");
      footer.style.marginTop = 0;
    }
  }
  hiddenFooterMargin();
  // Подключение основного файла стилей

  // Основные модули ========================================================================================================================================================================================================================================================

  /*
Модуль работы со спойлерами
Документация:
Сниппет (HTML): spollers
*/
  spollers();

  /*
Модуль работы с табами
Документация:
Сниппет (HTML): tabs
*/
  tabs();

  /*
Модуль "показать еще"
Документация по работе в шаблоне:
Сниппет (HTML): showmore
*/
  showMore();

  // слайдер до и после
  $(window).on("load", function () {
    (function (window) {
      function SplitPic(element) {
        var el = $(element);
        var leftPane = $(".splitpic-left-image", el);
        var rightPane = $(".splitpic-right-image", el);
        var bar = $(".splitpic-bar", el);
        var infoHidden = false;
        // split the image at the cursor
        function updateSplit(x, isRelative) {
          var relativeX;
          if (!isRelative) {
            var elOffset = el.offset();
            relativeX = x - elOffset.left;
          } else {
            relativeX = x;
          }
          leftPane.css("clip", "rect(0px, " + relativeX + "px, auto, 0px)");
          bar.css("left", relativeX - bar.width() / 2 + "px");
        }
        // how much of the left image should we show at start? 50% if not specified
        var startPercentage = parseInt(el.attr("data-start-percent"));

        if (isNaN(startPercentage)) {
          startPercentage = 50;
        }
        startPercentage /= 100;
        updateSplit(el.width() * startPercentage, true);
        var isMoving = false;
        var lastX = 0,
          lastY = 0;
        el.on("touchmove touchstart", function (event) {
          if (!infoHidden) {
            $(".splitpic-info", el).fadeOut(200);
            infoHidden = true;
          }
          var touches;
          if (event.touches) {
            touches = event.touches;
          } else if (event.originalEvent && event.originalEvent.touches) {
            touches = event.originalEvent.touches;
          }
          if (touches) {
            var touch = touches[0];
            var dx = 0,
              dy = 0;
            if (isMoving) {
              dx = touch.pageX - lastX;
              dy = touch.pageY - lastY;
            } else {
              isMoving = true;
            }
            // if we move a bit and it's laterally
            if (Math.abs(dx) > Math.abs(dy)) {
              event.preventDefault();
              updateSplit(touches[0].pageX);
            }
            lastX = touch.pageX;
            lastY = touch.pageY;
          }
        });
        el.on("touchend", function (event) {
          isMoving = false;
        });
        el.on("mouseenter mousemove mouseleave", function (event) {
          if (!infoHidden) {
            $(".splitpic-info", el).fadeOut(200);
            infoHidden = true;
          }
          updateSplit(event.pageX);
        });
      }

      window.SplitPic = SplitPic;

      window.SplitPic = SplitPic;
    })(window);
    /* Для горизонтальных фото */
    $(".splitpic-horizontal .splitpic-images").each(function (i, v) {
      var sp = new SplitPic(v);
    });
  });
  //   =================================
  //   скрипты страницы партнеры
  //   =================================
  function rangePartnerInit() {
    const priceSlider = document.querySelector("#range-partner");

    var formatForSlider = {
      from: function (formattedValue) {
        return Number(formattedValue);
      },
      to: function (numericValue) {
        return Math.round(numericValue);
      },
    };
    if (priceSlider) {
      nouislider.create(priceSlider, {
        // Values are parsed as numbers using the "from" function in "format"
        start: 450000,
        step: 50000,
        range: {
          min: 50000,
          max: 1000000,
        },
        format: formatForSlider,
        tooltips: {
          // tooltips are output only, so only a "to" is needed
          to: function (numericValue) {
            return (
              String(new Intl.NumberFormat("ru", {}).format(numericValue)) +
              " р."
            );
          },
        },
        connect: [true, false],
        pips: {
          mode: "count",
          stepped: true,
          values: 6,
          format: {
            to: function (value) {
              return (
                String(new Intl.NumberFormat("ru", {}).format(value)) + " р."
              );
            },

            from: function (value) {
              return Number(value.replace(",-", ""));
            },
          },
        },
      });
      priceSlider.noUiSlider.on("update", () => {
        const clientsSelector = document.querySelector(
          ".calc-profit__number"
        ).innerText;
        getSumPartner(clientsSelector);
      });
    }
  }

  rangePartnerInit();

  inintCalcPartners();
  function inintCalcPartners() {
    getSumPartner();
    getClientsValue();
    function getClientsValue() {
      const clientsSelector = document.querySelector(".calc-profit__number");
      let countClient = 2;

      if (clientsSelector) {
        document
          .querySelector(".calc-profit__minus")
          .addEventListener("click", () => {
            countClient--;
            if (countClient < 1) {
              countClient = 1;
              return;
            }
            clientsSelector.innerHTML = countClient;
            getSumPartner(countClient);
          });
        document
          .querySelector(".calc-profit__plus")
          .addEventListener("click", () => {
            if (countClient === 25) {
              countClient = 25;
              return;
            }
            countClient++;
            clientsSelector.innerHTML = countClient;
            getSumPartner(countClient);
          });
      }
    }
  }
  function getSumPartner(countClient = 2) {
    const sumSelector = document.querySelector(".calc-profit__sum");
    if (sumSelector) {
      let sum = new Intl.NumberFormat("ru", {}).format(
        ((countClient * document.querySelector(".noUi-handle").ariaValueText) /
          100) *
          7
      );

      sumSelector.innerHTML = " " + sum;
    }
  }

  if (document.querySelector(".form-realization")) {
    document
      .querySelector(".form-realization")
      .addEventListener("submit", postEmail);

    function postEmail(e) {
      e.preventDefault();
      let data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        msg: document.getElementById("msg").value,
      };
      $(".load__preloader").fadeIn();
      let response = fetch(
        "/index.php?route=common/footer/form_submit_realization",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
        }
      )
        .then((res) => {
          if (res.ok) {
            window.location.href = "https://sewera.ru/sent/";
            $(".load__preloader").fadeOut("slow");
          }
        })
        .catch((err) => {
          alert(err.message);
          $(".load__preloader").fadeOut("slow");
        });
    }
  }
  editLogoFooter();
  function editLogoFooter() {
    const bgBlock = document.querySelector(".sewera-osveshhenie");
    if (bgBlock) {
      if (
        bgBlock.parentElement.parentElement.classList.contains(
          "page-width",
          "bg-black"
        )
      ) {
        const foooterLogoImg = document.querySelector(
          ".footer__logo  .logo__img"
        );

        foooterLogoImg.src =
          "/srv/assets/images/ykrashenie-doma/icon/logo-dark.svg";
      }
    }
  }
})();
