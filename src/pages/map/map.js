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
const markers = document.querySelector('.map__markers-wrapper').querySelectorAll('.map__marker');
const watchOnlineButton = document.querySelector('.map-section__watch-online-button');

let slidesArr = [];

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

    slidesArr.push(slideWrapper.node);
  });
}

function setActiveMarker(index) {
  [...markers].map((marker, mIndex) => {
    mIndex == index ? marker.classList.add('marker-active') : marker.classList.remove('marker-active');
  });
}

const buttonNext = document.querySelector('.pet-slider__button-prev');
const buttonPrev = document.querySelector('.pet-slider__button-next');

function installSlider(initialSlideIndex = 0) {
  const slider = new Slider({
    slider: '.pet-slider',
    track: '.pet-slider__track',
    slidesToShow: 8,
    slidesToScroll: 1,
    variableWidth: true,
    startSlide: initialSlideIndex,
    loop: true,
    arrows: true,
    buttonNext,
    buttonPrev,
    infinite: false,
    dragDrop: false,
    responsive: {
      1920: {
        from: 1501,
        slidesToShow: 8,
        slidesToScroll: 1,
        startSlide: initialSlideIndex,
        arrows: true,
        buttonPrev,
        buttonNext,
      },
      1500: {
        from: 801,
        slidesToShow: 4,
        slidesToScroll: 1,
        startSlide: initialSlideIndex,
        arrows: false,
      },
      800: {
        from: 501,
        slidesToShow: 3,
        slidesToScroll: 1,
        startSlide: initialSlideIndex,
        arrows: false,
      },
      500: {
        from: 0,
        slidesToShow: 2,
        slidesToScroll: 1,
        startSlide: initialSlideIndex,
        arrows: false,
      },
    },
  });

  setActiveMarker(initialSlideIndex);

  [...markers].map((marker, mIndex) => {
    marker.addEventListener('pointerdown', () => {
      if (slider.currentSlideIndex !== mIndex) {
        slider.goTo(mIndex);
      }
    });
  });

  slidesArr.map((slide, index) => {
    slide.addEventListener('pointerdown', () => slider.goTo(index));
  });

  return slider;
}

renderSlides(animals);
const slider = installSlider(1);

const scrollbar = new Scrollbar(sliderWrapper, slider, '123', '/', 245, true);

slider.slider.addEventListener('activeSlideChange', (e) => {
  setActiveMarker(e.detail);
  scrollbar.range.value = e.detail;
  scrollbar.updateValue();

  watchOnlineButton.href = `./zoos.html#${animals[e.detail].id}`;
});
