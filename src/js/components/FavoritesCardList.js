export default class FavoritesCardList {
  constructor(domElement) {
    this._domElement = domElement;
    this._searchResiltsContainer = this._domElement.querySelector('.search-results__container');
    this._searchResiltsContent = this._domElement.querySelector('.search-results__content');
    this._searchResiltsPreloader = this._domElement.querySelector('.search-results__preloader');
    this._searchResiltsError = this._domElement.querySelector('.search-results__error');
  }

  render(newsCardsArray) {
    this._searchResiltsPreloader.classList.add('element_disabled');
    this._searchResiltsError.classList.add('element_disabled');
    this._searchResiltsContainer.classList.remove('element_disabled');
    newsCardsArray.forEach((card) => {
      this._searchResiltsContent.appendChild(card.domElement);
    });
  }

  renderError() {
    this._searchResiltsPreloader.classList.add('element_disabled');
    this._searchResiltsContainer.classList.add('element_disabled');
    this._searchResiltsError.classList.remove('element_disabled');
  }
}
