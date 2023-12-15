


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

// Login Api 

function LoginBtnClicked() {
    const username = document.getElementById("username-input").value
    const password = document.getElementById("password-input").value

    const params = {
        "username": username,
        "password": password
    }

    const url = `https://kamalapi2.onrender.com/users/login`
    axios.post(url, params)

        .then((response) =>{
            // console.log(response)

            localStorage.setItem("token", response.data.token)
            localStorage.setItem("user", JSON.stringify(response.data.test))

            window.location =`index.html`
            alertNotification("Logged in successfully" , true)
        }).catch((error) => {
            const message = error.response.data.message;
                alertNotification(message, false);
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