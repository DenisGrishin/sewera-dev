initializePagination();
function initializePagination() {
  const paginationItems = document.querySelectorAll(".simplesearch-page");
  if (paginationItems.length !== 0) {
    updatePaginationVisibility();
    handlePaginationNavigation();
    function handlePaginationNavigation() {
      let searchParams = window.location.search.slice(1).split("&");
      let urlParams = {};

      const paginsLenght = paginationItems.length;
      const maximumQueryParams = 20 * paginsLenght;

      const nextBtn = document.querySelector(
        ".simplesearch-result-pages__next"
      );
      const prevBtn = document.querySelector(
        ".simplesearch-result-pages__prev"
      );

      let currentOffset = 0;
      for (let param of searchParams) {
        let [key, value] = param.split("=");
        urlParams[key] = decodeURIComponent(value || "");
        if (key === "simplesearch_offset") {
          currentOffset = urlParams[key];
        }

        if (urlParams[key] === "product") {
          document.querySelector(".simplesearch-paging").style.display = "flex";
        }
      }
      if (nextBtn) {
        nextBtn.addEventListener("click", function (e) {
          if (+currentOffset === maximumQueryParams - 20) return;
          currentOffset = +currentOffset + 20;
          editUrl(currentOffset);
        });
      }
      if (prevBtn) {
        prevBtn.addEventListener("click", function (e) {
          if (+currentOffset === 0) return;

          currentOffset = +currentOffset - 20;
          editUrl(currentOffset);
        });
      }

      function editUrl(newQueryParams) {
        const url = new URL(window.location.href);
        url.searchParams.set("simplesearch_offset", newQueryParams);
        window.location.href = url.toString();
      }
    }

    function addEllipsisToPagination(params) {
      const newElement = document.createElement("span");

      newElement.textContent = "...";
      newElement.classList.add("pag-ellipsis");
      paginationItems[params].parentNode.insertBefore(
        newElement,
        paginationItems[params].nextSibling
      );
    }

    function updatePaginationVisibility() {
      let max = 11;
      let currentIndx = 0;
      let visiblePageRange = 5;
      const screenWidth = window.innerWidth;

      if (paginationItems.length <= max) return;
      if (screenWidth < 1023.98) {
        max = 7;
        visiblePageRange = 3;
      }
      if (screenWidth < 767.98) {
        max = 5;
        visiblePageRange = 2;
      }
      paginationItems.forEach((element, indx) => {
        if (element.matches(".simplesearch-current-page")) {
          currentIndx = indx;
        }
      });
      // до тякущего активной странциы
      for (let z = 0; z < currentIndx; z++) {
        const element = paginationItems[z];
        element.hidden = true;

        // Добавляем многоточие, если нужно
        if (z === visiblePageRange) {
          addEllipsisToPagination(0);
        }
        // Показываем диапазон до и после текущей страницы
        if (z >= currentIndx - visiblePageRange) {
          element.hidden = false;
        }
        // Всегда показываем первую  страницы
        paginationItems[0].hidden = false;
      }
      // после тякущего активной странциы
      for (let index = currentIndx; index < paginationItems.length; index++) {
        const element = paginationItems[index];

        element.hidden = true;
        // Всегда  последнюю страницы
        paginationItems[paginationItems.length - 1].hidden = false;

        // Добавляем многоточие, если нужно
        if (index === paginationItems.length - 2 - visiblePageRange) {
          addEllipsisToPagination(paginationItems.length - 2);
        }
        // Показываем диапазон до и после текущей страницы
        if (index < currentIndx + max - visiblePageRange) {
          element.hidden = false;
          continue;
        }
      }
    }
  }
}

function disabledBtnTab() {
  const btns = document.querySelectorAll(".serarch-tabs__title");

  btns.forEach((btn) => {
    const numItem = btn.querySelector("span");
  });
}
