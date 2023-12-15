const urlparams = new URLSearchParams(window.location.search);
const id = urlparams.get("postId");

setupUI();
getPost();

function userClicked(userId) {
  window.location = `profile.html?userId=${userId}`;
}

function getPost() {
  const user = JSON.parse(localStorage.getItem("user"));

  axios.get(`${baseUrl}/posts/${id}`).then((response) => {
    const post = response.data.data[0];

    // console.log(post);

    const comments = post.comment;
    const author = post.author[0];

    // لو مفيش title
    let postTitle = "";

    if (post.title != null) {
      postTitle = post.title;
    }
    //

    // لو مفيش صوره مستخدم
    let postImg;

    // console.log(author.profile_image.url)

    if (author.profile_image.url != null) {
      postImg = `${author.profile_image.url}`;
    } else {
      postImg = "../img/icon.jpeg";
    }

    // التعليقات

    let commentsContent = ``;

    if (comments != null) {
      for (comment of comments) {
        //صوره Show coment
        let imageShowComment = "";

        if (comment.author[0].profile_image.url != null) {
          imageShowComment = comment.author[0].profile_image.url;
        } else {
          imageShowComment = `"../img/icon.jpeg"`;
        }
        //

        commentsContent += `
                <div class="comment">
                    <img src=${imageShowComment} alt="">
                    <div class="info">
                        <div class="user-name">${comment.author[0].username}</div>
                        <div class="comment-info">
                            ${comment.comment}
                        </div>
                    </div>
                </div>
                `;
      }
    } else {
      commentsContent = ``;
    }

    //
    //صوره اضافه coment
    let imageSentComment = "";

    if (user != null) {
      if (user.profile_image.url != null) {
        imageSentComment = user.profile_image.url;
      } else {
        imageSentComment = `"../img/icon.jpeg"`;
      }
    } else [(imageSentComment = `"../img/icon.jpeg"`)];

    //
    // time
    let currentTime = new Date();
    let sepcifiedTime = new Date(post.created_at);

    //? الفرق بين الوقتين
    let timeDifference = currentTime - sepcifiedTime;

    //? تحويل الفرق الي ثواني
    let secondsDifference = timeDifference / 1000;

    let time;

    if (secondsDifference < 60) {
      time = Math.round(secondsDifference) + ` second ago`;
    } else if (secondsDifference < 3600) {
      time = Math.round(secondsDifference / 60) + ` minute ago`;
    } else if (secondsDifference < 86400) {
      time = Math.round(secondsDifference / 3600) + ` hour ago`;
    } else {
      time = Math.round(secondsDifference / 86400) + ` days ago`;
    } 

    //
    // console.log(post.likecount)

    // Start like-checked

    let likeChecked
    let isChecked = lovePasket.find((x) => x._id == id)

    if(isChecked){
      likeChecked = "checked"
    }else{
      likeChecked = ""
    }

    // End like-checked
    //  اخفاء like لو مفيش user
    let token = localStorage.getItem("token");
    
    let hideLove
    if(token == null){
      hideLove = "pointer-none"
    }else{
      hideLove =""
    }

    // لو مفيش token اخفيلي comment
    let hideComment
    if(token == null){
      hideComment = "none"
    }else{
      hideComment =""
    }
    //


    let postContent = `
        <!-- ! Start post -->
        <div class="post">
            <div class="post-header">
                <div class="left"  onclick="userClicked('${author._id}')">
                    <img src="${postImg}" alt="">
                    <div class="post-user">
                        <h3>${author.username}</h3>
                        <p>${time}</p>
                    </div>
                </div>
                <div class="right">


                </div>
            </div>
            <div class="post-info">
                <h4>${postTitle}</h4>
                <p>${post.body}</p>
            </div>
            <div class="post-img">
                <img src="${post.image.url}" alt="">
            </div>
            <div class="react">
                <div class="heart">
                    <i class="fa-solid fa-heart"></i>
                    <span class="love-cont${post._id}">${post.likecount}</span>
                </div>
                <div class="comment">
                    <p>comment</p>
                    <span>${post.comments_count}</span>
                </div>
            </div>
            <div class="footer">
                <div class="love ${hideLove}">
                    <!--  -->
                    <div class="heart-container" title="Like">
                    <input type="checkbox" ${likeChecked} class="checkbox " id="Give-It-An-Id${
                      post._id
                    }" onclick="toggleLike('${post._id}')">
                        <div class="svg-container">
                            <svg viewBox="0 0 24 24" class="svg-outline" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z">
                                </path>
                            </svg>
                            <svg viewBox="0 0 24 24" class="svg-filled" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z">
                                </path>
                            </svg>
                            <svg class="svg-celebrate" width="100" height="100" xmlns="http://www.w3.org/2000/svg">
                                <polygon points="10,10 20,20"></polygon>
                                <polygon points="10,50 20,50"></polygon>
                                <polygon points="20,80 30,70"></polygon>
                                <polygon points="90,10 80,20"></polygon>
                                <polygon points="90,50 80,50"></polygon>
                                <polygon points="80,80 70,70"></polygon>
                            </svg>
                        </div>
                    </div>
                    <!--  -->
                </div>
                <div class="comment-click" onclick="openComment(${post._id})">
                    <i class="bi bi-chat-square-text"></i>
                </div>
                <div class="share" onclick="sharePostBtnClicked('${encodeURIComponent(
                  JSON.stringify(post)
                )}')">
                    <i  class="fi fi-br-share-square"></i>
                </div>
            </div>



            <!-- Start add-comment -->


            <div class="add-comment add-comment-${post._id} ${hideComment}">


            <img src= ${imageSentComment} alt=""> 

            <div class="create-Comment-continer" onclick="openComment('${
              post._id
            }')">
            <textarea placeholder="Type a Comment" id="comment-input-${
              post._id
            }" class="comment-textarea" ></textarea>
            <button onclick="createCommentClicked('${
              post._id
            }')" ><i class='bx bx-send' ></i></button>
            </div>
            </div>




            <!-- End add-comment -->
            <!-- Start comments -->
            <div class="comments ${hideComment}" id="comments">
            <div class="comments-continer" >
            ${commentsContent}
            </div>
            </div>
            <!-- End comments -->







        </div>
        <!-- ! End post -->
        `;

    document.getElementById("posts").innerHTML = postContent;

    resizeTextarea();
  });
}

