import * as React from 'react'

import CoverImage from './CoverImage'
import Description from './Description'

export default (props: {
  description: string
  url: string
  extras?: Array<string | string[]>
}) => {
  return (
    <div className="row">
      <Description description={props.description} extras={props.extras} />
      <CoverImage url={props.url} />
    </div>
  )
}
