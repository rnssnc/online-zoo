import './explanation.sass';

import '../rnssnc-slider/slider.css';
import Scrollbar from '../slider-scrollbar/Scrollbar';
import Slider from '../rnssnc-slider/slider';

const slider = new Slider({
  slider: '.explanation-section__animal-slider',
  track: '.animal-slider__track',
  slidesToShow: 1,
  slidesToScroll: 1,
  infinite: false,
});

const sliderWrapper = document.querySelector('.explanation-section__animal-slider-wrapper');

const scrollbar = new Scrollbar(sliderWrapper, slider, '123', '/', 245, true);

slider.slider.addEventListener('activeSlideChange', (e) => {
  scrollbar.range.value = e.detail;
  scrollbar.updateValue();
});

// Slick

// require('slick-carousel');

// const sliderClass = '.explanation-section__animal-slider';

// $(sliderClass).on('init', (event, slick) => {
//   const sliderWrapper = document.querySelector('.explanation-section__animal-slider-wrapper');

//   // const scrollbar = new Scrollbar(sliderWrapper, slick, sliderClass, '/', 245, false);
// });

// const slider = document.querySelector(sliderClass);
// $(slider).slick({
//   slidesToShow: 1,
//   infinite: false,
//   arrows: false,
// });
