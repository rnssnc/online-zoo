import './map.sass';

import Control from '../../js/contol';

import animals from '../../js/animals';

const map = document.querySelector('.map__element');
const mapWrapper = document.querySelector('.map-wrapper');

class Marker extends Control {
  constructor(map, mapWapper, marker = {}) {
    super(mapWrapper, 'a', `map__marker marker-${marker.animal}`);

    this.map = map;
    this.mapWapper = mapWapper;

    this.animal = marker.animal;
    this.name = marker.name;
    this.region = marker.region;
    this.population = marker.population;
    this.src = marker.src;
    this.country = marker.country;

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

    this.fillCountry();
  }

  fillCountry() {
    this.map.querySelectorAll(`.${this.country}`).forEach((element) => {
      if (element.classList.contains(this.country)) element.classList.add('map-area__active');
    });
  }
}

animals.map((marker) => new Marker(map, mapWrapper, marker));
