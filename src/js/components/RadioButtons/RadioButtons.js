import Control from '../../contol';

export default class RadioButtons extends Control {
  constructor(parentNode, className) {
    super(parentNode, 'div', `${className}s-wrapper`);
    this.className = className;

    this.buttons = [];
  }

  createRadioButtons(count) {
    for (let i = 0; i < count; i++) {
      this.createRadioButton();
      this.buttons[i].node.addEventListener('click', () => {
        this.setActiveState(i);
      });
    }
  }

  createRadioButton() {
    const radioButton = new Control(this.node, 'div', `${this.className}`);

    this.buttons.push(radioButton);
  }

  setActiveState(buttonIndex) {
    this.buttons.map((button, index) => {
      if (buttonIndex !== index) button.node.classList.remove('radio-active');
      else button.node.classList.add('radio-active');
    });
  }
}
