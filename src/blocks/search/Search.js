import elementsConstructor from '../../js/utils/elementsConstructor';
import BaseComponent from '../../js/components/BaseComponent';

export default class Search extends BaseComponent {
  constructor(parentElement) {
    super(parentElement);
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
