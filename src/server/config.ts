// airtable ids and the services to which they map

interface ConfigRecord {
  id: string
  service: 'tmdb' | 'gbooks'
  view: string
}

const config: { [x: string]: ConfigRecord } = {
  shows: {
    id: 'appgycccClQwN0zHz',
    service: 'tmdb',
    view: 'shows'
  },
  books: {
    id: 'appv2mhWOgkRhR4rK',
    service: 'gbooks',
    view: 'books'
  },
  movies: {
    id: 'appctKQDyHbyqNJOY',
    service: 'tmdb',
    view: 'movies'
  }
}

export default config
