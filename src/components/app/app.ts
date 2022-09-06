/* eslint-disable @typescript-eslint/indent */
import View from '../view/view';
import Model from '../model/model';
import IUser from '../model/iuser';
import IWord from '../model/iword';
class App {
  public view: View;

  public model: Model;
  //   public learnPage: LearnPage;
  //   public trainPage: TrainPage;

  public state = 'textbook';

  constructor() {
    this.model = new Model();
    this.view = new View(this.model.baseURL);
    window.onpopstate = (ev: Event) => this.route(ev);
  }

  start() {
    this.view.draw(this.state);
    this.assignListeners();
    this.changeCurrentPage();
    if (!localStorage.getItem('user')) {
      alert('Hello');
    }
  }

  changeCurrentPage() {
    this.view.learn.reassign_selectors();
    this.model
      .getPage(this.view.learn.currentPage, this.view.learn.currentChapter)
      .then((data: IWord[]) => {
        this.view.learn.draw_page(data);
      })
      .catch((err) => console.log(err));
  }

  route(ev: Event) {
    ev.preventDefault();
    const link = window.location.hash.slice(1);
    if (link === this.state) return;
    this.state = link;
    this.view.draw(this.state);
  }

  testAPI(command: string) {
    const user = {
      name: 'Bob',
      email: 'bob@hotmail.com',
      password: 'password',
      id: '63092d553e8288001679d5e5',
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMDkyZDU1M2U4Mjg4MDAxNjc5ZDVlNSIsImlhdCI6MTY2MjA0NDA3NywiZXhwIjoxNjYyMDU4NDc3fQ.Rcm43ZZzrgULxj3bRpnUhYWuWdMzplyXH3fcLA3s_ls',
    };
    const word = {
      id: '5e9f5ee35eb9e72bc21af4a0',
    };
    const uword = {
      difficulty: 'weak',
      optional: {
        learned: false,
      },
    };
    const stat = {
      learnedWords: '0',
      optional: {},
    };
    const settings = {
      wordsPerDay: '10',
      optional: {},
    };
    switch (command) {
      case 'page':
        this.model
          .getPage(0, 0)
          .then((data) => console.log(data))
          .catch((err) => console.log(err));
        break;
      case 'getword':
        this.model
          .getWord(word.id)
          .then((data) => console.log(data))
          .catch((err) => console.log(err));
        break;
      case 'create':
        this.model
          .createUser(user)
          .then((data) => {
            user.id = <string>(<IUser>data).id;
          })
          .catch((err) => console.log(err));
        break;
      case 'login':
        this.model
          .login(user)
          .then((data) => {
            user.token = <string>(<IUser>data).token;
            user.id = (<{ userId: string }>data).userId;
            console.log(user.token);
          })
          .catch((err) => console.log(err));
        break;
      case 'getuser':
        this.model
          .getUser(user.id, user.token)
          .then((data) => {
            console.log(data);
            // user.name = (<IUser>data).name;
            user.email = (<IUser>data).email;
            user.password = <string>(<IUser>data).password;
          })
          .catch((err) => console.log(err));
        break;
      case 'getuserwords':
        this.model
          .getUserWords(user.id, user.token)
          .then((data) => console.log(data))
          .catch((err) => console.log(err));
        break;
      case 'createuserword':
        this.model
          .createUserWord(user.id, word.id, user.token, uword)
          .then((data) => console.log(data))
          .catch((err) => console.log(err));
        break;
      case 'markdifficult':
        uword.difficulty = 'strong';
        this.model
          .updUserWord(user.id, word.id, user.token, uword)
          .then((data) => console.log(data))
          .catch((err) => console.log(err));
        break;
      case 'marklearned':
        uword.optional.learned = true;
        this.model
          .updUserWord(user.id, word.id, user.token, uword)
          .then((data) => console.log(data))
          .catch((err) => console.log(err));
        break;
      case 'getuserword':
        this.model
          .getUserWord(user.id, word.id, user.token)
          .then((data) => console.log(data))
          .catch((err) => console.log(err));
        break;
      case 'deluserword':
        console.log(this.model.delUserWord(user.id, word.id, user.token));
        break;
      case 'getsettings':
        this.model
          .getSettings(user.id, user.token)
          .then((data) => console.log(data))
          .catch((err) => console.log(err));
        break;
      case 'updsettings':
        this.model
          .updSettings(user.id, user.token, settings)
          .then((data) => console.log(data))
          .catch((err) => console.log(err));
        break;
      case 'getstat':
        this.model
          .getStat(user.id, user.token)
          .then((data) => console.log(data))
          .catch((err) => console.log(err));
        break;
      case 'updstat':
        this.model
          .updStat(user.id, user.token, stat)
          .then((data) => console.log(data))
          .catch((err) => console.log(err));
        break;
      default:
        break;
    }
  }

  assignListeners() {
    const prev = <HTMLButtonElement>document.getElementById('pagprev');
    const next = <HTMLButtonElement>document.getElementById('pagnext');
    const chapterSelector = <HTMLSelectElement>(
      document.getElementById('chapter_selector')
    );
    prev.addEventListener('click', () => {
      if (this.view.learn.currentPage > 0) {
        this.view.learn.currentPage -= 1;
        this.changeCurrentPage();
      }
    });
    next.addEventListener('click', () => {
      if (this.view.learn.currentPage < 29) {
        this.view.learn.currentPage += 1;
        this.changeCurrentPage();
      }
    });
    chapterSelector.addEventListener('change', (event) => {
      const chapter = (<HTMLSelectElement>event.target).value;
      this.view.learn.currentChapter = Number(chapter);
      this.changeCurrentPage();
    });
    const btnSign = <HTMLButtonElement>document.querySelector('#btn-sign');
    const btnLogin = <HTMLButtonElement>document.querySelector('#btn-login');

    btnSign.addEventListener('click', () => {
      this.register();
    });

    btnLogin.addEventListener('click', () => {
      this.login();
    });
  }

