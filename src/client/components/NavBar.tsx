import * as React from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import config, { mediaTypes } from '../../server/config'

interface NavProps {
  location: {
    pathname: string
    search: string
    hash: string
    state?: object
    key: string
  }
  // also history, match
}

const capitalize = (s: string) => {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export default withRouter((props: any) => {
  // have to cast here, since it's passed implicitly? ¯\_(ツ)_/¯
  const p = props as NavProps

  return (
    <nav className="navbar navbar-default">
      <div className="navbar-header">
        <button
          type="button"
          className="navbar-toggle collapsed"
          data-toggle="collapse"
          data-target="#navbar"
        >
          <span className="icon-bar" />
          <span className="icon-bar" />
          <span className="icon-bar" />
        </button>
        <NavLink to="/" className="navbar-brand">
          Kerfuffle
        </NavLink>
      </div>
      <div className="navbar-collapse collapse" id="navbar">
        <ul className="nav navbar-nav">
          {mediaTypes.map(mt => {
            return (
              <li
                key={mt}
                className={p.location.pathname === `/${mt}` ? 'active' : ''}
              >
                <NavLink to={`/${mt}`}>
                  <i
                    className={`fa fa-${config[mt].icon} ${
                      config[mt].color
                    } fa-fw`}
                  />
                  {capitalize(mt)}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
})
