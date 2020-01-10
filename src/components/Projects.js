import React, { PureComponent } from "react";
import global from "../Global";
import "./Projects.css";
import avantgardeImage from "../img/avantgarde.png";
import hivGraphImage from "../img/HIV_Graph.png";
import emsImage from "../img/EMS.png";
import sciqImage from "../img/SciQ.png";
import uberImage from "../img/UberBill.png";
import easyEvent from "../img/EasyEvent.png";
import hisGeoMap from "../img/hisgeomap.png";
import { Link } from "react-router-dom";
import SwipeableViews from "react-swipeable-views";
import strings from "../constants/strings";
import { Chip, Card } from "@material-ui/core";

const styles = {
    root: {
        width: "100%",
        height: "100%",
        background: "white",
        maxWidth: "100%",
        columnGap: "1"
    },
    col: {},
    element: {
        breakInside: "avoid",
        boxSizing: "border-box",
        padding: "30px"
    },
    feed: {
        minHeight: "400px",
        background: "white",
        boxShadow: "0px 0px 25px gray",
        borderRadius: "20px",
        padding: "20px",
        paddingTop: "30px",
        overflow: "hidden"
    },
    feedImage: {
        // height: '300px',
        width: "100%"
    },
    feedDescription: {
        width: "100%",
        boxSizing: "border-box",
        padding: "20px",
        fontSize: "16px",
        lineHeight: "30px"
    },
    feedTitle: {
        fontSize: "20px",
        textAlign: "center",
        lineHeight: "30px",
        padding: "20px 0"
    },
    feedDate: {
        fontSize: "14px",
        textAlign: "center",
        fontWeight: "normal"
    },
    feedRole: {
        fontSize: "14px",
        textAlign: "center"
    }
};

const Projects = props => {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         feedList: [
    // new Feed(
    //     "HisGeoMap",
    //     "2019.05 - Now",
    //     [
    //         "HisGeoMap is an open-source and free online GIS tool designed for History study. By citing data from academic GIS dataset like CHGIS, HisGeoMap provides accurate geolocation searching of historical places. Unlike traditional static map, by providing functionalities like place name search, smart era indexing, HisGeoMap satisfies history researcher and amateur’s need of viewing and searching geographic infomation of historical places and provide users even greater experience."
    //     ],
    //     hisGeoMap
    // ),
    // new Feed(
    //     (
    //         <span>
    //             UCSD CSE <br />
    //             Avant-Garde
    //         </span>
    //     ),
    //     "2017.12 - 2018.05",
    //     [
    //         "Avant-Garde is an online platform for multi-faceted visual analysis of HIV/AIDS data. This tool enables clinicians to explore heterogeneous HIV/AIDS data to understand the phylogenetic, demographic, geographic and temporal characteristics and relationships in data. Various coordinated views represent data from different angles. Brushing-and-linking and dynamic filtering enables users to quickly discover the hidden relationships in data. This research a collaboration between faculties of Computer Science and Engineering (CSE) and Medicine at the University of California, San Diego"
    //     ],
    //     avantgardeImage
    // ),
    // new Feed(
    //     "HIV Risk Factor Visualization",
    //     "2018.04 - 2018.06",
    //     [
    //         "This project aims to facilitate HIV intervention through identification and visualization of risk-prone behaviors, events, and locations. We are using machine learning techniques to identify/classify risk signals in social media data. The visualization component of this project will enable healthcare providers to explore risk data from multiple perspectives and understand the intricate interplay of various social, demographic and geographic factors. This knowledge will, in turn, inform prevention and facilitate targeted intervention for HIV."
    //     ],
    //     hivGraphImage
    // ),
    // new Feed(
    //     "Adaptive Binning & Grouping of Data",
    //     "2017.12 - 2018.02",
    //     "This project investigates the use of novel and intuitive interaction techniques to support adaptive binning and grouping of data at the GUI level. Currently, exploratory data analysis tools only support indirect manipulation of binning and grouping through interaction with various menus and sub-menus. We are investigating embedded interactions that enable a user to directly manipulate this critriea through interaction with graphical elements of a visualization.",
    //     emsImage
    // ),
    // new Feed(
    //     "SciQ",
    //     "2018.06 - 2018.09",
    //     [
    //         "SciQ is a mobile app that wants to revolutionize the way we think about skin care. By combining scientific data with crowdsourcing and social media, SciQ aims to create transparency about the chemical compositions of different products and how those chemicals react with diverse skin types. Users of SciQ can see other users' reviews on any skin care product or create their own reviews. By its strong search functionality, users can easily search the product they want."
    //     ],
    //     sciqImage
    // ),
    // new Feed("Uber Total", "2017.08 - 2017.09", [""], uberImage),
    // new Feed("EasyEvent", "2017.07 - 2017.08", [""], easyEvent)
    //         ]
    //     };
    // }

    const { experience, projects, sections } = strings[
        window.sessionStorage.getItem("lang")
    ];
    return (
        <div>
            <h1 id="experience" className="experience-title">
                {sections[1]}
            </h1>
            <div className="experience-container">
                <ul className="experience" style={styles.root}>
                    {experience.map((e, i) => (
                        <li key={i} className="project-card">
                            <div style={styles.feed}>
                                <div className="project-image-area">
                                    <img
                                        className="project-image"
                                        src={e.images[0]}
                                    />
                                </div>

                                <div style={styles.feedDescription}>
                                    <a target="_blank" href={e.link}>
                                        <h1 className="project-team">
                                            {e.team}
                                        </h1>
                                    </a>
                                    {/* <h1 style={styles.feedTitle}> {e.project} </h1> */}

                                    <h2 style={styles.feedDate}>{e.role}</h2>
                                    <h2 style={styles.feedDate}>{e.date}</h2>
                                    <div className="project-tags">
                                        {e.tags.map(tag => {
                                            return (
                                                <Chip
                                                    className="project-tag"
                                                    label={tag}
                                                    size="small"
                                                ></Chip>
                                            );
                                        })}
                                    </div>
                                    <SwipeableViews>
                                        <div>{e.description}</div>
                                        <div></div>
                                    </SwipeableViews>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <h1 className="experience-title">{sections[2]}</h1>
            <ul id="projects">
                {projects.map(project => {
                    return (
                        <Card elevation={3} className="project-item">
                            <img
                                className="project-item-image"
                                src={project.images[0]}
                            ></img>
                        </Card>
                    );
                })}
            </ul>
        </div>
    );
};
export default Projects;