  login() {
    const iconLogin = <HTMLButtonElement>document.querySelector('.btn-login');
    const email = (<HTMLInputElement>document.querySelector('#login-email'))
      .value;
    const password = (<HTMLInputElement>(
      document.querySelector('#login-password')
    )).value;
    const usernameTitle = <HTMLElement>document.querySelector('.name-login');

    if (email == '' || password == '') {
      alert(' Требуется email или пароль.');
      return;
    }
    const user = {
      email: email,
      password: password,
    };
    this.model
      .login(user)
      .then((data: IUser) => {
        iconLogin.classList.add('active');
        usernameTitle.innerHTML = <string>data.name;
        alert(`${<string>data.name}  Добро пожаловать.`);
        console.log(data.token, data.id);
        localStorage.setItem('user', <string>data.id);
      })
      .catch((err) => alert(err));

    (<HTMLInputElement>document.querySelector('#login-email')).value = '';
    (<HTMLInputElement>document.querySelector('#login-password')).value = '';
    return;
  }
  // -------------------------------------------------------------------------------------------
  // -------------------------------------------------------------------------------------------

  register() {
    // const usernameArray: string[] = [];
    // const emailArray: string[] = [];
    // const passwordArray: string[] = [];

    // const btnSign = <HTMLButtonElement>document.querySelector('#btn-sign');
    // const btnLogin = <HTMLButtonElement>document.querySelector('#btn-login');
    // const iconLogin = <HTMLButtonElement>document.querySelector('.btn-login');

    // (<HTMLInputElement>document.querySelector('#sign-name')).value = '';
    // (<HTMLInputElement>document.querySelector('#sign-email')).value = '';
    // (<HTMLInputElement>document.querySelector('#sign-password')).value = '';
    // (<HTMLInputElement>document.querySelector('#login-email')).value = '';
    // (<HTMLInputElement>document.querySelector('#login-password')).value = '';

    const username = (<HTMLInputElement>document.querySelector('#sign-name'))
      .value;
    const email = (<HTMLInputElement>document.querySelector('#sign-email'))
      .value;
    const password = (<HTMLInputElement>(
      document.querySelector('#sign-password')
    )).value;

    // this.model
    // .login(user)
    // .then((data: IUser) => {
    //   iconLogin.classList.add('active');
    //   usernameTitle.innerHTML = <string>data.name;
    //   alert(`${<string>data.name}  Добро пожаловать.`);
    //   console.log(data.token);
    // })
    // .catch((err) => alert(err));

    if (email.length == 0 || password.length == 0 || username.length == 0) {
      alert(' Требуется ввести все данные.');
      // return;
    } else if (password.length <= 3) {
      alert('Требуется ввести корректный пароль не менее 8 символов.');
      // return;
    } else {
      const user = {
        name: username,
        email: email,
        password: password,
        // id: '',
      };

      this.model
        .createUser(user)
        .then((data: IUser) => {
          // user.id = <string>data.id;
          console.log(data);
          alert(`${username} все хорошо.`);
          console.log(user);
        })
        .catch(() => alert(`${username} уже зарегистрирован.`));
    }

    (<HTMLInputElement>document.querySelector('#sign-name')).value = '';
    (<HTMLInputElement>document.querySelector('#sign-email')).value = '';
    (<HTMLInputElement>document.querySelector('#sign-password')).value = '';

    // function login() {
    //   const email = (<HTMLInputElement>document.querySelector('#login-email'))
    //     .value;
    //   const password = (<HTMLInputElement>(
    //     document.querySelector('#login-password')
    //   )).value;
    //   const usernameTitle = <HTMLElement>document.querySelector('.name-login');

    //   const i = emailArray.indexOf(email);

    //   if (emailArray.indexOf(email) == -1) {
    //     if (email == '') {
    //       alert(' Требуется email.');
    //       return;
    //     }
    //     alert('Email не существует.');
    //     return;
    //   } else if (passwordArray[i] != password) {
    //     if (password == '') {
    //       alert('Требуется пароль.');
    //       return;
    //     }
    //     alert('Password не существует.');
    //     return;
    //   } else {
    //     iconLogin.classList.add('active');
    //     usernameTitle.innerHTML = usernameArray[i];
    //     alert(`${usernameArray[i]}  Добро пожаловать.`);

    //     (<HTMLInputElement>document.querySelector('#login-email')).value = '';
    //     (<HTMLInputElement>document.querySelector('#login-password')).value =
    //       '';
    //     return;
    //   }
    // }

    // btnSign.addEventListener('click', () => {
    //   register();
    // });

    // btnLogin.addEventListener('click', () => {
    //   login();
    // });

    // if (localStorage.getItem('user') != null) localStorage.setItem('ыукаы', фыукаыфу);
    // if (localStorage.getItem('user') != null) {
    //   login();
    // } else {
    //   localStorage.setItem(`user${usernameArray}`, JSON.stringify(user));
    // }
  }
}

export default App;
