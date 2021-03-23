import './toggle.sass';

const themeSwicher = document.querySelector('.theme-switch__checkbox');

themeSwicher.addEventListener('change', function () {
  if (this.checked) document.documentElement.dataset.colorMode = 'dark';
  else document.documentElement.dataset.colorMode = 'light';
});
