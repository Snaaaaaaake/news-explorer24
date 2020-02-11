import Form from './Form';
import elementsConstructor from '../../js/utils/elementsConstructor';

export default class FormRegistration extends Form {
  constructor(mainApi) {
    super(mainApi);
    this._responseLink = elementsConstructor('button', ['form__footer_link', 'form__footer_responce-link'], 'Выполнить вход');
    this._footerLink = this.domElement.querySelector('.form__footer_link_login');
    this._nameInput = this.domElement.querySelector('.form__input_name');
    this._responseMethod = null;
  }

  setLinkHandler(handler) {
    super.setLinkHandler(handler);
    this._responseLink.addEventListener('click', this._linkHandler);
  }

  // Устанавливаем внешний метод, который будет использован при получении ответа с сервера
  setResponseMethod(method) {
    this._responseMethod = method;
  }

  _fetch() {
    this._disableForm();
    this._mainApi.userCreate(
      this._nameInput.value,
      this._emailInput.value,
      this._passwordInput.value,
    )
      .then((res) => {
        this._enableForm();
        // Если есть статус ошибки, значит выводим сообщение об ошибке
        if (res.statusCode) {
          this._responseError.textContent = res.message;
        } else {
          this._responseMethod({ title: 'Пользователь успешно зарегистрирован!', responseElement: this._responseLink });
        }
      });
  }

  _createDomElement() {
    const domElement = elementsConstructor('div', 'form__container', [
      elementsConstructor('form', ['form', 'form__registration'], [
        elementsConstructor('label', 'form__label', 'Email', { name: 'for', value: 'formRegistrationEmail' }),
        elementsConstructor('input', ['form__input', 'form__input_email', 'form-element'], '', [
          { name: 'id', value: 'formRegistrationEmail' },
          { name: 'type', value: 'text' },
          { name: 'name', value: 'formRegistrationEmail' },
          { name: 'placeholder', value: 'Введите почту' },
        ]),
        elementsConstructor('p', 'form__input_error'),
        elementsConstructor('label', 'form__label', 'Пароль', { name: 'for', value: 'formRegistrationPassword' }),
        elementsConstructor('input', ['form__input', 'form__input_password', 'form-element'], '', [
          { name: 'id', value: 'formRegistrationPassword' },
          { name: 'type', value: 'password' },
          { name: 'name', value: 'formRegistrationPassword' },
          { name: 'placeholder', value: 'Введите пароль' },
        ]),
        elementsConstructor('p', 'form__input_error'),
        elementsConstructor('label', 'form__label', 'Имя', { name: 'for', value: 'formRegistrationName' }),
        elementsConstructor('input', ['form__input', 'form__input_name', 'form-element'], '', [
          { name: 'id', value: 'formRegistrationName' },
          { name: 'type', value: 'text' },
          { name: 'name', value: 'formRegistrationName' },
          { name: 'placeholder', value: 'Введите своё имя' },
        ]),
        elementsConstructor('p', 'form__input_error'),
        elementsConstructor('p', 'form__input_response-error'),
        elementsConstructor('button', ['form__button', 'form-element'], 'Войти', { name: 'type', value: 'submit' }),
      ], [
        { name: 'name', value: 'formRegistration' },
        { name: 'novalidate', value: true },
      ]),
      elementsConstructor('p', 'form__footer', [
        elementsConstructor('span', 'form__footer_span', 'или '),
        elementsConstructor('button', ['form__footer_link', 'form__footer_link_login'], 'Войти'),
      ]),
    ]);
    return domElement;
  }
}
