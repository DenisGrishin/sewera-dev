﻿function toggleDropMenu() {
  const brnDropMenu = document.querySelectorAll(".drop-menu__btn");
  const dropMenu = document.querySelectorAll(".drop-menu");
  let isShow = false;

  brnDropMenu.forEach((element) => {
    element.addEventListener("click", function (e) {
      if (element.parentElement.matches("._show")) {
        hiddenMenu();
        return;
      }
      hiddenMenu();

      if (isShow) {
        isShow = false;
        element.parentElement.classList.toggle("_show");
        return;
      }

      isShow = true;
      element.parentElement.classList.add("_show");
    });
  });

  document.addEventListener("click", function (e) {
    let target = e.target;

    if (
      target.closest(".drop-menu__btn") ||
      target.closest(".drop-menu__wrapper-list")
    ) {
      return;
    }

    hiddenMenu();
  });
  function hiddenMenu() {
    dropMenu.forEach((element) => {
      element.classList.remove("_show");
    });
  }
}

function hoverCatalogBtn() {
  const btnMenu = document.querySelector(".burger-btn");
  const blockMenu = document.querySelector(".catalog-menu");
  if (btnMenu) {
    btnMenu.addEventListener("mouseover", (e) => {
      btnMenu.classList.add("_active-burger");
      blockMenu.hidden = false;
      autoHeightSubMenu();
    });
  }

  handlerMouseout(blockMenu);
  handlerMouseout(btnMenu);

  function handlerMouseout(selectorHandle) {
    if (selectorHandle) {
      selectorHandle.addEventListener("mouseout", (e) => {
        let { relatedTarget } = e;

        if (!relatedTarget || relatedTarget.closest(".catalog-menu__bg")) {
          blockMenu.hidden = true;
          btnMenu.classList.remove("_active-burger");
          return;
        }

        if (!relatedTarget || relatedTarget.closest(".catalog-menu")) {
          return;
        }

        blockMenu.hidden = true;
        btnMenu.classList.remove("_active-burger");
      });
    }
  }
}

function addFormClass() {
  const btnsClear = document.querySelectorAll(".btn-claer-input");
  const inputs = document.querySelectorAll("[name='search']");

  inputs.forEach((element) => {
    element.addEventListener("keyup", () => {
      element.nextElementSibling.hidden = false;
    });
    element.addEventListener("focus", function (e) {
      element.parentElement.classList.add("_active");
    });
    element.addEventListener("blur", function (e) {
      element.parentElement.classList.remove("_active");

      if (!element.value.length) {
        element.nextElementSibling.hidden = true;
      }
    });
  });

  btnsClear.forEach((element) => {
    element.addEventListener("click", function (e) {
      element.previousElementSibling.value = "";
      element.hidden = true;
    });
  });
}
function showCatalogBtn() {
  const openBtnMenu = document.querySelector(".touch-burger-open");
  const closeBtnMenu = document.querySelector(".touch-burger-close");
  const catalogTouch = document.querySelector(".touch-catalog-menu");
  const bgMenu = document.querySelector(".touch-catalog-menu__bg");
  if (openBtnMenu) {
    openBtnMenu.addEventListener("click", function (e) {
      catalogTouch.classList.add("_show");

      document.querySelector(".page-width").style.overflowY = "hidden";
      document.body.classList.add("no-scroll");

      closeBtnMenu.classList.add("_active-burger");
    });
  }
  if (closeBtnMenu) {
    closeBtnMenu.addEventListener("click", function (e) {
      catalogTouch.classList.remove("_show");

      document.querySelector(".page-width").style.overflowY = "auto";
      document.body.classList.remove("no-scroll");
      closeBtnMenu.classList.remove("_active-burger");
    });
  }
  if (bgMenu) {
    bgMenu.addEventListener("click", function (e) {
      catalogTouch.classList.remove("_show");
      document.querySelector(".page-width").style.overflowY = "auto";
      document.body.classList.remove("no-scroll");
      closeBtnMenu.classList.remove("_active-burger");
    });
  }
}
function hoverCatalogItemMenu() {
  const itemMainMenu = document.querySelectorAll(".main-nav__item");
  const itemSubMenu = document.querySelectorAll(".sub-nav__item");

  itemMainMenu.forEach((it) => {
    it.addEventListener("mouseover", (e) => {
      let { target } = e;

      removeAllClass();
      it.classList.add("_active");

      itemSubMenu.forEach((subIt) => {
        if (
          target.closest(".main-nav__item").dataset.category ===
          subIt.dataset.category
        ) {
          subIt.hidden = false;
        } else {
          subIt.hidden = true;
        }
      });
    });
  });

  function removeAllClass() {
    itemMainMenu.forEach((it) => {
      it.classList.remove("_active");
    });
  }
}

