import IUser from './iuser';
import IUserWord from './iuserword';
import IStatistics from './istat';
import ISettings from './isettings';

class Model {
  public baseURL = 'https://rslang-22-learnwords.herokuapp.com';

  getBook() {
    return fetch(this.baseURL + '/words').then((responce) => responce.json());
  }

  getPage(page: number, group: number) {
    const url = `${this.baseURL}/words?page=${page}&group=${group}`;
    return fetch(url).then((responce) => responce.json());
  }

  getWord(wordId: string) {
    const url = `${this.baseURL}/words/${wordId}`;
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
    })
      .then((response) => response.json())
      .catch((err) => {
        throw err;
      });
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

  createUserWord(uid: string, wid: string, token: string, word: IUserWord) {
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

  getUserWord(uid: string, wid: string, token: string) {
    return fetch(this.baseURL + `/users/${uid}/words/${wid}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((responce) => responce.json());
  }

  updUserWord(uid: string, wid: string, token: string, word: IUserWord) {
    return fetch(this.baseURL + `/users/${uid}/words/${wid}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(word),
    }).then((responce) => responce.json());
  }

  delUserWord(uid: string, wid: string, token: string) {
    return fetch(this.baseURL + `/users/${uid}/words/${wid}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((responce) => console.log(responce.status));
  }

  getStat(uid: string, token: string) {
    return fetch(this.baseURL + `/users/${uid}/statistics`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((responce) => responce.json());
  }

  updStat(uid: string, token: string, stat: IStatistics) {
    return fetch(this.baseURL + `/users/${uid}/statistics`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(stat),
    }).then((responce) => responce.json());
  }

  getSettings(uid: string, token: string) {
    return fetch(this.baseURL + `/users/${uid}/settings`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((responce) => responce.json());
  }

  updSettings(uid: string, token: string, settings: ISettings) {
    return fetch(this.baseURL + `/users/${uid}/settings`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(settings),
    }).then((responce) => responce.json());
  }
}
export default Model;
