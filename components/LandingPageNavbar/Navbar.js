import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";

import MenuIcon from "@material-ui/icons/Menu";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";

import Logo from "../Logo/Logo";
import UserActions from "../UserActions/UserActions";

import download from "../../@ronday/download";
import styles from "../../assets/jss/ronday-material-dashboard/components/landingNavBarStyle";

const Navbar = ({ open, setOpen }) => {
  const useStyles = makeStyles(styles);
  const user = useSelector((state) => state.auth.user);
  const classes = useStyles();
  return (
    <AppBar elevation={0}>
      <div className={classes.navBar}>
        <div className={classes.container}>
          <Link href="https://rondayapp.com">
            <a>
              <Logo />
            </a>
          </Link>
          <ul className={classes.list}>
            <li className={classes.li}>
              <a href="http://rondayapp.com/pricing">Pricing</a>
            </li>

            <li className={classes.li}>
              <a onClick={() => download()} href="#">
                Download
              </a>
            </li>

            {!user && (
              <li className={classes.li}>
                <a href="https://admin.rondayapp.com/Home">Sign In</a>
              </li>
            )}
            <li className={classes.li}>
              <Button
                href="https://forms.gle/2PfqTHoZ5HGXiShB7"
                target="blank"
                referrerPolicy="noopener noreferrer"
                variant="outlined"
                className={classes.joinWaitlistBtn}
              >
                Get Ronday!
              </Button>
            </li>
            {user && (
              <li className={classes.li}>
                <UserActions user={user} />
              </li>
            )}
          </ul>
          <div className={classes.mobileActions}>
            <Button
              className={classes.drawerButton}
              onClick={() => setOpen(!open)}
            >
              <MenuIcon className={classes.iconLightest} />
            </Button>
          </div>
        </div>
      </div>
    </AppBar>
  );
};

export default Navbar;
