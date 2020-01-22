import '../pages/main.css';
import Popup from './components/Popup';
import FormRegistration from './components/FormRegistration';
import FormLogin from './components/FormLogin';
import NewsApi from './api/NewsApi';
import NewsCard from './components/NewsCard';
import NewsCardList from './components/NewsCardList';
import MainMenu from './components/MainMenu';
import mainApi from './api/MainApi';

const formLogin = new FormLogin();
const formRegistration = new FormRegistration();
const popup = new Popup();
const newsApi = new NewsApi('a6db4f983f5945259966f4ee4ac8106e');
const newsCardList = new NewsCardList(document.querySelector('.search-results'));
const mainMenu = new MainMenu(document.querySelector('.header__main-menu-container'));

// Обработчики
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

// пример запроса
document.querySelector('.search__form').addEventListener('submit', (event) => {
  event.preventDefault();
  newsCardList.renderLoader();
  newsApi.getNews(document.querySelector('.search__input').value).then((data) => {
    if (data.articles.length === 0) {
      newsCardList.renderError();
    } else {
      const newsCardsArray = data.articles.map((item) => new NewsCard(item));
      newsCardList.addCards(newsCardsArray);
    }
  });
});

// проверка логин
mainApi.getUser().then((res) => {
  if (res.statusCode) {
    mainMenu.guestMenuRender();
  } else {
    mainMenu.userMenuRender(res.name);
  }
});

mainMenu.getWhite();
