export default class NewsCardList {
  constructor(domElement) {
    this._domElement = domElement;
    this._newsCardsArray = [];
    this._searchResiltsContainer = this._domElement.querySelector('.search-results__container');
    this._searchResiltsContent = this._domElement.querySelector('.search-results__content');
    this._searchResiltsError = this._domElement.querySelector('.search-results__error');
    this._searchResiltsPreloader = this._domElement.querySelector('.search-results__preloader');
    this._addMoreButton = this._domElement.querySelector('.search-results__more-button');
    this._addMoreButton.addEventListener('click', (event) => {
      event.preventDefault();
      this._renderResults();
    });
  }

  _clearResults() {
    this._newsCardsArray = [];
    while (this._searchResiltsContent.firstChild) {
      this._searchResiltsContent.removeChild(this._searchResiltsContent.firstChild);
    }
  }

  _renderResults() {
    this._searchResiltsPreloader.classList.add('element_disabled');
    this._searchResiltsContainer.classList.remove('element_disabled');
    this._searchResiltsError.classList.add('element_disabled');
    this._addMoreButton.classList.remove('element_disabled');
    for (let i = 0; i < 3; i += 1) {
      if (this._newsCardsArray.length > 0) {
        this._searchResiltsContent.appendChild(this._newsCardsArray[0].domElement);
        this._newsCardsArray.shift();
      }
    }
    if (this._newsCardsArray.length === 0) {
      this._addMoreButton.classList.add('element_disabled');
    }
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

  addCards(newsCardsArray) {
    this._clearResults();
    this._newsCardsArray = newsCardsArray;
    this._renderResults();
  }
}
