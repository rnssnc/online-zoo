import '../review/review';
import './testimonials.sass';

import Scrollbar from '../slider-scrollbar/Scrollbar';

require('slick-carousel');

const sliderClass = '.testimonials-section__testimonials-slider';

$(sliderClass).on('init', (event, slick) => {
  const sliderWrapper = document.querySelector('.testimonials-slider-wrapper');

  const scrollbar = new Scrollbar(sliderWrapper, slick, sliderClass, '/', 245, true);
});

// $(sliderClass).on('edge', (event, slick, direction) => {
//   if (direction === 'left') {
//     slick.$slides.map((elem) => slick.$slides[elem].classList.remove('slick-current'));
//     scrollbar.range.value = +scrollbar.range.value + 1;
//     scrollbar.handleRangeChange();
//   }
// });
const slider = document.querySelector(sliderClass);
$(slider).slick({
  slidesToShow: 2,
  slidesToScroll: 1,
  infinite: false,
  arrows: true,
  prevArrow: '.pets-slider__button-prev',
  nextArrow: '.pets-slider__button-next',
  draggable: true,
});
