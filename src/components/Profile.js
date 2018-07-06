import React, { PureComponent } from 'react';
import '../css/Profile.css';
import global from '../lib/Global';
import icon from '../img/icon3.jpg'
import School from './School';
import Experience from './Experience';

const styles = {
    profile: {
        height: '100%',
        width: '100%',
        // paddingTop: `${global.height.navbar}px`,
        // overflowY: 'auto',
    },
    icon: {
        width: '100%',
        height: `${global.height.icon}px`,
        borderRadius: '10px',
    },

    img: {
        margin: 'auto',
        position: 'relative',
        top: `${global.height.iconImage - 15}px`,
        borderRadius: `${global.height.iconImage}px`,
        width: `${global.height.iconImage}px`,
        height: `${global.height.iconImage}px`,
        display: 'block',
    },

    span: {
        width: '100%',
        display: 'block',
        fontSize: global.font.sm,
        color: 'aliceblue',
        margin: '0 auto',
        textAlign: 'center',
        fontFamily: 'Arial, Helvetica, sans-serif',
    },

    h1: {
        fontSize: `${global.font.big}px`,
        fontFamily: 'San -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Oxygen, Ubuntu, Cantarell, \'Open Sans\', \'Helvetica Neue\', sans-serif',
    },

    ul: {
        width: `${5*(global.height.contact+(20))}px`,
        height: `${global.height.contact}px`,
        margin: '30px auto',
    },
    li: {
        padding: '10px',
        float: 'left',
    },
    fa: {
        width: `${global.height.contact}px`,
        height: `${global.height.contact}px`,
        fontSize: `${global.font.big}px`,
        textAlign: 'center',
        lineHeight: `${global.height.contact}px`,
        textDecoration: 'none',
        transition: '0.2s',
        color: 'white',
        borderRadius: '5px',
    },
    main: {
        height: `${global.height.main}px`,
    },
    school: {
        backgroundColor: 'white',
        height: `${global.height.school}px`,
        position: 'relative',
        overflow: 'hidden',
    },
    experience: {
        width: '100%',
        height: '500px',
        overflowY: 'scroll',
        backgroundColor: 'red',
    },
}

const icons = [
    ['https://www.facebook.com/people/Zifeng-Xie/100006370320902','fa-facebook'],
    ['','fa-wechat'],
    ['mailto:zephre0101@gmail.com','fa-envelope'],
    ['https://www.linkedin.com/in/zifeng-xie/','fa-linkedin'],
    ['https://github.com/TreeNewBeeing/', 'fa-github'],
];
class Profile extends PureComponent {

    componentWillUpdate() {
        console.log(performance.now());
    }
    componentDidUpdate() {
        console.log(performance.now());
    }
    render() {
        return (
            <div className='noScroll scroll' style={styles.profile}>
                <div id='Home' style={styles.main}>
                    <div style={styles.icon}>
                        <img style={styles.img} src={icon} alt={icon}/>
                    </div>
                    <span style={styles.span}>
                            <h1 style={styles.h1}>Zifeng Xie </h1><br/><br/>
                            A Passionate Software Engineer
                    </span>
                    <div>
                        <ul style={styles.ul}>
                            {
                                icons.map((d, i) => {
                                    return (
                                        <li key={`icon${i}`} style={styles.li}> <a target="_blank" href={d[0]} className={`fa ${d[1]}`} style={styles.fa}></a> </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
                <div id='Education' style={styles.school}>
                    <School/>
                </div>
                <div id="Experience" style={styles.experience}>
                    <Experience/>
                </div>
                <div id="Projects" style={styles.experience}>
                    kla;dsf
                </div>
                <div id="Publication" style={styles.experience}>
                    kla;dsf
                </div>
            </div>
        );
    }

}

export default Profile;