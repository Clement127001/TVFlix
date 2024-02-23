"use strict";
import { fetchMovieDetails, options, imageBaseUrl } from "./api.js";

// window.addEventListener("DOMContentLoaded", collectGenere);

export async function collectGenere() {
  try {
    await sidebar();
    addMenuTogglers();
  } catch (err) {
    console.log(err);
  }
}

async function sidebar() {
  fetchMovieDetails(
    "https://api.themoviedb.org/3/genre/movie/list?language=en",
    function ({ genres }) {
      for (const { id, name } of genres) {
        genreLink(id, name);
      }
    }
  );
}

function addMenuTogglers() {
  // console.log("adding the toggling functionality");

  const menuBtn = document.querySelector(".menu-btn");

  const sidebarLinks = document.querySelectorAll(".sidebar-link");
  const list = [...sidebarLinks];
  const overlay = document.querySelector(".overlay");
  list.push(overlay);
  list.push(menuBtn);

  list.forEach((item) => {
    item.addEventListener("click", toggleItems);
  });
}

//utility functions

//generating the links
function genreLink(id, name) {
  const sideBarGenereList = document.querySelector(".sidebar-list");

  //creating the new genre element
  const newGenre = document.createElement("a");
  newGenre.classList.add("sidebar-link");
  newGenre.setAttribute("href", "./movie-list.html");
  //   newGenre.setAttribute("onClick", `getMovieList("with_genres${id},${name}")`);
  newGenre.textContent = name;

  //adding the element
  sideBarGenereList.appendChild(newGenre);
}

//toggling menu
function toggleItems() {
  const menuBtn = document.querySelector(".menu-btn");
  const sidebar = document.querySelector(".sidebar");
  const overlay = document.querySelector(".overlay");

  menuBtn.classList.toggle("active");
  sidebar.classList.toggle("active");
  overlay.classList.toggle("active");
}
