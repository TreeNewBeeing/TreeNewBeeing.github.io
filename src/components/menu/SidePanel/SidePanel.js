import React, { PureComponent } from "react";
import "./SidePanel.css";

const defaultProps = {
    expand: false
};

class SidePanel extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div
                className={`${this.props.className} side-panel ${
                    this.props.expand ? "side-panel-appear" : ""
                }`}
                style={{ width: this.props.size }}
            >
                {this.props.children}
            </div>
        );
    }
}

SidePanel.defaultProps = defaultProps;

export default SidePanel;
