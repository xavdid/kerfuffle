import * as React from 'react'

import { imageUrl } from '../../server/config'
import { TMDBMovie } from '../../server/services/interfaces'

import Info from './Info'
import Title from './Title'

// export class Book extends React.Component<GBook> {
export default (props: TMDBMovie) => {
  return props.id ? (
    <div>
      <Title title={props.title} />
      <Info
        description={props.overview}
        extras={[props.release_date.slice(0, 4), props.genres.map(g => g.name)]}
        url={imageUrl(props.poster_path, 'tmdb')}
      />
    </div>
  ) : null
}
