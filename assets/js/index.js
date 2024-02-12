"use-strict";

//adding the event to mutiple elements
function addEventOnElements(elements, callback) {
  elements.forEach(function (elem) {
    elem.addEventListener("click", callback);
  });
}

const searchBox = document.querySelector(".search-box");
const searchTogglers = document.querySelectorAll("[search-toogler]");

addEventOnElements(searchTogglers, function () {
  searchBox.classList.toggle("active");
});
