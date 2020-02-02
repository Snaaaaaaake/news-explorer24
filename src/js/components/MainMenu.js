import mainApi from '../api/MainApi';
import logoutLinkIcon from '../constants/logoutLinkIcon';
import siteHref from '../constants/siteHref';
import { sliderButtonIconOpen, sliderButtonIconClose } from '../constants/sliderButtonIcons';

export default class MainMenu {
  constructor(parentElement) {
    this.domElement = this._createDomElement();
    parentElement.appendChild(this.domElement);
    this.sliderElement = this.domElement.querySelector('.main-menu__slider');
    this.overlay = this._createOverlay();
    this.sliderButton = this.domElement.querySelector('.main-menu__slider-button');
    // исправить!
    this.sliderButton.appendChild(sliderButtonIconOpen);
    this.sliderButton.appendChild(sliderButtonIconClose);
    //
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
    const domElement = document.createElement('nav');
    domElement.classList.add('main-menu');
    domElement.innerHTML = `
    <div class="main-menu__container width-corrector">
        <div class="main-menu__link-container">
            <a class="main-menu__link main-menu__logo-link" title="Агрегатор новостей NewsExplorer24" href="${siteHref}">NewsExplorer24</a>
        </div>
        <div class="main-menu__link-container">
          <button class="main-menu__slider-button" title="Показать меню"></button>
        </div>
        <div class="main-menu__link-container main-menu__slider main-menu__slider_hidden">
            <a class="main-menu__link main-menu__main-page-link" title="На главную" href="${siteHref}">Главная</a>
            <a class="main-menu__link main-menu__favorites-link element_disabled" title="Страница ваших сохраненных статей" href="${siteHref}favorites">Сохраненные статьи</a>
            <button class="main-menu__link main-menu__link-oval main-menu__autorisation-link element_disabled">Авторизоваться</button>
            <button class="main-menu__link main-menu__link-oval main-menu__logout-link element_disabled"  title="Выйти"></button>
        </div>
    </div>`;
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
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    overlay.classList.add('element_disabled');
    document.body.appendChild(overlay);
    overlay.addEventListener('click', () => {
      this.sliderToggle();
    });
    return overlay;
  }
}
