
const toast = document.querySelector(".toast");


function alertNotification( info ,iconType){

    let icon ;
    let type; 
    let color;

    if(iconType === true){
        icon = `<i class="fas fa-solid fa-check check"></i>`
        type = "Success"
        color = "green"
    }else{
        icon = `<i class="fa-solid fa-x check"></i>`
        type = "Error"
        color = "red"
    }

    document.querySelector(':root').style.setProperty('--alert-color', `${color}`);

    // HTML
    toast.innerHTML = `
    <div class="toast-content">
    ${icon}

    <div class="message">
        <span class="text text-1">${type}</span>
        <span class="text text-2">${info}</span>
    </div>
</div>
<i class="fa-solid fa-xmark close"></i>

<div class="progress"></div>
    `
    //

    const closeIcon = document.querySelector(".close");
    const progress = document.querySelector(".progress");
    
    

    let timer1, timer2;


        toast.classList.add("active");
        progress.classList.add("active");

        timer1 = setTimeout(() => {
            toast.classList.remove("active");
    }, 2000); //1s = 1000 milliseconds

        timer2 = setTimeout(() => {
            progress.classList.remove("active");
        }, 2300);


    closeIcon.addEventListener("click", () => {
        toast.classList.remove("active");
        
        setTimeout(() => {
            progress.classList.remove("active");
    }, 300);

        clearTimeout(timer1);
        clearTimeout(timer2);
    });
}



//
// Start Detect Internet connection 
const connections = document.querySelector(".connections")


connectionsFun()
function connectionsFun(){
    connections.innerHTML=
    `
    <div class="connection offline">
        <i class='bx bx-wifi-off wifi-off'></i>
        <p>you are currently offline</p>
        <a href="#" class="refreshBtn">Refresh</a>
        <i class="fa-solid fa-xmark close"></i>
    </div>
    <div class="connection online">
        <i class='bx bx-wifi wifi'></i>
        <p>your Internet connection was restored</p>
        <i class="fa-solid fa-xmark close"></i>
    </div>
    
    `

    const offlineConnection = document.querySelector('.offline')
    const onlineConnection = document.querySelector('.online')
    const closeBtn = document.querySelectorAll('.close')
    const refreshBtn = document.querySelector('.refreshBtn')

    function online() {
        offlineConnection.classList.remove('active')
        onlineConnection.classList.add('active')
    }
    function offline() {
        offlineConnection.classList.add('active')
        onlineConnection.classList.remove('active')
    }

    window.addEventListener('online',()=>{
        online();
        setTimeout(() => {
            onlineConnection.classList.remove('active')
        }, 500);
    })
    window.addEventListener('offline',()=>{
        offline();
    })

    for (let i = 0; i < closeBtn.length; i++) {
        closeBtn[i].addEventListener('click',()=>{
            closeBtn[i].parentNode.classList.remove('active');
            if (closeBtn[i].parentNode.classList.contains('offline')) {
                setTimeout(() => {
                    closeBtn[i].parentNode.classList.add('active');
                }, 500);
            }
        })
    }

    refreshBtn.addEventListener("click",()=>{
        window.location.reload();
    })


}









// End Detect Internet connection 