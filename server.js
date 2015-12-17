// loads the webserver

var express = require('express');
var helmet = require('helmet');

const app = express();

// settings
app.set('production', process.env.NODE_ENV === 'production');
app.set('port', (process.env.PORT || 3000));

// local only
if (!app.get('production')) {
  require('dotenv').load();
}

// services
var wunderlist = require('./services/wunderlist');
var wunderlistids = require('./services/wunderlistids');

var services = {
  gbooks: require('./services/google_books'),
  trakt: require('./services/trakt')
};

var router = {
  books: 'gbooks',
  tv_shows: 'trakt',
  movies: 'trakt'
};

// handlers
function watcher_handler(req, res, next) {
  var media = req.path.substring(1);
  wunderlist.fetch_tasks_by_list_id(wunderlistids[media])
    .then(function(tasks){
      var task = tasks[Math.floor(Math.random() * tasks.length)];
      services[router[media]].search(task.title).then(function(movies) {
        res.send(movies);
      });
    })
    .catch(function(err){
      next(err);
    });
}

app.get('/', function (req, res) {
  res.send('Hello World!<br><br><a href="/lists">Goto Lists</a>!');
});

app.get(['/tv_shows', '/movies', '/books'], watcher_handler);

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send(err);
});

var server = app.listen(app.get('port'), function () {
  console.log(`Example app listening on port ${server.address().port}`);
  console.log(`Production mode ${app.get('production') ? '' : 'not'} enabled.`);
});