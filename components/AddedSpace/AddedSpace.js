import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import CardActions from '@material-ui/core/CardActions';
import EditIcon from '@material-ui/icons/Edit';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { useRouter } from 'next/router'
import Router from "next/router";
import {spaceTypeStageUrl} from "../../services/awsService/inviteId";


const useStyles = makeStyles({
    root: {
        minHeight: 320,
        minWidth: 372,
        borderWidth: 5,
        borderColor: 'transparent',
        margin: 0,
        backgroundColor: '#FFFFFF'
    },
    selected: {
        minHeight: 320,
        minWidth: 372,
        borderWidth: 5,
        borderColor: '#2196f3',
    },
    content: {
        display: 'flex',
        alignContent: 'space-between',
    },
    action: {
        display: 'flex',
        margin: '5px',
        marginTop: '-12px',
    },
    orgCapacity: {
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,' +
            ' Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        color: 'gray',
        backgroundColor: '#E5E7EB',
        borderRadius: '30px',
        padding: '0 10px',
        marginRight: '15px'
    },
    spaceType: {
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,' +
            ' Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        color: 'lightgray',
        marginLeft: '12px'
    },
    typography: {
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,' +
            ' Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        fontWeight: '600'
    }

});


export default function Space(props) {
    const classes = useStyles();
    const { asPath } = useRouter()

    const [state, setState] = useState({
        value: "50",
    })
    useEffect(() => {
        setState({ ...state, value: props.selectedSize });
    }, [props.selectedSize]);



    const handleEdit = () => {
        Router.push(`/dashboard/spaces/editSpace?${props.item.spaceId}`);
    }


    return (
        <>
            <Card className={clsx(classes.root, 'w-full')} value={props.key}>

                <CardMedia
                    component="img"
                    alt={props.item.displayName}
                    height="140"
                    image={spaceTypeStageUrl + props.item.spaceType.imageName}
                    title={props.item.displayName}
                />

                <CardContent className={classes.content}>
                    <span className="flex-auto flex items-center">
                         <Typography component="h5" variant="h5" className={classes.typography}>
                              {props.item.displayName}
                         </Typography>
                    </span>
                    <span className="flex">
                        <IconButton aria-label="settings" onClick={handleEdit}>
                            <EditIcon />
                        </IconButton>
                    </span>

                </CardContent>
                <CardActions className={classes.action}>
                    <span className={classes.orgCapacity}>
                        {`Up to ${props.item.spaceType.maxCapacity} people`}
                    </span>
                    <span>
                        {props.item.spaceType.conferenceRooms.length > 1 ?
                            `${props.item.spaceType.conferenceRooms.length} meeting rooms` :
                            props.item.spaceType.conferenceRooms === '1' ?
                            `${props.item.spaceType.conferenceRooms} meeting room` :
                            ""
                        }
                    </span>

                </CardActions>
                <span
                    component="h6"
                    variant="h6"
                    className={classes.spaceType}
                >
                    Space Type: {props.item.spaceType.displayName}
                </span>

            </Card>
        </>
    );
}