import SearchResults from './SearchResults';
import elementsConstructor from '../../js/utils/elementsConstructor';

export default class ArticleCardList extends SearchResults {
  constructor(parentElement) {
    super(parentElement);
    this._modifyDomElement();
    this._articleCardsArray = [];
    this._addMoreButton = this._domElement.querySelector('.search-results__more-button');
    this._addMoreButton.addEventListener('click', (event) => {
      event.preventDefault();
      this._renderResults();
    });
  }

  _modifyDomElement() {
    this._searchResiltsContainer.prepend(elementsConstructor('h2', 'search-results__title', 'Результаты поиска'));
    this._searchResiltsContainer.appendChild(elementsConstructor('div', 'search-results__more-container', [
      elementsConstructor('buttom', 'search-results__more-button', 'Показать еще', { name: 'title', value: 'Загрузить ещё результаты' }),
    ]));
  }

  _clearResults() {
    super._clearResults();
    this._articleCardsArray = [];
  }

  _renderResults() {
    this._searchResiltsPreloader.classList.add('element_disabled');
    this._searchResiltsContainer.classList.remove('element_disabled');
    this._searchResiltsError.classList.add('element_disabled');
    this._addMoreButton.classList.remove('element_disabled');
    for (let i = 0; i < 3; i += 1) {
      if (this._articleCardsArray.length > 0) {
        this._searchResiltsContent.appendChild(this._articleCardsArray[0].domElement);
        this._articleCardsArray.shift();
      }
    }
    if (this._articleCardsArray.length === 0) {
      this._addMoreButton.classList.add('element_disabled');
    }
  }

  addCards(articleCardsArray) {
    this._clearResults();
    this._articleCardsArray = articleCardsArray;
    this._renderResults();
  }
}
