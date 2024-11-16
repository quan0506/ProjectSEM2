  
class CreateCommentRequest {
  constructor(commentUsername, starRate, commentContent, movieId) {
    this.commentUsername = commentUsername;
    this.starRate = starRate;
    this.commentContent = commentContent;
    this.movieId = movieId;
  }
}

const starIcons = document.querySelectorAll(".starRate i");
const commentSubmitBtn = document.querySelector("button#comment-submit");
const commentUsernameInput = document.querySelector("input#commentUsername");
const commentContentInput = document.querySelector("input#comment-content");
const movieId2 = getMovieIdFromUrl();

starIcons.forEach((star, index) => {
  star.addEventListener("click", () => {
    // Thay đổi màu sắc và trạng thái active của các ngôi sao
    starIcons.forEach((s, i) => {
      if (i <= index) {
        s.classList.add("bxs-star", "active");
        s.classList.remove("bx-star");
      } else {
        s.classList.remove("bxs-star", "active");
        s.classList.add("bx-star");
      }
    });
  });
});

commentSubmitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const commentUsername = commentUsernameInput.value;
  const commentContent = commentContentInput.value;

  if (commentContent !== "" && commentUsername !== "") {
    const starRate = document.querySelectorAll(".starRate i.active").length;

    const createCommentRequest = new CreateCommentRequest(
      commentUsername,
      starRate,
      commentContent,
      movieId2
    );

    console.log(createCommentRequest);

    fetch("http://localhost:8080/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createCommentRequest),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((comment) => {
        const commentList = document.querySelector(".comment");

        commentList.innerHTML += `
        <div class="comment">
                 <div class="flex">
                      <div class="user">
                           <div class="user-image"><img src="image/icon2.jpg" alt="" /></div>
                         <div class="user-meta">
                             <div class="commentUsername"><p>${comment.commentUsername}</p></div>
                             <div class="starRate">${comment.starRate} stars</div>
                           </div>
                         </div>
                       <div class="reply">
                           <div class="like icon"><i class="bx bx-like"></i></div>
                           <div class="dislike icon"><i class="bx bx-dislike"></i></div>
                           <div class="">Reply</div>
                         </div>
                       </div>
                       <div class="commentContent">
                         <p>${comment.commentContent} </p>
                       </div>
        `;

        // Reset ngôi sao sau khi gửi comment
        starIcons.forEach((s) => {
          s.classList.remove("bxs-star", "active");
          s.classList.add("bx-star");
        });

        // Xóa nội dung input
        commentUsernameInput.value = "";
        commentContentInput.value = "";
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
});

function getMovieIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return decodeURIComponent(urlParams.get("id"));
}
