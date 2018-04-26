import React, { Component } from 'react';
import '../css/Profile.css';
import icon from '../img/icon3.jpg'
class Profile extends Component {
  render() {
    return (
        <div className="profile">
            <div className="main">
                <div className="icon">
                    <img src={icon} alt={icon}/>
                </div>
                <span>
                        <h1>Zifeng Xie </h1><br/><br/>
                        A Passionate Software Engineer
                </span>
                <div>
                    <ul className="contact">
                        <li> <a href="#" class="fa fa-facebook"></a> </li>
                        <li> <a href="#" class="fa fa-wechat"></a></li>
                        <li> <a href="#" class="fa fa-envelope"></a></li>
                        <li> <a href="#" class="fa fa-linkedin"></a></li>
                        <li> <a href="#" class="fa fa-github"></a></li>
                    </ul>
                </div>

            </div>
            <div className="experience">

            </div>
        </div>
    );
  }

}

export default Profile;