import { capitalize } from 'lodash'

import config, { MediaType } from '../config'
import { ABookFields, AMovieFields, AShowFields } from './interfaces'

const Airtable = new (require('airtable'))({
  apiKey: process.env.AIRTABLE_API_KEY
})

const fetchIds = async (mt: MediaType, extId: string) => {
  const base = Airtable.base(config[mt].baseId)
  const records = await base(capitalize(config[mt].table))
    .select({ view: config[mt].view })
    .all()

  return records.map((record: any) => record.fields[extId])
}

export const bookIdsToDownload = async () => {
  const base = Airtable.base(config.books.baseId)
  const records = await base(capitalize(config.books.table))
    .select({ view: 'Need to Download' })
    .all()

  return records
    .filter((rename: any) => rename.fields['Need to Download'])
    .map((record: any) => record.fields[ABookFields.gbid])
}

const fetchUnreadBookIds = async () => {
  return await fetchIds('books', ABookFields.gbid)
}

const fetchUnwatchedMovieIds = async () => {
  return await fetchIds('movies', AMovieFields.tmdbId)
}

const fetchUnwatchedShowIds = async () => {
  return await fetchIds('shows', AShowFields.tmdbId)
}

export default {
  books: fetchUnreadBookIds,
  movies: fetchUnwatchedMovieIds,
  shows: fetchUnwatchedShowIds
}
