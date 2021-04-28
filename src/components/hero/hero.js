// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

import './hero.sass';

import '../socials/socials';
import '../pet-card/pet-card';
import '../input/input';

import '../rnssnc-slider/slider.css';
import '../slider-scrollbar/scrollbar.sass';
import Scrollbar from '../slider-scrollbar/Scrollbar';
import Slider from '../rnssnc-slider/slider';

const slider = new Slider({
  slider: '.hero-section__pets-slider',
  track: '.pets-slider__track',
  slidesToShow: 5,
  slidesToScroll: 1,
  fixedSlideWidth: 186,
  // dragDrop: false,
  startSlide: 1,
  centerMode: true,
  variableWidth: true,
  infinite: false,
  // arrows: true,
  // buttonPrev: '.control.prev',
  // buttonNext: '.control.next',
  responsive: {
    1920: {
      from: 1201,
      fixedSlideWidth: 186,
    },
    1200: {
      from: 801,
      fixedSlideWidth: 210,
    },
    550: {
      from: 0,
      fixedSlideWidth: 123,
    },
  },
});

const sliderWrapper = document.querySelector('.hero-section__pets-slider-wrapper');
const sliderContainer = document.querySelector('.hero-section__pets-slider-container');
const sliderTrack = document.querySelector('.pets-slider__track');
const scrollbar = new Scrollbar(sliderWrapper, slider, '123', '/', 245, true);
const firstActiveSlide = document.querySelector('.pets-slider__track .rnssnc-slide.slide-active');

slider.slider.addEventListener('activeSlideChange', (e) => {
  scrollbar.range.value = e.detail;
  scrollbar.updateValue();
});

const checkMarksWrapper = document.createElement('div');
checkMarksWrapper.classList.add('.pets-slider__checkmarks');
sliderContainer.append(checkMarksWrapper);
const checkmarks = [];

function placeIndicators() {
  [...slider.slides].map((element, index) => {
    if (index < slider.slidesToShow) {
      let checkmark;
      if (checkmarks.length <= slider.slidesToShow) {
        checkmark = document.createElement('div');
        checkmark.classList.add('pets-slider__checkmark');
        checkMarksWrapper.append(checkmark);
      } else checkmark = checkmarks[index];

      checkmark.style.left = `${
        element.getBoundingClientRect().left -
        sliderContainer.getBoundingClientRect().left +
        element.clientWidth / 2
      }px`;

      // checkmark.style.top = `${
      //   element.getBoundingClientRect().top -
      //   sliderContainer.getBoundingClientRect().top +
      //   element.clientHeight / 2
      // }px`;

      checkmarks.push(checkmark);
    }

    element.addEventListener('pointerdown', () => {
      if (slider.currentSlideIndex !== index) {
        slider.goTo(index);
      }
    });
  });
}

function setupSliderModifiers(e) {
  if (e.propertyName == 'width') {
    placeIndicators();

    firstActiveSlide.removeEventListener('transitionend', setupSliderModifiers);
  }
}

firstActiveSlide.addEventListener('transitionend', setupSliderModifiers);

// window.addEventListener('resize', placeIndicators);
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
