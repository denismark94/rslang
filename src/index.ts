import App from './components/app/app';

import './styles.scss';
import './fan-animation.scss';
import './login.scss';
import './main-page.scss';
import './textbook.scss';
const app: App = new App();
app.start();

// вкину 2 кнопки здесь, потом раскидаю по правильным местам

const btnHeader = <HTMLElement>document.querySelector('.header');
const popupLogin = <HTMLElement>document.querySelector('.popup-login');
const slideNav = <HTMLElement>document.querySelector('.nav');
const body = <HTMLElement>document.querySelector('.body');
const iconLogin = <HTMLButtonElement>document.querySelector('.btn-login');

(<HTMLInputElement>document.querySelector('#sign-name')).value = '';
(<HTMLInputElement>document.querySelector('#sign-email')).value = '';
(<HTMLInputElement>document.querySelector('#sign-password')).value = '';
(<HTMLInputElement>document.querySelector('#login-email')).value = '';
(<HTMLInputElement>document.querySelector('#login-password')).value = '';

btnHeader.addEventListener('click', (event: MouseEvent) => {
  if ((event.target as HTMLElement).closest('.btn-nav')) {
    slideNav.classList.toggle('wrapped');
  }
  if ((event.target as HTMLElement).closest('.btn-login')) {
    if (iconLogin.classList.contains('active')) {
      iconLogin.classList.remove('active');
      (<HTMLElement>document.querySelector('.name-login')).innerHTML = '';
      // выход из пользователя
    } else {
      popupLogin.classList.toggle('active');
      if (popupLogin.classList.contains('active')) {
        body.classList.add('active');
      }
    }
  }
  if ((event.target as HTMLElement).classList.contains('popup-login')) {
    popupLogin.classList.remove('active');
    body.classList.remove('active');
  }
});
