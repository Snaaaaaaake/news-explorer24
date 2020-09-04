import moment from 'moment';
import resCheck from '../utils/resCheck';

moment().format();

export default class NewsApi {
  constructor(token) {
    this.baseUrl = 'https://nomoreparties.co/news/v2/everything?sortBy=popularity&';
    this.token = `apiKey=${token}`;
  }

  getNews(keyword) {
    const fromDate = moment().format('YYYY-MM-DD');
    const toDate = moment().subtract(7, 'days').format('YYYY-MM-DD');
    return fetch(`${this.baseUrl}from=${fromDate}&to=${toDate}&pageSize=100&q=${keyword}&${this.token}`)
      .then(resCheck);
  }
}
