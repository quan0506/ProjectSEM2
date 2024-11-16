// SCROLL HEADER
let header = document.querySelector('header');
let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

window.addEventListener('scroll',()=>{
  header.classList.toggle('shadow',window.scrollY > 0);
});

menu.onclick = () =>{
  menu.classList.toggle('bx-x');
  navbar.classList.toggle('active');
}

window.onscroll = () =>{
  menu.classList.remove('bx-x');
  navbar.classList.remove('active');
}

// Render Api 
const apiURL = 'http://localhost:8080/api/movies/now-showing?page=0&size=28'; 

// Function to fetch and display all movies
function showAllMovies() {
  fetch(apiURL)
    .then(response => response.json())
    .then(data => {
      const movies = data.content;
      displayMovies(movies);
    })
    .catch(error => {
      console.log('Error:', error);
    });
}

// Function to fetch and display movies by category
function getMoviesByCategory(category) {
  let apiUrl = apiURL;
  if (category === 'opening') {
    apiURL = 'http://localhost:8080/api/movies/now-showing?page=0&size=28';
  }
  fetch(apiURL)
    .then(response => response.json())
    .then(data => {
      const movies = data.content;
      const moviesWithSelectedCategory = movies.filter(movie =>
        movie.categoryNameList.includes(category)
      );
      displayMovies(moviesWithSelectedCategory);
    })
    .catch(error => {
      console.log('Error:', error);
    });
}

// Function to display movies
function displayMovies(movies) {
  const moviesContainer = document.getElementById('moviesContainer');
  moviesContainer.innerHTML = '';

  movies.forEach(movie => {
    const movieDiv = document.createElement('div');
    movieDiv.classList.add('box');

    const movieImgContainer = document.createElement('div');
    movieImgContainer.classList.add('box-img');

    const movieImgLink = document.createElement('a');
    movieImgLink.href = `details.html?id=${movie.id}`;

    const movieImg = document.createElement('img');
    movieImg.src = movie.posterUrl;
    movieImg.alt = 'Movie Poster';
    movieImgLink.appendChild(movieImg);

    const movieOverlay = document.createElement('div');
    movieOverlay.classList.add('overlay');

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');

    const detailButton = document.createElement('a');
    detailButton.href = `details.html?id=${movie.id}`;
    detailButton.classList.add('detail-button');
    detailButton.textContent = 'Detail';

    buttonContainer.appendChild(detailButton);
    movieOverlay.appendChild(buttonContainer);

    const movieLabel = document.createElement('div');
    movieLabel.classList.add('movie-label');
    movieLabel.textContent = movie.movieLabel;

    movieImgContainer.appendChild(movieImgLink);
    movieImgContainer.appendChild(movieOverlay);
    movieImgContainer.appendChild(movieLabel);

    const movieNameLink = document.createElement('a');
    movieNameLink.href = `details.html?id=${movie.id}`;

    const movieName = document.createElement('h3');
    movieName.id = 'movieName';
    movieName.textContent = movie.movieName;
    movieNameLink.appendChild(movieName);

    const movieDuration = document.createElement('span');
    movieDuration.id = 'duration';
    movieDuration.textContent = `${movie.duration} min`;

    movieDiv.appendChild(movieImgContainer);
    movieDiv.appendChild(movieNameLink);
    movieDiv.appendChild(movieDuration);

    moviesContainer.appendChild(movieDiv);
  });
}

function showAllMovies() {
  // Hiển thị tất cả các bộ phim
  fetch(apiURL)
    .then(response => response.json())
    .then(data => {
      const movies = data.content;
      displayMovies(movies);
    })
    .catch(error => {
      console.log('Error:', error);
    });

  // Xóa lớp 'active' từ tất cả các nút
  var buttons = document.querySelectorAll('.btn');
  buttons.forEach(function (button) {
      button.classList.remove('active');
  });

  // Thêm lớp 'active' vào nút được nhấp chuột
  var showAllButton = document.getElementById('btn');
  showAllButton.classList.add('active');
}

function getMoviesByCategory(category) {
  // Lấy các bộ phim theo thể loại
  let apiUrl = apiURL;
  if (category === 'opening') {
    apiURL = 'http://localhost:8080/api/movies/now-showing?page=0&size=28';
  }
  fetch(apiURL)
    .then(response => response.json())
    .then(data => {
      const movies = data.content;
      const moviesWithSelectedCategory = movies.filter(movie =>
        movie.categoryNameList.includes(category)
      );
      displayMovies(moviesWithSelectedCategory);
    })
    .catch(error => {
      console.log('Error:', error);
    });

  // Xóa lớp 'active' từ tất cả các nút
  var buttons = document.querySelectorAll('.btn');
  buttons.forEach(function (button) {
      button.classList.remove('active');
  });

  // Thêm lớp 'active' vào nút được nhấp chuột
  var clickedButton = document.querySelector('[data-category="' + category + '"]');
  clickedButton.classList.add('active');
}
