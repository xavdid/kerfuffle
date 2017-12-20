import * as React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import BookBox from './BookBox'
import MovieBox from './MovieBox'
import Home from '../components/Home'
import NotFound from '../components/NotFound'

import NavBar from './NavBar'

export class Main extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <div className="container">
            <div className="main">
              <Switch>
                <Route exact path="/" component={Home} />
                {/* could have generic "box" class that takes a media type */}
                <Route path="/books" component={BookBox} />
                <Route
                  path="/shows"
                  component={() => {
                    return <h1>TV</h1>
                  }}
                />
                <Route path="/movies" component={MovieBox} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    )
  }
}
