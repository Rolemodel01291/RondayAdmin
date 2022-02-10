import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
    space: {
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        margin: '10px 0',
        color: 'black',
        textAlign: 'center'
    },
    fontBlue: {
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        fontWeight: 'bold',
        color: '#15886C'
    },
    fontRed: {
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        margin: '10px 0',
        color: 'red',
        textAlign:'center'
    },
    content: {
        justifyContent: 'center'
    },
    typography: {
        color: 'white',
        backgroundColor: '#25AE8D',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
    }

});

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


function EmailDialog(props){
    const classes = useStyles();
    function handleDialogClose() {
        props.handleClose(false);
    }

    function handleSaveChange() {
        props.handleClose(false);
    }

    return (
        <>
            <Dialog
                open={props.open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleDialogClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">

                    <Typography variant="h6" component="h6" className={classes.space} >
                        To delete your organization please send an email with your organization name to   <p className={classes.fontBlue}>support@rondayapp.com</p>
                    </Typography>
                </DialogTitle>

                <DialogActions className={classes.content}>
                    <Button variant="contained" onClick={handleSaveChange}  className={classes.typography}>
                        Got it
                    </Button>
                </DialogActions>

            </Dialog>
        </>
    );
}

export default EmailDialog;