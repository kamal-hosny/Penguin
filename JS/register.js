// const { default: axios } = require("axios");

const baseUrl = "https://kamalapi2.onrender.com/users"

// Hide and show password
const btn = document.querySelector(".form-submit-btn")
const eyeIcons = document.querySelector(".show-hide")

eyeIcons.addEventListener("click" , () => {
    const pInput = eyeIcons.parentElement.querySelector("input"); //getting parent element of eye icon and selecting the password input
    if(pInput.type === "password") {
        eyeIcons.classList.replace("bx-hide", "bx-show");
        return (pInput.type = "text");
    }
    else{
        eyeIcons.classList.replace("bx-show", "bx-hide");
        return (pInput.type = "password");
    }
})

// upload img
const inputFile = document.querySelector("#input-file");
const iconImg = document.querySelector("#icon-img");

inputFile.addEventListener("change", ()=>{
    iconImg.src = URL.createObjectURL(inputFile.files[0]);
})
// Register Api
function registerBtnClicked(){
    const username = document.getElementById("username-input").value
    const youremail = document.getElementById("youremail-input").value
    const password = document.getElementById("password-input").value
    const image = document.getElementById("input-file").files[0]

    // console.log(username,youremail,password,image)
    
    let formData = new FormData()
        formData.append("username", username)
        formData.append("email", youremail)
        formData.append("password", password)
        formData.append("img", image)

        const headers = { 
            "Content-Type":"multipart/form-data",
        }

        const url = `${baseUrl}/register`
        axios.post(url, formData, {
            headers: headers
        })

            .then((response) => {
                // console.log(response.data)

                localStorage.setItem("token", response.data.token)
                
                localStorage.setItem("user", JSON.stringify(response.data.new_user))

                window.location =`index.html`
                alertNotification("Logged in successfully", true)
            }).catch((error)=>{
                const message = error.response.data.message;
                alertNotification(message, false);
                iconImg.src ="../img/icon.jpeg"
            })
}

//  Start darkmode 
const body = document.querySelector("body");
const  modeToggle = document.querySelector(".dark-light");
const sun = document.querySelector(".sun")
const moon = document.querySelector(".moon")



let getMode = localStorage.getItem("mode");
    if(getMode && getMode === "dark"){
        body.classList.add("dark")
        modeToggle.classList.add("active")

    }
// dark-light
modeToggle.addEventListener("click",()=>{
    modeToggle.classList.toggle("active");
    body.classList.toggle("dark")

    if(!body.classList.contains("dark")){
        localStorage.setItem("mode" , "light");
    }else{
        localStorage.setItem("mode" , "dark");
    }
});

//  End darkmode