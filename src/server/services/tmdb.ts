// perform searches against the trakt api
import * as got from 'got'

const tmdbRequest = (resource: 'movie' | 'tv', id: string) => {
  return got(`https://api.themoviedb.org/3/${resource}/${id}`, {
    query: {
      api_key: process.env.TMDB_API_KEY
    },
    json: true
  })
}

const fetchMovieDetails = async (tmdbId: string) => {
  return (await tmdbRequest('movie', tmdbId)).body
}

const fetchShowDetails = async (tmdbId: string) => {
  return (await tmdbRequest('tv', tmdbId)).body
}

export default {
  movies: fetchMovieDetails,
  shows: fetchShowDetails
}
