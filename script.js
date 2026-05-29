// Hamburger Menu Toggle
const hamburger = document.querySelector('.ri-menu-3-line');
const menu = document.querySelector('.menu');

if (hamburger && menu) {
  hamburger.addEventListener('click', () => {
    menu.classList.toggle('menu-active');
  });

  window.addEventListener('scroll', () => {
    menu.classList.remove('menu-active');
  });
}

// Category Filtering System
const btnFilter = document.querySelectorAll('.produk-box ul li');
const productCards = document.querySelectorAll('.produk-list .produk-card');

btnFilter.forEach((data) => {
  data.onclick = () => {
    btnFilter.forEach((item) => {
      item.className = '';
    });

    data.className = 'active';

    const btnText = data.textContent.trim();
    productCards.forEach((card) => {
      card.style.display = 'none';
      const filterAttr = card.getAttribute('data-filter');

      if (filterAttr === btnText.toLowerCase() || btnText === 'All Product') {
        console.log(filterAttr);
        card.style.display = 'flex'; // maintain flexible layout
      }
    });
  };
});

// MULTI-IMAGE CARD SLIDER ENGINE
// Controls sliders inside each .produk-card independently
const cardSliders = document.querySelectorAll('.card-slider');

cardSliders.forEach((slider) => {
  const slides = slider.querySelectorAll('.slide');
  const prevBtn = slider.querySelector('.prev-btn');
  const nextBtn = slider.querySelector('.next-btn');
  const dots = slider.querySelectorAll('.dot');
  let currentIndex = 0;
  const slideCount = slides.length;

  if (slideCount <= 1) return; // No slider needed if only 1 image

  function changeSlide(targetIndex) {
    // Clean old active states
    slides[currentIndex].classList.remove('active');
    dots[currentIndex].classList.remove('active');

    // Clamp index
    currentIndex = (targetIndex + slideCount) % slideCount;

    // Apply new active states
    slides[currentIndex].classList.add('active');
    dots[currentIndex].classList.add('active');
  }

  // Prev Button handler
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation(); // Prevents clicking parent HTML elements/anchors nested inside card
      changeSlide(currentIndex - 1);
    });
  }

  // Next Button handler
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      changeSlide(currentIndex + 1);
    });
  }

  // Dots Indicator handler
  dots.forEach((dot, index) => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      changeSlide(index);
    });
  });

  // Touch Swipe Support for mobile sliders
  let touchStartX = 0;
  let touchEndX = 0;

  slider.addEventListener(
    'touchstart',
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true },
  );

  slider.addEventListener(
    'touchend',
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleGesture();
    },
    { passive: true },
  );

  function handleGesture() {
    if (touchStartX - touchEndX > 50) {
      // Swiped Left -> Next Slide
      changeSlide(currentIndex + 1);
    }
    if (touchEndX - touchStartX > 50) {
      // Swiped Right -> Prev Slide
      changeSlide(currentIndex - 1);
    }
  }
});
