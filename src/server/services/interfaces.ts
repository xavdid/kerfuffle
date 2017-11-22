export interface ABook {
  id: string
  fields: {
    Author: string[]
    Style: string
    'Book Name': string
    'Year Published': number
    'Google Books ID': string
  }
}

export interface GBook {
  title: string
  authors: string[]
  publisher: string
  publishedDate: string // ISO
  description: string
  categories: string[]
  averageRating: number
  ratingsCount: number
}

export enum ABookFields {
  title = 'Book Name',
  year = 'Year Published',
  gbid = 'Google Books ID'
}
