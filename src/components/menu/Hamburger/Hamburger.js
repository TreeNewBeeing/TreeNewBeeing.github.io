import React, { PureComponent } from "react";
import "./Hamburger.css";

export default class Hamburger extends PureComponent {
    constructor(props) {
        super(props);
    }

    onClick = () => {
        if (this.props.onClick) {
            this.props.onClick(this.props.expand);
        }
    };

    render() {
        const marginRatio = 1 / 4;
        const heightRatio = 1 / 16;
        const widthRatio = 3 / 5;
        const top = Math.ceil(this.props.size * marginRatio);
        const height = Math.ceil(this.props.size * heightRatio);
        const width = Math.ceil(this.props.size * widthRatio);
        const margin = (this.props.size - width) / 2;
        const tops = [top, this.props.size / 2, this.props.size - top];
        const borderRadius = height / 2;
        return (
            <div
                style={{
                    width: this.props.size,
                    height: this.props.size
                }}
                className={`${this.props.className} hamburger`}
                onClick={this.onClick}
            >
                <ul
                    className={`hamburger-rotate-layer ${
                        this.props.expand
                            ? "hamburger-rotated"
                            : "hamburger-unrotated"
                    } `}
                >
                    {tops.map(e => (
                        <li
                            key={e}
                            style={{
                                top: e,
                                left: margin,
                                width,
                                height,
                                borderRadius
                            }}
                            className="hamburger-stick"
                        />
                    ))}
                </ul>
            </div>
        );
    }
}
