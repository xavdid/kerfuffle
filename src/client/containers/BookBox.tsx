import * as React from 'react'
import { Book } from '../components/Book'
import { ABookFields, ABook, GBook } from '../../server/services/interfaces'

const gBooksAPIURL = (gbid: string) => {
  return `https://www.googleapis.com/books/v1/volumes/${gbid}`
}

// const gBooksCoverImageURL = (id: string) => {
//   return `https://books.google.com/books/content/images/frontcover/${id}?fife=w300-rw`
// }

const fetchBookInfo = async (gbid: string) => {
  const url = gBooksAPIURL(gbid)
  console.log('fetching', url)
  const book: GBook = await (await fetch(url)).json()
  return book
}

const getBookInfo = async (id: string) => {}

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
    const books = await (await fetch('/api/abooks')).json()
    console.log(books[0])
    this.setState({ books: books })
  }

  async nextBook() {
    const nextIndex = (this.state.index + 1) % this.state.books.length
    // check if we've fetched data for that
    let resState: any = { index: nextIndex }
    const nextId = this.state.books[nextIndex].fields[ABookFields.gbid]
    console.log('next id is', nextId)

    if (!this.state.bookDetails[nextId]) {
      resState.bookDetails = {
        [nextId]: await fetchBookInfo(nextId),
        ...this.state.bookDetails
      }
    }
    this.setState(resState)
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
