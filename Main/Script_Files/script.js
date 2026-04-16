/*const themeToggle = document.getElementById('themeToggle');
const toggleIcon  = themeToggle.querySelector('.toggle-icon');
const toggleLabel = themeToggle.querySelector('.toggle-label');*/
const html        = document.documentElement;
var slideIndex = 1;

$("#darkToggle").click(function(){
        $("body").toggleClass("dark-mode");
        if($("body").hasClass("dark-mode")){
            $(this).text("Light mode");
        } else {
            $(this).text("Dark mode");
        };
});

$(document).ready(function() {
  $(".flowers_slides").eq(slideIndex - 1).show();
});

/*
function applyTheme(theme) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem('bb-theme', theme);

  if (theme === 'dark') {
    toggleIcon.textContent  = '☀️';
    toggleLabel.textContent = 'Light Mode';
  } else {
    toggleIcon.textContent  = '🌙';
    toggleLabel.textContent = 'Dark Mode';
  }
}

const savedTheme = localStorage.getItem('bb-theme') || 'light';
applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  applyTheme(current === 'light' ? 'dark' : 'light');
});
*/

function nextSlide(n) { 
  showSlides(slideIndex += n);
}

function showSlides(n) {
    let i;
    let slides;
    slides = document.getElementsByClassName("flowers_slides");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex-1].style.display = "block";
}

const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});


const uploadInputs = document.querySelectorAll('.upload-input');

uploadInputs.forEach(input => {
  input.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const previewId = input.getAttribute('data-target');
    const areaId    = input.getAttribute('data-area');
    const preview   = document.getElementById(previewId);
    const area      = document.getElementById(areaId);
    const label     = area.querySelector('.upload-label');

    const reader = new FileReader();
    reader.onload = (evt) => {
      preview.src = evt.target.result;
      preview.classList.remove('hidden');
      label.style.display = 'none';
    };
    reader.readAsDataURL(file);
  });
});


const timelineItems = document.querySelectorAll('.timeline-item');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = Array.from(timelineItems).indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 120);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

timelineItems.forEach(item => observer.observe(item));


const timelineCards = document.querySelectorAll('.timeline-card');

timelineCards.forEach(card => {
  card.addEventListener('click', () => {
    const isExpanded = card.classList.toggle('expanded');
    card.style.borderWidth = isExpanded ? '5px' : '';
  });
});
