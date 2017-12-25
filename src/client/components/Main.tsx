import * as React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

import NavBar from './NavBar'
import Home from '../components/Home'
import MediaBox from '../containers/MediaBox'
import NotFound from '../components/NotFound'
import Footer from './Footer'

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
                <Route path="/books" component={() => MBox('books')} />
                <Route path="/shows" component={() => MBox('shows')} />
                <Route path="/movies" component={() => MBox('movies')} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
          <Footer />
        </div>
      </Router>
    )
  }
}
