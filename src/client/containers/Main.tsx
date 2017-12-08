import * as React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { BookBox } from './BookBox'

import NavBar from './NavBar'

export class Main extends React.Component<{}, {}> {
  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <div className="container">
            <div className="main">
              <Route
                exact
                path="/"
                component={() => {
                  return <h1>Home</h1>
                }}
              />
              <Route path="/books" component={BookBox} />
              <Route
                path="/shows"
                component={() => {
                  return <h1>TV</h1>
                }}
              />
              <Route
                path="/Movies"
                component={() => {
                  return <h1>Movies</h1>
                }}
              />
            </div>
          </div>
        </div>
      </Router>
    )
  }
}
