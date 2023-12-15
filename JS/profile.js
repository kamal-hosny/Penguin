setupUI();
getUser();

function getCurrentUserId() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("userId");
  return id;
}

function getUser() {
  const id = getCurrentUserId();
  axios.get(`${baseUrl}/users/${id}`).then((response) => {
    const user = response.data.data.new_user;
    // console.log(user.profile_image.url)


// ! Start اظهار my-following
followingShow()
// ! End اظهار my-following


    //  الصوره الضخصيه
    let postImg;

    if (user.profile_image.url != null) {
      postImg = `${user.profile_image.url}`;
    } else {
      postImg = "../img/icon.jpeg";
    }
    //
    // صوره cover
    let coverImg;

    if (user.cover.url != null) {
      coverImg = `${user.cover.url}`;
    } else {
      coverImg = "../img/backgroung.jpeg";
    }
    //
    // Edit profile
    const local = getCurrentUser();

    let editProfile;
    let editBio;
    let editIcon;
    let editCover;

    if (local != null) {
      let myId
  if(local != null){
     myId = local._id;
  }else{
      myId = local
  }


  
  if(blockPasket.find((x) => x._id === user._id)){
    editProfile =`<button onclick="removeBlock('${user._id}')">Remove Block</button>`
  }else{
        if (id == myId) {
          editProfile = `
                    <button onclick="editProfileBtnClicked()">Edit profile</button>
                  `;
        } else {
          editProfile = `
          <button class="addFriendBtn" onclick="addFriendBtnClickedBtn('${encodeURIComponent(JSON.stringify(user))}')">Follow</button>
          <button class="removeFriendBtn" onclick="removeFriendBtnClickedBtn('${encodeURIComponent(JSON.stringify(user))}')">Unfollow</button>
         
        `;
        }
      }


      
      //
      //bio

      if (user.bio != null) {
        editBio = `<div class="bio">${user.bio}</div>`;
      } else {
        editBio = ``;
      }
      //
      // edit icon

      if (id == myId) {
        editIcon = ` <div class="round"  onclick="editIconBtnClicked()">
                                <i class="fa-solid fa-pen"></i> 
                            </div>
            `;
      } else {
        editIcon = ``;
      }
      //
      // edit cover

      if (id == myId) {
        editCover = `                         
                <div class="round" onclick="editCoverBtnClicked()">
                    <i class="fa-solid fa-gear"></i>
                </div>
                `;
      } else {
        editCover = ``;
      }
      //
    } else if (local == null) {
      editProfile = "";
      editIcon = ``;
      editBio = ``;
      editCover = ``;
    }




    // start show friend
    try {
      
    if(id != local){
      let isFriend = friendsPasket.find((x)=> x._id == user._id)
      if(isFriend) {
        friendPost = "friend"
      } else {
        friendPost = ""
      }
    }    } catch (error) {
      console.error("حدث خطأ:", error);
      // location.reload();
    }


    // Start number following

    let following 

    // console.log(local)
    // console.log(id)


    if(local != null){
      if(id == local._id){
        following = `
        <div class="following">
        <span class="num">${friendsPasket.length}</span>
        <span>Following</span>
        </div>
        `
      }else{
        following = ""
      }
    }else{
      following = ""
    }

    //  Start postfliter
    let postFtliter

    if(user.posts_count != undefined){
      postFtliter = user.posts_count
    }else{
      postFtliter = "0"
    }
    //  End postfliter
    //  Start commentfliter
    let commenFtliter

    if(user.comments_count != undefined){
      commenFtliter = user.comments_count
    }else{
      commenFtliter = "0"
    }
    //  End commentfliter



    let content = `
        <input type="hidden" id="userdetiles" value="${encodeURIComponent(
          JSON.stringify(user)
        )}">
                <div class="header-profile">
                <div class="container">
                    <a href="./index.html">
                    <div class="back"><i class="bi bi-arrow-left"></i></div>
                    <div class="name" >${user.username}</div>
                    </a>
                </div>
            </div>
            <div class="profile ${friendPost} ">
                        <img src="${coverImg}" alt="">



                        ${editCover}




                    <div class="profile-details">
                        <div class="profile-img">
                                <img src="${postImg}" alt="">
                            ${editIcon}
                        </div>
                        <div></div>
                        
                        ${editProfile}
                        
                    </div>
            </div>
            <div class="profile-data">
                <div class="left">
                    <div class="user-name">${user.username}</div>
                </div>
                
                ${editBio}
                <div class="right">
                    <div class="posts">
                        <span class="num">${postFtliter}</span>
                        <span>posts</span>
                    </div>
                    <div class="comments">
                        <span class="num">${commenFtliter}</span>
                        <span>comments</span>
                    </div>
                    ${following}
                </div>

            </div>

        
        `;

    document.getElementById("profile").innerHTML = content;
  });
}

