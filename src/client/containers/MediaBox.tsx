import * as React from 'react'

import Book from '../components/Book'
import Movie from '../components/Movie'
import Show from '../components/Show'
import Header from '../components/Header'
import NextButton from '../components/NextButton'

import { Details } from '../../server/services/interfaces'
import { MediaType } from '../../server/config'

import { shuffle } from 'lodash'

const mediaConf = {
  books: {
    detailsUrl: (id: string) =>
      `https://www.googleapis.com/books/v1/volumes/${id}`,

    component: Book
  },
  movies: {
    detailsUrl: (id: string) => `/api/movies/${id}`,
    component: Movie
  },
  shows: {
    detailsUrl: (id: string) => `/api/shows/${id}`,
    component: Show
  }
}

type MediaBoxProps = { mediaType: MediaType }
type MediaBoxState = {
  ids: string[]
  index: number
  details: { [id: string]: Details }
  loading: boolean
}

export default class MediaBox extends React.Component<
  MediaBoxProps,
  MediaBoxState
> {
  constructor(props: MediaBoxProps) {
    super(props)
    this.state = { ids: [], index: 0, details: {}, loading: true }
    this.nextItem = this.nextItem.bind(this)
  }

  async fetchIds() {
    const items = (await (await fetch(
      // TODO: remove a
      `/api/${this.props.mediaType}`
    )).json()) as string[]

    return shuffle(items)
  }

  async componentDidMount() {
    const ids = await this.fetchIds()

    this.setState({ ids: ids, loading: false })
    this.storeDetails(ids[this.state.index])
  }

  shouldComponentUpdate(np: {}, nextState: MediaBoxState) {
    return Boolean(
      nextState.ids.length && nextState.details[nextState.ids[nextState.index]]
    )
  }

  async nextItem() {
    const nextIndex = (this.state.index + 1) % this.state.ids.length
    const nextId = this.state.ids[nextIndex]
    await this.storeDetails(nextId) // await needed?
    this.setState({ index: nextIndex })
  }

  async storeDetails(id: string) {
    const newDetails: Details = await (await fetch(
      mediaConf[this.props.mediaType].detailsUrl(id)
    )).json()

    if (!this.state.details[newDetails.id]) {
      this.setState({
        details: {
          [newDetails.id]: newDetails,
          ...this.state.details
        }
      })
    }
  }

  render() {
    const Comp = mediaConf[this.props.mediaType].component
    return (
      <div>
        <Header mediaType={this.props.mediaType} />
        <NextButton click={this.nextItem} loading={this.state.loading} />

        {this.state.ids.length ? (
          <Comp
            {...this.state.details[this.state.ids[this.state.index]] as any}
          />
        ) : null}
      </div>
    )
  }
}
