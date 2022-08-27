import './header.scss';
class Header {
  pages = ['Login', 'Main', 'Learn', 'Train'];

  constructor() {

  }

  draw(): HTMLElement {
    const element = document.createElement('header');
    const nav = document.createElement('nav');
    this.pages.forEach((page) => {
      const link = document.createElement('a');
      link.textContent = page;
      nav.appendChild(link);
    });
    element.appendChild(nav);
    console.log('!');
    return element;
  }
}

export default Header;
