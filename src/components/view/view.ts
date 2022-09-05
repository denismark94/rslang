import Header from './header/header';
import TextBookSection from './textbook/textbook';
import MainSection from './main/main';
import Footer from './footer/footer';
import IWord from '../model/iword';

class View {
  url: string;

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

  progress: number;

  constructor(url: string) {
    this.url = url;
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
    this.progress = 0;
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

  hideElements() {
    const picker = <HTMLDivElement>document.querySelector('.games_picker');
    picker.classList.add('hidden');
    const board = <HTMLDivElement>document.querySelector('.board');
    board.classList.add('hidden');
    const results = <HTMLDivElement>document.querySelector('.results');
    results.classList.add('hidden');
  }

  hideGames() {
    const sprint = <HTMLDivElement>document.getElementById('sprint');
    sprint.classList.add('hidden');
    const aChall = <HTMLDivElement>document.getElementById('audiochallenge');
    aChall.classList.add('hidden');
  }

  showPicker() {
    this.hideElements();
    const picker = <HTMLDivElement>document.querySelector('.games_picker');
    picker.classList.remove('hidden');
  }

  showBoard() {
    this.hideElements();
    const board = <HTMLDivElement>document.querySelector('.board');
    board.classList.remove('hidden');
  }

  showGame(game: string) {
    this.showBoard();
    this.hideGames();
    const sprint = <HTMLDivElement>document.getElementById(game);
    sprint.classList.remove('hidden');
    this.startGame(game);
  }

  startGame(game: string) {
    this.score = 0;
    this.cntCorrect = 0;
    this.cntIncorrect = 0;
    this.progress = 1;
    this.genPair();
    this.refresh_values();
    switch (game) {
      case 'sprint':
        this.countdown();
        break;
      case 'audiochallenge':
        this.playAudio();
      default:
        break;
    }
  }

  showResults() {
    this.hideElements();
    const results = <HTMLDivElement>document.querySelector('.results');
    results.classList.remove('hidden');
  }

  countdown() {
    let counter = 3;
    const hr = <HTMLHRElement>document.querySelector('#countdown > h2');
    hr.textContent = '60';
    const timer = setInterval(
      function (context: View) {
        if (counter >= 0) {
          hr.textContent = (counter--).toString();
        } else {
          clearInterval(timer);
          context.showResults();
        }
      },
      1000,
      this
    );
  }

  checkAnswer(event: Event) {
    const answer =
      this.wordlist[this.currentWordIndex].wordTranslate === this.translate;
    const btnType = (<HTMLButtonElement>event.target).id;
    switch (btnType) {
      case 'btn_yes':
        this.cntCorrect += answer ? 1 : 0;
        this.score += answer ? 10 : 0;
        this.genPair();
        this.refresh_values();
        break;
      case 'btn_no':
        this.cntIncorrect += !answer ? 1 : 0;
        this.score += !answer ? 10 : 0;
        this.genPair();
        this.refresh_values();
        break;
      case 'next_question':
        if (this.progress < 10) {
          this.progress++;
          this.genPair();
          this.refresh_values();
          this.playAudio();
        } else {
          this.showResults();
        }
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

    const audio = <HTMLAudioElement>document.getElementById('example_audio');
    audio.src = this.url + '/' + this.wordlist[this.currentWordIndex].audio;

    const pb = <HTMLDivElement>document.getElementById('progressbar');
    pb.setAttribute('width', `${this.progress * 10}%`);
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

  playAudio() {
    const audio = <HTMLAudioElement>document.getElementById('example_audio');
    audio.play().catch((err) => console.log(err));
  }
}

export default View;
