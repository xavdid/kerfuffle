import * as React from 'react'
import * as striptags from 'striptags'
// colorize extras output

export default (props: { description: string; extras?: string[] }) => {
  // replacing with a space mostly works, except for commas following ending tags
  const text = striptags(props.description, [], ' ').replace(' ,', ',')
  return (
    <div className="col-sm-8">
      <p className="text-justify">
        {text} {(props.extras || []).map(i => `[${i}]`).join(' ')}
      </p>
    </div>
  )
}
