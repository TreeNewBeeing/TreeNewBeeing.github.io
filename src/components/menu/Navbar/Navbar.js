import React, { PureComponent } from "react";
import Hamburger from "../Hamburger/Hamburger";
import "./Navbar.css";
import SidePanel from "../SidePanel/SidePanel";

const defaultProps = {
    expand: false,
    click: null
};

class Navbar extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            expand: false
        };
    }

    clickHamburger = status => {
        this.setState({ expand: status });
    };

    render() {
        return (
            <div
                className={`${this.props.className} navbar`}
                style={{ height: `${this.props.height}px` }}
            >
                {this.props.children}
            </div>
        );
    }
}

Navbar.defaultProps = defaultProps;

export default Navbar;
