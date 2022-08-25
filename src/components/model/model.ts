import IUser from './iuser';

class Model {
  private baseURL = 'https://rslang-22-learnwords.herokuapp.com';

  getBook() {
    return fetch(this.baseURL + '/words').then((responce) => responce.json());
  }

  getPage(page: number, group: number) {
    const url = this.baseURL + `/words?page=${page}&group=${group}`;
    return fetch(url).then((responce) => responce.json());
  }

  createUser(user: object) {
    return fetch(this.baseURL + '/users', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    }).then((resp) => resp.json());
  }
}

export default Model;
