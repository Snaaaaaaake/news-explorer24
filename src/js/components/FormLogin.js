import Form from './Form';
import mainApi from '../api/MainApi';
import createSingleDomElement from '../utils/createSingleDomElement';

export default class FormLogin extends Form {
  constructor() {
    super();
    this.domElement = this._createDomElement();
    this.responseError = this.domElement.querySelector('.form__input_response-error');
    this.footerLink = this.domElement.querySelector('.form__footer_link_reg');
    this.formButton = this.domElement.querySelector('.form__button');
    this.emailInput = this.domElement.querySelector('.form__input_email');
    this.passwordInput = this.domElement.querySelector('.form__input_password');
    this.form = this.domElement.querySelector('.form');
    this.form.addEventListener('keyup', this._validateInputElement.bind(this));
    this.form.addEventListener('submit', this._validateForm.bind(this));
  }

  _fetch() {
    this.formButton.setAttribute('disabled', 'disabled');
    mainApi.userLogin(this.emailInput.value, this.passwordInput.value).then((res) => {
      this.formButton.removeAttribute('disabled');
      if (res.statusCode) {
        this.responseError.textContent = res.message;
      } else {
        document.location.reload(true);
      }
    });
  }

  _createDomElement() {
    const domElement = createSingleDomElement('div', 'form__container', [
      createSingleDomElement('form', ['form', 'form__login'], [
        createSingleDomElement('label', 'form__label', 'Email', { name: 'for', value: 'formLoginEmail' }),
        createSingleDomElement('input', ['form__input', 'form__input_email', 'form-element'], '', [
          { name: 'id', value: 'formLoginEmail' },
          { name: 'type', value: 'text' },
          { name: 'name', value: 'formLoginEmail' },
          { name: 'placeholder', value: 'Введите почту' },
        ]),
        createSingleDomElement('p', 'form__input_error'),
        createSingleDomElement('label', 'form__label', 'Пароль', { name: 'for', value: 'formLoginPassword' }),
        createSingleDomElement('input', ['form__input', 'form__input_password', 'form-element'], '', [
          { name: 'id', value: 'formLoginPassword' },
          { name: 'type', value: 'password' },
          { name: 'name', value: 'formLoginPassword' },
          { name: 'placeholder', value: 'Введите пароль' },
        ]),
        createSingleDomElement('p', 'form__input_error'),
        createSingleDomElement('p', 'form__input_response-error'),
        createSingleDomElement('button', ['form__button', 'form-element'], 'Войти', { name: 'type', value: 'submit' }),
      ], [
        { name: 'name', value: 'formLogin' },
        { name: 'novalidate', value: true },
      ]),
      createSingleDomElement('p', 'form__footer', [
        createSingleDomElement('span', 'form__footer_span', 'или '),
        createSingleDomElement('button', ['form__footer_link', 'form__footer_link_reg'], 'Зарегистрироваться'),
      ]),
    ]);
    return domElement;
  }
}
