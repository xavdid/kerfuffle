import * as React from 'react'
import Book from '../components/Book'
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
  constructor(props = {}) {
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
    this.storeBookInfo(nextId)
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
        <h1>
          So you're looking for a <span className="purple">book</span>
        </h1>
        {this.state.books.length ? (
          <Book
            {...this.state.bookDetails[
              this.state.books[this.state.index].fields[ABookFields.gbid]
            ]}
          />
        ) : null}
        <button
          className="btn btn-default btn-lg spaced"
          onClick={this.nextBook}
        >
          <i
            className={`fa fa-refresh fa-2x ${
              this.state.loading ? 'fa-spin' : ''
            }`}
          />
        </button>
      </div>
    )
  }
}
