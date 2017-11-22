import * as React from 'react'

import { ABookFields, ABook, GBook } from '../../server/services/interfaces'
import Title from './Title'
import Info from './Info'

const gBooksAPIURL = (gbid: string) => {
  return `https://www.googleapis.com/books/v1/volumes/${gbid}`
}

const gBooksCoverImageURL = (id: string) => {
  return `https://books.google.com/books/content/images/frontcover/${id}?fife=w300-rw`
}

const fetchBookInfo = async (id: string) => {
  const url = gBooksAPIURL(id)
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

  // async componentDidMount() {
  //   console.log('just mounted')

  //   const book = await fetchBookInfo(this.props.fields[BookFields.gbid])
  //   // if (!book) {}
  //   await this.setState({ book: book })
  // }

  async componentWillReceiveProps(nextProps: ABook) {
    console.log('recieving props', nextProps, 'to overwrite', this.props)
    if (nextProps.id && nextProps.id !== this.props.id) {
      console.log('updating!')
      const book = await fetchBookInfo(this.props.fields[ABookFields.gbid])
      await this.setState({ book: book })
    } else {
      console.log('not updating')
    }
  }

  render() {
    console.log('book render', this.props, this.state)
    return this.props.id ? (
      <div>
        <Title
          // last names only is this.props.fields.Author
          title={this.props.fields[ABookFields.title]}
          authors={this.state.book ? this.state.book.authors : undefined}
        />
        <Info
          description={
            this.state.book ? this.state.book.description : 'Loading...'
          }
          url={gBooksCoverImageURL(this.props.fields[ABookFields.gbid])}
        />
      </div>
    ) : null
  }
}
