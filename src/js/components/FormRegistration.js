import Form from './Form';
import mainApi from '../api/MainApi';
import createSingleDomElement from '../utils/createSingleDomElement';

export default class FormRegistration extends Form {
  constructor() {
    super();
    this.domElement = this._createDomElement();
    this.responseLink = createSingleDomElement('button', ['form__footer_link', 'form__footer_responce-link'], 'Выполнить вход');
    this.responseError = this.domElement.querySelector('.form__input_response-error');
    this.footerLink = this.domElement.querySelector('.form__footer_link_login');
    this.formButton = this.domElement.querySelector('.form__button');
    this.emailInput = this.domElement.querySelector('.form__input_email');
    this.passwordInput = this.domElement.querySelector('.form__input_password');
    this.nameInput = this.domElement.querySelector('.form__input_name');
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
    mainApi.userCreate(this.nameInput.value, this.emailInput.value, this.passwordInput.value)
      .then((res) => {
        this.formButton.removeAttribute('disabled');
        if (res.statusCode) {
          this.responseError.textContent = res.message;
        } else {
          this.responseMethod({ title: 'Пользователь успешно зарегистрирован!', responseElement: this.responseLink });
        }
      });
  }

  _createDomElement() {
    const domElement = createSingleDomElement('div', 'form__container', [
      createSingleDomElement('form', ['form', 'form__registration'], [
        createSingleDomElement('label', 'form__label', 'Email', { name: 'for', value: 'formRegistrationEmail' }),
        createSingleDomElement('input', ['form__input', 'form__input_email', 'form-element'], '', [
          { name: 'id', value: 'formRegistrationEmail' },
          { name: 'type', value: 'text' },
          { name: 'name', value: 'formRegistrationEmail' },
          { name: 'placeholder', value: 'Введите почту' },
        ]),
        createSingleDomElement('p', 'form__input_error'),
        createSingleDomElement('label', 'form__label', 'Пароль', { name: 'for', value: 'formRegistrationPassword' }),
        createSingleDomElement('input', ['form__input', 'form__input_password', 'form-element'], '', [
          { name: 'id', value: 'formRegistrationPassword' },
          { name: 'type', value: 'password' },
          { name: 'name', value: 'formRegistrationPassword' },
          { name: 'placeholder', value: 'Введите пароль' },
        ]),
        createSingleDomElement('p', 'form__input_error'),
        createSingleDomElement('label', 'form__label', 'Имя', { name: 'for', value: 'formRegistrationName' }),
        createSingleDomElement('input', ['form__input', 'form__input_name', 'form-element'], '', [
          { name: 'id', value: 'formRegistrationName' },
          { name: 'type', value: 'text' },
          { name: 'name', value: 'formRegistrationName' },
          { name: 'placeholder', value: 'Введите своё имя' },
        ]),
        createSingleDomElement('p', 'form__input_error'),
        createSingleDomElement('p', 'form__input_response-error'),
        createSingleDomElement('button', ['form__button', 'form-element'], 'Войти', { name: 'type', value: 'submit' }),
      ], [
        { name: 'name', value: 'formRegistration' },
        { name: 'novalidate', value: true },
      ]),
      createSingleDomElement('p', 'form__footer', [
        createSingleDomElement('span', 'form__footer_span', 'или '),
        createSingleDomElement('button', ['form__footer_link', 'form__footer_link_login'], 'Войти'),
      ]),
    ]);
    return domElement;
  }
}
