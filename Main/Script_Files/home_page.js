/*carousel*/
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
$(document).ready(function () {
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
