import 'normalize.css';

import './base.sass';
import DonationPopup from '../../js/components/Popup/DonationPopup/DonationPopup';

const donationPopup = new DonationPopup();

[...document.querySelectorAll('.donate-popup-show')].map((button) =>
  button.addEventListener('click', donationPopup.showPopup),
);
