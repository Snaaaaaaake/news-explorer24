import mainApi from '../api/MainApi';
import articleFavoriteIcon from '../constants/articleFavoriteIcon';
import articleDeleteIcon from '../constants/articleDeleteIcon';
import createSingleDomElement from '../utils/createSingleDomElement';

const moment = require('moment');

moment().format();
moment.locale('ru');

export default class NewsCard {
  constructor(data, isUserLoggedIn, keyword) {
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
    if (isUserLoggedIn) {
      // Определяем, на какой странице мы нахоодимся и рендерим нужные кнопки
      if (this._id) {
        this._renderDeleteButton();
        this._keywordContainer.classList.remove('element_disabled');
        this._helpContainer.textContent = 'Удалить статью';
      } else {
        this._renderAddButton();
        this._helpContainer.textContent = 'Сохранить статью';
      }
    }
  }

  _createDomElement() {
    const domElement = createSingleDomElement('article', 'article', [
      createSingleDomElement('div', ['article__favorites-button', 'article__svg-icon_container'], articleFavoriteIcon.cloneNode(true)),
      createSingleDomElement('div', ['article__keyword', 'element_disabled'], '', { name: 'title', value: 'Ключевое слово данной статьи' }),
      createSingleDomElement('div', 'article__help', 'Войдите, чтобы сохранять статьи'),
      createSingleDomElement('div', 'article__picture', '', { name: 'style', value: `background: url(${encodeURI(this._image)}) center no-repeat` }),
      createSingleDomElement('div', 'article__information', [
        createSingleDomElement('a', 'article__link', [
          createSingleDomElement('div', 'article__information_block', [
            createSingleDomElement('time', 'article__date', moment(this._date).format('LL'), { name: 'datetime', value: 'this._date' }),
            createSingleDomElement('h5', 'article__title', this._title),
            createSingleDomElement('p', 'article__description', this._description),
          ]),
          createSingleDomElement('p', 'article__source', this._source),
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
      mainApi.addArticle(
        this.keyword,
        this._title,
        this._description,
        this._date,
        this._source,
        this._url,
        this._image,
      )
        .then((res) => {
          if (res.statusCode === 201) {
            this._helpContainer.textContent = 'Статья сохранена';
            this._renderDeleteBlueButton();
            this._id = res.id;
          } else {
            this._helpContainer.textContent = res.message;
          }
        });
    }.bind(this);

    const del = function () {
      mainApi.deleteArticle(this._id)
        .then((res) => {
          if (res.statusCode === 200) {
            this.domElement.classList.add('element_disabled');
          } else {
            this._helpContainer.textContent = res.message;
          }
        });
    }.bind(this);

    const delFromBlueState = function () {
      mainApi.deleteArticle(this._id)
        .then((res) => {
          if (res.statusCode === 200) {
            this._helpContainer.textContent = 'Статья удалена';
            this._renderAddButton();
          } else {
            this._helpContainer.textContent = res.message;
          }
        });
    }.bind(this);

    return { add, del, delFromBlueState };
  }
}
