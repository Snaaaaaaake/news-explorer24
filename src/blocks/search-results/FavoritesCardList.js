import SearchResults from './SearchResults';

export default class FavoritesCardList extends SearchResults {
  constructor(parentElement) {
    super(parentElement);
    this._modifyDomElement();
    this._errorTitle = 'Вы ещё не добавили в избранное ни одной статьи';
    this._errorSubtitle = '';
  }

  _modifyDomElement() {
    this._domElement.classList.remove('element-disabled');
  }

  render(articleCardsArray) {
    this._clearResults();
    this._searchResiltsPreloader.classList.add('element-disabled');
    this._searchResiltsError.classList.add('element-disabled');
    this._searchResiltsContainer.classList.remove('element-disabled');
    articleCardsArray.forEach((card) => {
      this._searchResiltsContent.appendChild(card.domElement);
    });
  }
}
