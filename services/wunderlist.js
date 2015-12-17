// access the wunderlist API

var request = require('request-promise');
var options = {
  transform: function(body) {
    return JSON.parse(body);
  },
  headers: {
    'X-Access-Token': process.env.WUNDERLIST_ACCESS_TOKEN,
    'X-Client-ID': process.env.WUNDERLIST_CLIENT_ID
  }
};

module.exports = {
  fetch_tasks_by_list_id: function(lid) {
    return request.get(
      `https://a.wunderlist.com/api/v1/tasks?list_id=${lid}`, 
      options
    );
  },

  fetch_note_for_task: function(tid) {
    return request.get(
      `https://a.wunderlist.com/api/v1/notes?task_id=${tid}`, 
      options
    );
  }
};
