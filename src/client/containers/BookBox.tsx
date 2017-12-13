import * as React from 'react'
import Book from '../components/Book'
import Header from '../components/Header'
import NextButton from '../components/NextButton'

import { ABookFields, ABook, GBook } from '../../server/services/interfaces'
import { shuffle } from 'lodash'

const gBooksAPIURL = (gbid: string) => {
  return `https://www.googleapis.com/books/v1/volumes/${gbid}`
}

type BookBoxState = {
  books: ABook[]
  index: number
  bookDetails: { [id: string]: GBook }
  loading: boolean
}

export class BookBox extends React.Component<{}, BookBoxState> {
  constructor(props: any) {
    super(props)
    this.state = { books: [], index: 0, bookDetails: {}, loading: true }
    this.nextBook = this.nextBook.bind(this)
  }

  async componentDidMount() {
    console.log('mounting!')
    const books: ABook[] = shuffle(await (await fetch('/api/abooks')).json())

    this.setState({ books: books, loading: false })
    this.storeBookInfo(books[this.state.index].fields[ABookFields.gbid])
  }

  shouldComponentUpdate(np: {}, ns: BookBoxState) {
    // console.log('PROPS', this.props, 'becomes', np)
    return Boolean(
      ns.books.length &&
        ns.bookDetails[ns.books[ns.index].fields[ABookFields.gbid]]
    )
  }

  async nextBook() {
    const nextIndex = (this.state.index + 1) % this.state.books.length
    const nextId = this.state.books[nextIndex].fields[ABookFields.gbid]
    await this.storeBookInfo(nextId) // await needed?
    this.setState({ index: nextIndex })
  }

  async storeBookInfo(gbid: string) {
    const url = gBooksAPIURL(gbid)
    const book: GBook = await (await fetch(url)).json()

    if (!this.state.bookDetails[book.id]) {
      this.setState({
        bookDetails: {
          [book.id]: book,
          ...this.state.bookDetails
        }
      })
    }
  }

  render() {
    return (
      <div>
        <Header mediaType="books" />
        <NextButton click={this.nextBook} loading={this.state.loading} />

        {this.state.books.length ? (
          <Book
            {...this.state.bookDetails[
              this.state.books[this.state.index].fields[ABookFields.gbid]
            ]}
          />
        ) : null}
      </div>
    )
  }
}
