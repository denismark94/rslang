import View from '../view/view';
import Model from '../model/model';
class App {
  public view: View;

  public model: Model;
  //   public learnPage: LearnPage;
  //   public trainPage: TrainPage;

  public state = 'main';

  constructor() {
    this.view = new View();
    this.model = new Model();
  }

  start() {
    switch (this.state) {
      case 'main':
        this.view.draw();
        break;
      default:
        break;
    }
  }

  testAPI(command: string) {
    switch (command) {
      case 'page':
        this.model
          .getPage(2, 0)
          .then((data) => console.log(data))
          .catch((err) => console.log(err));
        break;
      case 'create':
        this.model
          .createUser({
            "name": 'Alice',
            "email": 'alice@hotmail.com',
            "password": 'pAs$word'
          })
          .then((data) => console.log(data))
          .catch((err) => console.log(err));
        break;
      default:
        break;
    }
  }
}

export default App;
