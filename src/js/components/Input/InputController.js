import Control from '../../contol';

export default class InputController extends Control {
  constructor(options = {}) {
    super(options.parentNode, options.tagName, options.className);

    if (options.fieldset === true) {
      this.fieldSet = new Control(
        options.parentNode,
        'fieldset',
        `${options.className}-fieldset input-fieldset`,
      );
      this.fieldSet.node.append(this.node);

      if (options.legend) {
        this.legend = new Control(this.fieldSet.node, 'legend', `${options.className}-legend input-legend`);
        this.legend.node.textContent = options.legend;
      }
    }
  }
}
