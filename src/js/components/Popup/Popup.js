import './Popup.sass';

import Control from '../../contol';

export default class Popup extends Control {
  constructor(name) {
    super(document.body, 'div', `${name}-popup__wrapper popup__wrapper`);
    this.popup = new Control(this.node, 'div', `${name}-popup popup`);

    this.node.addEventListener('click', (e) => {
      if (e.target === this.node) this.hidePopup();
    });
  }

  hidePopup = () => {
    this.node.classList.remove('active');
    document.body.classList.remove('popup-active');
  };

  showPopup = () => {
    this.node.classList.add('active');
    document.body.classList.add('popup-active');
  };
}
