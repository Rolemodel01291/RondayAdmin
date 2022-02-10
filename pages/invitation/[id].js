import React, { useCallback, useEffect, useState } from "react";
import Router, {useRouter} from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {useAuth0, withAuthenticationRequired} from "@auth0/auth0-react";
import { makeStyles } from "@material-ui/core/styles";

import Layout from "../../layouts/Layout";
import {acceptInvite, getUser, getInvitations, setShareableInviteLink} from "../../components/store/authSlice";

import styles from "../../assets/jss/ronday-material-dashboard/views/acceptInviteStyle";
import CardHeader from "@material-ui/core/CardHeader";
import Card from "@material-ui/core/Card";
import {Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import RondayLoading from "../../components/RondayLoading/RondayLoading";
import {DefaultError, EmailVerification} from "../../components/Errors";

const Index = () => {
    const useStyles = makeStyles(styles);
    const dispatch = useDispatch();

    const classes = useStyles();
    const {
        isLoading,
        isAuthenticated,
        loginWithRedirect,
    } = useAuth0();
    const { asPath } = useRouter();
    const [isExpired, setIsExpired] = useState(false);
    const invitedOrg = useSelector((state) => state.auth.invitedOrg);

    let inviteId = asPath.split("/");

    useEffect(()=>{
        dispatch(setShareableInviteLink(inviteId[2]));
        if (isAuthenticated && !isExpired) {
            Router.push('/');
        } else {
            dispatch(acceptInvite(inviteId[2])).then((res) => {
                if (!res.payload) {
                    setIsExpired(true);
                }
            })
        }
    }, [isLoading, isAuthenticated])

    return (
        <>
            {isExpired ?
                <Layout>
                    <Card elevation={0} className={classes.notValidCard}>
                        <Typography className={classes.content}>
                            This invitation is no longer valid.
                        </Typography>
                    </Card>
                </Layout> :
            <>
                {!isAuthenticated && isLoading && <RondayLoading/>}
                {isAuthenticated && !isLoading && <></>}
                {!isAuthenticated && !isLoading &&
                <Layout>
                    <div>
                        <Card elevation={0} className={classes.card}>
                            {invitedOrg && <CardHeader
                                className={classes.cardHeader}
                                title={`Join ${invitedOrg?.organizationDisplayName} Org`}
                                titleTypographyProps={{variant: "subtitle1", className: classes.cardHeader}}
                            />}
                            {invitedOrg && <Typography className={classes.inviteText}>
                                You&apos;re invited to join <span
                                className={classes.fontBold}>{`${invitedOrg?.organizationDisplayName} Org on Ronday!`}</span> .
                            </Typography>}
                            <Button variant="outlined" className={classes.inviteButton}
                                    onClick={() => loginWithRedirect()}>
                                Accept Invitation
                            </Button>
                        </Card>
                    </div>
                </Layout>
                }
            </>
        }
        </>
    )



};

export default Index;