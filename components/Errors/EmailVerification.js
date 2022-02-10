import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Error from "../../layouts/Error";

import styles from "../../assets/jss/ronday-material-dashboard/components/errorStyle";
import { useAuth0 } from "@auth0/auth0-react";

const EmailVerification = () => {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const { logout } = useAuth0();

  return (
    <Error
      icon={{ src: "/email.svg", alt: "email icon" }}
      title="Please verify your email."
    >
      <Typography className={classes.content}>
        We sent you a verification email – Just click on the link in that email
        to complete your signup. If you don&apos;t see it, you may need to check
        your spam folder.
      </Typography>
      <Typography className={classes.button}>
        Having trouble verifying your email?
        <br />
        <u onClick={() => logout()}>
          Sign out and try using a different email.
        </u>
      </Typography>
    </Error>
  );
};

export default EmailVerification;
