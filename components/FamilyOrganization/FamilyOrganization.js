import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import {spaceTypeStageUrl} from '../../services/awsService/inviteId'

const useStyles = makeStyles({
    root: {
        maxWidth: 150,
        minHeight: 160,
        minWidth: 140,
        borderWidth: 5,
        borderColor: 'transparent',
    },
    selected: {
        maxWidth: 150,
        minHeight: 160,
        minWidth: 140,
        borderWidth: 5,
        borderColor: '#2196f3',
    },
    title: {
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", ' +
            'Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        fontSize: 14
    },
    size: {
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, ' +
            'Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        fontSize: 12
    }
});

export default function FamilyOrganization(props) {
    const classes = useStyles();


    function handle() {
        props.handleFocus(props.org);
    }



    return (
        <>
            <Card
                className={(props.org==='org'+ props.focus) ?
                    clsx(classes.selected, 'w-full'): clsx(classes.root, 'w-full')}
                onClick={()=>handle()}
            >
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image={spaceTypeStageUrl + props.img}
                        title={props.title}
                    />
                    <CardContent>
                        <Typography gutterBottom className={clsx(classes.title)}>
                            {props.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p" className={clsx(classes.size)}>
                            Up to {props.size} People
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            
        </>
    );
}