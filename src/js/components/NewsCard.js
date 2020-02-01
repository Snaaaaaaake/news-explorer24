import mainApi from '../api/MainApi';
import articleFavoriteIcon from '../constants/articleFavoriteIcon';
import articleDeleteIcon from '../constants/articleDeleteIcon';

const moment = require('moment');

moment().format();
moment.locale('ru');

export default class NewsCard {
  constructor(data, isUserLoggedIn, keyword) {
    this.title = data.title;
    this.description = data.description;
    this.date = data.publishedAt || data.date;
    this.source = data.source.name || data.source;
    this.image = data.urlToImage || data.image;
    this.url = data.url;
    this.keyword = keyword || data.keyword;
    this.id = data._id || null;
    this.domElement = this._createDomElement();
    this.eventListeners = this._getEventListeners();
    this.keywordContainer = this.domElement.querySelector('.article__keyword');
    this.keywordContainer.textContent = this.keyword;
    this.favoritesButton = this.domElement.querySelector('.article__favorites-button');
    // исправить!
    this.favoritesButton.appendChild(articleFavoriteIcon.cloneNode(true));
    //
    this.helpContainer = this.domElement.querySelector('.article__help');
    // Залогинен ли?
    if (isUserLoggedIn) {
      // Определяем, на какой странице мы нахоодимся и рендерим нужные кнопки
      if (this.id) {
        this._renderDeleteButton();
        this.keywordContainer.classList.remove('element_disabled');
        this.helpContainer.textContent = 'Удалить статью';
      } else {
        this._renderAddButton();
        this.helpContainer.textContent = 'Сохранить статью';
      }
    }
  }

  _createDomElement() {
    const domElement = document.createElement('article');
    domElement.classList.add('article');
    domElement.innerHTML = `
      <div class="article__favorites-button article__svg-icon_container"></div>
      <div class="article__keyword element_disabled" title="Ключевое слово данной статьи"></div>
      <div class="article__help">Войдите, чтобы сохранять статьи</div>
      <div class="article__picture" style="background: url(${this.image}) center no-repeat"></div>
      <div class="article__information">
        <a href="${this.url}" target="_blank" class="article__link" title="Читать полную версию статьи">
          <div class="article__information_block">
            <time class="article__date" datetime="${this.date}">${moment(this.date).format('LL')}</time>
            <h5 class="article__title">${this.title}</h5>
            <p class="article__description">${this.description}</p>
          </div>
          <p class="article__source">${this.source}</p>
        </a>
      </div>
    `;
    return domElement;
  }

  _renderAddButton() {
    this._clearFavoritesButton();
    this.favoritesButton.appendChild(articleFavoriteIcon.cloneNode(true));
    this.favoritesButton.addEventListener('click', this.eventListeners.add);
  }

  _renderDeleteButton() {
    this._clearFavoritesButton();
    this.favoritesButton.appendChild(articleDeleteIcon.cloneNode(true));
    this.favoritesButton.addEventListener('click', this.eventListeners.del);
  }

  _renderDeleteBlueButton() {
    this._clearFavoritesButton();
    this.favoritesButton.appendChild(articleFavoriteIcon.cloneNode(true));
    this.favoritesButton.querySelector('.article__svg-icon').classList.add('article__svg-icon_blue');
    this.favoritesButton.addEventListener('click', this.eventListeners.delFromBlueState);
  }

  _clearFavoritesButton() {
    this.favoritesButton.removeChild(this.favoritesButton.firstChild);
    Object.values(this.eventListeners).forEach((item) => {
      this.favoritesButton.removeEventListener('click', item);
    });
  }

  _getEventListeners() {
    const add = function () {
      mainApi.addArticle(
        this.keyword,
        this.title,
        this.description,
        this.date,
        this.source,
        this.url,
        this.image,
      )
        .then((res) => {
          if (res.statusCode === 201) {
            this.helpContainer.textContent = 'Статья сохранена';
            this._renderDeleteBlueButton();
            this.id = res.id;
          } else {
            this.helpContainer.textContent = res.message;
          }
        });
    }.bind(this);

    const del = function () {
      mainApi.deleteArticle(this.id)
        .then((res) => {
          if (res.statusCode === 200) {
            this.domElement.classList.add('element_disabled');
          } else {
            this.helpContainer.textContent = res.message;
          }
        });
    }.bind(this);

    const delFromBlueState = function () {
      mainApi.deleteArticle(this.id)
        .then((res) => {
          if (res.statusCode === 200) {
            this.helpContainer.textContent = 'Статья удалена';
            this._renderAddButton();
          } else {
            this.helpContainer.textContent = res.message;
          }
        });
    }.bind(this);

    return { add, del, delFromBlueState };
  }
}
