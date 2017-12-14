import * as React from 'react'

import { ABookFields, ABook, GBook } from '../../server/services/interfaces'
import Title from './Title'
import Info from './Info'

const gBooksCoverImageURL = (id: string) => {
  return `https://books.google.com/books/content/images/frontcover/${
    id
  }?fife=w300-rw`
}

// export class Book extends React.Component<GBook> {
export default (props: GBook) => {
  return props.id ? (
    <div>
      <Title
        // last names only is props.fields.Author
        title={props.volumeInfo.title}
        authors={props.volumeInfo.authors}
      />
      <Info
        description={props.volumeInfo.description}
        url={gBooksCoverImageURL(props.id)}
      />
    </div>
  ) : null
}
