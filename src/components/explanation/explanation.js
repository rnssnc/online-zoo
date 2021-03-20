import './explanation.sass';

import Scrollbar from '../slider-scrollbar/Scrollbar';

require('slick-carousel');

const sliderClass = '.explanation-section__animal-slider';

$(sliderClass).on('init', (event, slick) => {
  slick.$slides[slick.currentSlide].classList.add('slick-current-delayed');

  const sliderWrapper = document.querySelector('.explanation-section__animal-slider-wrapper');

  const scrollbar = new Scrollbar(sliderWrapper, slick, sliderClass, '/', 245, true);
});
$(sliderClass).on('afterChange', (event, slick, currentSlide) => {
  slick.$slides[currentSlide].classList.add('slick-current-delayed');
});

$(sliderClass).on('beforeChange', (event, slick, currentSlide, nextSlide) => {
  // slick.$slides[nextSlide].classList.add('slick-current-delayed')
  if (currentSlide !== nextSlide) {
    slick.$slides[currentSlide].classList.remove('slick-current-delayed');
    // slick.$slides[nextSlide].classList.add('slick-current-delayed')
  }
});

const slider = document.querySelector(sliderClass);
$(slider).slick({
  slidesToShow: 1,
  infinite: false,
  arrows: false,
});
