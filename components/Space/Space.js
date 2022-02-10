import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import {spaceTypeStageUrl} from "../../services/awsService/inviteId";


const useStyles = makeStyles({
    root: {
        minHeight: 320,
        minWidth: 372,
        borderWidth: 5,
        borderColor: 'transparent',
        margin: 0,

    },
    selected: {
        minHeight: 320,
        minWidth: 372,
        borderWidth: 5,
        borderColor: '#2196f3',
    },
    content: {
        display: 'flex',
        margin: '5px',
    },
    spaceSize: {
        color: '#a9afbb',
        padding: '0 10px'
    },
});


function ExpandableSpace(props) {
    const classes = useStyles();

    const handleClickOpen = () => {
        props.setAttribute({selectedIndex: props.index, space: props.item})
    };


    return (
        <>
            <Card className={(props.selectedIndex === props.index) ? clsx(classes.selected, 'w-full') : clsx(classes.root, 'w-full')}  onClick={() => handleClickOpen()} >
                <CardMedia
                    component="img"
                    alt={props.item.displayName}
                    height="140"
                    image={spaceTypeStageUrl + props.item.imageName}
                    title={props.item.displayName}
                />

                <CardContent>
                    <Typography variant="h6" component="h2">
                        {props.item.displayName}
                    </Typography>

                </CardContent>
                <CardActions className={classes.content}>
                    {/* <Typography gutterBottom variant="h5" component="h2"></Typography> */}
                    <span className={classes.spaceSize}>
                        Up to {props.item.maxCapacity} people
                    </span>
                    <span>
                        {props.item.conferenceRooms > 1 ? `${props.item.conferenceRooms} meeting rooms` : props.item.conferenceRooms === '1' ? `${props.item.conferenceRooms} meeting room` : ""}
                    </span>
                </CardActions>

            </Card>
        </>
    );
}

export default ExpandableSpace;