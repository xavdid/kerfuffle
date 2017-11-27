import * as express from 'express'
import * as helmet from 'helmet'
const browserify = require('browserify-middleware')
import * as favicon from 'serve-favicon'
import * as path from 'path'

const port = process.env.PORT || 1337

const app = express()
app.use(helmet())

// settings
// loaded by foreman
// app.set('production', process.env.NODE_ENV === 'production')
// if (!app.get('production')) {
//   require('dotenv').load()
// }
console.log('keys', process.env.AIRTABLE_API_KEY, process.env.TMDB_API_KEY)

import config from './config'
import { fetchUnreadBooks } from './services/airtable'

const mediaTypes = Object.keys(config)

app.set('view engine', 'jade')
app.use('/static', express.static(path.join(__dirname, '../../public')))
app.use(favicon(path.join(__dirname, '../../public/favicon.ico')))
// render the client
app.get(
  '/static/app.js',
  browserify(path.join(__dirname, '../client/bundle.js'))
)

const services: { [x: string]: any } = {
  wunderlist: require('./services/wunderlist'),
  gbooks: require('./services/google_books'),
  tmdb: require('./services/tmdb')
}

// handlers
function watcherHandler(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const mediaType = req.path.substring(5) // skips "/api/"
  let task: any
  services.wunderlist
    .fetch_tasks_by_list_id(config[mediaType].id)
    .then((tasks: any) => {
      task = tasks[Math.floor(Math.random() * tasks.length)]
      return services[config[mediaType].service].search(task.title)
    })
    .then((media: any) => {
      res.json({
        media: media,
        task: task
      })
    })
    .catch(next)
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/layout.html'))
})

app.get(
  mediaTypes.map(r => {
    return `/${r}`
  }),
  (req, res, next) => {
    const mediaType = req.path.substring(1)
    res.render(mediaType, {
      media_type: mediaType
    })
  }
)

app.get('/api/abooks', async (req, res) => {
  res.json(await fetchUnreadBooks())
})

// get /api/:media
app.get(
  mediaTypes.map(r => {
    return `/api/${r}`
  }),
  watcherHandler
)

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack)
    res.status(500).send(err)
  }
)

app.use((req, res, next) => {
  res
    .status(404)
    .send(
      `That's not a valid media type! Try [${mediaTypes.join(' | ')}] instead`
    )
})

const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  console.log(`Production mode ${app.get('production') ? '' : 'not'} enabled.`)
})