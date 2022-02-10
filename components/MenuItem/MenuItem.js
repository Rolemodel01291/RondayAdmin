import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import clsx from 'clsx';
import Router from 'next/router'
import Typography from '@material-ui/core/Typography';
import  download  from '../../@ronday/download';
import {useDispatch, useSelector} from "react-redux";
import {addSpace} from "../../pages/dashboard/spaces/store/spaceSlice";

const useStyles = makeStyles({
    root: {
        maxWidth: 180,
        minHeight: 105,
        minWidth: 80,
        border: '2px solid lightgray',
        background: 'transparent',
    },
    menu1: {
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,' +
            ' Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        fontSize: 16,
        textAlign: 'center'
    },
    menu2: {
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI",' +
            ' Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '600',
    },
    media: {
        justifyContent: 'center',
        width: '20%',
        marginLeft: '40%',
        marginTop: '10px',
    }
});

export default function MenuItem(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selectedOrganizationId = useSelector((state) => state.auth.selectedOrganizationId);
    const selectedOrgSize = useSelector((state) => state.client.selectedOrgSize);
    const isCreateInvite = useSelector((state) => state.auth.isCreateInvite);
    const token = useSelector((state) => state.auth.token);

    function handle() {
        if (props.menu === "menu1") {
            download();
        }  else {
            if (!isCreateInvite) {
                let conferenceRooms = {};
                if (selectedOrgSize.org === 'org4') {
                    for (let i = 1; i < selectedOrgSize.spaceCount + 1; i++){
                        dispatch(addSpace({ DisplayName: props.displayName+i, SpaceTypeId: props.spaceTypeId, selectedOrganizationId, token, conferenceRooms}));
                    }
                } else {
                    dispatch(addSpace({ DisplayName: props.displayName, SpaceTypeId: props.spaceTypeId, selectedOrganizationId, token, conferenceRooms}));
                }
            }
            Router.push('/dashboard/spaces');
        }
    }


    return (
        <Card className={clsx(classes.root)} onClick={()=>handle()}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="30"
                    image={props.img}
                    className={classes.media}
                />
                <CardContent>
                    {props.menu === 'menu1'?
                        <Typography className={clsx(classes.menu1)}>
                            {props.title}
                        </Typography> :
                        <Typography className={clsx(classes.menu2)}>
                            {props.title}
                        </Typography>
                    }
                </CardContent>
            </CardActionArea>

        </Card>
    );
}