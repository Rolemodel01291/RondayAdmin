import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import ConferenceRoomDialog from '../ConferenceRoomDialog/ConferenceRoomDialog';
import {conferenceRoomStageUrl} from '../../services/awsService/inviteId';

const useStyles = makeStyles({
    root: {
        minHeight: 320,
        minWidth: 304,
        borderWidth: 5,
        borderColor: 'transparent',
        margin: 0,

    },
    selected: {
        minHeight: 320,
        minWidth: 304,
        borderWidth: 5,
        borderColor: '#2196f3',
    },
    content: {
        display: 'flex',
        alignContent: 'space-between',
    },
    contentTitle: {
        display: 'flex',
        alignContent: 'space-between',
        paddingBottom: '8px',
    },
    contentSize: {
        marginLeft: '16px',
        color: 'black',
        opacity: 0.6
    }
});


export default function ConferenceRoomSpace(props) {
    const classes = useStyles();

    const [open, setOpen] = useState(false);

    const handleEdit = () => {
        setOpen(true);
    }

    const handleClose = (value) => {
        setOpen(value);
    }

    return (
        <>
            <Card
                className={(props.space === props.parent + props.focus) ?
                    clsx(classes.selected, 'w-full') :
                    clsx(classes.root, 'w-full')}
                onClick={() => handleEdit()}
                value={props.index}
            >
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt={props.title}
                        height="140"
                        image={conferenceRoomStageUrl + props.imageUrl}
                        title={props.title}
                    />
                </CardActionArea>
                <CardContent className={classes.contentTitle}>
                    <span className="flex-auto flex">
                         <Typography component="h6" variant="h6">
                              {props.title}
                         </Typography>
                    </span>
                    <span className="flex">
                        <IconButton aria-label="settings" onClick={handleEdit}>
                            <EditIcon />
                        </IconButton>
                    </span>

                </CardContent>
                <span className={classes.contentSize}>
                    Up to {props.size} people
                </span>
            </Card>
            <ConferenceRoomDialog
                open={open}
                handleClose={handleClose}
                img = {conferenceRoomStageUrl + props.imageUrl}
                title={props.title}
                size={props.size}
                id={props.id}
                onChange={props.onChange}
            />
        </>
    );
}