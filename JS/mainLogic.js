
let lovePasket = JSON.parse(localStorage.getItem("love")) || []
let friendsPasket = JSON.parse(localStorage.getItem("friends")) || []
let blockPasket = JSON.parse(localStorage.getItem("block")) || []
let hidePasket = JSON.parse(localStorage.getItem("hide")) || []
// Start audio

// const { default: axios } = require("axios");

// ? Start sendClick
const sendClick = new Audio();
sendClick.src = "../audio/send-click.mp3";
const likeClick = new Audio();
likeClick.src = "../audio/like.mp3";
// ? End sendClick
// End audio
// const { default: axios } = require("axios");

let baseUrl = `https://kamalapi2.onrender.com`;

// Start myProfile

function profile() {
    let user = getCurrentUser();
    window.location = `profile.html?userId=${user._id}`;
}

// End myProfile

// =========== Start POST REQUESTS ===========//
let submitPost = document.querySelector(".post-modal-alerts");

function CreateNewPostClicked() {
    sendClick.play();



    let postId = document.getElementById("post-id-input").value;
    let isCreate = postId == null || postId == "";

    const title = document.getElementById("post-title-input").value;
    const body = document.getElementById("post-body-input").value;
    const image = document.querySelector(".post-image-input").files[0];
    const token = localStorage.getItem("token");

    // console.log(title,body,image,token)

    // img view

    let formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    formData.append("postimg", image);

    let url = ``;
    const headers = {
        "Content-Type": "multipart/form-data",
        token: `${token}`,
    };

    if (isCreate) {
        url = `${baseUrl}/posts/create`;



        axios
            .post(url, formData, {
                headers: headers,
            })

            .then((response) => {
                TypeImgview();
                const model = document.getElementById("create-post-modal");
                const modalInstance = bootstrap.Modal.getInstance(model);
                modalInstance.hide();
                alertNotification("New Post Has Been Created", true);
                getPosts();
                //
                location.reload();
            })
            .catch((error) => {
                const message = error.response.data.messege;
                alertNotification(message, false);
                TypeImgview();
            });
            
    } else {
        // formData.append("_method", "'UserController@user'")
        url = `${baseUrl}/posts/${postId}}`;

        console.log(postId);
        console.log(url);

        axios
            .put(url, formData, {
                headers: headers,
            })
            .then((response) => {
                getPosts();
                const model = document.getElementById("create-post-modal");
                const modalInstance = bootstrap.Modal.getInstance(model);
                modalInstance.hide();
                TypeImgview();
                alertNotification("Logged in successfully", true);
                //
                location.reload();
            })
            .catch((error) => {
                const message = error.response.data.messege;
                alertNotification(message, false);
                
                TypeImgview();
                alertNotification(message, false);
            });
    }
}

// Start Edit
//! Edit
function editPostBtnClicked(postObject) {
    let post = JSON.parse(decodeURIComponent(postObject));

    console.log(post)

    document.getElementById("post-modal-submit-btn").innerHTML = "Update";
    document.getElementById("post-id-input").value = post._id;

    document.querySelector(".edit-modal-title").innerHTML = "Edit Post"
    document.getElementById("post-title-input").value = post.title;
    document.getElementById("post-body-input").value = post.body;

    //? 
    let custumFileUpload = document.querySelector(".custum-file-upload")
    let inputPostImage = document.querySelector(".post-image-input")
    let postImg = document.querySelector(".icon-img")
    let iconText = document.querySelector(".icon-text")
    let iconSvg = document.querySelector(".icon-svg")

    // todo:
    
    if(post.image.url != null){
        postImg.style.display = "block";
        iconSvg.style.display = "none";
        iconText.style.display = "none";
        custumFileUpload.style.padding ="0"
        postImg.src = post.image.url
    }else{
        postImg.style.display = "none";
        iconSvg.style.display = "block";
        iconText.style.display = "block";
        custumFileUpload.style.padding ="0 3.5rem"
    }

    

    let postModal = new bootstrap.Modal(
        document.getElementById("create-post-modal"),
        {}
    );
    postModal.toggle();
}

