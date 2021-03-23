import './map.sass';

import Control from '../../js/contol';

const map = document.querySelector('.map__element');
const mapWrapper = document.querySelector('.map-wrapper');

const markers = [
  {
    animal: 'Eagle',
    name: 'West End Bald Eagle',
    region: 'on an island near Los Angeles',
    population: 'more than 270 pairs in 2013',
    src: 'assets/images/map/eagle.png',
    country: 'US',
  },
  {
    animal: 'Alligator',
    name: 'Alligator and Spoonbill Swamp',
    region: 'on an island near Los Angeles',
    population: 'more than 270 pairs in 2013',
    src: 'assets/images/map/alligator2.jpg',
    country: 'US',
  },
  {
    animal: 'Gorilla',
    name: 'Grace Gorilla Forest Corridor',
    region: 'on an island near Los Angeles',
    population: 'more than 270 pairs in 2013',
    src: 'assets/images/map/gorilla2.jpg',
    country: 'CM',
  },
  {
    animal: 'Panda',
    name: 'Flexing panda',
    region: 'on an island near Los Angeles',
    population: 'About 1,590 individuals',
    src: 'assets/images/map/panda2.jpg',
    country: 'CN',
  },
];

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
    this.animalInfoImage.node.style.backgroundImage = `url(../../${this.src})`;

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

markers.map((marker) => new Marker(map, mapWrapper, marker));
