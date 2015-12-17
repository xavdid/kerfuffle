// google books api

var request = require('request-promise');

var options = {
  transform: function(body) {
    return JSON.parse(body).items[0];
  }
};

function url(terms) {
  return `https://www.googleapis.com/books/v1/volumes?q=${querystring(terms)}`;
}

function querystring(s) {
  return s.trim().split(" ").join("+");
}

module.exports = {
  search: function(title) {
    return request(url(title), options);
  }
};