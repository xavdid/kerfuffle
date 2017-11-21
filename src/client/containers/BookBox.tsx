import * as React from 'react'
import { Book } from '../components/Book'
import { BookFields, ABook, GBook } from '../../server/services/interfaces'

export class BookBox extends React.Component<
  {},
  { books: ABook[]; index: number }
> {
  constructor(props = {}) {
    super(props)
    this.state = { books: [], index: 0 }
    this.nextBook = this.nextBook.bind(this)
  }
  async componentDidMount() {
    console.log('mounting!')
    const books = await (await fetch('/api/abooks')).json()
    console.log(books[0])
    this.setState({ books: books })
  }

  nextBook() {
    const nextIndex = (this.state.index + 1) % this.state.books.length
    this.setState({ index: nextIndex })
  }

  render() {
    return (
      <div>
        {this.state.books.length ? (
          <Book {...this.state.books[this.state.index]} />
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
