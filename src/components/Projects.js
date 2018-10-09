import React, {PureComponent} from 'react';
import global from '../lib/Global'
import '../css/Projects.css'
import avantgardeImage from '../img/avantgarde.png'
import hivGraphImage from '../img/HIV_Graph.png'
import ufitImage from '../img/ufit.png'
import emsImage from '../img/EMS.png'
import sciqImage from '../img/SciQ.png'
import uberImage from '../img/UberBill.png'
import easyEvent from '../img/EasyEvent.png'


const styles = {
    root: {
        width: '100%',
        height: '100%',
        background: 'white',
        maxWidth: '100%',
        columnGap: '1',
    },
    col: {

    },
    element: {
        breakInside: 'avoid',
        boxSizing: 'border-box',
        padding: '30px',
    },
    feed: {
        minHeight: '400px',
        background: 'white',
        boxShadow: '0px 0px 25px gray',
        borderRadius: '20px',
        overflow: 'hidden',
    },
    feedImage: {
        // height: '300px',
        width: '100%',
    },
    feedDescription: {
        width: '100%',
        boxSizing: 'border-box',
        padding: '30px',
        fontSize: '16px',
        lineHeight: '30px'
    },
    feedTitle: {
        fontSize: '20px',
        textAlign: 'center',
        lineHeight: '60px',
    }
};

export default class Projects extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            feedList: [
                new Feed(
                    "Avant-Garde",
                    "Avant-Garde is an online platform for multi-faceted visual analysis of HIV/AIDS data. This tool enables clinicians to explore heterogeneous HIV/AIDS data to understand the phylogenetic, demographic, geographic and temporal characteristics and relationships in data. Various coordinated views represent data from different angles. Brushing-and-linking and dynamic filtering enables users to quickly discover the hidden relationships in data. This research a collaboration between faculties of Computer Science and Engineering (CSE) and Medicine at the University of California, San Diego",
                    avantgardeImage,
                ),
                new Feed(
                    "HIV Risk Factor Visualization",
                    "This project aims to facilitate HIV intervention through identification and visualization of risk-prone behaviors, events, and locations. We are using machine learning techniques to identify/classify risk signals in social media data. The visualization component of this project will enable healthcare providers to explore risk data from multiple perspectives and understand the intricate interplay of various social, demographic and geographic factors. This knowledge will, in turn, inform prevention and facilitate targeted intervention for HIV.",
                    hivGraphImage

                ),
                new Feed(
                    "Ufit",
                    "",
                    ufitImage

                ),
                new Feed(
                    "Adaptive Binning & Grouping of Data",
                    "This project investigates the use of novel and intuitive interaction techniques to support adaptive binning and grouping of data at the GUI level. Currently, exploratory data analysis tools only support indirect manipulation of binning and grouping through interaction with various menus and sub-menus. We are investigating embedded interactions that enable a user to directly manipulate this critriea through interaction with graphical elements of a visualization.",
                    emsImage
                ),
                new Feed(
                    "SciQ",
                    "",
                    sciqImage
                ),
                new Feed(
                    "Uber Total",
                    "",
                    uberImage

                ),
                new Feed(
                    "EasyEvent",
                    "",
                    easyEvent
                )
            ]
        }
    }

    render() {
        return (
            <ul class='feedList' style={styles.root}>


               {this.state.feedList.map((e, i) => (
                    <li key='i' style={styles.element} >
                        <div style={styles.feed}>

                            <img src={e.image} style={styles.feedImage}/>
                            <div style={styles.feedDescription}>
                                <h1 style={styles.feedTitle}> {e.title} </h1>
                                {e.description}
                            </div>
                        </div>
                    </li>
               ))}
            </ul>
        );
    }
}


class Feed {
    constructor(title, description, image) {
        this.title = title;
        this.description = description;
        this.image = image
    }
}