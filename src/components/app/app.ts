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

  public state = 'games';

  constructor() {
    this.model = new Model();
    this.view = new View(this.model.baseURL);
    window.onpopstate = (ev: Event) => this.route(ev);
  }

  start() {
    this.view.draw(this.state);
    this.assignListeners();
    this.changeCurrentPage();
  }

  changeCurrentPage() {
    this.view.textbook.reassign_selectors();
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
            user.name = (<IUser>data).name;
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
      if (this.view.textbook.currentPage > 0) {
        this.view.textbook.currentPage -= 1;
        this.changeCurrentPage();
      }
    });
    next.addEventListener('click', () => {
      if (this.view.textbook.currentPage < 29) {
        this.view.textbook.currentPage += 1;
        this.changeCurrentPage();
      }
    });
    chapterSelector.addEventListener('change', (event) => {
      const chapter = (<HTMLSelectElement>event.target).value;
      this.view.textbook.currentChapter = Number(chapter);
      this.changeCurrentPage();
    });

    const sprintBtn = <HTMLButtonElement>document.getElementById('btn_sprint');
    sprintBtn.addEventListener('click', () => {
      this.model
        .getBook()
        .then((data: IWord[]) => {
          this.view.wordlist = data;
          this.view.showSprint();
        })
        .catch((err) => console.log(err));
    });

    const repeatSprintBtn = <HTMLButtonElement>(
      document.getElementById('repeat_sprint')
    );
    repeatSprintBtn.addEventListener('click', () => this.view.showSprint());

    const gamePicker = <HTMLButtonElement>(
      document.getElementById('choose_game')
    );
    gamePicker.addEventListener('click', () => this.view.showPicker());

    const yesbtn = <HTMLButtonElement>document.getElementById('btn_yes');
    yesbtn.addEventListener('click', (event) => this.view.checkAnswer(event));

    const nobtn = <HTMLButtonElement>document.getElementById('btn_no');
    nobtn.addEventListener('click', (event) => this.view.checkAnswer(event));
  }
}

export default App;
