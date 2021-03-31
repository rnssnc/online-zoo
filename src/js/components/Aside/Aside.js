import '../../../components/rnssnc-slider/slider.css';

import Control from '../../contol';
import Slider from '../../../components/rnssnc-slider/slider';

export default class Aside extends Control {
  constructor(parentNode, className) {
    super(parentNode, 'aside', className);

    this.sliderWrapper = new Control(this.node, 'div', 'player-pet-switch-slider__wrapper');

    this.sliderButtonPrev = new Control(
      this.sliderWrapper.node,
      'button',
      'player-pet-switch-slider__buttonPrev',
    );

    this.sliderElement = new Control(this.sliderWrapper.node, 'div', 'player-pet-switch-slider');
    this.sliderTrack = new Control(this.sliderElement.node, 'div', 'player-pet-switch-slider__track');
    this.slides = [];

    this.sliderButtonNext = new Control(
      this.sliderWrapper.node,
      'button',
      'player-pet-switch-slider__buttonNext',
    );
  }

  renderSlides(slides) {
    slides.map((slide) => {
      const slideWrapper = new Control(this.sliderTrack.node, 'div', 'player-pet-switch__pet-card-wrapper');
      const sliderCard = new Control(slideWrapper.node, 'div', 'player-pet-switch__pet-card');
      const sliderCardTooltip = new Control(sliderCard.node, 'span', 'pet-card__tooltip');

      sliderCard.node.style.backgroundImage = `url('${slide.src}')`;
      sliderCardTooltip.node.textContent = slide.name;

      this.slides.push(sliderCard.node);
    });
  }

  installSlider(initialSlideIndex = 0) {
    this.slider = new Slider({
      slider: '.player-pet-switch-slider',
      track: '.player-pet-switch-slider__track',
      slidesToShow: 4,
      slidesToScroll: 1,
      type: 'vertical',
      variableWidth: true,
      startSlide: initialSlideIndex,
      // arrows: true,
      // buttonPrev: '.pets-slider__button-prev',
      // buttonNext: '.pets-slider__button-next',
      infinite: false,
    });
  }
}
