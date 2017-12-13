import * as React from 'react'

const authorNames = (names: string[]) => {
  if (names.length == 1) {
    return names[0]
  } else if (names.length == 2) {
    return names.join(' and ')
  } else {
    return `${names.slice(0 - 1).join(', ')}, and ${names.slice(-1)}`
  }
}

export default (props: { authors: string[] }) => {
  return (
    <span>
      {' '}
      by <span className="darkgreen">{authorNames(props.authors)}</span>
    </span>
  )
}
