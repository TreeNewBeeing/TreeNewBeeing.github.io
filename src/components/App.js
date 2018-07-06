import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import '../css/index.css'
import global from '../lib/Global';
import Navbar from './menu/Navbar';
import SidePanel from './menu/SidePanel';
import Profile from './Profile';

const styles = {
  super: {
    width:'100%',
    height: '100%',

  },
  app: {
    width:'100%',
    height:'100%',
    transition: 'transform 0.3s ease-in-out',
    position: 'relative',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },

  shadowLayer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.8)',
    position:'absolute',
    zIndex: 200,
    transition: 'transition: opacity 2s ease-in-out',
  },



}
class App extends Component {
  constructor(props){
    super(props);

    // bind
    this.sizeChange = this.sizeChange.bind(this);
    this.clickHamburger = this.clickHamburger.bind(this);

    // state
    this.state = {
      expand: false,
      // height: document.documentElement.clientHeight,
    }
    // window.onresize = this.sizeChange.bind(this);
  }

  sizeChange() {
    console.log('a');
    this.setState({...this.state, height: document.documentElement.clientHeight});
  }
  clickHamburger() {
    this.setState({...this.state, expand: !this.state.expand});
  }

  componentWillUpdate() {
    console.log(performance.now());
  }
  componentDidUpdate() {
    console.log(performance.now());
  }

  render() {
    return (
      <Router>
        <Route path="/">
          <div style={styles.super}>


            <SidePanel expand={this.state.expand} click={this.clickHamburger}/>
            <Navbar expand={this.state.expand} click={this.clickHamburger}/>

            <div className='app'
              style={{...styles.app,
                transform: this.state.expand ? `translate(-${global.width.sidePanel}px,0px)` : 'translate(0px,0px)',
              }}
              onClick={this.state.expand ? this.clickHamburger : null}
            >

              <div
                style={{...styles.shadowLayer,
                  display: this.state.expand ? 'block' : 'none',
                  opacity: this.state.expand ? 0.8 : 0.3,
              }}/>
              <Profile/>
              {/* <Route path='/' component={Profile}/> */}
            </div>

          </div>
        </Route>
      </Router>
    )
  }



}

export default App;
