import '../base/base';

import './map.sass';

import '../../components/footer/footer';
import '../../components/header/header';
import '../../components/slider-scrollbar/scrollbar.sass';
import '../../components/button/button';
import '../../components/svg-map/svg-map';

import Scrollbar from '../../components/slider-scrollbar/Scrollbar';
// import '../../components/rnssnc-slider/slider.css';
import Slider from '../../components/rnssnc-slider/slider';

import animals from '../../js/animals';

import Control from '../../js/contol';

const sliderWrapper = document.querySelector('.pet-slider__wrapper');
const sliderElement = document.querySelector('.pet-slider');
const sliderTrack = sliderElement.querySelector('.pet-slider__track');
let slides = [];

function renderSlides(slides) {
  slides.map((slide) => {
    const slideWrapper = new Control(sliderTrack, 'div', 'player-pet-switch__pet-card');
    const sliderCard = new Control(slideWrapper.node, 'div', 'pet-card__image');
    const sliderCardTooltip = new Control(slideWrapper.node, 'title', 'pet-card__tooltip');
    // For build
    sliderCard.node.style.backgroundImage = `url('images/${slide.src.slice(
      slide.src.lastIndexOf('/') + 1,
    )}')`;
    // For dev
    // sliderCard.node.style.backgroundImage = `url('${slide.src}')`;
    sliderCardTooltip.node.textContent = slide.name;

    slides.push(slideWrapper.node);
  });
}

function installSlider(initialSlideIndex = 0) {
  return new Slider({
    slider: '.pet-slider',
    track: '.pet-slider__track',
    slidesToShow: 8,
    slidesToScroll: 1,
    variableWidth: true,
    startSlide: initialSlideIndex,
    arrows: true,
    buttonNext: '.pet-slider__button-prev',
    buttonPrev: '.pet-slider__button-next',
    infinite: false,
  });

  slides.map((slide, index) => {
    slide.addEventListener('pointerdown', () => this.slider.goTo(index));
  });
}

renderSlides(animals);
const slider = installSlider(1);

const scrollbar = new Scrollbar(sliderWrapper, slider, '123', '/', 245, true);

slider.slider.addEventListener('activeSlideChange', (e) => {
  scrollbar.range.value = e.detail;
  scrollbar.updateValue();
});
