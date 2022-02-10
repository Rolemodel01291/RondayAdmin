import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";

import Button from "@material-ui/core/Button";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core";
import { useAuthFunctions } from "aws-cognito-next";

import styles from "../../assets/jss/ronday-material-dashboard/components/userActionsStyle";
import { useAuth0 } from "@auth0/auth0-react";

const UserActions = ({ user }) => {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const [menuOpen, setMenuOpen] = useState(false);
  const anchorRef = useRef(null);
  
  const { logout } = useAuth0();
  

  const handleMenuToggle = () => {
    setMenuOpen((prevOpen) => !prevOpen);
  };

  const handleMenuClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setMenuOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setMenuOpen(false);
    }
  }

  async function handleLogOut() {
    setMenuOpen(false);
    localStorage.clear();
    logout();
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, []);

  return (
    <div>
      <Button
        ref={anchorRef}
        aria-controls={menuOpen ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleMenuToggle}
        className={classes.button}
      >
        <span>{user.defaultDisplayName}</span>
        {menuOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </Button>
      <Popper
        open={menuOpen}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper elevation={0} className={classes.paper}>
              <ClickAwayListener onClickAway={handleMenuClose}>
                <MenuList
                  autoFocusItem={menuOpen}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem className={classes.menuItem} onClick={handleLogOut}>Sign Out</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

export default UserActions;
