import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import CardActions from '@material-ui/core/CardActions';
import EditIcon from '@material-ui/icons/Edit';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { useRouter } from 'next/router'
import Router from "next/router";
import {spaceTypeStageUrl} from "../../services/awsService/inviteId";


const useStyles = makeStyles({
    root: {
        minHeight: 320,
        minWidth: 354,
        borderWidth: 5,
        borderColor: 'transparent',
        margin: 0,

    },
    selected: {
        minHeight: 320,
        minWidth: 354,
        borderWidth: 5,
        borderColor: '#2196f3',
    },
    content: {
        display: 'flex',
        margin: '5px',
    },
    spaceSize: {
        color: '#a9afbb',
    },
});


export default function ResultSpace(props) {
    const classes = useStyles();
    const { asPath } = useRouter()

    const [state, setState] = useState({
        value: "50",
    })
    useEffect(() => {
        setState({ ...state, value: props.selectedSize });
    }, [props.selectedSize]);


    const handleClickOpen = () => {
        if (asPath === '/dashboard/spaces/type') { 
            props.setAttribute({ type: props.type, focus: props.index, ex: (props.expanded && props.expanded[props.index] ? { [props.index]: false } : { [props.index]: true }), selectedIndex: props.index })
        }
    };

    const handleChange = (event) => {
        setState({ ...state, value: event.target.value });
        props.handleSelectSize(event.target.value);
    };

    const handleEdit = () => {
        Router.push(`/dashboard/spaces/editSpace?${props.index}`);
    }


    return (
        <>
            <Card className={(props.space === props.parent + props.focus) ? clsx(classes.selected, 'w-full') : clsx(classes.root, 'w-full')} onClick={() => handleClickOpen()} value={props.index}>
                <CardMedia
                    component="img"
                    height="140"
                    image={spaceTypeStageUrl + props.img}
                    title={props.title}
                />
                <CardContent>
                    <Typography variant="h6" component="h6">
                        {props.type}
                    </Typography>
                </CardContent>
                <CardActions className={classes.content}>
                    <span className={classes.spaceSize}>
                        {props.size === '25' ? `Small - Up to ${props.size} people` : props.size === '50' ? `Medium - Up to ${props.size} people` : `Large - Up to ${props.size} people`}
                    </span>
                    <span className={classes.spaceSize}>
                        {props.room > 1 ? `${props.room} meeting rooms` : props.room === '1' ? `${props.room} meeting room`: ""}
                    </span>
                </CardActions>
                <Collapse in={props.expanded && props.expanded[props.index]} timeout="auto" unmountOnExit>
                    <CardContent>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Select Office Size</FormLabel>
                            <RadioGroup aria-label="size" name="size" value={state.value} onChange={handleChange}>
                                <FormControlLabel value="25" control={<Radio />} label="Small - Up to 25 people" />
                                <FormControlLabel value="50" control={<Radio />} label="Medium - Up to 50 people" />
                                <FormControlLabel value="150" control={<Radio />} label="Large - Up to 150 people" />
                            </RadioGroup>
                        </FormControl>
                    </CardContent>
                </Collapse>
            </Card>
        </>
    );
}