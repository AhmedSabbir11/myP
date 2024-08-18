/* Merged functionality from main.js and script(5).js */

/* Preloader */
const preloader = document.querySelector("[data-preloader]");
window.addEventListener("DOMContentLoaded", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});

/* Header shadow on scroll */
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
  header.classList.toggle("shadow", window.scrollY > 0);
});

/* Filter functionality from main.js */
$(document).ready(function () {
  $(".filter-item").click(function () {
    const value = $(this).attr("data-filter");
    if (value == "all") {
      $(".post-box").show("1000");
    } else {
      $(".post-box")
        .not("." + value)
        .hide(1000);
      $(".post-box")
        .filter("." + value)
        .show("1000");
    }
  });
  $(".filter-item").click(function () {
    $(this).addClass("active-filter").siblings().removeClass("active-filter");
  });
});

/* Navbar toggle and overlay from script(5).js */
const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

navTogglers.forEach(toggler => {
  toggler.addEventListener("click", () => {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("nav-active");
  });
});


overlay.addEventListener("click", () => {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
  document.body.classList.remove("nav-active");
});

/* Progress Bar functionality */
const progressBar = document.querySelector(".progress-bar");
const documentHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

window.onscroll = function() {
  const progress = (scrollY / documentHeight) * 100;
  progressBar.style.width = progress + "%";
};
