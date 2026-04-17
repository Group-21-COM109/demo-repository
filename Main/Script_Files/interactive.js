// Wait for page to load
document.addEventListener("DOMContentLoaded", function() {
    
    // FAQ - when user clicks a question the answer shows up 
    var faqQuestions = document.querySelectorAll(".faq-question");
    faqQuestions.forEach(function(question) {
        question.addEventListener("click", function() {
            var answer = this.nextElementSibling;
            if (answer && answer.classList.contains("faq-answer")) {
                if (answer.style.display === "block") {
                    answer.style.display = "none";
                } else {
                    answer.style.display = "block";
                }
            }
        });
    });

    // Image gallery  when you click a thumbnail it shows in the main picture
    var galleryThumbs = document.querySelectorAll(".gallery-thumb");
    galleryThumbs.forEach(function(thumb) {
        thumb.addEventListener("click", function(){
            var picture = this.getAttribute("src");
            var altText = this.getAttribute("alt");
            var mainPic = document.getElementById("main-pic");
            var flowerName = document.getElementById("flower-name");
            mainPic.setAttribute("src", picture);
            flowerName.textContent = altText;
        });
    });

    // Price Calculator  adds up the selected flowers
    var flowerSelects = document.querySelectorAll(".flower-select");
    flowerSelects.forEach(function(checkbox) {
        checkbox.addEventListener("click", function(){
            var total = 0;
            flowerSelects.forEach(function(cb) {
                if (cb.checked) {
                    total = total + parseFloat(cb.value);
                }
            });
            document.getElementById("bouquet-total").textContent = "£" + total;
        });
    });

    // Dark mode toggle
    var darkToggle = document.getElementById("darkToggle");
    if (darkToggle) {
        darkToggle.addEventListener("click", function(){
            document.body.classList.toggle("dark-mode");
            if (document.body.classList.contains("dark-mode")) {
                this.textContent = "Light Mode";
            } else {
                this.textContent = "Dark Mode";
            }
        });
    }

    // Newsletter signup with enhanced validation
    var signupBtn = document.getElementById("signup-btn");
    if (signupBtn) {
        signupBtn.addEventListener("click", function(){
            var emailInput = document.getElementById("email-input");
            var signupMsg = document.getElementById("signup-msg");
            var email = emailInput.value.trim();
            
            // Reset styles
            emailInput.style.borderColor = "#000";
            emailInput.style.borderWidth = "3px";
            
            // Validation checks
            if (email === "") {
                signupMsg.textContent = "Please enter your email address";
                signupMsg.style.color = "red";
                emailInput.style.borderColor = "red";
            } else if (email.length < 5) {
                signupMsg.textContent = "Email is too short";
                signupMsg.style.color = "red";
                emailInput.style.borderColor = "red";
            } else if (email.indexOf(" ") !== -1) {
                signupMsg.textContent = "Email cannot contain spaces";
                signupMsg.style.color = "red";
                emailInput.style.borderColor = "red";
            } else if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
                signupMsg.textContent = "Please enter a valid email (include @ and .)";
                signupMsg.style.color = "red";
                emailInput.style.borderColor = "red";
            } else if (email.indexOf("@") === 0 || email.indexOf("@") === email.length - 1) {
                signupMsg.textContent = "@ symbol cannot be at start or end";
                signupMsg.style.color = "red";
                emailInput.style.borderColor = "red";
            } else if (email.indexOf(".") === -1 || email.indexOf(".") < email.indexOf("@")) {
                signupMsg.textContent = "Please enter a valid email";
                signupMsg.style.color = "red";
                emailInput.style.borderColor = "red";
            } else {
                signupMsg.textContent = "Thanks for signing up! Check your inbox soon.";
                signupMsg.style.color = "green";
                emailInput.style.borderColor = "green";
                emailInput.value = "";
            }
        });
    }

    // slideshow
    var slideIndex = 1;
    showSlides(slideIndex);

    function nextSlide(n) {
        showSlides(slideIndex += n);
    }

    function showSlides(n) {
        var slides = document.getElementsByClassName("flowers-slides");
        if (n > slides.length) {slideIndex = 1}
        if (n < 1) {slideIndex = slides.length}
        for (var i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slides[slideIndex-1].style.display = "block";
    }
});

// Make nextSlide available globally for onclick
function nextSlide(n) {
    var slides = document.getElementsByClassName("flowers-slides");
    var slideIndex = 1;
    if (slides.length > 0) {
        for (var i = 0; i < slides.length; i++) {
            if (slides[i].style.display === "block") {
                slideIndex = i + 1;
                break;
            }
        }
    }
    slideIndex += n;
    if (slideIndex > slides.length) {slideIndex = 1}
    if (slideIndex < 1) {slideIndex = slides.length}
    for (var i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex-1].style.display = "block";
}

// Make toggleFav available globally for onclick
function toggleFav(btn) {
    btn.classList.toggle("favorited");
    if (btn.classList.contains("favorited")) {
        btn.style.color = "#ff0000";
    } else {
        btn.style.color = "#999";
    }
}