function createCommentClicked(postId) {
  let id = postId;

  sendClick.play();

  let commentBody = document.getElementById(`comment-input-${id}`).value;

  let params = {
    body: commentBody,
  };
  let token = localStorage.getItem("token");
  let url = `${baseUrl}/posts/${id}/comments`;

  axios
    .post(url, params, {
      headers: {
        token: `${token}`,
      },
    })
    .then((response) => {
      alertNotification("comment has been added", true);

      getPost();
    })
    .catch((error) => {
      const errorMessage = error.response.data.message;
      alertNotification("You can't send an empty comment", false);
    });
}
// End create comment

function openComment(postId) {
  let comment = document.querySelector(`.add-comment-${postId}`);

  let inputComment = comment.querySelector(".create-Comment-continer");

  inputComment.style.outline = "1px solid #ff5b89";

  setTimeout(() => {
    inputComment.style.outline = "none";
  }, 3000);
}
//  ---------------- love-cont ----------------//
function toggleLike(id) {
  
  let love = document.querySelector(`#Give-It-An-Id${id}`);

  // ! start  عك رش
  let search = lovePasket.find((x) => x._id == id) 

  // console.log(x)
  // console.log(id)

  if(love.checked == true){
  if (search === undefined) {
    lovePasket.push({
      _id: id,
      love: true,
    })
  }}else{
    lovePasket = lovePasket.filter((x)=> x._id !== id)
  }
  localStorage.setItem("love", JSON.stringify(lovePasket))

  // ! End  عك رش

  let loveCont = Number(document.querySelector(`.love-cont${id}`).textContent);

  let likeDislike

  if (love.checked === true) {
    document.querySelector(`.love-cont${id}`).textContent = ++loveCont;
    likeDislike = true
    likeClick.play()
  } else if (love.checked === false) {
    document.querySelector(`.love-cont${id}`).textContent = --loveCont;
    likeDislike = false
  }

  if (document.querySelector(`.love-cont${id}`).textContent < 0) {
    document.querySelector(`.love-cont${id}`).textContent = 0;
  }



  let params = {
    "like": "true",
  };
  let token = localStorage.getItem("token");
  let url = `${baseUrl}/posts/like/${id}?like=${likeDislike}`;

  axios
    .post(url, params, {
      headers: {
        "Content-Type": "application/json",
        token: `${token}`,
      },
    })
    .then((response) => {


      getPost();
    }).catch((error) => {
      const errorMessage = error.response.data.message;
      alertNotification("You can't send an like", false);
    });



}





// Start Auto Resize Textarea

function resizeTextarea() {
  let textarea = document.querySelector(`.create-Comment-continer textarea`);

  textarea.addEventListener("keyup", (e) => {
    textarea.style.height = "30px";

    let scHeight = e.target.scrollHeight;

    textarea.style.height = `${scHeight}px`;
  });
}

// End Auto Resize Textarea

function getPosts(){
        
}
function  getUser(){
        
}