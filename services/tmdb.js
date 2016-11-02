// perform searches against the trakt api
'use strict'
const request = require('request-promise')

function opts (terms) {
  return {
    method: 'GET',
    uri: 'https://api.themoviedb.org/3/search/multi',
    qs: {
      api_key: process.env.TMDB_API_KEY,
      query: terms
    },
    json: true,
    transform: (res) => {
      return res.results[0]
    },
    transform2xxOnly: true
  }
}

module.exports = {
  search: function (query) {
    return request(opts(query))
  }
}
