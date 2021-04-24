import Control from '../../contol';
import InputController from './InputController';
import Input from './Input';

export default class SelectInput extends InputController {
  constructor(options = {}) {
    super({
      ...options,
      tagName: 'div',
      className: `${options.className}-value-display select-input__value-display`,
    });
    this.startValue = options.startValue || 0;

    if (this.fieldSet) {
      this.wrapper = new Control(
        this.fieldSet.node,
        'div',
        `select-input__wrapper ${options.className}-input__wrapper`,
      );
    } else {
      this.wrapper = new Control(
        options.parentNode,
        'div',
        `select-input__wrapper ${options.className}-input__wrapper`,
      );
    }

    this.wrapper.node.append(this.node);
    // if (this.fieldSet) {
    //   this.optionsWrapper = new Control(
    //     this.fieldSet.node,
    //     'div',
    //     `${options.className}-options-wrapper select-input__options-wrapper`,
    //   );
    // } else {
    this.optionsWrapper = new Control(
      // options.parentNode
      this.wrapper.node,
      'div',
      `${options.className}-options-wrapper select-input__options-wrapper`,
    );
    // }

    this.inputOptions = options.inputOptions;
    this.inputs = [];

    this.inputOptions.map((option) => {
      const input = new Input({
        parentNode: this.optionsWrapper.node,
        className: `select-input__option ${options.className}`,
        label: option.label,
        attributes: { name: options.className, type: 'radio', value: option.value },
      });

      input.node.addEventListener('click', () => {
        this.setDisplayValue(input.node.value);
        this.hideOptions();
      });

      this.inputs.push(input);
    });

    this.setupListeners();

    console.log(this.inputs[this.startValue].node.checked);
    this.inputs[this.startValue].node.click();
    console.log(this.inputs[this.startValue].node.checked);
  }

  setupListeners() {
    this.node.addEventListener('click', this.showOptions);
    this.optionsWrapper.node.addEventListener('mouseleave', this.hideOptions);
  }

  showOptions = () => {
    this.optionsWrapper.node.classList.add('options-wrapper--active');
  };

  hideOptions = () => {
    this.optionsWrapper.node.classList.remove('options-wrapper--active');
  };

  setDisplayValue(value) {
    this.node.textContent = value;
  }
}
