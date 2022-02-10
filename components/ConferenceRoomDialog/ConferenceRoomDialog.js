import React, { useEffect, useState } from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { useDispatch, useSelector } from 'react-redux';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import MySnackbar from '../MySnackbar/MySnackbar';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles({
	conferenceRoomSize: {
		color: "#a9afbb"
	},
	button: {
		marginRight: '15px',
	}
});

const StyledTextField = withStyles({
	root: {
		'& .MuiOutlinedInput-root': {
			'& fieldset': {
				borderRadius: '0',
			},
		},
	},
})(TextField);

function ConferenceRoomDialog(props) {
	const dispatch = useDispatch();
	const classes = useStyles();
	const [state, setState] = useState({
		name: "",
		open: false,
	});

	useEffect(() => {
		setState({ ...state, name: props.title });
	}, [dispatch])


	function handleDialogClose() {
		props.handleClose(false);
	}

	function handleChange(e) {
		setState({ ...state, name: e.target.value });
	}


	function handleSaveChange() {
		if (state.name === "") {
			setState({ ...state, open: true });
		} else {
			props.onChange({name: state.name, id: props.id})
			props.handleClose(false);
		}

	}

	function handleClose(isOpen) {
		setState({ ...state, open: isOpen });
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
				
				<DialogContent>

					<img src={props.img} alt={props.title}/>
					<Typography variant="h6" component="h6" className={classes.conferenceRoomSize}>
                        Up to {props.size} people
                    </Typography>

					<StyledTextField
						id="outlined-full-width"
						label="Room Name"
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
						color="primary"
						className={classes.button}
					>
						Cancel
					</Button>
					<Button
						variant="outlined"
						onClick={handleSaveChange}
						color="primary"
						className={classes.button}
					>
						Save
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

export default ConferenceRoomDialog;