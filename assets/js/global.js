"use-strict";

//adding the event to mutiple elements
function addEventOnElements(elements, callback) {
  elements.forEach(function (elem) {
    elem.addEventListener("click", callback);
  });
}

//toggling the search box
const searchBox = document.querySelector(".search-box");
const searchTogglers = document.querySelectorAll("[search-toogler]");

addEventOnElements(searchTogglers, function () {
  searchBox.classList.toggle("active");
});

//setting the movieid to localStorage
function addMovieId(movieId) {
  localStorage.setItem("movieId", String(movieId));
}
