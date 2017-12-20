import * as React from 'react'
import {
  AMovieFields,
  AMovie,
  TMDBMovie
} from '../../server/services/interfaces'
import Header from '../components/Header'
import NextButton from '../components/NextButton'
import Movie from '../components/Movie'
import { shuffle } from 'lodash'
import MediaBox from './MediaBox'

export class MovieBox extends MediaBox {
  setup() {
    this.idStr = AMovieFields.tmdbId
    this.fetchEndpoint = '/api/amovies'
    this.detailsUrl = (id: string) => `/api/movie/${id}`
    this.comp = Movie
    this.mediaType = 'movies'
  }
}
