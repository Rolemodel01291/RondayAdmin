import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import {spaceTypeStageUrl} from '../../services/awsService/inviteId'

const useStyles = makeStyles({
    root: {
        maxWidth: 250,
        minHeight: 210,
        minWidth: 240,
        borderWidth: 5,
        borderColor: 'transparent',
    },
    selected: {
        maxWidth: 250,
        minHeight: 210,
        minWidth: 240,
        borderWidth: 5,
        borderColor: '#2196f3',
    },
    typography: {
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        fontWeight: '600',
    }
});

export default function Organization(props) {
    const classes = useStyles();

    function handle() {
        props.handleFocus(props.org);
    }


    return (
        <Card className={(props.org==='org'+ props.focus) ? clsx(classes.selected, 'w-full'): clsx(classes.root, 'w-full')} onClick={()=>handle()}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="60"
                    image={spaceTypeStageUrl + props.img}
                    title={props.title}

                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="h6" className={classes.typography}>
                        {props.title}
                    </Typography>
                </CardContent>
            </CardActionArea>

        </Card>
    );
}