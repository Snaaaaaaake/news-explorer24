import mainApi from '../api/MainApi';
import logoutLinkIcon from '../constants/logoutLinkIcon';
import siteHref from '../constants/siteHref';
import createSingleDomElement from '../utils/createSingleDomElement';
import { sliderButtonIconOpen, sliderButtonIconClose } from '../constants/sliderButtonIcons';

export default class MainMenu {
  constructor(parentElement) {
    this.domElement = this._createDomElement();
    parentElement.appendChild(this.domElement);
    this.sliderElement = this.domElement.querySelector('.main-menu__slider');
    this.overlay = this._createOverlay();
    this.sliderButton = this.domElement.querySelector('.main-menu__slider-button');
    this.sliderButton.addEventListener('click', () => {
      this.sliderToggle();
    });
    this.logoLink = this.domElement.querySelector('.main-menu__logo-link');
    this.mainPageLink = this.domElement.querySelector('.main-menu__main-page-link');
    this.favoritesLink = this.domElement.querySelector('.main-menu__favorites-link');
    this.autorisationLink = this.domElement.querySelector('.main-menu__autorisation-link');
    this.logoutLink = this.domElement.querySelector('.main-menu__logout-link');
    this.logoutLink.addEventListener('click', () => {
      mainApi.userLogout().then(() => {
        document.location.reload(true);
      });
    });
    this.linksArray = [
      this.logoLink,
      this.mainPageLink,
      this.favoritesLink,
      this.autorisationLink,
      this.logoutLink,
      this.sliderButton,
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
    this.sliderElement.classList.toggle('main-menu__slider_hidden');
    this.domElement.classList.toggle('main-menu_opened');
    this.overlay.classList.toggle('element_disabled');
    this.sliderButton.children[0].classList.toggle('element_disabled');
    this.sliderButton.children[1].classList.toggle('element_disabled');
  }

  getWhite() {
    this.mainPageLink.classList.add('main-menu__link_active');
    this.favoritesLink.classList.remove('main-menu__link_active');
    this.domElement.classList.add('main-menu_white');
    this.logoutLink.classList.remove('main-menu__logout-link_black');
    this.linksArray.forEach((item) => {
      item.classList.remove('main-menu__link_black');
    });
  }

  getBlack() {
    this.mainPageLink.classList.remove('main-menu__link_active');
    this.favoritesLink.classList.add('main-menu__link_active');
    this.domElement.classList.add('main-menu_black');
    this.logoutLink.classList.add('main-menu__logout-link_black');
    this.linksArray.forEach((item) => {
      item.classList.add('main-menu__link_black');
    });
  }

  guestMenuRender() {
    this.favoritesLink.classList.add('element_disabled');
    this.autorisationLink.classList.remove('element_disabled');
    this.logoutLink.classList.add('element_disabled');
  }

  userMenuRender(username) {
    this.favoritesLink.classList.remove('element_disabled');
    this.autorisationLink.classList.add('element_disabled');
    this.logoutLink.classList.remove('element_disabled');
    this.logoutLink.textContent = username;
    this.logoutLink.appendChild(logoutLinkIcon);
  }

  setLinkHandler(handler) {
    this.autorisationLink.addEventListener('click', handler);
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
