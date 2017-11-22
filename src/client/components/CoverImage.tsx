import * as React from 'react'

export default (props: { url: string }) => {
  return (
    <div className="col-sm-4">
      <img className="img-responsive center-block cover" src={props.url} />
    </div>
  )
}
