import * as React from 'react'

import { AMovie, TMDBMovie } from '../../server/services/interfaces'
import Title from './Title'
import Info from './Info'

const tmdbCoverImageURL = (id: string) => {
  return `https://image.tmdb.org/t/p/w500${id}`
}

// export class Book extends React.Component<GBook> {
export default (props: TMDBMovie) => {
  return props.id ? (
    <div>
      <Title title={props.title} />
      <Info
        description={props.overview}
        url={tmdbCoverImageURL(props.poster_path)}
      />
    </div>
  ) : null
}
