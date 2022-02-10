import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import amber from '@material-ui/core/colors/amber';
import WarningIcon from '@material-ui/icons/Warning';
import {setIsEdit} from "../../pages/dashboard/spaces/store/spaceSlice";
import Router from "next/router";
import MySnackbar from "../MySnackbar/MySnackbar";

const useStyles = makeStyles({
    root: {
        backgroundColor: amber[700],
    },
    fontBlack: {
        color: 'black'
    }

});

function CapacitySnackbar(props) {
    const dispatch = useDispatch();
    const classes = useStyles();
    const addedSpaces = useSelector((state) => state.space.addedSpaces);
    const [state, setState] = useState({
        open: false,
        spaceLimitOpen: false
    });

    useEffect(() => {
        setState({...state, open: props.open})
    }, [props])

    const handleAddSpaces = () => {
        if (addedSpaces.length > 25 ) {
            setState({...state, spaceLimitOpen: true});
        } else {
            dispatch(setIsEdit({isEdit: false, id: null}));
            Router.push('/dashboard/spaces/type');
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        props.handleClose(false);
    };

    return (
        <>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={state.open}
                onClose={handleClose}
                ContentProps={{
                    classes: {
                        root: classes.root
                    },
                    'aria-describedby': 'message-id',
                }}
                message={<div id="message-id"><WarningIcon/>{props.title}</div>}
                action={[
                    <Button key="add" color="primary" size="small" onClick={handleAddSpaces} className={classes.fontBlack}>
                        Add more spaces
                    </Button>,
                    <Button key="ignore" color="primary" size="small" onClick={handleClose} className={classes.fontBlack}>
                        Ignore
                    </Button>
                ]}
            />
            <MySnackbar open={state.spaceLimitOpen} handleClose={handleClose} title={`You can’t create more than 25 spaces. \n Delete one of your existing spaces to create a new one`} />
        </>
    );
}

export default CapacitySnackbar;