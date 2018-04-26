import React, { Component } from 'react';
import '../css/School.css';

class School extends Component {

    first = true;

    showBack(){

        // back
        this.back.style.padding = "100px 60px";
        this.back.style.height = '400px';
    }

    showFront(){
        this.back.style.height = 0;
        this.back.style.padding = "0px 60px";
        
    }
    render(){
        return (
        <div className='school' onMouseOver={this.showBack.bind(this)} onMouseOut={this.showFront.bind(this)}>
            <div ref={(input) => { this.front = input; }}
                 className="front"
                 onClick={this.showBack.bind(this)}
                //  onMouseOver={this.fristTime.}
            >
            </div>
            <div ref={(input) => { this.back = input; }}
                 className="back"
                 onClick={this.showFront.bind(this)}
            >
                <h1>
                    University of California, San Diego
                </h1>
                <h2>
                    Bachelor's Degree of Math-Computer Science
                </h2>
                <h3>
                    2015 - 2019
                </h3>
            </div>
        </div>
        );
    }
}

export default School;