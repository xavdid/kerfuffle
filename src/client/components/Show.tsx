import * as React from 'react'

import { TMDBShow } from '../../server/services/interfaces'
import { imageUrl } from '../../server/config'
import Title from './Title'
import Info from './Info'

// export class Book extends React.Component<GBook> {
export default (props: TMDBShow) => {
  return props.id ? (
    <div>
      <Title title={props.name} />
      <Info
        description={props.overview}
        url={imageUrl(props.poster_path, 'tmdb')}
      />
    </div>
  ) : null
}
