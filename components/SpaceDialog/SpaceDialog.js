import React, { useEffect, useState } from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import Slide from '@material-ui/core/Slide';
import Router from "next/router";
import { deleteSpace } from '../../pages/dashboard/spaces/store/spaceSlice';
import { Typography } from '@material-ui/core';
import MySnackbar from '../MySnackbar/MySnackbar';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
		width: '100%'
	},
	fontStylish: {
		fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, ' +
			'Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
		textAlign: 'center',
		color: 'black'
	},
	fontBold: {
		fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, ' +
			'Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
		color: 'blue',
		fontWeight: '1000',
	},
	deleteDialog: {
		fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, ' +
			'sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
		margin: '10px 0',
		color: 'red',
		textAlign:'center'
	},
	typography: {
		color: '#15886C',
		fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, ' +
			'sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
	}
}));

const StyledTextField = withStyles({
	root: {
		'& .MuiOutlinedInput-root': {
			'& fieldset': {
				borderRadius: '0',
			},
		},
	},
})(TextField);

function SpaceDialog(props) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const token = useSelector((state) => state.auth.token);


	const [state, setState] = useState({
		name: "",
		open: false,
		isDisabled: true,
	});


	function handleDialogClose() {
		props.handleClose(false);
	}

	function handleChange(e) {
		if (e.target.value.trim() === props.title.trim()) {
			setState({ ...state, isDisabled: false, name: e.target.value });
		} else {
			setState({ ...state, name: e.target.value, isDisabled: true });
		}

	}

	
	function handleSaveChange() {
		if (state.name.trim() === props.title.trim()) {
			dispatch(deleteSpace({token, spaceId: props.spaceId}));
			props.handleClose(false);
			Router.push('/dashboard/spaces');
		} else {
			setState({ ...state, open: true });		
		}

	}

	function handleClose(isOpen) {
		setState({ ...state, open: isOpen });
	}

	return (
		<>
			<Dialog
				// fullScreen={fullScreen}
				open={props.open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleDialogClose}
				aria-labelledby="alert-dialog-slide-title"
				aria-describedby="alert-dialog-slide-description"
			>
				<DialogTitle id="alert-dialog-slide-title">
					<Typography variant="h6" component="h6" className={classes.fontStylish}>
						Are you sure you want to delete <span className={classes.fontBold}>{props.title}</span> space?
					</Typography>
					<Typography variant="h6" component="h6" className={classes.deleteDialog}>
						The space will be permanantely removed, and all members in the space will be removed.
					</Typography>
					<Typography variant="h6" component="h6" className={classes.fontStylish}>
						Please type in the space name to confirm the deletion.
					</Typography>
				</DialogTitle>
				<DialogContent>
					<StyledTextField
						id="outlined-full-width"
						fullWidth
						margin="normal"
						InputLabelProps={{
							shrink: true,
						}}
						className="min-w-256"
						value={state.name}
						onChange={handleChange}
						variant="outlined"
					/>

				</DialogContent>
				<DialogActions>
					<Button
						variant="outlined"
						onClick={handleDialogClose}
						className={classes.typography}
					>
						Cancel
					</Button>
					<Button
						variant="outlined"
						onClick={handleSaveChange}
						disabled={state.isDisabled}
						className={classes.typography}
					>
						Delete Space
					</Button>
				</DialogActions>

			</Dialog>
			<MySnackbar
				open={state.open}
				handleClose={handleClose}
				title="Choose an answer to proceed."
			/>
		</>
	);
}

export default SpaceDialog;