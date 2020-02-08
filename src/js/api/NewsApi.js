const moment = require('moment');

moment().format();

export default class NewsApi {
  constructor(token) {
    this.baseUrl = 'https://newsapi.org/v2/everything?sortBy=popularity&';
    this.token = `apiKey=${token}`;
  }

  getNews(keyword) {
    const fromDate = moment().format('YYYY-MM-DD');
    const toDate = moment().subtract(7, 'days').format('YYYY-MM-DD');
    return fetch(`${this.baseUrl}from=${fromDate}&to=${toDate}&pageSize=100&q=${keyword}&${this.token}`)
      .then((res) => res.json())
      .catch((err) => console.log(err));
  }
}
