// perform searches against the trakt api

var trakt = require('trakt-api')(process.env.TRAKT_API_KEY);

module.exports = {
  search_for_media: function(query) {
    return trakt.search(query);
  }
};