import React, { useEffect } from "react";
import Link from "next/link";

import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";

import Logo from "../Logo/Logo";
import useWindowSize from "../../@ronday/hooks/useWindowSize";
import styles from "../../assets/jss/ronday-material-dashboard/components/landingSidebarStyle";

const Sidebar = ({ open, setOpen }) => {
  const useStyles = makeStyles(styles);
  const user = useSelector((state) => state.auth.user);
  const classes = useStyles();
  const [width] = useWindowSize();

  const { logout } = useAuth0();

  const handleClose = () => {
    open && setOpen(false);
  };

  useEffect(() => {
    open && setOpen(false);
  }, [width]);

  return (
    <Drawer
      anchor="right"
      open={open}
      className={classes.drawer}
      transitionDuration={500}
      onClose={handleClose}
    >
      <ul className={classes.drawerLinksContainer}>
        <li className={classes.drawerLogo}>
          <Link href={"/"}>
            <a title="home" onClick={() => setOpen(!open)}>
              <Logo viewBox="0 0 116 32" width={90} height={32} />
            </a>
          </Link>
        </li>

        <li className={classes.li}>
          <a
            href="http://rondayapp.com/pricing"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pricing
          </a>
        </li>

        <li className={classes.li}>
          <a onClick={() => download()} href="#">
            Download
          </a>
        </li>
        <li className={classes.li}>
          <Link href={"/dashboard/settings"}>
            <a onClick={() => setOpen(!open)}>Profile Settings</a>
          </Link>
        </li>
        <li className={classes.li}>

            <a
              onClick={() => {
                logout();
                setOpen(!open);
              }}
            >
              Sign Out
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
      </ul>
    </Drawer>
  );
};

export default Sidebar;
