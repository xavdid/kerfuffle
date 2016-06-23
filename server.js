// loads the webserver
'use strict'

const express = require('express')
const helmet = require('helmet')
const browserify = require('browserify-middleware')
const favicon = require('serve-favicon')
const path = require('path')

const app = express()
app.use(helmet())

// settings
app.set('production', process.env.NODE_ENV === 'production')
// local only
if (!app.get('production')) {
  require('dotenv').load()
}

const config = require('./config')
const mediaTypes = Object.keys(config)

app.set('port', (process.env.PORT || 3000))
app.set('view engine', 'jade')
app.use('/static', express.static(path.join(__dirname, '/public')))
app.use(favicon(path.join(__dirname, '/public/favicon.ico')))
// render the client
app.get('/static/app.js', browserify(path.join(__dirname, '/public/client.js')))

const services = {
  wunderlist: require('./services/wunderlist'),
  gbooks: require('./services/google_books'),
  trakt: require('./services/trakt')
}

// handlers
function watcherHandler (req, res, next) {
  const mediaType = req.path.substring(5) // skips "/api/"
  services.wunderlist.fetch_tasks_by_list_id(config[mediaType].id)
    .then((tasks) => {
      const task = tasks[Math.floor(Math.random() * tasks.length)]
      services[config[mediaType].service].search(task.title).then((media) => {
        res.json({
          media: media,
          task: task
        })
      })
    })
    .catch((err) => {
      next(err)
    })
}

app.get('/', (req, res) => {
  res.render('index', {
    media_type: 'index'
  })
})

app.get(mediaTypes.map((r) => { return `/${r}` }), (req, res, next) => {
  const mediaType = req.path.substring(1)
  res.render(mediaType, {
    media_type: mediaType
  })
})

// get /api/:media
app.get(mediaTypes.map((r) => { return `/api/${r}` }), watcherHandler)

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send(err)
})

app.use((req, res, next) => {
  res.status(404).send(`That's not a valid media type! Try [${mediaTypes.join(' | ')}] instead`)
})

const server = app.listen(app.get('port'), () => {
  console.log(`Example app listening on port ${server.address().port}`)
  console.log(`Production mode ${app.get('production') ? '' : 'not'} enabled.`)
})
