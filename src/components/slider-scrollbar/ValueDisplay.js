import Control from '../../js/contol';

export default class valueDisplay extends Control {
  constructor(parentNode) {
    super(parentNode, 'div', 'slider-scrollbar__value-display');
    this.currentIndexNode = new Control(this.node, 'span', 'slider-scrollbar__current-index').node;
    this.separatorNode = new Control(this.node, 'span', 'slider-scrollbar__separator').node;
    this.slidesLengthNode = new Control(this.node, 'span', 'slider-scrollbar__items-count').node;
  }

  setValue(currentIndex = 0, sepator = '/', slidesLength = 0) {
    this.currentIndexNode.textContent = currentIndex < 10 ? `0${currentIndex}` : currentIndex;
    this.separatorNode.textContent = sepator;
    this.slidesLengthNode.textContent = slidesLength < 10 ? `0${slidesLength}` : currentIndex;
  }
}
