import React from "react";

import CardHeader from "@material-ui/core/CardHeader";
import List from "@material-ui/core/List";
import Card from "@material-ui/core/Card";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import InvitationListItem from "./InvitationListItem";

import styles from "../../assets/jss/ronday-material-dashboard/components/organizationListStyle";
import {useAuth0} from "@auth0/auth0-react";

const InvitationList = ({ user, invitations, handleManageClick }) => {
    const useStyles = makeStyles(styles);
    const classes = useStyles();

    const handleClick = (value) => {
        handleManageClick(value);
    }


    return (
        <Card elevation={0} className={classes.card}>
            {user && (
                <CardHeader
                    className={classes.cardHeader}
                    title={`Invitations for ${user.emailAddress}`}
                    titleTypographyProps={{ variant: "subtitle1", className: classes.cardHeader }}
                />
            )}
            <List className={classes.list}>
                {invitations && invitations.length > 0 &&
                    invitations.map((o, i) => (
                        <InvitationListItem
                            key={i}
                            organization={o}
                            handleClick={handleClick}
                        />
                    ))
                }
            </List>
        </Card>
    );
};

export default InvitationList;
