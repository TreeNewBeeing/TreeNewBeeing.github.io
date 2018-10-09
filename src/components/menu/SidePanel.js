import React, {PureComponent} from 'react';
import global from '../../lib/Global';
const styles = {

    sidePanel: {
        height: '100%',
        position: 'fixed',
        left: '100%',
        width: `${global.width.sidePanel}px`,
        overflowX: 'hidden',
        transition: 'transform 0.3s ease-in-out',
    },
    hi: {
        display: 'block',
        fontFamily: 'Helvetica',
        position: 'absolute',
        left: '10%',
        top: '15%',
        fontSize: '30px',
    },
    greeting: {
        display: 'block',
        fontFamily: 'Arial',
        position: 'absolute',
        left: '10%',
        top: '60%',
        fontSize: '16px',
    },
    title: {
        color: 'white',
        width: '100%',
        position: 'relative',
        height: '140px',
        margin: '0 auto',
        display: 'block',
        backgroundColor: 'rgb(87,36,66)',
    },
    bar: {
        width: '100%',
        height: '100px',
        margin: '0 auto',
        cursor: 'pointer',
        transition: 'box-shadow 0.3s ease-out',
    },
    label: {
        width: '4px',
        height: '100%',
        float: 'left',
        transition: 'background-color 0.3s ease-out',
    },
    text: {
        color: 'black',
        lineHeight: '100px',
        height: '100%',
        width: '100%',
        display:'block',
        textAlign: 'center',
        fontFamily: 'Helvetica',
        // boxShadow: '0px 0px 200px #eeeeee',
        transition: 'transform 0.3s ease-out',
    },
    line: {
        margin: '0 auto',
        width: '100px,'
    },
}

const bars = ['Home', 'Education', 'Projects'];

const defaultProps = {
    expand: false,
};

class SidePanel extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            focus: -1,
        }

        this.unfocus = this.unfocus.bind(this);

        this.focus = [];
        for(let i = 0; i < bars.length; i += 1) {
            this.focus.push((() => {
                this.setState({...this.state, focus: i});
            }).bind(this));
        }

    }

    unfocus() {
        this.setState({...this.state, focus: -1});
    }
    componentWillUpdate() {
        console.log(performance.now());
      }
    componentDidUpdate() {
        console.log(performance.now());
    }

    render() {
        return (
            <div
                style={{...styles.sidePanel,
                    // display: this.props.expand ? 'block' : 'none',
                    transform: this.props.expand ? 'translate(-100%,0%)' : 'translate(0%,0%)',
                }
            }>

              <p style={styles.title}>
                  <span style={styles.hi}> Hi, </span>
                  <span style={styles.greeting}>Welcome to Zifeng Xie's Page</span>
              </p>
              <ul>
                  {bars.map((e, i) => {

                      return (
                        <li key={i} style={{...styles.bar, boxShadow: this.state.focus === i ? '0px 0px 10px #dddddd' : '',}}
                            onMouseOver={this.focus[i]}
                            onMouseOut={this.unfocus}>

                            <div style={{...styles.label,
                                backgroundColor: this.state.focus === i ? '#ff0000' : '#ffffff',
                            }}/>

                            <a href={`#${bars[i]}`} onClick={this.props.click}><span style={{...styles.text, transform: this.state.focus === i ? 'scale(1.2)' : ''}}>{bars[i]}</span></a>
                        </li>
                      );
                  })}
              </ul>
            </div>
        )
    }
}

SidePanel.defaultProps = defaultProps;

export default SidePanel;