import * as React from 'react'

export class MovieBox extends React.Component<
  {},
  { movies: any[]; index: number }
> {
  // double check codeacademy on the empty props thing
  // also, component inheritence? nextResult, componentDM can be shared
  constructor(props = {}) {
    super(props)
    this.state = { movies: [], index: 0 }
    this.nextMovie = this.nextMovie.bind(this)
  }

  nextMovie() {
    const nextIndex = (this.state.index + 1) % this.state.movies.length
    this.setState({ index: nextIndex })
  }

  async componentDidMount() {
    console.log('mounting!')
    const movies = await (await fetch('/api/amovies')).json()
    this.setState({ movies: movies })
  }
}
