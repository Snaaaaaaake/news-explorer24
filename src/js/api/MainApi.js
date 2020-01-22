class MainApi {
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
      .then((res) => res.json())
      .catch((err) => console.log(err));
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
      .then((res) => res.json())
      .catch((err) => console.log(err));
  }

  userLogout() {
    return fetch(`${this.baseUrl}/logout`, {
      credentials: 'include',
      headers: this.baseHeader,
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  }

  getUser() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.baseHeader,
      credentials: 'include',
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  }
}
const mainApi = new MainApi('https://api.news-explorer24.ru');
export default mainApi;
