export default class FavoriteCardList {
  constructor(domElement) {
    this.domElement = domElement;
    this.searchResiltsContainer = this.domElement.querySelector('.search-results__container');
    this.searchResiltsContent = this.domElement.querySelector('.search-results__content');
    this.searchResiltsPreloader = this.domElement.querySelector('.search-results__preloader');
    this.searchResiltsError = this.domElement.querySelector('.search-results__error');
  }

  addCards(newsCardsArray) {
    this.searchResiltsPreloader.classList.add('element_disabled');
    this.searchResiltsError.classList.add('element_disabled');
    this.searchResiltsContainer.classList.remove('element_disabled');
    newsCardsArray.forEach((card) => {
      this.searchResiltsContent.appendChild(card.domElement);
    });
  }

  renderError() {
    this.searchResiltsPreloader.classList.add('element_disabled');
    this.searchResiltsContainer.classList.add('element_disabled');
    this.searchResiltsError.classList.remove('element_disabled');
  }
}
