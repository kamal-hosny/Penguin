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
        document.getElementById("nav-username").innerHTML = user.username;
        document.getElementById("nav-user-image").src = user.profile_image.url;
    }
}
setupUI();
// End setupUI

// Start logout  المسؤولة عن تسجيل الخروج

logoutArrt = document.getElementById("logout-arrt");
function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

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

// Start chat

const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input i");

let userMessage = null; // Variable to store user's message
const API_KEY = "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"; // Paste your API key here
const inputInitHeight = chatInput.scrollHeight;

const createChatLi = (message, className) => {
    // Create a chat <li> element with passed message and className
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    const user = getCurrentUser();

    let chatContent =
        className === "outgoing"
            ? `<p></p> <img src="${user.profile_image.url}" alt="">`
            : `<i class="fa-brands fa-slack"></i><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi; // return chat <li> element
};

const generateResponse = (chatElement) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = chatElement.querySelector("p");

    // Define the properties and message for the API request
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: userMessage }],
        }),
    };

    // Send POST request to API, get response and set the reponse as paragraph text
    fetch(API_URL, requestOptions)
        .then((res) => res.json())
        .then((data) => {
            messageElement.textContent = data.choices[0].message.content.trim();
        })
        .catch(() => {
            messageElement.classList.add("error");
            messageElement.textContent =
                "Oops! Something went wrong. Please try again.";
        })
        .finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
};

const handleChat = () => {
    userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
    if (!userMessage) return;

    // Clear the input textarea and set its height to default
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    // Append the user's message to the chatbox
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    setTimeout(() => {
        // Display "Thinking..." message while waiting for the response
        const incomingChatLi = createChatLi("Thinking...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi);
    }, 600);
};

chatInput.addEventListener("input", () => {
    // Adjust the height of the input textarea based on its content
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    // If Enter key is pressed without Shift key and the window
    // width is greater than 800px, handle the chat
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);

// End chat

function profile() {
    let user = getCurrentUser();
    window.location = `profile.html?userId=${user._id}`;
}