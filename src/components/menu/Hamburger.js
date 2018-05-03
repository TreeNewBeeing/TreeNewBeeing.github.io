import React, { Component } from 'react';

// width,
// height,
export default class Hamburger extends Component{
    constructor(props) {
        super(props);
        this.state = {
            focus: false,
        }
    }

    render() {
        return (
            <ul style={{width: `${this.props.size}px`, height: `${this.props.size}px`,
                left: this.props.size / 3,
                top: this.props.size / 3,
                boxShadow: `0px 0px ${this.props.size/3}px grey`,
                padding: `${this.props.size / 6}px`,
                position: 'fixed',
                zIndex: 200,
                transition: 'background-color 0.2s ease-out',
                backgroundColor: this.state.focus? '#777777' : 'white',
                cursor: 'pointer'}}
                id='hamburger-menu'

                onClick={this.props.click}
                onMouseEnter={()=>{
                    this.setState({...this.state, focus: true});
                }}
                onMouseLeave={()=>{
                    this.setState({...this.state, focus: false});
                }}

                // onMouseLeave={(e)=>{
                //     if(!this.state.menu){
                //         this.setState(Object.assign(this.state,{focus: false}));
                //     }
                // }}
                >
                <div style={{
                    transform: this.props.expand?'rotate(90deg)':'rotate(0deg)',
                    transition: 'opacity 0.3s, transform 0.2s',}}>
                <li style={{height: `${this.props.size / 6}px`,borderRadius: `${this.props.size / 6}px`,
                    backgroundColor: this.state.focus? 'white' : 'black',
                    marginTop:`${this.props.size / 12}px`,
                    marginBottom:`${this.props.size / 6}px`,
                    // transform:'rotate(90deg)',
                    }}/>
                <li style={{height: `${this.props.size / 6}px`,borderRadius: `${this.props.size / 6}px`,
                    backgroundColor: this.state.focus? 'white' : 'black',
                    marginBottom:`${this.props.size / 6}px`,
                    // transform:'rotate(90deg)',
                }}/>
                <li style={{height: `${this.props.size / 6}px`,borderRadius: `${this.props.size / 6}px`,
                    backgroundColor: this.state.focus? 'white' : 'black',
                    // marginBottom:`${this.props.size / 6}px`,
                    // transform:'rotate(90deg)',
                }}/>
                </div>
            </ul>
        );
    }
}