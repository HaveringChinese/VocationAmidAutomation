document.querySelector(".btn").addEventListener("click", function (event) {
    var welcomeSound = new Audio("resources/audios/tim-kahn-welcome-nick.mp3");
    
    welcomeSound.play();
    
    document.querySelector("body").classList.add("darken");
    
    setTimeout(function () {
        window.open("signup.html")}, 1000);
    
    setTimeout(function () {
        document.querySelector("body").classList.remove("darken");
       
    }, 2000);
               
});

//, "_blank"