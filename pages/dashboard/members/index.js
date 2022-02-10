import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Router, {useRouter} from "next/router";
import _ from 'lodash';

import Button from '@material-ui/core/Button';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {Popover} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

import Admin from '../../../layouts/Admin';
import ListHeader from '../../../components/MembersListHeader/MembersListHeader';
import ListItem from '../../../components/MembersListItem/MembersListItem';
import RondayLoading from "../../../components/RondayLoading/RondayLoading";
import {getMembers, getPendingMembers, getTotalCapacity} from './store/memberSlice';
import styles from "../../../assets/jss/ronday-material-dashboard/views/memberStyle";
import { inviteLink } from "../../../services/awsService/inviteId";

import {
    getUser,
    setPathForInvite,
    getInviteLink,
    reGenerateInviteLink
} from "../../../components/store/authSlice";
import MySnackbar from "../../../components/MySnackbar/MySnackbar";
import CapacitySnackbar from "../../../components/CapacitySnackbar/CapacitySnackbar";
import {useAuth0, withAuthenticationRequired} from "@auth0/auth0-react";



function Member() {
    const useStyles = makeStyles(styles);
    const classes = useStyles();
    const dispatch = useDispatch();
    const selectedOrganizationId = useSelector((state) => state.auth.selectedOrganizationId);
    const token = useSelector((state) => state.auth.token);
    const { asPath } = useRouter();
    const ShareableInviteLink = useSelector((state) => state.auth.ShareableInviteLink);
    let members, pendingMembers, totalCapacity = 0;

    const [state, setState] = useState({
        role: 'Active',
        pending: false,
        members: [],
        pendingMembers: [],
        length: 0,
        loading: true,
        open: false,
        title: "",
        capacitySnackbarOpen: false,
        anchorEl: null,
        popOpen: false,
        percent: 0,
    })

    const id = state.popOpen ? 'simple-popover' : undefined;

    const {
        logout
    } = useAuth0();



    useEffect(() => {
        dispatch(getUser({token})).then((res)=>{
            if (!res.payload) {
                localStorage.clear();
                logout();
            }
        })

        dispatch(reGenerateInviteLink({token, selectedOrganizationId: getGuid(selectedOrganizationId)})).then(()=>{
            dispatch(getInviteLink({token, selectedOrganizationId: getGuid(selectedOrganizationId)}));
        })

        if (selectedOrganizationId) {
            dispatch(getPendingMembers({selectedOrganizationId, token}))
                .then((pendingMemberRes) => {
                dispatch(getMembers({selectedOrganizationId, token}))
                    .then((memberRes) => {
                    dispatch(getTotalCapacity({selectedOrganizationId, token}))
                        .then((spaces) => {
                        if (spaces.payload.length > 0 && spaces.payload) {
                            spaces.payload.map((space, index) => {
                                totalCapacity += space.spaceType.maxCapacity;
                            })
                        }

                        members = memberRes.payload.users;
                        pendingMembers = pendingMemberRes.payload;
                        let totalLength = members.length + pendingMembers.length;
                        if (totalCapacity > 0 && (totalLength > totalCapacity * 0.7)) {
                            setState({
                                ...state,
                                members: memberRes.payload.users,
                                pendingMembers: pendingMemberRes.payload,
                                length: members.length + pendingMembers.length,
                                loading: false,
                                role: 'Active',
                                percent: '70%',
                                capacitySnackbarOpen: true,
                            });
                        }else if (totalCapacity > 0 && totalLength > totalCapacity * 0.8) {
                            setState({
                                ...state,
                                members: memberRes.payload.users,
                                pendingMembers: pendingMemberRes.payload,
                                length: members.length + pendingMembers.length,
                                loading: false,
                                role: 'Active',
                                percent: '80%',
                                capacitySnackbarOpen: true,
                            });
                        }else if (totalCapacity > 0 && totalLength > totalCapacity * 0.9) {
                            setState({
                                ...state,
                                members: memberRes.payload.users,
                                pendingMembers: pendingMemberRes.payload,
                                length: members.length + pendingMembers.length,
                                loading: false,
                                role: 'Active',
                                percent: '90%',
                                capacitySnackbarOpen: true,
                            });
                        } else {
                            setState({
                                ...state,
                                members:memberRes.payload.users,
                                pendingMembers:pendingMemberRes.payload,
                                length: members.length + pendingMembers.length,
                                loading: false,
                                role: 'Active'
                            });
                        }

                    })
                })
            })
        } else {
            Router.push("/onboarding");
        }
    }, [dispatch, selectedOrganizationId])

    const getGuid = (str) => {
        let lengths = [8,4,4,4,12];
        let parts = [];
        let range = 0;
        for (let i = 0; i < lengths.length; i++) {
            parts.push(str.slice(range,range+lengths[i]));
            range += lengths[i];
        };
        let GUID = parts.join('-');
        return GUID;
    }


    const handle = () => {
        if (!state.capacitySnackbarOpen) {
            dispatch(setPathForInvite(asPath));
            Router.push('/onboarding/clients/orgInvite');
        }
    }

    const handleRoleChange = (event) => {
        setState({ ...state, role: event.target.value});
    }

    const  copyToClipboard = (link) => {
        const temp = document.createElement('textarea');
        temp.value = link;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
    }

    const getSharableInviteLink = (event) => {
        let url = inviteLink + ShareableInviteLink;
        copyToClipboard(url);
        setState({ ...state, popOpen: true, anchorEl: event.currentTarget });
    }

    function handleClose(isOpen) {
        setState({ ...state, open: isOpen });
    }

    const handlePopClose = () => {
        setState({...state, anchorEl: null, popOpen: false});
    };

    function handleCapacitySnackbarClose(isOpen) {
        setState({ ...state, capacitySnackbarOpen: isOpen });
    }

    if (state.loading) {
        return <RondayLoading />;
    }


    return (
        <Admin>
            <div className={classes.headerbar}>
                <div className={classes.space}>
                    <span>
                        Members {state.role === 'Everyone' ?
                        state.members.length + state.pendingMembers.length : state.role=== 'Admins' ?
                        _.filter(state.members, ['isAdmin', true]).length : state.role === 'Active'?
                        _.filter(state.members, ['isDeactivated', false]).length : state.role === 'Deactivated'?
                        _.filter(state.members, ['isDeactivated', true]).length : state.pendingMembers.length
                    }
                    </span>
                    <span className={classes.selectArea}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <Select
                                labelId="demo-customized-select-label"
                                id="demo-customized-select"
                                fullWidth
                                value={state.role}
                                onChange={(event) => handleRoleChange(event)}
                            >
                                <MenuItem value="Everyone" className={classes.typography}>Everyone</MenuItem>
                                <MenuItem value="Active" className={classes.typography}>Active</MenuItem>
                                <MenuItem value="Admins" className={classes.typography}>Admins</MenuItem>
                                <MenuItem value="Deactivated" className={classes.typography}>Deactivated</MenuItem>
                                <MenuItem value="Pending Invites" className={classes.typography}>Pending Invites</MenuItem>
                            </Select>
                        </FormControl>
                    </span>
                </div>
                <div className={classes.action}>
                    <div>
                        <span aria-describedby={id}  className={classes.link}  onClick={getSharableInviteLink}>Copy invite link</span>
                        <Popover
                            id={id}
                            open={state.popOpen}
                            anchorEl={state.anchorEl}
                            onClose={handlePopClose}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                        >
                            <Typography className={classes.linkCopied}>Link Copied</Typography>
                        </Popover>
                    </div>

                    <span className={classes.inviteArea}>
                        <Button variant="outlined" color="primary" onClick={handle} className={classes.typography}>
                            Invite People
                        </Button>
                    </span>

                </div>
            </div>
            <div className={classes.content}>
                <div className="w-full">
                    <ListHeader />
                </div>
                {
                    state.role === 'Admins' &&
                    state.members.length > 0 &&
                    _.filter(state.members, ['isAdmin', true]).map((member, index) =>
                    <div key={index} className="w-full">
                            <ListItem
                                name={member.displayName}
                                email={member.emailAddress}
                                role={member.isAdmin ? "Admin" : "Member"}
                                parent={member}
                                color='#22292F'
                                index={index}
                            />
                    </div>
                )}
                {state.role === 'Active' &&
                state.members.length > 0 &&
                _.filter(state.members, ['isDeactivated', false]). map((member, index) =>
                    <div key={index} className="w-full">
                        <ListItem
                            name={member.displayName}
                            email={member.emailAddress}
                            role={member.isAdmin ? "Admin" : "Member"}
                            parent={member}
                            color='#22292F'
                            index={index}
                        />
                    </div>
                )}
                {state.role === 'Deactivated' &&
                state.members.length > 0 &&
                _.filter(state.members, ['isDeactivated', true]). map((member, index) =>
                    <div key={index} className="w-full">
                        <ListItem
                            name={member.displayName}
                            email={member.emailAddress}
                            role="Deactivated"
                            parent={member}
                            color='#BDBDBD'
                            index={index}
                        />
                    </div>
                )}
                {state.role === 'Everyone' &&
                state.members.length > 0 &&
                state.members.map((member, index) => (
                    member.isDeactivated === false ?
                        <div key={index} className="w-full">
                            <ListItem
                                name={member.displayName}
                                email={member.emailAddress}
                                role={member.isAdmin? "Admin": "Member"}
                                parent={member}
                                color='#22292F'
                                index={index}
                            />
                        </div> :
                        <div key={index} className="w-full">
                            <ListItem
                                name={member.displayName}
                                email={member.emailAddress}
                                role="Deactivated"
                                parent={member}
                                color='#BDBDBD'
                                index={index}
                            />
                        </div>
                ))}
                {(state.role === 'Everyone' || state.role === 'Pending Invites') &&
                  state.pendingMembers.length > 0 && state.pendingMembers?.map((member, index) => (
                    <div key={index} className="w-full">
                        <ListItem
                            name={`${member.emailAddress.slice(0, member.emailAddress.indexOf('@'))}(Pending Invite)`}
                            email={member.emailAddress}
                            role={member.isAdmin? "Admin": "Member"}
                            parent={member}
                            color='#BDBDBD'
                            index={index}
                        />
                    </div>
                ))}
            </div>
            <MySnackbar open={state.open} handleClose={handleClose} title={state.title}/>
            <CapacitySnackbar
                open={state.capacitySnackbarOpen}
                handleClose={handleCapacitySnackbarClose}
                title={`Total number of members in your organization is at ${state.percent} of the total capacity of all your spaces!`}
            />
        </Admin>
    );
}

export default withAuthenticationRequired(Member);



