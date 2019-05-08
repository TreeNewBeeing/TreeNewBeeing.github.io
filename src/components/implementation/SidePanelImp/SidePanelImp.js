import React from "react";

const bars = ["Home", "Education", "Projects"];
export default React.memo(props => (
    <React.Fragment>
        <p className="side-panel-title">
            <span className="side-panel-hi"> Hi, </span>
            <span className="side-panel-greeting">
                Welcome to Zifeng Xie's Page
            </span>
        </p>
        <ul>
            {bars.map((e, i) => {
                return (
                    <li
                        className="side-panel-bar"
                        key={i}
                        onClick={props.close}
                    >
                        <div className="side-panel-label" />

                        <a href={`#${bars[i]}`}>
                            <span className="side-panel-text">{bars[i]}</span>
                        </a>
                    </li>
                );
            })}
        </ul>
    </React.Fragment>
));
