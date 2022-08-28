import View from '../view/view';
class App {
  public view: View;
  //   public learnPage: LearnPage;
  //   public trainPage: TrainPage;

  public state = 'main';

  constructor() {
    this.view = new View();
  }

  start() {
    switch (this.state) {
      case 'main':
        // this.view.draw();
        break;
      default:
        break;
    }
  }
}

export default App;
