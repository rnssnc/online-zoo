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
      'player-pet-switch-slider__button-prev',
    );

    this.sliderElement = new Control(this.sliderWrapper.node, 'div', 'player-pet-switch-slider');
    this.sliderTrack = new Control(this.sliderElement.node, 'div', 'player-pet-switch-slider__track');
    this.slides = [];

    this.sliderButtonNext = new Control(
      this.sliderWrapper.node,
      'button',
      'player-pet-switch-slider__button-next',
    );
  }

  renderSlides(slides) {
    slides.map((slide) => {
      const slideWrapper = new Control(this.sliderTrack.node, 'div', 'player-pet-switch__pet-card');
      const sliderCard = new Control(slideWrapper.node, 'div', 'pet-card__image');
      const sliderCardTooltip = new Control(slideWrapper.node, 'span', 'pet-card__tooltip');
      // For build
      sliderCard.node.style.backgroundImage = `url('images/${slide.src.slice(
        slide.src.lastIndexOf('/') + 1,
      )}')`;
      // For dev
      // sliderCard.node.style.backgroundImage = `url('${slide.src}')`;
      sliderCardTooltip.node.textContent = slide.name;

      this.slides.push(slideWrapper.node);
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
      arrows: true,
      buttonNext: '.player-pet-switch-slider__button-next',
      buttonPrev: '.player-pet-switch-slider__button-prev',
      infinite: false,
    });

    this.slides.map((slide, index) => {
      slide.addEventListener('pointerdown', () => this.slider.goTo(index));
    });
  }
}
