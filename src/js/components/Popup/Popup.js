import './Popup.sass';

import Control from '../../contol';

export default class Popup extends Control {
  constructor(name) {
    super(document.body, 'div', `${name}-popup__wrapper popup__wrapper`);
    this.popup = new Control(this.node, 'div', `${name}-popup popup`);

    this.node.addEventListener('click', this.hidePopup, {
      bubbles: false,
    });
  }

  hidePopup = (e) => {
    if (e.target === this.node) this.node.classList.remove('active');
  };

  showPopup = () => {
    this.node.classList.add('active');
  };
}
