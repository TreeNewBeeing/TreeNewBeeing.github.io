import React, { Component } from 'react';
import '../css/Navbar.css';

class Navbar extends Component {
  render() {
    console.log(window.innerWidth);
    return (
        <ul className="navbar">
        	<li className="left">  <a herf="/"> Zifeng Xie </a> </li>
        	<li className="right"> <a> Projects </a> </li>
        	<li className="right"> <a> Blog </a> </li>
        	{/* <li className="right"> <a> NoteFeed </a> </li> */}
        	{/* <li className="right"> <a> Video </a> </li> */}
        	<li className="right"> <a> Profile </a> </li>

        </ul>
    );
  }

}

export default Navbar;