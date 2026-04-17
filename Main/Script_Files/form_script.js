// Random math function, accepting two numbers as argument and returning a random number
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Initial setup
$(document).ready(function() {
    const Screen1A = document.getElementById("Screen_1_A");
    const Screen1B = document.getElementById("Screen_1_B");
    const Screen2 = document.getElementById("Screen_2");
    
    const phoneInput = document.querySelector("input[name='phone']");
    const floraForm = document.getElementById("floraForm");


    // Displays initial slide for footer
    $(".flowers_slides").eq(slideIndex - 1).show();

    $(".part").css("display","none");
    $("#part-1").css("display","block");

    //==INPUT HANDLING==//

    $("#begin-button").click(function(){ 
        switchScreen(Screen1A, Screen1B);
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
            switchScreen(Screen1A, Screen2);
        };
    });

    $("#return-button").click(function() {
        switchScreen(Screen2, Screen1A);
    });

    $("#opt-out-button").click(function() {
        const canDelete = confirm("Are you sure you wish to delete all current data?\
            Doing so will return you to the main screen.");
        if (canDelete) {
            localStorage.clear();
            alert("Data successfully deleted!");
            switchScreen(Screen2, Screen1A);
        };
    });

    $("#restart-form").click(function() {
        const canContinue = confirm("Restarting the survey will delete all current data, continue?")
        if (canContinue) {
            localStorage.clear(); 
            switchScreen(Screen2, Screen1B);
        };
    });

    //==DARK MODE TOGGLE==//

    $("#darkToggle").click(function(){
        $("body").toggleClass("dark-mode");
        if($("body").hasClass("dark-mode")){
            $(this).text("Light mode");
        } else {
            $(this).text("Dark mode");
        };
    });

    //==FORM HANDLING==//

    // Prevents form from being submitted prematurely through usage of the Enter key
    $("form").on("keydown", function(e) {
        if (e.key === "Enter") {
            e.preventDefault();
        }
    });

    if (phoneInput) {
        // On input, uses regex to constrain specific entires.
        phoneInput.addEventListener("input", function() {
            this.value = this.value.replace(/\s+/g, '');  
        });
    };

    // Event listener preventing normal form submission, allowing an override for special handling
    floraForm.addEventListener("submit", function(e) {
        e.preventDefault();
        localStorage.clear(); // Clear anything stored from previous completion

        const formData = new FormData(floraForm); // Gather all form input values


        const name = formData.get("firstname");
        const payAmount = formData.get("payAmount");
        const colourChoice = formData.get("colours");
        const raffleNum = formData.get("couponNum");

        const raffleWin = randomInt(1,10);

        console.log(raffleNum, raffleWin)

        if (raffleNum == raffleWin) {
            localStorage.setItem("raffleWon",true)
        } else {
            localStorage.setItem("raffleWon",false)
        }

        // Store all variables for later display (and repeated usage where possible)
        localStorage.setItem("firstname", name);
        localStorage.setItem("favColour", colourChoice);
        localStorage.setItem("payAmount", payAmount)
        localStorage.setItem("couponNum", raffleNum)
        localStorage.setItem("winningNum",raffleWin)

        
        switchScreen(Screen1B, Screen2);

        // Reset all form elements, including emptying values and returning all steps to previous opacity.
        $('#floraForm')[0].reset();

        $("#step-1").css("opacity","0.5");
        $("#step-2").css("opacity","0.5");
        $("#step-3").css("opacity","0.5");
        $("#step-4").css("opacity","0.5");
    });
});

//===SCREEN HANDLING===//
let switching = false;
const colours = [
            "red","blue","yellow","green","orange",
            "purple","pink","brown","white","gray","black"
];