getPosts();

function getPosts() {
  const id = getCurrentUserId();
  axios.get(`${baseUrl}/users/${id}/posts`).then((response) => {
    const posts = response.data.data;
    document.getElementById("posts").innerHTML = "";
    for (post of posts) {
      let author = post.author[0];
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
      }
      else{
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

      if (author.profile_image.url != null) {
        postImg = `${author.profile_image.url}`;
      } else {
        postImg = `"../img/icon.jpeg"`;
      }
      //

      // لو مفيش صوره لل post
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
                <i class="bi bi-chat-square-text"></i>
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
      let isFriend = friendsPasket.find((x)=> x._id === post.author[0]._id)
      if(isFriend) {
        friendPost = "friend"
      } else {
        friendPost = ""
      }

      // Start like-checked
    let likeChecked
    let isChecked = lovePasket.find((x) =>x._id == post._id)
    
    // console.log(post.likecount)
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
    let isBlock = blockPasket.find((x) => x._id === author._id)
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
                <div class="post ${friendPost} ${blockPost} ${hidePost} "  id="id-${post._id}">
                <div class="post-header">
                    <div class="left" >
                        <img src=${postImg} alt="">
                        <div class="post-user">
                            <h3>${author.username}</h3>
                            <p>${time}</p>
                        </div>
                    </div>
                    <div class="right ${hideLove} ">
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
                    <div class="heart">
                        <i class="fa-solid fa-heart"></i>
                        <span class="love-cont${post._id}">${post.likecount}</span>
                    </div>
                    <div class="comment" onclick="postClicked('${post._id}')">
                        <p>comment</p>
                        <span>${post.comments_count}</span>
                    </div>
                </div>
                <div class="footer">
                    <div class="love ${hideLove}" >
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
                <div class="add-comment add-comment-${
                  post._id
                }" id="add-comment">


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
            </div>
                `;
      document.getElementById("posts").innerHTML += content;

      resizeTextarea();
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

function postClicked(postId) {
  window.location = `postDetails.html?postId=${postId}`;
}

// Start openComment
function openComment(postId) {
  // console.log(typeof postId);
  // console.log(postId);

  let comment = document.querySelector(`.add-comment-${postId}`);

  comment.style.display = "flex";

  let inputComment = comment.querySelector(".create-Comment-continer");
  inputComment.style.outline = "1px solid #ff5b89";

  setTimeout(() => {
    inputComment.style.outline = "none";
  }, 3000);
}

// End openComment

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


      getPosts();
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

// Start edit-profile
function editProfileBtnClicked() {
  // let post = JSON.parse(decodeURIComponent(postObject))
  // console.log(post)
  // document.getElementById("edit-profile-id-input").value = JSON.stringify(post)

  const user = JSON.parse(
    decodeURIComponent(document.getElementById("userdetiles").value)
  );

  // console.log(user)

  let usernameLocal = user.username;
  let emailLocal = user.email;
  let bioLocal = user.bio;

  document.getElementById("username-edit-profile").value = usernameLocal;
  document.getElementById("email-edit-profile").value = emailLocal;
  document.getElementById("bio-edit-profile").value = bioLocal;

  let postModal = new bootstrap.Modal(
    document.getElementById("edit-profile-modal"),
    {}
  );
  postModal.toggle();
}

function confirmChangeProfile() {
  sendClick.play();

  const token = localStorage.getItem("token");
  // console.log(token)

  const id = getCurrentUserId();

  let username = document.getElementById("username-edit-profile").value;
  let email = document.getElementById("email-edit-profile").value;
  let bio = document.getElementById("bio-edit-profile").value;

  console.log(username, email, bio);

  const url = `${baseUrl}/users/data/${id}`;
  console.log(url);

  const headers = {
    "Content-Type": "application/json",
    token: `${token}`,
  };

  const params = {
    username: username,
    email: email || "",
    bio: bio || "",
  };

  axios
    .post(url, params, {
      headers: headers,
    })
    .then((response) => {
      // console.log(response.data.new_user )
      localStorage.setItem("user", JSON.stringify(response.data.new_user));
      location.reload();
      alertNotification("New Post Has Been Created", true);
    })
    .catch((error) => {
      const message = error.response.data.messege;
      alertNotification(message, false);
    });
}
// End edit-profile
// Start edit-image
function editIconBtnClicked() {
  let postModal = new bootstrap.Modal(
    document.getElementById("edit-image-modal"),
    {}
  );

  postModal.toggle();
  const user = JSON.parse(
    decodeURIComponent(document.getElementById("userdetiles").value)
  );

  // icon
  const iconImg = document.querySelector(".icon-img-profile");
  const iconSvg = document.querySelector(".icon-svg-profile");
  const iconText = document.querySelector(".icon-text-profile");

  if (user.profile_image.url != null) {
    iconImg.style.display = "block";
    iconSvg.style.display = "none";
    iconText.style.display = "none";

    iconImg.src = user.profile_image.url;
    console.log(iconImg);
  } else {
    iconImg.style.display = "none";
    iconSvg.style.display = "block";
    iconText.style.display = "block";
  }
}

function confirmChangeIcon() {
  sendClick.play();
  const token = localStorage.getItem("token");
  const image = document.querySelector(".icon-post-image-input").files[0];

  const url = `${baseUrl}/users/profileimg`;

  let formData = new FormData();
  formData.append("profileimg", image);

  const headers = {
    "Content-Type": "multipart/form-data",
    token: `${token}`,
  };

  axios
    .post(url, formData, {
      headers: headers,
    })
    .then((response) => {
      // console.log(response )
      localStorage.setItem("user", JSON.stringify(response.data.new_user));
      location.reload();

      alertNotification("The picture has been changed", true);
    })
    .catch((error) => {
      const message = error.response.data.messege;
      alertNotification(message, false);
    });
}

// End edit-image

// Start delete-image

function deleteChangeIcon() {
  sendClick.play();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const url = `${baseUrl}/users/profileimg`;

  const headers = {
    token: `${token}`,
  };
  axios
    .delete(url, {
      headers: headers,
    })
    .then((response) => {
      location.reload();
      user.profile_image.url = null;

      localStorage.setItem("user", JSON.stringify(user));

      alertNotification("The picture has been deleted", true);
    })
    .catch((error) => {
      const message = error.response.data.messege;
      alertNotification(message, false);
    });
}

// End delete-image

function iconView() {
  const image = document.querySelector(".icon-post-image-input");
  const iconImg = document.querySelector(".icon-img-profile");

  const iconSvg = document.querySelector(".icon-svg-profile");
  const iconText = document.querySelector(".icon-text-profile");

  iconImg.style.display = "block";
  iconSvg.style.display = "none";
  iconText.style.display = "none";

  iconImg.src = URL.createObjectURL(image.files[0]);
}

// Start edit-cover

function editCoverBtnClicked() {
  let postModal = new bootstrap.Modal(
    document.getElementById("cover-image-modal"),
    {}
  );

  postModal.toggle();
  const user = JSON.parse(
    decodeURIComponent(document.getElementById("userdetiles").value)
  );

  const coverImg = document.querySelector(".cover-img");
  const coverSvg = document.querySelector(".cover-svg");
  const coverText = document.querySelector(".cover-text");

  if (user.cover.url != null) {
    coverImg.style.display = "block";
    coverSvg.style.display = "none";
    coverText.style.display = "none";

    coverImg.src = user.cover.url;
  } else {
    coverImg.style.display = "none";
    coverSvg.style.display = "block";
    coverText.style.display = "block";
  }
}

function confirmChangeCover() {
  const modalCover = document.querySelector(".modal-edit-cover");

  sendClick.play();
  const token = localStorage.getItem("token");
  const cover = document.querySelector(".cover-post-image-input").files[0];
  // const cover = modalCover.querySelector("input").files;

  console.log(cover);

  const url = `${baseUrl}/users/coverimg`;

  let formData = new FormData();
  formData.append("coverimg", cover);

  const headers = {
    "Content-Type": "multipart/form-data",
    token: `${token}`,
  };

  axios
    .post(url, formData, {
      headers: headers,
    })
    .then((response) => {
      // console.log(response )
      location.reload();

      alertNotification("The picture has been changed", true);
    })
    .catch((error) => {
      const message = error.response.data.messege;
      alertNotification(message, false);
    });
}
// End edit-cover

function coverView() {
  console.log("done");

  const image = document.querySelector(".cover-post-image-input");
  const iconImg = document.querySelector(".cover-img");

  const coverSvg = document.querySelector(".cover-svg");
  const coverText = document.querySelector(".cover-text");

  iconImg.style.display = "block";
  coverSvg.style.display = "none";
  coverText.style.display = "none";

  iconImg.src = URL.createObjectURL(image.files[0]);
}

// Start delete-cover

function deleteChangeCover() {
  sendClick.play();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const url = `${baseUrl}/users/coverimg`;

  const headers = {
    token: `${token}`,
  };
  axios
    .delete(url, {
      headers: headers,
    })
    .then((response) => {
      location.reload();
      user.cover.url = null;

      localStorage.setItem("user", JSON.stringify(user));

      alertNotification("The cover has been deleted", true);
    })
    .catch((error) => {
      const message = error.response.data.message;
      alertNotification(message, false);
    });
}

// End delete-cover


// ? Start addFriend profile
function addFriendBtnClickedBtn(userObject ){
  let user = JSON.parse(decodeURIComponent(userObject));
  let userId = document.querySelector(`.profile`)

  userId.classList.add("friend")

  console.log(user)
  let search = friendsPasket.find((x)=> x._id === user._id)
  if(search == undefined){
      friendsPasket.push({
          _id:user._id,
          username:user.username,
          profile_image:user.profile_image,
      })
  }
  localStorage.setItem("friends", JSON.stringify(friendsPasket))
}
// ? End addFriend profile


// ? Start removeFriend profile
function removeFriendBtnClickedBtn(userObject){
  let user = JSON.parse(decodeURIComponent(userObject));
  let userId = document.querySelector(`.profile`)

  userId.classList.remove("friend")

  friendsPasket = friendsPasket.filter((x)=>x._id !== user._id )
  localStorage.setItem("friends", JSON.stringify(friendsPasket))
}
// ? End removeFriend profile

// start my-following


function myFollowing(){

  const id = getCurrentUserId(); // اسدعاء id  من params
  const local = getCurrentUser(); // استدعاء id من localStorage
  let token = localStorage.getItem("token");


  let myId
  if(local != null){
    myId = local._id;
  }else{
      myId = local
  }



  let friends = JSON.parse(localStorage.getItem("friends")) 
  console.log(friendsPasket)
    let friendList = document.getElementById("carousel")


    // console.log(friends == null)

      // اخفاء my-following

      if(token == null ){
        document.getElementById("my-following").style.display="none"
      }
      if(id != myId ){
        document.getElementById("my-following").style.display="none"
      }



        if(friendsPasket.length == 0 ){
          document.getElementById("my-following").style.display="none"
        }
        if(friends == null ){
          document.getElementById("my-following").style.display="none"
        }



        friendsPasket.reverse()


    return (friendList.innerHTML = friendsPasket.map((x)=>{

          // followingImg
    let followingImg 
    if(x.profile_image.url != undefined){
      followingImg =  x.profile_image.url
    }else{
      followingImg ="../img/icon.jpeg"
    }

      return `
              <div class="card" id="friends-${x._id}" >        
              <div class="image">
                <img src=${followingImg} alt="" onclick="teleport('${x._id}')">
              </div>
              <p>${x.username}</p>
            <button onclick="clickRemoveFriendProfile('${x._id}')">Unfollow</button>
            </div>
      `
    }).join(""))
    
  


  
}
myFollowing()
// End my-following

// Start myFollowing List
function myFollowingList(){
  // let friends = JSON.parse(localStorage.getItem("friends"))
  console.log(friendsPasket)
  let friendList = document.getElementById("cards-see-all")
// console.log(friendList)


  return (friendList.innerHTML = friendsPasket.map((x)=>{

    // followingImg
    let followingImg 
    if(x.profile_image.url != undefined){
      followingImg =  x.profile_image.url
    }else{
      followingImg ="../img/icon.jpeg"
    }

    return `
          <div class="card">
            <div class="user" onclick="teleport('${x._id}')">
                <img src=${followingImg} alt="">
                <p>${x.username}</p>
            </div>
            <button onclick="clickRemoveFriendProfile('${x._id}')">Unfollow</button>
          </div>
    `
  }).join(""))
}
myFollowingList()
// End myFollowing Lis

// Start following show

function followingShow(){
  const id = getCurrentUserId(); // اسدعاء id  من params
  const local = getCurrentUser(); // استدعاء id من localStorage
  let myId
  if(local != null){
    myId = local._id;
  }else{
      myId = local
  }


  if(id == myId && friendsPasket.length != 0){
    document.getElementById("my-following").style.setProperty("display", "block", "important");
  }
  
}
document.getElementById("my-following").style.display = "none" 
// End following show





// Start remove friend
function clickRemoveFriendProfile(userId){

  friendsPasket = friendsPasket.filter((x)=> x._id !== userId)
  localStorage.setItem("friends",JSON.stringify(friendsPasket))
  myFollowing()
  myFollowingList()
  friendLength()
}



// End remove friend
// Start teleport
function teleport(userId){
  window.location = `profile.html?userId=${userId}`;
  console.log("sdsd")
}
// End teleport




















































// Start carousel




const carousel = document.querySelector(".carousel");
const firstcard = carousel.querySelectorAll(".carousel .card")[0] ;
const arrowIcons = document.querySelectorAll(".wrapper i.arrow") ;


let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;

const showHideIcons = () => {
  let scrollWidth = carousel.scrollWidth - carousel.clientWidth;
  arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
  arrowIcons[1].style.display = carousel.scrollLeft >= scrollWidth  ? "none" : "block";
}
// لو عدد الاصدقاء اقل من 3 اخفيلي السهم
function friendLength(){
  if(friendsPasket.length < 3 ){
    arrowIcons[0].style.display = "none"
    arrowIcons[1].style.display = "none"
  }
}
friendLength()

arrowIcons.forEach(icon => {
  icon.addEventListener("click", () => {
    let firstcardWidth = firstcard.clientWidth + 14;
    carousel.scrollLeft += icon.id == "left" ? -firstcardWidth : firstcardWidth
    setTimeout(() => showHideIcons(), 60);
  })
})

const autoSlide = () => {
  if(carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) > -1 || carousel.scrollLeft <= 0) return;

  positionDiff = Math.abs(positionDiff);
  let firstcardWidth = firstcard.clientWidth + 14

  let valDifference = firstcardWidth - positionDiff;
// لو هتحرك يمين
  if(carousel.scrollLeft > prevScrollLeft) {
    return carousel.scrollLeft += positionDiff > firstcardWidth / 3 ? valDifference : -positionDiff;
}
// لو هتحرك شمال
carousel.scrollLeft -= positionDiff > firstcardWidth / 3 ? valDifference : -positionDiff;
}

const dragStart = (e) => {
  isDragStart = true
  prevPageX = e.pageX || e.touches[0].pageX;
  prevScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
  if(!isDragStart) return;
  e.preventDefault();
    isDragging = true;
    carousel.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
}

const dragStop = () => {
  isDragStart = false;
    carousel.classList.remove("dragging");

    if(!isDragging) return;
    isDragging = false;
    autoSlide();
}


carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

document.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

document.addEventListener("mouseup", dragStop);
carousel.addEventListener("touchend", dragStop);



// End carousel



function userClicked(userId) {
  window.location = `profile.html?userId=${userId}`;
}
function getPost(){
        
}

function removeBlock(userId){
  blockPasket = blockPasket.filter((x)=>x._id !== userId)
  localStorage.setItem("block",JSON.stringify(blockPasket))
  myBlockList()

  getPosts()
  getUser()

} 