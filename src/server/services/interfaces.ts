export enum ABookFields {
  title = 'Book Name',
  year = 'Year Published',
  gbid = 'Google Books ID'
}

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
  // lots more included, but we skip a lot
  // https://www.googleapis.com/books/v1/volumes/a8KtDgAAQBAJ
  id: string
  volumeInfo: GVolumeInfo
}

export interface GVolumeInfo {
  title: string
  authors: string[]
  publisher: string
  publishedDate: string // ISO
  description: string
  categories: string[]
  averageRating: number
  ratingsCount: number
}

export enum AMovieFields {
  title = 'Title',
  tmdbId = 'TMDB ID',
  released = 'Originally Released',
  directors = 'Director'
}

export interface AMovie {
  id: string
  fields: {
    Title: string
    // poster: any[] // array of file attachments
    Director: string[]
    'TMDB ID': string
    'Originally Released': string
  }
}

export interface TMDBMovie {
  adult: false
  backdrop_path: string
  belongs_to_collection: null
  budget: number
  genres: { id: number; name: string }[]
  homepage: string
  id: number
  imdb_id: string
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  runtime: number
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: string
  vote_count: string
}

export type AirtableRecord = AMovie | ABook
export type Details = TMDBMovie | GBook
export type ExternalID = AMovieFields.tmdbId | ABookFields.gbid
export type MediaType = 'books' | 'movies' | 'shows'
