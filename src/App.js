import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";
// import SidePanel from "./components/menu/SidePanel/SidePanel";

import global from "./Global";
import SideNavigation from "./components/menu/SideNavigation/SideNavigation";
import NavbarImp from "./components/implementation/NavbarImp/NavbarImp";
import SidePanelImp from "./components/implementation/SidePanelImp/SidePanelImp";

import Profile from "./components/Profile";
window.sessionStorage.setItem("lang", "CN");
class App extends Component {
    constructor(props) {
        super(props);

        // state
        this.state = {
            expand: false
        };
    }

    hideSidePanel = () => {
        this.setState({ ...this.state, expand: false });
    };

    render() {
        return (
            <Router>
                <Route path="/">
                    <Profile />
                </Route>
            </Router>
        );
    }
}

export default App;
