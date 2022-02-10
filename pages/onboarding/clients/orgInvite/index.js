import React, { useState, useCallback, useEffect } from 'react';
import { useForm } from '../../../../@ronday/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router'
import Router from 'next/router';
import clsx from 'clsx';
import _ from 'lodash';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import {Popover} from "@material-ui/core";

import CardAddChecklistItem from '../../../../components/CardAddChecklistItem/CardAddChecklistItem';
import CardChecklistItem from '../../../../components/CardChecklistItem/CardChecklistItem';
import MySnackbar from '../../../../components/MySnackbar/MySnackbar';
import { updateItem, addNewCheckItem, removeItem } from '../store/clientSlice';
import {
    getOrganizations, getUser,
    sendInvite,
    setIsCreateInvite,
    getInviteLink, reGenerateInviteLink
} from '../../../../components/store/authSlice';
import {inviteLink} from '../../../../services/awsService/inviteId'

import styles from "../../../../assets/jss/ronday-material-dashboard/views/onboardStyle";
import {useAuth0, withAuthenticationRequired} from "@auth0/auth0-react";


function OrgInvite() {
    const useStyles = makeStyles(styles);
    const classes = useStyles();
    const dispatch = useDispatch();
    const { asPath } = useRouter();
    const organizations = useSelector((state) => state.auth.organizations);
    const selectedCheckItems = useSelector((state) => state.client.selectedCheckItems);
    const selectedOrganizationId = useSelector((state) => state.auth.selectedOrganizationId);
    const token = useSelector((state) => state.auth.token);
    const path = useSelector((state) => state.auth.path);
    const backPath = useSelector((state) => state.auth.backPath);
    const ShareableInviteLink = useSelector((state) => state.auth.ShareableInviteLink);
    const [state, setState] = useState({
        // checkItems: [],
        open: false,
        loading: false,
        isInviteSent: false,
        title: "",
        anchorEl: null,
        popOpen: false,
    });

    const {
        logout
    } = useAuth0();

    const id = state.popOpen ? 'simple-popover' : undefined;

    const { form, setInForm } = useForm({
        checkItems: [],
        name: "Checklist",
    });

    useEffect(() => {
        dispatch(getOrganizations(token));
        // setInForm('checkItems', selectedCheckItems);
    }, [organizations])

    useEffect(() => {
        if (token) {
            dispatch(getUser({token})).then((res)=>{
                if (!res.payload) {
                    localStorage.clear();
                    logout();
                }
            })
        }
        dispatch(reGenerateInviteLink({token, selectedOrganizationId: getGuid(selectedOrganizationId)})).then(()=>{
            dispatch(getInviteLink({token, selectedOrganizationId: getGuid(selectedOrganizationId)}));
        })
    }, [dispatch])

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


    const handleListItemChange = useCallback(
        (item, _index) => {
            dispatch(updateItem(item, _index));
            setInForm(`checkItems[${_index}]`, item);
        },
        [setInForm]
    );


    function handleListItemRemove(id) {car
        dispatch(removeItem(id));
        setInForm('checkItems', _.reject(form.checkItems, { id }));
    }


    function handleListItemAdd(item) {
        setInForm('checkItems', [...form.checkItems, item]);
        dispatch(addNewCheckItem(item));
    }

    const  copyToClipboard = (link) => {
        const temp = document.createElement('textarea');
        temp.value = link;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
    }

    function getShareableLink(event) {
         let url = inviteLink + ShareableInviteLink;
         copyToClipboard(url);
         setState({ ...state, popOpen: true, anchorEl: event.currentTarget });
    }

    const handlePopClose = () => {
        setState({...state, anchorEl: null, popOpen: false});
    };

    if (!form) {
        return null;
    }


    function goNext() {
        const nameArray = _.map(form.checkItems, 'name');
        if (nameArray.length > 0) {
            setState({...state, loading: true, isInviteSent: true});
            dispatch(setIsCreateInvite(true));
            dispatch(sendInvite({emails: nameArray, selectedOrganizationId, token})).then(() => {
                setState({...state, loading: false, isInviteSent: true});
                setTimeout(() =>  {
                    if (path === '/onboarding/clients/orgResult') {
                        Router.push("/onboarding/clients/orgResult")
                    } else if (path === "/onboarding/family/orgResult") {
                        Router.push("/onboarding/family/orgResult")
                    } else {
                        Router.replace('/dashboard/members');
                    }

                }, 2000);
            })
        } else {
            setState({...state, open: true, title: "Choose an answer to proceed."})
        }
    }


    function goPrev() {
        if (path === '/onboarding/clients/orgResult') {
            Router.replace('/onboarding/clients/orgResult');
        } else if (path === '/onboarding/family/orgResult') {
            Router.replace('/onboarding/family/orgResult');
        } else {
            Router.replace('/dashboard/members');
        }
    }

    function handleClose(isOpen) {
        setState({ ...state, open: isOpen });
    }

    return (

        <div className='flex flex-col flex-auto items-center justify-center h-screen'>
            <div className="flex flex-col items-center justify-center max-w-640 min-w-250 bg-gray-200 rounded-lg min-h-480 max-h-640">
                <div className="flex mt-24 mb-4 text-center">
                    <Typography variant="h5" component="h1" className={classes.cardTitleBlack}>
                        Invite People to <br></br>
                        <span className={classes.fontBold}>{organizations?.find(organization => organization.organizationId === selectedOrganizationId)?.displayName}</span>
                    </Typography>
                </div>
                <Divider className="w-3/4" />
                <div className="flex flex-col w-full mx-24 mt-8 items-center justify-center">
                    <div className="flex justify-between w-3/4">
                        <div className="flex mx-4">
                            <Typography className={classes.cardTitleBlack}>
                                Invite by email
                            </Typography>
                        </div>
                        <div className="flex mx-4">
                            <div>
                                <Typography className={classes.infoText} onClick={getShareableLink}>
                                    Copy invite link
                                </Typography>
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
                                    <Typography className={classes.copyLink}>Link Copied</Typography>
                                </Popover>
                            </div>
                        </div>

                    </div>
                    <div className="flex w-full justify-center px-24">
                        <List className="w-full">
                            {form.checkItems && form.checkItems.map((checkItem, _index) => (
                                <CardChecklistItem
                                    item={checkItem}
                                    key={checkItem.id}
                                    index={_index}
                                    onListItemChange={handleListItemChange}
                                    onListItemRemove={() => handleListItemRemove(checkItem.id)}
                                />
                            ))}
                            <CardAddChecklistItem onListItemAdd={item => handleListItemAdd(item)} />
                        </List>
                    </div>
                </div>
                <div className="flex m-8 self-end">
                    <Button variant="outlined" color="primary" onClick={goPrev} className={clsx(classes.button)}>Back</Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={goNext}
                        className={clsx(classes.button)}
                        disabled={_.map(form.checkItems, 'name').length > 0? false : true}
                    >
                        {state.loading && <CircularProgress size={14} />}
                        {!state.loading && !state.isInviteSent && 'Send Invite'}
                        {!state.loading && state.isInviteSent && 'Invite Sent' && <LibraryAddCheckIcon/>}
                    </Button>
                </div>
                <MySnackbar open={state.open} handleClose={handleClose} title={state.title}/>
            </div>
        </div>

    );
}

export default withAuthenticationRequired(OrgInvite);


