import * as React from 'react'

import { imageUrl } from '../../server/config'
import { TMDBShow } from '../../server/services/interfaces'

import Info from './Info'
import Title from './Title'

const pluralize = (n: number, s: string) => {
  if (n === 1) {
    return s
  } else {
    // will have to modify if there's words that don't pluralize so cleanly
    return `${s}s`
  }
}

// export class Book extends React.Component<GBook> {
export default (props: TMDBShow) => {
  return props.id ? (
    <div>
      <Title title={props.name} authors={props.created_by.map(c => c.name)} />
      <Info
        description={props.overview}
        extras={[
          props.first_air_date.slice(0, 4),
          props.genres.map(g => g.name),
          props.status,
          `${props.number_of_seasons} ${pluralize(
            props.number_of_seasons,
            'Season'
          )} (${props.number_of_episodes} ${pluralize(
            props.number_of_episodes,
            'Episode'
          )})`
        ]}
        url={imageUrl(props.poster_path, 'tmdb')}
      />
    </div>
  ) : null
}
