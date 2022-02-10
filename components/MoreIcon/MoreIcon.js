import React, { useState, useEffect } from 'react';
import { IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Typography from '@material-ui/core/Typography';
import Divider from "@material-ui/core/Divider";
import {makeStyles} from "@material-ui/core/styles";
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import MemberDialog from '../MemberDialog/MemberDialog';
import {sendInvite} from "../store/authSlice";


const useStyles = makeStyles({
    fontBold: {
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, ' +
            'Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        fontWeight: 'bold'
    },
    content: {
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, ' +
            'Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        justifyContent: 'center'
    },
    typography: {
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, ' +
            'Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    }
});

const MoreIcon = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selectedOrganizationId = useSelector((state) => state.auth.selectedOrganizationId);
    const token = useSelector((state) => state.auth.token);
    const currentTime = moment().format('MMMM DD YYYY, h:mm:ss a');
    const invitedTime = moment(props.parent.sentAt).format('MMMM DD YYYY, h:mm:ss a');


    const [state, setState] = useState({
        anchorEl: null,
        openDialog: false,
        name: '',
        cancel: '',
        save: '',
        index: ''
    })

    const ActivatedMemberOptions = [
        "Deactivate",
        "Make Admin",
    ];

    const DeActivatedMemberOptions = [
        "Activate",
        "Make Admin",
    ];

    const InviteOptions = [
        "Resend Invite",
        "Cancel Invite"
    ];

    const handleClick = (event) => {
        setState({...state, anchorEl: event.currentTarget});
    };

    const open = Boolean(state.anchorEl);

    const handleClose = () => {
        setState({...state, anchorEl: null});
    };

    const handle = (index, value) => {
        if (value === 'Deactivate') {
            setState({
                ...state,
                anchorEl: null,
                openDialog: true,
                name: [<Typography className={classes.fontBold}
                             key={index}>Deactivate {props.parent.displayName}?</Typography>, "The member will no longer be able to sign in to the organization."],
                cancel: 'Keep User',
                save: 'Deactivate Member',
                index
            });
        }else if (value === 'Activate') {
            setState({
                ...state,
                anchorEl: null,
                openDialog: true,
                name: [<Typography className={classes.fontBold}
                             key={index}>Reactivate {props.parent.displayName}?</Typography>, "The member will be able to sign in to the organization again."],
                cancel: 'Keep User',
                save: 'Reactivate Member',
                index
            });
        } else if (value === 'Make Admin') {
            setState({...state, 
                anchorEl: null,
                openDialog: true, 
                name: ["Are you sure you want to make ", <span className={classes.fontBold} key={index}> {props.parent.displayName}</span>, " an admin to your organization?"],
                cancel: 'Cancel', 
                save: 'Make Admin',
                index
            });
        }
    };

    const handleInvite = (index, value) => {
        if (value === 'Resend Invite') {
            if (moment(currentTime).diff(moment(invitedTime), 'hours') > 24) {
                const nameArray = [props.parent.emailAddress];
                dispatch(sendInvite({emails: nameArray, selectedOrganizationId, token})).then(() => {
                    setState({...state,
                        anchorEl: null,
                        openDialog: true,
                        name: ["New Invite has been sent!"],
                        cancel: '',
                        save: 'Got it',
                        index
                    });
                })
            } else {
                setState({...state,
                    anchorEl: null,
                    openDialog: true,
                    name: ["You already have resent invite. You can resend it again after 24 hours."],
                    cancel: '',
                    save: 'Got it',
                    index
                });
            }
        } else if (value === 'Cancel Invite') {
            setState({...state,
                anchorEl: null,
                openDialog: true,
                name: ["Are you sure you want to cancel invite?"],
                cancel: 'Keep Invite',
                save: 'Cancel Invite',
                index
            });
        }
    }

    const handleDialogClose = () => {
        setState({...state, openDialog: false});
    }


    return (
        <>
            <IconButton
                aria-label="more"
                onClick={handleClick}
                aria-haspopup="true"
                aria-controls="long-menu"
            >
                <MoreVertIcon />
            </IconButton>
            {(!props.parent.displayName)?
                (<Menu
                    anchorEl={state.anchorEl}
                    keepMounted onClose={handleClose}
                    open={open}>
                    <MenuItem className={classes.typography}>
                        {invitedTime}
                    </MenuItem>
                    <Divider light />
                    {InviteOptions.map((option, index) => (
                        <>
                            <MenuItem
                                className={classes.content}
                                key={index}
                                onClick={()=>handleInvite(props.index, option)}>
                                {option}
                            </MenuItem>
                        </>

                    ))}
                </Menu>) : (props.parent.isDeactivated === false)?
                (<Menu
                    anchorEl={state.anchorEl}
                    keepMounted onClose={handleClose}
                    open={open}>
                    {ActivatedMemberOptions.map((option, index) => (
                        <>
                            <MenuItem
                                className={classes.typography}
                                key={index}
                                onClick={()=>handle(props.index, option)}>
                                {option}
                            </MenuItem>
                        </>
                    ))}
                </Menu>) :
                (<Menu
                    anchorEl={state.anchorEl}
                    keepMounted onClose={handleClose}
                    open={open}>
                    {DeActivatedMemberOptions.map((option, index) => (
                        <>
                            <MenuItem
                                className={classes.typography}
                                key={index}
                                onClick={()=>handle(props.index, option)}>
                                {option}
                            </MenuItem>
                        </>
                    ))}
                </Menu>)
            }
            <MemberDialog 
                key={state.index}
                open={state.openDialog} 
                handleClose={handleDialogClose} 
                name={state.name}
                cancel={state.cancel}
                save={state.save} 
                index={state.index}
                parent={props.parent}
            />
        </>
    );
};

export default MoreIcon;