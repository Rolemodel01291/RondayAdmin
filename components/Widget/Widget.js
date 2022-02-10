import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';
import clsx from 'clsx';
import React, { useState } from 'react';

const useStyles = makeStyles({
    root: {
        maxWidth: 250,
    },
    selected: {
        maxWidth: 250,
        borderWidth: 5,
        borderColor: '#2196f3',
    },
    paper: {
        boxShadow: 5,
        width: '100%',
    },
    title: {
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, ' +
            'Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        fontSize: 36,
        color: '#2196f3'
    },
    data: {
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, ' +
            'Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        fontSize: 16
    }
});


function Widget(props) {
	const classes = useStyles();

    function handle() {
        props.handleFocus(props.widget.org, props.widget.data);
    }

	return (
		<Paper className={clsx(classes.paper)}>
			<div onClick={()=>handle()} className={(props.widget.org==='org'+ props.focus) ? clsx(classes.selected, 'cursor-pointer text-center pt-2 pb-2') : "cursor-pointer text-center pt-2 pb-2"}>
				<Typography className={clsx(classes.title)} >
					{props.widget.title}
				</Typography>
				<Typography className={clsx(classes.data)} color="textSecondary">
					Up to {props.widget.data} people
				</Typography>
			</div>
		</Paper>
	);
}

export default React.memo(Widget);  