// End Edit

// Start delete

function deletePostBtnClicked(postObject) {
    let post = JSON.parse(decodeURIComponent(postObject));

    console.log(post);

    document.getElementById("delete-post-id-input").value = post._id;

    let postModal = new bootstrap.Modal(
        document.getElementById("delete-post-modal"),
        {}
    );
    postModal.toggle();
}

let deleteArrt = document.querySelector(".delete-arrt");
function confirmPostDelete() {
    sendClick.play();

    const token = localStorage.getItem("token");

    let postId = document.getElementById("delete-post-id-input").value;

    console.log(postId);

    const url = `${baseUrl}/posts/${postId}`;

    const headers = {
        "Content-Type": "multipart/form-data",
        token: `${token}`,
    };

    axios
        .delete(url, {
            headers: headers,
        })

        .then((response) => {
            // console.log(response)

            const model = document.getElementById("delete-post-modal");
            const modalInstance = bootstrap.Modal.getInstance(model);
            alertNotification("This post has been deleted", true);
            modalInstance.hide();

            getPosts();
        })
        .catch((error) => {
            const message = error.response.data.messege;
            alertNotification(message, false);
        });
}

// End delete

// Start hide
function hidePostBtnClicked(postObject) {
    let post = JSON.parse(decodeURIComponent(postObject));

    document.getElementById("delete-post-id-input").value = JSON.stringify(post);
    let postModal = new bootstrap.Modal(
        document.getElementById("hide-post-modal"),
        {}
    );
    postModal.toggle();
}

function confirmPostHide() {
    sendClick.play();

    let post = JSON.parse(document.getElementById("delete-post-id-input").value)
    document.getElementById(`id-${post._id}`).style.display = "none";


    let search = hidePasket.find((x)=> x._id ==  post._id)

    if(search === undefined){
    hidePasket.push({
        _id: post._id,
        username: post.author[0].username,
        profile_image: post.author[0].profile_image,
    })           
    }else{
        hidePasket = hidePasket.filter((x)=> x._id == postId) 
    }
    localStorage.setItem("hide", JSON.stringify(hidePasket))
    myHideList()
    alertNotification("This post has been hidden", true);


    const model = document.getElementById("hide-post-modal");
    const modalInstance = bootstrap.Modal.getInstance(model);
    modalInstance.hide();


}
// End hide
// Start report
function reportPostBtnClicked(postObject) {
    let post = JSON.parse(decodeURIComponent(postObject));

    document.getElementById("report-post-id-input").value = JSON.stringify(post);

    let postModal = new bootstrap.Modal(
        document.getElementById("report-post-modal"),
        {}
    );
    postModal.toggle();
}

// Start confirmPostReport
function confirmPostReport() {
    sendClick.play();

    // The complainant // صاحب الشكوه

    let complainant = JSON.parse(localStorage.getItem("user"));

    const ComplainantId = complainant._id;
    const ComplainantName = complainant.name;
    const ComplainantUserName = complainant.username;

    let complained = JSON.parse(
        document.getElementById("report-post-id-input").value
    );

    console.log(complained);

    const id = complained._id;
    const userId = complained.author[0]._id;
    const userName = complained.author[0].username;
    const reportBody = document.getElementById("report-input").valu

    
    if (reportBody != "") {
        sendMail();
        function sendMail() {
            const params = {
                complainerId: ComplainantId,
                complainerName: ComplainantUserName,
                complainedId: userId,
                complainedName: userName,
                postId: id,
                message: reportBody,
            };

            const serviceID = "default_service";
            const templateID = "template_wpbwid7";

            emailjs
                .send(serviceID, templateID, params)
                .then((response) => {

                    document.getElementById("report-input").value = "";

                    alertNotification("Message report sent", true);

                    const model = document.getElementById("report-post-modal");
                    const modalInstance = bootstrap.Modal.getInstance(model);
                    modalInstance.hide();


                })
                .catch((error) => {
                    const message = error
                    alertNotification(message, false);
                });
        }
    } else {
        alertNotification("There is no report message", false);
    }
}
// End confirmPostReport

