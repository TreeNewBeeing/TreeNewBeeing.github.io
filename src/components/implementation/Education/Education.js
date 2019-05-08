import React from "react";
import "./Education.css";
import DropPanel from "../../panel/DropPanel/DropPanel";
import Gallery from "../../gallery/Gallery/Gallery";
import image1 from "../../../img/school/1.jpg";
import image2 from "../../../img/school/2.jpg";
import image3 from "../../../img/school/3.jpg";
import image4 from "../../../img/school/4.jpg";
import image5 from "../../../img/school/5.jpg";
import image6 from "../../../img/school/6.jpg";

const images = [image1, image2, image3, image4, image5, image6];
export default class Education extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expand: false,
            blur: false
        };
    }

    expandPanel = () => {
        if (!this.state.expand) this.setState({ ...this.state, expand: true });
    };

    onClosePanel = () => {
        this.setState({ ...this.state, blur: false });
    };

    onExpandPanel = () => {
        this.setState({ ...this.state, blur: true });
    };

    render() {
        return (
            <div className="education" onMouseEnter={this.expandPanel}>
                <DropPanel
                    className="education-info-layer"
                    expand={this.state.expand}
                    onClose={this.onClosePanel}
                    onExpand={this.onExpandPanel}
                    corner={[35, 35]}
                    offset={75}
                    height={500}
                    width={"90%"}
                >
                    <h1 className="education-h1"> UC SAN DIEGO</h1>
                    <h3 className="education-h3">
                        Bachelor of Math-Computer Science
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        2015 - 2019
                    </h3>
                    <div className="education-p">
                        <h2 className="education-course">Courses Acquired</h2>
                        <hr className="education-line" />
                        <ul className="education-courses">
                            {courses.map(e => (
                                <li className="clearfix education-course">
                                    {e.name}
                                    <div className="education-resource">
                                        <a
                                            href={e.demo}
                                            className="education-link"
                                        >
                                            notes
                                        </a>
                                        <a
                                            href={e.note}
                                            className="education-link"
                                        >
                                            demo
                                        </a>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </DropPanel>

                <Gallery
                    className="education-gallery-layer"
                    images={images}
                    blur={this.state.blur ? 8 : 0}
                    height={650}
                    imageWidth={320}
                    imageHeight={180}
                />
            </div>
        );
    }
}

class Course {
    constructor(name, demo, note) {
        this.name = name;
        this.demo = demo;
        this.note = note;
    }
}

const courses = [
    new Course("Object-Oriented Programming", null, null),
    new Course("Data Structure", null, null),
    new Course("Discrete Math", null, null),
    new Course("Computer Architecture", null, null),
    new Course("Algorithm", null, null),
    new Course("Software Engineeing", null, null),
    new Course("Operating System", null, null),
    new Course("Web Client Language", null, null),
    new Course("Data Mining", null, null),
    new Course("Computer Graphics", null, null),
    new Course("Interactive Design", null, null)
];
