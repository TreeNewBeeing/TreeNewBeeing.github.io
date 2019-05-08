import React from "react";
import global from "../../../Global";
import Hamburger from "../Hamburger/Hamburger";
import Navbar from "../Navbar/Navbar";
import SidePanel from "../SidePanel/SidePanel";
import "./SideNavigation.css";

export default class SideNavigation extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            sideAppear: false,
            sideAppearFromProps: true
        };
    }
    sideChange = () => {
        this.setState({
            ...this.state,
            sideAppear: !this.state.sideAppear,
            sideAppearFromProps: false
        });
    };

    static getDerivedStateFromProps(props, state) {
        state.sideAppear = state.sideAppearFromProps
            ? props.expand
            : state.sideAppear;
        state.sideAppearFromProps = true;
        return state;
    }

    render() {
        return (
            <div className="side-navigation">
                <div
                    className="side-navigation-transform"
                    style={{
                        transform: `${
                            this.state.sideAppear && this.props.pageMove
                                ? `translateX(-${global.width.sidePanel}px)`
                                : "translateX(0)"
                        }`
                    }}
                >
                    <Navbar
                        className="side-navigation-navbar"
                        height={global.height.navbar}
                    >
                        {this.props.navbar}
                    </Navbar>
                    <SidePanel
                        className="side-navigation-side-panel"
                        size={global.width.sidePanel}
                        expand={this.state.sideAppear && !this.props.pageMove}
                    >
                        {this.props.sidePanel}
                    </SidePanel>
                    <Hamburger
                        className="side-navigation-hamburger"
                        size={global.height.navbar * 0.6}
                        expand={this.state.sideAppear}
                        onClick={this.sideChange}
                    />
                    {this.props.mask ? (
                        <div
                            className={`side-navigation-mask side-navigation-mask-${
                                this.state.sideAppear ? "appear" : "hide"
                            }`}
                            onClick={this.sideChange}
                        />
                    ) : null}
                    <div className="side-navigation-window">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}
