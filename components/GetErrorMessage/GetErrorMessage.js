import React from "react";
import {Card, Typography} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import styles from "../../assets/jss/ronday-material-dashboard/components/getErrorMessageStyle";
import { useAuth0 } from "@auth0/auth0-react";
import CardHeader from "@material-ui/core/CardHeader";

const GetErrorMessage = () => {
    const useStyles = makeStyles(styles);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const classes = useStyles();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { logout, user } = useAuth0();

    return (
        <Card elevation={0} className={classes.card}>
            <CardHeader
                className={classes.cardHeader}
                title={`Join a New Organization`}
                titleTypographyProps={{ variant: "subtitle1", className: classes.cardHeader }}
            />

            <Typography className={classes.content}>
                {`Your email address(${user.email}) does not
                match the invitation email address`}
            </Typography>
            <Typography className={classes.matchContent}>
                Please sign in with the email address to which this invitation
                was sent.
            </Typography>
            <Button variant="outlined" className={classes.button} onClick={()=>logout()}>
                Sign Out
            </Button>
        </Card>
    );
};

export default GetErrorMessage;
