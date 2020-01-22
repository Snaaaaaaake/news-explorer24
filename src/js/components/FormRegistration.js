import Form from './Form';
import mainApi from '../api/MainApi';

export default class FormRegistration extends Form {
  constructor() {
    super();
    this.domElement = this._createDomElement();
    this.responseLink = this._createResponseLink();
    this.responseError = this.domElement.querySelector('.form__input_response-error');
    this.formButton = this.domElement.querySelector('.form__button');
    this.form = this.domElement.querySelector('.form');
    this.form.addEventListener('keyup', this._validateInputElement.bind(this));
    this.form.addEventListener('submit', this._validateForm.bind(this));
  }

  setLinkHandler(handler) {
    super.setLinkHandler(handler);
    this.responseLink.addEventListener('click', this.linkHandler);
  }

  _fetch() {
    this.formButton.setAttribute('disabled', 'disabled');
    const name = this.domElement.querySelector('.form__input_name').value;
    const email = this.domElement.querySelector('.form__input_email').value;
    const password = this.domElement.querySelector('.form__input_password').value;
    mainApi.userCreate(name, email, password).then((res) => {
      this.formButton.removeAttribute('disabled');
      if (res.statusCode) {
        this.responseError.textContent = res.message;
      } else {
        this._responceMethod({ title: 'Пользователь успешно зарегистрирован!', responseElement: this.responseLink });
      }
    });
  }

  _createDomElement() {
    const domElement = document.createElement('div');
    domElement.innerHTML = `
    <form name="popupRegistration" class="form form__registration" novalidate>
      <label for="popupRegistrationEmail" class="form__label">Email</label>
      <input type="text" id="popupRegistrationEmail" name="popupRegistrationEmail" class="form__input form__input_email" placeholder="Введите почту">
      <p class="form__input_error"></p>
      <label for="popupRegistrationPassword" class="form__label">Пароль</label>
      <input type="password" id="popupRegistrationPassword" name="popupRegistrationPassword" class="form__input form__input_password" placeholder="Введите пароль">
      <p class="form__input_error"></p>
      <label for="popupRegistrationName" class="form__label">Имя</label>
      <input type="text" id="popupRegistrationName" name="popupRegistrationName" class="form__input form__input_name" placeholder="Введите своё имя">
      <p class="form__input_error"></p>
      <p class="form__input_response-error"></p>
      <button class="form__button" type="submit">Зарегистрироваться</button>
    </form>
    <p class="form__footer">
      или
      <a href="#" class="form__footer_link form__footer_link_login">Войти</a>
    </p>
  `;
    return domElement;
  }

  _createResponseLink() {
    const responseLink = document.createElement('a');
    responseLink.classList.add('form__footer_link');
    responseLink.classList.add('form__footer_responce-link');
    responseLink.setAttribute('href', '#');
    responseLink.textContent = 'Выполнить вход';
    return responseLink;
  }
}
