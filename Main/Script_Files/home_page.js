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