/* eslint-disable @typescript-eslint/indent */
import View from '../view/view';
import Model from '../model/model';
import IUser from '../model/iuser';
import IWord from '../model/iword';
class App {
  public view: View;

  public model: Model;

  public state = 'main';

  public game: string;

  name: string;

  token: string;

  constructor() {
    this.model = new Model();
    this.view = new View(this.model.baseURL);
    this.name = '';
    this.token = '';
    this.game = 'sprint';
    window.onpopstate = (ev: Event) => this.route(ev);
  }

  start() {
    this.view.draw(this.state);
    this.assignListeners();
    this.changeCurrentPage();
    if (localStorage.getItem('name')) {
      this.name = <string>localStorage.getItem('name');
      this.token = <string>localStorage.getItem('token');
      (<HTMLElement>document.querySelector('.name-login')).innerHTML =
        this.name;
      (<HTMLButtonElement>document.querySelector('.btn-login')).classList.add(
        'active'
      );
    }
  }

  changeCurrentPage() {
    this.view.textbook.draw_selectors();
    this.assignTextBookListeners();
    this.model
      .getPage(
        this.view.textbook.currentPage,
        this.view.textbook.currentChapter
      )
      .then((data: IWord[]) => {
        this.view.textbook.draw_page(data);
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
    const btnSign = <HTMLButtonElement>document.querySelector('#btn-sign');
    const btnLogin = <HTMLButtonElement>document.querySelector('#btn-login');

    btnSign.addEventListener('click', () => {
      this.register();
    });

    btnLogin.addEventListener('click', () => {
      this.login();
    });

    const sprintBtn = <HTMLButtonElement>document.getElementById('btn_sprint');
    sprintBtn.addEventListener('click', () => {
      this.game = 'sprint';
      this.model
        .getBook()
        .then((data: IWord[]) => {
          this.view.wordlist = data;
          this.view.showGame(this.game);
        })
        .catch((err) => console.log(err));
    });

    const audioBtn = <HTMLButtonElement>(
      document.getElementById('btn_audiochallenge')
    );
    audioBtn.addEventListener('click', () => {
      this.game = 'audiochallenge';
      this.model
        .getBook()
        .then((data: IWord[]) => {
          this.view.wordlist = data;
          this.view.showGame(this.game);
        })
        .catch((err) => console.log(err));
    });

    const repeatBtn = <HTMLButtonElement>(
      document.getElementById('repeat_sprint')
    );
    repeatBtn.addEventListener('click', () => this.view.showGame(this.game));

    const gamePicker = <HTMLButtonElement>(
      document.getElementById('choose_game')
    );
    gamePicker.addEventListener('click', () => this.view.showPicker());

    const yesbtn = <HTMLButtonElement>document.getElementById('btn_yes');
    yesbtn.addEventListener('click', (event) => this.view.checkAnswer(event));

    const nobtn = <HTMLButtonElement>document.getElementById('btn_no');
    nobtn.addEventListener('click', (event) => this.view.checkAnswer(event));

    const playAudioBtn = <HTMLButtonElement>(
      document.getElementById('play_audio')
    );
    playAudioBtn.addEventListener('click', () => this.view.playAudio());

    const nextQBtn = <HTMLButtonElement>(
      document.getElementById('next_question')
    );
    nextQBtn.addEventListener('click', (event) => this.view.checkAnswer(event));

    const answerBtns = document.querySelectorAll('#options button');
    answerBtns.forEach((btn) => {
      btn.addEventListener('click', (event) => this.view.checkAnswer(event));
    });

    const showAnswerBtn = <HTMLButtonElement>(
      document.getElementById('show_answer')
    );
    showAnswerBtn.addEventListener('click', (event) =>
      this.view.checkAnswer(event)
    );

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
        (<HTMLElement>document.querySelector('.btn-nav')).classList.toggle(
          'active'
        );
      }
      if ((event.target as HTMLElement).closest('.btn-login')) {
        if (iconLogin.classList.contains('active')) {
          iconLogin.classList.remove('active');
          (<HTMLElement>document.querySelector('.name-login')).innerHTML = '';
          this.token = '';
          this.name = '';
          localStorage.setItem('name', <string>'');
          localStorage.setItem('token', <string>'');
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
  }

  assignTextBookListeners() {
    const prv = <HTMLLIElement>document.querySelector('.prev');
    const nxt = <HTMLLIElement>document.querySelector('.next');
    const pageNumbers = <NodeList>document.querySelectorAll('.numb');
    for (let i = 0; i < pageNumbers.length; i += 1) {
      pageNumbers[i].addEventListener('click', () => {
        this.view.textbook.currentPage = Number(pageNumbers[i].textContent);
        this.changeCurrentPage();
      });
    }
    if (nxt) {
      nxt.addEventListener('click', () => {
        if (this.view.textbook.currentPage < 29) {
          this.view.textbook.currentPage += 1;

          this.changeCurrentPage();
        }
      });
    }

    if (prv) {
      prv.addEventListener('click', () => {
        if (this.view.textbook.currentPage > 0) {
          this.view.textbook.currentPage -= 1;

          this.changeCurrentPage();
        }
      });
    }

    const chapterSelector = <HTMLSelectElement>(
      document.getElementById('chapter_selector')
    );

    chapterSelector.addEventListener('change', (event) => {
      const chapter = (<HTMLSelectElement>event.target).value;
      this.view.textbook.currentChapter = Number(chapter);
      this.changeCurrentPage();
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
        this.name = <string>data.name;
        localStorage.setItem('name', <string>data.name);
        localStorage.setItem('token', <string>data.token);
        (
          document.querySelector('.popup-login') as HTMLElement
        ).classList.remove('active');
        (document.querySelector('.body') as HTMLElement).classList.remove(
          'active'
        );
      })
      .catch((err) => alert(err));

    (<HTMLInputElement>document.querySelector('#login-email')).value = '';
    (<HTMLInputElement>document.querySelector('#login-password')).value = '';
    return;
  }

  register() {
    const username = (<HTMLInputElement>document.querySelector('#sign-name'))
      .value;
    const email = (<HTMLInputElement>document.querySelector('#sign-email'))
      .value;
    const password = (<HTMLInputElement>(
      document.querySelector('#sign-password')
    )).value;

    if (email.length == 0 || password.length == 0 || username.length == 0) {
      alert(' Требуется ввести все данные.');
    } else if (password.length <= 3) {
      alert('Требуется ввести корректный пароль не менее 8 символов.');
    } else {
      const user = {
        name: username,
        email: email,
        password: password,
      };

      this.model
        .createUser(user)
        .then((data: IUser) => {
          if (data.error) {
            data.error.errors.forEach((err) => {
              alert(err.message);
            });
          } else {
            alert(`${username} все хорошо.`);
            this.model
              .login(user)
              .then((dataL: IUser) => {
                (<HTMLButtonElement>(
                  document.querySelector('.btn-login')
                )).classList.add('active');
                (<HTMLElement>document.querySelector('.name-login')).innerHTML =
                  <string>dataL.name;
                alert(`${<string>dataL.name}  Добро пожаловать.`);
                this.name = user.name;
                localStorage.setItem('name', user.name);
                localStorage.setItem('token', <string>dataL.token);
                (
                  document.querySelector('.popup-login') as HTMLElement
                ).classList.remove('active');
                (
                  document.querySelector('.body') as HTMLElement
                ).classList.remove('active');
              })
              .catch((err) => alert(err));
          }
        })
        .catch(() => alert(`${username} уже зарегистрирован.`));

      // this.model
      //   .login(user)
      //   .then((dataL: IUser) => {
      //     (<HTMLButtonElement>(
      //       document.querySelector('.btn-login')
      //     )).classList.add('active');
      //     (<HTMLElement>document.querySelector('.name-login')).innerHTML = <
      //       string
      //     >dataL.name;
      //     alert(`${<string>dataL.name}  Добро пожаловать.`);
      //     this.name = user.name;
      //     localStorage.setItem('name', user.name);
      //     localStorage.setItem('token', <string>dataL.token);
      //     (
      //       document.querySelector('.popup-login') as HTMLElement
      //     ).classList.remove('active');
      //     (document.querySelector('.body') as HTMLElement).classList.remove(
      //       'active',
      //     );
      //   })
      //   .catch((err) => alert(err));
    }

    (<HTMLInputElement>document.querySelector('#sign-name')).value = '';
    (<HTMLInputElement>document.querySelector('#sign-email')).value = '';
    (<HTMLInputElement>document.querySelector('#sign-password')).value = '';
  }
}

export default App;
