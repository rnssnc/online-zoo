import './Input.sass';

import Control from '../../contol';
import InputController from './InputController';

export default class Input extends InputController {
  constructor(options = {}) {
    if (options.addClass === false)
      super({ ...options, tagName: 'input', className: `${options.className}` });
    else super({ ...options, tagName: 'input', className: `${options.className}-input input__element` });

    if (options.label) {
      this.label = new Control(options.parentNode, 'label', `${options.className}-label`);
      this.label.node.textContent = options.label;
      this.label.node.append(this.node);
    }

    for (const attribute in options.attributes) {
      if ({}.hasOwnProperty.call(options.attributes, attribute)) {
        this.node[attribute] = options.attributes[attribute];
      }
    }
  }
}
