// perform searches against the trakt api
import * as request from 'request-promise'

function opts(terms: string) {
  return {
    method: 'GET',
    uri: 'https://api.themoviedb.org/3/search/multi',
    qs: {
      api_key: process.env.TMDB_API_KEY,
      query: terms
    },
    json: true,
    transform: (res: any) => {
      return res.results[0]
    },
    transform2xxOnly: true
  }
}

module.exports = {
  search: function(query: string) {
    return request(opts(query))
  }
}
