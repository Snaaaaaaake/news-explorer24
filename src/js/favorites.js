import '../pages/favorites.css';
import MainApi from './api/MainApi';
import mainApiAdress from './constants/mainApiAdress';
import ArticleCard from '../blocks/article/articleCard';
import FavoritesCardList from '../blocks/search-results/FavoritesCardList';
import MainMenu from '../blocks/main-menu/MainMenu';
import Favorites from '../blocks/favorites/Favorites';
import Footer from '../blocks/footer/Footer';
import mainPageLink from './constants/mainPageLink';

const mainApi = new MainApi(mainApiAdress);
const favoritesCardList = new FavoritesCardList(document.querySelector('.search-results'));
const mainMenu = new MainMenu(document.querySelector('.main-menu'), mainApi);
const favorites = new Favorites(document.querySelector('.favorites'));
const footer = new Footer(document.querySelector('.footer'));
let isUserLoggedIn;

// Создаём функцию рендера списка карт
function renderFavoritesPage() {
  mainApi.getUserArticles().then((data) => {
    if (data.length > 0) {
      const articleCardsArray = data.map((item) => new ArticleCard(
        mainApi,
        item,
        isUserLoggedIn,
      ));
      // Дополнительно вешаем её же на каждую карту, чтобы при удалении карты страница обновлялась
      articleCardsArray.forEach((card) => {
        card.setReloadCardListFunction(renderFavoritesPage);
      });
      favoritesCardList.render(articleCardsArray);
      favorites.render(articleCardsArray);
    } else {
      favorites.renderError();
      favoritesCardList.renderError();
    }
  });
}

// Проверка логин
mainApi.getUser().then((res) => {
  // Если незалогинен и приходит ошибка, то переадресация на главную
  if (res.statusCode) {
    document.location.href = mainPageLink;
  // Иначе грузим карточки
  } else {
    isUserLoggedIn = true;
    mainMenu.userMenuRender(res.name);
    favorites.usernameContainer.textContent = res.name;
    renderFavoritesPage();
  }
});

// Рендерим стиль страницы
mainMenu.getBlack();
footer.getWhite();
