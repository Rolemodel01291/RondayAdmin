import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import Carousel from 'react-material-ui-carousel';
import { makeStyles } from '@material-ui/core/styles';
import {
    Paper,
} from '@material-ui/core'


import styles from "../../assets/jss/ronday-material-dashboard/components/carouselStyle";
import {getSpaces, getSpaceTypes} from "../../pages/dashboard/spaces/store/spaceSlice";
import {spaceTypeStageUrl} from '../../services/awsService/inviteId'

function Project(props) {


    return (
        <Paper
            style={{
                margin: '10px',
                position: 'relative',
                padding: '20px',
            }}
            elevation={10}
        >
            <img src={spaceTypeStageUrl + props.item.spaceType.imageName} alt={props.item.displayName} />
        </Paper>
    )
}


export default function CustomCarousel(props) {
    const useStyles = makeStyles(styles);
    const classes = useStyles();
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    const selectedOrganizationId = useSelector((state) => state.auth.selectedOrganizationId);
    const addedSpaces = useSelector((state) => state.space.addedSpaces);

    useEffect(() => {
        dispatch(getSpaces({selectedOrganizationId, token}));
    }, [dispatch])


    const [state, setState] = useState({
        autoPlay: true,
        animation: "fade",
        indicators: true,
        timeout: 500,
        navButtonsAlwaysVisible: false,
        navButtonsAlwaysInvisible: false
    })

    return (

        <Carousel
            className={classes.carousel}
            autoPlay={state.autoPlay}
            animation={state.animation}
            indicators={state.indicators}
            timeout={state.timeout}
            navButtonsAlwaysVisible={state.navButtonsAlwaysVisible}
            navButtonsAlwaysInvisible={state.navButtonsAlwaysInvisible}

        >

              <Project item={addedSpaces?.find(x => x.spaceId === props.spaceId)}  />

        </Carousel>


    )

}