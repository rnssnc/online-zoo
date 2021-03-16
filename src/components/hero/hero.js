import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './hero.sass';

import '../socials/socials';
import '../pet-card/pet-card';
import '../input/input';

require('slick-carousel');

$('.hero-section__pets-slider').on('init', (event, slick) => {
  slick.$slides[slick.currentSlide].classList.add('slick-current-delayed');
});
$('.hero-section__pets-slider').on('afterChange', (event, slick, currentSlide) => {
  slick.$slides[currentSlide].classList.add('slick-current-delayed');
});

$('.hero-section__pets-slider').on('beforeChange', (event, slick, currentSlide, nextSlide) => {
  // slick.$slides[nextSlide].classList.add('slick-current-delayed')
  if (currentSlide !== nextSlide) {
    slick.$slides[currentSlide].classList.remove('slick-current-delayed');
    // slick.$slides[nextSlide].classList.add('slick-current-delayed')
  }
});

const slider = document.querySelectorAll('.hero-section__pets-slider');
$(slider).slick({
  slidesToShow: 5,
  infinite: false,
  arrows: false,
  variableWidth: true,
  adaptiveHeight: true,
  centerMode: true,
  initialSlide: 1,
});
