/**    NOTIFICATION  **/
// cua so pop up
const popup = document.querySelector('.popup');
const close = document.querySelector('.close-popup')

window.onload = function(){
  setTimeout(function(){
    popup.style.display = "block"

     // Add some time delay to show popup
  },1500)
}
close.addEventListener('click',()=>{
   popup.style.display = "none"
})

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

// SLIDE 
var swiper = new Swiper(".home", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 6000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  }); 

// Search - box
  // function toggleShow() {
  //   var el = document.getElementById("box");
  //   el.classList.toggle("show");
  // }
  
  // document.addEventListener("DOMContentLoaded", () => {
  //   const searchBox = document.getElementById("box");
  
  //   searchBox.addEventListener("input", () => {
  //     if (searchBox.value.trim() !== "") {
  //       searchBox.classList.add("show");
  //     } else {
  //       searchBox.classList.remove("show");
  //     }
  //   });
  // });

  // SLIDE WRAPPER
  var swiper = new Swiper(".coming-container",{
    spaceBetween: 20,
    loop:true,
    autoplay:{
      delay:1500,
      disableOnInteraction:false,
    },
    centeredSlides:true,
    breakpoints:{
      0:{
        slidesPerView:2,
      },
      568:{
        slidesPerView:3,
      },
      768:{
        slidesPerView:4,
      },
      968:{
        slidesPerView:5,
      },
    },
  });


// Render API và phân trang
const fetchApi = async (api) => {
  const response = await fetch(api);
  const data = await response.json();
  return data;
};

document.addEventListener("DOMContentLoaded", () => {
  const moviesSection = document.getElementById("movie");
  const paginationContainer = document.getElementById("pagination");

  const pageSize = 15; 
  let currentPage = 1; 

  fetchApi("http://localhost:8080/api/movies/now-showing?page=0&size=28").then((data) => {
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
          Opening This Week
        </h2>
        <div class="grid-container">
      `;

      currentMovies.forEach((movie) => {
        html += `
          <div class="box" id="movieDetails">
            <div class="box-img">
              <a href="details.html?id=${movie.id}"><img src="${movie.posterUrl}" alt=""></a>
              <div class="overlay">
                <div class="button-container">
                  <a href="choosepay.html?movie-id=${movie.id}" class="book-button">Book</a>
                  <a href="details.html?id=${movie.id}" class="detail-button">Detail</a>
                </div>
              </div>
              <div class="movie-label">${movie.movieLabel}</div>
            </div>
            <a href="details.html?id=${movie.id}"><h3 id="movieName">${movie.movieName}</h3></a>
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


// RENDER API COMING SOON TO SLIDE WRAPPER
fetch('http://localhost:8080/api/movies/coming-soon?pages=0&size=18')
  .then(response => response.json())
  .then(data => {
    const movies = data.content; // Array of movies
    const swiperWrapper = document.getElementById('swiperWrapper');

    // Loop through the movies and generate HTML
    movies.forEach(movie => {
      const box = document.createElement('div');
      box.classList.add('swiper-slide', 'box');

      const boxImg = document.createElement('div');
      boxImg.classList.add('box-img');

      const img = document.createElement('img');
      img.src = movie.posterUrl;
      img.alt = '';

      const h3 = document.createElement('h3');
      h3.textContent = movie.movieName;

      const span = document.createElement('span');
      // span.textContent = `${movie.duration} min | ${movie.categoryNameList.join(', ')}`;
      span.textContent = `${movie.duration} min`;

      boxImg.appendChild(img);
      box.appendChild(boxImg);
      box.appendChild(h3);
      box.appendChild(span);
      swiperWrapper.appendChild(box);
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });

