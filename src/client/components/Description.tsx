import * as React from 'react'

// colorize extras output
// remove html from description

export default (props: { description: string; extras?: string[] }) => {
  return (
    <div className="col-sm-8">
      <p className="text-justify">
        {props.description}{' '}
        {props.extras ? props.extras.map(i => `[${i}]`).join(' ') : ''}
      </p>
    </div>
  )
}
