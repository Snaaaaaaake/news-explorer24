import articleFavoriteIcon from './articleFavoriteIcon';
import articleDeleteIcon from './articleDeleteIcon';
import elementsConstructor from '../../js/utils/elementsConstructor';
import errorHandler from '../../js/utils/errorHandler';

const moment = require('moment');

moment().format();
moment.locale('ru');

export default class ArticleCard {
  constructor(mainApi, data, isUserLoggedIn, keyword) {
    this._mainApi = mainApi;
    this._title = data.title;
    this._description = data.description;
    this._date = data.publishedAt || data.date;
    this._source = data.source.name || data.source;
    this._image = data.urlToImage || data.image;
    this._url = data.url;
    this._id = data._id || null;
    this.keyword = keyword || data.keyword;
    this.domElement = this._createDomElement();
    this._eventListeners = this._getEventListeners();
    this._keywordContainer = this.domElement.querySelector('.article__keyword');
    this._keywordContainer.textContent = this.keyword;
    this._favoritesButton = this.domElement.querySelector('.article__favorites-button');
    this._helpContainer = this.domElement.querySelector('.article__help');
    this._reloadCardListFunction = null;
    if (isUserLoggedIn) {
      // Определяем, на какой странице мы нахоодимся и рендерим нужные кнопки
      if (this._id) {
        this._renderDeleteButton();
        this._keywordContainer.classList.remove('element-disabled');
        this._helpContainer.textContent = 'Удалить статью';
      } else {
        this._renderAddButton();
        this._helpContainer.textContent = 'Сохранить статью';
      }
    }
  }

  _createDomElement() {
    const domElement = elementsConstructor('article', 'article', [
      elementsConstructor('div', ['article__favorites-button', 'article__svg-icon-container'], articleFavoriteIcon.cloneNode(true)),
      elementsConstructor('div', ['article__keyword', 'element-disabled'], '', { name: 'title', value: 'Ключевое слово данной статьи' }),
      elementsConstructor('div', 'article__help', 'Войдите, чтобы сохранять статьи'),
      elementsConstructor('div', 'article__picture', '', { name: 'style', value: `background: url(${encodeURI(this._image)}) center no-repeat; background-size: cover;` }),
      elementsConstructor('div', 'article__information', [
        elementsConstructor('a', 'article__link', [
          elementsConstructor('div', 'article__information-block', [
            elementsConstructor('time', 'article__date', moment(this._date).format('LL'), { name: 'datetime', value: 'this._date' }),
            elementsConstructor('h5', 'article__title', this._title),
            elementsConstructor('p', 'article__description', this._description),
          ]),
          elementsConstructor('p', 'article__source', this._source),
        ], [
          { name: 'href', value: encodeURI(this._url) },
          { name: 'target', value: '_blank' },
          { name: 'title', value: 'Читать полную версию статьи' },
        ]),
      ]),
    ]);
    return domElement;
  }

  _renderAddButton() {
    this._clearFavoritesButton();
    this._favoritesButton.appendChild(articleFavoriteIcon.cloneNode(true));
    this._favoritesButton.addEventListener('click', this._eventListeners.add);
  }

  _renderDeleteButton() {
    this._clearFavoritesButton();
    this._favoritesButton.appendChild(articleDeleteIcon.cloneNode(true));
    this._favoritesButton.addEventListener('click', this._eventListeners.del);
  }

  _renderDeleteBlueButton() {
    this._clearFavoritesButton();
    this._favoritesButton.appendChild(articleFavoriteIcon.cloneNode(true));
    this._favoritesButton.querySelector('.article__svg-icon').classList.add('article__svg-icon_blue');
    this._favoritesButton.addEventListener('click', this._eventListeners.delFromBlueState);
  }

  _clearFavoritesButton() {
    this._favoritesButton.removeChild(this._favoritesButton.firstChild);
    Object.values(this._eventListeners).forEach((item) => {
      this._favoritesButton.removeEventListener('click', item);
    });
  }

  _getEventListeners() {
    const add = function () {
      this._mainApi.addArticle(
        this.keyword,
        this._title,
        this._description,
        this._date,
        this._source,
        this._url,
        this._image,
      )
        .then((res) => {
          this._helpContainer.textContent = 'Статья сохранена';
          this._renderDeleteBlueButton();
          this._id = res.id;
        })
        .catch((err) => errorHandler(err, this._helpContainer));
    }.bind(this);

    const del = function () {
      this._mainApi.deleteArticle(this._id)
        .then(() => {
          this.domElement.classList.add('element-disabled');
          this._reloadCardListFunction();
        })
        .catch((err) => errorHandler(err, this._helpContainer));
    }.bind(this);

    const delFromBlueState = function () {
      this._mainApi.deleteArticle(this._id)
        .then(() => {
          this._helpContainer.textContent = 'Статья удалена';
          this._renderAddButton();
        })
        .catch((err) => errorHandler(err, this._helpContainer));
    }.bind(this);

    return { add, del, delFromBlueState };
  }

  setReloadCardListFunction(func) {
    this._reloadCardListFunction = func;
  }
}
