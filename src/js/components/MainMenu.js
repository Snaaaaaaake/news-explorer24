import mainApi from '../api/MainApi';

export default class MainMenu {
  constructor(parentElement) {
    this.domElement = this._createDomElement();
    parentElement.appendChild(this.domElement);
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
    ];
  }

  _createDomElement() {
    const domElement = document.createElement('nav');
    domElement.classList.add('main-menu');
    domElement.innerHTML = `
    <div class="main-menu__container width-corrector">
        <div class="main-menu__link-container">
            <a class="main-menu__link main-menu__logo-link" title="Агрегатор новостей NewsExplorer24" href="/">NewsExplorer24</a>
        </div>
        <div class="main-menu__link-container">
            <a class="main-menu__link main-menu__main-page-link" title="На главную" href="/">Главная</a>
            <a class="main-menu__link main-menu__favorites-link element_disabled" href="favorites">Сохраненные статьи</a>
            <a class="main-menu__link main-menu__link-oval main-menu__autorisation-link element_disabled" href="#">Авторизоваться</a>
            <a class="main-menu__link main-menu__link-oval main-menu__logout-link element_disabled"  title="Выйти" href="#">Username</a>
        </div>
    </div>`;
    return domElement;
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
  }

  setLinkHandler(handler) {
    this.autorisationLink.addEventListener('click', handler);
  }
}
