import * as express from 'express'
import * as helmet from 'helmet'
import * as favicon from 'serve-favicon'
import * as path from 'path'

const port = process.env.PORT || 1337

const app = express()
app.use(helmet())

// dotenv is loaded by foreman

import config, { mediaTypes } from './config'
import {
  fetchUnreadBookIds,
  fetchUnwatchedMovieIds,
  fetchUnwatchedShowIds
} from './services/airtable'
import { fetchMovieDetails, fetchShowDetails } from './services/tmdb'

app.use('/static', express.static(path.join(__dirname, '../../public')))
app.use(favicon(path.join(__dirname, '../../public/favicon.ico')))

app.get('/api/books', async (req, res) => {
  res.json(await fetchUnreadBookIds())
})

app.get('/api/shows', async (req, res) => {
  res.json(await fetchUnwatchedShowIds())
})

app.get('/api/movies', async (req, res, next) => {
  res.json(await fetchUnwatchedMovieIds())
})

app.get('/api/movie/:id', async (req, res) => {
  res.json(await fetchMovieDetails(req.params.id))
})

app.get('/api/show/:id', async (req, res) => {
  res.json(await fetchShowDetails(req.params.id))
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/layout.html'))
})

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

const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  console.log(`Production mode ${app.get('production') ? '' : 'not'} enabled.`)
})
