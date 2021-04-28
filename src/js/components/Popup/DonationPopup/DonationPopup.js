import Popup from '../Popup';
import Control from '../../../contol';
import Heading from '../../Heading/Heading';

import Input from '../../Input/Input';
import SelectInput from '../../Input/SelectInput';

import './DonationPopup.sass';

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
        className: 'donation-popup__input to-donate',
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
        className: 'donation-popup__input name',
        legend: 'Name',
        type: 'text',
        required: true,
        fieldset: true,
      }),
    );

    this.form.inputs.push(
      new Input({
        parentNode: this.form.middleSection.columnLeft.inputsWrapper.node,
        className: 'donation-popup__input email',
        legend: 'Email',
        attributes: { type: 'email', required: true },
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
          { label: 'Ua +3', value: '+3' },
        ],
        fieldset: true,
      }),
    );

    new Input({
      parentNode: this.form.inputs[this.form.inputs.length - 1].fieldSet.node,
      className: 'donation-popup__input phone',
      attributes: { type: 'text', required: true },
    });

    this.form.middleSection.columnRight = new Control(
      this.form.middleSection.node,
      'div',
      'popup-form__middle-section__column-right',
    );

    this.form.middleSection.columnRight.heading = new Heading(
      this.form.middleSection.columnRight.node,
      'h3',
      'form__middle-section__column-right__title popup-form__subheading',
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
        className: 'donation-popup__input card-number',
        legend: 'Card number',
        type: 'text',
        fieldset: true,
        attributes: { required: true },
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

    this.form.inputs.push(
      new Input({
        parentNode: this.form.middleSection.columnRight.inputsWrapper.node,
        className: 'donation-popup__input card-cvc',
        legend: 'CVC',
        attributes: { type: 'number', required: true, min: '100', max: '999' },
        fieldset: true,
      }),
    );

    this.caption = new Control(
      this.form.node,
      'p',
      `${this.name}-popup__caption`,
      'If don’t cancel your subscription before the trial ends on April 15, 2021, you agree that you will automatically be charged',
    );

    this.submitButtonWrapper = new Control(this.form.node, 'div', 'submit-button__wrapper');

    this.submitButton = new Input({
      parentNode: this.submitButtonWrapper.node,
      className: 'donation-popup__button button button-filled',
      addClass: false,
      attributes: { type: 'submit', value: 'DONATE' },
    });

    this.closeButton = new Control(this.popup.node, 'button', 'popup__close-button button');

    this.closeButton.node.addEventListener('click', () => {
      console.log('as?');
      this.hidePopup();
    });
  }
}
