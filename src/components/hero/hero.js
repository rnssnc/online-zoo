import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './hero.sass';

import '../socials/socials';
import '../pet-card/pet-card';
import '../input/input';

import Scrollbar from '../slider-scrollbar/Scrollbar';

require('slick-carousel');

const sliderClass = '.hero-section__pets-slider';

$(sliderClass).on('init', (event, slick) => {
  slick.$slides[slick.currentSlide].classList.add('slick-current-delayed');

  const sliderWrapper = document.querySelector('.hero-section__pets-slider-wrapper');

  const scrollbar = new Scrollbar(sliderWrapper, slick, sliderClass, '/', 245, true);
});
$(sliderClass).on('afterChange', (event, slick, currentSlide) => {
  slick.slickGoTo(0);
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
  slidesToShow: 5,
  infinite: false,
  arrows: false,
  adaptiveHeight: true,
  variableWidth: true,
  centerMode: true,
  initialSlide: 1,
});
