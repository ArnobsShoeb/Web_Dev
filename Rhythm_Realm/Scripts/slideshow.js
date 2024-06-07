let slideIndex = 0;
const slides = document.querySelectorAll('.slideshow-container img');

function showSlide(index) {
  slides.forEach((slide) => {
    slide.style.display = 'none';
  });

  slides[index].style.display = 'block';
}

function nextSlide() {
  slideIndex++;
  if (slideIndex >= slides.length) {
    slideIndex = 0;
  }
  showSlide(slideIndex);
}

function startSlideshow() {
  showSlide(slideIndex);
  setInterval(nextSlide, 5000); // Change slide every 5 seconds
}

startSlideshow();
