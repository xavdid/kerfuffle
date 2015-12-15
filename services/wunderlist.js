// access the wunderlist API

var request = require('request-promise');

module.exports = {
  fetch_items_by_list_id: function(id) {
    var options = {
      transform: function(body) {
        return JSON.parse(body);
      },
      headers: {
        'X-Access-Token': process.env.WUNDERLIST_ACCESS_TOKEN,
        'X-Client-ID': process.env.WUNDERLIST_CLIENT_ID
      }
    };
    return request.get(
      `https://a.wunderlist.com/api/v1/tasks?list_id=${id}`, 
      options
    );
  }
};
