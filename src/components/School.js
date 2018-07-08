import React, { PureComponent, createElement} from 'react';
import global from '../lib/Global';
import ghost from '../img/ghost.jpg';
import image1 from '../img/school/1.jpg';
import image2 from '../img/school/2.jpg';
import image3 from '../img/school/3.jpg';
import image4 from '../img/school/4.jpg';
import image5 from '../img/school/5.jpg';
import image6 from '../img/school/6.jpg';

// generate images set
const images_src = [image1, image2, image3, image4, image5, image6];
const images = [];
for(let i = 0; i < 30; i += 1) {
    images.push({
        image: images_src[i % images_src.length],
    });
}

generateImages(images);

function generateImages(images) {
    const num = parseInt(Math.sqrt(images.length));
    for(let i = 0; i < images.length; i += 1) {
        // make it looks random
        images[i].transform =
            `translate(
                calc(
                    -50% +
                    ${(Math.random() * 2 - 1) * 60 }% +
                    ${0 + (i % num * 100 / (num - 1))}vw
                ),
                calc(
                    -50% +
                    ${(Math.random() * 2 - 1) * 40}% +
                    ${0 + (i / num * global.height.school / (num - 1)) }px
                )
            )
            rotate(${(Math.random() * 2 - 1) * 45}deg`;
    }
}

function focusImage(images, n) {
    const num = Math.ceil(images.length / 2);
    for(let i = 0; i < images.length; i += 1) {
        images[i].transform =
            `translate(
                calc(
                    -50% +
                    ${(Math.random() * 2 - 1) * 15 + (i > num ? 20 : -20)}% +
                    ${i > num ? '100' : '0'}vw
                ),
                calc(
                    -50% +
                    ${(Math.random() * 2 - 1) * 10}% +
                    ${i % num * global.height.school / (num - 1) }px
                )
            )
            rotate(${(Math.random() * 2 - 1) * 45}deg)`;
    }
    images[n].transform =
        `translate(
            calc(
                -50% +
                50vw
            ),
            calc(
                -50% +
                ${global.height.school / 2}px
            )
        )
        rotate(0deg)`
    ;
}


