import * as React from 'react'
import config, { mediaTypes } from '../../server/config'
import { Link } from 'react-router-dom'

export default () => {
  return (
    <div>
      <h1>Shuffle up some media!</h1>
      <p>
        Ever have a list of movies you've been meanint to watch, but when it
        comes time to pick one, you can't? Let's pick one randomly.
      </p>

      <div className="row">
        {mediaTypes.map(mediaType => {
          return (
            <div className="col-sm-4" key={mediaType}>
              <Link
                className="btn btn-default btn-lg center-block stacked"
                to={`/${mediaType}`}
              >
                <i
                  className={`fa fa-${config[mediaType].icon} fa-3x fa-fw ${
                    config[mediaType].color
                  }`}
                />
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}
