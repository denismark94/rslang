import Header from './header/header';
import LearnSection from './learn/learn';
import MainSection from './main/main';
import Footer from './footer/footer';

class View {
  header: Header;

  learn: LearnSection;

  main: MainSection;

  state: string;

  footer: Footer;

  constructor() {
    this.header = new Header();
    this.learn = new LearnSection();
    this.main = new MainSection();
    this.footer = new Footer();
    this.state = 'main';
  }

  draw(state: string) {
    document.querySelectorAll('.main').forEach((section) => {
      section.classList.add('hidden');
    });
    // document.body.innerHTML = '';
    // const header = this.header.draw();
    // let section = this.main.draw();
    switch (state) {
      case 'login':
        document.title = 'Authorize';
        break;
      case 'main':
        document.title = 'RS Lang';
        // section = this.main.draw();
        break;
      case 'learn':
        document.title = 'Learn';
        break;
      case 'train':
        document.title = 'Train';
        break;
      default:
        break;
    }
    document.getElementById(state)?.classList.remove('hidden');
    // const footer = this.footer.draw();
    // document.body.appendChild(header);
    // document.body.appendChild(section);
    // document.body.appendChild(footer);
  }
}

export default View;
