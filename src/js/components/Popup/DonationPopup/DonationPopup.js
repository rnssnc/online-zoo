import './DonationPopup.sass';

import Popup from '../Popup';
import Control from '../../../contol';
import Heading from '../../Heading/Heading';

import Input from '../../Input/Input';
import SelectInput from '../../Input/SelectInput';

import animals from '../../../animals';
/*
  .donation-popup-wrapper
    .donation-popup
      .donation-popup__aside 
      .donation-popup__content-wrapper
        .donation-popup__title
        .donation-popup__form
        .donation-popup__caption
*/
export default class DonationPopup extends Popup {
  constructor(options = {}) {
    super('donation');
    this.name = 'donation';

    this.aside = new Control(this.popup.node, 'div', `${this.name}-popup__aside`);
    this.contentWrapper = new Control(this.popup.node, 'div', `${this.name}-popup__content-wrapper`);

    this.title = new Control(
      this.contentWrapper.node,
      'h2',
      `${this.name}-popup__title`,
      'Donate for your animal',
    );

    this.form = new Control(this.contentWrapper.node, 'form', `${this.name}-popup__form`);
    this.form.inputs = [];

    this.form.topSection = new Control(this.form.node, 'div', 'popup-form__top-section-wrapper');

    this.form.topSection.inputsWrapper = new Control(
      this.form.topSection.node,
      'div',
      'top-section__inputs-wrapper',
    );

    this.form.inputs.push(
      new SelectInput({
        parentNode: this.form.topSection.inputsWrapper.node,
        className: 'animal',
        fieldset: true,
        legend: 'Choose an animal',
        radioName: 'animal',
        inputOptions: [
          ...animals.map((animal) => {
            const label = animal.name;
            const value = animal.name;
            return { label, value };
          }),
        ],
      }),
    );

    this.form.inputs.push(
      new Input({
        parentNode: this.form.topSection.inputsWrapper.node,
        className: 'popup-input to-donate',
        legend: 'To donate',
        fieldset: true,
        attributes: {
          type: 'text',
          required: true,
        },
      }),
    );

    this.form.middleSection = new Control(this.form.node, 'div', 'popup-form__middle-section-wrapper');

    this.form.middleSection.columnLeft = new Control(
      this.form.middleSection.node,
      'div',
      'popup-form__middle-section__column-left',
    );

    this.form.middleSection.columnLeft.heading = new Heading(
      this.form.middleSection.columnLeft.node,
      'h3',
      'form__middle-section__column-left__title popup-form__subheading',
      'About you',
    );

    this.form.middleSection.columnLeft.inputsWrapper = new Control(
      this.form.middleSection.columnLeft.node,
      'div',
      'middle-section-column-left__inputs-wrapper',
    );

    this.form.inputs.push(
      new Input({
        parentNode: this.form.middleSection.columnLeft.inputsWrapper.node,
        className: 'name',
        legend: 'Name',
        type: 'text',
        required: true,
        fieldset: true,
      }),
    );

    this.form.inputs.push(
      new Input({
        parentNode: this.form.middleSection.columnLeft.inputsWrapper.node,
        className: 'email',
        legend: 'Email',
        type: 'email',
        required: true,
        fieldset: true,
      }),
    );

    this.form.inputs.push(
      new SelectInput({
        parentNode: this.form.middleSection.columnLeft.inputsWrapper.node,
        className: 'phone-county-code',
        legend: 'Phone',
        radioName: 'phone-county-code',
        inputOptions: [
          { label: 'Ru +7', value: '+7' },
          { label: 'Uk +3', value: '+3' },
          { label: 'Be +375', value: '+375' },
        ],
        fieldset: true,
      }),
    );

    new Input({
      parentNode: this.form.inputs[this.form.inputs.length - 1].fieldSet.node,
      className: 'phone',
      attributes: { type: 'text', required: true },
    });

    this.form.middleSection.columnRight = new Control(
      this.form.middleSection.node,
      'div',
      'popup-form__middle-section__column-right popup-form__subheading',
    );

    this.form.middleSection.columnRight.heading = new Heading(
      this.form.middleSection.columnRight.node,
      'h3',
      'form__middle-section__column-right__title',
      'Checkout',
    );

    this.form.middleSection.columnRight.inputsWrapper = new Control(
      this.form.middleSection.columnRight.node,
      'div',
      'middle-section-column-left__inputs-wrapper',
    );

    this.form.inputs.push(
      new Input({
        parentNode: this.form.middleSection.columnRight.inputsWrapper.node,
        className: 'card-number',
        legend: 'Card number',
        type: 'text',
        attributes: { required: true, fieldset: true },
      }),
    );

    this.form.inputs.push(
      new SelectInput({
        parentNode: this.form.middleSection.columnRight.inputsWrapper.node,
        className: 'card-expiry-month',
        legend: 'Expiry date',
        radioName: 'card-expiry-month',
        inputOptions: new Array(12).fill(0).map((element, index) => {
          const ind = index + 1 < 10 ? `0${index + 1}` : index + 1;
          return { label: ind, value: ind };
        }),
        fieldset: true,
      }),
    );

    const currentYear = new Date().getUTCFullYear();

    new SelectInput({
      parentNode: this.form.inputs[this.form.inputs.length - 1].fieldSet.node,
      className: 'card-expiry-year',
      radioName: 'card-expiry-year',
      inputOptions: new Array(12).fill(0).map((element, index) => {
        const year = currentYear + index;
        return { label: year, value: year };
      }),
    });

    new Input({
      parentNode: this.form.middleSection.columnRight.inputsWrapper.node,
      className: 'card-cvc',
      attributes: { type: 'number', required: true, min: '100', max: '999' },
    });
    this.caption = new Control(this.contentWrapper.node, 'p', `${this.name}-popup__caption`);
  }
}
