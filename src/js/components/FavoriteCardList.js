export default class FavoriteCardList {
  constructor(domElement, infoContainer) {
    this.domElement = domElement;
    this.searchResiltsContainer = this.domElement.querySelector('.search-results__container');
    this.searchResiltsContent = this.domElement.querySelector('.search-results__content');
    this.searchResiltsPreloader = this.domElement.querySelector('.search-results__preloader');
    this.searchResiltsError = this.domElement.querySelector('.search-results__error');
    this.keysContainer = infoContainer.querySelector('.favorites__keywords');
    this.favoritesSumContainer = infoContainer.querySelector('.favorites__sum');
    this.keysArray = [];
    this.popularityArray = [];
  }

  addCards(newsCardsArray) {
    // Добавляем карточки
    this.searchResiltsPreloader.classList.add('element_disabled');
    this.searchResiltsError.classList.add('element_disabled');
    this.searchResiltsContainer.classList.remove('element_disabled');
    newsCardsArray.forEach((card) => {
      this.keysArray.push(card.keyword);
      this.searchResiltsContent.appendChild(card.domElement);
    });

    // Вычисляем популярность ключевых слов
    this.keysArray.forEach((key) => {
      const exist = this.popularityArray.findIndex((item) => item.name === key);
      if (exist >= 0) {
        this.popularityArray[exist].sum += 1;
      } else {
        this.popularityArray.push({ name: key, sum: 1 });
      }
    });
    this.popularityArray.sort((a, b) => b.sum - a.sum);

    // Рендерим ключи
    this.keysContainer.textContent = '';
    if (this.popularityArray.length <= 3) {
      this.popularityArray.forEach((item, index, array) => {
        this._createKeywordElement(item.name);
        switch (array.length - (index + 1)) {
          case 0:
            break;
          case 1:
            this._createSeparatorElement(' и ');
            break;
          default:
            this._createSeparatorElement(', ');
        }
      });
    } else {
      this._createKeywordElement(this.popularityArray[0].name);
      this._createSeparatorElement(', ');
      this._createKeywordElement(this.popularityArray[1].name);
      this._createSeparatorElement(' и ');
      this._createKeywordElement(`${this.popularityArray.length - 2} других`);
    }

    // Рендерим количество статей у пользователя
    const favoritesSum = newsCardsArray.length;
    const lastNuber = Number.parseInt(favoritesSum.toString().slice(-1), 10);
    if (lastNuber === 1) {
      this.favoritesSumContainer.textContent = `${favoritesSum} сохранённая статья`;
    } else if (lastNuber > 1 && lastNuber < 5) {
      this.favoritesSumContainer.textContent = `${favoritesSum} сохранённых статьи`;
    } else {
      this.favoritesSumContainer.textContent = `${favoritesSum} сохранённых статей`;
    }
  }

  _createKeywordElement(key) {
    const createdElement = document.createElement('strong');
    createdElement.textContent = key[0].toUpperCase() + key.slice(1);
    this.keysContainer.appendChild(createdElement);
  }

  _createSeparatorElement(separator) {
    const createdElement = document.createElement('span');
    createdElement.textContent = separator;
    this.keysContainer.appendChild(createdElement);
  }

  renderError() {
    this.searchResiltsPreloader.classList.add('element_disabled');
    this.searchResiltsContainer.classList.add('element_disabled');
    this.searchResiltsError.classList.remove('element_disabled');
  }
}
