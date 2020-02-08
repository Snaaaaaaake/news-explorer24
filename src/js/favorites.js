import '../pages/favorites.css';

import NewsCard from '../blocks/article/articleCard';
import MainMenu from '../blocks/main-menu/MainMenu';
import mainApi from './api/MainApi';
import FavoritesCardList from '../blocks/search-results/FavoritesCardList';
import Favorites from '../blocks/favorites/Favorites';
import Footer from '../blocks/footer/Footer';
import mainPageLink from './constants/mainPageLink';


const mainMenu = new MainMenu(document.querySelector('.main-menu'));
const favorites = new Favorites(document.querySelector('.favorites'));
const footer = new Footer(document.querySelector('.footer'));
const favoritesCardList = new FavoritesCardList(document.querySelector('.search-results'));
const favoritesPageUserNameElement = document.querySelector('.favorites__username');
let isUserLoggedIn;

// Проверка логин
mainApi.getUser().then((res) => {
  // Если незалогинен и приходит ошибка, то переадресация на главную
  if (res.statusCode) {
    document.location.href = mainPageLink;
  // Иначе грузим карточки
  } else {
    mainMenu.userMenuRender(res.name);
    favoritesPageUserNameElement.textContent = res.name;
    isUserLoggedIn = true;
    mainApi.getUserArticles().then((data) => {
      if (data.length > 0) {
        const newsCardsArray = data.map((item) => new NewsCard(item, isUserLoggedIn));
        favoritesCardList.render(newsCardsArray);
        favorites.render(newsCardsArray);
      } else {
        favoritesCardList.renderError();
      }
    });
  }
});

mainMenu.getBlack();

// костыль
document.querySelector('.footer__link_main').setAttribute('href', mainPageLink);
