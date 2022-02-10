import React from "react";
import Router from "next/router";
import Image from "next/image";

import clsx from "clsx";
import {useDispatch, useSelector} from "react-redux";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import ListItem from "@material-ui/core/ListItem";
import { makeStyles } from "@material-ui/core/styles";

import useWindowSize from "../../@ronday/hooks/useWindowSize";
import {
    acceptInvitePost,
    deleteInvitation,
    setAcceptedOrgName,
    setIsNotMatching,
    setSelectedOrganizationId, setShareableInviteLink
} from "../store/authSlice";
import styles from "../../assets/jss/ronday-material-dashboard/components/organizationListStyle";
import {useAuth0} from "@auth0/auth0-react";

const InvitationListItem = ({ organization, handleClick }) => {
    const [width, _] = useWindowSize();
    const useStyles = makeStyles(styles);
    const classes = useStyles();
    const dispatch = useDispatch();

    const { organizationDisplayName, token: inviteId } = organization;
    const token = useSelector((state) => state.auth.token);

    const handleAcceptInvitation = () => {
       dispatch(acceptInvitePost({token, inviteId})).then((res) => {
           if (!res.payload) {
               handleClick(true);
           } else {
               dispatch(setAcceptedOrgName(organizationDisplayName));
               dispatch(setShareableInviteLink(inviteId));
               Router.reload('/');
           }
       });
    };

    return (
        <ListItem className={classes.listItem}>
            <Card
                className={clsx(classes.imageCard, classes.emptyCard)}
            >
            </Card>
            <div>
                <p className={classes.orgName}>{organizationDisplayName}</p>
            </div>
                <Button
                    onClick={handleAcceptInvitation}
                    variant="contained"
                    disableElevation={true}
                    className={classes.button}
                >
                    Accept
                </Button>
        </ListItem>
    );
};

export default InvitationListItem;
