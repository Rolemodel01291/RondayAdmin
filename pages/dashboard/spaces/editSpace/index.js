import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Router, { useRouter } from "next/router";
import _ from 'lodash';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

import ConferenceRoomSpace from '../../../../components/ConferenceRoomSpace/ConferenceRoomSpace';
import Admin from "../../../../layouts/Admin";
import {
    setSpaceSize,
    setIsEdit,
    setDuplicateCount,
    addSpace,
    getSpaces,
    updateSpace, getSpace
} from "../store/spaceSlice";
import Carousel from "../../../../components/Carousel/Carousel";
import SpaceDeleteDialog from "../../../../components/SpaceDialog/SpaceDialog";
import styles from "../../../../assets/jss/ronday-material-dashboard/views/editSpaceStyle";
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


function EditSpace() {
    const useStyles = makeStyles(styles);
    const classes = useStyles();
    const dispatch = useDispatch();
    const addedSpaces = useSelector((state) => state.space.addedSpaces);
    const duplicateCount = useSelector((state) => state.space.duplicateCount);
    const selectedOrganizationId = useSelector((state) => state.auth.selectedOrganizationId);
    const organizations = useSelector((state) => state.auth.organizations);
    const token = useSelector((state) => state.auth.token);
    const { asPath } = useRouter();
    let index = asPath.indexOf('?');
    // id of selected space, id of selected space in addedspaces
    let spaceId = asPath.substr(index + 1);
    let temp;
    let title = addedSpaces?.find(x => x.spaceId === spaceId)?.displayName;
    let type = addedSpaces?.find(x => x.spaceId === spaceId)?.spaceType.displayName;
    let size = addedSpaces?.find(x => x.spaceId === spaceId)?.spaceType.maxCapacity;
    let conferenceRooms = addedSpaces?.find(x => x.spaceId === spaceId)?.conferenceRooms;

    const [state, setState] = useState({
        title: '',
        type: '',
        size: '',
        open: false,
        isDuplicate: false,
        conferenceRooms: {},
        isDisabled: true,
    })

    const {
        logout
    } = useAuth0();

    useEffect(() => {
        if (token) {
            dispatch(getUser({token})).then((res)=>{
                if (!res.payload) {
                    localStorage.clear();
                    logout();
                }
            })
        }
    }, [dispatch])


    useEffect(() => {
        setState({ ...state, title, type, size, conferenceRooms });
        dispatch(getSpaces({selectedOrganizationId, token}));
    }, [dispatch, selectedOrganizationId])

    const handle = () => {
        Router.push('/dashboard/spaces/type');
    }

    const handleChange = (event) => {
        if (title === event.target.value) {
            setState({ ...state, title: event.target.value, isDisabled: true });
        } else {
            setState({ ...state, title: event.target.value, isDisabled: false });
        }
    }

    const handleSelectChange = (event) => {
        if (size === parseInt(event.target.value)) {
            setState({ ...state, size: event.target.value, isDisabled: true });
        } else {
            setState({ ...state, size: event.target.value, isDisabled: false });
        }
    }

    const handleTypeChange = () => {
        let spaceTypeId = addedSpaces?.find(x => x.spaceId === spaceId)?.spaceType.spaceTypeId;
        let selectedSpaceType = addedSpaces?.find(x => x.spaceId === spaceId)?.spaceType;
        dispatch(setSpaceSize({  settedIndex: spaceTypeId, settedExpanded: true, settedMaxCapacity: state.size, settedSpaceType: selectedSpaceType}));
        dispatch(setIsEdit({ isEdit: true, id: spaceId }));
        Router.push('/dashboard/spaces/type');
    };

    const handleDelete = () => {
        setState({ ...state, open: true });
    }

    const handleDuplicate = () => {
        temp = duplicateCount + 1;
        if (_.includes(state.title, 'Copy of')) {
            let str = state.title.split(" ");
            let result = state.title.replace(str[str.length - 1], temp);
            setState({ ...state, title: result, isDuplicate: true, isDisabled: false });
        } else {
            setState({ ...state, title: `Copy of ${state.title} ${temp}`, isDuplicate: true, isDisabled: false });
        }
        dispatch(setDuplicateCount(temp));
    }

    const handleSave = () => {
        if (state.isDuplicate) {   //select duplicate button, duplicate space type
            let SpaceTypeId =  addedSpaces?.find(x => x.spaceId === spaceId)?.spaceType.spaceTypeId;
            let conferenceRooms = {};
            dispatch(addSpace({ DisplayName: state.title, SpaceTypeId, selectedOrganizationId, token, conferenceRooms}));
        } else {                    // no duplicate button, change space type
            let color = addedSpaces?.find(x => x.spaceId === spaceId)?.accentColor;
            let conferenceRoomNames = {};
            dispatch(updateSpace({ spaceId: spaceId,  displayName: state.title, accentColor: color, conferenceRoomNames: conferenceRoomNames, token, selectedOrganizationId }));
        }
        Router.push('/dashboard/spaces');
    }

    const handleClose = (value) => {
        setState({ ...state, open: value });
    }

    const getGuid = (str) => {
        let lengths = [8,4,4,4,12];
        let parts = [];
        let range = 0;
        for (let i = 0; i < lengths.length; i++) {
            parts.push(str.slice(range,range+lengths[i]));
            range += lengths[i];
        };
        let GUID = parts.join('-');
        return GUID;
    }

    const handleConferenceRoomNameChange = (data) => {
        let color = addedSpaces?.find(x => x.spaceId === spaceId)?.accentColor;
        let conferenceRoomNames = {[getGuid(data.id)]: data.name};
        dispatch(updateSpace({ spaceId: spaceId,  displayName: state.title, accentColor: color, conferenceRoomNames: conferenceRoomNames, token, selectedOrganizationId})).then(()=> {
           dispatch(getSpace({spaceId: spaceId, token})).then((res)=> {
              setState({...state, conferenceRooms: res.payload?.conferenceRooms});
           })
        })
    }

    return (
        <Admin>
            <div className={classes.headerbar}>
                <div className={classes.space}>
                    Edit Space
                </div>
                <div className={classes.action}>
                    <Button variant="outlined" color="secondary" onClick={handleDelete} className={classes.btnMargin}>
                        Delete Space
                    </Button>
                    {/*<Button variant="outlined" color="primary" onClick={handleDuplicate} style={{ marginLeft: '10px' }}>*/}
                    {/*    Duplicate Space*/}
                    {/*</Button>*/}
                    <Button variant="outlined"  onClick={handleSave} disabled={state.isDisabled} className={classes.btnSaveMargin}>
                        Save Changes
                    </Button>
                </div>
            </div>
            <div className={classes.content}>
                <div className={classes.spaceInfo}>
                    <div className={classes.spaceField}>
                        <div className={classes.header}>
                            <Typography variant="h5" component="h5" className="text-black">
                                Space Info
                            </Typography>
                        </div>
                        <div className={classes.textContainer}>
                            <div className={classes.bar}>
                                <span className={classes.label}>
                                    <Typography variant="h6" component="h6" className="text-black" >
                                        Name
                                    </Typography>
                                </span>

                                <StyledTextField
                                    id="outlined-full-width"
                                    fullWidth
                                    margin="normal"
                                    onChange={handleChange}
                                    value={state.title}
                                    variant="outlined"
                                    style={{borderRadius: '0'}}
                                />
                            </div>
                            <div className={classes.bar}>
                                <span className={classes.label}>
                                    <Typography variant="h6" component="h6" className="text-black" >
                                        Type
                                    </Typography>
                                </span>
                                <StyledTextField
                                    id="outlined-full-width"
                                    fullWidth
                                    disabled
                                    margin="normal"
                                    value={state.type}
                                    variant="outlined"
                                />
                            </div>
                            {((addedSpaces?.find(x => x.spaceId === spaceId)?.spaceType.displayName.includes('Modern')) ||
                                (addedSpaces?.find(x => x.spaceId === spaceId)?.spaceType.displayName.includes('Traditional'))) ?
                                <>
                                    <div className={classes.bar}>
                                    <span className={classes.label}>
                                        <Typography variant="h6" component="h6" className="text-black" >
                                             Size
                                         </Typography>
                                    </span>
                                        <StyledTextField
                                            id="outlined-full-width"
                                            fullWidth
                                            disabled
                                            margin="normal"
                                            value={
                                                parseInt(state.size) <= 25? `Small - Up to ${state.size} People` :
                                                parseInt(state.size) <= 50 && parseInt(state.size) > 25? `Medium - Up to ${state.size} People`:
                                                `Large - Up to ${state.size} People`
                                            }
                                            variant="outlined"
                                        />
                                    </div>
                                </> :
                                <></>
                            }
                        </div>

                    </div>

                    <div className={classes.spaceBar}>
                        <Carousel spaceId={spaceId}/>
                    </div>


                </div>
                <div className={classes.conferenceRoom}>
                    {state.conferenceRooms.length > 0 && state.conferenceRooms?.map((conferenceRoom, index) => (
                        <div className={classes.card} key={index}>
                            <ConferenceRoomSpace
                                title={conferenceRoom.displayName}
                                size={addedSpaces?.find(x => x.spaceId === spaceId)?.spaceType.conferenceRooms?.find(x => x.id === conferenceRoom.spaceTypeConferenceRoomId)?.maxCapacity}
                                index={index}
                                id={conferenceRoom.id}
                                imageUrl={addedSpaces?.find(x => x.spaceId === spaceId)?.spaceType.conferenceRooms?.find(x => x.id === conferenceRoom.spaceTypeConferenceRoomId)?.imageUrl}
                                onChange={handleConferenceRoomNameChange}
                            />
                        </div>
                    ))}
                </div>

            </div>
            <SpaceDeleteDialog open={state.open} title={state.title} handleClose={handleClose} spaceId={spaceId}/>
        </Admin>

    );
}

export default withAuthenticationRequired(EditSpace);

