import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";

import Footer from "../components/LandingPageFooter/Footer";
import Navbar from "../components/LandingPageNavbar/Navbar";
import Sidebar from "../components/LandingPageSidebar/Sidebar";

import styles from "../assets/jss/ronday-material-dashboard/layouts/layoutStyle";

const Layout = ({ children, ...rest }) => {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  return (
    <div className={classes.wrapper}>
      <div>
        <Navbar open={open} setOpen={setOpen} />
        <Sidebar open={open} setOpen={setOpen} />
        <div className={classes.content}>
          <div className={classes.container}>{children}</div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;
