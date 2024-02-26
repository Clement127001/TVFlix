"use strict";

import { imageBaseUrl, fetchMovieDetails } from "./api.js";
import { collectGenere } from "./sidebar.js";

window.addEventListener("DOMContentLoaded", initiateDetails);
const movieId = localStorage.getItem("movieId");
const container = document.querySelector(".container");

async function initiateDetails() {
  try {
    //fetching the movie details
    await fetchMovieDetails(
      `https://api.themoviedb.org/3/movie/${movieId}?append_to_response=casts,videos,images,releases&language=en-US`,
      function (movie) {
        createDetails(movie);
      }
    );
    await collectGenere();
  } catch (err) {
    console.log("Error happened");
  }
}

//to create the details page
function createDetails(movie) {
  console.log(movie);
  const {
    backdrop_path,
    poster_path,
    title,
    release_date,
    runtime,
    vote_average,
    genres,
    overview,
    releases: {
      countries: [{ certification }],
    },
    casts: { cast, crew },
    videos: { results: videos },
  } = movie;

  document.title = title;

  //adding the details page content
  const details = document.createElement("div");
  details.classList.add("movie-detail");

  details.innerHTML = ` <div
      class="backdrop-image"
      style="background-image: url('${imageBaseUrl}${"w1280" || "original"}${
    backdrop_path || poster_path
  }');"
    ></div>

    <figure class="poster-box movie-poster">
      <img
        src="${imageBaseUrl}w1280${backdrop_path}"
        alt="${title}"
      />
    </figure>

    <div class="detail-box">
      <div class="detail-content">
        <h1 class="heading">${title}</h1>

        <!-- meta details -->
        <div class="meta-list">
          <div class="meta-item">
            <img
              src="assets/images/star.png"
              alt="rating"
              width="20"
              height="20"
            />
            <span class="span">${vote_average.toFixed(1)}</span>
          </div>

          <div class="separator"></div>
          <div class="meta-item">${runtime}m</div>

          <div class="separator"></div>
          <div class="meta-item">${release_date.split("-")[0]}</div>

          <div class="meta-item card-badge">${certification}</div>
        </div>

        <p class="genre">${getGenres(genres)}</p>

        <p class="overview">
          ${overview}
        </p>

        <!-- details-list -->
        <ul class="detail-list">
          <div class="list-item">
            <p class="list-name">Starring</p>
            <p>
              ${getCast(cast)}
            </p>
          </div>

          <div class="list-item">
            <p class="list-name">Directed By</p>
            <p>${getDirector(crew)}</p>
          </div>
        </ul>
      </div>

      <!-- trailer and clips -->
      <div class="title-wrapper">
        <h3 class="text-large">Trailers and Clips</h3>
      </div>

      <div class="slider-list">
        <div class="slider-inner">
        </div>
      </div>
    </div>`;

  const filteredVideos = filterVidoes(videos);
  const videoInner = details.querySelector(".slider-inner");

  //adding the video cards
  filteredVideos.forEach(function ({ key, name }) {
    const videoCard = document.createElement("div");
    videoCard.classList.add("video-card");

    videoCard.innerHTML = `
      <iframe
        width="500"
        height="294"
        src="https://www.youtube.com/embed/${key}?&theme=dark&color=white&rel=0"
        frameborder="0"
        allowfullscreen="1"
        title="${name}"
      ></iframe>
    `;

    videoInner.appendChild(videoCard);
  });

  container.appendChild(details);
}

//utility functions
function getGenres(genreList) {
  const genres = [];

  for ({ name } of genreList) genres.push(name);

  return genres.join(", ");
}

//cast list
function getCast(cast) {
  const casts = [];
  const len = cast.length > 10 ? 10 : cast.length;

  for (let i = 0; i < len; i++) {
    const name = cast[i].name;
    casts.push(name);
  }

  return casts.join(", ");
}

//get director
function getDirector(dirList) {
  const dirs = dirList.reduce(function (res, dir) {
    if (dir.job === "Director") res.push(dir.name);

    return res;
  }, []);

  return dirs.join(", ");
}

//filtering the teaser that are from youtube
function filterVidoes(videoList) {
  let videos = videoList.filter(function ({ type, site }) {
    return (type === "Trailer" || type === "Teaser") && site === "YouTube";
  });

  return videos;
}
