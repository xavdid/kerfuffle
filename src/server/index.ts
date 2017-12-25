import * as express from 'express'
import * as helmet from 'helmet'
import * as favicon from 'serve-favicon'
import * as path from 'path'

const app = express()
app.use(helmet())

// dotenv is loaded by foreman

import { mediaTypes, MediaType } from './config'
import fetchMethods from './services/airtable'
import fetchDetailMethods from './services/tmdb'

app.use('/static', express.static(path.join(__dirname, '../../public')))
app.use(favicon(path.join(__dirname, '../../public/favicon.ico')))

mediaTypes.map((mt: MediaType) => {
  // lists of ids
  app.get(`/api/${mt}`, async (req, res) => {
    res.json(await fetchMethods[mt]())
  })

  // tmdb calls, but not for books
  if (mt !== 'books') {
    app.get(`/api/${mt}/:id`, async (req, res) => {
      res.json(await fetchDetailMethods[mt](req.params.id))
    })
  }
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/layout.html'))
})

const port = process.env.PORT || 1337
const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  console.log(`Production mode ${app.get('production') ? '' : 'not'} enabled.`)
})
