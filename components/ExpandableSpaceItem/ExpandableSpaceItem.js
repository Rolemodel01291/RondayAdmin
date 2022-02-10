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
    let modernSceneId, traditionalSceneId;
    const [state, setState] = useState({
        value: "50",
    })
    useEffect(() => {
        if (props.selectedSize > 0) {
            setState({ ...state, value: props.selectedSize });
        } else {
            setState({ ...state, value: props.item.maxCapacity });
        }
    }, [props.item.maxCapacity, props.selectedSize]);


    const handleClickOpen = () => {
        getSceneId(state.value);
        props.setAttribute({selectedIndex: props.index, expanded: true, space: props.item, selectedSpaceSize: state.value, modernSceneId, traditionalSceneId});
    };

    const handleChange = (event) => {
        setState({ ...state, value: event.target.value});
        getSceneId(event.target.value);
        props.handleSelectExpandableSpace({capacity: event.target.value, modernSceneId, traditionalSceneId});
    };

    function getSceneId(value) {
        if (props.item.displayName.includes('Modern')){
            if (parseInt(value) === 150){
                modernSceneId = 667;
            } else if (parseInt(value) === 50) {
                modernSceneId = 666;
            } else {
                modernSceneId = 500;
            }
        } else if (props.item.displayName.includes('Traditional')) {
            if (parseInt(value) === 150) {
                traditionalSceneId = 120;
            } else if (parseInt(value) === 50) {
                traditionalSceneId = 110;
            } else {
                traditionalSceneId = 100;
            }
        }
    }

    return (
        <>
            <Card
                className={(props.selectedIndex === props.index) ?
                    clsx(classes.selected, 'w-full') : clsx(classes.root, 'w-full')}
                value={props.key}
                onClick={() => handleClickOpen()}
            >
                <CardMedia
                    component="img"
                    alt={props.item.displayName}
                    height="140"
                    image={spaceTypeStageUrl + props.item.imageName}
                    title={props.item.displayName}
                />

                <CardContent>
                    <Typography variant="h6" component="h2">
                        {props.item.displayName.includes('Modern') ? "Modern Office" : "Traditional Office"}
                    </Typography>

                </CardContent>
                <CardActions className={classes.content}>
                    {/* <Typography gutterBottom variant="h5" component="h2"></Typography> */}
                    <span className={classes.spaceSize}>
                        3 sizes - 2 to 150 people
                    </span>
                    <span>
                        {props.item.conferenceRooms > 1 ?
                            `${props.item.conferenceRooms} meeting rooms` :
                            props.item.conferenceRooms === '1' ?
                                `${props.item.conferenceRooms} meeting room` :
                                ""
                        }
                    </span>
                </CardActions>
                <Collapse
                    in={props.expanded && props.index === props.selectedIndex}
                    timeout="auto"
                    unmountOnExit
                >
                    <CardContent>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Select Office Size</FormLabel>
                            <RadioGroup aria-label="size" name="size" value={parseInt(state.value)} onChange={handleChange}>
                                <FormControlLabel value={25} control={<Radio />} label="Small - Up to 25 people" />
                                <FormControlLabel value={50} control={<Radio />} label="Medium - Up to 50 people" />
                                <FormControlLabel value={150} control={<Radio />} label="Large - Up to 150 people" />
                            </RadioGroup>
                        </FormControl>
                    </CardContent>
                </Collapse>

            </Card>
        </>
    );
}

export default ExpandableSpace;