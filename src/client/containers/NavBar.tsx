import * as React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

export const NavBar = () => {
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
        <a className="navbar-brand">Kerfuffle</a>
      </div>
    </nav>
  )
}
