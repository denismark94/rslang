import App from './components/app/app';

import './styles.scss';
import './fan-animation.scss';
import './login.scss';
import './main-page.scss';
const app: App = new App();
app.start();
app.testAPI('page');

// вкину 2 кнопки здесь, потом раскидаю по правильным местам

const btnHeader = document.querySelector('.header') as HTMLElement;
const popupLogin = document.querySelector('.popup-login') as HTMLElement;
const slideNav = document.querySelector('.nav') as HTMLElement;

btnHeader.addEventListener('click', (event: MouseEvent) => {
  if ((event.target as HTMLElement).closest('.btn-nav')) {
    slideNav.classList.toggle('active');
  }
  if ((event.target as HTMLElement).closest('.btn-login')) {
    popupLogin.classList.toggle('active');
  }
  if ((event.target as HTMLElement).classList.contains('popup-login')) {
    popupLogin.classList.remove('active');
  }
});
