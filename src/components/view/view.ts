import Header from './header/header';
import TextBookSection from './textbook/textbook';
import MainSection from './main/main';
import Footer from './footer/footer';
import IWord from '../model/iword';

class View {
  header: Header;

  textbook: TextBookSection;

  main: MainSection;

  state: string;

  footer: Footer;

  cntCorrect: number;

  cntIncorrect: number;

  score: number;

  wordlist: IWord[];

  currentWordIndex: number;

  translate: string;

  constructor(url: string) {
    this.header = new Header();
    this.textbook = new TextBookSection(url);
    this.main = new MainSection();
    this.footer = new Footer();
    this.state = 'main';
    this.cntCorrect = 0;
    this.cntIncorrect = 0;
    this.score = 0;
    this.wordlist = [];
    this.currentWordIndex = 0;
    this.translate = '';
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

  showPicker() {
    const picker = <HTMLDivElement>document.querySelector('.games_picker');
    picker.classList.remove('hidden');
    const game = <HTMLDivElement>document.getElementById('sprint');
    game.classList.add('hidden');
  }

  showSprint() {
    const picker = <HTMLDivElement>document.querySelector('.games_picker');
    picker.classList.add('hidden');
    const game = <HTMLDivElement>document.getElementById('sprint');
    game.classList.remove('hidden');
    const results = <HTMLDivElement>document.querySelector('.results');
    results.classList.add('hidden');
    this.showBoard();
  }

  showBoard() {
    const board = <HTMLDivElement>document.querySelector('.board');
    board.classList.remove('hidden');
    const results = <HTMLDivElement>document.querySelector('.results');
    results.classList.add('hidden');
    this.startGame();
  }

  startGame() {
    this.score = 0;
    this.cntCorrect = 0;
    this.cntIncorrect = 0;
    this.genPair();
    this.refresh_values();
    this.countdown();
  }

  countdown() {
    let counter = 59;
    const hr = <HTMLHRElement>document.querySelector('#countdown > h2');
    hr.textContent = '60';
    const timer = setInterval(
      (showRes: () => void) => {
        if (counter >= 0) {
          hr.textContent = (counter--).toString();
        } else {
          clearInterval(timer);
          showRes();
        }
      },
      1000,
      this.showResult);
  }

  showResult() {
    const board = <HTMLDivElement>document.querySelector('.board');
    board.classList.add('hidden');
    const results = <HTMLDivElement>document.querySelector('.results');
    results.classList.remove('hidden');
  }

  checkAnswer(event: Event) {
    const answer =
      this.wordlist[this.currentWordIndex].wordTranslate === this.translate;
    const btnType = (<HTMLButtonElement>event.target).id;
    switch (btnType) {
      case 'btn_yes':
        this.cntCorrect += answer ? 1 : 0;
        this.score += answer ? 10 : 0;
        break;
      case 'btn_no':
        this.cntIncorrect += !answer ? 1 : 0;
        this.score += !answer ? 10 : 0;
        break;
    }
    this.genPair();
    this.refresh_values();
  }

  refresh_values() {
    const wordContainer = <HTMLHRElement>(
      document.querySelector('#question .word')
    );
    wordContainer.textContent = this.wordlist[this.currentWordIndex].word;
    const translateContainer = <HTMLHRElement>(
      document.querySelector('#question .translate')
    );
    translateContainer.textContent = this.translate;
    const scoreContainer = <HTMLHRElement>document.querySelector('#score h2');
    const scoreResContainer = <HTMLHRElement>(
      document.getElementById('score_cnt')
    );
    scoreContainer.textContent = this.score.toString();
    scoreResContainer.textContent = this.score.toString();
    const correctContainer = <HTMLSpanElement>(
      document.getElementById('correct_cnt')
    );
    correctContainer.textContent = this.cntCorrect.toString();
    const incorrectContainer = <HTMLSpanElement>(
      document.getElementById('incorrect_cnt')
    );
    incorrectContainer.textContent = this.cntIncorrect.toString();
  }

  genPair() {
    this.currentWordIndex = this.getRandInt(this.wordlist.length);
    if (this.getRandInt(2)) {
      this.translate = this.wordlist[this.currentWordIndex].wordTranslate;
    } else {
      this.translate =
        this.wordlist[this.getRandInt(this.wordlist.length)].wordTranslate;
    }
  }

  getRandInt(max: number) {
    return Math.floor(Math.random() * max);
  }
}

export default View;
