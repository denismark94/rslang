/* eslint-disable @typescript-eslint/indent */
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
      id: '63092d553e8288001679d5e5',
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMDkyZDU1M2U4Mjg4MDAxNjc5ZDVlNSIsImlhdCI6MTY2MTU1NTAxOSwiZXhwIjoxNjYxNTY5NDE5fQ.bNe6ELh_G7GvUaYemhWmgkMJxPI8_61FY0qka_9OmUg',
    };
    const wid = '5e9f5ee35eb9e72bc21af4a2';
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
          .then((data) => {
            console.log(data);
          })
          .catch((err) => console.log(err));
        break;
      case 'markdifficult':
        this.model
          .createUserWords(user.id, wid, user.token, {
            difficulty: 'strong',
            optional: {},
          })
          .then((data) => {
            console.log(data);
          })
          .catch((err) => console.log(err));
        break;
      case 'marklearned':
        this.model
          .createUserWords(user.id, wid, user.token, {
            difficulty: 'weak',
            optional: {
              learned: true,
            },
          })
          .then((data) => {
            console.log(data);
          })
          .catch((err) => console.log(err));
        break;
      default:
        break;
    }
  }
}

export default App;
