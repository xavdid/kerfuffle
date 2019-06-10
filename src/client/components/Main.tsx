import * as React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from '../components/Home'
import NotFound from '../components/NotFound'
import MediaBox from '../containers/MediaBox'
import Footer from './Footer'
import NavBar from './NavBar'

import { MediaType, mediaTypes } from '../../server/config'

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
                {mediaTypes.map(mt => {
                  return <Route path={`/${mt}`} component={() => MBox(mt)} />
                })}
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
