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

  // draw() {
  //   const header = this.header.draw();
  //   const section = this.main.draw();
  //   const footer = this.footer.draw();
  //   document.body.appendChild(header);
  //   document.body.appendChild(section);
  //   document.body.appendChild(footer);
  // }
}

export default View;
