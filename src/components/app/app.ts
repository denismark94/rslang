import View from '../view/view';
import Model from '../model/model';
import IUser from '../model/iuser';
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
    const user = {
      name: 'Bob',
      email: 'bob@hotmail.com',
      password: 'password',
      id: '',
      token: '',
    };
    switch (command) {
      case 'page':
        this.model
          .getPage(2, 0)
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
          })
          .catch((err) => console.log(err));
        break;
      default:
        break;
    }
    console.log(user);
  }
}

export default App;
