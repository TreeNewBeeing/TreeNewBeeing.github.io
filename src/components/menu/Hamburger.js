import React, { PureComponent } from 'react';

// width,
// height,
const styles = {
    outer: {
        position: 'absolute',
        zIndex: 200,
        left: '50%',
        top: '50%',
        transition: 'background-color 0.2s ease-out',
        cursor: 'pointer'
    },
    embed: {
        width: '100%',
        height: 'auto',
        transition: 'opacity 0.3s, transform 0.2s',
    },
    line: {
        width:'auto',
        border: 'none',
    }
}
export default class Hamburger extends PureComponent{
    constructor(props) {
        super(props);

        // bind
        this.focus = this.focus.bind(this);
        this.unfocus = this.unfocus.bind(this);
        // state
        this.state = {
            focus: false,
        }
    }

    componentWillUpdate() {
        console.log(performance.now());
      }
      componentDidUpdate() {
        console.log(performance.now());
      }
    focus() {
        this.setState({...this.state, focus: true});
    }

    unfocus() {
        this.setState({...this.state, focus: false});
    }

    render() {
        const heightRatio = 8 / 27;
        let height = parseInt(this.props.size * heightRatio / 3);
        let margin = parseInt(this.props.size * (1 - heightRatio) / 4);
        margin += (this.props.size - (3 * height) - (4 * margin)) / 4;
        height = `${height}px`;
        margin = `${margin}px`;

        return (
            <ul style={{...styles.outer,
                    width: this.props.size, height: this.props.size,
                    boxShadow: `0px 0px ${this.props.size/3}px grey`,
                    margin: `${-this.props.size / 2}px`,
                    backgroundColor: this.state.focus? '#777777' : 'white',
                }}
                id='hamburger-menu'

                onClick={this.props.click}

                onMouseEnter={this.focus}
                onMouseLeave={this.unfocus}

                >
                <div style={{
                        ...styles.embed,
                        transform: this.props.expand?'rotate(90deg)':'rotate(0deg)',
                    }}>
                <li style={{
                    ...styles.line,
                    height,borderRadius: height,
                    margin: `${margin}`,
                    backgroundColor: this.state.focus? 'white' : 'black',
                    }}/>
                <li style={{
                    ...styles.line,
                    height,borderRadius: height,
                    backgroundColor: this.state.focus? 'white' : 'black',
                    margin: `${margin}`,
                }}/>
                <li style={{
                    ...styles.line,
                    height,borderRadius: height,
                    backgroundColor: this.state.focus? 'white' : 'black',
                    margin: `${margin}`,
                }}/>
                </div>
            </ul>
        );
    }
}