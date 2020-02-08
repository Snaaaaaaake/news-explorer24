import '../pages/main.css';
import Popup from '../blocks/popup/Popup';
import FormRegistration from '../blocks/form/FormRegistration';
import FormLogin from '../blocks/form/FormLogin';
import NewsApi from './api/NewsApi';
import NewsCard from '../blocks/article/articleCard';
import NewsCardList from '../blocks/search-results/NewsCardList';
import MainMenu from '../blocks/main-menu/MainMenu';
import mainApi from './api/MainApi';
import Footer from '../blocks/footer/Footer';
import About from '../blocks/about/About';
import Search from '../blocks/search/Search';
import newsApiToken from './constants/newsApiToken';

const formLogin = new FormLogin();
const formRegistration = new FormRegistration();
const popup = new Popup();
const newsApi = new NewsApi(newsApiToken);
const newsCardList = new NewsCardList(document.querySelector('.search-results'));
const mainMenu = new MainMenu(document.querySelector('.main-menu'));
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
search.form.addEventListener('submit', (event) => {
  event.preventDefault();
  newsCardList.renderLoader();
  const keyword = search.keywordInput.value;
  newsApi.getNews(keyword).then((data) => {
    if (data.articles.length === 0) {
      newsCardList.renderError();
    } else {
      const newsCardsArray = data.articles.map((item) => new NewsCard(
        item,
        isUserLoggedIn,
        keyword,
      ));
      newsCardList.addCards(newsCardsArray);
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

mainMenu.getWhite();
