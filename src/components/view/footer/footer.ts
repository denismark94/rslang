class Footer {
  draw() {
    const element = document.createElement('footer');
    const github = document.createElement('a');
    github.setAttribute('href','https://gihub.com/denismark94');
    github.textContent = 'denismark94';
    const year = document.createElement('span');
    year.textContent = '2022';
    const rslogo = document.createElement('img');
    rslogo.setAttribute(
      'src',
      'https://app.rs.school/static/images/logo-rsschool3.png'
    );
    element.appendChild(github);
    element.appendChild(year);
    element.appendChild(rslogo);
    return element;
  }
}

export default Footer;
