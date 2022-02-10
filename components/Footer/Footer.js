/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
// core components
import styles from "../../assets/jss/ronday-material-dashboard/components/footerStyle";
import download from "../../@ronday/download";

export default function Footer(props) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a className={classes.copyright}>
                &#169; 2021 Ronday Technologies
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a onClick={()=>download()} className={classes.download}>
                Download Ronday
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="https://www.rondayapp.com/help" className={classes.block}>
                Support
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="https://www.rondayapp.com/pricing" className={classes.block}>
                Pricing
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="https://www.rondayapp.com/privacy-policy" className={classes.block}>
                Privacy Policy
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="https://www.rondayapp.com/terms-of-service" className={classes.block}>
                Terms of Service
              </a>
            </ListItem>
          </List>
        </div>
      </div>
    </footer>
  );
}