function showSearchBlock() {
  const blockSearch = document.querySelector(".touch-search-block");
  const btnsSearch = document.querySelectorAll(".header-touch__btn-search");
  const backBtnSearch = document.querySelector(".touch-search-block__back");
  const inputSearch = document.querySelector(".bottom-header__input-serarch");
  const btnClear = document.querySelector(".bottom-header__btn-clear-input");
  const touchInputSearch = document.querySelector(
    ".touch-search-block__input-serarch"
  );
  if (inputSearch) {
    inputSearch.addEventListener("keyup", showSearch);
    inputSearch.addEventListener("focus", showSearch);
  }

  function showSearch() {
    document
      .getElementById("desktop-search-list")
      .classList.add("_show-search");
    btnClear.hidden = false;
  }
  if (inputSearch) {
    inputSearch.addEventListener("blur", () => {
      setTimeout(function () {
        document
          .getElementById("desktop-search-list")
          .classList.remove("_show-search");
      }, 300);
    });
  }
  if (btnsSearch) {
    btnsSearch.forEach((element) => {
      element.addEventListener("click", function (e) {
        blockSearch.classList.add("_show-touch-search");
        document.body.classList.add("no-scroll");
        document.querySelector(".page-width").style.overflowY = "hidden";

        touchInputSearch.focus();
      });
    });
  }
  if (backBtnSearch) {
    backBtnSearch.addEventListener("click", function (e) {
      blockSearch.classList.remove("_show-touch-search");

      if (!document.querySelector(".touch-catalog-menu").matches("._show")) {
        document.body.classList.remove("no-scroll");
        document.querySelector(".page-width").style.overflowY = "auto";
      }
    });
  }
}
function getMaxOfArray(numArray) {
  return Math.max.apply(null, numArray);
}
function autoHeightSubMenu() {
  const menuWrappers = document.querySelectorAll(".menu-sub__wrapper");
  const heightNameMenuSub = document.querySelectorAll(".menu-sub__name"); //.offsetHeight
  let numArr = [];

  heightNameMenuSub.forEach((element) => {
    numArr.push(element.offsetHeight);
  });
  const maxHeightName = getMaxOfArray(numArr);

  const heightMainMenu = document.querySelector(
    ".catalog-menu__main-nav"
  ).offsetHeight;
  menuWrappers.forEach((menuWrapper) => {
    menuWrapper.style.maxHeight = heightMainMenu - maxHeightName + "px";
  });
}

function switchDarkLogo() {
  const logos = document.querySelectorAll(".logo img");
  const footer = document.querySelector(".footer");
  const header = document.querySelector(".header");

  if (document.querySelector(".dark-thema")) {
    if (footer.closest(".dark-thema") || header.closest(".dark-thema")) {
      logos.forEach((logo) => {
        logo.src = "/srv/assets/images/main/header/icons/logo-dark.svg";
      });
    }
  }
}
autoHeightSubMenu();
switchDarkLogo();
showCatalogBtn();
showSearchBlock();
hoverCatalogBtn();
hoverCatalogItemMenu();
toggleDropMenu();
addFormClass();

let last_ajax_search_query = "";
let last_ajax_search_result = "";
let last_ajax_search_time = new Date();
let ajax_search_tid = null;

$(function () {
  $('input[name="search"]').on("keyup focus", function () {
    let inp = this;
    let target = this.dataset.target;

    if (inp.value.length < 4) return;

    $("#" + target).html(
      '<li class="search-list-block__item" id="search-loader"></li>'
    );

    if (ajax_search_tid !== null) clearTimeout(ajax_search_tid);
    ajax_search_tid = setTimeout(function () {
      ajaxSearch(inp);
    }, 300);

    let last = last_ajax_search_time;
    last_ajax_search_time = new Date();
    // console.log(inp.value + ' ' + (last_ajax_search_time - last));
  });
});

function ajaxSearch(inp) {
  var value = inp.value;
  let target = inp.dataset.target;

  if (value == last_ajax_search_query) {
    $("#" + target).html(last_ajax_search_result);
  } else {
    // console.log('REQUEST '+value);
    $.ajax({
      url: "/srv/ajax?action=search&search=" + value,
      beforeSend: function () {
        $("#" + target).html(
          '<li class="search-list-block__item" id="search-loader"></li>'
        );
      },
      complete: function (result) {
        last_ajax_search_query = value;
        last_ajax_search_result = result.responseText;
        $("#" + target).html(last_ajax_search_result);
      },
    });
  }
}
