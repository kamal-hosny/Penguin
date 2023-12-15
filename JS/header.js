window.addEventListener("scroll", () => {
    let navHeader = document.querySelector(".header .right");
    if (scrollY >= 100) {
        navHeader.classList.add("nav-header");
    } else {
        navHeader.classList.remove("nav-header");
    }
});
function allModals() {
    let allModal = document.getElementById("all-modal");

    allModal.innerHTML = `
    <!-- ? Start  Add-MODALS -->
    <div class="modal fade modal-add-btn" id="create-post-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title edit-modal-title" id=" post-modal-title">Create Post</h5>
                </div>
                <div class="modal-body">
                    <!--  -->
                <div class="user">
                    <img id="add-modals-user-image" src="./img/icon.jpeg" alt="">
                    <span id="add-modals-username">kamal</span>
                </div>
                <!--  -->
                <div class="title">
                    <input type="text" name="" id="post-title-input" placeholder="What's the title of your post?">
                    
                    <input type="hidden" id="post-id-input" value="">
                </div>
                <!--  -->
                <div class="body">
                    <textarea name="" id="post-body-input" placeholder="What's on your mind ? "></textarea>
                </div>
                <!--  -->
                <div class="img">
                    <label class="custum-file-upload" for="file">
                        <div class="icon">
                            <img class="icon-img" src="./img/Toji Fushiguro ◊.jpg" alt="">
                            <svg class="icon-svg" xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24"><g stroke-width="0" id="SVGRepo_bgCarrier"></g><g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path fill="" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" clip-rule="evenodd" fill-rule="evenodd"></path> </g></svg>
                        
                        </div>
                        <div class="text icon-text">
                            <span>Click to upload image</span>
                        </div>
                            <input type="file" id="file" class="post-image-input" onchange="imgview()">
                    </label>
                        
                        
                </div>
                <!--  -->
                </div>
                <div class="modal-footer">
                    <button id="post-modal-submit-btn" class="post-modal-alerts" onclick="CreateNewPostClicked()">Create</button>
                </div>
            </div>
        </div>
    </div>
    <!-- ? End Add-MODALS -->
    <!-- ? Start Delete-MODALS -->
    <div class="modal fade modal-delete" id="delete-post-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Delete Post</h5>
                </div>
                <div class="modal-body">
                    <p >Are you sure you want to delete your post?</p>
                    <p style="display: none ;" id="post-modal-title"></p>
                    <input type="hidden" id="delete-post-id-input" value="">
                </div>
                <div class="modal-footer">
                    <button  data-bs-dismiss="modal">Cancel</button>
                    <button id="post-modal-submit-btn" class="delete-arrt"  onclick="confirmPostDelete()">Delete</button>
                </div>
            </div>
        </div>
    </div>
    <!-- ? End Delete-MODALS -->
    <!-- ? Start Hide-MODALS -->
    <div class="modal fade modal-delete" id="hide-post-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Hide Post</h5>
                </div>
                <div class="modal-body">
                    <p>Are you sure you want to Hide this post?</p>
                    <input type="hidden" id="hide-post-id-input" value="">
                </div>
                <div class="modal-footer">
                    <button  data-bs-dismiss="modal">Cancel</button>
                    <button id="post-modal-submit-btn" class="hide-arrt"  onclick="confirmPostHide()">Hide</button>
                </div>
            </div>
        </div>
    </div>
    <!-- ? End Delete-MODALS -->
    <!-- ? Start Report -->
    <div class="modal fade modal-report" id="report-post-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id=" post-modal-title">Report</h5>
                </div>
                <div class="modal-body">
                    <!--  -->
                <div class="report-problem">
                    <h4>Please select a problem</h4>
                    <p>If someone is in immediate danger, get help before reporting to Punguin Don't wait</p>
                </div>
                <div class="body">
                    <textarea name="" id="report-input" placeholder="What's the reason for the report?"></textarea>
                </div>
                <input type="hidden" id="report-post-id-input" value="">
                </div>
                <!--  -->
                <div class="modal-footer">
                    <button  data-bs-dismiss="modal">Cancel</button>
                    <button id="post-modal-submit-btn" class="post-modal-alerts" onclick="confirmPostReport()">Send the report</button>
            </div>
            </div>
        </div>
    </div>
    <!-- ? End Report -->
    <!-- ? Start share  -->
    <div class="modal fade modal-share" id="share-post-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id=" post-modal-title">Share</h5>
                </div>
                <div class="modal-body">
                    <!--  -->
                <div class="share-problem">
                    <p>Share this post</p>
                </div>
                <ul class="social-media">
                    <li><a class="facebook" target="_blank"><i class="fa-brands fa-facebook-f"></i></a></li>
                    <li><a class="twitter" target="_blank"><i class="fa-brands fa-x-twitter"></i></a></li>
                    <li><a class="whatsapp" target="_blank"><i class="fa-brands fa-whatsapp"></i></a></li>
                    <li><a class="linkedin" target="_blank"><i class="fa-brands fa-linkedin-in"></i></a></li>
                    <li><a class="reddit" target="_blank"><i class="fa-brands fa-reddit-alien"></i></a></li>
                </ul>
                <div class="share-problem">
                    <p>Or copy link</p>
                </div>
                <div class="body">
                    <div class="field">
                        <i class="fa-solid fa-link"></i>
                        <input type="text" id="share-link" value="" placeholder="example.com/share-link">
                        <button id="copy-link">Copy</button>
                    </div>
                </div>
                <input type="hidden" id="share-post-id-input" value="">
                </div>
                <!--  -->
       
            </div>
        </div>
    </div>
    <!-- ? End share -->
    <!-- ? Start send-feedback -->
    <div class="modal fade modal-feedback" id="feedback-post-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id=" post-modal-title">Feedback</h5>
                </div>
                <div class="modal-body">
                    <!--  -->
                <div class="report-problem">
                    <p>How would you rate our website</p>
                </div>
                <!-- Start Stars -->
                <div class="rating">
                    <input type="number" name="rating" hidden>

                    <i class='bx bx-star star' style="--i: 0;"></i>
                    <i class='bx bx-star star' style="--i: 1;"></i>
                    <i class='bx bx-star star' style="--i: 2;"></i>
                    <i class='bx bx-star star' style="--i: 3;"></i>
                    <i class='bx bx-star star' style="--i: 4;"></i>
                </div>
                <!-- End Stars -->
                <div class="body">
                    <textarea name="" id="feedback-input" placeholder="Send your feedback"></textarea>
                </div>
                <input type="hidden" id="feedback-count" value="">
                </div>
                <!--  -->
                <div class="modal-footer">
                    <button  data-bs-dismiss="modal">Cancel</button>
                    <button id="post-modal-submit-btn" class="post-modal-alerts" onclick="confirmFeedback()">Send feedback</button>
            </div>
            </div>
        </div>
    </div>
    <!-- ? End send-feedback -->
    <!-- ? Start block-MODALS -->
    <div class="modal fade modal-block" id="block-post-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Block Post</h5>
                </div>
                <div class="modal-body">
                    <p>Are you sure you want to block this user?</p>
                    <input type="hidden" id="block-post-id-input" value="">
                </div>
                <div class="modal-footer">
                    <button  data-bs-dismiss="modal">Cancel</button>
                    <button id="post-modal-submit-btn" class="hide-arrt"  onclick="confirmBlockUser()">Block</button>
                </div>
            </div>
        </div>
    </div>
    <!-- ? End block-MODALS -->
    <!-- ? Start hide-Block -->
    <div class="modal fade modal-hide-block" id="Hide-report-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title post-modal-title-edit" id=" post-modal-title">Hide & Report</h5>
                </div>
                <div class="modal-body">
                    <div class="body">
                        <div class="modal-body-head">
                            <button class="hidden-posts" onclick="myHideList()"> Hidden Posts </button>
                            <button class="blocked-users" onclick="myBlockList()"> Blocked Users</button>
                        </div>
                        <div class="cards" id="cards-hide-block">
                            <p class="not-length" >No blocked users.</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <!-- ? End hide-Block -->
    <!-- ? Start not-user -->
    <div class="modal fade modal-not-user" id="not-user-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title post-modal-title-edit" id=" post-modal-title">Warning</h5>
                </div>
                <div class="modal-body">
                    <div class="body">
                        <p class="p-warning">You must create an account or log in to be able to use penguin</p>
                        <i class="bi bi-exclamation-triangle-fill"></i>
                        <div class="modal-body-head">
                            <a href="./login.html" >Login</a>
                            <a href="./register.html">Register</a>
                        </div>
                        
                    </div>
                </div>

            </div>
        </div>
    </div>
    <!-- ? End not-user -->
    <!-- ? Start edit-profile -->
    <div class="modal fade modal-edit-profile" id="edit-profile-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title post-modal-title-edit" id=" post-modal-title">Edit profile</h5>
                </div>
                <div class="modal-body">
                <div class="title">
                    <p>UserName:</p>
                    <input type="text" name="" id="username-edit-profile" placeholder="Change Name ?">
                    
                    <input type="hidden" id="edit-profile-id-input" value="">
                </div>
                <!--  -->
                <div class="title">
                    <p>Email:</p>
                    
                    <input type="text" name="" id="email-edit-profile" placeholder="Change Email ?">
                </div>
                <div class="body">
                    <p>bio:</p>
                    <textarea name="" id="bio-edit-profile" placeholder="Change bio ?"></textarea>
                </div>
                <!--  -->
        
                <!--  -->
                </div>
                <div class="modal-footer">
                    <button  data-bs-dismiss="modal">Cancel</button>
                    <button  class="post-modal-alerts" onclick="confirmChangeProfile()">Confirm Change</button>
                </div>
            </div>
        </div>
    </div>
    <!-- ? End edit-profile -->
    <!-- ? Start edit-image -->
    <div class="modal fade modal-edit-image" id="edit-image-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title post-modal-title-edit" id=" post-modal-title">Change image</h5>
                </div>
                <div class="modal-body">
                <div class="body">

                </div>
                <!--  -->
                <div class="img">
                    <label class="icon-custum-file-upload" for="file">
                        <div class="icon">
                            <img class="icon-img-profile" src="./img/Toji Fushiguro ◊.jpg" alt="">
                            <svg class="icon-svg-profile" xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24"><g stroke-width="0" id="SVGRepo_bgCarrier"></g><g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path fill="" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" clip-rule="evenodd" fill-rule="evenodd"></path> </g></svg>
                        
                        </div>
                        <div class="text icon-text-profile">
                            <span>Click to upload image</span>
                        </div>
                            <input type="file"  class="icon-post-image-input iconView-file" onchange="iconView()">
                    </label>
                        
                        
                </div>
                <!--  -->
                </div>
                <div class="modal-footer">
                    <div class="left">
                        <button onclick="deleteChangeIcon()">Delete</button>
                    </div>
                    <div class="right">
                        <button  data-bs-dismiss="modal">Cancel</button>
                        <button  class="post-modal-alerts" onclick="confirmChangeIcon()">Confirm Change</button>
                    </div>

                </div>
            </div>
        </div>
    </div>
    <!-- ? Start edit-cover -->
    <div class="modal fade modal-edit-cover" id="cover-image-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title post-modal-title-edit" id=" post-modal-title">Change Cover</h5>
                </div>
                <div class="modal-body">
                <div class="body">

                </div>
                <!--  -->
                <div class="img">
                    <label class="cover-custum-file-upload" for="file">
                        <div class="cover">
                            <img class="cover-img" src="./img/Toji Fushiguro ◊.jpg" alt="">
                            <svg class="cover-svg" xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24"><g stroke-width="0" id="SVGRepo_bgCarrier"></g><g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_coverCarrier"> <path fill="" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" clip-rule="evenodd" fill-rule="evenodd"></path> </g></svg>
                        
                        </div>
                        <div class="text cover-text">
                            <span>Click to upload image</span>
                        </div>
                            <input type="file" id="cover" class="cover-post-image-input" onchange="coverView()">
                            
                    </label>
                        
                        
                </div>
                <!--  -->
                </div>
                <div class="modal-footer">
                    <div class="left">
                        <button onclick="deleteChangeCover()">Delete</button>
                    </div>
                    <div class="right">
                        <button  data-bs-dismiss="modal">Cancel</button>
                        <button  class="post-modal-alerts" onclick="confirmChangeCover()">Confirm Change</button>
                    </div>

                </div>
            </div>
        </div>
    </div>
    <!-- ? End edit-cover -->
    <!-- ? Start see all -->
    <div class="modal fade modal-see-all" id="seeAllModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title post-modal-title-edit" id=" post-modal-title">My Following</h5>
                </div>
                <div class="modal-body">
                    <div class="body">
                        <div class="cards" id="cards-see-all">

                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <!-- ? End see all -->
    `;
}
allModals();

