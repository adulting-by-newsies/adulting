require('dotenv').config()
var axios = require("axios");
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.NEWS_API_KEY);
const interestCategoriesTop = ["sports", "politics","science", "technology", "health", "business"]
const interestCategoriesEverything = ["culture", "worldnews","cooking", "lifestyle"]

// This function will step through the various categories and append 10 articles from each to
// a massive results array
function scrapeArticles() {
	var results = [];
  var total = 0;

  // To query /v2/top-headlines
  // All options passed to topHeadlines are optional, but you need to include at least one of them
  interestCategoriesTop.forEach(function(theCategory){
    console.log("newsAPI: category GET for " + theCategory)
    newsapi.v2.topHeadlines({
      country: 'us',
      category: theCategory
    }).then(response => {
      // console.log(JSON.stringify(response));
      var i = 0;
      // console.log("Length is " + response.length);

      for (var articles in response){
        if (response.hasOwnProperty(articles)){
          console.log("At articles")
        }
      for (var author in response) {
        if (response.hasOwnProperty(author)) {
          // console.log(author + " -> " + JSON.stringify(response[author]));
          console.log("Adding article " + total + " for category " + theCategory + " and i is " + i + " author is " + author);
          results.push(JSON.stringify(response[author]));
          total++;
          i++;
          if (i > 10)
            return;
        }
      }
      }

      // if (response.length > 10){
      //   console.log("newsAPI: 10 or more articles for category " + theCategory);
      //   while (i < 10){
      //     response.forEach(function(article){
      //       total++;
      //       results.push(article);
      //     });
      //   }
      // } else {
      //   console.log("newsAPI: Less than 10 articles for category " + theCategory);
      //   response.forEach(function(article){
      //     total++;
      //     results.push(article);
      //   });
      // }
    });
  });

  // interestCategoriesEverything.forEach(function(theCategory){
  //   console.log("newsAPI: query GET for " + theCategory)
  //   newsapi.v2.everything({
  //     q: theCategory
  //   }).then(response => {
  //     // console.log(response);
  //     var i = 0;
  //     if (response.length > 10){
  //       console.log("newsAPI: 10 or more articles for category " + theCategory);
  //       while (i < 10){
  //         response.forEach(function(article){
  //           total++;
  //           results.push(article);
  //         });
  //       }
  //     } else {
  //       console.log("newsAPI: Less than 10 articles for category " + theCategory);
  //       response.forEach(function(article){
  //         total++;
  //         results.push(article);
  //       });
  //     }
  //   });
  // });

  console.log("newsAPI: Returning " + total + " articles across 10 categories");

  return results;
}
function scraping() {
  return new scrapeArticles
}
module.exports = { scraping,
scrapeArticles
}