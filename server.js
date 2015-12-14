// loads the webserver

var express = require('express');
var helmet = require('helmet');

const app = express();
app.use(helmet()); // security!

app.set('port', (process.env.PORT || 3000));
app.set('production', process.env.NODE_ENV === 'production');

if (!app.get('production')) {
  require('dotenv').load();
}

app.get('/', function (req, res) {
  res.send('Hello World!<br><br><a href="/lists">Goto Lists</a>!');
});

app.get('/lists', function(req, res, next) {
  var request = require('request');
  var options = {
    url: 'https://a.wunderlist.com/api/v1/lists',
    headers: {
      'X-Access-Token': process.env.WUNDERLIST_ACCESS_TOKEN,
      'X-Client-ID': process.env.WUNDERLIST_CLIENT_ID
    }
  };

  request(options, function(err, resp, body){
    var lists = JSON.parse(body);
    if (!err && resp.statusCode === 200) {
      var list = lists[Math.floor(Math.random()*lists.length)];
      res.send(list);
    } else {
      console.log('code: ',resp.statusCode);
      res.send(body);
    }
  });

  // var WunderlistSDK = require('wunderlist');
  // var wunderlist = new WunderlistSDK({
  //   'accessToken': process.env.WUNDERLIST_ACCESS_TOKEN,
  //   'clientID': process.env.WUNDERLIST_CLIENT_ID
  // });

  // wunderlist.http.lists.all()
  //   .done(function (lists) {
  //     console.log(lists);
  //   })
  //   .fail(function () {
  //     console.error('there was a problem');
  //   });
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

var server = app.listen(app.get('port'), function () {
  console.log(`Example app listening on port ${server.address().port}`);
  console.log(`Production mode ${app.get('production') ? '' : 'not'} enabled.`);
});