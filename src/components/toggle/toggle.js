import './toggle.sass';

const themeSwicher = document.querySelector('.theme-switch__checkbox');

themeSwicher.addEventListener('change', function () {
  if (this.checked) document.documentElement.dataset.colorMode = 'dark';
  else document.documentElement.dataset.colorMode = 'light';
  localStorage.setItem('theme', document.documentElement.dataset.colorMode);
});

window.addEventListener('load', () => {
  if (localStorage.key('theme')) {
    const theme = localStorage.getItem('theme');
    document.documentElement.dataset.colorMode = theme;
    if (theme === 'dark') themeSwicher.checked = true;
  }
});
