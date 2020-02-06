import mainApi from '../api/MainApi';
import logoutLinkIcon from '../constants/logoutLinkIcon';
import siteHref from '../constants/siteHref';
import createSingleDomElement from '../utils/createSingleDomElement';
import { sliderButtonIconOpen, sliderButtonIconClose } from '../constants/sliderButtonIcons';

export default class MainMenu {
  constructor(parentElement) {
    this._domElement = this._createDomElement();
    parentElement.appendChild(this._domElement);
    this._sliderElement = this._domElement.querySelector('.main-menu__slider');
    this._overlay = this._createOverlay();
    this._sliderButton = this._domElement.querySelector('.main-menu__slider-button');
    this._sliderButton.addEventListener('click', () => {
      this.sliderToggle();
    });
    this._logoLink = this._domElement.querySelector('.main-menu__logo-link');
    this._mainPageLink = this._domElement.querySelector('.main-menu__main-page-link');
    this._favoritesLink = this._domElement.querySelector('.main-menu__favorites-link');
    this._autorisationLink = this._domElement.querySelector('.main-menu__autorisation-link');
    this._logoutLink = this._domElement.querySelector('.main-menu__logout-link');
    this._logoutLink.addEventListener('click', () => {
      mainApi.userLogout().then(() => {
        document.location.reload(true);
      });
    });
    this._linksArray = [
      this._logoLink,
      this._mainPageLink,
      this._favoritesLink,
      this._autorisationLink,
      this._logoutLink,
      this._sliderButton,
    ];
  }

  _createDomElement() {
    const domElement = createSingleDomElement('nav', 'main-menu',
      createSingleDomElement('div', ['main-menu__container', 'width-corrector'], [
        createSingleDomElement('div', 'main-menu__link-container',
          createSingleDomElement('a', ['main-menu__link', 'main-menu__logo-link'], 'NewsExplorer24', [
            { name: 'title', value: 'Агрегатор новостей NewsExplorer24' },
            { name: 'href', value: siteHref },
          ])),
        createSingleDomElement('div', ['main-menu__link-container', 'main-menu__link-container_slider'],
          createSingleDomElement('button', 'main-menu__slider-button', [
            sliderButtonIconOpen,
            sliderButtonIconClose,
          ], { name: 'title', value: 'Показать меню' })),
        createSingleDomElement('div', ['main-menu__link-container', 'main-menu__slider', 'main-menu__slider_hidden'], [
          createSingleDomElement('a', ['main-menu__link', 'main-menu__main-page-link'], 'Главная', [
            { name: 'title', value: 'На главную' },
            { name: 'href', value: siteHref },
          ]),
          createSingleDomElement('a', ['main-menu__link', 'main-menu__favorites-link', 'element_disabled'], 'Сохраненные статьи', [
            { name: 'title', value: 'Страница ваших сохраненных статей' },
            { name: 'href', value: `${siteHref}favorites` },
          ]),
          createSingleDomElement('button', ['main-menu__link', 'main-menu__link-oval', 'main-menu__autorisation-link', 'element_disabled'], 'Авторизоваться', { name: 'title', value: 'Авторизоваться' }),
          createSingleDomElement('button', ['main-menu__link', 'main-menu__link-oval', 'main-menu__logout-link', 'element_disabled'], '', { name: 'title', value: 'Выйти' }),
        ]),
      ]));
    return domElement;
  }

  sliderToggle() {
    this._sliderElement.classList.toggle('main-menu__slider_hidden');
    this._domElement.classList.toggle('main-menu_opened');
    this._overlay.classList.toggle('element_disabled');
    this._sliderButton.children[0].classList.toggle('element_disabled');
    this._sliderButton.children[1].classList.toggle('element_disabled');
  }

  getWhite() {
    this._mainPageLink.classList.add('main-menu__link_active');
    this._favoritesLink.classList.remove('main-menu__link_active');
    this._domElement.classList.add('main-menu_white');
    this._logoutLink.classList.remove('main-menu__logout-link_black');
    this._linksArray.forEach((item) => {
      item.classList.remove('main-menu__link_black');
    });
  }

  getBlack() {
    this._mainPageLink.classList.remove('main-menu__link_active');
    this._favoritesLink.classList.add('main-menu__link_active');
    this._domElement.classList.add('main-menu_black');
    this._logoutLink.classList.add('main-menu__logout-link_black');
    this._linksArray.forEach((item) => {
      item.classList.add('main-menu__link_black');
    });
  }

  guestMenuRender() {
    this._favoritesLink.classList.add('element_disabled');
    this._autorisationLink.classList.remove('element_disabled');
    this._logoutLink.classList.add('element_disabled');
  }

  userMenuRender(username) {
    this._favoritesLink.classList.remove('element_disabled');
    this._autorisationLink.classList.add('element_disabled');
    this._logoutLink.classList.remove('element_disabled');
    this._logoutLink.textContent = username;
    this._logoutLink.appendChild(logoutLinkIcon);
  }

  setLinkHandler(handler) {
    this._autorisationLink.addEventListener('click', handler);
  }

  _createOverlay() {
    const overlay = createSingleDomElement('div', ['overlay', 'element_disabled']);
    document.body.appendChild(overlay);
    overlay.addEventListener('click', () => {
      this.sliderToggle();
    });
    return overlay;
  }
}
