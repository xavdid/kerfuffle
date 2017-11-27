import * as React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { BookBox } from './BookBox'

import { NavBar } from './NavBar'

export class Main extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <NavBar />
        <div className="container">
          <div className="main">
            <BookBox />
          </div>
        </div>
      </div>
    )
  }
}
