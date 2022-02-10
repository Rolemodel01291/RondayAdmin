import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Router from "next/router";

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import MySnackbar from '../../../../components/MySnackbar/MySnackbar';
import Space from '../../../../components/Space/Space';
import ExpandableSpace from '../../../../components/ExpandableSpaceItem/ExpandableSpaceItem';
import { getProfessionalSpaces, getSocialSpaces, setSpaceSize, updateSpace } from "../store/spaceSlice";

import styles from "../../../../assets/jss/ronday-material-dashboard/views/spaceTypeStyle";
import {useAuth0, withAuthenticationRequired} from "@auth0/auth0-react";
import {getUser} from "../../../../components/store/authSlice";



function SpaceType() {
    const useStyles = makeStyles(styles);
    const classes = useStyles();
    const dispatch = useDispatch();
    const professionalSpaces = useSelector((state) => state.space.professionalSpaces);
    const socialSpaces = useSelector((state) => state.space.socialSpaces);
    const token = useSelector((state) => state.auth.token);
    const selectedSpaceSize = useSelector((state) => state.space.selectedSpaceSize);
    const isEditAttr = useSelector((state) => state.space.isEditAttr);

    const [state, setState] = useState({
        expanded: false,
        open: false,
        selectedIndex: '',
        selectedMaxCapacity: 0,
        selectedSpaceType: {},
        selectedExpandableMaxCapacity: "50",
        traditionalSceneId: 110,
        modernSceneId: 666,
    });

    const [showFooter, setShowFooter] = useState(false);

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
        dispatch(getSocialSpaces(token));
        dispatch(getProfessionalSpaces(token));
        if (selectedSpaceSize) {
            setState({
                ...state,
                selectedIndex: selectedSpaceSize.settedIndex,
                expanded: selectedSpaceSize.settedExpanded,
                selectedExpandableMaxCapacity: selectedSpaceSize.settedExpandableMaxCapacity
            });
        }

    }, [dispatch])

    useEffect(()=>{
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    },[])

    function handleScroll() {
        const y = window.pageYOffset || document.documentElement.scrollTop;
        if (y > 80) {
            setShowFooter(true);
        } else {
            setShowFooter(false);
        }
    }

    function goPrev() {
        Router.push('/dashboard/spaces');
    }


    function goNext() {
        //Change space type
        if (isEditAttr.isEdit) {
            dispatch(updateSpace({ changedSpaceTypeId: state.selectedIndex, changedMaxCapacity: state.selectedMaxCapacity, changedSpaceId: isEditAttr.id }));
            Router.push(`/dashboard/spaces/editSpace?${isEditAttr.id}`)
        //Add new space type
        } else {
            dispatch(setSpaceSize({
                settedIndex: state.selectedIndex,
                settedExpanded: state.expanded,
                settedMaxCapacity: state.selectedMaxCapacity,
                settedExpandableMaxCapacity: state.selectedExpandableMaxCapacity,
                settedSpaceType: state.selectedSpaceType,
                settedModernSceneId: state.modernSceneId,
                settedTraditonalSceneId: state.traditionalSceneId
            }));
            Router.push('/dashboard/spaces/spaceName');
        }
    }

    function handleExpandableSpace(params) {
        setState({
            ...state,
            selectedExpandableMaxCapacity: params.capacity,
            modernSceneId: params.modernSceneId,
            traditionalSceneId: params.traditionalSceneId
        });
    }

    function handleAttribute(params) {
        setState({
            ...state,
            selectedIndex: params.selectedIndex,
            expanded: params.expanded,
            selectedSpaceType: params.space,
            selectedExpandableMaxCapacity: params.selectedSpaceSize,
            modernSceneId: params.modernSceneId,
            traditionalSceneId: params.traditionalSceneId
        });
    }

    function handleSpace(params) {
        setState({
            ...state,
            selectedIndex: params.selectedIndex,
            selectedMaxCapacity: params.space.maxCapacity,
            selectedSpaceType: params.space
        });
    }

    function handleClose(isOpen) {
        setState({ ...state, open: isOpen });
    }

    return (
        <div className={classes.container}>
            <div className="text-center">
                <Typography variant="h4" component="h4" className={classes.cardTitle}>
                    {isEditAttr.isEdit ? "Change Space" : "Add New Space"}
                </Typography>
                {isEditAttr.isEdit ? <></> : (<Typography variant="h6" component="h6" className={classes.cardTitle}>
                    Step 1 of 2
                </Typography>)}
                {isEditAttr.isEdit ? <></> : (<Typography variant="h3" component="h3" className={classes.cardTitleBlack}>
                    Choose the space type
                </Typography>)}

            </div>
            <div className={classes.professional}>
                <div>
                    <Typography variant="h4" component="h4" className={classes.header}>
                        Professional Spaces
                    </Typography>
                </div>
                <div className={classes.content}>
                    {professionalSpaces && professionalSpaces.map((professionalSpace, index) => (
                        <div key={index} className={classes.card}>
                            {professionalSpace.sceneId === 400?
                                <Space
                                    index={professionalSpace.spaceTypeId}
                                    selectedIndex={state.selectedIndex}
                                    setAttribute={handleSpace}
                                    item={professionalSpace}
                                /> : (professionalSpace.sceneId === 110 || professionalSpace.sceneId === 666) ?
                                <ExpandableSpace
                                    index={professionalSpace.spaceTypeId}
                                    selectedSize={state.selectedExpandableMaxCapacity}
                                    selectedIndex={state.selectedIndex}
                                    expanded={state.expanded}
                                    setAttribute={handleAttribute}
                                    handleSelectExpandableSpace={handleExpandableSpace}
                                    item={professionalSpace}
                                /> :
                                <></>
                            }

                        </div>
                    ))}
                </div>

            </div>

            <Divider className={classes.divider} />

            <div className={classes.social}>
                <div >
                    <Typography variant="h4" component="h4" className={classes.socialHeader}>
                        Social Spaces
                    </Typography>
                </div>
                <div className={classes.socialContent}>
                    {socialSpaces?.map((socialSpace, index) => (
                        <div key={index} className={classes.card}>
                            <Space
                                index={socialSpace.spaceTypeId}
                                selectedIndex={state.selectedIndex}
                                setAttribute={handleSpace}
                                item={socialSpace}
                            />
                        </div>
                    ))}
                   
                </div>

                <Divider className={classes.divider} />

                <div className={showFooter? classes.back : classes.hide}>
                    <Button variant="contained" size="large" onClick={goPrev} className={classes.btnMargin}>
                        Back
                    </Button>
                    <Button variant="contained" size="large" onClick={goNext} className={classes.btnMargin}>
                        {isEditAttr.isEdit? "Change Space" : "Next"}
                    </Button>
                </div>
            </div>

            <MySnackbar open={state.open} handleClose={handleClose} title="Choose an answer to proceed." />

        </div>
    );
}


export default withAuthenticationRequired(SpaceType);


