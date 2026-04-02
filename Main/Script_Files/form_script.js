let switching = false;
let slideIndex = 1;

$(document).ready(function() {
    $(".flowers_slides").eq(slideIndex - 1).show();
    $("#startForm").click(function(){
        var Screen1A = document.getElementById("Screen_1_A")
        var Screen1B = document.getElementById("Screen_1_B")
        switchScreen(Screen1A, Screen1B)
    })
})


// Both currentScreen and nextScreen must be in ID form
function switchScreen(currentScreen, nextScreen) {
    if (switching) return;
    switching = true;
    $(currentScreen).addClass("blur");
    $(currentScreen).fadeOut(300,"swing", function () {
        $(currentScreen).removeClass("blur");
        $(nextScreen)
            .show()
            .addClass("blur")
            .hide() // Ensure it's hidden
            .fadeIn(300,"swing", function() {
                $(nextScreen).removeClass("blur")
                switching = false;
            });
    });
}

// Slideshow Handling

function nextSlide(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("flowers_slides");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex-1].style.display = "block";
}