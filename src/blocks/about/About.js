import elementsConstructor from '../../js/utils/elementsConstructor';
import BaseComponent from '../../js/components/BaseComponent';

const aboutPhoto = require('../../images/about__photo.jpg').default;

export default class About extends BaseComponent {
  _createDomElement() {
    const domElement = elementsConstructor('div', ['about__container', 'width-corrector'], [
      elementsConstructor('div', 'about__photo_container', [
        elementsConstructor('img', 'about__photo', '', [
          { name: 'alt', value: 'Фотография' },
          { name: 'src', value: aboutPhoto },
        ]),
      ]),
      elementsConstructor('div', 'about__text_container', [
        elementsConstructor('h3', 'about__title', 'Об авторе'),
        elementsConstructor('p', 'about__text', 'Меня зовут Мирослав, я автор данного демонстрационного сайта, созданного в рамках обучения по программе Яндекс.Практикума. Для поиска новостей введите ключевое слово, для сохранения их в избранное зарегистрируйтесь.'),
        elementsConstructor('p', 'about__text', 'Функционал сайта написан самостоятельно, фронтенд и бекенд. Соответствие методологии БЭМ, использованы возможности Java Script ES6, семантические HTML5 теги, бэкенд написан на Node.js, база MongoDB, проект собран при помощи Webpack.'),
      ]),
    ]);
    return domElement;
  }

  getWhite() {
    this.style = 'У данного элемента нет стиля, но будет в будущем';
  }
}
