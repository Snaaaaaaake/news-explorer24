import inputValidation from '../../js/utils/inputValidation';

export default class Form {
  constructor() {
    this.domElement = this._createDomElement();
    this._responseError = this.domElement.querySelector('.form__input_response-error');
    this._formButton = this.domElement.querySelector('.form__button');
    this._emailInput = this.domElement.querySelector('.form__input_email');
    this._passwordInput = this.domElement.querySelector('.form__input_password');
    this._form = this.domElement.querySelector('.form');
    this._form.addEventListener('keyup', this._validateInputElement.bind(this));
    this._form.addEventListener('submit', this._validateForm.bind(this));
    this._linkHandler = null;
  }

  clear() {
    this._formButton.removeAttribute('disabled');
    this._form.querySelectorAll('.form__input').forEach((i) => { i.value = ''; });
    this._form.querySelectorAll('.form__input_error').forEach((i) => { i.textContent = ''; });
    this._responseError.textContent = '';
    this._formButton.classList.remove('form__button_is-active');
  }

  // После создания зависимых друг от друга экземпляров кслассов,
  // дополнительно связываем их друг с другом, передавая нужные методы
  setLinkHandler(handler) {
    this._linkHandler = handler;
    this._footerLink.addEventListener('click', this._linkHandler);
  }

  _validateInputElement(event) {
    // Обработка отдельного инпута при нажатии клавиатуры с выводом ошибки
    if (event.target.classList.contains('form__input')) {
      const { isValid, message } = inputValidation(event.target);
      const errorContainer = event.target.nextSibling;
      if (!isValid) {
        errorContainer.textContent = message;
      } else {
        errorContainer.textContent = '';
      }
    }
    // Обработка всех инпутов для валидации кнопки
    const inputs = this._form.querySelectorAll('.form__input');
    if (Array.from(inputs).every((i) => inputValidation(i).isValid)) {
      this._formButton.classList.add('form__button_is-active');
    } else {
      this._formButton.classList.remove('form__button_is-active');
    }
  }

  // Валижация по сабмиту
  _validateForm(event) {
    event.preventDefault();
    let counter = 0;
    const inputs = this._form.querySelectorAll('.form__input');
    inputs.forEach((item) => {
      const { isValid, message } = inputValidation(item);
      const errorContainer = item.nextSibling;
      if (!isValid) {
        errorContainer.textContent = message;
      } else {
        errorContainer.textContent = '';
        counter += 1;
      }
    });
    if (counter === inputs.length) {
      this._fetch();
    }
  }
}
