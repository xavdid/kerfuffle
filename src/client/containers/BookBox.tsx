import * as React from 'react'
import { Book } from '../components/Book'

export class BookBox extends React.Component<
  {},
  { books: any[]; index: number }
> {
  constructor(props = {}) {
    super(props)
    this.state = { books: [], index: 0 }
    console.log('constructing', this.state)
  }
  async componentDidMount() {
    console.log('mounting!')
    const books = await (await fetch('/api/abooks')).json()
    console.log(books[0])
    this.setState({ books: books })
  }

  render() {
    return <Book {...this.state.books[this.state.index]} />
  }
}
