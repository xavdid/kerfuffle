import * as React from 'react'
import { BookFields, ABook, GBook } from '../../server/services/interfaces'

const gbooksURL = (gbid: string) => {
  return `https://www.googleapis.com/books/v1/volumes/${gbid}`
}

const coverImageURL = (id: string) => {
  return `https://books.google.com/books/content/images/frontcover/${id}?fife=w300-rw`
}

const authorNames = (names: string[]) => {
  return names.join(', ')
}

const fetchBookInfo = async (id: string) => {
  const url = gbooksURL(id)
  console.log('fetching', url)
  const book: GBook = (await (await fetch(url)).json()).volumeInfo
  return book
}

export class Book extends React.Component<ABook, { book?: GBook }> {
  constructor(props: ABook) {
    console.log('constructing', props)
    super(props)
    this.state = {}
  }

  async componentDidMount() {
    console.log('just mounted')

    const book = await fetchBookInfo(this.props.fields[BookFields.gbid])
    // if (!book) {}
    await this.setState({ book: book })
  }

  render() {
    console.log('book render', this.props, this.state)
    return this.props.id ? (
      <div>
        <h3>
          How about{' '}
          <strong className="orange">
            {this.props.fields[BookFields.title]}
          </strong>{' '}
          by{' '}
          <span className="darkgreen">
            {this.state.book
              ? authorNames(this.state.book.authors)
              : authorNames(this.props.fields.Author)}
          </span>
          ?
        </h3>
        <div className="row">
          <div className="col-sm-8">
            <p className="text-justify">
              {this.state.book ? this.state.book.description : 'Loading...'}
            </p>
          </div>
          <div className="col-sm-4">
            <img
              className="img-responsive center-block cover"
              src={coverImageURL(this.props.fields[BookFields.gbid])}
            />
          </div>
        </div>
      </div>
    ) : null
  }
}
