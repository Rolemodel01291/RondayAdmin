import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import clsx from 'clsx';
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add';
import Router from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {getSpaces} from "../../pages/dashboard/spaces/store/spaceSlice";

const useStyles = makeStyles({
    root: {
        height: '100%',
        minHeight: 320,
        minWidth: 372,
        borderWidth: 5,
        borderColor: 'white',
        backgroundColor: 'rgba(37,174,141,0.08)',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex'
    },
    content: {
        display: 'flex',
        margin: '5px',
    },
    typography: {
        color: '#15886c',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    }
});

export default function AddSpace(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const addedSpaces = useSelector((state) => state.space.addedSpaces);
    const selectedOrganizationId = useSelector((state) => state.auth.selectedOrganizationId);
    const token = useSelector((state) => state.auth.token);

    useEffect(() => {
        dispatch(getSpaces({selectedOrganizationId, token}));
    }, [selectedOrganizationId])

    const handle = () => {
        Router.push('/dashboard/spaces/type');
    }

    return (
        <Card className={clsx(classes.root, 'w-full')}>
            <Button
                className={classes.typography}
                variant="outlined"
                onClick={handle}
                disabled={addedSpaces.length > 25 ? true : false}
            >
                <AddIcon />Add New Space
            </Button>
        </Card>
    );
}