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
const movieLinks = document.querySelectorAll('a[href^="details.html?id="]');
const choosePayBtn = document.querySelector('#choose-pay-btn');

let urlParams = new URLSearchParams(window.location.search);
let movieId = decodeURIComponent(urlParams.get("id"));
if (choosePayBtn) {
  choosePayBtn.href = `choosepay.html?movie-id=${movieId}`;
}

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
    const averageStar = document.querySelector(".averageStar");
    const trailerIframe = document.querySelector(".iframe iframe");
    // const movieLinks = document.querySelectorAll('a[href^="details.html?id="]');
    const commentList = document.querySelector(".commentList");
    console.log(commentList);

    movieNameElements.forEach((e) => (e.textContent = movie.movieName));
    description.textContent = movie.description;
    categoryNameList.textContent = `Category: ${movie.categoryNameList.join(", ")}`;
    duration.textContent = `Duration: ${movie.duration} min`;
    language.textContent = `Language: ${movie.language}`;
    openingTime.textContent = `Premiere Date: ${new Date(movie.openingTime).toLocaleDateString()}`;
    closingTime.textContent = `End Date: ${new Date(movie.closingTime).toLocaleDateString()}`;
    averageStar.innerHTML = `Average Star: ${movie.averageStar} <i class='bx bxs-star'></i>` ;
    posterUrl.src = movie.posterUrl;
    detailsIndexMovieName.textContent = movie.movieName;
    trailerIframe.src = movie.trailerUrl;

    commentList.innerHTML = "";
    movie.commentList.forEach((comment) => {
      let stars = '';
      for (let i = 0; i < comment.starRate; i++) {
        stars += "<i class='bx bxs-star'></i>";
      }
      
      commentList.innerHTML += `
        <div class="comment">
          <div class="flex">
              <div class="user">
                <div class="user-image"><img src="image/icon2.jpg" alt="" /></div>
                <div class="user-meta">
                  <div class="commentUsername"><p>${comment.commentUsername}</p></div>
                  <div class="starRate">${stars}</div>
                </div>
              </div>
              <div class="reply">
                <div class="like icon"><i class="bx bx-like"></i></div>
                <div class="dislike icon"><i class="bx bx-dislike"></i></div>
                <div class="">Reply</div>
              </div>
          </div>
          <div class="commentContent">
            <p>${comment.commentContent}</p>
          </div>
        </div>  
      `;
    });

    // Add "Like" or "Dislike"
    const replyDiv = document.querySelectorAll(".reply");

    replyDiv.forEach((replyDivs) => {
      const likeBtn = replyDivs.querySelector(".like");
      const dislikeBtn = replyDivs.querySelector(".dislike");
      let likesCount = 0;
      let dislikesCount = 0;

      likeBtn.addEventListener("click", () => {
        likesCount++;
        updateCounts();
      });

      dislikeBtn.addEventListener("click", () => {
        dislikesCount++;
        updateCounts();
      });

      function updateCounts() {
        const likeCountElement = likeBtn.querySelector("i");
        const dislikeCountElement = dislikeBtn.querySelector("i");

        likeCountElement.textContent = likesCount;
        dislikeCountElement.textContent = dislikesCount;
      }
    });
  });
// });





  

