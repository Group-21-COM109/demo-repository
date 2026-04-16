let switching = false;
var slideIndex = 1;

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const phonePattern = /^[0-9]{7,15}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

$(document).ready(function() {
    let Screen1A = document.getElementById("Screen_1_A");
    let Screen1B = document.getElementById("Screen_1_B");
    let Screen2 = document.getElementById("Screen_2");

    // Image Slideshow Setup
    $(".flowers_slides").eq(slideIndex - 1).show();

    // Form Handling
    $(".part").css("display","none");
    $("#part-1").css("display","block");
    $("#begin-button").click(function(){ 

        switchScreen(Screen1A, Screen1B)
    });

    $("#delete-data-button").click(function(){
        if (!(localStorage.getItem("firstname")) && !(localStorage.getItem("favColour"))) {
            alert("No saved data to delete! Try completing our survey first.");
        } else {
            const canDelete = confirm("Are you sure you wish to delete all current data?")
            if (canDelete) {
                localStorage.clear();
                alert("Data successfully deleted!");
            };
        };
    });

    $("#form-stats").click(function(){
        if (!(localStorage.getItem("firstname")) && !(localStorage.getItem("favColour")) && !(localStorage.getItem("payAmount"))
        && !(localStorage.getItem("couponNum"))) {
            alert("There is no data to view! Try completing the survey first.")
        } else {
            switchScreen(Screen1A, Screen2)
        };
    });

    $("#return-button").click(function() {
        switchScreen(Screen2, Screen1A)
    });

    $("#opt-out-button").click(function() {
        const canDelete = confirm("Are you sure you wish to delete all current data?\
            Doing so will return you to the main screen.")
        if (canDelete) {
            localStorage.clear();
            alert("Data successfully deleted!");
            switchScreen(Screen2, Screen1A)
        };
    });

    $("#restart-form").click(function() {
        const canContinue = confirm("Restarting the survey will delete all current data, continue?")
        if (canContinue) {
            localStorage.clear(); 
            switchScreen(Screen2, Screen1B);
        };
    });

    $("form").on("keydown", function(e) { // Prevents user from accidentally entering the entire form prematurely using Enter Key
        if (e.key === "Enter") {
            e.preventDefault();
        }
    });

    $("#darkToggle").click(function(){
        $("body").toggleClass("dark-mode");
        if($("body").hasClass("dark-mode")){
            $(this).text("Light mode");
        } else {
            $(this).text("Dark mode");
        };
    });
});

function getUserPool(payAmount) {
    let userChoices = {
        "below":0,
        "agreed":0,
        "above":0,
    };

    const totalUsers = 1000
    // Randomises the "form submissions" of 1000 "users". Each user has a choice, and depending on the range the real user's submitted
    // desired payment amount in the actual form, the results of the randomization will sway either towards disagreeing or agreeing 
    // with the real user's input.
    if (payAmount >= 10) {
        for (let i = 0; i < totalUsers; i++) {
            let number = randomInt(1,20)
            if (number >= 4) {
                userChoices["below"] += 1
            } else if (number <= 5 && number >= 16) {
                userChoices["agreed"] += 1
            } else {
                userChoices["above"] += 1
            };
        };
    } else if (payAmount <= 11 && payAmount >= 20) {
        for (let i = 0; i < totalUsers; i++) {
            let number = randomInt(1,20)
            if (number >= 8) {
                userChoices["below"] += 1
            } else if (number <= 9 && number >= 12) {
                userChoices["agreed"] += 1
            } else {
                userChoices["above"] += 1
            };
        };
    } else {
        for (let i = 0; i < totalUsers; i++) {
            let number = randomInt(1,20)
            if (number >= 15) {
                userChoices["below"] += 1
            } else if (number <= 16 && number >= 19) {
                userChoices["agreed"] += 1
            } else {
                userChoices["above"] += 1
            };
        };
    };

    if ((userChoices["below"] > userChoices["agreed"]) && (userChoices["below"] > userChoices["above"])) {
        return "Below";
    } 
    else if ((userChoices["agreed"] > userChoices["below"]) && (userChoices["agreed"] > userChoices["above"])) {
        return "Agreed";
    } 
    else if ((userChoices["above"] > userChoices["below"]) && (userChoices["above"] > userChoices["agreed"])) {
        return "Above";
    } 
    else {
        // If there is an equal no. of people in agreement and disagreement
        return "Error";
    };
};

