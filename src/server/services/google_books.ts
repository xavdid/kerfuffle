// google books api
'use strict'
import * as request from 'request-promise'

const options = {
  transform: function(body: string) {
    return JSON.parse(body).items[0]
  }
}

function querystring(s: string) {
  return s
    .trim()
    .split(' ')
    .join('+')
}

function url(terms: string) {
  return `https://www.googleapis.com/books/v1/volumes?q=${querystring(
    encodeURIComponent(terms)
  )}`
}

module.exports = {
  search: function(title: string) {
    return request(url(title), options)
  }
}
