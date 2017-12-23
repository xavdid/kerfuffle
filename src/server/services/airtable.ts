import config from '../config'
import { pickBy } from 'lodash'
import { ABook, ABookFields, AMovieFields, AMovie } from './interfaces'

const Airtable = new (require('airtable'))({
  apiKey: process.env.AIRTABLE_API_KEY
})

export async function fetchUnreadBookIds() {
  const base = Airtable.base(config.books.baseId)
  const records: ABook[] = await base('Books')
    .select({ view: 'To Read' })
    .all()

  return records.map(record => record.fields[ABookFields.gbid])
}

export async function fetchUnwatchedMovieIds() {
  const base = Airtable.base(config.movies.baseId)
  const records: AMovie[] = await base('Movies')
    .select({ view: 'To Watch' })
    .all()

  return records.map(record => record.fields[AMovieFields.tmdbId])
}
