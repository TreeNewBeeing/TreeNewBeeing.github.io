import React, { useState } from "react";
import "../css/Profile.css";
import global from "../Global";
import icon from "../img/icon3.png";
import {
    Avatar,
    Chip,
    AppBar,
    Toolbar,
    Typography,
    Switch,
    FormControl,
    InputLabel,
    Drawer,
    Select,
    MenuItem,
    ThemeProvider,
    createMuiTheme,
    IconButton
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import Education from "../components/implementation/Education/Education";
import Experience from "./Experience";
import Projects from "./Projects";
import "./Profile.css";
import strings from "../constants/strings.js";
import SidePanelImp from "./implementation/SidePanelImp/SidePanelImp";

const styles = {
    profile: {
        height: "100%",
        width: "100%"
        // paddingTop: `${global.height.navbar}px`,
        // overflowY: 'auto',
    },
    icon: {
        width: "100%",
        height: `${global.height.icon}px`,
        borderRadius: "10px"
    },

    img: {
        margin: "auto",
        position: "relative",
        top: `${global.height.iconImage - 15}px`,
        borderRadius: `${global.height.iconImage}px`,
        width: `${global.height.iconImage}px`,
        height: `${global.height.iconImage}px`,
        display: "block"
    },

    span: {
        width: "100%",
        display: "block",
        fontSize: global.font.sm,
        color: "aliceblue",
        margin: "0 auto",
        textAlign: "center",
        fontFamily: "Arial, Helvetica, sans-serif"
    },

    h1: {
        fontSize: `${global.font.big}px`,
        fontFamily:
            "San -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
    },

    ul: {
        width: `${5 * (global.height.contact + 20)}px`,
        height: `${global.height.contact}px`,
        margin: "30px auto"
    },
    li: {
        padding: "10px",
        float: "left"
    },
    fa: {
        width: `${global.height.contact}px`,
        height: `${global.height.contact}px`,
        fontSize: `${global.font.big}px`,
        textAlign: "center",
        lineHeight: `${global.height.contact}px`,
        textDecoration: "none",
        transition: "0.2s",
        color: "white",
        borderRadius: "5px"
    },
    main: {
        height: `${global.height.main}px`
    },
    school: {
        backgroundColor: "white",
        height: `${global.height.school}px`,
        position: "relative",
        overflow: "hidden"
    },
    experience: {
        width: "100%",
        height: "500px",
        overflowY: "auto",
        backgroundColor: "white"
    },
    projects: {
        width: "100%",
        height: "auto",
        overflowX: "auto"
    }
};

const icons = [
    [
        "https://www.facebook.com/people/Zifeng-Xie/100006370320902",
        "fa-facebook"
    ],
    ["", "fa-wechat"],
    ["mailto:christo1tse@gmail.com", "fa-envelope"],
    ["https://www.linkedin.com/in/zifeng-xie/", "fa-linkedin"],
    ["https://github.com/TreeNewBeeing/", "fa-github"]
];

let theme = createMuiTheme();
//     {
//     palette: {
//         primary: {
//             // light: will be calculated from palette.primary.main,
//             light: "#7986cb",
//             main: "#3f51b5",
//             dark: "#303f9f",
//             contrastText: "#fff"
//             // dark: will be calculated from palette.primary.main,
//             // contrastText: will be calculated to contrast with palette.primary.main
//         },
//         secondary: {
//             light: "#0066ff",
//             main: "#0044ff",
//             // dark: will be calculated from palette.secondary.main,
//             contrastText: "#fff"
//         },
//         // Used by `getContrastText()` to maximize the contrast between
//         // the background and the text.
//         contrastThreshold: 3,
//         // Used by the functions below to shift a color's luminance by approximately
//         // two indexes within its tonal palette.
//         // E.g., shift from Red 500 to Red 300 or Red 700.
//         tonalOffset: 0.2
//     }
// }

const Profile = props => {
    // language
    const [lang, setLang] = React.useState(
        window.sessionStorage.getItem("lang")
    );
    const handleSetLang = e => {
        setLang(e.target.value);
        window.sessionStorage.setItem("lang", e.target.value);
    };

    // drawer
    const [open, setOpen] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <AppBar position="fixed" className="Profile-appbar">
                <Toolbar className="Profile-toolbar">
                    <div className="Profile-toolbar-left">
                        <Typography variant="h6">
                            {strings[lang].name}
                        </Typography>

                        <FormControl className="Profile-lang">
                            <Select
                                value={lang}
                                onChange={handleSetLang}
                                className="Profile-lang-select"
                            >
                                <MenuItem value={"EN"}>English</MenuItem>
                                <MenuItem value={"CN"}>中文</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <IconButton
                        edge="start"
                        // className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                        onClick={handleDrawerOpen}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <div id="home">
                <Avatar alt="Zifeng Xie" src={icon} className="Profile-icon" />
                <h1 className="Profile-name">{strings[lang].name}</h1>
                <span className="Profile-desc">{strings[lang].desc}</span>
                <div className="Profile-tags">
                    <Chip size="small" label="JavaScript" />
                    <Chip size="small" label="Java" />
                    <Chip size="small" label="Node.js" />
                    <Chip size="small" label="React" />
                    <Chip size="small" label="D3" />
                    <Chip size="small" label="TypeScript" />
                    <Chip size="small" label="ElasticSearch" />
                    <Chip size="small" label="MySQL" />
                    <Chip size="small" label="Antd UI" />
                </div>
                <div>
                    <ul style={styles.ul}>
                        {icons.map((d, i) => {
                            return (
                                <li key={`icon${i}`} style={styles.li}>
                                    <a
                                        target="_blank"
                                        href={d[0]}
                                        className={`fa ${d[1]}`}
                                        style={styles.fa}
                                    />
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>

            <Projects />

            <Drawer variant="persistent" anchor="right" open={open}>
                <SidePanelImp close={handleDrawerClose} />
            </Drawer>
            <div
                className={`Profile-collapse ${
                    open
                        ? "Profile-collapse-appear"
                        : "Profile-collapse-disappear"
                }`}
                onClick={handleDrawerClose}
            />
        </ThemeProvider>
    );
};

export default Profile;