// End report

 // Start block user
    function blockUserBtnClicked(userObject){
        let post = JSON.parse(decodeURIComponent(userObject));
        let user = post.author[0]


        document.getElementById("block-post-id-input").value = JSON.stringify(user);
        let postModal = new bootstrap.Modal(
            document.getElementById("block-post-modal"),
            {}
        );
        postModal.toggle();
        
    }
   // End block user
   // Start confirm Block User
    function confirmBlockUser(){
    sendClick.play();
    let user = JSON.parse(document.getElementById("block-post-id-input").value) ;

    let search = blockPasket.find((x)=> x._id == user._id)

    if(search === undefined){
    blockPasket.push({
        _id: user._id,
        username: user.username,
        profile_image: user.profile_image,
    })           
    }else{
        blockPasket = blockPasket.filter((x)=> x._id == user._id) 
    }
    localStorage.setItem("block", JSON.stringify(blockPasket))

    alertNotification("This user has been blocked", true);



    getPosts()
    getPost()
    getUser()
    myBlockList()
    const model = document.getElementById("block-post-modal");
    const modalInstance = bootstrap.Modal.getInstance(model);
    modalInstance.hide();

    }
   // End confirm Block User
// Start Share
function sharePostBtnClicked(postObject) {
    let post = JSON.parse(decodeURIComponent(postObject));

    document.getElementById("share-post-id-input").value = post._id;
    let postModal = new bootstrap.Modal(
        document.getElementById("share-post-modal"),
        {}
    );
    postModal.toggle();

    const shareLink = document.getElementById("share-link");
    let loc = document.location;
    shareLink.value = `${loc.origin}/postDetails.html?postId=${post._id}`;

    const link = `${shareLink.value}`;

    document.querySelector(
        ".facebook"
    ).href = `https://www.facebook.com/share.php?u=${link}`;
    document.querySelector(
        ".twitter"
    ).href = `https://twitter.com/intent/tweet?text=${link}`;
    document.querySelector(
        ".whatsapp"
    ).href = `https://api.whatsapp.com/send?text=${link}`;
    document.querySelector(
        ".linkedin"
    ).href = `https://linkedin.com/sharing/share-offsite/url=${link}`;
    document.querySelector(
        ".reddit"
    ).href = `https://reddit.com/submit?url=${link}`;
}
// End Share
// Start Link
let copyLink = document.getElementById("copy-link");

copyLink.addEventListener("click", () => {
    sendClick.play();

    let shareValue = document.getElementById("share-post-id-input").value;

    const shareLink = document.getElementById("share-link");
    let loc = document.location;
    shareLink.value = `${loc.origin}/postDetails.html?postId=${shareValue}`;

    shareLink.select();
    document.execCommand("copy");
    console.log(document.execCommand("copy"));

    const field = document.querySelector(".field");

    alertNotification("link was copied to clipboard", true);

    field.classList.add("active");
    setTimeout(() => {
        field.classList.remove("active");
    }, 1000);
});
// End Link

