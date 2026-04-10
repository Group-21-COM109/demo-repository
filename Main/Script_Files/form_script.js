let switching = false;
var slideIndex = 1;

const phonePattern = /^[0-9]{7,15}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

$(document).ready(function() {
    $(".flowers_slides").eq(slideIndex - 1).show();
    $(".part").css("display","none");
    $("#part-1").css("display","block");
    $("#begin-button").click(function(){ 
        var Screen1A = document.getElementById("Screen_1_A")
        var Screen1B = document.getElementById("Screen_1_B")
        switchScreen(Screen1A, Screen1B)
    });
    $("#delete-data-button").click(function(){
        alert("Data submission not handled at this time; therefore no data can be deleted yet.")
    })
    $("#form-stats").click(function(){
        alert("Data submission not handled at this time; therefore no data can be displayed yet.")
    })
    $("form").on("keydown", function(e) { // Prevents user from accidentally entering the entire form prematurely using Enter Key
        if (e.key === "Enter") {
            e.preventDefault();
        }
    });
    $("form").on("submit", function(e) { // TEMPORARY - Prevents form submission until handling is implemented
        e.preventDefault();
        alert("Submission not handled at this time.");
    });
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

function nextSlide(n) { // Takes in movement count parameter, then calls showSlides and moves n slides
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) { // Takes in parameter n, then moves n slides
    let i;
    let slides = document.getElementsByClassName("flowers_slides");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex-1].style.display = "block";
}

// Form Handling

document.addEventListener("DOMContentLoaded", function() {
    const phoneInput = document.querySelector("input[name='phone']");

    if (phoneInput) {
        phoneInput.addEventListener("input", function() {
            this.value = this.value.replace(/\s+/g, '');  // Remove spaces on numerical entry
        });
    }
});

function run(hideSection, showSection) { // Checks if all inputs are valid, then moves from Part X to Part Y, or visa versa
    // Core Error Message Elements
    var nameErrorMsg = document.getElementById("nameErrorMsg");
    var emailErrorMsg = document.getElementById("emailErrorMsg");
    var phoneErrorMsg = document.getElementById("phoneErrorMsg");
    var discErrorMsg = document.getElementById("discErrorMsg");
    var targetErrorMsg = document.getElementById("targetErrorMsg");
    var payErrorMsg = document.getElementById("payErrorMsg");
    var couponErrorMsg = document.getElementById("couponErrorMsg");


    if (hideSection < showSection) {
        x = $("#part-"+hideSection);
        y = $(x).find("input");

        let valid = true;
        
        // Keynote - no validation needed for (6) as it has a selected default value

        
        for (i = 0; i < y.length; i++) {
            let val = y[i].value
            const num = Number(val);
            $(y[i]).css("background","#ffffff")
        // Radio button validation
            // Discovery Method Radio Validation
            if ((y[i]).name === "discovery_method") {
                if ((y[i]).type === "radio" && !$(`input[name ="${y[i].name}"]:checked`).length) {
                    discErrorMsg.innerHTML = "Please select an option!";
                    $(y[i]).css("background", "#ffcccc");
                    valid = false;
                } else {
                    discErrorMsg.innerHTML = "";
                    $(y[i]).css("background","#ffffff")
                }
                
            // Target Buyer Radio Validation 
            } else if ((y[i]).name === "target_buyer") {
                if ((y[i]).type === "radio" && !$(`input[name ="${y[i].name}"]:checked`).length) {
                    targetErrorMsg.innerHTML = "Please select an option!"
                    $(y[i]).css("background", "#ffcccc");
                    valid = false;
                } else {
                    targetErrorMsg.innerHTML = "";
                    $(y[i]).css("background","#ffffff");
                }
            
        // String Validation
            // Name Validation
            } else if ((y[i]).name === "firstname") {
                if (val == "") {
                    nameErrorMsg.innerHTML = "Please enter your name!";
                    $(y[i]).css("background","#ffcccc");
                    valid = false;
                } else {
                    nameErrorMsg.innerHTML = "";
                    $(y[i]).css("background","#ffffff");
                }
            
            // Email validation 
            } else if ((y[i]).name === "email") {
                if (val === "") {
                    emailErrorMsg.innerHTML = "Please enter your email!";
                    $(y[i]).css("background", "#ffcccc");
                    valid = false;
                }
                else if (!emailPattern.test(val)) {
                    emailErrorMsg.innerHTML = "Email entry unacceptable, please ensure the <strong>email entered is in the correct format</strong> <br> \
                    including a <strong>username, domain name</strong> (like gmail.com) <strong>and an @ symbol. EX: example@gmail.com</strong>"
                    $(y[i]).css("background", "#ffcccc");
                    valid = false;
                } else {
                    emailErrorMsg.innerHTML = "";
                    $(y[i]).css("background","#ffffff");
                }
                

        // Number validation
            // Phone Number Validation
            } else if ((y[i]).name === "phoneNumber") {
                if (val === "") {
                    phoneErrorMsg.innerHTML = "Please enter your phone number!";
                    $(y[i]).css("background", "#ffcccc");
                    valid = false;
                }
                else if (!phonePattern.test(val)) {
                    phoneErrorMsg.innerHTML = "Phone entry unacceptable, please ensure the <strong>number contains only digits (0-9)</strong> and <br> \
                    the number is <strong>above the required length of 7 characters and below 15 characters.</strong> <br> \
                    <em style='size: 50%';>If you have a unique phone number that cannot be entered, please contact our support team.</em>"
                    $(y[i]).css("background", "#ffcccc");
                    valid = false;
                } else {
                    phoneErrorMsg.innerHTML = "";
                    $(y[i]).css("background","#ffffff");
                }
            
            // Desired Payment Amount Input Validation
            } else if ((y[i]).name === "payAmount") {
                if (val === "") {
                    payErrorMsg.innerHTML = "Please enter a number!";
                    $(y[i]).css("background","#ffcccc");
                    valid = false;
                } else {
                    payErrorMsg.innerHTML = "";
                    $(y[i]).css("background","#ffffff");
                }

            // General NaN Rejection / Validation
            } else if ((y[i]).type === "number" && isNaN(Number(val))) {
                if ((y[i]).name === "payAmount") {
                    payErrorMsg.innerHTML = "Entry unacceptable, <strong>only fully numerical entires (floating point included) are accepted.</strong>";
                    $(y[i]).css("background", "#ffcccc");
                    valid = false;
                } else if ((y[i]).name === "couponNum") {
                    couponErrorMsg.innerHTML = "Entry unacceptable, <strong>only whole numbers between 1-10 (inclusive) are accepted!</strong>";
                    $(y[i]).css("background", "#ffcccc");
                    valid = false;
                } else {
                    if ((y[i]).name === "payAmount") {
                        payErrorMsg.innerHTML = "";
                    } else if ((y[i]).name === "couponNum") {
                        couponErrorMsg.innerHTML = "";
                    }
                    $(y[i]).css("background","#ffffff");
                }
            }

            // Coupon Raffle Entry Validation
            else if ((y[i]).name === "couponNum") {
                if (val === "") {
                    $(y[i]).css("background","#ffcccc");
                    valid = false;
                } else {
                    if (!(Number.isInteger(num))) {
                        $(y[i]).css("background","#ffcccc");
                        valid = false;
                        couponErrorMsg.innerHTML = "Entry unacceptable, only <strong>whole numbers between 1-10 (inclusive)</strong> are accepted!";
                    } else if (num < 1 || num > 10) {
                        $(y[i]).css("background","#ffcccc");
                        valid = false;
                        couponErrorMsg.innerHTML = "Entry unacceptable, number is out of accepted range! <br> \
                        <strong>Only numbers between 1-10 (inclusive) are accepted.</strong> ";
                    } else {
                        couponErrorMsg.innerHTML = "";
                        $(y[i]).css("background","#ffffff");
                    }
                }
            }
            // Fallback
            else if (val == "") {
                $(y[i]).css("background","#ffcccc");
                valid = false;
            }
        }

        if (!valid) { // Prevents further action until valid
            return false;
        }
    }

    for (i = 1; i < showSection; i++) { // Visual indicator of how much the user has currently (or previously) completed
        $("#step-"+i).css("opacity","1");
    }

    $("#part-"+hideSection).css("display","none");
    $("#part-"+showSection).css("display","block");


    nameErrorMsg.innerHTML= "";
    emailErrorMsg.innerHTML = "";
    phoneErrorMsg.innerHTML = "";
    discErrorMsg.innerHTML = "";
    targetErrorMsg.innerHTML = "";
    couponErrorMsg.innerHTML = "";
}