
import elementsConstructor from '../../js/utils/elementsConstructor';
import mainPageLink from '../../js/constants/mainPageLink';
import { facebookLink, githubLink } from '../../js/constants/about';

const facebookIconSvg = require('../../images/footer__icon_facebook.svg').default;
const githubIconSvg = require('../../images/footer__icon_github.svg').default;
const facebookIconPng = require('../../images/footer__icon_facebook.png').default;
const githubIconPng = require('../../images/footer__icon_github.png').default;

export default class Footer {
  constructor(parentElement) {
    this._domElement = this._createDomElement();
    parentElement.appendChild(this._domElement);
  }

  _createDomElement() {
    const domElement = elementsConstructor('div', ['width-corrector', 'footer_container'], [
      elementsConstructor('div', 'footer__element', [
        elementsConstructor('p', 'footer__copyright', '\u00A9 News-Explorer24.ru, Powered by News API'),
      ]),
      elementsConstructor('div', 'footer__element', [
        elementsConstructor('a', ['footer__link', 'footer__link_main'], 'Главная', { name: 'href', value: mainPageLink }),
        elementsConstructor('a', 'footer__link', 'Яндекс.Практикум', [
          { name: 'href', value: 'https://praktikum.yandex.ru/' },
          { name: 'target', value: '_blank' },
        ]),
      ]),
      elementsConstructor('div', 'footer__element', [
        elementsConstructor('a', ['footer__link', 'footer__link_icon'], [
          elementsConstructor('picture', 'footer__picture', [
            elementsConstructor('source', 'footer__picture_source', '', { name: 'srcset', value: githubIconSvg }),
            elementsConstructor('img', 'footer__icon', '', [
              { name: 'title', value: 'Ссылка на GitHub' },
              { name: 'alt', value: 'Ссылка на GitHub' },
              { name: 'src', value: githubIconPng },
            ]),
          ]),
        ], [
          { name: 'href', value: githubLink },
          { name: 'target', value: '_blank' },
        ]),
        elementsConstructor('a', ['footer__link', 'footer__link_icon'], [
          elementsConstructor('picture', 'footer__picture', [
            elementsConstructor('source', 'footer__picture_source', '', { name: 'srcset', value: facebookIconSvg }),
            elementsConstructor('img', 'footer__icon', '', [
              { name: 'title', value: 'Ссылка на Facebook' },
              { name: 'alt', value: 'Ссылка на Facebook' },
              { name: 'src', value: facebookIconPng },
            ]),
          ]),
        ], [
          { name: 'href', value: facebookLink },
          { name: 'target', value: '_blank' },
        ]),
      ]),
    ]);
    return domElement;
  }
}
