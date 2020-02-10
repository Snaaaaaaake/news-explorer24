import elementsConstructor from '../../js/utils/elementsConstructor';
import BaseComponent from '../../js/components/BaseComponent';
import mainPageLink from '../../js/constants/mainPageLink';

const errorIcon = require('../../images/search-results__error_icon.png').default;

export default class SearchResults extends BaseComponent {
  constructor(parentElement) {
    super(parentElement);
    this._searchResiltsContainer = this._domElement.querySelector('.search-results__main-container');
    this._searchResiltsContent = this._domElement.querySelector('.search-results__content');
    this._searchResiltsPreloader = this._domElement.querySelector('.search-results__preloader');
    this._searchResiltsError = this._domElement.querySelector('.search-results__error');
  }

  _createDomElement() {
    const domElement = elementsConstructor('div', ['search-results__container', 'width-corrector', 'element_disabled'], [
      elementsConstructor('div', 'search-results__main-container', [
        elementsConstructor('div', 'search-results__content'),
      ]),
      elementsConstructor('div', 'search-results__preloader', [
        elementsConstructor('div', 'preloader'),
        elementsConstructor('p', 'preloader_text', 'Идет поиск новостей...'),
      ]),
      elementsConstructor('div', ['search-results__error', 'element_disabled'], [
        elementsConstructor('img', 'search-results__error', '', [
          { name: 'alt', value: 'Ничего не найдено' },
          { name: 'src', value: `${mainPageLink}${errorIcon}` },
        ]),
        elementsConstructor('h6', 'search-results__error_title', 'Ничего не найдено'),
        elementsConstructor('p', 'search-results__error_subtitle', 'К сожалению по вашему запросу ничего не найдено.'),
      ]),
    ]);
    return domElement;
  }

  renderError() {
    this._searchResiltsPreloader.classList.add('element_disabled');
    this._searchResiltsContainer.classList.add('element_disabled');
    this._searchResiltsError.classList.remove('element_disabled');
  }

  renderLoader() {
    this._domElement.classList.remove('element_disabled');
    this._searchResiltsPreloader.classList.remove('element_disabled');
    this._searchResiltsContainer.classList.add('element_disabled');
    this._searchResiltsError.classList.add('element_disabled');
  }

  _clearResults() {
    while (this._searchResiltsContent.firstChild) {
      this._searchResiltsContent.removeChild(this._searchResiltsContent.firstChild);
    }
  }
}