// Start setupUI
function setupUI() {
    const token = localStorage.getItem("token");

    const logoutDiv = document.getElementById("user-sgin");

    const loginDiv1 = document.getElementById("logged-in-div-1");
    const loginDiv2 = document.getElementById("logged-in-div-2");

    const addBtn = document.getElementById("add-btn");

    if (token == null) {
        //user is gust logged in

        if (addBtn != null) {
            addBtn.style.setProperty("display", "none", "important");
        }

        loginDiv1.style.setProperty("display", "none", "important");
        loginDiv2.style.setProperty("display", "none", "important");
        logoutDiv.style.setProperty("display", "flex", "important");
    } else {
        if (addBtn != null) {
            addBtn.style.setProperty("display", "block", "important");
        }

        loginDiv1.style.setProperty("display", "flex", "important");
        loginDiv2.style.setProperty("display", "flex", "important");
        logoutDiv.style.setProperty("display", "none", "important");




        const user = getCurrentUser();

        // صوره profile
        let profile_image

        if(user.profile_image.url != null){
            profile_image = user.profile_image.url 
        }else{
            profile_image = "../img/icon.jpeg"
        }
        // 

        document.getElementById("nav-username").innerHTML = user.username;
        document.getElementById("nav-user-image").src = profile_image;
        document.getElementById("add-modals-username").innerHTML = user.username;
        document.getElementById("add-modals-user-image").src = profile_image;
    }
}
setupUI();
// End setupUI

// Start logout  المسؤولة عن تسجيل الخروج

logoutArrt = document.getElementById("logout-arrt");
function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("love");
    location.reload();
    
    alertNotification("Logged out successfully", true);
    setupUI();
}
// End logout

// Start getCurrentUser  المسؤولة عن استخراج العناصر من storage
function getCurrentUser() {
    let user = null;
    const storageUser = localStorage.getItem("user");

    if (storageUser != null) {
        user = JSON.parse(storageUser);
    }
    return user;
    
}
// End getCurrentUser

// Start dark-light
const body = document.querySelector("body");
const toggleDarkMode = document.querySelector("#toggle-dark-mode");

let getMode = localStorage.getItem("mode");
if (getMode && getMode === "dark") {
    body.classList.add("dark");
    toggleDarkMode.checked = true;
}
toggleDarkMode.addEventListener("click", () => {
    body.classList.toggle("dark");

    if (!body.classList.contains("dark")) {
        return localStorage.setItem("mode", "light");
    }
    localStorage.setItem("mode", "dark");
});

// End dark-light

/* Start stars */
const allStar = document.querySelectorAll(".rating .star");

const ratingValue = document.querySelector(".rating input");

allStar.forEach((item, idx) => {
    item.addEventListener("click", function () {
        let click = 0;
        ratingValue.value = idx + 1;

        document.getElementById("feedback-count").value = ratingValue.value;

        allStar.forEach((i) => {
            i.classList.replace("bxs-star", "bx-star");
            i.classList.remove("active");
        });

        for (let i = 0; i < allStar.length; i++) {
            if (i <= idx) {
                allStar[i].classList.replace("bx-star", "bxs-star");
                allStar[i].classList.add("active");
            } else {
                allStar[i].style.setProperty("--i", click);
                click++;
            }
        }
    });
});
/* End stars */
// Start Feedback
function confirmFeedback() {
    let user = JSON.parse(localStorage.getItem("user"));

    const reportMessage = document.getElementById("feedback-input").value;
    const countRating = document.getElementById("feedback-count").value;

    console.log(reportMessage);
    console.log(countRating);

    if (reportMessage != "" || countRating != "") {
        sendMail();

        function sendMail() {
            const params = {
                name: user.username,
                rating: countRating,
                message: reportMessage,
            };

            const serviceID = "service_wx3jr9u";
            const templateID = "template_q25l7nr";

            emailjs
                .send(serviceID, templateID, params)
                .then((response) => {
                    document.getElementById("feedback-input").value = "";

                    alertNotification("Message feedback sent", true);

                    const model = document.getElementById("feedback-post-modal");
                    const modalInstance = bootstrap.Modal.getInstance(model);
                    modalInstance.hide();
                })
                .catch((error) => {
                    const message = error.response.data.messege;
                alertNotification(message, false);
                });
        }
    } else {
        alertNotification("There is no feedback message", false);
    }
}
// End Feedback

