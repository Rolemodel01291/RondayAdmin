import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router'
import clsx from 'clsx';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import Widget from '../../../../components/Widget/Widget';
import { setOrganizationSize } from '../store/clientSlice';
import MySnackbar from '../../../../components/MySnackbar/MySnackbar';

import styles from "../../../../assets/jss/ronday-material-dashboard/views/onboardStyle";
import {useAuth0, withAuthenticationRequired} from "@auth0/auth0-react";
import {getUser} from "../../../../components/store/authSlice";
import {getProfessionalSpaces, getSocialSpaces} from "../../../dashboard/spaces/store/spaceSlice";


function OrgSize() {
    const useStyles = makeStyles(styles);
    const classes = useStyles();
    const dispatch = useDispatch();
    const selectedOrgSize = useSelector((state) => state.client.selectedOrgSize);
    const token = useSelector((state) => state.auth.token);
    const professionalSpaces = useSelector((state) => state.space.professionalSpaces);
    const [state, setState] = useState({
        org: '',
        focus: null,
        number: '',
        open: false,
    })

    let spaceCount;

    const {
        logout
    } = useAuth0();

    useEffect(() => {
        setState({ ...state, org: selectedOrgSize.org, number: selectedOrgSize.number, focus: selectedOrgSize.focus });
    }, [selectedOrgSize])

    useEffect(() => {
        if (token) {
            dispatch(getUser({token})).then((res)=>{
                if (!res.payload) {
                    localStorage.clear();
                    logout();
                }
            })
        }
        dispatch(getProfessionalSpaces(token));
    }, [dispatch])

    function handleClick(organization, data) {
        organization === 'org1' ? setState({ ...state, org: organization, number: data, focus: 1 }) : organization === 'org2' ?
            setState({ ...state, org: organization, number: data, focus: 2 }) : organization === 'org3' ? setState({ ...state, org: organization, number: data, focus: 3 }) :
                setState({ ...state, org: organization, number: data, focus: 4 })
    }

    function validateNumber(e) {
        setState({ ...state, number: e.currentTarget.value });
    }

    function goPrev() {
        Router.push('/onboarding');
    }

    function goNext() {
        if (!state.org || state.number === "+80") {
            setState({ ...state, open: true });
        } else {
            if (state.org === 'org4') {
                if (state.number > 81 && state.number <= 160) {
                    spaceCount = 2;
                } else {
                    spaceCount = 3;
                }
            }
            dispatch(setOrganizationSize({ org: state.org, number: state.number, focus: state.focus, spaceCount }));
            Router.push("/onboarding/clients/orgStyle");
        }

    }

    function handleClose(isOpen) {
        setState({ ...state, open: isOpen });
    }



    return (
        <div className="flex items-center justify-center h-screen ">
            <div className="flex flex-col items-center justify-center max-w-400 min-w-256 min-h-256 bg-gray-200 rounded-lg min-h-480 max-h-480">
                <div className="flex mt-36">
                    <Typography variant="h5" component="h5" className={classes.cardTitle}>
                        Creating an organization on Ronday
                    </Typography>
                </div>
                <div className="flex mb-24">
                    <Typography variant="h4" component="h4" className={classes.cardTitleBlack}>
                        Step 2
                    </Typography>
                </div>
                <div className="flex mt-8">
                    <Typography variant="h5" component="h1" className={classes.fontBold} >
                        What’s the size of your organization?
                    </Typography></div>
                <div className="flex flex-wrap m-12 items-center justify-center">
                    <div className="flex widget p-4 min-w-128">
                        <Widget
                            widget={{
                                title: "Small",
                                data: professionalSpaces?.find(x => x.displayName.includes('Small') && x.displayName.includes('Modern'))?.maxCapacity,
                                org: "org1"
                            }}
                            focus={state.focus}
                            handleFocus={handleClick}
                        />
                    </div>
                    <div className="flex widget p-4 min-w-128">
                        <Widget widget={{
                            title: "Medium",
                            data: professionalSpaces?.find(x => x.displayName.includes('Medium') && x.displayName.includes('Modern'))?.maxCapacity,
                            org: "org2"
                        }}
                                focus={state.focus}
                                handleFocus={handleClick}
                        />
                    </div>
                    <div className="flex widget p-4 min-w-128">
                        <Widget
                            widget={{
                                title: "Large",
                                data: professionalSpaces?.find(x => x.displayName.includes('Large') && x.displayName.includes('Modern'))?.maxCapacity,
                                org: "org3"
                            }}
                            focus={state.focus}
                            handleFocus={handleClick}
                        />
                    </div>
                    <div className="flex widget p-4 min-w-128 ">
                        <Widget widget={{
                            title: "XLarge",
                            data: '+'+professionalSpaces?.find(x => x.displayName.includes('Large') && x.displayName.includes('Modern'))?.maxCapacity,
                            org: "org4"
                        }}
                                focus={state.focus}
                                handleFocus={handleClick}
                        />
                    </div>
                    {state.org === "org4" ? (<div className="flex min-w-256 my-2 items-center justify-center mx-auto">
                        <TextField id="outlined-search" label="How many?" type="number" variant="outlined" value={state.number}
                            onChange={validateNumber}
                            onBlur={(e) => {
                                e.currentTarget.value > 81 ? setState({ ...state, number: e.currentTarget.value }) : setState({ ...state, number: 81 })
                            }}
                            InputProps={{
                                inputProps: {
                                    min: 81
                                }

                            }} className={clsx(classes.textField)} />
                    </div>) : <></>
                    }
                </div>
                <div className="flex m-6 self-end">
                    <Button variant="outlined" color="primary" onClick={goPrev} className={clsx(classes.button)}>Back</Button>
                    <Button variant="outlined" color="primary" onClick={goNext} className={clsx(classes.button)}>Next</Button>
                </div>
                <MySnackbar open={state.open} handleClose={handleClose} title="Choose an answer to proceed." />
            </div>
        </div>
    );
}

export default withAuthenticationRequired(OrgSize);


