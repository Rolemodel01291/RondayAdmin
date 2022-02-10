import React, { useEffect, useState } from "react";
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import {makeStyles, withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import { Typography } from "@material-ui/core";

import Admin from '../../../layouts/Admin';
import OrganizationLogo from '../../../components/organizationLogo/organizationLogo';
import styles from "../../../assets/jss/ronday-material-dashboard/views/settingStyle";
import EmailDialog from "../../../components/EmailDialog/EmailDialog";
import clsx from "clsx";
import {useAuth0, withAuthenticationRequired} from "@auth0/auth0-react";
import {updateOrganization, getUser} from "../../../components/store/authSlice";
import restrictedDomains from "../../../services/awsService/restrictedDomains";

const StyledTextField = withStyles({
    root: {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderRadius: '0',
            },
        },
    },
})(TextField);

function Setting() {
    const useStyles = makeStyles(styles);
    const classes = useStyles();
    const dispatch = useDispatch();
    const authentication = useSelector((state) => state.auth.authentication);
    const selectedOrganizationId = useSelector((state) => state.auth.selectedOrganizationId);
    const organizations = useSelector((state) => state.auth.organizations);
    const token = useSelector((state) => state.auth.token);

    const children1 = [
        "At least 256 x 256 px",
        "Transparent background",
        "In color"
    ]

    const children2 = [
        "At least 512 x 128 px",
        "In color",
    ]

    const children3 = [
        "At least 256 x 256 px",
        "Transparent background",
        "All in white color"
    ]

    let email = authentication.email;

    const [state, setState] = useState({
        role: 'Everyone',
        open: false,
        orgName: "",
        isDisabled: true,
        checked: false,
    })

    const {
        logout
    } = useAuth0();

    useEffect(() => {
        setState({ ...state, orgName: organizations?.find(x => x.organizationId === selectedOrganizationId)?.displayName });
    }, [dispatch, selectedOrganizationId])

    useEffect(() => {
        dispatch(getUser({token})).then((res)=>{
            if (!res.payload) {
                localStorage.clear();
                logout();
            }
        })
        if (!selectedOrganizationId) {
            Router.push("/onboarding");
        }
    }, [dispatch])

    const handleDelete = () => {
        setState({ ...state, open: true});
    }

    const handleChange = (e) => {
        if (organizations?.find(x => x.organizationId === selectedOrganizationId)?.displayName === e.target.value) {
            setState({...state, orgName: e.target.value, isDisabled: true });
        } else {
            setState({...state, orgName: e.target.value, isDisabled: false });
        }

    }

    const handleCheckChange = (e) => {
        if (state.checked) {
            setState({...state, checked: e.target.checked, isDisabled: true});
        } else {
            setState({...state, checked: e.target.checked, isDisabled: false});
        }

    }

    const handleSave = () => {
        state.checked ?
            dispatch(updateOrganization({displayName: state.orgName, isAutoEnrolled: true, domain: email.substr(email.indexOf('@'), email.length),selectedOrganizationId, token}))
            :  dispatch(updateOrganization({displayName: state.orgName, isAutoEnrolled: false, domain: null, selectedOrganizationId, token}))
        Router.replace("/dashboard/settings");
    }

    const handleCancel = () => {
        setState({...state, orgName: organizations?.find(x => x.organizationId === selectedOrganizationId)?.displayName, isDisabled: true})
    }

    const handleClose = (value) => {
        setState({ ...state, open: value });
    }


    return (
        <Admin>
            <div className={classes.headerbar}>
                <div className={classes.space}>
                    <Typography variant="h4" className={classes.typography}>Organization Settings</Typography>
                </div>
            </div>
            <div className={classes.content}>
                <div className={classes.contentTop}>
                    <div className={classes.contentTopName}>
                        <Typography variant="h5" className={classes.typography}>Organization Name</Typography>
                    </div>
                    <div className={classes.contentTextfield}>
                        <StyledTextField
                            id="outlined-full-width"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            className={classes.typography}
                            onChange={handleChange}
                            value={state.orgName}
                            variant="outlined"
                        />
                        {restrictedDomains.includes(email.substr(email.indexOf('@') + 1, email.length)) ? <></> :
                            <FormControl>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="remember"
                                            checked={state.checked}
                                            onChange={handleCheckChange}
                                        />
                                    }
                                    label={`Let anyone with an ${email.substr(email.indexOf('@'), email.length)} email join to this organization.`}
                                    className={classes.typography}

                                />
                            </FormControl>
                        }
                    </div>
                </div>
                <div className={classes.contentActionField}>
                    <Divider className={classes.divider} />
                    <div className={classes.contentButtonGroup}>
                        <Button variant="outlined" onClick={handleCancel} className={classes.btnMargin} disabled={state.isDisabled}>
                            Cancel
                        </Button>
                        <Button variant="contained" onClick={handleSave} className={classes.btnSaveMargin} disabled={state.isDisabled}>
                            Save
                        </Button>
                    </div>
                    <Divider className={classes.divider} />
                </div>

                <div className={classes.contentMiddle}>
                    <Typography variant="h5" className={classes.typography}>Organization Logo</Typography>
                    <Typography className={classes.logoMargin}>To display your logo in your space you‘ll need to send 3 versions of your logo to <span className={classes.fontBlue}>org-logos@rondayapp.com</span></Typography>
                    <div className={classes.logoField}>
                        <div className={classes.card}>
                            <OrganizationLogo
                                title="1 Square"
                                content="A square version of the logo"
                                items={children1}
                                orgLogo={organizations?.find(x => x.organizationId === selectedOrganizationId)?.logoUrl}
                            />
                        </div>
                        <div className={classes.card}>
                            <OrganizationLogo
                                title="2 Horizontal"
                                content="Rectangular/banner-like version of the logo"
                                items={children2}
                                orgLogo={organizations?.find(x => x.organizationId === selectedOrganizationId)?.logoOutlineUrl}
                            />
                        </div>
                        <div className={classes.card}>
                            <OrganizationLogo
                                title="3 White Silhouette"
                                content="An all white silhouette version of the logo"
                                items={children3}
                                orgLogo={organizations?.find(x => x.organizationId === selectedOrganizationId)?.titleCardUrl}
                            />
                        </div>
                    </div>
                    <Divider className={classes.divider} />            
                </div>
                <div className={classes.contentBottom}>
                    <div className={clsx(classes.btnMargin, "flex flex-auto items-start justify-start")}>
                        <Button variant="contained" color="secondary" onClick={handleDelete} className={classes.typography}>
                            Delete Organization
                        </Button>
                    </div>
                </div>              
            </div>
            <EmailDialog open={state.open} handleClose={handleClose} />
        </Admin>
    );
}

export default withAuthenticationRequired(Setting);

