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

type genre = { id: number; name: string }[]
export interface TMDBMovie {
  adult: false
  backdrop_path: string
  belongs_to_collection: null
  budget: number
  genres: genre[]
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

export enum AShowFields {
  numSeasons = '# Seasons',
  fate = 'Ultimate Fate',
  tmdbId = 'TMDB ID'
}

export interface AShow {
  id: string
  fields: {
    Name: string
    '# Seasons': number
    Format: string
    'Ultimate Fate': string
    'TMDB ID': string
  }
}

export interface TMDBShow {
  backdrop_path: string
  created_by: {
    id: number
    name: string
    gender: number
    profile_path: string
  }[]
  episode_run_time: number[]
  first_air_date: string
  genres: genre[]
  homepage: string
  id: number
  in_production: boolean
  last_air_date: string
  name: string
  number_of_episodes: number
  number_of_seasons: number
  overview: string
  poster_path: string
  seasons: {
    air_date: string
    episode_count: number
    id: number
    poster_path: string
    season_number: number
  }[]
  // statuses from https://www.themoviedb.org/talk/58b1cfbac3a368077800feb5
  status:
    | 'Returning Series'
    | 'Planned'
    | 'In Production'
    | 'Ended'
    | 'Canceled'
    | 'Pilot'
  vote_average: number
  vote_count: number
}

export type Details = TMDBMovie | GBook | TMDBShow
