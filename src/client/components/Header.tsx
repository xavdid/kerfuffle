import * as React from 'react'
import config from '../../server/config'

export default (props: { mediaType: string }) => {
  return (
    <h1>
      So you're looking for a{' '}
      <span className={config[props.mediaType].color}>
        {props.mediaType.slice(0, -1)}
      </span>.
    </h1>
  )
}
