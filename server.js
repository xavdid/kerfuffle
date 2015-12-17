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
var gbooks = require('./services/google_books');
var trakt = require('./services/trakt');

app.get('/', function (req, res) {
  res.send('Hello World!<br><br><a href="/lists">Goto Lists</a>!');
});

app.get('/books', function(req, res, next) {
  wunderlist.fetch_tasks_by_list_id(wunderlistids.books)
    .then(function(tasks){
      var task = tasks[Math.floor(Math.random() * tasks.length)];
      gbooks.search_books(task.title).then(function(book){
        res.send(book);
      });
      
    })
    .catch(function(err){
      next(err);
    });
});

app.get('/movies', function(req, res, next) {
  wunderlist.fetch_tasks_by_list_id(wunderlistids.movies)
    .then(function(tasks){
      var task = tasks[Math.floor(Math.random() * tasks.length)];
      trakt.search_for_media(task.title).then(function(movies){
        // let's just assume the first result is the best
        res.send(movies[0]);
      });
    })
    .catch(function(err){
      next(err);
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