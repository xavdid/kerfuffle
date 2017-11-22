import * as React from 'react'

import CoverImage from './CoverImage'
import Description from './Description'

export default (props: { description: string; url: string }) => {
  return (
    <div className="row">
      <Description description={props.description} />
      <CoverImage url={props.url} />
    </div>
  )
}
