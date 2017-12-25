import * as React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from '../components/Home'
import NotFound from '../components/NotFound'
import MediaBox from '../containers/MediaBox'
import Footer from './Footer'
import NavBar from './NavBar'

import { MediaType } from '../../server/config'

const MBox = (t: MediaType) => {
  return <MediaBox mediaType={t} />
}

export class Main extends React.Component {
  public render() {
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
