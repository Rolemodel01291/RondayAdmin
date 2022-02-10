import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';

import Button from '@material-ui/core/Button';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { setOrganizationName } from '../store/clientSlice';
import {createOrganization, getUser, setIsCreateInvite} from '../../../../components/store/authSlice';
import MySnackbar from '../../../../components/MySnackbar/MySnackbar';
import restrictedDomains from '../../../../services/awsService/restrictedDomains';
import styles from "../../../../assets/jss/ronday-material-dashboard/views/onboardStyle";
import {useAuth0, withAuthenticationRequired} from "@auth0/auth0-react";


const StyledTextField = withStyles({
    root: {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderRadius: '0',
            },
        },
    },
})(TextField);

function OrgName() {
    const useStyles = makeStyles(styles);
    const classes = useStyles();
    const dispatch = useDispatch();
    const selectedOrgName = useSelector((state) => state.client.selectedOrgName);
    const authentication = useSelector((state) => state.auth.authentication);
    const token = useSelector((state) => state.auth.token);
    const [state, setState] = useState({
        name: "",
        open: false,
        checked: false,
    })

    const {
        logout
    } = useAuth0();

    let email = authentication.email;


    useEffect(() => {
        if (token) {
            dispatch(getUser({token})).then((res)=>{
                if (!res.payload) {
                    localStorage.clear();
                    logout();
                }
            })
        }
    }, [dispatch])

    function handleChange(e) {
        setState({ ...state, name: e.currentTarget.value });
    }

    function handleStatusChange(e) {
        setState({ ...state, checked: e.target.checked });
    }

    function goNext() {
        dispatch(setOrganizationName(state.name));
        dispatch(setIsCreateInvite(false));
        if (state.name === "") {
            setState({ ...state, open: true });
        } else {
            state.checked ?
            dispatch(createOrganization({displayName: state.name, isAutoEnrolled: true, domain: email.substr(email.indexOf('@'), email.length), token}))
                :  dispatch(createOrganization({displayName: state.name, isAutoEnrolled: false, domain: null, token}))
            Router.push("/onboarding/clients/orgResult");
        }
    }

    function goPrev() {
        Router.push('/onboarding/clients/orgStyle');
    }

    //Snackbar close state
    function handleClose(isOpen) {
        setState({ ...state, open: isOpen });
    }

    return (
        <div className='flex flex-col flex-auto flex-shrink-0 items-center justify-center h-screen '>
            <div className="flex flex-col items-center justify-center max-w-640 min-w-250 bg-gray-200 rounded-lg min-h-256 max-h-480">
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
                        Step 4
                    </Typography>
                </div>
                <div className="flex mt-8 mx-16">
                    <Typography
                        variant="h5"
                        component="h5"
                        className={classes.fontBold}
                    >
                        What do you want to call your organization?
                    </Typography>
                </div>
                <div className="flex flex-col w-full mx-16 items-center justify-center">
                    <div className="flex w-full px-16">
                        <StyledTextField
                            id="outlined-full-width"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={handleChange}
                            value={state.name}
                            variant="outlined"
                        />
                    </div>
                    {restrictedDomains.includes(email.substr(email.indexOf('@') + 1, email.length)) ?   <></> :
                        <div className="flex w-full px-16">
                            <FormControl>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="remember"
                                            checked={state.checked}
                                            onChange={handleStatusChange}
                                        />
                                    }
                                    label={`Let anyone with an ${email.substr(email.indexOf('@'), email.length)} email join this organization.`}
                                    className={classes.emailTypography}

                                />
                            </FormControl>
                        </div>
                    }
                </div>
                <div className="flex m-16 mb-24 self-end">
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
                        Create Organization
                    </Button>
                </div>
            </div>
            <MySnackbar open={state.open} handleClose={handleClose} title="Choose an answer to proceed." />
        </div>

    );
}

export default withAuthenticationRequired(OrgName);

