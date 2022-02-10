import { Typography } from '@material-ui/core';
import React from 'react';
import Divider from '@material-ui/core/Divider';
import {makeStyles} from "@material-ui/core/styles";
import MoreIcon from '../MoreIcon/MoreIcon';


const useStyles = makeStyles({
    typography: {
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", ' +
            'Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    }
});

const ListItem = (props) => {
    const classes = useStyles();
    return (
        <>
            <div className="w-full my-3 flex align-center cursor-pointer items-center" style={{ color: props.color }}>

                <div className="flex w-5/12 items-center">
                    <Typography className={classes.typography}>{props.name}</Typography>
                </div>
                <div className="flex w-5/12 items-center">
                    <Typography className={classes.typography}>{props.email}</Typography>
                </div>
                <div className="flex w-1/12 items-center">
                    <Typography className={classes.typography}>{props.role}</Typography>
                </div>
                <div className="flex w-1/12 items-center justify-end mr-12">
                    <MoreIcon parent={props.parent} index={props.index} />
                </div>

            </div>
            <Divider light/>
        </>
    );
};

export default ListItem;
