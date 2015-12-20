// loads the webserver

var express = require('express');
var helmet = require('helmet');
var browserify = require('browserify-middleware');
var favicon = require('serve-favicon');

const app = express();

// settings
app.set('production', process.env.NODE_ENV === 'production');
// local only
if (!app.get('production')) {
  require('dotenv').load();
}

var config = require('./config');
var router = config.router;
var wunderlistids = config.wunderlistids;

app.set('port', (process.env.PORT || 3000));
app.set('view engine', 'jade');
app.use('/static', express.static(__dirname + '/public'));
app.use(favicon(__dirname + '/public/favicon.ico'));
// render the client
app.get('/static/app.js', browserify(__dirname + '/public/client.js'));

var media_types = ['shows', 'movies', 'books'];

var services = {
  wunderlist: require('./services/wunderlist'),
  gbooks: require('./services/google_books'),
  trakt: require('./services/trakt')
};

// handlers
function watcher_handler(req, res, next) {
  var media_type = req.path.substring(5); // skips /api/
  services.wunderlist.fetch_tasks_by_list_id(wunderlistids[media_type])
    .then(function(tasks){
      var task = tasks[Math.floor(Math.random() * tasks.length)];
      services[router[media_type]].search(task.title).then(function(media) {
        res.send(media);
      });
    })
    .catch(function(err){
      next(err);
    });
}

app.get('/', function (req, res) {
  res.send('Hello World!<br><br><a href="/lists">Goto Lists</a>!');
});

app.get(media_types.map(r => {return `/${r}`;}), function(req, res, next) {
  var media_type = req.path.substring(1);
  res.render(media_type, {media_type: media_type});
});

// get /api/:media
app.get(media_types.map(r => {return `/api/${r}`;}), watcher_handler);

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send(err);
});

app.use(function(req, res, next) {
  res.status(404).send(`That's not a valid media type! Try [${media_types.join(' | ')}] instead`);
});

var server = app.listen(app.get('port'), function () {
  console.log(`Example app listening on port ${server.address().port}`);
  console.log(`Production mode ${app.get('production') ? '' : 'not'} enabled.`);
});