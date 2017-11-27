import * as React from 'react'
import * as striptags from 'striptags'
// colorize extras output

export default (props: { description: string; extras?: string[] }) => {
  return (
    <div className="col-sm-8">
      <p className="text-justify">
        {striptags(props.description, [], ' ')}{' '}
        {props.extras ? props.extras.map(i => `[${i}]`).join(' ') : ''}
      </p>
    </div>
  )
}
