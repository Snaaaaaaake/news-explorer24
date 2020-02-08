import Form from './Form';
import elementsConstructor from '../../js/utils/elementsConstructor';

export default class FormLogin extends Form {
  constructor(mainApi) {
    super(mainApi);
    this._footerLink = this.domElement.querySelector('.form__footer_link_reg');
  }

  _fetch() {
    this._formButton.setAttribute('disabled', 'disabled');
    this._mainApi.userLogin(this._emailInput.value, this._passwordInput.value).then((res) => {
      this._formButton.removeAttribute('disabled');
      // Если есть статус ошибки, значит выводим сообщение об ошибке
      if (res.statusCode) {
        this._responseError.textContent = res.message;
      } else {
        document.location.reload(true);
      }
    });
  }

  _createDomElement() {
    const domElement = elementsConstructor('div', 'form__container', [
      elementsConstructor('form', ['form', 'form__login'], [
        elementsConstructor('label', 'form__label', 'Email', { name: 'for', value: 'formLoginEmail' }),
        elementsConstructor('input', ['form__input', 'form__input_email', 'form-element'], '', [
          { name: 'id', value: 'formLoginEmail' },
          { name: 'type', value: 'text' },
          { name: 'autocomplete', value: 'username' },
          { name: 'name', value: 'formLoginEmail' },
          { name: 'placeholder', value: 'Введите почту' },
        ]),
        elementsConstructor('p', 'form__input_error'),
        elementsConstructor('label', 'form__label', 'Пароль', { name: 'for', value: 'formLoginPassword' }),
        elementsConstructor('input', ['form__input', 'form__input_password', 'form-element'], '', [
          { name: 'id', value: 'formLoginPassword' },
          { name: 'type', value: 'password' },
          { name: 'autocomplete', value: 'current-password' },
          { name: 'name', value: 'formLoginPassword' },
          { name: 'placeholder', value: 'Введите пароль' },
        ]),
        elementsConstructor('p', 'form__input_error'),
        elementsConstructor('p', 'form__input_response-error'),
        elementsConstructor('button', ['form__button', 'form-element'], 'Войти', { name: 'type', value: 'submit' }),
      ], [
        { name: 'name', value: 'formLogin' },
        { name: 'novalidate', value: true },
      ]),
      elementsConstructor('p', 'form__footer', [
        elementsConstructor('span', 'form__footer_span', 'или '),
        elementsConstructor('button', ['form__footer_link', 'form__footer_link_reg'], 'Зарегистрироваться'),
      ]),
    ]);
    return domElement;
  }
}
