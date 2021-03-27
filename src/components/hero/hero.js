// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

import './hero.sass';

import '../socials/socials';
import '../pet-card/pet-card';
import '../input/input';

import '../rnssnc-slider/slider.css';
import Scrollbar from '../slider-scrollbar/Scrollbar';
import Slider from '../rnssnc-slider/slider';

const slider = new Slider({
  slider: '.hero-section__pets-slider',
  track: '.pets-slider__track',
  slidesToShow: 5,
  slidesToScroll: 1,
  startSlide: 1,
  centerMode: true,
  variableWidth: true,
  infinite: false,
  // arrows: true,
  // buttonPrev: '.control.prev',
  // buttonNext: '.control.next',
  // responsive: {
  //   1920: {
  //     from: 1201,
  //     slidesToShow: 4,
  //     startSlide: 1,
  //   },
  //   1200: {
  //     from: 801,
  //     slidesToShow: 2,
  //   },
  //   800: {
  //     from: 0,
  //     slidesToShow: 1,
  //     startSlide: 0,
  //   },
  // },
});

const sliderWrapper = document.querySelector('.hero-section__pets-slider-wrapper');

const scrollbar = new Scrollbar(sliderWrapper, slider, '123', '/', 245, true);

slider.slider.addEventListener('beforeChange', () => {
  scrollbar.range.value = slider.currentSlideIndex + 1;
  scrollbar.updateValue();
});

// range.addEventListener('input', () => {
//   console.log('a');
//   slider.goto(range.value);
// });

// Slick

// require('slick-carousel');

// const sliderClass = '.hero-section__pets-slider';

// $(sliderClass).on('afterChange', (event, slick, currentSlide) => {
//   slick.slickGoTo(0);
//   slick.$slides[currentSlide].classList.add('slick-current-delayed');
// });

// $(sliderClass).on('beforeChange', (event, slick, currentSlide, nextSlide) => {
//   // slick.$slides[nextSlide].classList.add('slick-current-delayed')
//   if (currentSlide !== nextSlide) {
//     slick.$slides[currentSlide].classList.remove('slick-current-delayed');
//     // slick.$slides[nextSlide].classList.add('slick-current-delayed')
//   }
// });

// const slider = document.querySelector(sliderClass);
// $(slider).slick({
//   slidesToShow: 5,
//   infinite: false,
//   arrows: false,
//   adaptiveHeight: true,
//   variableWidth: true,
//   centerMode: true,
//   initialSlide: 1,
//   responsive: [
//     {
//       breakpoint: 1200,
//       settings: {
//         slidesToShow: 2,
//         slidesToScroll: 1,
//       },
//     },
//   ],
// });
