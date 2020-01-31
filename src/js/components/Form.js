import inputValidation from '../utils/inputValidation';

export default class Form {
  clear() {
    this.formButton.removeAttribute('disabled');
    this.form.querySelectorAll('.form__input').forEach((i) => { i.value = ''; });
    this.form.querySelectorAll('.form__input_error').forEach((i) => { i.textContent = ''; });
    this.responseError.textContent = '';
    this.form.querySelector('.form__button').classList.remove('form__button_is-active');
  }

  setLinkHandler(handler) {
    this.linkHandler = handler;
    this.domElement.querySelector('.form__footer_link').addEventListener('click', this.linkHandler);
  }

  setResponseMethod(method) {
    this.responseMethod = method;
  }

  _validateInputElement(event) {
    // Обработка отдельного инпута при нажатии клавиатуры с выводом ошибки
    if (event.target.classList.contains('form__input')) {
      const { isValid, message } = inputValidation(event.target);
      const errorContainer = event.target.nextSibling.nextSibling;
      if (!isValid) {
        errorContainer.textContent = message;
      } else {
        errorContainer.textContent = '';
      }
    }
    // Обработка всех инпутов для валидации кнопки
    const inputs = this.form.querySelectorAll('.form__input');
    if (Array.from(inputs).every((i) => inputValidation(i).isValid)) {
      this.form.querySelector('.form__button').classList.add('form__button_is-active');
    }
  }

  _validateForm(event) {
    event.preventDefault();
    let counter = 0;
    const inputs = this.form.querySelectorAll('.form__input');
    inputs.forEach((item) => {
      const { isValid, message } = inputValidation(item);
      const errorContainer = item.nextSibling.nextSibling;
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

  _fetch() {
    console.log(this.domElement);
  }

  _responceMethod(data) {
    this.responseMethod(data);
  }
}
