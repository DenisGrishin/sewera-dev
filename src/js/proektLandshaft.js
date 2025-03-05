﻿const typesProjectSelector = document.querySelectorAll(".tab-project__wrapper");

const getMaxOrMinHeight = (itemsSelector, option) => {
  if (itemsSelector.length === 0) return null;

  const listElementHeight = Array.from(itemsSelector).map(
    (element) => element.offsetHeight
  );

  if (option === "max") return Math.max(...listElementHeight);
  if (option === "min") return Math.min(...listElementHeight);

  return null;
};

function handleUpdateHeight() {
  const listAcc = document.querySelectorAll(".project-accordion");

  if (listAcc.length !== 0) {
    listAcc.forEach((list) => {
      list.addEventListener("click", function (e) {
        const btn = e.target.closest(".project-accordion__name");
        if (!btn) return;
        const parentBtn = btn.parentNode;
        const previousElement = parentBtn.previousElementSibling;
        const wrapper = e.target.closest(".tab-project__wrapper");

        const wrapperHeight = wrapper.clientHeight;

        if (btn.dataset.actv) {
          const prevHeight = +btn.dataset.actv;
          wrapper.style.minHeight = `${wrapperHeight - prevHeight - 20}px`;
          wrapper.style.maxHeight = `${wrapperHeight - prevHeight - 20}px`;
          if (previousElement) {
            previousElement.style.borderBottom = "";
          }
          delete btn.dataset.actv;
          return;
        }

        if (previousElement) {
          previousElement.style.borderBottom = "none";
        }

        const bodyAccordionHeight = btn.nextElementSibling.style.height;
        let bodyAccordionHeightValue = 0;
        console.log(bodyAccordionHeight);
        if (bodyAccordionHeight && bodyAccordionHeight.match(/\d+/)) {
          bodyAccordionHeightValue = Number(
            bodyAccordionHeight.match(/\d+/)[0]
          );
        }

        wrapper.style.minHeight = `${
          wrapperHeight + bodyAccordionHeightValue + 20
        }px`;
        wrapper.style.maxHeight = `${
          wrapperHeight + bodyAccordionHeightValue + 20
        }px`;

        btn.dataset.actv = bodyAccordionHeightValue;
      });
    });
  }
}
const updateHeight = (elements, heightElemnt) => {
  if (!elements.length || heightElemnt === null) return null;

  elements.forEach((element) => {
    element.style.minHeight = heightElemnt + "px";
    element.style.maxHeight = heightElemnt + "px";
  });
};
if (window.innerWidth > 1023.98) {
  handleUpdateHeight();
  updateHeight(
    typesProjectSelector,
    getMaxOrMinHeight(typesProjectSelector, "max")
  );
}
