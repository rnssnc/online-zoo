export default class Slider {
  constructor(options = {}) {
    this.slider = document.querySelector(options.slider);
    this.track = document.querySelector(options.track);
    this.centerMode = options.centerMode;
    this.arrows = options.arrows;
    this.slidesToShow = options.slidesToShow;
    this.slidesToScroll = options.slidesToScroll;
    this.infinite = options.infinite;
    this.variableWidth = options.variableWidth || false;
    this.rebuild = options.rebuild === false ? false : true;
    this.enableDragDrop = options.dragDrop === false ? false : true;
    this.slides = this.track.children;
    this.transitionTime = 0.3;
    this.loop = options.loop === true ? true : false;
    this.saveSlideIndex = options.saveSlideIndex === true ? true : false;
    this.fixedSlideWidth = options.fixedSlideWidth;

    this.type = 'horizontal';
    if (options.type == 'vertical') {
      this.type = 'vertical';
    }

    if (this.type == 'horizontal') {
      this.translateFunction = 'translateX';
      this.metric = 'width';
      this.vector = 'clientX';
    } else {
      this.translateFunction = 'translateY';
      this.metric = 'height';
      this.vector = 'clientY';
    }

    this.startSlide = options.startSlide || 0;
    this.setupStyles();

    if (options.responsive) {
      this.responsive = options.responsive;
      this.handleResposive(this.responsive);
    }

    this.handleInfinite();

    if (this.arrows) {
      this.buttonNext = options.buttonNext;
      this.buttonPrev = options.buttonPrev;

      this.buttonNext.addEventListener('click', this.nextSlide);
      this.buttonPrev.addEventListener('click', this.prevSlide);
    }

    this.setupSlider();

    // this.shiftX = 0;
    // this.newLeft = 0;
    if (this.enableDragDrop) {
      this.posX1 = 0;
      this.posX2 = 0;
      this.track.addEventListener('pointerdown', (e) => {
        if (this.track.style.transition == '' || !this.unlockTransitionEnd) {
          e.preventDefault(); // prevent selection start (browser action)

          // this.shiftX = e.clientX - this.track.getBoundingClientRect().left;
          this.shiftX = 0;
          this.posX1 = e[this.vector];

          this.track.addEventListener('pointermove', this.handlePointerMove);
          document.addEventListener('pointerup', this.handlePointerUp);
        }
      });
    }
    if (this.rebuild)
      window.addEventListener('resize', () => {
        if (this.saveSlideIndex) this.startSlide = this.currentSlideIndex;
        this.setupSlider();
      });
  }

  setupSlider = () => {
    this.sliderWidth = this.slider.getBoundingClientRect()[this.metric];
    this.slideWidth = this.sliderWidth / this.slidesToShow;

    this.unlockTransitionEnd = false;

    this.currentSlideIndex = this.startSlide;

    this.handleInfinite();

    if (this.arrows) this.handleSliderEdge(this.startSlide);

    if (this.currentSlide) this.removeActiveState(this.currentSlide);

    this.defaultTranslate = 0;
    this.transformValue = 0;
    this.widthWithoutClones = this.defaultLength * this.slideWidth;

    if (this.centerMode) {
      this.rightVisibleSlideIndex = this.startSlide + 1;
      this.edgeLimit = this.startSlide;
    } else {
      this.rightVisibleSlideIndex = this.slidesToShow;
      this.edgeLimit = this.slidesToShow;
    }

    this.isClonesAdded = false;
    this.defaultLength = this.slides.length;

    this.track.style.transform = `${this.translateFunction}(${this.defaultTranslate}px)`;
    this.currentSlide = this.slides[this.currentSlideIndex];

    this.addActiveState(this.currentSlideIndex);

    this.setTrackWidth(this.track);
    this.track.addEventListener('transitionend', this.handleTransitionEnd);

    // createTrack();
    if (!this.variableWidth) this.fitSlides(this.slides);
  };

  handleResposive = (responsiveOptions) => {
    for (const key in responsiveOptions) {
      const mediaQuery = window.matchMedia(
        `screen and (max-width: ${key}px) and (min-width: ${this.responsive[key]['from']}px)`,
      );
      const handleTabletChange = (e) => {
        // Check if the media query is true
        if (e.matches) {
          const obj = this.responsive[key];
          for (const key in obj) this[key] = obj[key];

          this.setupSlider();
        }
      };

      // Register event listener
      mediaQuery.addEventListener('change', handleTabletChange);

      // Initial check
      handleTabletChange(mediaQuery);
    }
  };

  setupStyles = () => {
    this.wrapSlides(this.slides);

    // this.styles = document.createElement('link');
    // this.styles.rel = 'stylesheet';
    // this.styles.href = 'slider.css';
    // document.head.append(this.styles);

    // this.styles.addEventListener('load', () => {
    // });

    this.slider.classList.add('rnssnc-slider');
    if (this.type == 'vertical') this.slider.classList.add('slider-vertical');

    this.track.classList.add('rnssnc-slides');
  };

  wrapSlides = (slides) => {
    [...slides].forEach((slide) => {
      const div = document.createElement('div');
      div.classList.add('rnssnc-slide');
      div.appendChild(slide);
      this.track.appendChild(div);
    });
  };

  addActiveState(slideIndex) {
    let activeSlideChange = new CustomEvent('activeSlideChange', { detail: slideIndex });

    if (this.infinite)
      activeSlideChange = new CustomEvent('activeSlideChange', { detail: slideIndex % this.defaultLength });

    this.slider.dispatchEvent(activeSlideChange);

    this.slides[slideIndex].classList.add('slide-active');
  }

  removeActiveState(currentSlide) {
    currentSlide.classList.remove('slide-active');
  }

  handleInfinite = () => {
    if (this.infinite) {
      this.addClones(this.slidesToShow);
      this.transformValue = this.defaultTranslate;
      this.currentSlideIndex = +this.currentSlideIndex + this.slidesToShow;

      this.nextSlide = (e) => {
        if (this.rightVisibleSlideIndex < this.slides.length - this.slidesToShow)
          this.shiftSlide(this.slidesToScroll) || e.preventDefault();
      };

      this.prevSlide = (e) => {
        if (this.rightVisibleSlideIndex >= this.slidesToScroll)
          this.shiftSlide(-this.slidesToScroll) || e.preventDefault();
      };
    } else {
      this.nextSlide = (e) => {
        if (this.currentSlideIndex < this.slides.length - 1)
          this.goTo(+this.currentSlideIndex + +this.slidesToScroll) || e.preventDefault();
        else if (this.loop && this.currentSlideIndex == this.slides.length - 1) this.goTo(0);
      };

      this.prevSlide = (e) => {
        if (this.currentSlideIndex > 0)
          this.goTo(+this.currentSlideIndex - +this.slidesToScroll) || e.preventDefault();
        else if (this.loop && this.currentSlideIndex == 0) this.goTo(this.slides.length - 1);
      };
    }
  };

  handlePointerUp = (e) => {
    this.track.removeEventListener('pointermove', this.handlePointerMove);
    if (this.infinite) {
      if (this.track.style.transition != null)
        if (this.transformValue + this.posX2 < this.transformValue) this.nextSlide(e);
        else if (this.transformValue + this.posX2 > this.transformValue) this.prevSlide(e);
    } else {
      if (this.transformValue + this.posX2 < this.transformValue) this.nextSlide(e);
      else if (this.transformValue + this.posX2 > this.transformValue) this.prevSlide(e);
    }
    this.posX1 = 0;
    this.posX2 = 0;

    document.removeEventListener('pointerup', this.handlePointerUp);
  };

  handlePointerMove = (e) => {
    this.posX2 = e[this.vector] - this.posX1;

    if (
      (this.rightVisibleSlideIndex <= this.slidesToShow &&
        this.posX2 - this.slideWidth * this.slidesToScroll >= 0) ||
      (this.rightVisibleSlideIndex == this.defaultLength &&
        -this.posX2 >= this.slideWidth * this.slidesToShow)
    )
      return;
    if (!this.infinite)
      if (
        this.rightVisibleSlideIndex === this.slides.length &&
        this.transformValue + this.posX2 <= this.transformValue
      )
        return;
      else if (
        this.rightVisibleSlideIndex == this.slidesToShow &&
        this.transformValue + this.posX2 > this.transformValue
      )
        return;
    this.track.style.transform = `${this.translateFunction}(${this.transformValue + this.posX2}px)`;
  };

  addClones(slidesToShow) {
    let appendNode = [];
    let prependNode = [];

    for (let i = 0; i < slidesToShow; i++) {
      let appendClone = this.slides[i].cloneNode(true);
      let prependClone = this.slides[this.slides.length - (i + 1)].cloneNode(true);
      appendClone.classList.add('clone');
      prependClone.classList.add('clone');

      appendNode.push(appendClone);
      prependNode.push(prependClone);
      this.defaultTranslate -= this.slideWidth;
    }
    if (!this.isClonesAdded) {
      this.track.append(...appendNode);
      this.track.prepend(...prependNode.reverse());

      this.isClonesAdded = true;
    }
    this.track.style.transform = `${this.translateFunction}(${this.defaultTranslate}px)`;
  }

  setTrackWidth(track) {
    track.style[this.metric] = `${this.slideWidth * this.slides.length}px`;
  }

  fitSlides(slides) {
    [...slides].forEach((slide) => {
      slide.style[this.metric] = `${this.slideWidth}px`;
    });
  }

  handleTransitionEnd = (e) => {
    if (e.propertyName == 'transform') {
      this.track.style.transition = null;
      if (this.infinite && this.rightVisibleSlideIndex == this.slides.length - this.slidesToShow) {
        this.transformValue = this.defaultTranslate;
        this.track.style.transform = `${this.translateFunction}(${this.defaultTranslate}px)`;
        this.rightVisibleSlideIndex = this.slidesToShow;

        this.currentSlideIndex = +this.startSlide + +this.slidesToShow;
      } else if (this.infinite && this.rightVisibleSlideIndex == 0) {
        this.transformValue = -this.widthWithoutClones;
        this.track.style.transform = `${this.translateFunction}(${-this.widthWithoutClones}px)`;
        this.rightVisibleSlideIndex = this.defaultLength;

        this.currentSlideIndex = this.slides.length - this.slidesToShow - 2;
      }
      if (
        this.unlockTransitionEnd ||
        this.centerMode ||
        this.currentSlideIndex <= this.slides.length - this.slidesToShow
      ) {
        this.currentSlide = this.slides[this.currentSlideIndex];
        this.addActiveState(this.currentSlideIndex);

        this.unlockTransitionEnd = false;
      }
    }
  };

  handleSliderEdge(slideIndex) {
    if (!this.loop) {
      if (slideIndex == 0) this.buttonPrev.classList.add('button-disabled');
      else this.buttonPrev.classList.remove('button-disabled');
      if (slideIndex == this.slides.length - 1) this.buttonNext.classList.add('button-disabled');
      else this.buttonNext.classList.remove('button-disabled');
    }
  }

  goTo(slideIndex) {
    if (slideIndex !== this.currentSlideIndex) {
      if (this.arrows) this.handleSliderEdge(slideIndex);

      this.removeActiveState(this.currentSlide);

      const countToSlide = slideIndex - this.currentSlideIndex;

      if (!this.centerMode && slideIndex < this.slidesToShow && countToSlide > 0) {
        this.shiftSlide(0);
      } else if (
        !this.centerMode &&
        slideIndex >= this.defaultLength - this.slidesToShow &&
        countToSlide > 0
      ) {
        if (countToSlide == 1) this.shiftSlide(1);
        else this.shiftSlide(this.defaultLength - this.rightVisibleSlideIndex);
      } else if (!this.centerMode && slideIndex < this.slidesToShow && countToSlide < 0) {
        if (countToSlide == -1 && this.rightVisibleSlideIndex > this.slidesToShow) this.shiftSlide(-1);
        else this.shiftSlide(-this.rightVisibleSlideIndex + this.slidesToShow);
      } else {
        this.unlockTransitionEnd = true;
        this.shiftSlide(countToSlide);
      }
      this.currentSlideIndex = slideIndex;
      this.currentSlide = this.slides[this.currentSlideIndex];
      this.addActiveState(slideIndex);
    }
  }

  shiftSlide(count) {
    if (this.fixedSlideWidth) {
      this.slideWidth = this.fixedSlideWidth;
    } else if (this.variableWidth) {
      // this.slideWidth = this.slideWidths[+this.currentSlideIndex + +count];
      this.slideWidth = this.slides[+this.currentSlideIndex + +count].getBoundingClientRect()[this.metric];
    }
    this.transformValue += -count * this.slideWidth;
    this.track.style.transition = `transform ${this.transitionTime}s`;
    this.track.style.transform = `${this.translateFunction}(${this.transformValue}px)`;
    this.rightVisibleSlideIndex += count;
  }
}
