export default class NewsCardList {
  constructor(domElement) {
    this.newsCardsArray = [];
    this.domElement = domElement;
    this.searchResiltsContainer = this.domElement.querySelector('.search-results__container');
    this.searchResiltsContent = this.domElement.querySelector('.search-results__content');
    this.searchResiltsError = this.domElement.querySelector('.search-results__error');
    this.searchResiltsPreloader = this.domElement.querySelector('.search-results__preloader');
    this.addMoreButton = this.domElement.querySelector('.search-results__more-link');
    this.addMoreButton.addEventListener('click', (event) => {
      event.preventDefault();
      this._renderResults();
    });
  }

  _clearResults() {
    this.newsCardsArray = [];
    while (this.searchResiltsContent.firstChild) {
      this.searchResiltsContent.removeChild(this.searchResiltsContent.firstChild);
    }
  }

  _renderResults() {
    this.searchResiltsPreloader.classList.add('element_disabled');
    this.searchResiltsContainer.classList.remove('element_disabled');
    this.searchResiltsError.classList.add('element_disabled');
    this.addMoreButton.classList.remove('element_disabled');
    for (let i = 0; i < 3; i += 1) {
      if (this.newsCardsArray.length > 0) {
        this.searchResiltsContent.appendChild(this.newsCardsArray[0].domElement);
        this.newsCardsArray.shift();
      }
    }
    if (this.newsCardsArray.length === 0) {
      this.addMoreButton.classList.add('element_disabled');
    }
  }

  renderError() {
    this.searchResiltsPreloader.classList.add('element_disabled');
    this.searchResiltsContainer.classList.add('element_disabled');
    this.searchResiltsError.classList.remove('element_disabled');
  }

  renderLoader() {
    this.domElement.classList.remove('element_disabled');
    this.searchResiltsPreloader.classList.remove('element_disabled');
    this.searchResiltsContainer.classList.add('element_disabled');
    this.searchResiltsError.classList.add('element_disabled');
  }

  addCards(newsCardsArray) {
    this._clearResults();
    this.newsCardsArray = newsCardsArray;
    this._renderResults();
  }
}
