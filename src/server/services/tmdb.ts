// perform searches against the trakt api
import * as got from 'got'
import { TMDBMovie } from './interfaces'

function tmdbRequest(resource: 'movie' | 'tv', id: string) {
  return got(`https://api.themoviedb.org/3/${resource}/${id}`, {
    query: {
      api_key: process.env.TMDB_API_KEY
    },
    json: true
  })
}

export async function fetchMovieDetails(tmdbId: string): Promise<TMDBMovie> {
  const res = await tmdbRequest('movie', tmdbId)
  return res.body
}
