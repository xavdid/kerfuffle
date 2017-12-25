// airtable ids and the services to which they map
type service = 'tmdb' | 'gbooks'

interface ConfigRecord {
  baseId: string
  service: service
  view: string
  color: string
  icon: string
}

const config: { [x: string]: ConfigRecord } = {
  shows: {
    baseId: 'appgycccClQwN0zHz',
    service: 'tmdb',
    view: 'shows',
    color: 'darkgreen',
    icon: 'television'
  },
  books: {
    baseId: 'appv2mhWOgkRhR4rK',
    service: 'gbooks',
    view: 'books',
    color: 'purple',
    icon: 'book'
  },
  movies: {
    baseId: 'appctKQDyHbyqNJOY',
    service: 'tmdb',
    view: 'movies',
    color: 'blue',
    icon: 'film'
  }
}

export const imageUrl = (id: string, serv: service) => {
  if (serv === 'gbooks') {
    return `https://books.google.com/books/content/images/frontcover/${id}?fife=w300-rw`
  } else {
    return `https://image.tmdb.org/t/p/w500${id}`
  }
}

export const mediaTypes = Object.keys(config).sort()
export type MediaType = 'books' | 'movies' | 'shows'

export default config
