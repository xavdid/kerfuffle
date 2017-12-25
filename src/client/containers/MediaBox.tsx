import * as React from 'react'
import Book from '../components/Book'
import Header from '../components/Header'
import NextButton from '../components/NextButton'

import { Details } from '../../server/services/interfaces'
import { MediaType } from '../../server/config'

import { shuffle } from 'lodash'

const detailsUrls: { [mt: string]: (id: string) => string } = {
  movies: (id: string) => `/api/movie/${id}`,
  books: (id: string) => `https://www.googleapis.com/books/v1/volumes/${id}`,
  shows: (id: string) => `/api/show/${id}`
}

type MediaBoxState = {
  ids: string[]
  index: number
  details: { [id: string]: Details }
  loading: boolean
}

export default abstract class MediaBox extends React.Component<
  {},
  MediaBoxState
> {
  mediaType: MediaType
  component: (props: any) => JSX.Element | null

  constructor(props: any) {
    super(props)
    this.setup()
    this.state = { ids: [], index: 0, details: {}, loading: true }
    this.nextItem = this.nextItem.bind(this)
  }

  setup() {}

  async fetchIds() {
    const items = (await (await fetch(
      // TODO: remove a
      `/api/a${this.mediaType}`
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
      detailsUrls[this.mediaType](id)
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
    return (
      <div>
        <Header mediaType={this.mediaType} />
        <NextButton click={this.nextItem} loading={this.state.loading} />

        {this.state.ids.length ? (
          <this.component
            {...this.state.details[this.state.ids[this.state.index]]}
          />
        ) : null}
      </div>
    )
  }
}