function Screen_2_Handler() {
    $(".showcase_slides").eq(slideIndex - 1).show();
    // Ensure no leftover images are still potentially on display
    $("#ran_img_1").css("display","none")
    $("#ran_img_2").css("display","none")
    $("#ran_img_3").css("display","none")
    $("#ran_img_4").css("display","none")
    $("#ran_img_5").css("display","none")
    $("#ran_img_6").css("display","none")
    $("#ran_img_7").css("display","none")
    $("#ran_img_8").css("display","none")

    const colours = [
            "red","blue","yellow","green","orange",
            "purple","pink","brown","white","gray","black"
    ];

    for (let i = 0; i < colours.length; i++) {
        $(`#${colours[i]}`).css("display","none");
    }

    // Random Image for Stat Screen Handling
    let Random_1 = randomInt(1,4)
    let Random_2 = randomInt(1,4)

    // Ensures both stat pages don't display the same image
    if (Random_1 === Random_2) {
        while (Random_1 === Random_2) {
            Random_2 = randomInt(1,4)
        }
    }
    // First Stat Page (Random_1)
    if (Random_1 === 1) {$("#ran_img_1").css("display","block")}
    else if (Random_1 === 2) {$("#ran_img_2").css("display","block")}
    else if (Random_1 === 3) {$("#ran_img_3").css("display","block")}
    else if (Random_1 === 4) {$("#ran_img_4").css("display","block")}

    // Second Stat Page (Random_2)
    if (Random_2 === 1) {$("#ran_img_5").css("display","block")}
    else if (Random_2 === 2) {$("#ran_img_6").css("display","block")}
    else if (Random_2 === 3) {$("#ran_img_7").css("display","block")}
    else if (Random_2 === 4) {$("#ran_img_8").css("display","block")}

    const name = localStorage.getItem("firstname");
    let colour = localStorage.getItem("favColour");
    if (colour === "unknown" || colour === "surprise") {
        let i = randomInt(0,10);
        colour = colours[i];
    };
    const payAmount = localStorage.getItem("payAmount");
    const couponNum = localStorage.getItem("couponNum");
    const raffleWon = localStorage.getItem("raffleWon");
    const winningNum = localStorage.getItem("winningNum");

    // First slide
    if (colour === "multicoloured") {
        $("#colour_text").html("Based on our analysis, we think you might like an assortment of different coloured flowers!");
    } else {
       $("#colour_text").html(`Based on our analysis, we think you might like some... <span id="colour_extra">${colour}</span> flowers!`);
       $("#colour_extra").css("color",`${colour}`)
    }
        
    $(`#${colour}`).css("display","block");

    // Second slide
    let Result = getUserPool(payAmount);

    $("#pay_amount").html("You said you would pay... £" + payAmount + "!")
    if (Result === "Below") {
        $("#pay_heading").html("The premium spender!");
        $("#pay_text").html("According to our statistics, most users agreed they would <i>prefer to spend less on flowers</i> than \
        you said you would.");
        $("#pay_result").html("However, you get what you get pay for; so you'll get something great!");
    } 
    else if (Result === "Agreed") {
        $("#pay_heading").html("The casual spender!");
        $("#pay_text").html("According to our statistics, like yourself, many users <i>also preferred to spend in or around £" + payAmount + "</i>\
        on flowers!");
        $("#pay_result").html("Your wish is our command! Keep an eye out for reduced prices over the coming weeks.");
    } else if (Result === "Above") {
        $("#pay_heading").html("The cautious spender!");
        $("#pay_text").html("According to our statistics, most users agreed they would <i>likely pay a little more for flowers</i> \
        than what you said you would.");
        $("#pay_result").html("However, unlike many of our flowers, discounts are always in full bloom! Keep an eye out!");
    } else {
        $("#pay_heading").html("The One in a Million!");
        $("#pay_text").html("Unfortunately, there has been an error in our analytics at this time!");
        $("#pay_result").html("Everything happens for a reason, so create a ticket with our support team \
            and notify them of this error to redeem a 75% off coupon!");
    };

    // Third slide

    $("#raffle_num").html("Your guess was... " + couponNum + "!")
    if (raffleWon === true) {
        $("#raffle_results").html("Our one and only - WINNER!");
        $("#raffle_text").html("You must be psychic! You won! Your number matched the winning number!");
        $("#raffle_extra").html("If we have not already been in contact with you via. email in relation to redeeming your prize, \
            please don't hesitate to contact our support team.");
    } else {
        $("#raffle_results").html("So close!");
        $("#raffle_text").html("Unfortunately, your guess wasn't the winning number ("+ winningNum +").")
        $("#raffle_extra").html("Don't be disheartened, we run promotional events with free rewards very frequently, keep an eye out!")
    };
};

