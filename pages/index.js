import React, { useCallback, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {useAuth0, withAuthenticationRequired} from "@auth0/auth0-react";
import clsx from "clsx";
import _ from 'lodash';
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import Layout from "../layouts/Layout";
import OrganizationList from "../components/OrganiztaionList/OrganizationList";
import OrganizationListSkeleton from "../components/skeleton/OrganizationListSkeleton";
import GetErrorMessage  from "../components/GetErrorMessage/GetErrorMessage";

import {
    acceptInvitePost,
    getInvitations,
    getOrganizations,
    getUser,
    setAuthentication,
    setHeader
} from "../components/store/authSlice";
import { getMembers } from "./dashboard/members/store/memberSlice";
import download from "../@ronday/download";

import styles from "../assets/jss/ronday-material-dashboard/views/userStyle";
import InvitationList from "../components/InvitationList/InvitationList";
import RondayLoading from "../components/RondayLoading/RondayLoading";
import {inviteLink} from "../services/awsService/inviteId";
import {setIn} from "formik";

const Index = () => {
  const [organizations, setOrganizations] = useState(null);
  const [invitations, setInvitations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isNotMatching, setIsNotMatching] = useState(false);
  // const [inviteArray, setInviteArray] = useState([]);

  const useStyles = makeStyles(styles);
  const dispatch = useDispatch();

  const classes = useStyles();
  const user = useSelector((state) =>state.auth.user);
  const ShareableInviteLink = useSelector((state) => state.auth.ShareableInviteLink);
  const invitedOrg = useSelector((state) => state.auth.invitedOrg);
  const acceptedOrgName = useSelector((state) => state.auth.acceptedOrgName);
  //const invitations = useSelector((state) => state.auth.invitations);

  const {
    logout,
    getIdTokenClaims
  } = useAuth0();

  let token;

  const { organizationDisplayName, token: inviteId } = invitedOrg;

  const getMemberCountsCallback = useCallback(
    async function (organizations) {
      const organizationsWithCounts = [];

      for (let o of organizations) {
        const organization = { ...o };

        try {
          const members = await dispatch(
            getMembers({
              selectedOrganizationId: organization.organizationId,
              token,
            })
          );
          organization.members = members.payload.users;
          organizationsWithCounts.push(organization);
        } catch (error) {
          console.error("getMemberCounts error :", error);
        }
      }

      setOrganizations(organizationsWithCounts);
      setLoading(false);
    },
    [dispatch, token]
  );


  useEffect(() => {
    getIdTokenClaims()
      .then(data => {
        dispatch(setAuthentication(data));
        dispatch(setHeader(data.__raw));
        token = data.__raw;
        if (token) {
          getUserData(token);
        }

        //Detect newly created email that is not matching with invite email
        dispatch(getInvitations(token)).then((res) => {
            if (res.payload.length === 0 && ShareableInviteLink) {
                setIsNotMatching(true);
            }

        })
      })
      .catch(err=> {
        console.log("err", err);
    })

    const getUserData = async (token) => {
      dispatch(getUser({ token })).then((res) => {
        if (!res.payload) {
          localStorage.clear();
          logout();
        }
      });
      const organizations = await dispatch(getOrganizations(token));
      const invitations = await dispatch(getInvitations(token));
      getMemberCountsCallback(organizations.payload);
      if (!_.some(invitations.payload, ['token', inviteId]) && acceptedOrgName !== organizationDisplayName) {
        let temp = [...invitations.payload];
        temp.push(invitedOrg);
        setInvitations(temp);
      } else {
        setInvitations(invitations.payload);
      }
    };
  }, [dispatch, token, invitedOrg, getMemberCountsCallback]);

  const handleClick = (value) => {
      setIsNotMatching(value);
  }

  return (
      <>
              <Layout>
                  {ShareableInviteLink && isNotMatching ?
                      <GetErrorMessage/> :
                      <div>
                          {acceptedOrgName && ShareableInviteLink && <Card elevation={0} className={clsx(classes.acceptCard)}>
                              <p className={classes.boldText}>
                                  {`You‘ve joined ${acceptedOrgName} Org!`}
                              </p>
                              <p className={classes.nextText}>
                                  What&apos;s next?
                              </p>
                              <p className={classes.acceptText}>
                                  1. Download and install Ronday on your computer.<br></br>
                                  2. Open the app and sign in your account. <br></br>
                                  3. Select a space to join!
                              </p>
                          </Card>}
                          {!loading? (
                              <OrganizationList user={user} organizations={organizations} />
                          ) : (
                              <OrganizationListSkeleton />
                          )}
                          {invitations && invitations.length > 0 &&
                            <InvitationList user={user} invitations={invitations} handleManageClick={handleClick}/>
                          }
                          <div className={classes.container}>
                              <p className={classes.boldText}>
                                  Download and install the app to get started.
                              </p>
                              <div>
                                  <Button
                                      className={classes.containedButton}
                                      onClick={download}
                                      variant="contained"
                                      disableElevation={true}
                                  >
                                      Download Ronday
                                  </Button>
                                  <Button
                                      href="Ronday://"
                                      target="blank"
                                      referrerPolicy="noopener noreferrer"
                                      className={classes.button}
                                      variant="outlined"
                                  >
                                      Open Ronday
                                  </Button>
                              </div>
                          </div>

                          <Card elevation={0} className={clsx(classes.card, classes.joinCard)}>
                              <p className={classes.joinText}>
                                  Do you want Ronday for your organization?
                              </p>
                              <Button
                                  href="https://forms.gle/2PfqTHoZ5HGXiShB7"
                                  target="blank"
                                  referrerPolicy="noopener noreferrer"
                                  variant="outlined"
                                  className={`${classes.joinButton} waitlist-btn`}
                              >
                                  Get Ronday!
                              </Button>
                          </Card>
                      </div>}
              </Layout>
      </>

  );
};

export default withAuthenticationRequired(Index);
