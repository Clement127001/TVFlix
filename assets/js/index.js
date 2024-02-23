"use strict";

import { fetchMovieDetails, imageBaseUrl } from "./api.js";
import { collectGenere } from "./sidebar.js";

window.addEventListener("DOMContentLoaded", initiateSidebar);

async function initiateSidebar() {
  try {
    await collectGenere();

    //then the next task is to make the popular movies banner interactive
    await createBanner();
  } catch (err) {
    console.log("Error occured");
  }
}

const container = document.querySelector(".container");

const gnereList = {
  asString(genreIdList) {
    const newGenreList = [];

    for (const gnereId of genreIdList) {
      this[gnereId] && newGenreList.push(this[gnereId]);
    }

    return newGenreList.join(", ");
  },
};

async function createBanner() {
  //fetching the gnere list
  fetchMovieDetails(
    "https://api.themoviedb.org/3/genre/movie/list?language=en",
    function ({ genres }) {
      for (const { id, name } of genres) {
        gnereList[id] = name;
      }

      // console.log(gnereList);
    }
  );
  //fetching the movie list
  fetchMovieDetails(
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
    heroBanner
  );
}

function heroBanner({ results: movieList }) {
  let controllerIndex = 0;

  // console.log(movieList);

  //adding the banner slider
  const bannerSlider = document.querySelector(".banner-slider");
  let sliderItems = movieList
    .map(function (movie, index) {
      const {
        backdrop_path,
        title,
        overview,
        vote_average,
        genre_ids,
        release_date,
        id,
      } = movie;

      return `<div class="slider-item" slider-item>
      <img
        src="${imageBaseUrl}w1280${backdrop_path}" 
        class="img-cover"
        alt=${title}
        loading=${index === 0 ? "eager" : "lazy"}
      />

      <!-- slider content -->
      <div class="banner-content">
        <h2 class="heading">${title}</h2>

        <div class="meta-list">
          <div class="meta-item">${release_date.split("-")[0]}</div>
          <div class="meta-item card-badge">${vote_average.toFixed(1)}</div>
        </div>

        <p class="genre">${gnereList.asString(genre_ids)}</p>
        <p class="banner-text">
          ${overview}
        </p>

        <a href="detail.html" class="btn">
          <img
            src="./assets//images/play_circle.png"
            alt="play"
            width="24"
            height="24"
          />
          <span>Watch Now</span>
        </a>
      </div>
    </div>`;
    })
    .join(" ");

  bannerSlider.innerHTML = sliderItems;

  //adding the slider controls
  const sliderControlInner = document.querySelector(
    ".slider-control .control-inner"
  );

  let sliderInner = movieList
    .map(function (movie, index) {
      const { title, poster_path } = movie;

      return `<button class="poster-box slider-item" slider-control>
  <img src="${imageBaseUrl}w154${poster_path}" alt="${title}" loading="lazy" draggable="false" />
</button>`;
    })
    .join(" ");

  sliderControlInner.innerHTML = sliderInner;

  addSlide();
}

//adding the slider functionality
function addSlide() {
  const sliderItem = document.querySelectorAll(".slider-item");
  const sliderControl = document.querySelectorAll("[slider-control]");

  let lastSliderItem = sliderItem[0];
  let lastSliderControl = sliderControl[0];

  lastSliderItem.classList.add("active");
  console.log(lastSliderControl);
  lastSliderControl.classList.add("active");
}
