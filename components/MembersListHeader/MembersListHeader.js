import { Typography } from '@material-ui/core';
import React from 'react';
import Divider from "@material-ui/core/Divider";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    typography: {
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", ' +
            'Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    }
});

const ListHeader = () => {
    const classes = useStyles();
    return (
        <>
            <div className="w-full my-12 flex align-center items-center">

                <div className="flex w-5/12 items-center">
                    <Typography className={classes.typography}>NAME</Typography>
                </div>
                <div className="flex w-5/12 items-center">
                    <Typography className={classes.typography}>EMAIL</Typography>
                </div>
                <div className="flex w-1/12 items-center">
                    <Typography className={classes.typography}>ROLE</Typography>
                </div>

                <div className="flex w-1/12 items-center justify-end mr-12">

                </div>

            </div>
            <Divider/>
        </>

    );
};

export default ListHeader;