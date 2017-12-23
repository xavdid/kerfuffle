import * as React from 'react'

import { GBook } from '../../server/services/interfaces'
import { imageUrl } from '../../server/config'

import Title from './Title'
import Info from './Info'

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
        url={imageUrl(props.id, 'gbooks')}
      />
    </div>
  ) : null
}