// ? Start addFriend
function addFriendBtnClicked(postObject ){
    let post = JSON.parse(decodeURIComponent(postObject));
    let postId = document.getElementById(`id-${post._id}`)
    // console.log(postId)

    postId.classList.add("friend")
    let search = friendsPasket.find((x)=> x._id === post.author[0]._id)
    if(search == undefined){
        friendsPasket.push({
            _id:post.author[0]._id,
            username:post.author[0].username,
            profile_image:post.author[0].profile_image,
        })
    }
    localStorage.setItem("friends", JSON.stringify(friendsPasket))
}
// ? End addFriend
// ? Start removeFriend
function removeFriendBtnClicked(postObject){
    let post = JSON.parse(decodeURIComponent(postObject));
    let postId = document.getElementById(`id-${post._id}`)
    postId.classList.remove("friend")

    friendsPasket = friendsPasket.filter((x)=>x._id !== post.author[0]._id )
    localStorage.setItem("friends", JSON.stringify(friendsPasket))
}
// ? End removeFriend


// Start myBlock
function myBlockList(){
    let blockList = document.getElementById("cards-hide-block")

    document.querySelector(".blocked-users").classList.add("green")
    document.querySelector(".hidden-posts").classList.remove("green")


    return(blockList.innerHTML = blockPasket.map((x)=>{

    // blockImg
    let blockImg

    if(x.profile_image.url != undefined){
        blockImg =  x.profile_image.url
    }else{
        blockImg ="../img/icon.jpeg"
    }

    // console.log(blockPasket.length == 0)
    // console.log(blockPasket == [])

    let blockFilter

    if(blockPasket.length == 0){
        blockFilter =  `<p class="not-length" >No blocked users.</p>
        <div class="card">aaaaaaa</div>
        `
    }else{
        blockFilter = `
        <div class="card">
        <div class="user" onclick="userClicked('${x._id}')">
            <img src=${blockImg} alt="">
            <p>${x.username}</p>
        </div>
        <button onclick="removeBlock('${x._id}')">Unblock</button>
        </div>
        `
    }
        return blockFilter

    }).join(""))
}

myBlockList()

  // End myBlock
    // Start removeBlock
    function removeBlock(userId){
        blockPasket = blockPasket.filter((x)=>x._id !== userId)
        localStorage.setItem("block",JSON.stringify(blockPasket))
        myBlockList()

        getPosts()
        getPost()
    } 
    // End removeBlock
    // Start myHide
    function myHideList(){
        let hideList = document.getElementById("cards-hide-block")
    
        
    document.querySelector(".blocked-users").classList.remove("green")
    document.querySelector(".hidden-posts").classList.add("green")


        return(hideList.innerHTML = hidePasket.map((x)=>{
    
            console.log(x)
        // hideImg
        let hideImg
    
        if(x.profile_image.url != undefined){
            hideImg =  x.profile_image.url
        }else{
            hideImg ="../img/icon.jpeg"
        }
    
        console.log(hidePasket.length == 0)
        console.log(hidePasket == [])
        let hideFilter
    
        if(hidePasket.length == 0){
            hideFilter = `<p class="not-length" >No blocked users.</p>
            `
        }else{
            hideFilter = `
            <div class="card">
            <div class="user" onclick="postClicked('${x._id}')">
                <img src=${hideImg} alt="">
                <p>${x.username}</p>
            </div>
            <button onclick="removeHide('${x._id}')">Unhide</button>
            </div>
            `
        }
            return hideFilter
    
    
        }).join(""))
    }
    
    // End myHide
    // Start removeHide
    function removeHide(userId){
        hidePasket = hidePasket.filter((x)=>x._id !== userId)
        localStorage.setItem("hide",JSON.stringify(hidePasket))
        myHideList()

        getPosts()
        getPost()
    }
    // End removeHide


    // Start not-user
    function notUser(){
        let postModal = new bootstrap.Modal(
            document.getElementById("not-user-modal"),
            {}
        );
        postModal.toggle();
    }

    const token = localStorage.getItem("token");

    if(token == undefined){
        setInterval(notUser , 180000)
        

        setTimeout(notUser , 10000)
        
        document.querySelector(".header .right").style.setProperty("position", "relative", "important");
    }


    // End not-user