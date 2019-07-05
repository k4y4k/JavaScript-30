function debounce(func, wait = 20, immediate = true) {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

const sliderImages = document.querySelectorAll('.slide-in');

function checkSlide() {
  sliderImages.forEach((sliderImage) => {
    // 1. Figure out where the bottom of the viewport is
    // 2. Figure out where the middle of the image is (to decide visibility)
    const slideInAt =
      window.scrollY +
      window.innerHeight /* 1 */ -
      sliderImage.height / 2; /* 2 */

    // Figure out where the bottom of the image is
    const imageBottom = sliderImage.offsetTop + sliderImage.height;

    // Do we need to slide it in?
    const isHalfShown = slideInAt > sliderImage.offsetTop;

    // Have we scrolled past? if yes, we need to slide the image back out
    const isNotScrolledPast = window.scrollY < imageBottom;

    if (isHalfShown && isNotScrolledPast) {
      sliderImage.classList.add('active');
    } else {
      sliderImage.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', debounce(checkSlide));
