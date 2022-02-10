import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router'
import clsx from 'clsx';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import FamilyOrganization from '../../../../components/FamilyOrganization/FamilyOrganization';
import { setOrganizationStyle } from '../store/familySlice';
import MySnackbar from '../../../../components/MySnackbar/MySnackbar';

import _ from 'lodash';
import styles from "../../../../assets/jss/ronday-material-dashboard/views/onboardStyle";
import {useAuth0, withAuthenticationRequired} from "@auth0/auth0-react";
import {getUser} from "../../../../components/store/authSlice";
import {getSocialSpaces} from "../../../dashboard/spaces/store/spaceSlice";



function OrgStyle() {
    const useStyles = makeStyles(styles);
    const classes = useStyles();
    const dispatch = useDispatch();
    const selectedOrgStyle = useSelector((state) => state.family.selectedOrgStyle);
    const socialSpaces = useSelector((state) => state.space.socialSpaces);
    const token = useSelector((state) => state.auth.token);
    const [state, setState] = useState({
        org: '',
        focus: null,
        open: false,
    })

    const {
        logout
    } = useAuth0();

    useEffect(() => {
        setState({ ...state, org: selectedOrgStyle.org, focus: selectedOrgStyle.focus });
    }, [selectedOrgStyle])

    useEffect(() => {
        if (token) {
            dispatch(getUser({token})).then((res)=>{
                if (!res.payload) {
                    localStorage.clear();
                    logout();
                }
            })
        }
        dispatch(getSocialSpaces(token));
    }, [dispatch])

    function handleOrg(organization) {
        organization === 'org1' ? setState({ ...state, org: organization, focus: 1 }) :
            organization === 'org2' ? setState({ ...state, org: organization, focus: 2 }) :
                setState({ ...state, org: organization, focus: 3 })
    }

    function goNext() {
        state.org === 'org1' ?
            dispatch(setOrganizationStyle({ title: 'Forest Campfire', img: 'forest.png', size: _.find(socialSpaces, { displayName: "Forest Campfire" })?.maxCapacity, org: state.org, focus: state.focus }))
            : state.org === 'org2' ?
                dispatch(setOrganizationStyle({ title: 'Ocean Lodge', img: 'lodge.png', size: _.find(socialSpaces, { displayName: "Ocean Lodge" })?.maxCapacity, org: state.org, focus: state.focus }))
                : dispatch(setOrganizationStyle({ title: 'Party Condo', img: 'party.png', size: _.find(socialSpaces, { displayName: "Party Condo" })?.maxCapacity, org: state.org, focus: state.focus }))

        if (!state.org) {
            setState({ ...state, open: true });
        } else {
            Router.push("/onboarding/family/orgName");
        }
    }

    function goPrev() {
        Router.push('/onboarding');
    }

    function handleClose(isOpen) {
        setState({ ...state, open: isOpen });
    }

    return (
        <div className='flex flex-col flex-auto flex-shrink-0 items-center justify-center h-screen '>
            <div className="flex flex-col items-center justify-center max-w-400 min-w-256 bg-gray-200 rounded-lg min-h-480 max-h-640">
                <div className="flex mt-36">
                    <Typography
                        variant="h5"
                        component="h5"
                        className={classes.cardTitle}
                    >
                        Creating an organization on Ronday
                    </Typography>
                </div>
                <div className="flex mb-24">
                    <Typography
                        variant="h4"
                        component="h4"
                        className={classes.cardTitleBlack}
                    >
                        Step 2
                    </Typography>
                </div>
                <div className="flex mt-8 text-center">
                    <Typography
                        variant="h5"
                        component="h5"
                        className={classes.fontBold}
                    >
                        Choose your primary space style
                        <br></br>
                        (You can change it later.)
                    </Typography></div>
                <div className="flex flex-row flex-wrap m-12 items-center justify-center">
                    <div className="flex m-2">
                        <FamilyOrganization
                            title="Forest Campfire"
                            img="forest.png"
                            size = {_.find(socialSpaces, { displayName: "Forest Campfire" })?.maxCapacity}
                            org="org1"
                            focus={state.focus}
                            handleFocus={handleOrg}
                        />
                    </div>
                    <div className="flex m-2">
                        <FamilyOrganization
                            title="Ocean Lodge"
                            img="lodge.png"
                            size = {_.find(socialSpaces, { displayName: "Ocean Lodge" })?.maxCapacity}
                            org="org2"
                            focus={state.focus}
                            handleFocus={handleOrg}
                        />
                    </div>
                    <div className="flex m-2">
                        <FamilyOrganization
                            title="Party Condo"
                            img="party.png"
                            size = {_.find(socialSpaces, { displayName: "Party Condo" })?.maxCapacity}
                            org="org3"
                            focus={state.focus}
                            handleFocus={handleOrg}
                        />
                    </div>
                </div>
                <div className="flex m-12 self-end">
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={goPrev}
                        className={clsx(classes.button)}
                    >
                        Back
                    </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={goNext}
                        className={clsx(classes.button)}
                    >
                        Next
                    </Button>
                </div>
            </div>
            <MySnackbar
                open={state.open}
                handleClose={handleClose}
                title="Choose an answer to proceed."
            />
        </div>
    );
}

export default withAuthenticationRequired(OrgStyle);


