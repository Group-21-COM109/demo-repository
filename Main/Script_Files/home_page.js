/*
SIDENOTE: Due to issues with GitHub on Caoimhe's laptop, I (Oran) uploaded some of Caoimhe's code that she 
compiled. Thus, any areas of this code marked as being added by me were only done so because Caoimhe couldn't access the GitHub.
*/

/*carousel*/

var slideIndex = 1;


document.querySelectorAll('.carousel').forEach(carousel => {
 
  const track = carousel.querySelector('.carousel-track');
  const slides = Array.from(track.children);
  const nextBtn = carousel.querySelector('.next');
  const prevBtn = carousel.querySelector('.prev');
  let index = 0;

  nextBtn.addEventListener('click', () => {
    const slideWidth = slides[0].getBoundingClientRect().width;
    index = (index + 1) % slides.length;
    track.style.transform = `translateX(-${index * slideWidth}px)`;
  });

  prevBtn.addEventListener('click', () => {
    const slideWidth = slides[0].getBoundingClientRect().width;
    index = (index - 1 + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * slideWidth}px)`;
  });

});
/*why cards*/
$(document).ready(function() {
  $('.why-title').hover(
    function() {
      $(this).next('.why-text').stop(true, true).slideDown(400);
    },
    function() {
      $(this).next('.why-text').stop(true, true).slideUp(400);
    }
  );
});
/*opening times*/
$(document).ready(function() {

  $(".flowers_slides").eq(slideIndex - 1).show();

    const days = [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday"
    ];

    const today = new Date().getDay(); // 0 = Sunday, 1 = Monday...

    const todayClass = "." + days[today];

    $(todayClass).addClass("current-day");
});
/*dark mode*/
$("#darkToggle").click(function(){
        $("body").toggleClass("dark-mode");
        if($("body").hasClass("dark-mode")){
            $(this).text("Light mode");
        } else {
            $(this).text("Dark mode");
        };
});

function nextSlide(n) {
  showSlides(slideIndex += n);
}
 //FOOTER SLIDE
function showSlides(n) {    
    let i;
    let slides;
    slides = document.getElementsByClassName("flowers_slides")
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
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