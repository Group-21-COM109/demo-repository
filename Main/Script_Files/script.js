// FAQ 
// when user clicks a question the answer shows up 
$(".faq-question").click(function(){
    $(this).next(".faq-answer").slideToggle();
});

// Image gallery
// when you click a thumbnail it shows in the main picture
$(".gallery-thumb").click(function(){
    var picture = $(this).attr("src");
    var altText = $(this).attr("alt");
    $("#main-pic").attr("src",picture);
    $("#flower-name").text(altText);
});

// Favorites button
function toggleFav(btn){
    btn.classList.toggle("favorited");
    if(btn.classList.contains("favorited")){
        btn.style.color = "#ff0000";
    } else {
        btn.style.color = "#999";
    }
}

// Price Calculator
// adds up the selected flowers
$(".flower-select").click(function(){
    var total = 0;
    $(".flower-select:checked").each(function(){
        total = total + parseFloat($(this).val());
    });
    $("#bouquet-total").text("£" + total);
});

// Dark mode toggle
$("#darkToggle").click(function(){
    $("body").toggleClass("dark-mode");
    if($("body").hasClass("dark-mode")){
        $(this).text("Light mode");
    } else {
        $(this).text("Dark mode");
    }
});

// Newsletter signup 
$("#signup-btn").click(function(){
    var email = $("#email-input").val();
    if(email === ""){
        $("#signup-msg").text("Please enter your email address");
        $("#signup-msg").css("color","red");
    } else if(email.includes("@") && email.includes(".")){
        $("#signup-msg").text("Thanks for signing up! Check your inbox soon");
        $("#signup-msg").css("color","green");
        $("#email-input").val("");
    } else {
        $("#signup-msg").text("Please enter a valid email address");
        $("#signup-msg").css("color","red");
    }
});

// slideshow
let slideIndex = 1;
showSlides(slideIndex);

function nextSlide(n) {
  showSlides(slideIndex += n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("flowers-slides");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex-1].style.display = "block";
}
