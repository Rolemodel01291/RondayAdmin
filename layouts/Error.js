import Image from "next/image";

import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

import styles from "../assets/jss/ronday-material-dashboard/layouts/errorStyle";

const Error = ({ children, icon, title }) => {
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  return (
    <div className={classes.background}>
      <div className={classes.contentField}>
        <div className={classes.header}>
          <Image alt="ronday logo" src="/logo.svg" width={148} height={41} />
        </div>
        <div className={classes.icon}>
          <Image alt={icon.alt} src={icon.src} width={40} height={40} />
        </div>
        <div className={classes.container}>
          <Typography className={classes.cardTitleBlack}>{title}</Typography>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Error;
