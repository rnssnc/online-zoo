import './pets.sass';

import '../rnssnc-slider/slider.css';
import '../slider-scrollbar/scrollbar.sass';
import Scrollbar from '../slider-scrollbar/Scrollbar';
import Slider from '../rnssnc-slider/slider';

const buttonPrev = document.querySelector('.pets-slider__button-prev');
const buttonNext = document.querySelector('.pets-slider__button-next');

const slider = new Slider({
  slider: '.pets-section__pets-slider',
  track: '.pets-section__pets-slider-track',
  slidesToShow: 4,
  slidesToScroll: 1,
  loop: true,
  arrows: true,
  buttonPrev,
  buttonNext,
  infinite: false,
  responsive: {
    1920: {
      from: 901,
      slidesToShow: 4,
      startSlide: 0,
      arrows: true,
      buttonPrev,
      buttonNext,
      variableWidth: false,
      centerMode: false,
    },
    900: {
      from: 0,
      slidesToShow: 3,
      startSlide: 0,
      arrows: false,
      variableWidth: true,
      centerMode: true,
    },
  },
});

const sliderWrapper = document.querySelector('.pets-section__pets-slider-wrapper');

const scrollbar = new Scrollbar(sliderWrapper, slider, '123', '/', 245, true);

slider.slider.addEventListener('activeSlideChange', (e) => {
  scrollbar.range.value = e.detail;
  scrollbar.updateValue();
});

// Slick

// import Scrollbar from '../slider-scrollbar/Scrollbar';

// require('slick-carousel');

// const sliderClass = '.pets-section__pets-slider';
// let scrollbar;

// // $(sliderClass).on('init', (event, slick) => {
// //   const sliderWrapper = document.querySelector('.pets-section__pets-slider-wrapper');

// //   // scrollbar = new Scrollbar(sliderWrapper, slick, sliderClass, '/', 245, true);
// // });

// // $(sliderClass).on('edge', (event, slick, direction) => {
// //   if (direction === 'left') {
// //     slick.$slides.map((elem) => slick.$slides[elem].classList.remove('slick-current'));
// //     scrollbar.range.value = +scrollbar.range.value + 1;
// //     scrollbar.handleRangeChange();
// //   }
// // });
// const slider = document.querySelector(sliderClass);
// $(slider).slick({
//   slidesToShow: 4,
//   slidesToScroll: 1,
//   infinite: false,
//   arrows: false,
//   // prevArrow: '.pets-slider__button-prev',
//   // nextArrow: '.pets-slider__button-next',
//   variableWidth: true,
//   draggable: true,
// });
