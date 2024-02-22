"use strict";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMTQ3ZmUxM2Y4MjhiZDFlNjkyZTA3ZWY2YWZlYTg1ZCIsInN1YiI6IjY1ZDU3YmYyZWQyYWMyMDE2MzM0ODI3OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5sfQWHvtlgYclzy94MSofLqdfIgknzXmGN4DbVKJtvE",
  },
};

const imageBaseUrl = "http://image.tmdb.org/t/p/";

async function fetchMovieDetails(url, callback, optionalParameter) {
  try {
    const moviesData = await fetch(url, options);
    const movies = await moviesData.json();
    callback(movies, optionalParameter);
  } catch (err) {
    console.log(err);
  }
}

export { imageBaseUrl, options, fetchMovieDetails };
