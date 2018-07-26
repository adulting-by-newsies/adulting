require('dotenv').config()
var axios = require("axios");
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.NEWS_API_KEY);

function scrapeArticles() {
	var results = [];

  // To query /v2/top-headlines
  // All options passed to topHeadlines are optional, but you need to include at least one of them
  newsapi.v2.topHeadlines({
    country: 'us',
    category: 'business'
  }).then(response => {
    console.log(response);
    results = response;
    /*
      {
        status: "ok",
        articles: [...]
      }
    */
  });

  return results;
}
function scraping() {
  return new scrapeArticles
}
module.exports = { scraping,
scrapeArticles
}