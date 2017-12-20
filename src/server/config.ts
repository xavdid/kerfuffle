// airtable ids and the services to which they map

interface ConfigRecord {
  id: string
  service: 'tmdb' | 'gbooks'
  view: string
  color: string
  icon: string
}

const config: { [x: string]: ConfigRecord } = {
  shows: {
    id: 'appgycccClQwN0zHz',
    service: 'tmdb',
    view: 'shows',
    color: 'darkgreen',
    icon: 'television'
  },
  books: {
    id: 'appv2mhWOgkRhR4rK',
    service: 'gbooks',
    view: 'books',
    color: 'purple',
    icon: 'book'
  },
  movies: {
    id: 'appctKQDyHbyqNJOY',
    service: 'tmdb',
    view: 'movies',
    color: 'blue',
    icon: 'film'
  }
}

export const detailsUrls: { [mt: string]: (id: string) => string } = {
  movies: (id: string) => `/api/movie/${id}`,
  books: (id: string) => `https://www.googleapis.com/books/v1/volumes/${id}`
}

export default config
