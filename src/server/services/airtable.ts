import config from '../config'
import { pickBy } from 'lodash'
import { ABook } from './interfaces'

const Airtable = new (require('airtable'))({
  apiKey: process.env.AIRTABLE_API_KEY
})

const base = Airtable.base(config.books.id)

export async function fetchUnreadBooks() {
  const records: ABook[] = await base('Books')
    .select({ view: 'To Read', maxRecords: 5 })
    .all()

  return records.map(record => pickBy(record, (v, k) => !k.startsWith('_')))
}
