import * as React from 'react'
import Book from '../components/Book'
import Header from '../components/Header'
import NextButton from '../components/NextButton'

import { shuffle } from 'lodash'
import {
  AirtableRecord,
  Details,
  ExternalID
} from '../../server/services/interfaces'

type MediaBoxState = {
  items: AirtableRecord[]
  index: number
  details: { [id: string]: Details }
  loading: boolean
}

export default abstract class MediaBox extends React.Component<
  {},
  MediaBoxState
> {
  idStr: ExternalID
  fetchEndpoint: string
  detailsUrl: (id: string) => string
  mediaType: string
  comp: any

  constructor(props: any) {
    super(props)
    this.setup()
    this.state = { items: [], index: 0, details: {}, loading: true }
    this.nextItem = this.nextItem.bind(this)
  }

  setup() {}

  async componentDidMount() {
    const items = shuffle(
      await (await fetch(this.fetchEndpoint)).json()
    ) as AirtableRecord[]

    this.setState({ items: items, loading: false })
    this.storeBookInfo(items[this.state.index].fields[this.idStr])
  }

  shouldComponentUpdate(np: {}, ns: MediaBoxState) {
    const nextId = ns.items[ns.index].fields[this.idStr]
    return Boolean(ns.items.length && ns.details[nextId])
  }

  async nextItem() {
    const nextIndex = (this.state.index + 1) % this.state.items.length
    const a = this.state.items[nextIndex].fields
    const nextId = this.state.items[nextIndex].fields[this.idStr]
    await this.storeBookInfo(nextId) // await needed?
    this.setState({ index: nextIndex })
  }

  async storeBookInfo(id: string) {
    const item = await (await fetch(this.detailsUrl(id))).json()

    if (!this.state.details[item.id]) {
      this.setState({
        details: {
          [item.id]: item,
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
          <this.comp
            {...this.state.details[
              this.state.items[this.state.index].fields[this.idStr]
            ]}
          />
        ) : null}
      </div>
    )
  }
}
