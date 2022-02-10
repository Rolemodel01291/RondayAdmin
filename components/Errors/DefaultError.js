import Router from "next/router";

import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Error from "../../layouts/Error";
import styles from "../../assets/jss/ronday-material-dashboard/components/errorStyle";

const DefaultError = ({ msg }) => {
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  return (
    <Error
      icon={{ src: "/error.svg", alt: "error icon" }}
      title="Something went wrong!"
    >
      <Typography className={classes.content}>{msg}</Typography>
      <Typography className={classes.button}>
        <u onClick={() => Router.push("/")}>Go back to home page</u>
      </Typography>
    </Error>
  );
};

export default DefaultError;
