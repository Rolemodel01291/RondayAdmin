import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import Slide from '@material-ui/core/Slide';
import { setOrganizationName, setOrganizationStyle, setOrganizationSize } from '../../pages/onboarding/clients/store/clientSlice';

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
	},
  }));

function OrgDialog(props) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
	const selectedOrgName = useSelector((state) => state.client.selectedOrgName);
	const selectedOrgSize = useSelector((state) => state.client.selectedOrgSize);
	const selectedOrgStyle = useSelector((state) => state.client.selectedOrgStyle);


	const [state, setState] = useState({
		name: selectedOrgName,
		style: selectedOrgStyle.style,
		size: selectedOrgSize.number
	});

	
	function handleDialogClose() {
		props.handleClose(false);
	}

	function handleChange(e) {
		setState({ ...state, name: e.target.value });
	}

	function handleSizeChange(e) {
		setState({...state, size: e.target.value});
	}

	function handleStyleChange(e) {
		setState({...state, style: e.target.value});
	}

	function handleSaveChange() {
		dispatch(setOrganizationSize({...selectedOrgSize, number: state.size}));
		dispatch(setOrganizationStyle({...selectedOrgStyle, style: state.style}));
		dispatch(setOrganizationName(state.name));
		props.handleClose(false);
	}

	return (
		<Dialog
			// fullScreen={fullScreen}
			open={props.open}
			TransitionComponent={Transition}
			keepMounted
			onClose={handleDialogClose}
			aria-labelledby="alert-dialog-slide-title"
			aria-describedby="alert-dialog-slide-description"
		>
			<DialogTitle id="alert-dialog-slide-title">{state.name} Information</DialogTitle>
			<DialogContent>
				
					<TextField
						id="outlined-full-width"
						label="Name"
						placeholder="Name"
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
					<form className={classes.container}>
						<FormControl className={classes.formControl}>
							<InputLabel htmlFor="demo-dialog-native">OrgSize</InputLabel>
							<Select
								native
								value={state.size}
								onChange={handleSizeChange}
								input={<Input id="demo-dialog-native" />}
							>
								
								<option value="2-25">2-25</option>
								<option value="26-50">26-50</option>
								<option value="51-150">51-150</option>
								<option value="150+">150+</option>
							</Select>
						</FormControl>
						<FormControl className={classes.formControl}>
							<InputLabel htmlFor="demo-dialog-native">OrgStyle</InputLabel>
							<Select
								native
								value={state.style}
								onChange={handleStyleChange}
								input={<Input id="demo-dialog-native"/>}
							>
								<option value="Modern">Modern</option>
								<option value="Traditional">Traditional</option>
							</Select>
						</FormControl>
					</form>
			
			</DialogContent>
			<DialogActions>
				<Button onClick={handleDialogClose} color="primary">
					Close
				</Button>
				<Button onClick={handleSaveChange} color="primary">
					Save
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default OrgDialog;