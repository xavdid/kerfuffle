import * as React from 'react'
import Book from '../components/Book'
import Header from '../components/Header'
import NextButton from '../components/NextButton'

import {
  AirtableRecord,
  Details,
  MediaType
} from '../../server/services/interfaces'

import MediaItem from '../classes/MediaItem'

import { shuffle } from 'lodash'

import { detailsUrls } from '../../server/config'

type MediaBoxState = {
  items: MediaItem[]
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
    this.state = { items: [], index: 0, details: {}, loading: true }
    this.nextItem = this.nextItem.bind(this)
  }

  setup() {}

  async fetchItems() {
    const rawItems = (await (await fetch(
      // TODO: remove a
      `/api/a${this.mediaType}`
    )).json()) as AirtableRecord[]
    const items = rawItems.map(i => new MediaItem(i, this.mediaType))
    return shuffle(items)
  }

  async componentDidMount() {
    const items = await this.fetchItems()

    this.setState({ items: items, loading: false })
    this.storeDetails(items[this.state.index].extid)
  }

  shouldComponentUpdate(np: {}, ns: MediaBoxState) {
    const nextId = ns.items[ns.index].extid
    return Boolean(ns.items.length && ns.details[nextId])
  }

  async nextItem() {
    const nextIndex = (this.state.index + 1) % this.state.items.length
    const nextId = this.state.items[nextIndex].extid
    await this.storeDetails(nextId) // await needed?
    this.setState({ index: nextIndex })
  }

  async storeDetails(id: string) {
    const d: Details = await (await fetch(
      detailsUrls[this.mediaType](id)
    )).json()

    if (!this.state.details[d.id]) {
      this.setState({
        details: {
          [d.id]: d,
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

        {this.state.items.length ? (
          <this.component
            {...this.state.details[this.state.items[this.state.index].extid]}
          />
        ) : null}
      </div>
    )
  }
}
