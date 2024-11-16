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


// Render API COMMING SOON ra ngoài trình duyệt và phân trang
const fetchApi = async (api) => {
  const response = await fetch(api);
  const data = await response.json();
  return data;
};

document.addEventListener("DOMContentLoaded", () => {
  const moviesSection = document.getElementById("movie");
  const paginationContainer = document.getElementById("pagination");

  const pageSize = 10; 
  let currentPage = 1; 

  fetchApi("http://localhost:8080/api/movies/coming-soon?pages=0&size=18").then((data) => {
    let movies = data.content;
    const totalMovies = movies.length;
    const totalPages = Math.ceil(totalMovies / pageSize); 

    // Hiển thị danh sách phim cho trang hiện tại
    const renderMovies = (page) => {
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const currentMovies = movies.slice(startIndex, endIndex);

      let html = `
        <h2 class="heading">
          COMING SOON
        </h2>
        <div class="grid-container">
      `;

      currentMovies.forEach((movie) => {
        html += `
          <div class="box" id="movieDetails">
            <div class="box-img">
              <a href="detailscomingsoon.html?id=${movie.id}"><img src="${movie.posterUrl}" alt=""></a>
              <div class="overlay">
                <div class="button-container">
                  
                  <a href="detailscomingsoon.html?id=${movie.id}" class="detail-button">Detail</a>
                </div>
              </div>
              <div class="movie-label">${movie.movieLabel}</div>
            </div>
            <a href="detailscomingsoon.html?id=${movie.id}"><h3 id="movieName">${movie.movieName}</h3></a>
            <span id="duration">${movie.duration} min </span>
          </div>
        `;
      });

      html += `
        </div>
      `;

      moviesSection.innerHTML = html;
    };

    // Hiển thị thanh phân trang
    const renderPagination = () => {
      let paginationHtml = "";

      for (let i = 1; i <= totalPages; i++) {
        paginationHtml += `
          <button class="page-button ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>
        `;
      }

      paginationContainer.innerHTML = paginationHtml;

      // Thêm sự kiện click cho các nút phân trang
      const pageButtons = document.querySelectorAll(".page-button");
      pageButtons.forEach((button) => {
        button.addEventListener("click", () => {
          currentPage = parseInt(button.dataset.page);
          renderMovies(currentPage);

          // Xoá lớp active của nút trang hiện tại và thêm lớp active cho nút trang mới được chọn
          pageButtons.forEach((btn) => {
            btn.classList.remove("active");
          });
          button.classList.add("active");
        });
      });
    };

    renderMovies(currentPage);
    renderPagination();
  });
});