import SearchResults from './SearchResults';

export default class FavoritesCardList extends SearchResults {
  constructor(parentElement) {
    super(parentElement);
    this._modifyDomElement();
  }

  _modifyDomElement() {
    this._domElement.classList.remove('element_disabled');
    this._domElement.querySelector('.search-results__error_subtitle').classList.add('element_disabled');
    this._domElement.querySelector('.search-results__error_title').textContent = 'Вы ещё не добавили в избранное ни одной статьи';
  }

  render(articleCardsArray) {
    this._searchResiltsPreloader.classList.add('element_disabled');
    this._searchResiltsError.classList.add('element_disabled');
    this._searchResiltsContainer.classList.remove('element_disabled');
    articleCardsArray.forEach((card) => {
      this._searchResiltsContent.appendChild(card.domElement);
    });
  }
}