// Void function that is called in several places, handles data to be displayed on the user data screen.
function Screen_2_Handler() {
    // Displays initial slide for data showcasing
    $(".showcase_slides").eq(slideIndex - 1).show();

    // Ensure no leftover images are still potentially on display, set all to none
    $("#ran_img_1").css("display","none")
    $("#ran_img_2").css("display","none")
    $("#ran_img_3").css("display","none")
    $("#ran_img_4").css("display","none")
    $("#ran_img_5").css("display","none")
    $("#ran_img_6").css("display","none")
    $("#ran_img_7").css("display","none")
    $("#ran_img_8").css("display","none")

    for (let i = 0; i < colours.length; i++) {
        $(`#${colours[i]}`).css("display","none");
    }

    // Randomize Images for Stat Screens
    let Random_1 = randomInt(1,4)
    let Random_2 = randomInt(1,4)

    // Ensure both images aren't the same
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

    // Load all data
    const name = localStorage.getItem("firstname");
    const payAmount = localStorage.getItem("payAmount");
    const couponNum = localStorage.getItem("couponNum");
    const raffleWon = localStorage.getItem("raffleWon");
    const winningNum = localStorage.getItem("winningNum");

    let colour = localStorage.getItem("favColour");

    // For "unknown" and "surprise" selections, a random colour is always chosen at screen load.
    if (colour === "unknown" || colour === "surprise") {
        let i = randomInt(0,10);
        colour = colours[i];
    };
    
    // Use saved data to display determinant messages in several areas. 
    // DETERMINANT - Displays a unique image depending on which entry the user made for their desired colour.
    if (colour === "multicoloured") {
        $("#colour_text").html("Based on our analysis, we think you might like an assortment of different coloured flowers!");
    } else {
       $("#colour_text").html(`Based on our analysis, we think you might like some... <span id="colour_extra">${colour}</span> flowers!`);
       $("#colour_extra").css("color",`${colour}`)
    }
        
    $(`#${colour}`).css("display","block");

    /* DETERMINANT - (Usually) displays one of three messages depending on the data gathered from getUserPool, influenced by 
    the user's entry for how much they would wish to pay for flowers. */
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
    // Extra error screen is provided in the extremely unlikely event where an equal amount of "users" agree or disagree (from getUserPool())
    } else {
        $("#pay_heading").html("The One in a Million!");
        $("#pay_text").html("Unfortunately, there has been an error in our analytics at this time!");
        $("#pay_result").html("Everything happens for a reason, so create a ticket with our support team \
            and notify them of this error to redeem a 75% off coupon!");
    };

    /* DETERMINANT - Displays one of two screens, the first one congratulating the user if they won (their guess matched the random number), the second
    consoling the user if they lost. */

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

