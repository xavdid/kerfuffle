import * as React from 'react'

const authorNames = (names: string[]) => {
  return names.join(', ')
}

export default (props: { authors: string[] }) => {
  return (
    <span>
      {' '}
      by <span className="darkgreen">{authorNames(props.authors)}</span>
    </span>
  )
}
