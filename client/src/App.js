import React, { Component } from 'react';
import RouterPage from './Router';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Router>
        <Route component={RouterPage} />
      </Router>
    )
  }
}
export default App