const styles = {
    education: {
        opacity: 0.9,
        height: '100%'
    },
    picture: {
        width: '300px',
        height: '200px',
        position: 'absolute',
        boxShadow: '0 0 10px',
        padding: '5px',
        backgroundColor: 'white',
        cursor: 'pointer',
        transition: 'transform 0.2s ease-out',
    },
    superLayer: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 200,
        transition1: 'transform 0.3s ease-in-out, border-radius 0.3s ease-in-out, background-color 0.3s ease-in-out',
        transition2: 'transform 0.05s linear',
    },
    h1: {
        fontSize: '30px',
        left: '14%',
        top: '14%',
        position: 'absolute',
        fontFamily: '"BrixSansBold",Helvetica,Arial,sans-serif',
    },
    h3: {
        fontSize: '12px',
        left: '15%',
        top: '22%',
        position: 'absolute',
        fontFamily: '"BrixSansBold",Helvetica,Arial,sans-serif',
    },
    h2: {
    },
    p: {
        margin: '180px 14% 40px 14%',
        fontSize: '15px',
        fontFamily: '"BrixSansBold",Helvetica,Arial,sans-serif',
        backgroundColor: 'rgba(150,150,150,0.3)',
        borderRadius: '30px',
        padding: '20px',
        height: '300px',
        transition: 'height 0.3s ease-in-out',
    },
    course: {
        // textAlign: 'center',
        margin: '10px',
    },
    courses: {
        overflowY: 'auto',
        height: '75%',
    },
    link: {
        float: 'right',
        margin: '5px 5px 0px 5px',
        fontSize: '10px',
        height: '100%',
        display:'block',
        color: 'blue',
        cursor: 'pointer',
    },
    leaver: {
        height: '5px',
        width: '100%',
        borderRadius: '5px',
        margin: '5px 0',
        transition: 'background-color 0.3s ease-in-out'
    },
    leavers: {
        width: '110px',
        height: '30px',
        margin: 'auto',
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        bottom: '0px',
        cursor: 'pointer',

    }

}
class School extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            focus: false,
            first: true,
            change: false,
            top: -1,
            displacement: 0,
            moving: false,
        }

        this.focus = this.focus.bind(this);
        this.unfocus = this.unfocus.bind(this);
        this.random = this.random.bind(this);
        this.invertFocus = this.invertFocus.bind(this);
        this.startDrag = this.startDrag.bind(this);
        this.drag = this.drag.bind(this);
        this.drop = this.drop.bind(this);
        this.preventDefault = this.preventDefault.bind(this);
    }

    focus() {
        if(!this.state.focus)
        this.setState({...this.state, first: false, focus: true, displacement: 0});
    }

    unfocus() {
        this.setState({...this.state, focus: false, displacement: -(global.height.school - 35)});
    }

    invertFocus() {
        if(this.state.focus) {
            this.unfocus();
        } else {
            this.focus();
        }
    }

    random() {
        generateImages(images);
        this.setState({...this.state, top: -1});
    }

    focusPictureFunction(n) {
        return ((event) => {
            event.stopPropagation();
            focusImage(images, n);
            this.setState({...this.state, top: n});
        }).bind(this);
    }

    startDrag(event) {
        console.log('start drag', event.changedTouches);
        // set drag image
        // console.log(event.dataTransfer)
        // const img = new Image();
        // img.src = ghost;
        // event.dataTransfer.setDragImage(img, 0, 0);

        // get start position
        this.start = event.screenY || event.changedTouches[0].screenY;

        // update for direction
        this.direction = 0;
        this.lastPos = this.start;

        // update moving state
        this.setState({...this.state, moving: true});

        return false;
    }

    drag(event) {
        console.log('drag', event.y, event.pageY, event.screenY, event.clientY);

        // get current position
        const pos = event.screenY || (event.changedTouches ? event.changedTouches[0].screenY : -1);

        // get displacement distance
        const displacement = pos - this.start;
        console.log(displacement, this.state.focus);

        // update direction
        const currentDirection = pos - this.lastPos;
        this.direction = pos === -1 || currentDirection === 0 ? this.direction : currentDirection;
        this.lastPos = pos;
        console.log('drag', this.direction, pos);

        if(pos < 0) {
            // out of browser, no move
        } else if(displacement > 0 && this.state.focus){
            // out of bottom of the area
            this.setState({...this.state, displacement: 0})
        } else if(displacement <= 0 && !this.state.focus) {
            // out of top of the area
            this.setState({...this.state, displacement: -(global.height.school - 35)})
        } else {
            // normal move
            this.setState({...this.state, displacement: this.state.focus ? displacement : displacement - global.height.school})
        }

    }

    drop() {
        console.log('drop', this.direction);
        this.setState({...this.state, focus: this.direction > 0 ? true : false , moving: false,
            displacement: this.direction > 0 ? 0 : -(global.height.school - 35)});
    }

    preventDefault(event) {
        event.dataTransfer.dropEffect = "none";
    }

    componentWillUpdate() {
        console.log(performance.now());
    }
    componentDidUpdate() {
        console.log(performance.now());
    }
    render(){
        return (
        <div
            style={styles.education}
            onMouseEnter={this.state.first ? this.focus : null}
            onTouchStart={this.state.first ? this.focus : null}
        >

            <div style={{...styles.superLayer,
                transform: this.state.first ? 'translate(0%,-100%)' : `translate(0px,${this.state.displacement}px)`,
                transition: this.state.moving ? styles.superLayer.transition2 : styles.superLayer.transition1,
                borderRadius: this.state.focus ? '0px' : '20px',
                backgroundColor: this.state.focus ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.95)',
            }}>
                <h1 style={styles.h1}> UC SAN DIEGO</h1>
                <h3 style={styles.h3}>
                    Bachelor of Math-Computer Science   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    2015 - 2019
                </h3>
                {/* <h3 style={styles.h4}> Math-Computer Science Major</h3> */}
                <div style={styles.p}>
                    <h2 style={styles.course}>Courses Acquired</h2>
                    <hr/>
                    <ul className='scroll' style={styles.courses}>
                        <li className='clearfix' style={styles.course}>Object-Oriented Programming
                            <div style={{float: 'right'}}>
                                <a style={styles.link}>notes</a>
                                <a style={styles.link}>demo</a>
                            </div>
                        </li>
                        <li className='clearfix' style={styles.course}>Data Structure
                            <div style={{float: 'right'}}>
                                <a style={styles.link}>notes</a>
                                <a style={styles.link}>demo</a>
                            </div>
                        </li>
                        <li className='clearfix' style={styles.course}>Discrete Math
                            <div style={{float: 'right'}}>
                                <a style={styles.link}>notes</a>
                                <a style={styles.link}>demo</a>
                            </div>
                        </li>
                        <li className='clearfix' style={styles.course}>Computer Architecture
                            <div style={{float: 'right'}}>
                                <a style={styles.link}>notes</a>
                                <a style={styles.link}>demo</a>
                            </div>
                        </li>
                        <li className='clearfix' style={styles.course}>Algorithm
                            <a style={styles.link}>notes</a>
                            <a style={styles.link}>demo</a>
                        </li>
                        <li className='clearfix' style={styles.course}>Software Engineeing
                            <div style={{float: 'right'}}>
                                <a style={styles.link}>notes</a>
                                <a style={styles.link}>demo</a>
                            </div>
                        </li>
                        <li className='clearfix' style={styles.course}>Operating System
                            <div style={{float: 'right'}}>
                                <a style={styles.link}>notes</a>
                                <a style={styles.link}>demo</a>
                            </div>
                        </li>
                        <li className='clearfix' style={styles.course}>Web Client Language
                            <div style={{float: 'right'}}>
                                <a style={styles.link}>notes</a>
                                <a style={styles.link}>demo</a>
                            </div>
                        </li>
                        <li className='clearfix' style={styles.course}>Data Mining
                            <div style={{float: 'right'}}>
                                <a style={styles.link}>notes</a>
                                <a style={styles.link}>demo</a>
                            </div>
                        </li>
                        <li className='clearfix' style={styles.course}>Computer Graphics
                            <div style={{float: 'right'}}>
                                <a style={styles.link}>notes</a>
                                <a style={styles.link}>demo</a>
                            </div>
                        </li>
                        <li className='clearfix' style={styles.course}>Interactive Design
                            <div style={{float: 'right'}}>
                                <a style={styles.link}>notes</a>
                                <a style={styles.link}>demo</a>
                            </div>
                        </li>

                    </ul>
                </div>
                {/* <svg
                    width={40}
                    height={40}
                    style={{margin: '10px auto', display:'block', cursor:'pointer'}}
                    role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                    onClick={this.unfocus}>

                    <path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm101.8-262.2L295.6 256l62.2 62.2c4.7 4.7 4.7 12.3 0 17l-22.6 22.6c-4.7 4.7-12.3 4.7-17 0L256 295.6l-62.2 62.2c-4.7 4.7-12.3 4.7-17 0l-22.6-22.6c-4.7-4.7-4.7-12.3 0-17l62.2-62.2-62.2-62.2c-4.7-4.7-4.7-12.3 0-17l22.6-22.6c4.7-4.7 12.3-4.7 17 0l62.2 62.2 62.2-62.2c4.7-4.7 12.3-4.7 17 0l22.6 22.6c4.7 4.7 4.7 12.3 0 17z">
                    </path>
                </svg> */}
                <div style={styles.leavers}
                    draggable='true'
                    // onDragOver={this.preventDefault}
                    onClick={this.invertFocus}
                    onDragStart={this.startDrag}
                    onDrag={this.drag}
                    onDragEnd={this.drop}
                    onTouchStart={this.startDrag}
                    onTouchMove={this.drag}
                    onTouchEnd={this.drop}
                >
                    <div style={{...styles.leaver, backgroundColor: this.state.focus? 'rgb(200,200,200)' : 'white'}}/>
                    <div style={{...styles.leaver, backgroundColor: this.state.focus? 'rgb(200,200,200)' : 'white'}}/>
                </div>
            </div>
            <div style={{ width: '100%', height: '100%',
                transition: 'filter 0.3s ease-in-out',
                filter:this.state.focus ? 'blur(8px)':'blur(0px)'
            }}
                onClick={this.random}
            >
                {images.map((e, i) => {
                    return <img key={`ucsd${i}`}
                    src={e.image}
                    style={{...styles.picture,
                        transform: e.transform,
                        zIndex: this.state.top === i ? 200 : 0,
                    }}
                    onClick={this.focusPictureFunction(i)}
                    />
                })}
            </div>
        </div>
        );
    }
}

export default School;