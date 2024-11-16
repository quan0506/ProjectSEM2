
/************************************ */
// SCROLL HEADER
let header = document.querySelector("header");
let menu = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  header.classList.toggle("shadow", window.scrollY > 0);
});

menu.onclick = () => {
  menu.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

window.onscroll = () => {
  menu.classList.remove("bx-x");
  navbar.classList.remove("active");
};

const movieNameElements = document.querySelectorAll(".movieName");
const description = document.querySelector(".description");
const director = document.querySelector(".director");
const categoryNameList = document.querySelector(".categoryNameList");
const duration = document.querySelector(".duration");
const language = document.querySelector(".language");
const openingTime = document.querySelector(".openingTime");
const closingTime = document.querySelector(".closingTime");
const posterUrl = document.querySelector(".posterUrl img");
const detailsIndexMovieName = document.querySelector("#details-index .movieName");
const trailerIframe = document.querySelector(".iframe iframe");

const choosePayBtn = document.querySelector('#choose-pay-btn');


let urlParams = new URLSearchParams(window.location.search);
let movieId = decodeURIComponent(urlParams.get("id"));

// // Fetch API data
fetch(`http://localhost:8080/api/movies/${movieId}`)
  .then((response) => response.json())
  .then((movie) => {
    console.log(movie);
    const movieNameElements = document.querySelectorAll(".movieName");
    const description = document.querySelector(".description");
    const director = document.querySelector(".director");
    const categoryNameList = document.querySelector(".categoryNameList");
    const duration = document.querySelector(".duration");
    const language = document.querySelector(".language");
    const openingTime = document.querySelector(".openingTime");
    const closingTime = document.querySelector(".closingTime");
    const posterUrl = document.querySelector(".posterUrl img");
    const detailsIndexMovieName = document.querySelector("#details-index .movieName");
    const trailerIframe = document.querySelector(".iframe iframe");
    // const movieLinks = document.querySelectorAll('a[href^="details.html?id="]');
    const commentList = document.querySelector(".comment-list");
    console.log(commentList);

    movieNameElements.forEach((e) => (e.textContent = movie.movieName));
    description.textContent = movie.description;
    categoryNameList.textContent = `Category: ${movie.categoryNameList.join(", ")}`;
    duration.textContent = `Duration: ${movie.duration} min`;
    language.textContent = `Language: ${movie.language}`;
    openingTime.textContent = `Premiere Date: ${new Date(movie.openingTime).toLocaleDateString()}`;
    closingTime.textContent = `End Date: ${new Date(movie.closingTime).toLocaleDateString()}`;
    posterUrl.src = movie.posterUrl;
    detailsIndexMovieName.textContent = movie.movieName;
    trailerIframe.src = movie.trailerUrl;

    // Render openingTime in the notification
    const contentNotification = document.querySelector(".content-notification");
    const notificationOpeningTime = document.querySelector(".content-notification .openingTime");

    // Format the openingTime to a readable date string
    const formattedOpeningTime = new Date(movie.openingTime).toLocaleDateString();

    // Update the content of the notification
    notificationOpeningTime.textContent = `Premiere Date: ${formattedOpeningTime}`;
    });
 
  // NOTITIFICATION
  function showNotification() {
    document.getElementById("overlay").classList.remove("hidden");
    document.getElementById("notification").classList.remove("hidden");
  }

  function hideNotification() {
    document.getElementById("overlay").classList.add("hidden");
    document.getElementById("notification").classList.add("hidden");
  }
