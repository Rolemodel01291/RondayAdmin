import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
// creates a beautiful scrollbar
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar"
import Footer from "../components/Footer/Footer";
import routes from "../routes";
import styles from "../assets/jss/ronday-material-dashboard/layouts/adminStyle";
import logo from "../public/img/reactlogo.png";

let ps;

export default function Admin({ children, ...rest }) {

    // used for checking current route
    const router = useRouter();
    // styles
    const useStyles = makeStyles(styles);
    const classes = useStyles();
    // ref to help us initialize PerfectScrollbar on windows devices
    const mainPanel = React.createRef();
    // states and functions
    const [background, setBackground] = useState('#F3F1E9');
    const [color, setColor] = useState("white");
    const [mobileOpen, setMobileOpen] = useState(false);


    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <div className={classes.wrapper}>
            <Sidebar
                routes={routes}
                logoText={"Admin Dashboard"}
                logo={logo}
                background={background}
                handleDrawerToggle={handleDrawerToggle}
                open={mobileOpen}
                color={color}
                {...rest}
            />
            <div className={classes.mainPanel} ref={mainPanel}>
                <Navbar
                    routes={routes}
                    handleDrawerToggle={handleDrawerToggle}
                    {...rest}
                />


                <div className={classes.content}>
                    <div className={classes.container}>{children}</div>
                </div>
                <Footer/>
            </div>
        </div>
    );
}
