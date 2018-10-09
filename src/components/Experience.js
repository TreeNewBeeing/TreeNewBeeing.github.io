import React, {PureComponent} from 'react';
import global from '../lib/Global'
const styles = {
    experience: {
        background: 'url()'
    },
    months: {
        padding: `${global.height.stick}px`,
        position: 'absolute',
        left: '50%',
        transform: 'translate(-50%, 0)'


    },
    stick: {
        width: `${global.width.stick}px`,
        height: `${global.height.stick}px`,
        // borderRadius: '5px',
        border: '1px solid white',
        margin: '0 auto',
        cursor: 'pointer',
        transition: 'transform 0.1s ease-in-out, background-color 0.2s linear'

    },
    now: {
        // transform: 'translate(-50%,0)',
        display: 'block',
        margin: '10px',
        textAlign: 'center',
        fontSize: '20px'

    },
    year: {
        textAlign: 'center',
        // position: 'relative',
        display: 'block',
        margin: '40px 10px 10px 10px',
        // transform:
    },
    label: {
        textAlign: 'center',
        position: 'absolute',
        display: 'block',
        width: '80px',
        transform: `translate(-80px, ${global.height.stick / 2}px)`,
        fontWeight: '100',
        transition: 'opacity 0.1s ease-in-out',
    }

}

const month = ['December','November','October','September','August','July','June','May','April','March','February','January', ];
const current = new Date(2018, 6, 10, 12, 0,0,0);
const months = monthDiff(new Date(2015, 12, 10, 12, 0,0,0), current);
const monthsUI = [];
for(let i = 0; i < months; i += 1) {

    // set border radius
    let borderRadius;
    if(i === 0) {
        borderRadius = `${global.width.stick / 2}px ${global.width.stick / 2}px 0 0`;
    } else if ( i === months - 1 ) {
        borderRadius = `0 0 ${global.width.stick / 2}px ${global.width.stick / 2}px`;
    } else {
        borderRadius = null;
    }

    // push element
    monthsUI.push(
        borderRadius
    );
}
const experience = [
    {
        name: ''
    }
]

function monthDiff(d1, d2) {
    let months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth() + 1;
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
}


class Experience extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            focus: -1,
            select: -1,
        }
        this.focus = this.focus.bind(this);
        this.unfocus = this.unfocus.bind(this);
        this.select = this.select.bind(this);
    }

    focus(i) {
        this.setState({...this.state, focus: i});
    }

    unfocus() {
        this.setState({...this.state, focus: -1});

    }

    select(i) {
        this.setState({...this.state, select: i === this.state.select ? -1 : i});
    }

    componentWillMount() {

    }

    render() {
        console.log(months)
        return (
            <div style={styles.experience}>
                <div style={styles.months}>
                    {monthsUI.map((e, i) => {
                        return (
                            <div key={`month${i}`}>
                                {i === 0 ?
                                    <h2 style={styles.year}> NOW </h2> :
                                    ((current.getMonth() - i) % 12 === 0?
                                        <h2 style={styles.year}> {current.getFullYear() - parseInt((i - current.getMonth())/12)} </h2> :
                                        null
                                    )
                                }
                                {
                                    <h2 style={{...styles.label, opacity: this.state.focus === i || this.state.select === i ? 1 : 0}}> {month[(12 - current.getMonth() + i) % 12]} </h2>
                                }
                                <div style={{...styles.stick, borderRadius: e,
                                    transform: this.state.focus === i ? 'scale(1.2)' : null,
                                    backgroundColor: this.state.select === i ? '#d73027' : '#91cf60',
                                }}
                                    onClick={(() => {this.select(i)}).bind(this)}
                                    onMouseOver={(() => {this.focus(i)}).bind(this)}
                                    onMouseOut={this.unfocus}
                                >

                                </div>

                            </div>
                        );
                    })}

                </div>
            </div>
        );
    }
}

export default Experience;