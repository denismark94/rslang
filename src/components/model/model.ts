import IUser from './iuser';
import IUserWord from './iword';

class Model {
  private baseURL = 'https://rslang-22-learnwords.herokuapp.com';

  getBook() {
    return fetch(this.baseURL + '/words').then((responce) => responce.json());
  }

  getPage(page: number, group: number) {
    const url = this.baseURL + `/words?page=${page}&group=${group}`;
    return fetch(url).then((responce) => responce.json());
  }

  createUser(user: IUser) {
    return fetch(this.baseURL + '/users', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    }).then((resp) => resp.json());
  }

  getUser(id: string, token: string) {
    return fetch(this.baseURL + `/users?id=${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((responce) => responce.json());
  }

  login(user: IUser) {
    return fetch(this.baseURL + '/signin', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    }).then((response) => response.json());
  }

  getUserWords(userId: string, token: string) {
    return fetch(this.baseURL + `/users/${userId}/words`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((responce) => responce.json());
  }

  createUserWords(uid: string, wid: string, token: string, word: IUserWord) {
    return fetch(this.baseURL + `/users/${uid}/words/${wid}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(word),
    }).then((responce) => responce.json());
  }
}
export default Model;
