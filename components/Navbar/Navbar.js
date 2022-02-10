import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import Router, { useRouter } from "next/router";
import Link from 'next/link'
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
// @material-ui/icons
import Menu from "@material-ui/icons/Menu";
// core components
// import AdminNavbarLinks from "./AdminNavbarLinks.js";
// import RTLNavbarLinks from "./RTLNavbarLinks.js";
import Button from "../CustomButtons/Button";

import styles from "../../assets/jss/ronday-material-dashboard/components/headerStyle";


export default function Header(props) {
  // used for checking current route
  const router = useRouter();
  // create styles for this component
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const { color } = props;
  const appBarClasses = classNames({
    [" " + classes[color]]: color,
  });


  // const handleCreate = () => {
  //   Router.push('/dashboard/spaces/type');
  // }


  return (
    <AppBar className={classes.appBar + appBarClasses} color="transparent">
      <Toolbar className={classes.container}>
        <div className={classes.flex}>
          <a>Want Ronday for another organization? </a>
          <Link href="/onboarding">
            <a className={classes.title}>
               Create a new organization
            </a>
          </Link>
        </div>

        <Hidden mdUp implementation="css">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  routes: PropTypes.arrayOf(PropTypes.object),
};