function header(){
    let header = document.getElementById("header")

    header.innerHTML = `
    <div class="container-fluid">
    <div class="left">
      <!-- Start Icon -->
      <a href="./index.html" class="icon">
        <img src="./img/penguin.png" alt="" />
        <span>enguin</span>
      </a>
      <!-- End Icon -->
    </div>
    <div class="right" id="right">
      <!-- Start notifications -->
      <div
        class="media-header"
        style="display: flex; align-items: center; gap: 5px"
      >
        <!-- ! Start Dark mode -->
        <div class="dark-mode">
          <label class="theme-switch">
            <input
              type="checkbox"
              class="theme-switch__checkbox"
              id="toggle-dark-mode"
            />
            <div class="theme-switch__container">
              <div class="theme-switch__clouds"></div>
              <div class="theme-switch__stars-container">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 144 55"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M135.831 3.00688C135.055 3.85027 134.111 4.29946 133 4.35447C134.111 4.40947 135.055 4.85867 135.831 5.71123C136.607 6.55462 136.996 7.56303 136.996 8.72727C136.996 7.95722 137.172 7.25134 137.525 6.59129C137.886 5.93124 138.372 5.39954 138.98 5.00535C139.598 4.60199 140.268 4.39114 141 4.35447C139.88 4.2903 138.936 3.85027 138.16 3.00688C137.384 2.16348 136.996 1.16425 136.996 0C136.996 1.16425 136.607 2.16348 135.831 3.00688ZM31 23.3545C32.1114 23.2995 33.0551 22.8503 33.8313 22.0069C34.6075 21.1635 34.9956 20.1642 34.9956 19C34.9956 20.1642 35.3837 21.1635 36.1599 22.0069C36.9361 22.8503 37.8798 23.2903 39 23.3545C38.2679 23.3911 37.5976 23.602 36.9802 24.0053C36.3716 24.3995 35.8864 24.9312 35.5248 25.5913C35.172 26.2513 34.9956 26.9572 34.9956 27.7273C34.9956 26.563 34.6075 25.5546 33.8313 24.7112C33.0551 23.8587 32.1114 23.4095 31 23.3545ZM0 36.3545C1.11136 36.2995 2.05513 35.8503 2.83131 35.0069C3.6075 34.1635 3.99559 33.1642 3.99559 32C3.99559 33.1642 4.38368 34.1635 5.15987 35.0069C5.93605 35.8503 6.87982 36.2903 8 36.3545C7.26792 36.3911 6.59757 36.602 5.98015 37.0053C5.37155 37.3995 4.88644 37.9312 4.52481 38.5913C4.172 39.2513 3.99559 39.9572 3.99559 40.7273C3.99559 39.563 3.6075 38.5546 2.83131 37.7112C2.05513 36.8587 1.11136 36.4095 0 36.3545ZM56.8313 24.0069C56.0551 24.8503 55.1114 25.2995 54 25.3545C55.1114 25.4095 56.0551 25.8587 56.8313 26.7112C57.6075 27.5546 57.9956 28.563 57.9956 29.7273C57.9956 28.9572 58.172 28.2513 58.5248 27.5913C58.8864 26.9312 59.3716 26.3995 59.9802 26.0053C60.5976 25.602 61.2679 25.3911 62 25.3545C60.8798 25.2903 59.9361 24.8503 59.1599 24.0069C58.3837 23.1635 57.9956 22.1642 57.9956 21C57.9956 22.1642 57.6075 23.1635 56.8313 24.0069ZM81 25.3545C82.1114 25.2995 83.0551 24.8503 83.8313 24.0069C84.6075 23.1635 84.9956 22.1642 84.9956 21C84.9956 22.1642 85.3837 23.1635 86.1599 24.0069C86.9361 24.8503 87.8798 25.2903 89 25.3545C88.2679 25.3911 87.5976 25.602 86.9802 26.0053C86.3716 26.3995 85.8864 26.9312 85.5248 27.5913C85.172 28.2513 84.9956 28.9572 84.9956 29.7273C84.9956 28.563 84.6075 27.5546 83.8313 26.7112C83.0551 25.8587 82.1114 25.4095 81 25.3545ZM136 36.3545C137.111 36.2995 138.055 35.8503 138.831 35.0069C139.607 34.1635 139.996 33.1642 139.996 32C139.996 33.1642 140.384 34.1635 141.16 35.0069C141.936 35.8503 142.88 36.2903 144 36.3545C143.268 36.3911 142.598 36.602 141.98 37.0053C141.372 37.3995 140.886 37.9312 140.525 38.5913C140.172 39.2513 139.996 39.9572 139.996 40.7273C139.996 39.563 139.607 38.5546 138.831 37.7112C138.055 36.8587 137.111 36.4095 136 36.3545ZM101.831 49.0069C101.055 49.8503 100.111 50.2995 99 50.3545C100.111 50.4095 101.055 50.8587 101.831 51.7112C102.607 52.5546 102.996 53.563 102.996 54.7273C102.996 53.9572 103.172 53.2513 103.525 52.5913C103.886 51.9312 104.372 51.3995 104.98 51.0053C105.598 50.602 106.268 50.3911 107 50.3545C105.88 50.2903 104.936 49.8503 104.16 49.0069C103.384 48.1635 102.996 47.1642 102.996 46C102.996 47.1642 102.607 48.1635 101.831 49.0069Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
              <div class="theme-switch__circle-container">
                <div class="theme-switch__sun-moon-container">
                  <div class="theme-switch__moon">
                    <div class="theme-switch__spot"></div>
                    <div class="theme-switch__spot"></div>
                    <div class="theme-switch__spot"></div>
                  </div>
                </div>
              </div>
            </div>
          </label>
        </div>
        <!-- ! End Dark mode -->

        <div class="dropdown dropdown1" id="logged-in-div-1">
          <button
            class="btn dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i class="fi fi-rs-bell"></i>
          </button>
          <ul class="dropdown-menu">
            <div class="title">
              <i class="fi fi-rs-bell"></i>
              <p>notifications</p>
            </div>
            <span>You have no new notifications</span>
          </ul>
        </div>
        <!-- End notifications -->
      </div>
      <div class="dropdown dropdown2" id="logged-in-div-2">
        <button
          class="btn dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i class="fa-solid fa-chevron-down"></i>
          <span id="nav-username">kamal-hosny25k</span>
          <img id="nav-user-image" src="./img/maki.jpeg" alt="" />
        </button>
        <ul class="dropdown-menu">
          <li>
            <a class="dropdown-item active" href="./index.html"
              ><i class="fi fi-rr-home"></i><span>Home</span></a
            >
          </li>
          <li onclick="profile()">
            <a class="dropdown-item"
              ><i class="fi fi-rs-user"></i><span>Profile</span></a
            >
          </li>
          <li data-bs-toggle="modal" data-bs-target="#feedback-post-modal">
            <a class="dropdown-item" href="#"
              ><i class="bi bi-chat"></i><span>Send feedback</span></a
            >
          </li>
          <li data-bs-toggle="modal" data-bs-target="#Hide-report-modal">
            <a class="dropdown-item" href="#"
              ><i class="bi bi-ban"></i><span>Hide & Block</span></a
            >
          </li>
          <li>
            <a class="dropdown-item" href="./IXON-AI.html"
              ><i class="fa-brands fa-slack ai"></i
              ><span>IXON <span>AI</span></span></a
            >
          </li>
          <li id="logout-arrt" onclick="logout()">
            <a class="dropdown-item" href="#"
              ><i class="fi fi-rr-exit"></i><span>Log out</span></a
            >
          </li>
        </ul>
      </div>
      <!-- Start user-sgin -->
      <div class="user-sgin" id="user-sgin">
        <a class="login" href="./login.html">log in</a>
        <a class="signup" href="./register.html">sign up</a>
      </div>
      <!-- End user-sgin -->
    </div>
  </div>
    `
}
header()