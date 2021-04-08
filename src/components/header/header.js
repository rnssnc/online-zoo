import '../logotype/logotype';
import '../navigation/navigation';
import '../toggle/toggle';

import './header.sass';

/* mobile header */

const navButton = document.querySelector('.mobile-nav');
const nav = document.querySelector('.navigation-header-main');

navButton.addEventListener('click', () => {
  navButton.classList.toggle('mobile-nav--active');
  nav.classList.toggle('navigation-header-main--active');
});
