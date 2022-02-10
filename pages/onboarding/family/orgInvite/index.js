import React, {useState, useCallback, useEffect} from 'react';
import { useForm } from '../../../../@ronday/hooks';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import Router from 'next/router';
import _ from 'lodash';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CircularProgress from "@material-ui/core/CircularProgress";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

import CardAddChecklistItem from '../../../../components/CardAddChecklistItem/CardAddChecklistItem';
import CardChecklistItem from '../../../../components/CardChecklistItem/CardChecklistItem';
import MySnackbar from '../../../../components/MySnackbar/MySnackbar';
import {getOrganizations, sendInvite} from "../../../../components/store/authSlice";
import {withAuthenticationRequired} from "@auth0/auth0-react";


const useStyles = makeStyles({  
    link: {
        fontSize: 16,
        color: 'blue'
    },
    inviteLink: {
        fontSize: 18
    },
    button: {
        margin: 5
    }
});

function OrgInvite() {
    const classes = useStyles();
    const selectedOrgName = useSelector((state) => state.family.selectedOrgName);
    const organizationId = useSelector((state) => state.client.organizationId);
    const token = useSelector((state) => state.auth.token);
    const [state, setState] = useState({
        // checkItems: [],
        open: false,
        loading: false,
        isInviteSent: false,
        title: "",
    });

    const { form, setInForm } = useForm({
        checkItems: [],
        name: "Checklist",
    });

    useEffect(() => {
        dispatch(getOrganizations(token));
        setInForm('checkItems', selectedCheckItems);
    }, [dispatch])

    const handleListItemChange = useCallback(
		(item, _index) => {
			setInForm(`checkItems[${_index}]`, item);
		},
		[setInForm]
	);


    function handleListItemRemove(id) {
        setInForm('checkItems', _.reject(form.checkItems, { id}));
    }


    function handleListItemAdd(item) {
        setInForm('checkItems', [...form.checkItems, item]);
    }

    if (!form) {
		return null;
	}

    function goNext() {
        const nameArray = _.map(form.checkItems, 'name');
        if (nameArray.length > 0) {
            setState({...state, loading: true, isInviteSent: true});
            dispatch(sendInvite({emails: nameArray, selectedOrganizationId, token})).then(() => {
                setState({...state, loading: false, isInviteSent: true});
                setTimeout(() =>  {
                    Router.push("/onboarding/clients/orgResult")
                }, 2000);
            })
        } else {
            setState({...state, open: true})
        }
    }


    function goPrev() {
        Router.back();
    }

    function handleClose(isOpen) {
        setState({ ...state, open: isOpen });
    }

    return (

        <div className='flex flex-col flex-auto items-center justify-center h-screen'>
            <div className="flex flex-col items-center justify-center max-w-640 min-w-250 bg-gray-200 rounded-lg min-h-480 max-h-640">
                <div className="flex m-8">
                    <Typography variant="h5" component="h1" className="text-black text-center">
                        Invite People to {selectedOrgName}
                    </Typography>
                </div>
                <Divider className="w-3/4 m-24" />
                <div className="flex flex-col w-full mx-24 mt-8 items-center justify-center">
                    <div className="flex justify-between">
                        <div className="flex w-1/2">
                            <Typography className={clsx(classes.inviteLink, 'mx-8 text-16 text-black text-center')}>
                                Invite by email
                            </Typography>
                        </div>
                        <div className="flex w-1/2">
                            <Typography className={clsx(classes.link, 'mx-16 cursor-pointer text-center')}>
                                Copy invite link
                            </Typography>
                        </div>

                    </div>
                    <div className="flex w-full justify-center px-32">
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
                    <Button variant="outlined" color="primary" onClick={goNext} className={clsx(classes.button)} disabled={state.loading}>
                        {state.loading && <CircularProgress size={14} />}
                        {!state.loading && !state.isInviteSent && 'Send Invite'}
                        {!state.loading && state.isInviteSent && 'Invite Sent' && <LibraryAddCheckIcon/>}
                    </Button>
                </div>
                <MySnackbar open={state.open} handleClose={handleClose} title="Choose an answer to proceed." />
            </div>
        </div>
    );
}


export default withAuthenticationRequired(OrgInvite);


