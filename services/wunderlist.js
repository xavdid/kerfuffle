// access the wunderlist API

var request = require('request');

module.exports = {
  fetch_items_by_list_id: function(id) {
    
    var options = {
      url: `https://a.wunderlist.com/api/v1/tasks?list_id=${id}`,
      headers: {
        'X-Access-Token': process.env.WUNDERLIST_ACCESS_TOKEN,
        'X-Client-ID': process.env.WUNDERLIST_CLIENT_ID
      }
    };

    return new Promise(function(resolve, reject) {
      request.get(options, function(err, resp, body){
        resolve(JSON.parse(body));
      });
    });
  }
};