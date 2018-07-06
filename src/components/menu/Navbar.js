import React, { PureComponent } from 'react';
import {Link} from 'react-router';
import global from '../../lib/Global'
import Hamburger from './Hamburger';

const styles = {

  navbar: {
    transition: 'transform 0.3s ease-in-out',
    position: 'fixed',
    top:0,
	  width: '100%',
	  height: `${global.height.navbar}px`,
	  backgroundColor: 'rgba( 0,0,0, 0.8)',
    fontFamily: 'Arial, Helvetica, sans-serif',
	  opacity: 0.8,
    zIndex: 1,
  },
  icon: {
    height: '100%',
		margin: '0 5px',
		width: '100px',
		lineHeight: `${global.height.navbar}px`,
		color: 'white',
  },
  bar: {
    height: '100%',
		margin: '0 5px',
		width: '50px',
		lineHeight: `${global.height.navbar}px`,
		color: 'white',
  },
  link: {
    width: '100%',
		display: 'block',
    textAlign: 'center',
    cursor: 'pointer',
  },
};

const defaultProps = {
  expand: false,
  click: null,
}


class Navbar extends PureComponent {
  constructor(props){
    super(props);
  }

  componentWillUpdate() {
    console.log(performance.now());
  }
  componentDidUpdate() {
    console.log(performance.now());
  }
  render() {
    return (
        <ul style={{...styles.navbar,transform: this.props.expand ? `translate(-${global.width.sidePanel}px,0px)` : 'translate(0px,0px)',}}>
        	<li style={{...global.default.left, ...styles.icon}}>  <a to="/" style={styles.link}> Zifeng Xie </a> </li>
          <li className='clearfix' style={{...global.default.right, ...styles.bar,}}>
            <Hamburger size={global.width.hamburger} expand={this.props.expand} click={this.props.click}/>
          </li>
        </ul>
    );
  }

}

Navbar.defaultProps = defaultProps;

export default Navbar;