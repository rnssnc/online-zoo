import '../review/review';
import './testimonials.sass';

import '../rnssnc-slider/slider.css';
import '../slider-scrollbar/scrollbar.sass';
import Scrollbar from '../slider-scrollbar/Scrollbar';
import Slider from '../rnssnc-slider/slider';

const buttonPrev = document.querySelector('.testimonials-slider__button-prev');
const buttonNext = document.querySelector('.testimonials-slider__button-next');

const slider = new Slider({
  slider: '.testimonials-section__testimonials-slider',
  track: '.testimonials-section__testimonials-slider-track',
  slidesToShow: 2,
  slidesToScroll: 1,
  startSlide: 1,
  arrows: true,
  buttonPrev,
  buttonNext,
  infinite: false,
  responsive: {
    1920: {
      from: 641,
      slidesToShow: 2,
      startSlide: 1,
      arrows: true,
      buttonPrev,
      buttonNext,
    },
    // 1200: {
    //   from: 801,
    //   slidesToShow: 2,
    // },
    640: {
      from: 0,
      slidesToShow: 1,
      startSlide: 0,
      arrows: false,
    },
  },
});

const sliderWrapper = document.querySelector('.testimonials-section__testimonials-slider-wrapper');

const scrollbar = new Scrollbar(sliderWrapper, slider, '123', '/', 245, true);

slider.slider.addEventListener('activeSlideChange', (e) => {
  scrollbar.range.value = e.detail;
  scrollbar.updateValue();
});

// Slick
// import Scrollbar from '../slider-scrollbar/Scrollbar';

// require('slick-carousel');

// const sliderClass = '.testimonials-section__testimonials-slider';

// $(sliderClass).on('init', (event, slick) => {
// const sliderWrr = document.querySelector('.testimonials-section__testimonials-slider-wrapper');

//   // const scrollbar = new Scrollbar(sliderWrapper, slick, sliderClass, '/', 245, true);
// });

// $(sliderClass).on('edge', (event, slick, direction) => {
//   if (direction === 'left') {
//     slick.$slides.map((elem) => slick.$slides[elem].classList.remove('slick-current'));
//     scrollbar.range.value = +scrollbar.range.value + 1;
//     scrollbar.handleRangeChange();
//   }
// });
// const slider = document.querySelector(sliderClass);
// $(slider).slick({
//   slidesToShow: 2,
//   slidesToScroll: 1,
//   infinite: false,
//   arrows: true,
//   prevArrow: '.pets-slider__button-prev',
//   nextArrow: '.pets-slider__button-next',
//   draggable: true,
// });

function test() {
  const obj = [];
}
