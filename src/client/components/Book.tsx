import * as React from 'react'
import { BookFields, Book as IBook } from '../../server/services/interfaces'

export class Book extends React.Component<IBook, {}> {
  render() {
    console.log('book render', this.props, this.props.id)
    return this.props.id ? (
      <div>
        <h3>
          How about{' '}
          <strong className="orange">
            {this.props.fields[BookFields.title]}
          </strong>{' '}
          by{' '}
          <span className="darkgreen">
            {this.props.fields.Author.join(', ')}
          </span>
          ?
        </h3>
        <div className="row">
          <div className="col-sm-8">
            <p className="text-justify">
              This is a description loaded from gbooks api ({this.props.fields[BookFields.gbid]})
            </p>
          </div>
          <div className="col-sm-4">
            <img
              className="img-responsive center-block cover"
              src="https://i.imgur.com/ShtezM5.png"
            />
          </div>
        </div>
      </div>
    ) : null
  }
}
