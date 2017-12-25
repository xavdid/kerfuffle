import * as React from 'react'
import * as striptags from 'striptags'

import { isArray } from 'lodash'
// colorize extras output
const colors = ['purple', 'darkgreen', 'orange']

export default (props: {
  description: string
  extras?: Array<string | string[]>
}) => {
  // replacing with a space mostly works, except for commas following ending tags
  const text = striptags(props.description, [], ' ').replace(' ,', ',')
  return (
    <div className="col-sm-8">
      <p className="text-justify">{text}</p>
      <p>
        {(props.extras || []).map((extra, i) => (
          <span key={i}>
            [{' '}
            <span className={colors[i % colors.length]}>
              {isArray(extra) ? extra.join(' | ') : extra}
            </span>{' '}
            ]{' '}
          </span>
        ))}
      </p>
    </div>
  )
}
