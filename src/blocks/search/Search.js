import elementsConstructor from '../../js/utils/elementsConstructor';

export default class Search {
  constructor(parentElement) {
    this._domElement = this._createDomElement();
    parentElement.appendChild(this._domElement);
    this.form = this._domElement.querySelector('.search__form');
    this.keywordInput = this._domElement.querySelector('.search__input');
  }

  _createDomElement() {
    const domElement = elementsConstructor('div', 'search__container', [
      elementsConstructor('h1', 'search__main-title', 'Что в мире творится?'),
      elementsConstructor('p', 'search__main-subtitle', 'Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.'),
      elementsConstructor('form', 'search__form', [
        elementsConstructor('input', ['search__input', 'form-element'], '', [
          { name: 'required', value: true },
          { name: 'minlength', value: '2' },
          { name: 'type', value: 'search' },
          { name: 'placeholder', value: 'Введите тему новости' },
        ]),
        elementsConstructor('button', ['search__submit', 'form-element'], 'Поиск', { name: 'type', value: 'submit' }),
      ]),
    ]);
    return domElement;
  }
}
