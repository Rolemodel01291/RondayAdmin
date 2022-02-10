import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Router from "next/router";

import Button from '@material-ui/core/Button';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { TextField } from "@material-ui/core";

import ResultSpace from '../../../../components/ResultSpace/ResultSpace';
import {addSpace, getProfessionalSpaces} from "../store/spaceSlice";
import styles from "../../../../assets/jss/ronday-material-dashboard/views/spaceNameStyle";
import {useAuth0, withAuthenticationRequired} from "@auth0/auth0-react";
import {getUser} from "../../../../components/store/authSlice";


const StyledTextField = withStyles({
    root: {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderRadius: '0',
            },
        },
    },
})(TextField);

function SpaceType() {
    const useStyles = makeStyles(styles);
    const classes = useStyles();
    const dispatch = useDispatch();
    const selectedSpaceSize = useSelector((state) => state.space.selectedSpaceSize);
    const selectedOrganizationId = useSelector((state) => state.auth.selectedOrganizationId);
    const professionalSpaces = useSelector((state) => state.space.professionalSpaces);
    const token = useSelector((state) => state.auth.token);
    const [state, setState] = useState({
        expanded: false,
        selectedIndex: '',
        selectedCapacity: '',
        selectedExpandableMaxCapacity: '',
        selectedSpaceType: {},
        title: '',
        modernSceneId: 0,
        traditionalSceneId: 0,
    });

    const {
        logout
    } = useAuth0();

    useEffect(() => {
        dispatch(getUser({token})).then((res)=>{
            if (!res.payload) {
                localStorage.clear();
                logout();
            }
        })
        dispatch(getProfessionalSpaces(token));
        if (selectedSpaceSize) {
            setState({
                ...state,
                selectedIndex: selectedSpaceSize.settedIndex,
                expanded: selectedSpaceSize.settedExpanded,
                selectedCapacity: (selectedSpaceSize.settedSpaceType.displayName.includes('Modern') || selectedSpaceSize.settedSpaceType.displayName.includes('Traditional'))?
                    selectedSpaceSize.settedExpandableMaxCapacity :
                    selectedSpaceSize.settedMaxCapacity,
                selectedSpaceType: selectedSpaceSize.settedSpaceType.displayName.includes('Modern') ?
                    professionalSpaces?.find(x => x.sceneId === selectedSpaceSize.settedModernSceneId) :
                    selectedSpaceSize.settedSpaceType.displayName.includes('Traditional') ?
                    professionalSpaces?.find(x => x.sceneId === selectedSpaceSize.settedTraditonalSceneId) :
                    selectedSpaceSize.settedSpaceType,
                title: selectedSpaceSize.settedSpaceType.displayName.includes('Modern') ?
                    professionalSpaces?.find(x => x.sceneId === selectedSpaceSize.settedModernSceneId)?.displayName:
                    selectedSpaceSize.settedSpaceType.displayName.includes('Traditional') ?
                    professionalSpaces?.find(x => x.sceneId === selectedSpaceSize.settedTraditonalSceneId)?.displayName:
                    selectedSpaceSize.settedSpaceType.displayName,
            });
        }
    }, [dispatch, selectedSpaceSize])


    function goPrev() {
        Router.back();
    }

    function goNext() {
        let conferenceRooms = {};
        dispatch(addSpace({ DisplayName: state.title, SpaceTypeId: state.selectedSpaceType.spaceTypeId, selectedOrganizationId, token, conferenceRooms}));
        Router.replace('/dashboard/spaces');
    }

    function handleChange(event) {
        setState({ ...state, title: event.target.value });
    }


    return (
        <div className={classes.container}>
            <div className="text-center">
                <Typography variant="h4" component="h4" className={classes.cardTitle}>
                    Add new space
                </Typography>
                <Typography variant="h6" component="h6" className={classes.cardTitle}>
                    Step 2 of 2
                </Typography>
                <Typography variant="h4" component="h4" className={classes.cardTitleBlack}>
                    What do you want to call the space?
                </Typography>
            </div>
            <div className={classes.content}>
                <div className={classes.spacetype}>
                    <StyledTextField
                        id="outlined-full-width"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={
                                state.title
                        }
                        onChange={handleChange}
                    />
                </div>
                <div className={classes.space}>
                        <ResultSpace
                            img = {state.selectedSpaceType.imageName}
                            type={state.title}
                            size={state.selectedCapacity}
                        />
                </div>

                <div className={classes.back}>
                    <Button variant="contained" size="large" onClick={goPrev} className={classes.btnMargin}>
                        Cancel
                    </Button>
                    <Button variant="contained" size="large" onClick={goNext} className={classes.btnMargin}>
                        Add Space
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default withAuthenticationRequired(SpaceType);