// Generates stats from 1000 "users" for the results screen. Takes in a saved input from the form as an argument.
function getUserPool(payAmount) {
    let userChoices = {
        "below":0,
        "agreed":0,
        "above":0,
    };

    const totalUsers = 1000
    /* Randomises the "form submissions" of 1000 "users". Each "user" has a "choice", and depending on the value the real user submitted
    the results of the randomization will sway either towards disagreeing or agreeing with the real user's input. */

    // If user's pay amount is low, most users tend to agree.
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

    // Else if user's pay amount is modest, some users will agree, while some will sway towards preferring a cheaper price.
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

    // Else (if the user's pay amount is high), most users will disagree, swaying towards preferring something more affordable.
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

// Accepts two arguments in ID (#...) form. Handles the transition from one display screen to the next. 
function switchScreen(currentScreen, nextScreen) {
    // Checks if a switch is currently taking place
    if (switching) return;
    switching = true;

    // Blurs current screen, fading it out and then fading in the next screen, handling any special requests where necessary
    $(currentScreen).addClass("blur");
    $(currentScreen).fadeOut(300,"swing", function () {
        $(currentScreen).removeClass("blur");
        $(nextScreen).show();
        if (nextScreen === document.getElementById("Screen_2")) {
            Screen_2_Handler();
        };
        if (nextScreen === document.getElementById("Screen_1_B")) {
            // Ensures whenever form is started (even after prior completion) it always opens up on the first screen
            $("#part-5").css("display","none")
            $("#part-1").css("display","block");
        }
        $(nextScreen)
            .addClass("blur")
            .hide() // Ensure it's hidden
            .fadeIn(300,"swing", function() {
                $(nextScreen).removeClass("blur")
                switching = false;
            });
    });
};

//===FORM HANDLING===//
// Regex declarations; later constraining which values the user is allowed to enter (and what must be entered) in the form
const phonePattern = /^[0-9]{7,15}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


// Accepts a form item as an argument, handling CSS styling determinant on which mode (light/dark) is enabled
function errorColChange(item, event) {
    if (event === "Error") {
        // Error styling
        if($("body").hasClass("dark-mode")){
            $(item).css("background", "#760000");
        } else {
            $(item).css("background", "#ffcccc");
        };
    } else { 
        // (Return to ) Normal styling
        if($("body").hasClass("dark-mode")){
            $(item).css("background", "#222");
        }   else {
            $(item).css("background", "#ffffff");
        };
    };
};

// Accepts two sections (parts of form) as arguments (in number form). Validates form, if successful then handles section transition.
function run(hideSection, showSection) { 
    // Core Error Message Elements
    var nameErrorMsg = document.getElementById("nameErrorMsg");
    var emailErrorMsg = document.getElementById("emailErrorMsg");
    var phoneErrorMsg = document.getElementById("phoneErrorMsg");
    var discErrorMsg = document.getElementById("discErrorMsg");
    var targetErrorMsg = document.getElementById("targetErrorMsg");
    var payErrorMsg = document.getElementById("payErrorMsg");
    var couponErrorMsg = document.getElementById("couponErrorMsg");


    if (hideSection < showSection) {
        // Two variables, x is the part, y is the array of all inputs in that section
        x = $("#part-"+hideSection);
        y = $(x).find("input");

        let valid = true;

        
        // For every input field inside a given section, validate each input 
        for (i = 0; i < y.length; i++) {
            let val = (y[i].value);
            const num = Number(val);
            $(y[i]).css("background","#ffffff")
        // Radio button validation
            // Discovery Method Radio Validation
            if ((y[i]).name === "discovery_method") {
                // Checks to ensure something has been selected
                if ((y[i]).type === "radio" && !$(`input[name ="${y[i].name}"]:checked`).length) {
                    discErrorMsg.innerHTML = "Please select an option!";
                    errorColChange(y[i],"Error")
                    valid = false;
                } else {
                    discErrorMsg.innerHTML = "";
                    errorColChange(y[i])
                }
                
            // Target Buyer Radio Validation 
            } else if ((y[i]).name === "target_buyer") {
                // Checks to ensure something has been selected
                if ((y[i]).type === "radio" && !$(`input[name ="${y[i].name}"]:checked`).length) {
                    targetErrorMsg.innerHTML = "Please select an option!"
                    errorColChange(y[i],"Error")
                    valid = false;
                } else {
                    targetErrorMsg.innerHTML = "";
                    errorColChange(y[i])
                }
            
        // String Validation
            // Name Validation
            } else if ((y[i]).name === "firstname") {
                // Ensures field isn't empty
                if (val == "") {
                    nameErrorMsg.innerHTML = "Please enter your name!";
                    errorColChange(y[i],"Error")
                    valid = false;
                } else {
                    nameErrorMsg.innerHTML = "";
                    errorColChange(y[i])
                }
            
            // Email validation 
            } else if ((y[i]).name === "email") {
                if (val === "") {
                    emailErrorMsg.innerHTML = "Please enter your email!";
                    errorColChange(y[i],"Error")
                    valid = false;
                }
                // Ensures field isn't empty, then ensures entry is in an acceptable format 
                else if (!emailPattern.test(val)) {
                    emailErrorMsg.innerHTML = "Email entry unacceptable, please ensure the <strong>email entered is in the correct format</strong> <br> \
                    including a <strong>username, domain name</strong> (like gmail.com) <strong>and an @ symbol. EX: example@gmail.com</strong>"
                    errorColChange(y[i],"Error")
                    valid = false;
                } else {
                    emailErrorMsg.innerHTML = "";
                    errorColChange(y[i])
                }
                

        // Number validation
            // Phone Number Validation
            } else if ((y[i]).name === "phoneNumber") {
                if (val === "") {
                    phoneErrorMsg.innerHTML = "Please enter your phone number!";
                    errorColChange(y[i],"Error")
                    valid = false;
                }
                // Ensures field isn't empty, then ensures entry is in an acceptable format 
                else if (!phonePattern.test(val)) {
                    phoneErrorMsg.innerHTML = "Phone entry unacceptable, please ensure the <strong>number contains only digits (0-9)</strong> and <br> \
                    the number is <strong>above the required length of 7 characters and below 15 characters.</strong> <br> \
                    <em style='size: 50%';>If you have a unique phone number that cannot be entered, please contact our support team.</em>"
                    errorColChange(y[i],"Error")
                    valid = false;
                } else {
                    phoneErrorMsg.innerHTML = "";
                    errorColChange(y[i])
                }
            
            // Desired Payment Amount Input Validation
            } else if ((y[i]).name === "payAmount") {
                if (val === "") {
                    payErrorMsg.innerHTML = "Please enter a number!";
                    errorColChange(y[i],"Error")
                    valid = false;
                } else {
                    payErrorMsg.innerHTML = "";
                    errorColChange(y[i])
                }

            // General NaN Rejection / Validation - Rejects any non numerical entries
            } else if ((y[i]).type === "number" && isNaN(Number(val))) {
                if ((y[i]).name === "payAmount") {
                    payErrorMsg.innerHTML = "Entry unacceptable, <strong>only fully numerical entires (floating point included) are accepted.</strong>";
                    errorColChange(y[i],"Error")
                    valid = false;
                } else if ((y[i]).name === "couponNum") {
                    couponErrorMsg.innerHTML = "Entry unacceptable, <strong>only whole numbers between 1-10 (inclusive) are accepted!</strong>";
                    errorColChange(y[i],"Error")
                    valid = false;
                } else {
                    if ((y[i]).name === "payAmount") {
                        payErrorMsg.innerHTML = "";
                    } else if ((y[i]).name === "couponNum") {
                        couponErrorMsg.innerHTML = "";
                    }
                    errorColChange(y[i])
                }
            }

            // Coupon Raffle Entry Validation
            else if ((y[i]).name === "couponNum") {
                if (val === "") {
                    errorColChange(y[i],"Error")
                    valid = false;
                // Ensures field isn't empty, then ensures entry is within the proper range.
                } else {
                    if (!(Number.isInteger(num))) {
                        errorColChange(y[i],"Error")
                        valid = false;
                        couponErrorMsg.innerHTML = "Entry unacceptable, only <strong>whole numbers between 1-10 (inclusive)</strong> are accepted!";
                    } else if (num < 1 || num > 10) {
                        errorColChange(y[i],"Error")
                        valid = false;
                        couponErrorMsg.innerHTML = "Entry unacceptable, number is out of accepted range! <br> \
                        <strong>Only numbers between 1-10 (inclusive) are accepted.</strong> ";
                    } else {
                        couponErrorMsg.innerHTML = "";
                        errorColChange(y[i])
                    }
                }
            }
            // Fallback - Ensures no entry is left empty.
            else if (val == "") {
                errorColChange(y[i],"Error")
                valid = false;
            }
        }

        // Continue looping until valid
        if (!valid) { 
            return false;
        }
    }

    // Updates the steps above the form (visual indicators of form completion progress)

    for (i = 1; i < showSection; i++) { 
        $("#step-"+i).css("opacity","1");
    }

    // Moves to next section, and ensures all error texts have been cleared.
    $("#part-"+hideSection).css("display","none");
    $("#part-"+showSection).css("display","block");


    nameErrorMsg.innerHTML= "";
    emailErrorMsg.innerHTML = "";
    phoneErrorMsg.innerHTML = "";
    discErrorMsg.innerHTML = "";
    targetErrorMsg.innerHTML = "";
    couponErrorMsg.innerHTML = "";
}


//===SLIDESHOW HANDLING===//
var slideIndex = 1;

/* Both functions accept n (number) and type arguments, with n dictating how much the slideshow should be indexed and the type later determining
which slideshow set must be indexed.*/
function nextSlide(n, type) {
  showSlides(slideIndex += n, type); //Appends index by one, passes new index and slide type into logic handler 
};

function showSlides(n, type) {
    let i;
    let slides;
    // 
    if (type === "Stats") {
        slides = document.getElementsByClassName("showcase_slides");
    } else if (type === "Footer") {
        slides = document.getElementsByClassName("flowers_slides");
    }

    // If over 3, index must be reset to one. Else, continue. 
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}

    // Make all existing slides invisible, then make select slide visible
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex-1].style.display = "block";
}