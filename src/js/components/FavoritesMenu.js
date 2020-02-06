export default class FavoritesMenu {
  constructor(domElement) {
    this._domElement = domElement;
    this._keysContainer = this._domElement.querySelector('.favorites__keywords');
    this._favoritesSumContainer = this._domElement.querySelector('.favorites__sum');
    this._keysArray = [];
    this._popularityArray = [];
  }

  render(newsCardsArray) {
    // Собираем массив всех ключевых слов
    newsCardsArray.forEach((card) => {
      this._keysArray.push(card.keyword);
    });

    // Вычисляем популярность ключевых слов
    this._keysArray.forEach((key) => {
      const exist = this._popularityArray.findIndex((item) => item.name === key);
      if (exist >= 0) {
        this._popularityArray[exist].sum += 1;
      } else {
        this._popularityArray.push({ name: key, sum: 1 });
      }
    });
    this._popularityArray.sort((a, b) => b.sum - a.sum);

    // Рендерим ключи
    this._keysContainer.textContent = '';
    if (this._popularityArray.length <= 3) {
      this._popularityArray.forEach((item, index, array) => {
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
      this._createKeywordElement(this._popularityArray[0].name);
      this._createSeparatorElement(', ');
      this._createKeywordElement(this._popularityArray[1].name);
      this._createSeparatorElement(' и ');
      this._createKeywordElement(`${this._popularityArray.length - 2} других`);
    }

    // Рендерим количество статей у пользователя
    const favoritesSum = newsCardsArray.length;
    const lastNuber = Number.parseInt(favoritesSum.toString().slice(-1), 10);
    if (lastNuber === 1) {
      this._favoritesSumContainer.textContent = `${favoritesSum} сохранённая статья`;
    } else if (lastNuber > 1 && lastNuber < 5) {
      this._favoritesSumContainer.textContent = `${favoritesSum} сохранённых статьи`;
    } else {
      this._favoritesSumContainer.textContent = `${favoritesSum} сохранённых статей`;
    }
  }

  _createKeywordElement(key) {
    const createdElement = document.createElement('strong');
    createdElement.textContent = key[0].toUpperCase() + key.slice(1);
    this._keysContainer.appendChild(createdElement);
  }

  _createSeparatorElement(separator) {
    const createdElement = document.createElement('span');
    createdElement.textContent = separator;
    this._keysContainer.appendChild(createdElement);
  }
}
