import mainApi from '../api/MainApi';
import articleFavoriteIcon from '../constants/articleFavoriteIcon';
import articleDeleteIcon from '../constants/articleDeleteIcon';

const moment = require('moment');

moment().format();
moment.locale('ru');

export default class NewsCard {
  constructor(data, keyword) {
    this.title = data.title;
    this.description = data.description;
    this.date = data.publishedAt || data.date;
    this.source = data.source.name || data.source;
    this.image = data.urlToImage || data.image;
    this.url = data.url;
    this.keyword = keyword || data.keyword;
    this.id = data._id || null;
    this.domElement = this._createDomElement();
    this.keywordContainer = this.domElement.querySelector('.article__keyword');
    this.keywordContainer.textContent = this.keyword;
    this.addToFavoritesButton = this.domElement.querySelector('.article__favorite');
    this.deleteArticleButton = this.domElement.querySelector('.article__delete');
    this.helpContainer = this.domElement.querySelector('.article__help');
    // Определяем, на какой странице мы нахоодимся и рендерим нужные кнопки
    if (this.id) {
      this.deleteArticleButton.classList.remove('element_disabled');
      this.keywordContainer.classList.remove('element_disabled');
    } else {
      this.addToFavoritesButton.classList.remove('element_disabled');
    }
    this.domElement.addEventListener('click', this._clickEventListeners.bind(this));
    this.domElement.addEventListener('mouseover', this._mouseoverEventListeners.bind(this));
  }

  _createDomElement() {
    const domElement = document.createElement('article');
    domElement.classList.add('article');
    domElement.innerHTML = `
      <div class="article__favorite article__svg-icon_container element_disabled" title="Добавить в сохраненные статьи"></div>
      <div class="article__delete article__svg-icon_container element_disabled" title="Удалить из сохраненныых статей"></div>
      <div class="article__keyword element_disabled" title="Ключевое слово данной статьи"></div>
      <div class="article__help"></div>
      <div class="article__picture" style="background: url(${this.image}) center no-repeat"></div>
      <div class="article__information">
        <a href="${this.url}" class="article__link" title="Читать полную версию статьи">
          <div class="article__information_block">
            <time class="article__date" datetime="${this.date}">${moment(this.date).format('LL')}</time>
            <h5 class="article__title">${this.title}</h5>
            <p class="article__description">${this.description}</p>
          </div>
          <p class="article__source">${this.source}</p>
        </a>
      </div>
    `;
    domElement.querySelector('.article__favorite').appendChild(articleFavoriteIcon.cloneNode(true));
    domElement.querySelector('.article__delete').appendChild(articleDeleteIcon.cloneNode(true));
    return domElement;
  }

  _clickEventListeners(event) {
    // Добавляем статью в избранное
    if (event.target === this.addToFavoritesButton
    || event.target.parentNode === this.addToFavoritesButton
    || event.target.parentNode.parentNode === this.addToFavoritesButton) {
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
            this.helpContainer.textContent = 'Статья добавлена!';
          } else {
            this.helpContainer.textContent = res.message;
          }
        });
    }
    // Удаляем статью из избранного
    if (event.target === this.deleteArticleButton
    || event.target.parentNode === this.deleteArticleButton
    || event.target.parentNode.parentNode === this.deleteArticleButton) {
      mainApi.deleteArticle(this.id)
        .then((res) => {
          if (res.statusCode === 200) {
            this.domElement.classList.add('element_disabled');
          } else {
            this.helpContainer.textContent = res.message;
          }
        });
    }
  }

  _mouseoverEventListeners(event) {
    if (event.target === this.addToFavoritesButton) {
      this.helpContainer.textContent = 'Сохранить статью';
    }
    if (event.target === this.deleteArticleButton) {
      this.helpContainer.textContent = 'Удалить из сохраненных';
    }
  }
}
