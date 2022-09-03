import Header from './header/header';
import TextBookSection from './textbook/textbook';
import MainSection from './main/main';
import Footer from './footer/footer';

class View {
  header: Header;

  learn: TextBookSection;

  main: MainSection;

  state: string;

  footer: Footer;

  constructor(url: string) {
    this.header = new Header();
    this.learn = new TextBookSection(url);
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
      case 'textbook':
        document.title = 'Textbook';
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
