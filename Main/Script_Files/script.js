const themeToggle = document.getElementById('themeToggle');
const toggleIcon  = themeToggle.querySelector('.toggle-icon');
const toggleLabel = themeToggle.querySelector('.toggle-label');
const html        = document.documentElement;

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
