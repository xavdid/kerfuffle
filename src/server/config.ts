// airtable ids and the services to which they map
type service = 'tmdb' | 'gbooks'

interface ConfigRecord {
  baseId: string
  detailsService: service // where the details come from
  table: string
  view: string
  color: string
  icon: string
}

const config: { [x: string]: ConfigRecord } = {
  books: {
    baseId: 'appv2mhWOgkRhR4rK',
    detailsService: 'gbooks',
    table: 'books',
    view: 'To Read',
    color: 'purple',
    icon: 'book'
  },
  movies: {
    baseId: 'appctKQDyHbyqNJOY',
    detailsService: 'tmdb',
    table: 'movies',
    view: 'To Watch',
    color: 'blue',
    icon: 'film'
  },
  shows: {
    baseId: 'appgycccClQwN0zHz',
    detailsService: 'tmdb',
    table: 'shows',
    view: 'To Watch',
    color: 'darkgreen',
    icon: 'television'
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
