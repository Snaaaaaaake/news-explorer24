import resCheck from '../utils/resCheck';

export default class MainApi {
  constructor(url) {
    this.baseUrl = url;
    this.baseHeader = { 'Content-Type': 'application/json' };
  }

  userCreate(name, email, password) {
    return fetch(`${this.baseUrl}/signup`, {
      method: 'post',
      headers: this.baseHeader,
      body: JSON.stringify({
        name, email, password,
      }),
    })
      .then(resCheck);
  }

  userLogin(email, password) {
    return fetch(`${this.baseUrl}/signin`, {
      method: 'post',
      credentials: 'include',
      headers: this.baseHeader,
      body: JSON.stringify({
        email, password,
      }),
    })
      .then(resCheck);
  }

  userLogout() {
    return fetch(`${this.baseUrl}/logout`, {
      credentials: 'include',
      headers: this.baseHeader,
    })
      .then(resCheck);
  }

  getUser() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.baseHeader,
      credentials: 'include',
    })
      .then(resCheck);
  }

  addArticle(keyword, title, description, date, source, url, image) {
    return fetch(`${this.baseUrl}/articles`, {
      method: 'POST',
      credentials: 'include',
      headers: this.baseHeader,
      body: JSON.stringify({
        keyword,
        title,
        description,
        date,
        source,
        url,
        image,
      }),
    })
      .then(resCheck);
  }

  getUserArticles() {
    return fetch(`${this.baseUrl}/articles`, {
      credentials: 'include',
      headers: this.baseHeader,
    })
      .then(resCheck);
  }

  deleteArticle(id) {
    return fetch(`${this.baseUrl}/articles/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this.baseHeader,
    })
      .then(resCheck);
  }
}
