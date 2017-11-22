import * as React from 'react'
import BookAuthors from './BookAuthors'

export default (props: { title: string; authors?: string[] }) => {
  return (
    <h3>
      How about <strong className="orange">{props.title}</strong>
      {props.authors ? <BookAuthors authors={props.authors} /> : ''}
      ?
    </h3>
  )
}
