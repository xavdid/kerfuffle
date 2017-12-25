import config from '../config'
import { pickBy, capitalize } from 'lodash'
import { ABook, ABookFields, AMovieFields, AMovie } from './interfaces'

const Airtable = new (require('airtable'))({
  apiKey: process.env.AIRTABLE_API_KEY
})

export async function fetchUnreadBookIds() {
  const base = Airtable.base(config.books.baseId)
  const records: ABook[] = await base(capitalize(config.books.view))
    .select({ view: 'To Read' })
    .all()

  return records.map(record => record.fields[ABookFields.gbid])
}

export async function fetchUnwatchedMovieIds() {
  const base = Airtable.base(config.movies.baseId)
  const records: AMovie[] = await base(capitalize(config.movies.view))
    .select({ view: 'To Watch' })
    .all()

  return records.map(record => record.fields[AMovieFields.tmdbId])
}

export async function fetchUnwathedShowIds() {
  const base = Airtable.base(config.shows.baseId)
  const records: AMovie[] = await base(capitalize(config.shows.view))
    .select({ view: 'To Watch' })
    .all()

  return records.map(record => record.fields[AMovieFields.tmdbId])
}