// Both currentScreen and nextScreen must be in ID form
function switchScreen(currentScreen, nextScreen) {
    if (switching) return;
    switching = true;
    $(currentScreen).addClass("blur");
    $(currentScreen).fadeOut(300,"swing", function () {
        $(currentScreen).removeClass("blur");
        $(nextScreen).show();
        if (nextScreen === document.getElementById("Screen_2")) {
            Screen_2_Handler();
        };
        $(nextScreen)
            .addClass("blur")
            .hide() // Ensure it's hidden
            .fadeIn(300,"swing", function() {
                $(nextScreen).removeClass("blur")
                switching = false;
            });
    });
}

// Slideshow Handling

function nextSlide(n, type) { // Takes in movement count parameter, then calls showSlides and moves n slides. 
  showSlides(slideIndex += n, type);
}

function showSlides(n, type) { // Takes in parameter n, then moves n slides. Type distinguishes which slide set to move
    let i;
    let slides;
    if (type === "Stats") {
        slides = document.getElementsByClassName("showcase_slides");
    } else if (type === "Footer") {
        slides = document.getElementsByClassName("flowers_slides");
    }
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex-1].style.display = "block";
}

// Form Handling

document.addEventListener("DOMContentLoaded", () => {
    const phoneInput = document.querySelector("input[name='phone']");

    if (phoneInput) {
        phoneInput.addEventListener("input", function() {
            this.value = this.value.replace(/\s+/g, '');  // Remove spaces on numerical entry
        });
    };

    document.getElementById("floraForm").addEventListener("submit", function(e) {
        e.preventDefault();
        localStorage.clear();

        const formData = new FormData(this);

        let Screen1B = document.getElementById("Screen_1_B");
        let Screen2 = document.getElementById("Screen_2")

        // Email, Phone Number, Discovery Method and Target Buyer fields are irrelevant to the data I wish to display and thus 
        // are not handled.

        const name = formData.get("firstname");
        const payAmount = formData.get("payAmount");
        let colourChoice = formData.get("colours");
        if (colourChoice === "unknown" || colourChoice === "surprise") {
            const colours = [
                "red","blue","yellow","green","orange",
                "purple","pink","brown","white","gray","black"
            ];
            let i = randomInt(0,10);
            colourChoice = colours[i];
        }

        const raffleNum = formData.get("couponNum");
        const raffleWin = randomInt(1,10);

        console.log(raffleNum, raffleWin)

        if (raffleNum == raffleWin) {
            localStorage.setItem("raffleWon",true)
        } else {
            localStorage.setItem("raffleWon",false)
        }
        localStorage.setItem("firstname", name);
        localStorage.setItem("favColour", colourChoice);
        localStorage.setItem("payAmount", payAmount)
        localStorage.setItem("couponNum", raffleNum)
        localStorage.setItem("winningNum",raffleWin)

        switchScreen(Screen1B, Screen2)

    });
});

function errorColChange(item) {
    if($("body").hasClass("dark-mode")){
        $(item).css("background", "#760000");
    } else {
        $(item).css("background", "#ffcccc");
    };
}

