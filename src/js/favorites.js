import '../pages/favorites.css';
import MainApi from './api/MainApi';
import errorHandler from './utils/errorHandler';
import mainApiAdress from './constants/mainApiAdress';
import mainPageLink from './constants/mainPageLink';
import ArticleCard from '../blocks/article/articleCard';
import FavoritesCardList from '../blocks/search-results/FavoritesCardList';
import MainMenu from '../blocks/main-menu/MainMenu';
import Favorites from '../blocks/favorites/Favorites';
import Footer from '../blocks/footer/Footer';

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
  })
    .catch((err) => {
      errorHandler(err, favoritesCardList.renderError);
      favorites.renderError();
    });
}

// Проверка логин
mainApi.getUser().then((res) => {
  isUserLoggedIn = true;
  mainMenu.userMenuRender(res.name);
  favorites.usernameContainer.textContent = res.name;
  renderFavoritesPage();
})
  .catch((err) => {
    errorHandler(err);
    document.location.href = mainPageLink;
  });

// Рендерим стиль страницы
mainMenu.getBlack();
footer.getWhite();
