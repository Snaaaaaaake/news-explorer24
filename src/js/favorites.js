import '../pages/favorites.css';
import Popup from './components/Popup';
import FormRegistration from './components/FormRegistration';
import FormLogin from './components/FormLogin';
import NewsCard from './components/NewsCard';
import MainMenu from './components/MainMenu';
import mainApi from './api/MainApi';
import FavoriteCardList from './components/FavoriteCardList';
import siteHref from './constants/siteHref';

const formLogin = new FormLogin();
const formRegistration = new FormRegistration();
const popup = new Popup();
const mainMenu = new MainMenu(document.querySelector('.header__main-menu-container'));
const favoriteCardList = new FavoriteCardList(document.querySelector('.search-results'));
let isUserLoggedIn;

function popupLoginOpenHandler() {
  popup.open('Вход', formLogin);
}
function popupRegistrationOpenHandler() {
  popup.open('Регистрация', formRegistration);
}
mainMenu.setLinkHandler(popupLoginOpenHandler);
formLogin.setLinkHandler(popupRegistrationOpenHandler);
formRegistration.setLinkHandler(popupLoginOpenHandler);
formRegistration.setResponseMethod(popup.responceRender);

// проверка логин
mainApi.getUser().then((res) => {
  if (res.statusCode) {
    // document.location.href = `${siteHref}`;
  } else {
    mainMenu.userMenuRender(res.name);
    isUserLoggedIn = true;
    mainApi.getUserArticles().then((data) => {
      if (data.length === 0) {
        favoriteCardList.renderError();
      } else {
        const newsCardsArray = data.map((item) => new NewsCard(item, isUserLoggedIn));
        favoriteCardList.addCards(newsCardsArray);
      }
    });
  }
});

mainMenu.getBlack();

// костыль
document.querySelector('.footer__link_main').setAttribute('href', siteHref);
