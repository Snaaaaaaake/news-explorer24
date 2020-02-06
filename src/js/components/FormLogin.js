import Form from './Form';
import mainApi from '../api/MainApi';
import createSingleDomElement from '../utils/createSingleDomElement';

export default class FormLogin extends Form {
  constructor() {
    super();
    this._footerLink = this.domElement.querySelector('.form__footer_link_reg');
  }

  _fetch() {
    this._formButton.setAttribute('disabled', 'disabled');
    mainApi.userLogin(this._emailInput.value, this._passwordInput.value).then((res) => {
      this._formButton.removeAttribute('disabled');
      if (res.statusCode) {
        // Если есть статус ошибки, значит выводим сообщение об ошибке
        this._responseError.textContent = res.message;
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
          { name: 'autocomplete', value: 'username' },
          { name: 'name', value: 'formLoginEmail' },
          { name: 'placeholder', value: 'Введите почту' },
        ]),
        createSingleDomElement('p', 'form__input_error'),
        createSingleDomElement('label', 'form__label', 'Пароль', { name: 'for', value: 'formLoginPassword' }),
        createSingleDomElement('input', ['form__input', 'form__input_password', 'form-element'], '', [
          { name: 'id', value: 'formLoginPassword' },
          { name: 'type', value: 'password' },
          { name: 'autocomplete', value: 'current-password' },
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
