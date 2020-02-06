import Form from './Form';
import mainApi from '../api/MainApi';
import createSingleDomElement from '../utils/createSingleDomElement';

export default class FormRegistration extends Form {
  constructor() {
    super();
    this._responseLink = createSingleDomElement('button', ['form__footer_link', 'form__footer_responce-link'], 'Выполнить вход');
    this._footerLink = this.domElement.querySelector('.form__footer_link_login');
    this._nameInput = this.domElement.querySelector('.form__input_name');
    this._responseMethod = null;
  }

  setLinkHandler(handler) {
    super.setLinkHandler(handler);
    this._responseLink.addEventListener('click', this._linkHandler);
  }

  setResponseMethod(method) {
    this._responseMethod = method;
  }

  _fetch() {
    this._formButton.setAttribute('disabled', 'disabled');
    mainApi.userCreate(this._nameInput.value, this._emailInput.value, this._passwordInput.value)
      .then((res) => {
        this._formButton.removeAttribute('disabled');
        if (res.statusCode) {
          // Если есть статус ошибки, значит выводим сообщение об ошибке
          this._responseError.textContent = res.message;
        } else {
          this._responseMethod({ title: 'Пользователь успешно зарегистрирован!', responseElement: this._responseLink });
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
