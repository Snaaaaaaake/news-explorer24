const moment = require('moment');

moment().format();
moment.locale('ru');

export default class NewsCard {
  constructor(data) {
    this.title = data.title;
    this.description = data.description;
    this.date = data.publishedAt;
    this.source = data.source.name;
    this.image = data.urlToImage;
    this.url = data.url;
    this.item = this._render();
  }

  _render() {
    const item = document.createElement('article');
    item.classList.add('article');
    item.innerHTML = `
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
    return item;
  }
}
