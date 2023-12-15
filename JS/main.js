// let baseUrl = "https://kamalapi2.onrender.com"

let currentPage = 1;
let lastPage = 1;
// ========= Start INFINITE SCROLL =========//
window.addEventListener("scroll", function () {
  const endOfPage =
    window.innerHeight + window.pageYOffset + 1 >= this.document.body.scrollHeight;

  if (endOfPage && currentPage < lastPage) {
    currentPage = currentPage + 1;
    getPosts(false, currentPage);
  }


});

// ========= End INFINITE SCROLL =========//
function userClicked(userId) {
  console.log(userId);
  window.location = `profile.html?userId=${userId}`;
}

getPosts(lastPage);
function getPosts(reload = true, page = 1) {
  axios.get(`${baseUrl}/?page=${page}&limit=20`).then((response) => {
    const posts = response.data.data;

    lastPage = response.data.last_page
    
    // console.log(lastPage)


    let token = localStorage.getItem("token");

    if (reload) {
      document.getElementById("posts").innerHTML = "";
    }
    for (post of posts) {
      const author = post.author;
      let postTitle = "";



      //add & remove Friend
      let user = getCurrentUser();

      let addRemove
      if(user != null){
        addRemove = `
        <li class="addFriendBtn" id="addFriendBtn" onclick="addFriendBtnClicked('${encodeURIComponent(JSON.stringify(post))}')"><a class="dropdown-item " href="#"><i class="bi bi-person-plus"></i><span>Follow</span></a></li>
        <li class="removeFriendBtn" onclick="removeFriendBtnClicked('${encodeURIComponent(JSON.stringify(post))}')"><a class="dropdown-item " href="#"><i class="bi bi-x-lg"></i><span>Unfollow</span></a></li>
        `
      }else{
        addRemove=""
      }
      // show or hide (edit) button
      
      let isMyPost = user != null && post.author[0]._id == user._id;
      let editBtnContent = ``;
      if (isMyPost) {
        editBtnContent = `
                <li onclick="editPostBtnClicked('${encodeURIComponent(
                  JSON.stringify(post)
                )}')"><a class="dropdown-item " href="#"><i class="bi bi-pencil"></i><span>Edit</span></a></li>
                <li onclick="deletePostBtnClicked('${encodeURIComponent(
                  JSON.stringify(post)
                )}')"><a class="dropdown-item " href="#"><i class="bi bi-trash"></i><span>Delete</span></a></li>
                `;
      }else{
        editBtnContent = addRemove
      }

      // show block button
      let blockBtnContent
      if(!isMyPost){
        blockBtnContent =`
        <li onclick="hidePostBtnClicked('${encodeURIComponent(
          JSON.stringify(post)
        )}')" ><a class="dropdown-item " href="#"><i class="bi bi-exclamation-octagon-fill"></i><span>Hide post</span></a></li>
        <li onclick="reportPostBtnClicked('${encodeURIComponent(
          JSON.stringify(post)
        )}')" ><a class="dropdown-item " href="#"><i class="bi bi-ban"></i><span>Report post</span></a></li>
        
        <li onclick="blockUserBtnClicked('${encodeURIComponent(
          JSON.stringify(post)
        )}')"><a class="dropdown-item " href="#"><i class="bi bi-person-slash"></i><span>Block user</span></a></li>
        `
      }else{
        blockBtnContent = ""
      }
      //


      // لو مفيش title
      if (post.title != null) {
        postTitle = post.title;
      }
      //
      // لو مفيش صوره
      let postImg;

      if (author[0] != null) {
        if (author[0].profile_image.url != null) {
          postImg = `${author[0].profile_image.url}`;
        } else {
          postImg = `"../img/icon.jpeg"`;
        }
      } else {
        postImg = `"../img/icon.jpeg"`;
      }

      //

      // لو مفيش صوره للpost
      let postImgP;

      if (post.image.url != null) {
        postImgP = `${post.image.url}`;
      } else {
        postImgP = `${post.image.url}`;
      }
      //

      //  اظهار و اخفاء comment
      const token = localStorage.getItem("token");
      // console.log(token)
      let commentArea = "";
      if (token != null) {
        commentArea = `
                <div class="comment-click" onclick="openComment('${post._id}')">
                <i class="bi bi-chat-square-text" ></i>
                </div>
                
                `;
      } else {
        commentArea = `
                <div class="comment-click">
                <i class="bi bi-chat-square-text"></i>
                </div>
                `;
      }
      //
      addEventListener("click", () => {});
      //صوره اضافه coment
      const local = getCurrentUser();
      console.log();
      let imageSentComment = "";

      if (token != null) {
        if (local.profile_image.url != null) {
          imageSentComment = local.profile_image.url;
        } else {
          imageSentComment = `"../img/icon.jpeg"`;
        }
      }

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
      // start show friend
      let friendPost
      let ifFriend = friendsPasket.find((x)=> x._id === post.author[0]._id)
      if(ifFriend) {
        friendPost = "friend"
      } else {
        friendPost = ""
      }

        // Start like-checked
        

        let likeChecked
        let isChecked = lovePasket.find((x) =>x._id == post._id)
        
        // console.log(isChecked)


        if(isChecked){
          likeChecked = "checked"
        }else{
          likeChecked = ""
        }

        // End like-checked

        //  اخفاء like لو مفيش user
        let hideLove
        if(token == null){
          hideLove = "pointer-none"
        }else{
          hideLove =""
        }
        // اخفاء البوست لو block
        let isBlock = blockPasket.find((x) => x._id === author[0]._id)

        let blockPost
        if(isBlock){
          blockPost = "none"
        }else{
          blockPost = ""
        }
        //
        // اخفاء البوست لو عملت hide
        let isHide = hidePasket.find((x) => x._id === post._id)

        let hidePost
        if(isHide){
          hidePost = "none"
        }else{
          hidePost = ""
        }
        //

      let content = `
            <div class="post ${friendPost} ${blockPost} ${hidePost}" id="id-${post._id}">
            <div class="post-header">
                <div class="left" onclick="userClicked('${author[0]._id}')">
                    <img src=${postImg} alt="">
                    <div class="post-user">
                        <h3>${author[0].username}</h3>
                        <p>${time}</p>
                    </div>
                </div>
                <div class="right ${hideLove}"">
                <div class="dropdown">
                                <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="bi bi-three-dots"></i>
                                </button>
                                <ul class="dropdown-menu">
                                    ${editBtnContent}

                                    ${blockBtnContent}
                                </ul>
                                
                            </div>
                </div>
            </div>
            <div class="post-info" onclick="postClicked('${post._id}')">
                <h4>${postTitle}</h4>
                <p>${post.body}</p>
            </div>
            <div class="post-img" onclick="postClicked('${post._id}')">
                <img  src=${postImgP} alt="">
            </div>
            <div class="react">
                <div class=" heart">
                    <i class="fa-solid fa-heart"></i>
                    <span class="love-cont${post._id}">${post.likecount}</span>
                </div>
                <div class="comment" onclick="postClicked('${post._id}')">
                    <p>comment</p>
                    <span>${post.comments_count}</span>
                </div>
            </div>
            <div class="footer">
                <div class="love ${hideLove}"  >
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

                ${commentArea}

                <div class="share" onclick="sharePostBtnClicked('${encodeURIComponent(
                  JSON.stringify(post)
                )}')">
                    <i  class="fi fi-br-share-square"></i>
                </div>
            </div>
            <!-- Start add-comment -->
            <div class="add-comment add-comment-${post._id}" id="add-comment">



                <img src= ${imageSentComment} alt=""> 



    
                <div class="create-Comment-continer" onclick="openComment(${
                  post._id
                })">
                <textarea placeholder="Type a Comment" id="comment-input-${
                  post._id
                }"" class="comment-textarea" ></textarea>
                <button onclick="createCommentClicked('${
                  post._id
                }')" ><i class='bx bx-send' ></i></button>
                </div>
                </div>
    
    
    
    
                <!-- End add-comment -->
        </div>
            `;
      document.getElementById("posts").innerHTML += content;

      resizeTextarea();

      //
    }
  });
}

