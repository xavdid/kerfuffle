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
      <div className="navbar-collapse collapse" id="navbar">
        <ul className="nav navbar-nav">
          <li>
            <a href="/books">
              <i className="fa fa-book purple" />
              Books
            </a>
          </li>
          <li>
            <a href="/movies">
              <i className="fa fa-film blue" />
              Movies
            </a>
          </li>
          <li>
            <a href="/shows">
              <i className="fa fa-television darkgreen" />
              Shows
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
