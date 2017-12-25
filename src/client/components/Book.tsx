import * as React from 'react'

import { imageUrl } from '../../server/config'
import { GBook } from '../../server/services/interfaces'

import Info from './Info'
import Title from './Title'

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
        extras={[
          props.volumeInfo.publishedDate.substring(0, 4),
          props.volumeInfo.categories[0]
        ]}
        url={imageUrl(props.id, 'gbooks')}
      />
    </div>
  ) : null
}
