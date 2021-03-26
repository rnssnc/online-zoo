import Control from '../../contol';

export default class Heading extends Control {
  constructor(parentNode, tag, className, content) {
    super(parentNode, tag, className, content);
  }

  setContent(value) {
    this.node.innerHTML = value;
  }
}
