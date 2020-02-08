import '../pages/main.css';
import MainApi from './api/MainApi';
import mainApiAdress from './constants/mainApiAdress';
import NewsApi from './api/NewsApi';
import newsApiToken from './constants/newsApiToken';
import FormLogin from '../blocks/form/FormLogin';
import FormRegistration from '../blocks/form/FormRegistration';
import ArticleCard from '../blocks/article/articleCard';
import Popup from '../blocks/popup/Popup';
import ArticleCardList from '../blocks/search-results/ArticleCardList';
import MainMenu from '../blocks/main-menu/MainMenu';
import Footer from '../blocks/footer/Footer';
import About from '../blocks/about/About';
import Search from '../blocks/search/Search';


const mainApi = new MainApi(mainApiAdress);
const newsApi = new NewsApi(newsApiToken);
const formLogin = new FormLogin(mainApi);
const formRegistration = new FormRegistration(mainApi);
const popup = new Popup(document.body);
const articleCardList = new ArticleCardList(document.querySelector('.search-results'));
const mainMenu = new MainMenu(document.querySelector('.main-menu'), mainApi);
const footer = new Footer(document.querySelector('.footer'));
const about = new About(document.querySelector('.about'));
const search = new Search(document.querySelector('.search'));
let isUserLoggedIn;

// Связываем экземпляры классов между собой
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

// Обработчик поиска статей
// Т.к. по условиям нам нельзя создавать экзепляры ксласса в другом классе, то вынес его сюда.
search.form.addEventListener('submit', (event) => {
  event.preventDefault();
  articleCardList.renderLoader();
  const keyword = search.keywordInput.value;
  newsApi.getNews(keyword).then((data) => {
    if (data.articles.length === 0) {
      articleCardList.renderError();
    } else {
      const articleCardsArray = data.articles.map((item) => new ArticleCard(
        mainApi,
        item,
        isUserLoggedIn,
        keyword,
      ));
      articleCardList.addCards(articleCardsArray);
    }
  });
});

// Проверка логина
mainApi.getUser().then((res) => {
  if (res.statusCode) {
    mainMenu.guestMenuRender();
  } else {
    mainMenu.userMenuRender(res.name);
    isUserLoggedIn = true;
  }
});

// Рендерим стиль страницы
mainMenu.getWhite();
footer.getWhite();
about.getWhite();
