import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import logo from '../logo.svg';
import '../css/App.css';

import ForceDirectedGraph from './graphs/NetworkGraph/ForceDirectedGraph';
import Navbar from './Navbar';
import Profile from './Profile';
import School from './School';
import {screenSize} from '../lib/Position';
class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/me">
              <div>
                <Route path="/me" component={Navbar}/>
                <Route path="/me/contact" component={School}/>
                <Route path="/me/school" component={School}/>
              </div>
          </Route>
          <Route path="/network-graph">
              <div>
                <Route path="/network-graph/force-directed" component={ForceDirectedGraph}/>
              </div>
          </Route>
        </div>
      </Router>
    )
  }

}

export default App;
