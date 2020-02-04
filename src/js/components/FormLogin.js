import Form from './Form';
import mainApi from '../api/MainApi';

export default class FormLogin extends Form {
  constructor() {
    super();
    this.domElement = this._createDomElement();
    this.responseError = this.domElement.querySelector('.form__input_response-error');
    this.footerLink = this.domElement.querySelector('.form__footer_link_reg');
    this.formButton = this.domElement.querySelector('.form__button');
    this.form = this.domElement.querySelector('.form');
    this.form.addEventListener('keyup', this._validateInputElement.bind(this));
    this.form.addEventListener('submit', this._validateForm.bind(this));
  }

  _fetch() {
    this.formButton.setAttribute('disabled', 'disabled');
    const email = this.domElement.querySelector('.form__input_email').value;
    const password = this.domElement.querySelector('.form__input_password').value;
    mainApi.userLogin(email, password).then((res) => {
      this.formButton.removeAttribute('disabled');
      if (res.statusCode) {
        this.responseError.textContent = res.message;
      } else {
        document.location.reload(true);
      }
    });
  }

  _createDomElement() {
    const domElement = document.createElement('div');
    domElement.innerHTML = `
    <form name="formLogin" class="form form__login" novalidate>
    <label for="formLoginEmail" class="form__label">Email</label>
    <input type="text" id="formLoginEmail" name="formLoginEmail" class="form__input form__input_email form-element" placeholder="Введите почту">
    <p class="form__input_error"></p>
    <label for="formLoginPassword" class="form__label">Пароль</label>
    <input type="password" id="formLoginPassword" name="formLoginPassword" class="form__input form__input_password form-element" placeholder="Введите пароль">
    <p class="form__input_error"></p>
    <p class="form__input_response-error"></p>
    <button class="form__button form-element" type="submit">Войти</button>
    </form>
    <p class="form__footer">
      или
      <button class="form__footer_link form__footer_link_reg">Зарегистрироваться</button>
    </p>
  `;
    return domElement;
  }
}
