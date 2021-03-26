import './map.sass';

import Control from '../../js/contol';

import animals from '../../js/animals';

const map = document.querySelector('.map__element');
const mapWrapper = document.querySelector('.map-wrapper');

class Marker extends Control {
  constructor(map, mapWapper, animal, marker = {}) {
    super(mapWrapper, 'a', `map__marker marker-${animal.name}`);

    this.map = map;
    this.mapWapper = mapWapper;
    this.animal = animal;

    this.name = marker.name;
    this.region = marker.region;
    this.population = marker.population;
    this.src = marker.src;
    this.country = marker.country;
    this.href = marker.href;

    this.markerImage = new Control(this.node, 'div', 'marker__image');

    this.animalInfoWrapper = new Control(this.node, 'div', 'marker__animal-info');

    this.animalInfoImage = new Control(this.animalInfoWrapper.node, 'div', 'animal-info__image');

    this.animalInfoContentWrapper = new Control(
      this.animalInfoWrapper.node,
      'div',
      'animal-info__content-wrapper',
    );

    this.animalInfoContentName = new Control(
      this.animalInfoContentWrapper.node,
      'p',
      'animal-info__name',
      `${this.name}`,
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
    this.animalInfoWatchButton = this.href;
    this.fillCountry();
  }

  fillCountry() {
    this.map.querySelectorAll(`.${this.animal.country}`).forEach((element) => {
      if (element.classList.contains(this.animal.country)) element.classList.add('map-area__active');
    });
  }
}

animals.map((animal) => new Marker(map, mapWrapper, animal, animal.marker));
