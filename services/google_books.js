// google books api
'use strict'
const request = require('request-promise')
const options = {
  transform: function (body) {
    return JSON.parse(body).items[0]
  }
}

function querystring (s) {
  return s.trim().split(' ').join('+')
}

function url (terms) {
  return `https://www.googleapis.com/books/v1/volumes?q=${querystring(encodeURIComponent(terms))}`
}

module.exports = {
  search: function (title) {
    return request(url(title), options)
  }
}
