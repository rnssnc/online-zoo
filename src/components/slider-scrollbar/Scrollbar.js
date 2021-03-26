import './scrollbar.sass';

import Control from '../../js/contol';
import ValueDisplay from './ValueDisplay';

export default class ScrollBar extends Control {
  constructor(parentNode, slider, sliderClass, separator, scrollbarWidth, useAnimation) {
    super(parentNode, 'div', 'slider-scrollbar__container');
    this.slider = slider;
    this.sliderClass = sliderClass;
    this.separator = separator;
    this.scrollbarWidth = scrollbarWidth;
    this.useAnimation = useAnimation;

    this.valueDisplay = new ValueDisplay(this.node);
    this.valueDisplay.setValue(
      this.slider.currentSlide + 1,
      this.separator,
      this.slider.$slides.length,
    );

    // Setup range
    this.rangeWrapper = new Control(this.node, 'div', 'slider-scrollbar__input-wrapper').node;
    this.range = new Control(this.rangeWrapper, 'input', 'slider-scrollbar__input').node;
    this.range.type = 'range';
    this.range.min = '0';
    this.range.max = this.slider.$slides.length - 1;
    this.range.value = this.slider.currentSlide;

    this.setupStyles(this.rangeWrapper, this.scrollbarWidth);
    this.setupListeners();
  }
  setupStyles(rangeWrapper, scrollbarWidth) {
    rangeWrapper.style.width = `${scrollbarWidth}px`;
  }

  setupListeners() {
    $(this.sliderClass).on('beforeChange', (event, slider, currentSlide, nextSlide) => {
      this.valueDisplay.setValue(nextSlide + 1, this.separator, this.slider.$slides.length);
      this.range.value = nextSlide;
    });

    this.range.addEventListener('input', this.handleRangeChange);
    this.range.addEventListener('change', this.handleRangeChange);
  }

  handleRangeChange = () => {
    this.slider.$slides.map((elem) => this.slider.$slides[elem].classList.remove('slick-current')),
      this.slider.$slides[this.range.value].classList.add('slick-current');

    this.valueDisplay.setValue(+this.range.value + 1, this.separator, this.slider.$slides.length);
    this.slider.slickGoTo(this.range.value, this.useAnimation);
    console.log(this.range.value);
  };
}