function createCommentClicked(postId) {
  let id = postId;
  sendClick.play();

  let commentBody = document.getElementById(`comment-input-${postId}`).value;
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
      getPosts();
    })
    .catch((error) => {
      const errorMessage = error.response.data.message;

      alertNotification("You can't send an empty comment", false);
    });
}
// End create comment




//  ---------------- love-cont ----------------//
function toggleLike(id) {
  let love = document.querySelector(`#Give-It-An-Id${id}`);

  let token = localStorage.getItem("token");

  // ! start  عك رش
  let search = lovePasket.find((x) => x._id == id) 
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

  let url = `${baseUrl}/posts/like/${id}?like=${likeDislike}`;

  axios
    .post(url, params, {
      headers: {
        "Content-Type": "application/json",
        token: `${token}`,
      },
    })
    .then((response) => {


      getPosts();
    }).catch((error) => {
      const errorMessage = error.response.data.message;
      alertNotification("You can't send an like", false);
    });
}


function postClicked(postId) {
  console.log(postId);
  window.location = `postDetails.html?postId=${postId}`;
}

// Start openComment
function openComment(postId) {
  let comment = document.querySelector(`.add-comment-${postId}`);

  comment.style.display = "flex";

  let inputComment = comment.querySelector(".create-Comment-continer");
  inputComment.style.outline = "1px solid #ff5b89";

  setTimeout(() => {
    inputComment.style.outline = "none";
  }, 3000);
}

// End openComment
//! Create
function addBtnClicked() {
  document.getElementById("post-modal-submit-btn").innerHTML = "Create";
  document.getElementById("post-id-input").value = "";
  // document.getElementById("post-modal-title").innerHTML = "Create A New Post";
  document.querySelector(".edit-modal-title").innerHTML = "Create A New Post";

  document.getElementById("post-title-input").value = "";
  document.getElementById("post-body-input").value = "";

  let postModal = new bootstrap.Modal(
    document.getElementById("create-post-modal"),
    {}
  );
  postModal.toggle();
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

// Start img view

function imgview() {
  const image = document.querySelector(".post-image-input").files[0];
  const iconImg = document.querySelector(".icon-img");
  const iconSvg = document.querySelector(".icon-svg");
  const iconText = document.querySelector(".icon-text");
  const custumFileUpload = document.querySelector(".custum-file-upload");

  if (image != undefined) {
    // console.log(image.name)
    iconImg.src = URL.createObjectURL(image);
    iconImg.style.display = "block";
    iconSvg.style.display = "none";
    iconText.style.display = "none";
    custumFileUpload.style.padding = "0";
  } else {
    iconImg.style.display = "none";
    iconSvg.style.display = "block";
    iconText.style.display = "block";
    custumFileUpload.style.padding = "0 3.5rem";
  }
  // console.log(iconImg)
}
imgview();

function TypeImgview() {
  const iconImg = document.querySelector(".icon-img");
  const iconSvg = document.querySelector(".icon-svg");
  const iconText = document.querySelector(".icon-text");
  const custumFileUpload = document.querySelector(".custum-file-upload");

  iconImg.style.display = "none";
  iconSvg.style.display = "block";
  iconText.style.display = "block";
  custumFileUpload.style.padding = "0 3.5rem";
}
// End img view

function getPost(){
        
}
function getUser(){
        
}