function errorColClear(item) {
    if($("body").hasClass("dark-mode")){
        $(item).css("background", "#222");
    } else {
        $(item).css("background", "#ffffff");
    };
}

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
                    errorColChange(y[i])
                    valid = false;
                } else {
                    discErrorMsg.innerHTML = "";
                    errorColClear(y[i])
                }
                
            // Target Buyer Radio Validation 
            } else if ((y[i]).name === "target_buyer") {
                if ((y[i]).type === "radio" && !$(`input[name ="${y[i].name}"]:checked`).length) {
                    targetErrorMsg.innerHTML = "Please select an option!"
                    errorColChange(y[i])
                    valid = false;
                } else {
                    targetErrorMsg.innerHTML = "";
                    errorColClear(y[i])
                }
            
        // String Validation
            // Name Validation
            } else if ((y[i]).name === "firstname") {
                if (val == "") {
                    nameErrorMsg.innerHTML = "Please enter your name!";
                    errorColChange(y[i])
                    valid = false;
                } else {
                    nameErrorMsg.innerHTML = "";
                    errorColClear(y[i])
                }
            
            // Email validation 
            } else if ((y[i]).name === "email") {
                if (val === "") {
                    emailErrorMsg.innerHTML = "Please enter your email!";
                    errorColChange(y[i])
                    valid = false;
                }
                else if (!emailPattern.test(val)) {
                    emailErrorMsg.innerHTML = "Email entry unacceptable, please ensure the <strong>email entered is in the correct format</strong> <br> \
                    including a <strong>username, domain name</strong> (like gmail.com) <strong>and an @ symbol. EX: example@gmail.com</strong>"
                    errorColChange(y[i])
                    valid = false;
                } else {
                    emailErrorMsg.innerHTML = "";
                    errorColClear(y[i])
                }
                

        // Number validation
            // Phone Number Validation
            } else if ((y[i]).name === "phoneNumber") {
                if (val === "") {
                    phoneErrorMsg.innerHTML = "Please enter your phone number!";
                    errorColChange(y[i])
                    valid = false;
                }
                else if (!phonePattern.test(val)) {
                    phoneErrorMsg.innerHTML = "Phone entry unacceptable, please ensure the <strong>number contains only digits (0-9)</strong> and <br> \
                    the number is <strong>above the required length of 7 characters and below 15 characters.</strong> <br> \
                    <em style='size: 50%';>If you have a unique phone number that cannot be entered, please contact our support team.</em>"
                    errorColChange(y[i])
                    valid = false;
                } else {
                    phoneErrorMsg.innerHTML = "";
                    errorColClear(y[i])
                }
            
            // Desired Payment Amount Input Validation
            } else if ((y[i]).name === "payAmount") {
                if (val === "") {
                    payErrorMsg.innerHTML = "Please enter a number!";
                    errorColChange(y[i])
                    valid = false;
                } else {
                    payErrorMsg.innerHTML = "";
                    errorColClear(y[i])
                }

            // General NaN Rejection / Validation
            } else if ((y[i]).type === "number" && isNaN(Number(val))) {
                if ((y[i]).name === "payAmount") {
                    payErrorMsg.innerHTML = "Entry unacceptable, <strong>only fully numerical entires (floating point included) are accepted.</strong>";
                    errorColChange(y[i])
                    valid = false;
                } else if ((y[i]).name === "couponNum") {
                    couponErrorMsg.innerHTML = "Entry unacceptable, <strong>only whole numbers between 1-10 (inclusive) are accepted!</strong>";
                    errorColChange(y[i])
                    valid = false;
                } else {
                    if ((y[i]).name === "payAmount") {
                        payErrorMsg.innerHTML = "";
                    } else if ((y[i]).name === "couponNum") {
                        couponErrorMsg.innerHTML = "";
                    }
                    errorColClear(y[i])
                }
            }

            // Coupon Raffle Entry Validation
            else if ((y[i]).name === "couponNum") {
                if (val === "") {
                    errorColChange(y[i])
                    valid = false;
                } else {
                    if (!(Number.isInteger(num))) {
                        errorColChange(y[i])
                        valid = false;
                        couponErrorMsg.innerHTML = "Entry unacceptable, only <strong>whole numbers between 1-10 (inclusive)</strong> are accepted!";
                    } else if (num < 1 || num > 10) {
                        errorColChange(y[i])
                        valid = false;
                        couponErrorMsg.innerHTML = "Entry unacceptable, number is out of accepted range! <br> \
                        <strong>Only numbers between 1-10 (inclusive) are accepted.</strong> ";
                    } else {
                        couponErrorMsg.innerHTML = "";
                        errorColClear(y[i])
                    }
                }
            }
            // Fallback
            else if (val == "") {
                errorColChange(y[i])
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
