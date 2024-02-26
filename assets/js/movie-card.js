"use strict";

import { imageBaseUrl } from "./api.js";

export function createMovieCard(movie) {
  const { poster_path, title, vote_average, release_date, id } = movie;

  const movieCard = document.createElement("div");
  movieCard.classList.add("movie-card");

  movieCard.innerHTML = `
    <figure class="poster-box card-banner">
      <img
        src="${imageBaseUrl}w342${poster_path}"
        alt="${title}"
        class="img-cover"
        loading="lazy"
      />
    </figure>
    <h4 class="title">${title}</h4>

    <!-- meta-list -->
    <div class="meta-list">
      <div class="meta-item">
        <img
          src="/assets/images/star.png"
          alt="rating"
          width="20"
          height="20"
          loading="lazy"
        />
        <span class="span">${vote_average.toFixed(1)} </span>
      </div>

      <div class="card-badge">${release_date.split("-")[0]}</div>
    </div>

    <a href="detail.html" class="card-btn" title="${title}"></a>
  `;

  movieCard.addEventListener("click", function () {
    addMovieId(id);
  });

  return movieCard;
}
