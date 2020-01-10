import React from "react";
import "./SidePanelImp.css";
import strings from "../../../constants/strings";

const bars = ["home", "experience", "projects"];
export default React.memo(props => {
    const { sections, hello } = strings[window.sessionStorage.getItem("lang")];
    return (
        <div className="side-panel-content">
            <p className="side-panel-title">
                <span className="side-panel-hi"> Hi, </span>
                <span className="side-panel-greeting">{hello}</span>
            </p>
            <ul>
                {sections.map((e, i) => {
                    return (
                        <li
                            className="side-panel-bar"
                            key={i}
                            onClick={props.close}
                        >
                            <div className="side-panel-label" />

                            <a href={`#${bars[i]}`}>
                                <span className="side-panel-text">
                                    {sections[i]}
                                </span>
                            </a>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
});
