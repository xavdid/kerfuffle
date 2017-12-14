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

type MovieBoxState = {
  movies: AMovie[]
  index: number
  movieDetails: { [id: string]: TMDBMovie }
  loading: boolean
}

export class MovieBox extends React.Component<{}, MovieBoxState> {
  // double check codeacademy on the empty props thing
  // also, component inheritence? nextResult, componentDM can be shared
  constructor(props: any) {
    super(props)
    this.state = { movies: [], index: 0, movieDetails: {}, loading: true }
    this.nextMovie = this.nextMovie.bind(this)
  }

  nextMovie() {
    const nextIndex = (this.state.index + 1) % this.state.movies.length
    const nextId = this.state.movies[nextIndex].fields[AMovieFields.tmdbId]
    this.storeMovieInfo(nextId)
    this.setState({ index: nextIndex })
  }

  async componentDidMount() {
    const movies = shuffle(await (await fetch('/api/amovies')).json())
    this.setState({ movies: movies, loading: false })
    this.storeMovieInfo(movies[this.state.index].fields[AMovieFields.tmdbId])
  }

  shouldComponentUpdate(np: {}, ns: MovieBoxState) {
    // console.log('PROPS', this.props, 'becomes', np)
    return Boolean(
      ns.movies.length &&
        ns.movieDetails[ns.movies[ns.index].fields[AMovieFields.tmdbId]]
    )
  }

  async storeMovieInfo(tmdbId: string) {
    const movie: TMDBMovie = await (await fetch(`/api/movie/${tmdbId}`)).json()

    if (!this.state.movieDetails[movie.id]) {
      this.setState({
        movieDetails: {
          [movie.id]: movie,
          ...this.state.movieDetails
        }
      })
    }
  }

  render() {
    return (
      <div>
        <Header mediaType="movies" />
        <NextButton click={this.nextMovie} loading={this.state.loading} />

        {this.state.movies.length ? (
          <Movie
            {...this.state.movieDetails[
              this.state.movies[this.state.index].fields[AMovieFields.tmdbId]
            ]}
          />
        ) : null}
      </div>
    )
  }
}
