import * as React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

import MediaBox from '../containers/MediaBox'

import Home from '../components/Home'
import NotFound from '../components/NotFound'

import NavBar from './NavBar'
import { MediaType } from '../../server/config'

const MBox = (t: MediaType) => {
  return <MediaBox mediaType={t} />
}

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
                <Route path="/books" component={() => MBox('books')} />
                <Route path="/shows" component={() => MBox('shows')} />
                <Route path="/movies" component={() => MBox('movies')} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    )
  }
}
