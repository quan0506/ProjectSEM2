class CreateMovieRequest {
  constructor(
    movieName,
    description,
    duration,
    language,
    openingTime,
    closingTime,
    categoryList,
    youtubeLink,
    movieLabel,
  ) {
    this.movieName = movieName;
    this.description = description;
    this.duration = duration;
    this.language = language;
    this.openingTime = openingTime;
    this.closingTime = closingTime;
    this.youtubeLink = youtubeLink;
    this.categoryList = categoryList;
    this.movieLabel = movieLabel;
  }

  toString() {
    return `CreateMovieRequest {
  movieName: ${this.movieName},
  language: ${this.language},
  duration: ${this.duration},
  movieLabel: ${this.movieLabel},
  iframe: ${this.iframe},
  openingTime: ${this.openingTime},
  closingTime: ${this.closingTime},
  categoryList: ${JSON.stringify(this.categoryList)},
  description: ${this.description}
}`;
  }
}

// document.addEventListener("DOMContentLoaded", function () {  ==> Unnecessary event

let submitBtn = document.querySelector("#btnSubmit");

const submitCreateMovieForm = (e) => {
  e.preventDefault();

  const movieName = document.querySelector(".movieName input").value;
  const description = document.querySelector(".description input").value;
  const duration = document.querySelector(".duration input").value;
  const language = document.querySelector(".language select").value;
  const openingTimeInString = document.querySelector(".openingTime input").value;
  const closingTimeInString = document.querySelector(".closingTime input").value.concat("T00:00:00");

  // Category
  const categoryListInString = document.querySelector(".categoryList input").value.concat("T00:00:00");
  const youtubeLink = document.querySelector(".youtubeLink input").value;
  const movieLabel = document.querySelector(".movieLabel select").value;

const openingTime = new Date(openingTimeInString);
const closingTime = new Date(closingTimeInString);

  const posterFileInput = document.getElementById("posterFileInput");
  const posterFile = posterFileInput.files[0];
  // const posterFile = document.querySelector(".poster input").files[0];
  // const imdbRatings = document.querySelector(".imdbRatings input").value;
  
  const categoryList = categoryListInString.split(",").map((category) => category.trim());
  console.log(categoryList);
  const createMovieRequestJson = JSON.stringify(
    new CreateMovieRequest(
      movieName,
      description,
      duration,
      language,
      openingTime,
      closingTime,
      categoryList,
      youtubeLink,
      movieLabel,
    )
  );

  console.log(createMovieRequestJson);

  const formData = new FormData();
  formData.append("poster", posterFile);
  //debugger;

  formData.append("createMovieRequest", new Blob([createMovieRequestJson], { type: "application/json" }));

  fetch("http://localhost:8080/api/movies", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Response data:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

// categoryForm checkbox
document.querySelectorAll('.categoryForm input[type="checkbox"]').forEach(checkbox => {
  checkbox.addEventListener('change', () => {
    const selectedOptions = Array.from(document.querySelectorAll('.categoryForm input[type="checkbox"]:checked'))
      .map(checkbox => checkbox.value);

    const input = document.querySelector('.input_box.categoryList input');
    input.value = selectedOptions.join(', ');
  });
});
