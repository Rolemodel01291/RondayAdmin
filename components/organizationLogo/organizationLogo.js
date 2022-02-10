import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import clsx from 'clsx';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {spaceTypeStageUrl} from "../../services/awsService/inviteId";


const useStyles = makeStyles({
    root: {
        minHeight: 240,
        minWidth: 300,
        borderWidth: 5,
        borderColor: 'white',
        backgroundColor: '#E5E7EB',
        display: 'flex',
        flexDirection: 'column',
    },
    rootLogo: {
        minHeight: 372,
        minWidth: 300,
        borderWidth: 5,
        borderColor: 'white',
        backgroundColor: '#E5E7EB',
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        display: 'flex',
        margin: '5px',
    },
    image: {
        width: '50%',
        maxWidth: '128px',
        margin: '16px',
    },
    typography: {
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    }
});

export default function OrganizationLogo(props) {
    const classes = useStyles();

    return (
        <Card className={props.orgLogo? clsx(classes.rootLogo, 'w-full') : clsx(classes.root, 'w-full')}>
            <CardHeader
                className={classes.typography}
                title={props.title}
            />
            {props.orgLogo?
                <CardMedia
                    className={clsx(classes.image)}
                    component="img"
                    height="140"
                    image={props.orgLogo}
                /> :
                <></>
            }
            <CardContent>
                <Typography className={classes.typography}>
                    {props.content}
                </Typography>
                {props.items.map((child, index) => (
                    <Typography key={index} className={classes.typography}>
                        . {child}
                    </Typography>
                ))}
            </CardContent>

        </Card>
    );
}