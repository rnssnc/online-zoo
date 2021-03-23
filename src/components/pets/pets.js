import './pets.sass';

import Scrollbar from '../slider-scrollbar/Scrollbar';

require('slick-carousel');

const sliderClass = '.pets-section__pets-slider';
let scrollbar;

$(sliderClass).on('init', (event, slick) => {
  const sliderWrapper = document.querySelector('.pets-section__pets-slider-wrapper');

  scrollbar = new Scrollbar(sliderWrapper, slick, sliderClass, '/', 245, true);
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
  slidesToShow: 4,
  slidesToScroll: 1,
  infinite: false,
  arrows: false,
  // prevArrow: '.pets-slider__button-prev',
  // nextArrow: '.pets-slider__button-next',
  variableWidth: true,
  draggable: true,
});
