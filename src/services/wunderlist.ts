// access the wunderlist API
import * as request from 'request-promise'

const options = {
  transform: function(body: string) {
    return JSON.parse(body)
  },
  headers: {
    'X-Access-Token': process.env.WUNDERLIST_ACCESS_TOKEN,
    'X-Client-ID': process.env.WUNDERLIST_CLIENT_ID
  }
}

function url(lid: string) {
  return `https://a.wunderlist.com/api/v1/tasks?list_id=${lid}`
}

module.exports = {
  fetch_tasks_by_list_id: function(lid: string) {
    return request.get(url(lid), options)
  }
}

// // access the wunderlist API
// import * as got from 'got'

// const options = {
//   headers: {
//     'X-Access-Token': process.env.WUNDERLIST_ACCESS_TOKEN,
//     'X-Client-ID': process.env.WUNDERLIST_CLIENT_ID
//   },
//   json: true
// }

// function url(lid: string) {
//   return `https://a.wunderlist.com/api/v1/tasks?list_id=${lid}`
// }

// module.exports = {
//   fetch_tasks_by_list_id: function(lid: string) {
//     return got(url(lid), options)
//   }
// }
