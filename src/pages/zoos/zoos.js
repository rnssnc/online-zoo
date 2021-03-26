import 'normalize.css';
import '../base/base';

import './zoos.sass';

import '../../components/footer/footer';
import '../../components/header/header';

import Control from '../../js/contol';
import Heading from '../../js/components/Heading/Heading';
// class VideoPlayer {}

const main = document.querySelector('.main');
const pageWrapper = new Control(main, 'div', 'section-wrapper animals-player-section__wrapper')
  .node;

class MainContent extends Control {
  constructor() {
    super(pageWrapper, 'section', 'section.animals-player-section.section');

    this.contentWrapper = new Control(this.node, 'div', 'section__content-wrapper');

    this.heading = new Heading(
      this.contentWrapper.node,
      'h1',
      'animals-player-section__header typography__section-title',
    );

    const aside = new Control(this.node, 'aside', 'animals-player-section__aside-slider');
  }
}

const mainContent = new MainContent();
