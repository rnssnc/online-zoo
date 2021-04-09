import './svg-map.sass';

import Control from '../../js/contol';

import animals from '../../js/animals';

const mapElem = document.querySelector('.map__element');
const mapWrapper = document.querySelector('.map-wrapper');
const markerWrapper = document.createElement('div');
markerWrapper.className = 'map__markers-wrapper';
mapWrapper.append(markerWrapper);

class Marker extends Control {
  constructor(map, mapWapper, animal) {
    super(markerWrapper, 'a', `map__marker marker-${animal.id}`);
    this.node.title = animal.name;
    this.node.style.left = `${animal.pinX}%`;
    this.node.style.top = `${animal.pinY}%`;

    this.map = map;
    this.mapWapper = mapWapper;
    this.animal = animal;

    this.title = animal.title;
    this.region = animal.region;
    this.population = animal.population;
    this.src = animal.src;
    this.country = animal.country;
    this.id = animal.id;

    this.markerImage = new Control(this.node, 'div', 'marker__image');
    this.markerImage.node.style.backgroundImage = `url('images/${this.animal.src.slice(
      this.animal.src.lastIndexOf('/') + 1,
    )}')`;

    this.animalInfoWrapper = new Control(
      markerWrapper,
      'div',
      `marker__animal-info marker-info-${animal.id}`,
    );
    this.animalInfoWrapper.node.style.left = `calc(${animal.pinX}%)`;
    this.animalInfoWrapper.node.style.top = `calc(${animal.pinY}%)`;

    this.animalInfoImage = new Control(this.animalInfoWrapper.node, 'div', 'animal-info__image');
    this.animalInfoImage.node.style.backgroundImage = `url('images/${this.animal.src.slice(
      this.animal.src.lastIndexOf('/') + 1,
    )}')`;

    this.animalInfoContentWrapper = new Control(
      this.animalInfoWrapper.node,
      'div',
      'animal-info__content-wrapper',
    );

    this.animalInfoContentName = new Control(
      this.animalInfoContentWrapper.node,
      'p',
      'animal-info__name',
      `${this.title}`,
    );

    this.animalInfoContentRegion = new Control(
      this.animalInfoContentWrapper.node,
      'p',
      'animal-info__region',
      `<span class="accented">Region:</span>${this.region}`,
    );

    this.animalInfoContentPopulation = new Control(
      this.animalInfoContentWrapper.node,
      'p',
      'animal-info__population',
      `<span class="accented">Population:</span>${this.region}`,
    );

    this.animalInfoWatchButton = new Control(
      this.animalInfoContentWrapper.node,
      'a',
      'button button-ghost animal-info__watch-button',
      '<span class="button__icon play-icon"></span>Watch online',
    );
    this.animalInfoWatchButton.node.href = `./zoos.html#${this.id}`;

    this.fillCountry();
  }

  fillCountry() {
    this.map.querySelectorAll(`.${this.animal.country}`).forEach((element) => {
      if (element.classList.contains(this.animal.country)) element.classList.add('map-area__active');
    });
  }
}

animals.map((animal) => new Marker(mapElem, mapWrapper, animal));
