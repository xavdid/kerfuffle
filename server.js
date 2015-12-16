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
var gbooks = require('./services/google_books');

app.get('/', function (req, res) {
  res.send('Hello World!<br><br><a href="/lists">Goto Lists</a>!');
});

app.get('/books', function(req, res, next) {
  wunderlist.fetch_tasks_by_list_id('107797412')
    .then(function(tasks){
      // console.log(tasks);
      var task = tasks[Math.floor(Math.random() * tasks.length)];
      gbooks.search_books(task.title).then(function(book){
        res.send(book);
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