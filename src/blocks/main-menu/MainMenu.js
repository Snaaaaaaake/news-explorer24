import logoutLinkIcon from './mainMenuLogoutLinkIcon';
import mainPageLink from '../../js/constants/mainPageLink';
import elementsConstructor from '../../js/utils/elementsConstructor';
import errorHandler from '../../js/utils/errorHandler';
import { sliderButtonIconOpen, sliderButtonIconClose } from './mainMenuSliderButtonIcons';
import BaseComponent from '../../js/components/BaseComponent';

export default class MainMenu extends BaseComponent {
  constructor(parentElement, mainApi) {
    super(parentElement);
    this._mainApi = mainApi;
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
      this._mainApi.userLogout().then(() => {
        document.location.reload(true);
      })
        .catch((err) => {
          errorHandler(err);
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
    const domElement = elementsConstructor('div', ['main-menu__container', 'width-corrector'], [
      elementsConstructor('div', 'main-menu__link-container',
        elementsConstructor('a', ['main-menu__link', 'main-menu__logo-link'], 'NewsExplorer24', [
          { name: 'title', value: 'Агрегатор новостей NewsExplorer24' },
          { name: 'href', value: mainPageLink },
        ])),
      elementsConstructor('div', ['main-menu__link-container', 'main-menu__link-container-slider'],
        elementsConstructor('button', 'main-menu__slider-button', [
          sliderButtonIconOpen,
          sliderButtonIconClose,
        ], { name: 'title', value: 'Показать меню' })),
      elementsConstructor('div', ['main-menu__link-container', 'main-menu__slider', 'main-menu__slider_hidden'], [
        elementsConstructor('a', ['main-menu__link', 'main-menu__main-page-link'], 'Главная', [
          { name: 'title', value: 'На главную' },
          { name: 'href', value: mainPageLink },
        ]),
        elementsConstructor('a', ['main-menu__link', 'main-menu__favorites-link', 'element-disabled'], 'Сохраненные статьи', [
          { name: 'title', value: 'Страница ваших сохраненных статей' },
          { name: 'href', value: `${mainPageLink}favorites` },
        ]),
        elementsConstructor('button', ['main-menu__link', 'main-menu__link-oval', 'main-menu__autorisation-link', 'element-disabled'], 'Авторизоваться', { name: 'title', value: 'Авторизоваться' }),
        elementsConstructor('button', ['main-menu__link', 'main-menu__link-oval', 'main-menu__logout-link', 'element-disabled'], '', { name: 'title', value: 'Выйти' }),
      ]),
    ]);
    return domElement;
  }

  sliderToggle() {
    this._sliderElement.classList.toggle('main-menu__slider_hidden');
    this._domElement.classList.toggle('main-menu_opened');
    this._overlay.classList.toggle('element-disabled');
    this._sliderButton.children[0].classList.toggle('element-disabled');
    this._sliderButton.children[1].classList.toggle('element-disabled');
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
    this._favoritesLink.classList.add('element-disabled');
    this._autorisationLink.classList.remove('element-disabled');
    this._logoutLink.classList.add('element-disabled');
  }

  userMenuRender(username) {
    this._favoritesLink.classList.remove('element-disabled');
    this._autorisationLink.classList.add('element-disabled');
    this._logoutLink.classList.remove('element-disabled');
    this._logoutLink.textContent = username;
    this._logoutLink.appendChild(logoutLinkIcon);
  }

  setLinkHandler(handler) {
    this._autorisationLink.addEventListener('click', handler);
  }

  _createOverlay() {
    const overlay = elementsConstructor('div', ['overlay', 'element-disabled']);
    document.body.appendChild(overlay);
    overlay.addEventListener('click', () => {
      this.sliderToggle();
    });
    return overlay;
  }
}
