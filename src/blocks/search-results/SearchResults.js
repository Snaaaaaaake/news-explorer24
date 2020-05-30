import elementsConstructor from '../../js/utils/elementsConstructor';
import BaseComponent from '../../js/components/BaseComponent';
import mainPageLink from '../../js/constants/mainPageLink';

const errorIcon = require('../../images/search-results__error-icon.png').default;

export default class SearchResults extends BaseComponent {
  constructor(parentElement) {
    super(parentElement);
    this._searchResiltsContainer = this._domElement.querySelector('.search-results__main-container');
    this._searchResiltsContent = this._domElement.querySelector('.search-results__content');
    this._searchResiltsPreloader = this._domElement.querySelector('.search-results__preloader');
    this._searchResiltsError = this._domElement.querySelector('.search-results__error');
    this._searchResiltsErrorTitleContainer = this._domElement.querySelector('.search-results__error-title');
    this._searchResiltsErrorSubtitleContainer = this._domElement.querySelector('.search-results__error-subtitle');
    // Нужно для errorHandler
    this.renderError = this.renderError.bind(this);
  }

  _createDomElement() {
    const domElement = elementsConstructor('div', ['search-results__container', 'width-corrector', 'element-disabled'], [
      elementsConstructor('div', 'search-results__main-container', [
        elementsConstructor('div', 'search-results__content'),
      ]),
      elementsConstructor('div', 'search-results__preloader', [
        elementsConstructor('div', 'preloader'),
        elementsConstructor('p', 'preloader_text', 'Идет поиск новостей...'),
      ]),
      elementsConstructor('div', ['search-results__error', 'element-disabled'], [
        elementsConstructor('img', 'search-results__error', '', [
          { name: 'alt', value: 'Ничего не найдено' },
          { name: 'src', value: `${mainPageLink}${errorIcon}` },
        ]),
        elementsConstructor('h6', 'search-results__error-title', 'Ничего не найдено'),
        elementsConstructor('p', 'search-results__error-subtitle', 'К сожалению по вашему запросу ничего не найдено.'),
      ]),
    ]);
    return domElement;
  }

  renderError(err) {
    this._searchResiltsPreloader.classList.add('element-disabled');
    this._searchResiltsContainer.classList.add('element-disabled');
    this._searchResiltsError.classList.remove('element-disabled');
    if (err) {
      this._searchResiltsErrorTitleContainer.textContent = 'Произошла ошибка';
      this._searchResiltsErrorSubtitleContainer.textContent = err;
    } else {
      this._searchResiltsErrorTitleContainer.textContent = this._errorTitle;
      this._searchResiltsErrorSubtitleContainer.textContent = this._errorSubtitle;
    }
  }

  renderLoader() {
    this._domElement.classList.remove('element-disabled');
    this._searchResiltsPreloader.classList.remove('element-disabled');
    this._searchResiltsContainer.classList.add('element-disabled');
    this._searchResiltsError.classList.add('element-disabled');
  }

  _clearResults() {
    while (this._searchResiltsContent.firstChild) {
      this._searchResiltsContent.removeChild(this._searchResiltsContent.firstChild);
    }
  }
}
