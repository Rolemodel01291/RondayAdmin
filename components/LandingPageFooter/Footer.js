import Link from "next/link";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";

import { makeStyles } from "@material-ui/core/styles";
import styles from "../../assets/jss/ronday-material-dashboard/components/layoutFooterStyle";
import download from "../../@ronday/download";
import Logo from "../Logo/Logo";

const Footer = () => {
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <div className={classes.mainFooterSection}>
        <div className={classes.linkContainer}>
          <List className={classes.list}>
            <ListItem className={classes.listItem}>
              <Link href={"https://rondayapp.com/pricing"}>
                <a>Pricing</a>
              </Link>
            </ListItem>
            <ListItem className={classes.listItem}>
              <Link href={"/"}>
                <a onClick={() => download()}>Download</a>
              </Link>
            </ListItem>
            <ListItem className={classes.listItem}>
              <Link href={"https://rondayapp.com/help"}>
                <a>Help</a>
              </Link>
            </ListItem>
            <ListItem className={classes.listItem}>
              <Link href={"https://rondayapp.com/privacy-policy"}>
                <a>Privacy Policy</a>
              </Link>
            </ListItem>
            <ListItem className={classes.listItem}>
              <Link href={"https://rondayapp.com/terms-of-service"}>
                <a>Terms of Service</a>
              </Link>
            </ListItem>
          </List>
        </div>
        <div className={classes.copyrightContainer}>
          <Link href={"https://rondayapp.com/"}>
            <a title="home">
              <Logo className={classes.logo} />
            </a>
          </Link>
          <div className={classes.copyright}>
            &#169; 2021 Ronday Technologies
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
