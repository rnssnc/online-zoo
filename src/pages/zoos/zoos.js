import '../base/base';

import './zoos.sass';

import '../../components/footer/footer';
import '../../components/header/header';

import animals from '../../js/animals';

import Control from '../../js/contol';
import Heading from '../../js/components/Heading/Heading';
import VideoPlayer from '../../js/components/VideoPlayer/VideoPlayer';
import Aside from '../../js/components/Aside/Aside';

const main = document.querySelector('.main');
const pageWrapper = new Control(main, 'div', 'section-wrapper animals-player-section__wrapper').node;

class MainContent extends Control {
  constructor(animals) {
    super(pageWrapper, 'section', 'animals-player-section section');

    this.aside = new Aside(this.node, 'animals-player-section__aside-slider');
    this.renderSlider(animals);

    this.contentWrapper = new Control(this.node, 'div', 'section__content-wrapper');

    this.pageheading = new Heading(
      this.contentWrapper.node,
      'h1',
      'animals-player-section__header typography__section-title',
    );

    this.contentWrapper.playerAndDescWrapper = new Control(
      this.contentWrapper.node,
      'div',
      'animals-player-section__player-and-descrtion-wrapper',
    );

    this.contentWrapper.videoPlayer = new VideoPlayer(
      this.contentWrapper.playerAndDescWrapper.node,
      'animals-player-section__video',
    );

    this.contentWrapper.animalDescriptionWrapper = new Control(
      this.contentWrapper.playerAndDescWrapper.node,
      'div',
      'animal-descriptions-wrapper',
    );

    this.contentWrapper.animalDescription = new Control(
      this.contentWrapper.animalDescriptionWrapper.node,
      'div',
      'animal-descriptions',
    );

    this.contentWrapper.animalDescription.descriptions = [];

    this.contentWrapper.feedButton = new Control(
      this.contentWrapper.animalDescriptionWrapper.node,
      'a',
      'button button-filled animal-description__feed-button',
      'feed',
    );

    this.contentWrapper.feedButton.node.href = '#';
  }

  createAnimalDescription(name) {
    this.contentWrapper.animalDescription[name] = new Control(
      this.contentWrapper.animalDescription.node,
      'div',
      'animal-description__wrapper',
    );

    this.contentWrapper.animalDescription[name].header = new Heading(
      this.contentWrapper.animalDescription[name].node,
      'h3',
      'typography__cta animal-description__header',
      name,
    );

    this.contentWrapper.animalDescription[name].content = new Control(
      this.contentWrapper.animalDescription[name].node,
      'p',
      'animal-description__content',
    );

    this.contentWrapper.animalDescription.descriptions.push(name);
  }

  renderContent(animal) {
    this.pageheading.setContent(`${animal.title} Cam`);

    if (animal.videos) this.contentWrapper.videoPlayer.loadVideos(animal.videos);

    if (animal.descriptions) {
      animal.descriptions.map((name) => {
        name = name.toLowerCase();

        if (!this.contentWrapper.animalDescription.descriptions.includes(name)) {
          this.createAnimalDescription(name);
        }

        this.contentWrapper.animalDescription[name].content.node.textContent = animal[name];
      });
    }
  }

  renderSlider(animals) {
    this.aside.renderSlides(animals);

    this.aside.installSlider();

    this.aside.slider.slider.addEventListener('activeSlideChange', (e) => {
      window.location.hash = animals[e.detail].id;
    });
  }
}

const mainContent = new MainContent(animals);

function findAndRender() {
  let index;
  const animal = animals.find((animal, i) => {
    if (animal.id.toLowerCase() == document.location.hash.slice(1).toLowerCase()) {
      index = i;
      return true;
    }
  });

  mainContent.renderContent(animal);
  if (mainContent.aside.slider.currentSlideIndex !== index) mainContent.aside.slider.goTo(index);
}

window.addEventListener('hashchange', () => {
  findAndRender();
});

if (!window.location.hash) mainContent.renderContent(animals[3]);
else {
  findAndRender();
}
