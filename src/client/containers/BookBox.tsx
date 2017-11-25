import * as React from 'react'
import Book from '../components/Book'
import { ABookFields, ABook, GBook } from '../../server/services/interfaces'

const gBooksAPIURL = (gbid: string) => {
  return `https://www.googleapis.com/books/v1/volumes/${gbid}`
}

export class BookBox extends React.Component<
  {},
  { books: ABook[]; index: number; bookDetails: { [id: string]: GBook } }
> {
  constructor(props = {}) {
    super(props)
    this.state = { books: [], index: 0, bookDetails: {} }
    this.nextBook = this.nextBook.bind(this)
  }
  async componentDidMount() {
    console.log('mounting!')
    const books: ABook[] = await (await fetch('/api/abooks')).json()

    this.setState({ books: books, bookDetails: {} })
    this.storeBookInfo(books[this.state.index].fields[ABookFields.gbid])
  }

  shouldComponentUpdate(np: any, ns: any) {
    // console.log('PROPS', this.props, 'becomes', np)
    console.log('STATE', this.state, 'becomes', ns)
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
          <i className="fa fa-refresh fa-2x" />
        </button>
      </div>
    )
  }
}
