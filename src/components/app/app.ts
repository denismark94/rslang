import View from '../view/view';
class App {
  public view: View;
  //   public learnPage: LearnPage;
  //   public trainPage: TrainPage;

  public state = 'main';

  constructor() {
    this.view = new View();
    window.onpopstate = () => this.route();
  }

  start() {
    this.view.draw(this.state);
  }

  route() {
    const link = window.location.hash.slice(1);
    if (link === this.state) return;
    this.state = link;
    this.start();
  }
}

export default App;
