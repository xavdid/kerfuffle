// loads the webserver

var express = require('express');
var helmet = require('helmet');
var wunderlist = require('./services/wunderlist');

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

app.get('/lists/:id', function(req, res, next) {
  wunderlist.fetch_items_by_list_id(req.params.id).then(function(items){
    var item = items[Math.floor(Math.random() * items.length)];
    res.send(item); 
  });
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send(err);
});

var server = app.listen(app.get('port'), function () {
  console.log(`Example app listening on port ${server.address().port}`);
  console.log(`Production mode ${app.get('production') ? '' : 'not'} enabled.`);
});