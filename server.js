// server.js
// This is where your node app starts

//load the 'express' module which makes writing webservers easy
const express = require("express");
const lodash = require("lodash");
//var cors = require("cors");
const app = express();

//load the quotes JSON
const quotes = require("./quotes.json");
//app.use(cors());
// Now register handlers for some routes:
//   /                  - Return some helpful welcome info (text)
//   /quotes            - Should return all quotes (json)
//   /quotes/random     - Should return ONE quote (json)
app.get("/", function (request, response) {
  response.send("Neill's Quote Server!  Ask me for /quotes/random, or /quotes");
});

//START OF YOUR CODE...

//renders all quotes
app.get("/quotes", function (request, response) {
  response.send(quotes);
});

//renders one random quote
app.get("/quotes/random", function (request, response) {
  let randomQuote = lodash.sample(quotes);
  response.send(randomQuote);
});

//searches a quote
app.get("/quotes/search", function (request, response) {
  let queryParam = request.query.term;
  let searchedQuote = quotes.filter((quote) =>
    quote.quote.toUpperCase().includes(queryParam.toUpperCase())
  );
  response.send(searchedQuote);
});

//...END OF YOUR CODE

//You can use this function to pick one element at random from a given array
//example: pickFromArray([1,2,3,4]), or
//example: pickFromArray(myContactsArray)
//
function pickFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

//Start our server so that it listens for HTTP requests!
const listener = app.listen(3060, () => {
  console.log("Your app is listening on port 3060"); //+ listener.address().port);
});
