import React, { Component } from 'react';

// width,
// height,
export default class Hamburger extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ul style={{width: `${this.props.size}px`, height: `${this.props.size / 4 * 5}px`,
                padding: `${this.props.size / 5}px`,
                transform: this.props.menu?'rotate(90deg)':'rotate(0deg)',
                transition: 'opacity 0.3s, transform 0.3s',
                cursor: 'pointer'}}

                // onClick={(e)=>{
                //     this.setState(Object.assign(this.state,{menu: !this.state.menu}))
                // }}
                // onMouseOver={(e)=>{
                //     this.setState(Object.assign(this.state,{focus: true}));
                // }}

                // onMouseLeave={(e)=>{
                //     if(!this.state.menu){
                //         this.setState(Object.assign(this.state,{focus: false}));
                //     }
                // }}
                >
                <li style={{height: `${this.props.size / 8}px`,borderRadius: `${this.props.size / 8}px`,
                    backgroundColor:'black',
                    marginBottom:`${this.props.size / 8 / 10 * 7}px`,
                    // transform:'rotate(90deg)',
                    }}/>
                <li style={{height: `${this.props.size / 8}px`,borderRadius: `${this.props.size / 8}px`,
                    backgroundColor:'black',
                    marginBottom:`${this.props.size / 8 / 10 * 7}px`,
                    // transform:'rotate(90deg)',
                }}/>
                <li style={{height: `${this.props.size / 8}px`,borderRadius: `${this.props.size / 8}px`,
                    backgroundColor:'black',
                    marginBottom:`${this.props.size / 8 / 10 * 7}px`,
                    // transform:'rotate(90deg)',
                }}/>
            </ul>
        );
    }
}